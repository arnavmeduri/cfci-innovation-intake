import React, { useState, useEffect } from 'react';
import './App.css';
import WelcomeModal from './components/WelcomeModal';
import LandingPage from './components/LandingPage';

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
    <div className="app">
      <LandingPage onOpenWelcome={handleOpenWelcome} />
      <WelcomeModal isOpen={showWelcomeModal} onClose={handleCloseWelcome} />
    </div>
  );
}

export default App;

