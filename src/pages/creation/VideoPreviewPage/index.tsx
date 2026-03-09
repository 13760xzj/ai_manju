import { useState, useEffect, useRef } from 'react';
import { useToast } from '@/hooks/useToast';
import { ConfirmDialog } from '@/components/common';
import { Button } from '@/components/common';
import './index.css';

export function VideoPreviewPage() {
  const toast = useToast();
  const [videoStatus] = useState('准备就绪');
  const timeRulerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDraggingPlayhead, setIsDraggingPlayhead] = useState(false);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  const TIMELINE_SECONDS = 150;
  const PIXELS_PER_SECOND = 20;
  const timelineWidth = TIMELINE_SECONDS * PIXELS_PER_SECOND;
  const playheadLeft = Math.max(0, Math.min(timelineWidth, currentTime * PIXELS_PER_SECOND));

  const initTimeRuler = () => {
    const ruler = timeRulerRef.current;
    if (!ruler) return;
    
    ruler.innerHTML = '';
    const totalDuration = TIMELINE_SECONDS;
    const pixelsPerSecond = PIXELS_PER_SECOND;
    
    for (let i = 0; i <= totalDuration; i++) {
      const tick = document.createElement('div');
      tick.className = 'time-tick' + (i % 5 === 0 ? ' major' : ' minor');
      tick.style.left = (i * pixelsPerSecond) + 'px';
      ruler.appendChild(tick);
      
      if (i % 5 === 0) {
        const marker = document.createElement('div');
        marker.className = 'time-marker';
        marker.style.left = (i * pixelsPerSecond) + 'px';
        const minutes = Math.floor(i / 60);
        const seconds = i % 60;
        marker.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        ruler.appendChild(marker);
      }
    }
  };

  useEffect(() => {
    initTimeRuler();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const newTime = parseFloat(e.target.value);
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (newVolume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    const container = playerContainerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(() => {
        toast.error('无法进入全屏');
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
  };

  const handleZoomIn = () => toast.info('放大时间轴，显示更精细的刻度');
  const handleZoomOut = () => toast.info('缩小时间轴，显示更宽的范围');
  const handleReGenerateVideo = () => {
    setShowConfirmDialog(true);
  };
  const confirmRegenerateVideo = () => {
    toast.info('正在重新生成视频...');
  };
  const handleExportVideo = () => toast.info('导出视频功能');
  const handleSaveProject = () => toast.success('项目已保存');
  const handleUploadDubbing = (index: number) => toast.info(`为分镜 ${index} 上传/替换配音文件`);
  const handleEditSubtitle = (index: number) => toast.info(`编辑字幕 ${index}，修改文字和显示时间`);
  const handleReplaceMusic = () => toast.info('替换背景音乐文件');

  const handlePlayheadMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingPlayhead(true);
  };

  const handlePlayheadMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingPlayhead || !timelineRef.current) return;
    
    const timeline = timelineRef.current;
    const rect = timeline.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const newTime = Math.max(0, Math.min(x / PIXELS_PER_SECOND, TIMELINE_SECONDS));
    
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  const handlePlayheadMouseUp = () => {
    setIsDraggingPlayhead(false);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDraggingPlayhead(false);
    };

    if (isDraggingPlayhead) {
      document.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDraggingPlayhead]);

  return (
    <div className="video-preview-page">
      <div className="page-toolbar ui-toolbar">
        <div className="toolbar-left">
          <div className="progress-info">
            视频信息：<span>{videoStatus}</span>
          </div>
        </div>
        <div className="toolbar-right">
          <Button variant="secondary" size="small" onClick={handleZoomIn}>放大 +</Button>
          <Button variant="secondary" size="small" onClick={handleZoomOut}>缩小 -</Button>
          <Button variant="secondary" size="small" onClick={handleReGenerateVideo}>重新生成视频</Button>
          <Button variant="secondary" size="small" onClick={handleExportVideo}>导出视频</Button>
          <Button variant="primary" size="small" onClick={handleSaveProject}>保存项目</Button>
        </div>
      </div>

      <div className="video-preview-container">
        <div className="main-video-player">
          <div className="video-player-wrapper" ref={playerContainerRef}>
            <video
              ref={videoRef}
              className="video-element"
              poster="https://via.placeholder.com/1280x720/1a1a2e/ffffff?text=Video+Preview"
              onClick={togglePlay}
            >
              <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
              您的浏览器不支持视频播放
            </video>
            
            <div className="video-overlay" onClick={togglePlay}>
              {!isPlaying && (
                <div className="play-button-overlay">
                  <span>▶</span>
                </div>
              )}
            </div>
            
            <div className="video-controls">
              <div className="progress-bar-container">
                <input
                  type="range"
                  className="progress-bar"
                  min="0"
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleProgressChange}
                  step="0.1"
                />
              </div>
              
              <div className="controls-bottom">
                <div className="controls-left">
                  <button className="control-btn" onClick={togglePlay}>
                    {isPlaying ? '⏸️' : '▶️'}
                  </button>
                  
                  <div className="volume-control">
                    <button className="control-btn volume-btn" onClick={toggleMute}>
                      {isMuted || volume === 0 ? '🔇' : volume < 0.5 ? '🔉' : '🔊'}
                    </button>
                    <input
                      type="range"
                      className="volume-slider"
                      min="0"
                      max="1"
                      step="0.1"
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                    />
                  </div>
                  
                  <span className="time-display">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>
                
                <div className="controls-right">
                  <button className="control-btn" onClick={toggleFullscreen}>
                    {isFullscreen ? '❐' : '⛶'}
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="timeline-section">
            <div className="tracks-wrapper">
              <div className="track-labels">
                <div className="track-label">
                  <div className="track-label-text">
                    <span>视频</span>
                  </div>
                </div>
                <div className="track-label">
                  <div className="track-label-text">
                    <span>配音</span>
                  </div>
                </div>
                <div className="track-label">
                  <div className="track-label-text">
                    <span>字幕</span>
                  </div>
                </div>
                <div className="track-label">
                  <div className="track-label-text">
                    <span>音乐</span>
                  </div>
                </div>
              </div>
              
              <div className="timeline-scroll" aria-label="时间轴滚动区域" ref={timelineRef}>
                <div className="timeline-content" style={{ width: `${timelineWidth}px` }}>
                  <div className="time-ruler" id="time-ruler" ref={timeRulerRef} />
                  <div 
                    className="timeline-playhead" 
                    style={{ left: `${playheadLeft}px` }}
                    onMouseDown={handlePlayheadMouseDown}
                    onMouseMove={handlePlayheadMouseMove}
                    onMouseUp={handlePlayheadMouseUp}
                  />
              
              <div className="tracks-area">
                <div className="track track-video">
                  {[ 
                    { width: 200, label: '分镜 1' },
                    { width: 180, label: '分镜 2' },
                    { width: 220, label: '分镜 3' },
                    { width: 190, label: '分镜 4' },
                    { width: 210, label: '分镜 5' },
                    { width: 170, label: '分镜 6' }
                  ].map((clip, i) => (
                    <div key={i} className="video-clip" style={{ width: clip.width + 'px' }}>
                      <div className="clip-handle clip-handle-left"></div>
                      <div className="video-clip-label">{clip.label}</div>
                      <div className="clip-handle clip-handle-right"></div>
                    </div>
                  ))}
                </div>
                
                <div className="track track-dubbing">
                  {[
                    { width: 200, hasAudio: false, text: '无配音' },
                    { width: 180, hasAudio: true, text: 'dubbing_2.mp3' },
                    { width: 220, hasAudio: true, text: 'dialogue_3.wav' },
                    { width: 190, hasAudio: false, text: '无配音' },
                    { width: 210, hasAudio: true, text: 'voiceover_5.mp3' },
                    { width: 170, hasAudio: false, text: '无配音' }
                  ].map((clip, i) => (
                    <div 
                      key={i} 
                      className={`dubbing-clip ${!clip.hasAudio ? 'no-audio' : ''}`} 
                      style={{ width: clip.width + 'px' }}
                      onClick={() => handleUploadDubbing(i + 1)}
                    >
                      <span className="dubbing-clip-text">{clip.text}</span>
                    </div>
                  ))}
                </div>
                
                <div className="track track-subtitle">
                  {[
                    { width: 200, text: '这是第一幕字幕...' },
                    { width: 180, text: '第二幕开始...' },
                    { width: 220, text: '主角登场，故事展开...' },
                    { width: 190, text: '冲突升级...' },
                    { width: 210, text: '高潮迭起，情感爆发...' },
                    { width: 170, text: '故事结束，谢幕...' }
                  ].map((clip, i) => (
                    <div 
                      key={i} 
                      className="subtitle-clip" 
                      style={{ width: clip.width + 'px' }}
                      onClick={() => handleEditSubtitle(i + 1)}
                    >
                      <div className="clip-handle clip-handle-left"></div>
                      <span className="subtitle-clip-text">{clip.text}</span>
                      <div className="clip-handle clip-handle-right"></div>
                    </div>
                  ))}
                </div>
                
                <div className="track track-music">
                      <div className="music-clip" style={{ width: `${timelineWidth}px` }} onClick={handleReplaceMusic}>
                    <div className="clip-handle clip-handle-left"></div>
                    <div className="music-waveform">
                      {[30, 50, 70, 45, 65, 55, 80, 40, 60, 75, 50, 65, 45, 70, 55, 60, 40, 65, 50, 75].map((h, i) => (
                        <div key={i} className="wave-bar" style={{ height: h + '%' }}></div>
                      ))}
                    </div>
                    <span className="music-clip-text">
                      <span>背景音乐 - epic_theme.mp3</span>
                    </span>
                    <div className="clip-handle clip-handle-right"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConfirmDialog
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={confirmRegenerateVideo}
        title="确认操作"
        message="确定要重新生成视频吗？当前内容将会被覆盖。"
        confirmText="确定"
        cancelText="取消"
        variant="warning"
      />
    </div>
  );
}
