import React from 'react';
import { useForm } from 'react-hook-form';
import { ERROR_MESSAGES } from '../../config/prompts';

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

const LAYOUT_SAMPLES = [
  {
    text: '三室两厅',
    detail: '三室两厅，主卧朝南，客厅朝东，面积120平米'
  },
  {
    text: '两室一厅',
    detail: '两室一厅，主卧朝东，客厅朝南，面积90平米'
  },
  {
    text: '四室两厅',
    detail: '四室两厅，主卧朝南，客厅朝东南，面积150平米'
  }
];

const CONCERN_SAMPLES = [
  {
    text: '财运改善',
    detail: '希望通过风水布局改善家庭财运和事业发展。'
  },
  {
    text: '健康调理',
    detail: '家人身体欠佳，想通过风水调整改善家居健康环境。'
  },
  {
    text: '感情和谐',
    detail: '期望改善家庭关系，增进夫妻感情。'
  },
  {
    text: '学业进步',
    detail: '想为孩子营造良好的学习环境，提升学习效果。'
  }
];

const FengShuiForm: React.FC<FengShuiFormProps> = ({ onSubmit, isLoading }) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FengShuiFormData>();

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
          placeholder="例如：8层"
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
        <div className="mt-2 flex flex-wrap gap-2 mb-2">
          {LAYOUT_SAMPLES.map((sample, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setValue('layout', sample.detail)}
              className="px-3 py-1 text-sm bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-full"
            >
              {sample.text}
            </button>
          ))}
        </div>
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
        <div className="mt-2 flex flex-wrap gap-2 mb-2">
          {CONCERN_SAMPLES.map((sample, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setValue('concern', sample.detail)}
              className="px-3 py-1 text-sm bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-full"
            >
              {sample.text}
            </button>
          ))}
        </div>
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