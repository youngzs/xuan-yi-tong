import { create } from 'zustand';
import { apiConfigService, APIConfig } from '../services/apiConfig';

interface APIStore {
  config: APIConfig;
  isConfigured: boolean;
  initConfig: () => void;
}

export const useAPIStore = create<APIStore>((set) => ({
  config: {
    deepseekApiKey: '',
    deepseekApiUrl: 'https://api.deepseek.com/v1',
    deepseekModel: 'deepseek-r1',
    deepseekModelType: 'standard',
    siliconflowApiKey: '',
    siliconflowApiUrl: 'https://api.siliconflow.cn/v1',
    siliconflowModel: 'deepseek-r1',
    selectedProvider: 'deepseek'
  },
  isConfigured: false,
  initConfig: () => {
    const savedConfig = apiConfigService.getConfig();
    set({
      config: savedConfig,
      isConfigured: !!savedConfig.deepseekApiKey || !!savedConfig.siliconflowApiKey
    });
  }
}));