import { List, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { ChatMessage } from '@/types/chat';

interface ChatMessagesProps {
    messages: ChatMessage[];
}

export const ChatMessages = ({ messages }: ChatMessagesProps) => {
    return (
        <div
            style={{
                maxHeight: 'calc(100vh - 260px)',
                overflowY: 'auto',
                padding: '0 10px',
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
