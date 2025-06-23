## 文件上传

前置业务说明：文件上传使用了 OSS 上传。目前小程序上不能使用 ali-oss sdk,所以上传文件后，后续进入界面进行文件预览需要使用后端提供的接口传递 fileKey 获取零时访问路径进行预览。目前小程序上传递给后端的数据与 PC 端保持一致。由于业务需要，上传时对图片文件进行了压缩。

### UploadData [表单提交时,提交给后端的数据]

| 属性名   | 类型   | 必填 | 说明                                                  |
| -------- | ------ | ---- | ----------------------------------------------------- |
| fileKey  | string | 是   | 上传至 OSS 的文件 key                                 |
| fileMd5  | string | 是   | 上传至 OSS 的文件唯一 ID                              |
| fileName | string | 是   | 上传至 OSS 的文件名                                   |
| fileSize | string | 否   | 文件大小,Nut-UI Upload 组件暂未返回 size，固定传递 '' |
| fileType | string | 是   | 文件类型                                              |

## 组件使用说明

### HTUpload Props 组件接收属性

| 属性名      | 类型                 | 必填 | 说明                                                                                                                           |
| ----------- | -------------------- | ---- | ------------------------------------------------------------------------------------------------------------------------------ |
| uploadProps | string               | 是   | Nut-UI upload 组件接受的属性，详细见 nut-ui upload 组件文件文档: https://nutui.jd.com/taro/react/2x/#/zh-CN/component/uploader |
| value       | string               | 否   | 初始值                                                                                                                         |
| onChange    | (value:string)=>void | 否   | 上传文件变化回调，value 值为组装好的 UploadData 类型数据                                                                       |

## 组件使用示例

### index.form.tsx --用与 form-表单

```
<HTUpload
    formItemProps={{
        label: '客户确认证明',
        name: 'enterpriseUrlList',
        rules: [{ required: true, message: '请上传图片' }],
    }}
    uploadProps={{
        deletable: !disabled,
        mediaType: ['image'],
        maxCount: 1,
    }}
/>
```

### index.controled.tsx --用与非表单项

```
<HTUpload
    value={item[el.name]}
    uploadProps={{
        deletable: !disabled,
        disabled: disabled,
        mediaType: ['image'],
        maxCount: 1,
    }}
    onChange={(v) => {
        selectSampleArr[index][el.name] = v;
        form?.setFieldValue('dataResult', update(selectSampleArr, { [index]: { [el.name]: { $set: v } } }),);
        }}
    />
```
