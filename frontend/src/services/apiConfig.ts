export interface APIConfig {
  deepseekApiKey: string;
  deepseekApiUrl: string;
  siliconflowApiKey: string;
  siliconflowApiUrl: string;
  selectedProvider: 'deepseek' | 'siliconflow';
}

const STORAGE_KEY = 'xuan_yi_tong_api_config';

export const apiConfigService = {
  getConfig: (): APIConfig => {
    const config = localStorage.getItem(STORAGE_KEY);
    return config ? JSON.parse(config) : {
      deepseekApiKey: '',
      deepseekApiUrl: 'https://api.deepseek.com/v1',
      siliconflowApiKey: '',
      siliconflowApiUrl: 'https://api.siliconflow.cn/v1',
      selectedProvider: 'deepseek',
    };
  },

  saveConfig: (config: APIConfig): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  },
}; 