// pages/UpdateDetailPage.jsx
import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Copy, Check, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { UPDATES, CHANGE_TYPES, getUpdateUrl } from '../data/updatesData';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

function formatDate(dateStr) {
  return new Date(dateStr + 'T12:00:00').toLocaleDateString('pt-BR', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
}

export default function UpdateDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const update = UPDATES.find((u) => u.id === id);

  useEffect(() => {
    if (!update) navigate('/atualizacoes', { replace: true });
  }, [update, navigate]);

  if (!update) return null;

  const shareUrl = getUpdateUrl(update.id);

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Group changes by type
  const grouped = {};
  update.changes.forEach((c) => {
    if (!grouped[c.type]) grouped[c.type] = [];
    grouped[c.type].push(c);
  });
  const typeOrder = ['novo', 'melhoria', 'correcao', 'remocao'];

  return (
    <div className="min-h-screen bg-[#080718] text-white pt-24 pb-20 px-4">

      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] opacity-10"
          style={{ background: 'radial-gradient(ellipse, rgba(129,140,248,1) 0%, transparent 65%)' }} />
      </div>

      <div className="max-w-2xl mx-auto relative z-10">

        {/* Back */}
        <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
          <Link
            to="/atualizacoes"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors mb-10 group"
          >
            <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1" />
            Todas as atualizações
          </Link>
        </motion.div>

        {/* Hero image */}
        {update.heroImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full rounded-3xl overflow-hidden mb-8 bg-white/5 border border-white/5"
          >
            <img src={update.heroImage} alt={update.title} className="w-full object-cover" />
          </motion.div>
        )}

        {/* Header */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          className="mb-10"
        >
          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-2 mb-4">
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${update.badgeColor}`}>
              {update.badge}
            </span>
            <span className="text-[10px] font-mono text-slate-600 bg-white/5 px-2 py-1 rounded-lg border border-white/5">
              {update.version}
            </span>
            <span className="flex items-center gap-1 text-[10px] text-slate-600">
              <Calendar size={10} />
              {formatDate(update.date)}
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-3xl sm:text-4xl font-black tracking-tight mb-4"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            {update.title}
          </motion.h1>

          <motion.p variants={fadeUp} className="text-slate-400 text-base leading-relaxed mb-6">
            {update.summary}
          </motion.p>

          {/* Share bar */}
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/5"
          >
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-600 mb-0.5">Link desta atualização</p>
              <p className="text-sm text-slate-500 truncate font-mono">{shareUrl}</p>
            </div>
            <button
              onClick={copyLink}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-semibold text-slate-400 hover:text-white hover:bg-white/8 transition-all flex-shrink-0"
            >
              {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              {copied ? 'Copiado!' : 'Copiar'}
            </button>
            <a
              href={shareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-500 hover:text-white hover:bg-white/8 transition-all flex-shrink-0"
              title="Abrir link"
            >
              <ExternalLink size={14} />
            </a>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-10" />

        {/* Changes grouped */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-col gap-8"
        >
          {typeOrder.map((type) => {
            const items = grouped[type];
            if (!items || items.length === 0) return null;
            const typeInfo = CHANGE_TYPES[type];
            return (
              <div key={type}>
                <div className="flex items-center gap-3 mb-4">
                  <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border ${typeInfo.color}`}>
                    {typeInfo.label}
                  </span>
                  <div className="h-px flex-1 bg-white/5" />
                </div>
                <ul className="flex flex-col gap-3">
                  {items.map((change, i) => (
                    <li key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                      <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${
                        type === 'novo' ? 'bg-emerald-400' :
                        type === 'melhoria' ? 'bg-blue-400' :
                        type === 'correcao' ? 'bg-yellow-400' : 'bg-red-400'
                      }`} />
                      <p className="text-sm text-slate-300 leading-relaxed">{change.text}</p>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </motion.div>

        {/* Navigation between updates */}
        <div className="mt-16 pt-8 border-t border-white/5">
          <div className="flex items-center justify-between gap-4">
            {(() => {
              const idx = UPDATES.findIndex((u) => u.id === id);
              const prev = UPDATES[idx + 1];
              const next = UPDATES[idx - 1];
              return (
                <>
                  {prev ? (
                    <Link to={`/atualizacoes/${prev.id}`}
                      className="flex flex-col gap-1 text-left group max-w-[45%]">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 group-hover:text-slate-500 transition-colors">← Anterior</span>
                      <span className="text-sm font-semibold text-slate-500 group-hover:text-white transition-colors line-clamp-1">{prev.title}</span>
                    </Link>
                  ) : <div />}
                  {next ? (
                    <Link to={`/atualizacoes/${next.id}`}
                      className="flex flex-col gap-1 text-right group max-w-[45%]">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 group-hover:text-slate-500 transition-colors">Próxima →</span>
                      <span className="text-sm font-semibold text-slate-500 group-hover:text-white transition-colors line-clamp-1">{next.title}</span>
                    </Link>
                  ) : <div />}
                </>
              );
            })()}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center p-8 rounded-3xl bg-white/[0.02] border border-white/5">
          <p className="text-sm text-slate-500 mb-4">Quer aproveitar tudo isso?</p>
          <a
            href="https://app.cursar.me/register"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-sm font-bold text-white transition-all hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/20"
            style={{ background: 'linear-gradient(135deg, #818cf8, #c084fc)' }}
          >
            Criar conta grátis
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}