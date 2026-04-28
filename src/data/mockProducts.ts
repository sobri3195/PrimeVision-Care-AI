import type { Product } from '@/types/product';

const baseProducts = [
  { name: 'Tetes Mata Lubricant Hyaluron', category: 'Produk Mata Sehat', price: 79000, discountPrice: 69000, badge: 'Best Seller' },
  { name: 'Kacamata Blue Light Flexi Pro', category: 'Kacamata & Aksesori', price: 199000, discountPrice: 149000, badge: 'AI Pick' },
  { name: 'Masker Mata Hangat Reusable', category: 'Kacamata & Aksesori', price: 119000, discountPrice: 89000, badge: 'Family Choice' },
  { name: 'Paket Vitamin Lutein + Zeaxanthin', category: 'Produk Mata Sehat', price: 149000, discountPrice: 129000, badge: 'Best Seller' },
  { name: 'Voucher Screening LASIK Prime', category: 'Voucher Prime Center', price: 350000, discountPrice: 299000, badge: 'AI Pick' },
  { name: 'Voucher Fundus Retina Diabetes', category: 'Diabetes Eye Care', price: 425000, discountPrice: 359000, badge: 'AI Pick' },
  { name: 'Paket Myopia Control Anak 3 Bulan', category: 'Anak & Myopia Care', price: 1250000, discountPrice: 1099000, badge: 'Family Choice' },
  { name: 'Kacamata Anak Anti-Radiasi', category: 'Anak & Myopia Care', price: 249000, discountPrice: 199000, badge: 'Best Seller' },
  { name: 'Paket Pemeriksaan Mata Lengkap', category: 'Paket Pemeriksaan', price: 550000, discountPrice: 449000, badge: 'Best Seller' },
  { name: 'Paket Family Eye Check (4 Orang)', category: 'Paket Pemeriksaan', price: 1700000, discountPrice: 1399000, badge: 'Family Choice' },
  { name: 'Paket Kontrol Pascaoperasi 1 Bulan', category: 'Pascaoperasi', price: 650000, discountPrice: 590000, badge: 'AI Pick' },
  { name: 'Membership Family Eye Care Tahunan', category: 'Pascaoperasi', price: 2900000, discountPrice: 2499000, badge: 'Family Choice' },
];

export const mockProducts: Product[] = Array.from({ length: 48 }, (_, i) => {
  const base = baseProducts[i % baseProducts.length];

  return {
    id: `p-${i + 1}`,
    name: i < baseProducts.length ? base.name : `${base.name} - Batch ${Math.floor(i / baseProducts.length) + 1}`,
    category: base.category,
    price: base.price + Math.floor(i / 12) * 10000,
    discountPrice: base.discountPrice + Math.floor(i / 12) * 8000,
    rating: Number((4.2 + (i % 8) * 0.1).toFixed(1)),
    soldCount: 60 + i * 9,
    description: 'Produk ini bukan pengganti pemeriksaan dokter. Voucher dapat digunakan di cabang Prime Center.',
    image: 'https://placehold.co/600x400?text=PrimeVision',
    isRecommended: i % 3 === 0,
    aiReason: 'Direkomendasikan berdasarkan hasil cek mata Anda.',
    stock: 15 + (i % 18),
    badge: base.badge,
  };
});
