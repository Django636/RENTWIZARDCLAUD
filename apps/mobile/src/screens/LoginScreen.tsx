import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useSetAtom } from 'jotai';
import { authTokenAtom, refreshTokenAtom, userAtom } from '../store/atoms';
import { apiClient, setToken } from '../services/api';

export function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const setAuthToken = useSetAtom(authTokenAtom);
  const setRefreshToken = useSetAtom(refreshTokenAtom);
  const setUser = useSetAtom(userAtom);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const result = await apiClient.auth.login({ email, password });
      setToken(result.tokens.accessToken);
      setAuthToken(result.tokens.accessToken);
      setRefreshToken(result.tokens.refreshToken);
      setUser(result.user);
    } catch (err: any) {
      Alert.alert('Fehler', err.message || 'Login fehlgeschlagen');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>RentWizard</Text>
      <Text style={styles.subtitle}>Hausverwaltung</Text>

      <TextInput
        style={styles.input}
        placeholder="E-Mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Passwort"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Anmelden...' : 'Anmelden'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#f8fafc' },
  title: { fontSize: 32, fontWeight: '700', textAlign: 'center', color: '#1e3a5f' },
  subtitle: { fontSize: 16, textAlign: 'center', color: '#64748b', marginBottom: 32 },
  input: {
    backgroundColor: '#fff', borderWidth: 1, borderColor: '#e2e8f0',
    borderRadius: 8, padding: 14, fontSize: 16, marginBottom: 12,
  },
  button: {
    backgroundColor: '#2563eb', borderRadius: 8, padding: 16,
    alignItems: 'center', marginTop: 8,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
