/**
 * A utility function to create a debounced function.
 * @param {Function} func - The function to debounce.
 * @param {number} wait - The debounce delay in milliseconds.
 * @returns {Object} A debounced function with cancel and flush methods.
 */
export function createDebouncedFunc(func, wait) {
    let timeout;
    let lastResult;
  
    const debounced = (...args) => {
      if (timeout) clearTimeout(timeout);
  
      return new Promise((resolve) => {
        timeout = setTimeout(() => {
          lastResult = func(...args);
          resolve(lastResult);
        }, wait);
      });
    };
  
    debounced.cancel = () => {
      if (timeout) clearTimeout(timeout);
    };
  
    debounced.flush = () => lastResult;
  
    return debounced;
  }
  
  /**
   * Create an enum-like object from a given object.
   * @param {Object} obj - Input object to convert.
   * @returns {Object} Enum-like object with both keys and reverse mapping.
   */
  export function createEnum(obj) {
    const result = { ...obj };
    Object.values(obj).forEach((value) => {
      result[value] = Object.keys(obj).find((key) => obj[key] === value);
    });
    return Object.freeze(result);
  }
  
  /**
   * Filter properties with non-`never` values from an array of objects.
   * @param {Array<Object>} data - Array of objects to filter.
   * @returns {Array<Object>} Filtered array.
   */
  export function removeNeverInArray(data) {
    return data.filter((item) => Object.values(item).some((value) => value !== undefined));
  }
  
  /**
   * Get the key of an object for a specific value.
   * @param {Object} obj - The object to search.
   * @param {any} value - The value to find the key for.
   * @returns {string|null} The key or null if not found.
   */
  export function getKeyByValue(obj, value) {
    return Object.keys(obj).find((key) => obj[key] === value) || null;
  }
  