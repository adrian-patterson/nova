import React, { useRef, useState } from 'react';
import { Modal, View, StyleSheet, Share } from 'react-native';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { BrowserHeader } from './BrowserHeader';
import { BrowserToolbar } from './BrowserToolbar';
import { SwipeableWebView } from './SwipeableWebView';
import { useBrowserLoading } from '../../hooks/useBrowserLoading';
import { useTheme } from '../../hooks/useTheme';
import { WebViewRef } from '../../types';

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
  // Use refs to track the actual navigation state for gesture handlers
  const canGoBackRef = useRef(false);
  const canGoForwardRef = useRef(false);
  // Track if we just started a navigation (to ignore stale canGoBack updates)
  const justNavigatedRef = useRef(false);
  const { isLoading, progress, handleLoadProgress, resetProgress } = useBrowserLoading();

  const handleReload = () => {
    webViewRef.current?.reload();
  };

  const handleStop = () => {
    webViewRef.current?.stopLoading();
    handleLoadProgress(1); // Complete the loading bar
  };

  const handleGoBack = () => {
    console.log('=== handleGoBack called ===');
    console.log('webViewRef.current exists:', !!webViewRef.current);
    console.log('canGoBackRef.current:', canGoBackRef.current);
    console.log('canGoBack (state):', canGoBack);

    // Use ref for the check, not state (to avoid race conditions)
    if (webViewRef.current && canGoBackRef.current) {
      console.log('>>> Executing goBack()');
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      webViewRef.current.goBack();
    } else {
      console.log('>>> NOT executing goBack() - conditions not met');
    }
  };

  const handleGoForward = () => {
    // Use ref for the check, not state (to avoid race conditions)
    if (webViewRef.current && canGoForwardRef.current) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      webViewRef.current.goForward();
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        url: currentUrl,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onLoadProgress = (event: { nativeEvent: { progress: number } }) => {
    handleLoadProgress(event.nativeEvent.progress);
  };

  const onLoadStart = (event: WebViewNavigationEvent) => {
    console.log('=== onLoadStart ===');
    console.log('URL:', event.nativeEvent.url);
    console.log('navigationType:', event.nativeEvent.navigationType);
    console.log('canGoBack (state):', canGoBack);
    console.log('canGoBackRef (ref):', canGoBackRef.current);
    console.log('canGoForward (state):', canGoForward);
    console.log('canGoForwardRef (ref):', canGoForwardRef.current);

    // Reset progress bar to 0 when new page starts loading
    resetProgress();

    // CRITICAL FIX: Enable back button immediately when navigation starts
    // If we're loading any page, and this isn't the very first load,
    // then there must be history to go back to
    // The WebView's onNavigationStateChange fires too late (after load completes)
    if (event.nativeEvent.navigationType === 'click' ||
        event.nativeEvent.navigationType === 'formsubmit' ||
        event.nativeEvent.navigationType === 'other') {
      console.log('>>> Enabling back button NOW (navigation type matched)');
      // User clicked a link or submitted a form - enable back immediately
      setCanGoBack(true);
      canGoBackRef.current = true;
      // Mark that we just navigated (to ignore the next stale update)
      justNavigatedRef.current = true;
    } else {
      console.log('>>> NOT enabling back button (navigationType did not match)');
    }
  };

  const onLoadEnd = () => {
    // Ensure we reach 100% when page finishes loading
    handleLoadProgress(1);
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
          <BrowserHeader
            isLoading={isLoading}
            onReload={handleReload}
            onStop={handleStop}
            onClose={onClose}
          />
          <SwipeableWebView
            webViewRef={webViewRef}
            currentUrl={currentUrl}
            canGoBack={canGoBack}
            canGoForward={canGoForward}
            onLoadStart={onLoadStart}
            onLoadProgress={onLoadProgress}
            onLoadEnd={onLoadEnd}
            onNavigationStateChange={(navState) => {
              console.log('=== onNavigationStateChange ===');
              console.log('URL:', navState.url);
              console.log('loading:', navState.loading);
              console.log('canGoBack (from WebView):', navState.canGoBack);
              console.log('canGoForward (from WebView):', navState.canGoForward);
              console.log('canGoBack (current state):', canGoBack);
              console.log('canGoBackRef (current ref):', canGoBackRef.current);
              console.log('justNavigatedRef:', justNavigatedRef.current);

              // CRITICAL FIX: Skip the first stale update after navigation
              // After a link click, WebView fires onNavigationStateChange with stale canGoBack=false
              // We ignore this ONE update, then accept all subsequent updates normally
              if (justNavigatedRef.current && !navState.canGoBack) {
                console.log('>>> SKIPPING stale canGoBack=false update (just navigated)');
                justNavigatedRef.current = false; // Clear flag after skipping once
                return;
              }

              // Normal case: trust WebView's navigation state
              console.log('>>> Updating navigation state from WebView');
              setCanGoBack(navState.canGoBack);
              setCanGoForward(navState.canGoForward);
              canGoBackRef.current = navState.canGoBack;
              canGoForwardRef.current = navState.canGoForward;
              console.log('>>> Updated canGoBack to:', navState.canGoBack);
              console.log('>>> Updated canGoForward to:', navState.canGoForward);
            }}
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
        </View>
      </SafeAreaProvider>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
