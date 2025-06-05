import usePortal from '@/hooks/usePortal';
import { DatePicker, PickerOption, TaroPopupProps } from '@nutui/nutui-react-taro';
import dayjs from 'dayjs';
import { Text, View } from '@tarojs/components';
import { useState } from 'react';
import styles from './index.module.scss';

interface TimeRangeProps {
  /** 表单字段名 */
  name?: string;
  /** 受控值 [开始时间, 结束时间] */
  value?: [string, string];
  /** 值变更回调 */
  onChange?: (value: [string, string]) => void;
  type?: 'date' | 'time' | 'year-month' | 'month-day' | 'datehour' | 'datetime' | 'hour-minutes';
  /** 日期时间格式  */
  format?: string;
  /** 开始时间占位符 */
  startPlaceholder?: string;
  /** 结束时间占位符 */
  endPlaceholder?: string;
  /** 最小可选日期 */
  minDate?: Date;
  /** 最大可选日期 */
  maxDate?: Date;
}

const formatter = (type: string, option: PickerOption) => {
  switch (type) {
    case 'year':
      option.label += '年';
      break;
    case 'month':
      option.label += '月';
      break;
    case 'day':
      option.label += '日';
      break;
    case 'hour':
      option.label += '时';
      break;
    case 'minute':
      option.label += '分';
      break;
    default:
      option.label += '';
  }
  return option;
};

const TRTimeRange = (props: TimeRangeProps) => {
  const {
    format = 'YYYY/MM/DD HH:mm:ss',
    startPlaceholder = '请选择开始时间',
    endPlaceholder = '请选择结束时间',
    minDate = new Date(2000, 0, 1),
    maxDate = new Date(2100, 11, 31),
    type = 'date',
    value = [],
    onChange,
  } = props;

  const { portal } = usePortal();

  const [startVisible, setStartVisible] = useState(false);
  const [endVisible, setEndVisible] = useState(false);

  // 解析开始时间和结束时间
  const [startTime, endTime] = value;

  // 处理开始时间选择
  const handleStartConfirm = (_: unknown, selectedValue: string[]) => {
    const [year, month, day, hour, min] = selectedValue;
    const newStartTime = dayjs(`${year}-${month}-${day} ${hour || 0}:${min || 0}`).format(format);
    const newValue: [string, string] = [newStartTime, ''];
    setStartVisible(false);
    onChange?.(newValue);
  };

  // 处理结束时间选择
  const handleEndConfirm = (_: unknown, selectedValue: string[]) => {
    const [year, month, day, hour, min] = selectedValue;
    const newEndTime = dayjs(`${year}-${month}-${day} ${hour || 0}:${min || 0}`).format(format);
    const newValue: [string, string] = [startTime!, newEndTime];
    setEndVisible(false);
    onChange?.(newValue);
  };

  // 格式化显示时间
  const formatDisplayTime = (time?: string) => {
    return time ? dayjs(time).format(format) : '';
  };

  return (
    <>
      <View className={styles['tr-time-range']}>
        {/* 开始时间选择 */}
        <Text
          style={{
            opacity: startTime ? 1 : 0.5,
          }}
          className={styles['time-picker']}
          onClick={() => setStartVisible(true)}
        >
          {formatDisplayTime(startTime) || startPlaceholder}
        </Text>

        <Text className={styles['separator']}>-</Text>

        {/* 结束时间选择 */}
        <Text
          onClick={() => (startTime ? setEndVisible(true) : null)}
          style={{
            opacity: endTime ? 1 : 0.5,
          }}
          className={styles['time-picker']}
        >
          {formatDisplayTime(endTime) || endPlaceholder}
        </Text>
      </View>

      {/* 开始时间选择器 */}
      <DatePicker
        title='开始时间'
        visible={startVisible}
        startDate={minDate}
        endDate={maxDate}
        pickerProps={{
          popupProps: {
            portal: portal,
          } as TaroPopupProps,
        }}
        value={dayjs(startTime).toDate()}
        onConfirm={handleStartConfirm}
        onCancel={() => setStartVisible(false)}
        type={type}
        formatter={formatter}
      />

      {/* 结束时间选择器 */}
      <DatePicker
        title='结束时间'
        visible={endVisible}
        startDate={startTime ? dayjs(startTime).toDate() : minDate}
        endDate={maxDate}
        pickerProps={{
          popupProps: {
            portal: portal,
          } as TaroPopupProps,
        }}
        value={dayjs(endTime).toDate()}
        onConfirm={handleEndConfirm}
        onCancel={() => setEndVisible(false)}
        type={type}
        formatter={formatter}
      />
    </>
  );
};

export default TRTimeRange;
