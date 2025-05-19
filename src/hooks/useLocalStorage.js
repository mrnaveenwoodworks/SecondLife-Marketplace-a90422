import { useState, useEffect } from "react";

/**
 * Custom hook for persisting and retrieving data from browser local storage
 * @template T
 * @param {string} key - The key under which to store the value in localStorage
 * @param {T} initialValue - The initial value to use if no value exists in localStorage
 * @returns {[T, React.Dispatch<React.SetStateAction<T>>, () => void]} A tuple containing the current value, a setter function, and a function to remove the item
 */
const useLocalStorage = (key, initialValue) => {
  // Create state to store the value
  // Pass a function to useState so the function is only executed once on initial render
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get item from localStorage by key
      const item = window.localStorage.getItem(key);
      
      // Parse stored JSON or return initialValue if no stored value
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error, return initialValue
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Effect to update localStorage when the state changes
  useEffect(() => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = 
        storedValue instanceof Function ? storedValue(storedValue) : storedValue;
      
      // Save to localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // Log errors in case of issues with localStorage
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  // Function to remove the item from localStorage
  const removeItem = () => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  };

  // Return the stored value, a setter function, and a function to remove the item
  return [storedValue, setStoredValue, removeItem];
};

export default useLocalStorage;