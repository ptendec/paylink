import { createFileRoute } from '@tanstack/react-router';

const RouteComponent = () => {
  return <div>Hello "/"!</div>;
};

export const Route = createFileRoute('/')({
  component: RouteComponent,
});
