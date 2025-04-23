import { message } from 'antd';

export const useNotification = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const showSuccess = (content: string) => {
    messageApi.open({
      type: 'success',
      content: content,
      duration: 3,
      style: { marginTop: '60px' }
    });
  };

  const showError = (content: string) => {
    messageApi.open({
      type: 'error',
      content: content,
      duration: 3,
      style: { marginTop: '60px' }
    });
  };

  return { contextHolder, showSuccess, showError };
};