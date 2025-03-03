import { useNavigate } from '@tanstack/react-router';
import { message } from 'antd';
import { login } from 'api/auth';
import { LoginRequest, LoginResponse } from 'api/auth/types';
import { useState } from 'react';
import { useAuthStore } from 'store/auth';
import { isUnifiedError } from 'utils/isUnifiedError';

export const useLogin = () => {
  const navigate = useNavigate();
  const { setAuthenticated } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (payload: LoginRequest) => {
    try {
      setIsLoading(true);
      const response: LoginResponse = await login({
        email: payload.email,
        password: payload.password,
      });
      return response;
    } catch (error) {
      if (isUnifiedError(error)) {
        message.error(error.message);
      }
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const onSuccessAuth = async (token: string) => {
    setAuthenticated(true);
    localStorage.setItem('accessToken', token);
    navigate({ to: '/trusted-devices' });
  };

  const onSetTempToken = (tempToken: string) => {
    localStorage.setItem('tempToken', tempToken);
  };

  return {
    isLoading,
    handleLogin,
    onSuccessAuth,
    onSetTempToken,
  };
};
