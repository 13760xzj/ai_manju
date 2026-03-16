import React from "react";
import { PropsSelect } from "./PropsSelect";
import { IoMdAdd } from "react-icons/io";
import { RiSendPlane2Fill } from "react-icons/ri";
import { AtInputArea } from "./AtInputArea";

export const GenerateTxtToPic: React.FC = () => {
  const [content, setContent] = React.useState("");
  return (
    <div className="h-full overflow-hidden flex flex-col gap-4">
      <div className="flex-1 flex items-center justify-center">
        <span className="text-(--text-color)/50">添加图片，并输入修改要求</span>
      </div>
      <div>
        <PropsSelect position="top" />
      </div>
      <div className="h-60 border border-(--border-color) rounded-xl p-4! flex flex-col gap-2">
        <div className="w-12 h-12 flex flex-col hover:opacity-80 items-center justify-center cursor-pointer border border-dashed rounded-md bg-(--text-color)/10 border-(--text-color)/50">
          <IoMdAdd style={{ fontSize: "24px" }} />
        </div>
        <div className="flex-1 overflow-hidden">
          <AtInputArea
            showBtns={false}
            showCounter={false}
            defaultValue={content}
            openAt={false}
            onChange={(e) => {
              setContent(e);
            }}
            maxLength={3000}
            placeholder="描述要生成的画面..."
          />
        </div>
        <div className="flex items-center justify-end">
          <div className="mr-2!">
            <span className="text-sm text-(--text-color)/70">消耗</span>
            <span className="text-sm text-(--text-color) font-bold mx-1!">
              10
            </span>
            <span className="text-sm text-(--text-color)/70">积分</span>
          </div>
          <div
            style={{ opacity: content.length === 0 ? 0.5 : 1 }}
            className="h-10 rounded-full w-14 cursor-pointer hover:opacity-90 bg-[linear-gradient(to_right_bottom,#6deafb,#66aef7)] text-(--text-color) flex items-center justify-center"
          >
            <div className="mx-2! text-md">
              <RiSendPlane2Fill
                style={{ fontSize: "20px", transform: "rotate(-90deg)" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
