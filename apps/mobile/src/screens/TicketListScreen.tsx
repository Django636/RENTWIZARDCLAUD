import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../services/api';
import type { TicketResponse } from '@rentwizard/core';

export function TicketListScreen({ navigation }: any) {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['tickets'],
    queryFn: () => apiClient.tickets.list(),
  });

  const renderItem = ({ item }: { item: TicketResponse }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('TicketDetail', { ticketId: item.id })}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
        <StatusChip status={item.status} />
      </View>
      <Text style={styles.cardMeta}>{item.category} · {item.priority}</Text>
      <Text style={styles.cardDate}>
        {new Date(item.createdAt).toLocaleDateString('de-DE')}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate('CreateTicket')}
      >
        <Text style={styles.createButtonText}>+ Neuer Vorgang</Text>
      </TouchableOpacity>

      <FlatList
        data={data?.data ?? []}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} />}
        contentContainerStyle={{ paddingBottom: 80 }}
        ListEmptyComponent={
          <Text style={styles.empty}>Keine Vorgänge vorhanden</Text>
        }
      />
    </View>
  );
}

function StatusChip({ status }: { status: string }) {
  const colors: Record<string, { bg: string; text: string }> = {
    OPEN: { bg: '#dbeafe', text: '#1d4ed8' },
    IN_PROGRESS: { bg: '#fef3c7', text: '#b45309' },
    ESCALATED: { bg: '#fee2e2', text: '#dc2626' },
    RESOLVED: { bg: '#d1fae5', text: '#059669' },
    CLOSED: { bg: '#f3f4f6', text: '#6b7280' },
  };
  const c = colors[status] ?? colors.CLOSED;
  return (
    <View style={[styles.chip, { backgroundColor: c.bg }]}>
      <Text style={[styles.chipText, { color: c.text }]}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  createButton: {
    backgroundColor: '#2563eb', margin: 16, borderRadius: 8,
    padding: 14, alignItems: 'center',
  },
  createButtonText: { color: '#fff', fontWeight: '600', fontSize: 15 },
  card: {
    backgroundColor: '#fff', marginHorizontal: 16, marginBottom: 8,
    borderRadius: 10, padding: 14, borderWidth: 1, borderColor: '#e2e8f0',
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { fontSize: 15, fontWeight: '600', color: '#1e293b', flex: 1, marginRight: 8 },
  cardMeta: { fontSize: 13, color: '#64748b', marginTop: 4 },
  cardDate: { fontSize: 12, color: '#94a3b8', marginTop: 2 },
  chip: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 99 },
  chipText: { fontSize: 11, fontWeight: '600', textTransform: 'uppercase' },
  empty: { textAlign: 'center', color: '#94a3b8', marginTop: 48 },
});
