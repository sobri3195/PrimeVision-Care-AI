import type { FamilyMember } from '@/types/user';

export const mockFamilyMembers: FamilyMember[] = [
  { id: 'fm-1', name: 'Saya', age: 31, relation: 'Diri sendiri', riskScore: 48, reminder: 'Kontrol 2 minggu lagi', recommendation: 'Kurangi screen time dan cek 3 bulan.' },
  { id: 'fm-2', name: 'Ayah', age: 62, relation: 'Ayah', riskScore: 72, reminder: 'Screening katarak bulan ini', recommendation: 'Booking katarak dan cek tekanan mata.' },
  { id: 'fm-3', name: 'Ibu', age: 59, relation: 'Ibu', riskScore: 55, reminder: 'Kontrol retina 1 bulan lagi', recommendation: 'Lanjutkan kontrol diabetes eye care.' },
  { id: 'fm-4', name: 'Anak', age: 11, relation: 'Anak', riskScore: 61, reminder: 'Myopia control 3 minggu lagi', recommendation: 'Tambah aktivitas outdoor 90 menit/hari.' },
  { id: 'fm-5', name: 'Nenek', age: 71, relation: 'Kakek/Nenek', riskScore: 80, reminder: 'Kontrol segera minggu ini', recommendation: 'Segera periksa karena penglihatan menurun.' },
];
