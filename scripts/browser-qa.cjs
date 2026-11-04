/** Local-only integration QA. Requires playwright and @axe-core/playwright as QA tools. */
const { chromium } = require('playwright');
const { default:AxeBuilder } = require('@axe-core/playwright');
const { spawn } = require('node:child_process');
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const dir=path.resolve('artifacts/v2');fs.mkdirSync(dir,{recursive:true});
const base='http://localhost:3410';
const children=[];const results={date:new Date().toISOString(),checks:[],responsive:[],accessibility:[],external:[],limitations:[]};
function check(name,condition,details){results.checks.push({name,passed:!!condition,details});assert.ok(condition,name+(details?' '+JSON.stringify(details):''));}
function start(script,env={}){const child=spawn(process.execPath,[script],{env:{...process.env,...env},stdio:['ignore','pipe','pipe']});children.push(child);return child;}
async function wait(url){for(let i=0;i<40;i++){try{const r=await fetch(url);if(r.ok)return;}catch{}await new Promise(r=>setTimeout(r,250));}throw Error('Server not ready: '+url);}
(async()=>{
 let browser;
 try{
  start('scripts/preview.mjs',{PREVIEW_PORT:'3410'});start('scripts/mock-enquiries.mjs');await wait(base);
  browser=await chromium.launch({headless:true,args:['--remote-debugging-port=3411']});
  const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
  const page=await context.newPage();const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  const routes=['/','/services/','/services/web-mobile-development/','/services/cloud-platforms-devops/','/services/data-engineering-ai/','/work/','/work/invoicing-platform/','/work/typing-practice/','/tools/','/privacy/'];
  for(const route of routes){
   const response=await page.goto(base+route);await page.waitForLoadState('networkidle');
   await page.locator('img').evaluateAll(async imgs => {for(const img of imgs)img.loading='eager';await Promise.all(imgs.map(img=>img.decode().catch(()=>{})));});
   check('Route '+route,response.status()===200);
   check('One H1 '+route,await page.locator('h1').count()===1);
   check('Canonical '+route,await page.locator('link[rel=canonical]').getAttribute('href')==='https://bijasa.com'+route);
   check('Images loaded '+route,await page.locator('img').evaluateAll(imgs=>imgs.every(i=>i.complete && i.naturalWidth>0)));
   const broken=await page.locator('a[href]').evaluateAll(as=>as.map(a=>a.getAttribute('href')).filter(h=>h.startsWith('#')&&!document.getElementById(h.slice(1))));check('Local anchors '+route,broken.length===0,broken);
   const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
   results.accessibility.push({route,violations:axe.violations.map(v=>({id:v.id,impact:v.impact,description:v.description,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))});
   if(axe.violations.length)results.limitations.push('Accessibility violations on '+route);
   for(const width of [320,375,768,1024,1440,1920]){await page.setViewportSize({width,height:1000});const dims=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth}));results.responsive.push({route,...dims});check('No overflow '+route+' @'+width,dims.scroll<=width+1,dims);}
   await page.setViewportSize({width:1440,height:1000});
  }
  await page.goto(base);await page.waitForLoadState('networkidle');
  check('No analytics requests on local host',await page.locator('script[src*="googletagmanager"]').count()===0);
  await page.getByRole('button',{name:'Decline',exact:true}).click();
  await page.screenshot({path:path.join(dir,'desktop-hero-1440.png')});
  await page.screenshot({path:path.join(dir,'desktop-1440.png'),fullPage:true});
  await page.setViewportSize({width:375,height:812});await page.screenshot({path:path.join(dir,'mobile-hero-375.png')});await page.screenshot({path:path.join(dir,'mobile-375.png'),fullPage:true});
  const menu=page.locator('.menu-toggle');await menu.click();check('Mobile menu opens',await menu.getAttribute('aria-expanded')==='true');
  await page.keyboard.press('Escape');check('Escape closes menu and returns focus',await menu.getAttribute('aria-expanded')==='false' && await menu.evaluate(e=>e===document.activeElement));
  await menu.click();await page.getByRole('navigation',{name:'Main',exact:true}).getByRole('link',{name:'Industries',exact:true}).click();check('Mobile navigation closes after link',await menu.getAttribute('aria-expanded')==='false');
  await page.setViewportSize({width:1440,height:1000});
  const form=page.getByRole('form',{name:'Project enquiry'});
  await form.getByRole('button',{name:'Test Local Submission'}).click();check('Invalid form focuses name',await page.locator('#cf-name').evaluate(e=>e===document.activeElement));
  await page.locator('#cf-name').fill('Local QA');await page.locator('#cf-email').fill('review@example.com');await page.locator('#cf-projectType').selectOption('Other / Custom Requirement');await page.locator('#cf-message').fill('Synthetic local review only. Please do not send email.');await page.locator('#cf-consent').check();
  // Route stub verifies error and loading UI without touching any live service.
  await page.route('http://127.0.0.1:3401/enquiries',async route=>{await new Promise(r=>setTimeout(r,300));await route.fulfill({status:route.request().method()==='OPTIONS'?204:500,headers:{'Access-Control-Allow-Origin':base,'Access-Control-Allow-Methods':'POST, OPTIONS','Access-Control-Allow-Headers':'Content-Type'},contentType:'application/json',body:route.request().method()==='OPTIONS'?'':'{"accepted":false}'});});
  await form.getByRole('button',{name:'Test Local Submission'}).click();check('Loading disables submit',await form.getByRole('button',{name:'Submitting…'}).isDisabled());
  await page.getByRole('status').filter({hasText:'could not be accepted'}).waitFor();check('Failed submission retains entries',await page.locator('#cf-name').inputValue()==='Local QA');
  await page.unroute('http://127.0.0.1:3401/enquiries');
  await form.getByRole('button',{name:'Test Local Submission'}).click();await page.getByRole('status').filter({hasText:'Local test accepted'}).waitFor();check('Mock success explicitly excludes delivery',await page.getByRole('status').filter({hasText:'Nothing was sent'}).isVisible());
  await page.locator('#cf-message').fill('Synthetic second local review for email fallback.');
  await page.locator('.form-alternative summary').click();await page.getByRole('button',{name:'Prepare Email Draft'}).click();
  check('Email draft remains available',await page.getByRole('link',{name:'Gmail',exact:true}).isVisible());
  check('Safe social links',await page.locator('.social-links a').evaluateAll(as=>as.length>0&&as.every(a=>a.target==='_blank'&&a.rel.includes('noopener')&&a.rel.includes('noreferrer')&&!!a.getAttribute('aria-label'))));
  await page.locator('#contact').screenshot({path:path.join(dir,'contact-desktop.png')});
  check('No browser exceptions',errors.length===0,errors);
  for(const url of ['https://invoicing.bijasa.com/','https://typing.bijasa.com/','https://github.com/bijasa']){try{const response=await context.request.get(url,{timeout:15000});results.external.push({url,status:response.status()});}catch(e){results.external.push({url,error:e.message});}}
  try{const before=await context.newPage();await before.goto('https://bijasa.com/',{timeout:15000});await before.screenshot({path:path.join(dir,'before-live-desktop.png'),fullPage:true});await before.close();}catch(e){results.limitations.push('Before/live screenshot unavailable: '+e.message);}
  try {
   const { default:lighthouse } = await import(require.resolve('lighthouse'));
   const audit = await lighthouse(base, { port:3411, onlyCategories:['performance','accessibility','best-practices','seo'], output:['json','html'], logLevel:'error' });
   fs.writeFileSync(path.join(dir,'lighthouse-mobile.json'),audit.report[0]);
   fs.writeFileSync(path.join(dir,'lighthouse-mobile.html'),audit.report[1]);
   results.lighthouse={mode:'Default mobile simulated throttling, single local production-export run',scores:Object.fromEntries(Object.entries(audit.lhr.categories).map(([key,value])=>[key,Math.round(value.score*100)]))};
   console.log('Lighthouse:',results.lighthouse.scores);
  } catch(e) { results.limitations.push('Lighthouse unavailable: '+e.message); }
  const violations=results.accessibility.reduce((sum,a)=>sum+a.violations.length,0);check('No automated WCAG A/AA violations',violations===0,{violations});
 }catch(error){results.failure=error.stack;process.exitCode=1;console.error(error.message);}
 finally{if(browser)await browser.close();for(const child of children)child.kill();fs.writeFileSync(path.join(dir,'qa-results.json'),JSON.stringify(results,null,2));console.log('QA results and screenshots: '+dir);console.log(results.checks.filter(c=>c.passed).length+' checks passed');}
})();
