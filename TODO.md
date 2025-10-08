# TODO: Make Nova Eligible as Default Browser

## Goal
Enable Nova to be set as the default browser on iOS devices, allowing users to open all HTTP/HTTPS links directly in Nova instead of Safari.

## Requirements (from Apple Developer Docs)
- App must specify HTTP and HTTPS schemes in Info.plist
- Cannot use UIWebView (must use WKWebView)
- Must provide URL text field on launch ✅
- Must navigate directly to specified URLs ✅
- Need `com.apple.developer.web-browser` managed entitlement

## Implementation Tasks

### 1. Install react-native-webview dependency ✅
- [x] Add react-native-webview to package.json
- [x] Run installation

### 2. Replace expo-web-browser with WebView component ✅
- [x] Remove expo-web-browser import
- [x] Add react-native-webview import
- [x] Replace WebBrowser.openBrowserAsync with WebView component
- [x] Implement proper navigation and state management
- [x] Maintain cache clearing on app close
- [x] Add navigation toolbar (back, forward, share)
- [x] Add header with refresh and done button
- [x] Fix safe area insets for iPhone notch/home indicator

### 3. Add URL scheme configuration to app.json ✅
- [x] Add HTTP scheme handler
- [x] Add HTTPS scheme handler
- [x] Configure Info.plist settings

### 4. Test in-app browsing functionality ✅
- [x] Test URL navigation
- [x] Test cache clearing
- [x] Test keyboard behavior with WebView
- [x] Test dark/light mode

### 5. Release new version to App Store
- [ ] Build with EAS: `eas build --platform ios`
- [ ] Submit to App Store: `eas submit --platform ios`
- [ ] Wait for App Store approval (~1-2 days)

### 6. Submit entitlement request to Apple
- [ ] Fill out Default browser entitlement request form (after release)
- [ ] Point Apple to live App Store version
- [ ] Wait for approval (1-2 weeks)

### 7. Add entitlement after approval
- [ ] Add `com.apple.developer.web-browser` to entitlements file
- [ ] Build and release update with entitlement

## Notes
- This also aligns with the original CLAUDE.md goal of in-app browsing (not external Safari)
- Must avoid restricted privacy keys in Info.plist
- Can check default status with `UIApplication.isDefault(.webBrowser)`
