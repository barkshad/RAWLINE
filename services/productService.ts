
import { collection, getDocs, query, where, limit, addDoc, doc, deleteDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { Product } from "../types";

const PRODUCTS_COLLECTION = "products";

export async function fetchAllProducts(): Promise<Product[]> {
  try {
    const querySnapshot = await getDocs(collection(db, PRODUCTS_COLLECTION));
    return querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    })) as Product[];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function fetchProductByHandle(handle: string): Promise<Product | null> {
  try {
    const q = query(collection(db, PRODUCTS_COLLECTION), where("handle", "==", handle), limit(1));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) return null;
    const doc = querySnapshot.docs[0];
    return { ...doc.data(), id: doc.id } as Product;
  } catch (error) {
    console.error("Error fetching product by handle:", error);
    return null;
  }
}

export async function createProduct(product: Omit<Product, 'id'>) {
  try {
    const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), {
      ...product,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
}

export async function updateProduct(productId: string, updates: Partial<Product>) {
  try {
    const productRef = doc(db, PRODUCTS_COLLECTION, productId);
    await updateDoc(productRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}

export async function removeProduct(productId: string) {
  try {
    await deleteDoc(doc(db, PRODUCTS_COLLECTION, productId));
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}
