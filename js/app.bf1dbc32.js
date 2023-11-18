(()=>{"use strict";var e={8004:(e,t,n)=>{var a=n(1957),o=n(1947),r=n(499),i=n(9835);function s(e,t,n,a,o,r){const s=(0,i.up)("router-view");return(0,i.wg)(),(0,i.j4)(s)}var l=n(8968);const c=(0,i.aZ)({name:"App",setup(){const e=(0,l.n)(),t=()=>e.fetchBrazilianStates();(0,i.bv)((async()=>{await t()}))}});var d=n(1639);const m=(0,d.Z)(c,[["render",s]]),u=m;var h=n(3340),p=n(1809),f=n(9302),b=n(1149),g=n(8957);const y=(0,h.h)((()=>{const e=(0,p.WB)();return e.use((()=>({quasar:(0,f.Z)(),dialogConfirm:(0,b.Z)().dialogConfirm,notifyError:(0,g.Z)().notifyError,notifySuccess:(0,g.Z)().notifySuccess}))),e}));var v=n(8339);const w=[{path:"/:status?",name:"landing",component:()=>Promise.all([n.e(736),n.e(64),n.e(193)]).then(n.bind(n,2145))},{path:"/termos",name:"termos",component:()=>Promise.all([n.e(736),n.e(64),n.e(602)]).then(n.bind(n,5145))},{path:"/privacidade",name:"privacidade",component:()=>Promise.all([n.e(736),n.e(64),n.e(75)]).then(n.bind(n,9710))},{path:"/login",component:()=>Promise.all([n.e(736),n.e(64),n.e(630)]).then(n.bind(n,7630)),children:[{path:"",name:"login",component:()=>Promise.all([n.e(736),n.e(64),n.e(482)]).then(n.bind(n,2482)),meta:{title:"Login"}},{path:"cadastro",name:"register",component:()=>Promise.all([n.e(736),n.e(64),n.e(511)]).then(n.bind(n,6511)),meta:{title:"Cadastre-se"}},{path:"corfirmar-email",name:"confirmation",component:()=>Promise.all([n.e(736),n.e(796)]).then(n.bind(n,9796)),meta:{title:"Aguardando confirmação do e-mail"}},{path:"recuperar-senha",name:"forgot-password",component:()=>Promise.all([n.e(736),n.e(64),n.e(441)]).then(n.bind(n,2441)),meta:{title:"Recuperação de Senha"}},{path:"nova-senha",name:"reset-password",component:()=>Promise.all([n.e(736),n.e(64),n.e(110)]).then(n.bind(n,4110)),meta:{title:"Alteração de Senha"}}]},{path:"/app",name:"app",component:()=>Promise.all([n.e(736),n.e(64),n.e(427)]).then(n.bind(n,7068)),children:[{path:"perfil",name:"profile",component:()=>Promise.all([n.e(736),n.e(64),n.e(912)]).then(n.bind(n,6912))},{path:"integracoes",name:"integrations",component:()=>Promise.all([n.e(736),n.e(64),n.e(426)]).then(n.bind(n,3426))},{path:"memed",name:"memed",component:()=>Promise.all([n.e(736),n.e(64),n.e(30)]).then(n.bind(n,4030))},{path:"dashboard",name:"dashboard",component:()=>Promise.all([n.e(736),n.e(64),n.e(938)]).then(n.bind(n,5678))},{path:"agenda",name:"appointments",component:()=>Promise.all([n.e(736),n.e(64),n.e(669)]).then(n.bind(n,5669))},{path:"atendimentos",name:"treatments",component:()=>Promise.all([n.e(736),n.e(64),n.e(460)]).then(n.bind(n,2414))},{path:"cadastro-atendimento/:id?",name:"form-treatment",component:()=>Promise.all([n.e(736),n.e(64),n.e(263)]).then(n.bind(n,9263))},{path:"cadastro-compromisso/:id?",name:"form-appointment",component:()=>Promise.all([n.e(736),n.e(64),n.e(951)]).then(n.bind(n,5951))},{path:"pacientes",name:"patients",component:()=>Promise.all([n.e(736),n.e(64),n.e(711)]).then(n.bind(n,7030))},{path:"cadastro-paciente/:id?",name:"form-patient",component:()=>Promise.all([n.e(736),n.e(64),n.e(601)]).then(n.bind(n,1601))},{path:"medicos",name:"doctors",component:()=>Promise.all([n.e(736),n.e(64),n.e(762)]).then(n.bind(n,6386))},{path:"cadastro-medico/:id?",name:"form-doctor",component:()=>Promise.all([n.e(736),n.e(64),n.e(134)]).then(n.bind(n,1134))},{path:"financas",name:"finances",component:()=>Promise.all([n.e(736),n.e(64),n.e(288)]).then(n.bind(n,8943))},{path:"cadastro-financa/:id?",name:"form-finance",component:()=>Promise.all([n.e(736),n.e(64),n.e(961)]).then(n.bind(n,5961))},{path:"assinatura",name:"subscription",component:()=>Promise.all([n.e(736),n.e(64),n.e(471)]).then(n.bind(n,193))}],meta:{requiresAuth:!0}},{path:"/main",component:()=>Promise.all([n.e(736),n.e(64),n.e(427)]).then(n.bind(n,7068)),children:[]},{path:"/:catchAll(.*)*",name:"not-found",component:()=>Promise.all([n.e(736),n.e(190)]).then(n.bind(n,5190))}],P=w;var O=n(9355);const k=(0,h.BC)((()=>{const e=v.PO,t=(0,v.p7)({scrollBehavior:e=>e.hash?{el:e.hash,behavior:"smooth"}:{left:0,top:0},history:e("/"),routes:P});return t.beforeEach((e=>{const{isLoggedIn:t}=(0,O.Z)();if(console.log(t(),e),e.hash.includes("#error=unauthorized_client"))return{name:"login"};if(e.hash.includes("#error"))return{name:"not-found"};if(e.hash.includes("type=recovery")&&"reset-password"!==e.name){const t=e.hash.split("&")[0],n=t.replace("#access_token=","");return{name:"reset-password",query:{token:n}}}return Object.keys(e.query).includes("fromEmail")?{name:"login"}:!(!t()&&e.meta.requiresAuth&&!Object.keys(e.query).includes("fromEmail"))||{name:"login"}})),t}));async function C(e,t){const n=e(u);n.use(o.Z,t);const a="function"===typeof y?await y({}):y;n.use(a);const i=(0,r.Xl)("function"===typeof k?await k({store:a}):k);return a.use((({store:e})=>{e.router=i})),{app:n,store:a,router:i}}var E=n(9719),j=n(6827),Z=n(1530),S=n(6950);const A={config:{loading:!0,brand:{primary:"#0E7BA8",secondary:"#3DCDD4",accent:"#AC5EB0",dark:"#000000",positive:"#54BD89",negative:"#E2183D",warning:"#F9971E",info:"#223CBB"}},lang:E.Z,plugins:{Notify:j.Z,Dialog:Z.Z,Loading:S.Z}};async function I({app:e,router:t,store:n}){e.use(t),e.mount("#q-app")}C(a.ri,A).then(I)},1709:(e,t,n)=>{n.d(t,{Z:()=>l});var a=n(5109),o=n(9355);const r="https://jtejpujfkaxyzdsvyben.supabase.co",i="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0ZWpwdWpma2F4eXpkc3Z5YmVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjA0Mzc0NzQsImV4cCI6MTk3NjAxMzQ3NH0.ntdTBpxTiQ1gDHCZwAcLSxcdYfLotIlcwzVq4oZHaI4",s=(0,a.eI)(r,i);function l(){return{supabase:s}}s.auth.onAuthStateChange(((e,t)=>{const{userAuth:n}=(0,o.Z)();n.value=t?.user||null}))},9355:(e,t,n)=>{n.d(t,{Z:()=>i});var a=n(499),o=n(1709);const r=(0,a.iH)(null);function i(){const{supabase:e}=(0,o.Z)(),t=r?.value?.user_metadata.role||"",n=()=>!!r.value,a=async({email:t,password:n,...a})=>{const{user:o,error:r}=await e.auth.signUp({email:t,password:n},{data:a,redirectTo:"https://www.healtheasy.com.br?fromEmail=emailVerified"});if(r)throw r;return o},i=async({email:t,password:n})=>{const{user:a,error:o}=await e.auth.signIn({email:t,password:n});if(console.warn("TODO: remover o link https://www.healtheasy.com.br?fromEmail=emailVerified"),o)throw o;return a},s=async t=>{const{user:n,error:a}=await e.auth.signIn(t);if(a)throw a;return n},l=async()=>{const{error:t}=await e.auth.signOut();if(t)throw t},c=async t=>{const{user:n,error:a}=await e.auth.update(t);if(a)throw a;return n},d=async t=>{const{user:n,error:a}=await e.auth.api.resetPasswordForEmail(t,{redirectTo:"https://www.healtheasy.com.br?fromEmail=resetPassword"});if(a)throw a;return n},m=async(t,n)=>{const{user:a,error:o}=await e.auth.api.updateUser(t,{password:n});if(o)throw o;return a};return{userAuth:r,userAuthRole:t,login:i,loginWithSocialProvider:s,logout:l,isLoggedIn:n,register:a,update:c,sendPasswordResetEmail:d,resetPassword:m}}},1149:(e,t,n)=>{n.d(t,{Z:()=>o});var a=n(9302);function o(){const e=(0,a.Z)(),t=(t,n,a)=>{e.dialog({title:t,message:n}).onOk((()=>{a&&a()}))},n=(t,n,a,o)=>{e.dialog({title:t,message:n,ok:{label:"Sim",color:"positive"},cancel:{label:"Cancelar",color:"negative",flat:!0,outline:!0},persistent:!0,html:!0}).onOk((()=>{a&&a()})).onCancel((()=>{o&&o()}))};return{dialogDefault:t,dialogConfirm:n}}},8957:(e,t,n)=>{n.d(t,{Z:()=>o});var a=n(9302);function o(){const e=(0,a.Z)();e.notify.setDefaults({position:"bottom",timeout:2e3});const t=t=>{e.notify({color:"gray",message:t||"",html:!0})},n=t=>{e.notify({color:"info",message:t||"",html:!0})},o=t=>{e.notify({type:"positive",message:t||"Ok!",html:!0})},r=t=>{e.notify({type:"negative",message:t||"Falhou!",html:!0})},i=(t,n)=>{e.notify({type:t,message:n,timeout:0,html:!0,actions:[{icon:"close",color:"white"}]})};return{notifyDefault:t,notifyInfo:n,notifySuccess:o,notifyError:r,unclosebleNotify:i}}},8968:(e,t,n)=>{n.d(t,{n:()=>o});var a=n(1809);const o=(0,a.Q_)({id:"brazilianStates",state:()=>({states:null}),getters:{getSelectedState:e=>t=>e?.states?e.states.find((({nome:e})=>e===t)):null},actions:{async fetchBrazilianStates(){try{const e=await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome").then((e=>e.ok?e.json():[]));e&&(this.states=e)}catch(e){this.notifyError(e.message),this.states=null}}}})}},t={};function n(a){var o=t[a];if(void 0!==o)return o.exports;var r=t[a]={exports:{}};return e[a].call(r.exports,r,r.exports,n),r.exports}n.m=e,(()=>{var e=[];n.O=(t,a,o,r)=>{if(!a){var i=1/0;for(d=0;d<e.length;d++){for(var[a,o,r]=e[d],s=!0,l=0;l<a.length;l++)(!1&r||i>=r)&&Object.keys(n.O).every((e=>n.O[e](a[l])))?a.splice(l--,1):(s=!1,r<i&&(i=r));if(s){e.splice(d--,1);var c=o();void 0!==c&&(t=c)}}return t}r=r||0;for(var d=e.length;d>0&&e[d-1][2]>r;d--)e[d]=e[d-1];e[d]=[a,o,r]}})(),(()=>{n.n=e=>{var t=e&&e.__esModule?()=>e["default"]:()=>e;return n.d(t,{a:t}),t}})(),(()=>{var e,t=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__;n.t=function(a,o){if(1&o&&(a=this(a)),8&o)return a;if("object"===typeof a&&a){if(4&o&&a.__esModule)return a;if(16&o&&"function"===typeof a.then)return a}var r=Object.create(null);n.r(r);var i={};e=e||[null,t({}),t([]),t(t)];for(var s=2&o&&a;"object"==typeof s&&!~e.indexOf(s);s=t(s))Object.getOwnPropertyNames(s).forEach((e=>i[e]=()=>a[e]));return i["default"]=()=>a,n.d(r,i),r}})(),(()=>{n.d=(e,t)=>{for(var a in t)n.o(t,a)&&!n.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})}})(),(()=>{n.f={},n.e=e=>Promise.all(Object.keys(n.f).reduce(((t,a)=>(n.f[a](e,t),t)),[]))})(),(()=>{n.u=e=>"js/"+(64===e?"chunk-common":e)+"."+{30:"185f228a",64:"a0b1bba8",75:"015dd59c",110:"fd6d27a7",134:"78e339c3",190:"c84ad9ff",193:"8d36f25e",263:"009de095",288:"74b8c341",426:"092591ad",427:"8798e9a8",441:"d3b737f8",460:"3d1a8878",471:"737b85d1",482:"b52ff2a1",511:"aec7aa8f",601:"682d61cc",602:"7c28ae3a",630:"c4bf051a",669:"a8fe09dc",711:"8957fa66",762:"6e5e5b99",796:"59d64902",912:"b6ae40ce",938:"841c3e04",951:"d4b19e6a",961:"8612e957"}[e]+".js"})(),(()=>{n.miniCssF=e=>"css/"+e+"."+{75:"fa4a749f",134:"edcf752f",193:"159cb657",263:"435548ce",288:"9f7d14ff",426:"6bc706f8",427:"7cc60e4c",460:"54da6f9d",471:"7b8722f7",601:"74e0f52f",602:"377d7be1",630:"4b321e71",669:"bacb0d84",711:"54da6f9d",762:"54da6f9d",796:"8a8c3d03",912:"5537622a",938:"6f73f46f",951:"51566187",961:"eb186a23"}[e]+".css"})(),(()=>{n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()})(),(()=>{n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t)})(),(()=>{var e={},t="healtheasy-frontend:";n.l=(a,o,r,i)=>{if(e[a])e[a].push(o);else{var s,l;if(void 0!==r)for(var c=document.getElementsByTagName("script"),d=0;d<c.length;d++){var m=c[d];if(m.getAttribute("src")==a||m.getAttribute("data-webpack")==t+r){s=m;break}}s||(l=!0,s=document.createElement("script"),s.charset="utf-8",s.timeout=120,n.nc&&s.setAttribute("nonce",n.nc),s.setAttribute("data-webpack",t+r),s.src=a),e[a]=[o];var u=(t,n)=>{s.onerror=s.onload=null,clearTimeout(h);var o=e[a];if(delete e[a],s.parentNode&&s.parentNode.removeChild(s),o&&o.forEach((e=>e(n))),t)return t(n)},h=setTimeout(u.bind(null,void 0,{type:"timeout",target:s}),12e4);s.onerror=u.bind(null,s.onerror),s.onload=u.bind(null,s.onload),l&&document.head.appendChild(s)}}})(),(()=>{n.r=e=>{"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}})(),(()=>{n.p="/"})(),(()=>{if("undefined"!==typeof document){var e=(e,t,n,a,o)=>{var r=document.createElement("link");r.rel="stylesheet",r.type="text/css";var i=n=>{if(r.onerror=r.onload=null,"load"===n.type)a();else{var i=n&&("load"===n.type?"missing":n.type),s=n&&n.target&&n.target.href||t,l=new Error("Loading CSS chunk "+e+" failed.\n("+s+")");l.code="CSS_CHUNK_LOAD_FAILED",l.type=i,l.request=s,r.parentNode.removeChild(r),o(l)}};return r.onerror=r.onload=i,r.href=t,n?n.parentNode.insertBefore(r,n.nextSibling):document.head.appendChild(r),r},t=(e,t)=>{for(var n=document.getElementsByTagName("link"),a=0;a<n.length;a++){var o=n[a],r=o.getAttribute("data-href")||o.getAttribute("href");if("stylesheet"===o.rel&&(r===e||r===t))return o}var i=document.getElementsByTagName("style");for(a=0;a<i.length;a++){o=i[a],r=o.getAttribute("data-href");if(r===e||r===t)return o}},a=a=>new Promise(((o,r)=>{var i=n.miniCssF(a),s=n.p+i;if(t(i,s))return o();e(a,s,null,o,r)})),o={143:0};n.f.miniCss=(e,t)=>{var n={75:1,134:1,193:1,263:1,288:1,426:1,427:1,460:1,471:1,601:1,602:1,630:1,669:1,711:1,762:1,796:1,912:1,938:1,951:1,961:1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=a(e).then((()=>{o[e]=0}),(t=>{throw delete o[e],t})))}}})(),(()=>{var e={143:0};n.f.j=(t,a)=>{var o=n.o(e,t)?e[t]:void 0;if(0!==o)if(o)a.push(o[2]);else if(938!=t){var r=new Promise(((n,a)=>o=e[t]=[n,a]));a.push(o[2]=r);var i=n.p+n.u(t),s=new Error,l=a=>{if(n.o(e,t)&&(o=e[t],0!==o&&(e[t]=void 0),o)){var r=a&&("load"===a.type?"missing":a.type),i=a&&a.target&&a.target.src;s.message="Loading chunk "+t+" failed.\n("+r+": "+i+")",s.name="ChunkLoadError",s.type=r,s.request=i,o[1](s)}};n.l(i,l,"chunk-"+t,t)}else e[t]=0},n.O.j=t=>0===e[t];var t=(t,a)=>{var o,r,[i,s,l]=a,c=0;if(i.some((t=>0!==e[t]))){for(o in s)n.o(s,o)&&(n.m[o]=s[o]);if(l)var d=l(n)}for(t&&t(a);c<i.length;c++)r=i[c],n.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return n.O(d)},a=globalThis["webpackChunkhealtheasy_frontend"]=globalThis["webpackChunkhealtheasy_frontend"]||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))})();var a=n.O(void 0,[736],(()=>n(8004)));a=n.O(a)})();