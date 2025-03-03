import { UnifiedError } from 'api/auth/types';

export const isUnifiedError = (error: unknown): error is UnifiedError => {
  return typeof error === 'object' && error !== null && 'message' in error;
};
