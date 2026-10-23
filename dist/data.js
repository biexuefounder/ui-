window.ATLAS_CASES=[{id:'vitepress',name:'VitePress',title:'让复杂文档，拥有清楚的阅读路径',summary:'从全局导航到章节目录，研究内容密集的网站如何同时回答「我在哪」「还能去哪」与「这一页讲什么」。',tags:['整站导航','信息层级','阅读布局'],date:'2026-10-23',sources:[['原网站','https://vitepress.dev/'],['开源仓库','https://github.com/vuejs/vitepress'],['官方说明','https://vitepress.dev/guide/what-is-vitepress'],['侧栏配置','https://vitepress.dev/reference/default-theme-sidebar'],['主题配置','https://vitepress.dev/reference/default-theme-config'],['阅读布局源码','https://github.com/vuejs/vitepress/blob/main/src/client/theme-default/components/VPDoc.vue']],sections:[
{id:'overview',title:'整站全貌',subtitle:'先辨认空间，再选择入口',html:`<p><span class="fact">官方事实</span> VitePress 将 Markdown 内容转为静态网站，默认主题服务文档阅读，前端基于 Vue 与 Vite。初次请求返回预生成 HTML，之后可在客户端切换页面。<a href="https://vitepress.dev/guide/what-is-vitepress">依据：What is VitePress</a></p><p><span class="fact interpret">分析判断</span> 阅读者有两种典型目的：第一次学习一个概念，或返回查找一个参数。前者需要连续路径，后者需要定位入口。把所有内容铺在一页上，会让这两种任务互相干扰。</p><div class="table-wrap"><table><tr><th>空间</th><th>承担的任务</th><th>阅读者的下一步</th></tr><tr><td>首页</td><td>理解工具定位</td><td>进入入门文档</td></tr><tr><td>Guide</td><td>按主题理解和实践</td><td>沿侧栏寻找章节</td></tr><tr><td>Reference</td><td>查询配置与接口</td><td>定位具体配置项</td></tr><tr><td>文档正文</td><td>读解释、示例与限制</td><td>在页内标题间跳转</td></tr><tr><td>仓库与贡献入口</td><td>查源码、问题与变更</td><td>从界面行为追踪实现</td></tr></table></div><p>这个案例重点研究默认主题中的文档空间，不声称覆盖所有自定义主题、插件或仓库模块。</p>`},
{id:'navigation',title:'整站导航',subtitle:'把不同尺度的选择分开',html:`<p><span class="fact">官方事实</span> 主题配置区分 nav 与 sidebar；侧栏支持分组、折叠，以及按页面路径选择不同菜单。<a href="https://vitepress.dev/reference/default-theme-sidebar">依据：Sidebar</a> · <a href="https://vitepress.dev/reference/default-theme-config">Theme Config</a></p><p><span class="fact interpret">分析判断</span> 顶层导航回答「我要做哪类事」，侧栏回答「这一类里有哪些内容」，页内目录回答「当前文章有哪些部分」。三个入口不是重复菜单，而是不同范围的定位工具。</p><h3>一次具体的查找任务</h3><ol><li>用户想修改侧栏：先进入 Reference，缩小搜索范围。</li><li>在 Default Theme 分组中找到 Sidebar，进入对应文档。</li><li>在正文中定位 Multiple Sidebars 或 Collapsible Sidebar Groups，直接读需要的细节。</li><li>保留当前菜单位置，让用户返回相邻主题时不必重新认识整个站点。</li></ol><h3>适用边界</h3><p>只有五六个页面的小网站不必照搬三套导航。内容少时，多层菜单反而增加点击和视觉干扰。先按任务分组，再决定是否增加层级。</p>`},
{id:'visual',title:'信息层级与视觉',subtitle:'让结构比装饰更容易被看见',html:`<p><span class="fact interpret">设计分析</span> 对知识型网站，层级应优先通过空间、字号、字重与位置建立。颜色适合表示链接、选中项与提示；如果所有卡片都用强调色，真正的操作入口反而难以辨认。</p><h3>四个可迁移判断</h3><ul><li><b>标题是路标：</b>让章节标题能脱离正文独立表达问题，而不是只写「介绍」「说明」。</li><li><b>留白是分组：</b>同一章节内部距离小，章节之间距离大。读者能在阅读文字之前感知结构。</li><li><b>代码是一种独立阅读模式：</b>等宽字、独立背景和横向滚动能够保留缩进，不让长代码把整个页面撑宽。</li><li><b>强调色要有语义：</b>当前项、可点击链接与提示应有稳定规则，不因页面而随意改变。</li></ul><p>这些是本案例的分析和教学建议，不代表原团队披露了相同的设计意图，也不把个人审美判断当作用户研究结论。</p><h3>小练习</h3><p>在演示中收起侧栏，再尝试寻找相邻章节。观察你是否失去上下文。接着切换到较窄视图，判断哪些定位入口应改为按需展开。</p>`},
{id:'reading',title:'阅读布局与响应式',subtitle:'屏幕变大，不意味着正文应无限变宽',html:`<p><span class="fact">源码事实</span> VPDoc.vue 将正文与辅助栏分开，依据布局状态切换样式，并使用媒体查询调整间距与辅助栏显示；正文容器有宽度约束。<a href="https://github.com/vuejs/vitepress/blob/main/src/client/theme-default/components/VPDoc.vue">查看 VPDoc.vue</a></p><p><span class="fact interpret">分析判断</span> 桌面端的额外空间可以留给目录与留白。平板端则应优先保住正文的舒适宽度；把所有栏等比例缩小，通常会让每一栏都难读。</p><h3>从基础 CSS 理解</h3><p><code>max-width</code> 限制内容最多占多宽；<code>margin: auto</code> 分配两侧剩余空间；<code>@media</code> 根据视口宽度切换布局。它们不需要框架即可使用。</p><pre><code>/* 教学示例，并非原项目源码 */
.reader { max-width: 68ch; margin-inline: auto; }
.layout { display: grid; grid-template-columns: 180px 1fr; }
@media (max-width: 620px) {
  .layout { grid-template-columns: 1fr; }
}</code></pre><p><code>ch</code> 是以字体中数字 0 的宽度为参照的单位，不等于固定的汉字数量。中文排版仍要通过真实段落验证。</p>`},
{id:'source',title:'从配置到源码',subtitle:'理解职责，不逐行背诵整个项目',html:`<p><span class="fact">源码事实</span> VPDoc.vue 读取布局状态，渲染正文、辅助栏和文档底部组件。文件内的 template 描述结构，style scoped 限定样式作用范围。<a href="https://github.com/vuejs/vitepress/blob/main/src/client/theme-default/components/VPDoc.vue">源码入口</a></p><h3>初学者的阅读路径</h3><ol><li>先从主题配置认识菜单数据：文字、链接与分组决定内容组织。</li><li>进入 VPDoc.vue，先看 template，识别正文与辅助栏的分工。</li><li>看 style 中的媒体查询，观察不同宽度下哪些元素改变。</li><li>最后再看 script 中数据与布局状态的来源。继续追踪未读取的文件时，应重新核查源码，不能仅凭文件名推断。</li></ol><div class="table-wrap"><table><tr><th>术语</th><th>基础理解</th></tr><tr><td>Component · 组件</td><td>一块有明确职责的界面及其逻辑，便于复用和维护。</td></tr><tr><td>Reactive state · 响应式状态</td><td>数据变化后，框架更新相关界面，不必手动查找每个DOM节点。</td></tr><tr><td>Slot · 插槽</td><td>组件预留的内容位置，让调用者放入额外内容。</td></tr><tr><td>Hydration · 水合</td><td>客户端让服务器已生成的HTML接上交互逻辑。</td></tr></table></div><h3>后端与部署只讲作用</h3><p>静态文档的内容可以在构建时生成，不意味着整个互联网服务完全没有服务器；访问仍需要静态托管。账号、数据库和业务接口不是本演示的必需部分。本案例不对未检查的托管配置作结论。</p>`},
{id:'demo',title:'交互实验室',subtitle:'亲手改变布局，理解背后的取舍',html:`<p>以下是原创教学复现，不是原站截图或原项目运行实例。使用原生 HTML、CSS、JS 展示分组折叠、文章切换与页内定位；不包含 Vue 路由、全文搜索、预取或水合。</p><div class="demo-tools"><button id="desktop-demo" aria-pressed="true">宽屏视图</button><button id="tablet-demo" aria-pressed="false">窄屏视图</button><a href="demos/navigation.html" target="_blank" rel="noopener">独立打开 ↗</a></div><div class="demo-wrap" id="demo-wrap"><iframe title="文档导航交互演示" src="demos/navigation.html" sandbox="allow-scripts"></iframe></div><details><summary>查看演示源码与逐步说明</summary><p>HTML 使用语义化 nav、main 与 details。CSS Grid 将侧栏和正文分开。JS 只负责响应文章选择和更新选中状态。</p><p><a href="demos/navigation.html" download>下载完整 HTML 示例</a> · <a href="demos/navigation.js" download>下载带中文注释的 JS</a></p><pre><code>// 教学实现：数据驱动视图
function selectArticle(index) {
  title.textContent = articles[index].title;
  intro.textContent = articles[index].intro;
  // 同步 aria-current，帮助读屏用户辨认当前位置
}</code></pre><p>与原项目的区别：这里替换同一页面的文本，原项目使用框架与路由管理页面；这里的静态菜单只用于讲清交互，不是生产级文档生成器。</p></details>`},
{id:'transfer',title:'借鉴、限制与验收',subtitle:'把观察转成自己能解释的判断',html:`<h3>可以借鉴什么</h3><p>先划分导航职责，再设计视觉；按真实阅读宽度安排正文；菜单折叠只隐藏次要信息，不应隐藏当前任务的必要步骤。把这三条用在别的网站时，应先确认用户是否有相同的任务。</p><h3>不能直接推导什么</h3><p>仅看界面和代码，无法证明这种设计提升了完成率或学习效果。分析不提供未经测量的性能数据，也不把官方产品介绍当作独立评测。</p><h3>自己检验是否看懂</h3><ol><li>能否说明顶层导航、侧栏与页内目录的区别？</li><li>能否找到控制阅读宽度的 CSS，并预测修改结果？</li><li>能否解释教学演示与原项目路由机制的不同？</li></ol><p>分析日期：2026-10-23。源码链接指向动态分支，未来可能改变。来源核查与演示测试分别记录；可运行不等于分析必然正确。</p>`}
]}];

window.ATLAS_CASES.push({
  "id": "govuk-details",
  "name": "GOV.UK Details",
  "title": "哪些信息值得折叠，哪些必须看见？",
  "summary": "从内容的重要性出发，研究按需展开的适用边界；用原生HTML保留必要信息，让辅助说明在需要时出现。",
  "tags": [
    "信息层级",
    "阅读布局"
  ],
  "date": "2026-10-24",
  "sources": [
    [
      "设计系统首页",
      "https://design-system.service.gov.uk/"
    ],
    [
      "Details官方说明",
      "https://design-system.service.gov.uk/components/details/"
    ],
    [
      "Accordion使用边界",
      "https://design-system.service.gov.uk/components/accordion/"
    ],
    [
      "Tabs使用边界",
      "https://design-system.service.gov.uk/components/tabs/"
    ],
    [
      "Details模板源码",
      "https://github.com/alphagov/govuk-frontend/blob/69b59f558003f05e7f444eae1c6f5bc570cf7226/packages/govuk-frontend/src/govuk/components/details/template.njk"
    ],
    [
      "Details样式源码",
      "https://github.com/alphagov/govuk-frontend/blob/69b59f558003f05e7f444eae1c6f5bc570cf7226/packages/govuk-frontend/src/govuk/components/details/_mixin.scss"
    ]
  ],
  "sections": [
    {
      "id": "overview",
      "title": "先看整站：规范、组件与任务",
      "subtitle": "本案例研究设计系统，不是英国政府办事门户",
      "html": "<p><span class=\"fact\">官方事实</span> GOV.UK Design System 为政府服务团队提供样式、组件与常见任务模式。首页把 Styles、Components、Patterns 分开，另有 Get started、Community 和 Accessibility 入口。<a href=\"https://design-system.service.gov.uk/\">依据：官方首页</a></p><div class=\"table-wrap\"><table><tr><th>空间</th><th>读者要解决的问题</th></tr><tr><td>Get started</td><td>如何开始使用与接入实现？</td></tr><tr><td>Styles</td><td>字号、颜色、留白和布局如何统一？</td></tr><tr><td>Components</td><td>按钮、输入框、Details等局部界面怎么用？</td></tr><tr><td>Patterns</td><td>如何组织填写地址、检查答案等完整任务？</td></tr><tr><td>Community / Accessibility</td><td>如何贡献证据、了解可访问性工作？</td></tr></table></div><p><span class=\"fact interpret\">分析判断</span> 阅读路径可以是：先理解任务，再决定是否需要一个组件，最后查模板和样式。不要看到折叠效果就直接套用。本案例只深入 Components → Details；不审计政府门户或整个设计系统。</p>"
    },
    {
      "id": "decision",
      "title": "先分主次，再决定折叠",
      "subtitle": "减少初始信息量，也会增加发现内容的成本",
      "html": "<p><span class=\"fact\">官方规则</span> Details适用于只有部分用户需要的补充信息；不要隐藏多数用户需要的信息。只有一段可展开内容时，官方建议优先考虑Details，而不是标签页或手风琴。展开标题应简短、明确。<a href=\"https://design-system.service.gov.uk/components/details/\">依据：Details使用说明</a></p><p><span class=\"fact interpret\">分析判断</span> 在学习小组介绍中，参加条件、费用会影响所有人的决定，应直接展示；术语解释只帮助一部分人，可以按需展开。“渐进披露（progressive disclosure）”就是先呈现关键内容，需要时再显示细节，它不等于把长文全部折起来。</p><ol><li>问：不看这段会不会作出错误决定或无法继续？会，就直接展示。</li><li>问：是否只有部分读者需要？如果是，才考虑折叠。</li><li>问：展开标题是否能预告内容？用“不确定基础HTML指什么？”比“更多”更明确。</li></ol><p>这三问是本案例的教学整理，不是官方原文，也不是经过本项目用户研究验证的评分规则。</p>"
    },
    {
      "id": "visual",
      "title": "视觉与交互：让入口可发现",
      "subtitle": "明确标题、状态与焦点，不把内容藏得更深",
      "html": "<p><span class=\"fact\">源码事实</span> 官方模板用summary包住标题，补充内容另放在文本容器。样式让标题呈现链接样式，使用箭头区分开关状态，并提供焦点样式；展开内容带左边线和内边距。<a href=\"https://github.com/alphagov/govuk-frontend/blob/69b59f558003f05e7f444eae1c6f5bc570cf7226/packages/govuk-frontend/src/govuk/components/details/_mixin.scss\">依据：样式源码</a></p><p><span class=\"fact interpret\">分析判断</span> 箭头帮助识别状态，标题帮助预测内容，左边线帮助识别补充信息的范围。这些作用需要结合真实内容验证，不能仅凭外观断言更易用。</p><p>虽然标题看起来像链接，它的作用是原地展开，不是跳转页面。官方Details文档还记录了部分用户可能把它理解为离开当前页面的链接，以及语音辅助操作方面的顾虑；本案例未复验相关研究，不把它描述成对所有人都无障碍。</p><h3>平板上怎么处理</h3><p>本演示让正文自然换行，标题可占多行、可点击区域至少44像素高，保留明显键盘焦点。窄屏没有改变内容重要性：必要信息仍然直接展示。</p>"
    },
    {
      "id": "compare",
      "title": "Details、手风琴和标签页怎么选",
      "subtitle": "先尝试普通标题和正文，再引入隐藏内容的控件",
      "html": "<div class=\"table-wrap\"><table><tr><th>形式</th><th>适合考虑的情况</th><th>主要代价</th></tr><tr><td>直接展示</td><td>必须读到的信息、连续步骤</td><td>页面可能更长，要靠标题与留白组织</td></tr><tr><td>Details</td><td>单段、较次要的补充说明</td><td>可能被忽略，入口文案要具体</td></tr><tr><td>Accordion · 手风琴</td><td>多个相关章节，可能需要同时展开比较</td><td>隐藏内容、展开后其他内容位置会变化</td></tr><tr><td>Tabs · 标签页</td><td>快速切换相关内容，一次只需看一块</td><td>不适合逐步通读或跨面板比较</td></tr></table></div><p><span class=\"fact\">官方依据</span> <a href=\"https://design-system.service.gov.uk/components/accordion/\">Accordion</a>与<a href=\"https://design-system.service.gov.uk/components/tabs/\">Tabs</a>文档都建议先测试不折叠的内容，并考虑精简、普通标题、分页面或页内目录等替代方案；不要把这些控件互相嵌套。</p><p><span class=\"fact interpret\">与已有案例的区别</span> VitePress案例关注“我在哪、还能去哪”；本案例关注“当前任务必须看到什么”。已有的章节锚点负责定位，Details负责补充解释，两者不能互相替代。</p>"
    },
    {
      "id": "source",
      "title": "从模板读到浏览器原生行为",
      "subtitle": "基础展开不需要自己维护一套JS状态",
      "html": "<p><span class=\"fact\">源码事实</span> <a href=\"https://github.com/alphagov/govuk-frontend/blob/69b59f558003f05e7f444eae1c6f5bc570cf7226/packages/govuk-frontend/src/govuk/components/details/template.njk\">template.njk</a>生成details、summary和正文容器；根据params.open输出open属性。<a href=\"https://github.com/alphagov/govuk-frontend/blob/69b59f558003f05e7f444eae1c6f5bc570cf7226/packages/govuk-frontend/src/govuk/components/details/_index.scss\">_index.scss</a>引入样式模块并调用mixin，实际规则在<a href=\"https://github.com/alphagov/govuk-frontend/blob/69b59f558003f05e7f444eae1c6f5bc570cf7226/packages/govuk-frontend/src/govuk/components/details/_mixin.scss\">_mixin.scss</a>中。</p><ol><li>先读模板：找summaryText、text和open，认识标题、正文、初始状态三个输入。</li><li>再看样式：搜索[open]、:focus和::before，观察展开状态、键盘焦点和箭头。</li><li>回到原生HTML：先写下面的最小例子，再添加自己的视觉样式。</li></ol><pre><code>&lt;!-- 原创教学示例，不是原项目源码 --&gt;\n&lt;details&gt;\n  &lt;summary&gt;不确定基础 HTML 指什么？&lt;/summary&gt;\n  &lt;p&gt;能用标题、段落和链接组织内容即可。&lt;/p&gt;\n&lt;/details&gt;</code></pre><div class=\"table-wrap\"><table><tr><th>术语</th><th>基础解释</th></tr><tr><td>原生元素</td><td>浏览器直接提供的HTML功能；details负责展开，summary是触发入口。</td></tr><tr><td>布尔属性open</td><td>属性存在就表示展开；open=\"false\"仍算存在，关闭要删除属性。</td></tr><tr><td>Nunjucks / .njk</td><td>生成HTML的模板语言；参数填入模板后才成为页面。</td></tr><tr><td>Sass / mixin</td><td>生成CSS的工具与可复用样式块；浏览器最终读取CSS。</td></tr><tr><td>::before</td><td>CSS伪元素，可在元素内容前绘制装饰；不是额外的HTML按钮。</td></tr></table></div><p>官方模板支持带HTML的参数并使用safe标记。这不是“任何输入都安全”：本演示只写可信静态内容，不把用户输入插入HTML。演示JS仅处理判断练习，展开本身在禁用JS时仍可操作；无需后端、数据库或网络接口。</p>"
    },
    {
      "id": "demo",
      "title": "交互实验室",
      "subtitle": "先找必要信息，再按需展开辅助说明",
      "html": "<p>原创虚构场景：参加一个学习小组。必要条件直接可见，术语解释按需展开；完成下方判断练习，观察反馈。它不是GOV.UK真实服务，也没有报名或数据提交。</p><div class=\"demo-tools\"><button id=\"desktop-demo\" aria-pressed=\"true\">宽屏视图</button><button id=\"tablet-demo\" aria-pressed=\"false\">窄屏视图</button><a href=\"demos/disclosure.html\" target=\"_blank\" rel=\"noopener\">独立打开 ↗</a></div><div class=\"demo-wrap\" id=\"demo-wrap\"><iframe title=\"信息展开与判断练习\" src=\"demos/disclosure.html\" sandbox=\"allow-scripts\"></iframe></div><details><summary>查看实现说明与下载源码</summary><p>HTML提供details/summary，CSS处理正文宽度和焦点，JS只读取选中的练习选项并通过textContent展示反馈，不提交表单。role=\"status\"用于让辅助技术获知反馈变化；实际读屏体验仍需实机验证。</p><p><a href=\"demos/disclosure.html\" download>下载完整HTML示例（含CSS与JS，可离线打开）</a></p></details><p>与原实现的区别：本演示使用浏览器自带的展开标记，没有复刻官方箭头、Sass体系或模板API；内容、配色和判断练习为本项目原创。并未实现Accordion或Tabs。</p>"
    },
    {
      "id": "transfer",
      "title": "迁移到自己的文章与验收",
      "subtitle": "判断内容的重要性，比增加折叠按钮更重要",
      "html": "<h3>可以迁移什么</h3><p>本站案例的核心结论和适用边界应直接可见；一段术语补充、进一步阅读或源码下载说明可以按需展开。不要把整篇分析拆成层层折叠的盒子。</p><h3>三步自测</h3><ol><li>不展开说明，能否找到参加条件、用时和费用？</li><li>只用Tab、Enter和空格，能否展开并收起说明，且看清焦点？</li><li>窄屏下能否读完必要信息，并完成判断练习？</li></ol><h3>适用边界</h3><p>这是官方规则、源码阅读与原创演示，不是本项目的用户研究。没有测量完成率或学习效果；没有验证所有浏览器、读屏器和语音辅助软件。链接样式的展开入口可能被误解，应在自己的真实任务中测试。</p><p>核查日期：2026-10-24。源码链接固定到已读取的提交；官方网页会持续更新。没有复制官方完整样式或组件，也未使用政府标识。</p>"
    }
  ]
});
