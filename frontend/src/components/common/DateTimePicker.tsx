import React from 'react';
import { FORM_LABELS, ERROR_MESSAGES } from '../../config/prompts';

interface DateTimePickerProps {
  register: any;
  errors: any;
  defaultYear?: number;
  defaultMonth?: number;
  defaultDay?: number;
  defaultHour?: string;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  register,
  errors,
  defaultYear = 1990,
  defaultMonth = new Date().getMonth() + 1,
  defaultDay = new Date().getDate(),
  defaultHour = '子'
}) => {
  const hours = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label htmlFor="birthYear" className="block text-sm font-medium text-gray-700">
          {FORM_LABELS.BIRTH_YEAR}
        </label>
        <input
          type="number"
          id="birthYear"
          defaultValue={defaultYear}
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
          defaultValue={defaultMonth}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          {...register('birthMonth', { required: ERROR_MESSAGES.REQUIRED_FIELD })}
        >
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
          defaultValue={defaultDay}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          {...register('birthDay', { required: ERROR_MESSAGES.REQUIRED_FIELD })}
        >
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
          defaultValue={defaultHour}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          {...register('birthHour', { required: ERROR_MESSAGES.REQUIRED_FIELD })}
        >
          {hours.map((hour) => (
            <option key={hour} value={hour}>{hour}时</option>
          ))}
        </select>
        {errors.birthHour && (
          <p className="mt-1 text-sm text-red-600">{errors.birthHour.message}</p>
        )}
      </div>
    </div>
  );
};

export default DateTimePicker; 