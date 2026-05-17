import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, X, ChevronDown, LogOut, Home, Grid3X3, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useCartStore } from '@/store/cartStore';
import { useUserStore } from '@/store/userStore';
import { categorias } from '@/data/productos';
import { CartDrawer } from './CartDrawer';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const totalItems = useCartStore((state) => state.getTotalItems());
  const { usuario, isAuthenticated, logout } = useUserStore();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/productos?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-lg' : ''}`}
        style={{ backgroundColor: '#6B21A8' }}
      >
        {/* Barra superior solo desktop */}
        <div className="hidden md:block bg-[#581C87] text-white text-xs py-2">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <p>🚚 Coordinamos el envío contigo | 📞 Línea: 01 8000 123 456</p>
            <div className="flex gap-4">
              <Link to="/ayuda" className="hover:text-purple-200">Ayuda</Link>
              <Link to="/rastreo" className="hover:text-purple-200">Rastrea tu pedido</Link>
            </div>
          </div>
        </div>

        {/* Header principal */}
        <div className="container mx-auto px-3 md:px-4 py-2 md:py-3">
          <div className="flex items-center gap-2 md:gap-4">
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-xl flex items-center justify-center">
                <span className="font-bold text-base md:text-xl" style={{ color: '#6B21A8' }}>L</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-base md:text-xl font-bold text-white leading-tight">Loperzaik</h1>
                <p className="text-xs text-purple-200 leading-tight">Tecnología de Vanguardia</p>
              </div>
            </Link>

            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-3 pr-10 py-2 text-sm bg-white/10 border-white/20 text-white placeholder:text-purple-200 focus:bg-white/20 focus:border-white rounded-xl"
                />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-purple-200 hover:text-white">
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </form>

            <div className="flex items-center gap-1">
              <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative text-white hover:text-white hover:bg-white/20 w-9 h-9 md:w-10 md:h-10">
                    <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
                    {totalItems > 0 && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-white text-[#6B21A8] text-xs font-bold rounded-full flex items-center justify-center">
                        {totalItems}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-lg bg-white border-gray-200">
                  <CartDrawer onClose={() => setIsCartOpen(false)} />
                </SheetContent>
              </Sheet>

              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="hidden md:flex items-center gap-2 text-white hover:text-white hover:bg-white/20 px-2">
                      <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center">
                        <span className="font-semibold text-xs" style={{ color: '#6B21A8' }}>
                          {usuario?.nombre.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="max-w-[80px] truncate text-sm">{usuario?.nombre.split(' ')[0]}</span>
                      <ChevronDown className="w-3 h-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-52 bg-white border-gray-200">
                    <div className="px-3 py-2">
                      <p className="text-sm font-medium text-gray-900">{usuario?.nombre}</p>
                      <p className="text-xs text-gray-500">{usuario?.email}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-gray-700 hover:text-[#6B21A8]">
                      <User className="w-4 h-4 mr-2" /> Mi cuenta
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="text-red-500 hover:text-red-600">
                      <LogOut className="w-4 h-4 mr-2" /> Cerrar sesión
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link to="/login" className="hidden md:block">
                  <Button variant="ghost" className="items-center gap-2 text-white hover:text-white hover:bg-white/20 text-sm px-2">
                    <User className="w-4 h-4" />
                    <span>Ingresar</span>
                  </Button>
                </Link>
              )}

              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-white hover:text-white hover:bg-white/20 w-9 h-9"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Nav desktop */}
        <nav className="hidden md:block border-t border-white/20" style={{ backgroundColor: '#581C87' }}>
          <div className="container mx-auto px-4">
            <ul className="flex items-center gap-1 py-1.5">
              <li>
                <Link to="/" className="px-3 py-2 text-sm text-white hover:text-purple-200 rounded-lg hover:bg-white/10">
                  Inicio
                </Link>
              </li>
              {categorias.map((cat) => (
                <li key={cat.id}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="px-3 py-2 text-sm text-white hover:text-purple-200 rounded-lg hover:bg-white/10 flex items-center gap-1">
                        {cat.nombre} <ChevronDown className="w-3 h-3" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-48 bg-white border-gray-200">
                      <Link to={`/categoria/${cat.id}`}>
                        <DropdownMenuItem className="text-[#6B21A8] font-medium hover:bg-purple-50">
                          Ver todo en {cat.nombre}
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuSeparator />
                      {cat.subcategorias.map((sub) => (
                        <DropdownMenuItem key={sub} className="text-gray-700 hover:text-[#6B21A8] hover:bg-purple-50">
                          {sub}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>

      {/* Menú lateral móvil */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="w-72 bg-white p-0 border-r border-gray-200">
          <div className="flex items-center justify-between px-4 py-4" style={{ backgroundColor: '#6B21A8' }}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="font-bold text-sm" style={{ color: '#6B21A8' }}>L</span>
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Loperzaik</p>
                <p className="text-purple-200 text-xs">Tecnología de Vanguardia</p>
              </div>
            </div>
            <button onClick={() => setIsMobileMenuOpen(false)} className="text-white/70 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
          <nav className="py-3">
            <Link to="/" className="flex items-center gap-3 px-5 py-3 text-gray-700 hover:text-[#6B21A8] hover:bg-purple-50"
              onClick={() => setIsMobileMenuOpen(false)}>
              <Home className="w-4 h-4" />
              <span className="text-sm font-medium">Inicio</span>
            </Link>
            <div className="px-5 pt-4 pb-1">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Categorías</p>
            </div>
            {categorias.map((cat) => (
              <Link key={cat.id} to={`/categoria/${cat.id}`}
                className="flex items-center gap-3 px-5 py-3 text-gray-700 hover:text-[#6B21A8] hover:bg-purple-50"
                onClick={() => setIsMobileMenuOpen(false)}>
                <Grid3X3 className="w-4 h-4" />
                <span className="text-sm">{cat.nombre}</span>
              </Link>
            ))}
            <div className="border-t border-gray-100 mt-3 pt-3">
              {isAuthenticated ? (
                <>
                  <div className="px-5 py-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#6B21A8' }}>
                      <span className="text-white text-xs font-bold">{usuario?.nombre.charAt(0).toUpperCase()}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{usuario?.nombre}</p>
                      <p className="text-xs text-gray-500">{usuario?.email}</p>
                    </div>
                  </div>
                  <button onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                    className="flex items-center gap-3 px-5 py-3 text-red-500 hover:bg-red-50 w-full">
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm">Cerrar sesión</span>
                  </button>
                </>
              ) : (
                <Link to="/login" className="flex items-center gap-3 px-5 py-3 text-gray-700 hover:text-[#6B21A8] hover:bg-purple-50"
                  onClick={() => setIsMobileMenuOpen(false)}>
                  <User className="w-4 h-4" />
                  <span className="text-sm font-medium">Ingresar / Registrarse</span>
                </Link>
              )}
            </div>
          </nav>
        </SheetContent>
      </Sheet>

      {/* Bottom nav móvil */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
        <div className="flex justify-around items-center py-2">
          <Link to="/" className="flex flex-col items-center gap-0.5 px-4 py-1 text-gray-500 hover:text-[#6B21A8]">
            <Home className="w-5 h-5" />
            <span className="text-xs">Inicio</span>
          </Link>
          <Link to="/categoria/audio" className="flex flex-col items-center gap-0.5 px-4 py-1 text-gray-500 hover:text-[#6B21A8]">
            <Grid3X3 className="w-5 h-5" />
            <span className="text-xs">Categorías</span>
          </Link>
          <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetTrigger asChild>
              <button className="flex flex-col items-center gap-0.5 px-4 py-1 text-gray-500 hover:text-[#6B21A8] relative">
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute top-0 right-2 w-4 h-4 bg-[#6B21A8] text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
                <span className="text-xs">Carrito</span>
              </button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-lg bg-white border-gray-200">
              <CartDrawer onClose={() => setIsCartOpen(false)} />
            </SheetContent>
          </Sheet>
          <Link to="/login" className="flex flex-col items-center gap-0.5 px-4 py-1 text-gray-500 hover:text-[#6B21A8]">
            <User className="w-5 h-5" />
            <span className="text-xs">Cuenta</span>
          </Link>
        </div>
      </nav>
    </>
  );
}
