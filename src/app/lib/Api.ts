export interface User {
  id?: number;
  name: string;
  email: string;
  role: string;
  status: string;
}


// Fetch users
export const fetchUsers = async (): Promise<User[]> => {
  const res = await fetch("http://localhost:5000/users");
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
};

// Delete user
export const deleteUser = async (id: number): Promise<void> => {
  const res = await fetch(`http://localhost:5000/users/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete user");
};

// Add user
export const addUser = async (user: User): Promise<User> => {
  const res = await fetch("http://localhost:5000/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error("Failed to add user");
  return res.json();
};


// lib/api.ts
export interface Product {
  id?: number;
  name: string;
  price: number;
  category: string;
  stock: number;
}

// --- Fetch All ---
export const fetchProducts = async (): Promise<Product[]> => {
  const res = await fetch("http://localhost:5000/products");
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};

// --- Add ---
export const addProduct = async (
  newProduct: Omit<Product, "id">
): Promise<Product> => {
  const res = await fetch("http://localhost:5000/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newProduct),
  });
  if (!res.ok) throw new Error("Failed to add product");
  return res.json();
};

// --- Update ---
export const updateProduct = async (product: Product): Promise<Product> => {
  const res = await fetch(`http://localhost:5000/products/${product.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error("Failed to update product");
  return res.json();
};

// --- Delete ---
export const deleteProduct = async (id: number): Promise<void> => {
  const res = await fetch(`http://localhost:5000/products/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete product");
};

