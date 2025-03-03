import { message } from 'antd';
import {
  deleteTrustedDevice,
  getTrustedDevices as getTrustedDevicesQuery,
} from 'api/trustedDevices';
import { TrustedDevice } from 'api/trustedDevices/types';
import { useCallback, useEffect, useState } from 'react';
import { isUnifiedError } from 'utils/isUnifiedError';

export const useGetTrustedDevices = () => {
  const [trustedDevices, setTrustedDevices] = useState<TrustedDevice[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const pageSize = 5;

  const fetchTrustedDevices = useCallback(async (pageNumber: number = 1) => {
    try {
      setIsLoading(true);
      const result = await getTrustedDevicesQuery({
        pageNumber: String(pageNumber),
        pageSize: String(pageSize),
        sortBy: 'ID',
        direction: 'ASC',
      });
      setTrustedDevices(result.content);
      setTotalItems(result.page.totalElements);
    } catch (error) {
      if (isUnifiedError(error)) {
        message.error(error.message);
      }
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTrustedDevices(page);
  }, [fetchTrustedDevices, page]);

  const refetch = () => {
    fetchTrustedDevices(page);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return {
    trustedDevices,
    isLoading,
    isError,
    totalItems,
    page,
    pageSize,
    fetchTrustedDevices,
    refetch,
    handlePageChange,
  };
};

export const useDeleteTrustedDevice = () => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (id: number) => {
    try {
      setIsDeleting(true);
      await deleteTrustedDevice(id);
    } catch (error) {
      if (isUnifiedError(error)) {
        message.error(error.message);
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return { isDeleting, handleDelete };
};
