import { useRef } from 'react';
import { Animated, PanResponder } from 'react-native';

interface UsePullToDismissProps {
  onDismiss: () => void;
  threshold?: number;
}

export const usePullToDismiss = ({ onDismiss, threshold = 100 }: UsePullToDismissProps) => {
  const translateY = useRef(new Animated.Value(0)).current;
  const isPulling = useRef(false);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => false,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Only respond to downward pulls
        return gestureState.dy > 5 && Math.abs(gestureState.dx) < Math.abs(gestureState.dy);
      },
      onMoveShouldSetPanResponderCapture: (_, gestureState) => {
        // Capture the gesture if it's clearly a downward swipe
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
          Animated.timing(translateY, {
            toValue: 500,
            duration: 200,
            useNativeDriver: true,
          }).start(() => {
            translateY.setValue(0);
            onDismiss();
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
