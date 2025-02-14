import { create } from 'zustand';
import { APIConfig, apiConfigService } from '../services/apiConfig';

interface APIStore {
  config: APIConfig;
  isConfigured: boolean;
  setConfig: (config: APIConfig) => void;
  initConfig: () => void;
}

export const useAPIStore = create<APIStore>((set) => ({
  config: {
    deepseekApiKey: '',
    deepseekApiUrl: 'https://api.deepseek.com/v1',
    siliconflowApiKey: '',
    siliconflowApiUrl: 'https://api.siliconflow.cn/v1',
    selectedProvider: 'deepseek',
  },
  isConfigured: false,

  setConfig: (config: APIConfig) => {
    apiConfigService.saveConfig(config);
    set({ config, isConfigured: true });
  },

  initConfig: () => {
    const savedConfig = apiConfigService.getConfig();
    const isConfigured = !!(savedConfig.deepseekApiKey || savedConfig.siliconflowApiKey);
    set({ config: savedConfig, isConfigured });
  },
}));