import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { formatDistanceToNow } from "date-fns";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [message, setMessage] = useState("");

  // Mock product data - replace with API call in production
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock product data
        const mockProduct = {
          id: id,
          title: "iPhone 12 Pro Max",
          description: "Excellent condition iPhone 12 Pro Max, 256GB Pacific Blue. Includes original box, charger, and unused earphones. Minor scratch on back corner, screen protector applied since day one. Battery health at 89%.",
          price: 699.99,
          originalPrice: 999.99,
          condition: "used-good",
          location: "New York, NY",
          postedDate: "2023-11-20T10:00:00Z",
          category: "Electronics",
          subcategory: "Phones",
          images: [
            "https://images.unsplash.com/photo-1599202860130-f600f4948364?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHNlYXJjaHwxfHxpUGhvbmUlMkIxMiUyQlBybyUyQk1heCUyQm1haW4lMkJ2aWV3fGVufDB8fHx8MTc0NzU1MDAzOXww&ixlib=rb-4.1.0&q=80&w=1080",
            "https://images.unsplash.com/photo-1599202860130-f600f4948364?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHNlYXJjaHwxfHxpUGhvbmUlMkIxMiUyQlBybyUyQk1heCUyQnNpZGUlMkJ2aWV3fGVufDB8fHx8MTc0NzU0OTg3M3ww&ixlib=rb-4.1.0&q=80&w=1080",
            "https://images.unsplash.com/photo-1599202860130-f600f4948364?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHNlYXJjaHwxfHxpUGhvbmUlMkIxMiUyQlBybyUyQk1heCUyQmJhY2slMkJ2aWV3JTJCc2hvd2luZyUyQnNjcmF0Y2h8ZW58MHx8fHwxNzQ3NTUwMDQwfDA&ixlib=rb-4.1.0&q=80&w=1080",
            "https://images.unsplash.com/photo-1599202860130-f600f4948364?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHNlYXJjaHwxfHxpUGhvbmUlMkIxMiUyQlBybyUyQk1heCUyQndpdGglMkJvcmlnaW5hbCUyQmJveCUyQmFuZCUyQmFjY2Vzc29yaWVzfGVufDB8fHx8MTc0NzU1MDA0MHww&ixlib=rb-4.1.0&q=80&w=1080"
          ],
          features: [
            "5G Capable",
            "256GB Storage",
            "Pacific Blue",
            "Face ID",
            "Professional Camera System"
          ],
          seller: {
            id: "seller123",
            name: "John Doe",
            avatar: "https://images.unsplash.com/photo-1505033575518-a36ea2ef75ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHNlYXJjaHwxfHxTZWxsZXIlMkJwcm9maWxlJTJCcGljdHVyZXxlbnwwfHx8fDE3NDc1NTMxODd8MA&ixlib=rb-4.1.0&q=80&w=1080",
            joinDate: "2022-01-15T00:00:00Z",
            rating: 4.8,
            totalSales: 45,
            responseRate: 98,
            responseTime: "within 2 hours",
            verified: true
          },
          views: 234,
          favorites: 18,
          meetupLocation: "Any safe public place within NYC",
          shippingAvailable: true,
          shippingPrice: 15.99
        };

        setProduct(mockProduct);
        setError(null);
      } catch (err) {
        setError("Failed to load product details. Please try again later.");
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleContactSeller = () => {
    if (!isAuthenticated) {
      navigate("/auth", { 
        state: { 
          from: `/product/${id}`,
          message: "Please log in to contact the seller" 
        } 
      });
      return;
    }
    setShowContactInfo(true);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      // Mock API call to send message
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate(`/messages?seller=${product.seller.id}&product=${product.id}`);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const toggleFavorite = async () => {
    if (!isAuthenticated) {
      navigate("/auth", { 
        state: { 
          from: `/product/${id}`,
          message: "Please log in to save items to favorites" 
        } 
      });
      return;
    }

    setIsFavorited(!isFavorited);
    // In production, make API call to update favorites
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: `Check out this ${product.title} on SecondLife Marketplace`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-96 bg-gray-200 rounded-lg mb-8"></div>
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="48" height="48"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="128" y1="132" x2="128" y2="80" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="128" cy="172" r="16"/></svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Product</h2>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-w-4 aspect-h-3 rounded-lg overflow-hidden bg-gray-100">
            <img
              src={product.images[selectedImage]}
              alt={`${product.title} - View ${selectedImage + 1}`}
              className="w-full h-full object-cover"
            />
            
            {/* Image Navigation Arrows */}
            {selectedImage > 0 && (
              <button
                onClick={() => setSelectedImage(selectedImage - 1)}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><polyline points="96 112 96 160 144 160" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="160" y1="96" x2="96" y2="160" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
              </button>
            )}
            {selectedImage < product.images.length - 1 && (
              <button
                onClick={() => setSelectedImage(selectedImage + 1)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="160" y1="160" x2="96" y2="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><polyline points="160 112 160 160 112 160" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
              </button>
            )}
          </div>
          
          {/* Thumbnail Grid */}
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`
                  relative aspect-w-1 aspect-h-1 rounded-md overflow-hidden
                  ${selectedImage === index ? "ring-2 ring-blue-500" : ""}
                `}
              >
                <img
                  src={image}
                  alt={`${product.title} thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          {/* Title and Price Section */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.title}
            </h1>
            <div className="flex items-baseline space-x-4">
              <span className="text-3xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={handleContactSeller}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 flex items-center justify-center space-x-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><polyline points="80 144 112 112 144 144 176 112" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M79.93,211.11a96,96,0,1,0-35-35h0L32.42,213.46a8,8,0,0,0,10.12,10.12l37.39-12.47Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
              <span>Contact Seller</span>
            </button>
            <button
              onClick={toggleFavorite}
              className={`p-3 rounded-md border ${
                isFavorited ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><rect x="40" y="40" width="176" height="176" rx="8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="176" y1="24" x2="176" y2="52" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="80" y1="24" x2="80" y2="52" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M128,120a24,24,0,0,1,48,0c0,32-48,56-48,56s-48-24-48-56a24,24,0,0,1,48,0Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
            </button>
            <button
              onClick={handleShare}
              className="p-3 rounded-md border bg-gray-100 text-gray-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><polyline points="176 152 224 104 176 56" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><polyline points="192 216 32 216 32 88" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M72,176a96,96,0,0,1,93-72h59" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
            </button>
          </div>

          {/* Product Information */}
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Description</h2>
              <p className="text-gray-700">{product.description}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Details</h2>
              <ul className="list-disc list-inside text-gray-700">
                <li>Condition: {product.condition}</li>
                <li>Location: {product.location}</li>
                <li>Category: {product.category} &gt; {product.subcategory}</li>
                <li>Posted: {formatDistanceToNow(new Date(product.postedDate), { addSuffix: true })}</li>
              </ul>
            </div>
            {product.features.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Features</h2>
                <ul className="list-disc list-inside text-gray-700">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Seller Information */}
          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">About the Seller</h2>
            <div className="flex items-center space-x-4">
              <img
                src={product.seller.avatar}
                alt={`${product.seller.name}'s avatar`}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="font-semibold text-gray-900">{product.seller.name}</h3>
                <p className="text-sm text-gray-500">
                  Member since {new Date(product.seller.joinDate).getFullYear()}
                </p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Rating</p>
                <p className="font-semibold">{product.seller.rating.toFixed(1)} / 5.0</p>
              </div>
              <div>
                <p className="text-gray-500">Total Sales</p>
                <p className="font-semibold">{product.seller.totalSales}</p>
              </div>
              <div>
                <p className="text-gray-500">Response Rate</p>
                <p className="font-semibold">{product.seller.responseRate}%</p>
              </div>
              <div>
                <p className="text-gray-500">Response Time</p>
                <p className="font-semibold">{product.seller.responseTime}</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          {showContactInfo && (
            <div className="border-t pt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Seller</h2>
              <form onSubmit={handleSendMessage} className="space-y-4">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message here..."
                  className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                  rows="4"
                  required
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
                >
                  Send Message
                </button>
              </form>
            </div>
          )}

          {/* Additional Information */}
          <div className="border-t pt-6 text-sm text-gray-500">
            <p>Views: {product.views}</p>
            <p>Favorites: {product.favorites}</p>
            {product.meetupLocation && (
              <p>Preferred Meetup: {product.meetupLocation}</p>
            )}
            {product.shippingAvailable && (
              <p>Shipping Available: ${product.shippingPrice.toFixed(2)}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;