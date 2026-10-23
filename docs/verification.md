# 验证记录 · 2026-10-23

- `node scripts/check.mjs`：通过。案例必填项、唯一ID、本地资源存在、来源URL格式、JS语法。
- 来源：实际读取官方介绍、Sidebar、Theme Config及GitHub VPDoc.vue；未声称逐行审计整仓库。
- 浏览器：桌面首页视觉检查通过；搜索无结果、恢复列表、进入案例、章节锚点已验证。
- 演示：独立页面文章切换通过；站内iframe窄屏布局与真实鼠标文章切换通过。浏览器frame定位点击存在工具偏移，改用截图定位后验证成功。
- 限制：未在物理平板设备上测试。页面已实现响应式CSS；发布后仍需用户在常用平板抽查。
- 自动研究：未启用。本次迁移使用GitHub已有连接；未配置定时研究。

## 2026-10-24 — 日常流程与基础修整

- `node scripts/check.mjs`：通过，现有1个正式案例。
- `node scripts/browser-check.cjs`：通过。需先启动静态服务器；使用环境提供的 Playwright 和 Chromium，无新增应用依赖。
- 1440×1000、768×1000：搜索空结果与恢复、主题空结果与恢复、案例/章节导航、面包屑、主导航选中、演示宽窄切换、iframe文章切换、Enter操作、JS文件真实下载、跳至内容保留案例、方法页无横向溢出及无pageerror。
- 浏览器拦截数据的隔离样本：空案例统计00/00/00；两个案例统计02/04/01、侧栏02、新主题筛选、第二案例编号002。样本未写入正式数据。
- `git diff --check`：通过。
- 未验证：物理平板、定时执行/通知送达、GitHub Pages发布。本次未新增研究案例，也未重复核查既有案例外链。

## 2026-10-24 — GOV.UK Details案例

- `node scripts/check.mjs`：通过，2个案例；额外验证演示HTML中普通内联script语法。
- `ATLAS_BASE_URL=http://127.0.0.1:8002 node scripts/browser-check.cjs`：通过，7组检查（旧案例两种宽度、新案例两种宽度、禁用JS、模拟多案例、模拟空案例）。
- 新案例1440×1000与768×1000：搜索与编号002、章节锚点、窄屏控件、iframe鼠标/Enter/空格展开、必要内容保留、练习未选/错误/正确反馈、完整HTML下载、页面与iframe无横向溢出、无pageerror。查看了768宽度的全文截图。
- 使用reduced-motion消除滚动与宽度动画对浏览器自动点击定位的干扰；默认动画模式的完整自动回归未作为本次通过结果。
- 禁用JS后独立HTML的details仍可展开，noscript显示参考答案。没有放宽iframe的sandbox权限。初测发现表单提交被sandbox阻止，已改为type=button及本地选项读取，不提交数据。
- 官方首页、Details、Accordion、Tabs网页，以及固定提交的template.njk、_index.scss、_mixin.scss链接全部HTTP 200；实际读取官方内容和源码后编写分析。
- 来源版本：govuk-frontend `69b59f558003f05e7f444eae1c6f5bc570cf7226`；govuk-design-system `83ef3622ff74d47170d642ea7811e4ea4a440ef9`。源码引用固定版本，官方网页为动态内容。
- 未验证：原站浏览器交互、物理平板、读屏器/语音辅助软件与用户学习效果；不宣称这些通过。来源可访问与规则/源码阅读已核实。
- 本分支尚未合并或发布。
