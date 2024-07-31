import { Banner } from '@/utils/types';
import { promises as fs } from 'fs';
import AdBanner from '@/components/AdBanner';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';

export default async function Home() {
  const file: string = await fs.readFile(process.cwd() + '/src/data/banner.json', 'utf8');
  const data: Banner[] = JSON.parse(file);

  const banners = data.map((banner: Banner) => {
    return (
      <AdBanner key={banner.id} {...banner} />
    )
  })
  return (
    <MaxWidthWrapper className='my-8'>
      <div className='grid gap-x-4 gap-y-4 sm:grid-cols-1 md:grid-cols-2'>
        {banners}
      </div>
    </MaxWidthWrapper>
  );
}
