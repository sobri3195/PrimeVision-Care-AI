import type { EyeCheckInput } from '@/types/eyeCheck';

export function recommendProductKeywords(input: Partial<EyeCheckInput>) {
  const recs = new Set<string>();
  if (input.dryEye) recs.add('Tetes Mata Lubricant');
  if ((input.screenTime ?? 0) > 8) recs.add('Kacamata Blue Light');
  if (input.diabetes) recs.add('Voucher Retina Diabetes');
  if (input.lasikInterest) recs.add('Voucher Screening LASIK');
  if ((input.age ?? 30) < 18 && input.glasses) recs.add('Voucher Myopia Anak');
  if ((input.age ?? 30) >= 60) recs.add('Voucher Katarak Lansia');
  if (input.postOpStatus) recs.add('Paket Kontrol Pascaoperasi');
  return Array.from(recs);
}
