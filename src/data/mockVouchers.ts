export const mockVouchers = Array.from({ length: 20 }, (_, i) => ({
  id: `v-${i + 1}`,
  title: ['Voucher cek mata Rp50.000', 'Diskon screening LASIK', 'Diskon retina screening', 'Diskon paket keluarga'][i % 4],
  code: `PRIME${1000 + i}`,
  expiry: `2026-06-${String((i % 27) + 1).padStart(2, '0')}`,
  active: i % 5 !== 0,
}));
