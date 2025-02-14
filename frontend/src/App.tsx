import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAPIStore } from './stores/api';
import Settings from './pages/Settings';

function App() {
  const { initConfig, isConfigured } = useAPIStore();

  useEffect(() => {
    initConfig();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={
          isConfigured ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/settings" replace />
          )
        } />
      </Routes>
    </Router>
  );
}

export default App;
