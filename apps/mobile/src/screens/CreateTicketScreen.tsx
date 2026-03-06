import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert, Image } from 'react-native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as ImagePicker from 'expo-image-picker';
import { apiClient } from '../services/api';
import { offlineQueue } from '../services/offlineQueue';
import NetInfo from '@react-native-community/netinfo';

const CATEGORIES = ['PLUMBING', 'ELECTRICAL', 'HVAC', 'STRUCTURAL', 'APPLIANCE', 'OTHER'];
const PRIORITIES = ['LOW', 'MEDIUM', 'HIGH', 'URGENT'];

export function CreateTicketScreen({ navigation }: any) {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('OTHER');
  const [priority, setPriority] = useState('MEDIUM');
  const [photos, setPhotos] = useState<string[]>([]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      allowsMultipleSelection: true,
    });
    if (!result.canceled) {
      setPhotos((prev) => [...prev, ...result.assets.map((a) => a.uri)]);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Berechtigung', 'Kamera-Zugriff wird benötigt');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({ quality: 0.8 });
    if (!result.canceled) {
      setPhotos((prev) => [...prev, result.assets[0].uri]);
    }
  };

  const createTicket = useMutation({
    mutationFn: async () => {
      const state = await NetInfo.fetch();
      const dto = {
        title, description, category, priority,
        unitId: 'seed-unit-placeholder', // TODO: unit selector
      };

      if (!state.isConnected) {
        await offlineQueue.enqueue('POST', '/tickets', dto);
        Alert.alert('Offline', 'Vorgang wird gesendet, sobald Verbindung besteht.');
        return;
      }

      return apiClient.tickets.create(dto as any);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
      navigation.goBack();
    },
    onError: (err: any) => Alert.alert('Fehler', err.message),
  });

  return (
    <ScrollView style={styles.container}>
      <TextInput style={styles.input} placeholder="Titel" value={title} onChangeText={setTitle} />
      <TextInput
        style={[styles.input, { minHeight: 100 }]}
        placeholder="Beschreibung"
        value={description}
        onChangeText={setDescription}
        multiline
        textAlignVertical="top"
      />

      <Text style={styles.label}>Kategorie</Text>
      <View style={styles.chipRow}>
        {CATEGORIES.map((c) => (
          <TouchableOpacity
            key={c}
            style={[styles.chip, category === c && styles.chipActive]}
            onPress={() => setCategory(c)}
          >
            <Text style={[styles.chipText, category === c && styles.chipTextActive]}>{c}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Priorität</Text>
      <View style={styles.chipRow}>
        {PRIORITIES.map((p) => (
          <TouchableOpacity
            key={p}
            style={[styles.chip, priority === p && styles.chipActive]}
            onPress={() => setPriority(p)}
          >
            <Text style={[styles.chipText, priority === p && styles.chipTextActive]}>{p}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Fotos</Text>
      <View style={styles.photoRow}>
        {photos.map((uri, i) => (
          <Image key={i} source={{ uri }} style={styles.photo} />
        ))}
      </View>
      <View style={styles.photoButtons}>
        <TouchableOpacity style={styles.photoBtn} onPress={takePhoto}>
          <Text style={styles.photoBtnText}>Kamera</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.photoBtn} onPress={pickImage}>
          <Text style={styles.photoBtnText}>Galerie</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => createTicket.mutate()}
        disabled={!title || !description}
      >
        <Text style={styles.submitText}>Vorgang erstellen</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc', padding: 16 },
  input: {
    backgroundColor: '#fff', borderWidth: 1, borderColor: '#e2e8f0',
    borderRadius: 8, padding: 14, fontSize: 15, marginBottom: 12,
  },
  label: { fontSize: 14, fontWeight: '600', color: '#334155', marginBottom: 6, marginTop: 8 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 8 },
  chip: {
    paddingHorizontal: 12, paddingVertical: 6, borderRadius: 99,
    backgroundColor: '#e2e8f0',
  },
  chipActive: { backgroundColor: '#2563eb' },
  chipText: { fontSize: 12, fontWeight: '600', color: '#475569' },
  chipTextActive: { color: '#fff' },
  photoRow: { flexDirection: 'row', gap: 8, marginBottom: 8 },
  photo: { width: 72, height: 72, borderRadius: 8 },
  photoButtons: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  photoBtn: {
    flex: 1, backgroundColor: '#e2e8f0', borderRadius: 8,
    padding: 12, alignItems: 'center',
  },
  photoBtnText: { fontWeight: '600', color: '#334155' },
  submitButton: {
    backgroundColor: '#2563eb', borderRadius: 8, padding: 16,
    alignItems: 'center', marginBottom: 32,
  },
  submitText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
