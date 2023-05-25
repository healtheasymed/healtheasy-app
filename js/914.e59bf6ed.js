"use strict";(globalThis["webpackChunkhealtheasy_frontend"]=globalThis["webpackChunkhealtheasy_frontend"]||[]).push([[914],{7914:(e,a,t)=>{t.r(a),t.d(a,{default:()=>f});var n=t(9835);function o(e,a,t,o,l,d){const r=(0,n.up)("Qalendar"),i=(0,n.up)("q-page");return(0,n.wg)(),(0,n.j4)(i,{padding:""},{default:(0,n.w5)((()=>[e.showQalendar?((0,n.wg)(),(0,n.j4)(r,{key:0,config:e.config,events:e.parsedAppointments,"selected-date":new Date,onUpdatedMode:a[0]||(a[0]=a=>e.selectedViewMode=a.mode),onUpdatedPeriod:e.onViewModeChange,onEventWasClicked:e.getClickedEvent,onIntervalWasClicked:e.getClickedInterval,onEventWasDragged:e.onDraggedOrResized,onEventWasResized:e.onDraggedOrResized,onEditEvent:a[1]||(a[1]=a=>e.onEdit(a)),onDeleteEvent:a[2]||(a[2]=a=>e.onDelete(a))},null,8,["config","events","selected-date","onUpdatedPeriod","onEventWasClicked","onIntervalWasClicked","onEventWasDragged","onEventWasResized"])):(0,n.kq)("",!0)])),_:1})}var l=t(499),d=t(9302),r=t(8339),i=t(7440),s=t(1809);const c=(0,s.Q_)({id:"appointments",state:()=>({selectedViewMode:localStorage.getItem("selectedViewMode"),selectedPeriod:localStorage.getItem("selectedPeriod")}),getters:{},actions:{}});var u=t(7572),v=t(1149),m=t(8957),g=t(3788);const p=(0,n.aZ)({name:"AppointmentsPage",components:{Qalendar:i.h},setup(){const e=(0,d.Z)(),a=(0,r.tv)(),t=c(),{selectedViewMode:o}=(0,s.Jk)(t),{listByUserId:i,remove:p,update:h}=(0,u.Z)(),{notifyError:y,notifySuccess:k}=(0,m.Z)(),{dialogConfirm:w}=(0,v.Z)(),E=(0,l.iH)(!1),f=(0,l.iH)(null),_=(0,l.iH)(null),C=(0,l.iH)(null),D=(0,l.iH)(null),I=(0,l.iH)(null),b=(0,l.iH)(null),M=(0,l.iH)(null),S=()=>{_.value=f.value.map((e=>({title:e.name,time:{start:e.date_starts,end:e.date_ends},color:e.color||"green",isEditable:!0,id:e.id,description:e.note}))),E.value=!0},H=e=>({name:e.title,date_starts:e.time.start,date_ends:e.time.end,color:e.color,id:e.id,note:e.description}),V=e=>{w("Novo Compromisso",`\n          Deseja incluir um novo compromisso em\n          <b>${e}</b>?\n        `,(()=>a.push({name:"form-appointment",query:{startedDate:D.value||C.value,endedDate:I.value||C.value}})))},q=e=>{M.value=e.clickedEvent},W=e=>{D.value=(0,g.rN)(e.intervalStart),I.value=(0,g.rN)(e.intervalEnd),V(D.value)},P=e=>{e&&e.addEventListener("click",(e=>{const a=String(e.target.id).replace("day-","");a&&(C.value=(0,g.gd)(a),D.value=null,I.value=null,V(C.value))}))},Z=()=>{const e=document.querySelectorAll(".calendar-month__weekday");e&&[...e].forEach((({id:e,children:a})=>{[...a].forEach((({id:a,classList:t})=>{t.contains("calendar-month__day-date")&&(a=(0,g.gd)(e.replace("day-","")),a===(0,g.kq)()&&t.add("is-today-month"))}))}))},Q=()=>{const e=document.querySelectorAll(".calendar-month__weekday");e&&e.forEach((e=>P(e)))},R=()=>{const e=document.querySelector(".calendar-header__period-name"),a=(0,g.So)(),t=e.innerHTML.includes(a);e&&!t&&(e.innerHTML+=` ${a}`)},z=e=>{const a=document.querySelector(`${e}`);a&&(e.includes("month")&&(Q(),Z()),e.includes("week")&&R(),clearInterval(b.value))},A=e=>{z(e),b.value=setInterval(z,1e3,e)},$=async()=>{try{e.loading.show(),f.value=await i("appointments"),f.value&&S()}catch(a){y(a.message)}e.loading.hide()},j=()=>{clearInterval(b.value),"month"!==o.value&&"day"!==o.value?"week"===o.value&&A(".calendar-root.mode-is-week .calendar-header__period-name"):A(`.calendar-root.mode-is-${o.value}`)},L=e=>f.value.find((a=>a.id===e)),O=async e=>{try{await h("appointments",e),k()}catch(a){y(a.message)}},T=e=>{let a=L(e.id);a&&(a=H(e),O(a))},U=e=>{const t=L(e);t&&a.push({name:"form-appointment",params:{id:e}})},F=async({id:e,name:a})=>{w("Excluir evento",`Você realmente deseja excluir o evento <b>${a}</b> ?`,(async()=>{try{await p("appointments",e),k(),$()}catch(a){y(a.message)}}))},N=e=>{const a=L(e);a&&F(a)};return(0,n.YP)(o,(()=>{localStorage.setItem("selectedViewMode",o.value),j()})),(0,n.bv)((()=>{j(),$()})),{config:{locale:"pt-BR",defaultMode:o.value,style:{colorSchemes:{backgroundColor:"#FFF"}},week:{startsOn:"sunday",nDays:7},dayIntervals:{length:30,height:50,displayClickableInterval:!0}},parsedAppointments:_,showQalendar:E,getClickedEvent:q,getClickedInterval:W,selectedViewMode:o,onViewModeChange:j,onDraggedOrResized:T,onEdit:U,onDelete:N}}});var h=t(1639),y=t(9885),k=t(9984),w=t.n(k);const E=(0,h.Z)(p,[["render",o]]),f=E;w()(p,"components",{QPage:y.Z})}}]);