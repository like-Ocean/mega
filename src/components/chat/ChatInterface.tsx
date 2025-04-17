import { useState } from 'react';
import { Input, Button, List, Avatar, Flex } from 'antd';
import { SendOutlined, UserOutlined } from '@ant-design/icons';

type Message = {
    id: string;
    text: string;
    isUser: boolean;
    timestamp: Date;
};

export const ChatInterface = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSend = async () => {
        if (!inputText.trim()) return;

        const userMessage: Message = {
            id: `user-${Date.now()}`,
            text: inputText,
            isUser: true,
            timestamp: new Date(),
        };

        const systemMessage: Message = {
            id: `system-${Date.now()}`,
            text: 'Диаграмма обновлена: ' + inputText,
            isUser: false,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputText('');
        setIsLoading(true);

        setTimeout(() => {
            setMessages((prev) => [...prev, systemMessage]);
            setIsLoading(false);
        }, 1000);
    };

    return (
        <Flex vertical gap={8} style={{ height: '100%' }}>
            <div
                style={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: '16px',
                    border: '1px solid #f0f0f0',
                    borderRadius: '8px',
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

            <Flex gap={8} style={{ padding: '16px 0' }}>
                <Input.TextArea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Опишите бизнес-процесс..."
                    autoSize={{ minRows: 2, maxRows: 4 }}
                    onPressEnter={(e) => {
                        if (!e.shiftKey) {
                            e.preventDefault();
                            handleSend();
                        }
                    }}
                />
                <Button
                    type="primary"
                    onClick={handleSend}
                    icon={<SendOutlined />}
                    loading={isLoading}
                    style={{ height: 'auto', width: 100 }}
                />
            </Flex>
        </Flex>
    );
};
