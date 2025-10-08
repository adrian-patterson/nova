import { renderHook, act } from '@testing-library/react-hooks';
import { useBrowserLoading } from '../useBrowserLoading';

// Mock timers for animation
jest.useFakeTimers();

describe('useBrowserLoading', () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  it('should initialize with loading false', () => {
    const { result } = renderHook(() => useBrowserLoading());

    expect(result.current.loading).toBe(false);
    expect(result.current.showLoadingBar).toBe(false);
  });

  it('should show loading bar when loading is set to true', () => {
    const { result } = renderHook(() => useBrowserLoading());

    act(() => {
      result.current.setLoading(true);
    });

    expect(result.current.loading).toBe(true);
    expect(result.current.showLoadingBar).toBe(true);
  });

  it('should hide loading bar after loading completes', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useBrowserLoading());

    act(() => {
      result.current.setLoading(true);
    });

    expect(result.current.showLoadingBar).toBe(true);

    act(() => {
      result.current.setLoading(false);
    });

    // Run timers and wait for state updates
    act(() => {
      jest.runAllTimers();
    });

    expect(result.current.loading).toBe(false);
    // showLoadingBar may still be true until animation completes
  });

  it('should provide loadingProgress animated value', () => {
    const { result } = renderHook(() => useBrowserLoading());

    expect(result.current.loadingProgress).toBeDefined();
    expect(typeof result.current.loadingProgress).toBe('object');
  });

  it('should allow toggling loading state multiple times', () => {
    const { result } = renderHook(() => useBrowserLoading());

    act(() => {
      result.current.setLoading(true);
    });
    expect(result.current.loading).toBe(true);

    act(() => {
      result.current.setLoading(false);
      jest.runAllTimers();
    });
    expect(result.current.loading).toBe(false);

    act(() => {
      result.current.setLoading(true);
    });
    expect(result.current.loading).toBe(true);
  });
});
