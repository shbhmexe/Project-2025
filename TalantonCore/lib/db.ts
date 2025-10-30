import fs from 'fs/promises';
import path from 'path';

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  inventory: number;
  lastUpdated: string;
}

const DB_PATH = path.join(process.cwd(), 'data', 'products.json');

export async function getAllProducts(): Promise<Product[]> {
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading products:', error);
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await getAllProducts();
  return products.find((p) => p.slug === slug) || null;
}

export async function getProductById(id: string): Promise<Product | null> {
  const products = await getAllProducts();
  return products.find((p) => p.id === id) || null;
}

export async function createProduct(product: Omit<Product, 'id' | 'lastUpdated'>): Promise<Product> {
  const products = await getAllProducts();
  
  const newProduct: Product = {
    ...product,
    id: (Math.max(...products.map(p => parseInt(p.id)), 0) + 1).toString(),
    lastUpdated: new Date().toISOString(),
  };
  
  products.push(newProduct);
  await fs.writeFile(DB_PATH, JSON.stringify(products, null, 2));
  
  return newProduct;
}

export async function updateProduct(id: string, updates: Partial<Omit<Product, 'id'>>): Promise<Product | null> {
  const products = await getAllProducts();
  const index = products.findIndex((p) => p.id === id);
  
  if (index === -1) return null;
  
  products[index] = {
    ...products[index],
    ...updates,
    lastUpdated: new Date().toISOString(),
  };
  
  await fs.writeFile(DB_PATH, JSON.stringify(products, null, 2));
  
  return products[index];
}

export async function deleteProduct(id: string): Promise<boolean> {
  const products = await getAllProducts();
  const filteredProducts = products.filter((p) => p.id !== id);
  
  if (filteredProducts.length === products.length) return false;
  
  await fs.writeFile(DB_PATH, JSON.stringify(filteredProducts, null, 2));
  
  return true;
}
