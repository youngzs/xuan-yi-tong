import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useToast } from '../hooks/useToast';
import { apiConfigService, APIConfig } from '../services/apiConfig';
import BackHomeButton from '../components/common/BackHomeButton';

interface SettingsFormData extends APIConfig {}

const Settings: React.FC = () => {
  const { register, handleSubmit, setValue, watch } = useForm<SettingsFormData>();
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();
  const selectedProvider = watch('selectedProvider');

  // 加载已保存的设置
  useEffect(() => {
    const config = apiConfigService.getConfig();
    setValue('selectedProvider', config.selectedProvider);
    setValue('deepseekApiKey', config.deepseekApiKey);
    setValue('siliconflowApiKey', config.siliconflowApiKey);
  }, [setValue]);

  const onSubmit = async (data: SettingsFormData) => {
    setIsLoading(true);
    try {
      apiConfigService.saveConfig({
        ...data,
        deepseekApiUrl: 'https://api.deepseek.com/v1',
        siliconflowApiUrl: 'https://api.siliconflow.cn/v1'
      });
      showToast('设置已保存', 'success');
    } catch (error) {
      showToast('保存设置失败', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow px-6 py-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">API设置</h2>
            <p className="mt-1 text-sm text-gray-500">
              配置模型提供商的API密钥
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                选择模型提供商
              </label>
              <select
                {...register('selectedProvider')}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="deepseek">DeepSeek</option>
                <option value="siliconflow">硅基流动</option>
              </select>
            </div>

            {selectedProvider === 'deepseek' && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  DeepSeek API密钥
                </label>
                <input
                  type="password"
                  {...register('deepseekApiKey')}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="输入DeepSeek API密钥"
                />
              </div>
            )}

            {selectedProvider === 'siliconflow' && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  硅基流动 API密钥
                </label>
                <input
                  type="password"
                  {...register('siliconflowApiKey')}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="输入硅基流动 API密钥"
                />
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? '保存中...' : '保存设置'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings; 