import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../../hooks/useTheme';
import { headerStyles } from '../../styles/headerStyles';

interface HomeHeaderProps {
  onOpenSettings: () => void;
}

export const HomeHeader: React.FC<HomeHeaderProps> = ({ onOpenSettings }) => {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onOpenSettings();
  };

  return (
    <View style={[styles.container, { top: insets.top }]}>
      <View style={headerStyles.header}>
        <View style={styles.spacer} />
        <TouchableOpacity style={headerStyles.button} onPress={handlePress}>
          <Ionicons name="settings-outline" size={24} color={theme.colors.text} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingVertical: 4,
  },
  spacer: {
    width: 40,
  },
});
