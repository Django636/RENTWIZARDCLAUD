import { io, Socket } from 'socket.io-client';
import { getAccessToken } from './api';

let socket: Socket | null = null;

export function getSocket(): Socket {
  if (!socket) {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';
    socket = io(`${baseUrl}/ws/tickets`, {
      auth: { token: getAccessToken() },
      transports: ['websocket', 'polling'],
      autoConnect: true,
    });
  }
  return socket;
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}
