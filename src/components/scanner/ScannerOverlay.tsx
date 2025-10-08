import React from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { SCANNER_CORNER_COLOR } from '../../utils/constants';

interface ScannerOverlayProps {
  scaleAnim: Animated.Value;
}

export const ScannerOverlay: React.FC<ScannerOverlayProps> = ({ scaleAnim }) => {
  return (
    <View style={styles.overlay} pointerEvents="none">
      <View style={styles.frame}>
        <Animated.View
          style={[
            styles.corner,
            styles.cornerTopLeft,
            { transform: [{ scale: scaleAnim }] },
          ]}
        />
        <Animated.View
          style={[
            styles.corner,
            styles.cornerTopRight,
            { transform: [{ scale: scaleAnim }] },
          ]}
        />
        <Animated.View
          style={[
            styles.corner,
            styles.cornerBottomLeft,
            { transform: [{ scale: scaleAnim }] },
          ]}
        />
        <Animated.View
          style={[
            styles.corner,
            styles.cornerBottomRight,
            { transform: [{ scale: scaleAnim }] },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  frame: {
    width: 250,
    height: 250,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: SCANNER_CORNER_COLOR,
  },
  cornerTopLeft: {
    top: -2,
    left: -2,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopLeftRadius: 12,
  },
  cornerTopRight: {
    top: -2,
    right: -2,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderTopRightRadius: 12,
  },
  cornerBottomLeft: {
    bottom: -2,
    left: -2,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderBottomLeftRadius: 12,
  },
  cornerBottomRight: {
    bottom: -2,
    right: -2,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomRightRadius: 12,
  },
});
