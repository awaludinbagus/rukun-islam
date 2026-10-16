/**
 * Basis Data Edukasi & Tata Cara 5 Rukun Islam Komprehensif
 * 100% Offline, Lengkap dengan Teks Arab, Latin, Terjemahan, dan Penjelasan Fiqih.
 */

export interface PrayerStep {
  stepNumber: number;
  title: string;
  arabic?: string;
  latin?: string;
  translation?: string;
  description: string;
}

export interface RukunItem {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  iconName: string;
  color: string;
  dalil: {
    arabic: string;
    latin: string;
    translation: string;
    source: string;
  };
  summary: string;
  syarat: string[];
  rukun: string[];
  tataCara: {
    sectionTitle: string;
    steps: PrayerStep[];
  }[];
  doaDoa?: {
    title: string;
    arabic: string;
    latin: string;
    translation: string;
    explanation?: string;
  }[];
  pembatalAtauLarangan?: {
    title: string;
    items: string[];
  };
  faedahDanHikmah: string[];
}

export const RUKUN_ISLAM_DATA: RukunItem[] = [
  {
    id: 1,
    slug: 'syahadat',
    title: '1. Mengucap Dua Kalimat Syahadat',
    subtitle: 'Pintu Gerbang dan Fondasi Utama Keimanan Seorang Muslim',
    iconName: 'key',
    color: '#059669',
    dalil: {
      arabic: 'فَاعْلَمْ أَنَّهُ لَا إِلَٰهَ إِلَّا اللَّهُ وَاسْتَغْفِرْ لِذَنبِكَ',
      latin: "Fa'lam annahu laa ilaaha illallaahu wastaghfir lidzanbika",
      translation: 'Maka ketahuilah bahwa tidak ada Tuhan (yang berhak disembah) melainkan Allah dan mohonlah ampunan bagi dosamu.',
      source: 'QS. Muhammad: 19',
    },
    summary:
      'Syahadatain (Dua Kalimat Syahadat) adalah persaksian lisan dan keyakinan hati bahwa tiada Tuhan yang berhak disembah selain Allah semata, dan Nabi Muhammad ﷺ adalah utusan Allah. Syahadat merupakan rukun pertama dan syarat mutlak diterimanya seluruh amal ibadah dalam Islam.',
    syarat: [
      "1. Al-'Ilmu (Mengetahui makna syahadat, meniadakan ketidaktahuan).",
      '2. Al-Yaqin (Meyakini kebenaran syahadat tanpa ada keraguan sedikitpun).',
      '3. Al-Qabul (Menerima segala konsekuensi syahadat dengan lisan dan hati).',
      "4. Al-Inqiyad (Tunduk dan patuh menjalankan syariat Allah secara lahir dan batin).",
      '5. Ash-Shidq (Jujur dan membenarkan syahadat, bukan seperti orang munafik).',
      '6. Al-Ikhlas (Memurnikan ibadah semata-mata karena Allah Ta\'ala).',
      '7. Al-Mahabbah (Mencintai Allah, Rasul-Nya, serta orang-orang yang beriman).',
    ],
    rukun: [
      '1. Rukun An-Nafyu (Peniadaan): "Laa Ilaaha" meniadakan segala bentuk sesembahan selain Allah.',
      '2. Rukun Al-Itsbat (Penetapan): "Illallaah" menetapkan bahwa hak peribadatan murni hanya milik Allah semata.',
      '3. Pengakuan kerasulan Nabi Muhammad ﷺ: Mentaati perintah beliau, membenarkan ajaran beliau, dan menjauhi larangannya.',
    ],
    tataCara: [
      {
        sectionTitle: 'Lafadz dan Pelafalan Dua Kalimat Syahadat',
        steps: [
          {
            stepNumber: 1,
            title: 'Syahadat Tauhid (Persaksian Ketuhanan Allah)',
            arabic: 'أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ',
            latin: "Asyhadu an laa ilaaha illallaah.",
            translation: 'Aku bersaksi bahwa tidak ada tuhan yang berhak disembah melainkan Allah.',
            description: 'Diucapkan dengan lisan, diyakini dalam hati, dan diwujudkan dengan amal perbuatan.',
          },
          {
            stepNumber: 2,
            title: 'Syahadat Rasul (Persaksian Kerasulan Nabi Muhammad)',
            arabic: 'وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللَّهِ',
            latin: "Wa asyhadu anna Muhammadan rasuulullaah.",
            translation: 'Dan aku bersaksi bahwa Nabi Muhammad adalah utusan Allah.',
            description: 'Meneladani sunnah beliau dan mengimani beliau sebagai penutup para nabi dan rasul.',
          },
        ],
      },
    ],
    pembatalAtauLarangan: {
      title: 'Hal-Hal yang Membatalkan Syahadat (Kekafiran / Kemurtadan)',
      items: [
        'Menyekutukan Allah (Syirik akbar) dalam peribadatan atau memohon pertolongan.',
        'Menjadikan perantara antara dirinya dan Allah untuk memohon syafa\'at secara syirik.',
        'Tidak mengafirkan orang kafir atau meragukan kekafiran orang yang jelas kufur.',
        'Meyakini ada petunjuk atau hukum manusia yang lebih sempurna daripada hukum Allah & Rasul-Nya.',
        'Membenci sesuatu yang diajarkan oleh Rasulullah ﷺ meskipun mengamalkannya.',
        'Memperolok-olok ajaran Allah, Al-Qur\'an, Rasulullah, atau syiar Islam.',
        'Melakukan sihir atau menyetujui praktik sihir.',
        'Membantu dan mendukung orang kafir untuk memerangi dan memusnahkan kaum muslimin.',
      ],
    },
    faedahDanHikmah: [
      'Membebaskan manusia dari perhambaan kepada sesama makhluk menuju perhambaan murni kepada Sang Pencipta.',
      'Menjadi jaminan keselamatan dan tiket masuk surga bagi yang memegang teguh hingga akhir hayat.',
      'Memberikan ketenangan jiwa, kedamaian hati, dan tujuan hidup yang lurus di dunia.',
    ],
  },
  {
    id: 2,
    slug: 'sholat',
    title: '2. Mendirikan Sholat',
    subtitle: 'Tiang Agama dan Amal Pertama yang Akan Dihisab pada Hari Kiamat',
    iconName: 'time',
    color: '#0284c7',
    dalil: {
      arabic: 'إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَّوْقُوتًا',
      latin: "Innash shalaata kaanat 'alal mu'miniina kitaabam mauquutaa",
      translation: 'Sesungguhnya sholat itu adalah fardhu yang ditentukan waktunya atas orang-orang yang beriman.',
      source: 'QS. An-Nisa: 103',
    },
    summary:
      'Sholat fardhu lima waktu (Subuh, Dzuhur, Ashar, Maghrib, Isya) adalah ibadah badaniah terpenting yang menghubungkan langsung seorang hamba dengan Allah Ta\'ala. Sholat mencegah perbuatan keji dan munkar.',
    syarat: [
      'Syarat Wajib Sholat: 1. Islam, 2. Baligh (dewasa), 3. Berakal sehat.',
      'Syarat Sah Sholat: 1. Suci dari hadats kecil (berwudhu/tayamum) dan hadats besar (mandi wajib).',
      '2. Suci badan, pakaian, dan tempat sholat dari najis.',
      '3. Menutup aurat.',
      '4. Mengetahui masuknya waktu sholat.',
      '5. Menghadap kiblat (Ka\'bah di Masjidil Haram Makkah).',
    ],
    rukun: [
      '1. Niat dalam hati bersamaan dengan takbiratul ihram.',
      '2. Berdiri bagi yang mampu pada sholat fardhu.',
      '3. Takbiratul Ihram ("Allaahu Akbar").',
      '4. Membaca Surat Al-Fatihah dengan basmalah dan makhraj yang benar.',
      '5. Ruku\' disertai thuma\'ninah (diam sejenak setidaknya selama membaca tasbih).',
      '6. I\'tidal (bangkit dari ruku\') disertai thuma\'ninah.',
      '7. Sujud dua kali pada setiap rakaat disertai thuma\'ninah.',
      '8. Duduk di antara dua sujud disertai thuma\'ninah.',
      '9. Duduk tasyahud akhir.',
      '10. Membaca tasyahud akhir.',
      '11. Membaca shalawat kepada Nabi Muhammad ﷺ pada tasyahud akhir.',
      '12. Membaca salam yang pertama.',
      '13. Tertib (melakukan rukun secara berurutan).',
    ],
    tataCara: [
      {
        sectionTitle: 'Tata Cara Berwudhu (Bersuci Sebelum Sholat)',
        steps: [
          {
            stepNumber: 1,
            title: 'Niat Wudhu & Membaca Basmalah',
            arabic: 'نَوَيْتُ الْوُضُوءَ لِرَفْعِ الْحَدَثِ الْأَصْغَرِ فَرْضًا لِلَّهِ تَعَالَى',
            latin: "Nawaitul wudhuu'a liraf'il hadatsil ashghari fardhan lillaahi ta'aalaa.",
            translation: 'Aku berniat wudhu untuk menghilangkan hadats kecil, fardhu karena Allah Ta\'ala.',
            description: 'Mencuci kedua telapak tangan hingga pergelangan sebanyak 3 kali.',
          },
          {
            stepNumber: 2,
            title: 'Berkumur dan Istinsyaq (Menghirup Air ke Hidung)',
            arabic: '',
            latin: '',
            translation: '',
            description: 'Berkumur-kumur sebanyak 3 kali dan menghirup air ke lubang hidung lalu mengeluarkannya sebanyak 3 kali.',
          },
          {
            stepNumber: 3,
            title: 'Membasuh Wajah',
            arabic: '',
            latin: '',
            translation: '',
            description: 'Membasuh seluruh permukaan wajah dari batas tumbuhnya rambut kepala hingga dagu dan dari telinga ke telinga sebanyak 3 kali.',
          },
          {
            stepNumber: 4,
            title: 'Membasuh Kedua Tangan Hingga Siku',
            arabic: '',
            latin: '',
            translation: '',
            description: 'Membasuh tangan kanan dari ujung jari hingga melewati siku 3 kali, lalu tangan kiri dengan cara yang sama 3 kali.',
          },
          {
            stepNumber: 5,
            title: 'Mengusap Sebagian Kepala & Telinga',
            arabic: '',
            latin: '',
            translation: '',
            description: 'Mengusap sebagian atau seluruh kepala dengan tangan basah, dilanjutkan mengusap bagian luar dan dalam kedua telinga 3 kali.',
          },
          {
            stepNumber: 6,
            title: 'Membasuh Kedua Kaki Hingga Mata Kaki',
            arabic: '',
            latin: '',
            translation: '',
            description: 'Membasuh kaki kanan hingga di atas mata kaki sebanyak 3 kali sambil membersihkan sela-sela jari, lalu kaki kiri 3 kali.',
          },
          {
            stepNumber: 7,
            title: 'Doa Sesudah Wudhu',
            arabic: 'أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ، اللَّهُمَّ اجْعَلْنِي مِنَ التَّوَّابِينَ، وَاجْعَلْنِي مِنَ الْمُتَطَهِّرِينَ',
            latin: "Asyhadu an laa ilaaha illallaahu wahdahu laa syariika lah, wa asyhadu anna Muhammadan 'abduhu wa rasuuluh. Allaahummaj'alnii minat tawwaabiina waj'alnii minal mutathahhiriin.",
            translation: 'Aku bersaksi tiada Tuhan selain Allah Yang Maha Esa tiada sekutu bagi-Nya, dan Muhammad hamba dan utusan-Nya. Ya Allah jadikanlah aku termasuk orang yang bertaubat dan menyucikan diri.',
            description: 'Menghadap kiblat dan berdoa setelah selesai wudhu.',
          },
        ],
      },
      {
        sectionTitle: 'Gerakan dan Bacaan Sholat Lengkap',
        steps: [
          {
            stepNumber: 1,
            title: 'Niat Sholat Fardhu',
            arabic: 'Contoh Subuh: أُصَلِّي فَرْضَ الصُّبْحِ رَكْعَتَيْنِ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً لِلَّهِ تَعَالَى',
            latin: "Ushallii fardhash shubhi rak'ataini mustaqbilal qiblati adaa-an lillaahi ta'aalaa.",
            translation: "Aku berniat sholat fardhu Subuh dua rakaat menghadap kiblat pada waktunya karena Allah Ta'ala.",
            description: 'Niat diikhlaskan dalam hati bersamaan dengan Takbiratul Ihram.',
          },
          {
            stepNumber: 2,
            title: 'Takbiratul Ihram & Bersedekap',
            arabic: 'اللَّهُ أَكْبَرُ',
            latin: 'Allaahu Akbar.',
            translation: 'Allah Maha Besar.',
            description: 'Mengangkat kedua tangan sejajar telinga/bahu sambil berucap takbir, lalu meletakkan tangan kanan di atas tangan kiri di dada.',
          },
          {
            stepNumber: 3,
            title: 'Membaca Doa Iftitah',
            arabic: 'اللَّهُ أَكْبَرُ كَبِيرًا، وَالْحَمْدُ لِلَّهِ كَثِيرًا، وَسُبْحَانَ اللَّهِ بُكْرَةً وَأَصِيلًا. وَجَّهْتُ وَجْهِيَ لِلَّذِي فَطَرَ السَّمَاوَاتِ وَالأَرْضَ حَنِيفًا مُسْلِمًا وَمَا أَنَا مِنَ الْمُشْرِكِينَ. إِنَّ صَلاَتِي وَنُسُكِي وَمَحْيَايَ وَمَمَاتِي لِلَّهِ رَبِّ الْعَالَمِينَ، لاَ شَرِيكَ لَهُ وَبِذَلِكَ أُمِرْتُ وَأَنَا مِنَ الْمُسْلِمِينَ',
            latin: "Allaahu akbaru kabiiraa, wal hamdu lillaahi katsiiraa, wa subhaanallaahi bukrataw wa ashiilaa. Wajjahtu wajhiya lilladzii fatharas samaawaati wal ardha haniifam muslimaw wamaa ana minal musyrikiin. Inna shalaatii wa nusukii wa mahyaaya wa mamaatii lillaahi rabbil 'aalamiin, laa syariika lahu wa bidzaalika umirtu wa ana minal muslimiin.",
            translation: 'Allah Maha Besar sebesar-besarnya, puji bagi Allah sebanyak-banyaknya, Mahasuci Allah pagi dan petang. Aku hadapkan wajahku kepada Dzat yang menciptakan langit dan bumi dengan lurus dan berserah diri...',
            description: 'Sunnah dibaca setelah takbiratul ihram pada rakaat pertama.',
          },
          {
            stepNumber: 4,
            title: 'Membaca Surat Al-Fatihah & Surat Pendek',
            arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ۝ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ۝ الرَّحْمَٰنِ الرَّحِيمِ ۝ مَالِكِ يَوْمِ الدِّينِ ۝ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ۝ اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ۝ صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
            latin: "Bismillaahir rahmaanir rahiim. Alhamdu lillaahi rabbil 'aalamiin. Ar-rahmaanir rahiim. Maaliki yaumid diin. Iyyaaka na'budu wa iyyaaka nasta'iin. Ihdinash shiraathal mustaqiim. Shiraathal ladziina an'amta 'alaihim ghairil maghdhuubi 'alaihim waladh dhaalliin. Aamiin.",
            translation: 'Dengan nama Allah Yang Maha Pengasih lagi Maha Penyayang. Segala puji bagi Allah Tuhan semesta alam... Tunjukilah kami jalan yang lurus...',
            description: 'Wajib dibaca pada setiap rakaat. Dilanjutkan membaca surat pendek pada rakaat ke-1 dan ke-2.',
          },
          {
            stepNumber: 5,
            title: 'Ruku\' dengan Thuma\'ninah',
            arabic: 'سُبْحَانَ رَبِّيَ الْعَظِيمِ وَبِحَمْدِهِ (٣×)',
            latin: "Subhaana rabbiyal 'azhiimi wa bihamdih (3x).",
            translation: 'Mahasuci Tuhanku Yang Maha Agung dan dengan memuji-Nya (3 kali).',
            description: 'Membungkukkan badan hingga punggung rata, kedua tangan memegang lutut, pandangan ke tempat sujud.',
          },
          {
            stepNumber: 6,
            title: 'I\'tidal dengan Thuma\'ninah',
            arabic: 'سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ. رَبَّنَا لَكَ الْحَمْدُ مِلْءَ السَّمَاوَاتِ وَمِلْءَ الأَرْضِ وَمِلْءَ مَا شِئْتَ مِنْ شَيْءٍ بَعْدُ',
            latin: "Sami'allaahu liman hamidah. Rabbanaa lakal hamdu mil'us samaawaati wa mil'ul ardhi wa mil'u maa syi'ta min syai'in ba'd.",
            translation: 'Allah mendengar orang yang memuji-Nya. Wahai Tuhan kami, bagi-Mu segala puji sepenuh langit dan sepenuh bumi dan sepenuh apa yang Engkau kehendaki setelah itu.',
            description: 'Bangkit tegak lurus dari ruku\' sambil mengangkat tangan sejajar telinga/bahu lalu menurunkannya.',
          },
          {
            stepNumber: 7,
            title: 'Sujud Pertama & Kedua dengan Thuma\'ninah',
            arabic: 'سُبْحَانَ رَبِّيَ الأَعْلَى وَبِحَمْدِهِ (٣×)',
            latin: "Subhaana rabbiyal a'laa wa bihamdih (3x).",
            translation: 'Mahasuci Tuhanku Yang Maha Tinggi dan dengan memuji-Nya (3 kali).',
            description: 'Menempelkan 7 anggota sujud ke lantai: dahi & hidung, kedua telapak tangan, kedua lutut, dan ujung jari kedua kaki.',
          },
          {
            stepNumber: 8,
            title: 'Duduk di Antara Dua Sujud (Iftirasy)',
            arabic: 'رَبِّ اغْفِرْ لِي وَارْحَمْنِي وَاجْبُرْنِي وَارْفَعْنِي وَارْزُقْنِي وَاهْدِنِي وَعَافِنِي وَاعْفُ عَنِّي',
            latin: "Rabbighfir lii warhamnii wajburnii warfa'nii warzuqnii wahdinii wa 'aafinii wa'fu 'annii.",
            translation: 'Ya Tuhanku ampunilah aku, rahmatilah aku, cukupkanlah kekuranganku, tinggikanlah derajatku, berilah aku rezeki, berilah aku petunjuk, berilah aku kesehatan, dan maafkanlah aku.',
            description: 'Duduk di atas kaki kiri dan menegakkan kaki kanan (duduk iftirasy).',
          },
          {
            stepNumber: 9,
            title: 'Tasyahud Awal (Duduk Iftirasy)',
            arabic: 'التَّحِيَّاتُ الْمُبَارَكَاتُ الصَّلَوَاتُ الطَّيِّبَاتُ لِلَّهِ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللَّهِ، اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ',
            latin: "Attahiyyaatul mubaarakaatush shalawaatuth thayyibaatu lillaah. Assalaamu 'alaika ayyuhan nabiyyu wa rahmatullaahi wa barakaatuh. Assalaamu 'alainaa wa 'alaa 'ibaadillaahish shaalihiin. Asyhadu an laa ilaaha illallaah wa asyhadu anna Muhammadan rasuulullaah. Allaahumma shalli 'alaa Muhammad.",
            translation: 'Segala kehormatan, keberkahan, shalawat, dan kebaikan adalah milik Allah. Semoga keselamatan tercurah kepadamu wahai Nabi...',
            description: 'Dibaca pada rakaat kedua pada sholat Dzuhur, Ashar, Maghrib, dan Isya.',
          },
          {
            stepNumber: 10,
            title: 'Tasyahud Akhir & Shalawat Ibrahimiyah (Duduk Tawarruk)',
            arabic: 'التَّحِيَّاتُ الْمُبَارَكَاتُ الصَّلَوَاتُ الطَّيِّبَاتُ لِلَّهِ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللَّهِ. اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، وَبَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، فِي الْعَالَمِينَ إِنَّكَ حَمِيدٌ مَجِيدٌ',
            latin: "Attahiyyaatul mubaarakaatush shalawaatuth thayyibaatu lillaah... Allaahumma shalli 'alaa Muhammad wa 'alaa aali Muhammad, kamaa shallaita 'alaa Ibraahiima wa 'alaa aali Ibraahiim, wa baarik 'alaa Muhammad wa 'alaa aali Muhammad, kamaa baarakta 'alaa Ibraahiima wa 'alaa aali Ibraahiim, fil 'aalamiina innaka hamiidum majiid.",
            translation: '...Ya Allah, limpahkanlah rahmat kepada Nabi Muhammad dan keluarga Nabi Muhammad, sebagaimana Engkau limpahkan rahmat kepada Nabi Ibrahim dan keluarga Nabi Ibrahim...',
            description: 'Duduk tawarruk (kaki kiri dimasukkan di bawah kaki kanan, bokong menyentuh lantai). Menunjuk jari telunjuk saat lafadz "illallaah".',
          },
          {
            stepNumber: 11,
            title: 'Mengucapkan Salam',
            arabic: 'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ',
            latin: "Assalaamu 'alaikum wa rahmatullaah.",
            translation: 'Semoga keselamatan dan rahmat Allah tercurah kepada kalian.',
            description: 'Menoleh ke kanan hingga pipi terlihat dari belakang, lalu menoleh ke kiri dengan lafadz yang sama.',
          },
        ],
      },
    ],
    doaDoa: [
      {
        title: 'Dzikir Setelah Sholat (Istighfar & Doa Selamat)',
        arabic: 'أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ (٣×)، اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالإِكْرَامِ',
        latin: "Astaghfirullaahal 'azhiim (3x), Allaahumma antas salaam wa minkas salaam tabaarakta yaa dzal jalaali wal ikraam.",
        translation: 'Aku memohon ampun kepada Allah Yang Maha Agung (3x). Ya Allah Engkaulah Sang Penyelamat, dari-Mu lah keselamatan, Maha Berkah Engkau wahai Pemilik Keagungan dan Kemuliaan.',
      },
      {
        title: 'Doa Qunut Sholat Subuh (Mazhab Syafi\'i)',
        arabic: 'اللَّهُمَّ اهْدِنِي فِيمَنْ هَدَيْتَ، وَعَافِنِي فِيمَنْ عَافَيْتَ، وَتَوَلَّنِي فِيمَنْ تَوَلَّيْتَ، وَبَارِكْ لِي فِيمَا أَعْطَيْتَ، وَقِنِي شَرَّ مَا قَضَيْتَ، فَإِنَّكَ تَقْضِي وَلَا يُقْضَى عَلَيْكَ، وَإِنَّهُ لَا يَذِلُّ مَنْ وَالَيْتَ، وَلَا يَعِزُّ مَنْ عَادَيْتَ، تَبَارَكْتَ رَبَّنَا وَتَعَالَيْتَ، فَلَكَ الْحَمْدُ عَلَى مَا قَضَيْتَ، أَسْتَغْفِرُكَ وَأَتُوبُ إِلَيْكَ، وَصَلَّى اللَّهُ عَلَى سَيِّدِنَا مُحَمَّدٍ النَّبِيِّ الأُمِّيِّ وَعَلَى آلِهِ وَصَحْبِهِ وَسَلَّمَ',
        latin: "Allaahummahdinii fiiman hadait, wa 'aafinii fiiman 'aafait, wa tawallanii fiiman tawallait, wa baarik lii fiimaa a'thait, wa qinii syarra maa qadhait...",
        translation: 'Ya Allah tunjukilah aku bersama orang-orang yang Engkau beri petunjuk, berilah aku keselamatan bersama orang yang Engkau beri keselamatan...',
      },
    ],
    pembatalAtauLarangan: {
      title: 'Hal-Hal yang Membatalkan Sholat',
      items: [
        'Berbicara dengan sengaja selain bacaan sholat.',
        'Melakukan gerakan banyak di luar sholat berturut-turut (3 gerakan atau lebih).',
        'Berhadats kecil (buang angin/kencing) atau berhadats besar sebelum salam.',
        'Terkena najis pada badan, pakaian, atau tempat sholat yang tidak segera dihilangkan.',
        'Terbukanya aurat dengan sengaja atau terbuka dan tidak segera ditutup kembali.',
        'Berubah niat (misal berniat keluar dari sholat).',
        'Makan atau minum meskipun sedikit.',
        'Membelakangi kiblat dengan sengaja.',
        'Tertawa terbahak-bahak hingga mengeluarkan suara.',
        'Murtad saat sholat.',
      ],
    },
    faedahDanHikmah: [
      'Pembersih dosa-dosa kecil di antara waktu sholat satu dengan lainnya.',
      'Melatih disiplin waktu, kebersihan lahir-batin, dan konsentrasi jiwa.',
      'Mencegah dari perbuatan keji, maksiat, dan kemunkaran.',
    ],
  },
  {
    id: 3,
    slug: 'zakat',
    title: '3. Menunaikan Zakat',
    subtitle: 'Penyucian Jiwa, Pembersih Harta, dan Penegak Keadilan Sosial',
    iconName: 'wallet',
    color: '#d97706',
    dalil: {
      arabic: 'خُذْ مِنْ أَمْوَالِهِمْ صَدَقَةً تُطَهِّرُهُمْ وَتُزَكِّيهِم بِهَا وَصَلِّ عَلَيْهِمْ',
      latin: "Khudz min amwaalihim shadaqatan tuthahhiruhum wa tuzakkiihim bihaa wa shalli 'alaihim",
      translation: 'Ambillah zakat dari sebagian harta mereka, dengan zakat itu kamu membersihkan dan menyucikan mereka dan berdoalah untuk mereka.',
      source: 'QS. At-Taubah: 103',
    },
    summary:
      'Zakat adalah bagian tertentu dari harta yang wajib dikeluarkan oleh setiap muslim apabila telah mencapai syarat-syarat tertentu (seperti nisab dan haul) untuk diserahkan kepada golongan yang berhak menerimanya (8 Asnaf). Terbagi menjadi Zakat Fitrah (jiwa) dan Zakat Maal (harta).',
    syarat: [
      'Syarat Wajib Zakat: 1. Beragama Islam.',
      '2. Merdeka (bukan budak).',
      '3. Kepemilikan Penuh (Al-Milk At-Taam) atas harta.',
      '4. Mencapai Nisab (batas minimal kepemilikan harta yang terkena kewajiban zakat, setara 85g emas untuk zakat maal).',
      '5. Mencapai Haul (telah dimiliki selama satu tahun hijriah/masehi penuh, kecuali zakat pertanian dan rikaz/tambang).',
      '6. Harta tersebut melebihi kebutuhan pokok primer hidup dan bebas dari hutang jatuh tempo.',
      '7. Harta yang berpotensi berkembang (uang, emas, perniagaan, ternak, tanaman).',
    ],
    rukun: [
      '1. Pelepasan kepemilikan sebagian harta (kadar zakat).',
      '2. Niat ikhlas karena Allah Ta\'ala saat mengeluarkan zakat.',
      '3. Diserahkan kepada mustahik (golongan yang berhak menerima) atau melalui amil resmi.',
    ],
    tataCara: [
      {
        sectionTitle: 'Tata Cara & Ketentuan Zakat Fitrah',
        steps: [
          {
            stepNumber: 1,
            title: 'Waktu Pelaksanaan',
            description: 'Wajib ditunaikan sejak awal bulan Ramadhan hingga sebelum sholat Idul Fitri ditegakkan. Waktu paling utama adalah pagi hari 1 Syawwal sebelum sholat Id.',
          },
          {
            stepNumber: 2,
            title: 'Besaran dan Takaran',
            description: 'Sebesar 1 sha\' makanan pokok (beras di Indonesia) setara 2,5 kg atau 3,5 liter beras berkualitas baik per jiwa, atau uang senilai harga beras tersebut.',
          },
          {
            stepNumber: 3,
            title: 'Membaca Niat Zakat Fitrah',
            arabic: 'نَوَيْتُ أَنْ أُخْرِجَ زَكَاةَ الْفِطْرِ عَنْ نَفْسِي فَرْضًا لِلَّهِ تَعَالَى',
            latin: "Nawaitu an ukhrija zakaatal fithri 'an nafsii fardhan lillaahi ta'aalaa.",
            translation: "Aku berniat mengeluarkan zakat fitrah untuk diriku sendiri fardhu karena Allah Ta'ala.",
            description: 'Berniat di dalam hati saat menyerahkan zakat fitrah kepada mustahik atau amil.',
          },
        ],
      },
      {
        sectionTitle: 'Tata Cara & Ketentuan Zakat Maal (Harta/Simpanan/Penghasilan)',
        steps: [
          {
            stepNumber: 1,
            title: 'Inventarisasi Total Harta Lancar',
            description: 'Hitung seluruh saldo tabungan, deposito, perhiasan emas/perak yang disimpan, modal usaha lancar, dan piutang yang pasti tertagih.',
          },
          {
            stepNumber: 2,
            title: 'Pengurangan Hutang Jangka Pendek',
            description: 'Kurangi total harta dengan hutang jatuh tempo yang harus segera dibayar untuk kebutuhan pokok.',
          },
          {
            stepNumber: 3,
            title: 'Cek Nisab & Haul',
            description: 'Bandingkan harta bersih dengan nisab 85 gram emas murni. Jika harta bersih sama atau melebihi harga 85 gram emas dan telah tersimpan genap 1 tahun, maka wajib dizakati.',
          },
          {
            stepNumber: 4,
            title: 'Keluarkan 2,5% Zakat Maal',
            description: 'Kalikan total harta bersih dengan 2,5% (atau 1/40) dan salurkan kepada 8 golongan yang berhak menerima (asnaf).',
          },
        ],
      },
    ],
    faedahDanHikmah: [
      'Menyucikan harta dari hak orang lain dan membersihkan jiwa dari sifat kikir dan serakah.',
      'Mengurangi kesenjangan ekonomi, memberantas kemiskinan, dan memperkuat ukhuwah islamiyah.',
      'Mendatangkan keberkahan, melipatgandakan rezeki, dan menolak bala.',
    ],
  },
  {
    id: 4,
    slug: 'puasa',
    title: '4. Berpuasa di Bulan Ramadhan',
    subtitle: 'Madrasah Spiritual Menuju Derajat Ketaqwaan Tertinggi',
    iconName: 'moon',
    color: '#8b5cf6',
    dalil: {
      arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا كُتِبَ عَلَيْكُمُ الصِّيَامُ كَمَا كُتِبَ عَلَى الَّذِينَ مِن قَبْلِكُمْ لَعَلَّكُمْ تَتَّقُونَ',
      latin: "Yaa ayyuhal ladziina aamanuu kutiba 'alaikumush shiyaamu kamaa kutiba 'alal ladziina min qablikum la'allakum tattaquun",
      translation: 'Hai orang-orang yang beriman, diwajibkan atas kamu berpuasa sebagaimana diwajibkan atas orang-orang sebelum kamu agar kamu bertaqwa.',
      source: 'QS. Al-Baqarah: 183',
    },
    summary:
      'Puasa (Shiyam) secara bahasa artinya menahan diri. Secara istilah syariat adalah menahan diri dari segala hal yang membatalkannya mulai dari terbit fajar shadiq (waktu Subuh) hingga terbenam matahari (waktu Maghrib) dengan disertai niat karena Allah Ta\'ala.',
    syarat: [
      'Syarat Wajib Puasa: 1. Islam, 2. Baligh, 3. Berakal sehat, 4. Mampu berpuasa (tidak sakit parah atau lansia renta), 5. Mukim (tidak sedang safar/bepergian jauh yang membolehkan berbuka).',
      'Syarat Sah Puasa: 1. Islam, 2. Tamyiz/berakal, 3. Suci dari haid dan nifas bagi wanita, 4. Pada hari yang diperbolehkan berpuasa (bukan hari raya atau hari tasyrik).',
    ],
    rukun: [
      '1. Niat: Memasang niat pada malam hari sebelum fajar terbit untuk puasa fardhu Ramadhan.',
      '2. Imsak (Menahan Diri): Menahan diri dari makan, minum, jima\', dan segala hal yang membatalkan puasa dari Subuh hingga Maghrib.',
    ],
    tataCara: [
      {
        sectionTitle: 'Rangkaian Ibadah Puasa Sehari-hari',
        steps: [
          {
            stepNumber: 1,
            title: 'Makan Sahur di Akhir Waktu',
            description: 'Makan sahur memiliki keberkahan besar dan membantu stamina tubuh. Disunnahkan mengakhirkan sahur menjelang waktu imsak/subuh.',
          },
          {
            stepNumber: 2,
            title: 'Berniat di Malam Hari Sebelum Fajar',
            arabic: 'نَوَيْتُ صَوْمَ غَدٍ عَنْ أَدَاءِ فَرْضِ شَهْرِ رَمَضَانَ هَذِهِ السَّنَةِ لِلَّهِ تَعَالَى',
            latin: "Nawaitu shauma ghadin 'an adaa'i fardhi syahri ramadhaana haadzihis sanati lillaahi ta'aalaa.",
            translation: 'Aku berniat puasa esok hari untuk menunaikan fardhu bulan Ramadhan tahun ini karena Allah Ta\'ala.',
            description: 'Niat wajib dihadirkan di dalam hati setiap malam bulan Ramadhan sebelum masuk waktu Subuh.',
          },
          {
            stepNumber: 3,
            title: 'Menjaga Diri dari Hal Makruh & Dosa',
            description: 'Menjaga lisan dari dusta, gibah, adu domba, dan menjaga mata serta telinga dari hal-hal yang diharamkan Allah agar pahala puasa tidak gugur.',
          },
          {
            stepNumber: 4,
            title: 'Menyegerakan Berbuka Puasa Saat Masuk Maghrib',
            arabic: 'ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الأَجْرُ إِنْ شَاءَ اللَّهُ',
            latin: "Dzahabazh zhama-u wabtallatil 'uruuqu wa tsabatal ajru in syaa-allaah.",
            translation: 'Telah hilang rasa dahaga, urat-urat telah basah, dan pahala telah ditetapkan, insya Allah.',
            description: 'Disunnahkan berbuka dengan kurma basah (ruthab), kurma kering (tamr), atau seteguk air putih.',
          },
        ],
      },
    ],
    pembatalAtauLarangan: {
      title: 'Hal-Hal yang Membatalkan Puasa',
      items: [
        'Masuknya benda/makanan/minuman secara sengaja ke dalam rongga tubuh yang terbuka (mulut, hidung, telinga, kemaluan).',
        'Muntah dengan sengaja (jika muntah tidak sengaja maka puasa tetap sah).',
        'Bersetubuh (jima\') di siang hari puasa (wajib qadha dan kafarat berat).',
        'Keluarnya air mani dengan sengaja akibat bersentuhan, onani, atau pelukan.',
        'Mengalami haid atau nifas bagi wanita.',
        'Gila, ayan, pingsan, atau mabuk sepanjang hari.',
        'Murtad (keluar dari agama Islam).',
      ],
    },
    faedahDanHikmah: [
      'Meningkatkan taqwa, melatih kesabaran, pengendalian hawa nafsu, dan kejujuran nurani.',
      'Menumbuhkan empati dan rasa belas kasih terhadap orang-orang miskin yang kelaparan.',
      'Memberikan detoksifikasi dan manfaat kesehatan jasmani yang luar biasa bagi organ tubuh.',
    ],
  },
  {
    id: 5,
    slug: 'haji',
    title: '5. Menunaikan Ibadah Haji',
    subtitle: 'Puncak Penghambaan di Tanah Suci bagi yang Mampu',
    iconName: 'compass',
    color: '#0d9488',
    dalil: {
      arabic: 'وَلِلَّهِ عَلَى النَّاسِ حِجُّ الْبَيْتِ مَنِ اسْتَطَاعَ إِلَيْهِ سَبِيلًا وَمَن كَفَرَ فَإِنَّ اللَّهَ غَنِيٌّ عَنِ الْعَالَمِينَ',
      latin: "Wa lillaahi 'alan naasi hijjul baiti manistathaa'a ilaihi sabiilaa wa man kafara fa innallaaha ghaniyyun 'anil 'aalamiin",
      translation: 'Mengerjakan haji adalah kewajiban manusia terhadap Allah, yaitu (bagi) orang yang sanggup mengadakan perjalanan ke Baitullah. Barangsiapa mengingkari, maka sesungguhnya Allah Maha Kaya dari semesta alam.',
      source: 'QS. Ali Imran: 97',
    },
    summary:
      'Haji adalah rukun Islam kelima yang wajib dikerjakan sekali seumur hidup bagi setiap muslim yang mampu (istitha\'ah) secara fisik, finansial, dan keamanan perjalanan. Dilaksanakan pada bulan Dzulhijjah di kota suci Makkah, Arafah, Muzdalifah, dan Mina.',
    syarat: [
      'Syarat Wajib Haji: 1. Islam.',
      '2. Baligh (dewasa).',
      '3. Berakal sehat.',
      '4. Merdeka.',
      '5. Istitha\'ah (Mampu): mampu bekal perjalanan dan nafkah keluarga yang ditinggalkan, sehat jasmani, aman perjalanan, dan bagi wanita disertai mahram atau rombongan yang terpercaya.',
    ],
    rukun: [
      'Rukun Haji (Wajib dikerjakan, tidak sah haji jika ditinggalkan dan tidak bisa diganti dengan dam/denda):',
      '1. Ihram (Niat masuk ke dalam manasik haji dari Miqat).',
      '2. Wukuf di Padang Arafah pada tanggal 9 Dzulhijjah.',
      '3. Thawaf Ifadhah mengelilingi Ka\'bah sebanyak 7 putaran.',
      '4. Sa\'i antara bukit Shafa dan Marwah sebanyak 7 kali.',
      '5. Tahallul (mencukur atau memotong sebagian rambut kepala).',
      '6. Tertib (berurutan dalam sebagian besar rukun).',
    ],
    tataCara: [
      {
        sectionTitle: 'Rangkaian Manasik Haji dari Hari ke Hari',
        steps: [
          {
            stepNumber: 1,
            title: 'Hari ke-1 (8 Dzulhijjah - Hari Tarwiyah): Berihram & Menuju Mina',
            arabic: 'لَبَّيْكَ اللَّهُمَّ حَجًّا',
            latin: "Labbaikallaahumma hajjan.",
            translation: 'Aku penuhi panggilan-Mu ya Allah untuk berhaji.',
            description: 'Mandi sunnah ihram, mengenakan pakaian ihram putih tak berjahit bagi laki-laki, berniat haji dari tempat pemondokan/miqat, membaca talbiyah, dan berangkat menuju Mina untuk menginap dan sholat lima waktu.',
          },
          {
            stepNumber: 2,
            title: 'Hari ke-2 (9 Dzulhijjah - Hari Arafah): Puncak Wukuf di Arafah',
            arabic: 'لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لَا شَرِيكَ لَكَ',
            latin: "Labbaikallaahumma labbaaik, labbaaika laa syariika laka labbaaik, innal hamda wan ni'mata laka wal mulk, laa syariika lak.",
            translation: 'Aku penuhi panggilan-Mu ya Allah, tiada sekutu bagi-Mu... Segala puji, nikmat, dan kerajaan adalah milik-Mu...',
            description: 'Puncak haji! Berdiam diri di Padang Arafah sejak tergelincir matahari (Dzuhur) hingga terbenam matahari (Maghrib). Memperbanyak doa, dzikir, istighfar, dan membaca Al-Qur\'an.',
          },
          {
            stepNumber: 3,
            title: 'Malam 10 Dzulhijjah: Mabit di Muzdalifah',
            description: 'Setelah Maghrib berangkat dari Arafah menuju Muzdalifah. Sholat Maghrib dan Isya jamak qashar, bermalam (mabit) setidaknya lewat tengah malam, serta mengumpulkan kerikil untuk melempar jumrah.',
          },
          {
            stepNumber: 4,
            title: 'Hari ke-3 (10 Dzulhijjah - Hari Idul Adha/Nahar): Melempar Jumrah & Tahallul',
            description: 'Menuju Mina melempar Jumrah Aqabah dengan 7 batu kerikil sambil bertakbir. Menyembelih hewan kurban (dam), lalu bercukur/tahallul awal. Dilanjutkan ke Masjidil Haram untuk Thawaf Ifadhah dan Sa\'i.',
          },
          {
            stepNumber: 5,
            title: 'Hari ke-4 sampai 6 (11, 12, 13 Dzulhijjah - Hari Tasyrik): Mabit di Mina & Lempar 3 Jumrah',
            description: 'Bermalam di Mina dan melempar 3 jumrah (Ula, Wustha, dan Aqabah) masing-masing 7 kerikil setiap hari setelah zawal. Boleh mengambil Nafar Awwal (keluar pada 12 Dzulhijjah) atau Nafar Tsani (13 Dzulhijjah).',
          },
          {
            stepNumber: 6,
            title: 'Penutup: Thawaf Wada\' (Thawaf Perpisahan)',
            description: 'Sebelum meninggalkan kota Makkah kembali ke tanah air, jamaah haji melakukan thawaf perpisahan 7 putaran mengelilingi Ka\'bah tanpa sa\'i.',
          },
        ],
      },
      {
        sectionTitle: 'Tata Cara Ibadah Umrah',
        steps: [
          {
            stepNumber: 1,
            title: 'Ihram & Niat Umrah di Miqat',
            arabic: 'لَبَّيْكَ اللَّهُمَّ عُمْرَةً',
            latin: "Labbaikallaahumma 'umratan.",
            translation: 'Aku penuhi panggilan-Mu ya Allah untuk melaksanakan umrah.',
            description: 'Mengenakan pakaian ihram dari miqat yang ditentukan dan berniat umrah.',
          },
          {
            stepNumber: 2,
            title: 'Thawaf 7 Putaran Mengelilingi Ka\'bah',
            description: 'Dimulai dari Hajar Aswad berlawanan arah jarum jam sebanyak 7 putaran suci di Masjidil Haram.',
          },
          {
            stepNumber: 3,
            title: 'Sa\'i Antara Bukit Shafa dan Marwah',
            description: 'Berjalan bolak-balik sebanyak 7 kali perjalanan, dimulai dari Bukit Shafa dan berakhir di Bukit Marwah.',
          },
          {
            stepNumber: 4,
            title: 'Tahallul (Bercukur)',
            description: 'Mencukur seluruh rambut atau memotong minimal 3 helai rambut kepala. Dengan ini seluruh larangan ihram menjadi halal kembali.',
          },
        ],
      },
    ],
    pembatalAtauLarangan: {
      title: 'Larangan-Larangan Selama Berihram',
      items: [
        'Bagi Pria: Memakai pakaian berjahit atau berlekuk tubuh (kemeja, celana, jubah), dan menutup kepala dengan peci/topi yang menempel.',
        'Bagi Wanita: Menutup wajah (cadar/niqab) dan memakai sarung tangan.',
        'Bagi Keduanya: Memakai wewangian/parfum pada badan atau pakaian setelah berniat ihram.',
        'Memotong kuku tangan atau kaki.',
        'Mencukur atau mencabut rambut badan dan kepala.',
        'Membunuh hewan buruan darat atau mencabut pepohonan tanah haram.',
        'Menikah, menikahkan, atau melamar wanita.',
        'Bersetubuh (jima\') atau bermesraan dengan syahwat (jika jima\' sebelum tahallul awal, maka hajinya batal).',
        'Bertengkar, mencaci maki, dan berbuat fasik (fusuq dan jidal).',
      ],
    },
    faedahDanHikmah: [
      'Menghapus seluruh dosa yang telah lalu laksana bayi yang baru dilahirkan dari rahim ibunya.',
      'Manifestasi persatuan, kesetaraan, dan persaudaraan umat Islam dari seluruh penjuru dunia tanpa sekat kasta atau ras.',
      'Mengingatkan akan hari kiamat dan padang mahsyar saat seluruh manusia berkumpul menghadap Sang Pencipta.',
    ],
  },
];
