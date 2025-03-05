import { createFileRoute, redirect } from '@tanstack/react-router';

import { DeleteOutlined } from '@ant-design/icons';
import { Button, Card, Popconfirm, Table, Typography } from 'antd';
import { TrustedDevice } from 'api/trustedDevices/types';
import { useAuthRestrict } from 'hooks/useAuthRestrict';
import {
  useDeleteTrustedDevice,
  useGetTrustedDevices,
} from 'hooks/useTrustedDevices';
import React, { useEffect } from 'react';

const Component: React.FC = () => {
  useAuthRestrict();
  const { trustedDevices, isLoading, isError, fetchTrustedDevices, refetch } =
    useGetTrustedDevices();
  const { isDeleting, handleDelete } = useDeleteTrustedDevice();

  useEffect(() => void fetchTrustedDevices, [fetchTrustedDevices]);

  const columns = [
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleString(),
    },
    {
      title: 'Fingerprint',
      dataIndex: 'fingerprint',
      key: 'fingerprint',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: undefined, record: TrustedDevice) => (
        <Popconfirm
          title="Remove trusted device"
          description="Are you sure you want to remove this device?"
          onConfirm={() => {
            handleDelete(record.id);
            setTimeout(refetch, 500);
          }}
          okText="Yes"
          cancelText="No"
        >
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            loading={isDeleting}
          >
            Remove
          </Button>
        </Popconfirm>
      ),
    },
  ];

  if (isError) {
    return (
      <Typography.Text type="danger">
        Error loading trusted devices
      </Typography.Text>
    );
  }

  return (
    <Card title="Trusted Devices">
      <Table
        dataSource={trustedDevices}
        columns={columns}
        rowKey="id"
        loading={isLoading}
        pagination={false}
      />
    </Card>
  );
};

export const Route = createFileRoute('/trusted-devices/')({
  component: Component,
  beforeLoad: ({ context, location }) => {
    if (!context.isAuthenticated) {
      throw redirect({
        to: '/authentification/login',
        search: { redirect: location.href },
      });
    }
  },
});
