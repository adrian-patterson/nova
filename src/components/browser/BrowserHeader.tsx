import React from 'react';
import { View, Text, TouchableOpacity, PanResponderInstance } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { headerStyles } from '../../styles/headerStyles';

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
    <View style={[headerStyles.container, { paddingTop: insets.top }]}>
      <View style={[headerStyles.gestureArea, { borderBottomColor: theme.colors.border }]}>
        {/* Gesture capture layer - sits behind buttons */}
        <View
          style={headerStyles.gestureLayer}
          {...(panResponder?.panHandlers || {})}
        />
        {/* Interactive buttons layer - sits on top */}
        <View style={headerStyles.header} pointerEvents="box-none">
          <TouchableOpacity style={headerStyles.button} onPress={isLoading ? onStop : onReload}>
            <Ionicons
              name={isLoading ? "close-circle-outline" : "reload"}
              size={24}
              color={theme.colors.text}
            />
          </TouchableOpacity>
          <TouchableOpacity style={headerStyles.button} onPress={onClose}>
            <Text style={[headerStyles.buttonText, { color: theme.colors.text }]}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
