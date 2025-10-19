import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, PanResponderInstance } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';
import { headerStyles } from '../../styles/headerStyles';

interface SettingsHeaderProps {
  onClose: () => void;
  panResponder?: PanResponderInstance;
}

export const SettingsHeader: React.FC<SettingsHeaderProps> = ({ onClose, panResponder }) => {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();

  return (
    <View style={[headerStyles.container, { paddingTop: insets.top }]}>
      <View
        style={[headerStyles.gestureArea, { borderBottomColor: theme.colors.border }]}
        {...(panResponder?.panHandlers || {})}
      >
        <View style={headerStyles.header}>
          <View style={styles.leftSpacer} />
          <Text style={[styles.title, { color: theme.colors.text }]}>Settings</Text>
          <TouchableOpacity style={headerStyles.button} onPress={onClose}>
            <Text style={[headerStyles.buttonText, { color: theme.colors.text }]}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  leftSpacer: {
    width: 40,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
});
