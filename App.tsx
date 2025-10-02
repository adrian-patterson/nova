import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Text, 
  useColorScheme,
  SafeAreaView,
  Keyboard
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';

export default function App() {
  const [url, setUrl] = useState('');
  const colorScheme = useColorScheme();
  
  const isDark = colorScheme === 'dark';

  const formatUrl = (input: string): string => {
    if (!input.trim()) return '';
    
    const trimmed = input.trim();
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
      return trimmed;
    }
    return `https://${trimmed}`;
  };

  const handleGo = async () => {
    if (url.trim()) {
      Keyboard.dismiss();
      const formattedUrl = formatUrl(url);
      await WebBrowser.openBrowserAsync(formattedUrl, {
        presentationStyle: WebBrowser.WebBrowserPresentationStyle.FULL_SCREEN,
        controlsColor: isDark ? '#ffffff' : '#000000',
        toolbarColor: isDark ? '#000000' : '#ffffff',
      });
      // Clear URL after browser closes
      setUrl('');
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#000000' : '#ffffff',
      justifyContent: 'center',
      paddingHorizontal: 20,
    },
    inputContainer: {
      alignItems: 'center',
    },
    textInput: {
      width: '100%',
      height: 50,
      borderWidth: 1,
      borderColor: isDark ? '#333333' : '#cccccc',
      borderRadius: 8,
      paddingHorizontal: 16,
      fontSize: 16,
      backgroundColor: isDark ? '#111111' : '#ffffff',
      color: isDark ? '#ffffff' : '#000000',
      marginBottom: 20,
    },
    goButton: {
      width: '100%',
      backgroundColor: isDark ? '#ffffff' : '#000000',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 8,
      alignItems: 'center',
    },
    goButtonText: {
      color: isDark ? '#000000' : '#ffffff',
      fontSize: 16,
      fontWeight: '600',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter URL"
          placeholderTextColor={isDark ? '#666666' : '#999999'}
          value={url}
          onChangeText={setUrl}
          onSubmitEditing={handleGo}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="url"
          returnKeyType="go"
        />
        <TouchableOpacity style={styles.goButton} onPress={handleGo}>
          <Text style={styles.goButtonText}>Go</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
