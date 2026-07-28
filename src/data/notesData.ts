export interface NoteSection {
  title: string;
  points: string[];
  examTips?: string;
}

export interface BidangNote {
  bidangId: string;
  code: string;
  title: string;
  summary: string;
  topics: NoteSection[];
}

export const BIDANG_NOTES: Record<string, BidangNote> = {
  sectionA: {
    bidangId: 'sectionA',
    code: 'BIDANG 1',
    title: 'Sejarah dan Apresiasi Seni Visual (KSSM Tingkatan 1-5)',
    summary: 'Bahan bacaan lengkap Teori Seni K1 SPM susunan Cg. Din Asmad: Perkembangan Seni Visual, Ragam Hias, Pakaian Tradisional, Alat Kebesaran Diraja, Seni Bina & Rumah Ibadat.',
    topics: [
      {
        title: '1. Perkembangan Seni Visual di Malaysia (Tingkatan 1)',
        points: [
          'Tokoh Seni Halus Sebelum Merdeka: Abdullah Ariff (Pelokus aliran Impresionisme "Bumi Yang Bahagia"), Chuah Thean Teng (Pelopor Catan Batik "Tell You a Secret"), Mohamed Hoessein Enas (Bapa Potret Malaysia, Pengasas APS 1956), Anthony Lau (Pengarca "Ayam Jantan" 1963).',
          'Tokoh Seni Halus Pasca Merdeka: Redza Piyadasa (Konstruktivisme/Minimalis "The Haji Family"), Zulkifli Yusoff (Pengarca "Bunga Raya"), Juhari Said (Pelukis Cetak "Baju Kurung dan Secawan Kopi"), Ibrahim Hussein (Mempelopori teknik Printage "My Father and The Astronaut").',
          'Pertumbuhan & Persatuan Seni: Sebelum Merdeka - Penang Impressionist Society (1920-an), Wednesday Art Group (1952, Peter Harris). Selepas Merdeka - Angkatan Pelukis SeMalaysia (APS 1958, Mohamed Hoessein Enas), Persatuan Pelukis Malaysia (PPM 1979, Syed Ahmad Jamal).',
          'Institusi Seni: SITC (1922 - Tanjung Malim), STTI (1960 - Cheras), ITM (1967 - kini UiTM), USM (1972 - Jabatan Seni), Limkokwing University (2007).',
          'Tokoh Seni Reka: Zulkifli Haron (Reka Bentuk Teknologi), Haji Hashim Hassan (Bapa Logo Hari Kebangsaan), Jimmy Choo (Reka Bentuk Fesyen/Kasut - Gelaran Profesor & Order of British Empire 2002), Hassan Abdul Muthalib (Seni Reka Animasi "Sang Kancil"), Ahmad Hj. Zainuddin (Komunikasi Visual MRM), Lim Kok Wing (Teknologi Kreatif).',
          'Tokoh Kraf Tempatan: Yusoff Hj. Abdullah (Batik), Zamari @ Zamri Pandak (Tembikar/Labu Sayong), Hj. Abd Rahman Long & Norhaiza Noordin (Ukiran Kayu), Hjh. Habibah Zikri & Hjh. Natipah Abd Kadir (Tenunan Songket/Limar), Aminah Hj. Amat & Ishak Kassim (Anyaman Rombong/Rotan), Hjh. Azizah Mohd Yusof & Ainatishah Bilal Din (Tekatan Emas).',
          'Institusi Seni Kraf: PKKM (Perbadanan Kemajuan Kraftangan Malaysia 1979) & IKN (Institut Kraf Negara 2001).'
        ],
        examTips: 'Kerap keluar SPM: Bezakakan tokoh sebelum merdeka (Abdullah Ariff, Hoessein Enas) & pasca merdeka (Redza Piyadasa, Ibrahim Hussein). Gelaran Jimmy Choo dan pengasas APS (Hoessein Enas).'
      },
      {
        title: '2. Seni Ragam Hias Pengangkutan, Alat Permainan & Domestik (Tingkatan 2)',
        points: [
          'Pengangkutan Tradisional: Beca (asal perkataan Hokkien "be chia" = kereta kuda), Kereta Lembu, Perahu Tradisional.',
          'Bahagian Perahu Tradisional: Koyan (mengikat tali kemudi), Bangau (mengikat layar, sauh & tiang layar), Okok (bahagian kanan hadapan perahu), Caping (nadi perahu bentuk segitiga/bujur sirih). Tokoh: Hasni bin Ali (Tukang Ulung Perahu Terengganu).',
          'Alat Permainan Rakyat: Wau (Wau Bulan, Wau Burung, Wau Kucing - motif flora & awan larat). Adiguru: Shafie bin Jusoh (Kelantan, Duta MAS). Gasing (Gasing Pangkah & Gasing Uri). Congkak (papan kayu motif awan larat & flora).',
          'Alat Domestik: Rehal (papan bersilang membaca al-Quran), Acuan Putu (papan kayu ukiran bunga/daun), Jebak Puyuh (memerangkap puyuh - motif sulur bayung & tebuk tembus bersilat), Kukuran (mata bergerigi mengukur kelapa).'
        ],
        examTips: 'Ingat fungsi "Bangau" pada perahu (ikat layar & sauh) dan "Caping" (nadi perahu).'
      },
      {
        title: '3. Pakaian Tradisional dan Perhiasan Diri (Tingkatan 3)',
        points: [
          'Melayu Lelaki: Baju Sikap (berleher cekak musang, 1 butang), Baju Melayu Cekak Musang (5 butang sejajar), Baju Melayu Teluk Belanga (1 butang, leher berkedut). Perhiasan: Tengkolok/Tanjak, Samping (dagang luar/dalam), Capal, Butang Baju.',
          'Melayu Wanita: Baju Kurung Kedah (leher teluk belanga + kalung papan), Baju Kebaya (berbelah hadapan + kerongsang ibu & anak 3 sejajar), Baju Kurung Riau Pahang (pesak gantung + dokoh), Baju Kurung Teluk Belanga (ombak mengalun).',
          'Perhiasan Wanita Melayu: Gendik (pemanis dahi), Pending (kepala tali pinggang), Dokoh (perhiasan dahi/dada), Cucuk Sanggul, Kerongsang Berantai, Subang, Tali Pinggang.',
          'Kaum Cina: Ceongsam (wanita - kolar cekak musang, butang serong), Samfu (lelaki - baju & seluar, kamcing). Perhiasan: Gelang tangan, Cincin.',
          'Kaum India: Doti & Jippa (lelaki - kain lilit pinggang + thundu di bahu), Sari (wanita - kain ela lilit tubuh). Perhiasan: Gelang tangan, Gelang kaki, Perhiasan kepala.',
          'Etnik Iban Sarawak: Lelaki - Baju Burung/Gagung, Sirat, Lampit, Ilang (pedang), Ketapu (hiasan kepala bulu burung kenyalang/ruai), Tumpa. Wanita - Sugu Tinggi (hiasan kepala perak), Marik Empang, Rawai, Kain Karap, Buah Pauh, Tating Kain, Gerunchung Kaki.',
          'Etnik Kadazan Sabah: Wanita - Sia (baju), Gonop (kain), Rupia/Lupia (pinggang), Bolilit (gelang), Soundung, Siung (topi). Lelaki Papar - Sia, Souva (seluar panjang), Sandai (selempang bahu), Sigal (penutup kepala).',
          'Tokoh Budaya Pakaian: Prof. Dr. Siti Zainon Ismail ("Pakaian Cara Melayu") & Sharifah Azah Syed Mohd Alsagoff / Azah Aziz ("Rupa & Gaya : Busana Melayu").'
        ]
      },
      {
        title: '4. Alat Kebesaran dan Perhiasan Diraja (Tingkatan 4)',
        points: [
          'Cogan Alam: Perak berhias keris emas. Simbol keteguhan & keutuhan kesepaduan negeri-negeri di Malaysia.',
          'Cogan Agama: Perak berhulu bulat bertulis ayat Al-Quran. Simbol kesepaduan berteraskan Islam.',
          'Keris Panjang Diraja: Keris utama dalam istiadat pertabalan. Simbol kebesaran dan kekuasaan.',
          'Cokmar: Dua batang tongkat perang perak berhaluan kubah. Simbol kekuasaan dan kekuatan.',
          'Senjata Diraja Lain: Keris Panjang, Pedang & Sundang Diraja (3 senjata Melayu lama), Payung Ubur-Ubur Kuning (lambang kebesaran raja), Tombak Berambu.',
          'Pakaian Rasmi Diraja: Tengkolok Diraja (solek "Dendam Tak Sudah" - berasal dari Negeri Sembilan), Muskat (pakaian rasmi Yang di-Pertuan Agong bercorak awan larat emas), Mess Kit (pakaian santai rasmi ber-Epolet & Aiquillette).',
          'Perhiasan Diraja: Pending Diraja (emas bertatah permata), Keris Pendek Diraja (hulu gading bertatah emas), Gandik Diraja (tiara Raja Permaisuri Agong), Kalung Diraja (rantai leher berlian).'
        ],
        examTips: 'Solek Tanjak Diraja YDPA ialah "Dendam Tak Sudah" (berasal dari Negeri Sembilan). Cogan Alam vs Cogan Agama sering ditanya perbezaannya!'
      },
      {
        title: '5. Seni Bina Warisan, Rumah Ibadat, Istana & Makam (Tingkatan 5)',
        points: [
          'Rumah Tradisional Melayu: Ciri utama - bertiang, berpanggung, bertangga, bumbung curam tinggi, perabong panjang. Komponen: Anjung/Serambi (sambut tetamu), Rumah Ibu (ruang utama/tidur/solat), Dapur, Pelantar, Pemeleh, Tebar Layar, Kekisi.',
          '11 Bentuk Rumah Melayu: 1. Rumah Bujang/Tunggal, 2. Rumah Berpeleh, 3. Rumah Perabong Panjang, 4. Rumah Minangkabau (bumbung lentik), 5. Rumah Tiang Dua Belas, 6. Rumah Serambi Melaka (tangga batu warna-warni), 7. Rumah Bumbung Perak, 8. Rumah Kutai/Potong Pattani (ragam hias lebah bergantung), 9. Rumah Limas/Baju Kurung, 10. Rumah Perabong Lima, 11. Rumah Panjang (Sarawak).',
          'Rumah Ibadat - Masjid: Masjid Kampung Laut (Tumpat, Kelantan - masjid tertua di Asia Tenggara, bumbung limas 3 tingkat, teknik tebuk pasak tanpa paku), Masjid Sultan Salahuddin Abdul Aziz Shah (Shah Alam - kubah terbesar), Masjid Ubudiah (Kuala Kangsar - gaya Saracenic/India-Islam), Masjid Tengkera (Melaka - bumbung pagoda), Masjid Negara (Kuala Lumpur - menara sekaki payung kuncup & bumbung payung terbuka).',
          'Rumah Ibadat Lain: Gereja St. Paul (Melaka - tertua di Malaysia, batu laterit) & St. Anthony (KL); Tokong Sam Poh Tong (Perak - gua batu kapur) & Wat Phothivihan (Kelantan - patung Buddha berbaring 40m); Kuil Sri Mahamariamman (KL - gopuran 5 tingkat) & Batu Caves (Selangor - tangga 272 anak tangga & patung Dewa Murugan 42.7m); Gurdwara Sahib Tatt Khalsa (KL).',
          'Istana Warisan: Istana Negara (KL), Istana Maziah (Kuala Terengganu), Istana Iskandariah (Kuala Kangsar, Perak - gaya Saracenic), Istana Seri Menanti (Negeri Sembilan - dibina oleh Tukang Kahar & Tukang Taib tanpa sebarang paku besi!).',
          'Kompleks Makam: Makam Diraja Mahmoodiah (Johor), Makam Diraja Langgar (Kedah), Makam Diraja Jugra (Selangor).'
        ],
        examTips: 'Soalan popular SPM: Masjid Kampung Laut (tanpa paku, tebuk pasak) & Istana Seri Menanti (4 tingkat, pasak kayu tanpa paku besi).'
      }
    ]
  },
  sectionB: {
    bidangId: 'sectionB',
    code: 'BIDANG 2',
    title: 'Bahasa Seni Visual & Pemikiran Seni Visual KSSM',
    summary: 'Rangkuman lengkap 6 Unsur Seni, 7 Prinsip Rekaan, Tajuk & Mesej, Motif, Idea & Konsep, serta Designomic (Teori Reka Bentuk Sejagat).',
    topics: [
      {
        title: '1. 6 Unsur Seni Asas',
        points: [
          '1. Garisan: Kesan titik bergerak. Jenis: nipis, tebal, melengkung, beralun, bersudut, putus-putus, berpancar, berlingkar. Fungsi: menghasilkan rupa, bentuk, jalinan, dan ruang.',
          '2. Rupa: Pertemuan hujung garisan dengan permulaannya (2D). Rupa Organik (bebas tanpa sudut) vs Rupa Geometri (bersudut, guna alat geometri). Olahan Rupa: Rupa Positif, Rupa Negatif, Tindanan, Tambahan, Pengurangan.',
          '3. Bentuk: Objek 3D berisipadu (panjang x lebar x tinggi). Bentuk Konkrit (nyata, boleh disentuh 3D cth: arca/pasu) vs Bentuk Ilusi (gambaran 2D pada lukisan/catan/foto).',
          '4. Jalinan: Sifat permukaan objek. Jalinan Sentuh (dapat dirasa dengan tangan cth: durian, kulit kayu) vs Jalinan Tampak (hanya dapat dilihat cth: corak tembikai, corak batik).',
          '5. Ruang: Jarak antara objek. Ruang Nyata/Fizikal (Terbuka - padang/pantai; Tertutup - bilik/rumah) vs Ruang Ilusi (Rata, Dalam - ada perspektif, Cetek).',
          '6. Warna: Warna Primer/Asas (Merah, Kuning, Biru), Warna Sekunder (Oren, Hijau, Ungu), Warna Tertier (campuran Asas + Sekunder). Ton Warna (gelap ke terang), Kroma Warna (ukuran kemurnian), Warna Neutral (Hitam, Putih, Kelabu). Gubahan Warna: Warna Sewarna/Monokrom, Warna Harmoni (bersebelahan roda warna), Warna Penggenap (bertentangan roda warna).'
        ]
      },
      {
        title: '2. 7 Prinsip Rekaan',
        points: [
          '1. Harmoni: Penyatuan unsur seni yang tersusun, teratur dan bersesuaian tanpa unsur yang bercanggah.',
          '2. Kontra: Penentangan unsur seni secara mendadak (cth: warna panas vs sejuk, saiz besar vs kecil) untuk menarik perhatian.',
          '3. Penegasan: Tumpuan utama (focal point) dalam sesuatu gubahan yang kelihatan lebih ketara.',
          '4. Imbangan: Kesamaan dan kesepadanan gubahan. Terbahagi kepada Imbangan Simetri (kiri & kanan sama) dan Imbangan Tidak Simetri / Asimetri.',
          '5. Kepelbagaian: Penggabungan pelbagai elemen seni untuk menghasilkan variasi dan mengelakkan kebosanan.',
          '6. Kesatuan: Penggabungan semua unsur seni secara harmoni membentuk gubahan yang lengkap dan sepadan.',
          '7. Irama dan Pergerakan: Susunan unsur seni secara berulang-ulang untuk menimbulkan kesan pergerakan visual.'
        ]
      },
      {
        title: '3. Tajuk dan Mesej (Tingkatan 1)',
        points: [
          'Definisi Tajuk: Judul dan fokus sesuatu karya untuk menggambarkan mesej yang ingin disampaikan.',
          'Definisi Mesej: Makna atau maksud tersurat dan tersirat yang terkandung dalam karya seni.',
          '3 Komponen Karya: 1. Hal Benda (imej/subjek pilihan), 2. Bentuk (unsur seni & prinsip rekaan), 3. Kandungan (makna, sosiologi, politik, nilai estetik).',
          'Teknik Konvensional (terikat cara tradisi cth: Juhari Said "Katak Hendak Jadi Lembu") vs Teknik Kontemporari (kreatif, inovatif, media campuran cth: Mohd Raduan Man "Dancing With Nature").'
        ]
      },
      {
        title: '4. Motif, Idea dan Konsep (Tingkatan 1)',
        points: [
          'Motif: Hal benda/subjek yang diaplikasikan oleh pengkarya sebagai hiasan atau tema.',
          'Idea: Buah fikiran yang tercetus hasil pemerhatian, rangsangan, atau perbincangan.',
          'Konsep: Idea yang terbentuk hasil gabungan pelbagai nilai yang dihayati daripada alam sekeliling.',
          '4 Kaedah Pembentukan: Pemerhatian, Penerokaan, Persepsi, Pertimbangan Estetik & Analisis.',
          '4 Sumber Inspirasi Motif: Flora, Fauna, Geometri, Kosmos.',
          'Faktor Kontekstual Konsep: Pengalaman, Pendidikan, Isu Semasa Dunia Seni, Persekitaran.'
        ]
      },
      {
        title: '5. Designomic (Tingkatan 1)',
        points: [
          'Definisi Designomic: Gabungan perkataan Design (seni reka) + Economic (ekonomi) yang berkaitan kebolehgunaan dan kebolehpasaran produk komersial.',
          'Tujuan: Memperlihatkan daya tarikan tinggi, ciri keunikan bagi tujuan keusahawanan & menambah fungsi rekaan.',
          'Teori Reka Bentuk Sejagat (Universal Design Theory) - 7 Prinsip Utama: 1. Mampu guna, 2. Fleksibel, 3. Penggunaan mudah & intuitif, 4. Daya penyampaian maklumat mudah, 5. Kesilapan minimum, 6. Rendah keupayaan fizikal, 7. Kesesuaian & kecukupan saiz serta ruang.'
        ]
      }
    ]
  },
  sectionC: {
    bidangId: 'sectionC',
    code: 'BIDANG 3',
    title: 'Seni Halus (Lukisan, Catan, Cetakan, Arca) KSSM SPM',
    summary: 'Rangkuman padat 4 cabang Utama Seni Halus: Media Kering Lukisan, Bahantara & Teknik Catan, 4 Kaedah Cetakan & Bentuk Arca.',
    topics: [
      {
        title: '1. Seni Lukisan (Tingkatan 2, 3, 4, 5)',
        points: [
          'Definisi: Karya 2D menggunakan media kering (pensel, krayon, pastel, arang/charcoal, pen, dakwat, kapur).',
          'Lukisan Gua Tempatan (Berusia 3000-4000 tahun): Gua Tambun (Perak), Gua Kain Hitam Niah (Sarawak), Gua Merapoh (Pahang).',
          'Pelukis & Karya Tempatan: Abdullah Ariff ("The Long Arm Nippon" 1942), Saidin Yahya (Komik "Puteri Langkawi" 1954), Mohamed Hoessein Enas ("Gadis Menumbuk Padi" 1954), Dzulkifli Buyong ("Kelambu" 1964), Datuk Lat ("Kampung Boy" 1979).',
          'Perkembangan Era: 1960-an (Gaya Barat/Ekspresionisme), 1970-an (Identiti Nasional/Kongres Kebudayaan 1971), 1980-an (Seni Islam), 1990-an (Era Pluralis).',
          'Aliran Lukisan Barat (Abad 14 - 20): Renaissance (Raphael), Baroque (Diego Velazquez), Rococo (Lagrenee), Neoklasisisme (Antoine-Jean Gros), Romantisisme (William Blake), Naturalisme (John Constable), Realisme (Edouard Manet), Impresionisme (Mary Cassatt), Fauvisme (Matisse), Ekspresionisme (Kirchner), Kubisme (Picasso), Surealisme (Salvador Dali), Ekspresionisme Abstrak (Jackson Pollock), Seni Pop (Andy Warhol), Seni Op (Bridget Riley).'
        ]
      },
      {
        title: '2. Seni Catan (Tingkatan 2, 3, 4, 5)',
        points: [
          'Definisi: Menggambar menggunakan media basah di atas permukaan 2D (kanvas, kertas, kayu). Bermula 1930-an oleh pelukis cat air Pulau Pinang.',
          'Tokoh Tempatan: Yong Mun Sen ("Fishing Boat" 1953), Abdullah Ariff ("Bumi Bahagia" 1960), A.B. Ibrahim ("Storm at Penang" 1975), Khaw Sia, Chuah Thean Teng ("Mother and Child" 1980 - Batik), Khalil Ibrahim ("Pantai Timor"), Sulaiman Esa ("Ke Arah Tauhid"), Din Omar ("Antara Dua Hidangan"), Rohaizad Shaari ("Vespa Tersadai").',
          'Bahantara & Jenis Cat: Cat Air (air, lutsinar), Cat Poster (air, legap, cepat kering), Cat Akrilik (air, legap), Cat Gouache (air, legap, lambat kering), Cat Tempera (air, lutsinar), Cat Fresko (kapur plaster), Cat Minyak (turpetin & minyak linsid, legap/berkilat/impasto).',
          '5 Teknik Catan Utama: 1. Pointilisme (titik berulang guna hujung berus), 2. Hard-Edge (masking tape memisahkan warna kemas), 3. Glazing (cat minyak nipis berkilau), 4. Scumbling (sapuan warna gelap ditindan warna cerah), 5. Impasto (sapuan cat tebal terus dari tiub guna pisau palet).'
        ]
      },
      {
        title: '3. Seni Cetakan (Tingkatan 2 & 4)',
        points: [
          'Definisi: Terapan blok/plat yang disapu dakwat pada permukaan perantara (boleh dihasilkan berulang kali).',
          'Sejarah Tempatan: Sebelum Merdeka (Akademi Nanyang Singapore 1940-an, Tan Tee Chie "United", Tay Hooi Keat "King Fisher"). Selepas Merdeka (STTI 1960, Chew Teng Beng, Ahmad Khalid Yusof, Bahaman Hashim "Virtual Reality" 1993, Ponirin Amin "Dalam Sinar Mata Mu").',
          '4 Kaedah Cetakan Utama: 1. Kaedah Timbulan (Relief - dakwat digelek atas tapak timbul cth: Kayu/Lino), 2. Kaedah Benaman (Intaglio - dakwat dalam alur turisan plat logam cth: Etching/Engraving), 3. Kaedah Permukaan (Planografi - Litografi batu kapur penolakan air & minyak), 4. Kaedah Saring Sutera (Serigrafi - pemidang sutera & sekuji).',
          'Cetakan Barat: Abad 15 (Albrecht Durer "The Four Horsemen"), Abad 16 (Cornelis Matsys), Abad 17 (Jacques Callot - Etching), Abad 18 & 19 (William Hogarth).'
        ]
      },
      {
        title: '4. Seni Arca (Tingkatan 3 & 5)',
        points: [
          'Definisi: Produk seni 3D (bahasa Latin: Sculpere = mengukir/memotong). Bermula pesat 1960-an.',
          'Tokoh Pengarca Tempatan: Rosli Zakaria ("Corona #Lockdown 1"), Ramlan Abdullah ("Unity Diversity"), Mad Anuar Ismail ("Siri Meditasi / Pahlawan"), Raja Shahriman Raja Abdullah ("Api, Bayangan Kemenyan 6").',
          '4 Kaedah Membentuk: Manipulasi (kemahiran tangan), Luakan (mengukir/membuang bahan), Binaan (mencantum bahan), Acuan (tuangan).',
          '9 Bentuk Arca: Binaan, Asemblaj (bahan buangan), Luakan, Timbulan, Acuan, Mobail (bergerak ditiup angin), Instalasi (persembahan ruang/masa), Dinding, Stabail (gerak terhad atas tapak).',
          '2 Jenis Arca: Arca Estetik (nilai keindahan sahaja) vs Arca Berfungsi (keindahan + kegunaan cth: meja arca).',
          'Arca Barat: Abad 14 (Andrea Pisano), Abad 15 (Donatello "Gattamelata"), Abad 16 (Giovanni da Bologna), Abad 17 (Bernini "David"), Abad 18 (Edme Bouchardon), Abad 19 (Edgar Degas "Little Dancer"), Abad 20 (Ekspresionisme, Kubisme, Futurisme, Dadaisme, Konstruktivisme, Ekspresionisme Abstrak, Seni Pop, Pascamodenisme).'
        ]
      }
    ]
  },
  sectionD: {
    bidangId: 'sectionD',
    code: 'BIDANG 4',
    title: 'Reka Bentuk (Landskap, Industri & Dalaman) KSSM SPM',
    summary: 'Rangkuman Reka Bentuk Landskap (Softscape/Hardscape), Reka Bentuk Industri (Proton Saga & Ergonomik), dan Reka Bentuk Hiasan Dalaman.',
    topics: [
      {
        title: '1. Reka Bentuk Landskap (Tingkatan 2, 3, 4)',
        points: [
          'Sejarah Landskap: Taman Gantung Babylon Iraq (600 SM), Taman Al-Hambra Sepanyol (abad ke-11 - Islam). Malaysia: Taman Tasik Taiping (1880), Taman Botani Pulau Pinang (1884), Taman Botani Perdana KL (1888). Jabatan Landskap Negara (JLN 1996) & Dasar Landskap Negara (DLN 2011).',
          '2 Jenis Landskap: Landskap Lembut (Softscape - elemen hidup: pokok, bunga, rumput, air) vs Landskap Kejur (Hardscape - elemen keras/bukan hidup: gazebos, bangku, air pancut, pavim).',
          'Peranan: Estetik (mencantikkan), Ekonomi (pelancongan/nurseri), Fizikal (kawal hakisan, teduhan, sejuk iklim).',
          'Elemen: Tumbuhan, Topografi (bukit/kolam), Struktur (batu/logam), Air.',
          'Prinsip: Kepelbagaian, Penegasan, Irama, Kesatuan, Keringkasan.',
          '6 Konsep Landskap: 1. Melayu (wakaf, pagar, kayu, ruang luas), 2. Islam (taman syurga, air mengalir, teduhan), 3. Thai (tiada batasan, simbolik/abstrak), 4. Jepun (taman batu/kering, bonsai, tanglung batu, rumah teh), 5. Inggeris (tasik, rumput bergulung, binaan Gothik/klasik), 6. Bali (keseimbangan Tuhan/alam/manusia, patung batu, kemboja).',
          'Prospek Kerjaya: Arkitek Landskap (lulus I.L.A.M), Pereka Bentuk Landskap, Kontraktor Landskap, Usahawan Nurseri, Pensyarah.'
        ]
      },
      {
        title: '2. Reka Bentuk Industri (Tingkatan 2, 3, 5)',
        points: [
          'Sejarah: Barat (Revolusi Perindustrian Abad ke-18). Malaysia: Kursus ITM (1967), UTM (1980-an), Kereta Proton Saga pertama (1985), Majlis Rekabentuk Malaysia (MRM).',
          '3 Bidang Utama: 1. Reka Bentuk Produk (perkakasan domestik), 2. Reka Bentuk Perabot (meja/kerusi/kabinet), 3. Reka Bentuk Automotif (kenderaan darat/udara/laut).',
          'Peranan & Fungsi: Bentuk Mengikut Fungsi (Form Follows Function - utamakan kegunaan) vs Fungsi Mengikut Bentuk (Function Follows Form - utamakan nilai estetik luaran).',
          'Ergonomik: Disiplin sains kajian hubungan keselesaan, keselamatan, kecekapan manusia dengan peralatan kerja.',
          '5 Konsep Perabot: Antik (usia >100 tahun), Klasik (ringkas, warna gelap), Retro (gaya 1920-1970-an), Kontemporari (Art Deco/Scandinavia), Ultramoden (futuristik, abstrak).',
          'Konsep Produk: Mudah Alih (portable), Ergonomik, Mesra Alam.',
          '3 Model Produk: Model Skala (kecil/besar panduan saiz), Model Ergonomik (uji sifat fizikal & keselesaan), Model Prototaip (model fungsional penuh sebelum pengeluaran kilang).'
        ]
      },
      {
        title: '3. Reka Bentuk Hiasan Dalaman (Tingkatan 2, 3, 4, 5)',
        points: [
          'Sejarah: Dinding gua zaman purba, mural Mesir purba, Barat abad 18-19 (Baroque, Art Deco, Art Nouveau), Era Eklektisisme & Vintaj (1917-1930).',
          'Jenis Ruang: Ruang Kesihatan, Perniagaan, Pejabat, Pameran, Kediaman.',
          'Prinsip & Elemen: Kesatuan, Penegasan, Kepelbagaian, Imbangan (Simetri vs Asimetri), Kontra. Elemen Semula Jadi (tumbuhan/kolam) vs Buatan Manusia (perabot/lampu/permaidani).',
          '4 Konsep Hiasan Dalaman: Kontemporari (warna terang, geometri), Moden (hitam/kelabu/putih, ringkas), Tradisional (seni tradisi, warna alam), Klasik (mewah, Greek/Roman, sutera).',
          'Peranan Pereka: Fungsi Bilik, Saiz Bilik, Bentuk Bilik, Lokasi Bilik (pencahayaan & pengudaraan). Ruang Positif (terisi perabot) vs Ruang Negatif (ruang kosong).',
          'Prospek Kerjaya: Pereka Bentuk Hiasan Dalaman, Pelukis Pelan, Pereka Ruang Pameran, Perunding Warna & Kemasan, Pereka Set (pentas/TV/film). Badan Profesional: MIID (Malaysian Institute of Interior Designers / PPDM) & Lembaga Arkitek Malaysia (LAM).'
        ]
      }
    ]
  },
  sectionE: {
    bidangId: 'sectionE',
    code: 'BIDANG 5',
    title: 'Komunikasi Visual (Foto, Simbol, Logo, Tipografi, Ilustrasi, Infografik)',
    summary: 'Rangkuman Seni Foto, Simbol & Logo, Tipografi Grafik, Ilustrasi & Infografik KSSM SPM.',
    topics: [
      {
        title: '1. Seni Fotografi / Seni Foto (Tingkatan 2, 3, 4, 5)',
        points: [
          'Kamera Pinhole (Kamera Lubang Jarum): Diilhamkan oleh saintis Islam Ibn Al-Haytham (Alhazen) berdasarkan prinsip Camera Obscura. Lubang kecil = imej tajam/terang; lubang besar = imej kabur.',
          '10 Jenis Kamera & Peranti: Kompak, Panorama 360°, Web, Handycam, Tablet, Telefon Pintar, TLR (Twin-lens), SLR (Single-lens), Gambar Segera, Kamera Aksi.',
          'Format Kamera: Sensor Bingkai Penuh 35mm, APS-C, 4/3", Medium Format (6x5, 6x6, 6x7 inci).',
          '6 Teknik Komposisi Kreatif: 1. Peraturan Ketiga (Rule of Thirds - grid 3x3), 2. Sudut Pandangan (POV), 3. Imbangan (Balance), 4. Kedalaman (Depth - bukaan aperture besar f-stop), 5. Garisan Membawa (Leading Lines), 6. Pemangkasan & Pembingkaian (Cropping & Framing).',
          '8 Genre Fotografi: 1. Dokumentari & Kewartawanan (Agensi Magnum), 2. Jalanan, 3. Potret/Portraiture (lensa 50mm, 85mm, 70-200mm), 4. Fesyen, 5. Alam & Landskap (f16-f22, tripod), 6. Produk & Pengiklanan, 7. Tangkap Dekat & Mikro (Macro), 8. Seni Halus.',
          'Ikon Fotografi Malaysia: Amri Ginang (Sabah), Che\' Ahmad Azahar (Fotografi Jalanan / MMU), Wazari Wazir (Fotografi Dokumentari/Potret Rasmi).',
          '8 Teknik Manipulasi Imej: 1. Histogram (graf ton 0% hitam - 100% putih), 2. Sharpness & Blurriness (unsharp mask / selective blur), 3. Grayscale & Monotone, 4. Colour Balance (RGB), 5. Contrast, 6. Filter, 7. Masking (layer/clipping mask), 8. Layering (foreground, midground, background).',
          'E-Portfolio: Kompilasi digital karya seni foto. 6 Tips: Personaliti, Variasi, Terkini, Sensasi, Informasi, Promosi. Aplikasi: Flickr, Behance, DeviantArt, Wix, Pinterest, Instagram, Squarespace, Weebly.'
        ]
      },
      {
        title: '2. Simbol dan Logo (Tingkatan 2)',
        points: [
          'Simbol: Reka bentuk grafik diringkaskan daripada figura, alam, atau benda tanpa sebarang perkataan (cth: simbol jalan raya, larangan merokok).',
          'Logo: Diambil daripada perkataan Greek "Logotype" (cetakan perkataan). Lambang komersial syarikat, kelab, atau agensi menggunakan gabungan rupa & huruf (cth: Petronas, MAS, McDonald\'s).',
          'Jenis: Simbol/Logo daripada Alam Semula Jadi vs Buatan Manusia.'
        ]
      },
      {
        title: '3. Tipografi / Seni Reka Grafik (Tingkatan 3)',
        points: [
          'Definisi: Kemahiran menghasilkan & menyusun jenis taip (Greek: Typos = huruf + Graphikos = melukis). Mesin cetak pertama oleh Johannes Gutenberg (abad ke-15).',
          'Aplikasi: Papan Tanda, Emoticons, Grafiti (cat semburan), Poster.',
          'Muka Taip (Typeface cth: Garamond) vs Fon (Font cth: Garamond Bold). Anatomi Taip: Baseline, Meanline, X-height, Ascender (b, d, h), Descender (g, p, y).',
          '6 Klasifikasi Taip: 1. Old Style (Garamond, Caslon), 2. Transitional (Baskerville, Century), 3. Modern (Bodoni, Tiffany), 4. Slab Serif (Rockwell, Egyptian), 5. Sans Serif (Arial, Helvetica), 6. Script/Italic (Great Vibes, Edwardian).',
          'Tipografi Ekspresi: 1. Onomatopeia (kata meniru bunyi cth: BANG, BOOM), 2. Konotasi Taip (emosi positif/negatif), 3. Personifikasi Taip (sifat manusia pada huruf), 4. Figura Taip (huruf membentuk figura).'
        ]
      },
      {
        title: '4. Seni Reka Grafik - Ilustrasi (Tingkatan 4)',
        points: [
          'Definisi: Penghasilan imej bagi tujuan dekorasi, interpretasi & komunikasi visual kepada teks/konsep.',
          '10 Jenis Ilustrasi: 1. Industri & Teknikal, 2. Sains & Perubatan (anatomi organ), 3. Dekoratif, 4. Imaginasi, 5. Ekspresi (air muka), 6. Pengiklanan, 7. Fesyen, 8. Penerbitan/Editorial (kulit buku/novel cth: Jaafar Taib, Mohd Khairul Azman), 9. Flora & Fauna, 10. Komik & Animasi (sequential art cth: Boboiboy).',
          'Media & Medium: Cetak, Digital, Mural, Komik, Setem, Pen, Cat Air.',
          'Teknik: Tradisional (cat air, hatching, potongan kayu, kolaj, airbrush) vs Moden (digital vector, fotomontaj, model 3D).',
          'Penjanaan Idea 3 Fasa: 1. Thumbnail (Lakaran Kenit - kecil & banyak), 2. Rough (Lakaran Kasar - bentuk jelas), 3. Comprehensive (Lukisan Komprehensif - karya akhir lengkap).'
        ]
      },
      {
        title: '5. Seni Reka Grafik - Infografik (Tingkatan 5)',
        points: [
          'Definisi Infografik: Gabungan perkataan Informasi + Grafik (representasi visual data & maklumat kompleks secara pantas).',
          '6 Elemen Visual Infografik: 1. Tipografi, 2. Ilustrasi, 3. Simbol & Ikon, 4. Graf & Carta, 5. Fotografi, 6. Warna.',
          '5 Prinsip Visual Infografik: 1. Data & Statistik, 2. Hierarki & Flow, 3. Stail Visual, 4. Format & Saiz, 5. Naratif & Penceritaan.',
          '8 Jenis Graf & Carta: Graf Bar, Carta Pai, Piktogram, Carta Alir, Graf Garisan, Histogram, Scatterplot, Graf Siri Masa.',
          'Penjanaan Idea 3 Fasa: Lakaran Kenit (Thumbnail) ➔ Lakaran Kasar (Rough) ➔ Lukisan Komprehensif (Comprehensive).'
        ]
      }
    ]
  },
  sectionF: {
    bidangId: 'sectionF',
    code: 'BIDANG 6',
    title: 'Seni Kraf Tradisional & Dimensi Baru',
    summary: 'Rangkuman Seni Batik, Ukiran Kayu, Tenunan Songket, Anyaman Mengkuang, Seramik & Tekat Emas.',
    topics: [
      {
        title: '1. Seni Batik & Tokoh Pelopor',
        points: [
          'Seni Batik: Teknik resis lilin pada kain putih. Jenis: Batik Canting/Lukis, Batik Blok/Cap, Batik Skrin, Batik Pelangi (ikat celup tanpa lilin).',
          'Tokoh Batik: Chuah Thean Teng (Bapa Seni Batik Malaysia), Haji Che Su (Pelopor Batik Kelantan) & Minah Pelangi (Terengganu).'
        ]
      },
      {
        title: '2. Seni Ukiran Kayu Warisan',
        points: [
          'Kayu Ukiran: Cengal, Merbau, Meranti Merah, Jelutung.',
          '3 Pola Corak: Pola Pemidang (bingkai), Pola Pelengkap (induk lengkap), Pola Bujang (tunggal putu).',
          'Adiguru Ukiran Kayu: Hj. Wan Su Wan Othman, Norhaiza Noordin (Dato\') & Hj. Abd Rahman Long.'
        ]
      },
      {
        title: '3. Seni Tenunan Songket & Anyaman',
        points: [
          'Seni Tenunan: Menggabungkan Benang Loseng (menegak) & Benang Pakan (melintang) menggunakan Kek Tenun.',
          'Tenunan Songket: Benang emas/perak untuk menyongket corak bunga (Bunga Tabur, Pucuk Rebung). Tokoh: Hajah Habibah Zikri & Hajah Natipah Abd Kadir.',
          'Pua Kumbu: Kain tenunan tradisional suku kaum Iban Sarawak menggunakan pewarna alam (akar kayu/daun).',
          'Seni Anyaman: Menganyam daun mengkuang/pandan. Corak Kelarai: Kelarai Bunga Cengkih, Tapak Harimau, Buntut Siput, Mak Mek.'
        ]
      },
      {
        title: '4. Seni Seramik & Seni Tekat Emas',
        points: [
          'Seramik Tradisional: Labu Sayong (Perak - warna hitam ditekup sekam padi), Tembikar Mambong (Kelantan), Pasu Sarawak.',
          'Seni Tekat Emas: Menyulam benang emas di atas kain baldu berlapikkan Mempulur kadbod. Menggunakan alat Cuban melilit benang emas.'
        ]
      }
    ]
  },
  sectionG: {
    bidangId: 'sectionG',
    code: 'BIDANG 7',
    title: 'Seni Kraf SPM KSSM (Bahan Bacaan & Teori Seni K1)',
    summary: 'Nota padat modul bacaan Teori Seni K1 SPM susunan Cg. Din Asmad: Seni Sulaman, Seramik, Tekat, Anyaman, Ukiran Kayu & Batik (Tingkatan 2-5).',
    topics: [
      {
        title: '1. Seni Sulaman (Tingkatan 2)',
        points: [
          '6 Jenis Sulaman: 1. Sulaman Benang, 2. Sulaman Reben, 3. Sulaman Tampal (jahitan insang pari), 4. Sulaman Manik, 5. Sulaman Silang Pangkah (kain berpetak cross-stitch), 6. Sulaman Kerawang (mesin jahit tebuk).',
          '6 Teknik Sulaman & Motif: Bullion (Bunga Sakura), Ribbon Stitch (Bunga Matahari), French Knots (Bunga Lavender), Lazy Daisy (Bunga Kekwa), Jahitan Jelujur (Bunga Carnation), Chain Stitch (Batang).'
        ]
      },
      {
        title: '2. Seni Seramik (Tingkatan 2)',
        points: [
          '2 Jenis Seramik: Seramik Tradisional (tembikar tanah liat + air) vs Seramik Kontemporari (logam/kayu, tanur elektrik/gas, bergerlis berkilat).',
          '5 Teknik Pembentukan Seramik: 1. Teknik Acuan, 2. Teknik Picit (paling mudah, memicit ketulan tanah liat dari tengah), 3. Teknik Lempar Alin (roda pemutar / putaran), 4. Teknik Kepingan (potong menyerong 45° + guris + slip), 5. Teknik Lingkaran (gelung tanah liat bertindih).',
          'Fungsi Slip: Lumpur tanah liat pekat bertindak sebagai gam perekat cantuman kepingan/gelung.',
          'Seramik Mengikut Kaum: Sarawak (harta warisan turun-temurun, motif etnik), India (periuk memasak & keagamaan), Cina (motif Naga melambangkan kekuatan & pelindung).'
        ]
      },
      {
        title: '3. Seni Tekat (Tingkatan 3)',
        points: [
          'Prinsip Asas Seni Tekat: Proses bersuji iaitu menjahit benang putih bagi menetapkan kedudukan benang emas/perak di atas kain baldu hingga menutupi mempulur.',
          '2 Jenis Tekat: 1. Tekat Timbul Benas Emas (guna Mempulur kadbod timbul), 2. Tekat Gubah (disulam terus pada acuan kertas nipis tanpa mempulur, guna Benang Utina sutera merah).',
          'Alatan Asas Tekat: Mempulur (acuan motif kadbod), Cuban (lilitan benang emas 5 kotak lilitan bersilang), Pemidang Kayu Berkaki (merenggang kain baldu & lapis kapas), Benang Putih (mematikan tekat dari bawah).',
          'Motif Tekat: Motif Bunga Kekwa, Motif Bunga Raya, Motif Bunga Padi.',
          'Proses Menekat (3 Langkah): 1. Persiapan Pemidang Kayu Berkaki ➔ 2. Menjahit Mempulur pada kain ➔ 3. Menekat (direntas benang emas & disisip benang putih).'
        ]
      },
      {
        title: '4. Seni Anyaman (Tingkatan 3)',
        points: [
          'Prinsip Asas Anyaman: Proses menjalin silang-menyilang helaian mengkuang/pandan secara ketat dan tegang supaya rapat dan tidak longgar.',
          '3 Jenis Anyaman: 1. Anyaman Gadas (polos tanpa kelarai, angkat satu turun satu), 2. Anyaman Kelarai (mempunyai corak geometri/gaya ragam hias), 3. Anyaman Sulam (bunga sulam rombong guna penyisip).',
          'Motif Kelarai: Flora (Bunga Api, Bunga Cengkih), Fauna (Buntut Siput, Tapak Harimau), Nama Manusia (Mak Mek, Cik Kedah Berakar).',
          '6 Alatan Anyaman: Jangka (membelah daun 5-10mm), Pisau (membelah mempulur berduri), Pelurut (melembutkan daun buluh leper), Belantan (pemukul menitik daun), Penyisip (menyelit helaian), Parang (menetak pokok).',
          '8 Langkah Penyediaan Daun Mengkuang: 1. Menetak Daun (pagi/petang) ➔ 2. Melayur (bara api melembutkan daun) ➔ 3. Menjangka (membelah 5-10mm) ➔ 4. Menitik (belantan melembutkan) ➔ 5. Merendam (3 hari 3 malam dalam tempayan luntur klorofil) ➔ 6. Menjemur (cahaya matahari) ➔ 7. Melurut ➔ 8. Mewarna (rebus + pewarna inci + asam keping mematikan warna).',
          '5 Langkah Menganyam Tikar: 1. Lagang (tapak bentuk V / menaja) ➔ 2. Anyam (dari tengah berselang-seli) ➔ 3. Pepeh (lepih bahagian tepi) ➔ 4. Sisip (menyambung helaian pendek) ➔ 5. Kerat (potong baki).',
          'Rupa Bentuk Tikar: Bucu Tikar (4 sudut), Tepi Tikar, Kepala Tikar, Badan Tikar.'
        ]
      },
      {
        title: '5. Seni Ukiran Kayu (Tingkatan 4)',
        points: [
          'Falsafah Bunga Ukir Melayu: Hujung menunduk, tumbuh dari satu punca, yang muda tumbuh di bawah yang tua, pergerakan visual, kesederhanaan, keseimbangan, hujung tidak menikam lawan.',
          'Ukiran Kaum: Melayu (flora/awan larat), Cina (naga/kemewahan), India (gajah/teratai/kesucian), Suku Jah Hut & Mah Meri (arca patung topeng kayu Nyireh Batu), Sabah (Kahuy Ukkil parang Bajau - motif Serimpak, Cili, Paku Pakis), Sarawak (Terabai perisai Iban & Tiang Keliring tempat abu mayat).',
          '9 Alatan Ukiran: Ketam kayu, Gergaji kecil, Gandin kayu (getuk pahat), Mesin Jigsaw, Kikir pari, Getar/Cetar, Pahat, Pisau wali (buat silat), Daun Mempelas & Kertas Pasir.',
          '4 Jenis Kayu Utama: Meranti Merah, Merbau, Cengal, Jelutung.',
          'Bahan Kemasan: Varnis (keras, berkilat, kalis air) vs Syelek (perang kemerahan antik).',
          '3 Pola Corak: Pola Pemidang (bingkai), Pola Pelengkap (induk tumbuhan lengkap), Pola Bujang (tunggal putu). Motif: Flora (Ketumbit, Cempaka, Ketam Guri), Geometri, Kaligrafi (tulisan Arab/Al-Quran).',
          '5 Jenis Ukiran Kayu: 1. Ukiran Layang (guris permukaan tanpa tebuk), 2. Ukiran Tebuk Timbul Bersilat (timbul ada silat), 3. Ukiran Tebuk Timbul Tanpa Silat, 4. Ukiran Tebuk Tembus Bersilat (berlubang tembus + silat), 5. Ukiran Tebuk Tembus Tanpa Silat (kekisi/cucur atap).',
          '5 Bentuk Silat: Silat Serong, Silat Belah Rotan (separuh bulatan), Silat Leper, Silat Minangkabau (bumbung tinggi tajam), Silat Dada Tuma.',
          '6 Langkah Ukiran: 1. Penyediaan kayu ➔ 2. Melukis motif ➔ 3. Menyurih pada kayu ➔ 4. Mengukir ➔ 5. Menyilat ➔ 6. Kemasan.'
        ]
      },
      {
        title: '6. Seni Batik (Tingkatan 5)',
        points: [
          'Bahagian Kain Batik Sarung: Kepala Kain (motif Pucuk Rebung), Pengapit Kepala Kain, Kaki Kain, Gigi Kain, dan Badan Kain.',
          'Motif Batik: Flora (Pucuk Rebung, Bunga Teratai, Telepok), Fauna (Burung, Ayam, Garuda, Siput), Abstrak (Mega Mendung, Jaring Ikan, Awan, Abor), Motif Isen (Cecek-cecek/itik-itik, Gerinseng, Sirapan, Cantel, Sisik Melik).',
          '4 Jenis Batik: 1. Batik Pelangi (ikat celup, tertua, tanpa lilin, Minah Pelangi & Haji Che Su, pewarna Naphthol/Remazol), 2. Batik Canting/Lukis (guna canting + lilin cair + damar/rosin + minyak), 3. Batik Blok/Cap (guna blok logam tembaga/timah/zink + meja terap & span basah), 4. Batik Skrin (guna lilin sejuk + skrin saring sutera + sekuji).'
        ]
      }
    ]
  }
};
