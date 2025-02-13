import React from 'react';
import { useForm } from 'react-hook-form';
import { FORM_LABELS, ERROR_MESSAGES } from '../../config/prompts';

interface FengShuiFormProps {
  onSubmit: (data: FengShuiFormData) => void;
  isLoading: boolean;
}

export interface FengShuiFormData {
  direction: string;
  floor: string;
  entranceDirection: string;
  layout: string;
  concern: string;
}

const FengShuiForm: React.FC<FengShuiFormProps> = ({ onSubmit, isLoading }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FengShuiFormData>();

  const directions = ['东', '南', '西', '北', '东南', '东北', '西南', '西北'];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* 房屋朝向 */}
      <div>
        <label htmlFor="direction" className="block text-sm font-medium text-gray-700">
          房屋朝向
        </label>
        <select
          id="direction"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          {...register('direction', { required: ERROR_MESSAGES.REQUIRED_FIELD })}
        >
          <option value="">请选择</option>
          {directions.map((dir) => (
            <option key={dir} value={dir}>{dir}</option>
          ))}
        </select>
        {errors.direction && (
          <p className="mt-1 text-sm text-red-600">{errors.direction.message}</p>
        )}
      </div>

      {/* 所在楼层 */}
      <div>
        <label htmlFor="floor" className="block text-sm font-medium text-gray-700">
          所在楼层
        </label>
        <input
          type="text"
          id="floor"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          {...register('floor', { required: ERROR_MESSAGES.REQUIRED_FIELD })}
        />
        {errors.floor && (
          <p className="mt-1 text-sm text-red-600">{errors.floor.message}</p>
        )}
      </div>

      {/* 入户方向 */}
      <div>
        <label htmlFor="entranceDirection" className="block text-sm font-medium text-gray-700">
          入户方向
        </label>
        <select
          id="entranceDirection"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          {...register('entranceDirection', { required: ERROR_MESSAGES.REQUIRED_FIELD })}
        >
          <option value="">请选择</option>
          {directions.map((dir) => (
            <option key={dir} value={dir}>{dir}</option>
          ))}
        </select>
        {errors.entranceDirection && (
          <p className="mt-1 text-sm text-red-600">{errors.entranceDirection.message}</p>
        )}
      </div>

      {/* 房屋格局 */}
      <div>
        <label htmlFor="layout" className="block text-sm font-medium text-gray-700">
          房屋格局
        </label>
        <textarea
          id="layout"
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="请描述房屋的整体布局，如：三室两厅，主卧朝南..."
          {...register('layout', { required: ERROR_MESSAGES.REQUIRED_FIELD })}
        />
        {errors.layout && (
          <p className="mt-1 text-sm text-red-600">{errors.layout.message}</p>
        )}
      </div>

      {/* 主要困扰 */}
      <div>
        <label htmlFor="concern" className="block text-sm font-medium text-gray-700">
          主要困扰
        </label>
        <textarea
          id="concern"
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="请描述您目前遇到的主要问题或困扰..."
          {...register('concern', { required: ERROR_MESSAGES.REQUIRED_FIELD })}
        />
        {errors.concern && (
          <p className="mt-1 text-sm text-red-600">{errors.concern.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
      >
        {isLoading ? '分析中...' : '开始分析'}
      </button>
    </form>
  );
};

export default FengShuiForm; 