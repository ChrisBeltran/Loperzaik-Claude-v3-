import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Producto } from '@/types';

interface CartState {
  items: CartItem[];
  addToCart: (producto: Producto, cantidad?: number) => void;
  removeFromCart: (productoId: string) => void;
  updateQuantity: (productoId: string, cantidad: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (producto, cantidad = 1) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.producto.id === producto.id
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.producto.id === producto.id
                  ? { ...item, cantidad: item.cantidad + cantidad }
                  : item
              ),
            };
          }

          return {
            items: [...state.items, { producto, cantidad }],
          };
        });
      },

      removeFromCart: (productoId) => {
        set((state) => ({
          items: state.items.filter((item) => item.producto.id !== productoId),
        }));
      },

      updateQuantity: (productoId, cantidad) => {
        if (cantidad <= 0) {
          get().removeFromCart(productoId);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.producto.id === productoId
              ? { ...item, cantidad }
              : item
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.cantidad, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.producto.precio * item.cantidad,
          0
        );
      },
    }),
    {
      name: 'loperzaik-cart',
    }
  )
);
