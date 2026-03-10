// ============================================
// FILE: app/categories/page.tsx (Categories - Server Component)
// ============================================

import { Metadata } from 'next';
import CategoriesPage from '@/components/categories/CategoriesPage';
import MenuOverlay from '@/components/home/Menuoverlay';
import Footer from '@/components/dan-max/Footer';
import CTASection from '@/components/dan-max/CTASection';

export const metadata: Metadata = {
  title: 'Categories',
  description:
    'Get a feel for what we do — Beauty, Still + Products, Landscapes, Lifestyle, Portraits, Fashion, Sports, Food + Beverage and more.',
};

// ─── Category data from WordPress ─────────────────────────────────────
const CATEGORIES = [
  {
    title: 'Beauty',
    count: 52,
    href: '/beauty',
    image:
      'https://idc.yp-studio.com/media/2025/04/04054705/Carnelion_02-1-scaled-1.jpg',
    alt: 'Carnelion',
  },
  {
    title: 'Still + Products',
    count: 57,
    href: '/still-life-product',
    image:
      'https://idc.yp-studio.com/media/2025/04/04054819/Yuki-cover-fallback-image-scaled-1.jpg',
    alt: 'Yuki Sato - Photographers',
  },
  {
    title: 'Landscapes',
    count: 58,
    href: '/landscape',
    image:
      'https://idc.yp-studio.com/media/2025/02/05104522/menu-image.jpg',
    alt: 'Camilla Rutherford Photographer Director Videographer',
  },
  {
    title: 'Lifestyle',
    count: 95,
    href: '/lifestyle',
    image:
      'https://idc.yp-studio.com/media/2025/02/05104522/lifestyle-3.jpg',
    alt: 'Lifestyle',
  },
  {
    title: 'Portraits',
    count: 43,
    href: '/portraits',
    image:
      'https://idc.yp-studio.com/media/2025/04/04055014/Obsidian_02_bw-1-1-scaled-1.jpg',
    alt: 'Obsidian',
  },
  {
    title: 'People In Places',
    count: 67,
    href: '/people-in-places',
    image:
      'https://idc.yp-studio.com/media/2025/02/05104522/CRPCaltex_Shot_3_0236_GRADED_branding-removed_FLAT_optimized.jpg',
    alt: 'CRPCaltex',
  },
  {
    title: 'Kids + Young People',
    count: 39,
    href: '/young-people',
    image:
      'https://idc.yp-studio.com/media/2025/04/04053957/DOW_Goodfolk_Capricare_May23-4812_optimized.jpg',
    alt: 'toddler_drinking_goat_milk',
  },
  {
    title: 'Fashion',
    count: 64,
    href: '/fashion',
    image:
      'https://idc.yp-studio.com/media/2025/04/04055424/Style_Summer_6_optimized.jpg',
    alt: 'Style Summer',
  },
  {
    title: 'Sports',
    count: 34,
    href: '/sport',
    image:
      'https://idc.yp-studio.com/media/2025/04/04055616/ASB-Classic_Naomi_Osaka__2_optimized-1.jpg',
    alt: 'ASB Classic Naomi Osaka',
  },
  {
    title: 'Food + Beverage',
    count: 29,
    href: '/food-and-beverage',
    image:
      'https://idc.yp-studio.com/media/2025/04/04055721/Rosebank-A-A_optimized.jpg',
    alt: 'Rosebank A',
  },
];

export default function Categories() {
  return (
    <>
      <div className='bg-white '>
        <MenuOverlay />
        <CategoriesPage categories={CATEGORIES} />

      </div>


      <div className='w-full  h-[131vh] xl:h-[177vh]'>
        <div className='mt-[-3.5vw] xl:bg-white'>
          <CTASection />
        </div>

        <div className='fixed w-full bottom-0 z-[-1]'>
          <Footer />
        </div>
      </div>

    </>
  );
}