'use client'
// pages/HomePage.jsx
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

const imgTrabalho = '/assets/trabalho.png';
const imgTrabalho2 = '/assets/trabalho2.png';
const imgTrabalho3 = '/assets/trabalho3.png';
const imgTrabalho4 = '/assets/trabalho4.png';
const imgPortfolio = '/assets/portfolio.png';
const imgPortfolio2 = '/assets/portfolio2.png';
const imgPortfolio3 = '/assets/portfolio3.png';
const imgPortfolio4 = '/assets/portfolio4.png';
const imgDoc = '/assets/doc.png';
const imgDoc2 = '/assets/doc2.png';
const imgDoc3 = '/assets/doc3.png';
const imgDoc4 = '/assets/doc4.png';
const imgSocial = '/assets/social.png';
const imgSocial2 = '/assets/social2.png';
const imgSocial3 = '/assets/social3.png';
const imgSocial4 = '/assets/social4.png';
const imgSocial5 = '/assets/social5.png';
const imgSocial6 = '/assets/social6.png';
import {
  ArrowRight, Check, Sparkles,
  Users, MessageSquare, CheckSquare,
  Paperclip, Tag, Link2, Eye, Share2,
  Layout, Globe, Layers, FileText, Heart,
  BookOpen, Briefcase, Dumbbell, FileUser, HardDrive, NotebookText,
} from 'lucide-react';
import { MODULES } from '../data/modulesData';
import { useLanguage } from '../context/LanguageContext';

// Icon map for dynamic lookup from modulesData
const ICON_MAP = { BookOpen, Briefcase, Dumbbell, FileText, FileUser, Globe, HardDrive, Heart, Layers, MessageSquare, NotebookText, Sparkles, Users };

// ── Helpers ──────────────────────────────────────────────────────────────────
function InView({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Mockup frame (mantido para uso futuro) ───────────────────────────────────
function BrowserFrame({ children, accentColor = 'rgba(129,140,248,0.15)' }) {
  return (
    <div
      className="rounded-2xl overflow-hidden border border-white/10 bg-[#0a091e]"
      style={{ boxShadow: `0 0 70px ${accentColor}` }}
    >
      <div className="flex items-center gap-1.5 px-4 py-3 bg-white/[0.025] border-b border-white/5">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
        <div className="flex-1 mx-3 h-4 rounded-full bg-white/5 flex items-center justify-center">
          <span className="text-[9px] text-slate-600">app.cursar.me</span>
        </div>
      </div>
      {children}
    </div>
  );
}

// ── Section mockups ──────────────────────────────────────────────────────────
function WorksMockup() {
  const { t } = useLanguage();
  return (
    <BrowserFrame accentColor="rgba(16,185,129,0.12)">
      <div className="p-5">
        <div className="flex gap-1.5 mb-4 border-b border-white/5 pb-3">
          {[t('homepage.mockups.works.tabs.board'), t('homepage.mockups.works.tabs.backpack'), t('homepage.mockups.works.tabs.mural'), t('homepage.mockups.works.tabs.settings')].map((tab, i) => (
            <div
              key={tab}
              className={`text-[10px] font-semibold px-3 py-1.5 rounded-lg ${i === 0
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                  : 'text-slate-600'
                }`}
            >
              {tab}
            </div>
          ))}
        </div>

        <div className="flex gap-3 mb-1">
          <div className="text-[9px] font-black text-slate-600 uppercase tracking-wider px-2">Sprint 2 · 5 {t('common.daysRemaining')}</div>
        </div>

        <div className="grid grid-cols-3 gap-2.5 mt-2">
          {[
            { label: t('homepage.mockups.works.status.todo'), color: 'text-slate-500', cards: [t('homepage.mockups.works.cards.review'), t('homepage.mockups.works.cards.presentation')], key: 'todo' },
            { label: t('homepage.mockups.works.status.doing'), color: 'text-yellow-400', cards: [t('homepage.mockups.works.cards.backend')], key: 'doing' },
            { label: t('homepage.mockups.works.status.done'), color: 'text-emerald-400', cards: [t('homepage.mockups.works.cards.setup'), t('homepage.mockups.works.cards.wireframes')], key: 'done' },
          ].map(({ label, color, cards, key }) => (
            <div key={key}>
              <div className={`text-[9px] font-black uppercase tracking-wider mb-2 ${color}`}>{label}</div>
              <div className="space-y-2">
                {cards.map((c, ci) => (
                  <div key={ci} className="p-2.5 rounded-xl bg-white/[0.04] border border-white/5">
                    <div className="text-[10px] text-slate-300 mb-2">{c}</div>
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-1">
                        <div className="w-3.5 h-3.5 rounded-full bg-indigo-500/50 border border-[#0a091e]" />
                        <div className="w-3.5 h-3.5 rounded-full bg-pink-500/40 border border-[#0a091e]" />
                      </div>
                      <div className={`ml-auto text-[8px] px-1.5 py-0.5 rounded-full ${key === 'doing'
                          ? 'bg-yellow-500/15 text-yellow-400'
                          : key === 'done'
                            ? 'bg-emerald-500/15 text-emerald-400'
                            : 'bg-white/5 text-slate-600'
                        }`}>
                        {key === 'doing' ? t('homepage.mockups.works.priorities.high') : key === 'done' ? t('homepage.mockups.works.priorities.done') : t('homepage.mockups.works.priorities.medium')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </BrowserFrame>
  );
}

function PortfolioMockup() {
  const { t } = useLanguage();
  return (
    <BrowserFrame accentColor="rgba(239,68,68,0.12)">
      <div className="p-5">
        <div className="rounded-xl overflow-hidden border border-white/5">
          <div className="h-20 bg-gradient-to-br from-red-500/25 via-rose-600/10 to-transparent flex items-end px-4 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-red-400/60" />
              <span className="text-[10px] text-red-400/70 font-semibold">{t('homepage.mockups.portfolio.caseTitle')}</span>
            </div>
          </div>

          <div className="p-4 bg-white/[0.02]">
            <div className="h-4 w-2/3 bg-white/12 rounded-full mb-1.5" />
            <div className="flex gap-1.5 mb-4 flex-wrap">
              {['Design', 'React Native', 'UX'].map((t) => (
                <span key={t} className="text-[9px] px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                  {t}
                </span>
              ))}
            </div>

            <div className="space-y-1.5 mb-3">
              <div className="h-2 w-full bg-white/5 rounded-full" />
              <div className="h-2 w-5/6 bg-white/5 rounded-full" />
              <div className="h-2 w-4/6 bg-white/5 rounded-full" />
            </div>

            <div className="grid grid-cols-3 gap-1.5 mb-3">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-video rounded-lg bg-gradient-to-br from-red-500/10 to-rose-900/5 border border-white/5 flex items-center justify-center"
                >
                  <div className="w-4 h-4 rounded bg-white/5" />
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-[9px] text-slate-600">
                <Eye size={8} /> 284 {t('common.views')}
              </div>
              <div className="flex -space-x-1 ml-auto" title={t('homepage.mockups.portfolio.coAuthors')}>
                {['bg-indigo-500/60', 'bg-pink-500/50', 'bg-emerald-500/50'].map((c, i) => (
                  <div key={i} className={`w-4 h-4 rounded-full border border-[#0a091e] ${c}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

function DocumentMockup() {
  const { t } = useLanguage();
  return (
    <BrowserFrame accentColor="rgba(6,182,212,0.12)">
      <div className="p-5 flex gap-4">
        <div className="w-24 flex-shrink-0 border-r border-white/5 pr-3">
          <div className="text-[8px] font-black text-slate-600 uppercase tracking-wider mb-2.5">{t('homepage.mockups.document.summary')}</div>
          {[t('homepage.mockups.document.sections.intro'), t('homepage.mockups.document.sections.context'), t('homepage.mockups.document.sections.method'), t('homepage.mockups.document.sections.result'), t('homepage.mockups.document.sections.conclusion')].map((s, i) => (
            <div
              key={s}
              className={`text-[10px] py-1 px-1.5 rounded mb-0.5 cursor-default ${i === 2 ? 'text-cyan-400 bg-cyan-500/10' : 'text-slate-600 hover:text-slate-400'
                }`}
            >
              {s}
            </div>
          ))}
        </div>

        <div className="flex-1 min-w-0">
          <div className="text-[8px] text-slate-600 mb-2">{t('homepage.mockups.document.pageInfo')}</div>
          <div className="h-3.5 w-3/4 bg-white/12 rounded-full mb-3" />

          <div className="space-y-1.5 mb-3">
            {[100, 83, 67, 100, 60].map((pct, i) => (
              <div
                key={i}
                className="h-1.5 bg-white/5 rounded-full"
                style={{ width: `${pct}%` }}
              />
            ))}
          </div>

          <div className="border-l-2 border-cyan-500/40 pl-2.5 py-1.5 mb-3 bg-cyan-500/5 rounded-r-lg">
            <div className="h-1.5 w-4/5 bg-cyan-500/20 rounded-full" />
            <div className="h-1.5 w-3/5 bg-cyan-500/15 rounded-full mt-1" />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1 text-[8px] text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-full">
              <Link2 size={7} /> {t('homepage.mockups.document.publicLink')}
            </div>
            <div className="flex items-center gap-1 text-[8px] text-slate-600">
              <Heart size={7} /> 42 {t('common.likes')}
            </div>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

function ProfileMockup() {
  const { t } = useLanguage();
  return (
    <BrowserFrame accentColor="rgba(99,102,241,0.12)">
      <div className="p-5">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500/50 to-purple-600/50 flex items-center justify-center text-xs font-black text-indigo-200 flex-shrink-0 border border-indigo-500/20">
            GB
          </div>
          <div>
            <div className="h-3 w-24 bg-white/15 rounded-full mb-1.5" />
            <div className="h-2 w-32 bg-indigo-500/20 rounded-full" />
          </div>
          <div className="ml-auto text-[8px] text-indigo-400/60 border border-indigo-500/15 px-2 py-0.5 rounded-full bg-indigo-500/5">
            Pro
          </div>
        </div>

        <div className="flex gap-4 mb-4 border-b border-white/5 pb-3">
          {[t('homepage.mockups.profile.tabs.home'), t('homepage.mockups.profile.tabs.portfolio'), t('homepage.mockups.profile.tabs.education'), t('homepage.mockups.profile.tabs.career')].map((tab, i) => (
            <div
              key={tab}
              className={`text-[10px] font-medium pb-3 -mb-3 ${i === 0
                  ? 'text-indigo-400 border-b-2 border-indigo-400'
                  : 'text-slate-600'
                }`}
            >
              {tab}
            </div>
          ))}
        </div>

        <div className="space-y-1.5">
          {[t('homepage.mockups.profile.links.portfolio'), 'LinkedIn', 'GitHub'].map((l, i) => (
            <div key={l} className="flex items-center gap-2 p-2 rounded-xl bg-white/[0.03] border border-white/5">
              <div
                className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${i === 0 ? 'bg-indigo-400' : i === 1 ? 'bg-blue-400' : 'bg-slate-400'
                  }`}
              />
              <span className="text-[10px] text-slate-400">{l}</span>
              <ArrowRight size={8} className="text-slate-600 ml-auto" />
            </div>
          ))}
        </div>

        <div className="mt-4 text-center text-[9px] text-indigo-400/40">
          app.cursar.me/giovanibraz
        </div>
      </div>
    </BrowserFrame>
  );
}

// ── Carousel de imagens ───────────────────────────────────────────────────────
function ImageCarousel({ images }) {
  const [current, setCurrent] = useState(0);
  const { t } = useLanguage();
  
  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % images.length), 3000);
    return () => clearInterval(t);
  }, [images.length]);
  
  return (
    <div style={{ position: 'relative', width: '100%', aspectRatio: '16/10', overflow: 'hidden' }}>
      {images.map((src, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            inset: 0,
            opacity: i === current ? 1 : 0,
            transition: 'opacity 0.7s ease-in-out',
          }}
        >
          <Image
            src={src}
            alt={t('common.screenshot') || 'Screenshot do sistema'}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: 'cover' }}
            priority={i === 0 && src.includes('trabalho')}
          />
        </div>
      ))}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function HomePage() {
  const { t } = useLanguage();
  const half = Math.ceil(MODULES.length / 2);
  const modulesA = MODULES.slice(0, half);
  const modulesB = MODULES.slice(half);
  const carouselA = [...modulesA, ...modulesA, ...modulesA, ...modulesA];
  const carouselB = [...modulesB, ...modulesB, ...modulesB, ...modulesB];

  const FEATURE_SECTIONS = [
    {
      id: 'trabalhos',
      eyebrow: t('homepage.sections.works.eyebrow'),
      titleLine1: t('homepage.sections.works.title1'),
      titleLine2: t('homepage.sections.works.title2'),
      description: t('homepage.sections.works.description'),
      color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', accentRgb: '16,185,129',
      features: [
        { icon: Layout,        text: t('homepage.sections.works.features.scrum') },
        { icon: Users,         text: t('homepage.sections.works.features.members') },
        { icon: Paperclip,     text: t('homepage.sections.works.features.resources') },
        { icon: MessageSquare, text: t('homepage.sections.works.features.chat') },
        { icon: CheckSquare,   text: t('homepage.sections.works.features.cards') },
      ],
      limit: { free: t('homepage.sections.works.limit.free'), pro: t('homepage.sections.works.limit.pro') },
      images: [imgTrabalho, imgTrabalho2, imgTrabalho3, imgTrabalho4],
    },
    {
      id: 'portfolio',
      eyebrow: t('homepage.sections.portfolio.eyebrow'),
      titleLine1: t('homepage.sections.portfolio.title1'),
      titleLine2: t('homepage.sections.portfolio.title2'),
      description: t('homepage.sections.portfolio.description'),
      color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20', accentRgb: '239,68,68',
      features: [
        { icon: Layout, text: t('homepage.sections.portfolio.features.editor') },
        { icon: Layers, text: t('homepage.sections.portfolio.features.blocks') },
        { icon: Users,  text: t('homepage.sections.portfolio.features.collaboration') },
        { icon: Eye,    text: t('homepage.sections.portfolio.features.visibility') },
        { icon: Tag,    text: t('homepage.sections.portfolio.features.tags') },
      ],
      limit: { free: t('homepage.sections.portfolio.limit.free'), pro: t('homepage.sections.portfolio.limit.pro') },
      images: [imgPortfolio, imgPortfolio2, imgPortfolio3, imgPortfolio4],
    },
    {
      id: 'documento',
      eyebrow: t('homepage.sections.document.eyebrow'),
      titleLine1: t('homepage.sections.document.title1'),
      titleLine2: t('homepage.sections.document.title2'),
      description: t('homepage.sections.document.description'),
      color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', accentRgb: '6,182,212',
      features: [
        { icon: FileText, text: t('homepage.sections.document.features.editor') },
        { icon: Layout,   text: t('homepage.sections.document.features.summary') },
        { icon: Link2,    text: t('homepage.sections.document.features.link') },
        { icon: Heart,    text: t('homepage.sections.document.features.likes') },
        { icon: Eye,      text: t('homepage.sections.document.features.cover') },
      ],
      limit: { free: t('homepage.sections.document.limit.free'), pro: t('homepage.sections.document.limit.pro') },
      images: [imgDoc, imgDoc2, imgDoc3, imgDoc4],
    },
    {
      id: 'perfil',
      eyebrow: t('homepage.sections.profile.eyebrow'),
      titleLine1: t('homepage.sections.profile.title1'),
      titleLine2: t('homepage.sections.profile.title2'),
      description: t('homepage.sections.profile.description'),
      color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20', accentRgb: '99,102,241',
      features: [
        { icon: Globe,  text: t('homepage.sections.profile.features.url') },
        { icon: Layout, text: t('homepage.sections.profile.features.tabs') },
        { icon: Share2, text: t('homepage.sections.profile.features.bio') },
        { icon: Eye,    text: t('homepage.sections.profile.features.visibility') },
      ],
      limit: { free: t('homepage.sections.profile.limit.free'), pro: t('homepage.sections.profile.limit.pro') },
      images: [imgSocial, imgSocial2, imgSocial3, imgSocial4, imgSocial5, imgSocial6],
    },
  ];

  const PLANS = [
    {
      name: t('homepage.pricing.free.name'),
      price: t('homepage.pricing.free.price'),
      per: t('homepage.pricing.free.per'),
      color: 'border-white/10',
      cta: t('homepage.pricing.free.cta'),
      ctaStyle: 'bg-white/10 hover:bg-white/15 text-white border border-white/10',
      features: [
        t('homepage.pricing.free.features.courses'),
        t('homepage.pricing.free.features.portfolio'),
        t('homepage.pricing.free.features.career'),
        t('homepage.pricing.free.features.notes'),
        t('homepage.pricing.free.features.works'),
        t('homepage.pricing.free.features.drive'),
        t('homepage.pricing.free.features.connections'),
        t('homepage.pricing.free.features.profile'),
      ],
    },
    {
      name: t('homepage.pricing.pro.name'),
      price: t('homepage.pricing.pro.price'),
      per: t('homepage.pricing.pro.per'),
      highlight: true,
      badge: t('homepage.pricing.pro.badge'),
      color: 'border-indigo-500/40',
      cta: t('homepage.pricing.pro.cta'),
      features: [
        t('homepage.pricing.pro.features.unlimited'),
        t('homepage.pricing.pro.features.courses'),
        t('homepage.pricing.pro.features.portfolio'),
        t('homepage.pricing.pro.features.career'),
        t('homepage.pricing.pro.features.notes'),
        t('homepage.pricing.pro.features.drive'),
        t('homepage.pricing.pro.features.connections'),
        t('homepage.pricing.pro.features.visitors'),
      ],
      otherPrices: [
        { label: t('homepage.pricing.pro.otherPrices.monthly.label'), price: t('homepage.pricing.pro.otherPrices.monthly.price') },
        { label: t('homepage.pricing.pro.otherPrices.semiannual.label'), price: t('homepage.pricing.pro.otherPrices.semiannual.price') },
      ],
    },
  ];

  return (
    <>
      <div
        className="min-h-screen text-white overflow-x-hidden relative"
        style={{ background: '#0a091e' }}
      >
        {/* ── Glow de página — não clipado por nenhuma section ── */}
        <div className="absolute top-0 left-0 right-0 pointer-events-none" style={{ height: '140vh', zIndex: 0 }}>
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[1400px] h-[900px]"
            style={{ background: 'radial-gradient(ellipse at 50% 15%, rgba(99,102,241,0.28) 0%, rgba(129,140,248,0.12) 45%, transparent 72%)' }}
          />
          <div
            className="absolute top-1/4 -left-40 w-[700px] h-[700px] rounded-full opacity-15"
            style={{ background: 'radial-gradient(ellipse, rgba(192,132,252,0.6) 0%, transparent 65%)' }}
          />
          <div
            className="absolute top-1/3 -right-40 w-[600px] h-[600px] rounded-full opacity-10"
            style={{ background: 'radial-gradient(ellipse, rgba(244,114,182,0.5) 0%, transparent 65%)' }}
          />
        </div>

        {/* ── 1. HERO ──────────────────────────────────────────────────────────── */}
        <section className="relative flex flex-col items-center text-center px-6 pt-32 pb-10" style={{ zIndex: 1 }}>
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div
              className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                backgroundSize: '60px 60px',
              }}
            />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto">
            <div
              className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs font-semibold px-4 py-2 rounded-full mb-8"
              style={{ animation: 'heroFadeUp 0.6s ease both', animationDelay: '0s' }}
            >
              <Sparkles size={12} />
              {t('homepage.hero.badge')}
            </div>

            <h1
              className="font-black leading-[1.08] tracking-tight mb-6"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', animation: 'heroFadeUp 0.6s ease both', animationDelay: '0.1s' }}
            >
              {t('homepage.hero.title1')}{' '}
              <span
                className="inline-block"
                style={{
                  background: 'linear-gradient(90deg, #818cf8, #c084fc, #f472b6, #818cf8)',
                  backgroundSize: '300%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  animation: 'gradientMove 8s ease infinite',
                }}
              >
                {t('homepage.hero.titleGradient')}
              </span>
            </h1>

            <p
              className="text-slate-400 leading-relaxed mb-10 max-w-xl mx-auto"
              style={{ fontSize: 'clamp(0.95rem, 2vw, 1.125rem)', animation: 'heroFadeUp 0.6s ease both', animationDelay: '0.2s' }}
            >
              {t('homepage.hero.subtitle')}
            </p>

            <div
              style={{ display: 'flex', flexWrap: 'wrap', gap: '0.875rem', justifyContent: 'center', alignItems: 'center', animation: 'heroFadeUp 0.6s ease both', animationDelay: '0.3s' }}
            >
              {/* Começar grátis */}
              <Link
                href="/download"
                className="group flex items-center gap-2 text-sm font-bold text-white transition-all duration-200 active:scale-[0.97]"
                style={{
                  padding: '0.75rem 1.75rem',
                  borderRadius: '0.875rem',
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #c084fc)',
                  boxShadow: '0 0 28px rgba(99,102,241,0.35), inset 0 1px 0 rgba(255,255,255,0.15)',
                  transition: 'box-shadow 0.2s ease, transform 0.2s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 45px rgba(99,102,241,0.55), inset 0 1px 0 rgba(255,255,255,0.15)'; e.currentTarget.style.transform = 'scale(1.04)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 0 28px rgba(99,102,241,0.35), inset 0 1px 0 rgba(255,255,255,0.15)'; e.currentTarget.style.transform = 'scale(1)'; }}
              >
                {t('common.download')}
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </Link>

              {/* Ver todos os módulos — borda gradiente */}
              <div style={{
                padding: '1px',
                borderRadius: '0.875rem',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #c084fc, #f472b6)',
              }}>
                <Link
                  href="/modulos"
                  className="flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors duration-200"
                  style={{
                    padding: '0.7rem 1.6rem',
                    borderRadius: 'calc(0.875rem - 1px)',
                    background: '#0a091e',
                    display: 'flex',
                  }}
                >
                  {t('homepage.hero.ctaSecondary')}
                </Link>
              </div>
            </div>

            <p
              className="mt-8 text-xs text-slate-400 font-medium"
              style={{ animation: 'heroFadeUp 0.6s ease both', animationDelay: '0.4s' }}
            >
              {t('homepage.hero.disclaimer')}
            </p>
          </div>

        </section>

        {/* ── 2. MODULES CAROUSEL ──────────────────────────────────────────────── */}
        <section className="py-10 overflow-hidden" style={{ animation: 'heroFadeUp 0.6s ease both', animationDelay: '0.7s' }}>
          <div className="text-center mb-12 px-6 sm:px-8">
            <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs font-semibold px-4 py-2 rounded-full mb-6">
              <Sparkles size={12} />
              {t('homepage.modules.badge')}
            </div>
            <h2
              className="text-3xl sm:text-4xl font-black tracking-tight"
            >
              {t('homepage.modules.title')}
              <br />
              <span className="text-slate-500">{t('homepage.modules.subtitle')}</span>
            </h2>
          </div>

          <div className="relative select-none">
            {/* Edge fades */}
            <div
              className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
              style={{ background: 'linear-gradient(to right, #0a091e, transparent)' }}
            />
            <div
              className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
              style={{ background: 'linear-gradient(to left, #0a091e, transparent)' }}
            />

            {/* Row 1 — left */}
            <div className="overflow-hidden mb-3">
              <div className="carousel-track-left flex">
                {carouselA.map((mod, i) => {
                  const Icon = ICON_MAP[mod.icon] || Layers;
                  return (
                    <div
                      key={`a-${mod.id}-${i}`}
                      className={`flex-shrink-0 flex items-center gap-3 px-4 py-3 rounded-2xl border mx-2 ${mod.bg} ${mod.border}`}
                      style={{ minWidth: '195px' }}
                    >
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${mod.bg} border ${mod.border}`}>
                        <Icon size={15} className={mod.color} strokeWidth={1.5} />
                      </div>
                      <div className="min-w-0">
                        <div className={`text-xs font-bold leading-tight ${mod.color}`}>{t(`modules.${mod.id}.title`)}</div>
                        <div className="text-[9px] text-slate-600 mt-0.5 truncate">
                          {mod.soon ? t('common.soon') : t(`modules.${mod.id}.tagline`)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Row 2 — right */}
            <div className="overflow-hidden">
              <div className="carousel-track-right flex" style={{ transform: 'translateX(-50%)' }}>
                {carouselB.map((mod, i) => {
                  const Icon = ICON_MAP[mod.icon] || Layers;
                  return (
                    <div
                      key={`b-${mod.id}-${i}`}
                      className={`flex-shrink-0 flex items-center gap-3 px-4 py-3 rounded-2xl border mx-2 ${mod.bg} ${mod.border}`}
                      style={{ minWidth: '195px' }}
                    >
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${mod.bg} border ${mod.border}`}>
                        <Icon size={15} className={mod.color} strokeWidth={1.5} />
                      </div>
                      <div className="min-w-0">
                        <div className={`text-xs font-bold leading-tight ${mod.color}`}>{t(`modules.${mod.id}.title`)}</div>
                        <div className="text-[9px] text-slate-600 mt-0.5 truncate">
                          {mod.soon ? t('common.soon') : t(`modules.${mod.id}.tagline`)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <InView className="text-center mt-12 px-6 sm:px-8">
            <Link
              href="/modulos"
              className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors group"
            >
              {t('homepage.modules.viewAll')}
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </InView>
        </section>

        {/* ── 3–6. FEATURE SECTIONS — centralizado, imagem abaixo ─────────────── */}
        {FEATURE_SECTIONS.map((section, si) => (
          <section key={section.id} id={section.id} className="relative py-14 px-6 sm:px-8 overflow-hidden" style={{ scrollMarginTop: '80px' }}>
            {/* Ambient glow */}
            <div className="absolute inset-0 pointer-events-none">
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full opacity-[0.055]"
                style={{ background: `radial-gradient(ellipse, rgba(${section.accentRgb},1) 0%, transparent 65%)` }}
              />
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
              {/* ── Texto — centralizado ── */}
              <InView className="text-center mb-10">
                <div
                  className={`inline-flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full border mb-6 ${section.bg} ${section.border} ${section.color}`}
                >
                  {section.eyebrow}
                </div>

                <h2
                  className="font-black tracking-tight mb-5"
                  style={{ fontSize: 'clamp(1.35rem, 3.5vw, 1.875rem)' }}
                >
                  {section.titleLine1}
                  <br />
                  <span className="text-slate-400">{section.titleLine2}</span>
                </h2>

                <p className="text-slate-400 text-sm leading-relaxed max-w-2xl mx-auto mb-6">
                  {section.description}
                </p>

                {/* ── Feature badges — grid 2 colunas ── */}
                <div
                  className="feature-grid mb-6 mx-auto"
                  style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 260px))', justifyContent: 'center', gap: '0.5rem' }}
                >
                  {section.features.map(({ icon: FeatureIcon, text }, fi) => (
                    <div
                      key={fi}
                      className={`feature-badge flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold ${section.bg} ${section.border} ${section.color}`}
                    >
                      <FeatureIcon size={11} strokeWidth={2} style={{ flexShrink: 0 }} />
                      {text}
                    </div>
                  ))}
                </div>

                {/* Limite Free / Pro */}
                <div className="flex gap-2.5 justify-center flex-wrap">
                  <span className="text-xs font-semibold text-slate-500 bg-white/[0.04] border border-white/10 px-4 py-1.5 rounded-full whitespace-nowrap">
                    Free: {section.limit.free}
                  </span>
                  <span
                    className={`text-xs font-semibold px-4 py-1.5 rounded-full border whitespace-nowrap ${section.bg} ${section.border} ${section.color}`}
                  >
                    Pro: {section.limit.pro}
                  </span>
                </div>
              </InView>

              {/* ── Imagem — sempre abaixo, substitua src ── */}
              <InView delay={0.1}>
                <div
                  className={`rounded-2xl overflow-hidden border ${section.border} bg-white/[0.02]`}
                  style={{
                    boxShadow: `0 0 60px rgba(${section.accentRgb},0.08)`,
                    animation: 'imageFloat 4s ease-in-out infinite',
                    animationDelay: `${si * 0.7}s`,
                  }}
                >
                  {section.images ? (
                    <ImageCarousel images={section.images} />
                  ) : section.imgSrc ? (
                    <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9' }}>
                      <Image
                        src={section.imgSrc}
                        alt={`${t('common.screenshot')} — ${section.eyebrow}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  ) : (
                    <div
                      className={`flex items-center justify-center flex-col gap-3 py-24 ${section.bg}`}
                      style={{ minHeight: '260px' }}
                    >
                      <LucideIcons.Image size={48} className={`opacity-25 ${section.color}`} />
                      <p className="text-xs text-slate-600 text-center">Screenshot em breve</p>
                    </div>
                  )}
                </div>
              </InView>
            </div>
          </section>
        ))}

        {/* ── 7. PRICING ───────────────────────────────────────────────────────── */}
        <section id="precos" className="relative py-24 px-6 sm:px-8" style={{ scrollMarginTop: '80px' }}>
          <div className="max-w-4xl mx-auto">
            <InView className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs font-semibold px-4 py-2 rounded-full mb-6">
                <Sparkles size={12} />
                {t('homepage.pricing.badge')}
              </div>
              <h2
                className="text-3xl sm:text-4xl font-black tracking-tight mb-4"

              >
                {t('homepage.pricing.title')}
                <br />
                <span className="text-slate-500">{t('homepage.pricing.subtitle')}</span>
              </h2>
              <p className="text-slate-500 text-base max-w-md mx-auto">
                {t('homepage.pricing.description')}
              </p>
            </InView>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
              {PLANS.map((plan, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative rounded-3xl border p-8 ${plan.color} ${plan.highlight
                      ? 'bg-gradient-to-b from-indigo-500/5 to-purple-500/5'
                      : 'bg-white/[0.02]'
                    }`}
                >
                  {plan.highlight && (
                    <>
                      <div
                        className="absolute inset-0 rounded-3xl pointer-events-none"
                        style={{ boxShadow: '0 0 60px rgba(129,140,248,0.12)' }}
                      />
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full whitespace-nowrap shadow-lg">
                        {plan.badge}
                      </div>
                    </>
                  )}

                  <div className="mb-6">
                    <p className="text-sm font-bold text-slate-500 mb-1">{plan.name}</p>
                    <div className="flex items-baseline gap-2">
                      <span
                        className="text-4xl font-black text-white"

                      >
                        {plan.price}
                      </span>
                      <span className="text-sm text-slate-500">{plan.per}</span>
                    </div>
                    {plan.otherPrices && (
                      <div className="flex gap-3 mt-2">
                        {plan.otherPrices.map((op, j) => (
                          <span key={j} className="text-xs text-slate-400">
                            {op.label}: <span className="text-slate-500">{op.price}</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <Link
                    href="/download"
                    className={`block w-full py-3.5 rounded-2xl text-sm font-bold text-center transition-all hover:scale-[1.02] active:scale-[0.98] mb-6 ${plan.highlight
                        ? 'text-white hover:shadow-lg hover:shadow-indigo-500/25'
                        : plan.ctaStyle
                      }`}
                    style={
                      plan.highlight
                        ? { background: 'linear-gradient(135deg, #818cf8, #c084fc)' }
                        : {}
                    }
                  >
                    {plan.cta}
                  </Link>

                  <ul className="flex flex-col gap-3">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm">
                        <Check
                          size={15}
                          className={`${plan.highlight ? 'text-indigo-400' : 'text-slate-500'
                            } mt-0.5 flex-shrink-0`}
                        />
                        <span className={plan.highlight ? 'text-slate-300' : 'text-slate-500'}>{f}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ────────────────────────────────────────────────────────── */}
        <section className="relative py-32 px-6 sm:px-8">
          {/* Glow FORA do overflow-hidden — sangra 180px acima da seção, preenchendo a quebra */}
          <div
            className="absolute left-1/2 -translate-x-1/2 w-[1000px] h-[700px] rounded-full pointer-events-none"
            style={{ top: '-180px', opacity: 0.22, background: 'radial-gradient(ellipse at 50% 20%, rgba(129,140,248,0.95) 0%, rgba(99,102,241,0.4) 38%, transparent 68%)' }}
          />
          {/* Sparkles em container próprio com overflow-hidden */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[
              { top: '22%', left: '12%', size: 3, color: '#818cf8', dur: 2.6, delay: 0 },
              { top: '65%', left: '7%', size: 4, color: '#c084fc', dur: 3.3, delay: 0.9 },
              { top: '30%', right: '10%', size: 3, color: '#818cf8', dur: 2.9, delay: 0.4 },
              { top: '70%', right: '18%', size: 4, color: '#f472b6', dur: 3.6, delay: 1.5 },
              { top: '12%', left: '42%', size: 2, color: '#a78bfa', dur: 2.2, delay: 1.1 },
              { top: '80%', left: '55%', size: 3, color: '#c084fc', dur: 3.0, delay: 0.6 },
            ].map((s, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  top: s.top, left: s.left, right: s.right,
                  width: s.size, height: s.size,
                  background: s.color,
                  boxShadow: `0 0 6px 2px ${s.color}`,
                  animation: `sparkle ${s.dur}s ease-in-out infinite`,
                  animationDelay: `${s.delay}s`,
                }}
              />
            ))}
          </div>
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <InView>
              <h2
                className="text-4xl sm:text-5xl font-black tracking-tight mb-6"

              >
                {t('homepage.cta.title')}
                <br />
                {t('homepage.cta.titleLine2')}
              </h2>
              <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                {t('homepage.cta.subtitle')}
              </p>
              <Link
                href="/download"
                className="group inline-flex items-center gap-2 px-10 py-5 rounded-2xl text-base font-bold text-white transition-all duration-200 hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/30 active:scale-[0.98]"
                style={{ background: 'linear-gradient(135deg, #818cf8, #c084fc)' }}
              >
                {t('common.download')}
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <p className="mt-6 text-xs text-slate-400">
                {t('homepage.cta.disclaimer')}
              </p>
            </InView>
          </div>
        </section>

        <style>{`
        /* Badges sempre centralizados */
        .feature-badge {
          justify-content: center;
        }
        /* Último item ímpar no desktop — centralizado, mesma largura */
        .feature-grid > *:last-child:nth-child(odd) {
          grid-column: 1 / -1;
          justify-self: center;
          max-width: 260px;
          width: 100%;
        }
        @media (max-width: 640px) {
          .feature-grid {
            grid-template-columns: 1fr !important;
          }
          .feature-grid > *:last-child:nth-child(odd) {
            max-width: 100%;
          }
          .feature-badge {
            font-size: 11px;
            padding: 0.35rem 0.75rem;
            gap: 0.5rem;
          }
        }
        @keyframes imageFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-9px); }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50%       { opacity: 0.9; transform: scale(1.6); }
        }
        @keyframes gradientMove {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes carouselLeft {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes carouselRight {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        .carousel-track-left {
          width: max-content;
          animation: carouselLeft 60s linear infinite;
          will-change: transform;
        }
        .carousel-track-right {
          width: max-content;
          animation: carouselRight 60s linear infinite;
          will-change: transform;
        }
      `}</style>
      </div>
    </>
  );
}
