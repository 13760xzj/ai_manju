import React, { useState, useRef } from "react";
import "./cameraViewer.css";
import { AtUpload } from "@/components/common";

interface CameraViewerProps {
  radius?: number;
  image?: string;
  onChange?: (data: { x: number; y: number; scale: number }) => void;
}

// 经纬线网格组件 (保持不变)
function SphereGrid({
  radius,
  isDragging,
}: {
  radius: number;
  isDragging: boolean;
}) {
  const longitudes = [];
  const latitudes: React.ReactNode[] = [];

  for (let i = 0; i < 12; i++) {
    longitudes.push(
      <div
        key={"lon" + i}
        className={`long border border-(--text-color)/20 ${isDragging ? "opacity-100" : "opacity-70"}`}
        style={{
          width: radius * 2,
          height: radius * 2,
          transform: `rotateY(${i * 20}deg)`,
          marginTop: `-${radius}px` /* radius */,
          marginLeft: `-${radius}px`,
        }}
      />,
    );
  }

  const angles = [-60, -45, -30, -15, 0, 15, 30, 45, 60];
  angles.forEach((deg, i) => {
    const rad = (deg * Math.PI) / 180;
    const y = radius * Math.sin(rad);
    const r = radius * Math.cos(rad);
    latitudes.push(
      <div
        key={"lat" + i}
        className={`latitude border border-(--text-color)/20 ${isDragging ? "opacity-100" : "opacity-70"}`}
        style={{
          width: r * 2,
          height: r * 2,
          transform: `translate(-50%, -50%) translateY(${y}px) rotateX(90deg)`,
        }}
      />,
    );
  });

  return (
    <>
      {longitudes}
      {latitudes}
    </>
  );
}

export function CameraViewer({
  radius = 200,
  onChange,
  image,
}: CameraViewerProps) {
  const [yaw, setYaw] = useState(0);
  const [pitch, setPitch] = useState(0);
  // 焦距范围调整：0 (远景/小图) ~ 100 (近景/大图)
  const [focalLength, setFocalLength] = useState(5);

  const dragging = useRef(false);
  const [isDragging, setIsDragging] = useState(false);
  const last = useRef({ x: 0, y: 0 });

  const snap = (value: number, step: number) => {
    return Math.round(value / step) * step;
  };

  const onMouseDown = (e: React.MouseEvent) => {
    dragging.current = true;
    setIsDragging(true);
    last.current = { x: e.clientX, y: e.clientY };
  };

  const onMouseUp = () => {
    dragging.current = false;
    setIsDragging(false);

    const newYaw = snap(yaw, 45);
    const newPitch = snap(pitch, 30);
    // 吸附到最近刻度
    setYaw(newYaw);
    setPitch(newPitch);
    changeHandle(newYaw, newPitch, focalLength);
  };

  const YAW_MIN = 0;
  const YAW_MAX = 315;
  const PITCH_MIN = -60;
  const PITCH_MAX = 30;

  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - last.current.x;
    const dy = e.clientY - last.current.y;

    // 先计算新值
    let newYaw = yaw + dx * 0.5;
    let newPitch = pitch - dy * 0.5;

    // 限制在范围内
    newYaw = Math.max(YAW_MIN, Math.min(YAW_MAX, newYaw));
    // newYaw = ((newYaw - YAW_MIN) % (YAW_MAX - YAW_MIN)) + YAW_MIN;
    newPitch = Math.max(PITCH_MIN, Math.min(PITCH_MAX, newPitch));

    setYaw(newYaw);
    setPitch(newPitch);

    last.current = { x: e.clientX, y: e.clientY };
  };

  const changeHandle = (y: number, p: number, f: number) => {
    if (onChange) {
      onChange({
        x: y,
        y: p + 30,
        scale: f / 5, // 0 1 2
      });
    }
  };

  return (
    <div className="w-full h-full flex">
      <div className="controls pt-5!">
        <div>
          <label>水平旋转: {yaw.toFixed(0)}°</label>
          <input
            type="range"
            min={0}
            step={45}
            max={YAW_MAX}
            value={yaw}
            onChange={(e) => {
              const value = Number(e.target.value);
              setYaw(value);
              changeHandle(value, pitch, focalLength);
            }}
            onMouseDown={(e) => e.stopPropagation()}
          />
          <div className="flex items-center justify-between mt-0.5!">
            <span className="text-[10px] text-(--text-color)/50">0度</span>
            <span className="text-[10px] text-(--text-color)/50">315度</span>
          </div>
        </div>

        <div>
          <label>垂直角度: {(pitch + 30).toFixed(0)}°</label>
          <input
            type="range"
            min={PITCH_MIN}
            max={PITCH_MAX}
            value={pitch}
            step={30}
            onChange={(e) => {
              const value = Number(e.target.value);
              setPitch(value);
              changeHandle(yaw, value, focalLength);
            }}
            onMouseDown={(e) => e.stopPropagation()}
          />
          <div className="flex items-center justify-between mt-0.5!">
            <span className="text-[10px] text-(--text-color)/50">-30度</span>
            <span className="text-[10px] text-(--text-color)/50">60度</span>
          </div>
        </div>

        <div>
          <label>焦距: {focalLength}</label>
          <input
            type="range"
            min={0}
            step={5}
            max={10}
            value={focalLength}
            onChange={(e) => {
              const value = Number(e.target.value);
              setFocalLength(value);
              changeHandle(yaw, pitch, value);
            }}
            onMouseDown={(e) => e.stopPropagation()}
          />
          <div className="flex items-center justify-between mt-0.5!">
            <span className="text-[10px] text-(--text-color)/50">0(远景)</span>
            <span className="text-[10px] text-(--text-color)/50">5(中景)</span>
            <span className="text-[10px] text-(--text-color)/50">10(近景)</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1 h-full">
        <div className="flex-1">
          <div
            className="viewer relative"
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onMouseMove={onMouseMove}
          >
            {/* 3D 场景层：只包含球体和相机 */}
            <div
              className="scene absolute"
              style={{
                zIndex: 1,
              }}
            >
              <div
                className={`sphere-grid-container ${isDragging ? "dragging" : ""}`}
                style={{
                  transform: `rotateY(${yaw}deg) rotateX(${pitch}deg)`,
                }}
              >
                <SphereGrid radius={radius} isDragging={isDragging} />
              </div>

              {/* 相机模型 (在 3D 空间中运动) */}
            </div>
            <div
              className="absolute"
              style={{
                zIndex: yaw > 150 ? 10 : 1,
              }}
            >
              <TargetImage
                focalLength={focalLength}
                yaw={yaw}
                pitch={pitch}
                radius={radius}
                image={image || ""}
              />
            </div>
            <div
              style={{
                zIndex: yaw > 150 ? 1 : 10,
              }}
            >
              <CameraModel
                yaw={yaw}
                pitch={pitch}
                baseRadius={radius}
                isDragging={isDragging}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center bg-(--bg-color) justify-center gap-4 py-10!">
          <AtUpload acceptType="picture">
            <div className="text-sm rounded-full text-(--text-color) px-8! py-2! border border-(--text-color)/20 bg-(--text-color)/10 cursor-pointer opacity-70 hover:opacity-90">
              上传图片
            </div>
          </AtUpload>
          <div className="text-sm rounded-full text-(--text-white) px-8! py-2! border border-(--text-color)/20 bg-(--primary-color) cursor-pointer opacity-70 hover:opacity-90 ">
            开始生图
          </div>
        </div>
      </div>
    </div>
  );
}

// --- 相机组件 (逻辑不变，确保指向屏幕中心 0,0,0) ---
function CameraModel({
  yaw,
  pitch,
  baseRadius,
  isDragging,
}: {
  yaw: number;
  pitch: number;
  baseRadius: number;
  isDragging: boolean;
}) {
  const orbitRadius = baseRadius + 20;

  const yawRad = -(yaw * Math.PI) / 180;
  const pitchRad = -(pitch * Math.PI) / 180;

  // 计算相机在球面上的坐标
  const x = orbitRadius * Math.cos(pitchRad) * Math.sin(yawRad);
  const y = -orbitRadius * Math.sin(pitchRad);
  const z = orbitRadius * Math.cos(pitchRad) * Math.cos(yawRad);
  const width = baseRadius / 5;
  const height = baseRadius / 5;
  const redWidth = Math.min(width, height);
  const lightWidth = Math.max(width, height) * 2.5;

  return (
    <div
      className={`camera-wrapper ${isDragging ? "dragging" : ""}`}
      style={{
        transform: `translate3d(${x}px, ${y}px, ${z}px)`,
      }}
    >
      {/* 反向旋转，让相机始终看向原点 (即屏幕中心的图片) */}
      <div
        className={`camera ${isDragging ? "dragging" : ""}`}
        style={{
          transform: `rotateY(${-yaw}deg) rotateX(${-pitch}deg)`,
          width: `${width}px`,
          height: `${height}px`,
          marginLeft: `-${width / 2}px`,
          marginTop: `-${height / 2}px`,
        }}
      >
        <div
          className="cam-front bg-gray-700"
          style={{
            width: `${width}px`,
            height: `${height}px`,
            transform: `translateZ(${width / 2}px)`,
          }}
        />
        <div
          className="cam-back bg-gray-700"
          style={{
            width: `${width}px`,
            height: `${height}px`,
            transform: `translateZ(-${width / 2}px) rotateY(180deg)`,
          }}
        />
        <div
          className="cam-top bg-gray-700"
          style={{
            width: `${width}px`,
            height: `${height + (width - height)}px`,
            transform: `rotateX(90deg) translateZ(${(height + (width - height)) / 2}px)`,
          }}
        />
        <div
          className="cam-bottom bg-gray-700"
          style={{
            width: `${width}px`,
            height: `${height + (width - height)}px`,
            transform: `rotateX(-90deg) translateZ(${(height - (width - height)) / 2}px)`,
          }}
        />
        <div
          className="cam-left bg-gray-700"
          style={{
            width: `${width}px`,
            height: `${height}px`,
            transform: `rotateY(-90deg) translateZ(${width / 2}px)`,
          }}
        />
        <div
          className="cam-right bg-gray-700"
          style={{
            width: `${width}px`,
            height: `${height}px`,
            transform: `rotateY(90deg) translateZ(${width / 2}px)`,
          }}
        />
        <div
          className="lens-ring outer"
          style={{
            width: `${redWidth * 0.8}px`,
            height: `${redWidth * 0.8}px`,
            borderRadius: "50%",
            border: "2px solid var(--primary-color)",
            position: "absolute",
            top: `50%`,
            left: `50%`,
            transform: `translate(-50%, -50%) translateZ(-${width / 2}px)`,
          }}
        />
        <div
          className="lens-ring inner"
          style={{
            width: `${redWidth * 0.45}px`,
            height: `${redWidth * 0.45}px`,
            borderRadius: "50%",
            border: "2px solid var(--primary-color)",
            position: "absolute",
            top: `50%`,
            left: `50%`,
            transform: `translate(-50%, -50%) translateZ(-${width / 2}px)`,
          }}
        />

        {/* 小红点 */}
        <div
          className="red-dot"
          style={{
            width: `${redWidth * 0.2}px`,
            height: `${redWidth * 0.2}px`,
            backgroundColor: "red",
            borderRadius: "50%",
            position: "absolute",
            top: `50%`,
            left: `50%`,
            transform: `translate(-50%, -50%) translateZ(-${width / 2}px)`,
          }}
        />
        <CameraFrustum
          style={{
            transform: `translate(-${(lightWidth - width) / 2}px, ${height / 2}px) rotateX(-90deg)`,
            width: `${lightWidth}px`,
            height: `${baseRadius / 1.2}px`,
          }}
        />
      </div>
    </div>
  );
}

function CameraFrustum({ style }: { style?: React.CSSProperties }) {
  return <div className="frustum" style={style} />;
}

// --- 目标图片组件 (固定在屏幕中央，不随球体旋转) ---
function TargetImage({
  focalLength,
  radius,
  yaw,
  image,
}: {
  focalLength: number;
  yaw: number;
  pitch: number;
  radius: number;
  image: string;
}) {
  const scale = 0.6 + (focalLength * 5) / 100;

  return (
    <div
      className="target-container"
      style={{
        width: `${radius * 0.6}px`,
        height: `${radius * 0.6}px`,
      }}
    >
      <img
        className="target"
        src={image || "https://picsum.photos/150?random=1"}
        alt="Target View"
        style={{
          transform: `scale(${scale})`,
          width: `${radius * 0.6}px`,
          height: `${radius * 0.6}px`,
          opacity:
            (yaw >= 0 && yaw <= 60) || (yaw >= 285 && yaw <= 315) ? 0.9 : 0.6,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
