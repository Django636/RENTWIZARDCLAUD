import { ApiClient } from '@rentwizard/api-client';

const isBrowser = typeof window !== 'undefined';

let accessToken: string | null = null;

export function setAccessToken(token: string | null) {
  accessToken = token;
  if (isBrowser) {
    if (token) {
      localStorage.setItem('rw_token', token);
    } else {
      localStorage.removeItem('rw_token');
    }
  }
}

export function getAccessToken(): string | null {
  if (accessToken) return accessToken;
  if (isBrowser) {
    accessToken = localStorage.getItem('rw_token');
  }
  return accessToken;
}

export const apiClient = new ApiClient({
  baseUrl: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001',
  getAccessToken,
  onTokenExpired: () => {
    setAccessToken(null);
    if (isBrowser) {
      window.location.href = '/login';
    }
  },
});
