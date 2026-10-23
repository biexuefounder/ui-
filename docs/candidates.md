# 首批手动研究候选 · 2026-10-24

状态：候选待用户选择，尚未开展完整研究或加入正式案例。已实际读取下列官方仓库文档；尚未验证原站浏览器交互与组件完整实现。

## 1. GOV.UK Details：哪些信息应该默认展开？（推荐）
- 学习问题：如何减轻页面信息负担，同时不隐藏完成任务必需的信息？
- 差异：已有VitePress案例重在跨页面导航，本题研究单页内容的主次与按需展开。
- 官方依据：Details文档建议只隐藏部分用户需要的辅助内容，不应隐藏多数用户需要的信息，展开文字应简短明确。
- 预期成果：整站结构简介、Details与Accordion/Tabs的适用区别、组件源码讲解、默认正文+可展开补充说明的原生演示。
- 已读取：https://github.com/alphagov/govuk-design-system/blob/main/src/components/details/index.md
- 推荐理由：基础HTML即可复现，能直接改善本站文章中的术语解释与延伸阅读。

## 2. React Learn：怎样把读文章变成动手学习？
- 学习问题：正文、运行示例、小结和挑战练习如何组织成学习路径？
- 差异：研究一篇教程内的学习步骤与反馈，不重复侧栏和三栏布局。
- 官方依据：Responding to Events含Sandpack示例、Recap、Challenges与Solution。
- 预期成果：教程结构分析、相关组件源码阅读、原生交互小练习和按需查看解析；不制作在线代码编译器。
- 已读取：https://github.com/reactjs/react.dev/blob/main/src/content/learn/responding-to-events.md
- 边界：展示学习活动组织，不能据此声称提升了实际学习效果。

## 3. GOV.UK Error summary：填错后，如何知道下一步改哪里？
- 学习问题：错误反馈怎样兼顾整体定位和字段旁的具体解释？
- 差异：由静态阅读转向表单任务反馈，涉及焦点与键盘可访问性。
- 官方依据：错误摘要与字段错误同时显示、文案一致、摘要链接定位到错误字段，并管理键盘焦点。
- 预期成果：简短表单、错误摘要、字段错误、修正后重新验证的原创演示，以及相关源码讲解。
- 已读取：https://github.com/alphagov/govuk-design-system/blob/main/src/components/error-summary/index.md
- 边界：教学演示不收集或发送个人数据。
