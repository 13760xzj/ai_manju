# AI 满剧创作平台 - AI 模型设计（Demo 版）

面向先出 Demo、暂不落库的场景，定义「各环节用哪些 AI 能力」与「输入/输出约定」，并补充 Demo 必要的“镜头规划与资产一致性”约束，便于前后端对齐与后续接入真实模型。

---

## 一、Demo 目标与范围（以“文本驱动闭环”为先）

- **核心目标（最小闭环）**：用户输入一段故事文本，点击**保存**后点击**下一步**，系统完成：
  - **解析文本** → 结构化输出：**场景 / 角色 / 道具清单** + **分镜脚本（镜头列表）**
  - **批量文生图** → 生成场景/角色/道具图
  - **分镜图**（可复用文生图能力）→ 每个镜头生成 1 张分镜图
  - **图生视频** → 每个镜头生成 1 段短视频
- **范围**：先不做数据库、用户体系、任务队列、配音/音乐、字幕、对口型、图生图修正等；数据先放前端（Redux + localStorage）；AI 能力统一走 `aiService`，Demo 可用 Mock 或第三方 API 占位。
- **一致性目标（Demo 级别）**：同一项目内的**角色/场景/道具不随意变化**；同一风格（`styleId`）贯穿整条链路；每个镜头引用明确的场景与角色。（更完整策略见 `docs/Demo具体设计-漫剧镜头规划与一致性.md`）

---

## 二、创作流程与 AI 能力映射

| 创作步骤 | 页面/模块 | 需要的 AI 能力 | 说明 |
|----------|-----------|----------------|------|
| 全局设定 | 全局设定页 | 无（仅选风格 ID） | 风格可选：从「风格列表」选，Demo 可写死几条 |
| 文本输入/故事文本 | 故事情节页（或新增“文本输入”区） | **文本解析（Text-to-Structure）** | 点击保存仅存前端；点击下一步触发解析，产出“清单+分镜脚本” |
| 场景/角色/道具 | 场景角色道具页 | **文生图** | 生成场景图、角色图、道具图（先不做图生图优化） |
| 分镜脚本 | 分镜脚本页 | **分镜图生成**（单张） | Demo 优先：每镜头 1 张分镜图（九宫格可后置） |
| 分镜视频 | 分镜视频页 | **图生视频** | 分镜图 → 短视频片段 |
| 视频预览 | 视频预览页 | （可选）前端串行播放/拼接 | Demo 可只做“镜头列表播放”，不做后端合成 |

---

## 三、各 AI 能力输入/输出设计

以下按「能力」划分，每种能力对应一个或一组接口形态，Demo 可用 Mock 实现同形态返回。

### 3.1 文本解析（Text-to-Structure）

- **用途**：把用户输入的故事文本解析成“可驱动生成”的结构化数据：场景/角色/道具清单 + 分镜脚本镜头列表。
- **输入**：
  - `text: string` — 用户输入的原始文本
  - `styleId?: string` — 风格 ID（用于约束画风与描述措辞）
  - `lang?: 'zh' | 'en'` — 可选，默认 `'zh'`
- **输出（推荐 JSON 形态，Demo 固定字段）**：
  - `projectTitle?: string`
  - `logline?: string`
  - `characters: { id: string; name: string; description: string; visualPrompt: string }[]`
  - `scenes: { id: string; name: string; description: string; visualPrompt: string }[]`
  - `props: { id: string; name: string; description: string; visualPrompt: string }[]`
  - `shots: { id: string; index: number; sceneId: string; characterIds: string[]; propIds?: string[]; shotPrompt: string; videoPrompt: string }[]`
- **要点**：
  - `visualPrompt / shotPrompt / videoPrompt` 要尽量“可直接喂给模型”，减少前端再拼接的复杂度
  - `shots[*].sceneId / characterIds / propIds` 用于保证引用一致性（镜头明确用了哪些资产）
- **Demo**：可先用 Mock（根据文本返回固定结构）或用大模型按 schema 输出 JSON。

---

### 3.2 文生图（Text-to-Image）

- **用途**：场景/角色/道具的「根据描述生成图片」、风格预览图。
- **输入**：
  - `prompt: string` — 画面描述
  - `styleId?: string` — 风格 ID（可选）
  - `aspectRatio?: string` — 如 `'16:9' | '1:1'`
- **输出**：
  - `imageUrl: string` — 图片 URL 或 Base64
  - `taskId?: string` — 若异步，用于轮询
- **Demo**：返回占位图 URL（如 picsum）或调用现有 `text_to_image` 第三方 API。

---

### 3.3 分镜图生成（单张，Demo 优先）

- **用途**：分镜脚本页「生成分镜图」— 每个镜头 1 张分镜图。
- **输入**：
  - `prompt: string` — 该镜头的画面描述
  - `sceneImageUrl?: string` — 场景参考图
  - `characterImageUrls?: string[]` — 角色参考图
  - `styleId?: string`
- **输出**：
  - `imageUrl: string`
  - `taskId?: string`
- **Demo**：可直接复用文生图接口（同 `prompt/styleId/aspectRatio`），或单独保留方法名便于后续扩展。

---

### 3.4 图生视频（Image-to-Video）

- **用途**：分镜视频页「根据一张分镜图 + 描述生成短视频」。
- **输入**：
  - `imageUrl: string` — 分镜图
  - `prompt: string` — 动作/画面变化描述
  - `duration?: number` — 目标时长（秒）
- **输出**：
  - `videoUrl: string`
  - `duration?: number`
  - `taskId?: string` — 异步任务 ID，轮询状态
- **Demo**：返回一段固定短视频 URL 或 Mock 地址。

---

### 3.5 （可选）视频合成（拼接）

- **用途**：视频预览页「多段分镜视频」合成最终成片。
- **输入**：
  - `clips: { videoUrl: string; startAt?: number; duration?: number }[]`
- **输出**：
  - `videoUrl: string`
  - `duration: number`
- **Demo**：可前端用 video 标签简单顺序播放列表，或返回一个 Mock 成片 URL。

---

## 四、Demo 实现建议

### 4.1 统一 AI 服务层（前端）

- 抽一层 `aiService`，每个能力一个方法，例如：
  - `parseTextToStructure(params)`（文本 → JSON）
  - `textToImage(params)`
  - `generateStoryboardImage(params)`（Demo 可直接走 `textToImage`）
  - `imageToVideo(params)`
  - `composeVideo(params)`
- 所有方法返回形态与上面「输出」一致，便于后续把 Mock 换成真实 API。

### 4.2 Mock 策略

- **文本解析**：对固定示例文本返回固定 JSON；或调用大模型并要求“严格输出 JSON（无多余文字）”。
- **文生图**：可用现有 `trae-api` 的 `text_to_image` 或固定 picsum/placeholder 图。
- **分镜图**：Demo 优先单张；返回占位图 URL。
- **图生视频**：返回同一段 Demo 短视频 URL（或 2～3 段轮换）。
- **视频合成**：返回一段 Mock 成片 URL，或仅前端列表播放不请求后端。

### 4.3 异步任务（可选）

- 若真实 API 为异步（返回 taskId），Demo 可在 Mock 里：
  - 立即返回 `taskId`，2～3 秒后轮询返回「完成 + 结果 URL」；
  - 或直接延迟 1～2 秒后返回「已完成 + Mock URL」。
- 这样前端「生成中 → 完成」的交互可先跑通。

### 4.4 风格（Demo）

- **风格列表**：写死 3～5 条（id + name + 预览图），全局设定里选择即可。

### 4.5 你现在需要做什么（按 Demo 优先级）

- **把“文本 → 结构”跑通**：
  - 故事情节页提供一个大文本输入框
  - **保存**：仅把原文写入 Redux/localStorage（不调用 AI）
  - **下一步**：调用 `parseTextToStructure`，拿到 `characters/scenes/props/shots` 写入状态，跳转到场景角色道具页
- **按结构结果批量出图**：
  - 场景/角色/道具页：对每个 `visualPrompt` 调 `textToImage` 生成对应图片（支持逐个“重新生成”）
  - 分镜脚本页：对每个镜头 `shotPrompt` 生成分镜图（可选把场景/角色图 URL 作为参考传入）
- **按镜头出视频**：
  - 分镜视频页：对每个镜头使用“分镜图 + videoPrompt”调用 `imageToVideo`
  - 预览页：按镜头列表顺序播放视频片段（Demo 可先不做后端合成）

---

## 五、与现有前端的对接点

| 前端位置 | 建议对接的 AI 能力 | 说明 |
|----------|--------------------|------|
| 全局设定页 | 风格选择（写死列表） | 不调用生成接口 |
| 故事情节页「保存/下一步」 | `parseTextToStructure` | 保存：仅写本地；下一步：解析并写入 Redux/localStorage |
| 场景/角色/道具「重新生成」 | `textToImage` | 传入当前描述 |
| 分镜脚本「生成分镜图」 | `generateStoryboardImage` | 传入镜头 `shotPrompt` + 场景/角色图（可选） |
| 分镜视频「生成视频」 | `imageToVideo` | 传入分镜图 + 描述 |
| 视频预览「合成/导出」 | `composeVideo` 或仅前端播放 | Demo 可只做播放列表 |

---

## 六、后续接入真实模型时

- 保持上述「输入/输出」形态不变，只替换 `aiService` 内部实现：
  - 文本解析 → 接入大模型，按 schema 输出 JSON（必要时加校验/重试）；
  - 文生图 → 接入 SD、Midjourney API、国内文生图等；
  - 图生视频 → 接入 Runway、可灵、即梦等；
  - 视频合成 → 后端 FFmpeg 或第三方合成服务。
- 若需计费/限流，可在这些接口外再包一层「业务后端」做鉴权与配额，Demo 阶段可省略。

---

以上完成「AI 模型设计」部分，Demo 只需按本设计实现 Mock 与前端调用即可跑通全流程，无需数据库。
