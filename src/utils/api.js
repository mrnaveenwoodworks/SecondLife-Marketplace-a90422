import axios from "axios";

// Create axios instance with default config
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json"
  }
});

// Array of categories for placeholder images
const PLACEHOLDER_CATEGORIES = [
  "electronics",
  "furniture",
  "clothing",
  "vehicles",
  "books",
  "sports"
];

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        localStorage.removeItem("authToken");
        window.location.href = "/auth";
      }
      
      if (error.response.status === 403) {
        console.error("Access forbidden");
      }
      
      if (error.response.status === 404) {
        console.error("Resource not found");
      }
      
      if (error.response.status >= 500) {
        console.error("Server error");
      }
    }
    return Promise.reject(error);
  }
);

// Placeholder image generation utilities
export const placeholderImages = {
  // Get a random placeholder from Unsplash
  getRandomUnsplash: async (category) => {
    const width = 800;
    const height = 600;
    const query = category || PLACEHOLDER_CATEGORIES[Math.floor(Math.random() * PLACEHOLDER_CATEGORIES.length)];
    const url = `https://source.unsplash.com/random/${width}x${height}/?${query}`;
    
    try {
      const response = await fetch(url);
      return response.url;
    } catch (error) {
      console.error("Failed to fetch Unsplash placeholder:", error);
      return null;
    }
  },

  // Get a random placeholder from Picsum
  getRandomPicsum: async () => {
    const width = 800;
    const height = 600;
    const randomId = Math.floor(Math.random() * 1000);
    return `https://picsum.photos/seed/${randomId}/${width}/${height}`;
  },

  // Get multiple random placeholders
  getMultiplePlaceholders: async (count = 1, category = null) => {
    const placeholders = [];
    const promises = [];

    // Alternate between Unsplash and Picsum for variety
    for (let i = 0; i < count; i++) {
      if (i % 2 === 0) {
        promises.push(placeholderImages.getRandomUnsplash(category));
      } else {
        promises.push(placeholderImages.getRandomPicsum());
      }
    }

    try {
      const results = await Promise.all(promises);
      return results.filter(url => url !== null);
    } catch (error) {
      console.error("Error generating multiple placeholders:", error);
      return [];
    }
  },

  // Generate a placeholder with specific dimensions and category
  generateCustomPlaceholder: async (width, height, category) => {
    try {
      const unsplashUrl = await placeholderImages.getRandomUnsplash(category);
      if (unsplashUrl) return unsplashUrl;
      
      // Fallback to Picsum if Unsplash fails
      return `https://picsum.photos/${width}/${height}`;
    } catch (error) {
      console.error("Error generating custom placeholder:", error);
      return `https://via.placeholder.com/${width}x${height}?text=Product+Image`;
    }
  }
};

// Auth APIs
export const auth = {
  login: async (credentials) => {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  },
  
  register: async (userData) => {
    const response = await api.post("/auth/register", userData);
    return response.data;
  },
  
  logout: async () => {
    const response = await api.post("/auth/logout");
    localStorage.removeItem("authToken");
    return response.data;
  },
  
  forgotPassword: async (email) => {
    const response = await api.post("/auth/forgot-password", { email });
    return response.data;
  },
  
  resetPassword: async (token, newPassword) => {
    const response = await api.post("/auth/reset-password", {
      token,
      newPassword
    });
    return response.data;
  },

  verifyEmail: async (token) => {
    const response = await api.post("/auth/verify-email", { token });
    return response.data;
  }
};

// User APIs
export const users = {
  getProfile: async (userId) => {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  },
  
  updateProfile: async (userId, userData) => {
    const response = await api.put(`/users/${userId}`, userData);
    return response.data;
  },
  
  uploadAvatar: async (userId, file) => {
    const formData = new FormData();
    formData.append("avatar", file);
    
    const response = await api.post(`/users/${userId}/avatar`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    return response.data;
  }
};

// Product APIs
export const products = {
  getAll: async (params) => {
    const response = await api.get("/products", { params });
    return response.data;
  },
  
  get: async (productId) => {
    const response = await api.get(`/products/${productId}`);
    return response.data;
  },
  
  create: async (productData) => {
    // If no images provided, generate placeholders
    if (!productData.images || productData.images.length === 0) {
      const category = productData.category || null;
      const placeholderUrls = await placeholderImages.getMultiplePlaceholders(3, category);
      productData.imageUrls = placeholderUrls;
    }
    
    const response = await api.post("/products", productData);
    return response.data;
  },
  
  update: async (productId, productData) => {
    const response = await api.put(`/products/${productId}`, productData);
    return response.data;
  },
  
  delete: async (productId) => {
    const response = await api.delete(`/products/${productId}`);
    return response.data;
  },
  
  uploadImages: async (productId, files) => {
    // If no files provided, generate placeholders
    if (!files || files.length === 0) {
      const product = await products.get(productId);
      const placeholderUrls = await placeholderImages.getMultiplePlaceholders(3, product.category);
      return { imageUrls: placeholderUrls };
    }
    
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("images", file);
    });
    
    const response = await api.post(`/products/${productId}/images`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    return response.data;
  },
  
  search: async (query) => {
    const response = await api.get("/products/search", { params: { query } });
    return response.data;
  }
};

// Categories APIs
export const categories = {
  getAll: async () => {
    const response = await api.get("/categories");
    return response.data;
  },
  
  get: async (categoryId) => {
    const response = await api.get(`/categories/${categoryId}`);
    return response.data;
  },
  
  getProducts: async (categoryId, params) => {
    const response = await api.get(`/categories/${categoryId}/products`, {
      params
    });
    return response.data;
  }
};

// Location APIs
export const locations = {
  search: async (query) => {
    const response = await api.get("/locations/search", {
      params: { query }
    });
    return response.data;
  },
  
  getCurrentLocation: async () => {
    const response = await api.get("/locations/current");
    return response.data;
  },
  
  getNearbyProducts: async (lat, lng, radius) => {
    const response = await api.get("/locations/nearby-products", {
      params: { lat, lng, radius }
    });
    return response.data;
  }
};

export default api;