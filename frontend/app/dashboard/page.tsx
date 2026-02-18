"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Check,
  Package,
  IndianRupee,
} from "lucide-react";

type Product = { id: number; name: string; price: number; description: string };

export default function DashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false); // 👈 1. Added mounted state

  const apiUrl = "http://localhost:5000/api/products";

  const loadProducts = async () => {
    try {
      const res = await fetch(apiUrl, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch products");
      const data: Product[] = await res.json();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load products");
    }
  };

  useEffect(() => {
    setMounted(true); // 👈 2. Set mounted to true on load
    loadProducts();
  }, []);

  const createProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price: Number(price), description }),
        credentials: "include",
      });
      setName("");
      setPrice("");
      setDescription("");
      await loadProducts();
    } catch (err) {
      setError("Create failed");
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (p: Product) => {
    setLoading(true);
    try {
      await fetch(`${apiUrl}/${p.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(p),
        credentials: "include",
      });
      setEditingId(null);
      await loadProducts();
    } catch (err) {
      setError("Update failed");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: number) => {
    if (!confirm("Delete this product?")) return;
    setLoading(true);
    try {
      await fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      await loadProducts();
    } catch (err) {
      setError("Delete failed");
    } finally {
      setLoading(false);
    }
  };

  // 👈 3. Prevent rendering until client is ready
  if (!mounted) return <div className="min-h-screen bg-[#F8FAFC]" />;

  return (
    <main className="min-h-screen bg-[#F8FAFC] p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Inventory
            </h1>
            <p className="text-slate-500">
              Manage your product catalog and pricing.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <form
              onSubmit={createProduct}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 sticky top-8"
            >
              <div className="flex items-center gap-2 mb-2 text-indigo-600 font-semibold">
                <Plus size={20} />
                <span>Add New Product</span>
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-xs font-medium">
                  {error}
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">
                  Product Name
                </label>
                <input
                  autoComplete="off"
                  className="w-full bg-white border border-slate-300 px-4 py-2.5 rounded-xl text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                  placeholder="e.g. Wireless Mouse"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">
                  Price (INR)
                </label>
                <div className="relative">
                  <IndianRupee
                    className="absolute left-3 top-3 text-slate-400"
                    size={16}
                  />
                  <input
                    autoComplete="off"
                    className="w-full bg-white text-slate-900 border border-slate-300 pl-10 pr-4 py-2.5 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
                    type="number"
                    placeholder="0.00"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">
                  Description
                </label>
                <textarea
                  autoComplete="off"
                  className="w-full bg-white text-slate-900 border border-slate-300 px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition resize-none"
                  rows={3}
                  placeholder="Short details..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <button
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-indigo-200 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? "Processing..." : "Create Product"}
              </button>
            </form>
          </div>

          <div className="lg:col-span-2">
            {products.length === 0 ? (
              <div className="bg-white border-2 border-dashed border-slate-200 rounded-3xl p-12 text-center text-slate-400">
                <Package className="mx-auto mb-4 opacity-20" size={48} />
                <p>No products yet. Start by adding one!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {products.map((p) => (
                  <div
                    key={p.id}
                    className="group bg-white p-5 rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all"
                  >
                    {editingId === p.id ? (
                      <div className="space-y-3">
                        <input
                          className="w-full border-b border-indigo-200 focus:border-indigo-500 outline-none py-1 font-bold text-slate-800"
                          value={p.name}
                          onChange={(e) =>
                            setProducts((ps) =>
                              ps.map((x) =>
                                x.id === p.id
                                  ? { ...x, name: e.target.value }
                                  : x,
                              ),
                            )
                          }
                        />
                        <input
                          className="w-full border-b border-indigo-200 focus:border-indigo-500 outline-none py-1 text-indigo-600"
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
                        <textarea
                          className="w-full border-b border-indigo-200 focus:border-indigo-500 outline-none py-1 text-sm text-slate-500"
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
                        <div className="flex gap-2 pt-2">
                          <button
                            onClick={() => updateProduct(p)}
                            className="flex-1 bg-green-500 text-white py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-1"
                          >
                            <Check size={16} /> Save
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="flex-1 bg-slate-100 text-slate-600 py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-1"
                          >
                            <X size={16} /> Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col h-full justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-slate-800 text-lg group-hover:text-indigo-600 transition-colors">
                              {p.name}
                            </h3>
                            <span className="bg-indigo-50 text-indigo-600 px-2 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">
                              ₹{p.price}
                            </span>
                          </div>
                          <p className="text-slate-500 text-sm line-clamp-2 mb-4">
                            {p.description}
                          </p>
                        </div>
                        <div className="flex gap-2 border-t border-slate-50 pt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => setEditingId(p.id)}
                            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                          >
                            <Pencil size={18} />
                          </button>
                          <button
                            onClick={() => deleteProduct(p.id)}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
