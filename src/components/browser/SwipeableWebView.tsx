import React from 'react';
import { View, StyleSheet, Animated, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import type { WebViewNavigationEvent } from 'react-native-webview/lib/WebViewTypes';
import { useSwipeGesture } from '../../hooks/useSwipeGesture';
import { usePullToRefresh } from '../../hooks/usePullToRefresh';
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
  onRefresh: () => void;
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
  onRefresh,
}) => {
  const { theme } = useTheme();
  const { panResponder, isGesturing, swipeDirection, swipeDistance } = useSwipeGesture({
    canGoBack,
    canGoForward,
    onSwipeBack,
    onSwipeForward,
  });

  const {
    panResponder: refreshPanResponder,
    pullDistance,
    isRefreshing,
    spinnerRotation,
    spinnerOpacity,
  } = usePullToRefresh({
    onRefresh,
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

      {/* Pull-to-refresh indicator */}
      <Animated.View
        style={[
          styles.refreshIndicator,
          {
            opacity: spinnerOpacity,
            transform: [{ translateY: pullDistance }, { rotate: spinnerRotation }],
          },
        ]}
      >
        <ActivityIndicator
          size="large"
          color={theme.colors.text}
          animating={isRefreshing || pullDistance !== 0}
        />
      </Animated.View>

      {/* Refresh gesture area at top */}
      <View style={styles.refreshArea} {...refreshPanResponder.panHandlers} />

      <Animated.View
        style={[
          styles.webViewContainer,
          isGesturing && { transform: [{ translateX: pageTranslateX }] },
        ]}
      >
        <WebView
          ref={webViewRef}
          source={{ uri: currentUrl }}
          style={styles.webView}
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
  refreshIndicator: {
    position: 'absolute',
    top: -40,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    zIndex: 10,
  },
  refreshArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    zIndex: 5,
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
