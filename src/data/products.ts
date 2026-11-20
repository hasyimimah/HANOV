import { CustomerReview, Product, SkinRoutineOption } from '../types/store';
import { STORE_IMAGES } from './images';

export const HANOV_PRODUCTS: Product[] = [
  {
    id: 'hanov-luminous-serum',
    name: 'HANOV Luminous Peptide & Niacinamide Serum',
    subtitle: 'Mencerahkan kusam, menyamarkan noda hitam & menghaluskan tekstur',
    category: 'skincare',
    categoryLabel: 'SERUM WAJAH',
    badge: 'Terlaris',
    image: STORE_IMAGES.prodSerum,
    rating: 4.9,
    soldCount: 1840,
    bpomNumber: 'BPOM NA18251901482',
    skinTypes: ['Semua Jenis Kulit', 'Kusam', 'Kombinasi', 'Sensitif'],
    concerns: ['mencerahkan', 'anti-aging'],
    description:
      'Serum konsentrat bertekstur ringan selembut sutra yang memadukan 5% Pharmaceutical-Grade Niacinamide, Acetyl Hexapeptide-8, dan Ekstrak White Camellia. Cepat meresap tanpa rasa lengket untuk mengembalikan kilau sehat alami kulit wajah di iklim tropis.',
    keyIngredients: [
      {
        name: '5% Niacinamide PC Grade',
        benefit: 'Meratakan warna kulit, mengontrol sebum berlebih, dan menyamarkan noda bekas jerawat tanpa memicu iritasi.',
      },
      {
        name: 'Biomimetic Peptide Complex',
        benefit: 'Merangsang elastisitas alami kulit sehingga wajah tampak kenyal, halus, dan bercahaya.',
      },
      {
        name: 'White Camellia Japonica Extract',
        benefit: 'Antioksidan botani tinggi untuk melindungi kulit dari radikal bebas dan polusi perkotaan.',
      },
    ],
    howToUse:
      'Teteskan 2–3 tetes serum pada telapak tangan atau wajah yang telah dibersihkan setelah pemakaian toner. Tepuk lembut hingga meresap sempurna. Gunakan pagi dan malam hari.',
    variants: [
      {
        id: 'serum-30ml',
        label: '30 ml (Reguler)',
        price: 189000,
      },
      {
        id: 'serum-50ml',
        label: '50 ml (Jumbo Value)',
        price: 269000,
        originalPrice: 305000,
      },
    ],
  },
  {
    id: 'hanov-ceramide-moisturizer',
    name: 'HANOV 5X Ceramide Cloud Barrier Cream',
    subtitle: 'Mengunci kelembapan 72 jam & memperbaiki skin barrier sensitif',
    category: 'skincare',
    categoryLabel: 'PELEMBAP WAJAH',
    badge: 'Terlaris',
    image: STORE_IMAGES.prodMoisturizer,
    rating: 4.9,
    soldCount: 1520,
    bpomNumber: 'BPOM NA18250103910',
    skinTypes: ['Kering', 'Sensitif', 'Normal', 'Kombinasi'],
    concerns: ['barrier', 'anti-aging'],
    description:
      'Krim gel-velvet yang meleleh lembut saat menyentuh kulit. Diformulasikan dengan 5 jenis Ceramide identik kulit, Panthenol (Pro-Vitamin B5), dan Hyaluronic Acid multi-molekul untuk meredakan kemerahan serta memperkuat pertahanan alami kulit.',
    keyIngredients: [
      {
        name: '5X Essential Ceramides',
        benefit: 'Memperbaiki lapisan pelindung kulit (skin barrier) yang rusak akibat eksfoliasi berlebih atau cuaca ekstrem.',
      },
      {
        name: 'D-Panthenol 3% & Allantoin',
        benefit: 'Menenangkan kulit kemerahan dan mengunci hidrasi mendalam sepanjang hari.',
      },
      {
        name: '8D Hyaluronic Acid',
        benefit: 'Menghidrasi hingga lapisan epidermis terdalam tanpa membuat wajah terasa berminyak.',
      },
    ],
    howToUse:
      'Ambil secukupnya menggunakan ujung jari bersih, ratakan pada wajah dan leher sebagai tahap pengunci kelembapan pada pagi maupun malam hari.',
    variants: [
      {
        id: 'cream-30g',
        label: '30 gr (Travel Friendly)',
        price: 165000,
      },
      {
        id: 'cream-50g',
        label: '50 gr (Full Size)',
        price: 229000,
        originalPrice: 259000,
      },
    ],
  },
  {
    id: 'hanov-lip-velvet',
    name: 'HANOV Botanical Silk Lip Velvet',
    subtitle: 'Hasil akhir powdery-matte lembut yang melembapkan bibir seharian',
    category: 'cosmetics',
    categoryLabel: 'KOSMETIK BIBIR',
    badge: 'Favorit',
    image: STORE_IMAGES.prodLipVelvet,
    rating: 4.9,
    soldCount: 2310,
    bpomNumber: 'BPOM NA18251302271',
    skinTypes: ['Semua Warna Kulit Indonesia', 'Bibir Kering'],
    concerns: ['makeup'],
    description:
      'Lipstik velvet-matte generasi terbaru yang diperkaya Rosehip Seed Oil, Squalane, dan Vitamin E. Pigmen intens dalam satu pulasan yang menutup garis bibir gelap dengan sempurna tanpa membuat bibir kering atau pecah-pecah.',
    keyIngredients: [
      {
        name: 'Organic Rosehip & Jojoba Oil',
        benefit: 'Menjaga kelembutan bibir agar tetap lembap dan nyaman dipakai hingga 10 jam.',
      },
      {
        name: 'Micro-Blurring Elastomer',
        benefit: 'Menyamarkan garis halus bibir untuk tampilan soft-focus velvet yang elegan.',
      },
      {
        name: 'Tocopherol (Vitamin E)',
        benefit: 'Menutrisi bibir dan mencegah penggelapan warna bibir alami.',
      },
    ],
    howToUse:
      'Aplikasikan tipis di bagian tengah bibir lalu baurkan ke tepi untuk efek blurred ombre Korea, atau pulaskan penuh untuk tampilan klasik profesional.',
    variants: [
      {
        id: 'shade-01-terracotta',
        label: '01 Terracotta Muse',
        price: 129000,
        colorHex: '#A65E4E',
      },
      {
        id: 'shade-02-rosewood',
        label: '02 Rosewood Tea',
        price: 129000,
        colorHex: '#B6726A',
      },
      {
        id: 'shade-03-nude-chai',
        label: '03 Warm Nude Chai',
        price: 129000,
        colorHex: '#C28A75',
      },
      {
        id: 'shade-04-berry-fig',
        label: '04 Deep Berry Fig',
        price: 129000,
        colorHex: '#8C4448',
      },
    ],
  },
  {
    id: 'hanov-skin-cushion',
    name: 'HANOV Radiant Breathable Cushion SPF 40 PA+++',
    subtitle: 'Coverage medium-to-full ringan dengan hasil satin-glow sehat',
    category: 'cosmetics',
    categoryLabel: 'COMPLEXION MAKEUP',
    badge: 'Baru',
    image: STORE_IMAGES.prodCushion,
    rating: 4.8,
    soldCount: 980,
    bpomNumber: 'BPOM NA18250300894',
    skinTypes: ['Normal', 'Kering', 'Kombinasi', 'Rentan Jerawat'],
    concerns: ['makeup', 'mencerahkan'],
    description:
      'Hybrid skincare-cushion non-komedogenik yang menyatu sempurna seperti kulit kedua. Menyamarkan kemerahan, pori-pori, dan noda hitam dengan hasil satin-dewy tahan 12 jam tanpa oksidasi berlebih.',
    keyIngredients: [
      {
        name: 'Centella Asiatica & Chamomile',
        benefit: 'Menenangkan kulit selama pemakaian makeup harian tanpa menyumbat pori-pori.',
      },
      {
        name: 'Niacinamide + UV Filter SPF 40 PA+++',
        benefit: 'Memberikan perlindungan ekstra terhadap sinar UVA/UVB sekaligus merawat kecerahan kulit.',
      },
      {
        name: 'Breathable Micro-Mesh Powder',
        benefit: 'Tekstur sangat ringan yang tahan keringat dan kelembapan udara tropis.',
      },
    ],
    howToUse:
      'Tekan puff perlahan pada bantalan cushion, lalu tepuk-tepuk merata ke seluruh wajah mulai dari area tengah wajah ke arah luar.',
    variants: [
      {
        id: 'cushion-01-ivory',
        label: '01 Porcelain Ivory (Light)',
        price: 215000,
        colorHex: '#F0D7C2',
      },
      {
        id: 'cushion-02-petal',
        label: '02 Natural Petal (Light-Medium)',
        price: 215000,
        colorHex: '#E5C2A6',
      },
      {
        id: 'cushion-03-sand',
        label: '03 Warm Sand (Medium Sawo Matang)',
        price: 215000,
        colorHex: '#D5AA87',
      },
      {
        id: 'cushion-04-honey',
        label: '04 Golden Honey (Tan Eksotis)',
        price: 215000,
        colorHex: '#BE8E68',
      },
    ],
  },
  {
    id: 'hanov-uv-sunscreen',
    name: 'HANOV Invisible Silk UV Essence SPF 50+ PA++++',
    subtitle: 'Tabir surya ringan tanpa whitecast, cepat meresap & tidak perih di mata',
    category: 'skincare',
    categoryLabel: 'PROTEKSI UV HARIAN',
    image: STORE_IMAGES.prodSunscreen,
    rating: 4.9,
    soldCount: 1690,
    bpomNumber: 'BPOM NA18251700518',
    skinTypes: ['Semua Jenis Kulit', 'Berminyak', 'Berjerawat', 'Sensitif'],
    concerns: ['anti-aging', 'barrier', 'jerawat'],
    description:
      'Sunscreen bertekstur water-essence ultra ringan yang teruji secara in-vitro dan in-vivo SPF 50+ PA++++. Bebas alkohol keras dan bebas whitecast sehingga nyaman digunakan di bawah makeup tanpa membuat wajah kusam atau berminyak.',
    keyIngredients: [
      {
        name: 'Next-Gen Encapsulated UV Filters',
        benefit: 'Perlindungan spektrum luas yang stabil terhadap sinar UVA & UVB pemicu flek hitam.',
      },
      {
        name: 'Green Tea & Heartleaf Extract',
        benefit: 'Meredakan panas pada kulit akibat paparan matahari dan mengontrol minyak berlebih.',
      },
      {
        name: 'Ectoin Perlindungan Polusi',
        benefit: 'Melindungi sel kulit dari stres oksidatif dan paparan blue light.',
      },
    ],
    howToUse:
      'Gunakan sebanyak 2 ruas jari penuh pada wajah dan leher 15 menit sebelum beraktivitas di luar ruangan. Ulangi pemakaian setiap 3–4 jam bila terpapar matahari langsung.',
    variants: [
      {
        id: 'sunscreen-40ml',
        label: '40 ml (Daily Tube)',
        price: 139000,
      },
      {
        id: 'sunscreen-twin',
        label: 'Twin Pack (2 x 40 ml)',
        price: 249000,
        originalPrice: 278000,
      },
    ],
  },
  {
    id: 'hanov-centella-cleanser',
    name: 'HANOV Gentle pH 5.5 Centella Amino Cleanser',
    subtitle: 'Pembersih wajah lembut bebas SLS yang tidak membuat kulit tertarik',
    category: 'skincare',
    categoryLabel: 'PEMBERSIH WAJAH',
    image: STORE_IMAGES.prodCleanser,
    rating: 4.8,
    soldCount: 1410,
    bpomNumber: 'BPOM NA18251204115',
    skinTypes: ['Sensitif', 'Berjerawat', 'Kering', 'Kombinasi'],
    concerns: ['jerawat', 'barrier'],
    description:
      'Facial cleanser berbusa mikro lembut dengan pH seimbang (5.2–5.6) yang membersihkan debu, sisa sunscreen, dan minyak berlebih secara menyeluruh tanpa mengikis kelembapan alami kulit.',
    keyIngredients: [
      {
        name: 'Pure Madagascar Centella Asiatica',
        benefit: 'Menenangkan jerawat meradang dan mengurangi kemerahan sejak langkah pencucian wajah.',
      },
      {
        name: 'Coconut-Derived Amino Surfactant',
        benefit: 'Pembersih alami bebas SLS/SLES yang sangat ramah bagi kulit sensitif.',
      },
      {
        name: 'PCA & Glycerin Humectant',
        benefit: 'Menjaga kulit tetap kenyal dan lembap sesudah dibilas air.',
      },
    ],
    howToUse:
      'Basahi wajah, keluarkan 1–2 pump ke telapak tangan, busakan dengan sedikit air, pijat lembut memutar selama 45 detik lalu bilas hingga bersih.',
    variants: [
      {
        id: 'cleanser-120ml',
        label: '120 ml (Pump Bottle)',
        price: 115000,
      },
    ],
  },
  {
    id: 'hanov-botanical-toner',
    name: 'HANOV Calming Calendula & PHA Essence Toner',
    subtitle: 'Menyeimbangkan pH, menghidrasi instan & mengangkat sel kulit mati lembut',
    category: 'skincare',
    categoryLabel: 'ESSENCE TONER',
    image: STORE_IMAGES.prodToner,
    rating: 4.9,
    soldCount: 1120,
    bpomNumber: 'BPOM NA18251204892',
    skinTypes: ['Kusam', 'Berminyak', 'Kombinasi', 'Sensitif'],
    concerns: ['mencerahkan', 'jerawat', 'barrier'],
    description:
      'Essence toner bertekstur cair sedikit kental yang menggabungkan seduhan kelopak Calendula, Galactomyces Ferment Filtrate, dan 1.5% Gluconolactone (PHA) untuk merawat pori-pori dan mempersiapkan kulit menerima nutrisi serum secara optimal.',
    keyIngredients: [
      {
        name: 'Calendula Officinalis Extract',
        benefit: 'Menenangkan kulit lelah dan menjaga keseimbangan mikrobioma kulit.',
      },
      {
        name: '1.5% PHA (Gluconolactone)',
        benefit: 'Eksfoliasi generasi lembut yang menghaluskan komedo halus tanpa rasa cekit-cekit.',
      },
      {
        name: 'Galactomyces Ferment Filtrate',
        benefit: 'Memberikan efek glass-skin yang sehat, cerah, dan segar.',
      },
    ],
    howToUse:
      'Tuangkan secukupnya pada telapak tangan atau kapas halus, tepuk perlahan ke seluruh permukaan wajah dan leher setiap habis mencuci muka.',
    variants: [
      {
        id: 'toner-150ml',
        label: '150 ml (Glass Bottle)',
        price: 149000,
      },
    ],
  },
  {
    id: 'hanov-complete-ritual-bundle',
    name: 'HANOV Complete Glass-Skin Ritual Set (4-in-1)',
    subtitle: 'Paket lengkap perawatan pagi & malam untuk kulit sehat bercahaya',
    category: 'bundling',
    categoryLabel: 'PAKET BUNDLING EKSKLUSIF',
    badge: 'Paket Hemat',
    image: STORE_IMAGES.prodBundle,
    rating: 5.0,
    soldCount: 865,
    bpomNumber: 'BPOM Resmi Terdaftar (4 Produk)',
    skinTypes: ['Semua Jenis Kulit', 'Hadiah Spesial / Gift Set'],
    concerns: ['mencerahkan', 'barrier', 'anti-aging'],
    description:
      'Rangkaian lengkap 4 tahap esensial HANOV dalam satu paket hemat eksklusif: Gentle Centella Cleanser (120ml), Calming Essence Toner (150ml), Luminous Peptide Serum (30ml), dan 5X Ceramide Cloud Barrier Cream (30gr). Pilihan terbaik untuk hasil maksimal dalam 14–28 hari pemakaian rutin maupun kado istimewa.',
    keyIngredients: [
      {
        name: 'Sinergi 4 Langkah Dermatologis',
        benefit: 'Membersihkan, menyeimbangkan, mencerahkan, dan mengunci pertahanan kulit secara menyeluruh.',
      },
      {
        name: 'Hemat Rp 139.000 + Gratis Ongkir',
        benefit: 'Lebih ekonomis dibandingkan pembelian satuan serta dikemas dalam box eksklusif HANOV.',
      },
    ],
    howToUse:
      'Urutan pemakaian: 1. Centella Cleanser -> 2. Calming Essence Toner -> 3. Luminous Peptide Serum -> 4. 5X Ceramide Cloud Cream (tambahkan UV Essence Sunscreen di pagi hari).',
    variants: [
      {
        id: 'bundle-4in1',
        label: 'Paket 4-in-1 Lengkap + Gift Box',
        price: 479000,
        originalPrice: 618000,
      },
      {
        id: 'bundle-5in1-uv',
        label: 'Paket 5-in-1 Lengkap (+ Sunscreen)',
        price: 589000,
        originalPrice: 757000,
      },
    ],
  },
];

export const SKIN_ROUTINE_OPTIONS: SkinRoutineOption[] = [
  {
    id: 'routine-glow',
    title: 'Kulit Kusam & Noda Hitam',
    subtitle: 'Fokus mencerahkan warna kulit tidak merata & bekas jerawat (PIH)',
    description:
      'Kombinasi PHA lembut, 5% Niacinamide + Peptide, serta proteksi SPF 50+ membantu memudarkan tampilan kusam dan menjaga wajah tampak cerah merata.',
    morningTip: 'Gunakan Essence Toner + Luminous Serum + Invisible Silk Sunscreen setiap pagi.',
    nightTip: 'Gunakan Essence Toner + Luminous Serum + Ceramide Cloud Cream sebelum tidur.',
    recommendedProductIds: [
      'hanov-botanical-toner',
      'hanov-luminous-serum',
      'hanov-uv-sunscreen',
    ],
  },
  {
    id: 'routine-barrier',
    title: 'Kulit Kering & Skin Barrier Rusak',
    subtitle: 'Fokus meredakan kemerahan, mengelupas, & mengunci hidrasi mendalam',
    description:
      'Rangkaian ultra-gentle bebas alkohol keras dan bebas SLS dengan pH 5.5 serta 5X Ceramide Complex untuk memulihkan kenyamanan kulit sejak pemakaian pertama.',
    morningTip: 'Cuci wajah dengan Centella Cleanser, aplikasikan Ceramide Cream & Sunscreen.',
    nightTip: 'Lapisi Luminous Serum dan 2 lapis tipis Ceramide Cloud Cream (moisture sandwich).',
    recommendedProductIds: [
      'hanov-centella-cleanser',
      'hanov-ceramide-moisturizer',
      'hanov-uv-sunscreen',
    ],
  },
  {
    id: 'routine-acne',
    title: 'Berminyak, Pori & Rentan Jerawat',
    subtitle: 'Fokus mengontrol sebum berlebih, menenangkan kemerahan & komedo',
    description:
      'Tekstur water-light non-komedogenik dengan Centella Asiatica, Heartleaf, dan Niacinamide menjaga pori-pori tetap bersih tanpa memicu jerawat baru.',
    morningTip: 'Centella Cleanser + Essence Toner + Sunscreen ringan bebas minyak.',
    nightTip: 'Centella Cleanser + Essence Toner + Ceramide Cloud Cream tipis merata.',
    recommendedProductIds: [
      'hanov-centella-cleanser',
      'hanov-botanical-toner',
      'hanov-uv-sunscreen',
    ],
  },
  {
    id: 'routine-daily-glam',
    title: 'Makeup Sehat & Skincare-Infused',
    subtitle: 'Tampilan segar natural seharian tanpa menyumbat pori-pori',
    description:
      'Persiapkan kanvas kulit yang lembap dengan Ceramide Cream lalu sempurnakan dengan Radiant Breathable Cushion dan pulasan Botanical Silk Lip Velvet.',
    morningTip: 'Aplikasikan pelembap tipis 3 menit sebelum menepuk Radiant Cushion.',
    nightTip: 'Bersihkan wajah dengan lembut dan kunci hidrasi bibir & wajah di malam hari.',
    recommendedProductIds: [
      'hanov-ceramide-moisturizer',
      'hanov-skin-cushion',
      'hanov-lip-velvet',
    ],
  },
];

export const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    name: 'Nadia Pramesti',
    city: 'Jakarta Selatan',
    skinType: 'Kulit Kombinasi & Sensitif',
    productPurchased: 'Luminous Peptide Serum & 5X Ceramide Cream',
    rating: 5,
    comment:
      'Teksturnya mewah sekali tapi ringan dipakai di cuaca Jakarta. Baru habis setengah botol serumnya, bekas jerawat kemerahan jauh memudar dan muka kelihatan sehat glowing. Pesan lewat WA admin HANOV juga super ramah & cepat!',
    date: '2 minggu lalu',
  },
  {
    id: 'rev-2',
    name: 'Aurelia Larasati',
    city: 'Bandung',
    skinType: 'Kulit Kering',
    productPurchased: 'Botanical Silk Lip Velvet (01 Terracotta Muse)',
    rating: 5,
    comment:
      'Shade 01 Terracotta Muse cantik banget di kulit kuning langsat sampai sawo matang! Beneran lembut seperti beludru dan sama sekali nggak bikin bibir kering pecah-pecah walaupun dipakai seharian di kantor.',
    date: '1 minggu lalu',
  },
  {
    id: 'rev-3',
    name: 'drg. Karina Putri',
    city: 'Surabaya',
    skinType: 'Kulit Berminyak & Mudah Berjerawat',
    productPurchased: 'Complete Glass-Skin Ritual Set (4-in-1)',
    rating: 5,
    comment:
      'Ambil paket bundling 4-in-1 karena pengen rutinitas yang simpel tapi jelas BPOM-nya. Cleanser dan tonernya adem banget di wajah, kemasannya rapi dan aman sampai Surabaya. Pasti repeat order di HANOV.',
    date: '5 hari lalu',
  },
];
