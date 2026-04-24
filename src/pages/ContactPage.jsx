// pages/ContactPage.jsx
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  MessageCircle, Mail, ChevronDown, ArrowRight, Headphones, HelpCircle,
  Globe, Database, Users, LayoutGrid, Award, Smartphone, Crown, FolderLock,
} from 'lucide-react';

const FAQS = [
  {
    icon: Globe, color: '#34d399',
    question: 'O que é o Super Link e como ele funciona?',
    answer: 'O Super Link (cursar.me/seu-nome) é sua vitrine profissional automática. Ele reúne seus certificados, histórico acadêmico e projetos do portfólio em uma única página otimizada para RHs e recrutadores. Você controla o que fica visível nas configurações de cada módulo.',
  },
  {
    icon: Database, color: '#818cf8',
    question: 'Como funciona o limite do Drive e arquivos?',
    answer: 'No plano Free você tem 500 MB de armazenamento. No Premium o limite base é 15 GB. Em trabalhos de equipe, o peso dos arquivos subidos pelos membros recai sobre o armazenamento do dono do projeto — se lotar, ninguém sobe mais arquivos até ele liberar espaço ou fazer upgrade.',
  },
  {
    icon: Users, color: '#f472b6',
    question: 'Posso criar quantos grupos de trabalho?',
    answer: 'Usuários Free podem ser donos de até 3 trabalhos simultâneos. Não há limite para participar como membro de trabalhos criados por outros. Usuários Premium podem criar trabalhos ilimitados.',
  },
  {
    icon: LayoutGrid, color: '#c084fc',
    question: 'O Portfólio aceita quais tipos de arquivos?',
    answer: 'O construtor por blocos aceita textos, imagens (galeria e carrossel), vídeos via link (YouTube/Vimeo) e anexos para download (PDF/ZIP). Ideal para documentar cases acadêmicos e projetos freelance.',
  },
  {
    icon: Award, color: '#fbbf24',
    question: 'Como o sistema ajuda no controle de cursos?',
    answer: 'Você cadastra suas graduações, cursos técnicos ou livres. O sistema calcula automaticamente o status (Em andamento / Concluído) baseado nas datas e permite anexar o link do certificado para ele aparecer validado no seu perfil público.',
  },
  {
    icon: Smartphone, color: '#34d399',
    question: 'O Cursar funciona offline?',
    answer: 'O Cursar é um PWA (Progressive Web App) — você pode instalá-lo no celular ou PC e ele funciona de forma mais rápida. Algumas funções de leitura operam offline, mas a sincronização de dados requer conexão.',
  },
  {
    icon: Crown, color: '#fbbf24',
    question: 'Como gerenciar minha assinatura Premium?',
    answer: 'Toda a gestão financeira é feita pelo nosso portal seguro via Stripe. Você pode baixar faturas, trocar o cartão de crédito ou cancelar a renovação automática a qualquer momento com um clique.',
  },
  {
    icon: FolderLock, color: '#818cf8',
    question: 'Meus arquivos no Drive são privados?',
    answer: 'Sim. Apenas você tem acesso aos arquivos no Drive pessoal. Em pastas de Trabalhos em Grupo, apenas os membros convidados por você podem visualizar e baixar os documentos.',
  },
];

function AccordionItem({ question, answer, isOpen, onToggle, icon: Icon, color }) {
  return (
    <div
      style={{
        borderRadius: '0.875rem',
        border: `1px solid ${isOpen ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)'}`,
        background: isOpen ? 'rgba(255,255,255,0.03)' : 'transparent',
        overflow: 'hidden',
        transition: 'border-color 0.2s, background 0.2s',
      }}
    >
      <button
        onClick={onToggle}
        style={{
          width: '100%', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', gap: '1rem',
          padding: '1rem 1.125rem', background: 'none', border: 'none',
          cursor: 'pointer', textAlign: 'left',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', flex: 1 }}>
          <div style={{
            width: 36, height: 36, borderRadius: '0.625rem', flexShrink: 0,
            background: isOpen ? `${color}22` : 'rgba(255,255,255,0.04)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.2s',
          }}>
            <Icon size={16} style={{ color: isOpen ? color : '#475569' }} strokeWidth={1.75} />
          </div>
          <span style={{ fontSize: '0.875rem', fontWeight: 700, color: isOpen ? '#f1f5f9' : '#94a3b8', lineHeight: 1.4 }}>
            {question}
          </span>
        </div>
        <ChevronDown
          size={15}
          style={{
            color: isOpen ? '#94a3b8' : '#475569', flexShrink: 0,
            transform: isOpen ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.2s, color 0.2s',
          }}
        />
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18 }}
          style={{ padding: '0 1.125rem 1.125rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.75, paddingTop: '0.875rem' }}>
            {answer}
          </p>
        </motion.div>
      )}
    </div>
  );
}

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 640);

  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', fn, { passive: true });
    return () => window.removeEventListener('resize', fn);
  }, []);

  const waLink = `https://wa.me/5517991111822?text=${encodeURIComponent('Oi! Vim pelo site Cursar...')}`;

  return (
    <>
      <Helmet>
        <title>Suporte & Contato | Cursar.me</title>
        <meta name="description" content="Entre em contato com o suporte do Cursar.me via WhatsApp ou e-mail. Tire suas dúvidas sobre planos, funcionalidades e muito mais." />
        <link rel="canonical" href="https://cursar.me/suporte" />
        <meta property="og:url"         content="https://cursar.me/suporte" />
        <meta property="og:title"       content="Suporte & Contato | Cursar.me" />
        <meta property="og:description" content="Entre em contato com o suporte do Cursar.me via WhatsApp ou e-mail. Respondemos rápido." />
      </Helmet>

      <div style={{ minHeight: '100vh', background: '#080718', color: '#fff', position: 'relative', overflow: 'hidden' }}>

        {/* Glow de fundo */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '600px', pointerEvents: 'none', zIndex: 0 }}>
          <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '900px', height: '500px', background: 'radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.13) 0%, rgba(129,140,248,0.06) 50%, transparent 70%)' }} />
        </div>

        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '5rem 1rem 5rem', position: 'relative', zIndex: 1 }}>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ textAlign: 'center', marginBottom: '3rem' }}
          >
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.22)', color: '#818cf8', fontSize: '0.75rem', fontWeight: 600, padding: '0.375rem 0.875rem', borderRadius: 999, marginBottom: '1.25rem' }}>
              <Headphones size={11} />
              Estamos aqui
            </div>
            <h1 style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.08, marginBottom: '0.75rem' }}>
              Suporte & Contato
            </h1>
            <p style={{ color: '#64748b', fontSize: '0.9375rem', maxWidth: '28rem', margin: '0 auto' }}>
              Tem alguma dúvida ou precisa de ajuda? A gente responde rápido.
            </p>
          </motion.div>

          {/* Cards de contato */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
              gap: '0.875rem',
              marginBottom: '3rem',
            }}
          >
            {/* WhatsApp */}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 1.375rem', borderRadius: '1.125rem', background: 'rgba(52,211,153,0.05)', border: '1px solid rgba(52,211,153,0.18)', transition: 'border-color 0.2s, background 0.2s' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(52,211,153,0.4)'; e.currentTarget.style.background = 'rgba(52,211,153,0.09)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(52,211,153,0.18)'; e.currentTarget.style.background = 'rgba(52,211,153,0.05)'; }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: 44, height: 44, borderRadius: '0.875rem', background: 'rgba(52,211,153,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <MessageCircle size={20} style={{ color: '#34d399' }} />
                </div>
                <div>
                  <p style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#f1f5f9', marginBottom: '0.2rem' }}>Suporte WhatsApp</p>
                  <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Atendimento direto</p>
                </div>
              </div>
              <ArrowRight size={15} style={{ color: '#34d399', flexShrink: 0 }} />
            </a>

            {/* Email */}
            <a
              href="mailto:suporte@cursar.me"
              style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 1.375rem', borderRadius: '1.125rem', background: 'rgba(96,165,250,0.05)', border: '1px solid rgba(96,165,250,0.18)', transition: 'border-color 0.2s, background 0.2s' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(96,165,250,0.4)'; e.currentTarget.style.background = 'rgba(96,165,250,0.09)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(96,165,250,0.18)'; e.currentTarget.style.background = 'rgba(96,165,250,0.05)'; }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: 44, height: 44, borderRadius: '0.875rem', background: 'rgba(96,165,250,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Mail size={20} style={{ color: '#60a5fa' }} />
                </div>
                <div>
                  <p style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#f1f5f9', marginBottom: '0.2rem' }}>E-mail Suporte</p>
                  <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#475569' }}>suporte@cursar.me</p>
                </div>
              </div>
              <ArrowRight size={15} style={{ color: '#60a5fa', flexShrink: 0 }} />
            </a>
          </motion.div>

          {/* Divisor */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.75rem' }}
          >
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.2)', color: '#fbbf24', fontSize: '0.7rem', fontWeight: 700, padding: '0.3rem 0.75rem', borderRadius: 999 }}>
              <HelpCircle size={10} />
              Dúvidas frequentes
            </div>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
          </motion.div>

          {/* FAQ Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
          >
            {FAQS.map((faq, i) => (
              <AccordionItem
                key={i}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                icon={faq.icon}
                color={faq.color}
              />
            ))}
          </motion.div>

          {/* CTA final */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{ textAlign: 'center', marginTop: '3.5rem', padding: '2rem', borderRadius: '1.25rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '1rem' }}>
              Ainda não tem uma conta? É grátis para começar.
            </p>
            <a
              href="https://app.cursar.me/register"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.875rem 1.75rem', borderRadius: '0.875rem', fontSize: '0.875rem', fontWeight: 700, color: '#fff', textDecoration: 'none', background: 'linear-gradient(135deg, #818cf8, #c084fc)' }}
            >
              Criar conta grátis
              <ArrowRight size={14} />
            </a>
          </motion.div>

        </div>
      </div>
    </>
  );
}
