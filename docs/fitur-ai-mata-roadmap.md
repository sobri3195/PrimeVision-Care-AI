# Rekomendasi Fitur Lengkap untuk PrimeVision Care AI

Dokumen ini berisi saran fitur end-to-end untuk mengembangkan aplikasi skrining dan pendampingan kesehatan mata berbasis AI agar lebih komprehensif, aman, dan siap scale.

## 1) Fitur Klinis (Prioritas Tinggi)

### 1.1 Triage gejala berbasis tingkat urgensi
- Klasifikasi hasil menjadi: **darurat (hari ini)**, **cepat (1-3 hari)**, **rutin (1-4 minggu)**.
- Red flag: nyeri hebat mendadak, penurunan visus mendadak, kilatan/cairan hitam, trauma, mata merah + mual.
- CTA dinamis: tombol langsung ke IGD/telemedis/booking klinik.

### 1.2 Skrining penyakit mata lebih luas
- Glaukoma (faktor risiko + reminder cek tekanan bola mata dan OCT).
- Retinopati diabetik (durasi DM, HbA1c, riwayat kontrol retina).
- Katarak (silau malam, penurunan kontras, progresif bilateral).
- Mata kering (screen-time, lingkungan AC, lensa kontak, kualitas tidur).
- Miopia progresif anak (usia, durasi near-work, waktu outdoor).

### 1.3 Baseline visual function di rumah
- Tes ketajaman visual sederhana (Snellen-like adaptif).
- Tes Amsler grid (deteksi distorsi makula).
- Tes kontras sederhana (screen-calibrated).
- Penyimpanan tren hasil per pengguna/per mata.

## 2) Fitur AI Kamera (Prioritas Tinggi-Menengah)

### 2.1 Quality gate sebelum analisis
- Deteksi pencahayaan buruk, blur, framing salah, refleksi berlebih.
- Tidak memproses jika kualitas kurang; tampilkan panduan retake otomatis.

### 2.2 Multi-sinyal non-diagnostik
- Skor kemerahan sklera.
- Estimasi kelelahan visual (blink rate, eye opening trend).
- Deteksi asimetri ringan kelopak/konjungtiva sebagai insight awal.

### 2.3 Explainability ringan
- Tampilkan "faktor yang paling memengaruhi skor".
- Confidence band (rendah/sedang/tinggi) agar pengguna paham batas AI.

## 3) Fitur Personalisasi & Habit Engine

### 3.1 Rencana harian personal
- Program 20-20-20 adaptif berdasar pola screen-time aktual.
- Reminder berkedip, hidrasi, jeda fokus, dan pencahayaan ruang.
- Mode kerja malam: rekomendasi kontras, font-size, dan break cadence.

### 3.2 Coaching berbasis profil risiko
- Jalur khusus: pekerja layar, anak sekolah, penderita DM, pasca-LASIK.
- Notifikasi cerdas: frekuensi dinamis (tidak spam) berdasar kepatuhan.

### 3.3 Gamifikasi klinis ringan
- Streak kebiasaan sehat mata.
- Badge untuk kepatuhan kontrol rutin.
- Tantangan keluarga (orang tua + anak) untuk outdoor time.

## 4) Fitur Care Journey & Integrasi Layanan

### 4.1 Booking dan rujukan terarah
- Rekomendasi tipe layanan: refraksi, retina, glaukoma, dry-eye clinic.
- Pre-triage summary otomatis untuk dokter.

### 4.2 Timeline kesehatan mata
- Riwayat skor risiko, gejala, hasil tes rumah, dan kunjungan.
- Alert jika tren memburuk selama 2-4 minggu.

### 4.3 Integrasi wearable dan device
- Integrasi opsional screen-time OS, sleep tracker, dan ambient light.
- Korelasi perilaku harian dengan gejala mata.

## 5) Fitur Keamanan, Privasi, dan Kepatuhan

### 5.1 Privasi by design
- Consent granular per fitur (kamera, analitik, data keluarga).
- Enkripsi data in-transit dan at-rest.
- Retensi data terukur + tombol hapus data permanen.

### 5.2 Guardrail medis
- AI tidak memberikan diagnosis final.
- Red-flag escalation wajib tampil di semua mode analisis.
- Jalur cepat ke dokter saat skor risiko melewati ambang.

### 5.3 Auditability
- Logging keputusan model (tanpa data sensitif berlebih).
- Versioning model dan policy agar mudah investigasi.

## 6) Fitur untuk Dokter/Klinik (B2B2C)

### 6.1 Dashboard klinik
- Ringkasan pasien berisiko tinggi per minggu.
- Daftar follow-up yang terlewat.

### 6.2 Clinical summary generator
- Ringkasan 1 halaman: gejala, faktor risiko, tren, hasil tes rumah.
- Ekspor PDF untuk EMR/manual upload.

### 6.3 Outcome tracking
- Bandingkan rekomendasi AI vs hasil pemeriksaan klinis aktual.
- Monitoring false-alarm dan missed-risk.

## 7) KPI Produk yang Disarankan

- Aktivasi pengguna 7 hari pertama.
- Completion rate cek AI dan retake rate kamera.
- Persentase pengguna mengikuti rekomendasi kebiasaan.
- Rasio deteksi red-flag yang berujung konsultasi nyata.
- Retensi 30/90 hari dan dampak terhadap perbaikan gejala.

## 8) Roadmap Implementasi Bertahap

### Fase 1 (0-2 bulan)
- Triage red-flag + CTA klinik.
- Quality gate kamera + edukasi retake.
- Timeline risiko sederhana + reminder 20-20-20.

### Fase 2 (2-4 bulan)
- Tes visual rumah (VA + Amsler).
- Habit coaching adaptif per profil.
- Clinical summary untuk booking.

### Fase 3 (4-8 bulan)
- Dashboard klinik dan feedback loop outcome.
- Personalisasi berbasis tren jangka panjang.
- Optimasi model untuk subgroup (usia/komorbid).

## 9) Prinsip Utama Implementasi

1. **Safety-first**: selalu prioritaskan deteksi red-flag dan rujukan cepat.
2. **Human-in-the-loop**: AI sebagai pendamping keputusan, bukan pengganti dokter.
3. **Actionable**: setiap insight wajib punya langkah lanjut yang jelas.
4. **Measurable**: setiap fitur memiliki KPI klinis dan produk.
