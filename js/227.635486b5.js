"use strict";(globalThis["webpackChunkhealtheasy_frontend"]=globalThis["webpackChunkhealtheasy_frontend"]||[]).push([[227],{5227:(e,o,s)=>{s.r(o),s.d(o,{default:()=>Z});var a=s(9835),n=s(1957),r=s(5864),t=s.n(r);const l=(0,a._)("img",{class:"col-10 q-mt-md q-mb-xl",src:t(),alt:"Health Easy",width:"100%"},null,-1),m={class:"col-10 q-gutter-y-md"};function d(e,o,s,r,t,d){const i=(0,a.up)("q-icon"),u=(0,a.up)("q-input"),w=(0,a.up)("q-btn"),c=(0,a.up)("q-form"),h=(0,a.up)("q-page");return(0,a.wg)(),(0,a.j4)(h,null,{default:(0,a.w5)((()=>[(0,a.Wm)(c,{class:"row justify-center",onSubmit:(0,n.iM)(e.onSubmit,["prevent"])},{default:(0,a.w5)((()=>[l,(0,a._)("div",m,[(0,a.Wm)(u,{modelValue:e.password,"onUpdate:modelValue":o[1]||(o[1]=o=>e.password=o),label:"Senha",outlined:"","lazy-rules":"",type:e.showPassword?"text":"password",rules:[e=>e&&e.length>0||"Por favor, informe a senha.",e=>e&&e.length>=6||"A senha deve conter, no mínimo, 6 caracteres."]},{append:(0,a.w5)((()=>[(0,a.Wm)(i,{color:"primary",name:e.showPassword?"mdi-eye":"mdi-eye-off",onClick:o[0]||(o[0]=o=>e.showPassword=!e.showPassword)},null,8,["name"])])),_:1},8,["modelValue","type","rules"]),(0,a.Wm)(u,{modelValue:e.confirmPassword,"onUpdate:modelValue":o[3]||(o[3]=o=>e.confirmPassword=o),label:"Confirme a Senha",outlined:"","lazy-rules":"",type:e.showConfirmPassword?"text":"password",rules:[e=>e&&e.length>0||"Por favor, informe a confirmação da senha.",e=>e&&e.length>=6||"A senha deve conter, no mínimo, 6 caracteres.",o=>o&&o===e.password||"A senha e a confirmação de senha devem ser iguais."]},{append:(0,a.w5)((()=>[(0,a.Wm)(i,{color:"primary",name:e.showConfirmPassword?"mdi-eye":"mdi-eye-off",onClick:o[2]||(o[2]=o=>e.showConfirmPassword=!e.showConfirmPassword)},null,8,["name"])])),_:1},8,["modelValue","type","rules"]),(0,a.Wm)(w,{label:"Salvar",type:"submit",color:"positive",class:"full-width q-mt-md"})])])),_:1},8,["onSubmit"])])),_:1})}var i=s(499),u=s(8339),w=s(9355),c=s(8957);const h=(0,a.aZ)({name:"ResetPasswordPage",setup(){const{resetPassword:e}=(0,w.Z)(),{notifySuccess:o,notifyError:s}=(0,c.Z)(),a=(0,u.yj)(),n=(0,u.tv)(),{token:r}=a.query,t=(0,i.iH)(""),l=(0,i.iH)(""),m=(0,i.iH)(!1),d=(0,i.iH)(!1),h=async()=>{try{await e(r,t.value),o(),n.push({name:"login"})}catch(a){s(a.message)}};return{password:t,confirmPassword:l,showPassword:m,showConfirmPassword:d,onSubmit:h}}});var p=s(1639),f=s(9885),y=s(8326),P=s(3119),g=s(2857),b=s(8879),v=s(9984),q=s.n(v);const C=(0,p.Z)(h,[["render",d]]),Z=C;q()(h,"components",{QPage:f.Z,QForm:y.Z,QInput:P.Z,QIcon:g.Z,QBtn:b.Z})}}]);