import type { Asset, Work } from "@/types";

export const mockAssets: Asset[] = [
  {
    id: "1",
    name: "古代寺庙大门",
    category: "scene",
    tags: ["古风", "建筑"],
    updateTime: "2024-03-01 14:30",
    preview:
      "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=ancient%20chinese%20temple%20gate%20ruined&image_size=square",
  },
  {
    id: "2",
    name: "暴风雨天空",
    category: "scene",
    tags: ["天气", "自然"],
    updateTime: "2024-03-01 13:20",
    preview:
      "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=dramatic%20stormy%20sky%20swirling%20clouds&image_size=square",
  },
  {
    id: "3",
    name: "古装侠客角色",
    category: "character",
    tags: ["角色", "武侠"],
    updateTime: "2024-03-01 12:15",
    preview:
      "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=ancient%20chinese%20warrior%20standing&image_size=square",
  },
  {
    id: "4",
    name: "神秘宝剑",
    category: "prop",
    tags: ["武器", "道具"],
    updateTime: "2024-03-01 11:00",
    preview:
      "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mystical%20sword%20glowing&image_size=square",
  },
];

export const mockWorks: Work[] = [
  {
    id: "1",
    name: "修仙短剧第一集",
    status: "completed",
    cover:
      "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=ancient%20chinese%20temple%20gate%20ruined&image_size=square",
    updateTime: "2024-03-01 18:00",
  },
  {
    id: "2",
    name: "武侠故事宣传片",
    status: "editing",
    cover:
      "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=dramatic%20stormy%20sky%20swirling%20clouds&image_size=square",
    updateTime: "2024-03-01 17:30",
  },
  {
    id: "3",
    name: "仙侠 MV 视频",
    status: "completed",
    cover:
      "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=bamboo%20forest%20misty&image_size=square",
    updateTime: "2024-02-28 20:15",
  },
  {
    id: "4",
    name: "古风剧情短片",
    status: "draft",
    cover:
      "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mystical%20sword%20glowing&image_size=square",
    updateTime: "2024-02-28 19:00",
  },
];

export const markdownContent = `
## 角色类型: 
主角
## 年龄: 
24岁
## 性别: 
男
## 种族: 
人类/数据生命体
## 职业身份: 
无业游民/恐怖乐园领主
## 建档理由: 
核心男主，从颓废宅男穿越为游戏BOSS，通过经营系统改变乐园生态
## 说话风格: 
前期慵懒随性，带有现代网络口癖；后期作为领主时音色低沉但语气温和
## 性格特点: 
随遇而安，内心善良，富有同理心，吐槽役

## 形态名称: 
林阿宅-现代居家
## 年代坐标: 
现代-当代中国
## 地域坐标: 
亚洲-中国-某城市-居民区
## 发型: 
黑色凌乱碎发，刘海遮住眉毛，发梢微翘
## 脸型: 
略显圆润的鹅蛋脸
## 眉毛: 
平眉，颜色较淡
## 眼睛: 
下垂眼，瞳色深褐，眼神涣散无神
## 鼻子: 
鼻头圆润
## 皮肤: 
长期不见光的苍白色
## 体态特征: 
七头身比例，身形单薄松垮。站姿含胸驼背，双臂自然下垂。
## 服饰配饰: 
穿着一套极简风格的居家服。上身是一件宽松的Oversize纯棉T恤，颜色为褪色的灰蓝色 (#778899)，领口松垮变形，胸前印着像素风格的白色游戏手柄图案。下身是深灰色 (#696969) 的针织居家短裤，裤脚卷边。脚踩一双磨损严重的白色塑料拖鞋 (#F5F5F5)。手腕上戴着一个黑色的智能手环。

## 形态名称: 
林阿宅-骨刺领主
## 年代坐标: 
未来-虚拟乐园
## 地域坐标: 
亚洲-中国-虚拟乐园-废弃医院
## 发型: 
无发，头部覆盖着角质层
## 脸型: 
面部轮廓硬朗，下颌骨宽大
## 眉毛: 
无眉，眉骨突出
## 眼睛: 
深陷的眼窝，瞳孔呈现发光的幽蓝色 (#00FFFF)
## 鼻子: 
鼻梁高耸，鼻翼两侧有骨质增生
## 皮肤: 
暗褐色 (#3E2723) 的粗糙皮肤，表面布满龟裂纹路
## 特殊标记: 
一道从左眉骨划到右下颌的深色疤痕
## 体态特征: 
身高超过200cm，倒三角魁梧身形。站姿挺拔，肌肉线条极度夸张。
## 服饰配饰: 
全身覆盖着生物外骨骼装甲。肩部、手肘、脊椎处生长出尖锐的象牙白色 (#FFFFF0) 骨刺，骨刺表面带有螺旋状的生长纹理，尖端呈现暗红色 (#8B0000) 的血渍质感。胸膛中央嵌着一颗六边形的能量核心，散发着高亮度的幽蓝色光芒 (#00FFFF)，核心周围连接着数根半透明的能量输送管。腰间围着一条由破损的黑色皮革 (#000000) 和生锈铁链组成的战裙，遮挡住下半身，战裙下摆呈不规则撕裂状。双脚异化为巨大的利爪，脚趾尖端为黑色角质。

## 形态名称: 
林阿宅-粉色女仆
## 年代坐标: 
未来-虚拟乐园
## 地域坐标: 
亚洲-中国-虚拟乐园-废弃医院
## 发型: 
无发，头顶强行佩戴着带有白色蕾丝边的粉色发箍
## 脸型: 
面部轮廓硬朗，下颌骨宽大
## 眉毛: 
无眉，眉骨突出
## 眼睛: 
深陷的眼窝，瞳孔呈现发光的幽蓝色 (#00FFFF)
## 鼻子: 
鼻梁高耸
## 皮肤: 
暗褐色 (#3E2723) 的粗糙皮肤
## 体态特征: 
身高超过200cm，魁梧身形被紧身衣物勒出肉感。站姿僵硬，双臂下垂。
## 服饰配饰: 
在骨刺领主的躯体上强行套着一套极度违和的粉色洛丽塔风格女仆装。裙子主色调为高饱和度的亮粉色 (#FF69B4)，面料为廉价的化纤绸缎。领口和袖口装饰着大量的白色蕾丝花边 (#FFFFFF)。胸前的白色围裙被巨大的胸肌和能量核心顶起，呈现紧绷欲裂的状态。背后的拉链处于崩开状态，露出一部分暗褐色的背部皮肤。裙摆极短，仅能勉强遮盖大腿根部，露出粗壮的腿部肌肉和膝盖处的骨质增生。整体视觉呈现出强烈的荒诞与反差感。
`;
