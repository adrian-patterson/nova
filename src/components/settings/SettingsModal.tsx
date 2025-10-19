import React, { useEffect } from 'react';
import { Modal, View, Text, StyleSheet, ScrollView, Animated, StatusBar } from 'react-native';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import { SettingsHeader } from './SettingsHeader';
import { SearchEngineOption } from './SearchEngineOption';
import { SearchEngineId } from '../../types';
import { SEARCH_ENGINES } from '../../utils/searchEngines';
import { useTheme } from '../../hooks/useTheme';
import { usePullToDismiss } from '../../hooks/usePullToDismiss';

interface SettingsModalProps {
  visible: boolean;
  onClose: () => void;
  currentEngine: SearchEngineId;
  onEngineSelect: (engine: SearchEngineId) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  visible,
  onClose,
  currentEngine,
  onEngineSelect,
}) => {
  const { theme } = useTheme();
  const { panResponder, translateY } = usePullToDismiss({ onDismiss: onClose });

  const engines = Object.values(SEARCH_ENGINES);

  // Handle animated close
  const handleClose = React.useCallback(() => {
    Animated.timing(translateY, {
      toValue: 1000,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onClose();
    });
  }, [translateY, onClose]);

  // Animate slide up on open
  useEffect(() => {
    if (visible) {
      translateY.setValue(1000);
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, translateY]);

  return (
    <Modal
      visible={visible}
      animationType="none"
      onRequestClose={handleClose}
      supportedOrientations={['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right']}
      transparent={true}
      statusBarTranslucent={false}
    >
      <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <Animated.View
          style={[
            styles.modalBackground,
            { backgroundColor: theme.colors.background },
          ]}
        >
          <Animated.View
            style={[
              styles.container,
              { backgroundColor: theme.colors.background, transform: [{ translateY }] },
            ]}
          >
            <SettingsHeader onClose={handleClose} panResponder={panResponder} />

            <ScrollView style={styles.content}>
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: theme.colors.textSecondary }]}>
                DEFAULT SEARCH ENGINE
              </Text>
              <View style={[styles.optionsList, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
                {engines.map((engine) => (
                  <SearchEngineOption
                    key={engine.id}
                    engine={engine}
                    isSelected={engine.id === currentEngine}
                    onSelect={() => onEngineSelect(engine.id)}
                  />
                ))}
              </View>
            </View>
          </ScrollView>
          </Animated.View>
        </Animated.View>
      </SafeAreaProvider>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.5,
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  optionsList: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
});
