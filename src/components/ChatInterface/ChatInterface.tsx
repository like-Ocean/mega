import { useState } from 'react';
import { Card } from 'antd';
import { AppLayout } from '@/components/AppLayout';
import { MessageInputForm } from '../forms/MessageInputForm';
import { generateBpmn } from '@/api/bpmn';
import { useDiagramStore } from '@/store/diagram/useDiagramStore';
import { useChatStore } from '@/store/chat/useChatStore';
import { ChatMessages } from '@/components/ChatMessages';
import { BpmnDiagram } from '../BpmnDiagram';
import { useNotification } from '@/components/NotificationBanner';

export const ChatInterface = () => {
    const { contextHolder, showSuccess, showError } = useNotification();
    const [inputText, setInputText] = useState('');
    const { messages, addMessage, updateMessage } = useChatStore();
    const { diagram: diagramData, isLoading } = useDiagramStore();
    const { setDiagram } = useDiagramStore();

    const handleSend = async () => {
        if (!inputText.trim()) return;

        const messageId = `msg-${Date.now()}`;
        const currentInput = inputText;

        setInputText('');

        addMessage({
            id: messageId,
            text: currentInput,
            isUser: true,
            timestamp: new Date(),
            status: 'pending',
        });

        try {
            const { data, error } = await generateBpmn(currentInput);

            if (error) throw new Error(error);

            setDiagram(data!);
            showSuccess('Диаграмма успешно сгенерирована');
            updateMessage(messageId, {
                status: 'success',
            });
        } catch (error) {
            showError('Ошибка генерации: ' + (error || 'Неизвестная ошибка'));
            updateMessage(messageId, {
                status: 'error',
            });
        } finally {
            setInputText((prev) => (prev.trim() ? '' : prev));
        }
    };

    return (
        <AppLayout
            headerContent={
                <div style={{ fontSize: '16px', fontWeight: 'bold' }}>BPMN Генератор</div>
            }
            content={
                <Card style={{ height: '100%', minHeight: 'calc(100vh - 96px)' }}>
                    <BpmnDiagram data={diagramData} />
                </Card>
            }
            siderContent={
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

                        <MessageInputForm
                            value={inputText}
                            onChange={setInputText}
                            onSend={handleSend}
                            isLoading={isLoading}
                        />
                    </div>
                </Card>
            }
        >
            {contextHolder}
        </AppLayout>
    );
};
