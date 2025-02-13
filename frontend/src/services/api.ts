import { apiConfigService } from './apiConfig';
import axios from 'axios';

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface AnalysisResult {
  basicInfo: {
    birthData: string;
    wuxing: string;
    rizhu: string;
  };
  analysis: {
    personality: string;
    career: string;
    wealth: string;
    relationships: string;
    health: string;
  };
  guidance: {
    shortTerm: string;
    longTerm: string;
    suggestions: string[];
  };
}

interface StreamHandler {
  onContent: (content: string) => void;
  onComplete: (result: AnalysisResult) => void;
  onError: (error: Error) => void;
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
      model: 'deepseek-reasoner'
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
      model: 'deepseek-ai/DeepSeek-V3'
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
        return {
          basicInfo: {
            birthData: "解析失败",
            wuxing: "解析失败",
            rizhu: "解析失败"
          },
          analysis: {
            personality: content,
            career: "解析失败",
            wealth: "解析失败",
            relationships: "解析失败",
            health: "解析失败"
          },
          guidance: {
            shortTerm: "解析失败",
            longTerm: "解析失败",
            suggestions: ["解析失败"]
          }
        };
      }
    } catch (error) {
      console.error('硅基流动 API 调用错误:', error);
      throw error;
    }
  },

  async chatStream(messages: ChatMessage[], callbacks: StreamHandler): Promise<void> {
    const config = apiConfigService.getConfig();
    const provider = config.selectedProvider;
    
    try {
      const response = await fetch(
        provider === 'deepseek' 
          ? 'https://api.deepseek.com/v1/chat/completions'
          : 'https://api.siliconflow.cn/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${config[provider + 'ApiKey']}`,
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            model: provider === 'deepseek' ? 'deepseek-reasoner' : 'deepseek-ai/DeepSeek-V3',
            messages: [
              {
                role: "system",
                content: "You must respond in valid JSON format..."
              },
              ...messages
            ],
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
        accumulatedContent += chunk;

        // 尝试格式化 JSON 字符串
        try {
          const formattedContent = JSON.parse(accumulatedContent);
          callbacks.onContent(JSON.stringify(formattedContent, null, 2));
        } catch {
          // 如果不是有效的 JSON，直接显示原文
          callbacks.onContent(chunk);
        }
      }

      if (callbacks.onComplete) {
        try {
          const result = JSON.parse(accumulatedContent);
          callbacks.onComplete(result);
        } catch {
          callbacks.onComplete(accumulatedContent);
        }
      }
    } catch (error) {
      callbacks.onError(error as Error);
    }
  }
}; 