export interface Producto {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  precioAnterior?: number;
  imagen: string;
  imagenes: string[];
  video?: string;
  videoThumbnail?: string;
  categoria: string;
  subcategoria: string;
  marca: string;
  stock: number;
  rating: number;
  reviews: number;
  etiquetas: string[];
  especificaciones: Record<string, string>;
  destacado: boolean;
  oferta: boolean;
}

export interface Categoria {
  id: string;
  nombre: string;
  icono: string;
  imagen: string;
  subcategorias: string[];
}

export interface CartItem {
  producto: Producto;
  cantidad: number;
}

export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  avatar?: string;
  direccion?: string;
  telefono?: string;
  ciudad?: string;
}

export interface Review {
  id: string;
  usuario: string;
  avatar: string;
  rating: number;
  comentario: string;
  fecha: string;
  util: number;
}
