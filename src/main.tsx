import { createRouter, RouterProvider } from '@tanstack/react-router';
import { ConfigProvider } from 'antd';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { useAuthStore } from 'store/auth';
import { routeTree } from './routeTree.gen';

const isAuthenticated = useAuthStore.getState().isAuthenticated;
const router = createRouter({
  routeTree,
  context: {
    isAuthenticated,
  },
});

useAuthStore.subscribe((state) => {
  router.update({
    context: { isAuthenticated: state.isAuthenticated },
  });
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#1677ff',
          },
        }}
      >
        <RouterProvider router={router} />
      </ConfigProvider>
    </StrictMode>,
  );
}
