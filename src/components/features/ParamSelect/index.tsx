import type { ParamType } from "@/constant";
import React from "react";
import AssetsParam from "./AssetsParam";
import ScriptParam from "./ScriptParam";
import VideoParam from "./VideoParam";

export interface ParamSelectProps {
  type: ParamType;
  onCancel?: () => void;
}
const ParamSelect: React.FC<ParamSelectProps> = ({ type, onCancel }) => {
  const assetParam = <AssetsParam />;
  const scriptParam = <ScriptParam />;
  const videoParam = <VideoParam />;
  const params =
    type === "assets"
      ? assetParam
      : type === "script"
        ? scriptParam
        : videoParam;
  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4!">
        <div>{params}</div>
      </div>
      <div className="h-15 flex items-center justify-end gap-2 px-4!">
        <div
          onClick={onCancel}
          className="px-10! py-2! cursor-pointer flex items-center gap-1 border border-(--text-color)/20 rounded-md hover:bg-(--text-color)/10"
        >
          <div className="text-sm text-(--text-color)/60">取消</div>
        </div>
        <div
          className={`px-10! py-2! cursor-pointer opacity-80 hover:opacity-100 flex items-center gap-1 border  border-white/20 bg-[linear-gradient(to_right_bottom,var(--primary-color),var(--primary-color-dark))] rounded-md`}
        >
          <div className="text-sm text-(--text-white)">确定</div>
        </div>
      </div>
    </div>
  );
};

export { ParamSelect };
