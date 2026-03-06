import type {
  AuthResponse,
  UserResponse,
  PropertyResponse,
  UnitResponse,
  TicketResponse,
  TicketCommentResponse,
  TicketAssignmentResponse,
  DocumentResponse,
  PresignedUrlResponse,
  DashboardStats,
  PaginatedResponse,
  LoginInput,
  RegisterInput,
  CreatePropertyInput,
  UpdatePropertyInput,
  CreateUnitInput,
  CreateTicketInput,
  UpdateTicketStatusInput,
  CreateTicketCommentInput,
  AssignTicketInput,
  RequestUploadInput,
} from '@rentwizard/core';

export interface ApiClientConfig {
  baseUrl: string;
  getAccessToken: () => string | null;
  onTokenExpired?: () => void;
}

export class ApiClient {
  constructor(private config: ApiClientConfig) {}

  private async request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const token = this.config.getAccessToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...((options.headers as Record<string, string>) ?? {}),
    };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const response = await fetch(`${this.config.baseUrl}/api${path}`, { ...options, headers });

    if (response.status === 401) this.config.onTokenExpired?.();

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new ApiError(response.status, error.message, error.details);
    }

    if (response.status === 204) return undefined as T;
    return response.json();
  }

  // ── Auth ──
  auth = {
    login: (data: LoginInput) =>
      this.request<AuthResponse>('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
    register: (data: RegisterInput) =>
      this.request<AuthResponse>('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
    refresh: (refreshToken: string) =>
      this.request<AuthResponse>('/auth/refresh', { method: 'POST', body: JSON.stringify({ refreshToken }) }),
  };

  // ── Users ──
  users = {
    me: () => this.request<UserResponse>('/users/me'),
    getById: (id: string) => this.request<UserResponse>(`/users/${id}`),
    contractors: () => this.request<UserResponse[]>('/users/contractors'),
    updateProfile: (data: Partial<Pick<UserResponse, 'firstName' | 'lastName' | 'phone'>>) =>
      this.request<UserResponse>('/users/me', { method: 'PATCH', body: JSON.stringify(data) }),
  };

  // ── Properties ──
  properties = {
    list: () => this.request<PropertyResponse[]>('/properties'),
    getById: (id: string) => this.request<PropertyResponse>(`/properties/${id}`),
    create: (data: CreatePropertyInput) =>
      this.request<PropertyResponse>('/properties', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: UpdatePropertyInput) =>
      this.request<PropertyResponse>(`/properties/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
    delete: (id: string) =>
      this.request<void>(`/properties/${id}`, { method: 'DELETE' }),
    getUnits: (id: string) =>
      this.request<UnitResponse[]>(`/properties/${id}/units`),
    createUnit: (id: string, data: CreateUnitInput) =>
      this.request<UnitResponse>(`/properties/${id}/units`, { method: 'POST', body: JSON.stringify(data) }),
  };

  // ── Tickets ──
  tickets = {
    list: (params?: Record<string, string>) => {
      const qs = params ? '?' + new URLSearchParams(params).toString() : '';
      return this.request<PaginatedResponse<TicketResponse>>(`/tickets${qs}`);
    },
    getById: (id: string) =>
      this.request<TicketResponse>(`/tickets/${id}`),
    create: (data: CreateTicketInput) =>
      this.request<TicketResponse>('/tickets', { method: 'POST', body: JSON.stringify(data) }),
    updateStatus: (id: string, data: UpdateTicketStatusInput) =>
      this.request<TicketResponse>(`/tickets/${id}/status`, { method: 'PATCH', body: JSON.stringify(data) }),
    addComment: (id: string, data: CreateTicketCommentInput) =>
      this.request<TicketCommentResponse>(`/tickets/${id}/comments`, { method: 'POST', body: JSON.stringify(data) }),
    assign: (id: string, data: AssignTicketInput) =>
      this.request<TicketAssignmentResponse>(`/tickets/${id}/assign`, { method: 'POST', body: JSON.stringify(data) }),
  };

  // ── Documents ──
  documents = {
    list: (params?: Record<string, string>) => {
      const qs = params ? '?' + new URLSearchParams(params).toString() : '';
      return this.request<DocumentResponse[]>(`/documents${qs}`);
    },
    requestUpload: (data: RequestUploadInput) =>
      this.request<PresignedUrlResponse>('/documents/upload', { method: 'POST', body: JSON.stringify(data) }),
    getDownloadUrl: (id: string) =>
      this.request<{ downloadUrl: string }>(`/documents/${id}/download`),
    delete: (id: string) =>
      this.request<void>(`/documents/${id}`, { method: 'DELETE' }),
  };

  // ── Dashboard ──
  dashboard = {
    stats: () => this.request<DashboardStats>('/dashboard/stats'),
  };
}

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public details?: Record<string, string[]>,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}
