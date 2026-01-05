
export interface Product {
  id: string;
  title: string;
  handle: string;
  price: number;
  description: string;
  images: string[]; // This will now store Cloudinary public_ids
  fabric: string;
  fit: string;
  care: string;
  sizes: string[];
}

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

export enum Page {
  Home = 'Home',
  Shop = 'Shop',
  Product = 'Product',
  About = 'About',
  Cart = 'Cart'
}
