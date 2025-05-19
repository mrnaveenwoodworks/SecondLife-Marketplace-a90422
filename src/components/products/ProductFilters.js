import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Range } from "react-range";

const ProductFilters = ({ onFilterChange, initialFilters = {} }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState({
    categories: true,
    price: true,
    condition: true,
    location: true,
  });
  
  const [filters, setFilters] = useState({
    categories: initialFilters.categories || [],
    priceRange: initialFilters.priceRange || [0, 1000],
    condition: initialFilters.condition || [],
    location: initialFilters.location || "",
    sortBy: initialFilters.sortBy || "newest",
  });

  // Mock data for demo - in real app, these would come from API
  const allCategories = [
    { id: "electronics", name: "Electronics", count: 1245 },
    { id: "furniture", name: "Furniture", count: 853 },
    { id: "clothing", name: "Clothing", count: 1568 },
    { id: "vehicles", name: "Vehicles", count: 426 },
    { id: "books", name: "Books & Media", count: 972 },
    { id: "sports", name: "Sports & Hobbies", count: 741 },
    { id: "other", name: "Other", count: 324 },
  ];

  const conditionOptions = [
    { id: "new", name: "New", count: 865 },
    { id: "used-likenew", name: "Like New", count: 1243 },
    { id: "used-good", name: "Good", count: 1875 },
    { id: "used-fair", name: "Fair", count: 742 },
    { id: "used-poor", name: "Poor", count: 231 },
  ];

  const popularLocations = [
    "New York, NY",
    "Los Angeles, CA",
    "Chicago, IL",
    "Houston, TX",
    "Phoenix, AZ",
  ];

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "popular", label: "Most Popular" },
  ];

  // Initialize filters from URL params when component mounts
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const conditionParam = searchParams.get("condition");
    const locationParam = searchParams.get("location");
    const sortByParam = searchParams.get("sortBy");

    const newFilters = { ...filters };

    if (categoryParam) {
      newFilters.categories = categoryParam.split(",");
    }

    if (minPrice && maxPrice) {
      newFilters.priceRange = [parseInt(minPrice), parseInt(maxPrice)];
    }

    if (conditionParam) {
      newFilters.condition = conditionParam.split(",");
    }

    if (locationParam) {
      newFilters.location = locationParam;
    }

    if (sortByParam) {
      newFilters.sortBy = sortByParam;
    }

    setFilters(newFilters);
    // We don't include onFilterChange in dependencies as it might cause infinite loops
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Apply filters and update URL
  const applyFilters = (newFilters) => {
    setFilters(newFilters);
    
    if (onFilterChange) {
      onFilterChange(newFilters);
    }

    // Update URL params
    const params = new URLSearchParams();
    
    if (newFilters.categories.length > 0) {
      params.set("category", newFilters.categories.join(","));
    }
    
    if (newFilters.priceRange && newFilters.priceRange.length === 2) {
      params.set("minPrice", newFilters.priceRange[0]);
      params.set("maxPrice", newFilters.priceRange[1]);
    }
    
    if (newFilters.condition.length > 0) {
      params.set("condition", newFilters.condition.join(","));
    }
    
    if (newFilters.location) {
      params.set("location", newFilters.location);
    }
    
    if (newFilters.sortBy) {
      params.set("sortBy", newFilters.sortBy);
    }

    navigate({
      search: params.toString(),
    }, { replace: true });
  };

  const handleCategoryChange = (categoryId) => {
    const updatedCategories = filters.categories.includes(categoryId)
      ? filters.categories.filter((id) => id !== categoryId)
      : [...filters.categories, categoryId];
      
    applyFilters({
      ...filters,
      categories: updatedCategories,
    });
  };

  const handleConditionChange = (conditionId) => {
    const updatedConditions = filters.condition.includes(conditionId)
      ? filters.condition.filter((id) => id !== conditionId)
      : [...filters.condition, conditionId];
      
    applyFilters({
      ...filters,
      condition: updatedConditions,
    });
  };

  const handlePriceChange = (values) => {
    applyFilters({
      ...filters,
      priceRange: values,
    });
  };

  const handleLocationChange = (e) => {
    applyFilters({
      ...filters,
      location: e.target.value,
    });
  };

  const handleSortChange = (e) => {
    applyFilters({
      ...filters,
      sortBy: e.target.value,
    });
  };

  const resetFilters = () => {
    applyFilters({
      categories: [],
      priceRange: [0, 1000],
      condition: [],
      location: "",
      sortBy: "newest",
    });
  };

  const toggleSection = (section) => {
    setIsExpanded({
      ...isExpanded,
      [section]: !isExpanded[section],
    });
  };

  // Count active filters
  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.categories.length > 0) count += filters.categories.length;
    if (filters.condition.length > 0) count += filters.condition.length;
    if (filters.location) count += 1;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) count += 1;
    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Filter header */}
      <div className="border-b border-gray-200 px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="18" height="18"><rect width="256" height="256" fill="none"/><polyline points="64 24 64 192 232 192" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><line x1="24" y1="64" x2="64" y2="64" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><polyline points="104 64 192 64 192 152" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><line x1="192" y1="192" x2="192" y2="232" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/></svg>
          <h2 className="ml-2 font-medium text-gray-800">Filters</h2>
          {activeFilterCount > 0 && (
            <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full px-2 py-0.5">
              {activeFilterCount}
            </span>
          )}
        </div>
        {activeFilterCount > 0 && (
          <button
            onClick={resetFilters}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Filter sections */}
      <div className="divide-y divide-gray-200">
        {/* Mobile sorting (shows in small screens) */}
        <div className="p-4 block md:hidden">
          <label htmlFor="mobileSortBy" className="block text-sm font-medium text-gray-700 mb-1">
            Sort By
          </label>
          <select
            id="mobileSortBy"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={filters.sortBy}
            onChange={handleSortChange}
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Categories */}
        <div className="p-4">
          <button
            className="flex items-center justify-between w-full text-left font-medium text-gray-800"
            onClick={() => toggleSection("categories")}
          >
            <span>Categories</span>
            <span className="transform transition-transform duration-200">
              {isExpanded.categories ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16"><rect width="256" height="256" fill="none"/><path d="M216,112V56a8,8,0,0,0-8-8H48a8,8,0,0,0-8,8v56c0,96,88,120,88,120S216,208,216,112Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><polyline points="201.97 171.78 128 120 54.03 171.78" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16"><rect width="256" height="256" fill="none"/><path d="M216,112V56a8,8,0,0,0-8-8H48a8,8,0,0,0-8,8v56c0,96,88,120,88,120S216,208,216,112Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><polyline points="201.97 171.78 128 120 54.03 171.78" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/></svg>
              )}
            </span>
          </button>
          
          {isExpanded.categories && (
            <div className="mt-2 space-y-1">
              {allCategories.map((category) => (
                <label key={category.id} className="flex items-center py-1">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    checked={filters.categories.includes(category.id)}
                    onChange={() => handleCategoryChange(category.id)}
                  />
                  <span className="ml-2 text-sm text-gray-700">{category.name}</span>
                  <span className="ml-1 text-xs text-gray-500">({category.count})</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Price Range */}
        <div className="p-4">
          <button
            className="flex items-center justify-between w-full text-left font-medium text-gray-800"
            onClick={() => toggleSection("price")}
          >
            <span>Price Range</span>
            <span className="transform transition-transform duration-200">
              {isExpanded.price ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16"><rect width="256" height="256" fill="none"/><path d="M216,112V56a8,8,0,0,0-8-8H48a8,8,0,0,0-8,8v56c0,96,88,120,88,120S216,208,216,112Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><polyline points="201.97 171.78 128 120 54.03 171.78" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16"><rect width="256" height="256" fill="none"/><path d="M216,112V56a8,8,0,0,0-8-8H48a8,8,0,0,0-8,8v56c0,96,88,120,88,120S216,208,216,112Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><polyline points="201.97 171.78 128 120 54.03 171.78" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/></svg>
              )}
            </span>
          </button>
          
          {isExpanded.price && (
            <div className="mt-4 px-2">
              <div className="flex items-center justify-between mb-4 text-sm">
                <div>
                  <span className="font-medium text-gray-800">$</span>
                  <input
                    type="number"
                    className="w-20 p-1 border border-gray-300 rounded ml-1"
                    value={filters.priceRange[0]}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 0;
                      handlePriceChange([
                        Math.min(value, filters.priceRange[1]),
                        filters.priceRange[1],
                      ]);
                    }}
                    min="0"
                    max={filters.priceRange[1]}
                  />
                </div>
                <span className="text-gray-500">to</span>
                <div>
                  <span className="font-medium text-gray-800">$</span>
                  <input
                    type="number"
                    className="w-20 p-1 border border-gray-300 rounded ml-1"
                    value={filters.priceRange[1]}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 0;
                      handlePriceChange([
                        filters.priceRange[0],
                        Math.max(value, filters.priceRange[0]),
                      ]);
                    }}
                    min={filters.priceRange[0]}
                  />
                </div>
              </div>

              <Range
                step={10}
                min={0}
                max={1000}
                values={filters.priceRange}
                onChange={handlePriceChange}
                renderTrack={({ props, children }) => (
                  <div
                    {...props}
                    className="h-1 w-full bg-gray-200 rounded-full"
                    style={{
                      ...props.style,
                    }}
                  >
                    {children}
                  </div>
                )}
                renderThumb={({ index, props }) => (
                  <div
                    {...props}
                    className="h-5 w-5 rounded-full bg-blue-600 shadow focus:outline-none"
                    style={{
                      ...props.style,
                    }}
                  />
                )}
              />
              
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>$0</span>
                <span>$250</span>
                <span>$500</span>
                <span>$750</span>
                <span>$1000+</span>
              </div>
            </div>
          )}
        </div>

        {/* Condition */}
        <div className="p-4">
          <button
            className="flex items-center justify-between w-full text-left font-medium text-gray-800"
            onClick={() => toggleSection("condition")}
          >
            <span>Condition</span>
            <span className="transform transition-transform duration-200">
              {isExpanded.condition ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16"><rect width="256" height="256" fill="none"/><path d="M216,112V56a8,8,0,0,0-8-8H48a8,8,0,0,0-8,8v56c0,96,88,120,88,120S216,208,216,112Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><polyline points="201.97 171.78 128 120 54.03 171.78" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16"><rect width="256" height="256" fill="none"/><path d="M216,112V56a8,8,0,0,0-8-8H48a8,8,0,0,0-8,8v56c0,96,88,120,88,120S216,208,216,112Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><polyline points="201.97 171.78 128 120 54.03 171.78" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/></svg>
              )}
            </span>
          </button>
          
          {isExpanded.condition && (
            <div className="mt-2 space-y-1">
              {conditionOptions.map((option) => (
                <label key={option.id} className="flex items-center py-1">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    checked={filters.condition.includes(option.id)}
                    onChange={() => handleConditionChange(option.id)}
                  />
                  <span className="ml-2 text-sm text-gray-700">{option.name}</span>
                  <span className="ml-1 text-xs text-gray-500">({option.count})</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Location */}
        <div className="p-4">
          <button
            className="flex items-center justify-between w-full text-left font-medium text-gray-800"
            onClick={() => toggleSection("location")}
          >
            <span>Location</span>
            <span className="transform transition-transform duration-200">
              {isExpanded.location ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16"><rect width="256" height="256" fill="none"/><path d="M216,112V56a8,8,0,0,0-8-8H48a8,8,0,0,0-8,8v56c0,96,88,120,88,120S216,208,216,112Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><polyline points="201.97 171.78 128 120 54.03 171.78" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16"><rect width="256" height="256" fill="none"/><path d="M216,112V56a8,8,0,0,0-8-8H48a8,8,0,0,0-8,8v56c0,96,88,120,88,120S216,208,216,112Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><polyline points="201.97 171.78 128 120 54.03 171.78" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/></svg>
              )}
            </span>
          </button>
          
          {isExpanded.location && (
            <div className="mt-2 space-y-3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><path d="M176,211.16V176a8,8,0,0,0-8-8H88a8,8,0,0,0-8,8v35.16" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><path d="M96,168V136a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v32" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><path d="M147.84,128,135.71,84.44a8,8,0,0,0-15.42,0L108.16,128Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/></svg>
                </div>
                <input
                  type="text"
                  className="pl-9 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                  placeholder="City, State or ZIP"
                  value={filters.location}
                  onChange={handleLocationChange}
                />
              </div>
              
              {popularLocations.length > 0 && !filters.location && (
                <div className="mt-3">
                  <p className="text-xs text-gray-500 mb-1">Popular locations:</p>
                  <div className="flex flex-wrap gap-2">
                    {popularLocations.map((location, index) => (
                      <button
                        key={index}
                        className="inline-flex items-center px-2 py-1 text-xs rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800"
                        onClick={() => applyFilters({ ...filters, location })}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="12" height="12"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><path d="M176,211.16V176a8,8,0,0,0-8-8H88a8,8,0,0,0-8,8v35.16" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><path d="M96,168V136a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v32" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><path d="M147.84,128,135.71,84.44a8,8,0,0,0-15.42,0L108.16,128Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/></svg>
                        <span className="ml-1">{location}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {filters.location && (
                <div className="flex">
                  <label className="text-sm flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Within 10 miles</span>
                  </label>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Apply button (for mobile) */}
      <div className="p-4 border-t border-gray-200 md:hidden">
        <button
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default ProductFilters;