import React from 'react';
import { ConfigProvider } from 'antd';
import { UserManagement } from './components/UserManagement';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff',
          borderRadius: 6,
        },
      }}
    >
      <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        <UserManagement />
      </div>
    </ConfigProvider>
  );
}

export default App;