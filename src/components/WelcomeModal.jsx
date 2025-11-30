import React from 'react';
import './WelcomeModal.css';
const cfciLogo = '/cfci-logo.jpg';

const WelcomeModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <img src={cfciLogo} alt="CFCI Logo" className="modal-logo" />
        </div>
        <h1 className="modal-title">Welcome to CFCI's Project Intake Chatbot!</h1>
        <p className="modal-description">
          This interactive tool will help you create a polished Product Brief for submission to CFCI for project matching. To get started, type a description of your startup or the idea you'd like CFCI's Product Lab to support. Our assistant will collaborate with you to build out the rest.
        </p>
        <p className="modal-link-text">
          Before submitting, be sure to read our{' '}
          <a href="https://drive.google.com/file/d/1ER7oPqx6F8OlBkUtvYbKXjcyGvtRrNTg/view" target="_blank" rel="noopener noreferrer" className="modal-link">Product Lab Sponsorship one-pager</a>!
        </p>
        <div className="modal-button-container">
          <button className="modal-button" onClick={onClose}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;
