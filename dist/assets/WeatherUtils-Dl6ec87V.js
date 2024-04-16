import{ah as ut,ai as ct,m as lt,f as P,d as et,P as ft,o as A,e as J,b as rt,u as nt,g as R,t as ht,W as dt,aj as pt,p as $t,i as mt,$ as yt,a as X,w as gt,x as vt,r as K}from"./index-CGKFotPI.js";import{u as N,D as tt,c as kt}from"./GeoApi-DP3kH_5D.js";var st={exports:{}};(function(u,c){(function(h,i){u.exports=i()})(ut,function(){var h=1e3,i=6e4,l=36e5,$="millisecond",C="second",g="minute",S="hour",k="day",W="week",M="month",H="quarter",D="year",b="date",E="Invalid Date",j=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,it=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,ot={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(s){var r=["th","st","nd","rd"],t=s%100;return"["+s+(r[(t-20)%10]||r[t]||r[0])+"]"}},Z=function(s,r,t){var n=String(s);return!n||n.length>=r?s:""+Array(r+1-n.length).join(t)+s},at={s:Z,z:function(s){var r=-s.utcOffset(),t=Math.abs(r),n=Math.floor(t/60),e=t%60;return(r<=0?"+":"-")+Z(n,2,"0")+":"+Z(e,2,"0")},m:function s(r,t){if(r.date()<t.date())return-s(t,r);var n=12*(t.year()-r.year())+(t.month()-r.month()),e=r.clone().add(n,M),o=t-e<0,a=r.clone().add(n+(o?-1:1),M);return+(-(n+(t-e)/(o?e-a:a-e))||0)},a:function(s){return s<0?Math.ceil(s)||0:Math.floor(s)},p:function(s){return{M,y:D,w:W,d:k,D:b,h:S,m:g,s:C,ms:$,Q:H}[s]||String(s||"").toLowerCase().replace(/s$/,"")},u:function(s){return s===void 0}},I="en",F={};F[I]=ot;var G="$isDayjsObject",q=function(s){return s instanceof U||!(!s||!s[G])},B=function s(r,t,n){var e;if(!r)return I;if(typeof r=="string"){var o=r.toLowerCase();F[o]&&(e=o),t&&(F[o]=t,e=o);var a=r.split("-");if(!e&&a.length>1)return s(a[0])}else{var d=r.name;F[d]=r,e=d}return!n&&e&&(I=e),e||!n&&I},m=function(s,r){if(q(s))return s.clone();var t=typeof r=="object"?r:{};return t.date=s,t.args=arguments,new U(t)},f=at;f.l=B,f.i=q,f.w=function(s,r){return m(s,{locale:r.$L,utc:r.$u,x:r.$x,$offset:r.$offset})};var U=function(){function s(t){this.$L=B(t.locale,null,!0),this.parse(t),this.$x=this.$x||t.x||{},this[G]=!0}var r=s.prototype;return r.parse=function(t){this.$d=function(n){var e=n.date,o=n.utc;if(e===null)return new Date(NaN);if(f.u(e))return new Date;if(e instanceof Date)return new Date(e);if(typeof e=="string"&&!/Z$/i.test(e)){var a=e.match(j);if(a){var d=a[2]-1||0,p=(a[7]||"0").substring(0,3);return o?new Date(Date.UTC(a[1],d,a[3]||1,a[4]||0,a[5]||0,a[6]||0,p)):new Date(a[1],d,a[3]||1,a[4]||0,a[5]||0,a[6]||0,p)}}return new Date(e)}(t),this.init()},r.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},r.$utils=function(){return f},r.isValid=function(){return this.$d.toString()!==E},r.isSame=function(t,n){var e=m(t);return this.startOf(n)<=e&&e<=this.endOf(n)},r.isAfter=function(t,n){return m(t)<this.startOf(n)},r.isBefore=function(t,n){return this.endOf(n)<m(t)},r.$g=function(t,n,e){return f.u(t)?this[n]:this.set(e,t)},r.unix=function(){return Math.floor(this.valueOf()/1e3)},r.valueOf=function(){return this.$d.getTime()},r.startOf=function(t,n){var e=this,o=!!f.u(n)||n,a=f.p(t),d=function(x,w){var L=f.w(e.$u?Date.UTC(e.$y,w,x):new Date(e.$y,w,x),e);return o?L:L.endOf(k)},p=function(x,w){return f.w(e.toDate()[x].apply(e.toDate("s"),(o?[0,0,0,0]:[23,59,59,999]).slice(w)),e)},y=this.$W,v=this.$M,_=this.$D,T="set"+(this.$u?"UTC":"");switch(a){case D:return o?d(1,0):d(31,11);case M:return o?d(1,v):d(0,v+1);case W:var O=this.$locale().weekStart||0,z=(y<O?y+7:y)-O;return d(o?_-z:_+(6-z),v);case k:case b:return p(T+"Hours",0);case S:return p(T+"Minutes",1);case g:return p(T+"Seconds",2);case C:return p(T+"Milliseconds",3);default:return this.clone()}},r.endOf=function(t){return this.startOf(t,!1)},r.$set=function(t,n){var e,o=f.p(t),a="set"+(this.$u?"UTC":""),d=(e={},e[k]=a+"Date",e[b]=a+"Date",e[M]=a+"Month",e[D]=a+"FullYear",e[S]=a+"Hours",e[g]=a+"Minutes",e[C]=a+"Seconds",e[$]=a+"Milliseconds",e)[o],p=o===k?this.$D+(n-this.$W):n;if(o===M||o===D){var y=this.clone().set(b,1);y.$d[d](p),y.init(),this.$d=y.set(b,Math.min(this.$D,y.daysInMonth())).$d}else d&&this.$d[d](p);return this.init(),this},r.set=function(t,n){return this.clone().$set(t,n)},r.get=function(t){return this[f.p(t)]()},r.add=function(t,n){var e,o=this;t=Number(t);var a=f.p(n),d=function(v){var _=m(o);return f.w(_.date(_.date()+Math.round(v*t)),o)};if(a===M)return this.set(M,this.$M+t);if(a===D)return this.set(D,this.$y+t);if(a===k)return d(1);if(a===W)return d(7);var p=(e={},e[g]=i,e[S]=l,e[C]=h,e)[a]||1,y=this.$d.getTime()+t*p;return f.w(y,this)},r.subtract=function(t,n){return this.add(-1*t,n)},r.format=function(t){var n=this,e=this.$locale();if(!this.isValid())return e.invalidDate||E;var o=t||"YYYY-MM-DDTHH:mm:ssZ",a=f.z(this),d=this.$H,p=this.$m,y=this.$M,v=e.weekdays,_=e.months,T=e.meridiem,O=function(w,L,Y,V){return w&&(w[L]||w(n,o))||Y[L].slice(0,V)},z=function(w){return f.s(d%12||12,w,"0")},x=T||function(w,L,Y){var V=w<12?"AM":"PM";return Y?V.toLowerCase():V};return o.replace(it,function(w,L){return L||function(Y){switch(Y){case"YY":return String(n.$y).slice(-2);case"YYYY":return f.s(n.$y,4,"0");case"M":return y+1;case"MM":return f.s(y+1,2,"0");case"MMM":return O(e.monthsShort,y,_,3);case"MMMM":return O(_,y);case"D":return n.$D;case"DD":return f.s(n.$D,2,"0");case"d":return String(n.$W);case"dd":return O(e.weekdaysMin,n.$W,v,2);case"ddd":return O(e.weekdaysShort,n.$W,v,3);case"dddd":return v[n.$W];case"H":return String(d);case"HH":return f.s(d,2,"0");case"h":return z(1);case"hh":return z(2);case"a":return x(d,p,!0);case"A":return x(d,p,!1);case"m":return String(p);case"mm":return f.s(p,2,"0");case"s":return String(n.$s);case"ss":return f.s(n.$s,2,"0");case"SSS":return f.s(n.$ms,3,"0");case"Z":return a}return null}(w)||a.replace(":","")})},r.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},r.diff=function(t,n,e){var o,a=this,d=f.p(n),p=m(t),y=(p.utcOffset()-this.utcOffset())*i,v=this-p,_=function(){return f.m(a,p)};switch(d){case D:o=_()/12;break;case M:o=_();break;case H:o=_()/3;break;case W:o=(v-y)/6048e5;break;case k:o=(v-y)/864e5;break;case S:o=v/l;break;case g:o=v/i;break;case C:o=v/h;break;default:o=v}return e?o:f.a(o)},r.daysInMonth=function(){return this.endOf(M).$D},r.$locale=function(){return F[this.$L]},r.locale=function(t,n){if(!t)return this.$L;var e=this.clone(),o=B(t,n,!0);return o&&(e.$L=o),e},r.clone=function(){return f.w(this.$d,this)},r.toDate=function(){return new Date(this.valueOf())},r.toJSON=function(){return this.isValid()?this.toISOString():null},r.toISOString=function(){return this.$d.toISOString()},r.toString=function(){return this.$d.toUTCString()},s}(),Q=U.prototype;return m.prototype=Q,[["$ms",$],["$s",C],["$m",g],["$H",S],["$W",k],["$M",M],["$y",D],["$D",b]].forEach(function(s){Q[s[1]]=function(r){return this.$g(r,s[0],s[1])}}),m.extend=function(s,r){return s.$i||(s(r,U,m),s.$i=!0),m},m.locale=B,m.isDayjs=q,m.unix=function(s){return m(1e3*s)},m.en=F[I],m.Ls=F,m.p={},m})})(st);var wt=st.exports;const Mt=ct(wt);var _t={size:"1em",strokeWidth:4,strokeLinecap:"round",strokeLinejoin:"round",rtl:!1,theme:"outline",colors:{outline:{fill:"#333",background:"transparent"},filled:{fill:"#333",background:"#FFF"},twoTone:{fill:"#333",twoTone:"#2F88FF"},multiColor:{outStrokeColor:"#333",outFillColor:"#2F88FF",innerStrokeColor:"#FFF",innerFillColor:"#43CCF8"}},prefix:"i"};function Ct(){return"icon-"+((1+Math.random())*4294967296|0).toString(16).substring(1)}function St(u,c,h){var i=typeof c.fill=="string"?[c.fill]:c.fill||[],l=[],$=c.theme||h.theme;switch($){case"outline":l.push(typeof i[0]=="string"?i[0]:"currentColor"),l.push("none"),l.push(typeof i[0]=="string"?i[0]:"currentColor"),l.push("none");break;case"filled":l.push(typeof i[0]=="string"?i[0]:"currentColor"),l.push(typeof i[0]=="string"?i[0]:"currentColor"),l.push("#FFF"),l.push("#FFF");break;case"two-tone":l.push(typeof i[0]=="string"?i[0]:"currentColor"),l.push(typeof i[1]=="string"?i[1]:h.colors.twoTone.twoTone),l.push(typeof i[0]=="string"?i[0]:"currentColor"),l.push(typeof i[1]=="string"?i[1]:h.colors.twoTone.twoTone);break;case"multi-color":l.push(typeof i[0]=="string"?i[0]:"currentColor"),l.push(typeof i[1]=="string"?i[1]:h.colors.multiColor.outFillColor),l.push(typeof i[2]=="string"?i[2]:h.colors.multiColor.innerStrokeColor),l.push(typeof i[3]=="string"?i[3]:h.colors.multiColor.innerFillColor);break}return{size:c.size||h.size,strokeWidth:c.strokeWidth||h.strokeWidth,strokeLinecap:c.strokeLinecap||h.strokeLinecap,strokeLinejoin:c.strokeLinejoin||h.strokeLinejoin,colors:l,id:u}}var Dt=Symbol("icon-context");function bt(u,c,h){var i={name:"icon-"+u,props:["size","strokeWidth","strokeLinecap","strokeLinejoin","theme","fill","spin"],setup:function($){var C=Ct(),g=lt(Dt,_t);return function(){var S=$.size,k=$.strokeWidth,W=$.strokeLinecap,M=$.strokeLinejoin,H=$.theme,D=$.fill,b=$.spin,E=St(C,{size:S,strokeWidth:k,strokeLinecap:W,strokeLinejoin:M,theme:H,fill:D},g),j=[g.prefix+"-icon"];return j.push(g.prefix+"-icon-"+u),c&&g.rtl&&j.push(g.prefix+"-icon-rtl"),b&&j.push(g.prefix+"-icon-spin"),P("span",{class:j.join(" ")},[h(E)])}}};return i}const At=bt("local-two",!1,function(u){return P("svg",{width:u.size,height:u.size,viewBox:"0 0 48 48",fill:"none"},[P("path",{d:"M24 44C24 44 39 32 39 19C39 10.7157 32.2843 4 24 4C15.7157 4 9 10.7157 9 19C9 32 24 44 24 44Z",fill:u.colors[1],stroke:u.colors[0],"stroke-width":u.strokeWidth,"stroke-linejoin":u.strokeLinejoin},null),P("path",{d:"M24 25C27.3137 25 30 22.3137 30 19C30 15.6863 27.3137 13 24 13C20.6863 13 18 15.6863 18 19C18 22.3137 20.6863 25 24 25Z",fill:u.colors[3],stroke:u.colors[2],"stroke-width":u.strokeWidth,"stroke-linejoin":u.strokeLinejoin},null)])}),Lt=u=>($t("data-v-1422c87f"),u=u(),mt(),u),Ft={class:"p-3"},Ot={key:0},xt=Lt(()=>rt("br",null,null,-1)),Wt={key:1},jt=et({__name:"EmptyView",props:{msg:{type:String,required:!1}},setup(u){const c=N("apiKey",""),h=ft(dt,{});function i(){pt.openConfigPage(h.widgetParams.id)}return(l,$)=>(A(),J("div",{class:"empty-key flex w-full text-center h-full items-center justify-center cursor-pointer",onClick:i},[rt("div",Ft,[nt(c)?(A(),J("p",Wt,ht(u.msg),1)):(A(),J("p",Ot,[R(" 点击设置"),xt,R("和风天气API KEY ")]))])]))}}),Tt=(u,c)=>{const h=u.__vccOpts||u;for(const[i,l]of c)h[i]=l;return h},It=Tt(jt,[["__scopeId","data-v-1422c87f"]]),Nt=et({__name:"QWeatherWrapper",props:{errorMsg:{type:String,required:!1},loading:{type:Boolean,required:!1}},setup(u){const c=N("apiKey","");return(h,i)=>{const l=yt("widget-wrapper");return A(),X(l,null,{default:gt(()=>[nt(c)&&!u.errorMsg?vt(h.$slots,"default",{key:0}):(A(),X(It,{key:1,msg:u.errorMsg},null,8,["msg"]))]),_:3})}}});function Ht(u){const c=N("locationId",tt.id),h=N("selectLocation",tt),i=N("apiKey",""),l=K(Mt()),$=K(""),C=K(),g=K(!1),S=()=>{$.value="",g.value=!0,u().then(k=>{C.value=k}).catch(k=>{$.value=k.message}).finally(()=>g.value=!1)};return kt(()=>{S()},60*60*1e3),{locationId:c,selectLocation:h,apiKey:i,now:l,loading:g,update:S,errorMsg:$,responseData:C}}class Et{static getBackgroundClass(c){return this.between(c,101,104)||this.between(c,151,153)?"city-weather-cloudy":this.between(c,101,104)||this.between(c,151,153)?"city-weather-rain":this.between(c,400,499)?"city-weather-snow":this.between(c,500,515)?"city-weather-haze":"city-weather-sun"}static between(c,h,i){return c>=h&&c<=i}}export{At as L,Et as W,Nt as _,Tt as a,Mt as d,Ht as u};