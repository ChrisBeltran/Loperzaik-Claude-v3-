import { Link } from 'react-router-dom';
import { Facebook, Instagram, Phone, Mail, Shield, Truck, Headphones } from 'lucide-react';

export function Footer() {
  return (
    <footer style={{ backgroundColor: '#6B21A8' }} className="text-white mb-14 md:mb-0">
      <div style={{ backgroundColor: '#581C87' }} className="border-b border-white/20">
        <div className="container mx-auto px-4 py-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: <Truck className="w-5 h-5 text-white" />, title: 'Envío a domicilio', desc: 'Coordinamos la entrega contigo' },
              { icon: <Shield className="w-5 h-5 text-white" />, title: 'Calidad garantizada', desc: 'Revisamos antes del envío' },
              { icon: <Headphones className="w-5 h-5 text-white" />, title: 'Atención personalizada', desc: 'Te respondemos por WhatsApp' },
            ].map((b, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">{b.icon}</div>
                <div>
                  <h4 className="font-semibold text-white text-sm">{b.title}</h4>
                  <p className="text-xs text-purple-200">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                <span className="font-bold text-xl" style={{ color: '#6B21A8' }}>L</span>
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Loperzaik</h2>
                <p className="text-xs text-purple-200">Tecnología de Vanguardia</p>
              </div>
            </Link>
            <p className="text-purple-100 text-sm mb-4 max-w-xs">
              Tu tienda de accesorios y electrónica. Audífonos, parlantes, accesorios PC, cargadores y más.
            </p>
            <div className="flex gap-2">
              <a href="#" className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-white hover:bg-white hover:text-[#6B21A8] transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-white hover:bg-white hover:text-[#6B21A8] transition-all">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3 text-sm">Nuestros Productos</h4>
            <ul className="space-y-2">
              {[
                { label: 'Audífonos con Cable', path: '/categoria/audio' },
                { label: 'Audífonos Inalámbricos', path: '/categoria/audio' },
                { label: 'Parlantes Bluetooth', path: '/categoria/audio' },
                { label: 'Teclados y Mouse', path: '/categoria/accesorios-pc' },
                { label: 'Memorias USB', path: '/categoria/accesorios-pc' },
                { label: 'Cargadores y Cables', path: '/categoria/cargadores' },
                { label: 'Smartwatch — Pronto', path: '/categoria/smartwatch' },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.path} className="text-purple-200 hover:text-white text-xs transition-colors">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3 text-sm">Contáctanos</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-purple-300 shrink-0" />
                <span className="text-purple-200 text-xs">01 8000 123 456</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-purple-300 shrink-0" />
                <span className="text-purple-200 text-xs">info@loperzaik.com</span>
              </li>
            </ul>
            <div className="mt-4">
              <h5 className="font-medium text-white text-xs mb-1">Horario de Atención</h5>
              <p className="text-purple-200 text-xs">Lun – Vie: 8am – 7pm</p>
              <p className="text-purple-200 text-xs">Sábados: 9am – 5pm</p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: '#581C87' }} className="border-t border-white/20">
        <div className="container mx-auto px-4 py-3">
          <p className="text-purple-200 text-xs text-center">© 2026 Loperzaik. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
