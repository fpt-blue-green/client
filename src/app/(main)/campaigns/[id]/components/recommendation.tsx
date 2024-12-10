'use client';

import InfluencerList from '@/components/influencer-list';
import { Button } from '@/components/ui/button';
import config from '@/config';
import { useAuthBrand } from '@/hooks';
import Link from 'next/link';

const Recommendation = ({ id, brandId }: { id: string; brandId: string }) => {
  const { profile } = useAuthBrand();

  return (
    <div>
      {profile && brandId === profile.id && (
        <>
          <h3 className="text-xl font-semibold mb-6">Đề xuất cho bạn</h3>
          <div className="relative">
            <InfluencerList
              title=""
              className={
                profile.isPremium ? '' : 'relative after:absolute after:inset-0 after:bg-background/50 blur-md'
              }
              url={profile.isPremium ? `/Campaigns/${id}/recommend/influencers` : undefined}
            />
            {!profile.isPremium && (
              <Button
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                size="large"
                variant="gradient"
                asChild
              >
                <Link href={config.routes.brand.pricing}>Nâng cấp Premium</Link>
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
};
export default Recommendation;
