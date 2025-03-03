import { Link, useNavigate } from '@tanstack/react-router';
import { Layout as AntLayout, Button, message, Typography } from 'antd';
import React from 'react';
import { useAuthStore } from 'store/auth';

const { Header, Content } = AntLayout;

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const { logout, isAuthenticated } = useAuthStore();

  const handleLogout = () => {
    logout();
    message.success('Logged out');
    navigate({ to: '/authentification/login' });
  };

  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/">
            <Typography.Title level={4} style={{ color: 'white', margin: 0 }}>
              Paylink
            </Typography.Title>
          </Link>
        </div>
        <Link to="/trusted-devices">Trusted devices</Link>
        {isAuthenticated ? (
          <Button type="primary" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <Link to="/authentification/login">Login</Link>
        )}
      </Header>
      <Content style={{ padding: '24px', background: '#f0f2f5' }}>
        {children}
      </Content>
    </AntLayout>
  );
};
