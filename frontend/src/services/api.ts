import { apiConfigService } from './apiConfig';
import type { ChatMessage } from '../types/chat';
import type { AnalysisResult } from '../types/analysis';
import { TEST } from '../config/prompts';
import { historyService } from './historyService';
console.log('Test import:', TEST);

// 动态导入 prompts
async function getPrompts() {
  const { ANALYSIS_PROMPTS, ERROR_MESSAGES } = await import('../config/prompts');
  return { ANALYSIS_PROMPTS, ERROR_MESSAGES };
}

interface StreamHandler {
  onContent: (content: string) => void;
  onComplete: (result: AnalysisResult) => void;
  onError: (error: Error) => void;
}

interface StreamData {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    delta: {
      content: string;
      reasoning_content: string | null;
      role?: string;
    };
    finish_reason: string | null;
  }>;
}

interface AnalysisPrompts {
  system: string;
  user?: (data: any) => string;
  questionPrompt?: string;
}

interface AnalysisPromptsConfig {
  [key: string]: AnalysisPrompts;
}

type AnalysisMethod = 'bazi' | 'ziweidoushu' | 'fengshui' | 'cezi';

// 修改 buildPromptMessages 函数为异步函数
async function buildPromptMessages(method: AnalysisMethod, data: any): Promise<ChatMessage[]> {
  const { ANALYSIS_PROMPTS } = await getPrompts();
  const prompts = (ANALYSIS_PROMPTS as AnalysisPromptsConfig)[method];
  if (!prompts) {
    throw new Error(`未找到${method}的提示语配置`);
  }

  const messages: ChatMessage[] = [
    {
      role: 'system',
      content: prompts.system
    }
  ];

  // 如果存在 questionPrompt，使用它构建用户消息
  if (prompts.questionPrompt) {
    let userPrompt = prompts.questionPrompt;
    
    // 替换模板变量
    Object.entries(data).forEach(([key, value]) => {
      const placeholder = `{${key}}`;
      if (typeof value === 'string' && userPrompt.includes(placeholder)) {
        userPrompt = userPrompt.replace(placeholder, value);
      }
    });

    messages.push({
      role: 'user',
      content: userPrompt
    });
  } else if (typeof prompts.user === 'function') {
    // 如果提供了 user 函数，使用它构建用户消息
    messages.push({
      role: 'user',
      content: prompts.user(data)
    });
  }

  return messages;
}

export const chatService = {
  async chat(messages: ChatMessage[]): Promise<AnalysisResult> {
    const config = apiConfigService.getConfig();
    const provider = config.selectedProvider;
    
    if (provider === 'deepseek') {
      return await this.chatWithDeepseek(messages);
    } else {
      return await this.chatWithSiliconflow(messages);
    }
  },

  async chatWithDeepseek(messages: ChatMessage[]): Promise<AnalysisResult> {
    const config = apiConfigService.getConfig();
    const apiConfig = { 
      url: config.deepseekApiUrl,
      key: config.deepseekApiKey,
      model: config.deepseekModel || 'deepseek-reasoner'
    };

    try {
      const response = await fetch(apiConfig.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiConfig.key}`,
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          model: apiConfig.model,
          messages,
          temperature: 0.7,
          max_tokens: 2000,
          response_format: { type: "json_object" },
          stream: false
        }),
      });

      if (!response.ok) {
        throw new Error(`DeepSeek API 请求失败: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return JSON.parse(data.choices[0].message.content);
    } catch (error) {
      console.error('DeepSeek API 调用错误:', error);
      throw error;
    }
  },

  async chatWithSiliconflow(messages: ChatMessage[]): Promise<AnalysisResult> {
    const config = apiConfigService.getConfig();
    const apiConfig = {
      url: config.siliconflowApiUrl,
      key: config.siliconflowApiKey,
      model: 'Pro/deepseek-ai/DeepSeek-R1'
    };

    try {
      const response = await fetch(apiConfig.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiConfig.key}`,
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          model: apiConfig.model,
          messages: [
            {
              role: "system",
              content: "You must respond in valid JSON format. Your response should be a properly formatted JSON object that can be parsed."
            },
            ...messages
          ],
          temperature: 0.7,
          max_tokens: 2000,
          stream: false
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Siliconflow API Error:', {
          status: response.status,
          statusText: response.statusText,
          errorData
        });
        
        const errorMessage = errorData?.message || `硅基流动 API 请求失败: ${response.status} ${response.statusText}`;
        throw new Error(errorMessage);
      }

      const data = await response.json();
      const content = data.choices[0].message.content;
      
      try {
        return JSON.parse(content);
      } catch (parseError) {
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
        
        console.error('无法解析返回的 JSON:', content);
        return content;
      }
    } catch (error) {
      console.error('硅基流动 API 调用错误:', error);
      throw error;
    }
  },

  async chatStream(messages: ChatMessage[], callbacks: StreamHandler): Promise<void> {
    const config = apiConfigService.getConfig();
    const provider = config.selectedProvider;
    const apiKey = provider === 'deepseek' ? config.deepseekApiKey : config.siliconflowApiKey;
    
    try {
      const response = await fetch(
        provider === 'deepseek' 
          ? 'https://api.deepseek.com/v1/chat/completions'
          : 'https://api.siliconflow.cn/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            model: provider === 'deepseek' ? (config.deepseekModel || 'deepseek-reasoner') : (config.siliconflowModel || 'deepseek-ai/DeepSeek-V3'),
            messages: messages,
            temperature: 0.7,
            max_tokens: 2000,
            stream: true
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`API 请求失败: ${response.status} ${response.statusText}`);
      }

      let accumulatedContent = '';
      
      // 读取流数据
      const reader = response.body!.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n').filter(line => line.trim() !== '');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const jsonData = line.slice(5).trim();
            if (jsonData === '[DONE]') continue;

            try {
              const streamData: StreamData = JSON.parse(jsonData);
              const content = streamData.choices[0]?.delta?.content || '';
              const reasoningContent = streamData.choices[0]?.delta?.reasoning_content || '';
              
              // 合并content和reasoningContent
              const combinedContent = content || reasoningContent;
              
              // 累积内容
              if (combinedContent) {
                accumulatedContent += combinedContent;
                callbacks.onContent(accumulatedContent);
              }
            } catch (error) {
              console.error('解析流数据失败:', error);
              accumulatedContent += chunk;
              callbacks.onContent(accumulatedContent);
            }
          }
        }
      }

      // 完成时的处理
      if (callbacks.onComplete) {
        try {
          // 尝试解析最终的 JSON 结果
          const finalResult = JSON.parse(accumulatedContent);
          callbacks.onComplete(finalResult);
        } catch (error) {
          console.error('解析最终JSON结果失败:', error);
          // 尝试从累积的内容中提取JSON
          const jsonMatch = accumulatedContent.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            try {
              const extractedJson = JSON.parse(jsonMatch[0]);
              callbacks.onComplete(extractedJson);
            } catch {
              callbacks.onComplete(accumulatedContent);
            }
          } else {
            callbacks.onComplete(accumulatedContent);
          }
        }
      }
    } catch (error) {
      callbacks.onError(error as Error);
    }
  },

  async analyzeWithMethod(method: AnalysisMethod, data: any): Promise<AnalysisResult> {
    try {
      const messages = await buildPromptMessages(method, data);
      if (data.stream) {
        return new Promise((resolve, reject) => {
          this.chatStream(messages, {
            onContent: (content: string) => {
              if (data.onContent) {
                data.onContent(content);
              }
            },
            onComplete: (result: AnalysisResult) => {
              // 保存分析历史
              const history = historyService.saveAnalysis(
                method,
                data,
                messages,
                result
              );
              if (data.onHistoryCreated) {
                data.onHistoryCreated(history);
              }
              resolve(result);
            },
            onError: (error: Error) => {
              reject(error);
            }
          });
        });
      } else {
        const result = await this.chat(messages);
        // 非流式模式也保存历史
        historyService.saveAnalysis(method, data, messages, result);
        return result;
      }
    } catch (error) {
      console.error(`${method}分析失败:`, error);
      const { ERROR_MESSAGES } = await getPrompts();
      throw new Error(ERROR_MESSAGES.ANALYSIS_FAILED);
    }
  },
};