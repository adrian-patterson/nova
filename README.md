# Nova Browser

<div align="center">
  <p>A minimalist mobile browser designed for digital minimalism</p>
  <p>
    <a href="#features">Features</a> •
    <a href="#getting-started">Getting Started</a> •
    <a href="#architecture">Architecture</a> •
    <a href="#contributing">Contributing</a> •
    <a href="#license">License</a>
  </p>
</div>

---

## Overview

Nova is a minimalist React Native browser app **for iOS**, designed for users who want to maintain digital minimalism while having emergency web access. Perfect for those who have removed traditional browsers to prevent mindless scrolling but occasionally need to access links.

**Platform Support:**
- ✅ **iOS**: Full support (iPhone)
- 🚧 **Android**: Planned for future release

### The Problem

- Users want minimalist phones without browsers
- Occasionally need to access links from messages/emails
- Don't want saved logins or cache that enable social media addiction
- Need a simple, purpose-built solution

### The Solution

A single-purpose browser with:
- ✅ Simple URL/search input
- ✅ In-app browsing (WKWebView)
- ✅ No persistent data or history
- ✅ No saved logins
- ✅ QR code scanner
- ✅ Swipe navigation
- ✅ Working toward iOS default browser capability

## Features

### 🔍 Smart Input
- URL input with auto-formatting (adds `https://` if needed)
- Integrated DuckDuckGo search (privacy-focused)
- QR code scanner for quick link access

### 🌐 Full-Featured Browsing
- In-app WebView with WKWebView (iOS requirement)
- Back/forward navigation (buttons + swipe gestures)
- Page refresh
- Share functionality
- Safari-style loading indicator

### 🎨 Modern UI
- Dark/light mode support
- Safe area insets (notch/home indicator)
- Keyboard-aware layout
- Minimalist design

### 🔒 Privacy First
- Incognito mode (no cache)
- No cookies saved
- No browsing history
- No persistent storage
- Clear data on close

## Getting Started

### Prerequisites

- **Bun** (recommended) or **Node.js** 18+
- **Expo CLI**
- **EAS CLI** (`bun add -g eas-cli`)
- **iOS Development**: Xcode 14+ (for iOS builds)
- **Apple Developer Account** (for App Store deployment)

**Note:** Nova currently supports **iOS only**. Android support is planned for future releases.

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/nova.git
cd nova

# Install dependencies
bun install
```

### Development

```bash
# Start Expo development server
bun start

# Run on iOS simulator
bun run ios

# Run on iOS device (requires Expo Go app)
bun start
# Scan QR code with Camera app
```

## Architecture

Nova follows a modular, component-based architecture for maintainability and scalability.

### Project Structure

```
nova/
├── src/
│   ├── components/
│   │   ├── browser/       # Browser UI components
│   │   ├── home/          # Home screen components
│   │   ├── scanner/       # QR scanner components
│   │   └── shared/        # Reusable components
│   ├── hooks/             # Custom React hooks
│   ├── styles/            # Theme system
│   ├── types/             # TypeScript types
│   └── utils/             # Helper functions
├── App.tsx                # Root component (60 lines!)
└── app.json              # Expo configuration
```

### Key Technologies

- **React Native** - Cross-platform mobile framework
- **Expo** - Development and build tooling
- **TypeScript** - Type safety
- **react-native-webview** - WKWebView integration
- **expo-camera** - QR code scanning
- **react-native-safe-area-context** - Safe area handling

### Code Organization

- **Components**: Atomic design pattern (atoms → molecules → organisms)
- **Hooks**: Separate business logic from UI
- **Styles**: Theme-based styling system
- **Utils**: Pure functions for helpers

See [CONTRIBUTING.md](CONTRIBUTING.md) for development guidelines.

## Default Browser Support

Nova is working toward becoming an eligible default browser for iOS:

✅ **Completed:**
- WKWebView implementation
- URL input on launch
- HTTP/HTTPS URL scheme handling
- Direct navigation (no redirects)
- Privacy-focused (no tracking)

🚧 **In Progress:**
- App Store release with WKWebView
- Apple entitlement request

See [TODO.md](TODO.md) for detailed progress.

## Dependencies

### Core
- `react-native` - Mobile framework
- `expo` - Build & development platform
- `react-native-webview` - WebView component

### UI
- `react-native-safe-area-context` - Safe area handling
- `expo-status-bar` - Status bar control
- `@expo/vector-icons` - Icon library

### Features
- `expo-camera` - QR code scanning
- `expo-web-browser` - (legacy, being removed)

## Privacy & Security

- **No Data Collection**: No analytics or tracking
- **Incognito Mode**: All browsing is private
- **No Persistence**: Cache cleared on close
- **No Cookies**: Third-party cookies disabled
- **DuckDuckGo Search**: Privacy-focused search engine

## Development

### Commands

```bash
# Development
bun start              # Start Expo dev server
bun run ios           # Run on iOS simulator

# Production
bun run build         # Alias for eas build
bun run deploy        # Alias for eas submit
```

### Code Quality

```bash
# Linting (coming soon)
bun run lint

# Type checking
bun tsc --noEmit

# Testing (coming soon)
bun test
```

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for:
- Code of conduct
- Development setup
- Pull request process
- Coding standards

## Roadmap

- [x] Core browser functionality
- [x] QR code scanner
- [x] Swipe navigation
- [x] Loading indicators
- [x] Refactored architecture
- [ ] App Store release
- [ ] Default browser entitlement
- [ ] Unit tests
- [ ] CI/CD pipeline
- [ ] Android support (future)

## License

MIT License - see [LICENSE](LICENSE) for details

## Acknowledgments

- Built with [Expo](https://expo.dev)
- Icons by [Ionicons](https://ionic.io/ionicons)
- Search powered by [DuckDuckGo](https://duckduckgo.com)

---

<div align="center">
  <p>Made with ☕ for digital minimalism</p>
  <p>
    <a href="https://github.com/yourusername/nova/issues">Report Bug</a> •
    <a href="https://github.com/yourusername/nova/issues">Request Feature</a>
  </p>
</div>
