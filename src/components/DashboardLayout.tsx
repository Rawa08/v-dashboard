'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isAdmin } = useAuth();

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h1 className="text-xl font-bold mb-6">Dashboard</h1>
        <nav className="flex flex-col space-y-2">
          {isAdmin ? (
            <>
              <Link href="/dashboard/admin" className="hover:underline">
                Admin
              </Link>
              <Link href="/dashboard/admin/users" className="hover:underline">
                Users
              </Link>
              <Link href="/dashboard/admin/venues" className="hover:underline">
                Venues
              </Link>
            </>
          ) : (
            <Link href="/dashboard/venue" className="hover:underline">
              My Venue
            </Link>
          )}
        </nav>
      </aside>

      <main className="flex-1 p-6 bg-gray-50">{children}</main>
    </div>
  );
}
