import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { WebView } from 'react-native-webview';
import type { WebViewNavigationEvent } from 'react-native-webview/lib/WebViewTypes';
import { useSwipeGesture } from '../../hooks/useSwipeGesture';
import { useTheme } from '../../hooks/useTheme';
import { WebViewRef, NavigationState } from '../../types';

interface SwipeableWebViewProps {
  webViewRef: React.RefObject<WebViewRef>;
  currentUrl: string;
  canGoBack: boolean;
  canGoForward: boolean;
  onLoadStart: (event: WebViewNavigationEvent) => void;
  onLoadProgress: (event: { nativeEvent: { progress: number } }) => void;
  onLoadEnd: () => void;
  onNavigationStateChange: (navState: NavigationState) => void;
  onSwipeBack: () => void;
  onSwipeForward: () => void;
}

export const SwipeableWebView: React.FC<SwipeableWebViewProps> = ({
  webViewRef,
  currentUrl,
  canGoBack,
  canGoForward,
  onLoadStart,
  onLoadProgress,
  onLoadEnd,
  onNavigationStateChange,
  onSwipeBack,
  onSwipeForward,
}) => {
  const { theme } = useTheme();
  const { panResponder, isGesturing, swipeDirection, swipeDistance } = useSwipeGesture({
    canGoBack,
    canGoForward,
    onSwipeBack,
    onSwipeForward,
  });

  // Calculate page translation based on swipe direction
  const pageTranslateX = swipeDistance.interpolate({
    inputRange: [0, 300],
    outputRange: [0, swipeDirection === 'right' ? 300 : -300],
    extrapolate: 'clamp',
  });

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <View style={[styles.backgroundLayer, { backgroundColor: theme.colors.surface }]} />

      <Animated.View
        style={[
          styles.webViewContainer,
          isGesturing && { transform: [{ translateX: pageTranslateX }] },
        ]}
      >
        <WebView
          ref={webViewRef}
          source={{ uri: currentUrl }}
          style={[styles.webView, { backgroundColor: theme.colors.background }]}
          backgroundColor={theme.colors.background}
          incognito={true}
          cacheEnabled={false}
          thirdPartyCookiesEnabled={false}
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={true}
          onLoadStart={onLoadStart}
          onLoadProgress={onLoadProgress}
          onLoadEnd={onLoadEnd}
          onNavigationStateChange={onNavigationStateChange}
        />
      </Animated.View>
      {/* Edge overlays to capture swipe gestures before WebView */}
      {canGoBack && (
        <View
          style={styles.leftEdgeOverlay}
          {...panResponder.panHandlers}
        />
      )}
      {canGoForward && (
        <View
          style={styles.rightEdgeOverlay}
          {...panResponder.panHandlers}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundLayer: {
    ...StyleSheet.absoluteFillObject,
  },
  webViewContainer: {
    flex: 1,
  },
  webView: {
    flex: 1,
  },
  leftEdgeOverlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 50, // SWIPE_EDGE_THRESHOLD
  },
  rightEdgeOverlay: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 50, // SWIPE_EDGE_THRESHOLD
  },
});
