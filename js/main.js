import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

const gsap=window.gsap,ScrollTrigger=window.ScrollTrigger;
gsap.registerPlugin(ScrollTrigger);
const $=(s,c=document)=>c.querySelector(s);
const $$=(s,c=document)=>[...c.querySelectorAll(s)];
const REDUCED=matchMedia('(prefers-reduced-motion: reduce)').matches;
const TOUCH=matchMedia('(pointer: coarse)').matches;
const clampN=(v,a,b)=>Math.min(b,Math.max(a,v));
const lerp=(a,b,t)=>a+(b-a)*t;

/* ============ i18n ============ */
const I18N={
en:{
 'a11y.skip':'Skip to content','loader.status':'Entering the singularity',
 'doc.title':'Mr.A — Creative Developer · Singularity',
 'doc.desc':'A cinematic ten-chapter journey around a living violet singularity. One continuous scene — scroll controls the camera, the light and the story.',
 'nav.about':'About','nav.skills':'Skills','nav.work':'Work','nav.journey':'Journey','nav.contact':'Contact',
 'ch.hero':'Prologue','ch.about':'About','ch.manifesto':'Manifesto','ch.skills':'Skills','ch.work':'Work','ch.journey':'Journey','ch.process':'Method','ch.recognition':'Recognition','ch.signals':'Signals','ch.contact':'Epilogue',
 'mood.hero':'mystery','mood.about':'discovery','mood.manifesto':'belief','mood.skills':'creation','mood.work':'exploration','mood.journey':'growth','mood.process':'craft','mood.recognition':'honor','mood.signals':'echoes','mood.contact':'stillness',
 'hero.kicker':'Chapter 00 — Prologue','hero.l1':'Mr.A','hero.l2':'',
 'hero.sub':'You are not scrolling a website. You are travelling through pure dark space around a living singularity — ten chapters, one continuous scene. Scroll to begin.',
 'hero.cta1':'View selected work','hero.cta2':'Start a conversation','hero.scroll':'Scroll',
 'i1':'Silence ends. Gravity takes hold — you begin to fall.',
 'i2':'The field strengthens. Principles condense out of the dark.',
 'i3':'You drift closer. The horizon brightens with work.',
 'i4':'Every orbit leaves a trace.',
 'i5':'The work speaks. Honors follow.',
 'i6':'Signals arrive from distant collaborators.',
 'i7':'The field grows calm. The journey slows to a whisper.',
 'about.label':'Chapter 01 — About','about.title':'Flying beside the event horizon.',
 'about.p1':'For over seven years I have built premium, immersive web experiences for forward-thinking brands — places where design, motion and engineering converge into one seamless gravitational field.',
 'about.p2':'My belief is simple: every frame matters, every millisecond matters. Detail is what turns a website into a product, and a product into a memory. This portfolio is one continuous scene — one camera, one black hole, one journey.',
 'about.s1':'Years of craft','about.s2':'Projects shipped','about.s3':'Awards & honors','about.s4':'Countries served',
 'manifesto.label':'Chapter 02 — Manifesto',
 'm1':'A website should feel <em>inevitable.</em>','m2':'Motion is <em>meaning</em> — never decoration.','m3':'Performance is a form of <em>respect.</em>','m4':'Detail is the <em>loudest</em> signal.',
 'skills.label':'Chapter 03 — Skills','skills.title':'Born from the gravitational field.',
 'skills.hint':'Everything below orbits the same core: real-time graphics, motion and meticulous engineering.',
 'skills.t1':'Real-time 3D & Shaders','skills.t2':'Motion & Interaction','skills.t3':'Frontend Architecture','skills.t4':'Creative Direction',
 'work.label':'Chapter 04 — Selected Work','work.title':'Emerged from the portal.',
 'work.hint':'Hover — feel the gravity. Click — open the case without leaving the scene.',
 'journey.label':'Chapter 05 — Experience','journey.title':'One orbit, completed.',
 'process.label':'Chapter 06 — Method','process.title':'A method, not a mystery.',
 'recognition.label':'Chapter 07 — Recognition','recognition.title':'Signal confirmed by the industry.',
 'signals.label':'Chapter 08 — Signals','signals.title':'Transmissions received.',
 'contact.label':'Chapter 09 — Epilogue','contact.title':'The journey ends in quiet gravity.',
 'contact.sub':'The field is calm now. If something here resonated, let’s build something extraordinary together.',
 'form.name':'Name','form.namePh':'Your name','form.email':'Email','form.msg':'Message','form.msgPh':'Tell me about your project…','form.send':'Send transmission','form.note':'Replies within 48 hours','form.incomplete':'Please complete all fields','form.opening':'Opening your mail client…',
 'modal.year':'Year','modal.role':'Role','modal.stack':'Stack','modal.visit':'Visit live site',
 'footer.rights':'All rights reserved.','footer.end':'end of transmission','footer.top':'Back to top'
},
fa:{
 'a11y.skip':'پرش به محتوا','loader.status':'ورود به تکینگی',
 'doc.title':'Mr A — توسعه‌دهنده خلاق · تکینگی',
 'doc.desc':'سفری سینمایی در ده فصل به دور یک تکینگی بنفشِ زنده؛ یک صحنه‌ی پیوسته — اسکرول، دوربین، نور و داستان را کنترل می‌کند.',
 'nav.about':'درباره من','nav.skills':'مهارت‌ها','nav.work':'پروژه‌ها','nav.journey':'مسیر','nav.contact':'تماس',
 'ch.hero':'پیش‌درآمد','ch.about':'درباره من','ch.manifesto':'مانیفست','ch.skills':'مهارت‌ها','ch.work':'پروژه‌ها','ch.journey':'مسیر','ch.process':'روش','ch.recognition':'افتخارات','ch.signals':'سیگنال‌ها','ch.contact':'پایان',
 'mood.hero':'رمز و راز','mood.about':'کشف','mood.manifesto':'باور','mood.skills':'آفرینش','mood.work':'کاوش','mood.journey':'رشد','mood.process':'ظرافت','mood.recognition':'افتخار','mood.signals':'پژواک','mood.contact':'سکون',
 'hero.kicker':'فصل ۰۰ — پیش‌درآمد','hero.l1':'Mr.A','hero.l2':'',
 'hero.sub':'تو یک وب‌سایت را اسکرول نمی‌کنی؛ در فضای تاریکِ مطلق، به دور یک تکینگی زنده سفر می‌کنی — ده فصل، یک صحنه‌ی پیوسته. برای آغاز، اسکرول کن.',
 'hero.cta1':'مشاهده‌ی پروژه‌ها','hero.cta2':'شروع گفت‌وگو','hero.scroll':'اسکرول',
 'i1':'سکوت تمام می‌شود. گرانش دست به کار می‌شود — سقوط آغاز است.',
 'i2':'میدان قوی‌تر می‌شود. اصول از دلِ تاریکی متراکم می‌شوند.',
 'i3':'نزدیک‌تر می‌شوی. افق از کار روشن می‌شود.',
 'i4':'هر مداری، ردی از خود به جا می‌گذارد.',
 'i5':'کار سخن می‌گوید. افتخارات از راه می‌رسند.',
 'i6':'سیگنال‌هایی از همکارانِ دوردست.',
 'i7':'میدان آرام می‌گیرد. سفر به زمزمه می‌رسد.',
 'about.label':'فصل ۰۱ — درباره من','about.title':'پرواز در کنار افق رویداد',
 'about.p1':'بیش از هفت سال است که تجربه‌های وبِ سطح بالا و فراگیر برای برندهای پیشرو می‌سازم — جاهایی که طراحی، حرکت و مهندسی در یک میدان گرانشی یکپارچه هم‌جوش می‌شوند.',
 'about.p2':'باور من ساده است: هر فریم مهم است، هر میلی‌ثانیه مهم است. جزئیات است که وب‌سایت را به محصول، و محصول را به خاطره تبدیل می‌کند. این پورتفولیو یک صحنه‌ی پیوسته است — یک دوربین، یک سیاه‌چاله، یک سفر.',
 'about.s1':'سال تجربه','about.s2':'پروژه‌ی منتشرشده','about.s3':'جایزه و افتخار','about.s4':'کشور جهان',
 'manifesto.label':'فصل ۰۲ — مانیفست',
 'm1':'وب‌سایت باید <em>اجتناب‌ناپذیر</em> به نظر برسد.','m2':'حرکت <em>معنا</em> است — نه تزئین.','m3':'کارایی شکلی از <em>احترام</em> است.','m4':'جزئیات، <em>بلندترین</em> سیگنال است.',
 'skills.label':'فصل ۰۳ — مهارت‌ها','skills.title':'زاده‌ی میدان گرانشی',
 'skills.hint':'همه‌ی آنچه در ادامه می‌آید دور یک هسته می‌گردد: گرافیک بلادرنگ، حرکت و مهندسی دقیق.',
 'skills.t1':'سه‌بعدی بلادرنگ و شیدرها','skills.t2':'حرکت و تعامل','skills.t3':'معماری فرانت‌اند','skills.t4':'کارگردانی خلاق',
 'work.label':'فصل ۰۴ — پروژه‌ها','work.title':'از دروازه بیرون آمده‌اند',
 'work.hint':'هاور کن — گرانش را حس کن. کلیک کن — بدون ترک صحنه، جزئیات را ببین.',
 'journey.label':'فصل ۰۵ — مسیر','journey.title':'یک مدار، کامل شد.',
 'process.label':'فصل ۰۶ — روش','process.title':'روش، نه رمز و راز.',
 'recognition.label':'فصل ۰۷ — افتخارات','recognition.title':'تأیید صنعت، دریافت شد.',
 'signals.label':'فصل ۰۸ — سیگنال‌ها','signals.title':'پیام‌های دریافتی.',
 'contact.label':'فصل ۰۹ — پایان','contact.title':'سفر در گرانشِ آرام تمام می‌شود.',
 'contact.sub':'میدان حالا آرام است. اگر چیزی اینجا طنین‌انداز شد، بیا با هم چیزی خارق‌العاده بسازیم.',
 'form.name':'نام','form.namePh':'نام شما','form.email':'ایمیل','form.msg':'پیام','form.msgPh':'درباره‌ی پروژه‌ات بگو…','form.send':'ارسال پیام','form.note':'پاسخ در کمتر از ۴۸ ساعت','form.incomplete':'لطفاً همه‌ی فیلدها را پر کن','form.opening':'در حال باز کردن ایمیل…',
 'modal.year':'سال','modal.role':'نقش','modal.stack':'فناوری‌ها','modal.visit':'مشاهده‌ی وب‌سایت',
 'footer.rights':'تمام حقوق محفوظ است.','footer.end':'پایان ارسال','footer.top':'بازگشت به بالا'
}};
let lang=localStorage.getItem('sk-lang')||((navigator.language||'').toLowerCase().startsWith('fa')?'fa':'en');
const t=k=>(I18N[lang]&&I18N[lang][k])??I18N.en[k]??k;
const DS=()=>document.documentElement.dir==='rtl'?-1:1;

/* ============ data ============ */
const CHAPTER_KEYS=['hero','about','manifesto','skills','work','journey','process','recognition','signals','contact'];
const CHAPTER_NUM=['00','01','02','03','04','05','06','07','08','09'];
const PROJECTS=[
 {id:'eventide',featured:true,year:'2025',img:'https://image.qwenlm.ai/public_source/592f8261-52d5-4c70-a830-77a176a318f2/19bc32744-3009-4e1f-8f91-656ec36c1e87.png',cat:{en:'WebGL',fa:'WebGL'},
  title:{en:'Eventide — Orbital Brand Universe',fa:'ایون‌تاید — جهان برند مداری'},
  role:{en:'Creative Developer',fa:'توسعه‌دهنده خلاق'},
  desc:{en:'An immersive scroll-driven brand universe: cinematic camera paths and evolving light around a living singularity — locked at 60fps on mid-range hardware.',fa:'جهان برند فراگیر و اسکرول‌محور: مسیرهای دوربین سینمایی و نور پویا به دور یک تکینگی زنده — با ۶۰ فریم ثابت روی سخت‌افزار متوسط.'},
  tags:['Three.js','GLSL','GSAP']},
 {id:'halcyon',year:'2025',img:'https://image.qwenlm.ai/public_source/592f8261-52d5-4c70-a830-77a176a318f2/1859d89bd-d797-4911-81d1-7f8e3c0c8070.png',cat:{en:'Product',fa:'محصول'},
  title:{en:'Halcyon — Holographic Fintech',fa:'هالسیون — فین‌تک هولوگرافیک'},
  role:{en:'Lead Frontend Engineer',fa:'مهندس ارشد فرانت‌اند'},
  desc:{en:'A real-time analytics suite rendered as translucent holographic panels: GPU-accelerated charts, calm legibility and buttery interaction.',fa:'سویت تحلیلی بلادرنگ در قالب پنل‌های هولوگرافیک نیمه‌شفاف: نمودارهای شتاب‌گرفته با GPU، خوانایی آرام و تعامل روان.'},
  tags:['Product','Data-viz','WebGL']},
 {id:'monolith',year:'2024',img:'https://image.qwenlm.ai/public_source/592f8261-52d5-4c70-a830-77a176a318f2/14db04bd0-b289-4530-914c-765acf631dce.png',cat:{en:'Product',fa:'محصول'},
  title:{en:'Monolith — Spatial Audio Device',fa:'مونولیت — دستگاه صدای فضایی'},
  role:{en:'Creative Developer',fa:'توسعه‌دهنده خلاق'},
  desc:{en:'Launch site for a spatial-audio orb: a 3D product configurator with physically-based materials, halo lighting and a frictionless commerce flow.',fa:'سایت رونمایی یک گوی صدای فضایی: پیکربندی سه‌بعدی محصول با متریال‌های فیزیکی، نور هاله‌ای و جریان خرید بدون اصطکاک.'},
  tags:['3D','PBR','Commerce']},
 {id:'silk',year:'2024',img:'https://image.qwenlm.ai/public_source/592f8261-52d5-4c70-a830-77a176a318f2/1e285861a-aded-40e5-bbae-3a61ba38c1cf.png',cat:{en:'Art',fa:'هنر'},
  title:{en:'Silk — Generative Installation',fa:'سیلک — نصب مولد'},
  role:{en:'WebGL Artist',fa:'هنرمند WebGL'},
  desc:{en:'A generative installation for a digital gallery: ribbons of light woven from visitor movement, simulated with custom GLSL cloth and flow fields.',fa:'نصب هنری مولد برای یک گالری دیجیتال: روبان‌های نور بافته‌شده از حرکت مخاطب، با شبیه‌سازی پارچه GLSL و میدان‌های جریان.'},
  tags:['Generative','GLSL','Installation']},
 {id:'vanta',year:'2023',img:'https://image.qwenlm.ai/public_source/592f8261-52d5-4c70-a830-77a176a318f2/1e6c59a23-e870-4698-ae2b-b4f9b77c9840.png',cat:{en:'WebGL',fa:'WebGL'},
  title:{en:'Vanta — Couture in Zero Gravity',fa:'وانتا — اوت‌کوتور در بی‌وزنی'},
  role:{en:'Creative Developer',fa:'توسعه‌دهنده خلاق'},
  desc:{en:'A digital couture editorial where a gown of light particles responds to scroll and pointer — fabric simulated in GLSL, photographed by a virtual camera.',fa:'ادیتوریال دیجیتال اوت‌کوتور که در آن لباسی از ذرات نور به اسکرول و اشاره‌گر واکنش نشان می‌دهد — پارچه در GLSL شبیه‌سازی شده است.'},
  tags:['Fashion','WebGL','Editorial']},
 {id:'aether',featured:true,year:'2023',img:'https://image.qwenlm.ai/public_source/592f8261-52d5-4c70-a830-77a176a318f2/10fdcb34b-248e-403b-8f9f-9be60f149a0c.png',cat:{en:'Product',fa:'محصول'},
  title:{en:'Aether — Automotive Configurator',fa:'آیتر — پیکربندی خودرو'},
  role:{en:'Lead 3D Engineer',fa:'مهندس ارشد سه‌بعدی'},
  desc:{en:'A zero-gravity showroom for an electric concept car: physically-based paint, halo lighting and a frictionless configuration flow at a locked 60fps.',fa:'نمایشگاه بی‌وزنی برای یک خودروی مفهومی برقی: رنگ فیزیکی، نور هاله‌ای و جریان پیکربندی بدون اصطکاک با ۶۰ فریم ثابت.'},
  tags:['Automotive','Real-time 3D','Commerce']}
];
const JOURNEY=[
 {yr:'2024 — Now',yrFa:'۲۰۲۴ — اکنون',t:{en:'Lead Creative Developer',fa:'توسعه‌دهنده خلاق ارشد'},c:{en:'Gravity Studio · Remote',fa:'استودیو گرویتی · ریموت'},d:{en:'Directing award-level interactive experiences; owning the full pipeline from shader R&D to shipped, measurable products.',fa:'کارگردانی تجربه‌های تعاملی در سطح جوایز جهانی؛ مالکیت کامل مسیر از تحقیق شیدر تا محصول منتشرشده و قابل اندازه‌گیری.'}},
 {yr:'2022 — 2024',yrFa:'۲۰۲۲ — ۲۰۲۴',t:{en:'Senior Frontend Engineer',fa:'مهندس ارشد فرانت‌اند'},c:{en:'Nebula Labs · Berlin',fa:'نبولا لبز · برلین'},d:{en:'Built GPU-accelerated data visualization and a real-time design system serving millions of sessions.',fa:'ساخت بصری‌سازی داده شتاب‌گرفته با GPU و دیزاین‌سیستم بلادرنگ برای میلیون‌ها نشست.'}},
 {yr:'2020 — 2022',yrFa:'۲۰۲۰ — ۲۰۲۲',t:{en:'Creative Developer',fa:'توسعه‌دهنده خلاق'},c:{en:'Orbit Agency · Amsterdam',fa:'آژانس آربیت · آمستردام'},d:{en:'Shipped scroll-driven 3D campaigns for fashion and automotive brands; two international site-of-the-day honors.',fa:'انتشار کمپین‌های سه‌بعدی اسکرول‌محور برای برندهای مد و خودرو؛ دو جایزه‌ی بین‌المللی سایت روز.'}},
 {yr:'2018 — 2020',yrFa:'۲۰۱۸ — ۲۰۲۰',t:{en:'Frontend Developer',fa:'توسعه‌دهنده فرانت‌اند'},c:{en:'Studio Meridian · Tehran',fa:'استودیو مریدین · تهران'},d:{en:'Crafted editorial websites and e-commerce with obsessive typography and motion detail.',fa:'ساخت وب‌سایت‌های ادیتوریال و فروشگاه با وسواس در تایپوگرافی و جزئیات حرکت.'}}
];
const PROCESS=[
 {t:{en:'Discover',fa:'کشف'},d:{en:'Deep understanding of the business, the audience and the goals — before a single line of code is written.',fa:'درک عمیق کسب‌وکار، مخاطب و اهداف — پیش از نوشتن حتی یک خط کد.'},wk:{en:'Wk 01',fa:'هفته ۰۱'}},
 {t:{en:'Design',fa:'طراحی'},d:{en:'A precise visual language — typography, space and hierarchy engineered to build trust.',fa:'زبان بصری دقیق — تایپوگرافی، فضا و سلسله‌مراتبی که برای ساختن اعتماد مهندسی شده‌اند.'},wk:{en:'Wk 02–03',fa:'هفته ۰۲–۰۳'}},
 {t:{en:'Develop',fa:'توسعه'},d:{en:'Clean, modular, obsessively optimized engineering. Performance is never sacrificed.',fa:'مهندسی تمیز، ماژولار و وسواس‌گونه بهینه‌شده. کارایی هرگز قربانی نمی‌شود.'},wk:{en:'Wk 03–07',fa:'هفته ۰۳–۰۷'}},
 {t:{en:'Deliver',fa:'تحویل'},d:{en:'Launch, monitor and refine — until the experience holds at world-class standard.',fa:'انتشار، پایش و صیقل — تا تجربه در سطح جهانی بماند.'},wk:{en:'Wk 08+',fa:'هفته ۰۸+'}}
];
const AWARDS=[
 {cnt:'×3',t:{en:'Awwwards — Site of the Day',fa:'Awwwards — سایت روز'},p:{en:'Eventide · Halcyon · Vanta',fa:'ایون‌تاید · هالسیون · وانتا'},cat:{en:'Immersive',fa:'فراگیر'},yr:'2023–25'},
 {cnt:'×2',t:{en:'FWA of the Day',fa:'FWA — سایت روز'},p:{en:'Eventide · Silk',fa:'ایون‌تاید · سیلک'},cat:{en:'WebGL',fa:'WebGL'},yr:'2024–25'},
 {cnt:'×1',t:{en:'CSS Design Awards — Best UI',fa:'CSS Design Awards — بهترین رابط'},p:{en:'Halcyon',fa:'هالسیون'},cat:{en:'Interface',fa:'رابط کاربری'},yr:'2025'},
 {cnt:'×1',t:{en:'The Web Awards — Portfolio of the Year',fa:'The Web Awards — پورتفولیوی سال'},p:{en:'Singularity',fa:'تکینگی'},cat:{en:'Portfolio',fa:'پورتفولیو'},yr:'2024'},
 {cnt:'×2',t:{en:'Awwwards — Honorable Mentions',fa:'Awwwards — تقدیر ویژه'},p:{en:'Monolith · Aether',fa:'مونولیت · آیتر'},cat:{en:'Craft',fa:'ظرافت'},yr:'2023–24'}
];
const QUOTES=[
 {q:{en:'“Arman doesn’t build websites. He directs them — every frame, every easing, every pause feels intentional.”',fa:'«Mr وب‌سایت نمی‌سازد؛ آن‌ها را کارگردانی می‌کند — هر فریم، هر حرکت و هر مکث، حساب‌شده است.»'},n:{en:'Elena Voss',fa:'النا وس'},r:{en:'Creative Director · Gravity Studio',fa:'مدیر خلاق · استودیو گرویتی'}},
 {q:{en:'“The rare engineer who treats performance and poetry as the same discipline.”',fa:'«مهندس کمیابی که کارایی و شاعری را یک رشته می‌داند.»'},n:{en:'Marcus Chen',fa:'مارکوس چن'},r:{en:'VP Product · Nebula Labs',fa:'معاون محصول · نبولا لبز'}},
 {q:{en:'“Our conversion doubled. But honestly — the award on the shelf matters more.”',fa:'«نرخ تبدیل ما دو برابر شد. اما راستش — جایزه‌ی روی قفسه مهم‌تر است.»'},n:{en:'Sofia Reyes',fa:'سوفیا ریس'},r:{en:'Brand Lead · Meridian',fa:'مدیر برند · مریدین'}}
];

/* ============ loader ============ */
const Loader=(()=>{
  let done=0,total=0,finished=false;
  const pctEl=$('#loadPct'),barEl=$('#loadBar');
  const tick=()=>{done=Math.min(done+1,total);const p=done/total;
    pctEl.textContent=String(Math.round(p*100)).padStart(3,'0');
    gsap.to(barEl,{scaleX:p,duration:.5,ease:'power2.out',overwrite:'auto'});
    if(done>=total&&!finished){finished=true;setTimeout(reveal,350);}};
  function reveal(){
    const l=$('#loader');
    if(REDUCED){l.remove();window.__intro&&window.__intro();return;}
    gsap.timeline({onComplete:()=>l.remove()})
      .to('#loader > *',{autoAlpha:0,y:-16,duration:.6,stagger:.06,ease:'power2.inOut'})
      .to(l,{yPercent:-100,duration:1,ease:'expo.inOut'},'-=.1')
      .add(()=>window.__intro&&window.__intro(),'-=.6');
  }
  return {start(){
    PROJECTS.forEach(p=>{total++;const im=new Image();im.onload=im.onerror=tick;im.src=p.img;});
    total++;(document.fonts?document.fonts.ready:Promise.resolve()).then(tick);
    total++;window.__glReady=()=>tick();
    setTimeout(()=>{if(!finished&&done<total){done=total-1;tick();}},9000);
  }};
})();

/* ============ lenis ============ */
let lenis=null;
if(!REDUCED&&window.Lenis){
  lenis=new Lenis({lerp:.09,smoothWheel:true,wheelMultiplier:1,touchMultiplier:1.4});
  lenis.on('scroll',ScrollTrigger.update);
  gsap.ticker.add(t=>lenis.raf(t*1000));
  gsap.ticker.lagSmoothing(0);
}
const scrollToEl=el=>lenis?lenis.scrollTo(el,{offset:-40,duration:1.5,easing:x=>1-Math.pow(1-x,4)}):el.scrollIntoView({behavior:REDUCED?'auto':'smooth'});

/* ================================================================
   THREE — pure-black space + the requested black hole build
================================================================ */
const USE_BLOOM=!TOUCH&&!REDUCED&&innerWidth>768;
class Singularity{
  constructor(canvas){
    this.renderer=new THREE.WebGLRenderer({canvas,antialias:false,alpha:false,powerPreference:'high-performance'});
    this.renderer.setClearColor(0x000000,1);
    this.renderer.toneMapping=THREE.ACESFilmicToneMapping;
    this.renderer.outputColorSpace=THREE.SRGBColorSpace;
    this.dpr=Math.min(devicePixelRatio||1,TOUCH?1.25:1.5);
    this.renderer.setPixelRatio(this.dpr);
    this.scene=new THREE.Scene();
    this.camera=new THREE.PerspectiveCamera(45,innerWidth/innerHeight,.1,260);
    this.camera.position.set(0,.3,REDUCED?10.5:16);
    this.mouse={x:0,y:0};this.time=0;
    this.buildStars();this.buildBlackHole();
    if(USE_BLOOM){
      this.composer=new EffectComposer(this.renderer);
      this.composer.setPixelRatio(this.dpr);
      this.composer.addPass(new RenderPass(this.scene,this.camera));
      this.bloom=new UnrealBloomPass(new THREE.Vector2(innerWidth/2,innerHeight/2),.75,.55,.5);
      this.composer.addPass(this.bloom);
      this.composer.addPass(new OutputPass());
    }
    this.resize();
    window.__glReady&&window.__glReady();
  }
  buildStars(){
    this.starGroup=new THREE.Group();this.scene.add(this.starGroup);
    const N=TOUCH?600:1200;
    const pos=new Float32Array(N*3),col=new Float32Array(N*3),siz=new Float32Array(N),sed=new Float32Array(N);
    for(let i=0;i<N;i++){
      const r=55+Math.random()*85,th=Math.random()*Math.PI*2,ph=Math.acos(2*Math.random()-1);
      pos[i*3]=r*Math.sin(ph)*Math.cos(th);pos[i*3+1]=r*Math.cos(ph)*.9;pos[i*3+2]=r*Math.sin(ph)*Math.sin(th);
      const v=Math.random(),c=v<.7?[.7,.68,.9]:[.58,.5,.88];
      col[i*3]=c[0];col[i*3+1]=c[1];col[i*3+2]=c[2];
      siz[i]=.22+Math.random()*.45;sed[i]=Math.random();
    }
    const g=new THREE.BufferGeometry();
    g.setAttribute('position',new THREE.BufferAttribute(pos,3));
    g.setAttribute('aColor',new THREE.BufferAttribute(col,3));
    g.setAttribute('aSize',new THREE.BufferAttribute(siz,1));
    g.setAttribute('aSeed',new THREE.BufferAttribute(sed,1));
    this.ptMat=new THREE.ShaderMaterial({transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,
      uniforms:{uTime:{value:0},uPR:{value:this.dpr}},
      vertexShader:`attribute float aSize;attribute float aSeed;attribute vec3 aColor;
        uniform float uTime;uniform float uPR;varying vec3 vColor;varying float vTw;
        void main(){vColor=aColor;vTw=.7+.3*sin(uTime*.7+aSeed*40.);
          vec4 mv=modelViewMatrix*vec4(position,1.);
          gl_PointSize=aSize*uPR*(170./-mv.z);
          gl_Position=projectionMatrix*mv;}`,
      fragmentShader:`varying vec3 vColor;varying float vTw;
        void main(){float d=length(gl_PointCoord-.5);float a=smoothstep(.5,.02,d);
          gl_FragColor=vec4(vColor,a*vTw*.45);}`});
    this.starGroup.add(new THREE.Points(g,this.ptMat));
  }
  buildBlackHole(){
    this.bh=new THREE.Group();
    this.scene.add(this.bh);
    /* Event Horizon - Pure Black Sphere */
    const horizon=new THREE.Mesh(
      new THREE.SphereGeometry(1,64,64),
      new THREE.MeshBasicMaterial({color:0x000000})
    );
    this.bh.add(horizon);
    /* Accretion Disk Shader */
    const diskMat=new THREE.ShaderMaterial({
      side:THREE.DoubleSide,
      transparent:true,
      depthWrite:false,
      blending:THREE.AdditiveBlending,
      uniforms:{uTime:{value:0}},
      vertexShader:`
        varying vec2 vUv;
        void main(){
          vUv=uv;
          gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);
        }`,
      fragmentShader:`
        uniform float uTime;
        varying vec2 vUv;
        float hash(vec2 p){
          return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);
        }
        float noise(vec2 p){
          vec2 i=floor(p);
          vec2 f=fract(p);
          f=f*f*(3.0-2.0*f);
          float a=hash(i);
          float b=hash(i+vec2(1.0,0.0));
          float c=hash(i+vec2(0.0,1.0));
          float d=hash(i+vec2(1.0,1.0));
          return mix(mix(a,b,f.x),mix(c,d,f.x),f.y);
        }
        void main(){
          vec2 p=vUv*2.0-1.0;
          float r=length(p);
          float a=atan(p.y,p.x);
          float inner=0.45;
          float outer=1.0;
          float ring=smoothstep(inner-0.02,inner+0.05,r)*(1.0-smoothstep(outer-0.1,outer,r));
          float swirl=noise(vec2(a*3.0+r*8.0-uTime*0.8,r*12.0));
          float bands=0.5+0.5*sin(a*4.0+r*20.0-uTime*1.5+swirl*3.0);
          float heat=pow(1.0-(r-inner)/(outer-inner),2.0);
          float doppler=0.6+0.4*sin(a-uTime*0.2);
          vec3 cold=vec3(0.2,0.1,0.4);
          vec3 hot=vec3(0.6,0.4,1.0);
          vec3 white=vec3(1.0,0.95,1.0);
          vec3 col=mix(cold,hot,heat);
          col=mix(col,white,pow(heat,4.0));
          float lum=bands*swirl*doppler*(0.4+heat*1.5);
          lum=min(lum,2.0);
          float alpha=ring*(0.3+heat*0.7)*clamp(lum,0.0,1.0);
          gl_FragColor=vec4(col*lum,alpha);
        }`
    });
    this.diskMat=diskMat;
    this.diskWrap=new THREE.Group();
    this.diskWrap.rotation.x=-1.2;
    this.disk=new THREE.Mesh(new THREE.RingGeometry(1.4,3.0,128,1),diskMat);
    this.diskWrap.add(this.disk);
    this.bh.add(this.diskWrap);
    /* Photon Ring - Subtle glow ring */
    const photonGeo=new THREE.RingGeometry(1.02,1.08,128,1);
    const photonMat=new THREE.MeshBasicMaterial({
      color:0xb8a4ff,
      transparent:true,
      opacity:0.6,
      side:THREE.DoubleSide,
      blending:THREE.AdditiveBlending,
      depthWrite:false
    });
    const photon=new THREE.Mesh(photonGeo,photonMat);
    photon.rotation.x=-1.2;
    this.bh.add(photon);
    /* Soft Halo */
    const haloCanvas=document.createElement('canvas');
    haloCanvas.width=haloCanvas.height=256;
    const ctx=haloCanvas.getContext('2d');
    const grad=ctx.createRadialGradient(128,128,0,128,128,128);
    grad.addColorStop(0,'rgba(140,100,255,0.4)');
    grad.addColorStop(0.4,'rgba(100,60,200,0.1)');
    grad.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=grad;
    ctx.fillRect(0,0,256,256);
    const haloTex=new THREE.CanvasTexture(haloCanvas);
    this.halo=new THREE.Sprite(new THREE.SpriteMaterial({
      map:haloTex,
      transparent:true,
      blending:THREE.AdditiveBlending,
      depthWrite:false
    }));
    this.halo.scale.setScalar(6);
    this.bh.add(this.halo);
  }
  resize(){
    this.camera.aspect=innerWidth/innerHeight;this.camera.updateProjectionMatrix();
    this.renderer.setSize(innerWidth,innerHeight,false);
    this.composer?.setSize(innerWidth,innerHeight);
  }
  update(dt){
    if(!REDUCED)this.time+=dt;
    const t=REDUCED?8:this.time;
    this.ptMat.uniforms.uTime.value=t;
    this.diskMat.uniforms.uTime.value=t;
    if(!REDUCED){
      this.disk.rotation.z+=dt*.11;
      this.starGroup.rotation.y+=dt*.004;
      /* gentle halo breathing */
      const p=Math.sin(t*.23)*.5+Math.sin(t*.143+1.7)*.5;
      this.halo.scale.setScalar(6*(1+p*.03));
      this.halo.material.opacity=.9+p*.08;
    }
    if(this.composer)this.composer.render();
    else this.renderer.render(this.scene,this.camera);
  }
  dispose(){
    this.scene.traverse(o=>{o.geometry?.dispose?.();o.material?.dispose?.();o.material?.map?.dispose?.();});
    this.composer?.dispose?.();this.renderer.dispose();
  }
}
 
/* ============ keys ============ */
const CHL = ['cx', 'cy', 'cz', 'fov', 'bhx', 'bhy', 'bhs', 'bloom', 'roll'];
let KEYS = [];

/** ===== کاملاً ایمن و نهایی ===== */
function buildKeys() {
  const docHeight = Math.max(1, document.documentElement.scrollHeight - innerHeight);
  const T = (id) => {
    const el = $('#' + id);
    if (!el) return 0;
    return clampN((el.offsetTop - innerHeight * 0.5) / docHeight, 0, 1);
  };

  const tA = T('about');
  const tM = T('manifesto');
  const tS = T('skills');
  const tW = T('work');
  const tJ = T('journey');
  const tP = T('process');
  const tR = T('recognition');
  const tSig = T('signals');
  const tC = T('contact');

  const tWJ = (tW + tJ) / 2;
  const tJM = (tJ + tP) / 2;

  KEYS = [
    { t: 0, v: { cx: 0, cy: 0.3, cz: 8.5, fov: 52, bhx: 0, bhy: 0, bhs: 0.92, bloom: 0.75, roll: 0 } },
    { t: tA, v: { cx: 3.4, cy: 0.15, cz: 7.6, fov: 41, bhx: -2.5, bhy: -0.05, bhs: 2.82, bloom: 0.44, roll: 0.8 } },
    { t: tM, v: { cx: 0, cy: 0.1, cz: 10.6, fov: 50, bhx: 0, bhy: -0.1, bhs: 0.78, bloom: 1.58, roll: -0.2 } },
    { t: tS, v: { cx: 0.3, cy: 1.5, cz: 8.8, fov: 45, bhx: -2.5, bhy: 0.1, bhs: 1.05, bloom: 0.9, roll: -0.01 } },
    { t: tW, v: { cx: 0, cy: 0.5, cz: 6.9, fov: 42, bhx: -1.7, bhy: -0.05, bhs: 1.18, bloom: 1, roll: 0.012 } },
    { t: tWJ, v: { cx: 0.8, cy: 0.8, cz: 7.8, fov: 43, bhx: -1, bhy: 0, bhs: 1.08, bloom: 0.9, roll: 0.016 } },
    { t: tJ, v: { cx: 1.5, cy: 1.1, cz: 8.7, fov: 45, bhx: -0.4, bhy: 0, bhs: 1, bloom: 0.8, roll: 0.02 } },
    { t: tJM, v: { cx: -1.3, cy: 0.9, cz: 8.9, fov: 45, bhx: 0.3, bhy: 0, bhs: 0.96, bloom: 0.75, roll: -0.02 } },
    { t: tP, v: { cx: -0.6, cy: 0.4, cz: 8.6, fov: 44, bhx: 2.3, bhy: 0.1, bhs: 0.95, bloom: 0.72, roll: 0.008 } },
    { t: tR, v: { cx: 0.2, cy: 0.3, cz: 10.2, fov: 48, bhx: 0, bhy: 0.15, bhs: 0.78, bloom: 0.62, roll: 0 } },
    { t: tSig, v: { cx: 0, cy: 0.2, cz: 11, fov: 50, bhx: 0, bhy: 0.3, bhs: 0.65, bloom: 0.5, roll: 0 } },
    { t: tC, v: { cx: -0.4, cy: 0.15, cz: 7.6, fov: 41, bhx: 2.5, bhy: -0.05, bhs: 0.82, bloom: 0.44, roll: 0 } },
    { t: 1, v: { cx: -0.4, cy: 0.15, cz: 7.6, fov: 41, bhx: 2.5, bhy: -0.05, bhs: 0.82, bloom: 0.44, roll: 0 } }
  ];
}

/** ===== evalKeys (اصلاح‌شده) ===== */
function evalKeys(p) {
  p = clampN(p, 0, 1);

  let i = 0;
  while (i < KEYS.length - 2 && p > KEYS[i + 1].t) i++;

  const a = KEYS[i];
  const b = KEYS[i + 1] || a;

  const u = b.t === a.t ? 0 : clampN((p - a.t) / (b.t - a.t), 0, 1);
  const s = u * u * (3 - 2 * u);

  const o = {};
  for (const k of CHL) {
    o[k] = lerp(a.v[k], b.v[k], s);
  }
  return o;
}
 

/* ============ scramble ============ */
function scramble(el){
  if(REDUCED)return;
  const orig=el.textContent;
  const chars=lang==='fa'?'پژگچخبک۰۱۲۳۴۵۶':'!<>-_/[]{}=+*^?#';
  let frame=0;const total=Math.max(16,orig.length*2);
  (function run(){
    frame++;
    const p=frame/total;
    if(p>=1){el.textContent=orig;return;}
    el.textContent=orig.split('').map((ch,i)=>ch===' '?' ':(i/orig.length<p*1.25?ch:chars[(Math.random()*chars.length)|0])).join('');
    requestAnimationFrame(run);
  })();
}
function bindScramble(){
  if(REDUCED)return;
  const io=new IntersectionObserver(es=>es.forEach(en=>{
    if(en.isIntersecting){scramble(en.target);io.unobserve(en.target);}
  }),{threshold:.6});
  $$('[data-scramble]').forEach(el=>io.observe(el));
}

/* ============ reveals ============ */
function bindReveals(scope=document){
  if(REDUCED){$$('[data-reveal]',scope).forEach(el=>{el.style.opacity=1;el.style.transform='none';});return;}
  $$('[data-reveal]',scope).forEach(el=>{
    if(el._rv)return;el._rv=true;
    if(el.getBoundingClientRect().top<innerHeight*.88){
      gsap.to(el,{opacity:1,y:0,duration:.9,ease:'power3.out'});
    }else{
      ScrollTrigger.create({trigger:el,start:'top 88%',once:true,
        onEnter:()=>gsap.to(el,{opacity:1,y:0,duration:.9,ease:'power3.out'})});
    }
  });
}
function buildStaticAnims(){
  if(REDUCED){
    $$('.interlude').forEach(el=>el.style.opacity=1);
    $$('.ml').forEach(el=>el.style.opacity=1);
    $$('.meter .track i').forEach(i=>i.style.transform='scaleX(1)');
    $('.tl-fill').style.transform='scaleY(1)';
    return;
  }
  gsap.to('#hero .hero-inner',{yPercent:-14,autoAlpha:0,ease:'none',scrollTrigger:{trigger:'#hero',start:'top top',end:'bottom 15%',scrub:.6}});
  gsap.from('.about-inner > *',{x:90,autoAlpha:0,duration:1.2,stagger:.1,ease:'expo.out',scrollTrigger:{trigger:'#about',start:'top 70%',once:true}});
  $$('.interlude').forEach(el=>{
    gsap.timeline({scrollTrigger:{trigger:el,start:'top 85%',end:'bottom 15%',scrub:.6}})
      .fromTo(el,{autoAlpha:0,y:30},{autoAlpha:1,y:0,duration:.4,ease:'power2.out'})
      .to(el,{autoAlpha:0,y:-30,duration:.4,ease:'power2.in'},.6);
  });
  const lines=$$('.ml');
  const tl=gsap.timeline({scrollTrigger:{trigger:'#manifesto',start:'top top',end:'bottom bottom',scrub:.5}});
  lines.forEach((l,i)=>{
    const at=i*.24;
    tl.fromTo(l,{autoAlpha:0,y:50},{autoAlpha:1,y:0,duration:.13,ease:'power2.out'},at);
    if(i<lines.length-1)tl.to(l,{autoAlpha:0,y:-40,duration:.12,ease:'power2.in'},at+.15);
  });
  gsap.from('.meter',{autoAlpha:0,y:24,duration:1,stagger:.1,ease:'expo.out',scrollTrigger:{trigger:'.meters',start:'top 82%',once:true},clearProps:'all'});
  gsap.to('.meter .track i',{scaleX:1,duration:1.6,stagger:.12,ease:'expo.out',scrollTrigger:{trigger:'.meters',start:'top 80%',once:true}});
  gsap.to('.tl-fill',{scaleY:1,ease:'none',scrollTrigger:{trigger:'#journey',start:'top 60%',end:'bottom 70%',scrub:.5}});
}

/* ============ UI ============ */
function initMagnetic(){
  if(TOUCH||REDUCED)return;
  $$('.magnetic').forEach(el=>{
    el.addEventListener('mousemove',e=>{
      const r=el.getBoundingClientRect();
      gsap.to(el,{x:(e.clientX-r.left-r.width/2)*.28,y:(e.clientY-r.top-r.height/2)*.28,duration:.5,ease:'expo.out'});
    });
    el.addEventListener('mouseleave',()=>gsap.to(el,{x:0,y:0,duration:.7,ease:'expo.out'}));
  });
}
function closeMenu(){const m=$('#menu');if(m.classList.contains('open')){m.classList.remove('open');$('#burger').setAttribute('aria-expanded','false');m.setAttribute('aria-hidden','true');lenis?.start();}}
let curChapter='hero';
function setHud(id){
  const idx=CHAPTER_KEYS.indexOf(id);if(idx<0)return;
  curChapter=id;
  $('#hudNum').textContent=CHAPTER_NUM[idx];
  $('#hudName').textContent=t('ch.'+id);
  $('#hudMood').textContent=t('mood.'+id);
  if(!REDUCED)gsap.fromTo('#hud',{autoAlpha:.25},{autoAlpha:1,duration:.7,ease:'power2.out'});
}
function initNav(){
  const nav=$('#nav');
  const onScroll=()=>nav.classList.toggle('scrolled',scrollY>40);
  addEventListener('scroll',onScroll,{passive:true});onScroll();
  ScrollTrigger.create({start:0,end:'max',onUpdate:s=>{
    $('#progress').style.transform=`scaleX(${s.progress})`;
    $('#hudPct').textContent=Math.round(s.progress*100)+'%';
  }});
  $$('[data-nav]').forEach(a=>a.addEventListener('click',e=>{
    e.preventDefault();closeMenu();
    const el=$(a.getAttribute('href'));if(el)scrollToEl(el);
  }));
  $$('.rail button').forEach(b=>b.addEventListener('click',()=>{const el=$(b.dataset.target);if(el)scrollToEl(el);}));
  const io=new IntersectionObserver(es=>es.forEach(en=>{
    if(!en.isIntersecting)return;
    const id='#'+en.target.id;
    $$('#nav .links a').forEach(a=>a.getAttribute('href')===id?a.setAttribute('aria-current','true'):a.removeAttribute('aria-current'));
    $$('.rail button').forEach(b=>b.dataset.target===id?b.setAttribute('aria-current','true'):b.removeAttribute('aria-current'));
    setHud(en.target.id);
  }),{rootMargin:'-45% 0px -50% 0px'});
  CHAPTER_KEYS.forEach(id=>io.observe($('#'+id)));
  $('#burger').addEventListener('click',()=>{
    const open=$('#menu').classList.toggle('open');
    $('#burger').setAttribute('aria-expanded',open);
    $('#menu').setAttribute('aria-hidden',!open);
    open?lenis?.stop():lenis?.start();
  });
  $('#toTop').addEventListener('click',()=>lenis?lenis.scrollTo(0,{duration:1.6}):scrollTo({top:0,behavior:REDUCED?'auto':'smooth'}));
}

/* ============ dynamic lists ============ */
// function renderProjects(){
//   $('#grid').innerHTML=PROJECTS.map((p,i)=>`
//    <article class="project-card${p.featured?' featured':''}" data-id="${p.id}" tabindex="0" role="button" aria-label="${p.title[lang]}">
//      <div class="media"><img src="${p.img}" alt="${p.title[lang]}" loading="${i<2?'eager':'lazy'}"><span class="idx">0${i+1}</span></div>
//      <div class="info"><h3>${p.title[lang]}</h3>
//        <div class="meta"><span>${p.year}</span><span class="dot"></span><span>${p.cat[lang]}</span></div>
//        <div class="tags">${p.tags.map(x=>`<span>${x}</span>`).join('')}</div>
//      </div></article>`).join('');
//   $$('.project-card').forEach(card=>{
//     card.addEventListener('click',()=>openModal(card.dataset.id));
//     card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openModal(card.dataset.id);}});
//     if(!TOUCH&&!REDUCED){
//       card.addEventListener('mousemove',e=>{
//         const r=card.getBoundingClientRect();
//         const px=(e.clientX-r.left)/r.width-.5,py=(e.clientY-r.top)/r.height-.5;
//         gsap.to(card,{rotationY:(-7+px*5)*DS(),rotationX:-py*4,x:-10*DS(),transformPerspective:900,duration:.7,ease:'power2.out'});
//       });
//       card.addEventListener('mouseleave',()=>gsap.to(card,{rotationX:0,rotationY:0,x:0,duration:1,ease:'expo.out'}));
//     }
//   });
//   bindReveals($('#grid'));
//   if(!REDUCED)gsap.from('.project-card',{autoAlpha:0,x:-160,scale:.7,rotationY:14,duration:1.3,stagger:.12,ease:'expo.out',scrollTrigger:{trigger:'#grid',start:'top 78%',once:true},clearProps:'all'});
// }
function renderProjects(){
  $('#grid').innerHTML = PROJECTS.map((p, i) => `
    <article class="project-card${p.featured ? ' featured' : ''}" data-id="${p.id}" tabindex="0" role="button" aria-label="${p.title[lang]}">
      <div class="media">
        <img src="${p.img}" alt="${p.title[lang]}" loading="${i < 2 ? 'eager' : 'lazy'}">
        <span class="idx">0${i + 1}</span>
      </div>
      <div class="info">
        <h3>${p.title[lang]}</h3>
        <div class="meta">
          <span>${p.year}</span>
          <span class="dot"></span>
          <span>${p.cat[lang]}</span>
        </div>
        <div class="tags">${p.tags.map(x => `<span>${x}</span>`).join('')}</div>
      </div>
    </article>
  `).join('');

  $$('.project-card').forEach(card => {
    card.addEventListener('click', () => openModal(card.dataset.id));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(card.dataset.id);
      }
    });

    if (!TOUCH && !REDUCED) {
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        gsap.to(card, {
          rotationY: (-7 + px * 5) * DS(),
          rotationX: -py * 4,
          x: -10 * DS(),
          transformPerspective: 900,
          duration: 0.7,
          ease: 'power2.out'
        });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotationX: 0,
          rotationY: 0,
          x: 0,
          duration: 1,
          ease: 'expo.out'
        });
      });
    }
  });

  bindReveals($('#grid'));

  if (!REDUCED) {
    gsap.from('.project-card', {
      autoAlpha: 0,
      x: -160,
      scale: 0.7,
      rotationY: 14,
      duration: 1.3,
      stagger: 0.12,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: '#grid',
        start: 'top 78%',
        once: true
      },
      clearProps: 'all'
    });
  }
}

function renderJourney(){
  $('#tItems').innerHTML=JOURNEY.map(j=>`
   <div class="t-item" data-reveal><span class="yr">${lang==='fa'?j.yrFa:j.yr}</span><h3>${j.t[lang]}</h3><p class="co">${j.c[lang]}</p><p>${j.d[lang]}</p></div>`).join('');
  bindReveals($('#tItems'));
}
function renderProcess(){
  $('#pRows').innerHTML=PROCESS.map((p,i)=>`
   <div class="p-row" data-reveal><span class="num">0${i+1}</span><div><h3>${p.t[lang]}</h3><p>${p.d[lang]}</p></div><span class="wk">${p.wk[lang]}</span></div>`).join('');
  bindReveals($('#pRows'));
}
function renderAwards(){
  $('#awardsList').innerHTML=AWARDS.map(a=>`
   <div class="award" data-reveal><span class="cnt">${a.cnt}</span><div><h3>${a.t[lang]}</h3><p class="prj">${a.p[lang]}</p></div><span class="cat">${a.cat[lang]}</span><span class="yr">${a.yr}</span></div>`).join('');
  bindReveals($('#awardsList'));
}
function renderQuotes(){
  $('#quotesGrid').innerHTML=QUOTES.map((q,i)=>`
   <article class="quote" data-reveal><span class="sig">SIG·0${i+1}</span><blockquote>${q.q[lang]}</blockquote><footer><b>${q.n[lang]}</b>${q.r[lang]}</footer></article>`).join('');
  bindReveals($('#quotesGrid'));
}
function renderAllLists(){renderProjects();renderJourney();renderProcess();renderAwards();renderQuotes();}

/* ============ modal / form ============ */

const modal = $('#modal');
let lastFocus = null;

function openModal(id) {
  const p = PROJECTS.find(x => x.id === id);
  if (!p) return;

  lastFocus = document.activeElement;

  // پر کردن محتوا
  $('#mImg').src = p.img;
  $('#mImg').alt = p.title[lang];
  $('#mTitle').textContent = p.title[lang];
  $('#mYear').textContent = p.year;
  $('#mRole').textContent = p.role[lang];
  $('#mStack').textContent = p.tags.join(' · ');
  $('#mDesc').textContent = p.desc[lang];

  // باز کردن مودال
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  lenis?.stop();

  // انیمیشن وسط صفحه
  if (!REDUCED) {
    gsap.fromTo('.panel',
      {
        autoAlpha: 0,
        y: 40,
        scale: 0.96
      },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.65,
        ease: 'expo.out',
        clearProps: 'transform' // مهم: بعد از انیمیشن transform رو پاک کن
      }
    );
  }

  // فوکوس روی دکمه بستن
  const closeBtn = $('.close', modal);
  if (closeBtn) closeBtn.focus();
}

function closeModal() {
  if (!modal.classList.contains('open')) return;

  const done = () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    lenis?.start();
    lastFocus?.focus();
  };

  if (REDUCED) {
    done();
  } else {
    gsap.to('.panel', {
      autoAlpha: 0,
      y: 30,
      scale: 0.97,
      duration: 0.35,
      ease: 'power2.in',
      onComplete: done
    });
  }
}

function initModal() {
  // بستن با کلیک روی پس‌زمینه یا دکمه close
  $$('[data-close]', modal).forEach(el => {
    el.addEventListener('click', closeModal);
  });

  // کلیدها
  addEventListener('keydown', e => {
    if (!modal.classList.contains('open')) return;

    if (e.key === 'Escape') {
      closeModal();
      return;
    }

    // Trap focus داخل مودال
    if (e.key === 'Tab') {
      const focusable = $$('button, a[href], [tabindex]:not([tabindex="-1"])', modal)
        .filter(el => el.offsetParent !== null);

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        last.focus();
        e.preventDefault();
      } else if (!e.shiftKey && document.activeElement === last) {
        first.focus();
        e.preventDefault();
      }
    }
  });
}
// const modal=$('#modal');let lastFocus=null;
// function openModal(id){
//   const p=PROJECTS.find(x=>x.id===id);if(!p)return;
//   lastFocus=document.activeElement;
//   $('#mImg').src=p.img;$('#mImg').alt=p.title[lang];
//   $('#mTitle').textContent=p.title[lang];
//   $('#mYear').textContent=p.year;
//   $('#mRole').textContent=p.role[lang];
//   $('#mStack').textContent=p.tags.join(' · ');
//   $('#mDesc').textContent=p.desc[lang];
//   modal.classList.add('open');
//   document.body.style.overflow='hidden';lenis?.stop();
//   if(!REDUCED)  gsap.fromTo('.panel',{autoAlpha:0,y:46,scale:.97},{autoAlpha:1,y:0,scale:1,duration:.7,ease:'expo.out'});
//   $('.close',modal).focus();
// }
// function closeModal(){
//   if(!modal.classList.contains('open'))return;
//   const done=()=>{modal.classList.remove('open');document.body.style.overflow='';lenis?.start();lastFocus?.focus();};
//   REDUCED?done():gsap.to('.panel',{autoAlpha:0,y:30,duration:.4,ease:'power2.in',onComplete:done});
// }
// function initModal(){
//   $$('[data-close]',modal).forEach(el=>el.addEventListener('click',closeModal));
//   addEventListener('keydown',e=>{
//     if(!modal.classList.contains('open'))return;
//     if(e.key==='Escape')closeModal();
//     if(e.key==='Tab'){
//       const f=$$('button, a[href]',modal).filter(x=>x.offsetParent);
//       const first=f[0],last=f[f.length-1];
//       if(e.shiftKey&&document.activeElement===first){last.focus();e.preventDefault();}
//       else if(!e.shiftKey&&document.activeElement===last){first.focus();e.preventDefault();}
//     }
//   });
// }
function initForm(){
  $('#cform').addEventListener('submit',e=>{
    e.preventDefault();
    const n=$('#fname').value.trim(),em=$('#femail').value.trim(),ms=$('#fmsg').value.trim();
    const note=$('#formNote');
    if(!n||!em||!ms){note.textContent=t('form.incomplete');return;}
    location.href=`mailto:hello@armankarimi.dev?subject=${encodeURIComponent('Transmission from '+n)}&body=${encodeURIComponent(ms+'\n\n— '+n+' ('+em+')')}`;
    note.textContent=t('form.opening');
  });
}

/* ============ language ============ */
function applyI18n(){
  const html=document.documentElement;
  html.lang=lang;html.dir=lang==='fa'?'rtl':'ltr';
  document.body.classList.toggle('lang-fa',lang==='fa');
  $$('[data-i18n]').forEach(el=>el.textContent=t(el.dataset.i18n));
  $$('[data-i18n-html]').forEach(el=>el.innerHTML=t(el.dataset.i18nHtml));
  $$('[data-i18n-ph]').forEach(el=>el.placeholder=t(el.dataset.i18nPh));
  document.title=t('doc.title');
  document.querySelector('meta[name="description"]').content=t('doc.desc');
  $('#ogTitle').content=t('doc.title');
  $('#ogDesc').content=t('doc.desc');
  $('#langEn').setAttribute('aria-pressed',lang==='en');
  $('#langFa').setAttribute('aria-pressed',lang==='fa');
  setHud(curChapter);
}
function setLang(l){
  if(l===lang)return;
  lang=l;localStorage.setItem('sk-lang',l);
  applyI18n();renderAllLists();
  if(modal.classList.contains('open'))closeModal();
  lenis?.resize();
  requestAnimationFrame(()=>ScrollTrigger.refresh());
}
$('#langEn').addEventListener('click',()=>setLang('en'));
$('#langFa').addEventListener('click',()=>setLang('fa'));

/* ============ boot + loop ============ */
let scene=null,running=true,sp=0,spTarget=0,introZ=REDUCED?0:5.5;
const introBloom={m:REDUCED?1:1.8};
const clock=new THREE.Clock();
ScrollTrigger.create({start:0,end:'max',onUpdate:s=>{spTarget=s.progress;}});

function frame(){
  if(!running)return;
  requestAnimationFrame(frame);
  if(document.hidden||!scene)return;
  const dt=Math.min(clock.getDelta(),.05);
  sp=REDUCED?spTarget:lerp(sp,spTarget,.075);
  const K=evalKeys(sp);
  const rf=clampN(innerWidth/1280,.45,1),ds=DS();
  const mob=innerWidth<768?6:0;
  const t=scene.time;
  let ix=0,iy=0,iz=0;
  if(!REDUCED){
    ix=Math.sin(t*.13)*.05+Math.sin(t*.071+2)*.03;
    iy=Math.cos(t*.11)*.04+Math.sin(t*.05+1)*.02;
    iz=Math.sin(t*.09+4)*.06;
  }
  scene.camera.position.set(K.cx+ix,K.cy+iy,K.cz+iz+introZ);
  scene.camera.fov=K.fov+mob+(!REDUCED?Math.sin(t*.09)*.3:0);
  scene.camera.updateProjectionMatrix();
  scene.bh.position.set(K.bhx*rf*ds,K.bhy+(REDUCED?0:Math.sin(t*.23)*.04),0);
  scene.bh.scale.setScalar(K.bhs);
  if(!REDUCED){
    scene.bh.rotation.x=lerp(scene.bh.rotation.x,scene.mouse.y*.03,.04);
    scene.bh.rotation.y=lerp(scene.bh.rotation.y,scene.mouse.x*.045,.04);
    scene.starGroup.rotation.x=lerp(scene.starGroup.rotation.x,-scene.mouse.y*.025,.03);
    scene.starGroup.rotation.y+=scene.mouse.x*.0002;
  }
  if(scene.bloom)scene.bloom.strength=K.bloom*introBloom.m;
  scene.camera.lookAt(K.bhx*rf*ds*.72+scene.mouse.x*.3*ds,K.bhy*.5-scene.mouse.y*.18,0);
  scene.camera.rotateZ(K.roll*ds+(!REDUCED?Math.sin(t*.07)*.003:0));
  scene.update(dt);
}

function boot(){
  applyI18n();
  renderAllLists();
  initModal();initNav();initMagnetic();initForm();
  buildStaticAnims();bindReveals();bindScramble();
  try{
    scene=new Singularity($('#gl'));
  }catch(err){
    $('#gl').style.display='none';
    window.__glReady&&window.__glReady();
    $$('[data-reveal],.interlude,.ml').forEach(el=>{el.style.opacity=1;el.style.transform='none';});
  }
  let mx=0,my=0,mPend=false;
  addEventListener('mousemove',e=>{
    mx=(e.clientX/innerWidth-.5)*2;my=(e.clientY/innerHeight-.5)*2;
    if(!mPend){mPend=true;requestAnimationFrame(()=>{if(scene){scene.mouse.x=mx;scene.mouse.y=my;}mPend=false;});}
  },{passive:true});
  let rT;
  addEventListener('resize',()=>{clearTimeout(rT);rT=setTimeout(()=>{scene?.resize();lenis?.resize();buildKeys();ScrollTrigger.refresh();},160);});
  document.addEventListener('visibilitychange',()=>{running=!document.hidden;if(running)clock.getDelta();});
  addEventListener('pagehide',()=>scene?.dispose(),{once:true});

  window.__intro=()=>{
    buildKeys();ScrollTrigger.refresh();
    if(!REDUCED){
      const o={z:introZ};
      gsap.to(o,{z:0,duration:3,ease:'expo.out',onUpdate:()=>{introZ=o.z;}});
      gsap.to(introBloom,{m:1,duration:2.8,ease:'expo.out'});
      gsap.from('#hero h1 .line > span',{yPercent:115,duration:1.3,stagger:.12,ease:'expo.out',delay:.15});
      gsap.from(['#hero .kicker','#hero .sub','#hero .cta-row','#hero .scroll-hint'],{autoAlpha:0,y:26,duration:1.1,stagger:.1,ease:'expo.out',delay:.35,clearProps:'all'});
    } else introZ=0;
  };

  if(scene)requestAnimationFrame(frame);
  Loader.start();
}
boot();
