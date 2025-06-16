'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import Link from 'next/link';
import { useState } from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isAdmin } = useAuth();
  const { push } = useRouter();
  const [showSidebar, setShowSidebar] = useState(false);

  const handleNavClick = () => {
    if(showSidebar){
      setShowSidebar(false);
    }
  };

  const handleSignOut = () => {
    handleNavClick();
    signOut(auth).then(() => push('/signIn'));
  };

  const menuItems = (
    <>
      {isAdmin ? (
        <>
          <Link href="/dashboard/admin" onClick={handleNavClick} className="hover:underline">Admin</Link>
          <Link href="/dashboard/admin/users" onClick={handleNavClick} className="hover:underline">Users</Link>
          <Link href="/dashboard/admin/venues" onClick={handleNavClick} className="hover:underline">Venues</Link>
        </>
      ) : (
        <Link href="/dashboard/venue" onClick={handleNavClick} className="hover:underline">My Venue</Link>
      )}
    </>
  );

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="p-4 md:hidden bg-gray-800 text-white flex justify-between items-center">
        <h1 className="text-lg font-bold">Dashboard</h1>
        <button onClick={() => setShowSidebar(true)} aria-label="Open menu">
          ☰
        </button>
      </div>

      <aside className="hidden md:block w-64 bg-gray-800 text-white p-4 flex flex-col justify-between">
        <div>
          <h1 className="text-xl font-bold mb-6">Dashboard</h1>
          <nav className="flex flex-col space-y-2">
            {menuItems}
          </nav>
        </div>
        <button
          onClick={handleSignOut}
          className="mt-6 text-left text-red-300 hover:text-red-600 hover:underline cursor-pointer"
        >
          Sign out
        </button>
      </aside>

      {showSidebar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden" onClick={() => setShowSidebar(false)}>
          <aside
            className="w-64 h-full bg-gray-800 text-white p-4 flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-bold">Dashboard</h1>
                <button onClick={() => setShowSidebar(false)} aria-label="Close menu">✕</button>
              </div>
              <nav className="flex flex-col space-y-2">
                {menuItems}
              </nav>
            </div>
            <button
              onClick={handleSignOut}
              className="mt-6 text-left text-red-300 hover:text-red-500 hover:underline"
            >
              Sign out
            </button>
          </aside>
        </div>
      )}

      <main className="flex-1 p-6 bg-gray-50">{children}</main>
    </div>
  );
}
