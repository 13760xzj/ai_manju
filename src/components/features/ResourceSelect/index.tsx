import { AtUpload, ContentModal } from "@/components/common";
import AutoTabs from "@/components/common/AutoTabs";
import React, { useState } from "react";
import { HorizontalScroll } from "@components/features";
import type { ResourceBase } from "@/types";
import { MdOutlineFileUpload } from "react-icons/md";
import PictureRes from "./PictureRes";
import DocumentRes from "./DocumentRes";

export interface ResourceSelectProps {
  visible: boolean;
  onCancel: () => void;
  multiple?: boolean;
  onConfirm?: (data: ResourceBase[]) => void;
  isPicture?: boolean; // 图片资源|文档资源
}
export const ResourceSelect: React.FC<ResourceSelectProps> = ({
  visible,
  onCancel,
  multiple = false,
  onConfirm,
  isPicture = true,
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
      image: "https://www.w3schools.com/html/mov_bbb.mp4",
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
            data={new Array(50).fill(0).map((_, i) => ({
              id: i,
              name: `食神宗山门-林小当苏醒与魔云宗逼迫_副本`,
            }))}
            childWidth={120}
            renderItem={(item, index) => {
              return (
                <div
                  onClick={() => setSelectType(index)}
                  className="h-13 flex items-center justify-center text-xs rounded-md overflow-hidden p-2! box-border bg-(--text-color)/10 cursor-pointer hover:bg-(--hover-bg-color)"
                  style={{
                    border:
                      index === selectType
                        ? `1px solid var(--primary-color)`
                        : "1px solid #ffffff33",
                  }}
                >
                  <span
                    className={`${index === selectType ? "text-(--text-color)" : "text-(--text-color)/50"} line-clamp-2`}
                  >
                    {item.name}
                  </span>
                </div>
              );
            }}
          />
        </div>
        <div className="flex-1 w-full grow shrink gap-4 overflow-y-scroll flex justify-start items-start content-start flex-wrap">
          {resources.map((item) =>
            isPicture ? (
              <PictureRes
                item={item}
                onSelect={(id: string | number) => setSelect(id)}
                active={selectResult.includes(item.id)}
              />
            ) : (
              <DocumentRes
                item={item}
                onSelect={(id: string | number) => setSelect(id)}
                active={selectResult.includes(item.id)}
              />
            ),
          )}
        </div>
        <div className="h-15 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AtUpload
              acceptType={isPicture ? "picture" : "doc"}
              action="//jsonplaceholder.typicode.com/posts/"
            >
              <div className="px-3! py-1! cursor-pointer flex items-center gap-1 border border-(--text-color)/20 rounded-md hover:bg-(--primary-color)/10">
                <MdOutlineFileUpload style={{ color: "#ffffff66" }} />
                <div className="text-sm text-(--text-color)/70">
                  选择本地文件
                </div>
              </div>
            </AtUpload>
            {/* <div className="px-3! py-1! cursor-pointer flex items-center gap-1 border border-(--text-color)/20 rounded-md hover:bg-(--primary-color)/10">
              <MdDriveFolderUpload style={{ color: "#ffffff66" }} />
              <div className="text-sm text-white/50">导入资产库</div>
            </div> */}
          </div>
          <div className="flex items-center gap-2">
            <div
              onClick={onCancel}
              className="px-10! py-2! cursor-pointer flex items-center gap-1 border border-(--text-color)/20 rounded-md hover:bg-(--primary-color)/10"
            >
              <div className="text-sm text-(--text-color)">取消</div>
            </div>
            <div
              onClick={onConfirmHandler}
              className={`px-10! py-2! ${selectResult.length === 0 ? "cursor-not-allowed opacity-60" : "cursor-pointer opacity-80 hover:opacity-100"} flex items-center gap-1 border  border-(--text-color)/20 bg-[linear-gradient(to_right_bottom,var(--primary-color),var(--primary-color-dark))] rounded-md`}
            >
              <div className="text-sm text-(--text-white)">确定</div>
            </div>
          </div>
        </div>
      </div>
    </ContentModal>
  );
};
