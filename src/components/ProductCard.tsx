import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import type { Producto } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { toast } from 'sonner';

interface ProductCardProps {
  producto: Producto;
}

export function ProductCard({ producto }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const descuento = producto.precioAnterior
    ? Math.round(((producto.precioAnterior - producto.precio) / producto.precioAnterior) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(producto, 1);
    toast.success(`${producto.nombre} agregado al carrito`);
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="product-card"
    >
      <Card className="bg-white border-gray-200 hover:border-[#6B21A8] hover:shadow-lg overflow-hidden group h-full transition-all">
        <div className="relative">
          <Link to={`/producto/${producto.id}`}>
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="w-full h-36 sm:h-40 md:h-48 object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </Link>
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {producto.oferta && (
              <Badge className="bg-red-500 text-white text-xs">-{descuento}%</Badge>
            )}
            {producto.etiquetas.includes('Nuevo') && (
              <Badge className="bg-[#6B21A8] text-white text-xs">Nuevo</Badge>
            )}
          </div>

          {/* Stock indicator */}
          {producto.stock < 10 && (
            <div className="absolute bottom-2 left-2">
              <Badge variant="outline" className="bg-white/90 text-amber-600 border-amber-500 text-xs">
                ¡Solo {producto.stock}!
              </Badge>
            </div>
          )}

          {/* Quick add button */}
          <button
            onClick={handleAddToCart}
            className="absolute bottom-2 right-2 w-8 h-8 md:w-10 md:h-10 bg-[#6B21A8] rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#581C87]"
          >
            <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>

        <CardContent className="p-2 md:p-4">
          <div className="flex items-center gap-1 md:gap-2 mb-1 md:mb-2">
            <span className="text-xs text-gray-500">{producto.marca}</span>
            <div className="flex items-center gap-0.5 md:gap-1">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="text-xs text-gray-500">{producto.rating}</span>
            </div>
          </div>

          <Link to={`/producto/${producto.id}`}>
            <h3 className="font-medium text-gray-900 text-sm md:text-base line-clamp-2 mb-1 md:mb-2 group-hover:text-[#6B21A8] transition-colors">
              {producto.nombre}
            </h3>
          </Link>

          <div className="flex items-end gap-1 md:gap-2 mb-2 md:mb-3">
            <span className="text-base md:text-lg lg:text-xl font-bold text-[#6B21A8]">
              {formatPrice(producto.precio)}
            </span>
            {producto.precioAnterior && (
              <span className="text-xs md:text-sm text-gray-400 line-through">
                {formatPrice(producto.precioAnterior)}
              </span>
            )}
          </div>

          <Button
            className="w-full bg-[#6B21A8] hover:bg-[#581C87] text-white text-xs md:text-sm"
            size="sm"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
            Agregar
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
