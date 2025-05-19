import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import ProductGrid from "../components/products/ProductGrid";
import ProductFilters from "../components/products/ProductFilters";
import SearchBar from "../components/ui/SearchBar";

const ProductListPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortOption, setSortOption] = useState("newest");

  // Mock data for demonstration - replace with API call in production
  const mockProducts = useMemo(() => [
    {
      id: 1,
      title: "iPhone 12 Pro Max",
      description: "Excellent condition, barely used",
      price: 699.99,
      originalPrice: 999.99,
      location: "New York, NY",
      postedDate: "2023-11-20T10:00:00Z",
      images: [
        "https://images.unsplash.com/photo-1599202860130-f600f4948364?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHNlYXJjaHwxfHxpUGhvbmUlMkIxMiUyQlBybyUyQk1heCUyQm1haW4lMkJpbWFnZXxlbnwwfHx8fDE3NDc1NDk4NzN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1599202860130-f600f4948364?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHNlYXJjaHwxfHxpUGhvbmUlMkIxMiUyQlBybyUyQk1heCUyQnNpZGUlMkJ2aWV3fGVufDB8fHx8MTc0NzU0OTg3M3ww&ixlib=rb-4.1.0&q=80&w=1080"
      ],
      seller: {
        id: 1,
        name: "John Doe",
        rating: 4.8,
        avatar: "https://images.unsplash.com/photo-1505033575518-a36ea2ef75ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHNlYXJjaHwxfHxzZWxsZXIlMkJwcm9maWxlJTJCcGljdHVyZXxlbnwwfHx8fDE3NDc1NDk4NzR8MA&ixlib=rb-4.1.0&q=80&w=1080"
      },
      features: ["5G", "256GB", "Pacific Blue"],
      isFeatured: true
    },
    {
      id: 2,
      title: "MacBook Pro 16\"",
      description: "2021 Model, M1 Pro chip",
      price: 1499.99,
      originalPrice: 2499.99,
      location: "San Francisco, CA",
      postedDate: "2023-11-19T15:30:00Z",
      images: [
        "https://images.unsplash.com/photo-1600262300216-f531931b5ab9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHNlYXJjaHwxfHxNYWNCb29rJTJCUHJvJTJCbWFpbiUyQmltYWdlfGVufDB8fHx8MTc0NzU0OTg3N3ww&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1557733686-3f8641465d21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHNlYXJjaHwxfHxNYWNCb29rJTJCUHJvJTJCa2V5Ym9hcmQlMkJ2aWV3fGVufDB8fHx8MTc0NzU0OTg3OHww&ixlib=rb-4.1.0&q=80&w=1080"
      ],
      seller: {
        id: 2,
        name: "Jane Smith",
        rating: 4.9,
        avatar: "https://images.unsplash.com/photo-1505033575518-a36ea2ef75ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHNlYXJjaHwxfHxzZWxsZXIlMkJwcm9maWxlJTJCcGljdHVyZXxlbnwwfHx8fDE3NDc1NDk4NzR8MA&ixlib=rb-4.1.0&q=80&w=1080"
      },
      features: ["M1 Pro", "16GB RAM", "512GB SSD"],
      isFeatured: false
    }
  ], []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Get search parameters
        const query = searchParams.get("q");
        const category = searchParams.get("category");
        const minPrice = searchParams.get("minPrice");
        const maxPrice = searchParams.get("maxPrice");
        const condition = searchParams.get("condition");
        const location = searchParams.get("location");
        
        // Filter mock products based on search parameters
        let filteredProducts = [...mockProducts];
        
        if (query) {
          filteredProducts = filteredProducts.filter(product =>
            product.title.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase())
          );
        }
        
        if (category) {
          // Add category filtering logic
        }
        
        if (minPrice) {
          filteredProducts = filteredProducts.filter(product =>
            product.price >= parseFloat(minPrice)
          );
        }
        
        if (maxPrice) {
          filteredProducts = filteredProducts.filter(product =>
            product.price <= parseFloat(maxPrice)
          );
        }
        
        if (condition) {
          // Add condition filtering logic
        }
        
        if (location) {
          filteredProducts = filteredProducts.filter(product =>
            product.location.toLowerCase().includes(location.toLowerCase())
          );
        }
        
        // Sort products
        if (sortOption === "price-low") {
          filteredProducts.sort((a, b) => a.price - b.price);
        } else if (sortOption === "price-high") {
          filteredProducts.sort((a, b) => b.price - a.price);
        } else {
          // "newest" is default
          filteredProducts.sort((a, b) => 
            new Date(b.postedDate) - new Date(a.postedDate)
          );
        }
        
        setProducts(filteredProducts);
        setError(null);
      } catch (err) {
        setError("Failed to fetch products. Please try again later.");
        console.error("Error fetching products:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [searchParams, sortOption, mockProducts]);

  const handleFilterChange = (newFilters) => {
    // Update URL with new filter parameters
    const params = new URLSearchParams(searchParams);
    
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value && value.length > 0) {
        params.set(key, Array.isArray(value) ? value.join(",") : value);
      } else {
        params.delete(key);
      }
    });
    
    navigate({
      search: params.toString()
    });
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {searchParams.get("q")
            ? `Search Results for "${searchParams.get("q")}"`
            : searchParams.get("category")
            ? `${searchParams.get("category")} Products`
            : "All Products"
          }
        </h1>
        
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[300px]">
            <SearchBar />
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleFilters}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><rect x="48" y="120" width="88" height="88" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M208,188v12a8,8,0,0,1-8,8H180" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="208" y1="116" x2="208" y2="140" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M184,48h16a8,8,0,0,1,8,8V72" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="116" y1="48" x2="140" y2="48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M48,76V56a8,8,0,0,1,8-8H68" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
              <span className="ml-2">Filters</span>
            </button>
            
            <select
              value={sortOption}
              onChange={handleSortChange}
              className="block w-full pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar - Desktop */}
        <div className={`
          hidden lg:block w-64 flex-shrink-0
          ${showFilters ? "block" : "hidden"}
        `}>
          <ProductFilters
            onFilterChange={handleFilterChange}
            initialFilters={{
              category: searchParams.get("category")?.split(",") || [],
              priceRange: [
                parseFloat(searchParams.get("minPrice")) || 0,
                parseFloat(searchParams.get("maxPrice")) || 1000
              ],
              condition: searchParams.get("condition")?.split(",") || [],
              location: searchParams.get("location") || ""
            }}
          />
        </div>

        {/* Filters Modal - Mobile */}
        {showFilters && (
          <div className="lg:hidden fixed inset-0 z-50 overflow-hidden">
            <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            
            <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
              <div className="relative w-96 bg-white">
                <div className="h-full flex flex-col py-6 shadow-xl overflow-y-scroll">
                  <div className="px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                      <button
                        onClick={toggleFilters}
                        className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><rect x="88" y="88" width="80" height="80" rx="12"/></svg>
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-6 px-4 sm:px-6">
                    <ProductFilters
                      onFilterChange={handleFilterChange}
                      initialFilters={{
                        category: searchParams.get("category")?.split(",") || [],
                        priceRange: [
                          parseFloat(searchParams.get("minPrice")) || 0,
                          parseFloat(searchParams.get("maxPrice")) || 1000
                        ],
                        condition: searchParams.get("condition")?.split(",") || [],
                        location: searchParams.get("location") || ""
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Product Grid */}
        <div className="flex-1">
          {/* Active Filters */}
          {Object.keys(searchParams).length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {Array.from(searchParams.entries()).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => {
                    const params = new URLSearchParams(searchParams);
                    params.delete(key);
                    navigate({ search: params.toString() });
                  }}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                >
                  <span>{key}: {value}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16"><rect width="256" height="256" fill="none"/><line x1="200" y1="56" x2="56" y2="200" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="200" y1="200" x2="56" y2="56" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                </button>
              ))}
              
              <button
                onClick={() => navigate({ search: "" })}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200"
              >
                Clear all filters
              </button>
            </div>
          )}
          
          <ProductGrid
            products={products}
            isLoading={isLoading}
            error={error}
            showFilters={false}
          />
          
          {!isLoading && !error && products.length === 0 && (
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="96" height="96"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="88" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="208" y1="40" x2="48" y2="216" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">No products found</h3>
              <p className="mt-2 text-sm text-gray-500">
                Try adjusting your filters or search for something else
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;