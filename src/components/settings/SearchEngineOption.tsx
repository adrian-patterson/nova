import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { SearchEngine } from '../../types';
import { useTheme } from '../../hooks/useTheme';

interface SearchEngineOptionProps {
  engine: SearchEngine;
  isSelected: boolean;
  onSelect: () => void;
}

export const SearchEngineOption: React.FC<SearchEngineOptionProps> = React.memo(({
  engine,
  isSelected,
  onSelect,
}) => {
  const { theme } = useTheme();

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onSelect();
  };

  return (
    <TouchableOpacity
      style={[styles.container, { borderBottomColor: theme.colors.border }]}
      onPress={handlePress}
      activeOpacity={0.6}
    >
      <View style={styles.content}>
        <Ionicons
          name={engine.icon as keyof typeof Ionicons.glyphMap}
          size={28}
          color={engine.color}
          style={styles.icon}
        />
        <Text style={[styles.name, { color: theme.colors.text }]}>
          {engine.name}
        </Text>
        {isSelected && (
          <Ionicons
            name="checkmark"
            size={24}
            color="#007AFF"
            style={styles.checkmark}
          />
        )}
      </View>
    </TouchableOpacity>
  );
});

SearchEngineOption.displayName = 'SearchEngineOption';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 16,
    width: 28,
  },
  name: {
    fontSize: 17,
    flex: 1,
  },
  checkmark: {
    marginLeft: 8,
  },
});
