import { useEffect, useRef } from 'react';
import { Linking } from 'react-native';

interface UseDeepLinkingProps {
  onOpenURL: (url: string) => void;
}

/**
 * Custom hook to handle deep linking for opening external HTTP/HTTPS links
 * This enables Nova to receive links from other apps (Messages, Mail, etc.)
 */
export const useDeepLinking = ({ onOpenURL }: UseDeepLinkingProps) => {
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;

    // Handle initial URL when app is opened from a link (cold start)
    const handleInitialURL = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();

        // Only handle HTTP/HTTPS URLs, ignore Expo dev URLs and other schemes
        if (initialUrl &&
            (initialUrl.startsWith('http://') || initialUrl.startsWith('https://')) &&
            isMountedRef.current) {
          onOpenURL(initialUrl);
        }
      } catch (error) {
        console.error('Error getting initial URL:', error);
      }
    };

    // Handle URLs when app is already running (warm start)
    const subscription = Linking.addEventListener('url', (event) => {
      // Only handle HTTP/HTTPS URLs, ignore Expo dev URLs and other schemes
      if (event.url &&
          (event.url.startsWith('http://') || event.url.startsWith('https://')) &&
          isMountedRef.current) {
        onOpenURL(event.url);
      }
    });

    handleInitialURL();

    return () => {
      isMountedRef.current = false;
      subscription.remove();
    };
  }, [onOpenURL]);
};
