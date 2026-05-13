'use client'
// Navbar.jsx — usa JS para responsivo (Tailwind v4 não gera breakpoints por padrão)
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Globe, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const cursarLogo = '/Cursar_icone_fundo.svg';

const NAV_LINKS = (t) => [
  { to: '/', label: t('common.home') },
  { to: '/modulos', label: t('common.modules') },
  { to: '/atualizacoes', label: t('common.updates') },
  { to: '/suporte', label: t('common.support') },
];

const LANGUAGES = [
  { code: 'pt', label: 'Português', flag: '🇧🇷' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
];

function LanguageModal({ isOpen, onClose }) {
  const { lang, changeLanguage, t } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 500);
    onResize();
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  if (!isOpen) return null;

  const panelStyle = isMobile
    ? { borderRadius: '1.5rem 1.5rem 0 0', background: '#0d0c22', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 -8px 40px rgba(0,0,0,0.5)', padding: '1.5rem' }
    : { borderRadius: '1.25rem', background: '#0d0c22', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 25px 80px rgba(0,0,0,0.6)', padding: '1.5rem', width: '320px' };

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
      />
      <div
        style={{
          position: 'fixed',
          zIndex: 201,
          ...(isMobile
            ? { bottom: 0, left: 0, right: 0 }
            : { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' })
        }}
      >
        <motion.div
          initial={isMobile ? { y: '100%' } : { opacity: 0, scale: 0.95, y: 16 }}
          animate={isMobile ? { y: 0 } : { opacity: 1, scale: 1, y: 0 }}
          exit={isMobile ? { y: '100%' } : { opacity: 0, scale: 0.95, y: 16 }}
          transition={{ type: 'spring', stiffness: 320, damping: 28 }}
          style={panelStyle}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#fff' }}>{t('navbar.language')}</h3>
            <button 
              onClick={onClose} 
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
              aria-label={t('common.close') || 'Fechar'}
            >
              <X size={18} />
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => { changeLanguage(l.code); onClose(); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.875rem 1rem',
                  borderRadius: '0.875rem',
                  border: '1px solid',
                  borderColor: lang === l.code ? 'rgba(99,102,241,0.3)' : 'rgba(255,255,255,0.05)',
                  background: lang === l.code ? 'rgba(99,102,241,0.1)' : 'rgba(255,255,255,0.03)',
                  color: lang === l.code ? '#fff' : '#94a3b8',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  textAlign: 'left'
                }}
                onMouseEnter={(e) => { if (lang !== l.code) e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
                onMouseLeave={(e) => { if (lang !== l.code) e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '1.25rem' }}>{l.flag}</span>
                  <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{l.label}</span>
                </div>
                {lang === l.code && <Check size={16} className="text-indigo-400" />}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [langModalOpen, setLangModalOpen] = useState(false);
  const pathname = usePathname();
  const { lang, t } = useLanguage();


  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 1024);
    onResize();
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (menuOpen) setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = (menuOpen || langModalOpen) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen, langModalOpen]);

  const currentLangObj = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0];

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: '0 1.5rem' }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            transition: 'background 0.4s ease, backdrop-filter 0.4s ease, box-shadow 0.4s ease, padding 0.4s ease, margin-top 0.4s ease, border-color 0.4s ease',
            borderRadius: '0.875rem',
            border: `1px solid ${scrolled ? 'rgba(99,102,241,0.14)' : 'rgba(99,102,241,0)'}`,
            background: scrolled ? 'rgba(7, 6, 20, 0.88)' : 'rgba(7, 6, 20, 0)',
            backdropFilter: scrolled ? 'blur(20px)' : 'blur(0px)',
            WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'blur(0px)',
            padding: scrolled ? '0.65rem 1.25rem' : '1rem 0',
            marginTop: scrolled ? '0.5rem' : '0',
            boxShadow: scrolled ? '0 4px 28px rgba(0,0,0,0.35)' : '0 0 0 rgba(0,0,0,0)',
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', textDecoration: 'none', flexShrink: 0 }}>
            <img src={cursarLogo} alt="Cursar" style={{ width: '2.25rem', height: '2.25rem', borderRadius: '0.75rem' }} />
            <span style={{ fontWeight: 800, fontSize: '1.2rem', color: '#fff', letterSpacing: '-0.02em' }}>
              cursar.me
            </span>
          </Link>

          {/* Desktop links + actions */}
          {!isMobile && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                {NAV_LINKS(t).map(({ to, label }) => (
                  <Link
                    key={to}
                    href={to}
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: pathname === to ? '#fff' : '#cbd5e1',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#818cf8'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = pathname === to ? '#fff' : '#cbd5e1'; }}
                  >
                    {label}
                  </Link>
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {/* Language Switcher Desktop */}
                <button
                  onClick={() => setLangModalOpen(true)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '0.75rem',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    color: '#cbd5e1'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#cbd5e1'; }}
                  aria-label={t('navbar.language')}
                >
                  <Globe size={16} />
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>{lang}</span>
                </button>

                <a
                  href="https://app.cursar.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: '0.875rem', fontWeight: 700, color: '#cbd5e1', textDecoration: 'none' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#cbd5e1'; }}
                >
                  {t('common.access')}
                </a>
                <Link
                  href="/download"
                  style={{
                    padding: '0.6rem 1.25rem',
                    borderRadius: '0.75rem',
                    background: '#fff',
                    color: '#000',
                    fontSize: '0.875rem',
                    fontWeight: 900,
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#6366f1'; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#000'; }}
                >
                  {t('common.download')}
                </Link>
              </div>
            </>
          )}

          {/* Mobile hamburger */}
          {isMobile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
               <button
                  onClick={() => setLangModalOpen(true)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '2.5rem',
                    height: '2.5rem',
                    borderRadius: '0.75rem',
                    background: scrolled ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    cursor: 'pointer',
                    color: '#cbd5e1'
                  }}
                  aria-label={t('navbar.language')}
                >
                  <Globe size={18} />
                </button>
              <button
                onClick={() => setMenuOpen(true)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: '#cbd5e1', padding: '0.5rem', borderRadius: '0.75rem',
                }}
                aria-label={t('navbar.menu')}
              >
                <Menu size={22} />
              </button>
            </div>
          )}
        </div>
      </motion.nav>

      <LanguageModal isOpen={langModalOpen} onClose={() => setLangModalOpen(false)} />

      {/* ── Mobile side drawer ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && isMobile && (
          <>
            <motion.div
              key="backdrop-drawer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
              style={{
                position: 'fixed', inset: 0, zIndex: 110,
                background: 'rgba(0,0,0,0.65)',
                backdropFilter: 'blur(4px)',
              }}
            />

            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              style={{
                position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 120,
                width: '280px',
                background: '#0a091e',
                borderLeft: '1px solid rgba(255,255,255,0.06)',
                display: 'flex', flexDirection: 'column',
                overflow: 'hidden', // Trava o transbordamento geral
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }} onClick={() => setMenuOpen(false)}>
                  <img src={cursarLogo} alt="Cursar" style={{ width: '2rem', height: '2rem', borderRadius: '0.625rem' }} />
                  <span style={{ fontWeight: 800, fontSize: '1rem', color: '#fff' }}>cursar.me</span>
                </Link>
                <button
                  onClick={() => setMenuOpen(false)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: '0.5rem' }}
                  aria-label={t('common.close')}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Nav links */}
              <nav style={{ padding: '0.5rem', flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
                {NAV_LINKS(t).map(({ to, label }, i) => (
                  <motion.div
                    key={to}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.06 }}
                  >
                    <Link
                      href={to}
                      onClick={() => setMenuOpen(false)}
                      style={{
                        display: 'flex', padding: '0.75rem 1rem', borderRadius: '0.75rem',
                        fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none',
                        color: pathname === to ? '#818cf8' : '#94a3b8',
                        background: pathname === to ? 'rgba(99,102,241,0.08)' : 'transparent',
                        marginBottom: '0.25rem',
                      }}
                    >
                      {label}
                    </Link>
                  </motion.div>
                ))}

                {pathname === '/' && (
                  <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <p style={{ fontSize: '0.625rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#475569', padding: '0 1rem', marginBottom: '0.75rem' }}>
                      {t('navbar.featured')}
                    </p>
                    {[
                      { href: '/#trabalhos', label: t('navbar.featuredLinks.works'), color: '#34d399' },
                      { href: '/#portfolio',  label: t('navbar.featuredLinks.portfolio'),        color: '#f87171' },
                      { href: '/#documento',  label: t('navbar.featuredLinks.document'),        color: '#22d3ee' },
                      { href: '/#precos',     label: t('navbar.featuredLinks.pricing'),  color: '#818cf8' },
                    ].map(({ href, label, color }, i) => (
                      <motion.div key={href} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.05 }}>
                        <a
                          href={href}
                          onClick={() => setMenuOpen(false)}
                          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.625rem 1rem', borderRadius: '0.625rem', fontSize: '0.875rem', fontWeight: 500, textDecoration: 'none', color, marginBottom: '0.125rem' }}
                        >
                          {label}
                          <ArrowRight size={13} />
                        </a>
                      </motion.div>
                    ))}
                  </div>
                )}
              </nav>

              {/* Bottom CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                style={{ padding: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}
              >
                <a
                  href="https://app.cursar.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'block', textAlign: 'center', padding: '0.75rem', borderRadius: '0.875rem', fontSize: '0.875rem', fontWeight: 700, color: '#cbd5e1', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', textDecoration: 'none' }}
                >
                  {t('common.access')}
                </a>
                <Link
                  href="/download"
                  style={{ display: 'block', textAlign: 'center', padding: '0.75rem', borderRadius: '0.875rem', fontSize: '0.875rem', fontWeight: 900, color: '#fff', background: 'linear-gradient(135deg, #818cf8, #c084fc)', textDecoration: 'none' }}
                >
                  {t('common.download')}
                </Link>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
