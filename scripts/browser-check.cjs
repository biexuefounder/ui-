// Requires Playwright and Chromium supplied by the cloud environment.
// Start the static server first; override ATLAS_BASE_URL for another port.
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const base=process.env.ATLAS_BASE_URL||'http://127.0.0.1:8000';
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
 try{
 for(const width of [1440,768]){
  const page=await browser.newPage({viewport:{width,height:1000},reducedMotion:'reduce'});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base);await page.locator('.card').first().waitFor();
  assert.deepEqual(await page.locator('.stat strong').allTextContents(),['02','03','02']);
  await page.locator('.search').fill('missing-case');await page.locator('.empty').waitFor();
  await page.locator('#reset').click();await page.locator('.card').first().waitFor();
  await page.locator('#topics a').filter({hasText:'学习反馈'}).click();await page.locator('.empty').waitFor();
  await page.locator('#reset').click();await page.locator('.card .button').first().click();
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
 // Exercise the new case in the sandbox and as a standalone no-JS document.
 for(const width of [1440,768]){
  const page=await browser.newPage({viewport:{width,height:1000},reducedMotion:'reduce'});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base);await page.locator('.search').fill('GOV.UK');
  await page.locator('.card h3').filter({hasText:'GOV.UK Details'}).waitFor();
  assert.equal(await page.locator('.card').count(),1);
  await page.locator('.card .button').click();await page.locator('.detail-head').waitFor();
  assert.match(await page.locator('.detail-head .eyebrow').textContent(),/CASE 002/);
  await page.locator('a[href="#case/govuk-details/demo"]').click();
  await page.locator('#tablet-demo').click();await page.locator('#demo-wrap.tablet').waitFor();
  const frame=page.frameLocator('iframe');
  await frame.locator('#help summary').click();await frame.locator('#help[open]').waitFor();
  await frame.locator('#help summary').focus();await page.keyboard.press('Enter');
  await frame.locator('#help:not([open])').waitFor();
  await page.keyboard.press('Space');await frame.locator('#help[open]').waitFor();
  assert.equal(await frame.locator('.essential').isVisible(),true);
  await frame.locator('#check-answer').click();await frame.locator('#feedback').filter({hasText:'请先选择'}).waitFor();
  await frame.locator('input[value="required"]').check();await frame.locator('#check-answer').click();await frame.locator('#feedback').filter({hasText:'再想一想'}).waitFor();
  await frame.locator('input[value="extra"]').check();await frame.locator('#check-answer').click();await frame.locator('#feedback').filter({hasText:'判断正确'}).waitFor();
  await page.locator('#demo details summary').click();
  const pending=page.waitForEvent('download');await page.locator('a[download][href="demos/disclosure.html"]').click();
  assert.equal(await (await pending).failure(),null);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  assert.equal(await frame.locator('body').evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  assert.deepEqual(errors,[]);
  await page.screenshot({path:`/tmp/govuk-case-${width}.png`,fullPage:true});
  await page.close();console.log(`PASS GOV.UK ${width}: search, anchor, disclosure mouse/keyboard, quiz empty/wrong/correct, download, no overflow/errors`);
 }
 const noJS=await browser.newContext({javaScriptEnabled:false,viewport:{width:768,height:1000}});
 const page=await noJS.newPage();await page.goto(new URL('demos/disclosure.html',base.endsWith('/')?base:base+'/').href);
 await page.locator('#help summary').click();assert.equal(await page.locator('#help').getAttribute('open'),'');
 assert.equal(await page.locator('noscript').isVisible(),true);
 await noJS.close();console.log('PASS no-JS: native disclosure and static answer remain available');
 // Browser-only fixtures leave production data untouched.
 for(const mode of ['multiple','empty']){
  const page=await browser.newPage();
  await page.route('**/data.js',async route=>{
   const response=await route.fetch();let body=await response.text();
   body+=mode==='empty'?'\nwindow.ATLAS_CASES=[];':`\n{window.ATLAS_CASES=[window.ATLAS_CASES[0]];const c=structuredClone(window.ATLAS_CASES[0]);c.id='fixture';c.name='Fixture';c.tags=['新主题'];c.sections=c.sections.filter(s=>s.id!=='demo');window.ATLAS_CASES.push(c);}`;
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
