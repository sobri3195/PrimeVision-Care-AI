import type { Product } from '@/types/product';

const names = [
  'Voucher Cek Mata Umum','Voucher Screening LASIK','Voucher Retina Diabetes','Voucher Myopia Anak','Voucher Katarak Lansia',
  'Tetes Mata Lubricant','Kacamata Blue Light','Eye Mask','Paket Vitamin Mata','Paket Pemeriksaan Keluarga',
  'Paket Kontrol Pascaoperasi','Membership Family Eye Care'
];
const categories = ['Paket Pemeriksaan','Voucher Prime Center','Produk Mata Sehat','Kacamata & Aksesori','Anak & Myopia Care','Diabetes Eye Care','Pascaoperasi'];

export const mockProducts: Product[] = Array.from({ length: 50 }, (_, i) => ({
  id: `p-${i + 1}`,
  name: names[i % names.length],
  category: categories[i % categories.length],
  price: 50000 + i * 12000,
  discountPrice: 45000 + i * 10000,
  rating: Number((4 + (i % 10) / 20).toFixed(1)),
  soldCount: 40 + i * 7,
  description: 'Produk ini bukan pengganti pemeriksaan dokter. Voucher dapat digunakan di cabang Prime Center.',
  image: 'https://placehold.co/600x400?text=PrimeVision',
  isRecommended: i % 3 === 0,
  aiReason: 'Direkomendasikan berdasarkan hasil cek mata Anda.',
  stock: 10 + (i % 20),
  badge: ['Best Seller', 'AI Pick', 'Family Choice'][i % 3],
}));
