import { List, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Message } from '../../types/common';

interface ChatMessagesProps {
  messages: Message[];
}

export const ChatMessages = ({ messages }: ChatMessagesProps) => {
  return (
    <div
      style={{
        maxHeight: 'calc(100vh - 260px)', // Ограничиваем высоту, оставляя место для других элементов (например, шапки или ввода)
        overflowY: 'auto', // Включаем вертикальную прокрутку
        padding: '0 10px', // Отступы для удобства
      }}
    >
      <List
        split={false}
        dataSource={messages}
        renderItem={(msg) => (
          <List.Item style={{ padding: '8px 0' }}>
            <List.Item.Meta
              avatar={
                <Avatar
                  icon={msg.isUser ? <UserOutlined /> : null}
                  style={{
                    background: msg.isUser ? '#1677ff' : '#f56a00',
                    margin: 10,
                  }}
                />
              }
              title={msg.isUser ? 'Вы' : 'BPMN Ассистент'}
              description={msg.text}
              style={{
                flexDirection: msg.isUser ? 'row-reverse' : 'row',
                textAlign: msg.isUser ? 'right' : 'left',
              }}
            />
          </List.Item>
        )}
      />
    </div>
  );
};