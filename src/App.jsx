import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import WelcomeModal from './components/WelcomeModal';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';

function App() {
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);

  // Check if user has seen the welcome modal before
  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('cfci-welcome-seen');
    if (hasSeenWelcome === 'true') {
      setShowWelcomeModal(false);
    }
  }, []);

  const handleCloseWelcome = () => {
    setShowWelcomeModal(false);
    localStorage.setItem('cfci-welcome-seen', 'true');
  };

  const handleOpenWelcome = () => {
    setShowWelcomeModal(true);
  };

  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route 
              path="/" 
              element={
                <>
                  <LandingPage onOpenWelcome={handleOpenWelcome} />
                  <WelcomeModal isOpen={showWelcomeModal} onClose={handleCloseWelcome} />
                </>
              } 
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
