import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';

import { Colors, Typography, Radii, Spacing } from '@/constants/theme';
import { TranslatedText } from '@/components/TranslatedText';

const { width } = Dimensions.get('window');

const FILTERS = ['RECOMMENDED', 'FASTEST', 'CHEAPEST', 'LEAST WALKING'];

export default function RouteComparisonScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { dest } = useLocalSearchParams<{ dest?: string }>();
  
  const [activeFilter, setActiveFilter] = useState('RECOMMENDED');
  const destinationName = dest || 'Model Town';

  const navigateToTracker = () => {
    router.push(`/live-bus-tracker?dest=${encodeURIComponent(destinationName)}`);
  };

  return (
    <View style={styles.container}>
      <View style={StyleSheet.absoluteFillObject}>
        <LinearGradient
          colors={['rgba(0, 230, 118, 0.05)', 'transparent']}
          style={styles.radialTopLeft}
          start={{ x: 0, y: 0 }}
          end={{ x: 0.5, y: 0.5 }}
        />
      </View>

      {/* Top Header */}
      <View style={[styles.header, { paddingTop: insets.top || Spacing.md }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <MaterialIcons name="arrow-back" size={24} color={Colors.dark.textSecondary} />
        </Pressable>
        <View style={styles.headerTitleBox}>
          <TranslatedText style={styles.headerTitle}>Sector 11 ➔ {destinationName}</TranslatedText>
          <TranslatedText style={styles.headerSub}>3 Available Routes</TranslatedText>
        </View>
        <Pressable style={styles.tuneBtn}>
          <MaterialIcons name="tune" size={24} color={Colors.dark.primary} />
        </Pressable>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsScroll}>
          {FILTERS.map(filter => (
            <Pressable 
              key={filter}
              style={[styles.tab, activeFilter === filter && styles.tabActive]}
              onPress={() => setActiveFilter(filter)}
            >
              <TranslatedText style={[styles.tabText, activeFilter === filter && styles.tabTextActive]}>
                {filter}
              </TranslatedText>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Main Content */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 100 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Option 1 */}
        <Pressable style={[styles.routeCard, styles.routeCardActive]} onPress={navigateToTracker}>
          <View style={styles.badgePrimary}>
            <MaterialIcons name="bolt" size={14} color={Colors.dark.primary} />
            <TranslatedText style={styles.badgeTextPrimary}>BEST VALUE • DIRECT</TranslatedText>
          </View>
          
          <View style={styles.statsRow}>
            <View>
              <TranslatedText style={styles.timeTitle}>14 mins</TranslatedText>
              <TranslatedText style={styles.timeSub}>Arrives 10:45 AM</TranslatedText>
            </View>
            <TranslatedText style={styles.priceTitle}>₹15</TranslatedText>
          </View>

          <View style={styles.transitFlow}>
            <View style={styles.flowStep}>
              <MaterialIcons name="directions-walk" size={16} color={Colors.dark.textSecondary} />
              <TranslatedText style={styles.flowText}>2m</TranslatedText>
            </View>
            <View style={styles.flowDivider} />
            <View style={styles.flowBusPrimary}>
              <MaterialIcons name="directions-bus" size={16} color="#003918" />
              <Text style={styles.flowBusText}>E-102</Text>
            </View>
            <View style={styles.flowDivider} />
            <View style={styles.flowStep}>
              <MaterialIcons name="directions-walk" size={16} color={Colors.dark.textSecondary} />
              <TranslatedText style={styles.flowText}>1m</TranslatedText>
            </View>
          </View>

          <View style={styles.insights}>
            <View style={styles.insightItem}>
              <View style={[styles.insightDot, { backgroundColor: Colors.dark.primary }]} />
              <TranslatedText style={[styles.insightText, { color: Colors.dark.primary }]}>Low Crowd</TranslatedText>
            </View>
            <View style={styles.insightItem}>
              <MaterialIcons name="ac-unit" size={14} color="#8dcdff" />
              <TranslatedText style={[styles.insightText, { color: '#8dcdff' }]}>AC Bus</TranslatedText>
            </View>
            <View style={styles.insightItem}>
              <MaterialIcons name="ev-station" size={14} color={Colors.dark.primary} />
              <TranslatedText style={[styles.insightText, { color: Colors.dark.primary }]}>Electric</TranslatedText>
            </View>
          </View>
        </Pressable>

        {/* Option 2 */}
        <Pressable style={styles.routeCard} onPress={navigateToTracker}>
          <View style={styles.badgeSecondary}>
            <MaterialIcons name="schedule" size={14} color={Colors.dark.textSecondary} />
            <TranslatedText style={styles.badgeTextSecondary}>CHEAPEST</TranslatedText>
          </View>
          
          <View style={styles.statsRow}>
            <View>
              <TranslatedText style={styles.timeTitle}>22 mins</TranslatedText>
              <TranslatedText style={styles.timeSub}>Arrives 10:53 AM</TranslatedText>
            </View>
            <TranslatedText style={styles.priceTitle}>₹10</TranslatedText>
          </View>

          <View style={styles.transitFlow}>
            <View style={styles.flowStep}>
              <MaterialIcons name="directions-walk" size={16} color={Colors.dark.textSecondary} />
              <TranslatedText style={styles.flowText}>4m</TranslatedText>
            </View>
            <View style={styles.flowDivider} />
            <View style={styles.flowBusSecondary}>
              <MaterialIcons name="directions-bus" size={16} color={Colors.dark.textSecondary} />
              <Text style={styles.flowBusTextSecondary}>714</Text>
            </View>
            <View style={styles.flowDivider} />
            <View style={styles.flowStep}>
              <MaterialIcons name="directions-walk" size={16} color={Colors.dark.textSecondary} />
              <TranslatedText style={styles.flowText}>5m</TranslatedText>
            </View>
          </View>

          <View style={styles.insights}>
            <View style={styles.insightItem}>
              <View style={[styles.insightDot, { backgroundColor: '#ffba79' }]} />
              <TranslatedText style={[styles.insightText, { color: '#ffba79' }]}>Standing Only</TranslatedText>
            </View>
          </View>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.dark.background },
  radialTopLeft: { position: 'absolute', top: 0, left: 0, width: width, height: width },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: Spacing.marginMobile, paddingBottom: Spacing.sm,
    backgroundColor: 'rgba(13, 21, 14, 0.8)', borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  backBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  headerTitleBox: { alignItems: 'center' },
  headerTitle: { fontFamily: Typography.family.sans, fontSize: 20, fontWeight: '600', color: Colors.dark.text },
  headerSub: { fontFamily: Typography.family.sans, fontSize: 12, color: Colors.dark.textSecondary },
  tuneBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  tabsContainer: { backgroundColor: 'rgba(13, 21, 14, 0.9)', zIndex: 10 },
  tabsScroll: { paddingHorizontal: Spacing.marginMobile, paddingVertical: Spacing.sm, gap: Spacing.sm },
  tab: { 
    paddingHorizontal: Spacing.md, paddingVertical: 8, 
    borderRadius: Radii.full, backgroundColor: 'rgba(30, 38, 56, 0.7)', 
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' 
  },
  tabActive: { backgroundColor: Colors.dark.primary, borderColor: Colors.dark.primary, shadowColor: Colors.dark.primary, shadowOpacity: 0.3, shadowRadius: 10, shadowOffset: { width: 0, height: 0 } },
  tabText: { fontFamily: Typography.family.mono, fontSize: 12, fontWeight: '700', color: Colors.dark.textSecondary },
  tabTextActive: { color: '#003918' },
  scrollView: { flex: 1 },
  scrollContent: { paddingHorizontal: Spacing.marginMobile, paddingTop: Spacing.lg, gap: Spacing.lg },
  routeCard: { 
    backgroundColor: 'rgba(30, 38, 56, 0.7)', borderRadius: Radii.lg, padding: Spacing.lg, 
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', overflow: 'hidden' 
  },
  routeCardActive: { borderColor: Colors.dark.primary, shadowColor: Colors.dark.primary, shadowOpacity: 0.2, shadowRadius: 15, shadowOffset: { width: 0, height: 0 } },
  badgePrimary: { position: 'absolute', top: 0, left: 0, backgroundColor: 'rgba(117, 255, 158, 0.2)', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 4, borderBottomRightRadius: Radii.md, borderBottomWidth: 1, borderRightWidth: 1, borderColor: 'rgba(117, 255, 158, 0.3)', gap: 4 },
  badgeTextPrimary: { fontFamily: Typography.family.mono, fontSize: 10, fontWeight: '700', color: Colors.dark.primary },
  badgeSecondary: { position: 'absolute', top: 0, left: 0, backgroundColor: 'rgba(255,255,255,0.05)', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 4, borderBottomRightRadius: Radii.md, borderBottomWidth: 1, borderRightWidth: 1, borderColor: 'rgba(255,255,255,0.05)', gap: 4 },
  badgeTextSecondary: { fontFamily: Typography.family.mono, fontSize: 10, fontWeight: '700', color: Colors.dark.textSecondary },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: 12, marginBottom: Spacing.lg },
  timeTitle: { fontFamily: Typography.family.sans, fontSize: 32, fontWeight: '800', color: Colors.dark.text, letterSpacing: -1 },
  timeSub: { fontFamily: Typography.family.sans, fontSize: 14, color: Colors.dark.textSecondary, marginTop: 4 },
  priceTitle: { fontFamily: Typography.family.sans, fontSize: 24, fontWeight: '700', color: Colors.dark.text },
  transitFlow: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.lg, gap: 8 },
  flowStep: { alignItems: 'center', gap: 4 },
  flowText: { fontFamily: Typography.family.sans, fontSize: 10, color: Colors.dark.textSecondary },
  flowDivider: { height: 2, width: 24, backgroundColor: 'rgba(255,255,255,0.1)' },
  flowBusPrimary: { backgroundColor: Colors.dark.primary, paddingHorizontal: 12, paddingVertical: 4, borderRadius: Radii.full, flexDirection: 'row', alignItems: 'center', gap: 4, shadowColor: Colors.dark.primary, shadowOpacity: 0.3, shadowRadius: 10, shadowOffset: { width: 0, height: 0 } },
  flowBusText: { fontFamily: Typography.family.mono, fontSize: 12, fontWeight: '700', color: '#003918' },
  flowBusSecondary: { backgroundColor: 'rgba(255,255,255,0.1)', paddingHorizontal: 12, paddingVertical: 4, borderRadius: Radii.full, flexDirection: 'row', alignItems: 'center', gap: 4 },
  flowBusTextSecondary: { fontFamily: Typography.family.mono, fontSize: 12, fontWeight: '700', color: Colors.dark.text },
  insights: { flexDirection: 'row', gap: Spacing.md, paddingTop: Spacing.md, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.05)' },
  insightItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  insightDot: { width: 8, height: 8, borderRadius: 4 },
  insightText: { fontFamily: Typography.family.sans, fontSize: 12, fontWeight: '600' },
});
