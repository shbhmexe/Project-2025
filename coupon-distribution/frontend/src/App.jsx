import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CouponPage from './pages/CouponPage';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/coupons" element={<CouponPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
