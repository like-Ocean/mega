import { useState } from 'react';
import { Layout, Card, Input, Button } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { BpmnDiagram } from '../BpmnDiagram/BpmnDiagram';
import { ChatMessages } from '../ChatMessages/ChatMessages';
import { sendUserInput } from '../../api/get_graph';
import { Message, DiagramData } from '../../types/common';

const { Header, Sider, Content } = Layout;

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [diagramData, setDiagramData] = useState<DiagramData | undefined>();

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const transformedData = await sendUserInput(inputText);

      setDiagramData(transformedData);

      const systemMessage: Message = {
        id: `system-${Date.now()}`,
        text: 'Диаграмма успешно сгенерирована на основе вашего описания',
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, systemMessage]);
    } catch (error) {
      console.error('Ошибка API:', error);
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        text: 'Произошла ошибка при генерации диаграммы. Пожалуйста, попробуйте еще раз.',
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f5f5' /* bodyBg from design token */ }}>
      {/* Optional Header */}
      <Header
        style={{
          background: '#001529' /* headerBg from design token */,
          color: '#fff' /* headerColor */,
          height: 64 /* headerHeight */,
          padding: '0 50px' /* headerPadding */,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ fontSize: '16px', fontWeight: 'bold' }}>
          BPMN Генератор
        </div>
      </Header>

      {/* Main Layout with Content and Sider */}
      <Layout style={{ flexDirection: 'row', background: '#f5f5f5' }}>
        <Content style={{ flex: 1 }}>
          <Card style={{ height: '100%', minHeight: 'calc(100vh - 96px)' }}>
            <BpmnDiagram data={diagramData} />
          </Card>
        </Content>

        <Sider
          width={400}
          breakpoint="lg" // Collapse on screens smaller than 992px
          collapsedWidth={0}
          style={{
            background: '#fff' /* lightSiderBg from design token */,
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