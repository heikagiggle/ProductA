import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

const LOCAL_STORAGE_KEY = "products";

export type Variant = {
  size: "Small" | "Medium" | "Large";
  color: "red" | "white" | "black";
  additionalPrice: number;
};

export type Product = {
  id: string;
  title: string;
  description: string;
  images: string[];
  price: number;
  rating: string;
  stock: string;
  discountPercentage: string;
  availabilityStatus: string;
  variants: Variant[];
};

type ProductResponse = {
  products: Product[];
};

export function useProducts() {
  const { data: apiData, isLoading } = useQuery<ProductResponse>({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch("https://dummyjson.com/products?limit=4");
      const data = await res.json();
      return data;
    },
    staleTime: Infinity,
    retry: false,
  });

  const products: Product[] = useMemo(() => {
    const local = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (local) return JSON.parse(local);

    if (apiData?.products) {
      const transformed = apiData.products.map((p) => ({
        id: p.id.toString(),
        title: p.title,
        description: p.description,
        images: p.images,
        price: p.price,
        rating: p.rating,
        stock: p.stock,
        discountPercentage: p.discountPercentage,
        availabilityStatus: p.availabilityStatus,
        variants: [],
      }));
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(transformed));
      return transformed;
    }

    return [];
  }, [apiData]);

  const updateLocalStorage = (data: Product[]) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  };

  const addProduct = (product: Product) => {
    const updated = [product, ...products];
    updateLocalStorage(updated);
  };

  const updateProduct = (updatedProduct: Product) => {
    const updated = products.map((p) =>
      p.id === updatedProduct.id ? updatedProduct : p
    );
    updateLocalStorage(updated);
  };

  const deleteProduct = (id: string) => {
    const updated = products.filter((p) => p.id !== id);
    updateLocalStorage(updated);
  };

  return { products, addProduct, updateProduct, deleteProduct, isLoading };
}
