'use client';

import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api';
import type { DocumentResponse } from '@rentwizard/core';

export default function DocumentsPage() {
  const [docs, setDocs] = useState<DocumentResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.documents
      .list()
      .then(setDocs)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleDownload = async (id: string) => {
    const { downloadUrl } = await apiClient.documents.getDownloadUrl(id);
    window.open(downloadUrl, '_blank');
  };

  if (loading) return <div className="p-6 text-gray-400">Laden...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dokumente</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-gray-500">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Typ</th>
              <th className="px-4 py-3">Größe</th>
              <th className="px-4 py-3">Datum</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {docs.map((d) => (
              <tr key={d.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{d.name}</td>
                <td className="px-4 py-3 text-gray-500">{d.type}</td>
                <td className="px-4 py-3 text-gray-400">{(d.size / 1024).toFixed(0)} KB</td>
                <td className="px-4 py-3 text-gray-400">
                  {new Date(d.createdAt).toLocaleDateString('de-DE')}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleDownload(d.id)}
                    className="text-blue-600 hover:underline text-xs"
                  >
                    Download
                  </button>
                </td>
              </tr>
            ))}
            {docs.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-400">
                  Keine Dokumente vorhanden
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
