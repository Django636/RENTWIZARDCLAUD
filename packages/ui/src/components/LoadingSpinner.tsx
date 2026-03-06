import React from 'react';

export interface LoadingSpinnerProps {
  size?: number;
}

export function LoadingSpinner({ size = 24 }: LoadingSpinnerProps) {
  return React.createElement(
    'div',
    { style: { display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '16px' } },
    React.createElement('div', {
      style: {
        width: size, height: size,
        border: '3px solid #e5e7eb', borderTopColor: '#3b82f6',
        borderRadius: '50%', animation: 'spin 0.6s linear infinite',
      },
    }),
  );
}
