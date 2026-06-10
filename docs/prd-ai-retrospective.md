# PRD 与 AI 实现复盘

## PRD 思路

MoveNest 面向工作忙、运动习惯不稳定的欧美城市女性，目标是在 60 秒内帮助用户开始一节 8-15 分钟的低冲击居家训练。核心链路为 `Welcome -> Home -> Workout Detail -> Active Workout -> Completion`。产品用默认推荐降低选择成本，用轻量 Check-in 表达对精力、时间和身体状态的关注，并在训练中提供 Pause、Skip 和 Too hard。文案采用“Start small”“You showed up. That counts.”，避免减脂羞辱和意志力施压。

## AI 实现过程

我使用 Codex 完成需求拆解、文案探索和代码协作：先让 AI 分析用户场景与页面信息，再生成英文文案候选，随后提供 React + Vite + Tailwind 的组件和状态方案。实现阶段使用 React state 控制五页切换，Tailwind 处理视觉样式，本地静态数据承载课程内容；最后通过人工检查、`npm run build`、`npm run lint` 和完整流程点击验证。

AI 生成的五页主链路、默认推荐、Too hard 和完成反馈被直接采用；账号体系、社区、课程商城和高冲击动作被否决，因为它们偏离“快速开始第一节训练”的核心任务。过度承诺、身材焦虑和医学化文案被改写。判断 AI 输出时，我主要检查：是否服务核心用户问题、是否与原型真实能力一致、是否存在健康风险。遇到跳跃动作、医疗判断或“系统会自动适配”等建议时，我选择不信任并删除，因为它们缺少专业审核或实现依据。当前 Check-in 只改变解释文案，因此不会把它描述成真实 AI 推荐。

本项目没有额外搭建独立 Skill 或 Agent。工作流采用“需求拆解 -> 文案与结构生成 -> 前端实现 -> 人工审核 -> 构建与流程验证”，关键决策始终由人工确认。

## 完整 Prompt

### Prompt 1：产品链路

```text
你是一名 AI x 运动健康产品经理。请为面向 25-35 岁欧美城市女性的居家训练 App 设计一个 5 页面移动端核心链路。用户工作忙、没有稳定运动习惯，希望在家完成低压力短时训练。请说明每页的目标、用户心理、核心信息和主按钮，不扩展社区、会员和课程商城。
```

### Prompt 2：产品文案

```text
请为 MoveNest gentle home workout app 编写 Welcome、Home、Workout Detail、Active Workout 和 Completion 的英文 UI 文案。品牌气质是 calm, clean, supportive。不要使用减肥羞辱、焦虑驱动、强刺激或无法证明的健康承诺，文案应简洁自然。
```

### Prompt 3：前端实现

```text
请用 React、Vite 和 Tailwind CSS 实现一个无后端的移动端 Web 原型。使用 React state 控制 Welcome、Home、Workout Detail、Active Workout、Completion 页面切换；静态课程数据集中管理；实现计时、暂停、跳过、Too hard 和完成反馈；按钮包含 hover、active 和 focus 状态。
```

## 截图

在此处依次插入以上三段 Prompt 对应的真实对话截图，并补充核心 Demo 页面截图。
