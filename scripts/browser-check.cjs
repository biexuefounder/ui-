// Requires Playwright and Chromium supplied by the cloud environment.
// Start the static server first; override ATLAS_BASE_URL for another port.
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const base=process.env.ATLAS_BASE_URL||'http://127.0.0.1:8000';
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
 try{
 for(const width of [1440,768]){
  const page=await browser.newPage({viewport:{width,height:1000}});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base);await page.locator('.card').waitFor();
  assert.deepEqual(await page.locator('.stat strong').allTextContents(),['01','03','01']);
  await page.locator('.search').fill('missing-case');await page.locator('.empty').waitFor();
  await page.locator('#reset').click();await page.locator('.card').waitFor();
  await page.locator('#topics a').filter({hasText:'学习反馈'}).click();await page.locator('.empty').waitFor();
  await page.locator('#reset').click();await page.locator('.card .button').click();
  await page.locator('.detail-head').waitFor();
  assert.match(await page.locator('.breadcrumb').textContent(),/VitePress/);
  await page.locator('a[href="#case/vitepress/demo"]').click();
  await page.locator('#tablet-demo').click();await page.locator('#demo-wrap.tablet').waitFor();
  const frame=page.frameLocator('iframe');
  await frame.locator('[data-index="1"]').click();await frame.locator('#title').filter({hasText:'组织导航层级'}).waitFor();
  await frame.locator('[data-index="2"]').focus();await page.keyboard.press('Enter');await frame.locator('#title').filter({hasText:'调整阅读宽度'}).waitFor();
  await page.locator('#desktop-demo').click();assert.equal(await page.locator('#desktop-demo').getAttribute('aria-pressed'),'true');
  await page.locator('#demo details summary').click();
  const downloadPromise=page.waitForEvent('download');await page.locator('a[download][href="demos/navigation.js"]').click();
  const download=await downloadPromise;assert.equal(await download.failure(),null);assert.equal(download.suggestedFilename(),'navigation.js');
  await page.locator('.skip').focus();await page.keyboard.press('Enter');assert.equal(await page.locator('.detail-head').count(),1);
  await page.locator('.nav-item[href="#method"]').click();await page.locator('.status-list').waitFor();
  assert.equal(await page.locator('.nav-item[href="#method"]').getAttribute('aria-current'),'page');
  assert.equal(await page.locator('#topics .selected').count(),0);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  assert.deepEqual(errors,[]);await page.close();console.log(`PASS ${width}: search/filter/reset, navigation, demo, keyboard, download, overflow, JS errors`);
 }
 // Browser-only fixtures leave production data untouched.
 for(const mode of ['multiple','empty']){
  const page=await browser.newPage();
  await page.route('**/data.js',async route=>{
   const response=await route.fetch();let body=await response.text();
   body+=mode==='empty'?'\nwindow.ATLAS_CASES=[];':`\n{const c=structuredClone(window.ATLAS_CASES[0]);c.id='fixture';c.name='Fixture';c.tags=['新主题'];c.sections=c.sections.filter(s=>s.id!=='demo');window.ATLAS_CASES.push(c);}`;
   await route.fulfill({response,body});
  });
  await page.goto(base);await page.locator('.stats').waitFor();
  assert.deepEqual(await page.locator('.stat strong').allTextContents(),mode==='empty'?['00','00','00']:['02','04','01']);
  assert.equal(await page.locator('.nav-item span').textContent(),mode==='empty'?'00':'02');
  if(mode==='multiple'){
   await page.locator('#topics a').filter({hasText:'新主题'}).click();await page.locator('.card h3').filter({hasText:'Fixture'}).waitFor();
   assert.equal(await page.locator('.card').count(),1);await page.locator('.card .button').click();await page.locator('.detail-head').waitFor();
   assert.match(await page.locator('.detail-head .eyebrow').textContent(),/CASE 002/);
  }else await page.locator('.empty').waitFor();
  await page.close();console.log(`PASS ${mode}: derived counts, topic filtering and numbering`);
 }
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
