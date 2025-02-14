import React from 'react';
import { useForm } from 'react-hook-form';
import { FORM_LABELS, ERROR_MESSAGES } from '../../config/prompts';

interface CeZiFormProps {
  onSubmit: (data: CeZiFormData) => void;
  isLoading: boolean;
}

export interface CeZiFormData {
  character: string;
  question: string;
  motivation: string;
}

const QUESTION_SAMPLES = [
  {
    text: '事业发展',
    detail: '想了解近期事业运势和发展机会。'
  },
  {
    text: '感情婚姻',
    detail: '想了解感情运势和婚姻状况。'
  },
  {
    text: '财运方向',
    detail: '想了解近期财运和投资机会。'
  },
  {
    text: '健康状况',
    detail: '想了解身体健康状况和注意事项。'
  }
];

const MOTIVATION_SAMPLES = [
  {
    text: '事业选择',
    detail: '最近在考虑转行，想通过测字了解适合的方向。'
  },
  {
    text: '感情困惑',
    detail: '对目前的感情有些迷茫，希望能得到指引。'
  },
  {
    text: '公司起名',
    detail: '需要为新公司取个好名字，想了解名字的吉凶。'
  }
];

const CeZiForm: React.FC<CeZiFormProps> = ({ onSubmit, isLoading }) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<CeZiFormData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* 测字输入 */}
      <div>
        <label htmlFor="character" className="block text-sm font-medium text-gray-700">
          {FORM_LABELS.CHARACTER}
        </label>
        <input
          type="text"
          id="character"
          maxLength={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          {...register('character', { 
            required: ERROR_MESSAGES.REQUIRED_FIELD,
            maxLength: {
              value: 4,
              message: '最多只能输入4个字'
            }
          })}
        />
        {errors.character && (
          <p className="mt-1 text-sm text-red-600">{errors.character.message}</p>
        )}
      </div>

      {/* 预测问题 */}
      <div>
        <label htmlFor="question" className="block text-sm font-medium text-gray-700">
          {FORM_LABELS.QUESTION}
        </label>
        <div className="mt-2 flex flex-wrap gap-2 mb-2">
          {QUESTION_SAMPLES.map((sample, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setValue('question', sample.detail)}
              className="px-3 py-1 text-sm bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-full"
            >
              {sample.text}
            </button>
          ))}
        </div>
        <input
          type="text"
          id="question"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          {...register('question', { required: ERROR_MESSAGES.REQUIRED_FIELD })}
        />
        {errors.question && (
          <p className="mt-1 text-sm text-red-600">{errors.question.message}</p>
        )}
      </div>

      {/* 动机 */}
      <div>
        <label htmlFor="motivation" className="block text-sm font-medium text-gray-700">
          测字动机
        </label>
        <div className="mt-2 flex flex-wrap gap-2 mb-2">
          {MOTIVATION_SAMPLES.map((sample, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setValue('motivation', sample.detail)}
              className="px-3 py-1 text-sm bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-full"
            >
              {sample.text}
            </button>
          ))}
        </div>
        <textarea
          id="motivation"
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="请描述您想测字的具体原因和背景..."
          {...register('motivation')}
        />
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

export default CeZiForm;