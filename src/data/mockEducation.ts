import type { EducationContent } from '@/types/education';

const topics = ['Mata lelah','LASIK','Katarak','Retina','Glaukoma','Diabetes dan mata','Mata minus anak','Pascaoperasi'];
const titles = [
  'Benarkah wortel bisa menyembuhkan mata minus?','Kapan anak perlu cek mata?','Diabetes bisa merusak retina tanpa gejala',
  'LASIK sakit atau tidak?','Katarak harus tunggu matang?','Cara mengurangi mata lelah akibat layar'
];

export const mockEducation: EducationContent[] = Array.from({ length: 30 }, (_, i) => ({
  id: `e-${i + 1}`,
  title: titles[i % titles.length],
  category: topics[i % topics.length],
  summary: 'Konten ringkas dengan bahasa sederhana untuk keluarga Indonesia. AI hanya membantu edukasi awal.',
  mythFact: i % 2 === 0 ? 'Fakta' : 'Mitos',
}));
