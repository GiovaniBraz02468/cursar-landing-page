import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import posthog from 'posthog-js';
import Navbar from './components/Navbar';
import HomePage from './pages/Homepage';
import ModulesPage from './pages/Modulespage';
import UpdatesPage from './pages/UpdatesPage';
import UpdateDetailPage from './pages/UpdateDetailPage';
import ContactPage from './pages/ContactPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function PostHogPageView() {
  const location = useLocation();
  useEffect(() => {
    posthog.capture('$pageview', { $current_url: window.location.href });
  }, [location]);
  return null;
}

function Layout() {
  return (
    <>
      <ScrollToTop />
      <PostHogPageView />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/modulos" element={<ModulesPage />} />
          <Route path="/atualizacoes" element={<UpdatesPage />} />
          <Route path="/atualizacoes/:id" element={<UpdateDetailPage />} />
          <Route path="/suporte" element={<ContactPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
    </>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </HelmetProvider>
  );
}

