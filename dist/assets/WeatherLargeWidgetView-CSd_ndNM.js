import{u as v,L as y,_ as b,d as D,a as W}from"./useQWeatherApi-Clo_tdbT.js";import{d as I,z as L,o as c,c as k,w as V,u as t,b as n,a as e,e as C,f as m,t as s,G as M,$ as S,n as T,g as j,W as B,p as F,h as N}from"./index-DuPRxM8t.js";import{J as Y}from"./GeoApi-BM24uiIx.js";class ${static getForecastDayText(r){return r==0?"今天":r==1?"明天":"后天"}}const z=a=>(F("data-v-1b52ad09"),a=a(),N(),a),H={class:"flex flex-col weather-bg relative h-full"},Q={class:"flex px-2 py-1 items-center"},A={class:"ml-auto text-right leading-6"},E=z(()=>e("br",null,null,-1)),G={class:"flex flex-col w-full items-center justify-center gap-1 flex-1 mb-1"},J={class:"flex items-center"},R=["src"],U={class:"current-live__item"},q={class:"text-2xl"},K={class:"text-center p-4"},O={class:"current-basic flex justify-around justify-center items-center mt-auto mx-4 my-4"},P={class:"font-bold"},X=["src"],Z=I({__name:"WeatherLargeWidgetView",setup(a){const{errorMsg:r,weatherData:o,backgroundClass:h,now:i,selectLocation:f,dailyIndex:g,update:x,weather3dResponse:w}=v({useIndex:!0,useWeather3d:!0});return L(B,{onDataLoaded(){x()}}),Y(()=>{i.value=D()},60*1e3),(ee,te)=>(c(),k(b,{"error-msg":t(r)},{default:V(()=>{var d,_,u;return[t(o)?(c(),n("div",{key:0,class:T(["root theme--light",{[t(h)]:!0}])},[e("div",H,[e("div",Q,[e("p",null,[C(t(y)),m(" "+s(t(f).name),1)]),e("p",A,[m(s(t(i).format("YYYY-MM-DD HH:mm"))+" ",1),E])]),e("div",G,[e("div",J,[e("img",{width:"70rem",src:`/weather/image/${(d=t(o))==null?void 0:d.icon}.png`,alt:"QWeather"},null,8,R),e("div",U,[e("p",q,s(t(o).temp)+"° ",1),e("p",null,s(t(o).text),1)])]),e("p",K,s((_=t(g))==null?void 0:_.text),1)]),e("div",O,[(c(!0),n(M,null,S((u=t(w))==null?void 0:u.daily,(l,p)=>(c(),n("div",{key:p,class:"flex flex-col gap-1 items-center"},[e("p",P,s(t($).getForecastDayText(p)),1),e("img",{width:"24px",src:`/weather/image/${l.iconDay}.png`,alt:""},null,8,X),e("p",null,s(l.tempMin)+"/"+s(l.tempMax)+"°",1)]))),128))])])],2)):j("",!0)]}),_:1},8,["error-msg"]))}}),oe=W(Z,[["__scopeId","data-v-1b52ad09"]]);export{oe as default};