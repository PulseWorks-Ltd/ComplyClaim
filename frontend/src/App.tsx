import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { PaymentClaimsPage } from './pages/PaymentClaimsPage';
import { VariationsPage } from './pages/VariationsPage';
import { TendersPage } from './pages/TendersPage';
import { HealthSafetyPage } from './pages/HealthSafetyPage';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<PaymentClaimsPage />} />
          <Route path="/variations" element={<VariationsPage />} />
          <Route path="/tenders" element={<TendersPage />} />
          <Route path="/health-safety" element={<HealthSafetyPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
