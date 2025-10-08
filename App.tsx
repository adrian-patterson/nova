import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView, initialWindowMetrics } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { HomeScreen } from './src/components/home/HomeScreen';
import { BrowserModal } from './src/components/browser/BrowserModal';
import { QRScannerModal } from './src/components/scanner/QRScannerModal';
import { useQRScanner } from './src/hooks/useQRScanner';
import { useTheme } from './src/hooks/useTheme';

export default function App() {
  const [showWebView, setShowWebView] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');
  const { showScanner, openScanner, closeScanner, scaleAnim } = useQRScanner();
  const { theme, isDark } = useTheme();

  const handleNavigate = (url: string) => {
    setCurrentUrl(url);
    setShowWebView(true);
  };

  const handleCloseWebView = () => {
    setShowWebView(false);
    setCurrentUrl('');
  };

  const handleBarcodeScanned = (data: string) => {
    closeScanner();
    handleNavigate(data);
  };

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <StatusBar style={isDark ? 'light' : 'dark'} />

        <HomeScreen onNavigate={handleNavigate} onQRPress={openScanner} />

        <BrowserModal
          visible={showWebView}
          currentUrl={currentUrl}
          onClose={handleCloseWebView}
        />

        <QRScannerModal
          visible={showScanner}
          scaleAnim={scaleAnim}
          onClose={closeScanner}
          onBarcodeScanned={handleBarcodeScanned}
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
