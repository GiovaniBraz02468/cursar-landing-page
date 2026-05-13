'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe, Download, ExternalLink, Layers, Check, Clock, Lock,
  Smartphone, Apple, Zap, Heart, Languages,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const WindowsLogo = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 22 22" fill="currentColor">
    <path d="M0.5 3.9L9.5 2.55v8.45H0.5V3.9z" />
    <path d="M10.5 2.35L21.5 0.5V11H10.5V2.35z" />
    <path d="M0.5 12h9V20.3L0.5 18.95V12z" />
    <path d="M10.5 12h11V21.5L10.5 19.65V12z" />
  </svg>
);

const PLATFORMS = [
  { id: 'windows', Icon: WindowsLogo, active: true,  href: 'https://cursar.me/arquivos/Cursar%20Setup%200.0.6.exe', cta: 'download' },
  { id: 'web',     Icon: Globe,       active: true,  href: 'https://app.cursar.me', cta: 'external' },
  { id: 'android', Icon: Smartphone,  active: false, cta: 'clock' },
  { id: 'ios',     Icon: Apple,       active: false, cta: 'lock' },
];

const THEMES = {
  windows: {
    panel:    'bg-[#080c1a] border-blue-500/30',
    atmosphere: 'from-blue-600/[0.10] via-transparent to-transparent',
    blob:     'bg-blue-600/[0.10]',
    iconWrap: 'from-blue-800/70 to-blue-900/30 border-blue-400/30 text-blue-200',
    iconGlow: 'bg-blue-500/30',
    badge:    'bg-blue-500/15 border-blue-400/30 text-blue-300',
    pill:     'bg-blue-500/15 border-blue-400/40 text-blue-100 shadow-[0_0_24px_rgba(59,130,246,0.22)]',
    dot:      'bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.9)]',
    chip:     'bg-blue-500/[0.08] border-blue-500/20 text-blue-200/85',
    chipIcon: 'text-blue-400',
    button:   'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 hover:shadow-[0_0_60px_rgba(59,130,246,0.50)]',
    pageGlow: 'bg-blue-500/[0.07]',
    floater:  'text-blue-300',
    borderHex: 'rgba(96, 165, 250, 0.65)',
    ringHex:   'rgba(59, 130, 246, 0.18)',
  },
  web: {
    panel:    'bg-[#080f10] border-emerald-500/30',
    atmosphere: 'from-emerald-600/[0.10] via-transparent to-transparent',
    blob:     'bg-emerald-600/[0.10]',
    iconWrap: 'from-emerald-800/70 to-emerald-900/30 border-emerald-400/30 text-emerald-200',
    iconGlow: 'bg-emerald-500/30',
    badge:    'bg-emerald-500/15 border-emerald-400/30 text-emerald-300',
    pill:     'bg-emerald-500/15 border-emerald-400/40 text-emerald-100 shadow-[0_0_24px_rgba(16,185,129,0.22)]',
    dot:      'bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.9)]',
    chip:     'bg-emerald-500/[0.08] border-emerald-500/20 text-emerald-200/85',
    chipIcon: 'text-emerald-400',
    button:   'bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 hover:shadow-[0_0_60px_rgba(16,185,129,0.50)]',
    pageGlow: 'bg-emerald-500/[0.07]',
    floater:  'text-emerald-300',
    borderHex: 'rgba(52, 211, 153, 0.65)',
    ringHex:   'rgba(16, 185, 129, 0.18)',
  },
  android: {
    panel:    'bg-[#0f0d08] border-amber-500/30',
    atmosphere: 'from-amber-500/[0.10] via-transparent to-transparent',
    blob:     'bg-amber-500/[0.08]',
    iconWrap: 'from-amber-800/60 to-amber-900/20 border-amber-400/25 text-amber-200',
    iconGlow: 'bg-amber-500/25',
    badge:    'bg-amber-500/15 border-amber-400/30 text-amber-300',
    pill:     'bg-amber-500/15 border-amber-400/40 text-amber-100 shadow-[0_0_24px_rgba(245,158,11,0.22)]',
    dot:      'bg-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.9)]',
    disabled: 'bg-amber-500/[0.07] border border-amber-500/20 text-amber-400/70',
    pageGlow: 'bg-amber-500/[0.05]',
    floater:  'text-amber-300',
    borderHex: 'rgba(252, 211, 77, 0.55)',
    ringHex:   'rgba(245, 158, 11, 0.16)',
  },
  ios: {
    panel:    'bg-[#0a0a0d] border-white/[0.10]',
    atmosphere: 'from-slate-400/[0.05] via-transparent to-transparent',
    blob:     'bg-slate-400/[0.04]',
    iconWrap: 'from-slate-700/40 to-slate-900/20 border-slate-500/20 text-slate-400',
    iconGlow: 'bg-slate-400/10',
    badge:    'bg-white/[0.05] border-white/[0.10] text-slate-400',
    pill:     'bg-white/[0.08] border-white/[0.18] text-slate-100',
    dot:      'bg-slate-500',
    disabled: 'bg-white/[0.03] border border-white/[0.08] text-slate-600',
    pageGlow: 'bg-slate-400/[0.04]',
    floater:  'text-slate-400',
    borderHex: 'rgba(148, 163, 184, 0.40)',
    ringHex:   'rgba(148, 163, 184, 0.10)',
  },
};

const FLOATERS = [
  { top: '12%',   right: '8%',  size: 28, dur: 9.0,  delay: 0,   yShift: -10, rot: 6,  opacity: 0.07 },
  { bottom:'18%', left:  '10%', size: 22, dur: 11.0, delay: 1.5, yShift:  -8, rot: 5,  opacity: 0.06 },
  { top: '55%',   right: '20%', size: 18, dur: 12.0, delay: 2.5, yShift:  10, rot: -6, opacity: 0.05 },
];

const BENEFITS = [
  { key: 'sync',  Icon: Zap,       hue: 'indigo'  },
  { key: 'free',  Icon: Heart,     hue: 'pink'    },
  { key: 'langs', Icon: Languages, hue: 'cyan'    },
];

const BENEFIT_COLORS = {
  indigo: { bg: 'bg-indigo-500/10', border: 'border-indigo-500/20', icon: 'text-indigo-400', iconBg: 'bg-indigo-500/15' },
  pink:   { bg: 'bg-pink-500/10',   border: 'border-pink-500/20',   icon: 'text-pink-400',   iconBg: 'bg-pink-500/15'   },
  cyan:   { bg: 'bg-cyan-500/10',   border: 'border-cyan-500/20',   icon: 'text-cyan-400',   iconBg: 'bg-cyan-500/15'   },
};

export default function DownloadContent() {
  const { t } = useLanguage();
  const [selected, setSelected] = useState('windows');

  // Auto-detect platform on mount (silent — no banner)
  useEffect(() => {
    if (typeof navigator === 'undefined') return;
    const ua = navigator.userAgent.toLowerCase();
    let detected = 'windows';
    if (/android/.test(ua)) detected = 'android';
    else if (/iphone|ipad|ipod/.test(ua)) detected = 'ios';
    else if (/mac/.test(ua) && !/iphone|ipad/.test(ua)) detected = 'web';
    else if (/windows/.test(ua)) detected = 'windows';
    else detected = 'web';
    setSelected(detected);
  }, []);

  const current = PLATFORMS.find(p => p.id === selected);
  const theme = THEMES[selected];
  const CurrentIcon = current.Icon;

  return (
    <div className="min-h-screen bg-[#080718] text-white pt-20 pb-24 px-4 relative overflow-hidden">

      {/* ─── PAGE-WIDE AURORA (subtle) ─── */}
      <motion.div
        className={`absolute top-0 left-1/4 w-[700px] h-[700px] ${theme.pageGlow} blur-[220px] pointer-events-none transition-colors duration-700 opacity-70`}
        animate={{ x: [0, 60, 0], y: [0, 30, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className={`absolute bottom-0 right-1/4 w-[600px] h-[600px] ${theme.pageGlow} blur-[220px] pointer-events-none transition-colors duration-700 opacity-50`}
        animate={{ x: [0, -50, 0], y: [0, -25, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />

      {/* ─── SUBTLE DOT GRID ─── */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* ─── HEADER ─── */}
        <div className="text-center mb-8 pt-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold mb-6 tracking-wide"
          >
            <Layers size={13} />
            {t('downloadPage.badge')}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              backgroundImage: 'linear-gradient(180deg, #ffffff 0%, #c7d2fe 110%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
            className="font-black mb-4 tracking-tight leading-tight"
          >
            {t('downloadPage.title')}{' '}
            <span style={{ WebkitTextFillColor: '#64748b', color: '#64748b' }}>{t('downloadPage.titleGray')}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto leading-relaxed"
          >
            {t('downloadPage.subtitle')}
          </motion.p>
        </div>

        {/* ─── PLATFORM SELECTOR (UNIFORM GRID) ─── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 mb-6"
        >
          {PLATFORMS.map((p) => {
            const ptheme = THEMES[p.id];
            const isActive = selected === p.id;
            const IconComp = p.Icon;
            return (
              <button
                key={p.id}
                onClick={() => setSelected(p.id)}
                className={`relative group flex items-center justify-center gap-2.5 px-3 sm:px-4 py-3 rounded-2xl border text-sm font-bold transition-all duration-300 ${
                  isActive
                    ? ptheme.pill
                    : 'bg-white/[0.025] border-white/[0.07] text-slate-400 hover:bg-white/[0.05] hover:text-white hover:border-white/[0.12]'
                }`}
              >
                <IconComp size={17} />
                <span className="truncate">{t(`downloadPage.platforms.${p.id}.title`)}</span>
                <motion.span
                  className={`flex-shrink-0 w-1.5 h-1.5 rounded-full ${
                    isActive
                      ? ptheme.dot
                      : p.active
                        ? 'bg-slate-500'
                        : 'bg-slate-700'
                  }`}
                  animate={isActive && p.active ? { scale: [1, 1.4, 1], opacity: [1, 0.7, 1] } : {}}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
              </button>
            );
          })}
        </motion.div>

        {/* ─── SPOTLIGHT WITH ORBITING PLATFORM ICONS ─── */}
        <div className="relative">

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`relative overflow-hidden rounded-[2.5rem] border ${theme.panel} transition-colors duration-500`}
            style={{ boxShadow: `0 30px 80px -30px ${theme.ringHex}` }}
          >
            {/* atmosphere */}
            <div className={`absolute inset-0 bg-gradient-to-br ${theme.atmosphere} pointer-events-none transition-opacity duration-500`} />
            <motion.div
              className={`absolute -top-1/3 -left-1/4 w-[700px] h-[700px] ${theme.blob} rounded-full blur-[160px] pointer-events-none transition-colors duration-500`}
              animate={{ x: [0, 40, 0], y: [0, 20, 0] }}
              transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className={`absolute -bottom-1/4 -right-1/4 w-[500px] h-[500px] ${theme.blob} rounded-full blur-[140px] pointer-events-none transition-colors duration-500 opacity-50`}
              animate={{ x: [0, -30, 0], y: [0, -15, 0] }}
              transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            />

            {/* giant background icon — desktop only */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.05] text-white pointer-events-none select-none hidden lg:block transition-opacity duration-500">
              <CurrentIcon size={360} />
            </div>

            {/* floating decorative mini-icons */}
            <div className="absolute inset-0 pointer-events-none select-none hidden md:block">
              {FLOATERS.map((f, i) => (
                <motion.div
                  key={`${selected}-${i}`}
                  className={`absolute ${theme.floater} transition-colors duration-500`}
                  style={{
                    top: f.top,
                    right: f.right,
                    bottom: f.bottom,
                    left: f.left,
                    opacity: f.opacity,
                  }}
                  animate={{ y: [0, f.yShift, 0], rotate: [0, f.rot, 0] }}
                  transition={{ duration: f.dur, repeat: Infinity, ease: 'easeInOut', delay: f.delay }}
                >
                  <CurrentIcon size={f.size} />
                </motion.div>
              ))}
            </div>

            {/* Animated content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selected}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="relative p-5 sm:p-8 md:p-12 lg:p-14"
              >
                {/* ── MOBILE COMPACT HEADER ── */}
                <div className="md:hidden flex items-center gap-4 mb-5">
                  <motion.div
                    className="relative flex-shrink-0"
                    initial={{ scale: 0.92, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  >
                    <motion.div
                      className={`absolute -inset-3 rounded-full ${theme.iconGlow} blur-2xl opacity-60`}
                      animate={{ opacity: [0.4, 0.7, 0.4] }}
                      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <div className={`relative w-[72px] h-[72px] rounded-2xl bg-gradient-to-br ${theme.iconWrap} border flex items-center justify-center`}>
                      <CurrentIcon size={36} />
                    </div>
                  </motion.div>
                  <div className="flex-grow min-w-0">
                    <h2 className="text-2xl font-black tracking-tight leading-tight mb-1.5">
                      {t(`downloadPage.platforms.${selected}.title`)}
                    </h2>
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full ${theme.badge} border text-[9px] font-bold tracking-[0.15em] uppercase`}>
                      {t(`downloadPage.platforms.${selected}.badge`)}
                    </span>
                  </div>
                </div>

                {/* ── DESKTOP LAYOUT ── */}
                <div className="hidden md:flex md:flex-row md:items-center gap-10 lg:gap-14">
                  <div className="flex-shrink-0 flex flex-col items-center gap-4">
                    <motion.div
                      className="relative"
                      initial={{ scale: 0.92, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1, y: [0, -6, 0] }}
                      transition={{
                        scale: { duration: 0.4, ease: 'easeOut' },
                        opacity: { duration: 0.4, ease: 'easeOut' },
                        y: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
                      }}
                    >
                      <motion.div
                        className={`absolute -inset-6 rounded-full ${theme.iconGlow} blur-3xl opacity-60`}
                        animate={{ opacity: [0.4, 0.75, 0.4] }}
                        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                      />
                      <div className={`relative w-32 h-32 lg:w-36 lg:h-36 rounded-[2rem] bg-gradient-to-br ${theme.iconWrap} border flex items-center justify-center`}>
                        <CurrentIcon size={68} />
                      </div>
                    </motion.div>
                    <span className={`px-3 py-1.5 rounded-full ${theme.badge} border text-[10px] font-bold tracking-[0.15em] uppercase whitespace-nowrap`}>
                      {t(`downloadPage.platforms.${selected}.badge`)}
                    </span>
                  </div>

                  <div className="flex-grow text-left max-w-xl">
                    <h2 className="text-4xl lg:text-5xl font-black mb-3 tracking-tight leading-[1.05]">
                      {t(`downloadPage.platforms.${selected}.title`)}
                    </h2>
                    <p className="text-slate-400 text-base lg:text-lg mb-6 leading-relaxed">
                      {t(`downloadPage.platforms.${selected}.description`)}
                    </p>

                    {current.active && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {['feature1', 'feature2', 'feature3'].map((k) => (
                          <span key={k} className={`inline-flex items-center gap-1.5 text-xs ${theme.chip} border px-3 py-1.5 rounded-full`}>
                            <Check size={10} className={`${theme.chipIcon} flex-shrink-0`} />
                            {t(`downloadPage.platforms.${selected}.${k}`)}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex flex-col items-start gap-2.5">
                      {current.active ? (
                        <a
                          href={current.href}
                          target={current.cta === 'external' ? '_blank' : undefined}
                          rel={current.cta === 'external' ? 'noopener noreferrer' : undefined}
                          className={`inline-flex items-center justify-center gap-3 px-9 py-4 rounded-2xl ${theme.button} text-white font-bold text-[15px] transition-all duration-300 hover:scale-[1.04] whitespace-nowrap`}
                        >
                          {current.cta === 'download' ? <Download size={18} /> : <ExternalLink size={18} />}
                          {t(`downloadPage.platforms.${selected}.button`)}
                        </a>
                      ) : (
                        <button
                          disabled
                          className={`inline-flex items-center justify-center gap-3 px-9 py-4 rounded-2xl ${theme.disabled} text-sm font-bold cursor-not-allowed whitespace-nowrap`}
                        >
                          {current.cta === 'clock' ? <Clock size={16} /> : <Lock size={16} />}
                          {t(`downloadPage.platforms.${selected}.button`)}
                        </button>
                      )}
                      {current.active && (
                        <p className="text-xs text-slate-500">{t(`downloadPage.platforms.${selected}.meta`)}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* ── MOBILE BODY ── */}
                <div className="md:hidden">
                  <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                    {t(`downloadPage.platforms.${selected}.description`)}
                  </p>

                  {current.active && (
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {['feature1', 'feature2', 'feature3'].map((k) => (
                        <span key={k} className={`inline-flex items-center gap-1 text-[10px] ${theme.chip} border px-2.5 py-1 rounded-full`}>
                          <Check size={9} className={`${theme.chipIcon} flex-shrink-0`} />
                          {t(`downloadPage.platforms.${selected}.${k}`)}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-col gap-2">
                    {current.active ? (
                      <a
                        href={current.href}
                        target={current.cta === 'external' ? '_blank' : undefined}
                        rel={current.cta === 'external' ? 'noopener noreferrer' : undefined}
                        className={`inline-flex items-center justify-center gap-3 w-full px-6 py-3.5 rounded-2xl ${theme.button} text-white font-bold text-sm transition-all duration-300 active:scale-[0.98] whitespace-nowrap`}
                      >
                        {current.cta === 'download' ? <Download size={16} /> : <ExternalLink size={16} />}
                        {t(`downloadPage.platforms.${selected}.button`)}
                      </a>
                    ) : (
                      <button
                        disabled
                        className={`inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-2xl ${theme.disabled} text-xs font-bold cursor-not-allowed whitespace-nowrap`}
                      >
                        {current.cta === 'clock' ? <Clock size={14} /> : <Lock size={14} />}
                        {t(`downloadPage.platforms.${selected}.button`)}
                      </button>
                    )}
                    {current.active && (
                      <p className="text-[10px] text-slate-500 text-center">{t(`downloadPage.platforms.${selected}.meta`)}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* ─── BENEFITS ROW ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6"
        >
          {BENEFITS.map((b, i) => {
            const c = BENEFIT_COLORS[b.hue];
            return (
              <motion.div
                key={b.key}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 + i * 0.07 }}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl ${c.bg} border ${c.border} backdrop-blur-sm`}
              >
                <div className={`flex-shrink-0 w-9 h-9 rounded-xl ${c.iconBg} ${c.icon} flex items-center justify-center`}>
                  <b.Icon size={17} />
                </div>
                <h4 className="text-sm font-semibold text-white/90 leading-tight">
                  {t(`downloadPage.benefits.${b.key}.title`)}
                </h4>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </div>
  );
}
