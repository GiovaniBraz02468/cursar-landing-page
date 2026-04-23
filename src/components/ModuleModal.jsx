// ModuleModal.jsx
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Lock, Zap } from 'lucide-react';
import * as Icons from 'lucide-react';

export default function ModuleModal({ module: mod, onClose }) {
  // Lock body scroll
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

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

        {/* Panel */}
        <motion.div
          initial={{ y: 60, opacity: 0, scale: 0.97 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 60, opacity: 0, scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
          className="relative z-10 w-full sm:max-w-lg bg-[#0d0c22] border border-white/10 rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
        >
          {/* Glow bg */}
          <div
            className="absolute top-0 left-0 right-0 h-40 opacity-20 pointer-events-none"
            style={{ background: `radial-gradient(ellipse at top, ${mod.glow || 'rgba(129,140,248,0.3)'}, transparent 70%)` }}
          />

          {/* Header */}
          <div className="relative p-6 pb-4">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-500 hover:text-white hover:bg-white/10 transition-all"
            >
              <X size={18} />
            </button>

            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 border ${mod.bg} ${mod.border}`}>
              <IconComponent size={26} className={mod.color} strokeWidth={1.5} />
            </div>

            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-2xl font-black text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
                {mod.title}
              </h2>
              {mod.soon && (
                <span className="text-[10px] font-bold uppercase tracking-widest bg-amber-500/15 text-amber-400 border border-amber-500/25 px-2.5 py-1 rounded-full">
                  Em breve
                </span>
              )}
            </div>
            <p className={`text-sm font-medium mb-3 ${mod.color}`}>{mod.tagline}</p>
            <p className="text-slate-300 text-sm leading-relaxed">{mod.description}</p>
          </div>

          {/* Features */}
          {mod.features && mod.features.length > 0 && (
            <div className="px-6 pb-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-600 mb-3">Funcionalidades</p>
              <ul className="flex flex-col gap-2">
                {mod.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                    <Check size={15} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Limits */}
          {!mod.soon && mod.limits && (
            <div className="mx-6 mb-6 mt-2 rounded-2xl border border-white/5 overflow-hidden">
              <div className="flex">
                <div className="flex-1 p-4 border-r border-white/5">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Lock size={12} className="text-slate-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Free</span>
                  </div>
                  <p className="text-xs text-slate-400">{mod.limits.free}</p>
                </div>
                <div className="flex-1 p-4"
                  style={{ background: 'linear-gradient(135deg, rgba(129,140,248,0.06), rgba(192,132,252,0.06))' }}>
                  <div className="flex items-center gap-1.5 mb-2">
                    <Zap size={12} className="text-indigo-400" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500">Pro</span>
                  </div>
                  <p className="text-xs text-slate-300">{mod.limits.pro}</p>
                </div>
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="px-6 pb-6">
            <a
              href="https://app.cursar.me/register"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3.5 rounded-2xl text-sm font-semibold text-white text-center transition-all hover:opacity-90 hover:scale-[1.01] active:scale-[0.99]"
              style={{ background: 'linear-gradient(135deg, #818cf8, #c084fc)' }}
            >
              Começar grátis agora
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}