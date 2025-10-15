import { renderHook } from '@testing-library/react-hooks';
import { Linking } from 'react-native';
import { useDeepLinking } from '../useDeepLinking';

// Mock React Native Linking
jest.mock('react-native', () => ({
  Linking: {
    getInitialURL: jest.fn(),
    addEventListener: jest.fn(),
  },
}));

describe('useDeepLinking', () => {
  const mockOnOpenURL = jest.fn();
  const mockRemove = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (Linking.addEventListener as jest.Mock).mockReturnValue({ remove: mockRemove });
  });

  it('should handle initial URL on mount', async () => {
    const testUrl = 'https://example.com';
    (Linking.getInitialURL as jest.Mock).mockResolvedValue(testUrl);

    renderHook(() => useDeepLinking({ onOpenURL: mockOnOpenURL }));

    // Wait for async getInitialURL to complete
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(Linking.getInitialURL).toHaveBeenCalled();
    expect(mockOnOpenURL).toHaveBeenCalledWith(testUrl);
  });

  it('should not call onOpenURL if no initial URL', async () => {
    (Linking.getInitialURL as jest.Mock).mockResolvedValue(null);

    renderHook(() => useDeepLinking({ onOpenURL: mockOnOpenURL }));

    await new Promise(resolve => setTimeout(resolve, 0));

    expect(Linking.getInitialURL).toHaveBeenCalled();
    expect(mockOnOpenURL).not.toHaveBeenCalled();
  });

  it('should set up URL event listener', () => {
    renderHook(() => useDeepLinking({ onOpenURL: mockOnOpenURL }));

    expect(Linking.addEventListener).toHaveBeenCalledWith('url', expect.any(Function));
  });

  it('should handle URL events from listener', () => {
    let urlEventHandler: ((event: { url: string }) => void) | undefined;

    (Linking.addEventListener as jest.Mock).mockImplementation((event, handler) => {
      urlEventHandler = handler;
      return { remove: mockRemove };
    });

    renderHook(() => useDeepLinking({ onOpenURL: mockOnOpenURL }));

    const testUrl = 'https://example.com/deep-link';
    urlEventHandler?.({ url: testUrl });

    expect(mockOnOpenURL).toHaveBeenCalledWith(testUrl);
  });

  it('should remove listener on unmount', () => {
    const { unmount } = renderHook(() => useDeepLinking({ onOpenURL: mockOnOpenURL }));

    unmount();

    expect(mockRemove).toHaveBeenCalled();
  });

  it('should handle getInitialURL errors gracefully', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    (Linking.getInitialURL as jest.Mock).mockRejectedValue(new Error('Test error'));

    renderHook(() => useDeepLinking({ onOpenURL: mockOnOpenURL }));

    await new Promise(resolve => setTimeout(resolve, 0));

    expect(consoleErrorSpy).toHaveBeenCalledWith('Error getting initial URL:', expect.any(Error));
    expect(mockOnOpenURL).not.toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });
});
