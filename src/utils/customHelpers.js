import React from 'react';
import { II18n } from './locale/i18n';

/**
 * A utility for constructing className strings conditionally.
 * @example 
 * classNames("main", { active: true }) => "main active"
 */
export function classNames(...args) {
  return args
    .flatMap(arg => typeof arg === 'string' ? [arg] : Object.keys(arg || {}).filter(key => arg[key]))
    .join(' ');
}

/**
 * Convert event React name to vanilla event name
 * @example: onMountDown => mountdown
 */
export function getRealEventName(eventName) {
  return eventName.replace(/^on/, '').toLowerCase();
}

/**
 * Utility to prevent click event when user moves the mouse
 */
export function clickWithoutMove(handle, space) {
  let startX, startY;

  return {
    onPointerDown: e => {
      startX = e.pageX;
      startY = e.pageY;
    },
    onPointerMove: e => {
      const moved = Math.abs(e.pageX - startX) > space || Math.abs(e.pageY - startY) > space;
      if (moved) e.stopPropagation();
    },
    onClick: handle,
  };
}

export function softPercent(min, current, max) {
  return Math.min(100, Math.max(0, ((current - min) / (max - min)) * 100));
}

export function replaceKey(str, data) {
  if (Array.isArray(data)) {
    return data.reduce((result, val, index) => result.replace(`{${index}}`, val), str);
  }
  return Object.entries(data).reduce((result, [key, val]) => result.replace(`{${key}}`, val), str);
}

export function convertToJson(data) {
  return JSON.stringify(data);
}

export function checkEmptyObject(value) {
  return value && Object.keys(value).length === 0 && value.constructor === Object;
}

export function compareDate(prevDate, nextDate) {
  if (!prevDate || !nextDate) return false;
  const d1 = new Date(prevDate).setHours(0, 0, 0, 0);
  const d2 = new Date(nextDate).setHours(0, 0, 0, 0);
  return d1 === d2;
}

export function compareSameKeyObject(prevData, nextData) {
  return JSON.stringify(prevData) === JSON.stringify(nextData);
}

export function objectToEnum(obj) {
  return Object.fromEntries(Object.entries(obj).map(([key, value]) => [value, key]));
}

export function stringId(length) {
  return Array.from({ length }, () => Math.random().toString(36)[2]).join('');
}

export function isObject(obj) {
  return obj !== null && typeof obj === 'object' && !Array.isArray(obj);
}

export function mergeObject(data1, data2) {
  return { ...data1, ...data2 };
}

export function observerWindowResize(cb) {
  const listener = e => cb(e);
  window.addEventListener('resize', listener);
  return () => window.removeEventListener('resize', listener);
}

export function isString(item) {
  return typeof item === 'string';
}

export function loadCustomStylesheet(defaultStylesheetUrls, customStylesheetUrl, customStylesheetUrlBase) {
  const allStylesheets = customStylesheetUrl ? [...defaultStylesheetUrls, `${customStylesheetUrlBase}/${customStylesheetUrl}`] : defaultStylesheetUrls;

  allStylesheets.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
  });
}

export function getRandomString() {
  return Math.random().toString(36).slice(2);
}

export function pickBy(object, predicate) {
  return Object.keys(object).reduce((result, key) => {
    if (predicate(object[key])) {
      result[key] = object[key];
    }
    return result;
  }, {});
}

export function isValidNegativeNumberFormat(format) {
  return /^-?\d+(\.\d+)?$/.test(format);
}
export function setVariableByTemplate(template, ...args) {
  if (!template || typeof template !== "string") {
    console.error("Invalid or empty template.");
    return null;
  }

  // Flatten all nested variable objects
  const variables = args.reduce((acc, item) => ({ ...acc, ...item.common }), {});

  // Build the CSS content with custom properties
  const cssVariables = Object.entries(variables)
    .map(([key, value]) => `${key}: ${value};`)
    .join("\n");

  return {
    toString: () => cssVariables,
    toStyleElement: () => {
      const style = document.createElement("style");
      style.innerHTML = `:root {\n${cssVariables}\n}`;
      return style;
    },
    injectTo: () => {
      const style = document.createElement("style");
      style.innerHTML = `:root {\n${cssVariables}\n}`;
      document.head.appendChild(style);
      console.log("Styles injected successfully.");
    }
  };
}

/**
 * @typedef {import('./locale/i18n').II18n} II18n
 */

/**
 * @type {II18n}
 */
export const i18n = window.II18n; // Assuming it's available globally or imported

