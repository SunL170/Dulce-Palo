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
import logoImg        from "@/assets/images/logo-dulce-palo.png";
import tortaChocImg   from "@/assets/images/torta-choc-frambuesa.png";
import tortaRedVelvetImg from "@/assets/images/torta-red-velvet.png";
import tortaVainillaImg  from "@/assets/images/torta-vainilla-frutos.png";
import cupcakesLimonImg  from "@/assets/images/cupcakes-limon.png";
import cupcakesOreoImg   from "@/assets/images/cupcakes-oreo.png";
import cupcakesRainbowImg from "@/assets/images/cupcakes-rainbow.png";
import cheeseFrutosImg   from "@/assets/images/cheesecake-frutos-bosque.png";
import cheeseDulceImg    from "@/assets/images/cheesecake-dulce-leche.png";
import macaronsImg       from "@/assets/images/macarons.png";

const WHATSAPP_NUMBER = "5493863500051";
const PHONE_NUMBER    = "tel:+5493863500051";

const NAV_LINKS = [
  { href: "#inicio",   label: "Inicio" },
  { href: "#catalogo", label: "Catálogo" },
  { href: "#pedido",   label: "Pedido Personalizado" },
  { href: "#galeria",  label: "Galería" },
];

const ALL_PRODUCTS = [
  { id: "torta-choc",      category: "tortas",      name: "Torta de Chocolate con Frambuesas",  desc: "Bizcochuelo húmedo de chocolate intenso con centro de frambuesas frescas.",    price: 3500,  img: tortaChocImg },
  { id: "torta-red",       category: "tortas",      name: "Torta Red Velvet",                   desc: "Clásica red velvet con frosting de queso crema suave.",                       price: 3800,  img: tortaRedVelvetImg },
  { id: "torta-vainilla",  category: "tortas",      name: "Torta de Vainilla y Frutos Rojos",   desc: "Capas de vainilla con crema chantilly y selección de frutos rojos.",           price: 3200,  img: tortaVainillaImg },
  { id: "cupcake-limon",   category: "cupcakes",    name: "Cupcakes de Limón",                  desc: "Masa de limón con corazón de curd y frosting cítrico.",                       price: 800,   img: cupcakesLimonImg },
  { id: "cupcake-oreo",    category: "cupcakes",    name: "Cupcakes de Oreo",                   desc: "Base de chocolate con trozos de galleta y crema de vainilla.",                price: 900,   img: cupcakesOreoImg },
  { id: "cupcake-rainbow", category: "cupcakes",    name: "Cupcakes Rainbow",                   desc: "Coloridos y divertidos, ideales para celebraciones infantiles.",               price: 950,   img: cupcakesRainbowImg },
  { id: "cheese-frutos",   category: "cheesecakes", name: "Cheesecake de Frutos del Bosque",    desc: "Estilo New York con salsa casera de frutos rojos.",                           price: 2800,  img: cheeseFrutosImg },
  { id: "cheese-dulce",    category: "cheesecakes", name: "Cheesecake de Dulce de Leche",       desc: "Cremoso, con hilos de dulce de leche colonial.",                             price: 2600,  img: cheeseDulceImg },
  { id: "macarons",        category: "postres",     name: "Macarons Surtidos",                  desc: "Caja de 6 macarons franceses en colores pastel.",                             price: 1200,  img: macaronsImg },
  { id: "brownies",        category: "postres",     name: "Brownies Artesanales",               desc: "Húmedos, con nueces y costra crujiente.",                                     price: 600,   img: tortaChocImg },
  { id: "tiramisu",        category: "postres",     name: "Tiramisú Individual",                desc: "Clásico italiano con mascarpone y café espresso.",                            price: 750,   img: cheeseDulceImg },
  { id: "mesa-30",         category: "mesas",       name: "Mesa Dulce para 30 personas",        desc: "Selección de 3 tortas y 2 docenas de postres individuales.",                  price: 25000, img: heroBackground },
  { id: "mesa-50",         category: "mesas",       name: "Mesa Dulce para 50 personas",        desc: "Selección premium de 5 tortas y 4 docenas de postres.",                       price: 38000, img: heroBackground },
  { id: "tarta-fruta",     category: "tartas",      name: "Tarta de Frutas Frescas",            desc: "Base crocante con crema pastelera y frutas de temporada.",                    price: 2200,  img: tortaVainillaImg },
  { id: "tarta-limon",     category: "tartas",      name: "Tarta de Limón",                     desc: "Relleno cremoso de limón con merengue tostado.",                              price: 2000,  img: cupcakesLimonImg },
  { id: "tarta-choc",      category: "tartas",      name: "Tarta de Chocolate",                 desc: "Ganache intenso sobre masa sablée con base crocante.",                        price: 2100,  img: tortaChocImg },
  { id: "budin-limon",     category: "budines",     name: "Budín de Limón",                     desc: "Esponjoso y húmedo con cobertura de azúcar glasé.",                           price: 900,   img: cupcakesLimonImg },
  { id: "budin-naranja",   category: "budines",     name: "Budín de Naranja y Almendras",       desc: "Aromas cítricos con textura tierna y almendras tostadas.",                    price: 950,   img: tortaVainillaImg },
  { id: "budin-choc",      category: "budines",     name: "Budín de Chocolate",                 desc: "Doble chocolate con chips y cobertura brillante.",                            price: 1000,  img: tortaChocImg },
  { id: "cookie-choc",     category: "cookies",     name: "Cookies de Chocolate",               desc: "Masa suave con chips de chocolate semi amargo.",                              price: 350,   img: cupcakesOreoImg },
  { id: "cookie-vainilla", category: "cookies",     name: "Cookies de Vainilla y Nuez",         desc: "Clásicas y crocantes con trozos de nuez caramelizada.",                       price: 350,   img: macaronsImg },
  { id: "cookie-red",      category: "cookies",     name: "Cookies Red Velvet",                 desc: "Suaves y coloridas con chips de chocolate blanco.",                           price: 380,   img: tortaRedVelvetImg },
  { id: "alfa-dulce",      category: "alfajores",   name: "Alfajores de Dulce de Leche",        desc: "Tres capas de masa tierna con dulce de leche y coco.",                        price: 450,   img: cheeseDulceImg },
  { id: "alfa-choc",       category: "alfajores",   name: "Alfajores Bañados en Chocolate",     desc: "Relleno de dulce de leche con baño de chocolate negro.",                      price: 500,   img: tortaChocImg },
  { id: "alfa-limon",      category: "alfajores",   name: "Alfajores de Limón",                 desc: "Masa cítrica con crema de limón y azúcar impalpable.",                        price: 450,   img: cupcakesLimonImg },
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
  { img: heroBackground,      label: "Detalles que enamoran" },
  { img: tortaChocImg,        label: "Tortas personalizadas" },
  { img: macaronsImg,         label: "Pastelería artesanal" },
  { img: cheeseFrutosImg,     label: "Cada bocado, una obra" },
  { img: cupcakesRainbowImg,  label: "Celebraciones especiales" },
];

const FEATURED_PRODUCTS = [
  { title: "Torta de Chocolate",  image: tortaChocImg,      price: "$3500" },
  { title: "Red Velvet",          image: tortaRedVelvetImg, price: "$3800" },
  { title: "Cheesecake",          image: cheeseFrutosImg,   price: "$2800" },
  { title: "Macarons",            image: macaronsImg,       price: "$1200" },
  { title: "Cupcakes de Limón",   image: cupcakesLimonImg,  price: "$800"  },
  { title: "Cupcakes Rainbow",    image: cupcakesRainbowImg,price: "$950"  },
];

// ─── tokens ───────────────────────────────────────────────────────────────────
const C = {
  cream:   "#F7F3EE",  // fondo base, papel artesanal cálido
  bone:    "#EDE5DC",  // segundo fondo, separadores
  blush:   "#C4968A",  // acento principal (rosa terracota — más artesanal que el rosa puro)
  blushDk: "#9E6E63",  // hover / active
  ink:     "#281A16",  // textos principales
  inkMid:  "#5E3E37",  // texto secundario
  inkSoft: "#9C7870",  // texto auxiliar / placeholders
  dark:    "#1C100C",  // secciones oscuras
  darkMid: "#2E1A14",  // segundo tono oscuro
  white:   "#FDFAF7",  // blanco cálido
};

export default function Home() {
  const [activeSection, setActiveSection]   = useState("inicio");
  const [isScrolled, setIsScrolled]         = useState(false);
  const [quantities, setQuantities]         = useState<Record<string, number>>({});
  const [cartOpen, setCartOpen]             = useState(false);
  const [contactOpen, setContactOpen]       = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [direction, setDirection]           = useState(1);
  const [heroIndex, setHeroIndex]           = useState(0);
  const [touchStart, setTouchStart]         = useState(0);
  const heroIntervalRef  = useRef<ReturnType<typeof setInterval> | null>(null);
  const heroProgressRef  = useRef<ReturnType<typeof setInterval> | null>(null);
  const productsGridRef  = useRef<HTMLDivElement>(null);
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<typeof GALLERY[0] | null>(null);
  const [galleryImageIndex, setGalleryImageIndex]     = useState(0);

  const SLIDE_DURATION = 5800;
  const PROGRESS_TICK  = 50;

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
    if (heroProgressRef.current) clearInterval(heroProgressRef.current);
    heroIntervalRef.current = setInterval(() => {
      setHeroIndex(i => (i + 1) % HERO_SLIDES.length);
    }, SLIDE_DURATION);
  }, []);

  useEffect(() => {
    startHeroTimer();
    return () => {
      if (heroIntervalRef.current) clearInterval(heroIntervalRef.current);
      if (heroProgressRef.current) clearInterval(heroProgressRef.current);
    };
  }, [startHeroTimer]);

  useEffect(() => {
    if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fn = () => {
      setIsScrolled(window.scrollY > 60);
      const ids = NAV_LINKS.map(l => l.href.slice(1));
      const cur = ids.find(id => {
        const el = document.getElementById(id);
        if (!el) return false;
        const r = el.getBoundingClientRect();
        return r.top <= 110 && r.bottom >= 110;
      });
      if (cur) setActiveSection(cur);
    };
    window.addEventListener("scroll", fn, { passive: true });
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
    <div style={{ backgroundColor: C.cream, color: C.ink, fontFamily: "'Playfair Display', Georgia, serif" }} className="min-h-screen">

      {/* ╔══════════════════════════════════════════╗
          ║  NAVBAR                                  ║
          ╚══════════════════════════════════════════╝ */}
      <header
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-500",
          isScrolled ? "py-3 border-b" : "py-5"
        )}
        style={{
          backgroundColor: isScrolled ? `${C.white}EE` : "transparent",
          borderColor: isScrolled ? C.bone : "transparent",
          backdropFilter: isScrolled ? "blur(12px)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">

          {/* Logo */}
          <a href="#inicio" className="shrink-0 leading-none">
            <span
              style={{
                fontFamily: "Great Vibes, cursive",
                color: isScrolled ? C.blush : C.white,
                fontSize: isScrolled ? "2rem" : "2.4rem",
                textShadow: isScrolled ? "none" : "0 2px 16px rgba(0,0,0,0.35)",
                transition: "all 0.4s ease",
                lineHeight: 1,
              }}
            >
              Dulce Palo
            </span>
          </a>

          {/* Nav central */}
          <nav className="hidden md:flex items-center gap-9 absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map(link => {
              const active = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative pb-0.5 text-sm tracking-widest uppercase transition-all duration-300"
                  style={{
                    fontFamily: "system-ui, sans-serif",
                    fontWeight: active ? 600 : 400,
                    color: isScrolled
                      ? active ? C.blush : C.inkMid
                      : active ? C.white : "rgba(255,255,255,0.7)",
                    letterSpacing: "0.1em",
                  }}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute -bottom-0.5 left-0 right-0 h-px"
                      style={{ backgroundColor: isScrolled ? C.blush : C.white }}
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Carrito */}
          <div className="shrink-0">
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => setCartOpen(true)}
                  className="relative flex items-center gap-2 text-sm transition-all duration-200"
                  style={{
                    fontFamily: "system-ui, sans-serif",
                    color: isScrolled ? C.blush : C.white,
                    border: `1px solid ${isScrolled ? C.blush : "rgba(255,255,255,0.5)"}`,
                    padding: "6px 16px",
                    borderRadius: 0,
                  }}
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Pedido</span>
                  <span
                    className="absolute -top-2 -right-2 text-[10px] w-4 h-4 flex items-center justify-center font-bold"
                    style={{ backgroundColor: C.blush, color: C.white, borderRadius: "50%" }}
                  >
                    {cartCount}
                  </span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* ╔══════════════════════════════════════════╗
          ║  HERO — fotografía protagonista          ║
          ╚══════════════════════════════════════════╝ */}
      <section
        id="inicio"
        className="relative min-h-screen overflow-hidden"
        onTouchStart={e => setTouchStart(e.touches[0].clientX)}
        onTouchEnd={e => {
          const diff = touchStart - e.changedTouches[0].clientX;
          if (Math.abs(diff) < 45) return;
          setHeroIndex(i => diff > 0 ? (i + 1) % HERO_SLIDES.length : (i - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
          startHeroTimer();
        }}
      >
        {/* Slider de fondo */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence initial={false}>
            <motion.div
              key={heroIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.6, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <motion.img
                src={HERO_SLIDES[heroIndex].img}
                alt=""
                initial={{ scale: 1.07 }}
                animate={{ scale: 1 }}
                transition={{ duration: SLIDE_DURATION / 1000 + 1.5, ease: "linear" }}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>
          {/* Overlay multicapa: profundidad + legibilidad */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                linear-gradient(to right, rgba(28,16,12,0.72) 0%, rgba(28,16,12,0.38) 55%, rgba(28,16,12,0.08) 100%),
                linear-gradient(to top,   rgba(28,16,12,0.65) 0%, rgba(28,16,12,0.0)  50%)
              `,
            }}
          />
        </div>

        {/* Contenido: alineado a la izquierda, vertically centered */}
        <div className="relative z-10 min-h-screen flex items-center max-w-7xl mx-auto px-8 md:px-14">
          <div className="max-w-lg pt-20 pb-16">

            {/* Eyebrow de ubicación */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              onClick={openMaps}
              className="flex items-center gap-2.5 mb-8 cursor-pointer group"
            >
              <div className="w-6 h-px" style={{ backgroundColor: `${C.blush}AA` }} />
              <span
                className="text-xs tracking-[0.22em] uppercase transition-colors duration-200"
                style={{ fontFamily: "system-ui, sans-serif", color: "rgba(255,255,255,0.55)", fontWeight: 400 }}
              >
                Monteros, Tucumán
              </span>
            </motion.button>

            {/* Logo imagen */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <img
                src={logoImg}
                alt="Dulce Palo"
                className="w-56 md:w-72 h-auto mb-5"
                style={{ filter: "brightness(0) invert(1)", opacity: 0.97, filter: "drop-shadow(0 3px 18px rgba(0,0,0,0.45)) brightness(0) invert(1)" }}
              />
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.38 }}
              className="mb-10 text-xl md:text-2xl font-light leading-relaxed"
              style={{
                fontFamily: "Great Vibes, cursive",
                color: "rgba(255,255,255,0.88)",
                textShadow: "0 2px 12px rgba(0,0,0,0.4)",
              }}
            >
              Cada bocado, una obra de arte.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.54 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <button
                onClick={() => openWhatsApp("Hola! Me gustaría consultar sobre un pedido 🎂")}
                className="inline-flex items-center justify-center gap-2.5 text-sm font-semibold tracking-wider uppercase px-7 py-3.5 transition-all duration-300 hover:-translate-y-px"
                style={{
                  fontFamily: "system-ui, sans-serif",
                  backgroundColor: C.blush,
                  color: C.white,
                  letterSpacing: "0.09em",
                }}
              >
                <SiWhatsapp className="w-4 h-4" />
                Consultar
              </button>
              <button
                onClick={() => document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center justify-center gap-2 text-sm font-medium tracking-wider uppercase px-7 py-3.5 transition-all duration-300"
                style={{
                  fontFamily: "system-ui, sans-serif",
                  border: "1px solid rgba(255,255,255,0.38)",
                  color: "rgba(255,255,255,0.82)",
                  letterSpacing: "0.09em",
                  backdropFilter: "blur(4px)",
                  backgroundColor: "rgba(255,255,255,0.07)",
                }}
              >
                Ver Catálogo
                <ChevronDown className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        </div>

        {/* Contador de slide — esquina inferior derecha */}
        <AnimatePresence mode="wait">
          <motion.div
            key={heroIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            className="absolute bottom-8 right-8 z-10 text-right hidden md:block"
          >
            <p className="text-xs tracking-[0.2em]" style={{ fontFamily: "system-ui, sans-serif", color: "rgba(255,255,255,0.35)" }}>
              {String(heroIndex + 1).padStart(2, "0")} / {String(HERO_SLIDES.length).padStart(2, "0")}
            </p>
            <AnimatePresence mode="wait">
              <motion.p
                key={HERO_SLIDES[heroIndex].label}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="text-sm mt-1"
                style={{ fontFamily: "Great Vibes, cursive", color: "rgba(255,255,255,0.6)" }}
              >
                {HERO_SLIDES[heroIndex].label}
              </motion.p>
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 7, 0] }}
          transition={{ opacity: { delay: 1.6, duration: 0.5 }, y: { delay: 1.6, duration: 2.5, repeat: Infinity, ease: "easeInOut" } }}
          className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10"
          style={{ color: "rgba(255,255,255,0.28)" }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </section>

      {/* ╔══════════════════════════════════════════╗
          ║  MARQUEE                                 ║
          ╚══════════════════════════════════════════╝ */}
      <div
        className="overflow-hidden py-3 cursor-pointer select-none"
        style={{ backgroundColor: C.blush }}
        onClick={() => setDirection(d => d * -1)}
      >
        <motion.div
          animate={{ x: direction === 1 ? ["0%", "-50%"] : ["-50%", "0%"] }}
          transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
          className="flex gap-8 whitespace-nowrap w-max"
        >
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="flex items-center gap-8 text-xs tracking-[0.18em] uppercase font-medium" style={{ fontFamily: "system-ui, sans-serif", color: "rgba(255,255,255,0.9)" }}>
              {item}
              <span style={{ color: "rgba(255,255,255,0.4)" }}>◆</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* ╔══════════════════════════════════════════╗
          ║  SOBRE MÍ — editorial, fondo oscuro      ║
          ╚══════════════════════════════════════════╝ */}
      <section style={{ backgroundColor: C.dark }} className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-14">
          <div className="grid md:grid-cols-2 gap-14 md:gap-20 items-center">

            {/* Foto */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative order-2 md:order-1"
            >
              <div
                className="aspect-[4/5] w-full overflow-hidden"
                style={{ backgroundColor: C.darkMid }}
              >
                <div className="w-full h-full flex flex-col items-center justify-center gap-3" style={{ opacity: 0.3 }}>
                  <Heart className="w-10 h-10" style={{ color: C.blush }} fill="currentColor" />
                  <p className="text-xs tracking-[0.2em] uppercase" style={{ fontFamily: "system-ui, sans-serif", color: C.blush }}>Tu foto aquí</p>
                </div>
              </div>
              {/* Marco decorativo con offset */}
              <div
                className="absolute pointer-events-none"
                style={{
                  top: 14, left: 14, right: -14, bottom: -14,
                  border: `1px solid ${C.blush}30`,
                  zIndex: -1,
                }}
              />
            </motion.div>

            {/* Texto */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="order-1 md:order-2"
            >
              {/* Eyebrow */}
              <div className="flex items-center gap-4 mb-7">
                <div className="w-7 h-px" style={{ backgroundColor: C.blush }} />
                <p className="text-xs tracking-[0.25em] uppercase" style={{ fontFamily: "system-ui, sans-serif", color: C.blush, fontWeight: 500 }}>
                  La persona detrás
                </p>
              </div>

              {/* Quote */}
              <h2
                className="leading-tight mb-7"
                style={{
                  fontFamily: "Great Vibes, cursive",
                  fontSize: "clamp(2rem, 4.5vw, 2.8rem)",
                  color: C.white,
                }}
              >
                Soy apasionada de la pastelería artesanal.
              </h2>

              {/* Body */}
              <div className="space-y-4 mb-10" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "system-ui, sans-serif", fontSize: "0.95rem", lineHeight: 1.75 }}>
                <p>Cada receta que preparo está hecha con dedicación, ingredientes de calidad y mucho amor.</p>
                <p>Disfruto crear momentos dulces e inolvidables para vos y los tuyos.</p>
                <p>¡Gracias por confiar en mi trabajo! ❤️</p>
              </div>

              {/* Tres valores */}
              <div className="grid grid-cols-3 gap-5 py-7" style={{ borderTop: `1px solid rgba(255,255,255,0.08)` }}>
                {[
                  { icon: <Heart className="w-4 h-4" fill="currentColor" />, label: "Con amor" },
                  { icon: <Star className="w-4 h-4"  fill="currentColor" />, label: "Artesanal" },
                  { icon: <Clock className="w-4 h-4" />,                     label: "A tu medida" },
                ].map((v, i) => (
                  <div key={i} className="text-center">
                    <div
                      className="w-9 h-9 flex items-center justify-center mx-auto mb-2.5"
                      style={{ border: `1px solid ${C.blush}40`, color: C.blush }}
                    >
                      {v.icon}
                    </div>
                    <p className="text-xs tracking-wide" style={{ fontFamily: "system-ui, sans-serif", color: "rgba(255,255,255,0.35)" }}>
                      {v.label}
                    </p>
                  </div>
                ))}
              </div>

              <p style={{ fontFamily: "Great Vibes, cursive", fontSize: "1.6rem", color: C.blush }}>
                Con amor, Dulce Palo 🌸
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ╔══════════════════════════════════════════╗
          ║  CATÁLOGO — estilo carta boutique        ║
          ╚══════════════════════════════════════════╝ */}
      <section id="catalogo" style={{ backgroundColor: C.cream }} className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-14">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="flex items-center gap-4 mb-5">
              <div className="w-7 h-px" style={{ backgroundColor: C.blush }} />
              <p className="text-xs tracking-[0.25em] uppercase" style={{ fontFamily: "system-ui, sans-serif", color: C.blush, fontWeight: 500 }}>
                Pastelería artesanal
              </p>
            </div>
            <h2 style={{ fontFamily: "Great Vibes, cursive", fontSize: "clamp(2.4rem, 5vw, 3.5rem)", color: C.ink }}>
              Nuestro Catálogo
            </h2>
          </motion.div>

          {/* Layout: sidebar izquierda + grid derecha */}
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">

            {/* Categorías — sidebar */}
            <aside className="lg:w-44 shrink-0">
              <div className="lg:sticky lg:top-28 flex flex-row lg:flex-col flex-wrap gap-1 lg:gap-0">
                {CATALOG_CATEGORIES.map((cat, idx) => (
                  <button
                    key={cat.key}
                    onClick={() => handleCategorySelect(cat.key)}
                    className="text-left transition-all duration-200"
                    style={{
                      fontFamily: "system-ui, sans-serif",
                      fontSize: "0.82rem",
                      fontWeight: activeCategory === cat.key ? 600 : 400,
                      color: activeCategory === cat.key ? C.blush : C.inkSoft,
                      padding: "8px 10px",
                      borderBottom: idx < CATALOG_CATEGORIES.length - 1 ? `1px solid ${C.bone}` : "none",
                      borderLeft: activeCategory === cat.key ? `2px solid ${C.blush}` : "2px solid transparent",
                      backgroundColor: activeCategory === cat.key ? `${C.blush}0A` : "transparent",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </aside>

            {/* Grid de productos */}
            <div className="flex-1" ref={productsGridRef}>
              {!activeCategory && (
                <div className="flex items-center justify-center h-40" style={{ color: C.inkSoft, fontFamily: "system-ui, sans-serif", fontSize: "0.85rem" }}>
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
                    transition={{ duration: 0.25 }}
                  >
                    {/* Separadores tipo menú impreso */}
                    <div>
                      {(PRODUCTS_BY_CATEGORY[activeCategory] ?? []).map((item, i) => {
                        const qty = quantities[item.id] ?? 0;
                        const isLast = i === (PRODUCTS_BY_CATEGORY[activeCategory]?.length ?? 0) - 1;
                        return (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: i * 0.04 }}
                            className="group flex gap-5 py-5"
                            style={{
                              borderBottom: isLast ? "none" : `1px solid ${C.bone}`,
                            }}
                          >
                            {/* Thumbnail */}
                            <div
                              className="w-20 h-20 md:w-24 md:h-24 shrink-0 overflow-hidden cursor-pointer"
                              style={{ backgroundColor: C.bone }}
                              onClick={() => openGalleryModal({ id: i + 100, name: item.name, images: [item.img] })}
                            >
                              <img
                                src={item.img}
                                alt={item.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-3 mb-1">
                                <h3
                                  className="leading-snug"
                                  style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1rem", fontWeight: 600, color: C.ink }}
                                >
                                  {item.name}
                                </h3>
                                <span
                                  className="shrink-0 font-bold"
                                  style={{ fontFamily: "system-ui, sans-serif", fontSize: "0.95rem", color: C.blush }}
                                >
                                  ${item.price.toLocaleString("es-AR")}
                                </span>
                              </div>
                              <p className="text-sm mb-3 line-clamp-2 leading-relaxed" style={{ fontFamily: "system-ui, sans-serif", color: C.inkSoft }}>
                                {item.desc}
                              </p>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => decrement(item.id)}
                                  disabled={qty === 0}
                                  className="w-7 h-7 flex items-center justify-center transition-all duration-200"
                                  style={{
                                    border: `1px solid ${qty > 0 ? C.blush : C.bone}`,
                                    color: qty > 0 ? C.blush : C.bone,
                                    cursor: qty === 0 ? "not-allowed" : "pointer",
                                  }}
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="w-6 text-center text-sm font-bold tabular-nums" style={{ fontFamily: "system-ui, sans-serif", color: C.ink }}>
                                  {qty}
                                </span>
                                <button
                                  onClick={() => increment(item.id)}
                                  className="w-7 h-7 flex items-center justify-center transition-all duration-200"
                                  style={{ backgroundColor: C.blush, color: C.white }}
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </motion.div>
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
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 p-5"
                style={{ backgroundColor: C.bone, border: `1px solid ${C.blush}30` }}
              >
                <div className="flex items-center gap-3" style={{ fontFamily: "system-ui, sans-serif" }}>
                  <ShoppingBag className="w-4 h-4" style={{ color: C.blush }} />
                  <span className="text-sm" style={{ color: C.inkMid }}>{cartCount} {cartCount === 1 ? "producto" : "productos"}</span>
                  <span style={{ color: C.blush }}>·</span>
                  <span className="font-bold" style={{ color: C.blush }}>${cartTotal.toLocaleString("es-AR")}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCartOpen(true)}
                    className="px-5 py-2 text-sm transition-all duration-200"
                    style={{ fontFamily: "system-ui, sans-serif", border: `1px solid ${C.blush}`, color: C.blush }}
                  >
                    Ver pedido
                  </button>
                  <button
                    onClick={sendCartOrder}
                    className="flex items-center gap-2 px-5 py-2 text-sm transition-all duration-200"
                    style={{ fontFamily: "system-ui, sans-serif", backgroundColor: C.blush, color: C.white }}
                  >
                    <SiWhatsapp className="w-3.5 h-3.5" />
                    Enviar
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ╔══════════════════════════════════════════╗
          ║  PEDIDO PERSONALIZADO                    ║
          ╚══════════════════════════════════════════╝ */}
      <section id="pedido" style={{ backgroundColor: C.bone }} className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-14">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="w-7 h-px" style={{ backgroundColor: C.blush }} />
                <p className="text-xs tracking-[0.25em] uppercase" style={{ fontFamily: "system-ui, sans-serif", color: C.blush, fontWeight: 500 }}>Encargos especiales</p>
              </div>

              <h2 className="mb-5 leading-tight" style={{ fontFamily: "Great Vibes, cursive", fontSize: "clamp(2rem, 4.5vw, 3rem)", color: C.ink }}>
                Pedido Personalizado
              </h2>

              <p className="text-base leading-relaxed mb-12" style={{ fontFamily: "system-ui, sans-serif", color: C.inkMid }}>
                ¿Tenés una celebración especial? Contáctanos para afinar detalles.
              </p>

              <div className="space-y-8 mb-12">
                {[
                  { icon: <Star className="w-4 h-4" fill="currentColor" />, title: "Diseños Únicos",  desc: "Cada pedido especial es diseñado a medida para tu evento." },
                  { icon: <Clock className="w-4 h-4" />,                    title: "Anticipación",    desc: "Sugerimos realizar pedidos personalizados con 48hs de anticipación." },
                ].map((v, i) => (
                  <div key={i} className="flex gap-5">
                    <div
                      className="w-10 h-10 flex items-center justify-center shrink-0"
                      style={{ border: `1px solid ${C.blush}50`, color: C.blush }}
                    >
                      {v.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1 text-sm" style={{ fontFamily: "system-ui, sans-serif", color: C.ink }}>{v.title}</h3>
                      <p className="text-sm leading-relaxed" style={{ fontFamily: "system-ui, sans-serif", color: C.inkSoft }}>{v.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <button
                  onClick={() => openWhatsApp("Hola! Me gustaría hacer un pedido personalizado, ¿Estaría disponible?")}
                  className="inline-flex items-center gap-2.5 text-sm font-semibold tracking-wider uppercase px-7 py-3.5 transition-all duration-300"
                  style={{ fontFamily: "system-ui, sans-serif", backgroundColor: C.blush, color: C.white }}
                >
                  <SiWhatsapp className="w-4 h-4" />
                  Solicitar por WhatsApp
                </button>
                <span className="flex items-center gap-1.5 text-sm py-3.5" style={{ fontFamily: "system-ui, sans-serif", color: C.inkSoft }}>
                  ✓ Respondemos en el día
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ╔══════════════════════════════════════════╗
          ║  GALERÍA — editorial, sin bordes         ║
          ╚══════════════════════════════════════════╝ */}
      <section id="galeria" style={{ backgroundColor: C.cream }} className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-14">

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-7 h-px" style={{ backgroundColor: C.blush }} />
                <p className="text-xs tracking-[0.25em] uppercase" style={{ fontFamily: "system-ui, sans-serif", color: C.blush, fontWeight: 500 }}>Nuestras creaciones</p>
              </div>
              <h2 style={{ fontFamily: "Great Vibes, cursive", fontSize: "clamp(2.4rem, 5vw, 3.5rem)", color: C.ink }}>
                Nuestra Galería
              </h2>
            </div>
            <a
              href="#"
              className="hidden md:flex items-center gap-2 text-sm transition-colors duration-200"
              style={{ fontFamily: "system-ui, sans-serif", color: C.inkSoft }}
              onMouseEnter={e => (e.currentTarget.style.color = C.blush)}
              onMouseLeave={e => (e.currentTarget.style.color = C.inkSoft)}
            >
              <SiInstagram className="w-4 h-4" />
              @dulce.palo
            </a>
          </motion.div>

          {/* Grid sin gap — juntura editorial como páginas de revista */}
          <div className="grid grid-cols-2 md:grid-cols-3" style={{ gap: "2px", backgroundColor: C.bone }}>
            {GALLERY.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.07, duration: 0.5 }}
                onClick={() => openGalleryModal(item)}
                className={cn(
                  "relative overflow-hidden cursor-pointer group",
                  i === 0 || i === 5 ? "row-span-2" : "",
                )}
                style={{
                  backgroundColor: C.bone,
                  aspectRatio: i === 0 || i === 5 ? "unset" : "1",
                }}
              >
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-104"
                  style={{ display: "block" }}
                />
                {/* Overlay */}
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-400"
                  style={{ backgroundColor: "rgba(28,16,12,0)", opacity: 0 }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.opacity = "1";
                    (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(28,16,12,0.52)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.opacity = "0";
                    (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(28,16,12,0)";
                  }}
                >
                  <SiInstagram className="w-6 h-6 text-white mb-2" />
                  <p className="text-white text-sm line-clamp-1 px-4 text-center" style={{ fontFamily: "system-ui, sans-serif" }}>{item.name}</p>
                </div>
                {item.images.length > 1 && (
                  <div
                    className="absolute top-2.5 right-2.5 text-[10px] px-1.5 py-0.5"
                    style={{ fontFamily: "system-ui, sans-serif", backgroundColor: "rgba(28,16,12,0.5)", color: "rgba(255,255,255,0.8)" }}
                  >
                    +{item.images.length - 1}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Modal Galería (preservado) ── */}
      <AnimatePresence>
        {selectedGalleryItem && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={closeGalleryModal}
            className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center"
            style={{ backgroundColor: "rgba(0,0,0,0.82)", backdropFilter: "blur(10px)" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 36, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 36, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              onClick={e => e.stopPropagation()}
              className="relative w-full sm:max-w-2xl md:max-w-3xl sm:mx-4 overflow-hidden shadow-2xl"
              style={{ backgroundColor: "#140A08", borderRadius: "0 0 0 0" }}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-black">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={galleryImageIndex}
                    src={selectedGalleryItem.images[galleryImageIndex]}
                    alt={selectedGalleryItem.name}
                    initial={{ opacity: 0, scale: 1.03 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.28, ease: "easeInOut" }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
                {selectedGalleryItem.images.length > 1 && (
                  <>
                    <button onClick={galleryPrev} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-white transition-all duration-200" style={{ backgroundColor: "rgba(0,0,0,0.42)" }}>
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button onClick={galleryNext} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-white transition-all duration-200" style={{ backgroundColor: "rgba(0,0,0,0.42)" }}>
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
                <button onClick={closeGalleryModal} className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center text-white transition-all duration-200" style={{ backgroundColor: "rgba(0,0,0,0.42)" }}>
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-5 sm:p-6" style={{ backgroundColor: "#140A08" }}>
                <p className="text-white font-bold text-lg mb-0.5">{selectedGalleryItem.name}</p>
                <p className="text-xs tracking-widest uppercase mb-3" style={{ fontFamily: "system-ui, sans-serif", color: C.blush + "90" }}>Dulce Palo · Pastelería artesanal</p>
                {selectedGalleryItem.images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {selectedGalleryItem.images.map((img, idx) => (
                      <button key={idx} onClick={e => { e.stopPropagation(); setGalleryImageIndex(idx); }}
                        className="shrink-0 w-14 h-14 overflow-hidden transition-all duration-200"
                        style={{ border: `2px solid ${idx === galleryImageIndex ? C.blush : "transparent"}`, opacity: idx === galleryImageIndex ? 1 : 0.45 }}
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

      {/* ╔══════════════════════════════════════════╗
          ║  CTA FINAL — emocional, tipografía grande║
          ╚══════════════════════════════════════════╝ */}
      <section style={{ backgroundColor: C.dark }} className="py-28 md:py-44 overflow-hidden relative">
        {/* Textura puntillada sutil */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${C.blush}22 1px, transparent 0)`,
            backgroundSize: "28px 28px",
          }}
        />

        <div className="max-w-7xl mx-auto px-6 md:px-14 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Eyebrow */}
            <div className="flex items-center justify-center gap-4 mb-10">
              <div className="w-10 h-px" style={{ backgroundColor: `${C.blush}60` }} />
              <p className="text-xs tracking-[0.28em] uppercase" style={{ fontFamily: "system-ui, sans-serif", color: `${C.blush}80`, fontWeight: 500 }}>
                Empezá hoy
              </p>
              <div className="w-10 h-px" style={{ backgroundColor: `${C.blush}60` }} />
            </div>

            {/* Título gigante en dos líneas */}
            <h2
              className="leading-none mb-2"
              style={{
                fontFamily: "Great Vibes, cursive",
                fontSize: "clamp(3rem, 9vw, 7.5rem)",
                color: C.white,
              }}
            >
              ¿Creamos algo especial
            </h2>
            <h2
              className="leading-none mb-12"
              style={{
                fontFamily: "Great Vibes, cursive",
                fontSize: "clamp(3rem, 9vw, 7.5rem)",
                color: C.blush,
              }}
            >
              para vos?
            </h2>

            {/* Body */}
            <p className="text-base max-w-md mx-auto mb-12 leading-relaxed" style={{ fontFamily: "system-ui, sans-serif", color: "rgba(255,255,255,0.42)" }}>
              Cada celebración merece un dulce hecho con amor. Consultanos sin compromiso.
            </p>

            {/* CTA */}
            <button
              onClick={() => openWhatsApp("Hola! Me gustaría consultar sobre un pedido especial 🎂")}
              className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest px-10 py-4 transition-all duration-300 hover:-translate-y-0.5"
              style={{ fontFamily: "system-ui, sans-serif", backgroundColor: "#25D366", color: C.white, letterSpacing: "0.1em" }}
            >
              <SiWhatsapp className="w-5 h-5" />
              Escribinos por WhatsApp
            </button>
          </motion.div>
        </div>
      </section>

      {/* ╔══════════════════════════════════════════╗
          ║  FOOTER — minimalista                    ║
          ╚══════════════════════════════════════════╝ */}
      <footer id="contacto" style={{ backgroundColor: "#130800" }} className="py-12">
        <div className="max-w-7xl mx-auto px-6 md:px-14">
          <div
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 pb-8"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div>
              <span style={{ fontFamily: "Great Vibes, cursive", fontSize: "2rem", color: C.blush + "CC" }}>
                Dulce Palo
              </span>
              <div className="flex gap-3 mt-3.5">
                {[
                  { icon: <SiInstagram className="w-3.5 h-3.5" />, href: "#", label: "Instagram" },
                  { icon: <SiWhatsapp  className="w-3.5 h-3.5" />, href: `https://wa.me/${WHATSAPP_NUMBER}`, label: "WhatsApp" },
                ].map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="w-8 h-8 flex items-center justify-center transition-all duration-200"
                    style={{ border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.35)" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = C.blush; (e.currentTarget as HTMLElement).style.color = C.blush; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.12)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.35)"; }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            <nav className="flex flex-wrap gap-x-8 gap-y-1.5">
              {NAV_LINKS.map(l => (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-xs tracking-[0.12em] uppercase transition-colors duration-200"
                  style={{ fontFamily: "system-ui, sans-serif", color: "rgba(255,255,255,0.28)", fontWeight: 400 }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)")}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.28)")}
                >
                  {l.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2" style={{ color: "rgba(255,255,255,0.2)", fontFamily: "system-ui, sans-serif" }}>
              <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: C.blush + "60" }} />
              <span className="text-sm">Monteros, Tucumán, Argentina</span>
            </div>
          </div>

          <div className="pt-5 text-xs" style={{ fontFamily: "system-ui, sans-serif", color: "rgba(255,255,255,0.14)" }}>
            © {new Date().getFullYear()} Dulce Palo Pastelería.
          </div>
        </div>
      </footer>

      {/* ╔══════════════════════════════════════════╗
          ║  FAB                                     ║
          ╚══════════════════════════════════════════╝ */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.22 }}
            className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3"
          >
            <AnimatePresence>
              {contactOpen && (
                <>
                  <motion.button
                    key="wa"
                    initial={{ opacity: 0, y: 12, scale: 0.85 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: 0.85 }}
                    transition={{ duration: 0.18, delay: 0.04 }}
                    onClick={() => { openWhatsApp("Hola! Me gustaría hacer un pedido."); setContactOpen(false); }}
                    className="flex items-center gap-2 text-white text-sm font-semibold px-4 py-2.5 shadow-xl transition-colors duration-200"
                    style={{ fontFamily: "system-ui, sans-serif", backgroundColor: "#25D366" }}
                  >
                    <SiWhatsapp className="w-4 h-4" />
                    WhatsApp
                  </motion.button>
                  <motion.button
                    key="call"
                    initial={{ opacity: 0, y: 12, scale: 0.85 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: 0.85 }}
                    transition={{ duration: 0.18 }}
                    onClick={() => { makeCall(); setContactOpen(false); }}
                    className="flex items-center gap-2 text-sm font-semibold px-4 py-2.5 shadow-xl transition-all duration-200"
                    style={{ fontFamily: "system-ui, sans-serif", backgroundColor: C.white, color: C.blush, border: `1px solid ${C.blush}40` }}
                  >
                    <Phone className="w-4 h-4" />
                    Llamar
                  </motion.button>
                </>
              )}
            </AnimatePresence>
            <div className="relative">
              {!contactOpen && (
                <motion.span
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: C.blush }}
                  animate={{ scale: [1, 1.55, 1], opacity: [0.4, 0, 0.4] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
              <button
                onClick={() => setContactOpen(o => !o)}
                className="relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl border-2"
                style={{
                  backgroundColor: contactOpen ? C.blushDk : C.blush,
                  borderColor: C.white + "CC",
                  color: C.white,
                  transform: contactOpen ? "rotate(45deg)" : "rotate(0deg)",
                }}
              >
                <Phone className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ╔══════════════════════════════════════════╗
          ║  CART DRAWER                             ║
          ╚══════════════════════════════════════════╝ */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              key="bd" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50"
              style={{ backgroundColor: "rgba(0,0,0,0.42)" }}
              onClick={() => setCartOpen(false)}
            />
            <motion.div
              key="dr" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="fixed right-0 top-0 h-full w-full max-w-sm z-50 flex flex-col shadow-2xl"
              style={{ backgroundColor: C.white }}
            >
              <div className="flex items-center justify-between p-5" style={{ borderBottom: `1px solid ${C.bone}` }}>
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4" style={{ color: C.blush }} />
                  <h3 className="text-base font-bold" style={{ color: C.ink }}>
                    Tu Pedido ({cartCount})
                  </h3>
                </div>
                <button onClick={() => setCartOpen(false)} className="p-2 transition-colors" style={{ color: C.inkSoft }}>
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {cartItems.length === 0 ? (
                  <p className="text-center py-12 text-sm" style={{ fontFamily: "system-ui, sans-serif", color: C.inkSoft }}>
                    No hay productos seleccionados.
                  </p>
                ) : (
                  cartItems.map(item => (
                    <div key={item.id} className="flex items-center gap-3">
                      <img src={item.img} alt={item.name} className="w-14 h-14 object-cover shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate" style={{ fontFamily: "system-ui, sans-serif", color: C.ink }}>
                          {item.name}
                        </p>
                        <p className="text-sm font-semibold" style={{ fontFamily: "system-ui, sans-serif", color: C.blush }}>
                          ${(item.price * (quantities[item.id] ?? 0)).toLocaleString("es-AR")}
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button onClick={() => decrement(item.id)} className="w-7 h-7 flex items-center justify-center transition-all duration-200" style={{ border: `1px solid ${C.bone}`, color: C.inkSoft }}>
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-5 text-center text-sm font-bold tabular-nums" style={{ fontFamily: "system-ui, sans-serif", color: C.ink }}>
                          {quantities[item.id]}
                        </span>
                        <button onClick={() => increment(item.id)} className="w-7 h-7 flex items-center justify-center transition-all duration-200" style={{ backgroundColor: C.blush, color: C.white }}>
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="p-5" style={{ borderTop: `1px solid ${C.bone}` }}>
                  <button
                    onClick={clearCart}
                    className="w-full text-sm text-center mb-4 transition-colors duration-200"
                    style={{ fontFamily: "system-ui, sans-serif", color: C.inkSoft }}
                  >
                    Borrar todo
                  </button>
                  <div className="flex justify-between mb-4">
                    <span className="text-sm" style={{ fontFamily: "system-ui, sans-serif", color: C.inkMid }}>Total estimado</span>
                    <span className="font-bold text-xl" style={{ color: C.blush }}>${cartTotal.toLocaleString("es-AR")}</span>
                  </div>
                  <button
                    onClick={sendCartOrder}
                    className="w-full flex items-center justify-center gap-2.5 text-base h-12 font-semibold transition-all duration-200"
                    style={{ fontFamily: "system-ui, sans-serif", backgroundColor: C.blush, color: C.white }}
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
