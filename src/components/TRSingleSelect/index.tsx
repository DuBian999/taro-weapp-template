import { ArrowDown, ArrowUp, Close, IconFont } from '@nutui/icons-react-taro';
import { Input, Popup, Radio, RadioGroup, Tag } from '@nutui/nutui-react-taro';
import { ScrollView, Text, View } from '@tarojs/components';
import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';

import type { SimpleValue } from '@nutui/nutui-react-taro';

interface Option {
  value: SimpleValue;
  label: string;
  disabled?: boolean;
}

interface NutRadioSelectProps {
  options: Option[];
  value?: SimpleValue;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value?: SimpleValue) => void;
  style?: React.CSSProperties;
  className?: string;
}

const TRSingleSelect: React.FC<NutRadioSelectProps> = (props) => {
  const { options, value = null, placeholder = '请选择', onChange, style, className, disabled } = props;

  const [visible, setVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState<SimpleValue | undefined>();
  const [tempSelectedValue, setTempSelectedValue] = useState<SimpleValue>();
  const [searchValue, setSearchValue] = useState('');

  // 只在弹窗打开时初始化临时状态
  useEffect(() => {
    if (visible) {
      setTempSelectedValue(selectedValue);
      setSearchValue('');
    }
  }, [visible]);

  // 同步外部值变化
  useEffect(() => {
    setSelectedValue(value as SimpleValue);
  }, [value]);

  // 过滤选项（带搜索功能）
  const filteredOptions = options.filter((option) => option.label.toLowerCase().includes(searchValue.toLowerCase()));

  // 处理单选选择
  const handleRadioChange = (val: string | number) => {
    console.log(val, '123123');

    setTempSelectedValue(val);
    setSelectedValue(val);
    onChange?.(val);
    setVisible(false); // 选择后立即关闭弹窗
  };

  // 清除选择
  const clearSelection = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedValue(undefined);
    onChange?.();
  };

  // 获取当前选中的标签文本
  const selectedLabel = selectedValue ? options.find((opt) => opt.value === selectedValue)?.label || '' : '';

  return (
    <View
      className={`${styles.container} ${className}`}
      style={style}
    >
      {/* 触发区域 */}
      <View
        className={`${styles.trigger} ${visible ? styles.active : ''} ${disabled ? styles.disabled : ''}`}
        onClick={() => {
          if (disabled) return;
          setVisible(true);
        }}
      >
        {selectedValue ? (
          <View className={styles.selectedTag}>
            <Tag className={styles.tag}>{selectedLabel}</Tag>
          </View>
        ) : (
          <Text className={styles.placeholder}>{placeholder}</Text>
        )}

        <View className={styles.actions}>
          {selectedValue && !disabled && (
            <Close
              size={12}
              onClick={clearSelection}
              className={styles.clearIcon}
            />
          )}
          {!disabled && (visible ? <ArrowUp size={12} /> : <ArrowDown size={12} />)}
        </View>
      </View>

      {/* 下拉浮层 */}
      <Popup
        visible={visible}
        position='bottom'
        onClose={() => setVisible(false)}
        lockScroll
        className={styles.popup}
      >
        {/* 搜索框 */}
        <View className={styles.searchBox}>
          <Input
            placeholder='搜索选项'
            value={searchValue}
            onChange={(e) => setSearchValue(e)}
            className={styles.searchInput}
            focus={visible}
          />
        </View>

        <ScrollView
          className={styles.popupContent}
          scrollY
          scrollWithAnimation
        >
          {/* 选项列表 */}
          {filteredOptions.length > 0 ? (
            <RadioGroup
              value={tempSelectedValue as SimpleValue}
              className={styles.radioGroup}
              onChange={(value) => handleRadioChange(value)}
            >
              {filteredOptions.map((option) => (
                <Radio
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                  className={styles.option}
                >
                  {option.label}
                </Radio>
              ))}
            </RadioGroup>
          ) : (
            <View className={styles.empty}>
              <IconFont
                name='search'
                size={16}
              />
              <Text className={styles.emptyText}>无匹配选项</Text>
            </View>
          )}
        </ScrollView>
      </Popup>
    </View>
  );
};

export default TRSingleSelect;
