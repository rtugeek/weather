import{W as g,u as x,a as b,D as w,E as T}from"./WeatherApi-OIVnyVQl.js";import{h as z,j as a,d as N,k as D,P as V,r as F,l as q,a as B,o as m,c as O,w as h,b as o,m as L,t as c,n as E,f as u,u as y,p as A,q as M,x as P,W as G}from"./index-Pyh5Eoy5.js";import{_ as U}from"./_plugin-vue_export-helper-DlAUqK2U.js";var Z={size:"1em",strokeWidth:4,strokeLinecap:"round",strokeLinejoin:"round",rtl:!1,theme:"outline",colors:{outline:{fill:"#333",background:"transparent"},filled:{fill:"#333",background:"#FFF"},twoTone:{fill:"#333",twoTone:"#2F88FF"},multiColor:{outStrokeColor:"#333",outFillColor:"#2F88FF",innerStrokeColor:"#FFF",innerFillColor:"#43CCF8"}},prefix:"i"};function H(){return"icon-"+((1+Math.random())*4294967296|0).toString(16).substring(1)}function $(s,n,t){var e=typeof n.fill=="string"?[n.fill]:n.fill||[],i=[],r=n.theme||t.theme;switch(r){case"outline":i.push(typeof e[0]=="string"?e[0]:"currentColor"),i.push("none"),i.push(typeof e[0]=="string"?e[0]:"currentColor"),i.push("none");break;case"filled":i.push(typeof e[0]=="string"?e[0]:"currentColor"),i.push(typeof e[0]=="string"?e[0]:"currentColor"),i.push("#FFF"),i.push("#FFF");break;case"two-tone":i.push(typeof e[0]=="string"?e[0]:"currentColor"),i.push(typeof e[1]=="string"?e[1]:t.colors.twoTone.twoTone),i.push(typeof e[0]=="string"?e[0]:"currentColor"),i.push(typeof e[1]=="string"?e[1]:t.colors.twoTone.twoTone);break;case"multi-color":i.push(typeof e[0]=="string"?e[0]:"currentColor"),i.push(typeof e[1]=="string"?e[1]:t.colors.multiColor.outFillColor),i.push(typeof e[2]=="string"?e[2]:t.colors.multiColor.innerStrokeColor),i.push(typeof e[3]=="string"?e[3]:t.colors.multiColor.innerFillColor);break}return{size:n.size||t.size,strokeWidth:n.strokeWidth||t.strokeWidth,strokeLinecap:n.strokeLinecap||t.strokeLinecap,strokeLinejoin:n.strokeLinejoin||t.strokeLinejoin,colors:i,id:s}}var J=Symbol("icon-context");function K(s,n,t){var e={name:"icon-"+s,props:["size","strokeWidth","strokeLinecap","strokeLinejoin","theme","fill","spin"],setup:function(r){var f=H(),l=z(J,Z);return function(){var C=r.size,d=r.strokeWidth,k=r.strokeLinecap,_=r.strokeLinejoin,W=r.theme,S=r.fill,j=r.spin,I=$(f,{size:C,strokeWidth:d,strokeLinecap:k,strokeLinejoin:_,theme:W,fill:S},l),v=[l.prefix+"-icon"];return v.push(l.prefix+"-icon-"+s),n&&l.rtl&&v.push(l.prefix+"-icon-rtl"),j&&v.push(l.prefix+"-icon-spin"),a("span",{class:v.join(" ")},[t(I)])}}};return e}const Q=K("local-two",!1,function(s){return a("svg",{width:s.size,height:s.size,viewBox:"0 0 48 48",fill:"none"},[a("path",{d:"M24 44C24 44 39 32 39 19C39 10.7157 32.2843 4 24 4C15.7157 4 9 10.7157 9 19C9 32 24 44 24 44Z",fill:s.colors[1],stroke:s.colors[0],"stroke-width":s.strokeWidth,"stroke-linejoin":s.strokeLinejoin},null),a("path",{d:"M24 25C27.3137 25 30 22.3137 30 19C30 15.6863 27.3137 13 24 13C20.6863 13 18 15.6863 18 19C18 22.3137 20.6863 25 24 25Z",fill:s.colors[3],stroke:s.colors[2],"stroke-width":s.strokeWidth,"stroke-linejoin":s.strokeLinejoin},null)])}),p=s=>(M("data-v-3b410de0"),s=s(),P(),s),R={class:"root"},X={key:0},Y={key:1,class:"p-2"},ee={class:"flex flex-col gap-3"},te={class:"flex items-baseline gap-1"},oe={class:"temp"},se=p(()=>o("span",null,"℃",-1)),ie={class:"flex gap-3"},le={class:"windScale flex gap-1 items-center"},ne={class:"flex gap-1 items-center"},re={class:"w-full flex gap-2 justify-evenly text-sm"},ae={class:"windScale flex flex-col items-center"},ce=p(()=>o("div",{class:"text-lg"},[o("i",{class:"qi-2208"})],-1)),de={class:"windSpeed flex flex-col items-center"},ue=p(()=>o("div",{class:"text-lg"},[o("i",{class:"qi-1018"})],-1)),he={class:"windScale flex flex-col items-center"},pe=p(()=>o("div",{class:"text-lg"},[o("i",{class:"qi-1702"})],-1)),fe={class:"humidity flex flex-col items-center"},_e=p(()=>o("div",{class:"text-lg"},[o("i",{class:"qi-1036"})],-1)),ve=N({__name:"WeatherWidgetView",setup(s){D(l=>({"7bd00dd4":e.value})),V(G,{onDataLoaded(){f()}});const n=F(""),t=F(),e=q(()=>{var l;return g.getBackgroundColor(((l=t.value)==null?void 0:l.icon)??"")}),i=x("locationId",w.id),r=x("selectLocation",w);function f(){g.getHourly(i.value).then(l=>{l.code==0?t.value=l.data.hourly[0]:n.value=l.message}).catch(l=>{l.message&&(n.value=l.message)})}return b(()=>{f()},60*60*1e3),(l,C)=>{const d=T,k=B("widget-wrapper");return m(),O(k,null,{default:h(()=>{var _;return[o("div",R,[n.value?(m(),L("div",X,c(n.value),1)):t.value?(m(),L("div",Y,[o("div",ee,[o("div",te,[o("div",oe,c(t.value.temp),1),se]),o("div",ie,[o("div",le,[o("i",{class:E(`qi-${(_=t.value)==null?void 0:_.icon}`)},null,2),u(" "+c(t.value.text),1)]),o("span",ne,[a(y(Q)),u(c(y(r).name),1)])]),o("div",re,[a(d,{content:"风力等级"},{default:h(()=>[o("div",ae,[ce,u(" "+c(t.value.windScale),1)])]),_:1}),a(d,{content:"风速"},{default:h(()=>[o("div",de,[ue,u(" "+c(t.value.windSpeed),1)])]),_:1}),a(d,{content:"风向"},{default:h(()=>[o("div",he,[pe,u(" "+c(t.value.windDir),1)])]),_:1}),a(d,{content:"湿度"},{default:h(()=>[o("div",fe,[_e,u(" "+c(t.value.humidity),1)])]),_:1})])])])):A("",!0)])]}),_:1})}}}),ge=U(ve,[["__scopeId","data-v-3b410de0"]]);export{ge as default};
