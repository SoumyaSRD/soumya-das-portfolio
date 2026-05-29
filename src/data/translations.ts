export type Language = 'en' | 'hi' | 'fr' | 'ja' | 'or';

export const languages: Record<Language, { name: string; flag: string }> = {
  en: { name: 'English', flag: '🇬🇧' },
  hi: { name: 'हिंदी', flag: '🇮🇳' },
  fr: { name: 'Français', flag: '🇫🇷' },
  ja: { name: '日本語', flag: '🇯🇵' },
  or: { name: 'ଓଡ଼ିଆ', flag: '🇮🇳' }
};

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation Headers
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.timeline': 'Timeline',
    'nav.showroom': 'Showroom',
    'nav.interests': 'Interests',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'nav.brand': 'srd.OS',

    // Hero Section
    'hero.badge': 'Soumya Ranjan Das',
    'hero.title1': 'Crafting Scalable',
    'hero.title2': 'Enterprise Platforms',
    'hero.expert': 'Expert in: ',
    'hero.titles.0': 'Senior Fullstack Developer',
    'hero.titles.1': 'Angular Architecture Expert',
    'hero.titles.2': 'React & Node.js Engineer',
    'hero.titles.3': 'Enterprise System Architect',
    'hero.bio': 'Senior Fullstack Developer & Angular Architect with 7+ years of experience building high-fidelity logistics platforms, robust state systems, and leading high-output agile teams.',
    'hero.cta.projects': 'Explore Projects',
    'hero.cta.book': 'Book Interview Slot',
    'hero.cta.cv': 'Print CV / Resume',

    // About Section
    'about.badge': 'About Soumya',
    'about.heading': '7+ Years of Fullstack Crafts',
    'about.cap.fe.title': 'Frontend Architecture',
    'about.cap.fe.desc': 'Specialist in monorepo structures (Nx), shared component libraries, microfrontends, and optimized lazy loaded module streams.',
    'about.cap.qa.title': 'Code Quality',
    'about.cap.qa.desc': 'Leveraging SonarQube quality gates, strict testing frameworks, and modular design patterns to drive zero-bug delivery rates.',
    'about.cap.scrum.title': 'Scrum Mentorship',
    'about.cap.scrum.desc': 'Leading sprints, organizing peer reviews, and hosting RxJS & NgRx masterclasses to guide junior/mid-level squad members.',
    'about.cap.be.title': 'Backend Scalability',
    'about.cap.be.desc': 'Architecting resilient microservices utilizing NestJS, Node API routes, caching, and complex relational or document databases.',

    // Skills Section
    'skills.badge': 'Technical Stack',
    'skills.title': 'Skill Taxonomy',
    'skills.desc': 'Hover over individual cards to experience active electromagnetic glows tuned to each technology’s branding.',
    'skills.verified': 'Production Verified',

    // Experience Section
    'experience.badge': 'Track Record',
    'experience.title': 'Career Timeline',
    'experience.desc': 'Detailed log of corporate systems development. Click any heading block to collapse/expand task achievements.',

    // Projects Section
    'projects.badge': 'Engineering Showroom',
    'projects.title': 'Project Showroom',
    'projects.desc': 'Explore key fullstack web builds. GitHub indicators are dynamically updated via active GitHub REST modules.',
    'projects.source': 'Source Code',
    'projects.demo': 'Live Demo',
    'projects.stars': 'stars',
    'projects.forks': 'forks',

    // Certifications Section
    'certifications.badge': 'Domain Versatility',
    'certifications.title': 'Certifications & Interests',
    'certifications.desc': 'Explore dynamic float cards representing secondary capabilities and certifications that enrich my fullstack vision.',

    // Blog Section
    'blog.badge': 'Engineering Insights',
    'blog.title': 'Technical Blog Pinned',
    'blog.desc': 'Sharing software engineering and system architecture thinking from years of code delivery.',

    // Contact Section
    'contact.badge': 'Get In Touch',
    'contact.title': 'Communications Hub',
    'contact.desc': 'Send a direct payload message or select a date/time slot below to book a dynamic video sync with me.',
    'contact.card.location': 'Bhubaneswar, Odisha, India',
    'contact.card.email': 'Email Me Direct',
    'contact.card.linkedin': 'LinkedIn Network',
    'contact.form.name': 'Your Name',
    'contact.form.email': 'Your Email',
    'contact.form.message': 'Direct Message Payload...',
    'contact.form.send': 'Transmit Message',
    'contact.form.success': 'Secure message payload transmitted successfully!',
    'contact.booking.title': 'Recruiter Schedulers Planner',
    'contact.booking.time': 'Available Timeslots',
    'contact.booking.confirm': 'Synchronized successfully for:',

    // Footer
    'footer.role': 'Senior Fullstack Developer & Angular Architect. All rights reserved.'
  },
  hi: {
    // Navigation Headers
    'nav.about': 'परिचय',
    'nav.skills': 'कौशल',
    'nav.timeline': 'समय रेखा',
    'nav.showroom': 'शो रूम',
    'nav.interests': 'रुचियाँ',
    'nav.blog': 'ब्लॉग',
    'nav.contact': 'संपर्क',
    'nav.brand': 'srd.OS',

    // Hero Section
    'hero.badge': 'सौम्य रंजन दास',
    'hero.title1': 'स्केलेबल और मजबूत',
    'hero.title2': 'एंटरप्राइज प्लेटफॉर्म',
    'hero.expert': 'विशेषज्ञता: ',
    'hero.titles.0': 'वरिष्ठ फुलस्टैक डेवलपर',
    'hero.titles.1': 'एंगुलर आर्किटेक्चर विशेषज्ञ',
    'hero.titles.2': 'रिएक्ट और नोड.जेएस इंजीनियर',
    'hero.titles.3': 'एंटरप्राइज सिस्टम आर्किटेक्ट',
    'hero.bio': 'वरिष्ठ फुलस्टैक डेवलपर और एंगुलर आर्किटेक्ट, जिन्हें मजबूत लॉजिस्टिक्स प्लेटफॉर्म, स्टेट आर्किटेक्चर विकसित करने और उच्च-उत्पादन वाली टीमों का मार्गदर्शन करने का ७+ वर्षों का अनुभव है।',
    'hero.cta.projects': 'परियोजनाएं देखें',
    'hero.cta.book': 'इंटरव्यू स्लॉट बुक करें',
    'hero.cta.cv': 'बायोडाटा प्रिंट करें',


    'about.badge': 'सौम्य के बारे में',
    'about.heading': 'फुलस्टैक शिल्प कौशल के ७+ वर्ष',
    'about.cap.fe.title': 'फ्रंटएंड आर्किटेक्चर',
    'about.cap.fe.desc': 'मोनोरेपो संरचनाओं (Nx), साझा घटक पुस्तकालयों, माइक्रो-फ्रंटएंड और अनुकूलित मॉड्यूल धाराओं के विशेषज्ञ।',
    'about.cap.qa.title': 'कोड की गुणवत्ता',
    'about.cap.qa.desc': 'शून्य-बग वितरण दरों को संचालित करने के लिए सोनारक्विब (SonarQube) गुणवत्ता द्वारों और कठोर परीक्षण का उपयोग।',
    'about.cap.scrum.title': 'स्कर्म मेंटरशिप',
    'about.cap.scrum.desc': 'जूनियर सदस्यों का मार्गदर्शन करने के लिए स्प्रिंट का नेतृत्व करना और RxJS और NgRx मास्टरक्लास की मेजबानी करना।',
    'about.cap.be.title': 'बैकएंड स्केलेबिलिटी',
    'about.cap.be.desc': 'नेस्टजेएस (NestJS), एक्सप्रेस और जटिल डेटाबेस का उपयोग करके लचीले और मजबूत माइक्रोसर्विसेज का निर्माण।',

    // Skills Section
    'skills.badge': 'कौशल सेट',
    'skills.title': 'तकनीकी कौशल',
    'skills.desc': 'प्रत्येक तकनीक के ब्रांडिंग से प्रेरित विद्युतचुंबकीय चमक का अनुभव करने के लिए कार्डों पर होवर करें।',
    'skills.verified': 'उत्पादन सत्यापित',

    // Experience Section
    'experience.badge': 'ट्रैक रिकॉर्ड',
    'experience.title': 'कैरियर की समय रेखा',
    'experience.desc': 'कॉर्पोरेट प्रणालियों के विकास का विस्तृत विवरण। कार्यों को देखने के लिए किसी भी ब्लॉक पर क्लिक करें।',

    // Projects Section
    'projects.badge': 'इंजीनियरिंग शोरूम',
    'projects.title': 'परियोजनाएं',
    'projects.desc': 'मुख्य फुलस्टैक वेब प्रणालियों का पता लगाएं। गिटहब मेट्रिक्स सीधे गिटहब एपीआई के माध्यम से अपडेट किए जाते हैं।',
    'projects.source': 'सोर्स कोड',
    'projects.demo': 'लाइव डेमो',
    'projects.stars': 'तारे',
    'projects.forks': 'फ़ोर्क',

    // Certifications Section
    'certifications.badge': 'डोमेन बहुमुखी प्रतिभा',
    'certifications.title': 'प्रमाण पत्र और रुचियां',
    'certifications.desc': 'मेरी फुलस्टैक दृष्टि को समृद्ध करने वाले माध्यमिक क्षमताओं का प्रतिनिधित्व करने वाले गतिशील फ्लोटिंग कार्ड।',

    // Blog Section
    'blog.badge': 'तकनीकी अंतर्दृष्टि',
    'blog.title': 'तकनीकी ब्लॉग',
    'blog.desc': 'वर्षों के कोड वितरण से प्राप्त सॉफ्टवेयर इंजीनियरिंग और सिस्टम आर्किटेक्चर सोच को साझा करना।',

    // Contact Section
    'contact.badge': 'संपर्क करें',
    'contact.title': 'संचार केंद्र',
    'contact.desc': 'सीधा संदेश भेजने या मेरे साथ वीडियो सिंक शेड्यूल करने के लिए नीचे दी गई तारीख/समय स्लॉट का चयन करें।',
    'contact.card.location': 'भुवनेश्वर, ओडिशा, भारत',
    'contact.card.email': 'मुझे ईमेल भेजें',
    'contact.card.linkedin': 'लिंक्डइन नेटवर्क',
    'contact.form.name': 'आपका नाम',
    'contact.form.email': 'आपका ईमेल',
    'contact.form.message': 'आपका संदेश...',
    'contact.form.send': 'संदेश भेजें',
    'contact.form.success': 'संदेश सफलतापूर्वक प्रेषित किया गया!',
    'contact.booking.title': 'साक्षात्कार स्लॉट नियोजक',
    'contact.booking.time': 'उपलब्ध समय स्लॉट',
    'contact.booking.confirm': 'सफलतापूर्वक बुक किया गया:',

    // Footer
    'footer.role': 'वरिष्ठ फुलस्टैक डेवलपर और एंगुलर आर्किटेक्ट। सर्वाधिकार सुरक्षित।'
  },
  fr: {
    // Navigation Headers
    'nav.about': 'À Propos',
    'nav.skills': 'Compétences',
    'nav.timeline': 'Parcours',
    'nav.showroom': 'Projets',
    'nav.interests': 'Intérêts',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'nav.brand': 'srd.OS',

    // Hero Section
    'hero.badge': 'Soumya Ranjan Das',
    'hero.title1': 'Création de Plateformes',
    'hero.title2': 'Entreprise Scalables',
    'hero.expert': 'Expert in: ',
    'hero.titles.0': 'Développeur Fullstack Senior',
    'hero.titles.1': 'Expert en Architecture Angular',
    'hero.titles.2': 'Ingénieur React & Node.js',
    'hero.titles.3': 'Architecte de Systèmes d\'Entreprise',
    'hero.bio': 'Développeur Fullstack Senior & Architecte Angular avec plus de 7 ans d\'expérience dans la création de plateformes logistiques robustes, de systèmes d\'état avancés et la direction d\'équipes agiles.',
    'hero.cta.projects': 'Découvrir les Projets',
    'hero.cta.book': 'Réserver un Entretien',
    'hero.cta.cv': 'Imprimer le CV',

    // About Section
    'about.badge': 'À Propos',
    'about.heading': '7+ Ans d\'Artisanat Fullstack',
    'about.cap.fe.title': 'Architecture Frontend',
    'about.cap.fe.desc': 'Spécialiste des structures monorépo (Nx), des bibliothèques de composants partagés, des microfrontends et des flux chargés à la demande.',
    'about.cap.qa.title': 'Qualité du Code',
    'about.cap.qa.desc': 'Utilisation des barrières de qualité SonarQube, de frameworks de test stricts et de modèles de conception modulaires pour garantir 0 bug.',
    'about.cap.scrum.title': 'Mentorat Scrum',
    'about.cap.scrum.desc': 'Direction des sprints, révisions de code par les pairs et masterclasses RxJS et NgRx pour guider les membres juniors.',
    'about.cap.be.title': 'Scalabilité Backend',
    'about.cap.be.desc': 'Architecture de microservices résilients avec NestJS, Express et des bases de données complexes.',

    // Skills Section
    'skills.badge': 'Compétences',
    'skills.title': 'Taxonomie des Compétences',
    'skills.desc': 'Survolez les cartes pour découvrir les lueurs électromagnétiques personnalisées pour chaque technologie.',
    'skills.verified': 'Vérifié en Production',

    // Experience Section
    'experience.badge': 'Parcours',
    'experience.title': 'Historique de Carrière',
    'experience.desc': 'Journal détaillé du développement. Cliquez sur un en-tête pour développer ou réduire les détails des réalisations.',

    // Projects Section
    'projects.badge': 'Projets d\'Ingénierie',
    'projects.title': 'Galerie des Projets',
    'projects.desc': 'Découvrez les principales applications Web. Les statistiques GitHub sont mises à jour en direct via les modules REST.',
    'projects.source': 'Code Source',
    'projects.demo': 'Démo Live',
    'projects.stars': 'étoiles',
    'projects.forks': 'forks',

    // Certifications Section
    'certifications.badge': 'Polyvalence',
    'certifications.title': 'Certifications & Intérêts',
    'certifications.desc': 'Explorez les cartes flottantes représentant les capacités secondaires et les certifications qui enrichissent ma vision fullstack.',

    // Blog Section
    'blog.badge': 'Perspectives',
    'blog.title': 'Blog Technique Pingle',
    'blog.desc': 'Partage de la pensée d\'ingénierie logicielle et d\'architecture système issue d\'années de livraison de code.',

    // Contact Section
    'contact.badge': 'Contact',
    'contact.title': 'Hub de Communication',
    'contact.desc': 'Envoyez un message direct ou sélectionnez une date et un créneau horaire ci-dessous pour planifier un entretien vidéo avec moi.',
    'contact.card.location': 'Bhubaneswar, Odisha, Inde',
    'contact.card.email': 'Envoyez-moi un Email',
    'contact.card.linkedin': 'Réseau LinkedIn',
    'contact.form.name': 'Votre Nom',
    'contact.form.email': 'Votre Email',
    'contact.form.message': 'Message direct...',
    'contact.form.send': 'Transmettre le Message',
    'contact.form.success': 'Le message a été transmis avec succès !',
    'contact.booking.title': 'Planificateur d\'Entretiens',
    'contact.booking.time': 'Créneaux Disponibles',
    'contact.booking.confirm': 'Réservé avec succès pour :',

    // Footer
    'footer.role': 'Développeur Fullstack Senior & Architecte Angular. Tous droits réservés.'
  },
  ja: {
    // Navigation Headers
    'nav.about': '自己紹介',
    'nav.skills': 'スキル',
    'nav.timeline': '経歴',
    'nav.showroom': 'プロジェクト',
    'nav.interests': '興味・関心',
    'nav.blog': 'ブログ',
    'nav.contact': 'お問い合わせ',
    'nav.brand': 'srd.OS',

    // Hero Section
    'hero.badge': 'ソウミャ・ランジャン・ダス',
    'hero.title1': 'スケーラブルな',
    'hero.title2': 'エンタープライズ構築',
    'hero.expert': '専門分野: ',
    'hero.titles.0': 'シニアフルスタック開発者',
    'hero.titles.1': 'Angular設計のエキスパート',
    'hero.titles.2': 'React & Node.js エンジニア',
    'hero.titles.3': 'エンタープライズシステム設計士',
    'hero.bio': '7年以上のフルスタック開発の経歴を持つシニア開発者＆Angularアーキテクト。堅牢な物流プラットフォームの構築、NgRx/RxJSによる状態管理、アジャイルチームの統率に強み。',
    'hero.cta.projects': 'プロジェクトを見る',
    'hero.cta.book': '面談を予約する',
    'hero.cta.cv': '履歴書を出力',

    // About Section
    'about.badge': '自己紹介',
    'about.heading': '7年以上にわたるフルスタック開発への情熱',
    'about.cap.fe.title': 'フロントエンド設計',
    'about.cap.fe.desc': 'Nxによるモノレポ構造、共通UIライブラリの構築、マイクロフロントエンド、および効率的な読み込みストリームの設計。',
    'about.cap.qa.title': 'コード品質管理',
    'about.cap.qa.desc': 'SonarQubeの静的分析ゲート、厳格なユニットテスト、および再利用可能なデザイン設計により、バグのないデリバリーを実現。',
    'about.cap.scrum.title': 'スクラムチーム指導',
    'about.cap.scrum.desc': 'スプリントの推進、ピアコードレビューのリード、RxJSおよびNgRxの状態管理ワークショップによるジュニアの育成。',
    'about.cap.be.title': 'バックエンド設計',
    'about.cap.be.desc': 'NestJS、Express、Node.jsを使用したマイクロサービスの設計、高効率キャッシュおよびリレーショナルデータベースの運用。',

    // Skills Section
    'skills.badge': '技術スタック',
    'skills.title': 'スキルマップ',
    'skills.desc': 'カードの上にカーソルを合わせると、各技術に合わせた特徴的な輝きのエフェクトが表示されます。',
    'skills.verified': '実務実績あり',

    // Experience Section
    'experience.badge': '職務経歴',
    'experience.title': 'キャリアタイムライン',
    'experience.desc': 'これまでの企業システム開発のログ。各職歴ブロックをクリックすると、成果と詳細が展開されます。',

    // Projects Section
    'projects.badge': '開発実績',
    'projects.title': '実績ショールーム',
    'projects.desc': '実務および代表的なWebシステム。GitHubのスター数やデータは、GitHub REST APIを介して動的に表示されます。',
    'projects.source': 'ソースコード',
    'projects.demo': '実機デモ',
    'projects.stars': 'スター',
    'projects.forks': 'フォーク',

    // Certifications Section
    'certifications.badge': '多様性',
    'certifications.title': '資格・興味分野',
    'certifications.desc': 'フルスタック開発の視野を広げる、第2のスキルセットや資格を示すカード。',

    // Blog Section
    'blog.badge': '技術ブログ',
    'blog.title': 'おすすめ記事',
    'blog.desc': '長年の開発実績から得られた、ソフトウェアエンジニアリングとシステムアーキテクチャの思考を共有。',

    // Contact Section
    'contact.badge': 'お問い合わせ',
    'contact.title': 'コミュニケーションハブ',
    'contact.desc': '面談ご希望の日時を選択してカレンダーを送信するか、メッセージフォームから直接メッセージを送信できます。',
    'contact.card.location': 'インド、オディシャ州、ブバネーシュワル',
    'contact.card.email': 'メールを送る',
    'contact.card.linkedin': 'LinkedInで繋がる',
    'contact.form.name': 'お名前',
    'contact.form.email': 'メールアドレス',
    'contact.form.message': 'メッセージ内容...',
    'contact.form.send': 'メッセージを送信',
    'contact.form.success': 'メッセージが正常に送信されました！',
    'contact.booking.title': '面談スケジュール予約',
    'contact.booking.time': '予約可能時間',
    'contact.booking.confirm': '予約が確定しました：',

    // Footer
    'footer.role': 'シニアフルスタック開発者＆Angularアーキテクト。著作権所有。'
  },
  or: {
    // Navigation Headers
    'nav.about': 'ପରିଚୟ',
    'nav.skills': 'ଦକ୍ଷତା',
    'nav.timeline': 'ଜୀବନରେଖା',
    'nav.showroom': 'ପ୍ରକଳ୍ପ',
    'nav.interests': 'ରୁଚି',
    'nav.blog': 'ବ୍ଲଗ୍',
    'nav.contact': 'ଯୋଗାଯୋଗ',
    'nav.brand': 'srd.OS',

    // Hero Section
    'hero.badge': 'ସୌମ୍ୟ ରଞ୍ଜନ ଦାସ',
    'hero.title1': 'ସ୍କେଲେବଲ୍ ଏବଂ ସୁଦୃଢ',
    'hero.title2': 'ଏଣ୍ଟରପ୍ରାଇଜ୍ ପ୍ଲାଟଫର୍ମ',
    'hero.expert': 'ବିଶେଷଜ୍ଞ: ',
    'hero.titles.0': 'ସିନିୟର ଫୁଲଷ୍ଟାକ ଡେଭେଲପର',
    'hero.titles.1': 'ଆଙ୍ଗୁଲାର ଆର୍କିଟେକ୍ଚର ବିଶେଷଜ୍ଞ',
    'hero.titles.2': 'ରିଆକ୍ଟ ଏବଂ ନୋଡ୍.ଜେଏସ୍ ଇଞ୍ଜିନିୟର',
    'hero.titles.3': 'ଏଣ୍ଟରପ୍ରାଇଜ୍ ସିଷ୍ଟମ୍ ଆର୍କିଟେକ୍ଟ',
    'hero.bio': 'ସିନିୟର ଫୁଲଷ୍ଟାକ ଡେଭେଲପର ଏବଂ ଆଙ୍ଗୁଲାର ଆର୍କିଟେକ୍ଟ, ଯାହାଙ୍କର ସୁଦୃଢ ଲଜିଷ୍ଟିକ୍ସ ପ୍ଲାଟଫର୍ମ, ଷ୍ଟେଟ୍ ଆର୍କିଟେକ୍ଟ ବିକଶିତ କରିବା ଏବଂ ମେଣ୍ଟରିଂ କରିବାରେ ୭+ ବର୍ଷର ଅଭିଜ୍ଞତା ରହିଛି।',
    'hero.cta.projects': 'ପ୍ରକଳ୍ପ ଗୁଡିକ ଦେଖନ୍ତୁ',
    'hero.cta.book': 'ସାକ୍ଷାତକାର ସମୟ ବୁକ୍ କରନ୍ତୁ',
    'hero.cta.cv': 'ରେଜ୍ୟୁମେ ପ୍ରିଣ୍ଟ୍ କରନ୍ତୁ',

    // About Section
    'about.badge': 'ସୌମ୍ୟଙ୍କ ବିଷୟରେ',
    'about.heading': 'ଫୁଲଷ୍ଟାକ କାରିଗରୀର ୭+ ବର୍ଷ',
    'about.cap.fe.title': 'ଫ୍ରଣ୍ଟଏଣ୍ଡ୍ ଆର୍କିଟେକ୍ଚର',
    'about.cap.fe.desc': 'ମୋନୋରେପୋ (Nx), ସେୟାର୍ଡ କମ୍ପୋନେଣ୍ଟ୍ ଲାଇବ୍ରେରୀ, ମାଇକ୍ରୋ-ଫ୍ରଣ୍ଟଏଣ୍ଡ୍ ଏବଂ ଅପ୍ଟିମାଇଜ୍ ହୋଇଥିବା ମଡ୍ୟୁଲ୍ ପ୍ରବାହର ବିଶେଷଜ୍ଞ।',
    'about.cap.qa.title': 'କୋଡ୍ ଗୁଣବତ୍ତା',
    'about.cap.qa.desc': 'ସୋନାରକ୍ୱିବ୍ (SonarQube) ଗୁଣବତ୍ତା ଗେଟ୍ ଏବଂ କଠୋର ପରୀକ୍ଷଣ ବ୍ୟବହାର କରି ଶୂନ୍ୟ-ବଗ୍ ଡେଲିଭରି ସୁନିଶ୍ଚିତ କରିବା।',
    'about.cap.scrum.title': 'ସ୍କ୍ରମ୍ ମେଣ୍ଟରସିପ୍',
    'about.cap.scrum.desc': 'ଜୁନିୟର ସଦସ୍ୟମାନଙ୍କୁ ସଠିକ୍ ଦିଗଦର୍ଶନ ଦେବା ପାଇଁ ସ୍ପ୍ରିଣ୍ଟର ନେତୃତ୍ୱ ନେବା ଏବଂ RxJS ଏବଂ NgRx ମାଷ୍ଟରକ୍ଲାସର ଆୟୋଜନ କରିବା।',
    'about.cap.be.title': 'ବ୍ୟାକଏଣ୍ଡ ସ୍କେଲବିଲିଟି',
    'about.cap.be.desc': 'ନେଷ୍ଟଜେଏସ (NestJS), ଏକ୍ସପ୍ରେସ ଏବଂ ଜଟିଳ ଡାଟାବେସର ବ୍ୟବହାର କରି ସୁଦୃଢ ମାଇକ୍ରୋସର୍ଭିସେସ ନିର୍ମାଣ କରିବା।',

    // Skills Section
    'skills.badge': 'ଦକ୍ଷତା ସମୂହ',
    'skills.title': 'ଯାନ୍ତ୍ରିକ ଦକ୍ଷତା',
    'skills.desc': 'ପ୍ରତ୍ୟେକ ପ୍ରଯୁକ୍ତିବିଦ୍ୟାର ବ୍ରାଣ୍ଡିଂ ଦ୍ୱାରା ଅନୁପ୍ରାଣିତ ଚମକ ଅନୁଭବ କରିବାକୁ କାର୍ଡ ଗୁଡିକ ଉପରେ ହୋଭର୍ କରନ୍ତୁ।',
    'skills.verified': 'ଉତ୍ପାଦନ ଯାଞ୍ଚ ହୋଇଛି',

    // Experience Section
    'experience.badge': 'ଟ୍ରାକ୍ ରେକର୍ଡ',
    'experience.title': 'କ୍ୟାରିୟରର ଜୀବନରେଖା',
    'experience.desc': 'କର୍ପୋରେଟ୍ ପ୍ରଣାଳୀର ବିସ୍ତୃତ ବିବରଣୀ। ବିବରଣୀ ଦେଖିବା ପାଇଁ ଯେକୌଣସି ବ୍ଲକ ଉପରେ କ୍ଲିକ୍ କରନ୍ତୁ।',

    // Projects Section
    'projects.badge': 'ପ୍ରକଳ୍ପ ସୋରୁମ୍',
    'projects.title': 'ପ୍ରକଳ୍ପ ସମୂହ',
    'projects.desc': 'ମୁଖ୍ୟ ଫୁଲଷ୍ଟାକ ୱେବ୍ ପ୍ରଣାଳୀ ଗୁଡିକ ଅନୁସନ୍ଧାନ କରନ୍ତୁ। ଗିଟ୍ ହବ୍ ମେଟ୍ରିକ୍ସ ସିଧାସଳଖ ଗିଟ୍ ହବ୍ API ମାଧ୍ୟମରେ ଅପଡେଟ୍ ହୁଏ।',
    'projects.source': 'ସୋର୍ସ କୋଡ୍',
    'projects.demo': 'ଲାଇଭ୍ ଡେମୋ',
    'projects.stars': 'ଷ୍ଟାର୍',
    'projects.forks': 'ଫୋର୍କ',

    // Certifications Section
    'certifications.badge': 'ବହୁମୁଖୀ ପ୍ରତିଭା',
    'certifications.title': 'ପ୍ରମାଣପତ୍ର ଏବଂ ରୁଚି',
    'certifications.desc': 'ମୋର ଫୁଲଷ୍ଟାକ ଦୂରଦୃଷ୍ଟିକୁ ସମୃଦ୍ଧ କରୁଥିବା ଦ୍ୱିତୀୟ ସ୍ତରୀୟ ଦକ୍ଷତାର ପ୍ରତିନିଧିତ୍ୱ କରୁଥିବା କାର୍ଡ ସମୂହ।',

    // Blog Section
    'blog.badge': 'ଯାନ୍ତ୍ରିକ ଜ୍ଞାନ',
    'blog.title': 'ଯାନ୍ତ୍ରିକ ବ୍ଲଗ୍',
    'blog.desc': 'କୋଡ୍ ବିତରଣରୁ ମିଳିଥିବା ସଫ୍ଟୱେର୍ ଇଞ୍ଜିନିୟରିଂ ଏବଂ ସିଷ୍ଟମ୍ ଆର୍କିଟେକ୍ଚର ଚିନ୍ତାଧାରା ବାଣ୍ଟିବା।',

    // Contact Section
    'contact.badge': 'ଯୋଗାଯୋଗ କରନ୍ତୁ',
    'contact.title': 'ଯୋଗାଯୋଗ କେନ୍ଦ୍ର',
    'contact.desc': 'ସିଧାସଳଖ ସନ୍ଦେଶ ପ୍ରେରଣ କିମ୍ବା ମୋ ସହିତ ଭିଡିଓ ବାର୍ତ୍ତାଳାପ ସମୟ ସୂଚୀ ନିର୍ଦ୍ଧାରଣ କରିବା ପାଇଁ ତାରିଖ/ସମୟ ସ୍ଲଟ୍ ଚୟନ କରନ୍ତୁ।',
    'contact.card.location': 'ଭୁବନେଶ୍ୱର, ଓଡ଼ିଶା, ଭାରତ',
    'contact.card.email': 'ମୋତେ ଇମେଲ୍ ପ୍ରେରଣ କରନ୍ତୁ',
    'contact.card.linkedin': 'ଲିଙ୍କଡଇନ୍ ନେଟୱର୍କ',
    'contact.form.name': 'ଆପଣଙ୍କ ନାମ',
    'contact.form.email': 'ଆପଣଙ୍କ ଇମେଲ୍',
    'contact.form.message': 'ଆପଣଙ୍କ ସନ୍ଦେଶ...',
    'contact.form.send': 'ସନ୍ଦେଶ ପ୍ରେରଣ କରନ୍ତୁ',
    'contact.form.success': 'ସନ୍ଦେଶ ସଫଳତାର ସହିତ ପ୍ରେରଣ ହୋଇଛି!',
    'contact.booking.title': 'ସାକ୍ଷାତକାର ସମୟ ନିର୍ଦ୍ଧାରକ',
    'contact.booking.time': 'ଉପଲବ୍ଧ ସମୟ ସ୍ଲଟ୍',
    'contact.booking.confirm': 'ସଫଳତାର ସହିତ ବୁକ୍ ହୋଇଛି:',

    // Footer
    'footer.role': 'ସିନିୟର ଫୁଲଷ୍ଟାକ ଡେଭେଲପର ଏବଂ ଆଙ୍ଗୁଲାର ଆର୍କିଟେକ୍ଟ। ସର୍ବାଧିକାର ସଂରକ୍ଷିତ।'
  }
};
