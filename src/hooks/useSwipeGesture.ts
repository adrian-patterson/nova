import { useRef, useEffect, useState } from 'react';
import { PanResponder, useWindowDimensions, Animated } from 'react-native';
import * as Haptics from 'expo-haptics';
import {
  SWIPE_EDGE_THRESHOLD,
  SWIPE_DISTANCE_THRESHOLD,
  SWIPE_MOVE_THRESHOLD,
} from '../utils/constants';

interface UseSwipeGestureProps {
  canGoBack: boolean;
  canGoForward: boolean;
  onSwipeBack: () => void;
  onSwipeForward: () => void;
}

export const useSwipeGesture = ({
  canGoBack,
  canGoForward,
  onSwipeBack,
  onSwipeForward,
}: UseSwipeGestureProps) => {
  const { width } = useWindowDimensions();
  const startX = useRef(0);
  const canGoBackRef = useRef(canGoBack);
  const canGoForwardRef = useRef(canGoForward);
  const [isGesturing, setIsGesturing] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const swipeDistance = useRef(new Animated.Value(0)).current;

  // Update refs when values change
  useEffect(() => {
    canGoBackRef.current = canGoBack;
    canGoForwardRef.current = canGoForward;
  }, [canGoBack, canGoForward]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt) => {
        startX.current = evt.nativeEvent.pageX;
        // Always capture touch on the edge overlays
        return true;
      },
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        // Capture if moving horizontally more than threshold
        return Math.abs(gestureState.dx) > SWIPE_MOVE_THRESHOLD;
      },
      onPanResponderGrant: (evt) => {
        setIsGesturing(true);
        swipeDistance.setValue(0);

        // Determine swipe direction based on which edge was touched
        // Left edge = back (swipe right)
        // Right edge = forward (swipe left)
        if (evt.nativeEvent.pageX < SWIPE_EDGE_THRESHOLD && canGoBackRef.current) {
          setSwipeDirection('right');
        } else if (evt.nativeEvent.pageX > width - SWIPE_EDGE_THRESHOLD && canGoForwardRef.current) {
          setSwipeDirection('left');
        }
      },
      onPanResponderMove: (evt, gestureState) => {
        // Update overlay size based on absolute swipe distance
        const distance = Math.max(0, Math.abs(gestureState.dx));
        swipeDistance.setValue(distance);
      },
      onPanResponderRelease: (evt, gestureState) => {
        setIsGesturing(false);
        setSwipeDirection(null);
        swipeDistance.setValue(0);

        // Swipe from left edge to go back (swipe right)
        if (startX.current < SWIPE_EDGE_THRESHOLD && gestureState.dx > SWIPE_DISTANCE_THRESHOLD && canGoBackRef.current) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          onSwipeBack();
        }
        // Swipe from right edge to go forward (swipe left)
        else if (startX.current > width - SWIPE_EDGE_THRESHOLD && gestureState.dx < -SWIPE_DISTANCE_THRESHOLD && canGoForwardRef.current) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          onSwipeForward();
        }
      },
      onPanResponderTerminate: () => {
        setIsGesturing(false);
        setSwipeDirection(null);
        swipeDistance.setValue(0);
      },
      // CRITICAL: Prevent other responders from taking over
      onPanResponderTerminationRequest: () => false,
    })
  ).current;

  return {
    panResponder,
    isGesturing,
    swipeDirection,
    swipeDistance,
  };
};
