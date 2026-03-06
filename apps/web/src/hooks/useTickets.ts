import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import type { CreateTicketInput, UpdateTicketStatusInput, CreateTicketCommentInput } from '@rentwizard/core';

export function useTickets(filters?: Record<string, string>) {
  return useQuery({
    queryKey: ['tickets', filters],
    queryFn: () => apiClient.tickets.list(filters),
  });
}

export function useTicket(id: string) {
  return useQuery({
    queryKey: ['ticket', id],
    queryFn: () => apiClient.tickets.getById(id),
    enabled: !!id,
  });
}

export function useCreateTicket() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateTicketInput) => apiClient.tickets.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
    },
  });
}

export function useUpdateTicketStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...dto }: UpdateTicketStatusInput & { id: string }) =>
      apiClient.tickets.updateStatus(id, dto),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
      queryClient.invalidateQueries({ queryKey: ['ticket', variables.id] });
    },
  });
}

export function useAddComment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ ticketId, ...dto }: CreateTicketCommentInput & { ticketId: string }) =>
      apiClient.tickets.addComment(ticketId, dto),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['ticket', variables.ticketId] });
    },
  });
}
