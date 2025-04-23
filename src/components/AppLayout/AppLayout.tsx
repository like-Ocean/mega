import { Layout } from 'antd';
import React from 'react';

const { Header, Content, Sider } = Layout;

interface AppLayoutProps {
    headerContent?: React.ReactNode;
    content: React.ReactNode;
    siderContent?: React.ReactNode;
    children?: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
    headerContent,
    content,
    siderContent,
    children,
}) => {
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
                {headerContent || (
                    <div style={{ fontSize: '16px', fontWeight: 'bold' }}>BPMN Генератор</div>
                )}
            </Header>

            <Layout style={{ flexDirection: 'row', background: '#f5f5f5' }}>
                <Content style={{ flex: 1 }}>{content}</Content>
                {siderContent && (
                    <Sider
                        width={400}
                        breakpoint="lg"
                        collapsedWidth={0}
                        style={{
                            background: '#fff',
                            paddingLeft: '10px',
                        }}
                    >
                        {siderContent}
                    </Sider>
                )}
            </Layout>

            {children}
        </Layout>
    );
};
