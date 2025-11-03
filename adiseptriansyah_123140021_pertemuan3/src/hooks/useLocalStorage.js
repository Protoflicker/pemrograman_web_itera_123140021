import { useState, useEffect } from 'react';

function getStorageValue(key, defaultValue) {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(key);
    try {
      return saved ? JSON.parse(saved) : defaultValue;
    } catch (e) {
      console.error('Failed to parse localStorage key:', key, e);
      return defaultValue;
    }
  }
  return defaultValue;
}

export const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Failed to set localStorage key:', key, e);
    }
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;