import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isAuthenticated: boolean;
  setAuthenticated: (flag: boolean) => void;

  tempToken?: string;
  setTempToken: (tempToken?: string) => void;

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
      setTempToken(tempToken) {
        set({
          tempToken,
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
