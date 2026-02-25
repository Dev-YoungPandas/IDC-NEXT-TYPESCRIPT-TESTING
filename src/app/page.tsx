import HomePage from '@/components/home/HomePage';

const photographers = [
  { name: 'Dan Max', slug: 'dan-max', image: 'https://images.unsplash.com/photo-1503673508983-5f2fbaf1df4d?w=800&auto=format&fit=crop&q=60', role: 'Photographer & Director' },
  { name: 'Yuki Sato', slug: 'yuki-sato', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=60', role: 'Photographer' },
  { name: 'Guy Coombes', slug: 'guy-coombes', image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&auto=format&fit=crop&q=60', role: 'Photographer' },
  { name: 'Camilla Rutherford', slug: 'camilla-rutherford', image: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&auto=format&fit=crop&q=60', role: 'Photographer' },
  { name: 'Dean Mackenzie', slug: 'dean-mackenzie', image: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&auto=format&fit=crop&q=60', role: 'Photographer' },
  { name: 'Sacha Stejko', slug: 'sacha-stejko', image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=60', role: 'Photographer' },
];

export default function Home() {
  return <HomePage photographers={photographers} />;
}