// ModuleModal.jsx
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Lock, Zap } from 'lucide-react';
import * as Icons from 'lucide-react';

export default function ModuleModal({ module: mod, onClose }) {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  if (!mod) return null;
  const IconComponent = Icons[mod.icon] || Icons.Layers;

  const panelStyle = isMobile
    ? { borderRadius: '1.5rem 1.5rem 0 0', maxHeight: '92vh', overflowY: 'auto', background: '#0d0c22', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 -8px 40px rgba(0,0,0,0.5)' }
    : { borderRadius: '1.5rem',             maxHeight: '90vh', overflowY: 'auto', background: '#0d0c22', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 25px 80px rgba(0,0,0,0.6)' };

  const content = (
    <>
      {/* Glow */}
      <div
        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '10rem', opacity: 0.2, pointerEvents: 'none', background: `radial-gradient(ellipse at top, ${mod.glow || 'rgba(129,140,248,0.3)'}, transparent 70%)` }}
      />

      {/* Header */}
      <div style={{ position: 'relative', padding: '1.5rem 1.5rem 1rem' }}>
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: '1rem', right: '1rem', padding: '0.5rem', borderRadius: '0.75rem', background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
          onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = '#64748b'; e.currentTarget.style.background = 'none'; }}
        >
          <X size={18} />
        </button>

        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 border ${mod.bg} ${mod.border}`}>
          <IconComponent size={26} className={mod.color} strokeWidth={1.5} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#fff' }}>{mod.title}</h2>
          {mod.soon && (
            <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', background: 'rgba(245,158,11,0.15)', color: '#fbbf24', border: '1px solid rgba(245,158,11,0.25)', padding: '3px 8px', borderRadius: 999 }}>
              Em breve
            </span>
          )}
        </div>
        <p className={`text-sm font-medium mb-3 ${mod.color}`}>{mod.tagline}</p>
        <p style={{ color: '#cbd5e1', fontSize: '0.875rem', lineHeight: 1.65 }}>{mod.description}</p>
      </div>

      {/* Features */}
      {mod.features && mod.features.length > 0 && (
        <div style={{ padding: '0 1.5rem 1rem' }}>
          <p style={{ fontSize: '0.625rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#475569', marginBottom: '0.75rem' }}>Funcionalidades</p>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {mod.features.map((f, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.875rem', color: '#cbd5e1' }}>
                <Check size={15} className="text-emerald-400" style={{ marginTop: 2, flexShrink: 0 }} />
                {f}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Limits */}
      {!mod.soon && mod.limits && (
        <div style={{ margin: '0.5rem 1.5rem 1.5rem', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}>
          <div style={{ display: 'flex' }}>
            <div style={{ flex: 1, padding: '1rem', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: '0.5rem' }}>
                <Lock size={12} color="#64748b" />
                <span style={{ fontSize: '0.625rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#64748b' }}>Free</span>
              </div>
              <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{mod.limits.free}</p>
            </div>
            <div style={{ flex: 1, padding: '1rem', background: 'linear-gradient(135deg, rgba(129,140,248,0.06), rgba(192,132,252,0.06))' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: '0.5rem' }}>
                <Zap size={12} color="#818cf8" />
                <span style={{ fontSize: '0.625rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#818cf8' }}>Pro</span>
              </div>
              <p style={{ fontSize: '0.75rem', color: '#e2e8f0' }}>{mod.limits.pro}</p>
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <div style={{ padding: '0 1.5rem 1.5rem' }}>
        <a
          href="https://app.cursar.me/register"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'block', width: '100%', padding: '0.875rem', borderRadius: '1rem', fontSize: '0.875rem', fontWeight: 700, color: '#fff', textAlign: 'center', textDecoration: 'none', background: 'linear-gradient(135deg, #818cf8, #c084fc)', boxSizing: 'border-box' }}
        >
          Começar grátis agora
        </a>
      </div>
    </>
  );

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
      />

      {isMobile ? (
        /* ── Mobile: bottom sheet ── */
        <div
          key="mobile-wrapper"
          style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 51 }}
          onClick={(e) => e.stopPropagation()}
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 280, damping: 30 }}
            style={panelStyle}
          >
            {content}
          </motion.div>
        </div>
      ) : (
        /* ── Desktop: centralizado ── */
        <div
          key="desktop-wrapper"
          style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 51, width: '100%', maxWidth: '32rem', padding: '0 1rem' }}
          onClick={(e) => e.stopPropagation()}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            style={panelStyle}
          >
            {content}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
