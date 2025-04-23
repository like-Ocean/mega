import { List, Avatar } from 'antd';
import { ChatMessage } from '@/types/chat';
import { UserOutlined, LoadingOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';


interface ChatMessagesProps {
    messages: ChatMessage[];
}

export const ChatMessages = ({ messages }: ChatMessagesProps) => {
    return (
      <List
        split={false}
        dataSource={messages}
        renderItem={(msg) => (
          <List.Item style={{ padding: '8px 0' }}>
            <List.Item.Meta
              avatar={
                <Avatar
                  icon={msg.isUser ? <UserOutlined /> : null}
                  style={{ background: msg.isUser ? '#1677ff' : '#f56a00', margin: 10 }}
                />
              }
              title={msg.isUser ? 'Вы' : 'BPMN Ассистент'}
              description={
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {msg.text}
                  {msg.status === 'pending' && <LoadingOutlined spin />}
                  {msg.status === 'success' && <CheckCircleOutlined style={{ color: '#52c41a' }} />}
                  {msg.status === 'error' && <CloseCircleOutlined style={{ color: '#ff4d4f' }} />}
                </div>
              }
              style={{
                flexDirection: msg.isUser ? 'row-reverse' : 'row',
                textAlign: msg.isUser ? 'right' : 'left',
              }}
            />
          </List.Item>
        )}
      />
    );
}  