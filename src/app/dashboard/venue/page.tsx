'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import LoadingAnimation from '@/components/LoadingAnimation';
import {
  Home,
  Trophy,
  Calendar,
  Star,
  BookOpen,
} from 'lucide-react';

import useSWR from 'swr';
import PlaylistContent from '@/components/venues/PlaylistContent';
import type { Venue, PlayList } from '@/types/venue';
import { PlayListNameEnum } from '@/types/venue';

const fetcher = (url: string): Promise<Venue> => {
  return fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json();
  });
};

const VenueDashboardPage = () => {
  const { user, loading: authLoading } = useAuth();
  const { push } = useRouter();
  const { data: venue, error, isLoading, mutate } = useSWR(
    user ? `/api/users/${user.uid}/venues` : null,
    fetcher
  );

  const [activeTab, setActiveTab] = useState<PlayListNameEnum | 'Home'>('Home');

  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!user) {
      push('/signIn');
      return;
    }

  }, [authLoading, user, push]);

  type TabName = PlayListNameEnum | 'Home';
  const tabs: { name: TabName; icon: React.FC<any> }[] = [
    { name: 'Home', icon: Home },
    { name: PlayListNameEnum.SPORTS, icon: Trophy },
    { name: PlayListNameEnum.EVENTS, icon: Calendar },
    { name: PlayListNameEnum.SPECIALS, icon: Star },
    { name: PlayListNameEnum.MENU, icon: BookOpen },
  ];

  const getPlayList = useMemo(() => {
    if (!venue) {
      return (<p className="text-gray-700">No venues assigned to your account.</p>)
    }

    if (activeTab === 'Home') {
      return (<p>Home</p>);
    }

    const currentPlaylist: PlayList = venue.playLists[activeTab as PlayListNameEnum];

    return (<PlaylistContent playlist={currentPlaylist} onUploadComplete={() => mutate()} />);
  }, [activeTab, venue]);


  if (authLoading) {
    return <LoadingAnimation />;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen pb-20">
        <div className="mt-24 flex justify-center">
          <LoadingAnimation
            overlay={false}
            avoidFixed={true}
            centered={true}
            size={80}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      <div className="space-y-4 px-4 pt-4">
        <h1 className="text-2xl font-bold">{venue?.name || 'My Venue'}</h1>
        <nav className="hidden md:flex space-x-4 border-b pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex items-center space-x-1 pb-1 cursor-pointer ${activeTab === tab.name ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'
                }`}
            >
              <tab.icon size={18} />
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>


        <div className="mt-4">
          {getPlayList}
        </div>
      </div>

      {/* Mobile Tab Bar */}
      <nav className="fixed bottom-0 inset-x-0 bg-white border-t md:hidden">
        <div className="flex justify-around py-2">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex flex-col items-center text-gray-600 ${activeTab === tab.name ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'
                }`}
            >
              <tab.icon size={20} />
              <span className="text-xs mt-1">{tab.name}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}

export default VenueDashboardPage;
