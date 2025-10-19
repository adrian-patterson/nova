import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SearchEngineId } from '../types';
import { DEFAULT_SEARCH_ENGINE } from '../utils/searchEngines';
import { STORAGE_KEY_SEARCH_ENGINE } from '../utils/constants';

interface UseSearchEngineReturn {
  searchEngine: SearchEngineId;
  setSearchEngine: (engine: SearchEngineId) => Promise<void>;
  isLoading: boolean;
}

/**
 * Hook for managing search engine preference with AsyncStorage persistence
 */
export const useSearchEngine = (): UseSearchEngineReturn => {
  const [searchEngine, setSearchEngineState] = useState<SearchEngineId>(DEFAULT_SEARCH_ENGINE);
  const [isLoading, setIsLoading] = useState(true);

  // Load saved preference on mount
  useEffect(() => {
    const loadSearchEngine = async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY_SEARCH_ENGINE);
        if (saved && isValidSearchEngine(saved)) {
          setSearchEngineState(saved as SearchEngineId);
        }
      } catch (error) {
        console.error('Failed to load search engine preference:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSearchEngine();
  }, []);

  // Save preference and update state
  const setSearchEngine = async (engine: SearchEngineId): Promise<void> => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY_SEARCH_ENGINE, engine);
      setSearchEngineState(engine);
    } catch (error) {
      console.error('Failed to save search engine preference:', error);
      throw error;
    }
  };

  return {
    searchEngine,
    setSearchEngine,
    isLoading,
  };
};

/**
 * Type guard for SearchEngineId
 */
const isValidSearchEngine = (value: string): boolean => {
  return ['brave', 'duckduckgo', 'google', 'ecosia'].includes(value);
};
