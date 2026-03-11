import React, { useState, useEffect, useRef } from 'react';
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
  const [isDraggingPlayhead, setIsDraggingPlayhead] = useState(false);

  const TIMELINE_SECONDS = 150;
  const PIXELS_PER_SECOND = 28;
  const timelineWidth = TIMELINE_SECONDS * PIXELS_PER_SECOND;
  const playheadLeft = Math.max(0, Math.min(timelineWidth, currentTime * PIXELS_PER_SECOND));

  const initTimeRuler = () => {
    const headerRuler = timeRulerRef.current;
    if (!headerRuler) return;

    headerRuler.innerHTML = '';
    const totalDuration = TIMELINE_SECONDS;
    const pixelsPerSecond = PIXELS_PER_SECOND;

    // 每秒一个主刻度 + 时间文字；每 0.5 秒一个次刻度
    const STEP = 0.5;
    const steps = Math.floor(totalDuration / STEP);

    for (let i = 0; i <= steps; i++) {
      const timeInSeconds = i * STEP;
      const isWholeSecond = Number.isInteger(timeInSeconds);

      const tick = document.createElement('div');
      tick.className = 'time-tick' + (isWholeSecond ? ' major' : ' minor');
      tick.style.left = (timeInSeconds * pixelsPerSecond) + 'px';
      headerRuler.appendChild(tick);

      // 每秒显示一次时间：00:00、00:01、00:02...
      if (isWholeSecond) {
        const marker = document.createElement('div');
        marker.className = 'time-marker';
        marker.style.left = (timeInSeconds * pixelsPerSecond) + 'px';
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        marker.textContent = `${minutes.toString().padStart(2, '0')}:${seconds
          .toString()
          .padStart(2, '0')}`;
        headerRuler.appendChild(marker);
      }
    }
  };

  useEffect(() => {
    initTimeRuler();
  }, []);

  // 同步时间轴刻度与下方轨道的滚动位置，避免刻度和块错位
  useEffect(() => {
    const timeline = timelineRef.current;
    const ruler = timeRulerRef.current;
    if (!timeline || !ruler) return;

    const handleScroll = () => {
      ruler.style.transform = `translateX(-${timeline.scrollLeft}px)`;
    };

    timeline.addEventListener('scroll', handleScroll);
    return () => {
      timeline.removeEventListener('scroll', handleScroll);
    };
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

  const handleReGenerateVideo = () => {
    setShowConfirmDialog(true);
  };
  const confirmRegenerateVideo = () => {
    toast.info('正在重新生成视频...');
  };
  const handleSyncToTimeline = () => toast.success('已将当前视频同步到时间轴');
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
      <div className="video-preview-actions">
        <span className="progress-info">
          视频信息：<span>{videoStatus}</span>
        </span>
        <div className="video-preview-actions-right video-preview-actions-right-large">
          <Button variant="secondary" size="small" onClick={handleSyncToTimeline}>
            同步视频到时间轴
          </Button>
          <Button variant="secondary" size="small" onClick={handleExportVideo}>
            导出视频
          </Button>
          <Button variant="primary" size="small" onClick={handleSaveProject}>
            保存项目
          </Button>
        </div>
      </div>

      <div className="video-preview-container">
        <div className="main-video-player">
          <div className="video-middle-layout">
            <div className="video-center-panel">
              <div className="video-player-wrapper">
                <video
                  ref={videoRef}
                  className="video-element"
                  poster="https://via.placeholder.com/1280x720/1a1a2e/ffffff?text=Video+Preview"
                  onClick={togglePlay}
                  controls
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
              </div>
            </div>
          </div>

          <div className="timeline-section">
            <div className="timeline-header">
              <div className="timeline-header-label"></div>
              <div className="timeline-header-ruler" ref={timeRulerRef}></div>
            </div>
            <div className="tracks-wrapper">
              <div className="track-labels">
                <div className="track-label track-label-video">
                  <div className="track-label-text">
                    <span>视频</span>
                  </div>
                </div>
                <div className="track-label track-label-dubbing">
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
                  {currentTime > 0.01 || isDraggingPlayhead ? (
                    <div
                      className="timeline-playhead"
                      style={{ left: `${playheadLeft}px` }}
                      onMouseDown={handlePlayheadMouseDown}
                      onMouseMove={handlePlayheadMouseMove}
                      onMouseUp={handlePlayheadMouseUp}
                    />
                  ) : null}

                  <div className="tracks-area">
                <div className="track track-video-dubbing">
                  {[
                    {
                      width: 100,
                      label: '分镜1',
                      thumbnail: 'https://via.placeholder.com/100x68/4a6cf7/ffffff?text=1',
                      hasAudio: false,
                      dubbingText: '无配音'
                    },
                    {
                      width: 100,
                      label: '分镜2',
                      thumbnail: 'https://via.placeholder.com/100x68/5a7cff/ffffff?text=2',
                      hasAudio: true,
                      dubbingText: '配音1'
                    },
                    {
                      width: 100,
                      label: '分镜3',
                      thumbnail: 'https://via.placeholder.com/100x68/6a8cff/ffffff?text=3',
                      hasAudio: true,
                      dubbingText: '配音2'
                    },
                    {
                      width: 100,
                      label: '分镜4',
                      thumbnail: 'https://via.placeholder.com/100x68/7a9cff/ffffff?text=4',
                      hasAudio: false,
                      dubbingText: '无配音'
                    },
                    {
                      width: 100,
                      label: '分镜5',
                      thumbnail: 'https://via.placeholder.com/100x68/8aacff/ffffff?text=5',
                      hasAudio: true,
                      dubbingText: '配音3'
                    },
                    {
                      width: 100,
                      label: '分镜6',
                      thumbnail: 'https://via.placeholder.com/100x68/9abcff/ffffff?text=6',
                      hasAudio: false,
                      dubbingText: '无配音'
                    },
                    {
                      width: 100,
                      label: '分镜7',
                      thumbnail: 'https://via.placeholder.com/100x68/aaccff/ffffff?text=7',
                      hasAudio: true,
                      dubbingText: '配音4'
                    },
                    {
                      width: 100,
                      label: '分镜8',
                      thumbnail: 'https://via.placeholder.com/100x68/badcff/ffffff?text=8',
                      hasAudio: false,
                      dubbingText: '无配音'
                    }
                  ].map((clip, i) => (
                    <React.Fragment key={i}>
                      <div className="track-video-layer">
                        <div className="video-clip" style={{ width: clip.width + 'px' }}>
                          <img
                            src={clip.thumbnail}
                            alt={clip.label}
                            className="video-clip-thumbnail"
                          />
                          <div className="clip-handle clip-handle-left"></div>
                          <div className="clip-handle clip-handle-right"></div>
                        </div>
                      </div>
                      <div className="track-dubbing-layer">
                        <div
                          className={`dubbing-clip ${!clip.hasAudio ? 'no-audio' : ''}`}
                          style={{ width: clip.width + 'px' }}
                          onClick={() => handleUploadDubbing(i + 1)}
                        >
                          <span className="dubbing-clip-text">{clip.dubbingText}</span>
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
                
                <div className="track track-subtitle">
                  {[
                    { width: 100, text: '无字幕' },
                    { width: 80, text: '无字幕' },
                    { width: 120, text: '掌门...' },
                    { width: 80, text: '无字幕' },
                    { width: 100, text: '无字幕' },
                    { width: 120, text: '什么玩...' },
                    { width: 80, text: '无字幕' },
                    { width: 100, text: '掌门也...' }
                  ].map((clip, i) => (
                    <div 
                      key={i} 
                      className={`subtitle-clip ${clip.text === '无字幕' ? 'no-subtitle' : ''}`} 
                      onClick={() => handleEditSubtitle(i + 1)}
                    >
                      <span className="subtitle-clip-text">{clip.text}</span>
                    </div>
                  ))}
                </div>
                
                <div className="track track-music">
                  <div className="music-clip no-music" style={{ width: '100%' }} onClick={handleReplaceMusic}>
                    <span className="music-clip-text">
                      <span>🎵</span>
                      <span>无背景音乐</span>
                    </span>
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
