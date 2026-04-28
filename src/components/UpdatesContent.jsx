'use client'
// pages/UpdatesPage.jsx
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Zap, Sparkles } from 'lucide-react';
import { UPDATES } from '../data/updatesData';

function formatDate(dateStr) {
  return new Date(dateStr + 'T12:00:00').toLocaleDateString('pt-BR', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
}

function getAccent(badgeColor) {
  if (badgeColor.includes('indigo'))  return { color: '#818cf8', rgb: '99,102,241'   };
  if (badgeColor.includes('cyan'))    return { color: '#22d3ee', rgb: '6,182,212'    };
  if (badgeColor.includes('emerald')) return { color: '#34d399', rgb: '52,211,153'   };
  if (badgeColor.includes('pink'))    return { color: '#f472b6', rgb: '244,114,182'  };
  if (badgeColor.includes('purple'))  return { color: '#c084fc', rgb: '192,132,252'  };
  return { color: '#818cf8', rgb: '99,102,241' };
}

function ChangeCounts({ changes }) {
  const novo     = changes.filter((c) => c.type === 'novo').length;
  const melhoria = changes.filter((c) => c.type === 'melhoria').length;
  const correcao = changes.filter((c) => c.type === 'correcao').length;
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
      {novo     > 0 && <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#34d399', background: 'rgba(52,211,153,0.1)',  border: '1px solid rgba(52,211,153,0.2)',  padding: '3px 8px', borderRadius: 999 }}>✦ {novo} {novo === 1 ? 'novidade' : 'novidades'}</span>}
      {melhoria > 0 && <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#60a5fa', background: 'rgba(96,165,250,0.1)',  border: '1px solid rgba(96,165,250,0.2)',  padding: '3px 8px', borderRadius: 999 }}>✦ {melhoria} {melhoria === 1 ? 'melhoria' : 'melhorias'}</span>}
      {correcao > 0 && <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#fbbf24', background: 'rgba(251,191,36,0.1)',  border: '1px solid rgba(251,191,36,0.2)',  padding: '3px 8px', borderRadius: 999 }}>✦ {correcao} {correcao === 1 ? 'correção' : 'correções'}</span>}
    </div>
  );
}

export default function UpdatesPage() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768);
    fn();
    window.addEventListener('resize', fn, { passive: true });
    return () => window.removeEventListener('resize', fn);
  }, []);

  const [featured, ...older] = UPDATES;
  const featuredAccent = getAccent(featured.badgeColor);

  return (
    <>
    <div style={{ minHeight: '100vh', background: '#080718', color: '#fff', position: 'relative', overflow: 'hidden' }}>

      {/* Glow de fundo */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '600px', pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '900px', height: '500px', background: 'radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.13) 0%, transparent 68%)' }} />
      </div>

      <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '5rem 1rem 5rem', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.2)', color: '#34d399', fontSize: '0.75rem', fontWeight: 600, padding: '0.375rem 0.875rem', borderRadius: 999, marginBottom: '1.25rem' }}>
            <Zap size={11} />
            Sempre evoluindo
          </div>
          <h1 style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.08, marginBottom: '0.75rem' }}>
            Atualizações
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.9375rem', maxWidth: '28rem', margin: '0 auto' }}>
            Cada versão, cada melhoria, cada novidade. Acompanhe a evolução do Cursar.me.
          </p>
        </motion.div>

        {/* ── Featured: versão mais recente ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <Link
            href={`/atualizacoes/${featured.id}`}
            style={{ textDecoration: 'none', display: 'block' }}
          >
            <div
              style={{
                position: 'relative',
                borderRadius: '1.25rem',
                border: `1px solid rgba(${featuredAccent.rgb},0.3)`,
                background: `linear-gradient(145deg, rgba(${featuredAccent.rgb},0.07) 0%, rgba(8,7,24,0.9) 60%)`,
                padding: isMobile ? '1.25rem' : '2rem',
                marginBottom: '1.5rem',
                overflow: 'hidden',
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = `rgba(${featuredAccent.rgb},0.55)`; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = `rgba(${featuredAccent.rgb},0.3)`; }}
            >
              {/* Glow interno */}
              <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '280px', height: '280px', borderRadius: '50%', background: `radial-gradient(circle, rgba(${featuredAccent.rgb},0.12) 0%, transparent 65%)`, pointerEvents: 'none' }} />

              {/* Topo: badges */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.625rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.12em', background: `rgba(${featuredAccent.rgb},0.15)`, color: featuredAccent.color, border: `1px solid rgba(${featuredAccent.rgb},0.3)`, padding: '3px 8px', borderRadius: 999 }}>
                  <Sparkles size={9} /> Mais recente
                </span>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${featured.badgeColor}`}>
                  {featured.badge}
                </span>
                <span style={{ fontSize: '0.7rem', fontFamily: 'monospace', color: '#94a3b8', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', padding: '2px 8px', borderRadius: 6 }}>
                  v{featured.version}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.7rem', color: '#94a3b8', marginLeft: 'auto' }}>
                  <Calendar size={10} />
                  {formatDate(featured.date)}
                </span>
              </div>

              <h2 style={{ fontSize: isMobile ? '1.25rem' : '1.625rem', fontWeight: 900, color: '#f1f5f9', letterSpacing: '-0.01em', lineHeight: 1.2, marginBottom: '0.625rem' }}>
                {featured.title}
              </h2>
              <p style={{ fontSize: '0.875rem', color: '#94a3b8', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                {featured.summary}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
                <ChangeCounts changes={featured.changes} />
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.8125rem', fontWeight: 700, color: featuredAccent.color }}>
                  Ver detalhes <ArrowRight size={13} />
                </span>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* ── Divisor ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}
        >
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
          <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#94a3b8' }}>Versões anteriores</span>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
        </motion.div>

        {/* ── Grid versões antigas ── */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '0.75rem' }}>
          {older.map((update, i) => {
            const accent = getAccent(update.badgeColor);
            return (
              <motion.div
                key={update.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.06, duration: 0.4 }}
                style={{ height: '100%' }}
              >
                <Link href={`/atualizacoes/${update.id}`} style={{ textDecoration: 'none', display: 'flex', height: '100%' }}>
                  <div
                    style={{
                      borderRadius: '1rem',
                      border: '1px solid rgba(255,255,255,0.07)',
                      background: 'rgba(255,255,255,0.02)',
                      padding: '1.125rem',
                      height: '100%',
                      width: '100%',
                      boxSizing: 'border-box',
                      transition: 'border-color 0.2s, background 0.2s, box-shadow 0.2s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = `rgba(${accent.rgb},0.3)`; e.currentTarget.style.background = `rgba(${accent.rgb},0.04)`; e.currentTarget.style.boxShadow = `0 0 24px rgba(${accent.rgb},0.08)`; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; e.currentTarget.style.boxShadow = 'none'; }}
                  >
                    {/* Meta */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                      <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${update.badgeColor}`}>
                        {update.badge}
                      </span>
                      <span style={{ fontSize: '0.65rem', fontFamily: 'monospace', color: '#94a3b8' }}>v{update.version}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: '0.65rem', color: '#94a3b8', marginLeft: 'auto' }}>
                        <Calendar size={9} /> {formatDate(update.date)}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#e2e8f0', lineHeight: 1.3, marginBottom: '0.5rem' }}>
                      {update.title}
                    </h3>
                    <p style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '0.875rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {update.summary}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <ChangeCounts changes={update.changes} />
                      <ArrowRight size={13} style={{ color: '#94a3b8', flexShrink: 0 }} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
    </>
  );
}
