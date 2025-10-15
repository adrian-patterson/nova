import React, { useState, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView, initialWindowMetrics } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { HomeScreen } from './src/components/home/HomeScreen';
import { BrowserModal } from './src/components/browser/BrowserModal';
import { useDeepLinking } from './src/hooks/useDeepLinking';
import { useTheme } from './src/hooks/useTheme';

export default function App() {
  const [showWebView, setShowWebView] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');
  const { theme, isDark } = useTheme();

  const handleNavigate = useCallback((url: string) => {
    setCurrentUrl(url);
    setShowWebView(true);
  }, []);

  // Handle deep links from other apps (Messages, Mail, etc.)
  useDeepLinking({ onOpenURL: handleNavigate });

  const handleCloseWebView = () => {
    setShowWebView(false);
    setCurrentUrl('');
  };

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <StatusBar style={isDark ? 'light' : 'dark'} />

        <HomeScreen onNavigate={handleNavigate} />

        <BrowserModal
          visible={showWebView}
          currentUrl={currentUrl}
          onClose={handleCloseWebView}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
