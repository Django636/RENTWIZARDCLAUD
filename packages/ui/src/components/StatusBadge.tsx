import React from 'react';

const STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  OPEN: { bg: '#dbeafe', text: '#1d4ed8', label: 'Offen' },
  IN_PROGRESS: { bg: '#fef3c7', text: '#b45309', label: 'In Bearbeitung' },
  WAITING_FOR_PARTS: { bg: '#fce7f3', text: '#be185d', label: 'Warten auf Teile' },
  ESCALATED: { bg: '#fee2e2', text: '#dc2626', label: 'Eskaliert' },
  RESOLVED: { bg: '#d1fae5', text: '#059669', label: 'Gelöst' },
  CLOSED: { bg: '#f3f4f6', text: '#6b7280', label: 'Geschlossen' },
};

export interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const style = STATUS_STYLES[status] ?? { bg: '#f3f4f6', text: '#374151', label: status };

  return React.createElement(
    'span',
    {
      style: {
        backgroundColor: style.bg,
        color: style.text,
        padding: '2px 10px',
        borderRadius: '9999px',
        fontSize: '12px',
        fontWeight: 600,
        textTransform: 'uppercase' as const,
        letterSpacing: '0.05em',
        whiteSpace: 'nowrap' as const,
      },
    },
    style.label,
  );
}
