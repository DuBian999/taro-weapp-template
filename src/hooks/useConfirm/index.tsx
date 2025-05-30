import { Dialog } from '@nutui/nutui-react-taro';

const useConfirm = () => {
  const DialogContext = <Dialog id='confirm-dialog' />;

  const closeDialog = () => {
    Dialog.close('confirm-dialog');
  };

  const openDialog = (
    type: 'confirm' | 'delete' | 'discard',
    onConfirm: () => void | Promise<void> // 支持同步和异步函数
  ) => {
    const contentMap = {
      confirm: '确认提交后，数据将不可修改',
      delete: '确认删除后，数据将无法找回，请谨慎操作',
      discard: '确认废弃后，数据将失效,请谨慎操作',
    };

    Dialog.open('confirm-dialog', {
      title: '提示',
      content: contentMap[type],
      onCancel: closeDialog,
      onConfirm: async () => {
        // 处理同步和异步函数
        const result = onConfirm();
        // 如果是 Promise，等待完成
        if (result instanceof Promise) {
          await result;
        }
        closeDialog();
      },
    });
  };

  return {
    DialogContext,
    closeDialog,
    openDialog,
  };
};

export default useConfirm;
