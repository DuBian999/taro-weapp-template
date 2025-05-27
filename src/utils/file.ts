/*
 * @Description: 处理文件流
 * @Author:
 * @Date:
 */

import { env, FileSystemManager, getFileSystemManager } from '@tarojs/taro';

interface IFile {
  fileName: string;
  filePath: string;
}

// 公共工具函数
const FileUtils = {
  // 生成带时间戳的文件名
  generateFileName: (baseName: string, ext: string) => {
    return `${baseName}_${new Date().getTime()}.${ext}`;
  },

  // 获取文件系统管理器
  getFS: () => getFileSystemManager(),

  // 获取用户存储路径
  getUserPath: () => env.USER_DATA_PATH,

  // 通用文件写入方法
  writeFileToStorage: async (
    data: string | ArrayBuffer,
    fileName: string
  ): Promise<IFile> => {
    const fs = FileUtils.getFS();
    const filePath = `${FileUtils.getUserPath()}/${fileName}`;

    await new Promise((resolve, reject) => {
      fs.writeFile({
        filePath,
        data,
        encoding: 'binary',
        success: () => resolve(filePath),
        fail: (error) => reject(error),
      });
    });

    return { filePath, fileName };
  },

  writeZipAndUnzip: async (
    fileData: string | ArrayBuffer,
    documentName: string
  ): Promise<IFile[]> => {
    const fs = FileUtils.getFS();

    // 1. 写入压缩包
    const zipFileName = FileUtils.generateFileName(documentName, 'zip');
    const { filePath: zipFilePath } = await FileUtils.writeFileToStorage(
      fileData,
      zipFileName
    );

    // 2. 准备解压目录
    const zipDirName = FileUtils.generateFileName(documentName + '_unzip', '');
    const zipDirPath = `${FileUtils.getUserPath()}/${zipDirName}`;

    // 3. 执行解压
    await new Promise((resolve, reject) => {
      fs.unzip({
        zipFilePath,
        targetPath: zipDirPath,
        success: resolve,
        fail: reject,
      });
    });

    // 4. 读取解压目录
    const { files } =
      await new Promise<FileSystemManager.ReaddirSuccessCallbackResult>(
        (resolve, reject) => {
          fs.readdir({
            dirPath: zipDirPath,
            success: resolve,
            fail: reject,
          });
        }
      );

    return files.map((filename) => ({
      fileName: filename,
      filePath: `${zipDirPath}/${filename}`,
    }));
  },
};

export default FileUtils;
