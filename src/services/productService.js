import axios from "axios";

const API_BASE_URL = "https://dummyjson.com";

// Function to fetch all products
export const fetchProducts = async () => {
  const response = await axios.get(`${API_BASE_URL}/products?limit=100`);
  return response.data.products;
};

// Function to fetch a single product by ID
export const fetchProductById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw error;
  }
};

// Function to fetch all products by a specific category
export const fetchProductsByCategory = async (category) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/products/category/${category}`,
    );
    return response.data.products;
  } catch (error) {
    // Handle the error appropriately
    console.error("Error fetching products by category:", error);
    return [];
  }
};

export const updateProductToCart = async (productId, quantity) => {
  try {
    return await axios.put(`${API_BASE_URL}/carts/1`, {
      merge: true,
      products: [
        {
          id: productId,
          quantity: quantity,
        },
      ],
    });
  } catch (error) {
    console.error("Failed to update the cart:", error);
    throw error;
  }
};
