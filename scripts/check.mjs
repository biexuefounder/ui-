import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
const context={window:{}};vm.runInNewContext(fs.readFileSync('dist/data.js','utf8'),context);
const cases=context.window.ATLAS_CASES;assert(cases.length>0);const ids=new Set();
for(const c of cases){assert(!ids.has(c.id),'duplicate case');ids.add(c.id);for(const key of ['id','name','title','summary','date'])assert(c[key],key);assert(c.sources.length>=3);assert(c.tags.length);assert(c.sections.length>=6);const sections=new Set();for(const s of c.sections){assert(!sections.has(s.id),'duplicate section');sections.add(s.id);assert(s.title&&s.html);for(const m of s.html.matchAll(/(?:src|href)="(demos\/[^"#]+)"/g))assert(fs.existsSync('dist/'+m[1]),m[1]);}for(const [,url] of c.sources)assert(new URL(url).protocol==='https:');}
for(const p of ['dist/app.js','dist/data.js','dist/demos/navigation.js'])execFileSync(process.execPath,['--check',p]);
for(const file of ['style.css','app.js','data.js'])assert(fs.existsSync('dist/'+file));
console.log(`PASS: ${cases.length} cases; unique IDs, required fields, local demo paths, source URL formats, JS syntax. External reachability and browser behavior require separate verification.`);
