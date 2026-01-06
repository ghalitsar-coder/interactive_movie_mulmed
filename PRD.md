Ide proyek **Interactive Film** (seperti *Black Mirror: Bandersnatch*) ini sangat menarik. Karena Anda menggunakan Next.js, Anda punya fleksibilitas tinggi untuk mengatur *state* dan performa.

Berikut adalah **PRD (Product Requirements Document)** sederhana dan rekomendasi **Tech Stack**, termasuk strategi pengelolaan video dari tahap development (lokal) ke production (deploy).

---

###I. Tech Stack RecommendationUntuk performa video yang lancar tanpa *layout shift*, berikut rekomendasinya:

1. **Frontend Framework:** **Next.js (App Router)**.
* Alasan: *Server Components* memudahkan loading konfigurasi cerita, dan routing-nya cepat.


2. **Language:** **TypeScript**.
* Alasan: Sangat penting untuk mendefinisikan struktur data "alur cerita" (Graph) agar tidak salah menyambungkan video.


3. **Styling:** **Tailwind CSS**.
* Alasan: Cepat untuk membuat UI *overlay* (tombol pilihan) di atas video.


4. **State Management:** **Zustand** (atau React Context bawaan).
* Alasan: Anda perlu menyimpan *state* "Video apa yang sedang diputar", "History pilihan user", dan "Inventory" (jika nanti ada item yang mempengaruhi cerita).


5. **Animation:** **Framer Motion**.
* Alasan: Untuk transisi halus saat tombol pilihan muncul (fade-in) atau transisi antar video.



---

###II. Product Requirements Document (PRD)####1. Project OverviewMembuat aplikasi web interaktif berbasis video di mana pengguna menonton klip film dan membuat keputusan yang mengubah alur cerita selanjutnya.

####2. User Flow (Alur Pengguna)1. **Landing:** User masuk -> Klik "Start Movie".
2. **Playback:** Video Intro diputar (Video 1).
3. **Auto-Transition:** Video 1 selesai -> Otomatis lanjut ke Video 2.
4. **Decision Point:** Menjelang akhir Video 2, video berhenti (atau melambat/loop), muncul UI pilihan:
* Pilihan A (Menuju Video 2.a)
* Pilihan B (Menuju Video 2.b)


5. **Action:** User klik Pilihan A.
6. **Branching:** Video 2.a diputar.
7. **Ending:** Jika mencapai video tanpa percabangan (Ending), tampilkan tombol "Restart".

####3. Functional Requirements* **Video Player:** Harus support *autoplay* (dengan mute di awal jika browser memblokir), *fullscreen*, dan menyembunyikan kontrol bawaan browser (play/pause bar standard dihilangkan).
* **Seamless Transition:** Jeda antar video harus seminimal mungkin (buffer/preload video berikutnya).
* **Choice Overlay:** Tombol pilihan harus muncul di detik tertentu (misal: 5 detik sebelum video habis) atau setelah video selesai.
* **Logic Engine:** Sistem harus tahu video mana yang diputar berdasarkan ID video sebelumnya dan pilihan yang diambil.

####4. Data Structure (The "Story Graph")Ini adalah inti dari sistem Anda. Jangan hardcode `if-else` di kodingan. Buatlah file config (misal `story-data.ts`).

```typescript
// Contoh Struktur Data
type StoryNode = {
  id: string;
  videoSrc: string; // Nama file atau URL
  nextDefault?: string; // Jika tidak ada pilihan, lanjut ke sini
  choices?: {
    label: string;
    nextId: string;
  }[];
};

export const storyMap: Record<string, StoryNode> = {
  "video-1": {
    id: "video-1",
    videoSrc: "scene_01_intro.mp4",
    nextDefault: "video-2", // Otomatis lanjut tanpa pilihan
  },
  "video-2": {
    id: "video-2",
    videoSrc: "scene_02_conflict.mp4",
    choices: [
      { label: "Lari ke Hutan", nextId: "video-2a" },
      { label: "Sembunyi di Gudang", nextId: "video-2b" },
    ],
  },
  "video-2a": {
    id: "video-2a",
    videoSrc: "scene_02a_forest.mp4",
    // ... dan seterusnya
  }
};

```

---

###III. Strategi Penyimpanan Video (Local vs Deploy)Ini adalah tantangan utama. Video file ukurannya besar.

* **Masalah:** GitHub (tempat menyimpan kode) memiliki limit ukuran file (biasanya max 100MB per file, dan total repo 1GB). Jika Anda memaksa push video ke GitHub, deploy di Vercel akan gagal atau sangat lambat.

Berikut solusinya:

####Tahap 1: Development (Localhost)Simpan video di folder `public/videos`.

* Path: `my-project/public/videos/video-1.mp4`
* Akses di code: `<video src="/videos/video-1.mp4" />`

####Tahap 2: Production (Deployment)Anda **tidak boleh** menyimpan video di dalam folder coding saat deploy. Anda harus menggunakan **Object Storage** atau **Video Hosting**.

**Rekomendasi Hosting Video (Pilih satu):**

1. **Cloudinary / Mux (Terbaik untuk Video):** Otomatis optimasi streaming, tapi ada versi gratis terbatas.
2. **Supabase Storage / Firebase Storage (Murah/Gratis):** Seperti Google Drive tapi untuk aplikasi. Anda upload video ke sana, lalu dapatkan URL publiknya.
3. **AWS S3 / R2 (Professional):** Murah, tapi setup agak teknis.

####Cara Mengatur Kodingan (Environment Variables)Supaya Anda tidak perlu ubah-ubah kodingan saat ganti dari Local ke Deploy, gunakan teknik **Base URL**.

1. Buat file `.env.local` di root project:
```bash
# Saat di local, kosongkan atau arahkan ke public folder
NEXT_PUBLIC_VIDEO_HOST=""

# Nanti saat deploy di Vercel, ubah variable ini di dashboard Vercel menjadi:
# NEXT_PUBLIC_VIDEO_HOST="https://link-bucket-supabase-anda.com/storage/v1/object/public/videos"

```


2. Ubah cara memanggil video di komponen React Anda:
```tsx
const videoBaseUrl = process.env.NEXT_PUBLIC_VIDEO_HOST || '/videos';

// Di dalam JSX
<video src={`${videoBaseUrl}/${currentNode.videoSrc}`} autoPlay />

```



**Hasilnya:**

* Saat Anda ngoding di laptop: Next.js akan mencari file di folder `/public/videos/`.
* Saat dideploy: Next.js akan mengambil video dari URL Cloud Storage yang Anda setting, sehingga server aplikasi Anda ringan.

###IV. Langkah Selanjutnya (Next Step)Apakah Anda ingin saya buatkan **struktur folder Next.js nya** beserta **kodingan komponen "VideoPlayer"** utamanya yang bisa menangani logika percabangan tadi?