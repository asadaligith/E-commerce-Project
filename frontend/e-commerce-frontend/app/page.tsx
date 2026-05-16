"use client";

import axios from "axios";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

interface Toast {
  id: number;
  message: string;
  type: "success" | "error" | "info";
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    category: "",
  });

  const [editingId, setEditingId] = useState<number | null>(null);

  // Use environment variable with fallback
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://e-commerce-project-backend-tau.vercel.app';
  const API = `${apiBaseUrl}/products`;

  // Debug logging
  useEffect(() => {
    console.log('API Base URL:', apiBaseUrl);
    console.log('Full API URL:', API);
  }, [API, apiBaseUrl]);

  // Toast notification
  const addToast = (message: string, type: "success" | "error" | "info" = "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  // ======================
  // FETCH PRODUCTS
  // ======================
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API);
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
      addToast("Failed to load products", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ======================
  // HANDLE INPUT
  // ======================
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    });
  };

  // ======================
  // VALIDATE FORM
  // ======================
  const validateForm = () => {
    if (!formData.name.trim()) {
      addToast("Product name is required", "error");
      return false;
    }
    if (formData.price <= 0) {
      addToast("Price must be greater than 0", "error");
      return false;
    }
    return true;
  };

  // ======================
  // CREATE PRODUCT
  // ======================
  const createProduct = async () => {
    if (!validateForm()) return;

    try {
      setSubmitting(true);
      await axios.post(API, formData);
      addToast("Product added successfully!", "success");

      setFormData({
        name: "",
        price: 0,
        category: "",
      });

      fetchProducts();
    } catch (error: any) {
      console.error("Error creating product:", error);
      addToast(
        error.response?.data?.message || "Failed to add product",
        "error"
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ======================
  // UPDATE PRODUCT
  // ======================
  const updateProduct = async () => {
    if (!validateForm()) return;

    try {
      setSubmitting(true);
      await axios.put(`${API}/${editingId}`, formData);
      addToast("Product updated successfully!", "success");

      setEditingId(null);

      setFormData({
        name: "",
        price: 0,
        category: "",
      });

      fetchProducts();
    } catch (error: any) {
      console.error("Error updating product:", error);
      addToast(
        error.response?.data?.message || "Failed to update product",
        "error"
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ======================
  // DELETE PRODUCT
  // ======================
  const deleteProduct = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      await axios.delete(`${API}/${id}`);
      addToast("Product deleted successfully!", "success");
      fetchProducts();
    } catch (error: any) {
      console.error("Error deleting product:", error);
      addToast(
        error.response?.data?.message || "Failed to delete product",
        "error"
      );
    }
  };

  // ======================
  // EDIT PRODUCT
  // ======================
  const editProduct = (product: Product) => {
    setEditingId(product.id);

    setFormData({
      name: product.name,
      price: product.price,
      category: product.category,
    });

    // Scroll to form
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ======================
  // CANCEL EDIT
  // ======================
  const cancelEdit = () => {
    setEditingId(null);
    setFormData({
      name: "",
      price: 0,
      category: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Toast Notifications */}
      <div className="fixed top-4 right-4 space-y-2 z-50">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`px-4 py-3 rounded-lg shadow-lg text-white font-medium animate-in ${
              toast.type === "success"
                ? "bg-green-500"
                : toast.type === "error"
                ? "bg-red-500"
                : "bg-blue-500"
            }`}
          >
            {toast.message}
          </div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-black mb-2">
             E-Commerce CRUD Dashboard
          </h1>
          <p className="text-gray-600">Manage your products efficiently</p>
        </div>

        {/* Add/Edit Product Form */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {editingId ? "Edit Product" : "Add New Product"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-black-900 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter product name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Price (PKR) *
              </label>
              <input
                type="number"
                name="price"
                placeholder="Enter price"
                value={formData.price || ""}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Category
              </label>
              <input
                type="text"
                name="category"
                placeholder="Enter category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-end gap-2">
              {editingId ? (
                <>
                  <button
                    onClick={updateProduct}
                    disabled={submitting}
                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                  >
                    {submitting ? "Updating..." : "Update"}
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={createProduct}
                  disabled={submitting}
                  className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                >
                  {submitting ? "Adding..." : "Add Product"}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Products List */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Products ({products.length})
          </h2>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              <p className="mt-4 text-gray-600">Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No products found. Add your first product!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow"
                >
                  <div className="mb-3">
                    <h3 className="text-lg font-bold text-gray-900">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      #{product.id}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded p-3 mb-4">
                    <p className="text-2xl font-bold text-green-600">
                      Rs. {product.price}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Category: <span className="font-medium">{product.category || "Uncategorized"}</span>
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => editProduct(product)}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-3 rounded-lg transition-colors"
                    >
                       Edit
                    </button>

                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-3 rounded-lg transition-colors"
                    >
                       Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
