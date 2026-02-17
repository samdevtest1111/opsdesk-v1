"use client";

import { apiFetch } from "@/src/lib/api";
import { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
};

export default function DashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadProducts = async () => {
    try {
      const data = await apiFetch("/api/products");
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load products");
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const createProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await apiFetch("/api/products", {
        method: "POST",
        body: JSON.stringify({ name, price: Number(price), description }),
      });
      setName("");
      setPrice("");
      setDescription("");
      await loadProducts();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Create failed");
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (p: Product) => {
    setLoading(true);
    try {
      await apiFetch(`/api/products/${p.id}`, {
        method: "PUT",
        body: JSON.stringify({
          name: p.name,
          price: p.price,
          description: p.description,
        }),
      });
      setEditingId(null);
      await loadProducts();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: number) => {
    if (!confirm("Delete this product?")) return;
    setLoading(true);
    try {
      await apiFetch(`/api/products/${id}`, { method: "DELETE" });
      await loadProducts();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Products</h1>

      {/* Create */}
      <form
        onSubmit={createProduct}
        className="space-y-3 max-w-md border p-4 rounded"
      >
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input
          className="w-full border px-3 py-2 rounded"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="w-full border px-3 py-2 rounded"
          placeholder="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          className="w-full border px-3 py-2 rounded"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button
          className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Saving..." : "Add Product"}
        </button>
      </form>

      {/* List */}
      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <ul className="space-y-2">
          {products.map((p) => (
            <li key={p.id} className="border p-4 rounded space-y-2">
              {editingId === p.id ? (
                <>
                  <input
                    className="w-full border px-2 py-1 rounded"
                    value={p.name}
                    onChange={(e) =>
                      setProducts((ps) =>
                        ps.map((x) =>
                          x.id === p.id ? { ...x, name: e.target.value } : x,
                        ),
                      )
                    }
                  />
                  <input
                    className="w-full border px-2 py-1 rounded"
                    type="number"
                    value={p.price}
                    onChange={(e) =>
                      setProducts((ps) =>
                        ps.map((x) =>
                          x.id === p.id
                            ? { ...x, price: Number(e.target.value) }
                            : x,
                        ),
                      )
                    }
                  />
                  <input
                    className="w-full border px-2 py-1 rounded"
                    value={p.description}
                    onChange={(e) =>
                      setProducts((ps) =>
                        ps.map((x) =>
                          x.id === p.id
                            ? { ...x, description: e.target.value }
                            : x,
                        ),
                      )
                    }
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateProduct(p)}
                      className="bg-black text-white px-3 py-1 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="border px-3 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="font-medium">{p.name}</div>
                  <div>₹{p.price}</div>
                  <div className="text-sm text-gray-600">{p.description}</div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingId(p.id)}
                      className="border px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProduct(p.id)}
                      className="border px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
