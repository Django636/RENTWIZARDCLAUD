import { ApiClient } from '@rentwizard/api-client';
import AsyncStorage from '@react-native-async-storage/async-storage';

let cachedToken: string | null = null;

export const apiClient = new ApiClient({
  baseUrl: __DEV__ ? 'http://localhost:3001' : 'https://api.rentwizard.io',
  getAccessToken: () => cachedToken,
  onTokenExpired: async () => {
    cachedToken = null;
    await AsyncStorage.removeItem('rw_token');
  },
});

export async function initToken() {
  cachedToken = await AsyncStorage.getItem('rw_token');
}

export function setToken(token: string | null) {
  cachedToken = token;
}
