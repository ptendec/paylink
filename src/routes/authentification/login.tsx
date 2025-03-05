import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Button, Card, Form, Input, message } from 'antd';
import { useState } from 'react';

import { generateQrCode } from 'api/auth';
import { useLogin } from 'hooks/useLogin';
import { OTPModal } from 'UI/Modal/OTP';
import { QRModal } from 'UI/Modal/QR';
import { isUnifiedError } from 'utils/isUnifiedError';

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
  const [qr, setQr] = useState<string>();

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
      if (!tempToken) return;
      try {
        const result = await generateQrCode({
          tempToken,
        });
        setQr(result.totpQrCodeUrl);
        setIsQrModalOpen(true);
      } catch (error) {
        if (isUnifiedError(error)) {
          message.error(error.message);
        }
      }
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
        qr={qr}
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
