import React from 'react';

const PRIORITY_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  LOW: { bg: '#f3f4f6', text: '#6b7280', label: 'Niedrig' },
  MEDIUM: { bg: '#dbeafe', text: '#1d4ed8', label: 'Mittel' },
  HIGH: { bg: '#fef3c7', text: '#b45309', label: 'Hoch' },
  URGENT: { bg: '#fee2e2', text: '#dc2626', label: 'Dringend' },
};

export interface PriorityBadgeProps {
  priority: string;
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  const style = PRIORITY_STYLES[priority] ?? { bg: '#f3f4f6', text: '#374151', label: priority };

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
      },
    },
    style.label,
  );
}
