import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown, ChevronLeft, ChevronRight,
  Star, MapPin, Clock, Plus, Minus,
  ShoppingBag, X, Phone, Heart,
} from "lucide-react";
import { SiWhatsapp, SiInstagram } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import heroBackground    from "@/assets/images/hero.png";
import logoImg           from "@/assets/images/logo-dulce-palo.png";
import tortaChocImg      from "@/assets/images/torta-choc-frambuesa.png";
import tortaRedVelvetImg from "@/assets/images/torta-red-velvet.png";
import tortaVainillaImg  from "@/assets/images/torta-vainilla-frutos.png";
import cupcakesLimonImg  from "@/assets/images/cupcakes-limon.png";
import cupcakesOreoImg   from "@/assets/images/cupcakes-oreo.png";
import cupcakesRainbowImg from "@/assets/images/cupcakes-rainbow.png";
import cheeseFrutosImg   from "@/assets/images/cheesecake-frutos-bosque.png";
import cheeseDulceImg    from "@/assets/images/cheesecake-dulce-leche.png";
import macaronsImg       from "@/assets/images/macarons.png";

/* ─── tokens ─────────────────────────────────────────────── */
// crema: #F9F5F0  |  beige: #EFE7DC  |  rose: #A07878
// dark:  #241510  |  mid:   #7A5C54  |  blush: #D4B5AD

const WHATSAPP_NUMBER = "5493863500051";
const PHONE_NUMBER    = "tel:+5493863500051";

const NAV_LINKS = [
  { href: "#inicio",   label: "Inicio" },
  { href: "#catalogo", label: "Catálogo" },
  { href: "#pedido",   label: "Pedido Personalizado" },
  { href: "#galeria",  label: "Galería" },
];

const ALL_PRODUCTS = [
  { id: "torta-choc",      category: "tortas",      name: "Torta de Chocolate con Frambuesas",  desc: "Bizcochuelo húmedo de chocolate intenso con centro de frambuesas frescas.",  price: 3500,  img: tortaChocImg },
  { id: "torta-red",       category: "tortas",      name: "Torta Red Velvet",                   desc: "Clásica red velvet con frosting de queso crema suave.",                     price: 3800,  img: tortaRedVelvetImg },
  { id: "torta-vainilla",  category: "tortas",      name: "Torta de Vainilla y Frutos Rojos",   desc: "Capas de vainilla con crema chantilly y selección de frutos rojos.",         price: 3200,  img: tortaVainillaImg },
  { id: "cupcake-limon",   category: "cupcakes",    name: "Cupcakes de Limón",                  desc: "Masa de limón con corazón de curd y frosting cítrico.",                     price: 800,   img: cupcakesLimonImg },
  { id: "cupcake-oreo",    category: "cupcakes",    name: "Cupcakes de Oreo",                   desc: "Base de chocolate con trozos de galleta y crema de vainilla.",              price: 900,   img: cupcakesOreoImg },
  { id: "cupcake-rainbow", category: "cupcakes",    name: "Cupcakes Rainbow",                   desc: "Coloridos y divertidos, ideales para celebraciones infantiles.",             price: 950,   img: cupcakesRainbowImg },
  { id: "cheese-frutos",   category: "cheesecakes", name: "Cheesecake de Frutos del Bosque",    desc: "Estilo New York con salsa casera de frutos rojos.",                         price: 2800,  img: cheeseFrutosImg },
  { id: "cheese-dulce",    category: "cheesecakes", name: "Cheesecake de Dulce de Leche",       desc: "Cremoso, con hilos de dulce de leche colonial.",                           price: 2600,  img: cheeseDulceImg },
  { id: "macarons",        category: "postres",     name: "Macarons Surtidos",                  desc: "Caja de 6 macarons franceses en colores pastel.",                           price: 1200,  img: macaronsImg },
  { id: "brownies",        category: "postres",     name: "Brownies Artesanales",               desc: "Húmedos, con nueces y costra crujiente.",                                   price: 600,   img: tortaChocImg },
  { id: "tiramisu",        category: "postres",     name: "Tiramisú Individual",                desc: "Clásico italiano con mascarpone y café espresso.",                          price: 750,   img: cheeseDulceImg },
  { id: "mesa-30",         category: "mesas",       name: "Mesa Dulce para 30 personas",        desc: "Selección de 3 tortas y 2 docenas de postres individuales.",                price: 25000, img: heroBackground },
  { id: "mesa-50",         category: "mesas",       name: "Mesa Dulce para 50 personas",        desc: "Selección premium de 5 tortas y 4 docenas de postres.",                     price: 38000, img: heroBackground },
  { id: "tarta-fruta",     category: "tartas",      name: "Tarta de Frutas Frescas",            desc: "Base crocante con crema pastelera y frutas de temporada.",                  price: 2200,  img: tortaVainillaImg },
  { id: "tarta-limon",     category: "tartas",      name: "Tarta de Limón",                     desc: "Relleno cremoso de limón con merengue tostado.",                            price: 2000,  img: cupcakesLimonImg },
  { id: "tarta-choc",      category: "tartas",      name: "Tarta de Chocolate",                 desc: "Ganache intenso sobre masa sablée con base crocante.",                      price: 2100,  img: tortaChocImg },
  { id: "budin-limon",     category: "budines",     name: "Budín de Limón",                     desc: "Esponjoso y húmedo con cobertura de azúcar glasé.",                         price: 900,   img: cupcakesLimonImg },
  { id: "budin-naranja",   category: "budines",     name: "Budín de Naranja y Almendras",       desc: "Aromas cítricos con textura tierna y almendras tostadas.",                  price: 950,   img: tortaVainillaImg },
  { id: "budin-choc",      category: "budines",     name: "Budín de Chocolate",                 desc: "Doble chocolate con chips y cobertura brillante.",                          price: 1000,  img: tortaChocImg },
  { id: "cookie-choc",     category: "cookies",     name: "Cookies de Chocolate",               desc: "Masa suave con chips de chocolate semi amargo.",                            price: 350,   img: cupcakesOreoImg },
  { id: "cookie-vainilla", category: "cookies",     name: "Cookies de Vainilla y Nuez",         desc: "Clásicas y crocantes con trozos de nuez caramelizada.",                     price: 350,   img: macaronsImg },
  { id: "cookie-red",      category: "cookies",     name: "Cookies Red Velvet",                 desc: "Suaves y coloridas con chips de chocolate blanco.",                         price: 380,   img: tortaRedVelvetImg },
  { id: "alfa-dulce",      category: "alfajores",   name: "Alfajores de Dulce de Leche",        desc: "Tres capas de masa tierna con dulce de leche y coco.",                      price: 450,   img: cheeseDulceImg },
  { id: "alfa-choc",       category: "alfajores",   name: "Alfajores Bañados en Chocolate",     desc: "Relleno de dulce de leche con baño de chocolate negro.",                    price: 500,   img: tortaChocImg },
  { id: "alfa-limon",      category: "alfajores",   name: "Alfajores de Limón",                 desc: "Masa cítrica con crema de limón y azúcar impalpable.",                      price: 450,   img: cupcakesLimonImg },
];

const CATALOG_CATEGORIES = [
  { key: "tortas",       label: "Tortas" },
  { key: "cupcakes",     label: "Cupcakes" },
  { key: "cheesecakes",  label: "Cheesecakes" },
  { key: "tartas",       label: "Tartas" },
  { key: "budines",      label: "Budines" },
  { key: "cookies",      label: "Cookies" },
  { key: "alfajores",    label: "Alfajores" },
  { key: "postres",      label: "Postres" },
  { key: "mesas",        label: "Mesas Dulces" },
];

const PRODUCTS_BY_CATEGORY: Record<string, typeof ALL_PRODUCTS> = Object.fromEntries(
  CATALOG_CATEGORIES.map(c => [c.key, ALL_PRODUCTS.filter(p => p.category === c.key)])
);

const GALLERY = [
  { id: 1, name: "Torta Chocolate Frambuesa",    images: [tortaChocImg, tortaRedVelvetImg, macaronsImg] },
  { id: 2, name: "Torta Red Velvet",             images: [tortaRedVelvetImg] },
  { id: 3, name: "Macarons Surtidos",            images: [macaronsImg] },
  { id: 4, name: "Cheesecake Frutos del Bosque", images: [cheeseFrutosImg] },
  { id: 5, name: "Cupcakes Limón",               images: [cupcakesLimonImg] },
  { id: 6, name: "Torta Vainilla",               images: [tortaVainillaImg] },
  { id: 7, name: "Cupcakes Oreo",                images: [cupcakesOreoImg] },
  { id: 8, name: "Cheesecake Dulce de Leche",    images: [cheeseDulceImg] },
  { id: 9, name: "Cupcakes Rainbow",             images: [cupcakesRainbowImg] },
];

const HERO_SLIDES = [
  { img: heroBackground,     label: "Detalles que enamoran" },
  { img: tortaChocImg,       label: "Tortas personalizadas" },
  { img: macaronsImg,        label: "Pastelería artesanal" },
  { img: cheeseFrutosImg,    label: "Cada bocado, una obra" },
  { img: cupcakesRainbowImg, label: "Celebraciones especiales" },
];

/* ─── component ──────────────────────────────────────────── */

export default function Home() {
  const [activeSection,  setActiveSection]  = useState("inicio");
  const [isScrolled,     setIsScrolled]     = useState(false);
  const [quantities,     setQuantities]     = useState<Record<string, number>>({});
  const [cartOpen,       setCartOpen]       = useState(false);
  const [contactOpen,    setContactOpen]    = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [direction,      setDirection]      = useState(1);
  const [heroIndex,      setHeroIndex]      = useState(0);
  const [touchStart,     setTouchStart]     = useState(0);
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<typeof GALLERY[0] | null>(null);
  const [galleryImageIndex,   setGalleryImageIndex]   = useState(0);

  const heroRef        = useRef<ReturnType<typeof setInterval> | null>(null);
  const productsGridRef = useRef<HTMLDivElement>(null);

  const marqueeItems = [
    "Hecho con amor", "Cada detalle importa", "Tortas personalizadas",
    "Cupcakes artesanales", "Dulces momentos", "Eventos especiales",
    "Para tus celebraciones", "Regalos que enamoran",
  ];

  const cartItems = ALL_PRODUCTS.filter(p => (quantities[p.id] ?? 0) > 0);
  const cartTotal = cartItems.reduce((s, p) => s + p.price * (quantities[p.id] ?? 0), 0);
  const cartCount = cartItems.reduce((s, p) => s + (quantities[p.id] ?? 0), 0);

  /* timers */
  const startTimer = useCallback(() => {
    if (heroRef.current) clearInterval(heroRef.current);
    heroRef.current = setInterval(() => setHeroIndex(i => (i + 1) % HERO_SLIDES.length), 5500);
  }, []);

  useEffect(() => { startTimer(); return () => { if (heroRef.current) clearInterval(heroRef.current); }; }, [startTimer]);

  useEffect(() => {
    if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fn = () => {
      setIsScrolled(window.scrollY > 72);
      const active = NAV_LINKS.map(l => l.href.slice(1)).find(id => {
        const el = document.getElementById(id);
        if (!el) return false;
        const r = el.getBoundingClientRect();
        return r.top <= 100 && r.bottom >= 100;
      });
      if (active) setActiveSection(active);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* helpers */
  const wa       = (msg: string) => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  const call     = () => { window.location.href = PHONE_NUMBER; };
  const maps     = () => window.open("https://www.google.com/maps/search/?api=1&query=Monteros+Tucuman", "_blank");
  const cartWA   = () => {
    if (!cartItems.length) return;
    wa(`¡Hola! 😊🎂\n\nMe gustaría realizar el siguiente pedido:\n\n${cartItems.map(p => `🧁 ${p.name} x${quantities[p.id]}`).join("\n")}\n\nMuchas gracias 💕`);
  };
  const increment = (id: string) => setQuantities(q => ({ ...q, [id]: (q[id] ?? 0) + 1 }));
  const decrement = (id: string) => setQuantities(q => ({ ...q, [id]: Math.max(0, (q[id] ?? 0) - 1) }));
  const clearCart = () => setQuantities({});

  const openModal  = (item: typeof GALLERY[0]) => { setSelectedGalleryItem(item); setGalleryImageIndex(0); };
  const closeModal = () => { setSelectedGalleryItem(null); setGalleryImageIndex(0); };
  const modalPrev  = (e: React.MouseEvent) => { e.stopPropagation(); if (!selectedGalleryItem) return; setGalleryImageIndex(i => (i - 1 + selectedGalleryItem.images.length) % selectedGalleryItem.images.length); };
  const modalNext  = (e: React.MouseEvent) => { e.stopPropagation(); if (!selectedGalleryItem) return; setGalleryImageIndex(i => (i + 1) % selectedGalleryItem.images.length); };

  const pickCategory = (key: string) => {
    const next = activeCategory === key ? null : key;
    setActiveCategory(next);
    if (next) setTimeout(() => {
      const top = (productsGridRef.current?.getBoundingClientRect().top ?? 0) + window.scrollY - 120;
      window.scrollTo({ top, behavior: "smooth" });
    }, 80);
  };

  /* ─── render ────────────────────────────────────────────── */
  return (
    <div className="min-h-screen" style={{ background: "#F9F5F0", color: "#241510" }}>

      {/* ═══════════════════════════ HEADER ══════════════════════════ */}
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          isScrolled
            ? "bg-[#F9F5F0]/95 backdrop-blur-sm shadow-[0_1px_0_#D4B5AD55] py-3"
            : "py-5 bg-transparent"
        )}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">

          {/* brand */}
          <a href="#inicio" className="shrink-0 leading-none">
            <span
              className="transition-all duration-500"
              style={{
                fontFamily: "Great Vibes, cursive",
                fontSize: isScrolled ? "1.75rem" : "2.1rem",
                color: isScrolled ? "#A07878" : "white",
                textShadow: isScrolled ? "none" : "0 2px 16px rgba(0,0,0,.45)",
                lineHeight: 1,
                display: "block",
              }}
            >
              Dulce Palo
            </span>
          </a>

          {/* nav */}
          <nav className="hidden md:flex items-center gap-9 absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map(({ href, label }) => {
              const active = activeSection === href.slice(1);
              return (
                <a
                  key={href}
                  href={href}
                  className={cn(
                    "relative text-xs tracking-[.14em] uppercase font-medium transition-colors duration-300",
                    isScrolled
                      ? active ? "text-[#A07878]" : "text-[#7A5C54] hover:text-[#A07878]"
                      : active ? "text-white" : "text-white/65 hover:text-white"
                  )}
                >
                  {label}
                  {active && (
                    <motion.span
                      layoutId="ul"
                      className={cn("absolute -bottom-0.5 inset-x-0 h-px", isScrolled ? "bg-[#A07878]" : "bg-white")}
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* cart */}
          <AnimatePresence>
            {cartCount > 0 && (
              <motion.button
                initial={{ opacity: 0, scale: .8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: .8 }}
                onClick={() => setCartOpen(true)}
                className="relative flex items-center gap-1.5 px-4 py-1.5 text-xs tracking-[.1em] uppercase border border-[#A07878] text-[#A07878] hover:bg-[#A07878] hover:text-white transition-all duration-300"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Pedido</span>
                <span className="absolute -top-1.5 -right-1.5 bg-[#A07878] text-white text-[9px] w-4 h-4 rounded-full grid place-items-center font-bold leading-none">
                  {cartCount}
                </span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* ═══════════════════════════ HERO ════════════════════════════ */}
      <section
        id="inicio"
        className="relative min-h-screen overflow-hidden"
        onTouchStart={e => setTouchStart(e.touches[0].clientX)}
        onTouchEnd={e => {
          const d = touchStart - e.changedTouches[0].clientX;
          if (Math.abs(d) < 50) return;
          setHeroIndex(i => d > 0 ? (i + 1) % HERO_SLIDES.length : (i - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
          startTimer();
        }}
      >
        {/* image slides */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence initial={false}>
            <motion.div key={heroIndex} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.6, ease: "easeInOut" }} className="absolute inset-0">
              <motion.img
                src={HERO_SLIDES[heroIndex].img}
                alt=""
                initial={{ scale: 1.07 }}
                animate={{ scale: 1 }}
                transition={{ duration: 7.5, ease: "linear" }}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>
          {/* layered overlays for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/15 to-black/65" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
        </div>

        {/* content */}
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-center pt-24 pb-20">

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .7 }}
            className="flex items-center gap-3 mb-8 cursor-pointer group"
            onClick={maps}
          >
            <MapPin className="w-3 h-3 text-[#D4B5AD] group-hover:text-white transition-colors" />
            <span className="text-[#D4B5AD] group-hover:text-white transition-colors text-xs tracking-[.22em] uppercase font-medium">
              Monteros, Tucumán
            </span>
          </motion.div>

          <motion.img
            src={logoImg}
            alt="Dulce Palo"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: .12 }}
            className="w-[min(78vw,480px)] md:w-[min(56vw,620px)] h-auto drop-shadow-[0_4px_32px_rgba(0,0,0,.55)]"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .9, delay: .3 }}
            className="text-white/90 mt-2 -mb-2 text-2xl md:text-3xl font-light leading-snug"
            style={{ fontFamily: "Great Vibes, cursive", textShadow: "0 2px 16px rgba(0,0,0,.45)" }}
          >
            Cada bocado, una obra de arte.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .7, delay: .52 }}
            className="mt-10 flex flex-col sm:flex-row items-center gap-3"
          >
            <button
              onClick={() => wa("Hola! Me gustaría consultar sobre un pedido 🎂")}
              className="inline-flex items-center gap-2.5 bg-[#A07878] hover:bg-[#8C686C] text-white text-xs tracking-[.12em] uppercase font-semibold px-7 py-3.5 transition-all duration-300 hover:-translate-y-px"
            >
              <SiWhatsapp className="w-3.5 h-3.5" />
              Consultar ahora
            </button>
            <button
              onClick={() => document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-2 border border-white/45 text-white/85 hover:border-white hover:text-white text-xs tracking-[.12em] uppercase px-7 py-3.5 transition-all duration-300 backdrop-blur-[2px]"
            >
              Ver Catálogo
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        </div>

        {/* slide label + progress dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3">
          <AnimatePresence mode="wait">
            <motion.p
              key={heroIndex}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: .4 }}
              className="text-white/45 text-[10px] tracking-[.22em] uppercase"
              style={{ fontFamily: "system-ui, sans-serif" }}
            >
              {HERO_SLIDES[heroIndex].label}
            </motion.p>
          </AnimatePresence>
          <div className="flex gap-1.5">
            {HERO_SLIDES.map((_, i) => (
              <div
                key={i}
                className={cn("h-px transition-all duration-500", i === heroIndex ? "w-6 bg-white" : "w-2.5 bg-white/30")}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ MARQUEE ═════════════════════════ */}
      <div
        className="overflow-hidden py-3.5 cursor-pointer select-none"
        style={{ background: "#A07878" }}
        onClick={() => setDirection(d => d * -1)}
      >
        <motion.div
          animate={{ x: direction === 1 ? ["0%", "-50%"] : ["-50%", "0%"] }}
          transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
          className="flex gap-8 whitespace-nowrap w-max"
        >
          {[...marqueeItems, ...marqueeItems].map((t, i) => (
            <span key={i} className="flex items-center gap-8 text-white/85 text-xs tracking-[.18em] uppercase font-medium" style={{ fontFamily: "system-ui, sans-serif" }}>
              {t}
              <span className="text-white/30 text-[8px]">◆</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* ═══════════════════════════ SOBRE MÍ ════════════════════════ */}
      <section style={{ background: "#241510" }} className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-12 grid md:grid-cols-[1fr_1.1fr] gap-16 md:gap-24 items-center">

          {/* photo frame */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .75 }}
            className="relative"
          >
            <div className="aspect-[4/5] overflow-hidden" style={{ background: "#3A1E16" }}>
              <div className="w-full h-full flex flex-col items-center justify-center gap-2 opacity-30">
                <Heart className="w-10 h-10 text-[#D4B5AD]" fill="currentColor" />
                <p className="text-[#D4B5AD] text-[10px] tracking-[.25em] uppercase" style={{ fontFamily: "system-ui, sans-serif" }}>Tu foto aquí</p>
              </div>
            </div>
            {/* offset border */}
            <div
              className="absolute inset-0 border border-[#A07878]/25 pointer-events-none"
              style={{ transform: "translate(10px, 10px)", zIndex: -1 }}
            />
          </motion.div>

          {/* text */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .75, delay: .08 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-7 bg-[#D4B5AD]/50" />
              <p className="text-[#D4B5AD]/60 text-[10px] tracking-[.3em] uppercase" style={{ fontFamily: "system-ui, sans-serif" }}>La persona detrás</p>
            </div>

            <h2 className="text-white text-3xl md:text-4xl leading-snug mb-7" style={{ fontFamily: "Great Vibes, cursive" }}>
              Soy apasionada de la pastelería artesanal.
            </h2>

            <div className="text-[#D4B5AD]/70 text-sm leading-relaxed space-y-4" style={{ fontFamily: "system-ui, sans-serif" }}>
              <p>Cada receta que preparo está hecha con dedicación, ingredientes de calidad y mucho amor.</p>
              <p>Disfruto crear momentos dulces e inolvidables para vos y los tuyos.</p>
              <p>¡Gracias por confiar en mi trabajo! ❤️</p>
            </div>

            <div className="mt-9 pt-8 border-t border-white/8 grid grid-cols-3 gap-4 text-center">
              {[
                { i: <Heart className="w-4 h-4" fill="currentColor" />, l: "Hecho con amor" },
                { i: <Star  className="w-4 h-4" fill="currentColor" />, l: "Calidad artesanal" },
                { i: <Clock className="w-4 h-4" />,                     l: "A tu medida" },
              ].map(({ i, l }, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2">
                  <div className="w-7 h-7 border border-[#A07878]/35 flex items-center justify-center text-[#A07878]">{i}</div>
                  <p className="text-[#D4B5AD]/50 text-[10px] tracking-wide" style={{ fontFamily: "system-ui, sans-serif" }}>{l}</p>
                </div>
              ))}
            </div>

            <p className="mt-8 text-2xl text-[#D4B5AD]" style={{ fontFamily: "Great Vibes, cursive" }}>Con amor, Dulce Palo 🌸</p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════ CATÁLOGO ════════════════════════ */}
      <section id="catalogo" className="py-24 md:py-32" style={{ background: "#F9F5F0" }}>
        <div className="max-w-6xl mx-auto px-6 md:px-12">

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .6 }}
            className="mb-14"
          >
            <div className="flex items-center gap-4 mb-5">
              <div className="h-px w-7 bg-[#A07878]" />
              <p className="text-[#A07878] text-[10px] tracking-[.3em] uppercase" style={{ fontFamily: "system-ui, sans-serif" }}>Pastelería artesanal</p>
            </div>
            <h2 className="text-[#241510] text-4xl md:text-5xl" style={{ fontFamily: "Great Vibes, cursive" }}>Nuestro Catálogo</h2>
          </motion.div>

          {/* two-column layout: sidebar + grid */}
          <div className="flex flex-col lg:flex-row gap-10">

            {/* category list */}
            <aside className="lg:w-44 shrink-0">
              <div className="lg:sticky lg:top-28 flex flex-row lg:flex-col flex-wrap gap-2 lg:gap-0">
                {CATALOG_CATEGORIES.map(({ key, label }, idx) => (
                  <button
                    key={key}
                    onClick={() => pickCategory(key)}
                    className={cn(
                      "text-left text-sm transition-all duration-200 px-2 lg:px-0 py-1.5 lg:py-2.5",
                      "lg:border-b lg:border-[#EFE7DC]",
                      idx === CATALOG_CATEGORIES.length - 1 ? "lg:border-b-0" : "",
                      activeCategory === key
                        ? "text-[#A07878] font-semibold lg:pl-3 lg:border-l-2 lg:border-l-[#A07878] lg:border-b-transparent"
                        : "text-[#7A5C54]/65 hover:text-[#A07878]"
                    )}
                    style={{ fontFamily: "system-ui, sans-serif" }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </aside>

            {/* products */}
            <div className="flex-1" ref={productsGridRef}>
              {!activeCategory && (
                <div className="h-40 flex items-center justify-center text-[#A07878]/40 text-sm" style={{ fontFamily: "system-ui, sans-serif" }}>
                  Seleccioná una categoría
                </div>
              )}
              <AnimatePresence initial={false}>
                {activeCategory && (
                  <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: .25 }}
                  >
                    {/* gap-px grid — editorial separator effect */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-px" style={{ background: "#EFE7DC" }}>
                      {(PRODUCTS_BY_CATEGORY[activeCategory] ?? []).map((item, i) => {
                        const qty = quantities[item.id] ?? 0;
                        return (
                          <motion.article
                            key={item.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: i * .045 }}
                            className="group"
                            style={{ background: "#F9F5F0" }}
                          >
                            {/* image */}
                            <div
                              className="aspect-[4/3] overflow-hidden relative cursor-pointer"
                              style={{ background: "#EFE7DC" }}
                              onClick={() => openModal({ id: i + 100, name: item.name, images: [item.img] })}
                            >
                              <img
                                src={item.img}
                                alt={item.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                              />
                              <div className="absolute inset-0 bg-[#241510]/0 group-hover:bg-[#241510]/30 transition-colors duration-500 flex items-center justify-center">
                                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-[10px] tracking-[.2em] uppercase px-4 py-2" style={{ background: "rgba(36,21,16,.55)", fontFamily: "system-ui, sans-serif" }}>
                                  Ver detalle
                                </span>
                              </div>
                            </div>

                            {/* info */}
                            <div className="p-4 md:p-5">
                              <h3 className="text-sm font-semibold text-[#241510] mb-1 leading-snug" style={{ fontFamily: "system-ui, sans-serif" }}>
                                {item.name}
                              </h3>
                              <p className="text-xs text-[#7A5C54]/65 line-clamp-2 mb-4 leading-relaxed" style={{ fontFamily: "system-ui, sans-serif" }}>
                                {item.desc}
                              </p>
                              <div className="flex items-center justify-between">
                                <span className="text-[#A07878] font-bold text-base" style={{ fontFamily: "system-ui, sans-serif" }}>
                                  ${item.price.toLocaleString("es-AR")}
                                </span>
                                <div className="flex items-center gap-1.5">
                                  <button
                                    onClick={() => decrement(item.id)}
                                    disabled={qty === 0}
                                    className={cn(
                                      "w-6 h-6 border flex items-center justify-center transition-colors duration-150",
                                      qty > 0 ? "border-[#A07878] text-[#A07878] hover:bg-[#A07878] hover:text-white" : "border-[#EFE7DC] text-[#D4B5AD] cursor-not-allowed"
                                    )}
                                  >
                                    <Minus className="w-2.5 h-2.5" />
                                  </button>
                                  <span className="w-5 text-center text-xs font-bold tabular-nums text-[#241510]" style={{ fontFamily: "system-ui, sans-serif" }}>{qty}</span>
                                  <button
                                    onClick={() => increment(item.id)}
                                    className="w-6 h-6 bg-[#A07878] text-white flex items-center justify-center hover:bg-[#8C686C] transition-colors duration-150"
                                  >
                                    <Plus className="w-2.5 h-2.5" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </motion.article>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* cart strip */}
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 16 }}
                    className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border border-[#EFE7DC]"
                    style={{ fontFamily: "system-ui, sans-serif" }}
                  >
                    <div className="flex items-center gap-3 text-sm text-[#241510]">
                      <ShoppingBag className="w-4 h-4 text-[#A07878]" />
                      <span>{cartCount} {cartCount === 1 ? "producto" : "productos"}</span>
                      <span className="text-[#D4B5AD]">·</span>
                      <span className="font-bold text-[#A07878]">${cartTotal.toLocaleString("es-AR")}</span>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => setCartOpen(true)} className="px-4 py-2 text-xs tracking-[.1em] uppercase border border-[#A07878] text-[#A07878] hover:bg-[#A07878] hover:text-white transition-all duration-200">
                        Ver pedido
                      </button>
                      <button onClick={cartWA} className="flex items-center gap-1.5 px-4 py-2 text-xs tracking-[.1em] uppercase bg-[#A07878] text-white hover:bg-[#8C686C] transition-colors">
                        <SiWhatsapp className="w-3 h-3" />
                        Enviar
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ PEDIDO PERSONALIZADO ════════════ */}
      <section id="pedido" className="py-24 md:py-32" style={{ background: "#EFE7DC" }}>
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: .6 }}
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="h-px w-7 bg-[#A07878]" />
                <p className="text-[#A07878] text-[10px] tracking-[.3em] uppercase" style={{ fontFamily: "system-ui, sans-serif" }}>Encargos especiales</p>
              </div>
              <h2 className="text-[#241510] text-4xl md:text-5xl mb-6" style={{ fontFamily: "Great Vibes, cursive" }}>Pedido Personalizado</h2>
              <p className="text-[#7A5C54] text-base mb-10 leading-relaxed" style={{ fontFamily: "system-ui, sans-serif" }}>
                ¿Tenés una celebración especial? Contáctanos para afinar detalles.
              </p>

              <div className="space-y-7 mb-12">
                {[
                  { icon: <Star className="w-4 h-4" fill="currentColor" />, title: "Diseños Únicos", desc: "Cada pedido especial es diseñado a medida para tu evento." },
                  { icon: <Clock className="w-4 h-4" />, title: "Anticipación", desc: "Sugerimos realizar pedidos personalizados con 48hs de anticipación." },
                ].map(({ icon, title, desc }, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-9 h-9 border border-[#A07878]/30 flex items-center justify-center shrink-0 text-[#A07878]">{icon}</div>
                    <div>
                      <h3 className="font-semibold text-[#241510] mb-1 text-sm" style={{ fontFamily: "system-ui, sans-serif" }}>{title}</h3>
                      <p className="text-[#7A5C54]/70 text-sm leading-relaxed" style={{ fontFamily: "system-ui, sans-serif" }}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => wa("Hola! Me gustaría hacer un pedido personalizado, ¿Estaría disponible?")}
                  className="inline-flex items-center gap-2.5 bg-[#A07878] hover:bg-[#8C686C] text-white text-xs tracking-[.12em] uppercase font-semibold px-7 py-3.5 transition-all duration-300"
                  style={{ fontFamily: "system-ui, sans-serif" }}
                >
                  <SiWhatsapp className="w-3.5 h-3.5" />
                  Solicitar por WhatsApp
                </button>
                <span className="text-[#A07878]/60 text-xs" style={{ fontFamily: "system-ui, sans-serif" }}>✓ Respondemos en el día</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ GALERÍA ═════════════════════════ */}
      <section id="galeria" className="py-24 md:py-32" style={{ background: "#F9F5F0" }}>
        <div className="max-w-6xl mx-auto px-6 md:px-12">

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .6 }}
            className="flex items-end justify-between mb-10"
          >
            <div>
              <div className="flex items-center gap-4 mb-5">
                <div className="h-px w-7 bg-[#A07878]" />
                <p className="text-[#A07878] text-[10px] tracking-[.3em] uppercase" style={{ fontFamily: "system-ui, sans-serif" }}>Nuestras creaciones</p>
              </div>
              <h2 className="text-[#241510] text-4xl md:text-5xl" style={{ fontFamily: "Great Vibes, cursive" }}>Nuestra Galería</h2>
            </div>
            <a href="#" className="hidden md:flex items-center gap-1.5 text-[#A07878]/60 hover:text-[#A07878] text-xs tracking-[.1em] transition-colors" style={{ fontFamily: "system-ui, sans-serif" }}>
              <SiInstagram className="w-3.5 h-3.5" /> @dulce.palo
            </a>
          </motion.div>

          {/* gap-px masonry — rows vary for editorial feel */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-px" style={{ background: "#EFE7DC" }}>
            {GALLERY.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * .06, duration: .5 }}
                onClick={() => openModal(item)}
                className={cn(
                  "relative overflow-hidden cursor-pointer group",
                  i === 0 || i === 5 ? "row-span-2" : "",
                  i === 0 || i === 5 ? "aspect-[2/3] md:aspect-auto" : "aspect-square"
                )}
                style={{ background: "#EFE7DC" }}
              >
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-[#241510]/0 group-hover:bg-[#241510]/50 transition-colors duration-400" />
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 gap-1.5 p-4">
                  <SiInstagram className="w-5 h-5 text-white" />
                  <p className="text-white text-xs font-medium text-center line-clamp-1" style={{ fontFamily: "system-ui, sans-serif" }}>{item.name}</p>
                </div>
                {item.images.length > 1 && (
                  <div className="absolute top-2 right-2 bg-[#241510]/40 backdrop-blur-sm text-white text-[9px] px-1.5 py-px" style={{ fontFamily: "system-ui, sans-serif" }}>
                    +{item.images.length - 1}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ GALLERY MODAL ════════════════════ */}
      <AnimatePresence>
        {selectedGalleryItem && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: .22 }}
            onClick={closeModal}
            className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, y: 36, scale: .96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 36, scale: .96 }}
              transition={{ duration: .32, ease: [.32, .72, 0, 1] }}
              onClick={e => e.stopPropagation()}
              className="relative w-full sm:max-w-2xl md:max-w-3xl sm:mx-4 rounded-t-3xl sm:rounded-3xl overflow-hidden"
              style={{ background: "#1A0F10" }}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-black">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={galleryImageIndex}
                    src={selectedGalleryItem.images[galleryImageIndex]}
                    alt={selectedGalleryItem.name}
                    initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .97 }}
                    transition={{ duration: .28, ease: "easeInOut" }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
                {selectedGalleryItem.images.length > 1 && (
                  <>
                    <button onClick={modalPrev} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/65 backdrop-blur-sm text-white flex items-center justify-center transition-colors">
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button onClick={modalNext} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/65 backdrop-blur-sm text-white flex items-center justify-center transition-colors">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </>
                )}
                <button onClick={closeModal} className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/40 hover:bg-black/65 backdrop-blur-sm text-white flex items-center justify-center transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-4 sm:p-5" style={{ background: "#1A0F10" }}>
                <p className="text-white font-semibold text-lg mb-0.5">{selectedGalleryItem.name}</p>
                <p className="text-[#c2a1a3] text-[10px] tracking-[.22em] uppercase mb-3" style={{ fontFamily: "system-ui, sans-serif" }}>Dulce Palo · Pastelería artesanal</p>
                {selectedGalleryItem.images.length > 1 && (
                  <div className="flex gap-1.5 overflow-x-auto pb-1">
                    {selectedGalleryItem.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={e => { e.stopPropagation(); setGalleryImageIndex(idx); }}
                        className={cn("shrink-0 w-12 h-12 overflow-hidden border transition-all duration-200", idx === galleryImageIndex ? "border-[#c2a1a3] scale-105" : "border-white/10 opacity-50 hover:opacity-75")}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════ CTA FINAL ════════════════════════ */}
      <section style={{ background: "#241510" }} className="py-28 md:py-40 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .75 }}
          >
            <div className="flex items-center justify-center gap-4 mb-10">
              <div className="h-px w-10 bg-[#A07878]/40" />
              <p className="text-[#A07878]/60 text-[10px] tracking-[.3em] uppercase" style={{ fontFamily: "system-ui, sans-serif" }}>Empezá hoy</p>
              <div className="h-px w-10 bg-[#A07878]/40" />
            </div>

            <h2 className="text-white leading-[1.1] mb-3"
              style={{ fontFamily: "Great Vibes, cursive", fontSize: "clamp(3rem, 9vw, 7rem)" }}>
              ¿Creamos algo especial
            </h2>
            <h2 className="text-[#D4B5AD] leading-[1.1] mb-12"
              style={{ fontFamily: "Great Vibes, cursive", fontSize: "clamp(3rem, 9vw, 7rem)" }}>
              para vos?
            </h2>

            <p className="text-white/40 max-w-md mx-auto mb-11 text-sm leading-relaxed" style={{ fontFamily: "system-ui, sans-serif" }}>
              Cada celebración merece un dulce hecho con amor. Consultanos sin compromiso.
            </p>

            <button
              onClick={() => wa("Hola! Me gustaría consultar sobre un pedido especial 🎂")}
              className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1DA851] text-white font-bold text-sm tracking-[.1em] uppercase px-10 py-4 transition-all duration-300 hover:-translate-y-px"
              style={{ fontFamily: "system-ui, sans-serif" }}
            >
              <SiWhatsapp className="w-4 h-4" />
              Escribinos por WhatsApp
            </button>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════ FOOTER ══════════════════════════ */}
      <footer id="contacto" style={{ background: "#160C09" }} className="py-12 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 pb-8 border-b border-white/8">

            <div>
              <span className="text-[#D4B5AD] text-2xl" style={{ fontFamily: "Great Vibes, cursive" }}>Dulce Palo</span>
              <div className="flex gap-2 mt-3">
                {[
                  { aria: "Instagram", icon: <SiInstagram className="w-3 h-3" />, href: "#" },
                  { aria: "WhatsApp",  icon: <SiWhatsapp  className="w-3 h-3" />, href: `https://wa.me/${WHATSAPP_NUMBER}` },
                ].map(({ aria, icon, href }) => (
                  <a key={aria} href={href} aria-label={aria} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
                    className="w-7 h-7 border border-white/15 flex items-center justify-center text-white/40 hover:border-[#A07878] hover:text-[#A07878] transition-all duration-300">
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            <nav className="flex flex-wrap gap-x-7 gap-y-2">
              {NAV_LINKS.map(({ href, label }) => (
                <a key={href} href={href} className="text-white/30 hover:text-white/70 text-xs tracking-[.1em] uppercase transition-colors" style={{ fontFamily: "system-ui, sans-serif" }}>
                  {label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-1.5 text-white/25 text-xs" style={{ fontFamily: "system-ui, sans-serif" }}>
              <MapPin className="w-3 h-3 text-[#A07878]/40 shrink-0" />
              Monteros, Tucumán, Argentina
            </div>
          </div>
          <p className="pt-5 text-white/15 text-xs" style={{ fontFamily: "system-ui, sans-serif" }}>
            © {new Date().getFullYear()} Dulce Palo Pastelería.
          </p>
        </div>
      </footer>

      {/* ═══════════════════════════ FAB ═════════════════════════════ */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            initial={{ opacity: 0, scale: .5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: .5 }}
            transition={{ duration: .22 }}
            className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5"
          >
            <AnimatePresence>
              {contactOpen && (
                <>
                  {[
                    { key: "wa",   label: "WhatsApp", icon: <SiWhatsapp className="w-3.5 h-3.5" />, cls: "bg-[#25D366] hover:bg-[#1da851]", action: () => { wa("Hola! Me gustaría hacer un pedido."); setContactOpen(false); } },
                    { key: "call", label: "Llamar",   icon: <Phone className="w-3.5 h-3.5" />,       cls: "bg-white text-[#A07878] border border-[#EFE7DC] hover:bg-[#F9F5F0]", action: () => { call(); setContactOpen(false); } },
                  ].map(({ key, label, icon, cls, action }, idx) => (
                    <motion.button
                      key={key}
                      initial={{ opacity: 0, y: 14, scale: .85 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 14, scale: .85 }}
                      transition={{ duration: .18, delay: idx * .05 }}
                      onClick={action}
                      className={cn("flex items-center gap-2 text-white px-4 py-2.5 text-xs font-semibold shadow-lg transition-colors", cls)}
                      style={{ fontFamily: "system-ui, sans-serif" }}
                    >
                      {icon}{label}
                    </motion.button>
                  ))}
                </>
              )}
            </AnimatePresence>

            <div className="relative">
              {!contactOpen && (
                <motion.span
                  className="absolute inset-0 rounded-full bg-[#D4B5AD]"
                  animate={{ scale: [1, 1.5, 1], opacity: [.4, 0, .4] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
              <button
                onClick={() => setContactOpen(o => !o)}
                className={cn(
                  "relative w-13 h-13 w-[52px] h-[52px] rounded-full border-2 border-white shadow-xl flex items-center justify-center transition-all duration-300",
                  contactOpen ? "bg-[#A07878] text-white rotate-45" : "bg-[#D4B5AD] text-white hover:bg-[#A07878] hover:scale-110"
                )}
              >
                <Phone className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════ CART DRAWER ═════════════════════ */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div key="bd" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/40 z-50" onClick={() => setCartOpen(false)} />
            <motion.div
              key="dr"
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="fixed right-0 top-0 h-full w-full max-w-sm z-50 shadow-2xl flex flex-col"
              style={{ background: "#F9F5F0" }}
            >
              <div className="flex items-center justify-between p-5 border-b border-[#EFE7DC]">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-[#A07878]" />
                  <h3 className="text-base font-bold text-[#241510]" style={{ fontFamily: "system-ui, sans-serif" }}>Tu Pedido ({cartCount})</h3>
                </div>
                <button onClick={() => setCartOpen(false)} className="p-2 hover:bg-[#EFE7DC] transition-colors text-[#7A5C54]">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {cartItems.length === 0
                  ? <p className="text-[#7A5C54]/50 text-center py-12 text-sm" style={{ fontFamily: "system-ui, sans-serif" }}>No hay productos seleccionados.</p>
                  : cartItems.map(item => (
                    <div key={item.id} className="flex items-center gap-3">
                      <img src={item.img} alt={item.name} className="w-12 h-12 object-cover shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-[#241510] truncate" style={{ fontFamily: "system-ui, sans-serif" }}>{item.name}</p>
                        <p className="text-[#A07878] font-semibold text-xs" style={{ fontFamily: "system-ui, sans-serif" }}>${(item.price * (quantities[item.id] ?? 0)).toLocaleString("es-AR")}</p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button onClick={() => decrement(item.id)} className="w-6 h-6 border border-[#EFE7DC] text-[#7A5C54] flex items-center justify-center hover:border-[#A07878] hover:text-[#A07878] transition-colors">
                          <Minus className="w-2.5 h-2.5" />
                        </button>
                        <span className="w-4 text-center text-xs font-bold text-[#241510]" style={{ fontFamily: "system-ui, sans-serif" }}>{quantities[item.id]}</span>
                        <button onClick={() => increment(item.id)} className="w-6 h-6 bg-[#A07878] text-white flex items-center justify-center hover:bg-[#8C686C] transition-colors">
                          <Plus className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    </div>
                  ))
                }
              </div>

              {cartItems.length > 0 && (
                <div className="p-5 border-t border-[#EFE7DC]">
                  <button onClick={clearCart} className="w-full text-xs text-[#7A5C54]/50 hover:text-red-400 transition-colors mb-3 text-center" style={{ fontFamily: "system-ui, sans-serif" }}>
                    Borrar todo
                  </button>
                  <div className="flex justify-between mb-4">
                    <span className="text-[#7A5C54] text-sm" style={{ fontFamily: "system-ui, sans-serif" }}>Total estimado</span>
                    <span className="font-bold text-lg text-[#A07878]">${cartTotal.toLocaleString("es-AR")}</span>
                  </div>
                  <button onClick={cartWA} className="w-full flex items-center justify-center gap-2 text-sm h-11 bg-[#A07878] hover:bg-[#8C686C] text-white transition-colors" style={{ fontFamily: "system-ui, sans-serif" }}>
                    <SiWhatsapp className="w-4 h-4" />
                    Enviar Pedido por WhatsApp
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
