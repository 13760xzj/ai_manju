import React from "react";
import { IoMdAdd } from "react-icons/io";
import { RiAiGenerate } from "react-icons/ri";
export const GenerateNineGrid: React.FC = () => {
  return (
    <div className="h-full overflow-hidden flex flex-col gap-4">
      <div className="h-40 flex flex-col hover:opacity-80 items-center justify-center cursor-pointer border border-dashed rounded-md bg-white/10 border-white/50">
        <IoMdAdd style={{ fontSize: "24px" }} />
        <div className="text-xs mt-2!">导入参考图</div>
        <div className="text-xs mt-2! text-white/50">
          支持本地上传和资源库导入
        </div>
      </div>
      <div className="flex-1" />
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
