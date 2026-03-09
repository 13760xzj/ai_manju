import React, { useState } from "react";
import { IoDocumentTextSharp } from "react-icons/io5";
import { RiRefreshLine } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import { FiCopy } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RiAiGenerate } from "react-icons/ri";
import { PropsSelect } from "./PropsSelect";
import AtInput from "./AtInput";

export const GeneratePicToPic: React.FC = () => {
  const [content, setContent] = useState("");
  return (
    <div className="h-full overflow-hidden flex flex-col gap-4">
      <div className="bg-[#203429] p-1! rounded-sm flex items-center justify-between">
        <div className="flex items-center gap-2 text-white">
          <IoDocumentTextSharp />
          <span className="text-sm">@场景1：食神宗门</span>
        </div>
        <div className="bg-[#32443a] text-sm px-2! py-1! rounded-sm flex items-center gap-1 cursor-pointer">
          <RiRefreshLine />
          生成提示词
        </div>
      </div>
      <div className="flex-1 p-4! rounded-xl border border-[#38447c] flex flex-col gap-4!">
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="flex-1 flex flex-col hover:opacity-80 items-center justify-center cursor-pointer border border-dashed rounded-md bg-white/10 border-white/50 h-20"
            >
              <IoMdAdd style={{ fontSize: "24px" }} />
              <div className="text-xs mt-2!">导入参考图</div>
            </div>
          ))}
        </div>
        <div className="flex-1">
          <AtInput
            options={[
              {
                img: "https://picsum.photos/120/70?random=1",
                name: "李元宝-布衣少年-三视图",
              },
              {
                img: "https://picsum.photos/120/70?random=2",
                name: "食神宗山门-林小当苏醒与魔云宗逼迫-正面视角",
              },
              {
                img: "https://picsum.photos/120/70?random=3",
                name: "苏清瑶-落难少女-三视图",
              },
            ]}
            defaultValue="场景是角色@[李元宝-布衣少年-三视图]在卧室里面看电视。"
            onChange={(e) => {
              setContent(e);
            }}
            maxLength={100}
            placeholder="描述要生成的画面..."
            renderOptionItem={(item) => (
              <div className="text-ellipsis line-clamp-1">{item.name}</div>
            )}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white/10 hover:opacity-80 cursor-pointer rounded-md flex items-center justify-center border border-white/20">
              <FiCopy style={{ fontSize: "16px" }} />
            </div>
            <div className="w-6 h-6 bg-white/10 hover:opacity-80 cursor-pointer rounded-md flex items-center justify-center border border-white/20">
              <RiDeleteBin6Line style={{ fontSize: "16px" }} />
            </div>
          </div>
          <div className="text-white/70 text-xs">{content.length}/3000</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <PropsSelect />
      </div>
      <div className="h-14 rounded-xl w-full cursor-pointer hover:opacity-90 bg-[linear-gradient(to_right_bottom,#6deafb,#66aef7)] text-black flex items-center justify-center">
        <RiAiGenerate style={{ fontSize: 20 }} />
        <div className="mx-2!">开始生图</div>
        <span>消耗</span>
        <span className="mx-1! font-bold">12</span>
        <span>积分</span>
      </div>
    </div>
  );
};
