import { useState, useMemo } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SlidersHorizontal, Grid3X3, LayoutList, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { productos, categorias } from '@/data/productos';
import type { Producto } from '@/types';

export function Categoria() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState([0, 20000000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('relevance');
  const [showFilters, setShowFilters] = useState(false);

  const categoria = categorias.find((c) => c.id === id);
  
  // Obtener productos filtrados
  const productosFiltrados = useMemo(() => {
    let filtered = productos;

    // Filtrar por categoría si hay ID
    if (id) {
      filtered = filtered.filter((p) => p.categoria === id);
    }

    // Filtrar por búsqueda
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.nombre.toLowerCase().includes(query) ||
          p.descripcion.toLowerCase().includes(query) ||
          p.marca.toLowerCase().includes(query)
      );
    }

    // Filtrar por precio
    filtered = filtered.filter(
      (p) => p.precio >= priceRange[0] && p.precio <= priceRange[1]
    );

    // Filtrar por marca
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((p) => selectedBrands.includes(p.marca));
    }

    // Ordenar
    switch (sortBy) {
      case 'price-asc':
        filtered = [...filtered].sort((a, b) => a.precio - b.precio);
        break;
      case 'price-desc':
        filtered = [...filtered].sort((a, b) => b.precio - a.precio);
        break;
      case 'name':
        filtered = [...filtered].sort((a, b) => a.nombre.localeCompare(b.nombre));
        break;
      case 'rating':
        filtered = [...filtered].sort((a, b) => b.rating - a.rating);
        break;
    }

    return filtered;
  }, [id, searchQuery, priceRange, selectedBrands, sortBy]);

  // Obtener marcas únicas
  const marcas = useMemo(() => {
    const brands = new Set(productosFiltrados.map((p) => p.marca));
    return Array.from(brands).sort();
  }, [productosFiltrados]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((b) => b !== brand)
        : [...prev, brand]
    );
  };

  const clearFilters = () => {
    setPriceRange([0, 20000000]);
    setSelectedBrands([]);
  };

  const hasActiveFilters = priceRange[0] > 0 || priceRange[1] < 20000000 || selectedBrands.length > 0;

  return (
    <div className="min-h-screen bg-white pt-24 md:pt-32 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          {searchQuery ? (
            <>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                Resultados para "{searchQuery}"
              </h1>
              <p className="text-gray-500 text-sm md:text-base">
                {productosFiltrados.length} {productosFiltrados.length === 1 ? 'producto' : 'productos'} encontrados
              </p>
            </>
          ) : categoria ? (
            <>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{categoria.nombre}</h1>
              <p className="text-gray-500 text-sm md:text-base">
                {productosFiltrados.length} {productosFiltrados.length === 1 ? 'producto' : 'productos'} disponibles
              </p>
            </>
          ) : (
            <>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Todos los productos</h1>
              <p className="text-gray-500 text-sm md:text-base">
                {productosFiltrados.length} {productosFiltrados.length === 1 ? 'producto' : 'productos'} disponibles
              </p>
            </>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
          {/* Sidebar - Filtros (Desktop) */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-32">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Filtros</h3>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-[#6B21A8] hover:text-[#581C87]"
                  >
                    Limpiar
                  </button>
                )}
              </div>

              {/* Filtro de precio */}
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <h4 className="font-medium text-gray-900 mb-4">Precio</h4>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={20000000}
                  step={100000}
                  className="mb-4"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>${(priceRange[0] / 1000000).toFixed(1)}M</span>
                  <span>${(priceRange[1] / 1000000).toFixed(1)}M</span>
                </div>
              </div>

              {/* Filtro de marcas */}
              {marcas.length > 0 && (
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-medium text-gray-900 mb-4">Marcas</h4>
                  <div className="space-y-2">
                    {marcas.map((marca) => (
                      <label
                        key={marca}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <Checkbox
                          checked={selectedBrands.includes(marca)}
                          onCheckedChange={() => toggleBrand(marca)}
                        />
                        <span className="text-gray-600 text-sm">{marca}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 md:gap-4 mb-4 md:mb-6 p-3 md:p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-2 md:gap-4">
                {/* Filtros móvil */}
                <Sheet open={showFilters} onOpenChange={setShowFilters}>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden border-gray-300 text-sm">
                      <SlidersHorizontal className="w-4 h-4 mr-1 md:mr-2" />
                      Filtros
                      {hasActiveFilters && (
                        <Badge className="ml-2 bg-[#6B21A8]">!</Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 bg-white border-gray-200">
                    <SheetHeader>
                      <SheetTitle className="text-gray-900">Filtros</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6 space-y-6">
                      {/* Precio móvil */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-4">Precio</h4>
                        <Slider
                          value={priceRange}
                          onValueChange={setPriceRange}
                          max={20000000}
                          step={100000}
                          className="mb-4"
                        />
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>${(priceRange[0] / 1000000).toFixed(1)}M</span>
                          <span>${(priceRange[1] / 1000000).toFixed(1)}M</span>
                        </div>
                      </div>

                      {/* Marcas móvil */}
                      {marcas.length > 0 && (
                        <div>
                          <h4 className="font-medium text-gray-900 mb-4">Marcas</h4>
                          <div className="space-y-2">
                            {marcas.map((marca) => (
                              <label
                                key={marca}
                                className="flex items-center gap-2 cursor-pointer"
                              >
                                <Checkbox
                                  checked={selectedBrands.includes(marca)}
                                  onCheckedChange={() => toggleBrand(marca)}
                                />
                                <span className="text-gray-600 text-sm">{marca}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      )}

                      <Button onClick={() => setShowFilters(false)} className="w-full bg-[#6B21A8] hover:bg-[#581C87]">
                        Aplicar filtros
                      </Button>
                    </div>
                  </SheetContent>
                </Sheet>

                {/* Filtros activos */}
                {hasActiveFilters && (
                  <div className="hidden sm:flex items-center gap-2 flex-wrap">
                    {selectedBrands.map((brand) => (
                      <Badge
                        key={brand}
                        variant="secondary"
                        className="cursor-pointer bg-gray-200 text-gray-700 hover:bg-gray-300"
                        onClick={() => toggleBrand(brand)}
                      >
                        {brand}
                        <X className="w-3 h-3 ml-1" />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 md:gap-4">
                {/* Ordenar */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[140px] md:w-[180px] bg-white border-gray-300 text-sm">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200">
                    <SelectItem value="relevance">Relevancia</SelectItem>
                    <SelectItem value="price-asc">Precio: Menor a mayor</SelectItem>
                    <SelectItem value="price-desc">Precio: Mayor a menor</SelectItem>
                    <SelectItem value="name">Nombre</SelectItem>
                    <SelectItem value="rating">Mejor valorados</SelectItem>
                  </SelectContent>
                </Select>

                {/* Vista */}
                <div className="hidden sm:flex items-center gap-1 bg-white border border-gray-300 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${
                      viewMode === 'grid'
                        ? 'bg-gray-200 text-[#6B21A8]'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${
                      viewMode === 'list'
                        ? 'bg-gray-200 text-[#6B21A8]'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <LayoutList className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Productos */}
            {productosFiltrados.length > 0 ? (
              <div
                className={`grid gap-3 md:gap-4 lg:gap-6 ${
                  viewMode === 'grid'
                    ? 'grid-cols-2 md:grid-cols-3 xl:grid-cols-4'
                    : 'grid-cols-1'
                }`}
              >
                {productosFiltrados.map((producto, index) => (
                  <motion.div
                    key={producto.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <ProductoCategoriaCard producto={producto} viewMode={viewMode} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 md:py-16">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <SlidersHorizontal className="w-8 h-8 md:w-10 md:h-10 text-gray-400" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                  No se encontraron productos
                </h3>
                <p className="text-gray-500 mb-4 text-sm md:text-base">
                  Intenta ajustar los filtros o busca algo diferente
                </p>
                <Button onClick={clearFilters} variant="outline" className="border-gray-300">
                  Limpiar filtros
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

// Componente ProductoCategoriaCard con soporte para vista lista
interface ProductoCategoriaCardProps {
  producto: Producto;
  viewMode?: 'grid' | 'list';
}

function ProductoCategoriaCard({ producto, viewMode = 'grid' }: ProductoCategoriaCardProps) {
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

  if (viewMode === 'list') {
    return (
      <Link to={`/producto/${producto.id}`}>
        <div className="flex gap-3 md:gap-4 bg-white border border-gray-200 rounded-xl overflow-hidden group hover:border-[#6B21A8] hover:shadow-lg transition-all p-3 md:p-4">
          <div className="relative w-24 h-24 md:w-32 md:h-32 shrink-0">
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="w-full h-full object-cover rounded-lg"
            />
            {producto.oferta && (
              <Badge className="absolute top-1 left-1 bg-red-500 text-xs">-{descuento}%</Badge>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-gray-500">{producto.marca}</span>
              <div className="flex items-center gap-1">
                <span className="text-amber-400 text-xs">★</span>
                <span className="text-xs text-gray-500">{producto.rating}</span>
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 text-sm md:text-base mb-1 md:mb-2 group-hover:text-[#6B21A8] transition-colors">
              {producto.nombre}
            </h3>
            <p className="text-gray-500 text-xs md:text-sm line-clamp-2 mb-2 md:mb-3">{producto.descripcion}</p>
            <div className="flex items-end gap-2">
              <span className="text-lg md:text-xl font-bold text-[#6B21A8]">
                {formatPrice(producto.precio)}
              </span>
              {producto.precioAnterior && (
                <span className="text-sm text-gray-400 line-through">
                  {formatPrice(producto.precioAnterior)}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Link to={`/producto/${producto.id}`}>
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden group hover:border-[#6B21A8] hover:shadow-lg transition-all h-full">
          <div className="relative">
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="w-full h-36 sm:h-40 md:h-48 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {producto.oferta && (
              <Badge className="absolute top-2 left-2 bg-red-500 text-xs">-{descuento}%</Badge>
            )}
            {producto.etiquetas.includes('Nuevo') && (
              <Badge className="absolute top-2 right-2 bg-[#6B21A8] text-xs">Nuevo</Badge>
            )}
          </div>
          <div className="p-2 md:p-4">
            <div className="flex items-center gap-1 md:gap-2 mb-1 md:mb-2">
              <span className="text-xs text-gray-500">{producto.marca}</span>
              <div className="flex items-center gap-0.5 md:gap-1">
                <span className="text-amber-400 text-xs">★</span>
                <span className="text-xs text-gray-500">{producto.rating}</span>
              </div>
            </div>
            <h3 className="font-medium text-gray-900 text-sm md:text-base line-clamp-2 mb-1 md:mb-2 group-hover:text-[#6B21A8] transition-colors">
              {producto.nombre}
            </h3>
            <div className="flex items-end gap-1 md:gap-2">
              <span className="text-base md:text-lg font-bold text-[#6B21A8]">
                {formatPrice(producto.precio)}
              </span>
              {producto.precioAnterior && (
                <span className="text-xs md:text-sm text-gray-400 line-through">
                  {formatPrice(producto.precioAnterior)}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
