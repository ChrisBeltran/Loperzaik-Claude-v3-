import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { useUserStore } from '@/store/userStore';

export function Login() {
  const navigate = useNavigate();
  const { login } = useUserStore();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Login form
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    remember: false,
  });

  // Register form
  const [registerData, setRegisterData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulación de login
    setTimeout(() => {
      login({
        id: '1',
        nombre: 'Usuario Demo',
        email: loginData.email,
      });
      toast.success('¡Bienvenido de vuelta!');
      navigate('/');
      setIsLoading(false);
    }, 1500);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (registerData.password !== registerData.confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      return;
    }

    if (!registerData.acceptTerms) {
      toast.error('Debes aceptar los términos y condiciones');
      return;
    }

    setIsLoading(true);

    // Simulación de registro
    setTimeout(() => {
      login({
        id: '1',
        nombre: registerData.nombre,
        email: registerData.email,
      });
      toast.success('¡Cuenta creada exitosamente!');
      navigate('/');
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-8 md:py-12 px-4">
      <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-6 md:gap-8">
        {/* Left side - Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden lg:flex flex-col justify-center"
        >
          <Link to="/" className="flex items-center gap-2 mb-6 md:mb-8">
            <div className="w-12 h-12 bg-[#6B21A8] rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">L</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Loperzaik</h1>
              <p className="text-sm text-[#6B21A8]">Tecnología de Vanguardia</p>
            </div>
          </Link>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
            Bienvenido a la mejor tienda de tecnología en Colombia
          </h2>
          <p className="text-gray-600 text-base md:text-lg mb-6 md:mb-8">
            Accede a tu cuenta para disfrutar de beneficios exclusivos, seguimiento de pedidos y mucho más.
          </p>

          <div className="space-y-3 md:space-y-4">
            {[
              'Seguimiento de pedidos en tiempo real',
              'Historial de compras y facturas',
              'Ofertas exclusivas para miembros',
              'Lista de deseos personalizada',
            ].map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-5 h-5 md:w-6 md:h-6 bg-[#6B21A8]/10 rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 md:w-4 md:h-4 text-[#6B21A8]" />
                </div>
                <span className="text-gray-700 text-sm md:text-base">{benefit}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right side - Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white border border-gray-200 rounded-2xl p-5 md:p-8 shadow-lg">
            {/* Mobile logo */}
            <div className="lg:hidden flex justify-center mb-4 md:mb-6">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-[#6B21A8] rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl md:text-2xl">L</span>
                </div>
                <div>
                  <h1 className="text-lg md:text-xl font-bold text-gray-900">Loperzaik</h1>
                  <p className="text-xs text-[#6B21A8]">Tecnología de Vanguardia</p>
                </div>
              </Link>
            </div>

            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gray-100 mb-4 md:mb-6">
                <TabsTrigger value="login" className="data-[state=active]:bg-white data-[state=active]:text-[#6B21A8] text-sm md:text-base">
                  Iniciar sesión
                </TabsTrigger>
                <TabsTrigger value="register" className="data-[state=active]:bg-white data-[state=active]:text-[#6B21A8] text-sm md:text-base">
                  Crear cuenta
                </TabsTrigger>
              </TabsList>

              {/* Login Form */}
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-3 md:space-y-4">
                  <div>
                    <Label htmlFor="login-email" className="text-gray-700 text-sm md:text-base">
                      Correo electrónico
                    </Label>
                    <div className="relative mt-1">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="tu@email.com"
                        value={loginData.email}
                        onChange={(e) =>
                          setLoginData({ ...loginData, email: e.target.value })
                        }
                        className="pl-10 bg-white border-gray-300 text-gray-900 text-sm md:text-base"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="login-password" className="text-gray-700 text-sm md:text-base">
                      Contraseña
                    </Label>
                    <div className="relative mt-1">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                      <Input
                        id="login-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={loginData.password}
                        onChange={(e) =>
                          setLoginData({ ...loginData, password: e.target.value })
                        }
                        className="pl-10 pr-10 bg-white border-gray-300 text-gray-900 text-sm md:text-base"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4 md:w-5 md:h-5" />
                        ) : (
                          <Eye className="w-4 h-4 md:w-5 md:h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <Checkbox
                        checked={loginData.remember}
                        onCheckedChange={(checked) =>
                          setLoginData({ ...loginData, remember: checked as boolean })
                        }
                      />
                      <span className="text-sm text-gray-600">Recordarme</span>
                    </label>
                    <Link
                      to="/recuperar-password"
                      className="text-sm text-[#6B21A8] hover:text-[#581C87]"
                    >
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#6B21A8] hover:bg-[#581C87] text-sm md:text-base"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        Iniciar sesión
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </form>

                <div className="mt-4 md:mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">
                        O continúa con
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 md:mt-4 grid grid-cols-2 gap-2 md:gap-3">
                    <Button variant="outline" className="border-gray-300 text-sm">
                      <svg className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="currentColor"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      Google
                    </Button>
                    <Button variant="outline" className="border-gray-300 text-sm">
                      <svg className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                      Facebook
                    </Button>
                  </div>
                </div>
              </TabsContent>

              {/* Register Form */}
              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-3 md:space-y-4">
                  <div>
                    <Label htmlFor="register-name" className="text-gray-700 text-sm md:text-base">
                      Nombre completo
                    </Label>
                    <div className="relative mt-1">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                      <Input
                        id="register-name"
                        type="text"
                        placeholder="Juan Pérez"
                        value={registerData.nombre}
                        onChange={(e) =>
                          setRegisterData({ ...registerData, nombre: e.target.value })
                        }
                        className="pl-10 bg-white border-gray-300 text-gray-900 text-sm md:text-base"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="register-email" className="text-gray-700 text-sm md:text-base">
                      Correo electrónico
                    </Label>
                    <div className="relative mt-1">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="tu@email.com"
                        value={registerData.email}
                        onChange={(e) =>
                          setRegisterData({ ...registerData, email: e.target.value })
                        }
                        className="pl-10 bg-white border-gray-300 text-gray-900 text-sm md:text-base"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="register-password" className="text-gray-700 text-sm md:text-base">
                      Contraseña
                    </Label>
                    <div className="relative mt-1">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                      <Input
                        id="register-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={registerData.password}
                        onChange={(e) =>
                          setRegisterData({ ...registerData, password: e.target.value })
                        }
                        className="pl-10 pr-10 bg-white border-gray-300 text-gray-900 text-sm md:text-base"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4 md:w-5 md:h-5" />
                        ) : (
                          <Eye className="w-4 h-4 md:w-5 md:h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="register-confirm" className="text-gray-700 text-sm md:text-base">
                      Confirmar contraseña
                    </Label>
                    <div className="relative mt-1">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                      <Input
                        id="register-confirm"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={registerData.confirmPassword}
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            confirmPassword: e.target.value,
                          })
                        }
                        className="pl-10 bg-white border-gray-300 text-gray-900 text-sm md:text-base"
                        required
                      />
                    </div>
                  </div>

                  <label className="flex items-start gap-2 cursor-pointer">
                    <Checkbox
                      checked={registerData.acceptTerms}
                      onCheckedChange={(checked) =>
                        setRegisterData({
                          ...registerData,
                          acceptTerms: checked as boolean,
                        })
                      }
                    />
                    <span className="text-sm text-gray-600">
                      Acepto los{' '}
                      <Link to="/terminos" className="text-[#6B21A8] hover:text-[#581C87]">
                        términos y condiciones
                      </Link>{' '}
                      y la{' '}
                      <Link to="/privacidad" className="text-[#6B21A8] hover:text-[#581C87]">
                        política de privacidad
                      </Link>
                    </span>
                  </label>

                  <Button
                    type="submit"
                    className="w-full bg-[#6B21A8] hover:bg-[#581C87] text-sm md:text-base"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        Crear cuenta
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
