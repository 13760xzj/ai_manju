import React from "react";
import { IoMdAdd } from "react-icons/io";
import { RiAiGenerate } from "react-icons/ri";
import { AtInputArea } from "./AtInputArea";
import { IoDocumentTextSharp } from "react-icons/io5";
import { RiRefreshLine } from "react-icons/ri";
import { PropsSelectVideo } from "./PropsSelectVideo";
export const FirstLastFrame: React.FC = () => {
  return (
    <div className="h-full overflow-hidden flex flex-col gap-4">
      <div className="bg-[#203429] p-1! rounded-sm flex items-center justify-between">
        <div className="flex items-center gap-2 text-white">
          <IoDocumentTextSharp />
          <span className="text-sm">@分镜脚本1：分镜1-1</span>
        </div>
        <div className="bg-[#32443a] text-sm px-2! py-1! rounded-sm flex items-center gap-1 cursor-pointer">
          <RiRefreshLine />
          生成提示词
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="h-30 flex-1 flex flex-col hover:opacity-80 items-center justify-center cursor-pointer border border-dashed rounded-md bg-white/10 border-white/50">
          <IoMdAdd style={{ fontSize: "24px" }} />
          <div className="text-sm mt-2!">首帧</div>
          <div className="text-xs mt-2! text-white/50">
            必填，10MB内的JPG/PNG图片
          </div>
        </div>
        <div className="h-30 flex flex-1 flex-col hover:opacity-80 items-center justify-center cursor-pointer border border-dashed rounded-md bg-white/10 border-white/50">
          <IoMdAdd style={{ fontSize: "24px" }} />
          <div className="text-sm mt-2!">未帧(可选)</div>
          <div className="text-xs mt-2! text-white/50">
            选填，10MB内的JPG/PNG图片
          </div>
        </div>
      </div>
      <div className="flex-1 border border-[#38447c] rounded-xl p-2!">
        <AtInputArea placeholder="描述两张图片的变化..." maxLength={3000} />
      </div>
      <div>
        <PropsSelectVideo isMulti={true} showRatio={false} />
      </div>
      <div className="h-14 rounded-xl w-full cursor-pointer hover:opacity-90 bg-[linear-gradient(to_right_bottom,#6deafb,#66aef7)] text-black flex items-center justify-center">
        <RiAiGenerate style={{ fontSize: 20 }} />
        <div className="mx-2!">生成九宫格</div>
        <span>消耗</span>
        <span className="mx-1! font-bold">12</span>
        <span>积分</span>
      </div>
    </div>
  );
};
