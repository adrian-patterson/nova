# Nova Browser

A minimalist mobile browser for iOS designed for digital minimalism.

---

## Overview

Nova is a privacy-focused browser for users who want to maintain digital minimalism while having emergency web access. Perfect for those who have removed traditional browsers to prevent mindless scrolling but occasionally need to access links.

**Platform:** iOS (iPhone) • Android support planned

### The Problem

- Users want minimalist phones without browsers
- Occasionally need to access links from messages/emails
- Don't want saved logins or cache that enable social media addiction
- Need a simple, purpose-built solution

### The Solution

A single-purpose browser with:
- Simple URL/search input
- In-app browsing (WKWebView)
- No persistent data or history
- No saved logins
- Swipe navigation & gestures
- Working toward iOS default browser capability

## Features

### Smart Input
- URL input with auto-formatting
- Integrated DuckDuckGo search (privacy-focused)
- Configurable search engine (DuckDuckGo, Google, Brave, Bing, Yahoo)

### Full-Featured Browsing
- In-app WebView with WKWebView (iOS requirement)
- Back/forward navigation (buttons + swipe gestures)
- Page reload & stop loading
- Pull-to-dismiss modal
- Share functionality
- Safari-style loading indicator

### Modern UI
- Dark/light mode support
- Safe area insets (notch/home indicator)
- Pull-to-dismiss gesture
- Settings modal
- Minimalist design

### Privacy First
- Incognito mode (no cache)
- No cookies saved
- No browsing history
- No persistent storage
- No tracking or analytics

## Getting Started

### Prerequisites

- **Bun** (recommended) or **Node.js** 18+
- **Expo CLI**
- **iOS Development**: Xcode 14+ (for iOS builds)
- **Apple Developer Account** (for App Store deployment)

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
```

### Quality Checks

```bash
# Type checking
bun run tsc --noEmit

# Linting
bun run lint
bun run lint:fix

# Testing
bun test

# Security audit
bun audit
```

## Architecture

Nova follows a modular, component-based architecture:

```
nova/
├── src/
│   ├── components/
│   │   ├── browser/       # Browser UI components
│   │   ├── home/          # Home screen components
│   │   ├── settings/      # Settings modal
│   │   └── shared/        # Reusable components
│   ├── hooks/             # Custom React hooks
│   ├── styles/            # Theme system
│   ├── types/             # TypeScript types
│   └── utils/             # Helper functions
├── App.tsx                # Root component
└── app.json              # Expo configuration
```

### Key Technologies

- **React Native** with **Expo**
- **TypeScript** for type safety
- **react-native-webview** - WKWebView integration
- **ESLint** for code quality
- **Jest** for testing

See [CLAUDE.md](CLAUDE.md) for detailed development guidelines.

## Default Browser Support

Nova is working toward becoming an eligible default browser for iOS:

**Completed:**
- WKWebView implementation
- URL input on launch
- HTTP/HTTPS URL scheme handling
- Direct navigation (no redirects)
- Privacy-focused (no tracking)

**In Progress:**
- App Store release
- Apple entitlement request

See [TODO.md](TODO.md) for detailed roadmap.

## Privacy & Security

- **No Data Collection**: No analytics or tracking
- **Incognito Mode**: All browsing is private
- **No Persistence**: Cache cleared on close
- **No Cookies**: Third-party cookies disabled
- **DuckDuckGo**: Privacy-focused default search

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for:
- Development setup
- Coding standards
- Pull request process

## Roadmap

- [x] Core browser functionality
- [x] Swipe navigation
- [x] Pull-to-dismiss
- [x] Settings modal
- [x] Configurable search engines
- [x] Unit tests
- [x] CI/CD pipeline
- [x] Linting
- [ ] App Store release
- [ ] Default browser entitlement
- [ ] Android support (future)

## License

MIT License - see [LICENSE](LICENSE) for details

---

**Made for digital minimalism**

[Report Bug](https://github.com/yourusername/nova/issues) • [Request Feature](https://github.com/yourusername/nova/issues)
