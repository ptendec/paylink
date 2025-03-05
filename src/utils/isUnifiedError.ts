import { UnifiedError } from 'api/auth/types';

export const isUnifiedError = (error: unknown): error is UnifiedError => {
  return (
    error !== undefined &&
    error !== null &&
    typeof error === 'object' &&
    'message' in error
  );
};
