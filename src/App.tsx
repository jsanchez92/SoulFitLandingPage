import { useEffect, useState } from 'react';
import {
  Dumbbell,
  Users,
  Clock,
  Flame,
  MapPin,
  Phone,
  Instagram,
  Facebook,
  Twitter,
  ChevronRight,
  Star,
  CheckCircle2,
  Menu,
  X,
  Bike,
  Calendar,
  Zap,
  Heart,
  Trophy,
  Camera
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

type GymArea = {
  title: string;
  description: string;
  imageBase: string;
  width: number;
  height: number;
  featured?: boolean;
};

const galleryAreas: GymArea[] = [
  {
    title: 'Cardio Track',
    description: 'Caminadoras, elipticas y pista funcional bajo iluminacion azul neon.',
    imageBase: '/images/gallery/cardio-track',
    width: 1280,
    height: 1707,
    featured: true,
  },
  {
    title: 'Zona de Pesas',
    description: 'Mancuernas, bancos y estaciones para entrenamientos de fuerza.',
    imageBase: '/images/gallery/pesas',
    width: 1280,
    height: 1706,
  },
  {
    title: 'Maquinas Guiadas',
    description: 'Equipos de acero con acentos rojos para trabajo muscular preciso.',
    imageBase: '/images/gallery/maquinas',
    width: 1280,
    height: 1706,
  },
  {
    title: 'Spinning',
    description: 'Sesiones intensas con luces frias y energia de alto rendimiento.',
    imageBase: '/images/gallery/spinning',
    width: 1280,
    height: 1706,
  },
  {
    title: 'Zona Funcional',
    description: 'Track, barras, cuerdas y espacio abierto para moverte sin limites.',
    imageBase: '/images/gallery/funcional',
    width: 1280,
    height: 1707,
  },
  {
    title: 'Recepcion y Lockers',
    description: 'Ingreso, lockers y areas comunes con acabado industrial premium.',
    imageBase: '/images/gallery/recepcion',
    width: 1280,
    height: 1706,
  },
];

function GalleryImage({ area }: { area: GymArea }) {
  const [useFallback, setUseFallback] = useState(false);
  const imageClassName = 'h-full w-full object-cover transition duration-700 group-hover:scale-105';
  const imageSizes = area.featured
    ? '(min-width: 1024px) 50vw, (min-width: 640px) 100vw, 100vw'
    : '(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw';

  if (useFallback) {
    return (
      <img
        src={`${area.imageBase}.jpg`}
        alt={area.title}
        width={area.width}
        height={area.height}
        loading="lazy"
        decoding="async"
        className={imageClassName}
      />
    );
  }

  return (
    <picture>
      <source
        type="image/avif"
        srcSet={`${area.imageBase}-640.avif 640w, ${area.imageBase}-960.avif 960w, ${area.imageBase}-1280.avif 1280w`}
        sizes={imageSizes}
      />
      <source
        type="image/webp"
        srcSet={`${area.imageBase}-640.webp 640w, ${area.imageBase}-960.webp 960w, ${area.imageBase}-1280.webp 1280w`}
        sizes={imageSizes}
      />
      <img
        src={`${area.imageBase}.jpg`}
        alt={area.title}
        width={area.width}
        height={area.height}
        loading="lazy"
        decoding="async"
        onError={() => setUseFallback(true)}
        className={imageClassName}
      />
    </picture>
  );
}

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'Inicio', id: 'hero' },
    { name: 'Nosotros', id: 'about' },
    { name: 'Áreas', id: 'gallery' },
    { name: 'Planes', id: 'services' },
    { name: 'Beneficios', id: 'benefits' },
    { name: 'Testimonios', id: 'testimonials' },
    { name: 'Contacto', id: 'contact' },
  ];

  const generalPlans = [
    { name: 'Diario', price: 180, period: 'día', popular: false },
    { name: 'Semanal', price: 550, period: 'semana', popular: false },
    { name: 'Quincenal', price: 730, period: 'quincena', popular: false },
    { name: 'Mensual', price: 1300, period: 'mes', popular: true },
    { name: 'Personalizado', price: 3700, period: 'mes', popular: false },
    { name: 'Combo Mensual', price: 2220, period: 'mes', popular: false },
  ];

  const spinningPlans = [
    { name: 'Diario', price: 180, period: 'día', popular: false },
    { name: 'Semanal', price: 550, period: 'semana', popular: false },
    { name: 'Quincenal', price: 730, period: 'quincena', popular: false },
    { name: 'Mensual', price: 1300, period: 'mes', popular: true },
  ];

  const morningHours = ['5:00 am', '6:00 am', '7:00 am', '8:00 am'];
  const eveningHours = ['5:00 pm', '6:00 pm', '7:00 pm', '8:00 pm'];

  const benefits = [
    { icon: Dumbbell, title: 'Equipos Modernos', desc: 'Maquinaria de última generación para tu entrenamiento' },
    { icon: Users, title: 'Entrenadores Certificados', desc: 'Profesionales expertos para guiar tu progreso' },
    { icon: Bike, title: 'Clases de Spinning', desc: 'Sesiones energéticas con los mejores instructores' },
    { icon: Flame, title: 'Ambiente Motivador', desc: 'Un espacio diseñado para superar tus límites' },
  ];

  const testimonials = [
    { name: 'María González', role: 'Miembro desde 2023', text: 'Soulfit cambió mi vida. Los entrenadores son increíbles y el ambiente me mantiene motivada todos los días.', rating: 5 },
    { name: 'Carlos Ruiz', role: 'Miembro desde 2024', text: 'El mejor gimnasio de la ciudad. Los equipos son de primera y las clases de spinning son épicas.', rating: 5 },
    { name: 'Ana Martínez', role: 'Miembro desde 2023', text: 'Increíble comunidad. He logrado resultados que nunca pensé posibles gracias al apoyo de todos.', rating: 5 },
  ];

  return (
    <div className="min-h-screen bg-[#05070a] text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-lg border-b border-white/10' : 'bg-transparent'}`}>
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center">
              <img src="/logo.avif" alt="Soulfit" className="h-12 md:h-16 w-auto object-contain" />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-sm font-medium text-white/70 hover:text-white transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#00d9ff] to-[#e11d2e] transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </div>

            <div className="hidden md:block">
              {/* <Button
                onClick={() => scrollToSection('services')}
                className="bg-gradient-to-r from-[#00d9ff] to-[#00b8d9] hover:from-[#00b8d9] hover:to-[#0094b3] text-white font-semibold px-6"
              >
                Únete Ahora
              </Button> */}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-lg border-t border-white/10">
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="block w-full text-left py-2 text-white/70 hover:text-white transition-colors"
                >
                  {link.name}
                </button>
              ))}
              {/* <Button
                onClick={() => scrollToSection('services')}
                className="w-full bg-gradient-to-r from-[#00d9ff] to-[#00b8d9] text-white font-semibold mt-4"
              >
                Únete Ahora
              </Button> */}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/soulfit-hero.jpg"
            alt="Gym Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#05070a]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#00d9ff]/10 to-[#e11d2e]/10" />
        </div>

        <div className={`relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto transition-all duration-1000 ${visibleSections.has('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Badge className="mb-6 bg-white/10 text-white border-white/20 backdrop-blur-sm px-4 py-1.5 text-sm">
            <Zap className="w-4 h-4 mr-2 text-[#00d9ff]" />
            Transforma tu vida hoy
          </Badge>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6">
            <span className="text-white">Soul</span>
            <span className="text-gradient">fit</span>
          </h1>

          <p className="text-xl sm:text-2xl md:text-3xl text-white/90 font-light mb-4 max-w-3xl mx-auto leading-relaxed">
            Transforma tu cuerpo, fortalece tu mente
          </p>

          <p className="text-base sm:text-lg text-white/60 mb-10 max-w-2xl mx-auto">
            Únete a la comunidad fitness más motivadora. Equipos de última generación,
            entrenadores expertos y resultados garantizados.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => scrollToSection('services')}
              className="bg-gradient-to-r from-[#00d9ff] to-[#00b8d9] hover:from-[#00b8d9] hover:to-[#0094b3] text-white font-bold text-lg px-8 py-6 animate-pulse-glow"
            >
              Ver Planes
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection('about')}
              className="border-white/30 text-white hover:bg-white/10 font-semibold text-lg px-8 py-6"
            >
              Conócenos
            </Button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className={`max-w-7xl mx-auto transition-all duration-1000 ${visibleSections.has('about') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <Badge className="mb-4 bg-[#00d9ff]/20 text-[#00d9ff] border-[#00d9ff]/30">
                Sobre Nosotros
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Más que un gimnasio, <span className="text-gradient">una comunidad</span>
              </h2>
              <p className="text-white/70 text-lg leading-relaxed mb-6">
                En Soulfit creemos que el fitness es más que levantar pesas. Es un estilo de vida
                que transforma cuerpos y mentes. Desde 2023, hemos ayudado a miles de personas
                a alcanzar sus objetivos de salud y bienestar.
              </p>
              <p className="text-white/70 text-lg leading-relaxed mb-8">
                Nuestro enfoque combina entrenamiento de alta intensidad, nutrición personalizada
                y un ambiente de apoyo donde cada miembro es parte de nuestra familia.
              </p>

              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-[#00d9ff]">5K+</div>
                  <div className="text-sm text-white/60 mt-1">Miembros</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-[#e11d2e]">50+</div>
                  <div className="text-sm text-white/60 mt-1">Entrenadores</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-[#00d9ff]">15+</div>
                  <div className="text-sm text-white/60 mt-1">Clases</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#00d9ff]/20 to-[#e11d2e]/20 rounded-3xl blur-2xl" />
              <div className="relative grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="glass rounded-2xl p-6 hover-lift">
                    <Heart className="w-10 h-10 text-[#e11d2e] mb-4" />
                    <h3 className="font-bold text-lg mb-2">Salud Primero</h3>
                    <p className="text-white/60 text-sm">Tu bienestar es nuestra prioridad</p>
                  </div>
                  <div className="glass rounded-2xl p-6 hover-lift">
                    <Trophy className="w-10 h-10 text-[#00d9ff] mb-4" />
                    <h3 className="font-bold text-lg mb-2">Disciplina</h3>
                    <p className="text-white/60 text-sm">Constancia para lograr tus metas</p>
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="glass rounded-2xl p-6 hover-lift">
                    <Users className="w-10 h-10 text-[#e11d2e] mb-4" />
                    <h3 className="font-bold text-lg mb-2">Comunidad</h3>
                    <p className="text-white/60 text-sm">Juntos somos más fuertes</p>
                  </div>
                  <div className="glass rounded-2xl p-6 hover-lift">
                    <Zap className="w-10 h-10 text-[#00d9ff] mb-4" />
                    <h3 className="font-bold text-lg mb-2">Energía</h3>
                    <p className="text-white/60 text-sm">Ambiente motivador 24/7</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 xl:px-12 bg-gradient-to-b from-[#05070a] via-[#101820] to-[#05070a]">
        <div className={`max-w-7xl mx-auto transition-all duration-1000 ${visibleSections.has('gallery') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <Badge className="mb-4 bg-[#00d9ff]/15 text-[#66ecff] border-[#00d9ff]/35">
                <Camera className="mr-2 h-4 w-4" />
                Areas del gimnasio
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Conoce nuestras <span className="text-gradient">areas</span>
              </h2>
              <p className="text-white/65 text-lg leading-relaxed">
                Espacios oscuros, acero, luces frias y maquinas listas para entrenamientos intensos:
                cardio, pesas, spinning, funcional y areas comunes.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center md:min-w-80">
              <div className="border border-white/10 bg-white/[0.03] p-4">
                <div className="text-2xl font-black text-[#00d9ff]">6</div>
                <p className="text-xs uppercase tracking-[0.18em] text-white/45">Zonas</p>
              </div>
              <div className="border border-white/10 bg-white/[0.03] p-4">
                <div className="text-2xl font-black text-white">24/7</div>
                <p className="text-xs uppercase tracking-[0.18em] text-white/45">Acceso</p>
              </div>
              <div className="border border-white/10 bg-white/[0.03] p-4">
                <div className="text-2xl font-black text-[#e11d2e]">Pro</div>
                <p className="text-xs uppercase tracking-[0.18em] text-white/45">Equipo</p>
              </div>
            </div>
          </div>

          <div className="grid auto-rows-[260px] gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[300px]">
            {galleryAreas.map((area) => (
              <article
                key={area.title}
                className={`group relative overflow-hidden border border-white/10 bg-[#0b1117] shadow-[0_20px_60px_rgba(0,0,0,0.35)] ${area.featured ? 'sm:col-span-2 lg:row-span-2' : ''}`}
              >
                <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-[#101820] via-[#121b23] to-[#05070a]" />
                <GalleryImage area={area} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                  <div className="mb-3 h-px w-16 bg-[#00d9ff] shadow-[0_0_18px_rgba(0,217,255,0.9)]" />
                  <h3 className="text-xl font-bold text-white md:text-2xl">{area.title}</h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-white/70">{area.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 xl:px-12 bg-gradient-to-b from-[#05070a] via-[#101820] to-[#05070a]">
        <div className={`max-w-7xl mx-auto transition-all duration-1000 ${visibleSections.has('services') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-[#e11d2e]/20 text-[#e11d2e] border-[#e11d2e]/30">
              Servicios y Planes
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Elige tu <span className="text-gradient">plan ideal</span>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Precios accesibles para todos. Encuentra el plan que se adapte a tus necesidades y comienza tu transformación.
            </p>
          </div>

          {/* General Plans */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <Dumbbell className="w-6 h-6 text-[#00d9ff]" />
              Planes Generales
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {generalPlans.map((plan, index) => (
                <Card
                  key={index}
                  className={`relative bg-[#111] border-white/10 hover-lift overflow-hidden ${plan.popular ? 'ring-2 ring-[#00d9ff]' : ''}`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-[#00d9ff] text-black text-xs font-bold px-3 py-1 rounded-bl-lg">
                      POPULAR
                    </div>
                  )}
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-bold text-white">{plan.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-baseline gap-1 mb-4">
                      <span className="text-4xl font-black text-[#00d9ff]">C${plan.price}</span>
                      <span className="text-white/50">/{plan.period}</span>
                    </div>
                    {/* <Button
                      className={`w-full ${plan.popular ? 'bg-[#00d9ff] hover:bg-[#00b8d9] text-black' : 'bg-white/10 hover:bg-white/20 text-white'}`}
                    >
                      Seleccionar
                    </Button> */}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Spinning Section */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <Bike className="w-6 h-6 text-[#e11d2e]" />
              Spinning
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {spinningPlans.map((plan, index) => (
                <Card
                  key={index}
                  className={`relative bg-[#111] border-white/10 hover-lift overflow-hidden ${plan.popular ? 'ring-2 ring-[#e11d2e]' : ''}`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-[#e11d2e] text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                      POPULAR
                    </div>
                  )}
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-bold text-white">{plan.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-baseline gap-1 mb-4">
                      <span className="text-4xl font-black text-[#e11d2e]">C${plan.price}</span>
                      <span className="text-white/50">/{plan.period}</span>
                    </div>
                    {/* <Button
                      className={`w-full ${plan.popular ? 'bg-[#e11d2e] hover:bg-[#b91c2b] text-white' : 'bg-white/10 hover:bg-white/20 text-white'}`}
                    >
                      Seleccionar
                    </Button> */}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Horarios */}
            <Card className="bg-[#111] border-white/10">
              <CardHeader>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#00d9ff]" />
                  Horarios Disponibles
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-white/80 mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#00d9ff] rounded-full" />
                      Mañana
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {morningHours.map((hour, idx) => (
                        <Badge key={idx} variant="secondary" className="bg-white/5 text-white/70 px-3 py-1">
                          {hour}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white/80 mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#e11d2e] rounded-full" />
                      Tarde
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {eveningHours.map((hour, idx) => (
                        <Badge key={idx} variant="secondary" className="bg-white/5 text-white/70 px-3 py-1">
                          {hour}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Combo Especial */}
          <Card className="bg-gradient-to-r from-[#00d9ff]/10 to-[#e11d2e]/10 border-[#00d9ff]/30">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00d9ff] to-[#e11d2e] flex items-center justify-center">
                    <Calendar className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Combo Mensual por Horario</h3>
                    <p className="text-white/60">Acceso ilimitado + Spinning en tu horario preferido</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <span className="text-4xl font-black text-gradient">C$2,200</span>
                    <span className="text-white/50">/mes</span>
                  </div>
                  {/* <Button className="bg-gradient-to-r from-[#00d9ff] to-[#e11d2e] hover:opacity-90 text-white font-bold px-8 py-6">
                    Contratar
                  </Button> */}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className={`max-w-7xl mx-auto transition-all duration-1000 ${visibleSections.has('benefits') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-[#00d9ff]/20 text-[#00d9ff] border-[#00d9ff]/30">
              Beneficios
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              ¿Por qué elegir <span className="text-gradient">Soulfit</span>?
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Te ofrecemos todo lo que necesitas para alcanzar tus objetivos fitness
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="bg-[#111] border-white/10 hover-lift group">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#00d9ff]/20 to-[#e11d2e]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <benefit.icon className="w-8 h-8 text-[#00d9ff]" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                  <p className="text-white/60">{benefit.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-6">
            <div className="glass rounded-2xl p-6 flex items-center gap-4">
              <CheckCircle2 className="w-8 h-8 text-[#00d9ff] flex-shrink-0" />
              <div>
                <h4 className="font-bold">Sin contratos forzosos</h4>
                <p className="text-white/60 text-sm">Cancela cuando quieras</p>
              </div>
            </div>
            <div className="glass rounded-2xl p-6 flex items-center gap-4">
              <CheckCircle2 className="w-8 h-8 text-[#00d9ff] flex-shrink-0" />
              <div>
                <h4 className="font-bold">Acceso 24/7</h4>
                <p className="text-white/60 text-sm">Entrena a cualquier hora</p>
              </div>
            </div>
            <div className="glass rounded-2xl p-6 flex items-center gap-4">
              <CheckCircle2 className="w-8 h-8 text-[#00d9ff] flex-shrink-0" />
              <div>
                <h4 className="font-bold">Vestuarios premium</h4>
                <p className="text-white/60 text-sm">Con lockers y regaderas</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 xl:px-12 bg-gradient-to-b from-[#05070a] via-[#101820] to-[#05070a]">
        <div className={`max-w-7xl mx-auto transition-all duration-1000 ${visibleSections.has('testimonials') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-[#e11d2e]/20 text-[#e11d2e] border-[#e11d2e]/30">
              Testimonios
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Lo que dicen <span className="text-gradient">nuestros miembros</span>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Historias reales de transformación y éxito
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-[#111] border-white/10 hover-lift">
                <CardContent className="p-8">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-[#00d9ff] text-[#00d9ff]" />
                    ))}
                  </div>
                  <p className="text-white/80 text-lg mb-6 leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  <Separator className="bg-white/10 mb-4" />
                  <div>
                    <p className="font-bold text-white">{testimonial.name}</p>
                    <p className="text-white/50 text-sm">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-5xl mx-auto">
          <Card className="relative overflow-hidden bg-gradient-to-br from-[#00d9ff]/20 via-[#111] to-[#e11d2e]/20 border-white/10">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0aDR2NGgtNHpNMjAgMjBoNHY0aC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
            <CardContent className="relative p-12 md:p-16 text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Empieza hoy en <span className="text-gradient">Soulfit</span>
              </h2>
              <p className="text-white/70 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
                No esperes más para transformar tu vida. Únete ahora y obtén tu primera semana
                con 50% de descuento.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={() => scrollToSection('contact')}
                  className="bg-gradient-to-r from-[#00d9ff] to-[#00b8d9] hover:from-[#00b8d9] hover:to-[#0094b3] text-white font-bold text-lg px-8 py-6 animate-pulse-glow"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Contáctanos Ahora
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => scrollToSection('services')}
                  className="border-white/30 text-white hover:bg-white/10 font-semibold text-lg px-8 py-6"
                >
                  Ver Planes
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 xl:px-12 bg-gradient-to-b from-[#05070a] to-[#030405]">
        <div className={`max-w-7xl mx-auto transition-all duration-1000 ${visibleSections.has('contact') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-[#00d9ff]/20 text-[#00d9ff] border-[#00d9ff]/30">
              Contacto
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Conecta con <span className="text-gradient">nosotros</span>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Estamos aquí para ayudarte. Contáctanos por cualquiera de nuestros canales.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="bg-[#111] border-white/10 hover-lift text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#00d9ff]/20 flex items-center justify-center">
                  <Phone className="w-8 h-8 text-[#00d9ff]" />
                </div>
                <h3 className="text-xl font-bold mb-2">WhatsApp</h3>
                <p className="text-white/60 mb-4">Escríbenos para más información</p>
                <Button variant="outline" className="border-[#00d9ff]/50 text-[#00d9ff] hover:bg-[#00d9ff]/10">
                  Enviar Mensaje
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-[#111] border-white/10 hover-lift text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#e11d2e]/20 flex items-center justify-center">
                  <MapPin className="w-8 h-8 text-[#e11d2e]" />
                </div>
                <h3 className="text-xl font-bold mb-2">Ubicación</h3>
                <p className="text-white/60 mb-4 text-sm">
                  Spinning and Training Center<br />
                  Almacén Sony 1c al sur - Estelí 🇳🇮
                </p>
                <Button
                  onClick={() => window.open('https://www.google.com/maps/search/?api=1&query=Spinning+and+Training+Center,+Almac%C3%A9n+Sony+1c+al+sur+-+Estel%C3%AD,+Nicaragua', '_blank')}
                  variant="outline"
                  className="border-[#e11d2e]/50 text-[#e11d2e] hover:bg-[#e11d2e]/10"
                >
                  Ver Mapa
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-[#111] border-white/10 hover-lift text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#00d9ff]/20 to-[#e11d2e]/20 flex items-center justify-center">
                  <Instagram className="w-8 h-8 text-[#00d9ff]" />
                </div>
                <h3 className="text-xl font-bold mb-2">Redes Sociales</h3>
                <p className="text-white/60 mb-4">Síguenos para más contenido</p>
                <div className="flex justify-center gap-3">
                  <Button
                    onClick={() => window.open('https://www.instagram.com/soulfit_nic?igsh=YzhyYWRpZGpuY3pz', '_blank')}
                    size="icon"
                    variant="outline"
                    className="border-white/20 hover:border-[#00d9ff] hover:text-[#00d9ff]"
                  >
                    <Instagram className="w-5 h-5" />
                  </Button>
                  <Button size="icon" variant="outline" className="border-white/20 hover:border-[#e11d2e] hover:text-[#e11d2e]">
                    <Facebook className="w-5 h-5" />
                  </Button>
                  <Button size="icon" variant="outline" className="border-white/20 hover:border-[#00d9ff] hover:text-[#00d9ff]">
                    <Twitter className="w-5 h-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 xl:px-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center">
              <img src="/logo.avif" alt="Soulfit" className="h-12 md:h-16 w-auto object-contain" />
            </div>

            <div className="flex gap-6 text-sm text-white/60">
              <button className="hover:text-white transition-colors">Términos</button>
              <button className="hover:text-white transition-colors">Privacidad</button>
              <button className="hover:text-white transition-colors">Cookies</button>
            </div>

            <p className="text-white/40 text-sm">
              © 2026 Soulfit. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
