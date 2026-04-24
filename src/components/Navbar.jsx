// Navbar.jsx — usa JS para responsivo (Tailwind v4 não gera breakpoints por padrão)
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import cursarLogo from '../assets/Cursar_icone_fundo.svg';

const NAV_LINKS = [
  { to: '/', label: 'Início' },
  { to: '/modulos', label: 'Módulos' },
  { to: '/atualizacoes', label: 'Atualizações' },
  { to: '/suporte', label: 'Suporte' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 1024);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

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
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', textDecoration: 'none', flexShrink: 0 }}>
            <img src={cursarLogo} alt="Cursar" style={{ width: '2.25rem', height: '2.25rem', borderRadius: '0.75rem' }} />
            <span style={{ fontWeight: 800, fontSize: '1.2rem', color: '#fff', letterSpacing: '-0.02em' }}>
              cursar.me
            </span>
          </Link>

          {/* Desktop links + actions */}
          {!isMobile && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                {NAV_LINKS.map(({ to, label }) => (
                  <Link
                    key={to}
                    to={to}
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: location.pathname === to ? '#fff' : '#cbd5e1',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#818cf8'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = location.pathname === to ? '#fff' : '#cbd5e1'; }}
                  >
                    {label}
                  </Link>
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                <a
                  href="https://app.cursar.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: '0.875rem', fontWeight: 700, color: '#cbd5e1', textDecoration: 'none' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#cbd5e1'; }}
                >
                  Entrar
                </a>
                <a
                  href="https://app.cursar.me/register"
                  target="_blank"
                  rel="noopener noreferrer"
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
                  Começar grátis
                </a>
              </div>
            </>
          )}

          {/* Mobile hamburger */}
          {isMobile && (
            <button
              onClick={() => setMenuOpen(true)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: '#cbd5e1', padding: '0.5rem', borderRadius: '0.75rem',
              }}
              aria-label="Abrir menu"
            >
              <Menu size={22} />
            </button>
          )}
        </div>
      </motion.nav>

      {/* ── Mobile side drawer ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && isMobile && (
          <>
            <motion.div
              key="backdrop"
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
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }} onClick={() => setMenuOpen(false)}>
                  <img src={cursarLogo} alt="Cursar" style={{ width: '2rem', height: '2rem', borderRadius: '0.625rem' }} />
                  <span style={{ fontWeight: 800, fontSize: '1rem', color: '#fff' }}>cursar.me</span>
                </Link>
                <button
                  onClick={() => setMenuOpen(false)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: '0.5rem' }}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Nav links */}
              <nav style={{ flex: 1, padding: '1rem', overflowY: 'auto' }}>
                {NAV_LINKS.map(({ to, label }, i) => (
                  <motion.div
                    key={to}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.06 }}
                  >
                    <Link
                      to={to}
                      onClick={() => setMenuOpen(false)}
                      style={{
                        display: 'flex', padding: '0.75rem 1rem', borderRadius: '0.75rem',
                        fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none',
                        color: location.pathname === to ? '#818cf8' : '#94a3b8',
                        background: location.pathname === to ? 'rgba(99,102,241,0.08)' : 'transparent',
                        marginBottom: '0.25rem',
                      }}
                    >
                      {label}
                    </Link>
                  </motion.div>
                ))}

                {location.pathname === '/' && (
                  <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <p style={{ fontSize: '0.625rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#475569', padding: '0 1rem', marginBottom: '0.75rem' }}>
                      Em destaque
                    </p>
                    {[
                      { href: '/#trabalhos', label: 'Módulo Trabalhos', color: '#34d399' },
                      { href: '/#portfolio',  label: 'Portfólio',        color: '#f87171' },
                      { href: '/#documento',  label: 'Documento',        color: '#22d3ee' },
                      { href: '/#precos',     label: 'Planos e preços',  color: '#818cf8' },
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
                  Entrar
                </a>
                <a
                  href="https://app.cursar.me/register"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'block', textAlign: 'center', padding: '0.75rem', borderRadius: '0.875rem', fontSize: '0.875rem', fontWeight: 900, color: '#fff', background: 'linear-gradient(135deg, #818cf8, #c084fc)', textDecoration: 'none' }}
                >
                  Começar grátis
                </a>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
