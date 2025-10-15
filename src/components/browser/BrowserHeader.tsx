import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, PanResponderInstance } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';

interface BrowserHeaderProps {
  isLoading: boolean;
  onReload: () => void;
  onStop: () => void;
  onClose: () => void;
  panResponder?: PanResponderInstance;
}

export const BrowserHeader: React.FC<BrowserHeaderProps> = ({
  isLoading,
  onReload,
  onStop,
  onClose,
  panResponder,
}) => {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View
        style={[styles.gestureArea, { borderBottomColor: theme.colors.border }]}
        {...(panResponder?.panHandlers || {})}
      >
        {/* Invisible gesture capture area */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.button} onPress={isLoading ? onStop : onReload}>
            <Ionicons
              name={isLoading ? "close-circle-outline" : "reload"}
              size={24}
              color={theme.colors.text}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={[styles.doneText, { color: theme.colors.text }]}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  gestureArea: {
    paddingVertical: 4,
    borderBottomWidth: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  button: {
    padding: 8,
    zIndex: 10,
  },
  doneText: {
    fontSize: 16,
  },
});
