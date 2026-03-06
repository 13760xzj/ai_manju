import { ConfirmDialog } from "@/components/common";
import "./index.css";

export function VideoPreviewPage() {
  const toast = useToast();
  const [videoStatus] = useState("准备就绪");
  const timeRulerRef = useRef<HTMLDivElement>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const initTimeRuler = () => {
    const ruler = timeRulerRef.current;
    if (!ruler) return;

    const totalDuration = 150;
    const pixelsPerSecond = 20;

    for (let i = 0; i <= totalDuration; i++) {
      const tick = document.createElement("div");
      tick.className = "time-tick" + (i % 5 === 0 ? " major" : " minor");
      tick.style.left = i * pixelsPerSecond + "px";
      ruler.appendChild(tick);

      if (i % 5 === 0) {
        const marker = document.createElement("div");
        marker.className = "time-marker";
        marker.style.left = i * pixelsPerSecond + "px";
        const minutes = Math.floor(i / 60);
        const seconds = i % 60;
        marker.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}`;
        ruler.appendChild(marker);
      }
    }
  };

  useEffect(() => {
    initTimeRuler();
  }, []);

  const handleZoomIn = () => toast.info("放大时间轴，显示更精细的刻度");
  const handleZoomOut = () => toast.info("缩小时间轴，显示更宽的范围");
  const handleReGenerateVideo = () => {
    setShowConfirmDialog(true);
  };
  const confirmRegenerateVideo = () => {
    toast.info("正在重新生成视频...");
  };
  const handleExportVideo = () => toast.info("导出视频功能");
  const handleSaveProject = () => toast.success("项目已保存");
  const handleUploadDubbing = (index: number) =>
    toast.info(`为分镜 ${index} 上传/替换配音文件`);
  const handleEditSubtitle = (index: number) =>
    toast.info(`编辑字幕 ${index}，修改文字和显示时间`);
  const handleReplaceMusic = () => toast.info("替换背景音乐文件");

  return (
    <div className="settings-page">
      <div className="page-toolbar">
        <div className="toolbar-left">
          <div className="progress-info">
            视频信息：<span>{videoStatus}</span>
          </div>
        </div>
        <div className="toolbar-right">
          <button className="btn-small btn-secondary" onClick={handleZoomIn}>
            🔍 放大 +
          </button>
          <button className="btn-small btn-secondary" onClick={handleZoomOut}>
            🔍 缩小 -
          </button>
          <button
            className="btn-small btn-secondary"
            onClick={handleReGenerateVideo}
          >
            重新生成视频
          </button>
          <button
            className="btn-small btn-secondary"
            onClick={handleExportVideo}
          >
            导出视频
          </button>
          <button
            className="btn-small btn-primary-small"
            onClick={handleSaveProject}
          >
            保存项目
          </button>
        </div>
      </div>

      <div className="video-preview-container">
        <div className="main-video-player">
          <div className="video-player-wrapper">
            <div className="video-player-placeholder">
              <span>点击播放视频</span>
            </div>
          </div>

          <div className="timeline-section">
            <div className="time-ruler" id="time-ruler" ref={timeRulerRef}>
              <div className="playhead" style={{ left: "0px" }}></div>
            </div>

            <div className="tracks-wrapper">
              <div className="track-labels">
                <div className="track-label">
                  <div className="track-label-text">
                    <span className="track-label-icon">🎬</span>
                    <span>视频轨道</span>
                  </div>
                </div>
                <div className="track-label">
                  <div className="track-label-text">
                    <span className="track-label-icon">🎙️</span>
                    <span>配音轨道</span>
                  </div>
                </div>
                <div className="track-label">
                  <div className="track-label-text">
                    <span className="track-label-icon">📝</span>
                    <span>字幕轨道</span>
                  </div>
                </div>
                <div className="track-label">
                  <div className="track-label-text">
                    <span className="track-label-icon">🎵</span>
                    <span>音乐轨道</span>
                  </div>
                </div>
              </div>

              <div className="tracks-area">
                <div className="track track-video">
                  {[
                    { width: 200, label: "分镜 1" },
                    { width: 180, label: "分镜 2" },
                    { width: 220, label: "分镜 3" },
                    { width: 190, label: "分镜 4" },
                    { width: 210, label: "分镜 5" },
                    { width: 170, label: "分镜 6" },
                  ].map((clip, i) => (
                    <div
                      key={i}
                      className="video-clip"
                      style={{ width: clip.width + "px" }}
                    >
                      <div className="clip-handle clip-handle-left"></div>
                      <div className="video-clip-label">{clip.label}</div>
                      <div className="clip-handle clip-handle-right"></div>
                    </div>
                  ))}
                </div>

                <div className="track track-dubbing">
                  {[
                    { width: 200, hasAudio: false, text: "无配音" },
                    { width: 180, hasAudio: true, text: "dubbing_2.mp3" },
                    { width: 220, hasAudio: true, text: "dialogue_3.wav" },
                    { width: 190, hasAudio: false, text: "无配音" },
                    { width: 210, hasAudio: true, text: "voiceover_5.mp3" },
                    { width: 170, hasAudio: false, text: "无配音" },
                  ].map((clip, i) => (
                    <div
                      key={i}
                      className={`dubbing-clip ${
                        !clip.hasAudio ? "no-audio" : ""
                      }`}
                      style={{ width: clip.width + "px" }}
                      onClick={() => handleUploadDubbing(i + 1)}
                    >
                      <span className="dubbing-upload-icon">
                        {clip.hasAudio ? "✅" : "📤"}
                      </span>
                      <span className="dubbing-clip-text">{clip.text}</span>
                    </div>
                  ))}
                </div>

                <div className="track track-subtitle">
                  {[
                    { width: 200, text: "这是第一幕字幕..." },
                    { width: 180, text: "第二幕开始..." },
                    { width: 220, text: "主角登场，故事展开..." },
                    { width: 190, text: "冲突升级..." },
                    { width: 210, text: "高潮迭起，情感爆发..." },
                    { width: 170, text: "故事结束，谢幕..." },
                  ].map((clip, i) => (
                    <div
                      key={i}
                      className="subtitle-clip"
                      style={{ width: clip.width + "px" }}
                      onClick={() => handleEditSubtitle(i + 1)}
                    >
                      <div className="clip-handle clip-handle-left"></div>
                      <span className="subtitle-clip-text">{clip.text}</span>
                      <div className="clip-handle clip-handle-right"></div>
                    </div>
                  ))}
                </div>

                <div className="track track-music">
                  <div
                    className="music-clip"
                    style={{ width: "2000px" }}
                    onClick={handleReplaceMusic}
                  >
                    <div className="clip-handle clip-handle-left"></div>
                    <div className="music-waveform">
                      {[
                        30, 50, 70, 45, 65, 55, 80, 40, 60, 75, 50, 65, 45, 70,
                        55, 60, 40, 65, 50, 75,
                      ].map((h, i) => (
                        <div
                          key={i}
                          className="wave-bar"
                          style={{ height: h + "%" }}
                        ></div>
                      ))}
                    </div>
                    <span className="music-clip-text">
                      <span className="music-clip-icon">🎵</span>
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
