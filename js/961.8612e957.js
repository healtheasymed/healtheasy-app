"use strict";(globalThis["webpackChunkhealtheasy_frontend"]=globalThis["webpackChunkhealtheasy_frontend"]||[]).push([[961],{5961:(e,a,l)=>{l.r(a),l.d(a,{default:()=>z});var o=l(9835),t=l(1957),n=l(6970);const s={class:"q-mb-md"},r={class:"col-12 col-md-4"},d={class:"col-12 col-md-8"},u={class:"col-12 col-md-8"},i={class:"row q-mt-md justify-center q-col-gutter-lg"},c={class:"col-12 col-md-5"},m={class:"col-12 col-md-5"};function p(e,a,l,p,v,f){const h=(0,o.up)("InputDate"),g=(0,o.up)("q-input"),b=(0,o.up)("q-radio"),y=(0,o.up)("q-field"),_=(0,o.up)("q-icon"),w=(0,o.up)("q-btn"),C=(0,o.up)("q-form"),V=(0,o.up)("q-page");return(0,o.wg)(),(0,o.j4)(V,{padding:""},{default:(0,o.w5)((()=>[(0,o.Wm)(C,{onSubmit:(0,t.iM)(e.onSubmit,["prevent"])},{default:(0,o.w5)((()=>[(0,o._)("h5",s,(0,n.zw)(e.isUpdate?"Editar":"Adicionar")+" Finança",1),(0,o._)("div",{class:(0,n.C_)(["row",{"q-col-gutter-sm":e.$q.platform.is.desktop}])},[(0,o._)("div",r,[(0,o.Wm)(h,{modelValue:e.date,"onUpdate:modelValue":a[0]||(a[0]=a=>e.date=a),label:"Data de Lançamento",rules:[e=>e&&10===e.length||"Por favor, informe a data de lançamento."]},null,8,["modelValue","rules"])]),(0,o._)("div",d,[(0,o.Wm)(g,{modelValue:e.form.name,"onUpdate:modelValue":a[1]||(a[1]=a=>e.form.name=a),type:"text",label:"Descrição",class:"q-mb-sm",maxlength:"20",counter:"",outlined:"","lazy-rules":"",rules:[e=>e&&e.length>0||"Por favor, informe a descrição."]},null,8,["modelValue","rules"])])],2),(0,o._)("div",{class:(0,n.C_)(["row",{"q-col-gutter-sm":e.$q.platform.is.desktop}])},[(0,o._)("div",{class:(0,n.C_)(["col-12 col-md-4",{"q-mb-lg":e.$q.platform.is.mobile}])},[(0,o.Wm)(y,{label:"Tipo de Finança",outlined:"",dense:"","stack-label":""},{control:(0,o.w5)((()=>[(0,o.Wm)(b,{modelValue:e.form.type,"onUpdate:modelValue":a[2]||(a[2]=a=>e.form.type=a),"checked-icon":"task_alt","unchecked-icon":"panorama_fish_eye",label:"Ganho",color:"green",val:"income"},null,8,["modelValue"]),(0,o.Wm)(b,{modelValue:e.form.type,"onUpdate:modelValue":a[3]||(a[3]=a=>e.form.type=a),"checked-icon":"task_alt","unchecked-icon":"panorama_fish_eye",label:"Despesa",color:"red",val:"expense"},null,8,["modelValue"])])),_:1})],2),(0,o._)("div",u,[(0,o.Wm)(g,{modelValue:e.form.value,"onUpdate:modelValue":a[4]||(a[4]=a=>e.form.value=a),type:"text",label:"Valor",class:"q-mb-sm",prefix:("income"===e.form.type?"+":"-")+" R$",mask:"#,##","reverse-fill-mask":"",outlined:"","lazy-rules":"",rules:[e=>e&&e.length>0||"Por favor, informe o valor."]},(0,o.Nv)({_:2},[e.form.value?{name:"append",fn:(0,o.w5)((()=>[(0,o.Wm)(_,{name:""+("income"===e.form.type?"mdi-arrow-up-circle":"mdi-arrow-down-circle"),color:""+("income"===e.form.type?"positive":"negative")},null,8,["name","color"])]))}:void 0]),1032,["modelValue","prefix","rules"])])],2),(0,o.Wm)(g,{label:"Observação",modelValue:e.form.note,"onUpdate:modelValue":a[5]||(a[5]=a=>e.form.note=a),type:"textarea",outlined:""},null,8,["modelValue"]),(0,o._)("div",i,[(0,o._)("div",c,[(0,o.Wm)(w,{label:"Descartar",type:"reset",color:"negative",class:"full-width",outline:"",disable:!e.formHasChanged,onClick:e.onDiscardChanges},null,8,["disable","onClick"])]),(0,o._)("div",m,[(0,o.Wm)(w,{label:"Registrar",type:"submit",color:"positive",class:"full-width",outline:e.isDisabled||!e.formHasChanged,disable:e.isDisabled||!e.formHasChanged},null,8,["outline","disable"])])])])),_:1},8,["onSubmit"])])),_:1})}l(6204),l(7924);var v=l(499),f=l(8339),h=l(9302),g=l(1517),b=l(7572),y=l(1149),_=l(8957),w=l(9998),C=l(8997),V=l(3788);const k=(0,o.aZ)({name:"FormPage",components:{InputDate:g.Z},setup(){const e=(0,h.Z)(),a=(0,f.yj)(),{getById:l,post:t,update:n}=(0,b.Z)(),{dialogConfirm:s}=(0,y.Z)(),{notifyError:r,notifyInfo:d,notifySuccess:u}=(0,_.Z)(),i=(0,o.Fl)((()=>!!a.params.id)),c=(0,v.iH)(!1),m=(0,v.iH)(!1),p=(0,v.iH)(!1),g=(0,w.n)(),k=structuredClone(g),q=(0,v.iH)((0,V.kq)()),Z=(0,o.Fl)((()=>i.value?(0,V.gd)(k.value.date):k.value.date)),D=(0,o.Fl)((()=>"income"===g.value.type?"var(--green)":"var(--red)"));(0,o.YP)([g,q],(()=>{const e=(0,V.y8)(Z.value,q.value);m.value=e||(0,C.Ck)(k.value,g.value)}),{deep:!0});const W=async()=>{try{e.loading.show(),p.value=!0;const o=await l("finances",a.params.id);o&&(k.value=structuredClone(o),g.value=o,q.value=(0,V.gd)(g.value.date))}catch(o){r(o.message)}finally{e.loading.hide(),p.value=!1}};(0,f.iS)(((e,a,l)=>{const o=a.path!==e.path;o&&m.value?s("Você realmente deseja sair da página?","Ao sair, todas as alterações serão descartadas.",(()=>{l()})):l()}));const x=()=>{s("Você realmente deseja descartar as alterações?","A ação não poderá ser desfeita.",(()=>{g.value=structuredClone(k.value),q.value=Z.value}))},F=async()=>{if(m.value)try{e.loading.show(),p.value=!0,g.value.date=(0,V.oV)(q.value),i.value?await n("finances",g.value):await t("finances",g.value),u(`Finança ${i.value?"atualizada":"cadastrada"} com sucesso!`),m.value=!1}catch(a){r(a.message)}finally{e.loading.hide(),p.value=!1}else d("Nenhuma modificação identificada.")};return(0,o.bv)((()=>{i.value?W():(g.value.type="income",g.value.date=q.value,k.value=structuredClone(g.value))})),(0,o.Ah)((()=>{g.value=(0,w.n)(),k.value=structuredClone(g)})),{form:g,date:q,getTodayLocaleDate:V.kq,showError:c,isUpdate:i,isDisabled:p,prefixColor:D,formHasChanged:m,onDiscardChanges:x,onSubmit:F}}}),q=()=>{(0,t.sj)((e=>({"25f24596":e.prefixColor})))},Z=k.setup;k.setup=Z?(e,a)=>(q(),Z(e,a)):q;const D=k;var W=l(1639),x=l(9885),F=l(8326),H=l(3119),U=l(8149),I=l(1480),Q=l(2857),j=l(8879),P=l(9984),S=l.n(P);const $=(0,W.Z)(D,[["render",p],["__scopeId","data-v-14c8666d"]]),z=$;S()(D,"components",{QPage:x.Z,QForm:F.Z,QInput:H.Z,QField:U.Z,QRadio:I.Z,QIcon:Q.Z,QBtn:j.Z})}}]);