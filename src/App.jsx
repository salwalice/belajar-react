import { useState, useEffect, useRef, useCallback } from 'react'
import fotoku from './assets/fotopp.jpeg'
/* ═══════════════════════════════════════════════════════
   SVG ICON COMPONENTS  
   ═══════════════════════════════════════════════════════ */
const Icon = {
  Instagram: (p) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={p.size||20} height={p.size||20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  ),
  Mail: (p) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={p.size||20} height={p.size||20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  ),
  ExternalLink: (p) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    </svg>
  ),
  ChevronDown: (p) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={p.size||20} height={p.size||20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="m6 9 6 6 6-6"/>
    </svg>
  ),
  Menu: (p) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={p.size||24} height={p.size||24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>
    </svg>
  ),
  X: (p) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={p.size||24} height={p.size||24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
    </svg>
  ),
  Code: (p) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={p.size||20} height={p.size||20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
  ),
  Palette: (p) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={p.size||20} height={p.size||20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/>
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
    </svg>
  ),
  Sparkles: (p) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={p.size||20} height={p.size||20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>
      <path d="M20 3v4"/><path d="M22 5h-4"/>
    </svg>
  ),
  Heart: (p) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={p.size||20} height={p.size||20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
    </svg>
  ),
  Bot: (p) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={p.size||20} height={p.size||20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/>
    </svg>
  ),
  ShoppingBag: (p) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={p.size||20} height={p.size||20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
    </svg>
  ),
  ArrowUpRight: (p) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M7 7h10v10"/><path d="M7 17 17 7"/>
    </svg>
  ),
  MapPin: (p) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  GraduationCap: (p) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>
    </svg>
  ),
}
/* ═══════════════════════════════════════════════════════
   CUSTOM HOOKS
   ═══════════════════════════════════════════════════════ */
function useScrollReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); obs.unobserve(el) } },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}
function useScrollSpy(sectionIds) {
  const [active, setActive] = useState(sectionIds[0])
  useEffect(() => {
    const handler = () => {
      const scrollY = window.scrollY + 120
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i])
        if (el && el.offsetTop <= scrollY) { setActive(sectionIds[i]); return }
      }
      setActive(sectionIds[0])
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [sectionIds])
  return active
}
/* ═══════════════════════════════════════════════════════
   ANIMATED SECTION WRAPPER
   ═══════════════════════════════════════════════════════ */
function Section({ children, className = '', id, ...rest }) {
  const ref = useScrollReveal()
  return (
    <section ref={ref} id={id} className={`reveal py-24 md:py-32 ${className}`} {...rest}>
      {children}
    </section>
  )
}
function SectionTitle({ children, subtitle }) {
  return (
    <div className="text-center mb-16 md:mb-20">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text-animated inline-block mb-4">
        {children}
      </h2>
      {subtitle && (
        <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
      )}
      <div className="mt-6 mx-auto w-24 h-1 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500" />
    </div>
  )
}
/* ═══════════════════════════════════════════════════════
   FLOATING BACKGROUND ORBS
   ═══════════════════════════════════════════════════════ */
function BackgroundOrbs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      {/* Large pink orb */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-pink-500/[0.04] blur-[100px] animate-float animate-morph" />
      {/* Large purple orb */}
      <div className="absolute top-1/3 -right-32 w-[600px] h-[600px] rounded-full bg-purple-500/[0.05] blur-[120px] animate-float-delayed animate-morph" style={{ animationDelay: '2s' }} />
      {/* Blue orb */}
      <div className="absolute -bottom-40 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-500/[0.04] blur-[100px] animate-float" style={{ animationDelay: '4s' }} />
      {/* Small accent orbs */}
      <div className="absolute top-[60%] right-[20%] w-[200px] h-[200px] rounded-full bg-pink-400/[0.03] blur-[60px] animate-float-delayed" style={{ animationDelay: '1s' }} />
      <div className="absolute top-[20%] left-[30%] w-[150px] h-[150px] rounded-full bg-blue-400/[0.03] blur-[60px] animate-float" style={{ animationDelay: '3s' }} />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />
    </div>
  )
}
/* ═══════════════════════════════════════════════════════
   NAVBAR
   ═══════════════════════════════════════════════════════ */
const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]
function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const activeSection = useScrollSpy(NAV_LINKS.map(l => l.id))
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])
  const scrollTo = useCallback((id) => {
    setIsOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }, [])
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'glass-strong shadow-lg shadow-black/20 py-3' : 'py-5 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => scrollTo('home')} className="text-xl md:text-2xl font-bold tracking-tight group">
          <span className="gradient-text-animated">Alice</span>
          <span className="text-white/80 group-hover:text-white transition-colors">.</span>
        </button>
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(link => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeSection === link.id
                  ? 'text-white bg-white/10'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
        {/* CTA Button Desktop */}
        <a
          href="#contact"
          onClick={(e) => { e.preventDefault(); scrollTo('contact') }}
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white
            bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 
            hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105"
        >
          <Icon.Sparkles size={14} />
          Let&apos;s Talk
        </a>
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <Icon.X size={24} /> : <Icon.Menu size={24} />}
        </button>
      </div>
      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="glass-strong mx-4 mt-3 rounded-2xl p-4 space-y-1">
          {NAV_LINKS.map(link => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`block w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeSection === link.id
                  ? 'text-white bg-white/10'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2">
            <button
              onClick={() => scrollTo('contact')}
              className="w-full px-4 py-3 rounded-xl text-sm font-semibold text-white text-center
                bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"
            >
              Let&apos;s Talk
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
/* ═══════════════════════════════════════════════════════
   HERO SECTION
   ═══════════════════════════════════════════════════════ */
function HeroSection() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  const roles = ['Frontend Developer', 'UI/UX Designer', 'Creative Thinker']
  const [roleIndex, setRoleIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  useEffect(() => {
    const currentRole = roles[roleIndex]
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < currentRole.length) {
          setCharIndex(c => c + 1)
        } else {
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        if (charIndex > 0) {
          setCharIndex(c => c - 1)
        } else {
          setIsDeleting(false)
          setRoleIndex(i => (i + 1) % roles.length)
        }
      }
    }, isDeleting ? 40 : 80)
    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, roleIndex])
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero-specific decorative elements */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Orbiting dot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="animate-orbit">
            <div className="w-2 h-2 rounded-full bg-purple-400/60" />
          </div>
        </div>
        {/* Decorative lines */}
        <div className="absolute top-[20%] left-[10%] w-32 h-px bg-gradient-to-r from-transparent via-pink-500/20 to-transparent rotate-[30deg]" />
        <div className="absolute bottom-[25%] right-[15%] w-40 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent -rotate-[20deg]" />
      </div>
      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-24 text-center md:pt-28">
        {/* Name */}
        <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 transition-all duration-1000 delay-200 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <span className="text-white">Hi, I&apos;m </span>
          <br className="sm:hidden" />
          <span className="gradient-text-animated">Nabila Salwa</span>
          <br />
          <span className="gradient-text-animated">Alice Norin</span>
        </h1>
        {/* Typing Role */}
        <div className={`h-10 flex items-center justify-center mb-8 transition-all duration-1000 delay-400 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <span className="text-lg md:text-2xl text-gray-300 font-light">
            {roles[roleIndex].substring(0, charIndex)}
          </span>
          <span className="inline-block w-0.5 h-6 md:h-7 bg-purple-400 ml-1 animate-typing-cursor" />
        </div>
        {/* Description */}
        <p className={`text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10 transition-all duration-1000 delay-500 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          Mahasiswa Sistem Informasi UNNES yang passionate dalam merancang 
          pengalaman digital yang indah dan fungsional.
        </p>
        {/* CTA Buttons */}
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 transition-all duration-1000 delay-700 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="group flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white
              bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 
              hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105
              animate-gradient-x"
          >
            View Projects
            <Icon.ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
          <button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="group flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white
              glass hover:bg-white/10 transition-all duration-300 hover:scale-105"
          >
            About Me
            <Icon.ChevronDown size={18} className="group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
        {/* Scroll Indicator */}
        <div className={`transition-all duration-1000 delay-[900ms] ${
          mounted ? 'opacity-100' : 'opacity-0'
        }`}>
          <button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex flex-col items-center gap-2 text-gray-500 hover:text-gray-300 transition-colors group"
          >
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <div className="w-5 h-8 rounded-full border-2 border-gray-600 group-hover:border-gray-400 transition-colors flex justify-center p-1">
              <div className="w-1 h-2 rounded-full bg-gray-400 animate-bounce" />
            </div>
          </button>
        </div>
      </div>
    </section>
  )
}
/* ═══════════════════════════════════════════════════════
   ABOUT SECTION
   ═══════════════════════════════════════════════════════ */
function AboutSection() {
  const highlights = [
    { icon: <Icon.GraduationCap size={18} />, label: 'Sistem Informasi', sub: 'UNNES' },
    { icon: <Icon.Palette size={18} />, label: 'UI/UX Designer', sub: 'Figma Expert' },
    { icon: <Icon.Code size={18} />, label: 'Frontend Dev', sub: 'React & More' },
  ]
  return (
    <Section id="about" className="relative">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle subtitle="Get to know me a bit better">About Me</SectionTitle>
        <div className="grid md:grid-cols-5 gap-10 md:gap-16 items-center">
          {/* Avatar / Visual Side */}
          <div className="md:col-span-2 flex justify-center">
            <div className="relative">
              {/* Gradient ring */}
              <div className="w-56 h-56 md:w-64 md:h-64 rounded-full p-[3px] bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 animate-pulse-glow">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <img
                    src={fotoku}
                    alt="Foto saya"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-3 -right-3 glass-strong rounded-2xl px-4 py-2 flex items-center gap-2 animate-float" style={{ animationDelay: '1s' }}>
                <span className="text-lg">🎨</span>
                <span className="text-xs font-semibold text-gray-200">Creative Mind</span>
              </div>
              {/* Another floating badge */}
              <div className="absolute -top-2 -left-4 glass-strong rounded-2xl px-3 py-2 flex items-center gap-2 animate-float-delayed">
                <span className="text-lg">💻</span>
                <span className="text-xs font-semibold text-gray-200">Coder</span>
              </div>
            </div>
          </div>
          {/* Text Side */}
          <div className="md:col-span-3 space-y-6">
            <p className="text-gray-300 text-base md:text-lg leading-relaxed">
              Saya adalah seorang mahasiswa program studi <span className="text-white font-medium">Sistem Informasi</span> di{' '}
              <span className="text-white font-medium">Universitas Negeri Semarang</span> yang tertarik menekuni 
              perancangan <span className="gradient-text font-semibold">UI/UX</span> website maupun aplikasi mobile.
            </p>
            <p className="text-gray-400 text-base md:text-lg leading-relaxed">
              Saat ini saya sedang belajar untuk menjadi seorang <span className="text-white font-medium">Frontend Developer</span> dan{' '}
              <span className="text-white font-medium">UI/UX Designer</span>. Saya percaya bahwa desain yang baik 
              adalah perpaduan antara estetika dan fungsionalitas yang memberikan pengalaman terbaik bagi pengguna.
            </p>
            {/* Highlight Cards */}
            <div className="grid grid-cols-3 gap-3 pt-4">
              {highlights.map((h, i) => (
                <div key={i} className="gradient-border group hover:scale-105 transition-transform duration-300">
                  <div className="p-4 text-center space-y-2 rounded-2xl">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 text-purple-300 group-hover:text-white transition-colors">
                      {h.icon}
                    </div>
                    <p className="text-white text-xs md:text-sm font-semibold">{h.label}</p>
                    <p className="text-gray-500 text-[10px] md:text-xs">{h.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
/* ═══════════════════════════════════════════════════════
   SKILLS SECTION
   ═══════════════════════════════════════════════════════ */
const SKILLS = [
  {
    name: 'Design',
    icon: <Icon.Palette size={28} />,
    color: 'from-pink-500 to-rose-500',
    shadow: 'shadow-pink-500/20',
    description: 'Visual design & creative thinking',
  },
  {
    name: 'HTML',
    icon: <span className="text-2xl font-bold">&lt;/&gt;</span>,
    color: 'from-orange-500 to-red-500',
    shadow: 'shadow-orange-500/20',
    description: 'Semantic & accessible markup',
  },
  {
    name: 'CSS',
    icon: <span className="text-2xl font-bold">#</span>,
    color: 'from-blue-500 to-cyan-400',
    shadow: 'shadow-blue-500/20',
    description: 'Responsive & modern styling',
  },
  {
    name: 'JavaScript',
    icon: <span className="text-2xl font-bold">JS</span>,
    color: 'from-yellow-400 to-amber-500',
    shadow: 'shadow-yellow-500/20',
    description: 'Interactive web experiences',
  },
  {
    name: 'Python',
    icon: <span className="text-2xl">🐍</span>,
    color: 'from-green-500 to-teal-500',
    shadow: 'shadow-green-500/20',
    description: 'Scripting & backend logic',
  },
  {
    name: 'Figma',
    icon: <span className="text-2xl">◈</span>,
    color: 'from-purple-500 to-violet-500',
    shadow: 'shadow-purple-500/20',
    description: 'Prototyping & UI design',
  },
]
function SkillsSection() {
  return (
    <Section id="skills">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle subtitle="Technologies & tools I work with">My Skills</SectionTitle>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {SKILLS.map((skill, i) => (
            <div
              key={skill.name}
              className="group relative rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* Gradient border effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl p-px"
                style={{ backgroundImage: `linear-gradient(135deg, var(--tw-gradient-stops))` }}
              >
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              </div>
              <div className="relative glass group-hover:bg-white/[0.06] p-6 md:p-8 rounded-2xl transition-all duration-500 h-full flex flex-col items-center text-center gap-4">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${skill.color} flex items-center justify-center text-white 
                  group-hover:shadow-lg ${skill.shadow} transition-all duration-500 group-hover:scale-110`}>
                  {skill.icon}
                </div>
                {/* Name */}
                <h3 className="text-white font-bold text-base md:text-lg">{skill.name}</h3>
                {/* Description */}
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed">{skill.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
/* ═══════════════════════════════════════════════════════
   PROJECT CARDS
   ═══════════════════════════════════════════════════════ */
const PROJECTS = [
  {
    title: 'Titik Nadi',
    description: 'Sebuah aplikasi mobile yang berfokus pada pemantauan kesehatan pengguna secara real-time dengan antarmuka yang intuitif dan mudah digunakan.',
    tags: ['UI/UX', 'Health', 'Mobile Apps'],
    gradient: 'from-emerald-500/80 via-teal-500/80 to-cyan-500/80',
    bgAccent: 'bg-emerald-500',
    icon: <Icon.Heart size={32} />,
    mockupElements: [
      { w: '60%', h: '8px', top: '20%', left: '20%', opacity: 0.3 },
      { w: '40%', h: '8px', top: '30%', left: '20%', opacity: 0.2 },
      { w: '70%', h: '24px', top: '42%', left: '15%', opacity: 0.15, rounded: true },
      { w: '70%', h: '24px', top: '58%', left: '15%', opacity: 0.15, rounded: true },
      { w: '50%', h: '12px', top: '78%', left: '25%', opacity: 0.2, rounded: true },
    ],
  },
  {
    title: 'Sirkula',
    description: 'Aplikasi mobile berbasis kolaborasi media sosial dan marketplace untuk menjual barang bekas — mendorong ekonomi sirkular.',
    tags: ['UI/UX', 'Mobile Apps', 'E-Commerce'],
    gradient: 'from-amber-500/80 via-orange-500/80 to-rose-500/80',
    bgAccent: 'bg-orange-500',
    icon: <Icon.ShoppingBag size={32} />,
    mockupElements: [
      { w: '45%', h: '45%', top: '15%', left: '5%', opacity: 0.12, rounded: true },
      { w: '45%', h: '45%', top: '15%', left: '50%', opacity: 0.12, rounded: true },
      { w: '45%', h: '30%', top: '65%', left: '5%', opacity: 0.1, rounded: true },
      { w: '45%', h: '30%', top: '65%', left: '50%', opacity: 0.1, rounded: true },
    ],
  },
  {
    title: 'PARALEGAL-X',
    description: 'Sebuah chatbot AI yang berfungsi untuk konsultasi hukum, dibangun dengan teknologi RAG dan Langflow untuk respons yang akurat.',
    tags: ['Artificial Intelligence', 'RAG', 'Langflow'],
    gradient: 'from-blue-500/80 via-indigo-500/80 to-violet-500/80',
    bgAccent: 'bg-indigo-500',
    icon: <Icon.Bot size={32} />,
    mockupElements: [
      { w: '55%', h: '14px', top: '20%', left: '10%', opacity: 0.15, rounded: true },
      { w: '65%', h: '14px', top: '35%', left: '25%', opacity: 0.2, rounded: true },
      { w: '45%', h: '14px', top: '50%', left: '10%', opacity: 0.15, rounded: true },
      { w: '60%', h: '14px', top: '65%', left: '25%', opacity: 0.2, rounded: true },
      { w: '35%', h: '14px', top: '80%', left: '10%', opacity: 0.15, rounded: true },
    ],
  },
]
function ProjectCard({ project, index }) {
  return (
    <div className="group relative rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/10">
      {/* Card */}
      <div className="glass h-full flex flex-col">
        {/* Project Visual / Mockup */}
        <div className={`relative h-52 md:h-60 overflow-hidden bg-gradient-to-br ${project.gradient}`}>
          {/* Abstract mockup background */}
          <div className="absolute inset-0 opacity-60">
            {/* Phone frame mockup */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-48 md:w-32 md:h-56 rounded-[20px] border-2 border-white/20 bg-black/30 backdrop-blur-sm overflow-hidden">
              {/* Status bar */}
              <div className="h-5 bg-white/10 flex items-center justify-center">
                <div className="w-12 h-1 rounded-full bg-white/30" />
              </div>
              {/* Mock UI elements */}
              {project.mockupElements.map((el, i) => (
                <div
                  key={i}
                  className="absolute bg-white"
                  style={{
                    width: el.w,
                    height: el.h,
                    top: el.top,
                    left: el.left,
                    opacity: el.opacity,
                    borderRadius: el.rounded ? '6px' : '2px',
                  }}
                />
              ))}
            </div>
          </div>
          {/* Icon overlay */}
          <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/80">
            {project.icon}
          </div>
          {/* Decorative circles */}
          <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/5" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-white/5" />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
              <div className="px-5 py-2.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium flex items-center gap-2">
                View Details <Icon.ArrowUpRight size={14} />
              </div>
            </div>
          </div>
        </div>
        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-bold text-white mb-3 group-hover:gradient-text transition-all duration-300">
            {project.title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-1">
            {project.description}
          </p>
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map(tag => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-[11px] font-medium bg-white/5 text-gray-300 border border-white/5
                  group-hover:border-purple-500/30 group-hover:text-purple-300 transition-all duration-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
function ProjectsSection() {
  return (
    <Section id="projects">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle subtitle="Some of my recent works & creative projects">Featured Projects</SectionTitle>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </Section>
  )
}
/* ═══════════════════════════════════════════════════════
   CONTACT SECTION
   ═══════════════════════════════════════════════════════ */
function ContactSection() {
  return (
    <Section id="contact">
      <div className="max-w-4xl mx-auto px-6">
        <SectionTitle subtitle="Let's create something amazing together">Get In Touch</SectionTitle>
        {/* Contact Card */}
        <div className="gradient-border">
          <div className="relative rounded-2xl overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-purple-500/5 to-blue-500/5" />
            
            <div className="relative p-8 md:p-12 text-center space-y-8">
              {/* Decorative sparkle */}
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 text-purple-300 mb-2 animate-pulse-glow">
                <Icon.Sparkles size={28} />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-bold text-white">
                  Ada ide project yang menarik?
                </h3>
                <p className="text-gray-400 text-base md:text-lg max-w-lg mx-auto leading-relaxed">
                  Saya selalu terbuka untuk diskusi tentang project baru, ide kreatif, 
                  atau kesempatan untuk berkolaborasi. Jangan ragu untuk menghubungi saya!
                </p>
              </div>
              {/* Contact Links */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {/* Email */}
                <a
                  href="mailto:nabilasalwaalice@gmail.com"
                  className="group flex items-center gap-3 px-6 py-3.5 rounded-full font-semibold text-white
                    bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 
                    hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105
                    animate-gradient-x w-full sm:w-auto justify-center"
                >
                  <Icon.Mail size={18} />
                  nabilasalwaalice@gmail.com
                  <Icon.ArrowUpRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </a>
                {/* Instagram */}
                <a
                  href="https://instagram.com/slwaalice"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 px-6 py-3.5 rounded-full font-semibold text-white
                    glass hover:bg-white/10 transition-all duration-300 hover:scale-105 w-full sm:w-auto justify-center"
                >
                  <Icon.Instagram size={18} />
                  @slwaalice
                  <Icon.ArrowUpRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </a>
              </div>
              {/* Info Tags */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
                  <Icon.MapPin size={12} /> Semarang, Indonesia
                </span>
                <span className="text-gray-700">•</span>
                <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
                  <Icon.GraduationCap size={12} /> Universitas Negeri Semarang
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
/* ═══════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="relative border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="text-center md:text-left">
            <span className="text-lg font-bold gradient-text">nabila.</span>
            <p className="text-xs text-gray-600 mt-1">Frontend Developer & UI/UX Designer</p>
          </div>
          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="mailto:nabilasalwaalice@gmail.com"
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300"
              aria-label="Email"
            >
              <Icon.Mail size={16} />
            </a>
            <a
              href="https://instagram.com/slwaalice"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300"
              aria-label="Instagram"
            >
              <Icon.Instagram size={16} />
            </a>
          </div>
          {/* Copyright */}
          <p className="text-xs text-gray-600 text-center md:text-right">
            © {new Date().getFullYear()} Nabila Salwa Alice Norin. <br className="sm:hidden" />
            Crafted with <span className="text-pink-400">♥</span> and a lot of ☕
          </p>
        </div>
      </div>
    </footer>
  )
}
/* ═══════════════════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════════════════ */
export default function App() {
  return (
    <div className="relative min-h-screen bg-surface text-gray-200 overflow-x-hidden">
      <BackgroundOrbs />
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
