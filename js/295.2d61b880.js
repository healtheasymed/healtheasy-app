"use strict";(globalThis["webpackChunkhealtheasy_frontend"]=globalThis["webpackChunkhealtheasy_frontend"]||[]).push([[295],{5572:(e,a,n)=>{n.r(a),n.d(a,{default:()=>k});var t=n(9835),o=n(6970);function i(e,a,n,i,s,c){const l=(0,t.up)("Finances"),r=(0,t.up)("q-chip"),d=(0,t.up)("q-td"),u=(0,t.up)("DynamicTable"),p=(0,t.up)("q-page");return(0,t.wg)(),(0,t.j4)(p,{padding:""},{default:(0,t.w5)((()=>[(0,t.Wm)(l),(0,t.Wm)(u,{labelTitle:"Finanças",routeName:"form-finance",rowsData:e.finances,colsData:e.financeEnum.quasarColumns,isLoading:e.isLoading,customSlots:["value","date"],onEdit:a[0]||(a[0]=a=>e.onEdit(a)),onDelete:a[1]||(a[1]=({key:a,rowName:n})=>e.onDelete(a,n))},{"body-cell-value":(0,t.w5)((({item:e})=>[(0,t.Wm)(d,{props:e},{default:(0,t.w5)((()=>[(0,t.Wm)(r,{class:"text-white",color:""+("income"===e.row.type?"positive":"negative")},{default:(0,t.w5)((()=>[(0,t.Uk)(" R$ "+(0,o.zw)(e.row.value),1)])),_:2},1032,["color"])])),_:2},1032,["props"])])),"body-cell-date":(0,t.w5)((({item:a})=>[(0,t.Wm)(d,{props:a},{default:(0,t.w5)((()=>[(0,t.Uk)((0,o.zw)(e.getLocaleDateFormatted(a.row.date)),1)])),_:2},1032,["props"])])),_:1},8,["rowsData","colsData","isLoading"])])),_:1})}var s=n(8339),c=n(1809),l=n(5410),r=n(6423),d=n(3788),u=n(1746),p=n(5744);const m=(0,t.aZ)({name:"ListPage",components:{DynamicTable:p.Z,Finances:u.Z},setup(){const e=(0,s.tv)(),a=(0,l.k)(),{finances:n,isLoading:o}=(0,c.Jk)(a),i=()=>a.fetchFinances(),u=(e,n)=>a.deleteFinance(e,n),p=a=>{e.push({name:"form-finance",params:{id:a}})};return(0,t.bv)((()=>{i()})),{financeEnum:r.f,isLoading:o,finances:n,onEdit:p,onDelete:u,getLocaleDateFormatted:d.gd}}});var f=n(1639),w=n(9885),g=n(7220),h=n(7691),D=n(9984),b=n.n(D);const v=(0,f.Z)(m,[["render",i]]),k=v;b()(m,"components",{QPage:w.Z,QTd:g.Z,QChip:h.Z})}}]);