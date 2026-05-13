import DownloadContent from '../../components/DownloadContent';

export const metadata = {
  title: 'Download Cursar — Windows, Android, iOS e Web',
  description: 'Tenha o Cursar em todos os seus dispositivos. Baixe a versão nativa para Windows ou acesse via PWA no Android e iOS. Sincronização em tempo real.',
  openGraph: {
    title: 'Download Cursar — Windows, Android, iOS e Web',
    description: 'Tenha o Cursar em todos os seus dispositivos. Baixe a versão nativa para Windows ou acesse via PWA.',
  }
};

export default function DownloadPage() {
  return <DownloadContent />;
}
