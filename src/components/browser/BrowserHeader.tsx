import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';

interface BrowserHeaderProps {
  isLoading: boolean;
  onReload: () => void;
  onStop: () => void;
  onClose: () => void;
}

export const BrowserHeader: React.FC<BrowserHeaderProps> = ({
  isLoading,
  onReload,
  onStop,
  onClose,
}) => {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.header,
        { paddingTop: insets.top + 4, borderBottomColor: theme.colors.border },
      ]}
    >
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
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderBottomWidth: 1,
  },
  button: {
    padding: 8,
  },
  doneText: {
    fontSize: 16,
  },
});
