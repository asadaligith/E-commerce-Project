"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    category: "",
  });

  const [editingId, setEditingId] = useState<number | null>(null);

  const API = "http://localhost:4000/products";



  // ======================
  // FETCH PRODUCTS
  // ======================

  const fetchProducts = async () => {
    const response = await axios.get(API);
    setProducts(response.data.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);




  // ======================
  // HANDLE INPUT
  // ======================

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };




  // ======================
  // CREATE PRODUCT
  // ======================

  const createProduct = async () => {
    await axios.post(API, formData);

    setFormData({
      name: "",
      price: 0,
      category: "",
    });

    fetchProducts();
  };




  // ======================
  // UPDATE PRODUCT
  // ======================

  const updateProduct = async () => {
    await axios.put(`${API}/${editingId}`, formData);

    setEditingId(null);

    setFormData({
      name: "",
      price: 0,
      category: "",
    });

    fetchProducts();
  };




  // ======================
  // DELETE PRODUCT
  // ======================

  const deleteProduct = async (id: number) => {
    await axios.delete(`${API}/${id}`);

    fetchProducts();
  };




  // ======================
  // EDIT PRODUCT
  // ======================

  const editProduct = ( product: {
    id: number;
    name: string;
    price: number;
    category: string;
  }) => {
    setEditingId(product.id);

    setFormData({
      name: product.name,
      price: product.price,
      category: product.category,
    });
  };




  return (
    <div style={{ padding: "40px" }}>
      <h1>Ecommerce CRUD App</h1>

      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={formData.price || ""}
        onChange={handleChange}
      />

      <br />
      <br />

      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price || ""}
        onChange={handleChange}
      />

      <br />
      <br />

      <input
        type="text"
        name="category"
        placeholder="Category"
        value={formData.price || ""}
        onChange={handleChange}
      />

      <br />
      <br />

      {editingId ? (
        <button onClick={updateProduct}>
          Update Product
        </button>
      ) : (
        <button onClick={createProduct}>
          Add Product
        </button>
      )}

      <hr />

      <h2>All Products</h2>

      {products.map((product) => (
        <div
          key={product.id}
          style={{
            border: "1px solid gray",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h3>{product.name}</h3>

          <p>Price: {product.price}</p>

          <p>Category: {product.category}</p>

          <button onClick={() => editProduct(product)}>
            Edit
          </button>

          <button
            onClick={() => deleteProduct(product.id)}
            style={{ marginLeft: "10px" }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}