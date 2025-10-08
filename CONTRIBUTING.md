# Contributing to Nova Browser

Thank you for your interest in contributing to Nova! This document provides guidelines and instructions for contributing.

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all. Please be respectful and constructive in all interactions.

### Expected Behavior

- Be respectful and inclusive
- Welcome newcomers and help them get started
- Focus on what is best for the community
- Show empathy towards other community members

### Unacceptable Behavior

- Harassment, discrimination, or exclusionary behavior
- Trolling, insulting comments, or personal attacks
- Publishing others' private information
- Other conduct inappropriate in a professional setting

## How to Contribute

### Reporting Bugs

Before creating a bug report, please check existing issues to avoid duplicates.

**When filing a bug report, include:**

- **Clear title and description**
- **Steps to reproduce** the behavior
- **Expected behavior**
- **Actual behavior**
- **Screenshots** (if applicable)
- **Environment details**:
  - Device (e.g., iPhone 14 Pro)
  - iOS version
  - App version
  - Expo version

**Example:**

```markdown
**Bug**: Loading bar freezes when navigating back before page load completes

**Steps to Reproduce**:
1. Click a link to navigate to new page
2. Immediately press back button before page loads
3. Navigate forward again
4. Observe loading bar stuck at 90%

**Expected**: Loading bar should complete normally
**Actual**: Loading bar freezes at 90%

**Environment**:
- iPhone 14 Pro, iOS 17.2
- Nova v1.0.1
```

### Suggesting Features

Feature requests are welcome! Please provide:

- **Clear use case**: Why is this feature needed?
- **Proposed solution**: How should it work?
- **Alternatives considered**: Other approaches you've thought about
- **Additional context**: Screenshots, mockups, or examples

### Pull Requests

#### Before You Start

1. **Check existing issues/PRs** to avoid duplicate work
2. **Open an issue** to discuss major changes before implementing
3. **Fork the repository** and create a branch from `main`

#### Development Setup

```bash
# Fork and clone
git clone https://github.com/YOUR_USERNAME/nova.git
cd nova

# Install dependencies
npm install
# or
bun install

# Start development server
npm start

# Run on iOS simulator
npm run ios
```

#### Making Changes

1. **Create a branch**:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/bug-description
   ```

2. **Make your changes**:
   - Follow the [coding standards](#coding-standards)
   - Write clear commit messages
   - Add tests if applicable
   - Update documentation if needed

3. **Test your changes**:
   ```bash
   # Type check
   npx tsc --noEmit

   # Test on device/simulator
   npm run ios

   # Test specific scenarios mentioned in issue
   ```

4. **Commit your changes**:
   ```bash
   git add .
   git commit -m "feat: add swipe gesture for navigation"
   ```

   Follow [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat:` New feature
   - `fix:` Bug fix
   - `docs:` Documentation only
   - `style:` Code style changes (formatting, etc.)
   - `refactor:` Code refactoring
   - `test:` Adding tests
   - `chore:` Maintenance tasks

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request**:
   - Use a clear, descriptive title
   - Reference related issues (e.g., "Fixes #123")
   - Describe your changes in detail
   - Include screenshots/videos for UI changes
   - Check all boxes in the PR template

#### Pull Request Template

```markdown
## Description
Brief description of changes

## Related Issue
Fixes #(issue number)

## Type of Change
- [ ] Bug fix (non-breaking change fixing an issue)
- [ ] New feature (non-breaking change adding functionality)
- [ ] Breaking change (fix or feature causing existing functionality to change)
- [ ] Documentation update

## Testing
Describe how you tested your changes:
- [ ] Tested on iOS simulator
- [ ] Tested on physical device
- [ ] Tested in light mode
- [ ] Tested in dark mode
- [ ] Tested edge cases

## Screenshots
Add screenshots or videos demonstrating the changes

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-reviewed my code
- [ ] Commented code in complex areas
- [ ] Updated documentation
- [ ] Changes generate no new warnings
- [ ] Added tests (if applicable)
```

## Coding Standards

### TypeScript

- Use TypeScript for all new files
- Avoid `any` types - use proper interfaces
- Export types from `src/types/index.ts`

```typescript
// Good ✅
interface BrowserModalProps {
  visible: boolean;
  currentUrl: string;
  onClose: () => void;
}

// Bad ❌
const props: any = { ... };
```

### React/React Native

- Use functional components with hooks
- Keep components small and focused (< 100 lines)
- Extract logic into custom hooks
- Use proper prop types

```typescript
// Good ✅
export const BrowserHeader: React.FC<BrowserHeaderProps> = ({
  onReload,
  onClose,
}) => {
  const { theme } = useTheme();
  // ...
};

// Bad ❌
export default function BrowserHeader(props: any) {
  // 200 lines of code...
}
```

### File Organization

```
src/
├── components/        # UI components
│   ├── browser/      # Feature-specific
│   ├── home/
│   ├── scanner/
│   └── shared/       # Reusable
├── hooks/            # Custom hooks
├── styles/           # Theme & styles
├── types/            # TypeScript types
└── utils/            # Helper functions
```

**Component Structure:**
- One component per file
- Export component and props interface
- Keep styles in StyleSheet at bottom
- Use theme system for colors

**Naming Conventions:**
- Components: PascalCase (`BrowserHeader.tsx`)
- Hooks: camelCase with `use` prefix (`useTheme.ts`)
- Utils: camelCase (`urlHelpers.ts`)
- Constants: UPPER_SNAKE_CASE

### Styling

- Use StyleSheet.create()
- Use theme system for colors
- Avoid inline styles except for dynamic values
- Follow existing patterns

```typescript
// Good ✅
const { theme } = useTheme();

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    padding: 16,
  },
});

// Bad ❌
<View style={{ backgroundColor: '#000', padding: 16 }} />
```

### Hooks

- One hook per file
- Export from `src/hooks/index.ts`
- Follow React hooks rules
- Keep hooks focused (single responsibility)

```typescript
// Good ✅
export const useBrowserLoading = () => {
  const [loading, setLoading] = useState(false);
  // ... loading logic only
  return { loading, setLoading };
};

// Bad ❌
export const useBrowser = () => {
  // 100 lines mixing loading, navigation, state...
};
```

## Project Structure

### Adding New Features

1. **Components**: Add to appropriate folder in `src/components/`
2. **Hooks**: Add to `src/hooks/`
3. **Utils**: Add to `src/utils/`
4. **Types**: Add to `src/types/index.ts`
5. **Export**: Add to index files for clean imports

### Testing Strategy

(Tests coming soon - TBD)

- Unit tests for utils and hooks
- Component tests for UI
- Integration tests for user flows
- E2E tests for critical paths

## Git Workflow

### Branch Naming

- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation
- `refactor/description` - Code refactoring
- `chore/description` - Maintenance

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Examples:**
```
feat(browser): add swipe navigation gestures

Add left/right edge swipe gestures for back/forward navigation.
Uses PanResponder to detect swipes within 50px of screen edges.

Closes #42
```

```
fix(loading): prevent freeze when navigation interrupted

Reset loading state in onNavigationStateChange to handle
cases where onLoadEnd doesn't fire (e.g., navigating away
before load completes).

Fixes #67
```

### Review Process

1. **Automated checks** must pass:
   - TypeScript compilation
   - Linting (when available)
   - Tests (when available)

2. **Maintainer review**:
   - Code quality and style
   - Functionality and logic
   - Tests and documentation

3. **Changes requested**:
   - Address feedback
   - Push new commits
   - Request re-review

4. **Approval**:
   - Maintainer approves
   - Squash and merge to main
   - Delete feature branch

## Questions?

- **Issues**: https://github.com/yourusername/nova/issues
- **Discussions**: https://github.com/yourusername/nova/discussions

## Recognition

Contributors will be recognized in:
- README.md acknowledgments
- Release notes
- GitHub contributors page

Thank you for contributing to Nova! 🚀
