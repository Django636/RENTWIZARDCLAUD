import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../services/api';
import type { CreateTicketInput, UpdateTicketStatusInput } from '@rentwizard/core';

export function useTickets(filters?: Record<string, string>) {
  return useQuery({
    queryKey: ['tickets', filters],
    queryFn: () => apiClient.tickets.list(filters),
    staleTime: 60_000,
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
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateTicketInput) => apiClient.tickets.create(dto),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['tickets'] }),
  });
}
