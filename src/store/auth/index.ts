import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isAuthenticated: boolean;
  setAuthenticated: (flag: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      setAuthenticated: () => {
        set({
          isAuthenticated: true,
        });
      },
      logout: () => {
        localStorage.removeItem('accessToken');
        set({ isAuthenticated: false });
      },
    }),
    { name: 'auth' },
  ),
);
