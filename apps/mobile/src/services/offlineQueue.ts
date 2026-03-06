import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { apiClient } from './api';

const QUEUE_KEY = 'rw_offline_queue';

interface QueuedRequest {
  id: string;
  method: string;
  path: string;
  body: any;
  createdAt: number;
}

export const offlineQueue = {
  async enqueue(method: string, path: string, body: any): Promise<void> {
    const queue = await this.getQueue();
    queue.push({
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      method,
      path,
      body,
      createdAt: Date.now(),
    });
    await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
  },

  async getQueue(): Promise<QueuedRequest[]> {
    const raw = await AsyncStorage.getItem(QUEUE_KEY);
    return raw ? JSON.parse(raw) : [];
  },

  async flush(): Promise<{ succeeded: number; failed: number }> {
    const state = await NetInfo.fetch();
    if (!state.isConnected) return { succeeded: 0, failed: 0 };

    const queue = await this.getQueue();
    if (queue.length === 0) return { succeeded: 0, failed: 0 };

    let succeeded = 0;
    const failed: QueuedRequest[] = [];

    for (const item of queue) {
      try {
        // Use the api client's internal fetch
        const response = await fetch(
          `${__DEV__ ? 'http://localhost:3001' : 'https://api.rentwizard.io'}/api${item.path}`,
          {
            method: item.method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item.body),
          },
        );
        if (response.ok) {
          succeeded++;
        } else {
          failed.push(item);
        }
      } catch {
        failed.push(item);
      }
    }

    await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(failed));
    return { succeeded, failed: failed.length };
  },

  async clear(): Promise<void> {
    await AsyncStorage.removeItem(QUEUE_KEY);
  },
};
