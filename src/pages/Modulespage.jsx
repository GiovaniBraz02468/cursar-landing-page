// pages/ModulesPage.jsx
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';
import { Clock } from 'lucide-react';
import { MODULES, MODULE_AREAS } from '../data/modulesData';
import ModuleModal from '../components/ModuleModal';

const AREA_ORDER = ['estudantil', 'social', 'fitness', 'pessoal'];

const AREA_COLORS = {
  estudantil: { active: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30', dot: 'bg-indigo-400' },
  social:     { active: 'bg-pink-500/15 text-pink-300 border-pink-500/30',       dot: 'bg-pink-400' },
  fitness:    { active: 'bg-green-500/15 text-green-300 border-green-500/30',     dot: 'bg-green-400' },
  pessoal:    { active: 'bg-amber-500/15 text-amber-300 border-amber-500/30',     dot: 'bg-amber-400' },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = { show: { transition: { staggerChildren: 0.07 } } };

export default function ModulesPage() {
  const [activeArea, setActiveArea] = useState('estudantil');
  const [selectedModule, setSelectedModule] = useState(null);

  const filtered = MODULES.filter((m) => m.area === activeArea);
  const areaInfo = MODULE_AREAS[activeArea];

  return (
    <div className="min-h-screen bg-[#080718] text-white pt-24 pb-20 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-xs font-black uppercase tracking-[0.4em] text-slate-600 mb-3">Módulos</p>
          <h1
            className="text-4xl sm:text-5xl font-black tracking-tight mb-4"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Cada área da sua vida,<br />
            <span className="text-slate-500">com a ferramenta certa.</span>
          </h1>
          <p className="text-slate-500 text-base max-w-xl mx-auto leading-relaxed">
            Explore os módulos por área. Clique em qualquer um para ver funcionalidades, limites e detalhes.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="flex flex-wrap gap-2 justify-center mb-12"
        >
          {AREA_ORDER.map((areaKey) => {
            const area = MODULE_AREAS[areaKey];
            const isActive = activeArea === areaKey;
            const colors = AREA_COLORS[areaKey];
            return (
              <button
                key={areaKey}
                onClick={() => setActiveArea(areaKey)}
                className={`flex items-center gap-2.5 px-5 py-2.5 rounded-2xl text-sm font-semibold border transition-all duration-200 ${
                  isActive
                    ? colors.active
                    : 'bg-white/[0.03] text-slate-500 border-white/5 hover:bg-white/[0.06] hover:text-slate-300'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isActive ? colors.dot : 'bg-slate-600'}`} />
                {area.label}
                {area.soon && (
                  <span className="text-[9px] font-black uppercase tracking-widest bg-amber-500/15 text-amber-500 px-1.5 py-0.5 rounded-full ml-1">
                    Em breve
                  </span>
                )}
              </button>
            );
          })}
        </motion.div>

        {/* Area description */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeArea + '-desc'}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="text-center mb-10"
          >
            <p className="text-slate-500 text-sm">{areaInfo.description}</p>
          </motion.div>
        </AnimatePresence>

        {/* Modules grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeArea}
            initial="hidden"
            animate="show"
            exit="hidden"
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {filtered.map((mod) => {
              const IconComponent = Icons[mod.icon] || Icons.Layers;
              return (
                <motion.button
                  key={mod.id}
                  variants={fadeUp}
                  onClick={() => !mod.soon && setSelectedModule(mod)}
                  whileHover={!mod.soon ? { scale: 1.02, y: -4 } : {}}
                  whileTap={!mod.soon ? { scale: 0.98 } : {}}
                  className={`group text-left p-6 rounded-3xl border transition-all duration-300 w-full ${
                    mod.soon
                      ? 'bg-white/[0.02] border-white/5 opacity-60 cursor-default'
                      : `bg-white/[0.03] ${mod.border} hover:bg-white/[0.06] cursor-pointer`
                  }`}
                >
                  {/* Glow on hover */}
                  {!mod.soon && (
                    <div
                      className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ background: `radial-gradient(circle at top left, ${mod.glow || 'rgba(129,140,248,0.08)'}, transparent 60%)` }}
                    />
                  )}

                  <div className="relative">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${mod.bg} border ${mod.border}`}>
                        <IconComponent size={24} className={mod.color} strokeWidth={1.5} />
                      </div>
                      {mod.soon ? (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-amber-500 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full">
                          <Clock size={10} />
                          Em breve
                        </span>
                      ) : (
                        <span className={`text-[10px] font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity ${mod.color}`}>
                          Ver mais →
                        </span>
                      )}
                    </div>

                    <h3
                      className="text-base font-black text-white mb-1.5"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      {mod.title}
                    </h3>
                    <p className={`text-xs font-semibold mb-3 ${mod.color}`}>{mod.tagline}</p>
                    <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">{mod.description}</p>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-20"
        >
          <p className="text-slate-500 text-sm mb-6">Todos esses módulos disponíveis gratuitamente para começar.</p>
          <a
            href="https://app.cursar.me/register"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-sm font-bold text-white transition-all hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/20"
            style={{ background: 'linear-gradient(135deg, #818cf8, #c084fc)' }}
          >
            Criar conta grátis
            <Icons.ArrowRight size={15} />
          </a>
        </motion.div>
      </div>

      {/* Modal */}
      {selectedModule && (
        <ModuleModal module={selectedModule} onClose={() => setSelectedModule(null)} />
      )}
    </div>
  );
}