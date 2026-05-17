import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Share2, Star, Truck, Shield, RotateCcw, Check, ChevronRight, Minus, Plus, ChevronLeft, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { getProductoById, productos } from '@/data/productos';
import { useCartStore } from '@/store/cartStore';
import type { Producto } from '@/types';

type MediaItem = { tipo: 'imagen'; url: string } | { tipo: 'video'; url: string; thumbnail?: string };

function buildMedia(producto: Producto): MediaItem[] {
  const items: MediaItem[] = producto.imagenes.map((url) => ({ tipo: 'imagen', url }));
  if (producto.video) items.push({ tipo: 'video', url: producto.video, thumbnail: producto.videoThumbnail });
  return items;
}

function Galeria({ producto }: { producto: Producto }) {
  const media = buildMedia(producto);
  const [seleccionado, setSeleccionado] = useState(0);
  const [reproduciendo, setReproduciendo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const item = media[seleccionado];
  const descuento = producto.precioAnterior ? Math.round(((producto.precioAnterior - producto.precio) / producto.precioAnterior) * 100) : 0;

  const anterior = () => { setReproduciendo(false); setSeleccionado((p) => (p === 0 ? media.length - 1 : p - 1)); };
  const siguiente = () => { setReproduciendo(false); setSeleccionado((p) => (p === media.length - 1 ? 0 : p + 1)); };

  useEffect(() => {
    if (videoRef.current) reproduciendo ? videoRef.current.play() : videoRef.current.pause();
  }, [reproduciendo]);

  return (
    <div>
      <div className="relative bg-gray-100 rounded-xl md:rounded-2xl overflow-hidden mb-3">
        {item.tipo === 'imagen' ? (
          <img src={item.url} alt={producto.nombre} className="w-full h-[260px] sm:h-[360px] md:h-[440px] object-cover" />
        ) : (
          <div className="relative w-full h-[260px] sm:h-[360px] md:h-[440px]">
            <video ref={videoRef} src={item.url} poster={item.thumbnail} className="w-full h-full object-cover" playsInline loop />
            {!reproduciendo && (
              <button onClick={() => setReproduciendo(true)} className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors">
                <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                  <Play className="w-7 h-7 text-[#6B21A8] ml-1" />
                </div>
              </button>
            )}
          </div>
        )}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {producto.oferta && <Badge className="bg-red-500 text-white text-xs px-2 py-0.5">-{descuento}% OFF</Badge>}
          {producto.etiquetas.includes('Nuevo') && <Badge className="bg-[#6B21A8] text-white text-xs px-2 py-0.5">Nuevo</Badge>}
        </div>
        <div className="absolute top-3 right-3 flex flex-col gap-1">
          <button className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-gray-500 hover:text-red-500 shadow-sm"><Heart className="w-4 h-4" /></button>
          <button className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-gray-500 hover:text-[#6B21A8] shadow-sm"><Share2 className="w-4 h-4" /></button>
        </div>
        {media.length > 1 && (
          <>
            <button onClick={anterior} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-sm hover:bg-white"><ChevronLeft className="w-4 h-4 text-gray-700" /></button>
            <button onClick={siguiente} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-sm hover:bg-white"><ChevronRight className="w-4 h-4 text-gray-700" /></button>
            <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full">{seleccionado + 1} / {media.length}</div>
          </>
        )}
      </div>
      {media.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {media.map((m, i) => (
            <button key={i} onClick={() => { setSeleccionado(i); setReproduciendo(false); }}
              className={`relative w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${seleccionado === i ? 'border-[#6B21A8]' : 'border-gray-200 hover:border-gray-300'}`}>
              {m.tipo === 'imagen' ? (
                <img src={m.url} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gray-800 flex items-center justify-center relative">
                  {m.thumbnail && <img src={m.thumbnail} alt="" className="w-full h-full object-cover" />}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40"><Play className="w-5 h-5 text-white" /></div>
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function ProductoDetalle() {
  const { id } = useParams<{ id: string }>();
  const producto = getProductoById(id || '');
  const [cantidad, setCantidad] = useState(1);
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [id]);

  if (!producto) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Producto no encontrado</h1>
          <Link to="/"><Button className="bg-[#6B21A8] hover:bg-[#581C87]">Volver al inicio</Button></Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(price);
  const productosRelacionados = productos.filter((p) => p.categoria === producto.categoria && p.id !== producto.id).slice(0, 4);
  const handleAddToCart = () => { addToCart(producto, cantidad); toast.success(`${producto.nombre} agregado al carrito`); };

  return (
    <div className="min-h-screen bg-white pt-16 md:pt-24 pb-20 md:pb-16">
      <div className="container mx-auto px-4">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4 overflow-x-auto py-3">
          <Link to="/" className="hover:text-[#6B21A8] whitespace-nowrap">Inicio</Link>
          <ChevronRight className="w-4 h-4 shrink-0" />
          <Link to={`/categoria/${producto.categoria}`} className="hover:text-[#6B21A8] capitalize whitespace-nowrap">{producto.categoria}</Link>
          <ChevronRight className="w-4 h-4 shrink-0" />
          <span className="text-gray-700 truncate">{producto.nombre}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 mb-12">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Galeria producto={producto} />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-sm text-gray-500">{producto.marca}</span>
              {producto.rating > 0 && (
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-gray-900 font-medium">{producto.rating}</span>
                  <span className="text-gray-500 text-sm">({producto.reviews} reseñas)</span>
                </div>
              )}
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3">{producto.nombre}</h1>
            <p className="text-gray-600 text-sm md:text-base mb-4">{producto.descripcion}</p>
            <div className="flex items-end gap-3 mb-4">
              <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#6B21A8]">{formatPrice(producto.precio)}</span>
              {producto.precioAnterior && <span className="text-lg text-gray-400 line-through">{formatPrice(producto.precioAnterior)}</span>}
            </div>
            <div className="flex items-center gap-2 mb-4">
              <div className={`w-2.5 h-2.5 rounded-full ${producto.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className={`text-sm ${producto.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {producto.stock > 0 ? `En stock (${producto.stock} disponibles)` : 'Agotado'}
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-5">
              {producto.etiquetas.map((e) => <Badge key={e} variant="outline" className="border-gray-300 text-gray-600 text-xs">{e}</Badge>)}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="flex items-center bg-gray-100 rounded-xl p-1 w-fit">
                <button onClick={() => setCantidad(Math.max(1, cantidad - 1))} className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-900"><Minus className="w-4 h-4" /></button>
                <span className="w-12 text-center text-gray-900 text-lg font-semibold">{cantidad}</span>
                <button onClick={() => setCantidad(Math.min(producto.stock, cantidad + 1))} className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-900"><Plus className="w-4 h-4" /></button>
              </div>
              <Button size="lg" className="flex-1 bg-[#6B21A8] hover:bg-[#581C87] text-base font-semibold" onClick={handleAddToCart} disabled={producto.stock === 0}>
                <ShoppingCart className="w-5 h-5 mr-2" /> Agregar al carrito
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { icon: <Truck className="w-4 h-4" />, title: 'Envío coordinado', sub: 'Lo arreglamos contigo' },
                { icon: <Shield className="w-4 h-4" />, title: 'Producto original', sub: '100% garantizado' },
                { icon: <RotateCcw className="w-4 h-4" />, title: 'Devolución', sub: 'Si hay algún problema' },
                { icon: <Check className="w-4 h-4" />, title: 'Revisado', sub: 'Antes del envío' },
              ].map((b, i) => (
                <div key={i} className="flex items-center gap-2 p-2 md:p-3 bg-gray-50 rounded-lg">
                  <span className="text-[#6B21A8] shrink-0">{b.icon}</span>
                  <div><p className="text-gray-900 font-medium text-xs">{b.title}</p><p className="text-gray-500 text-xs">{b.sub}</p></div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <Tabs defaultValue="especificaciones" className="mb-12">
          <TabsList className="bg-gray-100 border-b border-gray-200 w-full justify-start rounded-none p-0 overflow-x-auto">
            {[['especificaciones','Especificaciones'],['descripcion','Descripción'],['envio','Envío']].map(([v,l]) => (
              <TabsTrigger key={v} value={v} className="data-[state=active]:bg-white data-[state=active]:text-[#6B21A8] rounded-none px-4 py-2.5 text-sm whitespace-nowrap">{l}</TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="especificaciones" className="mt-4">
            <div className="bg-gray-50 rounded-xl p-4 md:p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Especificaciones técnicas</h3>
              {Object.keys(producto.especificaciones).length > 0 ? (
                <div className="grid md:grid-cols-2 gap-2">
                  {Object.entries(producto.especificaciones).map(([k, v]) => (
                    <div key={k} className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-500 text-sm">{k}</span>
                      <span className="text-gray-900 font-medium text-sm">{v}</span>
                    </div>
                  ))}
                </div>
              ) : <p className="text-gray-500 text-sm">Próximamente disponible.</p>}
            </div>
          </TabsContent>
          <TabsContent value="descripcion" className="mt-4">
            <div className="bg-gray-50 rounded-xl p-4 md:p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Descripción</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{producto.descripcion}</p>
            </div>
          </TabsContent>
          <TabsContent value="envio" className="mt-4">
            <div className="bg-gray-50 rounded-xl p-4 md:p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Información de envío</h3>
              <div className="space-y-3">
                {[
                  { icon: <Truck className="w-4 h-4" />, title: 'Envío coordinado', desc: 'Coordinamos la entrega directamente contigo por WhatsApp.' },
                  { icon: <Check className="w-4 h-4" />, title: 'Revisión previa', desc: 'Revisamos el producto antes de enviarlo para garantizar su buen estado.' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-9 h-9 bg-[#6B21A8]/10 rounded-lg flex items-center justify-center shrink-0 text-[#6B21A8]">{item.icon}</div>
                    <div><h4 className="text-gray-900 font-medium text-sm">{item.title}</h4><p className="text-gray-500 text-xs">{item.desc}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {productosRelacionados.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Productos relacionados</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {productosRelacionados.map((p) => (
                <Link key={p.id} to={`/producto/${p.id}`}>
                  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden group hover:border-[#6B21A8] hover:shadow-lg transition-all">
                    <img src={p.imagen} alt={p.nombre} className="w-full h-32 md:h-40 object-cover group-hover:scale-105 transition-transform" />
                    <div className="p-3">
                      <h3 className="font-medium text-gray-900 text-sm line-clamp-2 mb-1 group-hover:text-[#6B21A8]">{p.nombre}</h3>
                      <p className="text-base font-bold text-[#6B21A8]">{new Intl.NumberFormat('es-CO',{style:'currency',currency:'COP',minimumFractionDigits:0}).format(p.precio)}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
