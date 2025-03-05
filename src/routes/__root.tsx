import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Layout } from 'UI/Layout';

interface Context {
  isAuthenticated: boolean;
}

export const Route = createRootRouteWithContext<Context>()({
  component: () => (
    <Layout>
      <Outlet />
      <TanStackRouterDevtools />
    </Layout>
  ),
});
