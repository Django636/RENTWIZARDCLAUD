import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { getSocket } from '../services/socket';
import { WS_EVENTS } from '@rentwizard/core';

export function useTicketRealtime(ticketId: string) {
  const queryClient = useQueryClient();

  useEffect(() => {
    let socket: any;

    (async () => {
      socket = await getSocket();
      socket.emit(WS_EVENTS.SUBSCRIBE_TICKET, { ticketId });

      socket.on(WS_EVENTS.TICKET_STATUS_CHANGED, () => {
        queryClient.invalidateQueries({ queryKey: ['ticket', ticketId] });
        queryClient.invalidateQueries({ queryKey: ['tickets'] });
      });

      socket.on(WS_EVENTS.TICKET_COMMENT_ADDED, () => {
        queryClient.invalidateQueries({ queryKey: ['ticket', ticketId] });
      });

      socket.on(WS_EVENTS.TICKET_ASSIGNED, () => {
        queryClient.invalidateQueries({ queryKey: ['ticket', ticketId] });
      });
    })();

    return () => {
      if (socket) {
        socket.emit(WS_EVENTS.UNSUBSCRIBE_TICKET, { ticketId });
        socket.off(WS_EVENTS.TICKET_STATUS_CHANGED);
        socket.off(WS_EVENTS.TICKET_COMMENT_ADDED);
        socket.off(WS_EVENTS.TICKET_ASSIGNED);
      }
    };
  }, [ticketId, queryClient]);
}
