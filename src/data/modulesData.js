// modulesData.js — Dados de todos os módulos do Cursar.me

export const MODULE_AREAS = {
  estudantil: {
    label: 'Estudantil',
    color: 'indigo',
    description: 'Ferramentas completas para dominar seus estudos e construir sua carreira acadêmica.',
  },
  social: {
    label: 'Social',
    color: 'pink',
    description: 'Conecte-se com outros profissionais, colabore em projetos e expanda sua rede.',
  },
  fitness: {
    label: 'Fitness',
    color: 'green',
    description: 'Em breve: gerencie sua evolução física com o mesmo rigor que você gerencia seus estudos.',
    soon: true,
  },
  pessoal: {
    label: 'Vida Pessoal',
    color: 'amber',
    description: 'Em breve: organize hábitos, metas e finanças — tudo integrado à sua rotina.',
    soon: true,
  },
};

export const MODULES = [
  // ── ESTUDANTIL ─────────────────────────────────────────────────────────────
  {
    id: 'aprendizado',
    area: 'estudantil',
    icon: 'BookOpen',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    glow: 'rgba(59,130,246,0.15)',
    title: 'Aprendizado',
    tagline: 'Cursos & Roadmaps de estudo',
    description:
      'Cadastre todos os seus cursos (realizados ou em andamento) com status automático baseado em datas. Crie trilhas de estudo detalhadas com tópicos e subtópicos — os checklists atualizam o progresso do pai automaticamente. Compartilhe e clone roadmaps com outros usuários.',
    features: [
      'Status automático: No aguardo, Em andamento, Concluído',
      'Roadmaps com tópicos, subtópicos e checklists',
      'Anexe documentos, imagens, links e arquivos',
      'Compartilhe e clone roadmaps com outros usuários',
      'Grade curricular por curso',
    ],
    limits: {
      free: '3 cursos e 1 roadmap',
      pro: 'Cursos e roadmaps ilimitados',
    },
  },
  {
    id: 'notas',
    area: 'estudantil',
    icon: 'NotebookText',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/20',
    glow: 'rgba(234,179,8,0.15)',
    title: 'Notas',
    tagline: 'Anotações & Listas de tarefas',
    description:
      'Crie notas de texto ricas e listas de tarefas com checklists. Organize tudo com tags coloridas para fácil identificação e filtragem. Fixe as mais importantes e configure Eventos — lembretes vinculados às notas que disparam alertas por e-mail na hora certa.',
    features: [
      'Notas de texto e listas de tarefas (checklists)',
      'Tags coloridas para organização e filtragem',
      'Fixar notas importantes',
      'Sistema de Eventos com alertas por e-mail',
    ],
    limits: {
      free: '15 notas/listas e 5 eventos',
      pro: 'Notas, listas e eventos ilimitados',
    },
  },
  {
    id: 'trabalhos',
    area: 'estudantil',
    icon: 'Briefcase',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    glow: 'rgba(16,185,129,0.15)',
    title: 'Trabalhos',
    tagline: 'Gestão de projetos & equipes',
    description:
      'Organize projetos em equipe com metodologia Kanban ou Scrum completo (Sprints, backlog, relatórios, ciclos e tarefas filho). Cartões com responsáveis, tags, checklists, anexos e prioridades. Inclui chat de grupo, centralizador de recursos, enquetes e votações.',
    features: [
      'Kanban (A Fazer, Em Andamento, Concluído)',
      'Scrum completo com Sprints, backlog e relatórios',
      'Mochila: centralizador de recursos e anexos do projeto',
      'Mural: chat de grupo, enquetes e atas',
      'Cartões com responsáveis, tags, prioridades e checklists',
    ],
    limits: {
      free: 'Até 2 trabalhos simultâneos',
      pro: 'Trabalhos ilimitados',
    },
  },
  {
    id: 'portfolio',
    area: 'estudantil',
    icon: 'Layers',
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
    glow: 'rgba(239,68,68,0.15)',
    title: 'Portfólio',
    tagline: 'Vitrine pública de projetos',
    description:
      'Construtor de Cases poderoso baseado em blocos (estilo Notion). Adicione títulos, textos ricos, citações, galerias de imagens, músicas e muito mais — tudo customizável. Permite colaboração com outros usuários do Cursar, que também exibirão o projeto no perfil deles.',
    features: [
      'Editor em blocos estilo Notion',
      'Galerias de imagens, citações, músicas e mais',
      'Cores e alinhamento customizáveis',
      'Colaboração: co-criação com outros usuários',
      'Visibilidade pública controlada por você',
    ],
    limits: {
      free: '5 projetos totais, 3 públicos',
      pro: 'Projetos totais e públicos ilimitados',
    },
  },
  {
    id: 'carreira',
    area: 'estudantil',
    icon: 'FileUser',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/20',
    glow: 'rgba(249,115,22,0.15)',
    title: 'Carreira',
    tagline: 'Histórico profissional & currículo',
    description:
      'Gerencie seu histórico profissional de forma estruturada. Cadastre experiências com datas, cargo, setor, descrição e habilidades aprendidas. Faça upload do seu currículo em PDF para exibição no seu perfil público.',
    features: [
      'Cadastro de experiências com cargo, setor e datas',
      'Palavras-chave e habilidades por experiência',
      'Upload de currículo em PDF',
      'Exibição no perfil público',
    ],
    limits: {
      free: '3 experiências e 1 currículo',
      pro: 'Experiências e currículos ilimitados',
    },
  },
  {
    id: 'drive',
    area: 'estudantil',
    icon: 'HardDrive',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
    glow: 'rgba(168,85,247,0.15)',
    title: 'Drive',
    tagline: 'Armazenamento em nuvem',
    description:
      'Gerenciamento de arquivos em nuvem no estilo Google Drive. Crie pastas, faça upload de arquivos e imagens (com otimização de espaço), adicione links e crie Documentos diretamente pelo Drive.',
    features: [
      'Criação de pastas e subpastas',
      'Upload de arquivos e imagens com otimização',
      'Criação de Documentos diretamente pelo Drive',
      'Adicione links externos',
    ],
    limits: {
      free: '500 MB de armazenamento',
      pro: '15 GB de armazenamento',
    },
  },
  {
    id: 'documento',
    area: 'estudantil',
    icon: 'FileText',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
    glow: 'rgba(6,182,212,0.15)',
    title: 'Documento',
    tagline: 'Editor avançado em blocos',
    description:
      'Editor avançado em blocos focado em leitura estruturada. Possui paginação, sumário automático para navegação rápida, capa personalizada e geração de link público para compartilhamento externo. Pode receber "likes" de outros usuários.',
    features: [
      'Editor em blocos com paginação',
      'Sumário automático para navegação',
      'Capa personalizada',
      'Link público para compartilhamento externo',
      'Sistema de curtidas',
    ],
    limits: {
      free: 'Disponível em múltiplas áreas do sistema',
      pro: 'Recursos avançados desbloqueados',
    },
  },
  {
    id: 'perfil',
    area: 'estudantil',
    icon: 'Globe',
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/20',
    glow: 'rgba(99,102,241,0.15)',
    title: 'Perfil Público',
    tagline: 'Super Link & vitrine online',
    description:
      'Sua página externa configurável (ex: app.cursar.me/seunome). Escolha quais abas exibir: Início com links e bio, Portfólio com seus projetos, Formação com cursos e roadmaps, Carreira com experiências e currículo, e Biblioteca com documentos e arquivos públicos.',
    features: [
      'URL personalizada: app.cursar.me/seunome',
      'Abas configuráveis: Início, Portfólio, Formação, Carreira, Biblioteca',
      'Bio, links e foto personalizados',
      'Controle total sobre visibilidade de cada seção',
    ],
    limits: {
      free: 'Perfil público completo',
      pro: 'Visitantes revelados e conexões ilimitadas',
    },
  },

  // ── SOCIAL ──────────────────────────────────────────────────────────────────
  {
    id: 'projetos',
    area: 'social',
    icon: 'Sparkles',
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/20',
    glow: 'rgba(236,72,153,0.15)',
    title: 'Projetos',
    tagline: 'Feed da comunidade',
    description:
      'Feed para explorar os projetos públicos de outros usuários. Favorite, dê "like" e se inspire nas criações da comunidade. Sem restrições de plano — todos podem explorar.',
    features: [
      'Feed de projetos públicos da comunidade',
      'Curtir e favoritar projetos',
      'Explorar por tags e áreas',
    ],
    limits: {
      free: 'Acesso completo ao feed',
      pro: 'Acesso completo ao feed',
    },
  },
  {
    id: 'rede',
    area: 'social',
    icon: 'Users',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
    glow: 'rgba(168,85,247,0.15)',
    title: 'Rede',
    tagline: 'Diretório de profissionais',
    description:
      'Diretório de usuários do Cursar no estilo LinkedIn. Veja cartões com métricas de produtividade e gerencie suas conexões — envie, aceite, rejeite, explore, veja pendentes e bloqueados.',
    features: [
      'Diretório com métricas de produtividade',
      'Gestão completa de conexões',
      'Enviar, aceitar, rejeitar e bloquear',
    ],
    limits: {
      free: 'Limite de 20 conexões (enviadas contam). Não mostra visitantes do perfil',
      pro: 'Conexões ilimitadas + revela quem visitou seu perfil',
    },
  },
  {
    id: 'mensagens',
    area: 'social',
    icon: 'MessageSquare',
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/20',
    glow: 'rgba(99,102,241,0.15)',
    title: 'Mensagens',
    tagline: 'Inbox global · Beta',
    description:
      'Chat 1-a-1 com suas conexões aceitas. Acessível rapidamente através do ícone global na Navbar, independentemente de onde você esteja no sistema. Expansão futura para compartilhamento interno.',
    features: [
      'Chat direto com conexões aceitas',
      'Ícone global na Navbar para acesso rápido',
      'Notificações em tempo real',
    ],
    limits: {
      free: 'Limitado pelo número de conexões da conta',
      pro: 'Limitado pelo número de conexões da conta',
    },
  },

  // ── FITNESS (em breve) ────────────────────────────────────────────────────
  {
    id: 'treinos',
    area: 'fitness',
    icon: 'Dumbbell',
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/20',
    glow: 'rgba(34,197,94,0.15)',
    title: 'Treinos',
    tagline: 'Em breve',
    description: 'Gerencie sua evolução física com o mesmo rigor que você gerencia seus estudos.',
    features: [],
    soon: true,
    limits: { free: '', pro: '' },
  },

  // ── PESSOAL (em breve) ────────────────────────────────────────────────────
  {
    id: 'habitos',
    area: 'pessoal',
    icon: 'Heart',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    glow: 'rgba(245,158,11,0.15)',
    title: 'Hábitos & Metas',
    tagline: 'Em breve',
    description: 'Organize hábitos, metas e finanças — tudo integrado à sua rotina no Cursar.',
    features: [],
    soon: true,
    limits: { free: '', pro: '' },
  },
];