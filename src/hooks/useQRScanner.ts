import { useState, useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { useCameraPermissions } from 'expo-camera';
import { SCANNER_PULSE_DURATION, SCANNER_PULSE_SCALE } from '../utils/constants';

export const useQRScanner = () => {
  const [showScanner, setShowScanner] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (showScanner) {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: SCANNER_PULSE_SCALE,
            duration: SCANNER_PULSE_DURATION,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: SCANNER_PULSE_DURATION,
            useNativeDriver: true,
          }),
        ])
      );
      pulse.start();
      return () => pulse.stop();
    }
  }, [showScanner, scaleAnim]);

  const openScanner = async () => {
    if (!permission?.granted) {
      const result = await requestPermission();
      if (!result.granted) {
        return;
      }
    }
    setShowScanner(true);
  };

  const closeScanner = () => {
    setShowScanner(false);
  };

  return {
    showScanner,
    openScanner,
    closeScanner,
    scaleAnim,
  };
};
