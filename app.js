gsap.registerPlugin(ScrollTrigger);

// ponytail: one list is the only place to swap section photography.
const IMAGE_ASSETS = [
  ['assets/first-pic-for-indexhtml.jpg', 'Curious brown dog looking toward the camera'],
  ['assets/qweqweqwe.jpg', 'Beagle peeking through a bright opening'],
  ['assets/ewrewrwrwr.jpg', 'Relaxed long-haired cat resting on a blanket'],
  ['assets/erwerwer.jpg', 'Golden dog standing in warm evening light'],
  ['assets/679686.jpg', 'Curious cat looking closely toward the camera'],
  ['assets/867676.jpg', 'French bulldog in a green jacket']
];

document.querySelectorAll('[data-image]').forEach(image => {
  const [src, alt] = IMAGE_ASSETS[image.dataset.image];
  image.src = src;
  if (!image.hasAttribute('alt')) image.alt = alt;
  image.closest('.animal-frame')?.style.setProperty('--section-image', `url("${src}")`);
});

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduced) {
  gsap.from('.hero-copy > *', { y: 36, opacity: 0, duration: .9, stagger: .1, ease: 'power3.out' });
  gsap.from('.hero-visual', { scale: .94, opacity: 0, duration: 1.2, ease: 'power3.out' });
  gsap.from('.hero .float-card', { y: 30, opacity: 0, duration: .8, delay: .65, stagger: .18, ease: 'back.out(1.4)' });
  gsap.to('.scroll-note span', { y: 7, repeat: -1, yoyo: true, duration: .8, ease: 'sine.inOut' });
  gsap.to('.orbit-one', { rotate: 30, repeat: -1, duration: 18, ease: 'none' });
  gsap.to('.orbit-two', { rotate: -30, repeat: -1, duration: 22, ease: 'none' });

  gsap.utils.toArray('.story').forEach((section, index) => {
    const image = section.querySelector('.portrait img');
    const copy = section.querySelectorAll('.story-copy > *');
    const card = section.querySelector('.float-card, .passport-card');
    const tl = gsap.timeline({ scrollTrigger: { trigger: section, start: 'top 68%', end: 'bottom 35%', toggleActions: 'play none none reverse' } });
    tl.from(section, { opacity: .45, duration: .9, ease: 'power2.out' })
      .from(image, { y: 18, opacity: .35, duration: 1.25, ease: 'power3.out' }, '<')
      .from(copy, { y: 42, opacity: 0, stagger: .1, duration: .75, ease: 'power3.out' }, '<.15');
    if (card) tl.from(card, { y: 45, opacity: 0, rotate: index % 2 ? 2 : -2, duration: .75, ease: 'back.out(1.3)' }, '-=.45');
    gsap.fromTo(image, { yPercent: 1.5 }, { yPercent: -1.5, ease: 'none', scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1.2 } });
    if (card) gsap.to(card, { yPercent: -10, ease: 'none', scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1.4 } });
  });

  gsap.from('.intro > *', { y: 35, opacity: 0, stagger: .12, duration: .8, scrollTrigger: { trigger: '.intro', start: 'top 75%' } });
  gsap.from('.final > *:not(.final-pets)', { y: 35, opacity: 0, stagger: .1, scrollTrigger: { trigger: '.final', start: 'top 70%' } });
  gsap.from('.final-pets img', { y: 130, opacity: 0, rotate: i => (i - 1) * 8, stagger: .12, duration: 1, ease: 'back.out(1.2)', scrollTrigger: { trigger: '.final-pets', start: 'top 90%' } });
}

addEventListener('scroll', () => document.querySelector('.nav').classList.toggle('scrolled', scrollY > 20), { passive: true });

const fa = {
  'Home':'خانه','Services':'خدمات','Vets':'دامپزشک‌ها','Shops':'فروشگاه‌ها','Pet Passport':'شناسنامه پت','Contact':'ارتباط با ما','Join Pawly':'بیا توی پالی',
  'The pet super app':'سوپر‌اپ دوست کوچولوت','Everything your pet needs,':'هر چیزی که کوچولوت لازم داره،','beautifully connected.':'همه یک‌جا و کنار هم.','Verified shops, trusted veterinarians, and a secure digital passport—one calm place for their whole life.':'فروشگاه‌های معتبر، دامپزشک‌های مطمئن و یک شناسنامه دیجیتال امن؛ یک جای دنج برای همه‌ی روزهای زندگی‌شون.','Get started':'شروع کنیم','Explore services':'دیدن خدمات','4.9 out of 5':'امتیاز ۴.۹ از ۵','Trusted by 24,000+ pet parents':'مورد اعتماد بیشتر از ۲۴ هزار پت‌پرنت','Health status':'وضعیت سلامتی','All looking good':'همه‌چی روبه‌راهه','Next visit':'ویزیت بعدی','Dr. Maya · 10:30':'دکتر مایا · ۱۰:۳۰','Scroll to explore':'اسکرول کن و ببین',
  'One connected ecosystem':'یک دنیای به‌هم‌پیوسته','Care that follows them':'مراقبتی که همه‌جا','everywhere.':'همراهشونه.','From an urgent video call to a favorite food reorder, Pawly keeps every part of pet care close and clear.':'از یک تماس فوری با دامپزشک تا سفارش دوباره‌ی غذای محبوبش؛ پالی همه‌چیز رو نزدیک، ساده و مرتب نگه می‌داره.',
  '01 / Active care':'۰۱ / مراقبت همیشه در دسترس','A great vet is always':'یک دامپزشک خوب همیشه','within reach.':'نزدیکته.','Find verified, active veterinarians by specialty, availability, and location. Book a clinic visit or start a video consultation in minutes.':'دامپزشک‌های فعال و تأییدشده رو بر اساس تخصص، زمان و محل پیدا کن. فقط در چند دقیقه وقت کلینیک بگیر یا مشاوره تصویری شروع کن.','Verified professional profiles':'پروفایل‌های حرفه‌ای و تأییدشده','Live availability and simple booking':'زمان‌های خالی واقعی و رزرو راحت','Find a veterinarian':'پیدا کردن دامپزشک','Available now':'الان در دسترسه','Dr. Maya Chen':'دکتر مایا چن','General care · ★ 4.9':'مراقبت عمومی · ★ ۴.۹','Video ↗':'تماس تصویری ↗',
  '02 / Trusted marketplace':'۰۲ / بازار مطمئن','Only the good stuff, from':'فقط چیزهای خوب، از','verified shops.':'فروشگاه‌های معتبر.','Discover trusted local stores, compare essentials, and order with confidence. Every seller is reviewed before they join Pawly.':'فروشگاه‌های محلی مطمئن رو پیدا کن، وسایل ضروری رو مقایسه کن و با خیال راحت سفارش بده. همه‌ی فروشنده‌ها قبل از ورود به پالی بررسی می‌شن.','Verified shops':'فروشگاه معتبر','30 min':'۳۰ دقیقه','Avg. delivery':'میانگین ارسال','Explore the marketplace':'گشتن توی فروشگاه‌ها','Verified shop':'فروشگاه تأییدشده','Good Tail Market':'فروشگاه گود تیل','Free delivery · 25 min':'ارسال رایگان · ۲۵ دقیقه',
  '03 / Pet passport':'۰۳ / شناسنامه پت','Their whole health story,':'همه‌ی داستان سلامتی‌ش،','safe in one place.':'امن و یک‌جا.','A secure electronic identity for every pet. Keep prescriptions, allergies, vaccinations, notes, and medical history ready whenever care is needed.':'یک هویت دیجیتال امن برای هر پت. نسخه‌ها، حساسیت‌ها، واکسن‌ها، یادداشت‌ها و سابقه پزشکی همیشه آماده‌ست؛ درست وقتی بهش نیاز داری.','Prescriptions':'نسخه‌ها','Allergies':'حساسیت‌ها','Vaccines':'واکسن‌ها','Medical notes':'یادداشت‌های پزشکی','Create pet profile':'ساختن پروفایل پت','PET PASSPORT':'شناسنامه پت','PAWLY ID':'شناسه پالی','Pet name':'اسم کوچولو','Milo':'مایلو','Border Collie · 3 years':'بردر کولی · ۳ ساله','VERIFIED':'تأییدشده','Blood type':'گروه خونی','Microchip':'میکروچیپ',
  '04 / Connected platform':'۰۴ / پلتفرم یکپارچه','Everyone on the same page.':'همه با هم هماهنگن.','Finally.':'بالاخره!','Pawly connects pet parents, clinics, and shops through one trusted third-party platform—so information moves, without the phone calls and paperwork.':'پالی پت‌پرنت‌ها، کلینیک‌ها و فروشگاه‌ها رو در یک پلتفرم مستقل و مطمئن به هم وصل می‌کنه؛ اطلاعات راحت جابه‌جا می‌شه، بدون تماس‌های پشت‌سرهم و کاغذبازی.','Permission-based record sharing':'اشتراک‌گذاری پرونده فقط با اجازه تو','One profile across every provider':'یک پروفایل برای همه‌ی ارائه‌دهنده‌ها','Records synced':'پرونده به‌روز شد','Clinic → Pawly':'کلینیک ← پالی','Just now':'همین الان',
  '05 / Everyday wellbeing':'۰۵ / حال خوب هر روز','Small reminders.':'یادآوری‌های کوچیک.','A healthier life.':'یک زندگی سالم‌تر.','Stay ahead of checkups, refills, medications, and seasonal care with gentle reminders shaped around your pet.':'با یادآوری‌های آروم و مخصوص کوچولوی خودت، از چکاپ‌ها، تمدید نسخه، داروها و مراقبت‌های فصلی جا نمونی.','See how Pawly works':'ببین پالی چطور کار می‌کنه','Today · 7:00 PM':'امروز · ساعت ۷ عصر','Give heartworm tablet':'وقت قرص ضد انگله','Done':'انجام شد',
  'Better care starts here':'مراقبت بهتر از همین‌جا شروع می‌شه','Their world, cared for.':'دنیای اون‌ها، با عشق مراقبت می‌شه.','All in one app.':'همه توی یک اپ.','Join thousands of pet parents building happier, healthier lives with Pawly.':'کنار هزاران پت‌پرنت دیگه، با پالی برای کوچولوت یک زندگی شادتر و سالم‌تر بساز.','Get started free':'رایگان شروع کن','Talk to our team':'با ما گپ بزن','Care, beautifully connected.':'مراقبت، قشنگ و یکپارچه.','© 2026 Pawly':'© ۲۰۲۶ پالی'
};

const textNodes = [...document.querySelectorAll('body *')].flatMap(el => [...el.childNodes]).filter(node => node.nodeType === 3 && node.textContent.trim());
const english = new Map(textNodes.map(node => [node, node.textContent]));
const language = document.querySelector('.language');

language.addEventListener('click', () => {
  const toFa = document.documentElement.lang !== 'fa';
  document.documentElement.lang = toFa ? 'fa' : 'en';
  document.documentElement.dir = toFa ? 'rtl' : 'ltr';
  textNodes.forEach(node => {
    const original = english.get(node);
    const key = original.trim();
    node.textContent = toFa && fa[key] ? original.replace(key, fa[key]) : original;
  });
  language.textContent = toFa ? 'EN' : 'فا';
  language.setAttribute('aria-label', toFa ? 'Switch language to English' : 'تغییر زبان به فارسی');
  document.title = toFa ? 'پالی — مراقبت از پت، همه یک‌جا' : 'Pawly — Pet care, beautifully connected';
  document.querySelector('meta[name="description"]').content = toFa ? 'پالی، پت‌پرنت‌ها را به فروشگاه‌های معتبر و دامپزشک‌های فعال وصل می‌کند.' : 'Pawly connects pet parents, verified shops and active veterinarians in one trusted super app.';
  localStorage.setItem('pawly-language', toFa ? 'fa' : 'en');
  ScrollTrigger.refresh();
});

if (localStorage.getItem('pawly-language') === 'fa') language.click();
