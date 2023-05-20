"use strict";(globalThis["webpackChunkhealtheasy_frontend"]=globalThis["webpackChunkhealtheasy_frontend"]||[]).push([[245],{8245:(e,a,l)=>{l.r(a),l.d(a,{default:()=>B});var o=l(9835),t=l(1957),s=l(6970);const u={class:"q-mb-md"},d={class:"col-12 col-md-8"},n={class:"col-12 col-md-4"},r={key:0,class:"col-12"},i={class:"col-12 col-md-6"},m={class:"col-12 col-md-6"},c={class:"row q-mt-md justify-center q-col-gutter-lg"},v={class:"col-12 col-md-5"},p={class:"col-12 col-md-5"};function f(e,a,l,f,h,y){const b=(0,o.up)("q-input"),_=(0,o.up)("q-radio"),g=(0,o.up)("q-field"),V=(0,o.up)("q-icon"),D=(0,o.up)("q-select"),q=(0,o.up)("InputDate"),C=(0,o.up)("InputDateTime"),k=(0,o.up)("q-checkbox"),w=(0,o.up)("q-btn"),U=(0,o.up)("q-form"),Z=(0,o.up)("q-page");return(0,o.wg)(),(0,o.j4)(Z,{padding:""},{default:(0,o.w5)((()=>[(0,o.Wm)(U,{onSubmit:(0,t.iM)(e.onSubmit,["prevent"])},{default:(0,o.w5)((()=>[(0,o._)("h5",u,(0,s.zw)(e.isUpdate?"Editar":"Adicionar")+" Evento",1),(0,o.Wm)(b,{modelValue:e.form.name,"onUpdate:modelValue":a[0]||(a[0]=a=>e.form.name=a),type:"text",label:"Título",class:"q-mb-sm",maxlength:"20",counter:"",outlined:"","lazy-rules":"",rules:[e=>e&&e.length>0||"Por favor, informe o título."]},null,8,["modelValue","rules"]),(0,o._)("div",{class:(0,s.C_)(["row q-mb-md",{"q-col-gutter-sm":e.$q.platform.is.desktop}])},[(0,o._)("div",d,[(0,o.Wm)(g,{label:"Tipo de Evento",modelValue:e.form.type,"onUpdate:modelValue":a[4]||(a[4]=a=>e.form.type=a),required:"",outlined:"",dense:"","stack-label":"","lazy-rules":"",rules:[e=>e&&e.length>0||"Por favor, informe o tipo de evento."]},{control:(0,o.w5)((()=>[(0,o.Wm)(_,{modelValue:e.form.type,"onUpdate:modelValue":a[1]||(a[1]=a=>e.form.type=a),"checked-icon":"task_alt","unchecked-icon":"panorama_fish_eye",label:"Compromisso",val:"compromisso"},null,8,["modelValue"]),(0,o.Wm)(_,{modelValue:e.form.type,"onUpdate:modelValue":a[2]||(a[2]=a=>e.form.type=a),"checked-icon":"task_alt","unchecked-icon":"panorama_fish_eye",label:"Consulta",val:"consulta"},null,8,["modelValue"]),(0,o.Wm)(_,{modelValue:e.form.type,"onUpdate:modelValue":a[3]||(a[3]=a=>e.form.type=a),"checked-icon":"task_alt","unchecked-icon":"panorama_fish_eye",label:"Indisponível",val:"indisponível"},null,8,["modelValue"])])),_:1},8,["modelValue","rules"])]),(0,o._)("div",n,[(0,o.Wm)(D,{modelValue:e.form.color,"onUpdate:modelValue":a[5]||(a[5]=a=>e.form.color=a),label:"Cor",class:"q-mb-sm",options:e.colorOptions,"emit-value":"","map-options":"",outlined:""},{prepend:(0,o.w5)((()=>[(0,o.Wm)(V,{name:"mdi-circle",style:(0,s.j5)({color:e.form.color})},null,8,["style"])])),_:1},8,["modelValue","options"])])],2),(0,o._)("div",{class:(0,s.C_)(["row",{"q-col-gutter-sm":e.$q.platform.is.desktop}])},[e.isAllDay?((0,o.wg)(),(0,o.iD)("div",r,[(0,o.Wm)(q,{modelValue:e.startedDate,"onUpdate:modelValue":a[6]||(a[6]=a=>e.startedDate=a),label:"Data",rules:[e=>e&&10===e.length||"Por favor, informe a data."]},null,8,["modelValue","rules"])])):((0,o.wg)(),(0,o.iD)(o.HY,{key:1},[(0,o._)("div",i,[(0,o.Wm)(C,{modelValue:e.startedDate,"onUpdate:modelValue":a[7]||(a[7]=a=>e.startedDate=a),label:"Data de Início",rules:[e=>e&&16===e.length||"Por favor, informe a data e hora de início."]},null,8,["modelValue","rules"])]),(0,o._)("div",m,[(0,o.Wm)(C,{modelValue:e.endedDate,"onUpdate:modelValue":a[8]||(a[8]=a=>e.endedDate=a),label:"Data de Fim",rules:[e=>e&&16===e.length||"Por favor, informe a data e hora de fim."]},null,8,["modelValue","rules"])])],64))],2),(0,o.Wm)(k,{modelValue:e.isAllDay,"onUpdate:modelValue":a[9]||(a[9]=a=>e.isAllDay=a),class:"q-mb-md","checked-icon":"task_alt",label:"Dia Inteiro"},null,8,["modelValue"]),(0,o.Wm)(b,{label:"Adicionar uma descrição",modelValue:e.form.note,"onUpdate:modelValue":a[10]||(a[10]=a=>e.form.note=a),type:"textarea",outlined:""},null,8,["modelValue"]),(0,o._)("div",c,[(0,o._)("div",v,[(0,o.Wm)(w,{label:"Descartar",type:"reset",color:"negative",class:"full-width",outline:"",disable:!e.formHasChanged,onClick:e.onDiscardChanges},null,8,["disable","onClick"])]),(0,o._)("div",p,[(0,o.Wm)(w,{label:"Registrar",type:"submit",color:"positive",class:"full-width",outline:e.isDisabled||!e.formHasChanged,disable:e.isDisabled||!e.formHasChanged},null,8,["outline","disable"])])])])),_:1},8,["onSubmit"])])),_:1})}l(6204),l(7924),l(702);var h=l(499),y=l(8339),b=l(9302),_=l(7338),g=l(5563),V=l(7572),D=l(1149),q=l(8957),C=l(8997);const k={table:"appointments",columns:["id","name","color","date_starts","date_ends","note","type"],eventColors:[{label:"Azul",value:"blue"},{label:"Amarelo",value:"yellow"},{label:"Verde",value:"green"},{label:"Vermelho",value:"red"}]};function w(){return(0,h.iH)((0,C.G3)(k.columns))}var U=l(3788);const Z=(0,o.aZ)({name:"FormPage",components:{InputDate:_.Z,InputDateTime:g.Z},setup(){const e=(0,b.Z)(),a=(0,y.yj)(),{getById:l,post:t,update:s}=(0,V.Z)(),{dialogConfirm:u}=(0,D.Z)(),{notifyError:d,notifyInfo:n,notifySuccess:r}=(0,q.Z)(),i=(0,o.Fl)((()=>!!a.params.id)),m=(0,h.iH)(!1),c=(0,h.iH)(!1),v=(0,h.iH)(!1),p=w(),f=structuredClone(p),_=k.eventColors,g=(0,h.iH)(!1),Z=(0,o.Fl)((()=>a.query.startedDate||(0,U.z4)())),W=(0,o.Fl)((()=>a.query.endedDate||(0,U.z4)())),P=(0,h.iH)(Z.value),H=(0,h.iH)(W.value),I=(0,o.Fl)((()=>i.value?(0,U.UP)(f.value.date_starts):f.value.date_starts)),A=(0,o.Fl)((()=>i.value?(0,U.UP)(f.value.date_ends):f.value.date_ends));(0,o.YP)(g,(e=>{if(e)return[P.value]=P.value.split(" "),H.value=P.value,void(c.value=!0);P.value=Z.value,H.value=W.value})),(0,o.YP)([p,P,H],(([e,a,l])=>{const o=(0,U.y8)(I.value,a)||(0,U.y8)(A.value,l);o?c.value=o:(console.log(f.value,p.value,e),c.value=(0,C.Ck)(f.value,e))}),{deep:!0});const F=async()=>{try{e.loading.show(),v.value=!0;const o=await l("appointments",a.params.id);o&&(f.value=structuredClone(o),p.value=o,P.value=(0,U.UP)(p.value.date_starts),H.value=(0,U.UP)(p.value.date_ends))}catch(o){d(o.message)}finally{e.loading.hide(),v.value=!1}};(0,y.iS)(((e,a,l)=>{const o=a.path!==e.path;o&&c.value?u("Você realmente deseja sair da página?","Ao sair, todas as alterações serão descartadas.",(()=>{l()})):l()}));const Q=()=>{u("Você realmente deseja descartar as alterações?","A ação não poderá ser desfeita.",(()=>{p.value=structuredClone(f.value),P.value=I.value,H.value=A.value}))},j=async()=>{if(c.value)try{e.loading.show(),v.value=!0,p.value.date_starts=(0,U.GU)(P.value),p.value.date_ends=(0,U.GU)(H.value),i.value?await s("appointments",p.value):await t("appointments",p.value),r(`Compromisso ${i.value?"atualizado":"cadastrado"} com sucesso!`),c.value=!1}catch(a){d(a.message)}finally{e.loading.hide(),v.value=!1}else n("Nenhuma modificação identificada.")},z=()=>{a.query.startedDate&&a.query.endedDate&&a.query.startedDate===a.query.endedDate&&(g.value=!0)};return(0,o.bv)((()=>{z(),i.value?F():(p.value.date_starts=P.value,p.value.date_ends=H.value,f.value=structuredClone(p.value))})),(0,o.Ah)((()=>{p.value=w(),f.value=structuredClone(p)})),{form:p,colorOptions:_,isAllDay:g,startedDate:P,endedDate:H,showError:m,isUpdate:i,isDisabled:v,formHasChanged:c,onDiscardChanges:Q,onSubmit:j}}}),W=()=>{(0,t.sj)((e=>({"3691b405":e.prefixColor})))},P=Z.setup;Z.setup=P?(e,a)=>(W(),P(e,a)):W;const H=Z;var I=l(1639),A=l(9885),F=l(8326),Q=l(3119),j=l(8149),z=l(1480),S=l(2259),x=l(2857),T=l(1221),E=l(8879),G=l(9984),Y=l.n(G);const $=(0,I.Z)(H,[["render",f],["__scopeId","data-v-6ae06974"]]),B=$;Y()(H,"components",{QPage:A.Z,QForm:F.Z,QInput:Q.Z,QField:j.Z,QRadio:z.Z,QSelect:S.Z,QIcon:x.Z,QCheckbox:T.Z,QBtn:E.Z})}}]);