import { useNavigate } from '@tanstack/react-router';
import { Input, message, Modal } from 'antd';
import { setupTwoFactor } from 'api/auth';
import React, { useCallback, useEffect, useState } from 'react';
import { useAuthStore } from 'store/auth';
import { isUnifiedError } from 'utils/isUnifiedError';

interface Props {
  isOpen: boolean;
  setOpen: (flag: boolean) => void;
}

export const OTPModal: React.FC<Props> = ({ isOpen, setOpen }) => {
  const { setAuthenticated, setTempToken, tempToken } = useAuthStore();
  const navigate = useNavigate();
  const [value, setValue] = useState('');

  const verifySecondStep = useCallback(async () => {
    try {
      if (!tempToken) return;
      const response = await setupTwoFactor({ tempToken, totpCode: value });
      // В теле ответа указан refresh token. В идеале, его передать в cookies с httpOnly=true и потом обновлять access token при его истечении
      if (response.token) {
        setAuthenticated(true);
        message.success('2FA setup successful');
        localStorage.setItem('accessToken', response.token);
        navigate({ to: '/trusted-devices' });
      }
    } catch (error) {
      if (isUnifiedError(error)) message.error(error.message);
    } finally {
      setTempToken();
      setOpen(false);
      setValue('');
    }
  }, [tempToken, value, setAuthenticated, navigate, setTempToken, setOpen]);

  useEffect(() => {
    if (value.length !== 6) return;
    verifySecondStep();
  }, [value, verifySecondStep]);

  return (
    <Modal
      closable
      destroyOnClose
      title="OTP"
      width={500}
      open={isOpen}
      onClose={() => setOpen(false)}
      footer={null}
      onCancel={() => setOpen(false)}
    >
      <Input.OTP
        inputMode="numeric"
        value={value}
        length={6}
        onChange={setValue}
        style={{
          width: '450px',
        }}
      />
    </Modal>
  );
};
