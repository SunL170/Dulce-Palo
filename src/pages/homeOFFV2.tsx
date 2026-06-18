import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronLeft, ChevronRight, Star, MapPin, Clock, X, Phone, Heart } from "lucide-react";
import { SiWhatsapp, SiInstagram } from "react-icons/si";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";

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
  { href: "#sobre-mi", label: "Sobre Mí" },
  { href: "#galeria",  label: "Galería" },
];

const ALL_PRODUCTS = [
  { id: "torta-choc",     category: "tortas",      name: "Torta de Chocolate con Frambuesas",   desc: "Bizcochuelo húmedo de chocolate intenso con centro de frambuesas frescas.",      price: 3500,  img: tortaChocImg },
  { id: "torta-red",      category: "tortas",      name: "Torta Red Velvet",                    desc: "Clásica red velvet con frosting de queso crema suave.",                         price: 3800,  img: tortaRedVelvetImg },
  { id: "torta-vainilla", category: "tortas",      name: "Torta de Vainilla y Frutos Rojos",   desc: "Capas de vainilla con crema chantilly y selección de frutos rojos.",             price: 3200,  img: tortaVainillaImg },
  { id: "cupcake-limon",  category: "cupcakes",    name: "Cupcakes de Limón",                  desc: "Masa de limón con corazón de curd y frosting cítrico.",                         price: 800,   img: cupcakesLimonImg },
  { id: "cupcake-oreo",   category: "cupcakes",    name: "Cupcakes de Oreo",                   desc: "Base de chocolate con trozos de galleta y crema de vainilla.",                  price: 900,   img: cupcakesOreoImg },
  { id: "cupcake-rainbow",category: "cupcakes",    name: "Cupcakes Rainbow",                   desc: "Coloridos y divertidos, ideales para celebraciones infantiles.",                 price: 950,   img: cupcakesRainbowImg },
  { id: "cheese-frutos",  category: "cheesecakes", name: "Cheesecake de Frutos del Bosque",    desc: "Estilo New York con salsa casera de frutos rojos.",                             price: 2800,  img: cheeseFrutosImg },
  { id: "cheese-dulce",   category: "cheesecakes", name: "Cheesecake de Dulce de Leche",       desc: "Cremoso, con hilos de dulce de leche colonial.",                               price: 2600,  img: cheeseDulceImg },
  { id: "macarons",       category: "postres",     name: "Macarons Surtidos",                  desc: "Caja de 6 macarons franceses en colores pastel.",                               price: 1200,  img: macaronsImg },
  { id: "brownies",       category: "postres",     name: "Brownies Artesanales",               desc: "Húmedos, con nueces y costra crujiente.",                                       price: 600,   img: tortaChocImg },
  { id: "tiramisu",       category: "postres",     name: "Tiramisú Individual",                desc: "Clásico italiano con mascarpone y café espresso.",                              price: 750,   img: cheeseDulceImg },
  { id: "mesa-30",        category: "mesas",       name: "Mesa Dulce para 30 personas",        desc: "Selección de 3 tortas y 2 docenas de postres individuales.",                    price: 25000, img: heroBackground },
  { id: "mesa-50",        category: "mesas",       name: "Mesa Dulce para 50 personas",        desc: "Selección premium de 5 tortas y 4 docenas de postres.",                         price: 38000, img: heroBackground },
  { id: "tarta-fruta",    category: "tartas",      name: "Tarta de Frutas Frescas",            desc: "Base crocante con crema pastelera y frutas de temporada.",                      price: 2200,  img: tortaVainillaImg },
  { id: "tarta-limon",    category: "tartas",      name: "Tarta de Limón",                     desc: "Relleno cremoso de limón con merengue tostado.",                                price: 2000,  img: cupcakesLimonImg },
  { id: "tarta-choc",     category: "tartas",      name: "Tarta de Chocolate",                 desc: "Ganache intenso sobre masa sablée con base crocante.",                          price: 2100,  img: tortaChocImg },
  { id: "budin-limon",    category: "budines",     name: "Budín de Limón",                     desc: "Esponjoso y húmedo con cobertura de azúcar glasé.",                             price: 900,   img: cupcakesLimonImg },
  { id: "budin-naranja",  category: "budines",     name: "Budín de Naranja y Almendras",       desc: "Aromas cítricos con textura tierna y almendras tostadas.",                      price: 950,   img: tortaVainillaImg },
  { id: "budin-choc",     category: "budines",     name: "Budín de Chocolate",                 desc: "Doble chocolate con chips y cobertura brillante.",                              price: 1000,  img: tortaChocImg },
  { id: "cookie-choc",    category: "cookies",     name: "Cookies de Chocolate",               desc: "Masa suave con chips de chocolate semi amargo.",                                price: 350,   img: cupcakesOreoImg },
  { id: "cookie-vainilla",category: "cookies",     name: "Cookies de Vainilla y Nuez",         desc: "Clásicas y crocantes con trozos de nuez caramelizada.",                         price: 350,   img: macaronsImg },
  { id: "cookie-red",     category: "cookies",     name: "Cookies Red Velvet",                 desc: "Suaves y coloridas con chips de chocolate blanco.",                             price: 380,   img: tortaRedVelvetImg },
  { id: "alfa-dulce",     category: "alfajores",   name: "Alfajores de Dulce de Leche",        desc: "Tres capas de masa tierna con dulce de leche y coco.",                          price: 450,   img: cheeseDulceImg },
  { id: "alfa-choc",      category: "alfajores",   name: "Alfajores Bañados en Chocolate",     desc: "Relleno de dulce de leche con baño de chocolate negro.",                        price: 500,   img: tortaChocImg },
  { id: "alfa-limon",     category: "alfajores",   name: "Alfajores de Limón",                 desc: "Masa cítrica con crema de limón y azúcar impalpable.",                          price: 450,   img: cupcakesLimonImg },
];

const CATALOG_CATEGORIES = [
  { key: "tortas",       label: "Tortas" },
  { key: "cupcakes",    label: "Cupcakes" },
  { key: "cheesecakes", label: "Cheesecakes" },
  { key: "tartas",      label: "Tartas" },
  { key: "budines",     label: "Budines" },
  { key: "cookies",     label: "Cookies" },
  { key: "alfajores",   label: "Alfajores" },
  { key: "postres",     label: "Postres" },
  { key: "mesas",       label: "Mesas Dulces" },
];

const PRODUCTS_BY_CATEGORY: Record<string, typeof ALL_PRODUCTS> = Object.fromEntries(
  CATALOG_CATEGORIES.map(c => [c.key, ALL_PRODUCTS.filter(p => p.category === c.key)])
);

const GALLERY = [
  { id: 1, name: "Torta Chocolate Frambuesa",      images: [tortaChocImg, tortaRedVelvetImg, macaronsImg] },
  { id: 2, name: "Torta Red Velvet",               images: [tortaRedVelvetImg] },
  { id: 3, name: "Macarons Surtidos",              images: [macaronsImg] },
  { id: 4, name: "Cheesecake Frutos del Bosque",   images: [cheeseFrutosImg] },
  { id: 5, name: "Cupcakes Limón",                 images: [cupcakesLimonImg] },
  { id: 6, name: "Torta Vainilla",                 images: [tortaVainillaImg] },
  { id: 7, name: "Cupcakes Oreo",                  images: [cupcakesOreoImg] },
  { id: 8, name: "Cheesecake Dulce de Leche",      images: [cheeseDulceImg] },
  { id: 9, name: "Cupcakes Rainbow",               images: [cupcakesRainbowImg] },
];

const HERO_SLIDES = [
  { img: heroBackground,     label: "Detalles que enamoran" },
  { img: tortaChocImg,       label: "Tortas personalizadas" },
  { img: macaronsImg,        label: "Pastelería artesanal" },
  { img: cheeseFrutosImg,    label: "Cada bocado, una obra" },
  { img: cupcakesRainbowImg, label: "Celebraciones especiales" },
];

const FEATURED_PRODUCTS = [
  { title: "Torta de Chocolate",    image: tortaChocImg },
  { title: "Torta Red Velvet",      image: tortaRedVelvetImg },
  { title: "Cheesecake",            image: cheeseFrutosImg },
  { title: "Macarons",              image: macaronsImg },
  { title: "Cupcakes de Limón",     image: cupcakesLimonImg },
  { title: "Cupcakes Rainbow",      image: cupcakesRainbowImg },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState("inicio");
  const [isScrolled, setIsScrolled] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [direction, setDirection] = useState(1);
  const [heroIndex, setHeroIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const heroIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const productsGridRef = useRef<HTMLDivElement>(null);

  const SLIDE_DURATION = 5500;

  const [selectedGalleryItem, setSelectedGalleryItem] = useState<typeof GALLERY[0] | null>(null);
  const [galleryImageIndex, setGalleryImageIndex] = useState(0);

  const openGalleryModal = (item: typeof GALLERY[0]) => {
    setSelectedGalleryItem(item);
    setGalleryImageIndex(0);
  };
  const closeGalleryModal = () => {
    setSelectedGalleryItem(null);
    setGalleryImageIndex(0);
  };
  const galleryPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedGalleryItem) return;
    setGalleryImageIndex(i => (i - 1 + selectedGalleryItem.images.length) % selectedGalleryItem.images.length);
  };
  const galleryNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedGalleryItem) return;
    setGalleryImageIndex(i => (i + 1) % selectedGalleryItem.images.length);
  };

  const marqueeItems = [
    "Hecho con amor", "Cada detalle importa", "Tortas personalizadas",
    "Cupcakes artesanales", "Dulces momentos", "Eventos especiales",
    "Para tus celebraciones", "Regalos que enamoran",
  ];

  const startHeroTimer = useCallback(() => {
    if (heroIntervalRef.current) clearInterval(heroIntervalRef.current);
    heroIntervalRef.current = setInterval(() => {
      setHeroIndex(i => (i + 1) % HERO_SLIDES.length);
    }, SLIDE_DURATION);
  }, []);

  const nextSlide = () => { setHeroIndex(i => (i + 1) % HERO_SLIDES.length); startHeroTimer(); };
  const prevSlide = () => { setHeroIndex(i => (i - 1 + HERO_SLIDES.length) % HERO_SLIDES.length); startHeroTimer(); };

  useEffect(() => {
    startHeroTimer();
    return () => { if (heroIntervalRef.current) clearInterval(heroIntervalRef.current); };
  }, [startHeroTimer]);

  useEffect(() => {
    if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
      const sections = NAV_LINKS.map(l => l.href.substring(1));
      const current = sections.find(s => {
        const el = document.getElementById(s);
        if (el) { const r = el.getBoundingClientRect(); return r.top <= 100 && r.bottom >= 100; }
        return false;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openWhatsApp = (message: string) => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
  };
  const makeCall = () => { window.location.href = PHONE_NUMBER; };
  const openMaps = () => {
    window.open("https://www.google.com/maps/search/?api=1&query=Monteros+Tucuman", "_blank");
  };

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

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">

      {/* ── Navbar ── */}
      <header className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent",
        isScrolled ? "bg-white/90 backdrop-blur-md border-border shadow-sm py-3" : "bg-transparent py-5"
      )}>
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-serif text-4xl font-bold text-[#b68b8b]" style={{ fontFamily: "Great Vibes" }}>
              Dulce Palo
            </span>
            <motion.div
              animate={{ scale: [1, 1.18, 1, 1.25, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", times: [0, 0.25, 0.5, 0.75, 1] }}
              className="ml-1 flex items-center"
            >
              <Heart className="w-5 h-5 fill-[#a17a7e] text-[#a17a7e]" />
            </motion.div>
          </div>

          <nav className="hidden lg:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map(link => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative text-lg font-medium py-1 transition-all duration-300 hover:-translate-y-0.5 hover:text-[#a17a7e]",
                    isActive ? "text-[#a17a7e] font-semibold" : "text-[#8d676b]"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-[#a17a7e]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          <div className="w-10" />
        </div>
      </header>

      {/* ── Hero ── */}
      <section
        id="inicio"
        className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
        onTouchStart={e => setTouchStart(e.touches[0].clientX)}
        onTouchEnd={e => {
          const diff = touchStart - e.changedTouches[0].clientX;
          if (Math.abs(diff) < 40) return;
          diff > 0 ? nextSlide() : prevSlide();
        }}
      >
        {/* Slider de fondo con Ken Burns */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence initial={false}>
            <motion.div
              key={heroIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <motion.img
                src={HERO_SLIDES[heroIndex].img}
                alt={HERO_SLIDES[heroIndex].label}
                initial={{ scale: 1.08 }}
                animate={{ scale: 1 }}
                transition={{ duration: SLIDE_DURATION / 1000 + 1.2, ease: "linear" }}
                className="w-full h-full object-cover object-center opacity-75"
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/20 to-black/55" />
        </div>

        {/* Flechas laterales */}
        <button
          onClick={e => { e.stopPropagation(); prevSlide(); }}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm text-white flex items-center justify-center transition-all duration-200 hover:scale-110"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={e => { e.stopPropagation(); nextSlide(); }}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm text-white flex items-center justify-center transition-all duration-200 hover:scale-110"
          aria-label="Siguiente"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Contenido central */}
        <div className="container relative z-10 px-4 flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            onClick={openMaps}
            className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-white/30 bg-white/15 backdrop-blur-sm text-sm font-medium text-white/90 tracking-wide cursor-pointer hover:bg-white/25 transition-all duration-300"
          >
            <MapPin className="w-3.5 h-3.5" />
            Monteros, Tucumán
          </motion.div>

          <motion.img
            src={logoImg}
            alt="Dulce Palo"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-[85vw] max-w-[420px] md:max-w-[600px] lg:max-w-[680px] h-auto mb-0 drop-shadow-2xl"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-3xl md:text-5xl text-white mb-10 max-w-2xl font-light -mt-4"
            style={{
              fontFamily: "Great Vibes",
              textShadow: "0 2px 14px rgba(0,0,0,0.5), 0 1px 4px rgba(0,0,0,0.3)",
            }}
          >
            Cada bocado, una obra de arte.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 items-center"
          >
            <button
              onClick={e => { e.stopPropagation(); document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" }); }}
              className="inline-flex items-center gap-3 text-white/80 hover:text-white transition-all duration-300 group"
            >
              <span className="text-sm font-semibold tracking-[0.18em] uppercase" style={{ textShadow: "0 1px 6px rgba(0,0,0,0.5)" }}>
                Ver Catálogo
              </span>
              <span className="w-8 h-[1.5px] bg-white/50 group-hover:w-14 group-hover:bg-white/90 transition-all duration-300 rounded-full" />
            </button>
            <button
              onClick={e => { e.stopPropagation(); openWhatsApp("Hola! Me gustaría consultar sobre un pedido 🎂"); }}
              className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 text-white text-sm font-semibold hover:bg-white/25 transition-all duration-300"
            >
              <SiWhatsapp className="w-4 h-4" />
              Consultar
            </button>
          </motion.div>
        </div>

        {/* Indicador de scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{ opacity: { delay: 1.2, duration: 0.6 }, y: { delay: 1.2, duration: 2, repeat: Infinity, ease: "easeInOut" } }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-white/40"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </section>

      {/* ── Productos Destacados ── */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-b from-[#fdf6f6] via-[#fdfafa] to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[#c2a1a3] mb-3">
              Creaciones de la casa
            </p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#5f3f43] mb-4">
              Productos Destacados
            </h2>
            <div className="w-16 h-[2px] bg-[#ddbabc] mx-auto" />
          </div>
          <Swiper
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            loop={true}
            speed={700}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            coverflowEffect={{ rotate: 0, stretch: -10, depth: 120, modifier: 1.2, scale: 0.92, slideShadows: false }}
            modules={[EffectCoverflow, Autoplay]}
          >
            {FEATURED_PRODUCTS.map((item, index) => (
              <SwiperSlide key={index} className="!w-[240px] sm:!w-[300px] md:!w-[340px] lg:!w-[380px]">
                <div className="overflow-hidden rounded-xl border border-[#f0e0e0] bg-white">
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                  <div className="py-3 px-4 text-center">
                    <p className="text-sm font-semibold text-[#5f3f43] tracking-wide truncate">{item.title}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* ── Marquee ── */}
      <motion.section
        className="py-8 overflow-hidden border-y border-[#ddbabc]/50"
        onClick={() => setDirection(d => d * -1)}
      >
        <motion.div
          animate={{ x: direction === 1 ? ["0%", "-50%"] : ["-50%", "0%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex gap-7 whitespace-nowrap text-[#a17a7e] text-xl md:text-2xl font-serif font-medium w-max cursor-pointer"
        >
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="flex items-center gap-7">
              {item}
              <span className="text-[#ddbabc]">✦</span>
            </span>
          ))}
        </motion.div>
      </motion.section>

      {/* ── Catálogo ── */}
      <section id="catalogo" className="relative py-20 overflow-hidden bg-gradient-to-b from-[#fdf6f6] via-[#fdfafa] to-white">
        <div className="absolute top-10 left-[-150px] w-[400px] h-[400px] bg-[#ddbabc]/25 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-[-150px] w-[420px] h-[420px] bg-[#a17a7e]/10 rounded-full blur-[140px] pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #a17a7e 1px, transparent 0)", backgroundSize: "28px 28px" }}
        />

        <div className="container px-4 mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="relative text-center mb-14"
          >
            <div className="absolute left-1/2 -translate-x-1/2 -top-16 text-[90px] md:text-[140px] font-serif font-bold text-[#ddbabc]/10 select-none pointer-events-none">
              Dulce
            </div>
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[#c2a1a3] mb-3">Pastelería artesanal</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#5f3f43] mb-4">Nuestro Catálogo</h2>
            <div className="w-16 h-[2px] bg-[#ddbabc] mx-auto" />
          </motion.div>

          {/* Category pills */}
          <div className="w-full max-w-3xl mx-auto flex flex-wrap justify-center gap-2 mb-12">
            {CATALOG_CATEGORIES.map(cat => (
              <button
                key={cat.key}
                onClick={() => handleCategorySelect(cat.key)}
                className={cn(
                  "rounded-full px-6 py-2.5 text-sm font-semibold tracking-wide transition-all duration-300",
                  activeCategory === cat.key
                    ? "bg-[#a17a7e] text-white shadow-[0_8px_24px_rgba(161,122,126,0.4)] scale-105"
                    : "bg-white text-[#a17a7e] border border-[#ddbabc] hover:border-[#a17a7e] hover:shadow-[0_4px_14px_rgba(161,122,126,0.2)] hover:-translate-y-0.5"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Product grid — boutique style */}
          <div ref={productsGridRef}>
            <AnimatePresence initial={false}>
              {activeCategory && (
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {(PRODUCTS_BY_CATEGORY[activeCategory] ?? []).map((item, i) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.07 }}
                      >
                        {/* Boutique card: tall image, clean info, consult CTA */}
                        <div className="group bg-white overflow-hidden border border-[#f0e0e0] transition-all duration-300 hover:border-[#ddbabc] hover:shadow-[0_16px_40px_-8px_rgba(161,122,126,0.25)]">
                          {/* Image — click opens modal */}
                          <div
                            className="aspect-[4/3] overflow-hidden relative bg-[#fdf6f6] cursor-pointer"
                            onClick={() => openGalleryModal({ id: i + 100, name: item.name, images: [item.img] })}
                          >
                            <img
                              src={item.img}
                              alt={item.name}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <span className="bg-white/90 text-[#a17a7e] text-xs font-bold tracking-[0.15em] uppercase px-4 py-2">
                                Ver detalle
                              </span>
                            </div>
                          </div>
                          {/* Info */}
                          <div className="p-5 border-t border-[#f0e0e0]">
                            <h3 className="font-serif font-bold text-base text-[#3d2527] mb-1 leading-snug">
                              {item.name}
                            </h3>
                            <p className="text-xs text-[#9c7679] line-clamp-2 mb-4 leading-relaxed">
                              {item.desc}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-[#a17a7e] font-bold text-lg">
                                ${item.price.toLocaleString("es-AR")}
                              </span>
                              <button
                                onClick={() => openWhatsApp(`Hola! Me interesa el producto: *${item.name}* ($${item.price.toLocaleString("es-AR")}). ¿Podría darme más información?`)}
                                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#a17a7e] border border-[#ddbabc] rounded-full px-3 py-1.5 hover:bg-[#a17a7e] hover:text-white hover:border-[#a17a7e] transition-all duration-200"
                              >
                                <SiWhatsapp className="w-3 h-3" />
                                Consultar
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── Sobre Mí — sección independiente ── */}
      <section id="sobre-mi" className="py-20 md:py-28 bg-[#fdf6f6]">
        <div className="container px-4 mx-auto max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeIn}
            className="text-center mb-14"
          >
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[#c2a1a3] mb-3">La persona detrás</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#5f3f43] mb-4">Sobre Mí</h2>
            <div className="w-16 h-[2px] bg-[#ddbabc] mx-auto" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            {/* Foto placeholder */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex justify-center md:justify-end"
            >
              <div className="relative">
                <div className="w-72 h-72 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-[#ddbabc]/60 shadow-[0_20px_60px_rgba(161,122,126,0.25)]">
                  <div className="w-full h-full bg-gradient-to-br from-[#fdf6f6] to-[#ddbabc]/50 flex flex-col items-center justify-center">
                    <Heart className="w-16 h-16 text-[#a17a7e]/40 mb-2" fill="currentColor" />
                    <p className="text-[#c2a1a3] text-xs tracking-widest uppercase">Tu foto aquí</p>
                  </div>
                </div>
                {/* Detalle decorativo */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full border-2 border-[#ddbabc]/40 bg-[#fdf6f6]" />
                <div className="absolute -top-3 -left-3 w-14 h-14 rounded-full bg-[#ddbabc]/30" />
              </div>
            </motion.div>

            {/* Texto */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="space-y-6"
            >
              <div>
                <p className="text-2xl md:text-3xl font-serif text-[#5f3f43] leading-relaxed mb-4">
                  "Cada torta es una historia.<br />Cada bocado, un recuerdo."
                </p>
                <p className="text-[#7f5f63] leading-relaxed">
                  Soy apasionada de la pastelería artesanal. Cada receta que preparo está hecha
                  con dedicación, ingredientes de calidad y mucho amor.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                {[
                  { icon: <Heart className="w-4 h-4" fill="currentColor" />, label: "Hecho con amor", desc: "Cada pedido es único y personal." },
                  { icon: <Star className="w-4 h-4" fill="currentColor" />, label: "Calidad artesanal", desc: "Ingredientes seleccionados, sin aditivos." },
                  { icon: <Clock className="w-4 h-4" />, label: "A tu medida", desc: "Diseños personalizados para tu evento." },
                ].map((v, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#ddbabc]/40 flex items-center justify-center shrink-0 text-[#a17a7e]">
                      {v.icon}
                    </div>
                    <div>
                      <p className="font-semibold text-[#5f3f43] text-sm">{v.label}</p>
                      <p className="text-[#9c7679] text-sm">{v.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <p className="font-serif text-2xl text-[#a17a7e]" style={{ fontFamily: "Great Vibes" }}>
                  Con amor, Dulce Palo 🌸
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Galería ── */}
      <section id="galeria" className="relative py-20 overflow-hidden bg-gradient-to-b from-[#fdf6f6] via-[#fdfafa] to-white">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[#c2a1a3] mb-3">Nuestras creaciones</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#5f3f43] mb-4">Nuestra Galería</h2>
            <div className="w-16 h-[2px] bg-[#ddbabc] mx-auto mb-5" />
            <p className="text-muted-foreground flex items-center justify-center gap-2 text-sm">
              <SiInstagram className="text-[#a17a7e]" />
              <span>Seguinos en <a href="#" className="font-semibold text-[#a17a7e] hover:text-[#8d676b] transition-colors">@dulce.palo</a></span>
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {GALLERY.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.08, duration: 0.55, ease: "easeOut" }}
                onClick={() => openGalleryModal(item)}
                className={cn(
                  "relative overflow-hidden cursor-pointer group bg-[#fdf6f6]",
                  "transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_16px_40px_-8px_rgba(161,122,126,0.35)]",
                  i === 0 ? "row-span-2 aspect-[3/4] md:aspect-auto" : "aspect-square"
                )}
              >
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3d2527]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-400" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-white font-semibold text-sm leading-tight line-clamp-1">{item.name}</p>
                  <p className="text-white/70 text-xs mt-0.5 flex items-center gap-1">
                    <SiInstagram className="w-3 h-3" /> Ver más
                  </p>
                </div>
                {item.images.length > 1 && (
                  <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                    +{item.images.length - 1}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Modal de Galería ── */}
      <AnimatePresence>
        {selectedGalleryItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
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
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
                {selectedGalleryItem.images.length > 1 && (
                  <>
                    <button onClick={galleryPrev} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/65 backdrop-blur-sm text-white flex items-center justify-center transition-all duration-200 hover:scale-110">
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button onClick={galleryNext} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/65 backdrop-blur-sm text-white flex items-center justify-center transition-all duration-200 hover:scale-110">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
                <button onClick={closeGalleryModal} className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/40 hover:bg-black/65 backdrop-blur-sm text-white flex items-center justify-center transition-all duration-200">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-4 sm:p-6 bg-[#1a0f10]">
                <p className="text-white font-serif font-bold text-xl mb-0.5 leading-tight">{selectedGalleryItem.name}</p>
                <p className="text-[#c2a1a3] text-xs tracking-widest uppercase font-medium mb-3">Dulce Palo · Pastelería artesanal</p>
                {selectedGalleryItem.images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-1 pt-1">
                    {selectedGalleryItem.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={e => { e.stopPropagation(); setGalleryImageIndex(idx); }}
                        className={cn(
                          "shrink-0 w-14 h-14 rounded-xl overflow-hidden border-2 transition-all duration-200",
                          idx === galleryImageIndex ? "border-[#c2a1a3] opacity-100 scale-105" : "border-white/10 opacity-50 hover:opacity-80"
                        )}
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

      {/* ── Pedido Personalizado ── */}
      <section id="pedido" className="py-28 bg-secondary/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        <div className="container px-4 mx-auto relative z-10 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[#c2a1a3] mb-3">Encargos especiales</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#5f3f43] mb-5">Pedido Personalizado</h2>
            <p className="text-muted-foreground text-lg mb-12">
              ¿Tenés una celebración especial? Contáctanos para afinar detalles.
            </p>
            <div className="space-y-8">
              <div className="flex gap-4 group">
                <div className="w-14 h-14 rounded-2xl bg-[#fdf6f6] border border-[#ddbabc] shadow-[0_8px_25px_rgba(161,122,126,0.15)] flex items-center justify-center shrink-0 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_12px_30px_rgba(161,122,126,0.3)]">
                  <Star className="w-6 h-6 text-[#a17a7e]" fill="currentColor" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-[#7f5f63]">Diseños Únicos</h3>
                  <p className="text-sm text-muted-foreground">Cada pedido especial es diseñado a medida para tu evento.</p>
                </div>
              </div>
              <div className="flex gap-4 group">
                <div className="w-14 h-14 rounded-2xl bg-[#fdf6f6] border border-[#ddbabc] shadow-[0_8px_25px_rgba(161,122,126,0.15)] flex items-center justify-center shrink-0 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_12px_30px_rgba(161,122,126,0.3)]">
                  <Clock className="w-6 h-6 text-[#a17a7e]" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-[#7f5f63]">Anticipación</h3>
                  <p className="text-sm text-muted-foreground">Sugerimos realizar pedidos personalizados con 48hs de anticipación.</p>
                </div>
              </div>
            </div>
            <div className="mt-12 flex flex-col sm:flex-row sm:items-center gap-4">
              <Button
                size="lg"
                onClick={() => openWhatsApp("Hola! Me gustaría hacer un pedido personalizado, ¿Estaría disponible?")}
                className="rounded-full gap-2 h-14 px-8 text-base bg-[#a17a7e] hover:bg-[#8c686c] text-white border-0 shadow-[0_10px_30px_rgba(161,122,126,0.4)] hover:shadow-[0_14px_36px_rgba(161,122,126,0.5)] transition-all duration-300 hover:-translate-y-0.5"
              >
                <SiWhatsapp className="w-5 h-5" />
                Solicitar mi pedido por WhatsApp
              </Button>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#fdf6f6] border border-[#ddbabc] text-[#a17a7e] text-sm font-medium">
                ✓ Respondemos en el día
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA Final ── */}
      <section className="py-24 bg-[#3d2527] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #ddbabc 1px, transparent 0)", backgroundSize: "24px 24px" }} />
        <div className="absolute top-0 left-1/3 w-64 h-64 bg-[#a17a7e]/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#c2a1a3]/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="container px-4 mx-auto relative z-10 text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[#c2a1a3] mb-4">Empezá hoy</p>
            <h2
              className="text-5xl md:text-7xl text-white mb-6 leading-tight"
              style={{ fontFamily: "Great Vibes" }}
            >
              ¿Creamos algo especial para vos?
            </h2>
            <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Cada celebración merece un dulce hecho con amor. Consultanos sin compromiso y te asesoramos para crear exactamente lo que imaginás.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => openWhatsApp("Hola! Me gustaría consultar sobre un pedido especial 🎂")}
                className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1da851] text-white font-bold text-base px-8 py-4 rounded-full transition-all duration-300 hover:-translate-y-0.5 shadow-[0_10px_30px_rgba(37,211,102,0.3)] hover:shadow-[0_14px_40px_rgba(37,211,102,0.45)]"
              >
                <SiWhatsapp className="w-5 h-5" />
                Escribinos por WhatsApp
              </button>
              <a
                href="#catalogo"
                className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium tracking-wide transition-colors duration-200"
              >
                Ver catálogo completo →
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer id="contacto" className="bg-[#a17a7e] text-white pt-12 pb-6 border-t border-white/10">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
            <div>
              <h2 className="text-4xl font-bold mb-3 text-white" style={{ fontFamily: "Great Vibes" }}>
                Dulce Palo
              </h2>
              <div className="flex gap-3">
                <a href="#" aria-label="Instagram de Dulce Palo" className="w-9 h-9 rounded-full bg-[#c2a1a3] flex items-center justify-center hover:bg-[#ddbabc] hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300">
                  <SiInstagram className="w-4 h-4" />
                </a>
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" aria-label="WhatsApp de Dulce Palo" className="w-9 h-9 rounded-full bg-[#c2a1a3] flex items-center justify-center hover:bg-[#25D366] hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300">
                  <SiWhatsapp className="w-4 h-4" />
                </a>
              </div>
            </div>
            <div className="flex items-center gap-2 text-white/90 text-sm">
              <MapPin className="w-4 h-4 text-[#ddbabc] shrink-0" />
              <span>Monteros, Tucumán, Argentina</span>
            </div>
          </div>
          <div className="border-t border-[#ddbabc]/60 pt-5 text-center text-sm text-white/80 tracking-wide">
            © {new Date().getFullYear()} Dulce Palo Pastelería.
          </div>
        </div>
      </footer>

      {/* ── FAB Flotante ── */}
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
                  <motion.button
                    key="wa"
                    initial={{ opacity: 0, y: 16, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 16, scale: 0.8 }}
                    transition={{ duration: 0.2, delay: 0.05 }}
                    onClick={() => { openWhatsApp("Hola! Me gustaría hacer un pedido."); setContactOpen(false); }}
                    className="flex items-center gap-2 bg-[#25D366] text-white rounded-full px-4 py-2.5 shadow-lg hover:bg-[#1da851] transition-colors text-sm font-semibold"
                  >
                    <SiWhatsapp className="w-4 h-4 shrink-0" />
                    WhatsApp
                  </motion.button>
                  <motion.button
                    key="call"
                    initial={{ opacity: 0, y: 16, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 16, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => { makeCall(); setContactOpen(false); }}
                    className="flex items-center gap-2 bg-[#fdfafa] text-[#a17a7e] border border-[#ddbabc] rounded-full px-4 py-2.5 shadow-[0_8px_25px_rgba(161,122,126,0.20)] hover:bg-[#f8f3f3] transition-all duration-300 text-sm font-semibold"
                  >
                    <Phone className="w-4 h-4 shrink-0" />
                    Llamar
                  </motion.button>
                </>
              )}
            </AnimatePresence>

            <div className="relative">
              {!contactOpen && (
                <motion.span
                  className="absolute inset-0 rounded-full bg-[#c2a1a3]"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.45, 0, 0.45] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
              <button
                onClick={() => setContactOpen(o => !o)}
                className={cn(
                  "relative w-14 h-14 rounded-full border-2 border-[#fdf6f6] shadow-[0_8px_30px_rgba(0,0,0,0.20)] flex items-center justify-center transition-all duration-300",
                  contactOpen ? "bg-[#a17a7e] text-white rotate-45" : "bg-[#c2a1a3] text-white hover:bg-[#ddbabc] hover:scale-110"
                )}
              >
                <Phone className="w-6 h-6" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
