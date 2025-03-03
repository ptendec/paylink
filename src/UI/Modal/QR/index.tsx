import { Modal, QRCode } from 'antd';
import React from 'react';
import { useAuthStore } from 'store/auth';

interface Props {
  isOpen: boolean;
  setOpen: (flag: boolean) => void;
  onScan: () => void;
}

export const QRModal: React.FC<Props> = ({ isOpen, setOpen, onScan }) => {
  const { tempToken } = useAuthStore();

  return (
    <Modal
      closable
      title="QR"
      cancelButtonProps={{
        style: {
          visibility: 'hidden',
        },
      }}
      open={isOpen}
      onOk={() => {
        setOpen(false);
        onScan();
      }}
      width="350px"
      okText="Done"
    >
      {tempToken ? (
        <QRCode size={300} value={tempToken} />
      ) : (
        'Something went wrong. Try again'
      )}
    </Modal>
  );
};
