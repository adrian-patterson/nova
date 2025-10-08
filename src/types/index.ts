import { WebView } from 'react-native-webview';

export type WebViewRef = WebView | null;

export interface NavigationState {
  canGoBack: boolean;
  canGoForward: boolean;
  loading: boolean;
  url: string;
}
