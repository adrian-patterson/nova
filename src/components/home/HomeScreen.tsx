import React, { useState } from 'react';
import { View, StyleSheet, Keyboard, KeyboardAvoidingView, Platform, useWindowDimensions } from 'react-native';
import { UrlInput } from './UrlInput';
import { GoButton } from './GoButton';
import { HomeHeader } from './HomeHeader';
import { formatUrl } from '../../utils/urlHelpers';
import { KEYBOARD_OFFSET_PORTRAIT, KEYBOARD_OFFSET_LANDSCAPE } from '../../utils/constants';
import { useTheme } from '../../hooks/useTheme';
import { SearchEngineId } from '../../types';

interface HomeScreenProps {
  onNavigate: (url: string) => void;
  onOpenSettings: () => void;
  searchEngine: SearchEngineId;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
  onOpenSettings,
  searchEngine,
}) => {
  const [url, setUrl] = useState('');
  const { theme } = useTheme();
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const keyboardOffset = isLandscape ? KEYBOARD_OFFSET_LANDSCAPE : KEYBOARD_OFFSET_PORTRAIT;

  const handleGo = () => {
    if (url.trim()) {
      Keyboard.dismiss();
      const formattedUrl = formatUrl(url, searchEngine);
      onNavigate(formattedUrl);
      setUrl('');
    }
  };

  return (
    <View style={styles.wrapper}>
      <HomeHeader onOpenSettings={onOpenSettings} />
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
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
  },
});
