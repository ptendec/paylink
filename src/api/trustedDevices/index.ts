import { _fetch } from 'api';
import { PaginatedTrustedDevices, PaginationParams } from './types';

const ENDPOINT_URL = '/api/v1/front-office/trusted-devices';

export const getTrustedDevices = async (
  params: PaginationParams,
): Promise<PaginatedTrustedDevices> => {
  // @ts-expect-error Type error
  return _fetch(`${ENDPOINT_URL}?${new URLSearchParams(params).toString()}`);
};

export const deleteTrustedDevice = async (id: number): Promise<void> => {
  return _fetch(`${ENDPOINT_URL}/${id}`, {
    method: 'DELETE',
  });
};
