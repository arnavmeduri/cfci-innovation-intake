import React, { useState } from 'react';
import './LandingPage.css';
const cfciLogo = '/cfci-logo.jpg';
const cfciIcon = '/cfci-icon.png';

const LandingPage = ({ onOpenWelcome }) => {
  const [showGetStarted, setShowGetStarted] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [attachedFiles, setAttachedFiles] = useState([]);
  const fileInputRef = React.useRef(null);
  const pdfInputRef = React.useRef(null);
  const textareaRef = React.useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    // Handle form submission here
    console.log('Submitted:', inputValue);
    setInputValue('');
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleFileAttach = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files && files.length > 0) {
      const newFiles = files.map(file => ({
        file,
        name: file.name,
        size: file.size,
        type: file.type
      }));
      setAttachedFiles(prev => [...prev, ...newFiles]);
    }
    // Reset input so same file can be selected again
    e.target.value = '';
  };

  const handlePDFAttach = () => {
    pdfInputRef.current?.click();
  };

  const handlePDFChange = (e) => {
    const files = Array.from(e.target.files);
    if (files && files.length > 0) {
      const newFiles = files.map(file => ({
        file,
        name: file.name,
        size: file.size,
        type: file.type
      }));
      setAttachedFiles(prev => [...prev, ...newFiles]);
    }
    // Reset input so same file can be selected again
    e.target.value = '';
  };

  const handleRemoveFile = (index) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const handleBuildClick = () => {
    setInputValue('I want to build ');
    // Focus and reset height
    if (textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleStartupNeedsClick = () => {
    setInputValue('My startup needs ');
    // Focus and reset height
    if (textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleLogoClick = () => {
    window.location.reload();
  };

  return (
    <div className="landing-page">
      <div className="landing-header">
        <img 
          src={cfciLogo} 
          alt="CFCI Logo" 
          className="header-logo" 
          onClick={handleLogoClick}
        />
      </div>
      
      <div className="landing-content">
        <div className="icon-container">
          <img src={cfciIcon} alt="CFCI Icon" className="main-icon" />
        </div>
        
        <h1 className="landing-title">Tell us your idea.</h1>
        
        <form onSubmit={handleSubmit} className="input-form">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
            multiple
          />
          <input
            type="file"
            ref={pdfInputRef}
            onChange={handlePDFChange}
            accept=".pdf,application/pdf"
            style={{ display: 'none' }}
            multiple
          />
          <div className="input-container">
            <button
              type="button"
              className="attach-button"
              onClick={handleFileAttach}
              aria-label="Attach file"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.5 5.83333V14.1667C12.5 15.5474 11.3807 16.6667 10 16.6667C8.61929 16.6667 7.5 15.5474 7.5 14.1667V5C7.5 3.61929 8.61929 2.5 10 2.5C11.3807 2.5 12.5 3.61929 12.5 5V12.5C12.5 13.1904 11.9404 13.75 11.25 13.75C10.5596 13.75 10 13.1904 10 12.5V5.83333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="input-content">
              {attachedFiles.length > 0 && (
                <div className="attached-files-inline">
                  {attachedFiles.map((fileInfo, index) => {
                    const fileExtension = fileInfo.name.split('.').pop()?.toUpperCase() || 'FILE';
                    return (
                      <div key={index} className="attached-file-inline">
                        <div className="file-indicator" style={{ backgroundColor: '#8B5CF6' }}></div>
                        <div className="file-details">
                          <span className="file-name-inline">{fileInfo.name}</span>
                          <span className="file-type">{fileExtension}</span>
                        </div>
                        <button
                          className="remove-file-button-inline"
                          onClick={() => handleRemoveFile(index)}
                          aria-label="Remove file"
                        >
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
              <textarea
                ref={textareaRef}
                className="text-input"
                placeholder="What do you want us to do first?"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                rows={1}
              />
            </div>
            <button
              type="submit"
              className="send-button"
              aria-label="Send message"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.5 9.16667L17.5 2.5L12.8333 17.5L10 10.8333L2.5 9.16667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </form>

        {!showGetStarted && (
          <button 
            className="show-suggestions-button"
            onClick={() => setShowGetStarted(true)}
          >
            Show suggestions
          </button>
        )}

        {showGetStarted && (
          <div className="get-started-section">
            <div className="get-started-header">
              <h2 className="get-started-title">Get started</h2>
              <button
                className="close-button"
                onClick={() => setShowGetStarted(false)}
                aria-label="Close get started section"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <div className="suggestion-cards">
              <div className="suggestion-card" onClick={handlePDFAttach}>
                <div className="card-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 18V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 15H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="card-text">Attach relevant PDFs</p>
              </div>
              <div className="suggestion-card" onClick={handleBuildClick}>
                <div className="card-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M18.5 2.5C18.8978 2.10218 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10218 21.5 2.5C21.8978 2.89782 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10218 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="card-text">"I want to build..."</p>
              </div>
              <div className="suggestion-card" onClick={handleStartupNeedsClick}>
                <div className="card-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="card-text">"My startup needs..."</p>
              </div>
            </div>
          </div>
        )}
        
        <button 
          className="about-link"
          onClick={onOpenWelcome}
        >
          Learn more about Product Lab Assistant
        </button>
      </div>
    </div>
  );
};

export default LandingPage;

