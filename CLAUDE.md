# Nova - Minimalist Browser App

## Project Overview
Nova is a minimalist React Native mobile browser app designed to help maintain digital minimalism while providing emergency web access. The app serves users who have removed browsers from their phones to prevent mindless scrolling but occasionally need to access links.

## Core Problem
- Users want to keep phones minimalist by removing browsers
- Occasionally need to access links sent by others or for emergencies
- Don't want saved logins/cache that could enable social media usage
- Need a simple, purpose-built solution without bloat

## Solution
A single-purpose browser app with:
- Text input field for URLs and search
- "Go" button to navigate
- In-app WebView using WKWebView (iOS requirement)
- No persistent cache or saved data
- No browsing history
- Full browser navigation (back/forward/refresh/share)
- Swipe gestures for navigation
- Safari-style loading indicators
- Support for landscape mode
- Inline video playback (no auto-fullscreen)

## Technical Requirements

### Platform & Framework
- **React Native** with **Expo EAS**
- **iOS deployment** via Apple Developer Account
- **Target**: iOS (iPhone) - working toward **default browser status**
- **TypeScript** for type safety

### Core Features

#### 1. Home Screen
- **URL/Search Input**
  - Single text field with placeholder "Enter URL or search"
  - Auto-detect URL vs search query
  - Auto-format URLs (add `https://` if missing)
  - Search via DuckDuckGo if not a URL
  - Keyboard-aware layout (adjusts for orientation)

- **Theme Support**
  - Follows system theme (light/dark mode)
  - Consistent theming across all components

#### 2. Browser Modal
- **WebView Implementation**
  - Uses `react-native-webview` (WKWebView on iOS)
  - Incognito mode (no cache)
  - No cookies saved
  - No browsing history
  - Third-party cookies disabled
  - Inline media playback (videos don't auto-fullscreen)
  - Supports portrait and landscape orientations

- **Header**
  - Reload button
  - Done button (closes browser)
  - Pull-to-dismiss gesture (swipe down to close modal)
  - Minimal padding for space efficiency

- **Footer/Toolbar**
  - Back button (disabled when no history)
  - Forward button (disabled when no forward history)
  - Share button (native share sheet)
  - Safari-style loading bar (animated progress indicator)
  - Minimal padding for space efficiency

- **Navigation**
  - **Button Navigation**: Tap back/forward buttons
  - **Swipe Navigation**: Swipe from left/right edges
  - **Loading States**: Buttons disabled while loading
  - **Gesture Detection**: 50px from screen edges
  - **Swipe Distance**: 80px minimum to trigger

- **Loading Indicator**
  - Thin blue bar (2px) at top of toolbar
  - Animates from center outward to 90% during load
  - Completes to 100% when done
  - Brief hold, then fades out
  - Uses native driver for performance

#### 3. Data & Privacy
- **No Persistent Storage**
  - Incognito mode enabled
  - Cache disabled
  - No saved logins
  - No browsing history
  - Third-party cookies disabled

- **Privacy-Focused**
  - DuckDuckGo search (not Google)
  - No tracking or analytics
  - Clear all data on app close

### Architecture

#### Project Structure
```
nova/
├── src/
│   ├── components/
│   │   ├── browser/           # Browser-related components
│   │   │   ├── BrowserModal.tsx
│   │   │   ├── BrowserHeader.tsx
│   │   │   ├── BrowserToolbar.tsx
│   │   │   ├── BrowserLoadingBar.tsx
│   │   │   └── SwipeableWebView.tsx
│   │   ├── home/              # Home screen components
│   │   │   ├── HomeScreen.tsx
│   │   │   ├── UrlInput.tsx
│   │   │   └── GoButton.tsx
│   │   └── shared/            # Reusable components
│   │       └── IconButton.tsx
│   ├── hooks/                 # Custom React hooks
│   │   ├── useBrowserLoading.ts
│   │   ├── usePullToDismiss.ts
│   │   ├── useSwipeGesture.ts
│   │   └── useTheme.ts
│   ├── styles/                # Theme system
│   │   └── theme.ts
│   ├── types/                 # TypeScript types
│   │   └── index.ts
│   └── utils/                 # Helper functions
│       ├── constants.ts
│       └── urlHelpers.ts
├── App.tsx                    # Root component (~60 lines)
├── app.json                   # Expo configuration
├── CLAUDE.md                  # This file
├── README.md                  # Public documentation
├── CONTRIBUTING.md            # Contribution guidelines
└── TODO.md                    # Default browser roadmap
```

#### Design Patterns

**Component Organization**:
- **Atomic Design**: Atoms → Molecules → Organisms
- **Single Responsibility**: Each component has one clear purpose
- **~50-100 lines**: Components kept small and focused
- **Proper TypeScript**: No `any` types, clean interfaces

**State Management**:
- **Hooks**: Custom hooks for business logic
- **Local State**: React useState for UI state
- **Refs**: For WebView, animations, and gesture handlers

**Styling**:
- **Theme System**: Centralized colors and spacing
- **StyleSheet.create()**: Performance-optimized styles
- **Dynamic Theming**: Light/dark mode support
- **Safe Areas**: Proper handling of iPhone notch/home indicator

### Dependencies

**Core**:
- `react-native` - Mobile framework
- `expo` - Build and deployment platform
- `react-native-webview` - WKWebView integration (iOS requirement)

**UI**:
- `react-native-safe-area-context` - Safe area handling
- `expo-status-bar` - Status bar styling
- `@expo/vector-icons` - Icon library (Ionicons)

**Features**:
- `expo-haptics` - Haptic feedback for navigation
- `expo-web-browser` - (legacy, being removed)

**Dev**:
- `typescript` - Type safety
- `@types/react` - React type definitions
- `@types/react-native` - React Native types
- `eslint` - Code linting
- `@typescript-eslint/eslint-plugin` - TypeScript ESLint rules
- `@typescript-eslint/parser` - TypeScript parser for ESLint
- `eslint-plugin-react` - React-specific linting rules
- `eslint-plugin-react-hooks` - React Hooks linting rules
- `eslint-plugin-react-native` - React Native-specific linting rules

**Testing**:
- `jest-expo` - Jest testing framework for Expo
- `@testing-library/react-native` - React Native testing utilities
- `@testing-library/jest-native` - Jest matchers for React Native
- `@testing-library/react-hooks` - Hook testing utilities

### Commands

```bash
# Development
bun start              # Start Expo dev server
bun run ios            # Run on iOS simulator
bun run android        # Run on Android emulator

# Production
eas build --platform ios         # Build for iOS
eas submit --platform ios        # Submit to App Store

# Quality checks
bun run tsc --noEmit   # Type checking
bun run lint           # Run ESLint
bun run lint:fix       # Auto-fix ESLint issues
bun audit              # Security vulnerability scan

# Testing
bun test               # Run tests
bun run test:watch     # Run tests in watch mode
bun run test:coverage  # Run tests with coverage
```

## Default Browser Requirements

Nova is working toward becoming an eligible iOS default browser:

### Apple Requirements
1. ✅ **WKWebView**: Must use WKWebView (not UIWebView or external Safari)
2. ✅ **URL Input**: Must provide text field for URL entry on launch
3. ✅ **URL Schemes**: Must handle HTTP and HTTPS schemes in Info.plist
4. ✅ **Direct Navigation**: Must navigate directly to URLs (no redirects)
5. ✅ **Privacy**: No unnecessary data access (location, photos, etc.)
6. 🚧 **Entitlement**: Need `com.apple.developer.web-browser` managed entitlement

### Implementation Status
- ✅ Replaced `expo-web-browser` with `react-native-webview`
- ✅ Added HTTP/HTTPS schemes to `app.json`
- ✅ Implemented URL input on launch
- ✅ Direct navigation (no redirects)
- ✅ Privacy-focused (incognito mode, no tracking)
- 🚧 Pending: App Store release
- 🚧 Pending: Apple entitlement request

See [TODO.md](TODO.md) for detailed roadmap.

## Development Notes

### Best Practices

#### React Native Core Principles
- **Keep it simple**: Prioritize minimalism over features
- **Type safety**: Use TypeScript properly (no `any`)
- **Component size**: Keep files under 100 lines
- **Single responsibility**: One purpose per component/hook
- **Theme consistency**: Use theme system for all colors
- **Safe areas**: Always handle iPhone notch/home indicator

#### TypeScript Standards (2025)
- **Strict mode enabled**: Always use TypeScript strict mode in `tsconfig.json`
- **No `any` types**: Define explicit types for all variables, props, and return values
- **PascalCase for components**: Use PascalCase for React components
- **CONSTANT_CASE for globals**: Use CONSTANT_CASE for global constants and enums
- **Path aliases**: Use `tsconfig.json` path aliases for cleaner imports
- **Type inference**: Leverage TypeScript's type inference in hooks like `useState`

#### Performance Optimization
- **Native driver animations**: Always use `useNativeDriver: true` for animations
- **React.memo() for expensive renders**: Wrap components that render frequently with React.memo()
- **useMemo for calculations**: Use `useMemo` to cache expensive computations
- **useCallback for handlers**: Use `useCallback` for event handlers passed as props
- **FlatList optimization**: Implement `getItemLayout` for long lists, consider FlashList for better performance
- **Minimize setState calls**: Batch state updates to reduce re-renders
- **Image optimization**: Use appropriate image sizes and formats
- **StyleSheet.create()**: Always use StyleSheet.create() for style objects (performance + type safety)

#### Component Architecture
- **Container/Presentational pattern**: Separate business logic (containers) from UI (presentational components)
- **Custom hooks for logic**: Extract reusable stateful logic into custom hooks
- **Compound components**: Use compound component pattern for related UI elements
- **Props drilling prevention**: Use Context API or custom hooks to avoid excessive prop passing
- **Arrow functions**: Use arrow functions for component definitions and event handlers
- **DRY principle**: Refactor repeated code into reusable components or hooks

#### State Management
- **useState for simple state**: Use `useState` for component-level state
- **useReducer for complex logic**: Use `useReducer` for complex state transitions
- **Context API for shared state**: Use Context for state that needs to be shared across components
- **Refs for non-reactive values**: Use `useRef` for values that don't trigger re-renders (WebView, animations)
- **Avoid prop drilling**: Lift state only as high as needed

#### Code Quality
- **ESLint + Prettier**: Enforce code consistency with ESLint and Prettier
- **Static analysis**: Run TypeScript and ESLint on every commit
- **Testing**: Write tests for utils, hooks, and critical user flows
- **Error boundaries**: Implement error boundaries for graceful error handling
- **Accessibility**: Use accessibility props (accessibilityLabel, accessibilityRole, etc.)

### Common Patterns

**Adding a new component**:
1. Create file in appropriate `src/components/` folder
2. Define TypeScript interface for props
3. Use functional component with hooks
4. Import theme with `useTheme()`
5. Export from component folder's `index.ts`

**Adding a new hook**:
1. Create file in `src/hooks/`
2. Export hook function with clear return type
3. Keep focused on single responsibility
4. Export from `src/hooks/index.ts`

**Adding utilities**:
1. Create pure functions in `src/utils/`
2. Add TypeScript types
3. Export from utility file
4. Add constants to `src/utils/constants.ts`

### Testing Strategy (Future)
- **Unit tests**: Utils and hooks
- **Component tests**: UI components
- **Integration tests**: User flows
- **E2E tests**: Critical paths

### Known Issues & Solutions

**Loading bar freeze**:
- **Problem**: Loading gets stuck at 90% when navigation interrupted
- **Solution**: Reset loading state in `onNavigationStateChange`

**Navigation race condition**:
- **Problem**: Multiple nav actions cause freeze
- **Solution**: Disable buttons while loading, check in handlers

**Safe area in modals**:
- **Problem**: SafeAreaView doesn't work in Modal
- **Solution**: Use `useSafeAreaInsets()` and apply as padding

**Theme not updating in modals**:
- **Problem**: Theme changes don't reflect in Modal components
- **Solution**: Use `Appearance.addChangeListener()` instead of `useColorScheme()` in `useTheme` hook

## Future Enhancements

### High Priority
- [x] Unit tests (basic setup complete)
- [x] CI/CD pipeline (GitHub Actions configured)
- [x] Linting setup (ESLint configured)
- [x] Security scanning (bun audit integrated)

### Medium Priority
- [ ] Bookmarks (minimal, privacy-focused)
- [ ] Download support
- [ ] Reader mode
- [ ] Print support

### Low Priority
- [ ] Android support
- [ ] iPad optimization
- [ ] Accessibility improvements
- [ ] Localization

## Privacy Commitment

Nova is built with privacy as a core principle:
- No analytics or tracking
- No data collection
- No third-party SDKs (except required frameworks)
- DuckDuckGo search (privacy-focused)
- Incognito mode always enabled
- No persistent storage

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for:
- Development setup
- Coding standards
- Pull request process
- Branch naming conventions

## Important Reminders

When working on this project:

1. **Keep it minimal**: Every feature should serve the core purpose
2. **Respect privacy**: No data collection or tracking
3. **Type safety**: Avoid `any` types, use proper interfaces
4. **Component size**: Break large files into smaller pieces
5. **Test thoroughly**: Especially browser functionality
6. **Document changes**: Update relevant docs when making changes

## Contact & Support

- **Issues**: GitHub Issues for bugs and features
- **Discussions**: GitHub Discussions for questions
- **Security**: Report security issues privately

---

**Last Updated**: 2025-10-10
**Current Version**: 1.1.0
**Target**: iOS Default Browser
**Package Manager**: Bun
