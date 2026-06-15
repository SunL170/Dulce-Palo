import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronLeft, ChevronRight, Star, MapPin, Clock, Plus, Minus, ShoppingBag, X, Phone, Heart } from "lucide-react";
import { SiWhatsapp, SiInstagram } from "react-icons/si";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

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
  { href: "#inicio", label: "Inicio" },
  { href: "#catalogo", label: "Catálogo" },
  { href: "#pedido", label: "Pedido Personalizado" },
  { href: "#galeria", label: "Galería" },
];

const ALL_PRODUCTS = [
  { id: "torta-choc", category: "tortas", name: "Torta de Chocolate con Frambuesas", desc: "Bizcochuelo húmedo de chocolate intenso con centro de frambuesas frescas.", price: 3500, img: tortaChocImg },
  { id: "torta-red", category: "tortas", name: "Torta Red Velvet", desc: "Clásica red velvet con frosting de queso crema suave.", price: 3800, img: tortaRedVelvetImg },
  { id: "torta-vainilla", category: "tortas", name: "Torta de Vainilla y Frutos Rojos", desc: "Capas de vainilla con crema chantilly y selección de frutos rojos.", price: 3200, img: tortaVainillaImg },
  { id: "cupcake-limon", category: "cupcakes", name: "Cupcakes de Limón", desc: "Masa de limón con corazón de curd y frosting cítrico.", price: 800, img: cupcakesLimonImg },
  { id: "cupcake-oreo", category: "cupcakes", name: "Cupcakes de Oreo", desc: "Base de chocolate con trozos de galleta y crema de vainilla.", price: 900, img: cupcakesOreoImg },
  { id: "cupcake-rainbow", category: "cupcakes", name: "Cupcakes Rainbow", desc: "Coloridos y divertidos, ideales para celebraciones infantiles.", price: 950, img: cupcakesRainbowImg },
  { id: "cheese-frutos", category: "cheesecakes", name: "Cheesecake de Frutos del Bosque", desc: "Estilo New York con salsa casera de frutos rojos.", price: 2800, img: cheeseFrutosImg },
  { id: "cheese-dulce", category: "cheesecakes", name: "Cheesecake de Dulce de Leche", desc: "Cremoso, con hilos de dulce de leche colonial.", price: 2600, img: cheeseDulceImg },
  { id: "macarons", category: "postres", name: "Macarons Surtidos", desc: "Caja de 6 macarons franceses en colores pastel.", price: 1200, img: macaronsImg },
  { id: "brownies", category: "postres", name: "Brownies Artesanales", desc: "Húmedos, con nueces y costra crujiente.", price: 600, img: tortaChocImg },
  { id: "tiramisu", category: "postres", name: "Tiramisú Individual", desc: "Clásico italiano con mascarpone y café espresso.", price: 750, img: cheeseDulceImg },
  { id: "mesa-30", category: "mesas", name: "Mesa Dulce para 30 personas", desc: "Selección de 3 tortas y 2 docenas de postres individuales.", price: 25000, img: heroBackground },
  { id: "mesa-50", category: "mesas", name: "Mesa Dulce para 50 personas", desc: "Selección premium de 5 tortas y 4 docenas de postres.", price: 38000, img: heroBackground },
  { id: "tarta-fruta", category: "tartas", name: "Tarta de Frutas Frescas", desc: "Base crocante con crema pastelera y frutas de temporada.", price: 2200, img: tortaVainillaImg },
  { id: "tarta-limon", category: "tartas", name: "Tarta de Limón", desc: "Relleno cremoso de limón con merengue tostado.", price: 2000, img: cupcakesLimonImg },
  { id: "tarta-choc", category: "tartas", name: "Tarta de Chocolate", desc: "Ganache intenso sobre masa sablée con base crocante.", price: 2100, img: tortaChocImg },
  { id: "budin-limon", category: "budines", name: "Budín de Limón", desc: "Esponjoso y húmedo con cobertura de azúcar glasé.", price: 900, img: cupcakesLimonImg },
  { id: "budin-naranja", category: "budines", name: "Budín de Naranja y Almendras", desc: "Aromas cítricos con textura tierna y almendras tostadas.", price: 950, img: tortaVainillaImg },
  { id: "budin-choc", category: "budines", name: "Budín de Chocolate", desc: "Doble chocolate con chips y cobertura brillante.", price: 1000, img: tortaChocImg },
  { id: "cookie-choc", category: "cookies", name: "Cookies de Chocolate", desc: "Masa suave con chips de chocolate semi amargo.", price: 350, img: cupcakesOreoImg },
  { id: "cookie-vainilla", category: "cookies", name: "Cookies de Vainilla y Nuez", desc: "Clásicas y crocantes con trozos de nuez caramelizada.", price: 350, img: macaronsImg },
  { id: "cookie-red", category: "cookies", name: "Cookies Red Velvet", desc: "Suaves y coloridas con chips de chocolate blanco.", price: 380, img: tortaRedVelvetImg },
  { id: "alfa-dulce", category: "alfajores", name: "Alfajores de Dulce de Leche", desc: "Tres capas de masa tierna con dulce de leche y coco.", price: 450, img: cheeseDulceImg },
  { id: "alfa-choc", category: "alfajores", name: "Alfajores Bañados en Chocolate", desc: "Relleno de dulce de leche con baño de chocolate negro.", price: 500, img: tortaChocImg },
  { id: "alfa-limon", category: "alfajores", name: "Alfajores de Limón", desc: "Masa cítrica con crema de limón y azúcar impalpable.", price: 450, img: cupcakesLimonImg },
];

const CATALOG_CATEGORIES = [
  { key: "tortas",      label: "Tortas"  },
  { key: "cupcakes",   label: "Cupcakes" },
  { key: "cheesecakes",label: "Cheesecakes" },
  { key: "tartas",     label: "Tartas" },
  { key: "budines",    label: "Budines" },
  { key: "cookies",    label: "Cookies" },
  { key: "alfajores",  label: "Alfajores" },
  { key: "postres",    label: "Postres" },
  { key: "mesas",      label: "Mesas Dulces" },
];

const PRODUCTS_BY_CATEGORY: Record<string, typeof ALL_PRODUCTS> = Object.fromEntries(
  CATALOG_CATEGORIES.map(c => [c.key, ALL_PRODUCTS.filter(p => p.category === c.key)])
);

const GALLERY = [
  {
  id: 1,
  name: "Torta Chocolate Frambuesa",
  images: [
    tortaChocImg,
    tortaRedVelvetImg,
    macaronsImg,
  ]
},
  { id: 2, name: "Torta Red Velvet",          images: [tortaRedVelvetImg] },
  { id: 3, name: "Macarons Surtidos",          images: [macaronsImg] },
  { id: 4, name: "Cheesecake Frutos del Bosque", images: [cheeseFrutosImg] },
  { id: 5, name: "Cupcakes Limón",             images: [cupcakesLimonImg] },
  { id: 6, name: "Torta Vainilla",             images: [tortaVainillaImg] },
  { id: 7, name: "Cupcakes Oreo",              images: [cupcakesOreoImg] },
  { id: 8, name: "Cheesecake Dulce de Leche",  images: [cheeseDulceImg] },
  { id: 9, name: "Cupcakes Rainbow",           images: [cupcakesRainbowImg] },
];

const HERO_SLIDES = [
  { img: heroBackground,      label: "Pastelería artesanal" },
  { img: tortaChocImg,        label: "Tortas personalizadas" },
  { img: macaronsImg,         label: "Detalles que enamoran" },
  { img: cheeseFrutosImg,     label: "Cada bocado, una obra" },
  { img: cupcakesRainbowImg,  label: "Celebraciones especiales" },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState("inicio");
  const [isScrolled, setIsScrolled] = useState(false);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [heartBeat, setHeartBeat] = useState(0);
  const [direction, setDirection] = useState(1);
  const [showAbout, setShowAbout] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);
  const [heroProgress, setHeroProgress] = useState(0);
  const heroIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const heroProgressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const SLIDE_DURATION = 5500; // ms
  const PROGRESS_TICK = 50;    // ms

  const startHeroTimer = useCallback(() => {
    if (heroIntervalRef.current) clearInterval(heroIntervalRef.current);
    if (heroProgressRef.current) clearInterval(heroProgressRef.current);
    setHeroProgress(0);
    heroProgressRef.current = setInterval(() => {
      setHeroProgress(p => {
        if (p >= 100) return 100;
        return p + (PROGRESS_TICK / SLIDE_DURATION) * 100;
      });
    }, PROGRESS_TICK);
    heroIntervalRef.current = setInterval(() => {
      setHeroIndex(i => (i + 1) % HERO_SLIDES.length);
      setHeroProgress(0);
    }, SLIDE_DURATION);
  }, []);

  const goToSlide = (idx: number) => {
    setHeroIndex(idx);
    startHeroTimer();
  };
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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const marqueeItems = [
  "Hecho con amor",
  "Cada detalle importa",
  "Tortas personalizadas",
  "Cupcakes artesanales",
  "Dulces momentos",
  "Eventos especiales",
  "Cada detalle importa",
  "Para tus celebraciones",
  "Eventos Especiales",
  "Regalos que enamoran",
];

  const cartItems = ALL_PRODUCTS.filter(p => (quantities[p.id] ?? 0) > 0);
  const cartTotal = cartItems.reduce((sum, p) => sum + p.price * (quantities[p.id] ?? 0), 0);
  const cartCount = cartItems.reduce((sum, p) => sum + (quantities[p.id] ?? 0), 0);

  useEffect(() => {
    startHeroTimer();
    return () => {
      if (heroIntervalRef.current) clearInterval(heroIntervalRef.current);
      if (heroProgressRef.current) clearInterval(heroProgressRef.current);
    };
  }, [startHeroTimer]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
      const sections = NAV_LINKS.map(link => link.href.substring(1));
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
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

  const makeCall = () => {
    window.location.href = PHONE_NUMBER;
  };
  const openMaps = () => {
  window.open(
    "https://www.google.com/maps/search/?api=1&query=Monteros+Tucuman",
    "_blank"
  );
};

  const sendCartOrder = () => {
    if (cartItems.length === 0) return;
    const lines = cartItems.map(p => `\u{1F9C1} ${p.name} x${quantities[p.id]}`).join("\n");
    const message = `\u00A1Hola! \u{1F60A}\u{1F370}\n\nMe gustar\u00EDa realizar el siguiente pedido:\n\n${lines}\n\nMuchas gracias \u{1F495}`;
    openWhatsApp(message);
  };

  const clearCart = () => setQuantities({});

  const increment = (id: string) =>
    setQuantities(q => ({ ...q, [id]: (q[id] ?? 0) + 1 }));

  const decrement = (id: string) =>
    setQuantities(q => ({ ...q, [id]: Math.max(0, (q[id] ?? 0) - 1) }));

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">

      {/* ── Navbar ── */}
      <header className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent",
        isScrolled ? "bg-white/80 backdrop-blur-md border-border shadow-sm py-3" : "bg-transparent py-5"
      )}>
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
  <span
    className="font-serif text-4xl font-bold text-[#a17a7e]"
    style={{ fontFamily: "Great Vibes" }}
  >
    Pastelería
  </span>

  <motion.div
    animate={{
      scale: [1, 1.18, 1, 1.25, 1],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
      times: [0, 0.25, 0.5, 0.75, 1],
    }}
    className="ml-1 flex items-center"
  >
    <Heart
      className="w-5 h-5 fill-[#a17a7e] text-[#a17a7e]"
    />
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

          <div className="flex items-center gap-2">
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full gap-2 relative"
                    onClick={() => setCartOpen(true)}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span className="hidden sm:inline">Pedido</span>
                    <span className="absolute -top-1.5 -right-1.5 bg-[#a17a7e] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                      {cartCount}
                    </span>
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>
      {/* ── Hero ── */}
      <section id="inicio" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">

        {/* ── Slider de fondo con Ken Burns ── */}
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
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        </div>

        {/* ── Contenido central ── */}
        <div className="container relative z-10 px-4 py-20 md:py-32 flex flex-col items-center text-center max-w-4xl mx-auto">

          {/* Badge de ubicación */}
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

          {/* Logo */}
          <motion.img
            src={logoImg}
            alt="Dulce Palo"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-[85vw] max-w-[420px] md:max-w-[600px] lg:max-w-[680px] h-auto mb-0 drop-shadow-2xl"
          />

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-3xl md:text-5xl text-white mb-10 max-w-2xl font-light -mt-4 drop-shadow-lg"
            style={{ fontFamily: "Great Vibes" }}
          >
            Cada bocado, una obra de arte.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center"
          >
            <Button
              size="lg"
              className="rounded-full gap-2.5 h-12 px-7 text-sm font-semibold bg-[#a17a7e] text-white border-0 shadow-[0_8px_25px_rgba(161,122,126,0.5)] hover:bg-[#8c686c] hover:shadow-[0_12px_32px_rgba(161,122,126,0.6)] transition-all duration-300 hover:-translate-y-0.5"
              onClick={() => openWhatsApp("Hola! Me gustaría hacer un pedido.")}
            >
              <SiWhatsapp className="w-4 h-4" />
              Pedir por WhatsApp
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full gap-2.5 h-12 px-7 text-sm font-semibold bg-white/10 backdrop-blur-sm border-white/40 text-white hover:bg-white/20 hover:border-white/60 transition-all duration-300 hover:-translate-y-0.5"
              onClick={() => document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" })}
            >
              Ver Catálogo
            </Button>
          </motion.div>

          {/* Sobre mí */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-10"
          >
            <button
              style={{ fontFamily: "Great Vibes" }}
              onClick={() => {
                const opening = !showAbout;
                setShowAbout(opening);
                if (opening) {
                  setTimeout(() => {
                    const element = document.getElementById("about-content");
                    if (element) {
                      const isMobile = window.innerWidth < 768;
                      window.scrollTo({ top: element.offsetTop + (isMobile ? 20 : -320), behavior: "smooth" });
                    }
                  }, 350);
                }
              }}
              className="text-3xl text-white/80 hover:text-white transition-all duration-300 hover:scale-105 drop-shadow"
            >
              Sobre mí..
            </button>
            <AnimatePresence>
              {showAbout && (
                <motion.div
                  id="about-content"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.6 }}
                  className="overflow-hidden mt-8 w-full"
                >
                  <div className="max-w-5xl mx-auto bg-[#fdf6f6] rounded-[32px] shadow-lg p-8 md:p-10">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                      <div className="flex justify-center">
                        <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-[#fdf6f6] to-[#ddbabc]/40 border border-[#ddbabc] flex items-center justify-center">
                          <Heart className="w-16 h-16 text-[#a17a7e]/40" fill="currentColor" />
                        </div>
                      </div>
                      <div>
                        <div className="text-primary text-xl mb-6">🌸</div>
                        <p className="text-[#7f5f63]">
                          Soy apasionada de la pastelería artesanal.
                          <br /><br />
                          Cada receta que preparo está hecha con dedicación, ingredientes de calidad y mucho amor.
                          <br /><br />
                          Disfruto crear momentos dulces e inolvidables para vos y los tuyos.
                          <br /><br />
                          ¡Gracias por confiar en mi trabajo! ❤️
                        </p>
                        <div className="mt-8">
                          <button
                            style={{ fontFamily: "Great Vibes" }}
                            onClick={() => setShowAbout(false)}
                            className="px-6 py-2 rounded-full bg-[#a17a7e] text-2xl text-white hover:bg-[#8c686c] transition-all duration-300 shadow-md"
                          >
                            Cerrar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* ── Indicador del slider ── */}
        <div className="absolute bottom-14 left-1/2 -translate-x-1/2 z-10 flex items-center gap-5">
          {HERO_SLIDES.map((slide, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className="flex flex-col items-center gap-1.5 group"
              aria-label={`Ir a slide ${idx + 1}`}
            >
              {/* Número */}
              <span className={cn(
                "text-xs font-mono font-semibold tracking-widest transition-all duration-300",
                idx === heroIndex ? "text-white" : "text-white/40 group-hover:text-white/70"
              )}>
                {String(idx + 1).padStart(2, "0")}
              </span>
              {/* Barra de progreso */}
              <div className="w-8 h-[2px] rounded-full bg-white/20 overflow-hidden">
                <motion.div
                  className="h-full bg-white rounded-full origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: idx === heroIndex ? heroProgress / 100 : idx < heroIndex ? 1 : 0 }}
                  transition={{ duration: 0.05, ease: "linear" }}
                  style={{ transformOrigin: "left" }}
                />
              </div>
            </button>
          ))}
        </div>

        {/* ── Indicador de scroll ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{ opacity: { delay: 1.2, duration: 0.6 }, y: { delay: 1.2, duration: 2, repeat: Infinity, ease: "easeInOut" } }}
          className="absolute bottom-6 right-6 z-10 text-white/40"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>

      </section>
      <motion.section
  className="py-8 overflow-hidden border-y border-[#ddbabc]/50"
  onClick={() => setDirection(direction * -1)}
>
  <motion.div
  animate={{
    x: direction === 1 ? ["0%", "-50%"] : ["-50%", "0%"],
  }}
  transition={{
    duration: 40,
    repeat: Infinity,
    ease: "linear",
  }}
className="flex gap-7 whitespace-nowrap text-[#a17a7e] text-xl md:text-2xl font-serif font-medium w-max cursor-pointer">
  {[...marqueeItems, ...marqueeItems].map((item, i) => (
    <span key={i} className="flex items-center gap-7">
      {item}
      <span className="text-[#ddbabc]">✦</span>
    </span>
  ))}
</motion.div>
</motion.section>

      {/* ── Catálogo ── */}
<section
  id="catalogo"
  className="
    py-16
    bg-gradient-to-b
    from-[#f7eeee]
    via-[#fdfafa]
    to-white
  "
>       <div className="container px-4 mx-auto">
          <motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
  variants={fadeIn}
  className="
    text-center
    mb-16
    max-w-4xl
    mx-auto
    rounded-[40px]
    border-2
    border-[#ddbabc]
    bg-white/50
    backdrop-blur-sm
    shadow-[0_10px_40px_rgba(161,122,126,0.15)]
    p-8
    md:p-10
    relative
  "
>
  <div className="flex items-center justify-center gap-4 mb-4">
    <div className="h-px w-20 bg-[#c2a1a3]" />
    <span className="text-[#a17a7e] text-2xl">❀</span>
    <div className="h-px w-20 bg-[#c2a1a3]" />
  </div>

  <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
    Nuestro Catálogo
  </h2>

  <p className="text-muted-foreground max-w-2xl mx-auto">
    <span className="text-[#a17a7e] text-2xl">❀</span>Explorá nuestras delicias artesanales.<span className="text-[#a17a7e] text-2xl">❀</span>
  </p>

  <div className="mt-4 text-[#c2a1a3] text-lg">
     
  </div>
</motion.div>

          {/* Category pills */}
          <div className="w-full max-w-3xl mx-auto flex flex-wrap justify-center gap-2 mb-12">
            {CATALOG_CATEGORIES.map(cat => (
              <button
  key={cat.key}
  onClick={() => setActiveCategory(activeCategory === cat.key ? null : cat.key)}
className={cn(
  "rounded-full px-8 py-3 font-semibold tracking-wide transition-all duration-300",
  activeCategory === cat.key
  ? "bg-[#a17a7e] text-white shadow-[0_8px_24px_rgba(161,122,126,0.45)] scale-105"
  : "bg-[#fdfafa] text-[#a17a7e] border border-[#ddbabc] hover:bg-[#c2a1a3] hover:text-white hover:shadow-[0_6px_18px_rgba(161,122,126,0.25)] hover:-translate-y-0.5"
)}
>
  {cat.label}
</button>
            ))}
          </div>

          {/* Expandable product grid */}
          <AnimatePresence initial={false}>
            {activeCategory && (
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {(PRODUCTS_BY_CATEGORY[activeCategory] ?? []).map((item, i) => {
                    const qty = quantities[item.id] ?? 0;
                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <Card className="h-full overflow-hidden border-border/50 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#ddbabc] hover:shadow-[0_18px_45px_-12px_rgba(161,122,126,0.35)] group bg-background/50 backdrop-blur-sm">
                          <div className="aspect-[4/3] overflow-hidden relative">
                            <img
                              src={item.img}
                              alt={item.name}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#a17a7e]/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          </div>
                          <CardHeader>
                            <CardTitle className="font-serif text-xl">{item.name}</CardTitle>
                            <CardDescription className="text-sm line-clamp-2">{item.desc}</CardDescription>
                          </CardHeader>
                          <CardFooter className="flex items-center justify-between border-t border-border/50 pt-4 mt-auto">
                            <span className="font-semibold text-lg text-[#a17a7e] flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#c2a1a3]" />
                              ${item.price.toLocaleString("es-AR")}
                            </span>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => decrement(item.id)}
                                disabled={qty === 0}
                                className={cn(
                                  "w-8 h-8 rounded-full border flex items-center justify-center transition-colors",
                                  qty > 0
                                    ? "border-[#c2a1a3] text-[#a17a7e] hover:bg-[#c2a1a3] hover:text-white"
                                    : "border-border text-muted-foreground opacity-40 cursor-not-allowed"
                                )}
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <AnimatePresence mode="popLayout" initial={false}>
                                <motion.span
                                  key={qty}
                                  initial={{ scale: 0.6, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  exit={{ scale: 0.6, opacity: 0 }}
                                  transition={{ duration: 0.18 }}
                                  className="w-6 text-center font-semibold text-sm tabular-nums inline-block"
                                >
                                  {qty}
                                </motion.span>
                              </AnimatePresence>
                              <button
                                onClick={() => increment(item.id)}
                                className="w-8 h-8 rounded-full border border-[#a17a7e] bg-[#a17a7e] text-white flex items-center justify-center hover:bg-[#8d676b] transition-colors"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Cart strip */}
          <AnimatePresence>
  {cartCount > 0 && (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      className="mt-12 bg-white border border-[#ddbabc] rounded-2xl shadow-lg p-5 flex flex-col sm:flex-row items-center justify-between gap-4"
    >
      <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-start">
        <ShoppingBag className="w-5 h-5 text-[#a17a7e]" />

        <span className="font-semibold text-[#5f3f43]">
          {cartCount} {cartCount === 1 ? "producto" : "productos"} seleccionados
        </span>

        <span className="text-[#c2a1a3] hidden sm:inline">·</span>

        <span className="font-bold text-[#a17a7e] text-lg">
          ${cartTotal.toLocaleString("es-AR")}
        </span>
      </div>

      <div className="flex gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCartOpen(true)}
          className="
  rounded-full
  gap-2
  relative
  bg-[#fdf6f6]
  border-[#ddbabc]
  text-[#a17a7e]
  hover:bg-[#f6ebeb]
  shadow-[0_8px_25px_rgba(161,122,126,0.15)]
"
        >
          Ver pedido
        </Button>

        <Button
          size="sm"
          onClick={sendCartOrder}
          className="
            rounded-full
            gap-2
            bg-[#a17a7e]
            hover:bg-[#8d676b]
            text-white
          "
        >
          <SiWhatsapp className="w-4 h-4" />
          Enviar por WhatsApp
        </Button>
      </div>
    </motion.div>
  )}
</AnimatePresence>
        </div>
      </section>

      {/* ── Galería ── */}
      <section id="galeria" className="py-20 bg-white">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Nuestra Galería</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto flex items-center justify-center gap-2 ">
              <SiInstagram className="text-primary" />
              <span>Seguinos en <a href="#" className="font-semibold hover:text-primary transition-colors">@dulce.palo</a></span>
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 md:gap-6">
            {GALLERY.map((item, i) => (
  <motion.div
    key={item.id}
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay: (i % 3) * 0.1, duration: 0.5 }}
    onClick={() => openGalleryModal(item)}
    className="aspect-square rounded-2xl overflow-hidden group cursor-pointer relative"
  >
    <img
      src={item.images[0]}
      alt={item.name}
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
      <SiInstagram className="text-white w-8 h-8 opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-300 delay-100" />
    </div>
    {item.images.length > 1 && (
      <span className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {item.images.length} fotos
      </span>
    )}
  </motion.div>
))}
          </div>
        </div>
      </section>
      {/* ── Modal de Galería ── */}
{/* ── Modal de Galería ── */}
<AnimatePresence>
  {selectedGalleryItem && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={closeGalleryModal}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/70 backdrop-blur-sm"
    >
      <motion.div
  initial={{ opacity: 0, scale: 0.92 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.92 }}
  transition={{ duration: 0.3, ease: "easeOut" }}
  onClick={(e) => e.stopPropagation()}
  className="relative max-w-3xl w-full"
>
        {/* Imagen activa */}
        <div className="rounded-3xl overflow-hidden shadow-2xl">
  <AnimatePresence mode="wait">
    <motion.img
      key={galleryImageIndex}
      src={selectedGalleryItem.images[galleryImageIndex]}
      alt={selectedGalleryItem.name}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.2 }}
      className="w-full h-auto object-cover"
    />
  </AnimatePresence>
</div>

        {/* Flechas — solo si hay más de 1 imagen */}
        {selectedGalleryItem.images.length > 1 && (
          <>
            <button
              onClick={galleryPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors duration-200"
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={galleryNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors duration-200"
              aria-label="Imagen siguiente"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Navegación debajo de la imagen */}
{selectedGalleryItem.images.length > 1 && (
  <div className="mt-5 flex flex-col items-center gap-3">

    <div className="flex items-center gap-8">
      <button
        onClick={galleryPrev}
        className="text-white hover:text-white/70 transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <span className="text-white text-sm font-medium">
        {galleryImageIndex + 1} / {selectedGalleryItem.images.length}
      </span>

      <button
        onClick={galleryNext}
        className="text-white hover:text-white/70 transition-colors"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>

    <div className="flex gap-2">
      {selectedGalleryItem.images.map((_, idx) => (
        <button
          key={idx}
          onClick={(e) => {
            e.stopPropagation();
            setGalleryImageIndex(idx);
          }}
          className={cn(
            "w-2 h-2 rounded-full transition-all duration-300",
            idx === galleryImageIndex
              ? "bg-white scale-125"
              : "bg-white/40"
          )}
        />
      ))}
    </div>

  </div>
)}

        {/* Botón cerrar */}
        <button
          onClick={closeGalleryModal}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors duration-200"
          aria-label="Cerrar imagen"
        >
          <X className="w-4 h-4" />
        </button>
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
            viewport={{ once: false, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >

            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-5">Pedido Personalizado</h2>
            <p className="text-muted-foreground text-lg mb-12">
              ¿Tenés una celebración especial? Contáctanos para afinar detalles.
            </p>

            <div className="space-y-8">
              <div className="flex gap-4 group">
  <div className="w-14 h-14 rounded-2xl bg-[#fdf6f6] border border-[#ddbabc] shadow-[0_8px_25px_rgba(161,122,126,0.15)] flex items-center justify-center shrink-0 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_12px_30px_rgba(161,122,126,0.3)]">
    <Star className="w-6 h-6 text-[#a17a7e]" fill="currentColor" />
  </div>

  <div>
    <h3 className="font-semibold text-lg text-[#7f5f63]">
      Diseños Únicos
    </h3>

    <p className="text-sm text-muted-foreground">
      Cada pedido especial es diseñado a medida para tu evento.
    </p>
  </div>
</div>

<div className="flex gap-4 group">
  <div className="w-14 h-14 rounded-2xl bg-[#fdf6f6] border border-[#ddbabc] shadow-[0_8px_25px_rgba(161,122,126,0.15)] flex items-center justify-center shrink-0 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_12px_30px_rgba(161,122,126,0.3)]">
    <Clock className="w-6 h-6 text-[#a17a7e]" />
  </div>

  <div>
    <h3 className="font-semibold text-lg text-[#7f5f63]">
      Anticipación
    </h3>

    <p className="text-sm text-muted-foreground">
      Sugerimos realizar pedidos personalizados con 48hs de anticipación.
    </p>
  </div>
</div>
            </div>

            <div className="mt-12 flex flex-col sm:flex-row sm:items-center gap-4">
              <Button
                size="lg"
                onClick={() => openWhatsApp("Hola! Me gustaría hacer un pedido personalizado, ¿Estaria disponible?")}
                className="rounded-full gap-2 h-14 px-8 text-base bg-[#a17a7e] hover:bg-[#8c686c] text-white border-0 shadow-[0_10px_30px_rgba(161,122,126,0.4)] hover:shadow-[0_14px_36px_rgba(161,122,126,0.5)] transition-all duration-300 hover:-translate-y-0.5"
              >
                <SiWhatsapp className="w-5 h-5" />
                Solicitar mi pedido por WhatsApp
              </Button>
              <span
  className="
    inline-flex
    items-center
    gap-2
    px-4
    py-2
    rounded-full
    bg-[#fdf6f6]
    border
    border-[#ddbabc]
    text-[#a17a7e]
    text-sm
    font-medium
  "
>
  ✓ Te Respondemos en el dia
</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Contacto & Footer ── */}
<footer
  id="contacto"
  className="bg-[#a17a7e] text-white pt-12 pb-6 border-t border-white/10"
>
  <div className="container px-4 mx-auto">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">

      <div>
        <h2
          className="text-4xl font-bold mb-3 text-white"
          style={{ fontFamily: "Great Vibes" }}
        >
          Dulce Palo
        </h2>

        <div className="flex gap-3">
          <a
            href="#"
            aria-label="Instagram de Dulce Palo"
            className="w-9 h-9 rounded-full bg-[#c2a1a3] flex items-center justify-center hover:bg-[#ddbabc] hover:text-white hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
          >
            <SiInstagram className="w-4 h-4" />
          </a>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp de Dulce Palo"
            className="w-9 h-9 rounded-full bg-[#c2a1a3] flex items-center justify-center hover:bg-[#25D366] hover:text-white hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
          >
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

      {/* ── Floating Contacto FAB ── */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3"
          >
            {/* Sub-botones */}
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

            {/* Main circular button */}
            <button
              onClick={() => setContactOpen(o => !o)}
              className={cn(
  "w-14 h-14 rounded-full border-2 border-[#fdf6f6] shadow-[0_8px_30px_rgba(0,0,0,0.20)] flex items-center justify-center transition-all duration-300",
  contactOpen
    ? "bg-[#a17a7e] text-white rotate-45"
    : "bg-[#c2a1a3] text-white hover:bg-[#ddbabc] hover:scale-110"
)}
            >
              <Phone className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Cart Drawer ── */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-50"
              onClick={() => setCartOpen(false)}
            />
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="fixed right-0 top-0 h-full w-full max-w-sm bg-[#fdfafa] z-50 shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-5 border-b">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#a17a7e]" />
                  <h3 className="font-serif text-xl font-bold">Tu Pedido ({cartCount})</h3>
                </div>
                <button
                  onClick={() => setCartOpen(false)}
                  className="p-2 hover:bg-secondary rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {cartItems.length === 0 ? (
                  <p className="text-muted-foreground text-center py-12">No hay productos seleccionados.</p>
                ) : (
                  cartItems.map(item => (
                    <div key={item.id} className="flex items-center gap-3">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-14 h-14 rounded-xl object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm truncate">{item.name}</div>
                        <div className="text-[#a17a7e] font-semibold text-sm">
                          ${(item.price * (quantities[item.id] ?? 0)).toLocaleString("es-AR")}
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => decrement(item.id)}
                          className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:border-[#a17a7e] hover:text-[#a17a7e] transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-5 text-center text-sm font-semibold tabular-nums">
                          {quantities[item.id]}
                        </span>
                        <button
                          onClick={() => increment(item.id)}
className="w-7 h-7 rounded-full border border-[#a17a7e] bg-[#a17a7e] text-white flex items-center justify-center hover:bg-[#8c686c] transition-colors"                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="p-5 border-t border-[#ddbabc] bg-[#f8f3f3]">
                  <button
                    onClick={clearCart}
                    className="w-full text-sm text-muted-foreground hover:text-destructive transition-colors mb-3 text-center"
                  >
                    Borrar todo
                  </button>
                  <div className="flex justify-between mb-4">
                    <span className="text-muted-foreground">Total estimado</span>
                    <span className="font-bold text-xl text-[#a17a7e]">${cartTotal.toLocaleString("es-AR")}</span>
                  </div>
                  <Button
  className="w-full rounded-full gap-2 text-base h-12 bg-[#a17a7e] hover:bg-[#8c686c] text-white border-0 shadow-[0_8px_25px_rgba(161,122,126,0.35)]"
  onClick={sendCartOrder}
>
                    <SiWhatsapp className="w-5 h-5" />
                    Enviar Pedido por WhatsApp
                  </Button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
