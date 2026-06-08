import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Star, MapPin, Clock, Plus, Minus, ShoppingBag, X, Phone, Heart } from "lucide-react";
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
  tortaChocImg, tortaRedVelvetImg, macaronsImg,
  cheeseFrutosImg, cupcakesLimonImg, tortaVainillaImg,
  cupcakesOreoImg, cheeseDulceImg, cupcakesRainbowImg,
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
  const marqueeItems = [
  "🌸 Hecho con amor",
  "🍰 Tortas personalizadas",
  "🧁 Cupcakes artesanales",
  "💖 Dulces momentos",
  "🎂 Eventos especiales",
  "✨ Repostería creativa",
];

  const cartItems = ALL_PRODUCTS.filter(p => (quantities[p.id] ?? 0) > 0);
  const cartTotal = cartItems.reduce((sum, p) => sum + p.price * (quantities[p.id] ?? 0), 0);
  const cartCount = cartItems.reduce((sum, p) => sum + (quantities[p.id] ?? 0), 0);

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
  className="font-serif text-4xl font-bold text-[#9b7ac7]"
  style={{ fontFamily: "Great Vibes" }}
>
  Pasteleria
</span>
            <motion.button
              key={heartBeat}
              onClick={() => setHeartBeat(n => n + 1)}
              animate={heartBeat > 0 ? { scale: [1, 1.45, 0.9, 1.2, 1] } : {}}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="focus:outline-none"
              aria-label="Corazón"
            >
              <Heart
  className={cn(
    "w-4 h-4 transition-colors duration-300",
    heartBeat > 0
      ? "fill-[#9b7ac7] text-[#9b7ac7]"
      : "text-[#9b7ac7]/50"
  )}
/>
            </motion.button>
          </div>

          <nav className="hidden lg:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
  "text-lg font-medium transition-colors duration-300 hover:text-[#cbafec]",
  activeSection === link.href.substring(1)
    ? "text-[#7f5fb1] font-semibold"
    : "text-[#8f6fc0]"
)}
              >
                {link.label}
              </a>
            ))}
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
                    <span className="absolute -top-1.5 -right-1.5 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
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
        <div className="absolute inset-0 z-0">
          <img
  src={heroBackground}
  alt="Dulce Palo Pastelería"
  className="w-full h-full object-cover object-[center_60%] opacity-70"
/>
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background/90" />
        </div>

        <div className="container relative z-10 px-4 py-20 md:py-32 flex flex-col items-center text-center max-w-4xl mx-auto">
            <motion.img
            /* ── LOGO PRINCIPAL ── */
  src={logoImg}
  alt="Dulce Palo"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.2 }}
  className="w-[650px] md:w-[650px] lg:w-[750px] h-auto mb-0"
/>
          <motion.p
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.4 }}
  className="text-lg md:text-3xl text-[#8f6fc0] mb-10 max-w-2xl font-light -mt-4"
  style={{ fontFamily: "Great Vibes" }}
>
  Cada bocado, una obra de arte.
</motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex gap-4"
          >
            <Button
  size="icon"
  className="w-14 h-14 rounded-full bg-[#cbafec] text-white shadow-[0_8px_25px_rgba(203,175,236,0.35)] hover:bg-[#b999e4] hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              onClick={() => openWhatsApp("Hola! Me gustaría hacer un pedido.")}
              title="Pedir por WhatsApp"
            >
              <SiWhatsapp className="w-6 h-6" />
            </Button>
            <Button
  size="icon"
  variant="outline"
  className="w-14 h-14 rounded-full bg-[#faf7ff] border-[#e5d8f7] text-[#8f6fc0] shadow-[0_8px_25px_rgba(203,175,236,0.20)] hover:bg-[#f4ecff] hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm"
              onClick={makeCall}
              title="Llamar"
            >
              <Phone className="w-6 h-6" />
            </Button>
          </motion.div>
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

          window.scrollTo({
            top: element.offsetTop + (isMobile ? 20 : -320),
            behavior: "smooth",
          });
        }
      }, 350);
    }
  }}
  className="text-3xl text-[#9b7ac7] hover:text-[#7f5fb1] transition-all duration-300 hover:scale-105"
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
      transition={{ duration: 0.6, }}
      className="overflow-hidden mt-8 w-full"
    >
      <div className="max-w-5xl mx-auto bg-[#fff9f7] rounded-[32px] shadow-lg p-8 md:p-10">

        <div className="grid md:grid-cols-2 gap-8 items-center">

          {/* FOTO TEMPORAL */}
          <div className="flex justify-center">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-pink-100 flex items-center justify-center text-pink-400 text-lg">
            </div>
          </div>
          {/* TEXTO */}
          <div>
            
            <div className="text-primary text-xl mb-6">
              🌸
            </div>

            <p className="text-[#8f6fc0]">
              Soy apasionada de la pastelería artesanal.
              <br />
              <br />
              Cada receta que preparo está hecha con dedicación,
              ingredientes de calidad y mucho amor.
              <br />
              <br />
              Disfruto crear momentos dulces e inolvidables
              para vos y los tuyos.
              <br />
              <br />
              ¡Gracias por confiar en mi trabajo! ❤️
            </p>
            <div className="mt-8">
  <button
  style={{ fontFamily: "Great Vibes" }}
    onClick={() => setShowAbout(false)}
  className="px-6 py-2 rounded-full bg-[#cbafec] text-2xl text-white hover:bg-[#b999e4] transition-all duration-300 shadow-md">
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
      </section>
      <motion.section
  className="py-8 overflow-hidden"
  onClick={() => setDirection(direction * -1)}
>
  <motion.div
  animate={{
    x: direction === 1 ? [0, -1200] : [-1200, 0],
  }}
  transition={{
    duration: 40,
    repeat: Infinity,
    ease: "linear",
  }}
className="flex gap-7 whitespace-nowrap text-[#7f5fb1] text-2xl md:text-2xl font-serif font-medium ">
  <span>🌸 Hecho con amor</span>
  <span>🍰 Tortas personalizadas</span>
  <span>🎁 Regalos que enamoran</span>
  <span>🧁 Cupcakes artesanales</span>
  <span>🤍 Cada detalle importa</span>
  <span>💖 Dulces momentos</span>
  <span>🎂 Eventos especiales</span>
<span>🎀 Hecho especialmente para vos</span>
  <span>🌸 Hecho con amor</span>
  <span>🎁 Regalos que enamoran</span>
  <span>🍰 Tortas personalizadas</span>
  <span>🧁 Cupcakes artesanales</span>
  <span>💖 Dulces momentos</span>
  <span>🤍 Cada detalle importa</span>
  <span>🎂 Eventos especiales</span>
  <span>🎀 Hecho especialmente para vos</span>
  <span>✨ Repostería creativa</span>
  <span>🎁 Regalos que enamoran</span>
  <span>🌸 Hecho con amor</span>
  <span>🍰 Tortas personalizadas</span>
  <span>🧁 Cupcakes artesanales</span>
  <span>💖 Dulces momentos</span>
  <span>🎀 Hecho especialmente para vos</span>
  <span>🤍 Cada detalle importa</span>
  <span>🎂 Eventos especiales</span>
  <span>✨ Repostería creativa</span>
  <span>🎁 Regalos que enamoran</span>
</motion.div>
</motion.section>

      {/* ── Catálogo ── */}
<section
  id="catalogo"
  className="
    py-16
    bg-gradient-to-b
    from-[#efe3ff]
    via-[#faf7ff]
    to-white
  "
>        <div className="container px-4 mx-auto">
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
    border-[#d8c3f1]
    bg-white/50
    backdrop-blur-sm
    shadow-[0_10px_40px_rgba(203,175,236,0.18)]
    p-8
    md:p-10
    relative
  "
>
  <div className="flex items-center justify-center gap-4 mb-4">
    <div className="h-px w-20 bg-[#cbafec]" />
    <span className="text-[#9b7ac7] text-2xl">❀</span>
    <div className="h-px w-20 bg-[#cbafec]" />
  </div>

  <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
    Nuestro Catálogo
  </h2>

  <p className="text-muted-foreground max-w-2xl mx-auto">
    Explorá nuestras delicias artesanales, elaboradas diariamente con ingredientes seleccionados y mucho amor.
  </p>

  <div className="mt-4 text-[#cbafec] text-lg">
    ♡ ♡ ♡
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
    ? "bg-[#7f5fb1] text-white shadow-xl scale-105"
    : "bg-[#faf7ff] text-[#8f6fc0] border border-[#e5d8f7] hover:bg-[#cbafec] hover:text-white"
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
                        <Card className="h-full overflow-hidden border-border/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group bg-background/50 backdrop-blur-sm">
                          <div className="aspect-[4/3] overflow-hidden">
                            <img
                              src={item.img}
                              alt={item.name}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                          </div>
                          <CardHeader>
                            <CardTitle className="font-serif text-xl">{item.name}</CardTitle>
                            <CardDescription className="text-sm line-clamp-2">{item.desc}</CardDescription>
                          </CardHeader>
                          <CardFooter className="flex items-center justify-between border-t border-border/50 pt-4 mt-auto">
                            <span className="font-semibold text-lg">${item.price.toLocaleString("es-AR")}</span>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => decrement(item.id)}
                                disabled={qty === 0}
                                className={cn(
                                  "w-8 h-8 rounded-full border flex items-center justify-center transition-colors",
                                  qty > 0
                                    ? "border-primary text-primary hover:bg-primary hover:text-white"
                                    : "border-border text-muted-foreground opacity-40 cursor-not-allowed"
                                )}
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="w-6 text-center font-semibold text-sm tabular-nums">{qty}</span>
                              <button
                                onClick={() => increment(item.id)}
                                className="w-8 h-8 rounded-full border border-primary bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-colors"
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
                className="mt-12 bg-white border border-primary/20 rounded-2xl shadow-lg p-5 flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-start">
                  <ShoppingBag className="w-5 h-5 text-primary shrink-0" />
                  <span className="font-semibold">
                    {cartCount} {cartCount === 1 ? "producto" : "productos"} seleccionados
                  </span>
                  <span className="text-muted-foreground hidden sm:inline">·</span>
                  <span className="font-bold text-primary text-lg">${cartTotal.toLocaleString("es-AR")}</span>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm" className="rounded-full" onClick={() => setCartOpen(true)}>
                    Ver pedido
                  </Button>
                  <Button size="sm" className="rounded-full gap-2" onClick={sendCartOrder}>
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
      <section id="galeria" className="py-0 bg-white">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Nuestra Galería</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto flex items-center justify-center gap-2 ">
              <SiInstagram className="text-primary" />
              <span>Seguinos en <a href="#" className="font-semibold hover:text-primary transition-colors">@dulce.palo</a></span>
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 md:gap-6">
            {GALLERY.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.1, duration: 0.5 }}
                className="aspect-square rounded-2xl overflow-hidden group cursor-pointer relative"
              >
                <img
                  src={img}
                  alt={`Galería ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <SiInstagram className="text-white w-8 h-8 opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-300 delay-100" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pedido Personalizado ── */}
      <section id="pedido" className="py-24 bg-secondary/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="container px-4 mx-auto relative z-10 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Pedido Personalizado</h2>
            <p className="text-muted-foreground text-lg mb-8">
              ¿Tenés una celebración especial? Contanos para afinar detalles.
            </p>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-[#faf7ff] border border-[#e5d8f7] shadow-[0_4px_15px_rgba(203,175,236,0.35)] flex items-center justify-center shrink-0 text-[#9b7ac7]">
                  <Star className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Diseños Únicos</h3>
                  <p className="text-sm text-muted-foreground">Cada pedido especial es diseñado a medida para tu evento.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-[#faf7ff] border border-[#e5d8f7] shadow-[0_4px_15px_rgba(203,175,236,0.35)] flex items-center justify-center shrink-0 text-[#9b7ac7]">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Anticipación</h3>
                  <p className="text-sm text-muted-foreground">Sugerimos realizar pedidos personalizados con 48hs de anticipación.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Contacto & Footer ── */}
<footer
  id="contacto"
  className="bg-[#7f5fb1] text-white pt-7 pb-5"
>        <div className="container px-4 mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
            <div>
              <h2 className="text-2xl font-serif font-bold mb-2 text-primary-foreground">Dulce Palo</h2>
              <div className="flex gap-3">
                <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                  <SiInstagram className="w-4 h-4" />
                </a>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-colors"
                >
                  <SiWhatsapp className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2 text-white/70 text-sm">
<MapPin className="w-4 h-4 text-white shrink-0" />              <span>Monteros, Tucumán, Argentina</span>
            </div>
          </div>

          <div className="border-t border-white/10 pt-4 text-center text-sm text-white/50">
            © {new Date().getFullYear()} Dulce Palo Pastelería. Todos los derechos reservados.
          </div>
        </div>
      </footer>

      {/* ── Floating Contact FAB ── */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3"
          >
            {/* Sub-buttons */}
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
                    className="flex items-center gap-2 bg-[#faf7ff] text-[#8f6fc0] border border-[#e5d8f7] rounded-full px-4 py-2.5 shadow-[0_8px_25px_rgba(203,175,236,0.25)] hover:bg-[#f4ecff] transition-all duration-300 text-sm font-semibold"
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
                "w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300",
                contactOpen
                  ? "bg-[#8f6fc0] text-white rotate-45"
                  : "bg-[#cbafec] text-white hover:bg-[#b999e4] hover:scale-110 shadow-[0_8px_25px_rgba(203,175,236,0.35)]"
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
              className="fixed right-0 top-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-5 border-b">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-primary" />
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
                        <div className="text-primary font-semibold text-sm">
                          ${(item.price * (quantities[item.id] ?? 0)).toLocaleString("es-AR")}
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => decrement(item.id)}
                          className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-5 text-center text-sm font-semibold tabular-nums">
                          {quantities[item.id]}
                        </span>
                        <button
                          onClick={() => increment(item.id)}
                          className="w-7 h-7 rounded-full border border-primary bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="p-5 border-t bg-secondary/20">
                  <button
                    onClick={clearCart}
                    className="w-full text-sm text-muted-foreground hover:text-destructive transition-colors mb-3 text-center"
                  >
                    Borrar todo
                  </button>
                  <div className="flex justify-between mb-4">
                    <span className="text-muted-foreground">Total estimado</span>
                    <span className="font-bold text-xl text-primary">${cartTotal.toLocaleString("es-AR")}</span>
                  </div>
                  <Button
                    className="w-full rounded-full gap-2 text-base h-12 shadow-lg"
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
