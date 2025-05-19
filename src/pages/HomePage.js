import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductGrid from "../components/products/ProductGrid";

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Categories data
  const categories = [
    {
      id: "electronics",
      name: "Electronics",
      icon: "devices",
      image: "https://images.unsplash.com/photo-1591799265444-d66432b91588?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljcyUyQmNhdGVnb3J5fGVufDB8fHx8MTc0NzU1MDY1N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      itemCount: 2345
    },
    {
      id: "furniture",
      name: "Furniture",
      icon: "furniture",
      image: "https://images.unsplash.com/photo-1567016432779-094069958ea5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHNlYXJjaHwxfHxmdXJuaXR1cmUlMkJjYXRlZ29yeXxlbnwwfHx8fDE3NDc1NTA2NTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      itemCount: 1876
    },
    {
      id: "clothing",
      name: "Clothing",
      icon: "clothing",
      image: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHNlYXJjaHwxfHxjbG90aGluZyUyQmNhdGVnb3J5fGVufDB8fHx8MTc0NzU1MDY1OHww&ixlib=rb-4.1.0&q=80&w=1080",
      itemCount: 3421
    },
    {
      id: "vehicles",
      name: "Vehicles",
      icon: "car",
      image: "https://images.unsplash.com/photo-1522780209919-d8d8b64e0e9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHNlYXJjaHwxfHx2ZWhpY2xlcyUyQmNhdGVnb3J5fGVufDB8fHx8MTc0NzU1MDY1OXww&ixlib=rb-4.1.0&q=80&w=1080",
      itemCount: 892
    }
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock featured products data
        const mockFeaturedProducts = [
          {
            id: "1",
            title: "iPhone 12 Pro Max",
            description: "Excellent condition, includes original box",
            price: 699.99,
            originalPrice: 999.99,
            location: "New York, NY",
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHNlYXJjaHwxfHxpUGhvbmUlMkJwcm9kdWN0JTJCaW1hZ2V8ZW58MHx8fHwxNzQ3NTUwNjYyfDA&ixlib=rb-4.1.0&q=80&w=1080",
            seller: {
              name: "John Doe",
              rating: 4.8
            },
            postedDate: "2023-11-20T10:00:00Z"
          },
          // Add more mock products...
        ];

        // Mock trending products data
        const mockTrendingProducts = [
          {
            id: "2",
            title: "MacBook Pro 16\"",
            description: "2021 Model, M1 Pro chip",
            price: 1499.99,
            originalPrice: 2499.99,
            location: "Los Angeles, CA",
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHNlYXJjaHwxfHxNYWNCb29rJTJCcHJvZHVjdCUyQmltYWdlfGVufDB8fHx8MTc0NzU1MDY2NXww&ixlib=rb-4.1.0&q=80&w=1080",
            seller: {
              name: "Jane Smith",
              rating: 4.9
            },
            postedDate: "2023-11-19T15:30:00Z"
          },
          // Add more mock products...
        ];

        setFeaturedProducts(mockFeaturedProducts);
        setTrendingProducts(mockTrendingProducts);
        setError(null);
      } catch (err) {
        setError("Failed to load products. Please try again later.");
        console.error("Error fetching products:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-blue-600 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <img src="https://images.unsplash.com/photo-1491895200222-0fc4a4c35e18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHNlYXJjaHwxfHxoZXJvJTJCYmFja2dyb3VuZCUyQnBhdHRlcm58ZW58MHx8fHwxNzQ3NTUwNjY5fDA&ixlib=rb-4.1.0&q=80&w=1080" alt="hero background pattern" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Buy and Sell with Confidence
            </h1>
            <p className="mt-6 text-xl max-w-3xl mx-auto">
              Join thousands of users buying and selling pre-loved items in your local area.
              Great deals are waiting for you!
            </p>
            <div className="mt-10 flex justify-center space-x-4">
              <Link
                to="/post-item"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="88" y1="128" x2="168" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="128" y1="88" x2="128" y2="168" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                <span className="ml-2">Post an Item</span>
              </Link>
              <Link
                to="/browse"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-400"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><rect x="48" y="120" width="88" height="88" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M208,188v12a8,8,0,0,1-8,8H180" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="208" y1="116" x2="208" y2="140" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M184,48h16a8,8,0,0,1,8,8V72" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="116" y1="48" x2="140" y2="48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M48,76V56a8,8,0,0,1,8-8H68" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                <span className="ml-2">Browse Items</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Categories</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="group relative rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {category.name}
                    </h3>
                    <p className="text-sm text-white/80">
                      {category.itemCount.toLocaleString()} items
                    </p>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><path d="M40,156H76.69a8,8,0,0,1,5.65,2.34l19.32,19.32a8,8,0,0,0,5.65,2.34h41.38a8,8,0,0,0,5.65-2.34l19.32-19.32a8,8,0,0,1,5.65-2.34H216" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><rect x="40" y="40" width="176" height="176" rx="8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="128" y1="76" x2="128" y2="140" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><polyline points="96 108 128 140 160 108" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Items Section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Featured Items</h2>
            <Link
              to="/featured"
              className="text-blue-600 hover:text-blue-500 flex items-center"
            >
              View all
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16"><rect width="256" height="256" fill="none"/><rect x="40" y="40" width="176" height="176" rx="8" transform="translate(256 0) rotate(90)" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><polyline points="144 96 96 96 96 144" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="160" y1="160" x2="96" y2="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
            </Link>
          </div>
          <ProductGrid
            products={featuredProducts}
            isLoading={isLoading}
            error={error}
            gridLayout="featured"
          />
        </div>
      </div>

      {/* Trending Items Section */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Trending Now</h2>
            <Link
              to="/trending"
              className="text-blue-600 hover:text-blue-500 flex items-center"
            >
              View all
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16"><rect width="256" height="256" fill="none"/><rect x="40" y="40" width="176" height="176" rx="8" transform="translate(256 0) rotate(90)" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><polyline points="144 96 96 96 96 144" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="160" y1="160" x2="96" y2="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
            </Link>
          </div>
          <ProductGrid
            products={trendingProducts}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </div>

      {/* Download App Section */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white">
                Get the SecondLife App
              </h2>
              <p className="mt-4 text-lg text-blue-100">
                Browse items, message sellers, and get notified about new deals instantly.
                Download our mobile app to get the full SecondLife experience.
              </p>
              <div className="mt-8 flex space-x-4">
                <button
                  type="button"
                  className="inline-block"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("App Store link - This would open the App Store in production");
                  }}
                >
                  <img src="https://images.unsplash.com/photo-1528260249572-a56fc30084ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHNlYXJjaHwxfHxhcHAlMkJzdG9yZSUyQmJhZGdlfGVufDB8fHx8MTc0NzU1MDY5N3ww&ixlib=rb-4.1.0&q=80&w=1080" alt="app store badge" />
                </button>
                <button
                  type="button"
                  className="inline-block"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Play Store link - This would open the Play Store in production");
                  }}
                >
                  <img src="https://images.unsplash.com/photo-1528260249572-a56fc30084ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHNlYXJjaHwxfHxnb29nbGUlMkJwbGF5JTJCYmFkZ2V8ZW58MHx8fHwxNzQ3NTUwNjk4fDA&ixlib=rb-4.1.0&q=80&w=1080" alt="google play badge" />
                </button>
              </div>
            </div>
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1517292987719-0369a794ec0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMkJhcHAlMkJzaG93Y2FzZXxlbnwwfHx8fDE3NDc1NTA2OTh8MA&ixlib=rb-4.1.0&q=80&w=1080" alt="mobile app showcase" />
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges Section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="40" height="40"><rect width="256" height="256" fill="none"/><path d="M216,112V56a8,8,0,0,0-8-8H48a8,8,0,0,0-8,8v56c0,96,88,120,88,120S216,208,216,112Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><polyline points="88 136 112 160 168 104" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">Secure Payments</h3>
              <p className="mt-1 text-sm text-gray-500">
                Protected transactions for buyers and sellers
              </p>
            </div>
            <div className="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="40" height="40"><rect width="256" height="256" fill="none"/><circle cx="80" cy="172" r="28" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="80" cy="60" r="28" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="176" cy="172" r="28" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="176" cy="60" r="28" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M32,224a60,60,0,0,1,96,0,60,60,0,0,1,96,0" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M32,112a60,60,0,0,1,96,0h0a60,60,0,0,1,96,0" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">Verified Users</h3>
              <p className="mt-1 text-sm text-gray-500">
                Trusted community of buyers and sellers
              </p>
            </div>
            <div className="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="40" height="40"><rect width="256" height="256" fill="none"/><rect x="48" y="120" width="88" height="88" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M208,188v12a8,8,0,0,1-8,8H180" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="208" y1="116" x2="208" y2="140" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M184,48h16a8,8,0,0,1,8,8V72" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="116" y1="48" x2="140" y2="48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M48,76V56a8,8,0,0,1,8-8H68" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">24/7 Support</h3>
              <p className="mt-1 text-sm text-gray-500">
                Here to help whenever you need us
              </p>
            </div>
            <div className="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="40" height="40"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M176,211.16V176a8,8,0,0,0-8-8H88a8,8,0,0,0-8,8v35.16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M96,168V136a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M147.84,128,135.71,84.44a8,8,0,0,0-15.42,0L108.16,128Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">Local Deals</h3>
              <p className="mt-1 text-sm text-gray-500">
                Find great deals in your area
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:py-16 lg:px-8">
          <div className="px-6 py-6 bg-blue-600 rounded-lg md:py-12 md:px-12 lg:py-16 lg:px-16 xl:flex xl:items-center">
            <div className="xl:w-0 xl:flex-1">
              <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                Want product news and updates?
              </h2>
              <p className="mt-3 max-w-3xl text-lg leading-6 text-blue-100">
                Sign up for our newsletter to stay up to date.
              </p>
            </div>
            <div className="mt-8 sm:w-full sm:max-w-md xl:mt-0 xl:ml-8">
              <form className="sm:flex">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email-address"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full rounded-md border-white px-5 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
                  placeholder="Enter your email"
                />
                <button
                  type="submit"
                  className="mt-3 w-full flex items-center justify-center px-5 py-3 border border-transparent shadow text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 sm:mt-0 sm:ml-3 sm:w-auto sm:flex-shrink-0"
                >
                  Notify me
                </button>
              </form>
              <p className="mt-3 text-sm text-blue-100">
                We care about your data. Read our{" "}
                <Link to="/privacy" className="font-medium text-white underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;