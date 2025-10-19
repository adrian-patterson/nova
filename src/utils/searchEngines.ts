import { SearchEngine, SearchEngineId } from '../types';

/**
 * Default search engine
 */
export const DEFAULT_SEARCH_ENGINE: SearchEngineId = 'brave';

/**
 * All supported search engines with their configurations
 */
export const SEARCH_ENGINES: Record<SearchEngineId, SearchEngine> = {
  brave: {
    id: 'brave',
    name: 'Brave Search',
    searchUrl: (query: string) => `https://search.brave.com/search?q=${encodeURIComponent(query)}`,
    icon: 'shield-checkmark',
    color: '#FB542B', // Brave orange
  },
  duckduckgo: {
    id: 'duckduckgo',
    name: 'DuckDuckGo',
    searchUrl: (query: string) => `https://duckduckgo.com/?q=${encodeURIComponent(query)}`,
    icon: 'search',
    color: '#DE5833', // DuckDuckGo red
  },
  google: {
    id: 'google',
    name: 'Google',
    searchUrl: (query: string) => `https://www.google.com/search?q=${encodeURIComponent(query)}`,
    icon: 'logo-google',
    color: '#4285F4', // Google blue
  },
  ecosia: {
    id: 'ecosia',
    name: 'Ecosia',
    searchUrl: (query: string) => `https://www.ecosia.org/search?q=${encodeURIComponent(query)}`,
    icon: 'leaf',
    color: '#59B368', // Ecosia green
  },
};

/**
 * Get search URL for a given engine and query
 */
export const getSearchUrl = (engineId: SearchEngineId, query: string): string => {
  const engine = SEARCH_ENGINES[engineId] || SEARCH_ENGINES[DEFAULT_SEARCH_ENGINE];
  return engine.searchUrl(query);
};
