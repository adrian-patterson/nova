# Nova - Minimalist Browser App

## Project Overview
Nova is an extremely minimalist React Native mobile app designed to help maintain digital minimalism while providing emergency web access. The app serves users who have removed browsers from their phones to prevent mindless scrolling but occasionally need to access links.

## Core Problem
- Users want to keep phones minimalist by removing browsers
- Occasionally need to access links sent by others or for emergencies
- Don't want saved logins/cache that could enable social media usage

## Solution
A single-purpose app with only:
- Text input field for URLs
- "Go" button to open links
- In-app WebView (not external browser)
- No persistent cache or saved data
- No browsing history

## Technical Requirements

### Platform & Framework
- React Native with Expo EAS
- iOS deployment via Apple Developer Account
- Target: iOS (iPhone)

### Core Features
1. **Minimalist UI**
   - Single text input field
   - "Go" button below input
   - Follows system theme (light/dark)
   - Extremely simple design

2. **URL Handling**
   - No URL validation required
   - Auto-format URLs (add https:// if missing)
   - Pass input directly to WebView

3. **WebView Behavior**
   - In-app browser only (no external Safari launch)
   - Clear cache/cookies on app close
   - No persistent storage
   - No browsing history

4. **Data Policy**
   - No saved logins
   - No browsing history
   - Clear all data on app exit
   - Prevent proxy usage for social media

### Dependencies
- react-native-webview (for in-app browsing)
- expo (development and deployment)

### Commands
- Development: `expo start`
- iOS build: `eas build --platform ios`
- Deploy: `eas submit --platform ios`

## Development Notes
- Keep dependencies minimal
- Prioritize simplicity over features
- Ensure cache clearing works properly
- Test on actual iOS device for WebView behavior