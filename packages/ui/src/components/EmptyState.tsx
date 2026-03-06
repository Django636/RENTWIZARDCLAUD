import React from 'react';

export interface EmptyStateProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return React.createElement(
    'div',
    { style: { textAlign: 'center' as const, padding: '48px 16px' } },
    React.createElement('h3', { style: { fontSize: '18px', fontWeight: 600, color: '#111827' } }, title),
    description && React.createElement('p', { style: { marginTop: '8px', fontSize: '14px', color: '#6b7280' } }, description),
    action && React.createElement('div', { style: { marginTop: '16px' } }, action),
  );
}
