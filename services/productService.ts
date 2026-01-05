
import { collection, getDocs, query, where, limit } from "firebase/firestore";
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
