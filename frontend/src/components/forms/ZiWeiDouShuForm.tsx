import React from 'react';
import { useForm } from 'react-hook-form';
import { FORM_LABELS, ERROR_MESSAGES } from '../../config/prompts';

interface ZiWeiDouShuFormProps {
  onSubmit: (data: ZiWeiDouShuFormData) => void;
  isLoading: boolean;
}

export interface ZiWeiDouShuFormData {
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  birthHour: string;
  gender: string;
  focus: string;
}

const ZiWeiDouShuForm: React.FC<ZiWeiDouShuFormProps> = ({ onSubmit, isLoading }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ZiWeiDouShuFormData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* 出生年月日时 */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="birthYear" className="block text-sm font-medium text-gray-700">
            {FORM_LABELS.BIRTH_YEAR}
          </label>
          <input
            type="number"
            id="birthYear"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            {...register('birthYear', { required: ERROR_MESSAGES.REQUIRED_FIELD })}
          />
          {errors.birthYear && (
            <p className="mt-1 text-sm text-red-600">{errors.birthYear.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="birthMonth" className="block text-sm font-medium text-gray-700">
            {FORM_LABELS.BIRTH_MONTH}
          </label>
          <select
            id="birthMonth"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            {...register('birthMonth', { required: ERROR_MESSAGES.REQUIRED_FIELD })}
          >
            <option value="">请选择</option>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}月</option>
            ))}
          </select>
          {errors.birthMonth && (
            <p className="mt-1 text-sm text-red-600">{errors.birthMonth.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="birthDay" className="block text-sm font-medium text-gray-700">
            {FORM_LABELS.BIRTH_DAY}
          </label>
          <select
            id="birthDay"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            {...register('birthDay', { required: ERROR_MESSAGES.REQUIRED_FIELD })}
          >
            <option value="">请选择</option>
            {Array.from({ length: 31 }, (_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}日</option>
            ))}
          </select>
          {errors.birthDay && (
            <p className="mt-1 text-sm text-red-600">{errors.birthDay.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="birthHour" className="block text-sm font-medium text-gray-700">
            {FORM_LABELS.BIRTH_HOUR}
          </label>
          <select
            id="birthHour"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            {...register('birthHour', { required: ERROR_MESSAGES.REQUIRED_FIELD })}
          >
            <option value="">请选择</option>
            {['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'].map((hour) => (
              <option key={hour} value={hour}>{hour}时</option>
            ))}
          </select>
          {errors.birthHour && (
            <p className="mt-1 text-sm text-red-600">{errors.birthHour.message}</p>
          )}
        </div>
      </div>

      {/* 性别 */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          {FORM_LABELS.GENDER}
        </label>
        <div className="mt-1 space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="男"
              {...register('gender', { required: ERROR_MESSAGES.REQUIRED_FIELD })}
              className="form-radio text-indigo-600"
            />
            <span className="ml-2">男</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="女"
              {...register('gender', { required: ERROR_MESSAGES.REQUIRED_FIELD })}
              className="form-radio text-indigo-600"
            />
            <span className="ml-2">女</span>
          </label>
        </div>
        {errors.gender && (
          <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>
        )}
      </div>

      {/* 关注重点 */}
      <div>
        <label htmlFor="focus" className="block text-sm font-medium text-gray-700">
          关注重点
        </label>
        <select
          id="focus"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          {...register('focus', { required: ERROR_MESSAGES.REQUIRED_FIELD })}
        >
          <option value="">请选择</option>
          <option value="事业">事业</option>
          <option value="财运">财运</option>
          <option value="姻缘">姻缘</option>
          <option value="学业">学业</option>
          <option value="健康">健康</option>
        </select>
        {errors.focus && (
          <p className="mt-1 text-sm text-red-600">{errors.focus.message}</p>
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

export default ZiWeiDouShuForm; 