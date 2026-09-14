(()=>{
'use strict';
if(window.__ATELIER_DIRECT_LOADED__) return;
window.__ATELIER_DIRECT_LOADED__=true;
const KEY='atelier-one-theme';
let mode=localStorage.getItem(KEY)||'dark';
function addStyle(){
  if(document.getElementById('atelier-direct-style')) return;
  const s=document.createElement('style');
  s.id='atelier-direct-style';
  s.textContent=`
  @media(max-width:720px){.mobile-nav,.room,.topbar,.panel,.office-panel,.stats{-webkit-backdrop-filter:none!important;backdrop-filter:none!important}}
  #atelier-menu-btn{margin-left:8px;flex:0 0 36px;width:36px;height:36px;border:1px solid var(--line,#28394a);border-radius:12px;background:var(--panel,#111b27);display:grid;place-items:center;color:inherit;font-size:16px;line-height:1;padding:0}
  #atelier-menu{position:fixed;inset:0;z-index:9999;display:none;align-items:flex-end;justify-content:center;background:rgba(0,0,0,.38);padding:16px 16px calc(16px + env(safe-area-inset-bottom))}
  #atelier-menu.open{display:flex}
  #atelier-menu .sheet{width:min(480px,100%);background:#111923;border:1px solid #28394a;border-radius:22px;padding:14px;box-shadow:0 20px 60px rgba(0,0,0,.35)}
  #atelier-menu .sheet h3{margin:4px 4px 12px;font-size:16px}
  #atelier-menu .sheet button,#atelier-menu .sheet a{width:100%;display:flex;align-items:center;justify-content:space-between;padding:14px 15px;margin:8px 0;border-radius:14px;border:1px solid #2a3b4c;background:#162332;color:#edf4fa;text-decoration:none;font-size:15px}
  #atelier-menu .sheet .close{justify-content:center;background:transparent}
  html[data-at-theme="light"] body{background:#f5f5f7!important;color:#1d1d1f!important}
  html[data-at-theme="light"]{--bg:#f5f5f7!important;--panel:#fff!important;--line:#d6d6d8!important;--muted:#6e6e73!important;--blue:#0071e3!important}
  html[data-at-theme="light"] .topbar,html[data-at-theme="light"] .panel,html[data-at-theme="light"] .office-panel,html[data-at-theme="light"] .stats,html[data-at-theme="light"] .mobile-nav,html[data-at-theme="light"] .full-panel,html[data-at-theme="light"] .kanban>section{background:#fff!important;border-color:#d6d6d8!important;color:#1d1d1f!important}
  html[data-at-theme="light"] .secondary,html[data-at-theme="light"] input,html[data-at-theme="light"] select,html[data-at-theme="light"] textarea{background:#fff!important;color:#1d1d1f!important;border-color:#c9c9cc!important}
  html[data-at-theme="light"] .mobile-nav button,html[data-at-theme="light"] .caption,html[data-at-theme="light"] .subtle,html[data-at-theme="light"] .page-heading p,html[data-at-theme="light"] small{color:#6e6e73!important}
  html[data-at-theme="light"] .primary{background:#0071e3!important;color:#fff!important}
  html[data-at-theme="light"] #atelier-menu .sheet{background:#fff;border-color:#d6d6d8;color:#1d1d1f}
  html[data-at-theme="light"] #atelier-menu .sheet button,html[data-at-theme="light"] #atelier-menu .sheet a{background:#f5f5f7;border-color:#d6d6d8;color:#1d1d1f}
  `;
  document.head.appendChild(s);
}
function applyTheme(next){mode=next;localStorage.setItem(KEY,mode);document.documentElement.dataset.atTheme=mode==='light'?'light':'dark';}
function install(){
  const top=document.querySelector('.topbar');
  if(!top||document.getElementById('atelier-menu-btn')) return !!top;
  addStyle();applyTheme(mode);
  const btn=document.createElement('button');
  btn.id='atelier-menu-btn';btn.type='button';btn.setAttribute('aria-label','Atelier One メニュー');btn.textContent='•••';
  top.appendChild(btn);
  const menu=document.createElement('div');
  menu.id='atelier-menu';
  menu.innerHTML='<div class="sheet"><h3>Atelier One</h3><a href="./control.html">同期・ライブラリ・GitHub</a><button type="button" data-theme="dark"><span>ダークテーマ</span><span>●</span></button><button type="button" data-theme="light"><span>ホワイトテーマ</span><span>○</span></button><button type="button" class="close">閉じる</button></div>';
  document.body.appendChild(menu);
  btn.addEventListener('click',()=>menu.classList.add('open'));
  menu.addEventListener('click',e=>{if(e.target===menu||e.target.closest('.close'))menu.classList.remove('open');const t=e.target.closest('[data-theme]');if(t){applyTheme(t.dataset.theme);menu.classList.remove('open');}});
  return true;
}
let tries=0;const timer=setInterval(()=>{tries++;if(install()||tries>=40)clearInterval(timer)},100);
addEventListener('DOMContentLoaded',install,{once:true});
})();