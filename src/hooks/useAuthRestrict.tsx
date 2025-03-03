import { useNavigate, useRouter } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useAuthStore } from 'store/auth';

const PROTECTED_URLS = ['/trusted-devices'];

export const useAuthRestrict = () => {
  const router = useRouter();
  const { pathname } = router.state.location;
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    console.log(PROTECTED_URLS.includes(pathname) && !isAuthenticated);
    if (PROTECTED_URLS.includes(pathname) && !isAuthenticated) {
      console.log(pathname);
      navigate({ to: '/authentification/login' });
    }
  }, [isAuthenticated, pathname, router, navigate]);
};
