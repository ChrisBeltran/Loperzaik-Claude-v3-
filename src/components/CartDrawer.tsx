import { Link } from 'react-router-dom';
import { Plus, Minus, Trash2, ShoppingBag, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useCartStore } from '@/store/cartStore';

interface CartDrawerProps {
  onClose: () => void;
}

// Número de WhatsApp de la tienda (cambiar por el real)
const WHATSAPP_NUMBER = '573001234567'; // Formato: código de país + número sin espacios

export function CartDrawer({ onClose }: CartDrawerProps) {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Generar mensaje para WhatsApp
  const generateWhatsAppMessage = () => {
    let message = '¡Hola! 👋\n\n';
    message += 'Me gustaría realizar el siguiente pedido:\n\n';
    message += '═══════════════════\n\n';
    
    items.forEach((item, index) => {
      message += `${index + 1}. *${item.producto.nombre}*\n`;
      message += `   Cantidad: ${item.cantidad}\n`;
      message += `   Precio unitario: ${formatPrice(item.producto.precio)}\n`;
      message += `   Subtotal: ${formatPrice(item.producto.precio * item.cantidad)}\n\n`;
    });
    
    message += '═══════════════════\n\n';
    message += `*TOTAL: ${formatPrice(getTotalPrice())}*\n\n`;
    message += 'Por favor, confirmame disponibilidad y método de pago. ¡Gracias! 🙏';
    
    return encodeURIComponent(message);
  };

  const handleWhatsAppCheckout = () => {
    const message = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6">
        <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-4">
          <ShoppingBag className="w-10 h-10 text-[#6B21A8]" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Tu carrito está vacío</h3>
        <p className="text-gray-500 text-center mb-6">
          ¡Explora nuestros productos y encuentra lo que necesitas!
        </p>
        <Button
          onClick={onClose}
          className="bg-[#6B21A8] hover:bg-[#581C87] text-white"
        >
          Seguir comprando
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">
          Carrito ({items.length} {items.length === 1 ? 'producto' : 'productos'})
        </h2>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.producto.id}
              className="flex gap-4 p-3 bg-gray-50 rounded-xl"
            >
              <img
                src={item.producto.imagen}
                alt={item.producto.nombre}
                className="w-20 h-20 object-cover rounded-lg bg-gray-200"
              />
              <div className="flex-1 min-w-0">
                <Link
                  to={`/producto/${item.producto.id}`}
                  onClick={onClose}
                  className="text-sm font-medium text-gray-900 hover:text-[#6B21A8] line-clamp-2"
                >
                  {item.producto.nombre}
                </Link>
                <p className="text-xs text-gray-500 mt-1">{item.producto.marca}</p>
                <p className="text-lg font-bold text-[#6B21A8] mt-1">
                  {formatPrice(item.producto.precio)}
                </p>

                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateQuantity(item.producto.id, item.cantidad - 1)
                      }
                      className="w-7 h-7 flex items-center justify-center bg-white border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center text-gray-900 font-medium">
                      {item.cantidad}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.producto.id, item.cantidad + 1)
                      }
                      className="w-7 h-7 flex items-center justify-center bg-white border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.producto.id)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-gray-900">{formatPrice(getTotalPrice())}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Envío</span>
            <span className="text-green-600">Gratis</span>
          </div>
          <Separator className="bg-gray-300" />
          <div className="flex justify-between">
            <span className="text-gray-900 font-medium">Total</span>
            <span className="text-xl font-bold text-[#6B21A8]">
              {formatPrice(getTotalPrice())}
            </span>
          </div>
        </div>

        <Button
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-6"
          onClick={handleWhatsAppCheckout}
        >
          <MessageCircle className="w-5 h-5 mr-2" />
          Comprar por WhatsApp
        </Button>

        <Button
          variant="ghost"
          className="w-full mt-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          Seguir comprando
        </Button>
      </div>
    </div>
  );
}
