import React from 'react';
import { View, Text, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../services/api';

export function DashboardScreen() {
  const { data: stats, isLoading, refetch } = useQuery({
    queryKey: ['dashboard'],
    queryFn: () => apiClient.dashboard.stats(),
  });

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} />}
    >
      <Text style={styles.title}>Dashboard</Text>
      <View style={styles.grid}>
        <View style={[styles.card, { backgroundColor: '#dbeafe' }]}>
          <Text style={styles.cardLabel}>Offene Vorgänge</Text>
          <Text style={styles.cardValue}>{stats?.openTickets ?? '-'}</Text>
        </View>
        <View style={[styles.card, { backgroundColor: '#fee2e2' }]}>
          <Text style={styles.cardLabel}>Dringend</Text>
          <Text style={styles.cardValue}>{stats?.urgentTickets ?? '-'}</Text>
        </View>
        <View style={[styles.card, { backgroundColor: '#d1fae5' }]}>
          <Text style={styles.cardLabel}>Immobilien</Text>
          <Text style={styles.cardValue}>{stats?.totalProperties ?? '-'}</Text>
        </View>
        <View style={[styles.card, { backgroundColor: '#f3e8ff' }]}>
          <Text style={styles.cardLabel}>Belegung</Text>
          <Text style={styles.cardValue}>{stats?.occupancyRate ?? '-'}%</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc', padding: 16 },
  title: { fontSize: 24, fontWeight: '700', color: '#1e293b', marginBottom: 16, marginTop: 48 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  card: { width: '47%', borderRadius: 12, padding: 16 },
  cardLabel: { fontSize: 13, color: '#475569', fontWeight: '500' },
  cardValue: { fontSize: 28, fontWeight: '700', color: '#1e293b', marginTop: 4 },
});
