// pages/UpdatesPage.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Zap } from 'lucide-react';
import { UPDATES } from '../data/updatesData';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = { show: { transition: { staggerChildren: 0.08 } } };

function formatDate(dateStr) {
  return new Date(dateStr + 'T12:00:00').toLocaleDateString('pt-BR', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
}

export default function UpdatesPage() {
  return (
    <div className="min-h-screen bg-[#080718] text-white pt-24 pb-20 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold px-4 py-2 rounded-full mb-6">
            <Zap size={12} />
            Sempre evoluindo
          </div>
          <h1
            className="text-4xl sm:text-5xl font-black tracking-tight mb-4"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Atualizações
          </h1>
          <p className="text-slate-500 text-base max-w-md mx-auto leading-relaxed">
            Cada versão, cada melhoria, cada novidade. Acompanhe a evolução do Cursar.me.
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger}
          className="relative"
        >
          {/* Vertical line */}
          <div className="absolute left-[1.1rem] top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/30 via-white/5 to-transparent" />

          <div className="flex flex-col gap-6">
            {UPDATES.map((update, i) => (
              <motion.div key={update.id} variants={fadeUp} className="relative pl-12">
                {/* Dot */}
                <div className={`absolute left-0 top-5 w-9 h-9 rounded-full flex items-center justify-center border text-xs font-black z-10 ${
                  i === 0
                    ? 'bg-gradient-to-br from-indigo-500 to-purple-600 border-indigo-400/50 text-white shadow-lg shadow-indigo-500/30'
                    : 'bg-[#0d0c22] border-white/10 text-slate-600'
                }`}>
                  {i === 0 ? <Zap size={14} /> : <span style={{ fontSize: '9px' }}>v</span>}
                </div>

                <Link
                  to={`/atualizacoes/${update.id}`}
                  className="group block p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300"
                >
                  {/* Hero image */}
                  {update.heroImage && (
                    <div className="w-full h-40 rounded-2xl overflow-hidden mb-5 bg-white/5">
                      <img src={update.heroImage} alt={update.title} className="w-full h-full object-cover" />
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${update.badgeColor}`}>
                      {update.badge}
                    </span>
                    <span className="text-[10px] font-mono text-slate-600 bg-white/5 px-2 py-1 rounded-lg border border-white/5">
                      {update.version}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-slate-600 ml-auto">
                      <Calendar size={10} />
                      {formatDate(update.date)}
                    </span>
                  </div>

                  <h2
                    className="text-lg font-black text-white mb-2 group-hover:text-indigo-300 transition-colors"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {update.title}
                  </h2>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4">{update.summary}</p>

                  {/* Change count */}
                  <div className="flex items-center justify-between">
                    <div className="flex gap-3">
                      {['novo', 'melhoria', 'correcao'].map((type) => {
                        const count = update.changes.filter((c) => c.type === type).length;
                        if (!count) return null;
                        const labels = { novo: { label: 'novidades', color: 'text-emerald-400' }, melhoria: { label: 'melhorias', color: 'text-blue-400' }, correcao: { label: 'correções', color: 'text-yellow-400' } };
                        return (
                          <span key={type} className={`text-xs font-semibold ${labels[type].color}`}>
                            {count} {labels[type].label}
                          </span>
                        );
                      })}
                    </div>
                    <span className="flex items-center gap-1 text-xs text-slate-600 group-hover:text-indigo-400 transition-colors font-semibold">
                      Ver detalhes
                      <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}