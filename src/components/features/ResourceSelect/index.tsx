import { ContentModal } from "@/components/common";
import AutoTabs from "@/components/common/AutoTabs";
import React, { useState } from "react";
import { HorizontalScroll } from "@components/features";

export interface ResourceSelectProps {
  visible: boolean;
  onCancel: () => void;
}
export const ResourceSelect: React.FC<ResourceSelectProps> = ({
  visible,
  onCancel,
}) => {
  const items = [
    { label: "本作品资产", value: 1 },
    { label: "恐怖游戏第一季", value: 2 },
    { label: "星骸拾荒者的救赎2", value: 3 },
    { label: "111", value: 4 },
    { label: "《修仙悟了》", value: 5 },
    { label: "111", value: 6 },
    { label: "星骸拾荒者的救赎", value: 7 },
    { label: "恐怖游戏第二季", value: 8 },
  ];

  const [selectIndex, setSelectIndex] = useState<number | null>(null);
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
                  onClick={() => setSelectIndex(index)}
                  className="h-13 text-xs text-white  rounded-md overflow-hidden p-2! box-border bg-[#0f1115] cursor-pointer hover:bg-[#282a2c]"
                  style={{
                    border:
                      index === selectIndex
                        ? `1px solid var(--primary-color)`
                        : "1px solid #ffffff33",
                  }}
                >
                  <span className="line-clamp-2">{item.name}</span>
                </div>
              );
            }}
          />
        </div>
        <div className="flex-1 w-full grow shrink gap-3 overflow-y-scroll flex justify-start items-start content-start flex-wrap">
          {[...new Array(10).fill(0)].map((_, i) => (
            <div className="flex flex-col border border-[#38447c] rounded-xl overflow-hidden">
              <img
                src={`https://picsum.photos/120/70?random=${i}`}
                className="w-50 h-30 object-cover"
                alt="picture"
              />
              <div className="text-xs text-white/50 p-2!">2026-02-05</div>
            </div>
          ))}
        </div>
      </div>
    </ContentModal>
  );
};
