// pages/UpdateDetailPage.jsx
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Copy, Check, Sparkles, Plus, TrendingUp, Wrench, Trash2, ArrowRight } from 'lucide-react';
import { UPDATES, CHANGE_TYPES, getUpdateUrl } from '../data/updatesData';

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

const TYPE_CONFIG = {
  novo:     { label: 'Novidades',  Icon: Plus,        color: '#34d399', rgb: '52,211,153',  bg: 'rgba(52,211,153,0.08)',  border: 'rgba(52,211,153,0.2)'  },
  melhoria: { label: 'Melhorias',  Icon: TrendingUp,  color: '#60a5fa', rgb: '96,165,250',  bg: 'rgba(96,165,250,0.08)',  border: 'rgba(96,165,250,0.2)'  },
  correcao: { label: 'Correções',  Icon: Wrench,      color: '#fbbf24', rgb: '251,191,36',  bg: 'rgba(251,191,36,0.08)',  border: 'rgba(251,191,36,0.2)'  },
  remocao:  { label: 'Removidos',  Icon: Trash2,      color: '#f87171', rgb: '248,113,113', bg: 'rgba(248,113,113,0.08)', border: 'rgba(248,113,113,0.2)' },
};

const TYPE_ORDER = ['novo', 'melhoria', 'correcao', 'remocao'];

export default function UpdateDetailPage() {
  const { id }       = useParams();
  const navigate     = useNavigate();
  const [copied, setCopied] = useState(false);

  const update = UPDATES.find((u) => u.id === id);

  useEffect(() => {
    if (!update) navigate('/atualizacoes', { replace: true });
  }, [update, navigate]);

  if (!update) return null;

  const accent   = getAccent(update.badgeColor);
  const shareUrl = getUpdateUrl(update.id);

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const grouped = {};
  update.changes.forEach((c) => {
    if (!grouped[c.type]) grouped[c.type] = [];
    grouped[c.type].push(c);
  });

  const idx  = UPDATES.findIndex((u) => u.id === id);
  const prev = UPDATES[idx + 1];
  const next = UPDATES[idx - 1];

  return (
    <>
    <Helmet>
      <title>{update.title} | Cursar.me</title>
      <meta name="description" content={update.summary} />
      <link rel="canonical" href={`https://cursar.me/atualizacoes/${update.id}`} />
      <meta property="og:url"         content={`https://cursar.me/atualizacoes/${update.id}`} />
      <meta property="og:title"       content={`${update.title} | Cursar.me`} />
      <meta property="og:description" content={update.summary} />
    </Helmet>
    <div style={{ minHeight: '100vh', background: '#080718', color: '#fff', position: 'relative', overflow: 'hidden' }}>

      {/* Glow de fundo */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '500px', pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '800px', height: '450px', background: `radial-gradient(ellipse at 50% 0%, rgba(${accent.rgb},0.12) 0%, transparent 65%)` }} />
      </div>

      <div style={{ maxWidth: '42rem', margin: '0 auto', padding: '5.5rem 1rem 5rem', position: 'relative', zIndex: 1 }}>

        {/* Voltar */}
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
          <Link
            to="/atualizacoes"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.8125rem', color: '#475569', textDecoration: 'none', marginBottom: '2rem', transition: 'color 0.2s' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#475569'; }}
          >
            <ArrowLeft size={14} /> Todas as atualizações
          </Link>
        </motion.div>

        {/* Hero image */}
        {update.heroImage && (
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
            style={{ width: '100%', borderRadius: '1.25rem', overflow: 'hidden', marginBottom: '2rem', border: '1px solid rgba(255,255,255,0.06)' }}>
            <img src={update.heroImage} alt={update.title} style={{ width: '100%', display: 'block' }} />
          </motion.div>
        )}

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.5 }}
          style={{ marginBottom: '2rem' }}
        >
          {/* Badges linha */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${update.badgeColor}`}>
              {update.badge}
            </span>
            <span style={{ fontSize: '0.7rem', fontFamily: 'monospace', color: '#475569', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', padding: '2px 8px', borderRadius: 6 }}>
              v{update.version}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.7rem', color: '#475569', marginLeft: 'auto' }}>
              <Calendar size={10} /> {formatDate(update.date)}
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '1rem' }}>
            {update.title}
          </h1>

          <p style={{ fontSize: '1rem', color: '#94a3b8', lineHeight: 1.7, marginBottom: '1.5rem' }}>
            {update.summary}
          </p>

          {/* Share bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.875rem 1rem', borderRadius: '0.875rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: '0.625rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#334155', marginBottom: '0.25rem' }}>Link desta atualização</p>
              <p style={{ fontSize: '0.75rem', color: '#475569', fontFamily: 'monospace', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{shareUrl}</p>
            </div>
            <button
              onClick={copyLink}
              style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', padding: '0.5rem 0.875rem', borderRadius: '0.625rem', background: copied ? 'rgba(52,211,153,0.1)' : 'rgba(255,255,255,0.05)', border: `1px solid ${copied ? 'rgba(52,211,153,0.25)' : 'rgba(255,255,255,0.08)'}`, fontSize: '0.8rem', fontWeight: 600, color: copied ? '#34d399' : '#94a3b8', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s' }}
            >
              {copied ? <Check size={13} /> : <Copy size={13} />}
              {copied ? 'Copiado!' : 'Copiar'}
            </button>
          </div>
        </motion.div>

        {/* Divisor */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', marginBottom: '2rem' }} />

        {/* Changes por tipo */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}
        >
          {TYPE_ORDER.map((type) => {
            const items = grouped[type];
            if (!items || items.length === 0) return null;
            const t = TYPE_CONFIG[type];
            const { Icon } = t;
            return (
              <div key={type}>
                {/* Cabeçalho do tipo */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.875rem' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '0.5rem', background: t.bg, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={13} style={{ color: t.color }} strokeWidth={2} />
                  </div>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 800, color: t.color }}>{t.label}</span>
                  <span style={{ fontSize: '0.7rem', color: '#334155', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', padding: '1px 7px', borderRadius: 999 }}>{items.length}</span>
                  <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.05)' }} />
                </div>

                {/* Lista de itens */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                  {items.map((change, i) => (
                    <div
                      key={i}
                      style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '0.75rem 1rem', borderRadius: '0.75rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
                    >
                      <div style={{ width: 5, height: 5, borderRadius: '50%', background: t.color, flexShrink: 0, marginTop: '0.45rem' }} />
                      <p style={{ fontSize: '0.875rem', color: '#cbd5e1', lineHeight: 1.65 }}>{change.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Navegação anterior / próxima */}
        {(prev || next) && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            {prev ? (
              <Link to={`/atualizacoes/${prev.id}`} style={{ textDecoration: 'none', maxWidth: '45%' }}>
                <p style={{ fontSize: '0.625rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#334155', marginBottom: '0.25rem' }}>← Anterior</p>
                <p style={{ fontSize: '0.875rem', fontWeight: 700, color: '#64748b', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#64748b'; }}
                >{prev.title}</p>
              </Link>
            ) : <div />}
            {next ? (
              <Link to={`/atualizacoes/${next.id}`} style={{ textDecoration: 'none', maxWidth: '45%', textAlign: 'right' }}>
                <p style={{ fontSize: '0.625rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#334155', marginBottom: '0.25rem' }}>Próxima →</p>
                <p style={{ fontSize: '0.875rem', fontWeight: 700, color: '#64748b', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#64748b'; }}
                >{next.title}</p>
              </Link>
            ) : <div />}
          </div>
        )}

        {/* CTA final */}
        <div style={{ marginTop: '3rem', textAlign: 'center', padding: '2rem', borderRadius: '1.25rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '1rem' }}>Quer aproveitar tudo isso?</p>
          <a
            href="https://app.cursar.me/register"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.875rem 2rem', borderRadius: '0.875rem', fontSize: '0.875rem', fontWeight: 700, color: '#fff', textDecoration: 'none', background: 'linear-gradient(135deg, #818cf8, #c084fc)' }}
          >
            Criar conta grátis
            <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </div>
    </>
  );
}
