import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

const { Header, Content } = Layout;

export const MainLayout = () => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header
                style={{
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    background: '#001529',
                    padding: '0 24px',
                    height: '64px',
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                }}
            >
                <h2>BPMN Генератор</h2>
            </Header>

            <Content style={{ height: 'calc(100vh - 64px)' }}>
                <div
                    style={{
                        background: '#fff',
                        borderRadius: '8px',
                        padding: '24px',
                        height: '100%',
                    }}
                >
                    <Outlet />
                </div>
            </Content>
        </Layout>
    );
};
