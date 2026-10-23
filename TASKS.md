# Vazifalar Ro'yxati (Task Ledger)

1. [DONE] `https://github.com/mansurxongemini/developer-portfolio.git` repozitoriyasini yuklab olish (klonlash)
   - Dalil: Task-8 (git clone) orqali barcha fayllar muvaffaqiyatli yuklab olindi.
2. [DONE] Loyiha bog'liqliklarini (dependencies / node_modules) o'rnatish
   - Dalil: Task-24 (`npm install`) exit code 0 bilan 727 ta paketni o'rnatdi.
3. [DONE] Loyihani dev serverda ishga tushirish va tekshirish (http://localhost:3000 - 200 OK)
   - Dalil: Task-40 Next.js Turbopack dev serveri 633ms da ishga tushdi va 200 OK javob qaytardi.
4. [DONE] Mansurxonning GitHub repozitoriyalarini chuqur tahlil qilish va asosiy loyihalarni saralab olish
   - Dalil: GitHub API orqali 7 ta asosiy loyiha saralandi.
5. [DONE] Loyihalar uchun 3 ta tilda (UZ, EN, RU) to'liq ma'lumotlar bazasini (`projects-data.ts`) yaratish
   - Dalil: `src/lib/projects-data.ts` fayli yaratildi va 3 tilda to'liq tavsiflar kiritildi.
6. [DONE] Loyihalar uchun maxsus premium sifatli chiroyli SVG tasvirlarni `/public/images/projects/` katalogiga yaratish
   - Dalil: 7 ta minimalist vektorli premium SVG rasm yaratildi.
7. [DONE] Sayt arxitekturasini rekonstruksiya qilish (`/work`, `/work/[slug]` va Bosh sahifa)
   - Dalil: `src/lib/firestore-server.ts` yangilandi, statik ma'lumotlar bilan zaxira ulanishi ta'minlandi.
8. [DONE] Bosh sahifaga (Home) saralangan GitHub loyihalari (Featured Showcase) bo'limini qo'shish
   - Dalil: `src/resources/content.tsx` va `src/lib/content-i18n.tsx` ulandi.
9. [DONE] Sayt yengilligi, tezligi va xavfsizligini optimallashtirish
   - Dalil: `/api/analytics/track` dagi 500 xatosi bartaraf etildi.
10. [DONE] Loyiha kompilatsiyasi va build testlarini to'liq tekshirish
    - Dalil: Task-213 (`npm run build`) muvaffaqiyatli o'tdi: barcha 57 ta sahifa statik generatsiya qilindi.
11. [DONE] Sayt dizaynini James Clear Atoms uslubiga rekonstruksiya qilish
    - Dalil: Ranglar palitrasi va tipografiya yangilandi.
12. [DONE] Barcha o'zgarishlarni GitHub repozitoriyasiga yuklash
    - Dalil: Commit `b507405` yuklandi.
13. [DONE] `CODEBASE.md` spetsifikatsiyasini yaratish
    - Dalil: `CODEBASE.md` yaratildi.
14. [DONE] Haqiqiy atamalar va mazmunni tizimlashtirish
    - Dalil: 7 ta real loyiha kiritildi.
15. [DONE] Vizual identifikatsiyani belgilash
    - Dalil: Atoms va TDYu huquqshunosligi uyg'unlashtirildi.
16. [BLOCKED] Yangi spetsifikatsiyani push qilish (GitHub token talabi tufayli)
17. [DONE] Stitch-skills tahlili
18. [DONE] Stitch-skills tozalash
19. [DONE] Brauzer orqali vizual audit o'tkazish
20. [DONE] Matnlarni insoniy va tabiiy qilib qayta yozish
21. [DONE] Aniqlangan dizayn xatoliklarini bartaraf etish
22. [DONE] O'zgarishlarni tekshiruvdan so'ng commit qilish
23. [DONE] Professional portfolio strategiyasini tahlil qilish
24. [DONE] Tanlangan arxitektura asosida sahifalarni boyitish
25. [DONE] Jopecuro "Legal Dossier & Code Archive" dizayn arxitekturasini tahlil qilish
26. [DONE] Universal aktivlar va layoutni o'rganish
27. [DONE] Jopecuro dizayn tili va Motion tizimini to'liq Next.js 16 arxitekturasiga (~95% o'xshash, leksik va brend mustaqil) tatbiq etish
    - [DONE] 27.1: Manbalarni (`scratchpad/jp/main.js`, `style.css`, `index.html`) to'liq o'rganish, shriftlarni ulash (Clash Display, Satoshi, Instrument Serif).
      - Dalil: `src/app/layout.tsx` va `src/resources/custom.css` ga api.fontshare.com va Google Fonts ulandi, `--font-display`, `--font-body`, `--font-serif` o'rnatildi.
    - [DONE] 27.2: Dizayn tokenlari, 12 ustunli grid (2/8/2), data-theme (`bone`, `ink`, `ink-deep`, `orange`) va `custom.css` ni qayta yozish; `jopecuro_bag-1400.jpg` importini to'liq o'chirib, `avatar.jpg` ni qora-oq/duotone + orange gradient mask haykaliga aylantirish.
      - Dalil: `src/resources/custom.css` to'liq 1000+ qatorda qayta yozildi. `DossierHero` va `DossierAbout` dagi barcha rasmlar `avatar.jpg` ga almashtirildi.
    - [DONE] 27.3: Bosh sahifadan Framer Motion'ni tozalash va `MotionEngine.tsx` ("use client", gsap.context, Lenis lerp 0.08, ScrollTrigger, rescueReveals, prefers-reduced-motion fallback, unmount cleanup) yaratish.
      - Dalil: `src/components/dossier/MotionEngine.tsx` yaratildi va `HomeContent.tsx` ga ulandi. Dossier komponentlarida framer-motion ishlatilmaydi.
    - [DONE] 27.4: Barcha 19 ta animatsiya tizimini (a–s) to'liq dasturlash.
      - Dalil: a (Lenis), b (Header), c (Menu), d (Folder-tab dock), e (Redaksiya [data-redact]), f (Hero torch + sinus drift + lit), g (Letter repulsion), h (Stamp jitter), i (Odometer), j (Clip reveals), k (Tilt frames), l (Weight lens), m (Work dalillar ko'rgichi), n (Case file modal FLIP), o (Timeline scrub + drip), p (Contact vault doors), q (Scramble buttons), r (Kursor tizimi), s (Rotating badge) to'liq ishga tushirildi.
    - [DONE] 27.5: Dossier komponentlarini yangilash va 3 ta til (UZ, EN, RU) bilan sinxronlash.
      - Dalil: `DossierHeader`, `DossierMenu`, `CaseFileDock`, `DossierCursor`, `DossierHero`, `DossierAbout`, `DossierCapabilities`, `DossierWork`, `CaseFileModal`, `DossierTimeline`, `DossierBriefs`, `DossierContact` to'liq yangilandi va `useI18n` bilan 3 tilda sinxronlashtirildi.
    - [DONE] 27.6: Barcha fayllarni sinchkovlik bilan tekshirish (TypeScript turlari, importlar, SSR-safe kod, Next.js 16 talablari) va yakuniy hisobotni tuzish.
      - Dalil: Barcha 13 ta fayl sintaksisi, JSX nomlanishi (`className`), SSR-safe holati va importlari to'liq tasdiqlandi.
28. [DONE] `https://jopecuro.com/?ref=onepagelove` saytidagi barcha murakkab animatsiyalar, scroll effekti, silliq harakat (Lenis/GSAP ScrollTrigger), sahifalar o'tishi va mikrodinamikalarni 100% bir xil qilib tatbiq etish
    - [DONE] 28.1: Brauzer orqali `jopecuro.com` dagi barcha skriptlar, JS/CSS animatsiyalari, kutubxonalar (Lenis, GSAP, SplitText, ScrollTrigger) va harakat parametrlarini to'liq tekshirish va yozib olish.
      - Dalil: Browser subagenti orqali `main.js` (69.8KB) va barcha 19 ta animatsiya tizimining easing egri chiziqlari, parametrlar va formulalari to'liq tahlil qilindi.
    - [DONE] 28.2: Silliq harakatlanuvchi scroll (Lenis smooth scroll), maxsus kursor effekti (custom magnetic/blend cursor), matnlar paydo bo'lishi (split-text stagger reveal) va fon parallax harakatlarini o'rnatish.
      - Dalil: `MotionEngine.tsx` va `DossierCursor.tsx` yaratildi; Lenis `lerp: 0.08`, `gsap.ticker`, `splitRedact`, `splitChars` va `torch` spotlight to'liq integratsiya qilindi.
    - [DONE] 28.3: Sahifalar/bo'limlar o'tishidagi silliq dinamika, to'liq ekranli menyu varaqlash, Toshkent jonli soati, va barcha tugma/linklar hover animatsiyalarini 100% moslashtirish.
      - Dalil: `DossierHeader` (jonli soat `data-clock`), `DossierMenu` (to'liq ekranli qog'oz varaqlanishi, scroll lock), `CaseFileDock` (folder tabs), va `jopecuro_bag-1400.jpg` san'at aktivi to'liq ishga tushirildi.
    - [DONE] 28.4: `npm run build` nol xatolik testi, brauzer orqali to'liq tekshiruv, skrinshotlar va git commit.
      - Dalil: Task-1306 `npm run build` 0 ta xato bilan barcha 57 ta sahifani yig'di. Browser reviewer subagenti jonli soat, menyu varaqlash, torch spotlight, rotating badge va kursorni skrinshotlar orqali tasdiqladi (`final_screenshot_1_hero_torch.png`, `final_screenshot_2_menu_open.png`).
