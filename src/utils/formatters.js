import { format, formatDistanceToNow, parseISO } from "date-fns";

/**
 * Format a price with currency symbol and decimals
 * @param {number} price - The price to format
 * @param {string} currency - Currency code (default: USD)
 * @param {string} locale - Locale string (default: en-US)
 * @returns {string} Formatted price string
 */
export const formatPrice = (price, currency = "USD", locale = "en-US") => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price);
};

/**
 * Format a discount percentage
 * @param {number} originalPrice - Original price
 * @param {number} currentPrice - Current/discounted price
 * @returns {string} Formatted discount percentage
 */
export const formatDiscount = (originalPrice, currentPrice) => {
  if (!originalPrice || !currentPrice || originalPrice <= currentPrice) {
    return null;
  }
  const discount = ((originalPrice - currentPrice) / originalPrice) * 100;
  return `${Math.round(discount)}% OFF`;
};

/**
 * Format a date in various styles
 * @param {string|Date} date - Date to format
 * @param {string} style - Style of formatting (full, short, relative)
 * @returns {string} Formatted date string
 */
export const formatDate = (date, style = "full") => {
  if (!date) return "";
  
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  
  switch (style) {
    case "full":
      return format(dateObj, "MMMM d, yyyy 'at' h:mm a");
    case "short":
      return format(dateObj, "MMM d, yyyy");
    case "relative":
      return formatDistanceToNow(dateObj, { addSuffix: true });
    default:
      return format(dateObj, "PPP");
  }
};

/**
 * Format a file size
 * @param {number} bytes - Size in bytes
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted file size string
 */
export const formatFileSize = (bytes, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

/**
 * Format a number with thousand separators
 * @param {number} num - Number to format
 * @param {string} locale - Locale string (default: en-US)
 * @returns {string} Formatted number string
 */
export const formatNumber = (num, locale = "en-US") => {
  return new Intl.NumberFormat(locale).format(num);
};

/**
 * Truncate text with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} length - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, length = 100) => {
  if (!text) return "";
  if (text.length <= length) return text;
  return `${text.substring(0, length).trim()}...`;
};

/**
 * Format a phone number
 * @param {string} phone - Phone number to format
 * @param {string} format - Format style (default: us)
 * @returns {string} Formatted phone number
 */
export const formatPhoneNumber = (phone, format = "us") => {
  if (!phone) return "";

  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, "");

  switch (format) {
    case "us":
      if (cleaned.length === 10) {
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
      }
      if (cleaned.length === 11) {
        return `+${cleaned[0]} (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
      }
      break;
    case "international":
      if (cleaned.length >= 10) {
        return `+${cleaned.slice(0, -10)} ${cleaned.slice(-10, -7)} ${cleaned.slice(-7, -4)} ${cleaned.slice(-4)}`;
      }
      break;
    default:
      return cleaned;
  }
  
  return phone; // Return original if no format matches
};

/**
 * Format a location string
 * @param {Object} location - Location object
 * @param {string} style - Format style (short, medium, full)
 * @returns {string} Formatted location string
 */
export const formatLocation = (location, style = "medium") => {
  if (!location) return "";

  const { city, state, country, zipCode } = location;

  switch (style) {
    case "short":
      return `${city}, ${state}`;
    case "medium":
      return `${city}, ${state}, ${country}`;
    case "full":
      return `${city}, ${state} ${zipCode}, ${country}`;
    default:
      return `${city}, ${state}`;
  }
};

/**
 * Format product condition
 * @param {string} condition - Condition code
 * @returns {string} Human readable condition
 */
export const formatCondition = (condition) => {
  const conditions = {
    "new": "New with tags",
    "new-other": "New without tags",
    "used-like-new": "Like new",
    "used-good": "Good",
    "used-fair": "Fair",
    "used-poor": "Poor",
    "for-parts": "For parts or not working"
  };
  
  return conditions[condition] || condition;
};

/**
 * Format user activity status
 * @param {Object} user - User object with lastActive or isOnline
 * @returns {string} Formatted status string
 */
export const formatUserStatus = (user) => {
  if (!user) return "";

  if (user.isOnline) {
    return "Online";
  }

  if (user.lastActive) {
    return `Last seen ${formatDistanceToNow(parseISO(user.lastActive), { addSuffix: true })}`;
  }

  return "Offline";
};

/**
 * Format listing status with badge style
 * @param {string} status - Status of the listing
 * @returns {Object} Formatted status with text and style classes
 */
export const formatListingStatus = (status) => {
  const statusConfig = {
    "active": {
      text: "Active",
      classes: "bg-green-100 text-green-800"
    },
    "pending": {
      text: "Pending",
      classes: "bg-yellow-100 text-yellow-800"
    },
    "sold": {
      text: "Sold",
      classes: "bg-blue-100 text-blue-800"
    },
    "inactive": {
      text: "Inactive",
      classes: "bg-gray-100 text-gray-800"
    },
    "deleted": {
      text: "Deleted",
      classes: "bg-red-100 text-red-800"
    }
  };

  return statusConfig[status] || {
    text: status,
    classes: "bg-gray-100 text-gray-800"
  };
};

/**
 * Format message preview text
 * @param {string} message - Full message text
 * @param {number} length - Preview length
 * @returns {string} Formatted preview text
 */
export const formatMessagePreview = (message, length = 50) => {
  if (!message) return "";
  
  // Remove any HTML tags if present
  const plainText = message.replace(/<[^>]+>/g, "");
  
  return truncateText(plainText, length);
};

// ==========================================================
// Random Product Data Generation
// ==========================================================

/**
 * Product categories with sample titles, adjectives, and nouns
 */
const productCategories = {
  electronics: {
    adjectives: ["Smart", "Wireless", "Ultra HD", "Bluetooth", "4K", "Gaming", "Professional", "Portable", "Digital", "Noise-Cancelling"],
    nouns: ["Headphones", "Speaker", "TV", "Laptop", "Smartphone", "Camera", "Tablet", "Monitor", "Keyboard", "Mouse", "Charger"],
    descriptions: [
      "Features the latest technology for superior performance.",
      "Perfect for professionals and casual users alike.",
      "Sleek design with premium build quality.",
      "Long battery life for all-day use.",
      "High-resolution display for crystal-clear images."
    ]
  },
  furniture: {
    adjectives: ["Modern", "Vintage", "Rustic", "Elegant", "Comfortable", "Wooden", "Leather", "Minimalist", "Ergonomic", "Antique"],
    nouns: ["Sofa", "Chair", "Table", "Desk", "Bed", "Dresser", "Bookshelf", "Cabinet", "Ottoman", "Nightstand"],
    descriptions: [
      "Handcrafted with attention to detail.",
      "Sturdy construction that will last for years.",
      "Comfortable design perfect for any home.",
      "Space-saving solution for smaller living areas.",
      "Classic style that complements any decor."
    ]
  },
  clothing: {
    adjectives: ["Stylish", "Vintage", "Designer", "Casual", "Formal", "Cotton", "Wool", "Silk", "Denim", "Leather"],
    nouns: ["Jacket", "Shirt", "Dress", "Pants", "Sweater", "Coat", "Jeans", "Skirt", "Suit", "Blouse"],
    descriptions: [
      "Premium quality material for lasting comfort.",
      "Perfect for any season with versatile styling options.",
      "Trendy design that never goes out of style.",
      "Comfortable fit for everyday wear.",
      "Excellent condition with minimal signs of wear."
    ]
  },
  vehicles: {
    adjectives: ["Luxury", "Vintage", "High-Performance", "Fuel-Efficient", "Electric", "Off-Road", "Economy", "Sporty", "Classic", "Custom"],
    nouns: ["Car", "Bicycle", "Motorcycle", "Scooter", "SUV", "Truck", "Van", "Convertible", "Sedan", "Hatchback"],
    descriptions: [
      "Well maintained with complete service history.",
      "Low mileage and in excellent mechanical condition.",
      "Recently serviced with new parts installed.",
      "Perfect for daily commuting or weekend adventures.",
      "Loaded with features and upgrades."
    ]
  },
  books: {
    adjectives: ["Rare", "Vintage", "First-Edition", "Hardcover", "Paperback", "Classic", "Signed", "Illustrated", "Limited-Edition", "Collectible"],
    nouns: ["Novel", "Textbook", "Biography", "Cookbook", "Comic", "Magazine", "Encyclopedia", "Dictionary", "Journal", "Album"],
    descriptions: [
      "In excellent condition with minimal wear.",
      "A must-have for any collector or enthusiast.",
      "Hard to find edition with beautiful illustrations.",
      "Perfect for students or lifelong learners.",
      "Fascinating read that will keep you engaged from start to finish."
    ]
  },
  sports: {
    adjectives: ["Professional", "High-Performance", "Tournament-Grade", "Lightweight", "Durable", "Adjustable", "Specialized", "Official", "Competitive", "Training"],
    nouns: ["Bicycle", "Racket", "Golf Clubs", "Snowboard", "Skateboard", "Basketball", "Baseball Bat", "Tennis Racquet", "Treadmill", "Weights"],
    descriptions: [
      "Professional grade equipment at a fraction of retail price.",
      "Perfect condition, only used a handful of times.",
      "High-quality construction for serious athletes.",
      "Great for beginners looking to start a new hobby.",
      "Versatile equipment suitable for various skill levels."
    ]
  }
};

/**
 * List of cities for random location generation
 */
const cities = [
  { city: "New York", state: "NY" },
  { city: "Los Angeles", state: "CA" },
  { city: "Chicago", state: "IL" },
  { city: "Houston", state: "TX" },
  { city: "Phoenix", state: "AZ" },
  { city: "Philadelphia", state: "PA" },
  { city: "San Antonio", state: "TX" },
  { city: "San Diego", state: "CA" },
  { city: "Dallas", state: "TX" },
  { city: "San Francisco", state: "CA" },
  { city: "Austin", state: "TX" },
  { city: "Seattle", state: "WA" },
  { city: "Denver", state: "CO" },
  { city: "Boston", state: "MA" },
  { city: "Miami", state: "FL" }
];

/**
 * Generate a random title for a given category
 * @param {string} category - Product category
 * @returns {string} A random product title
 */
export const generateRandomTitle = (category = null) => {
  // If no category specified or invalid category, pick one randomly
  if (!category || !productCategories[category]) {
    const categories = Object.keys(productCategories);
    category = categories[Math.floor(Math.random() * categories.length)];
  }
  
  const { adjectives, nouns } = productCategories[category];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  
  // Sometimes add a year or model number for variety
  const includeYear = Math.random() > 0.7;
  const year = includeYear ? ` ${2018 + Math.floor(Math.random() * 5)}` : "";
  
  return `${adjective}${year} ${noun}`;
};

/**
 * Generate a random detailed description for a product
 * @param {string} category - Product category
 * @param {string} title - Product title
 * @returns {string} A detailed product description
 */
export const generateRandomDescription = (category = null, title = "") => {
  // If no category specified or invalid category, pick one randomly
  if (!category || !productCategories[category]) {
    const categories = Object.keys(productCategories);
    category = categories[Math.floor(Math.random() * categories.length)];
  }
  
  const { descriptions } = productCategories[category];
  
  // Pick 3 random descriptions
  const shuffled = [...descriptions].sort(() => 0.5 - Math.random());
  const selectedDescriptions = shuffled.slice(0, 3);
  
  // Add some specific details based on the title
  let specificDetails = "";
  if (title) {
    specificDetails = `This ${title.toLowerCase()} is in excellent condition. `;
    specificDetails += Math.random() > 0.5 ? 
      "It was barely used and has been well maintained. " : 
      "I've owned it for a few months and it's still like new. ";
  }
  
  // Add some random details about the reason for selling
  const sellingReasons = [
    "I'm selling because I'm moving to a smaller place.",
    "Selling to make room for new items.",
    "I don't use it as much as I thought I would.",
    "It was a gift but it's not really my style.",
    "I'm upgrading to a newer model."
  ];
  
  const randomReason = sellingReasons[Math.floor(Math.random() * sellingReasons.length)];
  
  // Compile the full description
  return `${specificDetails}${selectedDescriptions.join(" ")} ${randomReason} Please message me with any questions!`;
};

/**
 * Generate a random price appropriate for the product category
 * @param {string} category - Product category
 * @param {boolean} isUsed - Whether the product is used (affects price range)
 * @returns {number} A realistic price value
 */
export const generateRandomPrice = (category = null, isUsed = true) => {
  let min, max;
  
  switch (category) {
    case "electronics":
      min = isUsed ? 50 : 100;
      max = isUsed ? 800 : 1500;
      break;
    case "furniture":
      min = isUsed ? 30 : 100;
      max = isUsed ? 500 : 2000;
      break;
    case "clothing":
      min = isUsed ? 8 : 25;
      max = isUsed ? 100 : 300;
      break;
    case "vehicles":
      min = isUsed ? 1000 : 5000;
      max = isUsed ? 15000 : 50000;
      break;
    case "books":
      min = isUsed ? 5 : 10;
      max = isUsed ? 30 : 60;
      break;
    case "sports":
      min = isUsed ? 20 : 50;
      max = isUsed ? 300 : 1000;
      break;
    default:
      min = isUsed ? 15 : 30;
      max = isUsed ? 200 : 500;
  }
  
  // Generate random price and round to appropriate precision
  const price = min + Math.random() * (max - min);
  
  // Round to nearest dollar for higher prices, otherwise to nearest .99
  if (price >= 100) {
    return Math.round(price);
  } else {
    return Math.floor(price) + 0.99;
  }
};

/**
 * Generate a random condition appropriate for used items
 * @returns {string} A condition value from the predefined conditions
 */
export const generateRandomCondition = () => {
  const conditions = ["new", "used-like-new", "used-good", "used-fair", "used-poor"];
  const weights = [0.1, 0.3, 0.4, 0.15, 0.05]; // Probabilities of each condition
  
  const random = Math.random();
  let sum = 0;
  
  for (let i = 0; i < conditions.length; i++) {
    sum += weights[i];
    if (random <= sum) return conditions[i];
  }
  
  return "used-good"; // Default
};

/**
 * Generate a random location
 * @returns {Object} Location object with city and state
 */
export const generateRandomLocation = () => {
  const randomIndex = Math.floor(Math.random() * cities.length);
  return cities[randomIndex];
};

/**
 * Generate a complete random product object
 * @param {string} category - Optional category to use
 * @returns {Object} Complete product object with all necessary fields
 */
export const generateRandomProduct = (category = null) => {
  // If no category specified or invalid, pick one randomly
  if (!category || !Object.keys(productCategories).includes(category)) {
    const categories = Object.keys(productCategories);
    category = categories[Math.floor(Math.random() * categories.length)];
  }
  
  const condition = generateRandomCondition();
  const isUsed = condition !== "new";
  const title = generateRandomTitle(category);
  const price = generateRandomPrice(category, isUsed);
  const location = generateRandomLocation();
  
  // Generate random subcategory
  const categoryData = productCategories[category];
  const randomNounIndex = Math.floor(Math.random() * categoryData.nouns.length);
  const subcategory = categoryData.nouns[randomNounIndex].toLowerCase();
  
  return {
    title,
    description: generateRandomDescription(category, title),
    category,
    subcategory,
    condition,
    price,
    location: `${location.city}, ${location.state}`,
    contactMethod: ["app-messages", "email", "phone"][Math.floor(Math.random() * 3)],
    createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000) // Random date within past 30 days
  };
};

/**
 * Generate multiple random product objects
 * @param {number} count - Number of products to generate
 * @param {string} category - Optional category to use for all products
 * @returns {Array} Array of product objects
 */
export const generateRandomProducts = (count = 5, category = null) => {
  const products = [];
  for (let i = 0; i < count; i++) {
    products.push(generateRandomProduct(category));
  }
  return products;
};