# MoveNest Project Overview

## 1. 项目文档

| 内容 | 文件或位置 | 状态 |
| --- | --- | --- |
| 产品原型 | `src/App.jsx` | 已完成，可本地运行 |
| 产品需求与范围 | `docs/prd.md` | 已完成 |
| 用户与竞品研究 | `docs/research.md` | 已完成，已标注研究限制 |
| AI 使用过程 | `docs/ai-process.md` | 已完成，已标注追溯限制 |
| 运行与文档导航 | `README.md` | 已完成 |
| 在线 Demo | 未提供 | 待部署 |
| 用户测试结果 | 未提供 | 待完成真实测试后补充 |

## 2. 原型完成度

### 已实现

- Welcome、Home、Workout Detail、Active Workout、Completion 五页流程。
- Guest 进入。
- 默认推荐与三节课程选择。
- Check-in 状态与解释性文案变化。
- 课程详情与动作预览。
- 训练计时、暂停、跳过、Too hard。
- 完成反馈与返回首页。
- 响应式手机容器。
- 本地图片资源。

### 未实现或仅模拟

- 无真实 AI 模型或推荐 API。
- Check-in 不会改变默认推荐课程。
- Too hard 不会真实调整动作或时长。
- 无账号、数据库、训练记录和跨会话保存。
- 无真实次日计划、日历或提醒。
- 无埋点和真实指标数据。
- 无正式健康筛查或医学审核。

## 3. 产品体验路径

1. 点击 `Start as Guest`。
2. 在 Home 切换三项 Check-in，观察解释文案变化。
3. 打开默认推荐课程，查看时长、强度、目标和动作。
4. 点击 `Start Workout`，体验计时、Pause、Skip 和 Too hard。
5. 点击 `Complete Workout`，选择难度反馈。
6. 点击 `Save tomorrow's 10-min plan` 返回首页。

当前个性化由规则和状态模拟，体验重点是推荐、开始、调整、完成与反馈构成的产品闭环。

## 4. 验证状态

- [x] 将“60 秒内开始”标记为待验证假设。
- [x] 区分竞品官方事实和产品推断。
- [x] 说明当前 AI 能力边界。
- [x] 未虚构用户访谈、测试样本或指标结果。
- [x] 补充健康安全与隐私边界。
- [x] 补充指标事件定义与验证目标。
- [x] 补充图片素材追溯限制。
- [ ] 按实际使用记录补充 AI 模型名称和版本。
- [ ] 补齐图片来源、生成工具或授权证明。
- [ ] 完成 3-5 人可用性测试并记录结果。

## 5. 技术检查

```bash
npm install
npm run build
npm run lint
npm run dev
```

版本发布前还应手动检查：

- 五页核心流程能否完整走通。
- 小屏幕下是否存在文字遮挡或按钮不可见。
- 所有图片是否正常加载。
- Pause、Skip、Too hard 和反馈按钮是否有可见状态。
- README 中的链接和运行说明是否正确。

## 6. 项目结构

```text
MoveNest/
├─ README.md
├─ docs/
│  ├─ project-overview.md
│  ├─ prd.md
│  ├─ research.md
│  └─ ai-process.md
├─ src/
└─ package.json
```

产品部署后，应在 README 顶部增加一个无需登录即可访问的 Demo URL。
