'use client';

import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api';
import type { PropertyResponse } from '@rentwizard/core';

export default function PropertiesPage() {
  const [properties, setProperties] = useState<PropertyResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.properties
      .list()
      .then(setProperties)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6 text-gray-400">Laden...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Immobilien</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {properties.map((p) => (
          <div key={p.id} className="bg-white rounded-lg shadow p-5 border border-gray-100">
            <h3 className="font-semibold text-lg">{p.name}</h3>
            <p className="text-sm text-gray-500 mt-1">{p.street}, {p.zipCode} {p.city}</p>
            <p className="text-xs text-gray-400 mt-2">{p._count?.units ?? 0} Einheiten</p>
          </div>
        ))}
        {properties.length === 0 && (
          <p className="text-gray-400 col-span-full text-center py-12">
            Keine Immobilien vorhanden
          </p>
        )}
      </div>
    </div>
  );
}
