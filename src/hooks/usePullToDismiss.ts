import { useRef } from 'react';
import { Animated, PanResponder, Dimensions } from 'react-native';

interface UsePullToDismissProps {
  onDismiss: () => void;
  threshold?: number;
}

export const usePullToDismiss = ({ onDismiss, threshold = 100 }: UsePullToDismissProps) => {
  const translateY = useRef(new Animated.Value(0)).current;
  const isPulling = useRef(false);
  const screenHeight = Dimensions.get('window').height;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => false,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Only respond to downward pulls
        return gestureState.dy > 5 && Math.abs(gestureState.dx) < Math.abs(gestureState.dy);
      },
      onMoveShouldSetPanResponderCapture: (_, gestureState) => {
        // Don't capture unless it's a clear downward swipe
        return gestureState.dy > 10 && Math.abs(gestureState.dx) < Math.abs(gestureState.dy);
      },
      onPanResponderGrant: () => {
        isPulling.current = true;
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          // Only allow downward movement
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        isPulling.current = false;

        if (gestureState.dy > threshold) {
          // Dismiss if pulled past threshold
          // Animate to screen height to ensure it goes fully off-screen
          Animated.timing(translateY, {
            toValue: screenHeight,
            duration: 250,
            useNativeDriver: true,
          }).start(({ finished }) => {
            if (finished) {
              // Wait a frame to ensure animation completes visually
              requestAnimationFrame(() => {
                onDismiss();
                // Reset after dismissing to avoid visible jump on next open
                setTimeout(() => translateY.setValue(0), 50);
              });
            }
          });
        } else {
          // Spring back to original position
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
            tension: 50,
            friction: 8,
          }).start();
        }
      },
    })
  ).current;

  return {
    panResponder,
    translateY,
  };
};
