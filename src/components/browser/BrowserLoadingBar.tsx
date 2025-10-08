import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { LOADING_BAR_COLOR } from '../../utils/constants';

interface BrowserLoadingBarProps {
  visible: boolean;
  progress: number;
}

export const BrowserLoadingBar: React.FC<BrowserLoadingBarProps> = ({
  visible,
  progress,
}) => {
  const animatedProgress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Reset immediately to 0 when progress is 0, otherwise animate smoothly
    if (progress === 0) {
      animatedProgress.setValue(0);
    } else {
      Animated.timing(animatedProgress, {
        toValue: progress,
        duration: 400,
        useNativeDriver: false,
      }).start();
    }
  }, [progress, animatedProgress]);

  if (!visible) return null;

  const widthInterpolated = animatedProgress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <Animated.View
      style={[
        styles.loadingBar,
        { width: widthInterpolated },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  loadingBar: {
    height: 2,
    backgroundColor: LOADING_BAR_COLOR,
  },
});
