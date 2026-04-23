// updatesData.js — Changelog de atualizações do Cursar.me
// Adicione novas versões no INÍCIO do array (mais recente primeiro)

export const UPDATES = [
  {
    id: 'v2-4-0',
    version: '2.4.0',
    title: 'Perfil Público 2.0 & Super Link',
    date: '2025-04-15',
    badge: 'Grande atualização',
    badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    heroImage: null, // ex: 'https://seu-cdn.com/updates/v240.png'
    summary: 'Seu perfil agora é uma vitrine completa. Configure quais abas exibir, personalize sua bio e compartilhe um único link com o mundo.',
    changes: [
      { type: 'novo',      text: 'Abas configuráveis no perfil público: Início, Portfólio, Formação, Carreira e Biblioteca' },
      { type: 'novo',      text: 'URL pública personalizável: app.cursar.me/seunome' },
      { type: 'novo',      text: 'Biblioteca pública de documentos no perfil' },
      { type: 'melhoria',  text: 'Redesign completo da página de perfil com novo layout' },
      { type: 'melhoria',  text: 'Bio e links sociais com edição rápida inline' },
      { type: 'correcao',  text: 'Correção na exibição de projetos colaborativos no perfil' },
    ],
  },
  {
    id: 'v2-3-0',
    version: '2.3.0',
    title: 'Módulo Documento — Editor Avançado',
    date: '2025-03-28',
    badge: 'Novo módulo',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    heroImage: null,
    summary: 'Introduzimos o Documento — um editor em blocos focado em leitura estruturada com paginação, sumário automático e link público.',
    changes: [
      { type: 'novo',     text: 'Editor em blocos com paginação e sumário automático' },
      { type: 'novo',     text: 'Capa personalizada para cada documento' },
      { type: 'novo',     text: 'Geração de link público para compartilhamento externo' },
      { type: 'novo',     text: 'Sistema de curtidas em documentos públicos' },
      { type: 'novo',     text: 'Documentos integrados ao Drive e ao perfil público (Biblioteca)' },
    ],
  },
  {
    id: 'v2-2-0',
    version: '2.2.0',
    title: 'Trabalhos com Scrum Completo',
    date: '2025-03-10',
    badge: 'Melhoria',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    heroImage: null,
    summary: 'O módulo Trabalhos ganhou suporte completo à metodologia Scrum, com Sprints, backlog, relatórios e tarefas filho.',
    changes: [
      { type: 'novo',     text: 'Metodologia Scrum: Sprints, backlog e ciclos' },
      { type: 'novo',     text: 'Tarefas filho (subtarefas) dentro dos cartões' },
      { type: 'novo',     text: 'Relatórios de Sprint com gráfico de burndown' },
      { type: 'novo',     text: 'Rastro de atividades por cartão' },
      { type: 'melhoria', text: 'Mochila com filtros por usuário e tipo de anexo' },
      { type: 'correcao', text: 'Notificações de prazo de cartões agora chegam corretamente' },
    ],
  },
  {
    id: 'v2-1-0',
    version: '2.1.0',
    title: 'Rede & Mensagens — Conexões Reais',
    date: '2025-02-20',
    badge: 'Novo módulo',
    badgeColor: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
    heroImage: null,
    summary: 'Lançamos os módulos sociais: Rede para conectar profissionais e Mensagens para conversar com suas conexões direto no Cursar.',
    changes: [
      { type: 'novo',     text: 'Módulo Rede: diretório de usuários com métricas de produtividade' },
      { type: 'novo',     text: 'Gestão de conexões: enviar, aceitar, rejeitar e bloquear' },
      { type: 'novo',     text: 'Módulo Mensagens: chat 1-a-1 com conexões aceitas' },
      { type: 'novo',     text: 'Ícone global de Mensagens na Navbar para acesso rápido' },
      { type: 'novo',     text: 'Pro: revelação de quem visitou seu perfil' },
    ],
  },
  {
    id: 'v2-0-0',
    version: '2.0.0',
    title: 'Cursar 2.0 — Redesign Completo',
    date: '2025-01-15',
    badge: 'Major',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    heroImage: null,
    summary: 'O maior update da história da plataforma. Novo visual, nova arquitetura, novas possibilidades. O Cursar cresceu.',
    changes: [
      { type: 'novo',     text: 'Design system completamente reformulado com dark mode nativo' },
      { type: 'novo',     text: 'Dashboard com duas áreas: Estudantil e Social' },
      { type: 'novo',     text: 'Sistema de planos Pro com cobrança mensal, semestral e anual' },
      { type: 'novo',     text: 'Animações e micro-interações com Framer Motion' },
      { type: 'melhoria', text: 'Performance geral melhorada em até 60%' },
      { type: 'melhoria', text: 'Responsividade total em mobile' },
      { type: 'correcao', text: 'Mais de 40 correções de bugs acumulados' },
    ],
  },
  {
    id: 'v1-5-0',
    version: '1.5.0',
    title: 'Drive & Armazenamento em Nuvem',
    date: '2024-11-30',
    badge: 'Novo módulo',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    heroImage: null,
    summary: 'Lançamos o Drive — gerencie todos os seus arquivos em um só lugar, com pastas, imagens otimizadas e criação de documentos.',
    changes: [
      { type: 'novo',    text: 'Módulo Drive com criação de pastas e subpastas' },
      { type: 'novo',    text: 'Upload de arquivos com otimização automática de imagens' },
      { type: 'novo',    text: 'Criação de Documentos diretamente pelo Drive' },
      { type: 'novo',    text: 'Free: 500 MB | Pro: 15 GB de armazenamento' },
    ],
  },
];

// Utilitário para gerar a URL direta de uma atualização (para e-mails)
export function getUpdateUrl(updateId) {
  return `https://cursar.me/atualizacoes/${updateId}`;
}

// Labels e cores dos tipos de mudança
export const CHANGE_TYPES = {
  novo:      { label: 'Novo',      color: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25' },
  melhoria:  { label: 'Melhoria',  color: 'bg-blue-500/15 text-blue-300 border-blue-500/25' },
  correcao:  { label: 'Correção',  color: 'bg-yellow-500/15 text-yellow-300 border-yellow-500/25' },
  remocao:   { label: 'Removido',  color: 'bg-red-500/15 text-red-300 border-red-500/25' },
};