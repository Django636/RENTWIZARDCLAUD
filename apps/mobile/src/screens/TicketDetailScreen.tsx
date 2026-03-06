import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../services/api';

export function TicketDetailScreen({ route }: any) {
  const { ticketId } = route.params;
  const queryClient = useQueryClient();
  const [comment, setComment] = useState('');

  const { data: ticket, isLoading } = useQuery({
    queryKey: ['ticket', ticketId],
    queryFn: () => apiClient.tickets.getById(ticketId),
  });

  const addComment = useMutation({
    mutationFn: () => apiClient.tickets.addComment(ticketId, { content: comment }),
    onSuccess: () => {
      setComment('');
      queryClient.invalidateQueries({ queryKey: ['ticket', ticketId] });
    },
    onError: (err: any) => Alert.alert('Fehler', err.message),
  });

  if (isLoading || !ticket) {
    return <View style={styles.loading}><Text>Laden...</Text></View>;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{ticket.title}</Text>
      <Text style={styles.meta}>{ticket.category} · {ticket.priority} · {ticket.status}</Text>
      <Text style={styles.description}>{ticket.description}</Text>

      {/* Comments */}
      <Text style={styles.sectionTitle}>Kommentare</Text>
      {ticket.comments?.map((c) => (
        <View key={c.id} style={styles.commentCard}>
          <Text style={styles.commentAuthor}>
            {c.author?.firstName} {c.author?.lastName}
          </Text>
          <Text style={styles.commentContent}>{c.content}</Text>
          <Text style={styles.commentDate}>
            {new Date(c.createdAt).toLocaleString('de-DE')}
          </Text>
        </View>
      ))}

      {/* Add Comment */}
      <View style={styles.commentInput}>
        <TextInput
          style={styles.input}
          placeholder="Kommentar schreiben..."
          value={comment}
          onChangeText={setComment}
          multiline
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={() => addComment.mutate()}
          disabled={!comment.trim()}
        >
          <Text style={styles.sendButtonText}>Senden</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc', padding: 16 },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: '700', color: '#1e293b', marginBottom: 4 },
  meta: { fontSize: 13, color: '#64748b', marginBottom: 12 },
  description: { fontSize: 15, color: '#334155', lineHeight: 22, marginBottom: 24 },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#1e293b', marginBottom: 8 },
  commentCard: {
    backgroundColor: '#fff', borderRadius: 8, padding: 12,
    marginBottom: 8, borderWidth: 1, borderColor: '#e2e8f0',
  },
  commentAuthor: { fontSize: 13, fontWeight: '600', color: '#1e293b' },
  commentContent: { fontSize: 14, color: '#334155', marginTop: 2 },
  commentDate: { fontSize: 11, color: '#94a3b8', marginTop: 4 },
  commentInput: { marginTop: 16, marginBottom: 32 },
  input: {
    backgroundColor: '#fff', borderWidth: 1, borderColor: '#e2e8f0',
    borderRadius: 8, padding: 12, fontSize: 14, minHeight: 60, textAlignVertical: 'top',
  },
  sendButton: {
    backgroundColor: '#2563eb', borderRadius: 8, padding: 12,
    alignItems: 'center', marginTop: 8,
  },
  sendButtonText: { color: '#fff', fontWeight: '600' },
});
