import React, { useState } from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

const ProductCard = ({ product, isFeatured = false, showActions = true }) => {
  const [isFavorited, setIsFavorited] = useState(product.isFavorited || false);
  const [isHovered, setIsHovered] = useState(false);

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorited(!isFavorited);
    // In a real app, you'd call an API to save this state
  };

  const handleShareClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: `Check out this ${product.title} on SecondLife Marketplace`,
        url: window.location.origin + `/product/${product.id}`,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(
        window.location.origin + `/product/${product.id}`
      );
      alert("Link copied to clipboard!");
    }
  };

  // Format relative time (e.g., "2 days ago")
  const getRelativeTime = (dateString) => {
    try {
      const date = new Date(dateString);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
      return "Recently";
    }
  };

  // Calculate discount percentage if both prices exist
  const discountPercentage = 
    product.originalPrice && product.price 
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  return (
    <Link 
      to={`/product/${product.id}`}
      className={`block group ${isFeatured ? "transform transition hover:translate-y-[-4px]" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className={`
          relative overflow-hidden bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow
          ${isFeatured ? "border-2 border-yellow-400" : "border border-gray-200"}
        `}
      >
        {/* Image Container */}
        <div className="relative pt-[75%] bg-gray-100 overflow-hidden">
          {product.images && product.images.length > 0 ? (
            <img
              src={product.images[0]}
              alt={product.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="32" height="32"><rect width="256" height="256" fill="none"/><rect x="24" y="64" width="176" height="128" rx="8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><polyline points="200 112 244 80 244 176 200 144" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
              <span className="sr-only">No image available</span>
            </div>
          )}
          
          {/* Discount Badge */}
          {discountPercentage && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
              -{discountPercentage}%
            </div>
          )}
          
          {/* Featured Badge */}
          {isFeatured && (
            <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-md flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="12" height="12"><rect width="256" height="256" fill="none"/><path d="M152,206.4a88,88,0,0,1,0-156.8,88,88,0,1,0,0,156.8Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><polygon points="173.46 128 156 98.33 188.59 106.4 210.39 80 213.06 114.65 244 128 213.06 141.35 210.39 176 188.59 149.6 156 157.67 173.46 128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
              <span className="ml-1">Featured</span>
            </div>
          )}
          
          {/* Actions Overlay */}
          {showActions && (
            <div 
              className={`
                absolute top-2 right-2 flex flex-col gap-2
                ${isFeatured ? "top-10" : ""}
                ${isHovered ? "opacity-100" : "opacity-0 md:opacity-100"}
                transition-opacity
              `}
            >
              <button 
                onClick={toggleFavorite}
                className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
              >
                {isFavorited ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="18" height="18"><rect width="256" height="256" fill="none"/><path d="M128,224S24,168,24,102A54,54,0,0,1,78,48c22.59,0,41.94,12.31,50,32Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M128,80c6.84-16.71,21.81-27.67,40-31.08" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M208,57.09A54,54,0,0,1,231.67,96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M223.3,136c-5.8,11.65-14.05,22.63-23.3,32.63" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M168,197.49A328.1,328.1,0,0,1,128,224" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="18" height="18"><rect width="256" height="256" fill="none"/><path d="M128,224S24,168,24,102A54,54,0,0,1,78,48c22.59,0,41.94,12.31,50,32Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M128,80c6.84-16.71,21.81-27.67,40-31.08" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M208,57.09A54,54,0,0,1,231.67,96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M223.3,136c-5.8,11.65-14.05,22.63-23.3,32.63" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M168,197.49A328.1,328.1,0,0,1,128,224" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                )}
              </button>
              
              <button 
                onClick={handleShareClick}
                className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                aria-label="Share listing"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="18" height="18"><rect width="256" height="256" fill="none"/><polyline points="176 152 224 104 176 56" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><polyline points="192 216 32 216 32 88" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M72,176a96,96,0,0,1,93-72h59" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
              </button>
            </div>
          )}
          
          {/* Image Counter */}
          {product.images && product.images.length > 1 && (
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-md flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="12" height="12"><rect width="256" height="256" fill="none"/><rect x="80" y="40" width="136" height="136" rx="8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="128" cy="88" r="20"/><path d="M184,176v32a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V80a8,8,0,0,1,8-8H80" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M108.69,176l65.65-65.66a8,8,0,0,1,11.32,0L216,140.69" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
              <span className="ml-1">{product.images.length}</span>
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="text-gray-900 font-medium truncate group-hover:text-blue-600 transition-colors">
              {product.title}
            </h3>
          </div>
          
          <div className="mt-1 flex items-baseline">
            <span className="text-lg font-semibold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="ml-2 text-sm text-gray-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          
          {/* Details Row */}
          <div className="mt-2 flex items-center text-sm text-gray-500 space-x-2">
            {product.location && (
              <div className="flex items-center truncate">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="14" height="14"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M176,211.16V176a8,8,0,0,0-8-8H88a8,8,0,0,0-8,8v35.16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M96,168V136a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M147.84,128,135.71,84.44a8,8,0,0,0-15.42,0L108.16,128Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                <span className="ml-1 truncate">{product.location}</span>
              </div>
            )}
            
            {product.postedDate && (
              <div className="flex items-center whitespace-nowrap">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="14" height="14"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><polyline points="128 72 128 128 184 128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                <span className="ml-1">{getRelativeTime(product.postedDate)}</span>
              </div>
            )}
          </div>
          
          {/* Features / Tags */}
          {product.features && product.features.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {product.features.slice(0, 3).map((feature, index) => (
                <span 
                  key={index} 
                  className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                >
                  {feature}
                </span>
              ))}
              {product.features.length > 3 && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  +{product.features.length - 3} more
                </span>
              )}
            </div>
          )}
          
          {/* Seller Info (optional) */}
          {product.seller && (
            <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center">
                {product.seller.avatar ? (
                  <img 
                    src={product.seller.avatar} 
                    alt={product.seller.name}
                    className="w-6 h-6 rounded-full mr-2" 
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-gray-200 mr-2 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="12" height="12"><rect width="256" height="256" fill="none"/><circle cx="80" cy="172" r="28" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="80" cy="60" r="28" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="176" cy="172" r="28" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="176" cy="60" r="28" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M32,224a60,60,0,0,1,96,0,60,60,0,0,1,96,0" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M32,112a60,60,0,0,1,96,0h0a60,60,0,0,1,96,0" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                  </div>
                )}
                <span className="text-xs text-gray-600">{product.seller.name}</span>
              </div>
              
              {product.seller.rating && (
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="12" height="12"><rect width="256" height="256" fill="none"/><path d="M152,206.4a88,88,0,0,1,0-156.8,88,88,0,1,0,0,156.8Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><polygon points="173.46 128 156 98.33 188.59 106.4 210.39 80 213.06 114.65 244 128 213.06 141.35 210.39 176 188.59 149.6 156 157.67 173.46 128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                  <span className="text-xs text-yellow-700 ml-1">{product.seller.rating}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;