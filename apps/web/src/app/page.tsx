'use client';

import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api';
import type { DashboardStats } from '@rentwizard/core';

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.dashboard.stats()
      .then(setStats)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <KpiCard title="Offene Vorgänge" value={stats?.openTickets ?? 0} color="blue" />
        <KpiCard title="Dringende Vorgänge" value={stats?.urgentTickets ?? 0} color="red" />
        <KpiCard title="Immobilien" value={stats?.totalProperties ?? 0} color="green" />
        <KpiCard title="Belegungsrate" value={`${stats?.occupancyRate ?? 0}%`} color="purple" />
      </div>

      {/* Recent Tickets */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Aktuelle Vorgänge</h2>
        {stats?.recentTickets && stats.recentTickets.length > 0 ? (
          <div className="space-y-3">
            {stats.recentTickets.map((ticket) => (
              <div key={ticket.id} className="flex items-center justify-between border-b pb-3">
                <div>
                  <p className="font-medium">{ticket.title}</p>
                  <p className="text-sm text-gray-500">{ticket.category} · {ticket.priority}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  ticket.status === 'OPEN' ? 'bg-blue-100 text-blue-700' :
                  ticket.status === 'ESCALATED' ? 'bg-red-100 text-red-700' :
                  ticket.status === 'IN_PROGRESS' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {ticket.status}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Keine offenen Vorgänge</p>
        )}
      </div>
    </div>
  );
}

function KpiCard({ title, value, color }: { title: string; value: string | number; color: string }) {
  const colors: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    red: 'bg-red-50 text-red-700 border-red-200',
    green: 'bg-green-50 text-green-700 border-green-200',
    purple: 'bg-purple-50 text-purple-700 border-purple-200',
  };
  return (
    <div className={`rounded-lg border p-4 ${colors[color]}`}>
      <p className="text-sm font-medium opacity-80">{title}</p>
      <p className="text-3xl font-bold mt-1">{value}</p>
    </div>
  );
}
