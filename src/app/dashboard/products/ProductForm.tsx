"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Product } from "../../lib/Api";

interface ProductFormProps {
  mode: "add" | "edit";
  product?: Product | null;
  onSubmit: (data: Omit<Product, "id"> | Product) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function ProductForm({
  mode,
  product,
  onSubmit,
  onCancel,
  isLoading,
}: ProductFormProps) {
  const [formData, setFormData] = useState<Omit<Product, "id">>({
    name: "",
    price: "",
    category: "",
    stock: "",
  });

  useEffect(() => {
    if (product) {
      const { id, ...rest } = product;
      setFormData(rest);
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(product ? { ...product, ...formData } : formData);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-5 text-white"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-xl font-semibold text-center mb-4">
        {mode === "add" ? "Add New Product" : "Edit Product"}
      </h3>

      {/* Product Name */}
      <div>
        <label className="block font-semibold mb-2 text-gray-300">
          Product Name
        </label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter product name"
          className="w-full bg-[#0F1C3F] border border-[#1B2B4D]/40 px-3 py-3 rounded-md
                     focus:outline-none focus:border-[#0C6DC6] transition duration-300"
          required
        />
      </div>

      {/* Price */}
      <div>
        <label className="block font-semibold mb-2 text-gray-300">Price</label>
        <input
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          placeholder="Enter price"
          className="w-full bg-[#0F1C3F] border border-[#1B2B4D]/40 px-3 py-3 rounded-md
                     focus:outline-none focus:border-[#0C6DC6] transition duration-300"
          required
        />
      </div>

      {/* Category */}
      <div>
        <label className="block font-semibold mb-2 text-gray-300">
          Category
        </label>
        <input
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Enter category"
          className="w-full bg-[#0F1C3F] border border-[#1B2B4D]/40 px-3 py-3 rounded-md
                     focus:outline-none focus:border-[#0C6DC6] transition duration-300"
          required
        />
      </div>

      {/* Stock */}
      <div>
        <label className="block font-semibold mb-2 text-gray-300">Stock</label>
        <input
          name="stock"
          type="number"
          value={formData.stock}
          onChange={handleChange}
          placeholder="Enter stock quantity"
          className="w-full bg-[#0F1C3F] border border-[#1B2B4D]/40 px-3 py-3 rounded-md
                     focus:outline-none focus:border-[#0C6DC6] transition duration-300"
          required
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-md bg-gray-600 text-white font-medium
                     hover:bg-gray-700 transition duration-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-5 py-2 rounded-md text-white font-medium
                     bg-[linear-gradient(to_right,rgba(9,24,62,1)_0%,rgba(12,109,198,1)_100%)]
                     hover:opacity-90 hover:shadow-[0_0_12px_rgba(12,109,198,0.4)]
                     transition duration-300 disabled:opacity-70"
        >
          {isLoading
            ? "Saving..."
            : mode === "add"
            ? "Add Product"
            : "Update Product"}
        </button>
      </div>
    </motion.form>
  );
}
