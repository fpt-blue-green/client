'use client';

import { ChangeEvent, FC, ReactNode, useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { ControllerRenderProps, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { OfferBodyType, offerSchema } from '@/schema-validations/offer.schema';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ERole, PlatformData } from '@/types/enum';
import { Button } from './ui/button';
import { Input } from './ui/input';
import PriceInput from './custom/price-input';
import { Textarea } from './ui/textarea';
import { IPackage } from '@/types/offer';
import { useAuthBrand, useAuthInfluencer } from '@/hooks';
import ICampaign from '@/types/campaign';
import IInfluencer from '@/types/influencer';
import IBrand from '@/types/brand';
import { fetchRequest, offerRequest } from '@/request';
import { toast } from 'sonner';
import { constants, functions } from '@/lib/utils';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import config from '@/config';

interface OfferDialogProps extends OfferFormProps {
  children: ReactNode;
  title?: string;
  description?: string;
  asChild?: boolean;
}

const OfferDialog: FC<OfferDialogProps> = ({
  children,
  data,
  influencer,
  campaign,
  brand,
  title = 'Gửi một lời đề nghị',
  description,
  asChild,
}) => {
  const { profile: influencerProfile } = useAuthInfluencer();
  const { profile: brandProfile } = useAuthBrand();
  const showButton =
    (!influencerProfile && !brandProfile) || (influencerProfile && campaign) || (brandProfile && influencer);
  const showDialog =
    (influencerProfile &&
      campaign &&
      (!data || influencerProfile.channels.some((c) => c.platform === data.platform))) ||
    (brandProfile && influencer);

  const handleClick = () => {
    if (!influencerProfile && !brandProfile) {
      signIn();
    } else if (influencerProfile && data) {
      if (!influencerProfile.channels.some((c) => c.platform === data.platform)) {
        toast.warning('Bạn không đăng ký mạng xã hội ' + PlatformData[data.platform].name, {
          description: (
            <span>
              Cập nhật thông tin của bạn{' '}
              <Link href={config.routes.influencers.editProfile} className="underline">
                tại đây
              </Link>
            </span>
          ),
        });
      }
    }
  };

  return (
    <Dialog>
      {showButton && (
        <DialogTrigger asChild={asChild} onClick={handleClick}>
          {children}
        </DialogTrigger>
      )}
      {showDialog && (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <OfferForm data={data} influencer={influencer} campaign={campaign} brand={brand} />
        </DialogContent>
      )}
    </Dialog>
  );
};

interface OfferFormProps {
  data?: IPackage;
  campaign?: ICampaign;
  influencer?: IInfluencer;
  brand?: IBrand;
}

const OfferForm: FC<OfferFormProps> = ({ data, campaign, influencer, brand }) => {
  const { profile: influencerProfile } = useAuthInfluencer();
  const { profile: brandProfile } = useAuthBrand();
  const { data: brandCampaigns } = fetchRequest.campaign.currentBrand(!!brandProfile && !brand);
  const channels = influencer ? influencer.channels : influencerProfile?.channels;
  const [loading, setLoading] = useState(false);

  const time = () => {
    let timeUnit: 's' | 'm' | 'h' = 's';
    let duration: number | undefined = undefined;
    if (data?.duration) {
      const result = functions.convertSecondsToTime(data.duration);
      timeUnit = result.unit;
      duration = result.value;
    }
    return { timeUnit, duration };
  };

  const form = useForm<OfferBodyType>({
    resolver: zodResolver(offerSchema),
    defaultValues: {
      job: {
        campaignId: campaign?.id,
        influencerId: influencer?.id || influencerProfile?.id,
      },
      offer: {
        ...data,
        ...time(),
        description: '',
        from: influencer ? ERole.Brand : ERole.Influencer,
      },
    },
  });

  const onSubmit = (values: OfferBodyType) => {
    setLoading(true);
    offerRequest
      .createOffer(values)
      .then(() => toast.success('Đã gửi lời đề nghị tham gia của bạn'))
      .catch((err) => toast.error(err?.message || constants.sthWentWrong))
      .finally(() => setLoading(false));
  };

  const handleChange =
    (field: ControllerRenderProps<OfferBodyType>) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      let value = undefined;
      if (e.target.value) {
        if (e.target.type === 'number') {
          // Convert value into number
          value = +e.target.value;
        } else {
          value = e.target.value;
        }
      }
      field.onChange(value);
    };

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="job.campaignId"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="campaign">Chiến dịch</FormLabel>
              <FormControl>
                <Select {...field} onValueChange={field.onChange} disabled={!!campaign}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Chiến dịch" />
                  </SelectTrigger>
                  <SelectContent>
                    {campaign ? (
                      <SelectItem value={campaign.id}>{campaign.title}</SelectItem>
                    ) : (
                      brandCampaigns?.items.map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.title}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="offer.platform"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="platform">Nền tảng</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => {
                    field.onChange(+value);
                    setTimeout(() => form.resetField('offer.contentType', { defaultValue: +value * 10 }), 500);
                  }}
                  value={field.value?.toString()}
                >
                  <SelectTrigger id="platform" className="w-full">
                    <SelectValue placeholder="Nền tảng" />
                  </SelectTrigger>
                  <SelectContent>
                    {channels?.map((c) => {
                      const { Icon, name } = PlatformData[c.platform];
                      return (
                        <SelectItem key={c.platform} value={c.platform.toString()}>
                          <div className="flex items-center gap-2">
                            <Icon />
                            {name}
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-3 gap-3">
          <FormLabel className="col-span-full">Nội dung</FormLabel>
          <FormField
            control={form.control}
            name="offer.quantity"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormControl>
                  <Input
                    type="number"
                    className="w-full"
                    placeholder="Số lượng"
                    value={field.value || ''}
                    onChange={handleChange(field)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="offer.contentType"
            render={({ field }) => {
              const platform = form.watch('offer.platform');
              return (
                <FormItem className="col-span-2">
                  <FormControl>
                    <Select onValueChange={(value) => field.onChange(+value)} value={field.value?.toString() || ''}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Loại" />
                      </SelectTrigger>
                      <SelectContent>
                        {PlatformData[platform] &&
                          Object.entries(PlatformData[platform].contentTypes).map(([key, value]) => (
                            <SelectItem key={key} value={key}>
                              {value}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <FormLabel className="col-span-full">Thời lượng (tùy chọn)</FormLabel>
          <FormField
            control={form.control}
            name="offer.duration"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormControl>
                  <Input
                    type="number"
                    className="w-full"
                    placeholder="Thời lượng"
                    {...field}
                    value={field.value || ''}
                    onChange={handleChange(field)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="offer.timeUnit"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormControl>
                  <Select onValueChange={(value) => field.onChange(value)} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Đơn vị thời gian" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="s">giây</SelectItem>
                      <SelectItem value="m">phút</SelectItem>
                      <SelectItem value="h">giờ</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="offer.price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Giá</FormLabel>
              <FormControl>
                <PriceInput placeholder="Giá" {...field} fullWidth />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="offer.targetReaction"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Số lượt tương tác mục tiêu</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  className="w-full"
                  placeholder="Số lượt tương tác mục tiêu"
                  {...field}
                  value={field.value || ''}
                  onChange={handleChange(field)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="offer.description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lời nhắn</FormLabel>
              <FormControl>
                <Textarea placeholder="Lời nhắn" {...field} onChange={handleChange(field)} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost" loading={loading}>
              Huỷ
            </Button>
          </DialogClose>
          <Button type="submit" variant="gradient" loading={loading}>
            OK
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default OfferDialog;
