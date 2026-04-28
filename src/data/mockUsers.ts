import type { User, Booking } from '@/types/user';

const segments = ['Masyarakat umum', 'Orang tua anak minus', 'Pasien diabetes', 'Calon pasien LASIK', 'Lansia', 'Pekerja layar'];

export const mockUsers: User[] = Array.from({ length: 100 }, (_, i) => ({
  id: `u-${i + 1}`,
  name: i === 0 ? 'Rina' : `User ${i + 1}`,
  age: 18 + (i % 55),
  segment: segments[i % segments.length],
  points: 120 + i * 10,
  streak: 1 + (i % 10),
}));

export const mockBookings: Booking[] = Array.from({ length: 10 }, (_, i) => ({
  id: `b-${i + 1}`,
  complaint: ['Mata buram', 'Kontrol pascaoperasi', 'Mata kering'][i % 3],
  branch: ['Prime Center Nana Rohana', 'Prime Center A. Yani', 'Prime Center Aksara', 'Prime Executive'][i % 4],
  service: ['Pemeriksaan Mata Umum', 'Screening LASIK', 'Retina Diabetes Screening', 'Myopia Anak'][i % 4],
  date: `2026-05-${String((i % 9) + 1).padStart(2, '0')}`,
  time: `${8 + (i % 8)}:00`,
  status: 'Terjadwal',
}));
