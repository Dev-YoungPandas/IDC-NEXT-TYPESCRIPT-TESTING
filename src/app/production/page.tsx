// src/app/production/page.tsx
import { Metadata } from 'next';
import MenuOverlay from '@/components/home/Menuoverlay';
import ProductionSections from '@/components/ProductionSections/ProductionSections';
import CTASection from '@/components/dan-max/CTASection';
import Footer from '@/components/dan-max/Footer';

export const metadata: Metadata = {
  title: 'Production',
  description: 'IDC Production — World-class photography production in New Zealand.',
};

export default function Production() {
  return (
    <>
      <MenuOverlay />
      <ProductionSections />
      {/* <CTASection variant="subscribe" /> */}
      <Footer />
    </>
  );
}