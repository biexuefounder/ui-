// 内容数据和界面逻辑分开，避免每篇文章复制一套事件。
const articles=[
 {title:'认识内容结构',intro:'先将内容分成读者能理解的主题，再决定页面和菜单。导航是内容结构的表现。',principle:'为每一层导航安排一种职责：全局选择内容区域，侧栏选择文章，页内目录选择章节。'},
 {title:'组织导航层级',intro:'分组名称应该帮助读者做选择，而不是暴露维护者的文件夹习惯。',principle:'把同一任务下的内容放在一起。当前项除了颜色，还要通过 aria-current 向辅助技术说明。'},
 {title:'调整阅读宽度',intro:'宽屏的剩余空间不必全部分给正文。控制行长，可以减少读者换行时寻找下一行的距离。',principle:'使用 max-width 约束正文，用媒体查询改变布局；不要仅仅把桌面三栏整体缩小。'}
];
const buttons=[...document.querySelectorAll('[data-index]')];
function selectArticle(index){
 document.querySelector('#title').textContent=articles[index].title;
 document.querySelector('#intro').textContent=articles[index].intro;
 document.querySelector('#principle-text').textContent=articles[index].principle;
 buttons.forEach((button,i)=>{if(i===index)button.setAttribute('aria-current','page');else button.removeAttribute('aria-current');});
}
buttons.forEach(button=>button.addEventListener('click',()=>selectArticle(Number(button.dataset.index))));
