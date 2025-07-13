'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import LoadingAnimation from '@/components/LoadingAnimation';
import {
  Home,
  Trophy,
  Calendar,
  Star,
  BookOpen,
} from 'lucide-react';

import PlaylistContent from '@/components/venues/PlaylistContent';
import type { Venue } from '@/types/venue';
import { PlayListNameEnum } from '@/types/venue';
import fetchWithAuth from '@/lib/fetchWithAuth';


const VenueDashboardPage = () => {
  const { user, loading: authLoading } = useAuth();
  const { push } = useRouter();
    const params = useParams();
  const venueId = params?.venueId as string;
  const [venue, setVenue] = useState<Venue | null>(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchVenue = useCallback(() => {
    setIsLoading(true);
      fetchWithAuth(`/api/venue/getVenue/${venueId}`)
      .then(async (res) => {
        if (res.ok) {
          const { data } = await res.json();
          setVenue(data);
        } else {
          setVenue(null);
        }
      }).catch(() => {
        setError(true);
      })
      .finally(() => setIsLoading(false));

  }, [user]);

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        push('/signIn');
        return;
      } else {
        fetchVenue();
      }
    }

  }, [authLoading, user, push, fetchVenue]);

  const [activeTab, setActiveTab] = useState<PlayListNameEnum | 'Home'>('Home');

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
      // Handle no venue
      return;
    }

if (activeTab !== 'Home') {
  const currentPlaylist = venue.playlists.find(
    (pl) => pl.category === activeTab
  );

  if (currentPlaylist) {
    return (
      <PlaylistContent
        key={currentPlaylist.id}
        playlist={currentPlaylist}
        onUploadComplete={() => null}
      />
    );
  } else {
    return <p>No playlist for {activeTab}</p>;
  }
}
  }, [activeTab, venue]);


  if (authLoading) {
    return <LoadingAnimation />;
  }

  if (error) {
    return <p className="text-red-600">Some error occured</p>;
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


  if (!venue) {
    return (<p className="text-gray-700">Venue not found</p>);
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
};

export default VenueDashboardPage;
