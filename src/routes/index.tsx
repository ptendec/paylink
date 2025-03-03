import { createFileRoute } from '@tanstack/react-router';
import { Card, Typography } from 'antd';
import React from 'react';

const { Title, Paragraph } = Typography;

const Component: React.FC = () => {
  return (
    <Card>
      <Title level={2}>Welcome to the Main</Title>
      <Paragraph>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet quae
        deserunt dolorum accusantium laboriosam asperiores dicta, quas expedita
        tempore sunt corrupti, doloremque reprehenderit velit, quo eum autem
        doloribus. Dolores voluptates doloribus tempora?
      </Paragraph>
      <Paragraph>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum ex esse
        quam.
      </Paragraph>
    </Card>
  );
};

export const Route = createFileRoute('/')({
  component: Component,
});
