import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';

interface UrlInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
  onQRPress: () => void;
}

export const UrlInput: React.FC<UrlInputProps> = ({
  value,
  onChangeText,
  onSubmit,
  onQRPress,
}) => {
  const { theme } = useTheme();

  return (
    <View style={styles.wrapper}>
      <TextInput
        style={[
          styles.input,
          {
            borderColor: theme.colors.border,
            backgroundColor: theme.colors.surface,
            color: theme.colors.text,
          },
        ]}
        placeholder="Enter URL or search"
        placeholderTextColor={theme.colors.textSecondary}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="web-search"
        returnKeyType="go"
      />
      <TouchableOpacity style={styles.qrButton} onPress={onQRPress}>
        <Ionicons name="qr-code-outline" size={24} color={theme.colors.text} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    width: '90%',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingRight: 50,
    fontSize: 16,
  },
  qrButton: {
    position: 'absolute',
    right: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
});
