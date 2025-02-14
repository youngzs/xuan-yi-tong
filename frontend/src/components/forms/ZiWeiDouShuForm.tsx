import React from 'react';
import { useForm } from 'react-hook-form';
import { Calendar } from 'lucide-react';
import DateTimePicker from 'react-datetime-picker';
import { FORM_LABELS, ERROR_MESSAGES } from '../../config/prompts';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

interface ZiWeiDouShuFormProps {
  onSubmit: (data: ZiWeiDouShuFormData) => void;
  isLoading: boolean;
}

export interface ZiWeiDouShuFormData {
  birthDateTime: Date;
  gender: string;
  focus: string;
}

const FOCUS_SAMPLES = [
  {
    text: '事业运势',
    detail: '事业'
  },
  {
    text: '财运分析',
    detail: '财运'
  },
  {
    text: '姻缘预测',
    detail: '姻缘'
  },
  {
    text: '学业发展',
    detail: '学业'
  },
  {
    text: '健康状况',
    detail: '健康'
  }
];

const ZiWeiDouShuForm: React.FC<ZiWeiDouShuFormProps> = ({ onSubmit, isLoading }) => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<ZiWeiDouShuFormData>({
    defaultValues: {
      birthDateTime: new Date(),
      gender: '',
      focus: ''
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* 出生日期时间 */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          {FORM_LABELS.BIRTH_TIME}
        </label>
        <div className="mt-1">
          <DateTimePicker
            onChange={(date) => setValue('birthDateTime', date)}
            value={watch('birthDateTime')}
            className="w-full"
            format="y-MM-dd HH:mm"
            disableClock={true}
            calendarIcon={<Calendar className="w-5 h-5" />}
            clearIcon={null}
            maxDetail="minute"
            minDate={new Date('1900-01-01')}
            maxDate={new Date()}
            dayPlaceholder="日"
            monthPlaceholder="月"
            yearPlaceholder="年"
            hourPlaceholder="时"
            minutePlaceholder="分"
          />
        </div>
      </div>

      {/* 性别 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {FORM_LABELS.GENDER}
        </label>
        <div className="flex space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="男"
              {...register('gender', { required: ERROR_MESSAGES.REQUIRED_FIELD })}
              className="form-radio h-4 w-4 text-indigo-600"
            />
            <span className="ml-2">男</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="女"
              {...register('gender', { required: ERROR_MESSAGES.REQUIRED_FIELD })}
              className="form-radio h-4 w-4 text-indigo-600"
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
        <label className="block text-sm font-medium text-gray-700">
          关注重点
        </label>
        <div className="mt-2 flex flex-wrap gap-2 mb-2">
          {FOCUS_SAMPLES.map((sample, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setValue('focus', sample.detail)}
              className="px-3 py-1 text-sm bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-full"
            >
              {sample.text}
            </button>
          ))}
        </div>
        <select
          {...register('focus', { required: ERROR_MESSAGES.REQUIRED_FIELD })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">请选择关注重点</option>
          {FOCUS_SAMPLES.map((sample, index) => (
            <option key={index} value={sample.detail}>
              {sample.text}
            </option>
          ))}
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