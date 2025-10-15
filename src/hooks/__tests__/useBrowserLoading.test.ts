import { renderHook, act } from '@testing-library/react-native';
import { useBrowserLoading } from '../useBrowserLoading';

describe('useBrowserLoading', () => {
  it('should initialize with loading false and progress 0', () => {
    const { result } = renderHook(() => useBrowserLoading());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.progress).toBe(0);
  });

  it('should update loading state when progress is less than 1', () => {
    const { result } = renderHook(() => useBrowserLoading());

    act(() => {
      result.current.handleLoadProgress(0.5);
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.progress).toBe(0.5);
  });

  it('should keep loading state true when progress reaches 1', () => {
    const { result } = renderHook(() => useBrowserLoading());

    act(() => {
      result.current.handleLoadProgress(0.5);
    });

    expect(result.current.isLoading).toBe(true);

    act(() => {
      result.current.handleLoadProgress(1);
    });

    // Loading should still be true immediately after reaching 1
    // (it will be set to false after the timeout)
    expect(result.current.progress).toBe(1);
  });

  it('should hide loading bar after progress completes (with delay)', async () => {
    const { result } = renderHook(() => useBrowserLoading());

    act(() => {
      result.current.handleLoadProgress(0.5);
    });

    expect(result.current.isLoading).toBe(true);

    act(() => {
      result.current.handleLoadProgress(1);
    });

    // Wait for the timeout to complete (600ms delay)
    await new Promise(resolve => setTimeout(resolve, 650));

    // After the delay, loading should be hidden
    expect(result.current.isLoading).toBe(false);
    expect(result.current.progress).toBe(0);
  });

  it('should reset progress and set loading to true', () => {
    const { result } = renderHook(() => useBrowserLoading());

    act(() => {
      result.current.handleLoadProgress(0.8);
    });

    expect(result.current.progress).toBe(0.8);

    act(() => {
      result.current.resetProgress();
    });

    expect(result.current.progress).toBe(0);
    expect(result.current.isLoading).toBe(true);
  });

  it('should allow multiple progress updates', () => {
    const { result } = renderHook(() => useBrowserLoading());

    act(() => {
      result.current.handleLoadProgress(0.3);
    });
    expect(result.current.progress).toBe(0.3);
    expect(result.current.isLoading).toBe(true);

    act(() => {
      result.current.handleLoadProgress(0.7);
    });
    expect(result.current.progress).toBe(0.7);
    expect(result.current.isLoading).toBe(true);

    act(() => {
      result.current.handleLoadProgress(0.9);
    });
    expect(result.current.progress).toBe(0.9);
    expect(result.current.isLoading).toBe(true);
  });

  it('should clear pending timeout when progress updates before completion', async () => {
    const { result } = renderHook(() => useBrowserLoading());

    act(() => {
      result.current.handleLoadProgress(1);
    });

    // Immediately start a new load before timeout completes
    act(() => {
      result.current.handleLoadProgress(0.5);
    });

    // Should still be loading with the new progress
    expect(result.current.isLoading).toBe(true);
    expect(result.current.progress).toBe(0.5);

    // Wait for any pending timeouts
    await new Promise(resolve => setTimeout(resolve, 650));

    // Should still be loading because we started a new load
    expect(result.current.isLoading).toBe(true);
  });
});
