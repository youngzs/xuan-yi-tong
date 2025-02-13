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

const CeZiForm: React.FC<CeZiFormProps> = ({ onSubmit, isLoading }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<CeZiFormData>();

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
          maxLength={1}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          {...register('character', { required: ERROR_MESSAGES.REQUIRED_FIELD })}
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
        <textarea
          id="motivation"
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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