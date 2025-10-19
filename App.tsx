import React, { useState, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import { StyleSheet, View } from 'react-native';
import { HomeScreen } from './src/components/home/HomeScreen';
import { BrowserModal } from './src/components/browser/BrowserModal';
import { SettingsModal } from './src/components/settings/SettingsModal';
import { useDeepLinking } from './src/hooks/useDeepLinking';
import { useTheme } from './src/hooks/useTheme';
import { useSearchEngine } from './src/hooks/useSearchEngine';

export default function App() {
  const [showWebView, setShowWebView] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');
  const { theme, isDark } = useTheme();
  const { searchEngine, setSearchEngine } = useSearchEngine();

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

  const handleOpenSettings = () => {
    setShowSettings(true);
  };

  const handleCloseSettings = () => {
    setShowSettings(false);
  };

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <StatusBar style={isDark ? 'light' : 'dark'} />

        <HomeScreen
          onNavigate={handleNavigate}
          onOpenSettings={handleOpenSettings}
          searchEngine={searchEngine}
        />

        <BrowserModal
          visible={showWebView}
          currentUrl={currentUrl}
          onClose={handleCloseWebView}
        />

        <SettingsModal
          visible={showSettings}
          onClose={handleCloseSettings}
          currentEngine={searchEngine}
          onEngineSelect={setSearchEngine}
        />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
