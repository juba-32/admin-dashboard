"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import DashboardSummary from "../../components/product visulisation/DashboardSummary";
import { useProducts } from "./UseProducts";
import ProductForm from "./ProductForm";
import { Product } from "@/app/lib/Api";

export default function ProductList() {
  const {
    productsQuery,
    deleteProductMutation,
    updateProductMutation,
    addProductMutation,
  } = useProducts();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { data: products = [], isLoading, isError } = productsQuery;

  if (isLoading)
    return <p className="p-4 text-gray-400">Loading Products...</p>;
  if (isError)
    return <p className="p-4 text-red-500">Failed to load Products.</p>;

  const handleAdd = () => {
    setSelectedProduct(null);
    setIsFormOpen(true);
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsFormOpen(true);
  };

  const handleSubmit = (formData: Omit<Product, "id"> | Product) => {
    if (selectedProduct) {
      updateProductMutation.mutate(formData as Product, {
        onSuccess: () => setIsFormOpen(false),
      });
    } else {
      addProductMutation.mutate(formData as Omit<Product, "id">, {
        onSuccess: () => setIsFormOpen(false),
      });
    }
  };

  return (
    <div className="p-6 relative">
      {/* Dashboard Summary (Charts) */}
      <DashboardSummary products={products} />

      {/* Header with Add Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-white">Products</h2>
        <button
          onClick={handleAdd}
          className="px-5 py-2.5 rounded-md text-white font-medium bg-[linear-gradient(to_right,rgba(9,24,62,1)_0%,rgba(12,109,198,1)_100%)] hover:opacity-90 transition duration-300 shadow-md"
        >
          + Add Product
        </button>
      </div>

      {/* 🔹 Product Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-[#0B1535] text-white rounded-xl p-5 shadow-lg border border-[#1B2B4D]/40 hover:shadow-[0_0_15px_rgba(12,109,198,0.4)] transition-all duration-300"
          >
            <div className="mb-3">
              <h3 className="text-lg font-semibold mb-1">{p.name}</h3>
              <p className="text-gray-300">${p.price}</p>
              <p className="text-gray-400 text-sm mt-1">{p.category}</p>
            </div>

            <div className="flex justify-end gap-3 mt-4">
              {/* Edit Button */}
              <button
                onClick={() => handleEdit(p)}
                className="px-4 py-2 text-sm rounded-md text-white font-medium bg-[linear-gradient(to_right,rgba(12,109,198,1)_0%,rgba(21,140,255,1)_100%)] hover:shadow-[0_0_10px_rgba(21,140,255,0.5)] transition duration-300"
              >
                Edit
              </button>

              {/* Delete Button */}
              <button
                onClick={() => {
                  if (p.id !== undefined) {
                    deleteProductMutation.mutate(p.id);
                  }
                }}
                className="px-4 py-2 text-sm rounded-md text-white font-medium bg-[linear-gradient(to_right,rgba(198,12,12,1)_0%,rgba(255,40,80,1)_100%)] hover:shadow-[0_0_10px_rgba(255,40,80,0.5)] transition duration-300"
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 🔹 Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#09183E] text-white p-6 rounded-xl shadow-2xl max-w-md w-full"
          >
            <ProductForm
              mode={selectedProduct ? "edit" : "add"}
              product={selectedProduct}
              onSubmit={handleSubmit}
              onCancel={() => setIsFormOpen(false)}
              isLoading={
                addProductMutation.isPending || updateProductMutation.isPending
              }
            />
          </motion.div>
        </div>
      )}
    </div>
  );
}
