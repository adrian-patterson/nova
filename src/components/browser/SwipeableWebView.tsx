import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { WebView } from 'react-native-webview';
import type { WebViewNavigationEvent } from 'react-native-webview/lib/WebViewTypes';
import { useSwipeGesture } from '../../hooks/useSwipeGesture';
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
    <View style={styles.container} {...panResponder.panHandlers}>
      <View style={styles.backgroundLayer} />
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
          onLoadStart={onLoadStart}
          onLoadProgress={onLoadProgress}
          onLoadEnd={onLoadEnd}
          onNavigationStateChange={onNavigationStateChange}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1e',
  },
  backgroundLayer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#1c1c1e',
  },
  webViewContainer: {
    flex: 1,
  },
  webView: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
