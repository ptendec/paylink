import { Modal, QRCode } from 'antd';
import React from 'react';

interface Props {
  isOpen: boolean;
  setOpen: (flag: boolean) => void;
  onScan: () => void;
}

export const QRModal: React.FC<Props> = ({ isOpen, setOpen, onScan }) => {
  const tempToken = localStorage.getItem('tempToken');
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
