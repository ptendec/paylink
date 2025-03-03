import { _fetch } from 'api';
import {
  LoginRequest,
  LoginResponse,
  QRRequest,
  QRResponse,
  TwoFactorRequest,
  TwoFactorSetUpResponse,
  TwoFactorVerifyResponse,
} from './types';

const ENDPOINT_URL = '/api/v1/front-office/auth';

export const login = ({
  email,
  password,
}: LoginRequest): Promise<LoginResponse> => {
  return _fetch(`${ENDPOINT_URL}`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
};

export const generateQrCode = async (body: QRRequest): Promise<QRResponse> => {
  return _fetch(`${ENDPOINT_URL}/two-factor/generate-qr-code`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
};

export const setupTwoFactor = async (
  body: TwoFactorRequest,
): Promise<TwoFactorSetUpResponse> => {
  return _fetch(`${ENDPOINT_URL}/two-factor/set-up`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
};

export const verifyTwoFactor = async (
  body: TwoFactorRequest,
): Promise<TwoFactorVerifyResponse> => {
  return _fetch(`${ENDPOINT_URL}/two-factor/verify`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
};
