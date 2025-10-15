import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

interface UrlInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
}

export const UrlInput: React.FC<UrlInputProps> = ({
  value,
  onChangeText,
  onSubmit,
}) => {
  const { theme } = useTheme();

  return (
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
  );
};

const styles = StyleSheet.create({
  input: {
    width: '90%',
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 20,
  },
});
