import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, TrendingUp, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { categorias, getProductosDestacados, getProductosOferta } from '@/data/productos';
import { ProductCard } from '@/components/ProductCard';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const heroSlides = [
  {
    id: 1,
    titulo: 'MacBook Pro M3 Max',
    subtitulo: 'Potencia sin límites',
    descripcion: 'El chip más potente de Apple ahora en tu MacBook Pro. Rendimiento profesional.',
    imagen: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200',
    cta: 'Ver ahora',
    link: '/producto/lp-001',
    color: 'from-purple-600 to-blue-600',
  },
  {
    id: 2,
    titulo: 'iPhone 16 Pro Max',
    subtitulo: 'Inteligencia. Titanio. Increíble.',
    descripcion: 'El iPhone más avanzado con chip A18 Pro y cámara de 48MP.',
    imagen: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?w=1200',
    cta: 'Comprar',
    link: '/producto/sp-001',
    color: 'from-cyan-600 to-blue-600',
  },
  {
    id: 3,
    titulo: 'PlayStation 5 Slim',
    subtitulo: 'Juega sin límites',
    descripcion: 'La nueva PS5 más delgada con 1TB SSD. La experiencia definitiva.',
    imagen: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=1200',
    cta: 'Ver oferta',
    link: '/producto/gm-001',
    color: 'from-blue-600 to-indigo-600',
  },
];

function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  return (
    <div className="relative overflow-hidden rounded-2xl mx-4 md:mx-0">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {heroSlides.map((slide) => (
            <div key={slide.id} className="flex-[0_0_100%] min-w-0 relative">
              <div className="relative h-[300px] sm:h-[350px] md:h-[450px] lg:h-[500px]">
                <img
                  src={slide.imagen}
                  alt={slide.titulo}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-r ${slide.color} opacity-70`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                <div className="absolute inset-0 flex items-center">
                  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="max-w-lg hero-slide-content"
                    >
                      <p className="text-purple-200 font-semibold mb-1 text-sm sm:text-base">{slide.subtitulo}</p>
                      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-4 leading-tight">
                        {slide.titulo}
                      </h2>
                      <p className="text-white/90 text-sm sm:text-base md:text-lg mb-4 sm:mb-6 line-clamp-2">{slide.descripcion}</p>
                      <Link to={slide.link}>
                        <Button
                          size="sm"
                          className="bg-white text-gray-900 hover:bg-gray-100 font-semibold sm:size-default"
                        >
                          {slide.cta}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controles - solo en desktop */}
      <button
        onClick={scrollPrev}
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 bg-white/90 backdrop-blur-sm rounded-full items-center justify-center text-gray-900 hover:bg-white transition-colors shadow-lg"
      >
        <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6" />
      </button>
      <button
        onClick={scrollNext}
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 bg-white/90 backdrop-blur-sm rounded-full items-center justify-center text-gray-900 hover:bg-white transition-colors shadow-lg"
      >
        <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6" />
      </button>

      {/* Indicadores */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`h-2 rounded-full transition-all ${
              selectedIndex === index
                ? 'bg-white w-6'
                : 'bg-white/50 w-2 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export function Home() {
  const productosDestacados = getProductosDestacados();
  const productosOferta = getProductosOferta();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Carousel */}
      <section className="pt-4 md:pt-6">
        <div className="container mx-auto px-0 md:px-4">
          <HeroCarousel />
        </div>
      </section>

      {/* Categorías */}
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <div>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 md:mb-2">
                Explora por Categoría
              </h2>
              <p className="text-gray-500 text-sm md:text-base">Encuentra lo que necesitas</p>
            </div>
            <Link to="/categorias">
              <Button variant="ghost" className="text-[#6B21A8] hover:text-[#581C87] text-sm md:text-base">
                Ver todas
                <ArrowRight className="w-4 h-4 ml-1 md:ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {categorias.map((categoria, index) => (
              <motion.div
                key={categoria.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/categoria/${categoria.id}`}>
                  <Card className="bg-white border-gray-200 hover:border-[#6B21A8] hover:shadow-lg transition-all group overflow-hidden">
                    <CardContent className="p-2 md:p-4 text-center">
                      <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-2 md:mb-3 rounded-xl overflow-hidden">
                        <img
                          src={categoria.imagen}
                          alt={categoria.nombre}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                        />
                      </div>
                      <h3 className="font-medium text-gray-900 group-hover:text-[#6B21A8] transition-colors text-xs md:text-sm">
                        {categoria.nombre}
                      </h3>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Productos Destacados */}
      <section className="py-8 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 md:gap-3 mb-6 md:mb-8">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-[#6B21A8]/10 rounded-xl flex items-center justify-center">
              <Zap className="w-4 h-4 md:w-5 md:h-5 text-[#6B21A8]" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">
                Productos Destacados
              </h2>
              <p className="text-gray-500 text-sm md:text-base">Los más populares del momento</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6 product-card-grid">
            {productosDestacados.slice(0, 8).map((producto) => (
              <ProductCard key={producto.id} producto={producto} />
            ))}
          </div>
        </div>
      </section>

      {/* Banner de ofertas */}
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="relative rounded-2xl md:rounded-3xl overflow-hidden mx-0 md:mx-0">
            <img
              src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200"
              alt="Ofertas especiales"
              className="w-full h-[200px] sm:h-[250px] md:h-[350px] lg:h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/90 to-orange-600/90" />
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="max-w-md"
                >
                  <Badge className="bg-white text-red-600 mb-2 md:mb-4 text-xs md:text-sm">OFERTAS ESPECIALES</Badge>
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 md:mb-4">
                    Hasta 30% de descuento
                  </h2>
                  <p className="text-white/90 text-sm md:text-base lg:text-lg mb-4 md:mb-6">
                    En productos seleccionados de gaming, laptops y audio.
                  </p>
                  <Link to="/ofertas">
                    <Button
                      size="sm"
                      className="bg-white text-red-600 hover:bg-gray-100 font-semibold md:size-default"
                    >
                      Ver ofertas
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Productos en Oferta */}
      <section className="py-8 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 md:gap-3 mb-6 md:mb-8">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-red-500/10 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-red-500" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">
                Super Ofertas
              </h2>
              <p className="text-gray-500 text-sm md:text-base">Aprovecha antes de que se acaben</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6 product-card-grid">
            {productosOferta.map((producto) => (
              <ProductCard key={producto.id} producto={producto} />
            ))}
          </div>
        </div>
      </section>

      {/* Marcas */}
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 text-center mb-6 md:mb-8">
            Las Mejores Marcas
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 lg:gap-16 opacity-60">
            {['Apple', 'Samsung', 'Sony', 'NVIDIA', 'ASUS', 'LG', 'Dell', 'Nintendo'].map((marca) => (
              <span key={marca} className="text-lg md:text-xl lg:text-2xl font-bold text-gray-400">
                {marca}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-8 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 text-center mb-8 md:mb-12">
            Lo que dicen nuestros clientes
          </h2>
          
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {[
              {
                nombre: 'Carlos Martínez',
                comentario: 'Excelente servicio, mi MacBook llegó en perfecto estado y el envío fue súper rápido. Totalmente recomendado.',
                rating: 5,
              },
              {
                nombre: 'María González',
                comentario: 'La mejor tienda de tecnología en Colombia. Precios competitivos y atención al cliente excepcional.',
                rating: 5,
              },
              {
                nombre: 'Andrés López',
                comentario: 'Compré mi PS5 aquí y todo fue perfecto. Garantía real y buenos precios. Volveré a comprar.',
                rating: 5,
              },
            ].map((testimonio, index) => (
              <Card key={index} className="bg-white border-gray-200">
                <CardContent className="p-4 md:p-6">
                  <div className="flex gap-1 mb-3 md:mb-4">
                    {[...Array(testimonio.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm md:text-base mb-3 md:mb-4">"{testimonio.comentario}"</p>
                  <p className="font-semibold text-gray-900 text-sm md:text-base">{testimonio.nombre}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
