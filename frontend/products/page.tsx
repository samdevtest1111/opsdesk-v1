"use client";

import { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products", {
          credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to fetch products");

        const data: Product[] = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Products</h1>

      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <ul className="space-y-3">
          {products.map((product) => (
            <li key={product.id} className="border p-4 rounded">
              <h2 className="font-medium">{product.name}</h2>
              <p>{product.description}</p>
              <p className="font-semibold">₹{product.price}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
