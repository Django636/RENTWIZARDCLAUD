import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../services/api';
import type { DocumentResponse } from '@rentwizard/core';

export function DocumentsScreen() {
  const { data: documents, isLoading } = useQuery({
    queryKey: ['documents'],
    queryFn: () => apiClient.documents.list(),
  });

  const handleDownload = async (id: string) => {
    try {
      const { downloadUrl } = await apiClient.documents.getDownloadUrl(id);
      await Linking.openURL(downloadUrl);
    } catch (err) {
      console.error('Download failed:', err);
    }
  };

  const renderItem = ({ item }: { item: DocumentResponse }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleDownload(item.id)}>
      <Text style={styles.docName}>{item.name}</Text>
      <Text style={styles.docMeta}>
        {item.type} · {(item.size / 1024).toFixed(0)} KB
      </Text>
      <Text style={styles.docDate}>{new Date(item.createdAt).toLocaleDateString('de-DE')}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dokumente</Text>
      <FlatList
        data={documents ?? []}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>Keine Dokumente</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc', padding: 16 },
  title: { fontSize: 24, fontWeight: '700', color: '#1e293b', marginBottom: 16, marginTop: 48 },
  card: {
    backgroundColor: '#fff', borderRadius: 10, padding: 14,
    marginBottom: 8, borderWidth: 1, borderColor: '#e2e8f0',
  },
  docName: { fontSize: 15, fontWeight: '600', color: '#1e293b' },
  docMeta: { fontSize: 13, color: '#64748b', marginTop: 2 },
  docDate: { fontSize: 12, color: '#94a3b8', marginTop: 2 },
  empty: { textAlign: 'center', color: '#94a3b8', marginTop: 48 },
});
