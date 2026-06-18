import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronLeft, ChevronRight, Star, MapPin, Clock, Plus, Minus, ShoppingBag, X, Phone, Heart } from "lucide-react";
import { SiWhatsapp, SiInstagram } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import heroBackground from "@/assets/images/hero.png";
import logoImg from "@/assets/images/logo-dulce-palo.png";
import tortaChocImg from "@/assets/images/torta-choc-frambuesa.png";
import tortaRedVelvetImg from "@/assets/images/torta-red-velvet.png";
import tortaVainillaImg from "@/assets/images/torta-vainilla-frutos.png";
import cupcakesLimonImg from "@/assets/images/cupcakes-limon.png";
import cupcakesOreoImg from "@/assets/images/cupcakes-oreo.png";
import cupcakesRainbowImg from "@/assets/images/cupcakes-rainbow.png";
import cheeseFrutosImg from "@/assets/images/cheesecake-frutos-bosque.png";
import cheeseDulceImg from "@/assets/images/cheesecake-dulce-leche.png";
import macaronsImg from "@/assets/images/macarons.png";

const WHATSAPP_NUMBER = "5493863500051";
const PHONE_NUMBER = "tel:+5493863500051";

const NAV_LINKS = [
  { href: "#inicio",   label: "Inicio" },
  { href: "#catalogo", label: "Catálogo" },
  { href: "#pedido",   label: "Pedido Personalizado" },
  { href: "#galeria",  label: "Galería" },
];

const ALL_PRODUCTS = [
  { id: "torta-choc",     category: "tortas",       name: "Torta de Chocolate con Frambuesas",    desc: "Bizcochuelo húmedo de chocolate intenso con centro de frambuesas frescas.",    price: 3500,  img: tortaChocImg },
  { id: "torta-red",      category: "tortas",       name: "Torta Red Velvet",                     desc: "Clásica red velvet con frosting de queso crema suave.",                       price: 3800,  img: tortaRedVelvetImg },
  { id: "torta-vainilla", category: "tortas",       name: "Torta de Vainilla y Frutos Rojos",     desc: "Capas de vainilla con crema chantilly y selección de frutos rojos.",           price: 3200,  img: tortaVainillaImg },
  { id: "cupcake-limon",  category: "cupcakes",     name: "Cupcakes de Limón",                    desc: "Masa de limón con corazón de curd y frosting cítrico.",                       price: 800,   img: cupcakesLimonImg },
  { id: "cupcake-oreo",   category: "cupcakes",     name: "Cupcakes de Oreo",                     desc: "Base de chocolate con trozos de galleta y crema de vainilla.",                price: 900,   img: cupcakesOreoImg },
  { id: "cupcake-rainbow",category: "cupcakes",     name: "Cupcakes Rainbow",                     desc: "Coloridos y divertidos, ideales para celebraciones infantiles.",               price: 950,   img: cupcakesRainbowImg },
  { id: "cheese-frutos",  category: "cheesecakes",  name: "Cheesecake de Frutos del Bosque",      desc: "Estilo New York con salsa casera de frutos rojos.",                           price: 2800,  img: cheeseFrutosImg },
  { id: "cheese-dulce",   category: "cheesecakes",  name: "Cheesecake de Dulce de Leche",         desc: "Cremoso, con hilos de dulce de leche colonial.",                             price: 2600,  img: cheeseDulceImg },
  { id: "macarons",       category: "postres",      name: "Macarons Surtidos",                    desc: "Caja de 6 macarons franceses en colores pastel.",                             price: 1200,  img: macaronsImg },
  { id: "brownies",       category: "postres",      name: "Brownies Artesanales",                 desc: "Húmedos, con nueces y costra crujiente.",                                     price: 600,   img: tortaChocImg },
  { id: "tiramisu",       category: "postres",      name: "Tiramisú Individual",                  desc: "Clásico italiano con mascarpone y café espresso.",                            price: 750,   img: cheeseDulceImg },
  { id: "mesa-30",        category: "mesas",        name: "Mesa Dulce para 30 personas",          desc: "Selección de 3 tortas y 2 docenas de postres individuales.",                  price: 25000, img: heroBackground },
  { id: "mesa-50",        category: "mesas",        name: "Mesa Dulce para 50 personas",          desc: "Selección premium de 5 tortas y 4 docenas de postres.",                       price: 38000, img: heroBackground },
  { id: "tarta-fruta",    category: "tartas",       name: "Tarta de Frutas Frescas",              desc: "Base crocante con crema pastelera y frutas de temporada.",                    price: 2200,  img: tortaVainillaImg },
  { id: "tarta-limon",    category: "tartas",       name: "Tarta de Limón",                       desc: "Relleno cremoso de limón con merengue tostado.",                              price: 2000,  img: cupcakesLimonImg },
  { id: "tarta-choc",     category: "tartas",       name: "Tarta de Chocolate",                   desc: "Ganache intenso sobre masa sablée con base crocante.",                        price: 2100,  img: tortaChocImg },
  { id: "budin-limon",    category: "budines",      name: "Budín de Limón",                       desc: "Esponjoso y húmedo con cobertura de azúcar glasé.",                           price: 900,   img: cupcakesLimonImg },
  { id: "budin-naranja",  category: "budines",      name: "Budín de Naranja y Almendras",         desc: "Aromas cítricos con textura tierna y almendras tostadas.",                    price: 950,   img: tortaVainillaImg },
  { id: "budin-choc",     category: "budines",      name: "Budín de Chocolate",                   desc: "Doble chocolate con chips y cobertura brillante.",                            price: 1000,  img: tortaChocImg },
  { id: "cookie-choc",    category: "cookies",      name: "Cookies de Chocolate",                 desc: "Masa suave con chips de chocolate semi amargo.",                              price: 350,   img: cupcakesOreoImg },
  { id: "cookie-vainilla",category: "cookies",      name: "Cookies de Vainilla y Nuez",           desc: "Clásicas y crocantes con trozos de nuez caramelizada.",                       price: 350,   img: macaronsImg },
  { id: "cookie-red",     category: "cookies",      name: "Cookies Red Velvet",                   desc: "Suaves y coloridas con chips de chocolate blanco.",                           price: 380,   img: tortaRedVelvetImg },
  { id: "alfa-dulce",     category: "alfajores",    name: "Alfajores de Dulce de Leche",          desc: "Tres capas de masa tierna con dulce de leche y coco.",                        price: 450,   img: cheeseDulceImg },
  { id: "alfa-choc",      category: "alfajores",    name: "Alfajores Bañados en Chocolate",       desc: "Relleno de dulce de leche con baño de chocolate negro.",                      price: 500,   img: tortaChocImg },
  { id: "alfa-limon",     category: "alfajores",    name: "Alfajores de Limón",                   desc: "Masa cítrica con crema de limón y azúcar impalpable.",                        price: 450,   img: cupcakesLimonImg },
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
  { id: 1, name: "Torta Chocolate Frambuesa",     images: [tortaChocImg, tortaRedVelvetImg, macaronsImg] },
  { id: 2, name: "Torta Red Velvet",              images: [tortaRedVelvetImg] },
  { id: 3, name: "Macarons Surtidos",             images: [macaronsImg] },
  { id: 4, name: "Cheesecake Frutos del Bosque",  images: [cheeseFrutosImg] },
  { id: 5, name: "Cupcakes Limón",                images: [cupcakesLimonImg] },
  { id: 6, name: "Torta Vainilla",                images: [tortaVainillaImg] },
  { id: 7, name: "Cupcakes Oreo",                 images: [cupcakesOreoImg] },
  { id: 8, name: "Cheesecake Dulce de Leche",     images: [cheeseDulceImg] },
  { id: 9, name: "Cupcakes Rainbow",              images: [cupcakesRainbowImg] },
];

const HERO_SLIDES = [
  { img: heroBackground,     label: "Detalles que enamoran" },
  { img: tortaChocImg,       label: "Tortas personalizadas" },
  { img: macaronsImg,        label: "Pastelería artesanal" },
  { img: cheeseFrutosImg,    label: "Cada bocado, una obra" },
  { img: cupcakesRainbowImg, label: "Celebraciones especiales" },
];

const FEATURED_PRODUCTS = [
  { title: "Torta Chocolate",  image: tortaChocImg,      price: "$3500" },
  { title: "Torta Chocolate",  image: tortaChocImg,      price: "$3500" },
  { title: "Torta Chocolate",  image: tortaChocImg,      price: "$3500" },
  { title: "Torta Chocolate",  image: tortaChocImg,      price: "$3500" },
  { title: "Torta Chocolate",  image: tortaChocImg,      price: "$3500" },
  { title: "Red Velvet",       image: tortaRedVelvetImg, price: "$3800" },
  { title: "Cheesecake",       image: cheeseFrutosImg,   price: "$2800" },
  { title: "Macarons",         image: macaronsImg,       price: "$1200" },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState("inicio");
  const [isScrolled, setIsScrolled] = useState(false);
  const [quantities, setQuantities]   = useState<Record<string, number>>({});
  const [cartOpen, setCartOpen]       = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [direction, setDirection] = useState(1);
  const [heroIndex, setHeroIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const heroIntervalRef  = useRef<ReturnType<typeof setInterval> | null>(null);
  const productsGridRef  = useRef<HTMLDivElement>(null);
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<typeof GALLERY[0] | null>(null);
  const [galleryImageIndex, setGalleryImageIndex]     = useState(0);

  const marqueeItems = [
    "Hecho con amor", "Cada detalle importa", "Tortas personalizadas",
    "Cupcakes artesanales", "Dulces momentos", "Eventos especiales",
    "Para tus celebraciones", "Regalos que enamoran",
  ];

  const cartItems = ALL_PRODUCTS.filter(p => (quantities[p.id] ?? 0) > 0);
  const cartTotal = cartItems.reduce((s, p) => s + p.price * (quantities[p.id] ?? 0), 0);
  const cartCount = cartItems.reduce((s, p) => s + (quantities[p.id] ?? 0), 0);

  const startHeroTimer = useCallback(() => {
    if (heroIntervalRef.current) clearInterval(heroIntervalRef.current);
    heroIntervalRef.current = setInterval(() => {
      setHeroIndex(i => (i + 1) % HERO_SLIDES.length);
    }, 5500);
  }, []);

  useEffect(() => { startHeroTimer(); return () => { if (heroIntervalRef.current) clearInterval(heroIntervalRef.current); }; }, [startHeroTimer]);

  useEffect(() => {
    if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fn = () => {
      setIsScrolled(window.scrollY > 80);
      const sections = NAV_LINKS.map(l => l.href.substring(1));
      const cur = sections.find(s => {
        const el = document.getElementById(s);
        if (el) { const r = el.getBoundingClientRect(); return r.top <= 100 && r.bottom >= 100; }
        return false;
      });
      if (cur) setActiveSection(cur);
    };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const openWhatsApp = (msg: string) => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  const makeCall     = () => { window.location.href = PHONE_NUMBER; };
  const openMaps     = () => window.open("https://www.google.com/maps/search/?api=1&query=Monteros+Tucuman", "_blank");

  const sendCartOrder = () => {
    if (!cartItems.length) return;
    const lines = cartItems.map(p => `🧁 ${p.name} x${quantities[p.id]}`).join("\n");
    openWhatsApp(`¡Hola! 😊🎂\n\nMe gustaría realizar el siguiente pedido:\n\n${lines}\n\nMuchas gracias 💕`);
  };
  const clearCart  = () => setQuantities({});
  const increment  = (id: string) => setQuantities(q => ({ ...q, [id]: (q[id] ?? 0) + 1 }));
  const decrement  = (id: string) => setQuantities(q => ({ ...q, [id]: Math.max(0, (q[id] ?? 0) - 1) }));

  const openGalleryModal  = (item: typeof GALLERY[0]) => { setSelectedGalleryItem(item); setGalleryImageIndex(0); };
  const closeGalleryModal = () => { setSelectedGalleryItem(null); setGalleryImageIndex(0); };
  const galleryPrev = (e: React.MouseEvent) => { e.stopPropagation(); if (!selectedGalleryItem) return; setGalleryImageIndex(i => (i - 1 + selectedGalleryItem.images.length) % selectedGalleryItem.images.length); };
  const galleryNext = (e: React.MouseEvent) => { e.stopPropagation(); if (!selectedGalleryItem) return; setGalleryImageIndex(i => (i + 1) % selectedGalleryItem.images.length); };

  const handleCategorySelect = (key: string) => {
    const next = activeCategory === key ? null : key;
    setActiveCategory(next);
    if (next) {
      setTimeout(() => {
        if (productsGridRef.current) {
          const top = productsGridRef.current.getBoundingClientRect().top + window.scrollY - 120;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }, 80);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FAF8F5", color: "#2C1810", fontFamily: "'Playfair Display', serif" }}>

      {/* ══════════════════════════════════════════════
          NAVBAR — linha fina, logo centrado no topo
      ══════════════════════════════════════════════ */}
      <header
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-500",
          isScrolled ? "bg-[#FAF8F5]/95 backdrop-blur-sm border-b border-[#E8D5C4]/60 py-3" : "bg-transparent py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

          {/* Logo */}
          <a href="#inicio" className="shrink-0">
            <span
              className={cn("transition-all duration-500", isScrolled ? "text-3xl text-[#A17A7E]" : "text-4xl text-white")}
              style={{ fontFamily: "Great Vibes", textShadow: isScrolled ? "none" : "0 2px 12px rgba(0,0,0,0.4)" }}
            >
              Dulce Palo
            </span>
          </a>

          {/* Nav links — centrado */}
          <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map(link => {
              const active = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative text-sm font-medium tracking-[0.08em] uppercase transition-all duration-300",
                    isScrolled
                      ? active ? "text-[#A17A7E]" : "text-[#7A5C5C] hover:text-[#A17A7E]"
                      : active ? "text-white" : "text-white/70 hover:text-white"
                  )}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-line"
                      className={cn("absolute -bottom-1 left-0 right-0 h-px", isScrolled ? "bg-[#A17A7E]" : "bg-white")}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Cart badge */}
          <div className="shrink-0">
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => setCartOpen(true)}
                  className="relative flex items-center gap-2 px-4 py-2 rounded-full border border-[#A17A7E] text-[#A17A7E] text-sm font-medium hover:bg-[#A17A7E] hover:text-white transition-all duration-300"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Pedido</span>
                  <span className="absolute -top-1.5 -right-1.5 bg-[#A17A7E] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold leading-none">
                    {cartCount}
                  </span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* ══════════════════════════════════════════════
          HERO — split layout: texto esquerda, imagem direita
          (mobile: imagem de fundo full-bleed)
      ══════════════════════════════════════════════ */}
      <section id="inicio" className="relative min-h-screen overflow-hidden">

        {/* Background image slider — full bleed */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence initial={false}>
            <motion.div key={heroIndex} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.4, ease: "easeInOut" }} className="absolute inset-0">
              <motion.img
                src={HERO_SLIDES[heroIndex].img}
                alt=""
                initial={{ scale: 1.06 }}
                animate={{ scale: 1 }}
                transition={{ duration: 7, ease: "linear" }}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>
          {/* Overlay: escuro à esquerda para texto, transparente à direita */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
        </div>

        {/* Conteúdo */}
        <div className="relative z-10 min-h-screen flex flex-col justify-center max-w-7xl mx-auto px-6 md:px-12 pt-24 pb-16">
          <div className="max-w-xl">

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-8 h-px bg-[#C9A89A]" />
              <button
                onClick={openMaps}
                className="text-[#C9A89A] text-xs tracking-[0.25em] uppercase font-medium hover:text-white transition-colors"
              >
                Monteros, Tucumán
              </button>
            </motion.div>

            {/* Logo grande */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15 }}
            >
              <img
                src={logoImg}
                alt="Dulce Palo"
                className="w-64 md:w-80 lg:w-[26rem] h-auto mb-4"
                style={{ filter: "brightness(0) invert(1) drop-shadow(0 4px 20px rgba(0,0,0,0.4))" }}
              />
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="text-white/90 text-xl md:text-2xl leading-relaxed mb-10 font-light"
              style={{ fontFamily: "Great Vibes" }}
            >
              Cada bocado, una obra de arte.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <button
                onClick={() => openWhatsApp("Hola! Me gustaría consultar sobre un pedido 🎂")}
                className="inline-flex items-center justify-center gap-2.5 bg-[#A17A7E] hover:bg-[#8C686C] text-white text-sm font-semibold tracking-wide px-7 py-3.5 transition-all duration-300 hover:-translate-y-0.5"
              >
                <SiWhatsapp className="w-4 h-4" />
                Consultar ahora
              </button>
              <button
                onClick={() => document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center justify-center gap-2 border border-white/50 text-white/90 hover:border-white hover:text-white text-sm font-medium tracking-wide px-7 py-3.5 transition-all duration-300 backdrop-blur-sm"
              >
                Ver Catálogo
                <ChevronDown className="w-4 h-4" />
              </button>
            </motion.div>
          </div>

          {/* Slide label — bottom right */}
          <AnimatePresence mode="wait">
            <motion.div
              key={heroIndex}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.5 }}
              className="absolute bottom-8 right-8 text-right hidden md:block"
            >
              <p className="text-white/40 text-xs tracking-[0.2em] uppercase">
                {String(heroIndex + 1).padStart(2, "0")} / {String(HERO_SLIDES.length).padStart(2, "0")}
              </p>
              <p className="text-white/70 text-sm mt-1" style={{ fontFamily: "Great Vibes" }}>
                {HERO_SLIDES[heroIndex].label}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 6, 0] }}
            transition={{ opacity: { delay: 1.5, duration: 0.5 }, y: { delay: 1.5, duration: 2.5, repeat: Infinity, ease: "easeInOut" } }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30"
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </div>

        {/* Touch swipe support */}
        <div
          className="absolute inset-0 z-5"
          onTouchStart={e => setTouchStart(e.touches[0].clientX)}
          onTouchEnd={e => {
            const diff = touchStart - e.changedTouches[0].clientX;
            if (Math.abs(diff) < 50) return;
            setHeroIndex(i => diff > 0 ? (i + 1) % HERO_SLIDES.length : (i - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
            startHeroTimer();
          }}
        />
      </section>

      {/* ══════════════════════════════════════════════
          MARQUEE — ribbon de texto entre hero y catálogo
      ══════════════════════════════════════════════ */}
      <div
        className="overflow-hidden py-3 cursor-pointer select-none"
        style={{ backgroundColor: "#A17A7E" }}
        onClick={() => setDirection(d => d * -1)}
      >
        <motion.div
          animate={{ x: direction === 1 ? ["0%", "-50%"] : ["-50%", "0%"] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="flex gap-8 whitespace-nowrap w-max"
        >
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="flex items-center gap-8 text-white/90 text-sm tracking-[0.15em] uppercase font-medium">
              {item}
              <span className="text-white/40">◆</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════════
          SOBRE MÍ — full-width dark section
      ══════════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#2C1810" }} className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">

            {/* Foto placeholder */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative order-2 md:order-1"
            >
              <div
                className="aspect-[4/5] w-full overflow-hidden"
                style={{ backgroundColor: "#3D2218" }}
              >
                <div className="w-full h-full flex flex-col items-center justify-center gap-3 opacity-40">
                  <Heart className="w-12 h-12 text-[#C9A89A]" fill="currentColor" />
                  <p className="text-[#C9A89A] text-xs tracking-[0.2em] uppercase">Tu foto aquí</p>
                </div>
              </div>
              {/* Detalle de borde decorativo */}
              <div className="absolute -bottom-4 -right-4 w-full h-full border border-[#A17A7E]/30 -z-0" style={{ transform: "translate(12px, 12px)" }} />
            </motion.div>

            {/* Texto */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="order-1 md:order-2"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-8 h-px bg-[#C9A89A]" />
                <p className="text-[#C9A89A] text-xs tracking-[0.25em] uppercase">La persona detrás</p>
              </div>

              <h2
                className="text-4xl md:text-5xl text-white mb-8 leading-tight"
                style={{ fontFamily: "Great Vibes" }}
              >
                Soy apasionada de la pastelería artesanal.
              </h2>

              <div className="space-y-5 text-[#C9A89A]/80 text-base leading-relaxed" style={{ fontFamily: "system-ui, sans-serif" }}>
                <p>
                  Cada receta que preparo está hecha con dedicación, ingredientes de calidad y mucho amor.
                </p>
                <p>
                  Disfruto crear momentos dulces e inolvidables para vos y los tuyos.
                </p>
                <p>¡Gracias por confiar en mi trabajo! ❤️</p>
              </div>

              {/* Tres valores */}
              <div className="mt-10 grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
                {[
                  { icon: <Heart className="w-4 h-4" fill="currentColor" />, label: "Hecho con amor" },
                  { icon: <Star className="w-4 h-4" fill="currentColor" />, label: "Calidad artesanal" },
                  { icon: <Clock className="w-4 h-4" />, label: "A tu medida" },
                ].map((v, i) => (
                  <div key={i} className="text-center">
                    <div className="w-8 h-8 rounded-full border border-[#A17A7E]/40 flex items-center justify-center mx-auto mb-2 text-[#A17A7E]">{v.icon}</div>
                    <p className="text-white/50 text-xs tracking-wide" style={{ fontFamily: "system-ui, sans-serif" }}>{v.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <p className="text-2xl text-[#C9A89A]" style={{ fontFamily: "Great Vibes" }}>Con amor, Dulce Palo 🌸</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          CATÁLOGO — crema con layout de carta boutique
      ══════════════════════════════════════════════ */}
      <section id="catalogo" className="py-24 md:py-32" style={{ backgroundColor: "#FAF8F5" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="flex items-center gap-4 mb-5">
              <div className="w-8 h-px bg-[#A17A7E]" />
              <p className="text-[#A17A7E] text-xs tracking-[0.25em] uppercase" style={{ fontFamily: "system-ui, sans-serif" }}>Pastelería artesanal</p>
            </div>
            <h2 className="text-5xl md:text-6xl text-[#2C1810]" style={{ fontFamily: "Great Vibes" }}>
              Nuestro Catálogo
            </h2>
          </motion.div>

          {/* Layout: categorías izquierda + grid derecha */}
          <div className="flex flex-col lg:flex-row gap-12">

            {/* Categorías — sidebar vertical */}
            <aside className="lg:w-52 shrink-0">
              <div className="lg:sticky lg:top-28 flex flex-row lg:flex-col flex-wrap gap-2 lg:gap-0">
                {CATALOG_CATEGORIES.map((cat, i) => (
                  <button
                    key={cat.key}
                    onClick={() => handleCategorySelect(cat.key)}
                    className={cn(
                      "text-left py-2 lg:py-3 px-3 lg:px-0 text-sm transition-all duration-200 border-b border-transparent lg:border-b lg:border-[#E8D5C4]/50",
                      "hover:text-[#A17A7E]",
                      activeCategory === cat.key
                        ? "text-[#A17A7E] font-semibold lg:pl-4 lg:border-l-2 lg:border-l-[#A17A7E] lg:border-b-0 bg-[#A17A7E]/5 rounded-sm"
                        : "text-[#7A5C5C]/70",
                      i === CATALOG_CATEGORIES.length - 1 ? "lg:border-b-0" : ""
                    )}
                    style={{ fontFamily: "system-ui, sans-serif" }}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </aside>

            {/* Grid de productos */}
            <div className="flex-1 min-h-[200px]" ref={productsGridRef}>
              {!activeCategory && (
                <div className="flex items-center justify-center h-48 text-[#A17A7E]/40 text-sm" style={{ fontFamily: "system-ui, sans-serif" }}>
                  Seleccioná una categoría para ver los productos
                </div>
              )}
              <AnimatePresence initial={false}>
                {activeCategory && (
                  <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.28 }}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-px bg-[#E8D5C4]/30">
                      {(PRODUCTS_BY_CATEGORY[activeCategory] ?? []).map((item, i) => {
                        const qty = quantities[item.id] ?? 0;
                        return (
                          <motion.article
                            key={item.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className="bg-[#FAF8F5] group"
                          >
                            {/* Imagen */}
                            <div
                              className="aspect-[4/3] overflow-hidden cursor-pointer relative"
                              onClick={() => openGalleryModal({ id: i + 100, name: item.name, images: [item.img] })}
                            >
                              <img
                                src={item.img}
                                alt={item.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-104"
                              />
                              <div className="absolute inset-0 bg-[#2C1810]/0 group-hover:bg-[#2C1810]/20 transition-colors duration-500 flex items-center justify-center">
                                <span className="text-white text-xs tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#2C1810]/60 px-4 py-2" style={{ fontFamily: "system-ui, sans-serif" }}>
                                  Ver detalle
                                </span>
                              </div>
                            </div>

                            {/* Info */}
                            <div className="p-5">
                              <h3 className="text-base font-semibold text-[#2C1810] mb-1 leading-snug">
                                {item.name}
                              </h3>
                              <p className="text-xs text-[#7A5C5C]/70 line-clamp-2 mb-4 leading-relaxed" style={{ fontFamily: "system-ui, sans-serif" }}>
                                {item.desc}
                              </p>
                              <div className="flex items-center justify-between">
                                <span className="text-[#A17A7E] font-bold text-lg">
                                  ${item.price.toLocaleString("es-AR")}
                                </span>
                                <div className="flex items-center gap-1.5">
                                  <button
                                    onClick={() => decrement(item.id)}
                                    disabled={qty === 0}
                                    className={cn(
                                      "w-7 h-7 border flex items-center justify-center text-xs transition-all duration-200",
                                      qty > 0 ? "border-[#A17A7E] text-[#A17A7E] hover:bg-[#A17A7E] hover:text-white" : "border-[#E8D5C4] text-[#D4B5B8] cursor-not-allowed"
                                    )}
                                  >
                                    <Minus className="w-3 h-3" />
                                  </button>
                                  <span className="w-6 text-center text-sm font-bold tabular-nums text-[#2C1810]" style={{ fontFamily: "system-ui, sans-serif" }}>{qty}</span>
                                  <button
                                    onClick={() => increment(item.id)}
                                    className="w-7 h-7 bg-[#A17A7E] text-white flex items-center justify-center hover:bg-[#8C686C] transition-colors duration-200"
                                  >
                                    <Plus className="w-3 h-3" />
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
            </div>
          </div>

          {/* Cart strip */}
          <AnimatePresence>
            {cartCount > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 border border-[#E8D5C4] bg-white"
              >
                <div className="flex items-center gap-3" style={{ fontFamily: "system-ui, sans-serif" }}>
                  <ShoppingBag className="w-4 h-4 text-[#A17A7E]" />
                  <span className="text-sm text-[#5F3F43]">{cartCount} {cartCount === 1 ? "producto" : "productos"}</span>
                  <span className="text-[#C9A89A]">·</span>
                  <span className="font-bold text-[#A17A7E]">${cartTotal.toLocaleString("es-AR")}</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setCartOpen(true)} className="px-4 py-2 text-sm border border-[#A17A7E] text-[#A17A7E] hover:bg-[#A17A7E] hover:text-white transition-all duration-200" style={{ fontFamily: "system-ui, sans-serif" }}>
                    Ver pedido
                  </button>
                  <button onClick={sendCartOrder} className="flex items-center gap-2 px-4 py-2 text-sm bg-[#A17A7E] text-white hover:bg-[#8C686C] transition-colors" style={{ fontFamily: "system-ui, sans-serif" }}>
                    <SiWhatsapp className="w-3.5 h-3.5" />
                    Enviar por WhatsApp
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          PEDIDO PERSONALIZADO
      ══════════════════════════════════════════════ */}
      <section id="pedido" className="py-24 md:py-32" style={{ backgroundColor: "#F5EEE8" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="w-8 h-px bg-[#A17A7E]" />
                <p className="text-[#A17A7E] text-xs tracking-[0.25em] uppercase" style={{ fontFamily: "system-ui, sans-serif" }}>Encargos especiales</p>
              </div>
              <h2 className="text-4xl md:text-5xl text-[#2C1810] mb-6" style={{ fontFamily: "Great Vibes" }}>
                Pedido Personalizado
              </h2>
              <p className="text-[#7A5C5C] text-lg mb-12 leading-relaxed" style={{ fontFamily: "system-ui, sans-serif" }}>
                ¿Tenés una celebración especial? Contáctanos para afinar detalles.
              </p>

              <div className="space-y-8 mb-12">
                {[
                  { icon: <Star className="w-5 h-5" fill="currentColor" />, title: "Diseños Únicos", desc: "Cada pedido especial es diseñado a medida para tu evento." },
                  { icon: <Clock className="w-5 h-5" />, title: "Anticipación", desc: "Sugerimos realizar pedidos personalizados con 48hs de anticipación." },
                ].map((v, i) => (
                  <div key={i} className="flex gap-5">
                    <div className="w-10 h-10 border border-[#A17A7E]/30 flex items-center justify-center shrink-0 text-[#A17A7E]">
                      {v.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#2C1810] mb-1" style={{ fontFamily: "system-ui, sans-serif" }}>{v.title}</h3>
                      <p className="text-[#7A5C5C]/70 text-sm leading-relaxed" style={{ fontFamily: "system-ui, sans-serif" }}>{v.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 items-start">
                <button
                  onClick={() => openWhatsApp("Hola! Me gustaría hacer un pedido personalizado, ¿Estaria disponible?")}
                  className="inline-flex items-center gap-2.5 bg-[#A17A7E] hover:bg-[#8C686C] text-white text-sm font-semibold tracking-wide px-7 py-3.5 transition-all duration-300" style={{ fontFamily: "system-ui, sans-serif" }}
                >
                  <SiWhatsapp className="w-4 h-4" />
                  Solicitar por WhatsApp
                </button>
                <span className="inline-flex items-center gap-2 text-[#A17A7E]/70 text-sm py-3.5" style={{ fontFamily: "system-ui, sans-serif" }}>
                  ✓ Respondemos en el día
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          GALERÍA — grid sin bordes redondeados, gap mínimo
      ══════════════════════════════════════════════ */}
      <section id="galeria" className="py-24 md:py-32" style={{ backgroundColor: "#FAF8F5" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-8 h-px bg-[#A17A7E]" />
                <p className="text-[#A17A7E] text-xs tracking-[0.25em] uppercase" style={{ fontFamily: "system-ui, sans-serif" }}>Nuestras creaciones</p>
              </div>
              <h2 className="text-4xl md:text-5xl text-[#2C1810]" style={{ fontFamily: "Great Vibes" }}>
                Nuestra Galería
              </h2>
            </div>
            <a href="#" className="hidden md:flex items-center gap-2 text-[#A17A7E] text-sm hover:text-[#5F3F43] transition-colors" style={{ fontFamily: "system-ui, sans-serif" }}>
              <SiInstagram className="w-4 h-4" />
              @dulce.palo
            </a>
          </motion.div>

          {/* Masonry asimétrico fijo — 3 colunas */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
            {GALLERY.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.06, duration: 0.5 }}
                onClick={() => openGalleryModal(item)}
                className={cn(
                  "relative overflow-hidden cursor-pointer group bg-[#EDE0D7]",
                  i === 0 || i === 5 ? "row-span-2" : "",
                  i === 0 || i === 5 ? "aspect-[3/4]" : "aspect-square",
                )}
              >
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#2C1810]/0 group-hover:bg-[#2C1810]/50 transition-colors duration-400" />
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
                  <SiInstagram className="w-6 h-6 text-white mb-2" />
                  <p className="text-white text-sm font-medium text-center line-clamp-1" style={{ fontFamily: "system-ui, sans-serif" }}>{item.name}</p>
                </div>
                {item.images.length > 1 && (
                  <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-sm text-white text-[10px] px-1.5 py-0.5" style={{ fontFamily: "system-ui, sans-serif" }}>
                    +{item.images.length - 1}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          MODAL GALERÍA — igual ao original, preservado
      ══════════════════════════════════════════════ */}
      <AnimatePresence>
        {selectedGalleryItem && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeGalleryModal}
            className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
              onClick={e => e.stopPropagation()}
              className="relative w-full sm:max-w-2xl md:max-w-3xl sm:mx-4 bg-[#1a0f10] rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-black">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={galleryImageIndex}
                    src={selectedGalleryItem.images[galleryImageIndex]}
                    alt={selectedGalleryItem.name}
                    initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
                {selectedGalleryItem.images.length > 1 && (
                  <>
                    <button onClick={galleryPrev} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/65 backdrop-blur-sm text-white flex items-center justify-center transition-all duration-200">
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button onClick={galleryNext} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/65 backdrop-blur-sm text-white flex items-center justify-center transition-all duration-200">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
                <button onClick={closeGalleryModal} className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/40 hover:bg-black/65 backdrop-blur-sm text-white flex items-center justify-center transition-all duration-200">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-4 sm:p-6 bg-[#1a0f10]">
                <p className="text-white font-bold text-xl mb-0.5">{selectedGalleryItem.name}</p>
                <p className="text-[#c2a1a3] text-xs tracking-widest uppercase mb-3" style={{ fontFamily: "system-ui, sans-serif" }}>Dulce Palo · Pastelería artesanal</p>
                {selectedGalleryItem.images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {selectedGalleryItem.images.map((img, idx) => (
                      <button key={idx} onClick={e => { e.stopPropagation(); setGalleryImageIndex(idx); }}
                        className={cn("shrink-0 w-14 h-14 overflow-hidden border-2 transition-all duration-200", idx === galleryImageIndex ? "border-[#c2a1a3] scale-105" : "border-white/10 opacity-50 hover:opacity-80")}
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

      {/* ══════════════════════════════════════════════
          CTA FINAL — tipografía gigante, máximo impacto
      ══════════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#2C1810" }} className="py-28 md:py-40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-12 h-px bg-[#A17A7E]/50" />
              <p className="text-[#A17A7E]/70 text-xs tracking-[0.3em] uppercase" style={{ fontFamily: "system-ui, sans-serif" }}>Empezá hoy</p>
              <div className="w-12 h-px bg-[#A17A7E]/50" />
            </div>

            <h2
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-tight mb-4"
              style={{ fontFamily: "Great Vibes" }}
            >
              ¿Creamos algo especial
            </h2>
            <h2
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#C9A89A] leading-tight mb-12"
              style={{ fontFamily: "Great Vibes" }}
            >
              para vos?
            </h2>

            <p className="text-white/50 text-lg max-w-xl mx-auto mb-12 leading-relaxed" style={{ fontFamily: "system-ui, sans-serif" }}>
              Cada celebración merece un dulce hecho con amor. Consultanos sin compromiso.
            </p>

            <button
              onClick={() => openWhatsApp("Hola! Me gustaría consultar sobre un pedido especial 🎂")}
              className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1DA851] text-white font-bold text-base px-10 py-4 transition-all duration-300 hover:-translate-y-0.5"
              style={{ fontFamily: "system-ui, sans-serif" }}
            >
              <SiWhatsapp className="w-5 h-5" />
              Escribinos por WhatsApp
            </button>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FOOTER — minimalista, fondo oscuro consistente
      ══════════════════════════════════════════════ */}
      <footer id="contacto" style={{ backgroundColor: "#1C0F0A" }} className="py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 pb-8 border-b border-white/10">

            <div>
              <span className="text-3xl text-[#C9A89A]" style={{ fontFamily: "Great Vibes" }}>Dulce Palo</span>
              <div className="flex gap-3 mt-3">
                <a href="#" aria-label="Instagram" className="w-8 h-8 border border-white/20 flex items-center justify-center text-white/50 hover:border-[#A17A7E] hover:text-[#A17A7E] transition-all duration-300">
                  <SiInstagram className="w-3.5 h-3.5" />
                </a>
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="w-8 h-8 border border-white/20 flex items-center justify-center text-white/50 hover:border-[#25D366] hover:text-[#25D366] transition-all duration-300">
                  <SiWhatsapp className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <nav className="flex flex-wrap gap-x-8 gap-y-2">
              {NAV_LINKS.map(l => (
                <a key={l.href} href={l.href} className="text-white/40 hover:text-white/80 text-sm transition-colors" style={{ fontFamily: "system-ui, sans-serif" }}>
                  {l.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2 text-white/30 text-sm" style={{ fontFamily: "system-ui, sans-serif" }}>
              <MapPin className="w-3.5 h-3.5 text-[#A17A7E]/50 shrink-0" />
              Monteros, Tucumán, Argentina
            </div>
          </div>
          <div className="pt-6 text-white/20 text-xs" style={{ fontFamily: "system-ui, sans-serif" }}>
            © {new Date().getFullYear()} Dulce Palo Pastelería.
          </div>
        </div>
      </footer>

      {/* ══════════════════════════════════════════════
          FAB FLOTANTE — preservado
      ══════════════════════════════════════════════ */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3"
          >
            <AnimatePresence>
              {contactOpen && (
                <>
                  <motion.button key="wa" initial={{ opacity: 0, y: 16, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.8 }} transition={{ duration: 0.2, delay: 0.05 }}
                    onClick={() => { openWhatsApp("Hola! Me gustaría hacer un pedido."); setContactOpen(false); }}
                    className="flex items-center gap-2 bg-[#25D366] text-white px-4 py-2.5 shadow-lg hover:bg-[#1da851] transition-colors text-sm font-semibold" style={{ fontFamily: "system-ui, sans-serif" }}
                  >
                    <SiWhatsapp className="w-4 h-4" />
                    WhatsApp
                  </motion.button>
                  <motion.button key="call" initial={{ opacity: 0, y: 16, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.8 }} transition={{ duration: 0.2 }}
                    onClick={() => { makeCall(); setContactOpen(false); }}
                    className="flex items-center gap-2 bg-white text-[#A17A7E] border border-[#E8D5C4] px-4 py-2.5 shadow-lg hover:bg-[#F5EEE8] transition-colors text-sm font-semibold" style={{ fontFamily: "system-ui, sans-serif" }}
                  >
                    <Phone className="w-4 h-4" />
                    Llamar
                  </motion.button>
                </>
              )}
            </AnimatePresence>
            <div className="relative">
              {!contactOpen && (
                <motion.span className="absolute inset-0 rounded-full bg-[#C9A89A]"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
              <button
                onClick={() => setContactOpen(o => !o)}
                className={cn(
                  "relative w-14 h-14 rounded-full border-2 border-white shadow-xl flex items-center justify-center transition-all duration-300",
                  contactOpen ? "bg-[#A17A7E] text-white rotate-45" : "bg-[#C9A89A] text-white hover:bg-[#A17A7E] hover:scale-110"
                )}
              >
                <Phone className="w-6 h-6" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════
          CART DRAWER — preservado
      ══════════════════════════════════════════════ */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div key="backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/40 z-50" onClick={() => setCartOpen(false)} />
            <motion.div key="drawer" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="fixed right-0 top-0 h-full w-full max-w-sm bg-[#FAF8F5] z-50 shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-5 border-b border-[#E8D5C4]">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#A17A7E]" />
                  <h3 className="text-xl font-bold text-[#2C1810]">Tu Pedido ({cartCount})</h3>
                </div>
                <button onClick={() => setCartOpen(false)} className="p-2 hover:bg-[#F5EEE8] transition-colors">
                  <X className="w-5 h-5 text-[#7A5C5C]" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {cartItems.length === 0 ? (
                  <p className="text-[#7A5C5C]/60 text-center py-12 text-sm" style={{ fontFamily: "system-ui, sans-serif" }}>No hay productos seleccionados.</p>
                ) : (
                  cartItems.map(item => (
                    <div key={item.id} className="flex items-center gap-3">
                      <img src={item.img} alt={item.name} className="w-14 h-14 object-cover shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm text-[#2C1810] truncate" style={{ fontFamily: "system-ui, sans-serif" }}>{item.name}</div>
                        <div className="text-[#A17A7E] font-semibold text-sm" style={{ fontFamily: "system-ui, sans-serif" }}>
                          ${(item.price * (quantities[item.id] ?? 0)).toLocaleString("es-AR")}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button onClick={() => decrement(item.id)} className="w-7 h-7 border border-[#E8D5C4] flex items-center justify-center hover:border-[#A17A7E] hover:text-[#A17A7E] transition-colors text-[#7A5C5C]">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-5 text-center text-sm font-bold tabular-nums text-[#2C1810]" style={{ fontFamily: "system-ui, sans-serif" }}>{quantities[item.id]}</span>
                        <button onClick={() => increment(item.id)} className="w-7 h-7 bg-[#A17A7E] text-white flex items-center justify-center hover:bg-[#8C686C] transition-colors">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
              {cartItems.length > 0 && (
                <div className="p-5 border-t border-[#E8D5C4]">
                  <button onClick={clearCart} className="w-full text-sm text-[#7A5C5C]/60 hover:text-red-500 transition-colors mb-4 text-center" style={{ fontFamily: "system-ui, sans-serif" }}>
                    Borrar todo
                  </button>
                  <div className="flex justify-between mb-4">
                    <span className="text-[#7A5C5C] text-sm" style={{ fontFamily: "system-ui, sans-serif" }}>Total estimado</span>
                    <span className="font-bold text-xl text-[#A17A7E]">${cartTotal.toLocaleString("es-AR")}</span>
                  </div>
                  <button
                    onClick={sendCartOrder}
                    className="w-full flex items-center justify-center gap-2 text-base h-12 bg-[#A17A7E] hover:bg-[#8C686C] text-white transition-colors" style={{ fontFamily: "system-ui, sans-serif" }}
                  >
                    <SiWhatsapp className="w-5 h-5" />
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
