import React, { useState } from 'react';
import { View, StyleSheet, Keyboard, KeyboardAvoidingView, Platform, useWindowDimensions } from 'react-native';
import { UrlInput } from './UrlInput';
import { GoButton } from './GoButton';
import { formatUrl } from '../../utils/urlHelpers';
import { KEYBOARD_OFFSET_PORTRAIT, KEYBOARD_OFFSET_LANDSCAPE } from '../../utils/constants';
import { useTheme } from '../../hooks/useTheme';

interface HomeScreenProps {
  onNavigate: (url: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
}) => {
  const [url, setUrl] = useState('');
  const { theme } = useTheme();
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const keyboardOffset = isLandscape ? KEYBOARD_OFFSET_LANDSCAPE : KEYBOARD_OFFSET_PORTRAIT;

  const handleGo = () => {
    if (url.trim()) {
      Keyboard.dismiss();
      const formattedUrl = formatUrl(url);
      onNavigate(formattedUrl);
      setUrl('');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      keyboardVerticalOffset={keyboardOffset}
    >
      <View style={styles.content}>
        <UrlInput
          value={url}
          onChangeText={setUrl}
          onSubmit={handleGo}
        />
        <GoButton onPress={handleGo} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
  },
});
