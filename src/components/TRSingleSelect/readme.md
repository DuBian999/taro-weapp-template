import React, { useState } from 'react';
import { View, Text } from '@tarojs/components';
import NutSelect from '@/components/TRMultiSelect';
import styles from './index.module.scss';

const Index: React.FC = () => {
const [selectedValues1, setSelectedValues1] = useState<string[]>(['apple']);
const [selectedValues2, setSelectedValues2] = useState<string[]>([]);

const fruitOptions = [
{ value: 'apple', label: '苹果苹果' },
{ value: 'banana', label: '香蕉', disabled: true },
{ value: 'orange', label: '橙子' },
{ value: 'pear', label: '梨', disabled: true },
{ value: 'grape', label: '葡萄' },
{ value: 'watermelon', label: '西瓜', disabled: true },
{ value: 'strawberry', label: '草莓' },
{ value: 'pineapple', label: '菠萝', disabled: true },
{ value: 'mango', label: '芒果' },
{ value: 'peach', label: '桃子', disabled: true },
];

const colorOptions = [
{ value: 'red', label: '红色' },
{ value: 'blue', label: '蓝色' },
{ value: 'green', label: '绿色' },
{ value: 'yellow', label: '黄色' },
{ value: 'purple', label: '紫色' },
];

return (
<View className={styles.container}>
<Text className={styles.title}>NutUI 多选组件示例</Text>

      <View className={styles.card}>
        <Text className={styles.label}>水果选择（带默认值）</Text>
        <NutSelect
          options={fruitOptions}
          defaultValue={selectedValues1}
          onChange={setSelectedValues1}
          placeholder='请选择水果'
        />
        <Text className={styles.value}>
          已选: {selectedValues1.map((v) => fruitOptions.find((o) => o.value === v)?.label).join(', ')}
        </Text>
      </View>

      <View className={styles.card}>
        <Text className={styles.label}>颜色选择</Text>
        <NutSelect
          options={colorOptions}
          defaultValue={selectedValues2}
          onChange={setSelectedValues2}
          placeholder='请选择颜色'
        />
        <Text className={styles.value}>
          已选:{' '}
          {selectedValues2.length > 0
            ? selectedValues2.map((v) => colorOptions.find((o) => o.value === v)?.label).join(', ')
            : '无'}
        </Text>
      </View>

      <View className={styles.card}>
        <Text className={styles.label}>禁用状态示例</Text>
        <NutSelect
          options={fruitOptions}
          defaultValue={[]}
          placeholder='禁用状态'
          style={{ opacity: 0.6 }}
        />
      </View>
    </View>

);
};

export default Index;
