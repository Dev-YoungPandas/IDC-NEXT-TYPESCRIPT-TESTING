
import HomePage from "../components/home/HomePage"


const photographers = [
  {
    name: 'Dan Max',
    slug: 'dan-max',
    image: '/images/dan-max-thumb.jpg',
    role: 'Photographer & Director',
  },
  {
    name: 'Yuki Sato',
    slug: 'yuki-sato',
    image: '/images/yuki-sato-thumb.jpg',
    role: 'Photographer',
  },

  {
    name: 'Guy Coombes',
    slug: 'guy-coombes',
    image: '/images/yuki-sato-thumb.jpg',
    role: 'Photographer',
  },
  {
    name: 'Camilla Rutherford',
    slug: 'camilla-rutherford',
    image: '/images/yuki-sato-thumb.jpg',
    role: 'Photographer',
  },

  {
    name: 'Dean Mackenzie',
    slug: 'dean-mackenzie',
    image: '/images/yuki-sato-thumb.jpg',
    role: 'Photographer',
  },
];

export default function Home() {
  return <HomePage photographers={photographers} />;
}