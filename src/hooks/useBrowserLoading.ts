import { useState, useRef, useEffect } from 'react';

export const useBrowserLoading = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleLoadProgress = (progressValue: number) => {
    setProgress(progressValue);

    if (progressValue < 1) {
      setIsLoading(true);
      // Clear any pending hide timeout
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = null;
      }
    } else {
      // Page finished loading - hide after brief delay
      hideTimeoutRef.current = setTimeout(() => {
        setIsLoading(false);
        setProgress(0); // Reset for next load
      }, 600);
    }
  };

  const resetProgress = () => {
    setProgress(0);
    setIsLoading(true);
  };

  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  return {
    isLoading,
    progress,
    handleLoadProgress,
    resetProgress,
  };
};
