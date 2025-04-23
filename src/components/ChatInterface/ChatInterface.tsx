import { useState } from 'react';
import { Layout, Card, Input, Button } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { generateBpmn } from '@/api/bpmn';
import { useDiagramStore } from '@/store/diagram/useDiagramStore';
import { useChatStore } from '@/store/chat/useChatStore';
import { ChatMessages } from '@/components/ChatMessages';
import { BpmnDiagram } from '../BpmnDiagram';
const { Header, Sider, Content } = Layout;

export const ChatInterface = () => {
    const [inputText, setInputText] = useState('');
    const { messages, addMessage, updateMessage } = useChatStore();
    const { diagram: diagramData, isLoading } = useDiagramStore();
    const { setDiagram } = useDiagramStore();

    const handleSend = async () => {
        if (!inputText.trim()) return;

        const messageId = `msg-${Date.now()}`;
        addMessage({
            id: messageId,
            text: inputText,
            isUser: true,
            timestamp: new Date(),
            status: 'pending',
        });

        try {
            const { data, error } = await generateBpmn(inputText);

            if (error) throw new Error(error);

            setDiagram(data!);

            updateMessage(messageId, {
                status: 'success',
                text: 'Диаграмма успешно сгенерирована',
            });
        } catch (error) {
            updateMessage(messageId, {
                status: 'error',
                text: error instanceof Error ? error.message : 'Ошибка генерации',
            });
        }

        setInputText('');
    };

    return (
        <Layout style={{ minHeight: '100vh', background: '#f5f5f5' }}>
            <Header
                style={{
                    background: '#001529',
                    color: '#fff',
                    height: 64,
                    padding: '0 50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <div style={{ fontSize: '16px', fontWeight: 'bold' }}>BPMN Генератор</div>
            </Header>

            <Layout style={{ flexDirection: 'row', background: '#f5f5f5' }}>
                <Content style={{ flex: 1 }}>
                    <Card style={{ height: '100%', minHeight: 'calc(100vh - 96px)' }}>
                        <BpmnDiagram data={diagramData} />
                    </Card>
                </Content>

                <Sider
                    width={400}
                    breakpoint="lg"
                    collapsedWidth={0}
                    style={{
                        background: '#fff',
                        paddingLeft: '10px',
                    }}
                >
                    <Card title="Чат с ассистентом" style={{ height: '100%' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                            <div
                                style={{
                                    flex: 1,
                                    overflowY: 'auto',
                                    marginBottom: '16px',
                                    border: '1px solid #f0f0f0',
                                    borderRadius: '8px',
                                    padding: '8px',
                                }}
                            >
                                <ChatMessages messages={messages} />
                            </div>

                            <div style={{ display: 'flex', gap: '8px' }}>
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
                                    style={{ flex: 1 }}
                                />
                                <Button
                                    type="primary"
                                    onClick={handleSend}
                                    icon={<SendOutlined />}
                                    loading={isLoading}
                                    style={{ height: 'auto' }}
                                />
                            </div>
                        </div>
                    </Card>
                </Sider>
            </Layout>
        </Layout>
    );
};
