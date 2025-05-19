/**
 * Form Validation Utility Functions
 */

// Regular expressions for validation
const REGEX = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\+?[\d\s-()]{10,}$/,
  url: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
  password: {
    minLength: /^.{8,}$/,
    uppercase: /[A-Z]/,
    lowercase: /[a-z]/,
    number: /\d/,
    special: /[!@#$%^&*(),.?":{}|<>]/
  },
  zipCode: /^\d{5}(-\d{4})?$/,
  username: /^[a-zA-Z0-9_]{3,20}$/
};

/**
 * Validates an email address
 * @param {string} email - Email address to validate
 * @returns {boolean} True if email is valid
 */
export const isValidEmail = (email) => {
  if (!email) return false;
  return REGEX.email.test(email.trim());
};

/**
 * Validates a phone number
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if phone number is valid
 */
export const isValidPhone = (phone) => {
  if (!phone) return false;
  return REGEX.phone.test(phone.trim());
};

/**
 * Validates a URL
 * @param {string} url - URL to validate
 * @returns {boolean} True if URL is valid
 */
export const isValidUrl = (url) => {
  if (!url) return false;
  return REGEX.url.test(url.trim());
};

/**
 * Checks if a field is empty
 * @param {string} value - Value to check
 * @returns {boolean} True if value is empty
 */
export const isEmpty = (value) => {
  if (value === null || value === undefined) return true;
  return value.toString().trim().length === 0;
};

/**
 * Validates required fields in a form object
 * @param {Object} formData - Form data object
 * @param {string[]} requiredFields - Array of required field names
 * @returns {Object} Object containing validation results
 */
export const validateRequired = (formData, requiredFields) => {
  const errors = {};
  
  requiredFields.forEach(field => {
    if (isEmpty(formData[field])) {
      errors[field] = "This field is required";
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validates password strength
 * @param {string} password - Password to validate
 * @returns {Object} Object containing validation results and specific checks
 */
export const validatePassword = (password) => {
  if (!password) {
    return {
      isValid: false,
      errors: ["Password is required"],
      checks: {
        minLength: false,
        uppercase: false,
        lowercase: false,
        number: false,
        special: false
      }
    };
  }

  const checks = {
    minLength: REGEX.password.minLength.test(password),
    uppercase: REGEX.password.uppercase.test(password),
    lowercase: REGEX.password.lowercase.test(password),
    number: REGEX.password.number.test(password),
    special: REGEX.password.special.test(password)
  };

  const errors = [];
  
  if (!checks.minLength) errors.push("Password must be at least 8 characters long");
  if (!checks.uppercase) errors.push("Password must contain at least one uppercase letter");
  if (!checks.lowercase) errors.push("Password must contain at least one lowercase letter");
  if (!checks.number) errors.push("Password must contain at least one number");
  if (!checks.special) errors.push("Password must contain at least one special character");

  return {
    isValid: errors.length === 0,
    errors,
    checks
  };
};

/**
 * Validates that two passwords match
 * @param {string} password - Password
 * @param {string} confirmPassword - Password confirmation
 * @returns {Object} Object containing validation result and error message
 */
export const validatePasswordMatch = (password, confirmPassword) => {
  return {
    isValid: password === confirmPassword,
    error: password === confirmPassword ? null : "Passwords do not match"
  };
};

/**
 * Validates a username
 * @param {string} username - Username to validate
 * @returns {Object} Object containing validation result and error message
 */
export const validateUsername = (username) => {
  if (!username) {
    return {
      isValid: false,
      error: "Username is required"
    };
  }

  if (!REGEX.username.test(username)) {
    return {
      isValid: false,
      error: "Username must be 3-20 characters long and can only contain letters, numbers, and underscores"
    };
  }

  return {
    isValid: true,
    error: null
  };
};

/**
 * Validates a zip code
 * @param {string} zipCode - Zip code to validate
 * @returns {Object} Object containing validation result and error message
 */
export const validateZipCode = (zipCode) => {
  if (!zipCode) {
    return {
      isValid: false,
      error: "Zip code is required"
    };
  }

  if (!REGEX.zipCode.test(zipCode)) {
    return {
      isValid: false,
      error: "Invalid zip code format"
    };
  }

  return {
    isValid: true,
    error: null
  };
};

/**
 * Validates file size
 * @param {File} file - File to validate
 * @param {number} maxSize - Maximum file size in bytes
 * @returns {Object} Object containing validation result and error message
 */
export const validateFileSize = (file, maxSize) => {
  if (!file) {
    return {
      isValid: false,
      error: "No file provided"
    };
  }

  if (file.size > maxSize) {
    return {
      isValid: false,
      error: `File size must not exceed ${Math.round(maxSize / 1024 / 1024)}MB`
    };
  }

  return {
    isValid: true,
    error: null
  };
};

/**
 * Validates file type
 * @param {File} file - File to validate
 * @param {string[]} allowedTypes - Array of allowed MIME types
 * @returns {Object} Object containing validation result and error message
 */
export const validateFileType = (file, allowedTypes) => {
  if (!file) {
    return {
      isValid: false,
      error: "No file provided"
    };
  }

  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: `File type must be one of: ${allowedTypes.join(", ")}`
    };
  }

  return {
    isValid: true,
    error: null
  };
};

/**
 * Validates numeric input
 * @param {string|number} value - Value to validate
 * @param {Object} options - Validation options
 * @returns {Object} Object containing validation result and error message
 */
export const validateNumber = (value, options = {}) => {
  const {
    min = Number.MIN_SAFE_INTEGER,
    max = Number.MAX_SAFE_INTEGER,
    integer = false
  } = options;

  const number = Number(value);

  if (isNaN(number)) {
    return {
      isValid: false,
      error: "Must be a valid number"
    };
  }

  if (integer && !Number.isInteger(number)) {
    return {
      isValid: false,
      error: "Must be an integer"
    };
  }

  if (number < min) {
    return {
      isValid: false,
      error: `Must be greater than or equal to ${min}`
    };
  }

  if (number > max) {
    return {
      isValid: false,
      error: `Must be less than or equal to ${max}`
    };
  }

  return {
    isValid: true,
    error: null
  };
};

/**
 * Validates price input
 * @param {string|number} price - Price to validate
 * @param {Object} options - Validation options
 * @returns {Object} Object containing validation result and error message
 */
export const validatePrice = (price, options = {}) => {
  const {
    min = 0,
    max = Number.MAX_SAFE_INTEGER,
    allowZero = true
  } = options;

  const number = Number(price);

  if (isNaN(number)) {
    return {
      isValid: false,
      error: "Must be a valid price"
    };
  }

  if (!allowZero && number === 0) {
    return {
      isValid: false,
      error: "Price cannot be zero"
    };
  }

  if (number < min) {
    return {
      isValid: false,
      error: `Price must be greater than or equal to ${min}`
    };
  }

  if (number > max) {
    return {
      isValid: false,
      error: `Price must be less than or equal to ${max}`
    };
  }

  return {
    isValid: true,
    error: null
  };
};

/**
 * Validates text length
 * @param {string} text - Text to validate
 * @param {Object} options - Validation options
 * @returns {Object} Object containing validation result and error message
 */
export const validateTextLength = (text, options = {}) => {
  const {
    min = 0,
    max = Number.MAX_SAFE_INTEGER,
    trim = true
  } = options;

  if (!text) {
    return {
      isValid: min === 0,
      error: min === 0 ? null : `Text must be at least ${min} characters long`
    };
  }

  const length = trim ? text.trim().length : text.length;

  if (length < min) {
    return {
      isValid: false,
      error: `Text must be at least ${min} characters long`
    };
  }

  if (length > max) {
    return {
      isValid: false,
      error: `Text must not exceed ${max} characters`
    };
  }

  return {
    isValid: true,
    error: null
  };
};