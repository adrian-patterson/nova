import { StyleSheet } from 'react-native';

/**
 * Shared header styles used across BrowserHeader, SettingsHeader, and HomeHeader
 * Ensures consistent spacing and layout throughout the app
 */
export const headerStyles = StyleSheet.create({
  container: {
    width: '100%',
  },
  gestureArea: {
    paddingVertical: 4,
    borderBottomWidth: 1,
    position: 'relative',
  },
  gestureLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    zIndex: 2,
  },
  button: {
    padding: 8,
  },
  buttonText: {
    fontSize: 16,
  },
});

/**
 * Constants for header spacing
 */
export const HEADER_VERTICAL_PADDING = 4;
export const HEADER_HORIZONTAL_PADDING = 16;
export const HEADER_BUTTON_PADDING = 8;
