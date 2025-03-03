import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Button, Card, Form, Input } from 'antd';
import { useState } from 'react';

import { useLogin } from 'hooks/useLogin';
import { OTPModal } from 'UI/Modal/OTP';
import { QRModal } from 'UI/Modal/QR';

interface LoginValues {
  email: string;
  password: string;
}

const Component: React.FC = () => {
  const navigate = useNavigate();
  const { isLoading, handleLogin, onSuccessAuth, onSetTempToken } = useLogin();
  const [form] = Form.useForm<LoginValues>();

  const [isOTPModalOpen, setIsOTPModalOpen] = useState(false);
  const [isQRModalOpen, setIsQrModalOpen] = useState(false);

  const onFinish = async ({ email, password }: LoginValues) => {
    const response = await handleLogin({ email, password });
    if (!response) {
      return;
    }

    const { token, tempToken, twoFactorSetupRequired } = response;

    if (token) {
      onSuccessAuth(token);
      return;
    }

    if (twoFactorSetupRequired && tempToken) {
      onSetTempToken(tempToken);
      setIsQrModalOpen(true);
      return;
    }

    if (!twoFactorSetupRequired && tempToken) {
      onSetTempToken(tempToken);
      navigate({ to: '/authentification/verify' });
      return;
    }
  };

  return (
    <>
      <QRModal
        isOpen={isQRModalOpen}
        setOpen={setIsQrModalOpen}
        onScan={() => setIsOTPModalOpen(true)}
      />

      <OTPModal isOpen={isOTPModalOpen} setOpen={setIsOTPModalOpen} />

      <Card title="Login" style={{ maxWidth: 400, margin: '100px auto' }}>
        <Form
          form={form}
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading} block>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export const Route = createFileRoute('/authentification/login')({
  component: Component,
});
