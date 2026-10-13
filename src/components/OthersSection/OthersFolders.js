import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faClapperboard, faUserTie, faUserNinja } from '@fortawesome/free-solid-svg-icons';
import './OthersFolders.scss';

const FOLDER_OPEN_DELAY = 520;

const OthersFolders = ({
  personalCount = 0,
  clientCount = 0,
  onSelectSubcategory,
  onBackToProjects
}) => {
  const [animatingId, setAnimatingId] = useState(null);

  const handleFolderClick = (id) => {
    if (animatingId) return;
    setAnimatingId(id);
    setTimeout(() => {
      onSelectSubcategory(id);
      setAnimatingId(null);
    }, FOLDER_OPEN_DELAY);
  };

  return (
    <div className="others-folders-view">
      {/* Breadcrumb Navigation */}
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <button
          type="button"
          className="crumb root"
          onClick={onBackToProjects}
        >
          Projects
        </button>
        <span className="sep">/</span>
        <span className="crumb current" aria-current="page">
          Video Editing
        </span>
      </nav>

      {/* Back to Projects Button */}
      <button
        type="button"
        className="back-btn"
        onClick={onBackToProjects}
        aria-label="Back to all projects"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="arrow-icon" />
        Back to Projects
      </button>

      {/* Section Header */}
      <div className="others-header">
        <div className="others-badge">
          <FontAwesomeIcon icon={faClapperboard} />
          <span>Video Editing Portfolio</span>
        </div>
        <h2 className="others-title">Video Editing & Creative Media</h2>
        <p className="others-description">
          Select a category to explore personal video experiments, cinematic reels,
          or commercial social media edits produced for clients.
        </p>
      </div>

      {/* Two Folder Cards: Personal Edits & Client */}
      <div className="others-folder-grid">
        {/* Folder 1: Personal Edits */}
        <div className="folder-card-wrapper">
          <button
            type="button"
            className={`folder${animatingId === 'personal' ? ' opening' : ''}`}
            onClick={() => handleFolderClick('personal')}
            aria-label="Open Personal Edits folder"
          >
            <span className="folder-shadow" aria-hidden="true" />
            <span className="folder-icon" aria-hidden="true">
              <span className="folder-papers" />
              <span className="folder-back" />
              <span className="folder-front" />
            </span>
            <span className="folder-label">Personal Edits</span>
          </button>
          <div className="folder-card-details">
            <span className="folder-count-badge">
              <FontAwesomeIcon icon={faUserNinja} /> {personalCount} Videos
            </span>
            <p className="folder-desc-text">
              Self-directed creative projects, AI animations, and cinematic reels.
            </p>
          </div>
        </div>

        {/* Folder 2: Client */}
        <div className="folder-card-wrapper">
          <button
            type="button"
            className={`folder${animatingId === 'client' ? ' opening' : ''}`}
            onClick={() => handleFolderClick('client')}
            aria-label="Open Client folder"
          >
            <span className="folder-shadow" aria-hidden="true" />
            <span className="folder-icon" aria-hidden="true">
              <span className="folder-papers" />
              <span className="folder-back" />
              <span className="folder-front" />
            </span>
            <span className="folder-label">Client</span>
          </button>
          <div className="folder-card-details">
            <span className="folder-count-badge">
              <FontAwesomeIcon icon={faUserTie} /> {clientCount} Videos
            </span>
            <p className="folder-desc-text">
              Commissioned video edits, motion cuts, and high-retention creator reels.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OthersFolders;
