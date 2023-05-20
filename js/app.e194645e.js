(()=>{"use strict";var e={3408:(e,t,n)=>{var a=n(1957),o=n(1947),r=n(499),i=n(9835);function s(e,t,n,a,o,r){const s=(0,i.up)("router-view");return(0,i.wg)(),(0,i.j4)(s)}var l=n(8968);const c=(0,i.aZ)({name:"App",setup(){const e=(0,l.n)(),t=()=>e.fetchBrazilianStates();(0,i.bv)((async()=>{await t()}))}});var d=n(1639);const m=(0,d.Z)(c,[["render",s]]),u=m;var h=n(3340),p=n(1809),f=n(9302),b=n(1149),g=n(8957);const v=(0,h.h)((()=>{const e=(0,p.WB)();return e.use((()=>({quasar:(0,f.Z)(),dialogConfirm:(0,b.Z)().dialogConfirm,notifyError:(0,g.Z)().notifyError,notifySuccess:(0,g.Z)().notifySuccess}))),e}));n(6727),n(8964);var y=n(8339);n(702);const w=[{path:"/:status?",name:"landing",component:()=>Promise.all([n.e(736),n.e(64),n.e(783)]).then(n.bind(n,4741))},{path:"/termos",name:"termos",component:()=>Promise.all([n.e(736),n.e(64),n.e(8)]).then(n.bind(n,6584))},{path:"/privacidade",name:"privacidade",component:()=>Promise.all([n.e(736),n.e(64),n.e(33)]).then(n.bind(n,5415))},{path:"/login",component:()=>Promise.all([n.e(736),n.e(64),n.e(767)]).then(n.bind(n,4767)),children:[{path:"",name:"login",component:()=>Promise.all([n.e(736),n.e(64),n.e(43)]).then(n.bind(n,7043)),meta:{title:"Login"}},{path:"cadastro",name:"register",component:()=>Promise.all([n.e(736),n.e(64),n.e(853)]).then(n.bind(n,6853)),meta:{title:"Cadastre-se"}},{path:"corfirmar-email",name:"confirmation",component:()=>Promise.all([n.e(736),n.e(491)]).then(n.bind(n,3491)),meta:{title:"Aguardando confirmação do e-mail"}},{path:"recuperar-senha",name:"forgot-password",component:()=>Promise.all([n.e(736),n.e(64),n.e(824)]).then(n.bind(n,8824)),meta:{title:"Recuperação de Senha"}},{path:"nova-senha",name:"reset-password",component:()=>Promise.all([n.e(736),n.e(64),n.e(227)]).then(n.bind(n,5227)),meta:{title:"Alteração de Senha"}}]},{path:"/app",name:"app",component:()=>Promise.all([n.e(736),n.e(64),n.e(661)]).then(n.bind(n,1134)),children:[{path:"perfil",name:"profile",component:()=>Promise.all([n.e(736),n.e(64),n.e(442)]).then(n.bind(n,1442))},{path:"integracoes",name:"integrations",component:()=>Promise.all([n.e(736),n.e(64),n.e(877)]).then(n.bind(n,4877))},{path:"memed",name:"memed",component:()=>Promise.all([n.e(736),n.e(64),n.e(599)]).then(n.bind(n,2599))},{path:"dashboard",name:"dashboard",component:()=>Promise.all([n.e(736),n.e(64),n.e(938)]).then(n.bind(n,20))},{path:"agenda",name:"appointments",component:()=>Promise.all([n.e(736),n.e(64),n.e(914)]).then(n.bind(n,7914))},{path:"atendimentos",name:"treatments",component:()=>Promise.all([n.e(736),n.e(64),n.e(943)]).then(n.bind(n,6705))},{path:"cadastro-atendimento/:id?",name:"form-treatment",component:()=>Promise.all([n.e(736),n.e(64),n.e(474)]).then(n.bind(n,9474))},{path:"cadastro-compromisso/:id?",name:"form-appointment",component:()=>Promise.all([n.e(736),n.e(64),n.e(245)]).then(n.bind(n,8245))},{path:"pacientes",name:"patients",component:()=>Promise.all([n.e(736),n.e(64),n.e(351)]).then(n.bind(n,2361))},{path:"cadastro-paciente/:id?",name:"form-patient",component:()=>Promise.all([n.e(736),n.e(64),n.e(911)]).then(n.bind(n,5911))},{path:"medicos",name:"doctors",component:()=>Promise.all([n.e(736),n.e(64),n.e(892)]).then(n.bind(n,7561))},{path:"cadastro-medico/:id?",name:"form-doctor",component:()=>Promise.all([n.e(736),n.e(64),n.e(721)]).then(n.bind(n,721))},{path:"financas",name:"finances",component:()=>Promise.all([n.e(736),n.e(64),n.e(295)]).then(n.bind(n,5572))},{path:"cadastro-financa/:id?",name:"form-finance",component:()=>Promise.all([n.e(736),n.e(64),n.e(134)]).then(n.bind(n,7134))},{path:"assinatura",name:"subscription",component:()=>Promise.all([n.e(736),n.e(64),n.e(457)]).then(n.bind(n,4750))}],meta:{requiresAuth:!0}},{path:"/main",component:()=>Promise.all([n.e(736),n.e(64),n.e(661)]).then(n.bind(n,1134)),children:[]},{path:"/:catchAll(.*)*",name:"not-found",component:()=>Promise.all([n.e(736),n.e(440)]).then(n.bind(n,877))}],P=w;var O=n(9355);const k=(0,h.BC)((()=>{const e=y.PO,t=(0,y.p7)({scrollBehavior:e=>e.hash?{el:e.hash,behavior:"smooth"}:{left:0,top:0},history:e("/"),routes:P});return t.beforeEach((e=>{const{isLoggedIn:t}=(0,O.Z)();if(console.log(t(),e),e.hash.includes("#error=unauthorized_client"))return{name:"login"};if(e.hash.includes("#error"))return{name:"not-found"};if(e.hash.includes("type=recovery")&&"reset-password"!==e.name){const t=e.hash.split("&")[0],n=t.replace("#access_token=","");return{name:"reset-password",query:{token:n}}}return Object.keys(e.query).includes("fromEmail")?{name:"login"}:!(!t()&&e.meta.requiresAuth&&!Object.keys(e.query).includes("fromEmail"))||{name:"login"}})),t}));async function C(e,t){const n=e(u);n.use(o.Z,t);const a="function"===typeof v?await v({}):v;n.use(a);const i=(0,r.Xl)("function"===typeof k?await k({store:a}):k);return a.use((({store:e})=>{e.router=i})),{app:n,store:a,router:i}}var E=n(9719),j=n(6827),Z=n(1530),S=n(6950);const A={config:{loading:!0,brand:{primary:"#0E7BA8",secondary:"#3DCDD4",accent:"#AC5EB0",dark:"#000000",positive:"#54BD89",negative:"#E2183D",warning:"#F9971E",info:"#223CBB"}},lang:E.Z,plugins:{Notify:j.Z,Dialog:Z.Z,Loading:S.Z}};async function I({app:e,router:t,store:n}){e.use(t),e.mount("#q-app")}C(a.ri,A).then(I)},1709:(e,t,n)=>{n.d(t,{Z:()=>l});var a=n(5109),o=n(9355);const r="https://jtejpujfkaxyzdsvyben.supabase.co",i="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0ZWpwdWpma2F4eXpkc3Z5YmVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjA0Mzc0NzQsImV4cCI6MTk3NjAxMzQ3NH0.ntdTBpxTiQ1gDHCZwAcLSxcdYfLotIlcwzVq4oZHaI4",s=(0,a.eI)(r,i);function l(){return{supabase:s}}s.auth.onAuthStateChange(((e,t)=>{const{userAuth:n}=(0,o.Z)();n.value=(null===t||void 0===t?void 0:t.user)||null}))},9355:(e,t,n)=>{n.d(t,{Z:()=>i});var a=n(499),o=n(1709);const r=(0,a.iH)(null);function i(){var e;const{supabase:t}=(0,o.Z)(),n=(null===r||void 0===r||null===(e=r.value)||void 0===e?void 0:e.user_metadata.role)||"",a=()=>!!r.value,i=async({email:e,password:n,...a})=>{const{user:o,error:r}=await t.auth.signUp({email:e,password:n},{data:a,redirectTo:"https://www.healtheasy.com.br?fromEmail=emailVerified"});if(r)throw r;return o},s=async({email:e,password:n})=>{const{user:a,error:o}=await t.auth.signIn({email:e,password:n});if(console.warn("TODO: remover o link https://www.healtheasy.com.br?fromEmail=emailVerified"),o)throw o;return a},l=async e=>{const{user:n,error:a}=await t.auth.signIn(e);if(a)throw a;return n},c=async()=>{const{error:e}=await t.auth.signOut();if(e)throw e},d=async e=>{const{user:n,error:a}=await t.auth.update(e);if(a)throw a;return n},m=async e=>{const{user:n,error:a}=await t.auth.api.resetPasswordForEmail(e,{redirectTo:"https://www.healtheasy.com.br?fromEmail=resetPassword"});if(a)throw a;return n},u=async(e,n)=>{const{user:a,error:o}=await t.auth.api.updateUser(e,{password:n});if(o)throw o;return a};return{userAuth:r,userAuthRole:n,login:s,loginWithSocialProvider:l,logout:c,isLoggedIn:a,register:i,update:d,sendPasswordResetEmail:m,resetPassword:u}}},1149:(e,t,n)=>{n.d(t,{Z:()=>o});var a=n(9302);function o(){const e=(0,a.Z)(),t=(t,n,a)=>{e.dialog({title:t,message:n}).onOk((()=>{a&&a()}))},n=(t,n,a,o)=>{e.dialog({title:t,message:n,ok:{label:"Sim",color:"positive"},cancel:{label:"Cancelar",color:"negative",flat:!0,outline:!0},persistent:!0,html:!0}).onOk((()=>{a&&a()})).onCancel((()=>{o&&o()}))};return{dialogDefault:t,dialogConfirm:n}}},8957:(e,t,n)=>{n.d(t,{Z:()=>o});var a=n(9302);function o(){const e=(0,a.Z)();e.notify.setDefaults({position:"bottom",timeout:2e3});const t=t=>{e.notify({color:"gray",message:t||"",html:!0})},n=t=>{e.notify({color:"info",message:t||"",html:!0})},o=t=>{e.notify({type:"positive",message:t||"Ok!",html:!0})},r=t=>{e.notify({type:"negative",message:t||"Falhou!",html:!0})},i=(t,n)=>{e.notify({type:t,message:n,timeout:0,html:!0,actions:[{icon:"close",color:"white"}]})};return{notifyDefault:t,notifyInfo:n,notifySuccess:o,notifyError:r,unclosebleNotify:i}}},8968:(e,t,n)=>{n.d(t,{n:()=>o});var a=n(1809);const o=(0,a.Q_)({id:"brazilianStates",state:()=>({states:null}),getters:{getSelectedState:e=>t=>null!==e&&void 0!==e&&e.states?e.states.find((({nome:e})=>e===t)):null},actions:{async fetchBrazilianStates(){try{const e=await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome").then((e=>e.ok?e.json():[]));e&&(this.states=e)}catch(e){this.notifyError(e.message),this.states=null}}}})}},t={};function n(a){var o=t[a];if(void 0!==o)return o.exports;var r=t[a]={exports:{}};return e[a].call(r.exports,r,r.exports,n),r.exports}n.m=e,(()=>{var e=[];n.O=(t,a,o,r)=>{if(!a){var i=1/0;for(d=0;d<e.length;d++){for(var[a,o,r]=e[d],s=!0,l=0;l<a.length;l++)(!1&r||i>=r)&&Object.keys(n.O).every((e=>n.O[e](a[l])))?a.splice(l--,1):(s=!1,r<i&&(i=r));if(s){e.splice(d--,1);var c=o();void 0!==c&&(t=c)}}return t}r=r||0;for(var d=e.length;d>0&&e[d-1][2]>r;d--)e[d]=e[d-1];e[d]=[a,o,r]}})(),(()=>{n.n=e=>{var t=e&&e.__esModule?()=>e["default"]:()=>e;return n.d(t,{a:t}),t}})(),(()=>{var e,t=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__;n.t=function(a,o){if(1&o&&(a=this(a)),8&o)return a;if("object"===typeof a&&a){if(4&o&&a.__esModule)return a;if(16&o&&"function"===typeof a.then)return a}var r=Object.create(null);n.r(r);var i={};e=e||[null,t({}),t([]),t(t)];for(var s=2&o&&a;"object"==typeof s&&!~e.indexOf(s);s=t(s))Object.getOwnPropertyNames(s).forEach((e=>i[e]=()=>a[e]));return i["default"]=()=>a,n.d(r,i),r}})(),(()=>{n.d=(e,t)=>{for(var a in t)n.o(t,a)&&!n.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})}})(),(()=>{n.f={},n.e=e=>Promise.all(Object.keys(n.f).reduce(((t,a)=>(n.f[a](e,t),t)),[]))})(),(()=>{n.u=e=>"js/"+(64===e?"chunk-common":e)+"."+{8:"934cc666",33:"fc7327b8",43:"e84d39a1",64:"fd8ff9f2",134:"3b0189d8",227:"e82b51b2",245:"b1938060",295:"2d61b880",351:"47ddfa14",440:"c555965e",442:"3dd3ee24",457:"d8e326cb",474:"b6d75c36",491:"1a9c3356",599:"9305ce0d",661:"2dca2dac",721:"d1a90971",767:"9eadaa12",783:"6b69736d",824:"a41df856",853:"2c0cdd7a",877:"8aa2a558",892:"a207b840",911:"53e5dcd6",914:"bb97fa45",938:"79a78a86",943:"a0ba06aa"}[e]+".js"})(),(()=>{n.miniCssF=e=>"css/"+({143:"app",736:"vendor"}[e]||e)+"."+{8:"9d62f939",33:"743e82d5",134:"8d0ff0d3",143:"a7b26ccd",245:"146406d2",295:"9f7d14ff",351:"54da6f9d",442:"935cd574",457:"7b8722f7",474:"435548ce",491:"8a8c3d03",661:"7cc60e4c",721:"edcf752f",736:"032ab8bb",767:"4b321e71",783:"04780f1c",877:"6bc706f8",892:"54da6f9d",911:"74e0f52f",914:"bacb0d84",938:"6f73f46f",943:"54da6f9d"}[e]+".css"})(),(()=>{n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()})(),(()=>{n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t)})(),(()=>{var e={},t="healtheasy-frontend:";n.l=(a,o,r,i)=>{if(e[a])e[a].push(o);else{var s,l;if(void 0!==r)for(var c=document.getElementsByTagName("script"),d=0;d<c.length;d++){var m=c[d];if(m.getAttribute("src")==a||m.getAttribute("data-webpack")==t+r){s=m;break}}s||(l=!0,s=document.createElement("script"),s.charset="utf-8",s.timeout=120,n.nc&&s.setAttribute("nonce",n.nc),s.setAttribute("data-webpack",t+r),s.src=a),e[a]=[o];var u=(t,n)=>{s.onerror=s.onload=null,clearTimeout(h);var o=e[a];if(delete e[a],s.parentNode&&s.parentNode.removeChild(s),o&&o.forEach((e=>e(n))),t)return t(n)},h=setTimeout(u.bind(null,void 0,{type:"timeout",target:s}),12e4);s.onerror=u.bind(null,s.onerror),s.onload=u.bind(null,s.onload),l&&document.head.appendChild(s)}}})(),(()=>{n.r=e=>{"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}})(),(()=>{n.p="/"})(),(()=>{var e=(e,t,n,a)=>{var o=document.createElement("link");o.rel="stylesheet",o.type="text/css";var r=r=>{if(o.onerror=o.onload=null,"load"===r.type)n();else{var i=r&&("load"===r.type?"missing":r.type),s=r&&r.target&&r.target.href||t,l=new Error("Loading CSS chunk "+e+" failed.\n("+s+")");l.code="CSS_CHUNK_LOAD_FAILED",l.type=i,l.request=s,o.parentNode.removeChild(o),a(l)}};return o.onerror=o.onload=r,o.href=t,document.head.appendChild(o),o},t=(e,t)=>{for(var n=document.getElementsByTagName("link"),a=0;a<n.length;a++){var o=n[a],r=o.getAttribute("data-href")||o.getAttribute("href");if("stylesheet"===o.rel&&(r===e||r===t))return o}var i=document.getElementsByTagName("style");for(a=0;a<i.length;a++){o=i[a],r=o.getAttribute("data-href");if(r===e||r===t)return o}},a=a=>new Promise(((o,r)=>{var i=n.miniCssF(a),s=n.p+i;if(t(i,s))return o();e(a,s,o,r)})),o={143:0};n.f.miniCss=(e,t)=>{var n={8:1,33:1,134:1,245:1,295:1,351:1,442:1,457:1,474:1,491:1,661:1,721:1,767:1,783:1,877:1,892:1,911:1,914:1,938:1,943:1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=a(e).then((()=>{o[e]=0}),(t=>{throw delete o[e],t})))}})(),(()=>{var e={143:0};n.f.j=(t,a)=>{var o=n.o(e,t)?e[t]:void 0;if(0!==o)if(o)a.push(o[2]);else if(938!=t){var r=new Promise(((n,a)=>o=e[t]=[n,a]));a.push(o[2]=r);var i=n.p+n.u(t),s=new Error,l=a=>{if(n.o(e,t)&&(o=e[t],0!==o&&(e[t]=void 0),o)){var r=a&&("load"===a.type?"missing":a.type),i=a&&a.target&&a.target.src;s.message="Loading chunk "+t+" failed.\n("+r+": "+i+")",s.name="ChunkLoadError",s.type=r,s.request=i,o[1](s)}};n.l(i,l,"chunk-"+t,t)}else e[t]=0},n.O.j=t=>0===e[t];var t=(t,a)=>{var o,r,[i,s,l]=a,c=0;if(i.some((t=>0!==e[t]))){for(o in s)n.o(s,o)&&(n.m[o]=s[o]);if(l)var d=l(n)}for(t&&t(a);c<i.length;c++)r=i[c],n.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return n.O(d)},a=globalThis["webpackChunkhealtheasy_frontend"]=globalThis["webpackChunkhealtheasy_frontend"]||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))})();var a=n.O(void 0,[736],(()=>n(3408)));a=n.O(a)})();