# 界面研习录 · Interface Atlas

从设计问题出发，理解优秀网站的结构、体验和前端实现。

## 项目文档

- [项目说明](docs/PROJECT.md)：需求、架构、文件职责、数据字段、已知限制与发布关系。
- [Codex接手指南](docs/HANDOFF.md)：阅读顺序、新增案例和修改功能的流程、验证与交接格式。
- [代理工作规则](AGENTS.md)：收录标准与协作边界。
- [自动积累交接](docs/automation.md)：单次任务指令与尚未接通的自动化条件。
- [验证记录](docs/verification.md)与[研究记录](docs/runs.md)：已完成检查和历史研究范围。

## 在 Codex 云端继续

目标仓库：`biexuefounder/ui-`，主分支 `main`。进入 Codex 云端后选择这个仓库，先读取 `AGENTS.md`。可直接使用 `docs/automation.md` 中的单次研究指令。无需安装依赖或填写 API key；Node.js 用于检查，Python 可用于静态预览。研究来源访问需要环境具备对应网络权限。

首次可发送：

> 阅读 AGENTS.md 和 docs/automation.md，检查进行中和待验收任务；若没有积压，准备3张候选卡并推荐一项，等我选择后再开展。

## 本地使用

无需构建依赖。用任意静态服务器服务 `dist/`，例如 `python -m http.server 8000 --directory dist`，浏览器打开本机8000端口。

运行 `node scripts/check.mjs` 检查案例结构、本地资源和JS语法。

## 内容

首个案例：VitePress。包含整站地图、导航、视觉分析、阅读布局、源码阅读路径、原创交互演示及局限。按设计问题筛选，支持标题搜索。电脑和平板响应式布局。

## GitHub与发布

本仓库为独立GitHub源码仓库。需要公开站点时，在仓库 Settings → Pages 选择 GitHub Actions，再手动运行发布工作流。已提供静态发布工作流。该工作流只验证和发布已有内容，不会自行研究案例，不会使用Plus额度。

定期研究需要另外接通云端任务，见 docs/automation.md。当前不能将流程文件视为自动任务已经启用。

已发布首版：https://interface-atlas-study.merrywand12.chatgpt.site 。这是独立托管的快照，不会随本仓库提交自动变化；GitHub Pages 配置完成后应以其部署结果为准。

## 内容维护

新案例写入 dist/data.js；演示放在 dist/demos/。数据HTML来自可信维护者，禁止直接插入不可信输入。原项目链接属于原作者，教学演示为本项目原创；不附带原项目全部源码或第三方素材。

自动化标准与并发边界见 AGENTS.md。
