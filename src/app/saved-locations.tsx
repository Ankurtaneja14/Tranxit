import React from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { Colors, Typography, Spacing } from '@/constants/theme';
import { TranslatedText } from '@/components/TranslatedText';

export default function SavedLocationsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top || Spacing.md }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <MaterialIcons name="arrow-back" size={24} color={Colors.dark.textSecondary} />
        </Pressable>
        <TranslatedText style={styles.headerTitle}>Saved Locations</TranslatedText>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.content}>
        <MaterialIcons name="bookmark-border" size={64} color="rgba(255,255,255,0.1)" />
        <TranslatedText style={styles.message}>You haven't saved any locations yet. Search for a destination and tap the bookmark icon to save it here.</TranslatedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.dark.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.marginMobile,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  backBtn: { width: 40, height: 40, justifyContent: 'center' },
  headerTitle: { fontFamily: Typography.family.sans, fontSize: 18, fontWeight: '600', color: Colors.dark.text },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: Spacing.xl },
  message: { fontFamily: Typography.family.sans, fontSize: 16, color: Colors.dark.textSecondary, textAlign: 'center', marginTop: Spacing.xl, lineHeight: 24 },
});
