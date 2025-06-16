'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import LoadingAnimation from './LoadingAnimation';

type ImageItem = {
  id: string;
  url: string;
  createdAt: string;
};

type Props = {
  venueId: string;
};

export default function Gallery({ venueId }: Props) {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGallery = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/venues/${venueId}/images`);
      if (!res.ok) {
        throw new Error('Failed to fetch images');
      }
      const data = await res.json();
      setImages(data);
    } catch (err) {
      console.error('Error fetching images:', err);
      setError('Could not load images.');
    } finally {
      setLoading(false);
    }
  }, [venueId]);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (!isMounted) {
        return;
      }
      await fetchGallery();
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [fetchGallery]);

  const galleryItems = useMemo(() => {
    return images.map((img) => {
      return (
        <div key={img.id} className="border rounded shadow">
          <img src={img.url} alt={`Venue Image ${img.id}`} className="w-full h-auto rounded-t" />
          <div className="text-xs text-gray-600 p-1 text-center">
            {new Date(img.createdAt).toLocaleDateString()}
          </div>
        </div>
      );
    });
  }, [images]);

  if (loading) {
    return (<LoadingAnimation />);
  }

  if (error) {
    return (<p className="text-red-600">{error}</p>);
  }

  if (images.length === 0) {
    return (<p>No images found.</p>);
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
      {galleryItems}
    </div>
  );
}
