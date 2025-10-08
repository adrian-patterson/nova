import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IconButton } from '../shared/IconButton';
import { BrowserLoadingBar } from './BrowserLoadingBar';
import { useTheme } from '../../hooks/useTheme';

interface BrowserToolbarProps {
  canGoBack: boolean;
  canGoForward: boolean;
  onGoBack: () => void;
  onGoForward: () => void;
  onShare: () => void;
  showLoadingBar: boolean;
  loadingProgress: number;
}

export const BrowserToolbar: React.FC<BrowserToolbarProps> = ({
  canGoBack,
  canGoForward,
  onGoBack,
  onGoForward,
  onShare,
  showLoadingBar,
  loadingProgress,
}) => {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.loadingBarContainer}>
        <BrowserLoadingBar visible={showLoadingBar} progress={loadingProgress} />
      </View>
      <View
        style={[
          styles.toolbar,
          {
            paddingBottom: insets.bottom + 4,
            borderTopColor: theme.colors.border,
            backgroundColor: theme.colors.background,
          },
        ]}
      >
        <IconButton
          name="chevron-back"
          size={28}
          color={theme.colors.text}
          onPress={onGoBack}
          disabled={!canGoBack}
        />
        <IconButton
          name="chevron-forward"
          size={28}
          color={theme.colors.text}
          onPress={onGoForward}
          disabled={!canGoForward}
        />
        <IconButton
          name="share-outline"
          size={24}
          color={theme.colors.text}
          onPress={onShare}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  loadingBarContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderTopWidth: 1,
  },
});
