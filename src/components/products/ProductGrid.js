import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { useLocation, useSearchParams } from "react-router-dom";

const ProductGrid = ({ 
  products, 
  isLoading = false, 
  error = null, 
  showFilters = true,
  gridLayout = "default" // default, compact, or featured
}) => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [loadedItems, setLoadedItems] = useState(12); // Initial load count
  const itemsPerLoad = 12;

  // Reset loaded items when search params change
  useEffect(() => {
    setLoadedItems(12);
  }, [location.search]);

  // Update displayed products when products or loadedItems change
  useEffect(() => {
    if (products) {
      setDisplayedProducts(products.slice(0, loadedItems));
    }
  }, [products, loadedItems]);

  const loadMore = () => {
    setLoadedItems(prev => prev + itemsPerLoad);
  };

  const getGridColumns = (layout) => {
    switch (layout) {
      case "compact":
        return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6";
      case "featured":
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
      default:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
    }
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-red-50 rounded-lg">
        <div className="text-red-500 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="48" height="48"><rect width="256" height="256" fill="none"/><circle cx="128" cy="200" r="20"/><line x1="128" y1="48" x2="128" y2="148" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Error Loading Products</h3>
        <p className="text-gray-600 text-center mt-2">{error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={`grid gap-4 ${getGridColumns(gridLayout)}`}>
        {[...Array(8)].map((_, index) => (
          <div 
            key={index}
            className="bg-gray-100 rounded-lg animate-pulse h-[300px]"
          >
            <div className="h-48 bg-gray-200 rounded-t-lg" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
              <div className="h-4 bg-gray-200 rounded w-1/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg">
        <div className="text-gray-400 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="48" height="48"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="88" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="208" y1="40" x2="48" y2="216" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900">No Products Found</h3>
        <p className="text-gray-600 text-center mt-2">
          {searchParams.toString() 
            ? "Try adjusting your filters or search terms"
            : "Products will appear here once they are added"
          }
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className={`grid gap-4 ${getGridColumns(gridLayout)}`}>
        {displayedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isFeatured={product.isFeatured}
            showActions={true}
          />
        ))}
      </div>

      {products.length > loadedItems && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMore}
            className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            <span>Load More</span>
            <span className="ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16"><rect width="256" height="256" fill="none"/><path d="M216,112V56a8,8,0,0,0-8-8H48a8,8,0,0,0-8,8v56c0,96,88,120,88,120S216,208,216,112Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><polyline points="201.97 171.78 128 120 54.03 171.78" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
            </span>
          </button>
        </div>
      )}

      {displayedProducts.length > 0 && (
        <div className="text-center text-sm text-gray-500">
          Showing {displayedProducts.length} of {products.length} products
        </div>
      )}
    </div>
  );
};

export default ProductGrid;