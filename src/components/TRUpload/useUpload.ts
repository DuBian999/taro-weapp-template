import useOssConfig from '@/hooks/useOssConfig';
import { pageToLogin } from '@/utils/common';
import Taro from '@tarojs/taro';
import type { FileItem } from './index.type';

const useUpload = () => {
  const ossConfig = useOssConfig();

  // 生成UUID
  const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  // 文件超出大小
  const onOversize = () => {
    Taro.showModal({
      title: '提示',
      content: '超出文件限制上传大小限制',
    });
  };

  // 图片压缩函数
  const compressImage = (path: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      Taro.compressImage({
        src: path, // 原图片路径
        quality: 60, // 压缩质量，范围 0-100
        success: (res) => {
          resolve(res.tempFilePath); // 返回压缩后的图片路径
        },
        fail: (err) => {
          reject(err);
        },
      });
    });
  };

  // 获取图片大小
  const getImageSize = (path: string): Promise<number> => {
    return new Promise((resolve) => {
      Taro.getFileSystemManager().getFileInfo({
        filePath: path, // 图片路径
        success: ({ size }) => {
          resolve(size / 1024 / 1024);
        },
      });
    });
  };

  // 文件上传前处理,图片文件压缩
  const beforeUpload = async (
    files: Taro.chooseImage.ImageFile[] | Taro.chooseMedia.ChooseMedia[] | any
  ): Promise<File[] | boolean> => {
    const newFileList = await Promise.all(
      files.map(async (item: { fileType: string; tempFilePath: string }) => {
        if (item.fileType === 'image') {
          const compressedPath = await compressImage(item.tempFilePath);
          const size = await getImageSize(compressedPath);
          return {
            ...item,
            size,
            tempFilePath: compressedPath, // 替换为压缩后的路径
          };
        }
        return item;
      })
    );
    return newFileList;
  };

  // 自定义文件上传
  const beforeXhrUpload = (taroUploadFile: any, options: any) => {
    // 文件名
    const name = options.taroFilePath.substring(options.taroFilePath.lastIndexOf('/') + 1);
    // uuid
    const uid = generateUUID();
    // 自定义文件路径
    const fileKey = `weChat/${uid}_${name}`;

    taroUploadFile({
      url: process.env.TARO_APP_OSS_URL,
      filePath: options.taroFilePath,
      header: {
        'content-type': 'multipart/form-data',
        Authorization: Taro.getStorageSync('Authorization'),
      },
      name: 'file',
      formData: {
        key: fileKey,
        ...ossConfig,
      },

      success(response: { statusCode: number; data: string }) {
        const successObj = {
          fileKey: fileKey,
          fileMd5: uid,
          fileName: fileKey,
          fileSize: '',
          fileType: options.fileType,
        };
        if (options.xhrState === response.statusCode) {
          options.onSuccess?.(successObj, options);
        } else {
          options.onFailure?.(response, options);
        }
      },
      fail() {
        Taro.showToast({ title: '登录状态已过期,请重新登录', mask: true });
        setTimeout(() => {
          pageToLogin();
        }, 2000);
      },
    });
  };

  // 点击fileList-预览大图
  const onFileItemClick = (file: FileItem) => {
    const urls = file.responseText ? [file.path!] : [file.url!];
    const current = file.responseText ? file.path! : file.url!;
    Taro.previewImage({
      urls,
      current,
    });
  };

  return { onOversize, beforeUpload, beforeXhrUpload, onFileItemClick };
};

export default useUpload;
