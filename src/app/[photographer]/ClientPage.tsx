'use client';

import DanMaxPage from '@/components/dan-max/DanMaxPage';

export default function ClientPage({
  data,
  photographer,
}: {
  data: any;
  photographer: string;
}) {
  if (!data) return null;

  return <DanMaxPage data={data} photographer={photographer} />;

}