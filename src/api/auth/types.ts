export interface LoginResponse {
  tempToken?: string;
  token?: string;
  twoFactorSetupRequired?: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface QRRequest {
  tempToken: string;
}

export interface QRResponse {
  totpQrCodeUrl: string;
}

export interface UnifiedError {
  message: string;
  status: number;
  error: string;
}

export interface TwoFactorRequest {
  totpCode: string;
  tempToken: string;
}

export interface TwoFactorSetUpResponse {
  token: string;
  refreshToken: string;
}

export interface TwoFactorVerifyResponse {
  token: string;
  refreshToken: string;
}
