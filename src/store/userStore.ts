import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Usuario } from '@/types';

interface UserState {
  usuario: Usuario | null;
  isAuthenticated: boolean;
  login: (usuario: Usuario) => void;
  logout: () => void;
  updateUser: (data: Partial<Usuario>) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      usuario: null,
      isAuthenticated: false,

      login: (usuario) => {
        set({ usuario, isAuthenticated: true });
      },

      logout: () => {
        set({ usuario: null, isAuthenticated: false });
      },

      updateUser: (data) => {
        set((state) => ({
          usuario: state.usuario
            ? { ...state.usuario, ...data }
            : null,
        }));
      },
    }),
    {
      name: 'loperzaik-user',
    }
  )
);
