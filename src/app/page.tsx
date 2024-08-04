'use client';

import { useEffect } from 'react';
import { Banner } from '@/utils/types';
import AdBanner from '@/components/AdBanner';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { useGlobalContext } from '@/contexts/banners';

export default function Page() {
  const { bannersData, setBannersData } = useGlobalContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: Response = await fetch('/api');
        const result: { data: Banner[] } = await response.json();
        setBannersData(result.data);
      } catch (error) {
        console.error('Error fetching banner data:', error);
      }
    };

    fetchData();
  }, [setBannersData]);

  return (
    <MaxWidthWrapper className='my-8'>
      <div className='grid gap-4 sm:grid-cols-1 md:grid-cols-2'>
        {bannersData.length > 0 ? (
          bannersData.map((banner: Banner, index: number) => (
            <AdBanner
              key={banner.id}
              banner={banner}
              className="even:justify-self-start odd:justify-self-end"
            />
          ))
        ) : (
          <p>No banners available.</p>
        )}
      </div>
    </MaxWidthWrapper>
  );
  
}
