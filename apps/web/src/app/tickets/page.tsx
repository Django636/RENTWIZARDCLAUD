'use client';

import { useState } from 'react';
import { useTickets } from '@/hooks/useTickets';

export default function TicketsPage() {
  const [statusFilter, setStatusFilter] = useState<string | undefined>();
  const { data, isLoading } = useTickets(
    statusFilter ? { status: statusFilter } : undefined,
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Vorgänge</h1>
        <a
          href="/tickets/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
        >
          + Neuer Vorgang
        </a>
      </div>

      <div className="flex gap-2 mb-4">
        {['OPEN', 'IN_PROGRESS', 'ESCALATED', 'RESOLVED', 'CLOSED'].map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(statusFilter === s ? undefined : s)}
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              statusFilter === s ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-gray-400">Laden...</div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-500">
              <tr>
                <th className="px-4 py-3">Titel</th>
                <th className="px-4 py-3">Kategorie</th>
                <th className="px-4 py-3">Priorität</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Erstellt</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {data?.data?.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{ticket.title}</td>
                  <td className="px-4 py-3 text-gray-500">{ticket.category}</td>
                  <td className="px-4 py-3">{ticket.priority}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                      ticket.status === 'OPEN' ? 'bg-blue-100 text-blue-700' :
                      ticket.status === 'ESCALATED' ? 'bg-red-100 text-red-700' :
                      ticket.status === 'IN_PROGRESS' ? 'bg-yellow-100 text-yellow-700' :
                      ticket.status === 'RESOLVED' ? 'bg-green-100 text-green-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-400">
                    {new Date(ticket.createdAt).toLocaleDateString('de-DE')}
                  </td>
                </tr>
              ))}
              {(!data?.data || data.data.length === 0) && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-gray-400">
                    Keine Vorgänge gefunden
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
