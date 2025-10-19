import { WebView } from 'react-native-webview';

export type WebViewRef = WebView | null;

export interface NavigationState {
  canGoBack: boolean;
  canGoForward: boolean;
  loading: boolean;
  url: string;
}

export type SearchEngineId = 'brave' | 'duckduckgo' | 'google' | 'ecosia';

export interface SearchEngine {
  id: SearchEngineId;
  name: string;
  searchUrl: (query: string) => string;
  icon: string; // Ionicons name
  color: string; // Brand color
}
