import { SearchEngineId } from '../types';
import { getSearchUrl, DEFAULT_SEARCH_ENGINE } from './searchEngines';

/**
 * Checks if the input string is a URL
 */
export const isUrl = (input: string): boolean => {
  // Check if it starts with a protocol
  if (input.startsWith('http://') || input.startsWith('https://')) {
    return true;
  }

  // Check if it looks like a domain (has a dot and no spaces)
  if (input.includes('.') && !input.includes(' ')) {
    return true;
  }

  return false;
};

/**
 * Formats input as URL or search query
 * Returns a full URL with protocol or search engine URL
 */
export const formatUrl = (input: string, searchEngine: SearchEngineId = DEFAULT_SEARCH_ENGINE): string => {
  if (!input.trim()) return '';

  const trimmed = input.trim();

  // If it's a URL, format it
  if (isUrl(trimmed)) {
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
      return trimmed;
    }
    return `https://${trimmed}`;
  }

  // Otherwise, treat as search query using selected engine
  return getSearchUrl(searchEngine, trimmed);
};
