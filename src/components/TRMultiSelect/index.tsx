import { ArrowDown, ArrowUp, Close, IconFont } from '@nutui/icons-react-taro';
import { Button, Checkbox, CheckboxGroup, Input, Popup, Tag } from '@nutui/nutui-react-taro';
import { ITouchEvent, ScrollView, Text, View } from '@tarojs/components';
import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';

interface Option {
  value: string | number;
  label: string;
  disabled?: boolean;
}

interface NutSelectProps {
  options: Option[];
  value?: string[];
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value: string[]) => void;
  style?: React.CSSProperties;
  className?: string;
}

const TRMultiSelect: React.FC<NutSelectProps> = (props) => {
  const { options, value = [], placeholder = '请选择', onChange, style, className, disabled } = props;

  const [visible, setVisible] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>(value);
  const [tempSelectedValues, setTempSelectedValues] = useState<string[]>(value);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    if (visible) {
      setTempSelectedValues(selectedValues);
      setSearchValue('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]); // 只依赖 visible

  // 同步默认值变化到最终选中值
  useEffect(() => {
    setSelectedValues(value);
  }, [value]);

  // 过滤选项（带搜索功能）
  const filteredOptions = options.filter((option) => option.label.toLowerCase().includes(searchValue.toLowerCase()));

  // 处理临时选中状态变化
  const handleTempChange = (values: string[]) => {
    setTempSelectedValues(values);
  };

  // 移除单个标签（仅移除最终选中的值）
  const removeTag = (item: string | number, e: ITouchEvent) => {
    e.stopPropagation();
    const newValues = selectedValues.filter((v) => v !== item);
    setSelectedValues(newValues);
    onChange?.(newValues);
  };

  // 获取已选中的标签文本（基于最终选中的值）
  const selectedLabels = selectedValues.map((item) => {
    const option = options.find((opt) => opt.value === item);
    return option?.label || '';
  });

  // 清除所有选择（仅清除最终选中的值）
  const clearAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedValues([]);
    onChange?.([]);
  };

  // 处理确认操作
  const handleConfirm = () => {
    setSelectedValues(tempSelectedValues);
    onChange?.(tempSelectedValues);
    setVisible(false);
  };

  // 处理取消操作
  const handleCancel = () => {
    setVisible(false);
  };

  // 处理弹窗内清除操作
  const handleClear = () => {
    setTempSelectedValues([]);
  };

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
        {selectedLabels.length > 0 ? (
          <View className={styles.selectedTags}>
            {selectedLabels.map((label, index) => (
              <Tag
                key={selectedValues[index]}
                closeable
                onClose={(e) => removeTag(selectedValues[index], e)}
                className={styles.tag}
              >
                {label}
              </Tag>
            ))}
          </View>
        ) : (
          <Text className={styles.placeholder}>{placeholder}</Text>
        )}

        <View className={styles.actions}>
          {selectedLabels.length > 0 && !disabled && (
            <Close
              size={12}
              onClick={clearAll}
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
        onClose={handleCancel}
        lockScroll
        className={styles.popup}
        destroyOnClose
      >
        {/* 搜索框 */}
        <View className={styles.searchBox}>
          <Input
            placeholder='搜索选项'
            value={searchValue}
            onChange={(e) => setSearchValue(e)}
            className={styles.searchInput}
          />
        </View>

        <ScrollView
          className={styles.popupContent}
          scrollY
          scrollWithAnimation
        >
          {/* 选项列表 */}
          {filteredOptions.length > 0 ? (
            <CheckboxGroup
              value={tempSelectedValues}
              onChange={handleTempChange}
              className={styles.checkboxGroup}
            >
              {filteredOptions.map((option) => (
                <Checkbox
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                  className={styles.option}
                >
                  {option.label}
                </Checkbox>
              ))}
            </CheckboxGroup>
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

        {/* 底部操作按钮 */}
        <View className={styles.footer}>
          <Button
            onClick={handleClear}
            className={styles.footerBtn}
            plain
          >
            清除
          </Button>
          <Button
            onClick={handleCancel}
            className={styles.footerBtn}
            plain
          >
            取消
          </Button>
          <Button
            onClick={handleConfirm}
            type='primary'
            className={styles.footerBtn}
          >
            确定
          </Button>
        </View>
      </Popup>
    </View>
  );
};

export default TRMultiSelect;
