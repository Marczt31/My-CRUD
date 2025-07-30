import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout';
import TablaViendoA from './components/TablasA/TablaViendoA';
import TablaEsperandoA from './components/TablasA/TablaEsperandoA';
import TablaManga from './components/TablasM/TablaManga';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="viendo" replace />} />
        <Route path="viendo" element={<TablaViendoA />} />
        <Route path="esperando" element={<TablaEsperandoA />} />
        <Route path="manga" element={<TablaManga />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App
