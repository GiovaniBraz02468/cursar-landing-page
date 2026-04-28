'use client'
// pages/ModulesPage.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';
import { GraduationCap, Users, Dumbbell, Sparkles, Clock, ArrowRight, Layers } from 'lucide-react';
import { MODULES, MODULE_AREAS } from '../data/modulesData';
import ModuleModal from '../components/ModuleModal';

const AREA_ORDER = ['estudantil', 'social', 'fitness', 'pessoal'];

const AREA_META = {
  estudantil: {
    Icon: GraduationCap,
    color: '#818cf8',
    border: 'rgba(99,102,241,0.4)',
    activeBg: 'rgba(99,102,241,0.1)',
    glow: '0 0 24px rgba(99,102,241,0.25)',
  },
  social: {
    Icon: Users,
    color: '#f472b6',
    border: 'rgba(236,72,153,0.4)',
    activeBg: 'rgba(236,72,153,0.1)',
    glow: '0 0 24px rgba(236,72,153,0.2)',
  },
  fitness: {
    Icon: Dumbbell,
    color: '#4ade80',
    border: 'rgba(34,197,94,0.4)',
    activeBg: 'rgba(34,197,94,0.1)',
    glow: '0 0 24px rgba(34,197,94,0.2)',
  },
  pessoal: {
    Icon: Sparkles,
    color: '#fbbf24',
    border: 'rgba(245,158,11,0.4)',
    activeBg: 'rgba(245,158,11,0.1)',
    glow: '0 0 24px rgba(245,158,11,0.2)',
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = { show: { transition: { staggerChildren: 0.045 } } };

export default function ModulesPage() {
  const [activeArea, setActiveArea]     = useState('estudantil');
  const [selectedModule, setSelectedModule] = useState(null);
  const [isMobile, setIsMobile]         = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const filtered = MODULES.filter((m) => m.area === activeArea);
  const areaInfo = MODULE_AREAS[activeArea];
  const areaMeta = AREA_META[activeArea];

  return (
    <>
    <div style={{ minHeight: '100vh', background: '#080718', color: '#fff', position: 'relative', overflow: 'hidden' }}>

      {/* Glow de fundo */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '600px', pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '900px', height: '500px', background: 'radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.14) 0%, rgba(129,140,248,0.06) 50%, transparent 70%)' }} />
      </div>

      <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '5rem 1rem 5rem', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: '2.5rem' }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.22)', color: '#818cf8', fontSize: '0.75rem', fontWeight: 600, padding: '0.375rem 0.875rem', borderRadius: 999, marginBottom: '1.25rem' }}>
            <Layers size={11} />
            Plataforma completa
          </div>
          <h1 style={{ fontSize: 'clamp(1.2rem, 5vw, 2.75rem)', fontWeight: 900, lineHeight: 1.08, letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
            Cada área da sua vida,{' '}
            <span style={{ color: '#64748b' }}>com a ferramenta certa.</span>
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.8125rem' }}>
            Clique em um card para ver mais sobre esse módulo.
          </p>
        </motion.div>

        {/* Seletor 2×2 */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.625rem', marginBottom: '2rem' }}
        >
          {AREA_ORDER.map((areaKey) => {
            const area     = MODULE_AREAS[areaKey];
            const meta     = AREA_META[areaKey];
            const isActive = activeArea === areaKey;
            const count    = MODULES.filter((m) => m.area === areaKey && !m.soon).length;
            const { Icon } = meta;

            return (
              <button
                key={areaKey}
                onClick={() => setActiveArea(areaKey)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: isMobile ? '0.75rem' : '0.875rem 1.125rem',
                  borderRadius: '0.875rem',
                  border: `1px solid ${isActive ? meta.border : 'rgba(255,255,255,0.07)'}`,
                  background: isActive ? meta.activeBg : 'rgba(255,255,255,0.02)',
                  boxShadow: isActive ? meta.glow : 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s ease',
                }}
              >
                {/* Ícone da área */}
                <div style={{
                  width: isMobile ? 34 : 38, height: isMobile ? 34 : 38,
                  borderRadius: '0.625rem',
                  background: isActive ? `${meta.color}22` : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${isActive ? `${meta.color}40` : 'rgba(255,255,255,0.06)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  transition: 'all 0.2s',
                }}>
                  <Icon size={isMobile ? 15 : 17} style={{ color: isActive ? meta.color : '#64748b' }} strokeWidth={1.75} />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: isMobile ? '0.8rem' : '0.875rem', fontWeight: 800, color: isActive ? '#f1f5f9' : '#94a3b8', lineHeight: 1 }}>
                      {area.label}
                    </span>
                    {area.soon && (
                      <span style={{ fontSize: 7, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.06em', background: 'rgba(245,158,11,0.12)', color: '#f59e0b', padding: '2px 5px', borderRadius: 999 }}>
                        Em breve
                      </span>
                    )}
                  </div>
                  {!area.soon && (
                    <p style={{ fontSize: '0.65rem', color: isActive ? meta.color : '#475569', fontWeight: 600, marginTop: '0.125rem', transition: 'color 0.2s' }}>
                      {count} {count === 1 ? 'módulo' : 'módulos'}
                    </p>
                  )}
                </div>
              </button>
            );
          })}
        </motion.div>

        {/* Conteúdo da área */}
        <AnimatePresence mode="wait">
          {areaInfo.soon ? (
            <motion.div
              key={activeArea + '-soon'}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              style={{ textAlign: 'center', padding: '4rem 1rem' }}
            >
              <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 56, height: 56, borderRadius: '1rem', background: `${areaMeta.color}15`, border: `1px solid ${areaMeta.color}30`, marginBottom: '1rem' }}>
                <Clock size={24} style={{ color: areaMeta.color }} strokeWidth={1.5} />
              </div>
              <p style={{ fontSize: '1rem', fontWeight: 800, color: '#e2e8f0', marginBottom: '0.5rem' }}>Em planejamento</p>
              <p style={{ fontSize: '0.8125rem', color: '#94a3b8', maxWidth: '22rem', margin: '0 auto' }}>
                {areaInfo.description}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={activeArea}
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={stagger}
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
                gap: isMobile ? '0.5rem' : '0.75rem',
              }}
            >
              {filtered.map((mod) => {
                const IconComp = Icons[mod.icon] || Icons.Layers;
                return (
                  <motion.button
                    key={mod.id}
                    variants={fadeUp}
                    onClick={() => setSelectedModule(mod)}
                    whileTap={{ scale: 0.97 }}
                    className={`text-left rounded-2xl border ${mod.border}`}
                    style={{
                      padding: isMobile ? '0.75rem' : '1rem',
                      background: 'rgba(255,255,255,0.02)',
                      cursor: 'pointer',
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.5rem',
                      textAlign: 'center',
                      transition: 'background 0.2s, box-shadow 0.2s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.boxShadow = `0 0 20px ${mod.glow}`; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; e.currentTarget.style.boxShadow = 'none'; }}
                  >
                    {/* Ícone */}
                    <div
                      className={`rounded-xl flex items-center justify-center ${mod.bg} border ${mod.border}`}
                      style={{ width: isMobile ? 32 : 38, height: isMobile ? 32 : 38, flexShrink: 0 }}
                    >
                      <IconComp size={isMobile ? 14 : 17} className={mod.color} strokeWidth={1.5} />
                    </div>

                    {/* Nome */}
                    <span style={{ fontSize: isMobile ? '0.75rem' : '0.8125rem', fontWeight: 800, color: '#f1f5f9', lineHeight: 1.2 }}>
                      {mod.title}
                    </span>

                    {/* Ver mais */}
                    <span className={`text-[10px] font-bold ${mod.color}`} style={{ opacity: 0.85 }}>
                      Ver mais →
                    </span>
                  </motion.button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          style={{ textAlign: 'center', marginTop: '3.5rem' }}
        >
          <p style={{ color: '#94a3b8', fontSize: '0.75rem', marginBottom: '1rem' }}>
            Todos disponíveis gratuitamente para começar.
          </p>
          <a
            href="https://app.cursar.me/register"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.875rem 1.75rem', borderRadius: '0.875rem',
              fontSize: '0.875rem', fontWeight: 700, color: '#fff',
              textDecoration: 'none',
              background: 'linear-gradient(135deg, #818cf8, #c084fc)',
            }}
          >
            Criar conta grátis
            <ArrowRight size={14} />
          </a>
        </motion.div>
      </div>

      {selectedModule && (
        <ModuleModal module={selectedModule} onClose={() => setSelectedModule(null)} />
      )}
    </div>
    </>
  );
}
