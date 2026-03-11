import React, { useState } from "react";
import { IoDocumentTextSharp } from "react-icons/io5";
import { RiRefreshLine } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import { RiAiGenerate } from "react-icons/ri";
import { PropsSelect } from "./PropsSelect";
import { AtInputArea } from "./AtInputArea";

export const GenerateThreeView: React.FC = () => {
  const [content, setContent] = useState("");

  return (
    <div className="h-full overflow-hidden flex flex-col gap-4">
      <div className="bg-[#203429] p-1! rounded-sm flex items-center justify-between">
        <div className="flex items-center gap-2 text-white">
          <IoDocumentTextSharp />
          <span className="text-sm">三视图生成</span>
        </div>
        <div className="bg-[#32443a] text-sm px-2! py-1! rounded-sm flex items-center gap-1 cursor-pointer">
          <RiRefreshLine />
          生成提示词
        </div>
      </div>

      <div className="flex-1 p-4! rounded-xl border border-[#38447c] flex flex-col gap-4!">
        <div className="text-sm text-white/80">上传角色正面图，自动生成三视图</div>
        <div className="flex items-center gap-4">
          <div className="flex-1 flex flex-col items-center gap-2">
            <div className="w-full h-32 flex flex-col hover:opacity-80 items-center justify-center cursor-pointer border border-dashed rounded-md bg-white/10 border-white/50">
              <IoMdAdd style={{ fontSize: "24px" }} />
              <div className="text-xs mt-2!">上传正面图</div>
            </div>
            <span className="text-xs text-white/50">正面</span>
          </div>
          <div className="flex-1 flex flex-col items-center gap-2">
            <div className="w-full h-32 flex items-center justify-center rounded-md bg-white/5 border border-white/20">
              <span className="text-xs text-white/30">自动生成</span>
            </div>
            <span className="text-xs text-white/50">侧面</span>
          </div>
          <div className="flex-1 flex flex-col items-center gap-2">
            <div className="w-full h-32 flex items-center justify-center rounded-md bg-white/5 border border-white/20">
              <span className="text-xs text-white/30">自动生成</span>
            </div>
            <span className="text-xs text-white/50">背面</span>
          </div>
        </div>
        <div className="flex-1">
          <AtInputArea
            options={[
              {
                img: "https://picsum.photos/120/70?random=1",
                name: "李元宝-布衣少年",
              },
              {
                img: "https://picsum.photos/120/70?random=2",
                name: "苏清瑶-落难少女",
              },
            ]}
            defaultValue={content}
            onChange={(e) => {
              setContent(e);
            }}
            maxLength={3000}
            placeholder="描述角色特征，帮助AI生成更准确的三视图..."
            renderOptionItem={(item) => (
              <div className="text-ellipsis line-clamp-1">{item.name}</div>
            )}
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <PropsSelect />
      </div>

      <div className="h-14 rounded-xl w-full cursor-pointer hover:opacity-90 bg-[linear-gradient(to_right_bottom,#6deafb,#66aef7)] text-black flex items-center justify-center">
        <RiAiGenerate style={{ fontSize: 20 }} />
        <div className="mx-2!">生成三视图</div>
        <span>消耗</span>
        <span className="mx-1! font-bold">15</span>
        <span>积分</span>
      </div>
    </div>
  );
};
