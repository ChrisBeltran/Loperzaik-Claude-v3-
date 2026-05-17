import type { Producto, Categoria, Review } from '@/types';

export const categorias: Categoria[] = [
  { id: 'audio', nombre: 'Audio', icono: 'Headphones', imagen: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600', subcategorias: ['Audífonos con Cable', 'Audífonos Inalámbricos', 'Parlantes'] },
  { id: 'accesorios-pc', nombre: 'Accesorios PC', icono: 'Mouse', imagen: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600', subcategorias: ['Teclados', 'Mouse', 'USB y Hubs'] },
  { id: 'cargadores', nombre: 'Cargadores y Cables', icono: 'Zap', imagen: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600', subcategorias: ['Cargadores TC', 'Cables Micro USB', 'Cables USB-C'] },
  { id: 'smartwatch', nombre: 'Smartwatch', icono: 'Watch', imagen: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600', subcategorias: ['Próximamente'] },
];

export const productos: Producto[] = [
  { id: 'au-001', nombre: 'Audífonos con Cable Stereo', descripcion: 'Audífonos con cable de 3.5mm, sonido stereo envolvente, cómodos para uso prolongado.', precio: 25000, imagen: 'https://images.unsplash.com/photo-1585298723682-7115561c51b7?w=600', imagenes: ['https://images.unsplash.com/photo-1585298723682-7115561c51b7?w=600','https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600'], categoria: 'audio', subcategoria: 'Audífonos con Cable', marca: 'Genérico', stock: 20, rating: 4.2, reviews: 15, etiquetas: ['Nuevo'], especificaciones: { 'Conexión': '3.5mm Jack', 'Tipo': 'Over-ear', 'Cable': '1.2 metros' }, destacado: true, oferta: false },
  { id: 'au-002', nombre: 'Audífonos Bluetooth Inalámbricos', descripcion: 'Audífonos inalámbricos con Bluetooth 5.0, hasta 20 horas de batería y sonido de alta calidad.', precio: 75000, imagen: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600', imagenes: ['https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600','https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600','https://images.unsplash.com/photo-1491927570842-0261e477d937?w=600'], categoria: 'audio', subcategoria: 'Audífonos Inalámbricos', marca: 'Genérico', stock: 15, rating: 4.4, reviews: 22, etiquetas: ['Destacado'], especificaciones: { 'Conectividad': 'Bluetooth 5.0', 'Batería': 'Hasta 20 horas', 'Micrófono': 'Integrado' }, destacado: true, oferta: false },
  { id: 'au-003', nombre: 'Parlante Bluetooth Portátil', descripcion: 'Parlante portátil con Bluetooth, sonido potente y claro. Ideal para música en casa o exteriores.', precio: 65000, imagen: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600', imagenes: ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600','https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600'], categoria: 'audio', subcategoria: 'Parlantes', marca: 'Genérico', stock: 12, rating: 4.3, reviews: 18, etiquetas: ['Nuevo'], especificaciones: { 'Conectividad': 'Bluetooth 5.0', 'Batería': 'Hasta 8 horas', 'Entrada': '3.5mm' }, destacado: true, oferta: false },
  { id: 'ac-001', nombre: 'Teclado USB Español', descripcion: 'Teclado estándar USB en español, teclas silenciosas y cómodo para largas jornadas.', precio: 35000, imagen: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600', imagenes: ['https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600','https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=600'], categoria: 'accesorios-pc', subcategoria: 'Teclados', marca: 'Genérico', stock: 18, rating: 4.1, reviews: 11, etiquetas: ['Nuevo'], especificaciones: { 'Conexión': 'USB', 'Idioma': 'Español', 'Tipo': 'Membrana' }, destacado: true, oferta: false },
  { id: 'ac-002', nombre: 'Mouse USB Óptico', descripcion: 'Mouse óptico con cable USB, sensor de precisión, diseño ergonómico.', precio: 22000, imagen: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600', imagenes: ['https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600','https://images.unsplash.com/photo-1586349906319-47db8f3fb2a2?w=600'], categoria: 'accesorios-pc', subcategoria: 'Mouse', marca: 'Genérico', stock: 25, rating: 4.2, reviews: 30, etiquetas: ['Destacado'], especificaciones: { 'Conexión': 'USB', 'Sensor': 'Óptico', 'DPI': '1000' }, destacado: true, oferta: false },
  { id: 'ac-003', nombre: 'Memoria USB 32GB', descripcion: 'Memoria USB 32GB, transferencia rápida. Compatible con PC, TV y carro.', precio: 28000, imagen: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=600', imagenes: ['https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=600'], categoria: 'accesorios-pc', subcategoria: 'USB y Hubs', marca: 'Genérico', stock: 30, rating: 4.3, reviews: 25, etiquetas: ['Nuevo'], especificaciones: { 'Capacidad': '32GB', 'Interfaz': 'USB 2.0' }, destacado: false, oferta: false },
  { id: 'ca-001', nombre: 'Cargador TC Universal 2A', descripcion: 'Cargador de pared USB 2A para carga rápida. Compatible con la mayoría de dispositivos.', precio: 18000, imagen: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600', imagenes: ['https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600'], categoria: 'cargadores', subcategoria: 'Cargadores TC', marca: 'Genérico', stock: 40, rating: 4.0, reviews: 35, etiquetas: ['Destacado'], especificaciones: { 'Salida': '5V / 2A', 'Puerto': 'USB-A' }, destacado: true, oferta: false },
  { id: 'ca-002', nombre: 'Cable Micro USB 1 metro', descripcion: 'Cable Micro USB de 1 metro para carga y datos. Compatible con celulares Android.', precio: 8000, imagen: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600', imagenes: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600'], categoria: 'cargadores', subcategoria: 'Cables Micro USB', marca: 'Genérico', stock: 50, rating: 4.0, reviews: 42, etiquetas: ['Destacado'], especificaciones: { 'Conector': 'Micro USB', 'Longitud': '1 metro' }, destacado: false, oferta: false },
  { id: 'sw-001', nombre: 'Smartwatch — Próximamente', descripcion: 'Estamos trabajando para traerte los mejores smartwatch. ¡Muy pronto!', precio: 0, imagen: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600', imagenes: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600'], categoria: 'smartwatch', subcategoria: 'Próximamente', marca: '', stock: 0, rating: 0, reviews: 0, etiquetas: ['Próximamente'], especificaciones: {}, destacado: false, oferta: false },
  {
  id: 'au-004',                         // ID único, no repetir
  nombre: 'Lenovo K10',
  descripcion: 'Descripción del producto.',
  precio: 50000,
  imagen: 'https://p1-ofp.static.pub/medias/bWFzdGVyfHJvb3R8NDcwMTg0fGltYWdlL3BuZ3xoNTQvaDdlLzExOTg0OTg2MTQ0Nzk4LnBuZ3w4ZTQ2MmI3ZDFiMmQzOWFkMTk2NGY3ZWU1YTg3NDIxNWI0OTczNGJkZWM0YWJiZjU5N2ViOWM2Mjc2NDU2NjE4/lenovo-tablet-lenovo-tab-k10-hero.png?width=584&height=584',
  imagenes: [
    'https://URL-foto-1.jpg',
    'https://URL-foto-2.jpg',           // puedes agregar varias
  ],
  // video: 'https://URL-del-video.mp4', // descomenta si tienes video
  categoria: 'audio',                   // audio | accesorios-pc | cargadores | smartwatch
  subcategoria: 'Parlantes',
  marca: 'Genérico',
  stock: 10,
  rating: 0,
  reviews: 0,
  etiquetas: ['Nuevo'],
  especificaciones: {
    'Conectividad': 'Bluetooth 5.0',
    'Batería': '8 horas',
  },
  destacado: true,
  oferta: false,
},
];

export const reviews: Review[] = [];
export const getProductosDestacados = () => productos.filter((p) => p.destacado);
export const getProductosOferta = () => productos.filter((p) => p.oferta);
export const getProductosByCategoria = (categoriaId: string) => productos.filter((p) => p.categoria === categoriaId);
export const getProductoById = (id: string) => productos.find((p) => p.id === id);
