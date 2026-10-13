import React, { useEffect, useRef, useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faPause,
  faVolumeHigh,
  faVolumeLow,
  faVolumeMute,
  faExpand,
  faCompress,
  faXmark,
  faRotateRight
} from '@fortawesome/free-solid-svg-icons';
import './VideoPlayerModal.scss';

function formatTime(seconds) {
  if (isNaN(seconds) || seconds < 0) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  const paddedMins = mins < 10 ? `0${mins}` : `${mins}`;
  const paddedSecs = secs < 10 ? `0${secs}` : `${secs}`;
  return `${paddedMins}:${paddedSecs}`;
}

const VideoPlayerModal = ({ video, onClose }) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const progressBarRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [bufferedEnd, setBufferedEnd] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showControls, setShowControls] = useState(true);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [hoverSeekTime, setHoverSeekTime] = useState(null);
  const [hoverSeekPosition, setHoverSeekPosition] = useState(0);

  // Clean exit helper
  const handleClose = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    if (document.fullscreenElement) {
      try {
        document.exitFullscreen();
      } catch (e) {
        // ignore
      }
    }
    onClose();
  }, [onClose]);

  // Attempt autoplay with sound when video mounts
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    setIsLoading(true);
    setHasError(false);
    setAutoplayBlocked(false);

    // Ensure audio starts unmuted with normal volume
    vid.muted = false;
    vid.volume = volume;

    const playPromise = vid.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setIsLoading(false);
          setAutoplayBlocked(false);
        })
        .catch((err) => {
          setIsLoading(false);
          // Browser prevented autoplay with sound
          if (err.name === 'NotAllowedError') {
            setAutoplayBlocked(true);
            setIsPlaying(false);
          } else if (err.name !== 'AbortError') {
            setHasError(true);
            setErrorMessage('Unable to play video in current format.');
          }
        });
    }
  }, [video, volume]);

  // Handle Play with Sound user action
  const handlePlayWithSound = () => {
    const vid = videoRef.current;
    if (!vid) return;

    vid.muted = false;
    vid.volume = volume > 0 ? volume : 1;
    setIsMuted(false);
    setAutoplayBlocked(false);

    vid.play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch((err) => {
        console.error('Play with sound failed:', err);
        setHasError(true);
        setErrorMessage('Failed to start playback. Please try again.');
      });
  };

  // Toggle Play / Pause
  const togglePlay = useCallback(() => {
    const vid = videoRef.current;
    if (!vid) return;

    if (vid.paused || vid.ended) {
      vid.play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.error('Playback failed:', err);
        });
    } else {
      vid.pause();
      setIsPlaying(false);
    }
  }, []);

  // Time update listener
  const handleTimeUpdate = () => {
    const vid = videoRef.current;
    if (!vid) return;
    setCurrentTime(vid.currentTime);

    // Update buffer progress
    if (vid.buffered && vid.buffered.length > 0) {
      const end = vid.buffered.end(vid.buffered.length - 1);
      setBufferedEnd(end);
    }
  };

  const handleLoadedMetadata = () => {
    const vid = videoRef.current;
    if (!vid) return;
    setDuration(vid.duration);
    setIsLoading(false);
  };

  const handleVideoWaiting = () => setIsLoading(true);
  const handleVideoPlaying = () => {
    setIsLoading(false);
    setIsPlaying(true);
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setShowControls(true);
  };

  const handleVideoError = () => {
    setIsLoading(false);
    setHasError(true);
    setErrorMessage('Failed to load this video. Please check your network or try again.');
  };

  // Volume controls
  const handleVolumeChange = (newVol) => {
    const vid = videoRef.current;
    if (!vid) return;
    const clamped = Math.max(0, Math.min(1, newVol));
    vid.volume = clamped;
    vid.muted = clamped === 0;
    setVolume(clamped);
    setIsMuted(clamped === 0);
  };

  const toggleMute = useCallback(() => {
    const vid = videoRef.current;
    if (!vid) return;
    if (isMuted) {
      vid.muted = false;
      const targetVol = volume > 0 ? volume : 0.8;
      vid.volume = targetVol;
      setIsMuted(false);
      setVolume(targetVol);
    } else {
      vid.muted = true;
      setIsMuted(true);
    }
  }, [isMuted, volume]);

  // Seeking
  const handleSeek = (e) => {
    const vid = videoRef.current;
    const bar = progressBarRef.current;
    if (!vid || !bar || !duration) return;

    const rect = bar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = ratio * duration;

    vid.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleProgressBarMouseMove = (e) => {
    const bar = progressBarRef.current;
    if (!bar || !duration) return;
    const rect = bar.getBoundingClientRect();
    const hoverX = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const ratio = hoverX / rect.width;
    setHoverSeekPosition(hoverX);
    setHoverSeekTime(ratio * duration);
  };

  const handleProgressBarMouseLeave = () => {
    setHoverSeekTime(null);
  };

  // Skip relative seconds (+/- 5s)
  const skipSeconds = useCallback((secs) => {
    const vid = videoRef.current;
    if (!vid || !duration) return;
    const target = Math.max(0, Math.min(duration, vid.currentTime + secs));
    vid.currentTime = target;
    setCurrentTime(target);
  }, [duration]);

  // Fullscreen toggle
  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      if (container.requestFullscreen) {
        container.requestFullscreen();
      } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
      } else if (container.msRequestFullscreen) {
        container.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  };

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    document.addEventListener('webkitfullscreenchange', onFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', onFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', onFullscreenChange);
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't intercept if focus is in an input
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      switch (e.key) {
        case 'Escape':
          e.preventDefault();
          if (document.fullscreenElement) {
            document.exitFullscreen();
          } else {
            handleClose();
          }
          break;
        case ' ':
        case 'k':
        case 'K':
          e.preventDefault();
          togglePlay();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          skipSeconds(-5);
          break;
        case 'ArrowRight':
          e.preventDefault();
          skipSeconds(5);
          break;
        case 'ArrowUp':
          e.preventDefault();
          handleVolumeChange(volume + 0.1);
          break;
        case 'ArrowDown':
          e.preventDefault();
          handleVolumeChange(volume - 0.1);
          break;
        case 'm':
        case 'M':
          e.preventDefault();
          toggleMute();
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          toggleFullscreen();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleClose, togglePlay, skipSeconds, volume, toggleMute]);

  // Controls auto-hide
  const handleUserActivity = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  };

  const handleRetry = () => {
    setHasError(false);
    setIsLoading(true);
    const vid = videoRef.current;
    if (vid) {
      vid.load();
      vid.play()
        .then(() => setIsPlaying(true))
        .catch(() => setHasError(true));
    }
  };

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;
  const bufferedPercent = duration ? (bufferedEnd / duration) * 100 : 0;

  return (
    <div
      className="video-modal-backdrop"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label={video.title}
    >
      <div
        className={`video-modal-container ${isFullscreen ? 'is-fullscreen' : ''}`}
        ref={containerRef}
        onClick={(e) => e.stopPropagation()}
        onMouseMove={handleUserActivity}
        onTouchStart={handleUserActivity}
      >
        {/* Top Header / Bar */}
        <div className={`video-header ${showControls || !isPlaying ? 'visible' : 'hidden'}`}>
          <div className="video-title-info">
            <span className="video-tag-badge">{video.tag || 'Video'}</span>
            <h3 className="video-title-text">{video.title}</h3>
            {video.client && <span className="video-client-badge">Client: {video.client}</span>}
          </div>
          <button
            type="button"
            className="video-close-btn"
            onClick={handleClose}
            aria-label="Close video player"
            title="Close (Esc)"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        {/* Video Canvas Container */}
        <div className="video-player-viewport" onClick={togglePlay}>
          <video
            ref={videoRef}
            src={video.src}
            playsInline
            preload="auto"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onWaiting={handleVideoWaiting}
            onPlaying={handleVideoPlaying}
            onEnded={handleVideoEnded}
            onError={handleVideoError}
            className="video-element"
          />

          {/* Buffering Spinner */}
          {isLoading && !hasError && !autoplayBlocked && (
            <div className="video-spinner-overlay" aria-label="Loading video">
              <div className="spinner-ring" />
              <span>Loading video...</span>
            </div>
          )}

          {/* Autoplay Blocked Overlay: Play with Sound button */}
          {autoplayBlocked && (
            <div
              className="autoplay-blocked-overlay"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="blocked-dialog">
                <FontAwesomeIcon icon={faVolumeHigh} className="sound-icon-pulse" />
                <h4>Autoplay with audio blocked by browser</h4>
                <p>Click below to start watching with original audio track enabled.</p>
                <button
                  type="button"
                  className="play-with-sound-btn"
                  onClick={handlePlayWithSound}
                  autoFocus
                >
                  <FontAwesomeIcon icon={faPlay} /> Play with Sound
                </button>
              </div>
            </div>
          )}

          {/* Error Overlay */}
          {hasError && (
            <div
              className="video-error-overlay"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="error-dialog">
                <h4>Unable to Play Video</h4>
                <p>{errorMessage}</p>
                <button
                  type="button"
                  className="retry-btn"
                  onClick={handleRetry}
                >
                  <FontAwesomeIcon icon={faRotateRight} /> Retry Playback
                </button>
              </div>
            </div>
          )}

          {/* Center Play/Pause Indicator on pause */}
          {!isPlaying && !isLoading && !autoplayBlocked && !hasError && (
            <div className="center-play-badge" aria-hidden="true">
              <FontAwesomeIcon icon={faPlay} />
            </div>
          )}
        </div>

        {/* Bottom Control Bar */}
        <div className={`video-controls-bar ${showControls || !isPlaying ? 'visible' : 'hidden'}`}>
          {/* Progress / Seek Bar */}
          <div
            className="seek-bar-wrapper"
            ref={progressBarRef}
            onClick={handleSeek}
            onMouseMove={handleProgressBarMouseMove}
            onMouseLeave={handleProgressBarMouseLeave}
            role="slider"
            aria-valuemin="0"
            aria-valuemax={duration || 0}
            aria-valuenow={currentTime}
            aria-label="Video seek bar"
            tabIndex={0}
          >
            <div className="seek-track">
              <div
                className="seek-buffered"
                style={{ width: `${bufferedPercent}%` }}
              />
              <div
                className="seek-progress"
                style={{ width: `${progressPercent}%` }}
              >
                <span className="seek-thumb" />
              </div>
            </div>

            {/* Hover tooltip with time */}
            {hoverSeekTime !== null && (
              <div
                className="seek-hover-tooltip"
                style={{ left: `${hoverSeekPosition}px` }}
              >
                {formatTime(hoverSeekTime)}
              </div>
            )}
          </div>

          {/* Controls Buttons Row */}
          <div className="controls-row">
            <div className="controls-left">
              <button
                type="button"
                className="control-btn play-pause-btn"
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pause' : 'Play'}
                title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
              >
                <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
              </button>

              <div className="time-display">
                <span className="current-time">{formatTime(currentTime)}</span>
                <span className="time-separator">/</span>
                <span className="total-duration">{formatTime(duration)}</span>
              </div>
            </div>

            <div className="controls-right">
              {/* Volume & Mute */}
              <div className="volume-control-group">
                <button
                  type="button"
                  className="control-btn volume-btn"
                  onClick={toggleMute}
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                  title={isMuted ? 'Unmute (M)' : 'Mute (M)'}
                >
                  <FontAwesomeIcon
                    icon={
                      isMuted || volume === 0
                        ? faVolumeMute
                        : volume < 0.5
                        ? faVolumeLow
                        : faVolumeHigh
                    }
                  />
                </button>
                <input
                  type="range"
                  className="volume-slider"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                  aria-label="Volume slider"
                />
              </div>

              {/* Fullscreen Button */}
              <button
                type="button"
                className="control-btn fullscreen-btn"
                onClick={toggleFullscreen}
                aria-label={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
                title={isFullscreen ? 'Exit Fullscreen (F)' : 'Fullscreen (F)'}
              >
                <FontAwesomeIcon icon={isFullscreen ? faCompress : faExpand} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerModal;
