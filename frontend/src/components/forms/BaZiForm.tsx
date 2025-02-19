import React from 'react';
import { useForm } from 'react-hook-form';
import { Calendar } from 'lucide-react';
import DateTimePicker from 'react-datetime-picker';
import type { DateTimePickerProps } from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

interface BaZiFormData {
  birthDateTime: Date;
  gender: 'male' | 'female';
  birthLocation: string;
  focus?: string;
}

interface BaZiFormProps {
  onSubmit: (data: BaZiFormData) => void;
  isLoading: boolean;
}

const QUESTION_SAMPLES = [
  {
    text: '近期事业发展方向',
    detail: '想了解今年的事业机会和发展方向，以及适合从事的行业。'
  },
  {
    text: '感情婚姻走势',
    detail: '想了解感情发展趋势，桃花运势，以及婚姻时机。'
  },
  {
    text: '财运和投资机会',
    detail: '想了解近期财运，以及投资理财的机会和风险。'
  },
  {
    text: '健康状况预警',
    detail: '想了解需要注意的健康问题，以及养生保健建议。'
  }
];

const PRESET_EXAMPLES = [
  {
    label: '90年代男性案例',
    data: {
      birthDateTime: new Date('1990-06-15T13:30:00'),
      gender: 'male' as const,
      birthLocation: '北京市朝阳区'
    }
  },
  {
    label: '80年代女性案例',
    data: {
      birthDateTime: new Date('1985-08-23T09:15:00'),
      gender: 'female' as const,
      birthLocation: '上海市浦东新区'
    }
  },
  {
    label: '70年代男性案例',
    data: {
      birthDateTime: new Date('1978-11-05T22:45:00'),
      gender: 'male' as const,
      birthLocation: '广州市天河区'
    }
  }
];

const BaZiForm: React.FC<BaZiFormProps> = ({ onSubmit, isLoading }) => {
  const { register, handleSubmit, setValue, watch } = useForm<BaZiFormData>({
    defaultValues: {
      birthDateTime: new Date(),
      gender: 'male',
      birthLocation: '',
      focus: ''
    }
  });

  const handleDateChange: DateTimePickerProps['onChange'] = (value) => {
    if (value instanceof Date) {
      setValue('birthDateTime', value);
    }
  };

  const handlePresetClick = (preset: typeof PRESET_EXAMPLES[0]) => {
    setValue('birthDateTime', preset.data.birthDateTime);
    setValue('gender', preset.data.gender);
    setValue('birthLocation', preset.data.birthLocation);
  };

  return (
    <div>
      {/* 预设案例 */}
      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-2">预设案例：</p>
        <div className="flex flex-wrap gap-2">
          {PRESET_EXAMPLES.map((preset, index) => (
            <button
              key={index}
              onClick={() => handlePresetClick(preset)}
              className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            出生日期时间
          </label>
          <div className="mt-1">
            <DateTimePicker
              onChange={handleDateChange}
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">性别</label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                {...register('gender')}
                value="male"
                className="form-radio h-4 w-4 text-indigo-600"
              />
              <span className="ml-2">男</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                {...register('gender')}
                value="female"
                className="form-radio h-4 w-4 text-indigo-600"
              />
              <span className="ml-2">女</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            出生地点
          </label>
          <input
            type="text"
            {...register('birthLocation')}
            placeholder="例如：北京市朝阳区"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            想要了解的重点
          </label>
          <div className="mt-2 flex flex-wrap gap-2 mb-2">
            {QUESTION_SAMPLES.map((sample, index) => (
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
          <textarea
            {...register('focus')}
            placeholder="请输入您想了解的具体问题..."
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            rows={3}
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
          >
            {isLoading ? '分析中...' : '开始分析'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BaZiForm;