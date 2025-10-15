import { useRef, useState, useCallback } from 'react';
import { Animated, PanResponder } from 'react-native';
import * as Haptics from 'expo-haptics';

interface UsePullToRefreshProps {
  onRefresh: () => void;
  threshold?: number;
}

export const usePullToRefresh = ({ onRefresh, threshold = 80 }: UsePullToRefreshProps) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const pullDistance = useRef(new Animated.Value(0)).current;
  const isPulling = useRef(false);
  const hasTriggeredHaptic = useRef(false);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);

    // Trigger medium haptic feedback when refresh starts
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    // Call the refresh callback
    onRefresh();

    // Animate the spinner for a minimum duration
    setTimeout(() => {
      Animated.timing(pullDistance, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setIsRefreshing(false);
        hasTriggeredHaptic.current = false;
      });
    }, 500);
  }, [onRefresh, pullDistance]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Only respond to downward pulls from the top
        return gestureState.dy > 5 && gestureState.dy > Math.abs(gestureState.dx);
      },
      onPanResponderGrant: () => {
        isPulling.current = true;
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0 && !isRefreshing) {
          // Apply rubber band effect (slower movement as you pull further)
          const rubberBandDistance = Math.min(gestureState.dy * 0.4, threshold * 1.5);
          pullDistance.setValue(rubberBandDistance);

          // Light haptic feedback when reaching threshold
          if (rubberBandDistance >= threshold && !hasTriggeredHaptic.current) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            hasTriggeredHaptic.current = true;
          }
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        isPulling.current = false;

        const rubberBandDistance = gestureState.dy * 0.4;

        if (rubberBandDistance > threshold && !isRefreshing) {
          // Trigger refresh
          Animated.spring(pullDistance, {
            toValue: threshold,
            useNativeDriver: true,
            tension: 50,
            friction: 8,
          }).start(() => {
            handleRefresh();
          });
        } else {
          // Spring back
          Animated.spring(pullDistance, {
            toValue: 0,
            useNativeDriver: true,
            tension: 50,
            friction: 8,
          }).start(() => {
            hasTriggeredHaptic.current = false;
          });
        }
      },
    })
  ).current;

  // Calculate rotation for spinner (0 to 360 degrees based on pull distance)
  const spinnerRotation = pullDistance.interpolate({
    inputRange: [0, threshold],
    outputRange: ['0deg', '360deg'],
    extrapolate: 'clamp',
  });

  // Calculate opacity for spinner
  const spinnerOpacity = pullDistance.interpolate({
    inputRange: [0, threshold * 0.5, threshold],
    outputRange: [0, 0.5, 1],
    extrapolate: 'clamp',
  });

  return {
    panResponder,
    pullDistance,
    isRefreshing,
    spinnerRotation,
    spinnerOpacity,
  };
};
