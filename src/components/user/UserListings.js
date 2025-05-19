import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../products/ProductCard";

const UserListings = ({ userId }) => {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("active");
  const [sortBy, setSortBy] = useState("newest");

  // Mock data - replace with API call in production
  useEffect(() => {
    const fetchListings = async () => {
      try {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock listings data
        const mockListings = [
          {
            id: "1",
            title: "iPhone 12 Pro Max",
            description: "Excellent condition, includes original box and accessories",
            price: 699.99,
            originalPrice: 999.99,
            condition: "used-good",
            location: "New York, NY",
            postedDate: "2023-11-20T10:00:00Z",
            status: "active",
            images: [
              "https://images.unsplash.com/photo-1599202860130-f600f4948364?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHNlYXJjaHwxfHxpUGhvbmUlMkIxMiUyQlBybyUyQk1heCUyQmZyb250JTJCdmlld3xlbnwwfHx8fDE3NDc1NTA1NTV8MA&ixlib=rb-4.1.0&q=80&w=1080",
              "https://images.unsplash.com/photo-1599202860130-f600f4948364?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHNlYXJjaHwxfHxpUGhvbmUlMkIxMiUyQlBybyUyQk1heCUyQmJhY2slMkJ2aWV3fGVufDB8fHx8MTc0NzU1MDU1NXww&ixlib=rb-4.1.0&q=80&w=1080"
            ],
            views: 156,
            favorites: 12,
            messages: 5
          },
          {
            id: "2",
            title: "MacBook Pro 16\"",
            description: "2021 Model, M1 Pro chip, barely used",
            price: 1499.99,
            originalPrice: 2499.99,
            condition: "used-like-new",
            location: "New York, NY",
            postedDate: "2023-11-15T15:30:00Z",
            status: "sold",
            images: [
              "https://images.unsplash.com/photo-1600262300216-f531931b5ab9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHNlYXJjaHwxfHxNYWNCb29rJTJCUHJvJTJCbWFpbiUyQnZpZXd8ZW58MHx8fHwxNzQ3NTUwNTU4fDA&ixlib=rb-4.1.0&q=80&w=1080",
              "https://images.unsplash.com/photo-1600262300216-f531931b5ab9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHNlYXJjaHwxfHxNYWNCb29rJTJCUHJvJTJCc2lkZSUyQnZpZXd8ZW58MHx8fHwxNzQ3NTUwNTU4fDA&ixlib=rb-4.1.0&q=80&w=1080"
            ],
            views: 234,
            favorites: 18,
            messages: 8,
            soldDate: "2023-11-19T14:20:00Z",
            soldPrice: 1450.00
          },
          {
            id: "3",
            title: "Sony WH-1000XM4",
            description: "Noise cancelling headphones, great condition",
            price: 199.99,
            originalPrice: 349.99,
            condition: "used-good",
            location: "New York, NY",
            postedDate: "2023-11-18T09:15:00Z",
            status: "inactive",
            images: [
              "https://images.unsplash.com/photo-1526509867162-5b0c0d1b4b33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHNlYXJjaHwxfHxTb255JTJCaGVhZHBob25lcyUyQm1haW4lMkJ2aWV3fGVufDB8fHx8MTc0NzU1MDU2Mnww&ixlib=rb-4.1.0&q=80&w=1080",
              "https://images.unsplash.com/photo-1526509867162-5b0c0d1b4b33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHNlYXJjaHwxfHxTb255JTJCaGVhZHBob25lcyUyQmNhc2UlMkJ2aWV3fGVufDB8fHx8MTc0NzU1MDU2Mnww&ixlib=rb-4.1.0&q=80&w=1080"
            ],
            views: 89,
            favorites: 7,
            messages: 2
          }
        ];

        setListings(mockListings);
        setError(null);
      } catch (err) {
        setError("Failed to load listings");
        console.error("Error fetching listings:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListings();
  }, [userId]);

  const handleEditListing = (listingId) => {
    navigate(`/edit-listing/${listingId}`);
  };

  const handleDeleteListing = async (listingId) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        setListings(listings.filter(listing => listing.id !== listingId));
      } catch (err) {
        console.error("Error deleting listing:", err);
      }
    }
  };

  const handleToggleStatus = async (listingId) => {
    try {
      const listing = listings.find(l => l.id === listingId);
      const newStatus = listing.status === "active" ? "inactive" : "active";
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setListings(listings.map(l => 
        l.id === listingId ? { ...l, status: newStatus } : l
      ));
    } catch (err) {
      console.error("Error updating listing status:", err);
    }
  };

  const handleMarkAsSold = async (listingId) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setListings(listings.map(l => 
        l.id === listingId ? { 
          ...l, 
          status: "sold",
          soldDate: new Date().toISOString(),
          soldPrice: l.price
        } : l
      ));
    } catch (err) {
      console.error("Error marking listing as sold:", err);
    }
  };

  const filteredListings = listings.filter(listing => {
    switch (activeTab) {
      case "active":
        return listing.status === "active";
      case "inactive":
        return listing.status === "inactive";
      case "sold":
        return listing.status === "sold";
      default:
        return true;
    }
  }).sort((a, b) => {
    switch (sortBy) {
      case "oldest":
        return new Date(a.postedDate) - new Date(b.postedDate);
      case "price-high":
        return b.price - a.price;
      case "price-low":
        return a.price - b.price;
      case "most-viewed":
        return b.views - a.views;
      default: // newest
        return new Date(b.postedDate) - new Date(a.postedDate);
    }
  });

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        {[1, 2, 3].map((n) => (
          <div key={n} className="bg-white p-4 rounded-lg shadow">
            <div className="h-40 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="48" height="48"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="128" y1="132" x2="128" y2="80" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="128" cy="172" r="16"/></svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900">Failed to Load Listings</h3>
        <p className="mt-2 text-gray-500">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Tabs and Sort Controls */}
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
        <div className="flex space-x-1 rounded-lg bg-gray-100 p-1">
          <button
            onClick={() => setActiveTab("active")}
            className={`px-4 py-2 text-sm rounded-md ${
              activeTab === "active"
                ? "bg-white shadow text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Active ({listings.filter(l => l.status === "active").length})
          </button>
          <button
            onClick={() => setActiveTab("inactive")}
            className={`px-4 py-2 text-sm rounded-md ${
              activeTab === "inactive"
                ? "bg-white shadow text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Inactive ({listings.filter(l => l.status === "inactive").length})
          </button>
          <button
            onClick={() => setActiveTab("sold")}
            className={`px-4 py-2 text-sm rounded-md ${
              activeTab === "sold"
                ? "bg-white shadow text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Sold ({listings.filter(l => l.status === "sold").length})
          </button>
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="block w-full sm:w-48 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="price-high">Price: High to Low</option>
          <option value="price-low">Price: Low to High</option>
          <option value="most-viewed">Most Viewed</option>
        </select>
      </div>

      {/* Listings Grid */}
      {filteredListings.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="96" height="96"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="88" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="208" y1="40" x2="48" y2="216" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No listings found</h3>
          <p className="mt-2 text-sm text-gray-500">
            {activeTab === "active"
              ? "You don't have any active listings"
              : activeTab === "inactive"
              ? "You don't have any inactive listings"
              : "You haven't sold any items yet"}
          </p>
          {activeTab !== "sold" && (
            <button
              onClick={() => navigate("/post-item")}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Create New Listing
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <div key={listing.id} className="relative group">
              <ProductCard product={listing} />
              
              {/* Overlay Actions */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditListing(listing.id)}
                    className="p-2 bg-white rounded-full hover:bg-gray-100"
                    title="Edit listing"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><rect x="48" y="120" width="88" height="88" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M208,188v12a8,8,0,0,1-8,8H180" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="208" y1="116" x2="208" y2="140" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M184,48h16a8,8,0,0,1,8,8V72" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="116" y1="48" x2="140" y2="48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M48,76V56a8,8,0,0,1,8-8H68" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                  </button>
                  
                  {listing.status !== "sold" && (
                    <button
                      onClick={() => handleToggleStatus(listing.id)}
                      className="p-2 bg-white rounded-full hover:bg-gray-100"
                      title={listing.status === "active" ? "Deactivate" : "Activate"}
                    >
                      {listing.status === "active" ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><rect x="152" y="40" width="56" height="176" rx="8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><rect x="48" y="40" width="56" height="176" rx="8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><path d="M170.83,118.13l-52-36A12,12,0,0,0,100,92v72a12,12,0,0,0,18.83,9.87l52-36a12,12,0,0,0,0-19.74Z"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                      )}
                    </button>
                  )}
                  
                  {listing.status === "active" && (
                    <button
                      onClick={() => handleMarkAsSold(listing.id)}
                      className="p-2 bg-white rounded-full hover:bg-gray-100"
                      title="Mark as sold"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><polyline points="88 136 112 160 168 104" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><rect x="40" y="40" width="176" height="176" rx="8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                    </button>
                  )}
                  
                  <button
                    onClick={() => handleDeleteListing(listing.id)}
                    className="p-2 bg-white rounded-full hover:bg-gray-100"
                    title="Delete listing"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><line x1="216" y1="60" x2="40" y2="60" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="88" y1="20" x2="168" y2="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M200,60V208a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V60" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                  </button>
                </div>
              </div>

              {/* Status Badge */}
              <div className="absolute top-2 left-2">
                {listing.status === "inactive" && (
                  <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                    Inactive
                  </span>
                )}
                {listing.status === "sold" && (
                  <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                    Sold
                  </span>
                )}
              </div>

              {/* Stats */}
              <div className="absolute bottom-2 left-2 right-2 flex justify-between text-xs text-white bg-black bg-opacity-50 px-2 py-1 rounded">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="12" height="12"><rect width="256" height="256" fill="none"/><path d="M128,56C48,56,16,128,16,128s32,72,112,72,112-72,112-72S208,56,128,56Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="128" cy="128" r="32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                  <span className="ml-1">{listing.views}</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="12" height="12"><rect width="256" height="256" fill="none"/><path d="M128,224S24,168,24,102A54,54,0,0,1,78,48c22.59,0,41.94,12.31,50,32Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M128,80c6.84-16.71,21.81-27.67,40-31.08" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M208,57.09A54,54,0,0,1,231.67,96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M223.3,136c-5.8,11.65-14.05,22.63-23.3,32.63" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M168,197.49A328.1,328.1,0,0,1,128,224" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                  <span className="ml-1">{listing.favorites}</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="12" height="12"><rect width="256" height="256" fill="none"/><line x1="96" y1="100" x2="160" y2="100" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="96" y1="140" x2="160" y2="140" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M105.07,192l16,28a8,8,0,0,0,13.9,0l16-28H216a8,8,0,0,0,8-8V56a8,8,0,0,0-8-8H40a8,8,0,0,0-8,8V184a8,8,0,0,0,8,8Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                  <span className="ml-1">{listing.messages}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserListings;