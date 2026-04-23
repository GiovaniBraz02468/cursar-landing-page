// App.jsx
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ModulesPage from './pages/ModulesPage';
import UpdatesPage from './pages/UpdatesPage';
import UpdateDetailPage from './pages/UpdateDetailPage';

// Scroll to top on every route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function Layout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/modulos" element={<ModulesPage />} />
          <Route path="/atualizacoes" element={<UpdatesPage />} />
          <Route path="/atualizacoes/:id" element={<UpdateDetailPage />} />
          {/* Fallback */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}