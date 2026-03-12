import { AtUpload, ContentModal, ImagePreview } from "@/components/common";
import AutoTabs from "@/components/common/AutoTabs";
import React, { useState } from "react";
import { HorizontalScroll } from "@components/features";
import type { ResourceBase } from "@/types";
import { ImCheckboxChecked } from "react-icons/im";
import { AiOutlineArrowsAlt } from "react-icons/ai";
import { MdOutlineFileUpload } from "react-icons/md";

export interface ResourceSelectProps {
  visible: boolean;
  onCancel: () => void;
  multiple?: boolean;
  onConfirm?: (data: ResourceBase[]) => void;
}
export const ResourceSelect: React.FC<ResourceSelectProps> = ({
  visible,
  onCancel,
  multiple = false,
  onConfirm,
}) => {
  const items = [
    { label: "素材库", value: 0 },
    { label: "本作品资产", value: 1 },
    { label: "恐怖游戏第一季", value: 2 },
    { label: "星骸拾荒者的救赎2", value: 3 },
    { label: "111", value: 4 },
    { label: "《修仙悟了》", value: 5 },
    { label: "111", value: 6 },
    { label: "星骸拾荒者的救赎", value: 7 },
    { label: "恐怖游戏第二季", value: 8 },
  ];

  const [selectType, setSelectType] = useState<number | null>(null);
  const [selectResult, setSelectResult] = useState<Array<string | number>>([]);

  const [resources, setResources] = useState<Array<ResourceBase>>([
    {
      image: "https://picsum.photos/1270/720?random=1",
      time: "2026-01-01 00:00:00",
      id: 1,
    },
    {
      image: "https://picsum.photos/1270/720?random=2",
      time: "2026-01-01 00:00:00",
      id: 2,
    },
    {
      image: "https://picsum.photos/1270/720?random=3",
      time: "2026-01-01 00:00:00",
      id: 3,
    },
  ]);

  const setSelect = (id: number | string) => {
    if (!multiple) {
      setSelectResult([id]);
      return;
    }
    const arr = [...selectResult];
    if (arr.includes(id)) {
      const i = arr.findIndex((item) => item === id);
      arr.splice(i, 1);
    } else {
      arr.push(id);
    }
    setSelectResult(arr);
  };

  const onConfirmHandler = () => {
    if (selectResult.length === 0) return;
    const arr: ResourceBase[] = [];
    selectResult.forEach((id) => {
      const item = resources.find((item) => item.id === id);
      if (item) {
        arr.push(item);
      }
    });
    console.log(arr);
    if (onConfirm) onConfirm(arr);
  };

  return (
    <ContentModal
      visible={visible}
      isDark={true}
      title="选择场景"
      width="90%"
      height="90vh"
      onCancel={onCancel}
      headerCenter={<AutoTabs items={items} />}
    >
      <div className="p-4! h-full flex flex-col gap-3">
        <div>
          <HorizontalScroll
            gap={8}
            buttonPosition="split"
            markColor="#0f1115"
            data={new Array(50).fill(0).map((_, i) => ({
              id: i,
              name: `食神宗山门-林小当苏醒与魔云宗逼迫_副本`,
            }))}
            childWidth={120}
            renderItem={(item, index) => {
              return (
                <div
                  onClick={() => setSelectType(index)}
                  className="h-13 flex items-center justify-center text-xs rounded-md overflow-hidden p-2! box-border bg-[#0f1115] cursor-pointer hover:bg-[#282a2c]"
                  style={{
                    border:
                      index === selectType
                        ? `1px solid var(--primary-color)`
                        : "1px solid #ffffff33",
                  }}
                >
                  <span
                    className={`${index === selectType ? "text-white" : "text-white/50"} line-clamp-2`}
                  >
                    {item.name}
                  </span>
                </div>
              );
            }}
          />
        </div>
        <div className="flex-1 w-full grow shrink gap-3 overflow-y-scroll flex justify-start items-start content-start flex-wrap">
          {resources.map((item, i) => (
            <div
              key={i}
              onClick={() => setSelect(item.id)}
              className={`flex flex-col border cursor-pointer relative rounded-xl overflow-hidden ${selectResult.includes(item.id) ? "border-(--primary-color)" : "border-[#38447c]"}`}
            >
              <img
                src={item.image}
                className="w-50 h-30 object-cover"
                alt="picture"
              />
              <div className="text-xs text-white/50 px-2! py-3!">
                {item.time}
              </div>
              <div className="absolute right-2 top-2 z-2 gap-1 flex items-center justify-end">
                <ImagePreview images={[item.image]}>
                  <div className="w-4 h-4 bg-black/60 hover:opacity-80 cursor-pointer rounded-sm flex items-center justify-center border border-white/30">
                    <AiOutlineArrowsAlt
                      style={{ color: "#fff" }}
                      className="w-full h-full"
                    />
                  </div>
                </ImagePreview>
                <div className=" w-4 h-4 bg-black rounded-sm overflow-hidden">
                  {selectResult.includes(item.id) && (
                    <ImCheckboxChecked
                      style={{ color: "#84de7b" }}
                      className="w-full h-full"
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="h-15 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AtUpload action="//jsonplaceholder.typicode.com/posts/">
              <div className="px-3! py-1! cursor-pointer flex items-center gap-1 border border-white/20 rounded-md hover:bg-white/10">
                <MdOutlineFileUpload style={{ color: "#ffffff66" }} />
                <div className="text-sm text-white/50">选择本地文件</div>
              </div>
            </AtUpload>
            {/* <div className="px-3! py-1! cursor-pointer flex items-center gap-1 border border-white/20 rounded-md hover:bg-white/10">
              <MdDriveFolderUpload style={{ color: "#ffffff66" }} />
              <div className="text-sm text-white/50">导入资产库</div>
            </div> */}
          </div>
          <div className="flex items-center gap-2">
            <div
              onClick={onCancel}
              className="px-10! py-1! cursor-pointer flex items-center gap-1 border border-white/20 rounded-md hover:bg-white/10"
            >
              <div className="text-sm text-white">取消</div>
            </div>
            <div
              onClick={onConfirmHandler}
              className={`px-10! py-1! ${selectResult.length === 0 ? "cursor-not-allowed opacity-60" : "cursor-pointer opacity-80 hover:opacity-100"} flex items-center gap-1 border  border-white/20 bg-[linear-gradient(to_right,#7660f6,#5968f0)] rounded-md`}
            >
              <div className="text-sm text-black">确定</div>
            </div>
          </div>
        </div>
      </div>
    </ContentModal>
  );
};
