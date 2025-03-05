import { Modal, QRCode } from 'antd';
import React from 'react';

interface Props {
  isOpen: boolean;
  setOpen: (flag: boolean) => void;
  onScan: () => void;
  qr?: string;
}

export const QRModal: React.FC<Props> = ({ isOpen, setOpen, onScan, qr }) => {
  return (
    <Modal
      destroyOnClose
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
      {qr ? (
        <QRCode size={300} value={qr} />
      ) : (
        'Something went wrong. Try again'
      )}
    </Modal>
  );
};
