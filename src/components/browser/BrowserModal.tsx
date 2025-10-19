import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Modal, StyleSheet, Share, Animated, StatusBar } from 'react-native';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import type { WebViewNavigationEvent } from 'react-native-webview/lib/WebViewTypes';
import * as Haptics from 'expo-haptics';
import { BrowserHeader } from './BrowserHeader';
import { BrowserToolbar } from './BrowserToolbar';
import { SwipeableWebView } from './SwipeableWebView';
import { useBrowserLoading } from '../../hooks/useBrowserLoading';
import { usePullToDismiss } from '../../hooks/usePullToDismiss';
import { useTheme } from '../../hooks/useTheme';
import { WebViewRef, NavigationState } from '../../types';

interface BrowserModalProps {
  visible: boolean;
  currentUrl: string;
  onClose: () => void;
}

export const BrowserModal: React.FC<BrowserModalProps> = ({
  visible,
  currentUrl,
  onClose,
}) => {
  const { theme } = useTheme();
  const webViewRef = useRef<WebViewRef>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const [activeUrl, setActiveUrl] = useState(currentUrl);

  // Refs for gesture handlers to avoid race conditions with state updates
  const canGoBackRef = useRef(false);
  const canGoForwardRef = useRef(false);
  const justNavigatedRef = useRef(false);
  const initialUrlRef = useRef(currentUrl);

  const { isLoading, progress, handleLoadProgress, resetProgress } = useBrowserLoading();
  const { panResponder, translateY } = usePullToDismiss({ onDismiss: onClose });

  // Handle animated close
  const handleClose = useCallback(() => {
    Animated.timing(translateY, {
      toValue: 1000,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onClose();
    });
  }, [translateY, onClose]);

  // Reset navigation state when modal opens
  useEffect(() => {
    if (visible) {
      initialUrlRef.current = currentUrl;
      setActiveUrl(currentUrl);
      setCanGoBack(false);
      setCanGoForward(false);
      canGoBackRef.current = false;
      canGoForwardRef.current = false;
      justNavigatedRef.current = false;

      // Animate slide up on open
      translateY.setValue(1000);
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, currentUrl, translateY]);

  const handleReload = useCallback(() => {
    webViewRef.current?.reload();
  }, []);

  const handleStop = () => {
    webViewRef.current?.stopLoading();
    handleLoadProgress(1); // Complete the loading bar
  };

  const handleGoBack = useCallback(() => {
    if (webViewRef.current && canGoBackRef.current) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      webViewRef.current.goBack();
    }
  }, []);

  const handleGoForward = useCallback(() => {
    if (webViewRef.current && canGoForwardRef.current) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      webViewRef.current.goForward();
    }
  }, []);

  const handleShare = useCallback(async () => {
    try {
      await Share.share({ url: activeUrl });
    } catch (error) {
      console.error('Share failed:', error);
    }
  }, [activeUrl]);

  const onLoadProgress = useCallback((event: { nativeEvent: { progress: number } }) => {
    handleLoadProgress(event.nativeEvent.progress);
  }, [handleLoadProgress]);

  const onLoadStart = useCallback((event: WebViewNavigationEvent): void => {
    resetProgress();

    const isInitialLoad = event.nativeEvent.url === initialUrlRef.current;
    const isUserNavigation = event.nativeEvent.navigationType !== 'reload' &&
                             event.nativeEvent.navigationType !== 'backforward';

    // Enable back button immediately when user navigates (not initial load)
    // This prevents getting stuck if the page never fully loads
    if (isUserNavigation && !isInitialLoad) {
      setCanGoBack(true);
      canGoBackRef.current = true;
      setCanGoForward(false);
      canGoForwardRef.current = false;
      justNavigatedRef.current = true;
    }
  }, [resetProgress]);

  const onLoadEnd = useCallback(() => {
    handleLoadProgress(1);
  }, [handleLoadProgress]);

  const onNavigationStateChange = useCallback((navState: NavigationState) => {
    // Skip the first stale update after user navigation
    // WebView initially reports canGoBack=false, then updates to true
    if (justNavigatedRef.current && !navState.canGoBack) {
      justNavigatedRef.current = false;
      return;
    }

    // Update navigation state from WebView
    setCanGoBack(navState.canGoBack);
    setCanGoForward(navState.canGoForward);
    canGoBackRef.current = navState.canGoBack;
    canGoForwardRef.current = navState.canGoForward;

    // Update active URL for sharing
    if (navState.url) {
      setActiveUrl(navState.url);
    }
  }, []);

  return (
    <Modal
      visible={visible}
      animationType="none"
      onRequestClose={handleClose}
      supportedOrientations={['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right']}
      transparent={true}
      statusBarTranslucent={false}
    >
      <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <Animated.View
          style={[
            styles.modalBackground,
            { backgroundColor: theme.colors.background },
          ]}
        >
          <Animated.View
            style={[
              styles.container,
              { backgroundColor: theme.colors.background, transform: [{ translateY }] },
            ]}
          >
          <BrowserHeader
            isLoading={isLoading}
            onReload={handleReload}
            onStop={handleStop}
            onClose={handleClose}
            panResponder={panResponder}
          />
          <SwipeableWebView
            webViewRef={webViewRef}
            currentUrl={currentUrl}
            canGoBack={canGoBack}
            canGoForward={canGoForward}
            onLoadStart={onLoadStart}
            onLoadProgress={onLoadProgress}
            onLoadEnd={onLoadEnd}
            onNavigationStateChange={onNavigationStateChange}
            onSwipeBack={handleGoBack}
            onSwipeForward={handleGoForward}
          />
          <BrowserToolbar
            canGoBack={canGoBack}
            canGoForward={canGoForward}
            onGoBack={handleGoBack}
            onGoForward={handleGoForward}
            onShare={handleShare}
            showLoadingBar={isLoading}
            loadingProgress={progress}
          />
          </Animated.View>
        </Animated.View>
      </SafeAreaProvider>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});
