import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faFilm,
  faArrowLeft,
  faFolderOpen
} from '@fortawesome/free-solid-svg-icons';
import VideoPlayerModal from '../VideoPlayer/VideoPlayerModal';
import './VideoGallery.scss';

// Individual video card with live thumbnail preview and duration tracking
const VideoCard = ({ video, onSelect }) => {
  const [duration, setDuration] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleLoadedMetadata = (e) => {
    if (e.target && e.target.duration && !isNaN(e.target.duration)) {
      const mins = Math.floor(e.target.duration / 60);
      const secs = Math.floor(e.target.duration % 60);
      setDuration(`${mins}:${secs < 10 ? '0' : ''}${secs}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(video);
    }
  };

  return (
    <div
      className={`video-gallery-card ${isHovered ? 'hovered' : ''}`}
      role="button"
      tabIndex={0}
      onClick={() => onSelect(video)}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={`Play ${video.title}`}
    >
      <div className="card-media-wrapper">
        {video.thumbnail ? (
          <img
            src={video.thumbnail}
            alt={video.title}
            className="video-custom-poster"
            loading="lazy"
          />
        ) : (
          <video
            src={`${video.src}#t=0.5`}
            preload="metadata"
            muted
            playsInline
            onLoadedMetadata={handleLoadedMetadata}
            className="video-preview-element"
          />
        )}

        {/* Hover / Play Overlay */}
        <div className="play-button-overlay">
          <div className="play-icon-circle">
            <FontAwesomeIcon icon={faPlay} />
          </div>
        </div>

        {/* Duration badge */}
        {duration && <span className="video-duration-badge">{duration}</span>}

        {/* Tag badge */}
        <span className="video-card-tag">{video.tag}</span>
      </div>

      <div className="card-info">
        <h4 className="video-card-title">{video.title}</h4>
        {video.client && (
          <p className="video-card-client">
            <span className="client-label">Creator / Client:</span> {video.client}
          </p>
        )}
        {video.description && (
          <p className="video-card-description">{video.description}</p>
        )}

        <div className="card-actions">
          <button
            type="button"
            className="card-play-action-btn"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(video);
            }}
          >
            <FontAwesomeIcon icon={faPlay} /> Watch Video
          </button>
        </div>
      </div>
    </div>
  );
};

const VideoGallery = ({
  categoryName,
  categoryType,
  videos = [],
  onBackToVideoEditing,
  onBackToOthers,
  onBackToProjects
}) => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const handleBackToEditing = onBackToVideoEditing || onBackToOthers;

  return (
    <div className="video-gallery-section">
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
        <button
          type="button"
          className="crumb root"
          onClick={handleBackToEditing}
        >
          Video Editing
        </button>
        <span className="sep">/</span>
        <span className="crumb current" aria-current="page">
          {categoryName}
        </span>
      </nav>

      {/* Back button */}
      <button
        type="button"
        className="back-btn"
        onClick={handleBackToEditing}
        aria-label="Back to Video Editing folders"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="arrow-icon" />
        Back to Video Editing
      </button>

      {/* Gallery Header */}
      <div className="gallery-header-block">
        <div className="gallery-header-badge">
          <FontAwesomeIcon icon={faFilm} />
          <span>{categoryType === 'client' ? 'Client Video Portfolio' : 'Personal Video Showcase'}</span>
        </div>
        <h2 className="gallery-main-title">{categoryName}</h2>
        <p className="gallery-subtitle">
          {categoryType === 'client'
            ? 'Commercial video edits, motion graphics, and high-retention social media reels crafted for clients.'
            : 'Personal video editing projects, cinematic reels, and creative AI-generated experiments.'}
        </p>
        <div className="video-count-pill">
          {videos.length} {videos.length === 1 ? 'Video' : 'Videos'} Available
        </div>
      </div>

      {/* Empty State or Video Grid */}
      {videos.length === 0 ? (
        <div className="gallery-empty-state">
          <div className="empty-icon-wrap">
            <FontAwesomeIcon icon={faFolderOpen} />
          </div>
          <h3>No videos added yet.</h3>
          <p>
            Place supported video files (.mp4, .webm, .mov) into{' '}
            <code>
              src/assets/video editing/{categoryType === 'client' ? 'client' : 'personal'}/
            </code>{' '}
            to display them here.
          </p>
        </div>
      ) : (
        <div className="video-cards-grid">
          {videos.map((vid) => (
            <VideoCard
              key={vid.id}
              video={vid}
              onSelect={setSelectedVideo}
            />
          ))}
        </div>
      )}

      {/* Video Player Modal */}
      {selectedVideo && (
        <VideoPlayerModal
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </div>
  );
};

export default VideoGallery;
