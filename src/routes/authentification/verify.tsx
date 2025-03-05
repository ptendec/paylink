import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Button, Card, Form, Input, message } from 'antd';
import { verifyTwoFactor } from 'api/auth';
import React, { useState } from 'react';
import { useAuthStore } from 'store/auth';
import { isUnifiedError } from 'utils/isUnifiedError';

const Component: React.FC = () => {
  const navigate = useNavigate();
  const { setAuthenticated, tempToken } = useAuthStore();
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = async (values: { code: string }) => {
    if (!tempToken) return;
    try {
      setLoading(true);
      const response = await verifyTwoFactor({
        tempToken,
        totpCode: values.code,
      });
      if (response.token) {
        setAuthenticated(true);
        message.success('2FA verification successful');
        localStorage.setItem('accessToken', response.token);
        navigate({ to: '/trusted-devices' });
      }
    } catch (error) {
      if (isUnifiedError(error)) message.error(error.message);
      navigate({ to: '/authentification/login' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card
        title="Verify Two-Factor Authentication"
        style={{ maxWidth: 400, margin: '100px auto' }}
      >
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <p>Enter the code from your authenticator app</p>
          <p style={{ marginTop: 10 }}>
            For testing purposes, use code: 123456
          </p>
        </div>

        <Form name="verify2fa" onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Authentication Code"
            name="code"
            rules={[
              {
                required: true,
                message: 'Please input the code from your authenticator app!',
              },
            ]}
          >
            <Input placeholder="Enter 6-digit code" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Verify
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export const Route = createFileRoute('/authentification/verify')({
  component: Component,
});
