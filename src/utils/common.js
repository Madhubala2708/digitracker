import React from "react";

export const compareObject = (a = {}, b = {}) => {
  if (a === b) return true;
  if ((Array.isArray(a) && !Array.isArray(b)) || (!Array.isArray(a) && Array.isArray(b))) return false;
  const aggregate = { ...a, ...b };
  for (const key in aggregate) {
    if (typeof a[key] === "object" && typeof b[key] === "object") {
      return compareObject(a[key], b[key]);
    }
    if (a[key] !== b[key]) return false;
  }
  return true;
};

/**
 *
 * @param {Record<string,any>} data
 * @returns {Record<string,any>}
 */
export const trimObjectProperties = (data = {}) => {
  const newData = { ...data };
  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      const element = data[key];
      if (typeof element === "string") {
        newData[key] = element.trim();
      }
    }
  }
  return newData;
};

export const isObjectEmpty = objectName => {
  return Object.keys(objectName).length === 0 && objectName.constructor === Object;
};

export const isArrayEmpty = array => {
  return array.length === 0;
};

export const isValidType = (name, allowType) => {
  for (let j = 0; j < allowType.length; j++) {
    let sCurExtension = allowType[j];
    if (
      name.substr(name.length - sCurExtension.length, sCurExtension.length).toLowerCase() ===
      sCurExtension.toLowerCase()
    ) {
      return true;
    }
  }
  return false;
};

export const validateFiles = (fileArray, allowFileType) => {
  return fileArray.filter(file => isValidType(file.name, allowFileType));
};

export const hasScrollBar = className => {
  const element = document.querySelector(className);
  if (!element) {
    return false;
  }
  const hasScrollBar =
    element.clientHeight < element.scrollHeight || element.clientWidth < element.scrollWidth;

  return hasScrollBar;
};

export const normalizeData = data => {
  const normalizedData = {
    entities: {},
    result: [],
  };

  data.forEach(item => {
    const { id } = item;
    normalizedData.entities[id] = item;
    normalizedData.result.push(id);
  });

  return normalizedData;
};

export const formatDate = (dateString) =>{
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-based
  const year = date.getFullYear();

  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  return `${formattedDay}/${formattedMonth}/${year}`;
}

export const getFileTypeClassName = (fileType) => {
  if (!fileType) {
    return ''; // Return a default class or an empty string if file is not provided
  }

  const fileTypeParam = fileType.split('/')[0]; // 'image', 'application', etc.
  const fileFormat = fileType.split('/')[1];

  switch (fileTypeParam) {
    case 'image':
    case '.png':
    case '.jpg':
    case '.jpeg':
    case '.gif':
    case '.bmp':
    case '.webp':
    case '.svg':
    case '.ico':
      return 'icon-image-file';
    case 'application':
      if(fileFormat=="pdf"){
        return 'icon-pdf-file';
      }else if(fileFormat=="x-zip-compressed"){
        return 'icon-archive-file';
      }else if(fileFormat=="vnd.openxmlformats-officedocument.wordprocessingml.document"){
        return 'icon-doc-file';
      }else if(fileFormat=="vnd.openxmlformats-officedocument.spreadsheetml.sheet"){
        return 'icon-xls-file';
      }else{
        return 'icon-unsupported-file';
      }
    case '.pdf':
      return 'icon-pdf-file';
    case '.zip':
      return 'icon-archive-file';
    case '.doc':
    case '.docx':
      return 'icon-doc-file';
    case '.xls':
    case '.xlsx':
      return 'icon-xls-file';
    default:
      return 'icon-unsupported-file'; // Return a default class for unknown file types
  }
};

// Function to determine if a color is dark
export const isDark = (color) => {
  if (color.startsWith('#')) {
    color = color.substring(1); // Remove the leading #
    // Convert hexadecimal to RGB
    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);
    // Calculate brightness
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness < 128;
  } else if (color.startsWith('rgb(')) {
    // Extract RGB values from RGB format
    const rgb = color.match(/\d+/g).map(Number);
    // Calculate brightness
    const brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
    return brightness < 128;
  } else {
    // Unsupported color format
    throw new Error('Unsupported color format');
  }
}

export const  getMimeTypeFromExtension = (extension) => {
  switch (extension.toLowerCase()) {
      case 'jpg':
      case 'jpeg':
          return 'image/jpeg';
      case 'png':
          return 'image/png';
      case 'gif':
          return 'image/gif';
      case 'pdf':
          return 'application/pdf';
      case 'csv':
          return 'text/csv';
      case 'json':
          return 'application/json';
      // Add more cases for other file types as needed
      default:
          return 'application/octet-stream'; // Default to generic binary data
  }
}

export const objectToQueryString = (params) => {
  return Object.keys(params)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
    .join('&');
}

/**
 * Returns an array of years based on a provided configuration.
 * The function returns regular calendar years (e.g., 2023, 2024, 2025).
 * 
 * @param {Object} [config={ previousYears: 1, currentYear: 1, nextYears: 1 }] - Configuration object for specifying year offsets.
 * @returns {Object[]} Array containing the years.
 */
export const getSingleYear = (config = { previousYears: 1, currentYear: 1, nextYears: 1 }) => {
  const today = new Date();
  const currentYear = today.getFullYear();

  // Helper function to format the year as a string
  const formatYear = (year) => `${year}`;

  // Initialize the result array
  const result = [];

  // Initialize the ID counter
  let id = 0;

  // Add previous years based on config
  for (let i = config.previousYears; i > 0; i--) {
    result.push({
      id: id++, // Assign current id and then increment
      year: formatYear(currentYear - i)
    });
  }

  // Add the current year
  if (config.currentYear > 0) {
    result.push({
      id: id++, // Assign current id and then increment
      year: formatYear(currentYear)
    });
  }

  // Add future years based on config
  for (let i = 1; i <= config.nextYears; i++) {
    result.push({
      id: id++, // Assign current id and then increment
      year: formatYear(currentYear + i)
    });
  }

  return result;
};


/**
 * Returns an array of financial years based on a provided configuration.
 * The financial year runs from April 1 to March 31.
 * 
 * @param {Object} [config={ previousYears: 5, currentFinancialYear: 1, nextFinancialYear: 1 }] - Configuration object for specifying year offsets.
 * @returns {Object[]} Array containing the financial years from the current year down to previous years, and optionally the next financial year.
 */
export const getFinancialYears = (config = { previousYears: 5, currentFinancialYear: 1, nextFinancialYear: 1 }) => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  // Determine the start year of the current financial year
  let startYear = (currentMonth >= 3) ? currentYear : currentYear - 1;

  // Helper function to format the financial year string
  const formatYear = (year) => `${year}-${(year + 1).toString().slice(-2)}`;

  // Initialize the result array
  const result = [];

  // Add the current financial year
  result.push({
    id: config.currentFinancialYear,
    year: formatYear(startYear)
  });

  // Add previous financial years in reverse order
  for (let i = 1; i <= config.previousYears; i++) {
    result.push({
      id: config.currentFinancialYear + i,
      year: formatYear(startYear - i)
    });
  }

  // Add the next financial year if the config allows it
  if (config.nextFinancialYear > 0) {
    result.unshift({
      id: config.currentFinancialYear - 1,
      year: formatYear(startYear + 1)
    });
  }

  // Ensure unique IDs by removing duplicates
  const uniqueResult = result.reduce((acc, current) => {
    const x = acc.find(item => item.id === current.id);
    if (!x) {
      return acc.concat([current]);
    }
    return acc;
  }, []);

  return uniqueResult;
};

/**
 * Returns an array of financial years from a specified start year up to the current financial year.
 * The financial year runs from April 1 to March 31.
 * 
 * @param {string} startYear - The start year in "YYYY-YY" format (e.g., "2022-23").
 * @returns {Object[]} Array containing the financial years from the specified start year up to the current financial year.
 */
export const getFinancialYearsFromStart = (startYear) => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  // Determine the start year of the current financial year
  const currentFinancialStartYear = (currentMonth >= 3) ? currentYear : currentYear - 1;

  // Extract the starting year from the input
  const startYearParts = startYear.split('-');
  const startYearStart = parseInt(startYearParts[0]);

  // Helper function to format the financial year string
  const formatYear = (year) => `${year}-${(year + 1).toString().slice(-2)}`;

  // Initialize the result array
  const result = [];

  // Check if the starting year is valid
  if (startYearStart > currentFinancialStartYear) {
    throw new Error("Start year cannot be after the current financial year.");
  }

  // Populate the result array starting from the specified start year up to the current financial year
  let yearToAdd = startYearStart;

  while (yearToAdd <= currentFinancialStartYear) {
    result.push({
      id: currentFinancialStartYear - yearToAdd + 1,
      year: formatYear(yearToAdd)
    });
    yearToAdd++;
  }

  // Sort the result array in descending order of financial years
  result.sort((a, b) => {
    // Extract years from the 'year' property to sort correctly
    const yearA = parseInt(a.year.split('-')[0]);
    const yearB = parseInt(b.year.split('-')[0]);
    return yearB - yearA;
  });

  return result;
};

export const  isOnlyWhitespaceHtml = (input)=> {
  // Use a DOM parser to extract text content and handle <br> or similar elements
  const parser = new DOMParser();
  const doc = parser.parseFromString(input, "text/html");
  const body = doc.body;

  // Remove non-textual elements like <br>, <img>, etc., if they should be ignored
  body.querySelectorAll("br, img").forEach((el) => el.remove());

  // Get the remaining text content
  const textContent = body.textContent || "";

  // Check if the remaining text content is only whitespace
  return /^\s*$/.test(textContent);
}

export const selectedQuatreColor = [
  { id: 1, colorCode: "#00ADF0", name: "Q1" },
  { id: 2, colorCode: "#44EBB1", name: "Q2" },
  { id: 3, colorCode: "#E283BB", name: "Q3" },
  { id: 4, colorCode: "#384955", name: "Q4" },
  { id: 5, colorCode: "#EC6240", name: "H1" },
  { id: 6, colorCode: "#9CADBC", name: "H2" },
  { id: 7, colorCode: "#3FC08C", name: "Annual" },
];