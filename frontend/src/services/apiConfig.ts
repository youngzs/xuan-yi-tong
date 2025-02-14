export interface APIConfig {
  deepseekApiKey: string;
  deepseekApiUrl: string;
  deepseekModel: 'deepseek-r1' | 'deepseek-v3';
  deepseekModelType: 'standard' | 'pro';
  siliconflowApiKey: string;
  siliconflowApiUrl: string;
  siliconflowModel: 'deepseek-r1' | 'deepseek-r1-pro';
  selectedProvider: 'deepseek' | 'siliconflow';
}

const STORAGE_KEY = 'xuan_yi_tong_api_config';

export const apiConfigService = {
  getConfig: (): APIConfig => {
    const config = localStorage.getItem(STORAGE_KEY);
    return config ? JSON.parse(config) : {
      deepseekApiKey: '',
      deepseekApiUrl: 'https://api.deepseek.com/v1',
      deepseekModel: 'deepseek-r1',
      deepseekModelType: 'standard',
      siliconflowApiKey: '',
      siliconflowApiUrl: 'https://api.siliconflow.cn/v1',
      siliconflowModel: 'deepseek-r1',
      selectedProvider: 'deepseek',
    };
  },

  saveConfig: (config: APIConfig): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  },
};