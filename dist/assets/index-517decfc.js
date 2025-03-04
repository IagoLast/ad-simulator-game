var pl=Object.defineProperty;var ml=(i,e,t)=>e in i?pl(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var re=(i,e,t)=>(ml(i,typeof e!="symbol"?e+"":e,t),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const bs="157",gl=0,Vs=1,_l=2,mo=1,vl=2,sn=3,En=0,Rt=1,zt=2,vn=0,pi=1,pr=2,ks=3,Ws=4,xl=5,ui=100,Ml=101,Sl=102,Xs=103,js=104,yl=200,El=201,Tl=202,bl=203,go=204,_o=205,Al=206,wl=207,Rl=208,Cl=209,Pl=210,Ll=0,Dl=1,Ul=2,ps=3,Il=4,Nl=5,Fl=6,Ol=7,Tr=0,Bl=1,zl=2,xn=0,Gl=1,Hl=2,Vl=3,kl=4,Wl=5,vo=300,gi=301,_i=302,ms=303,gs=304,br=306,_s=1e3,kt=1001,vs=1002,St=1003,qs=1004,Nr=1005,Ft=1006,Xl=1007,Ui=1008,Mn=1009,jl=1010,ql=1011,As=1012,xo=1013,gn=1014,_n=1015,Ii=1016,Mo=1017,So=1018,In=1020,Yl=1021,Wt=1023,$l=1024,Kl=1025,Nn=1026,vi=1027,Zl=1028,yo=1029,Jl=1030,Eo=1031,To=1033,Fr=33776,Or=33777,Br=33778,zr=33779,Ys=35840,$s=35841,Ks=35842,Zs=35843,Ql=36196,Js=37492,Qs=37496,ea=37808,ta=37809,na=37810,ia=37811,ra=37812,sa=37813,aa=37814,oa=37815,la=37816,ca=37817,ha=37818,ua=37819,da=37820,fa=37821,Gr=36492,pa=36494,ma=36495,ec=36283,ga=36284,_a=36285,va=36286,bo=3e3,Fn=3001,tc=3200,nc=3201,Ar=0,ic=1,Gt="",ht="srgb",ln="srgb-linear",ws="display-p3",wr="display-p3-linear",mr="linear",$e="srgb",gr="rec709",_r="p3",Hr=7680,rc=519,sc=512,ac=513,oc=514,lc=515,cc=516,hc=517,uc=518,dc=519,xs=35044,xa="300 es",Ms=1035,on=2e3,vr=2001;class Vn{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const ft=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Vr=Math.PI/180,Ss=180/Math.PI;function Sn(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(ft[i&255]+ft[i>>8&255]+ft[i>>16&255]+ft[i>>24&255]+"-"+ft[e&255]+ft[e>>8&255]+"-"+ft[e>>16&15|64]+ft[e>>24&255]+"-"+ft[t&63|128]+ft[t>>8&255]+"-"+ft[t>>16&255]+ft[t>>24&255]+ft[n&255]+ft[n>>8&255]+ft[n>>16&255]+ft[n>>24&255]).toLowerCase()}function bt(i,e,t){return Math.max(e,Math.min(t,i))}function fc(i,e){return(i%e+e)%e}function kr(i,e,t){return(1-t)*i+t*e}function Ma(i){return(i&i-1)===0&&i!==0}function ys(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function an(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function qe(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}class Pe{constructor(e=0,t=0){Pe.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(bt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*r+e.x,this.y=s*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Fe{constructor(e,t,n,r,s,a,o,l,c){Fe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,l,c)}set(e,t,n,r,s,a,o,l,c){const h=this.elements;return h[0]=e,h[1]=r,h[2]=o,h[3]=t,h[4]=s,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],d=n[7],f=n[2],m=n[5],g=n[8],_=r[0],p=r[3],u=r[6],A=r[1],S=r[4],E=r[7],w=r[2],P=r[5],C=r[8];return s[0]=a*_+o*A+l*w,s[3]=a*p+o*S+l*P,s[6]=a*u+o*E+l*C,s[1]=c*_+h*A+d*w,s[4]=c*p+h*S+d*P,s[7]=c*u+h*E+d*C,s[2]=f*_+m*A+g*w,s[5]=f*p+m*S+g*P,s[8]=f*u+m*E+g*C,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-n*s*h+n*o*l+r*s*c-r*a*l}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=h*a-o*c,f=o*l-h*s,m=c*s-a*l,g=t*d+n*f+r*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=d*_,e[1]=(r*c-h*n)*_,e[2]=(o*n-r*a)*_,e[3]=f*_,e[4]=(h*t-r*l)*_,e[5]=(r*s-o*t)*_,e[6]=m*_,e[7]=(n*l-c*t)*_,e[8]=(a*t-n*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Wr.makeScale(e,t)),this}rotate(e){return this.premultiply(Wr.makeRotation(-e)),this}translate(e,t){return this.premultiply(Wr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Wr=new Fe;function Ao(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function xr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function pc(){const i=xr("canvas");return i.style.display="block",i}const Sa={};function Di(i){i in Sa||(Sa[i]=!0,console.warn(i))}const ya=new Fe().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Ea=new Fe().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Gi={[ln]:{transfer:mr,primaries:gr,toReference:i=>i,fromReference:i=>i},[ht]:{transfer:$e,primaries:gr,toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[wr]:{transfer:mr,primaries:_r,toReference:i=>i.applyMatrix3(Ea),fromReference:i=>i.applyMatrix3(ya)},[ws]:{transfer:$e,primaries:_r,toReference:i=>i.convertSRGBToLinear().applyMatrix3(Ea),fromReference:i=>i.applyMatrix3(ya).convertLinearToSRGB()}},mc=new Set([ln,wr]),Xe={enabled:!0,_workingColorSpace:ln,get legacyMode(){return console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."),!this.enabled},set legacyMode(i){console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."),this.enabled=!i},get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!mc.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,e,t){if(this.enabled===!1||e===t||!e||!t)return i;const n=Gi[e].toReference,r=Gi[t].fromReference;return r(n(i))},fromWorkingColorSpace:function(i,e){return this.convert(i,this._workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this._workingColorSpace)},getPrimaries:function(i){return Gi[i].primaries},getTransfer:function(i){return i===Gt?mr:Gi[i].transfer}};function mi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Xr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let kn;class wo{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{kn===void 0&&(kn=xr("canvas")),kn.width=e.width,kn.height=e.height;const n=kn.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=kn}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=xr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=mi(s[a]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(mi(t[n]/255)*255):t[n]=mi(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let gc=0;class Ro{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:gc++}),this.uuid=Sn(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(jr(r[a].image)):s.push(jr(r[a]))}else s=jr(r);n.url=s}return t||(e.images[this.uuid]=n),n}}function jr(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?wo.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let _c=0;class Ct extends Vn{constructor(e=Ct.DEFAULT_IMAGE,t=Ct.DEFAULT_MAPPING,n=kt,r=kt,s=Ft,a=Ui,o=Wt,l=Mn,c=Ct.DEFAULT_ANISOTROPY,h=Gt){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:_c++}),this.uuid=Sn(),this.name="",this.source=new Ro(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Pe(0,0),this.repeat=new Pe(1,1),this.center=new Pe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Fe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(Di("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===Fn?ht:Gt),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==vo)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case _s:e.x=e.x-Math.floor(e.x);break;case kt:e.x=e.x<0?0:1;break;case vs:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case _s:e.y=e.y-Math.floor(e.y);break;case kt:e.y=e.y<0?0:1;break;case vs:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Di("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===ht?Fn:bo}set encoding(e){Di("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===Fn?ht:Gt}}Ct.DEFAULT_IMAGE=null;Ct.DEFAULT_MAPPING=vo;Ct.DEFAULT_ANISOTROPY=1;class ot{constructor(e=0,t=0,n=0,r=1){ot.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s;const l=e.elements,c=l[0],h=l[4],d=l[8],f=l[1],m=l[5],g=l[9],_=l[2],p=l[6],u=l[10];if(Math.abs(h-f)<.01&&Math.abs(d-_)<.01&&Math.abs(g-p)<.01){if(Math.abs(h+f)<.1&&Math.abs(d+_)<.1&&Math.abs(g+p)<.1&&Math.abs(c+m+u-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const S=(c+1)/2,E=(m+1)/2,w=(u+1)/2,P=(h+f)/4,C=(d+_)/4,H=(g+p)/4;return S>E&&S>w?S<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(S),r=P/n,s=C/n):E>w?E<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(E),n=P/r,s=H/r):w<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(w),n=C/s,r=H/s),this.set(n,r,s,t),this}let A=Math.sqrt((p-g)*(p-g)+(d-_)*(d-_)+(f-h)*(f-h));return Math.abs(A)<.001&&(A=1),this.x=(p-g)/A,this.y=(d-_)/A,this.z=(f-h)/A,this.w=Math.acos((c+m+u-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class vc extends Vn{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new ot(0,0,e,t),this.scissorTest=!1,this.viewport=new ot(0,0,e,t);const r={width:e,height:t,depth:1};n.encoding!==void 0&&(Di("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===Fn?ht:Gt),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ft,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new Ct(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Ro(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class On extends vc{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Co extends Ct{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=St,this.minFilter=St,this.wrapR=kt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class xc extends Ct{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=St,this.minFilter=St,this.wrapR=kt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ni{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,a,o){let l=n[r+0],c=n[r+1],h=n[r+2],d=n[r+3];const f=s[a+0],m=s[a+1],g=s[a+2],_=s[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d;return}if(o===1){e[t+0]=f,e[t+1]=m,e[t+2]=g,e[t+3]=_;return}if(d!==_||l!==f||c!==m||h!==g){let p=1-o;const u=l*f+c*m+h*g+d*_,A=u>=0?1:-1,S=1-u*u;if(S>Number.EPSILON){const w=Math.sqrt(S),P=Math.atan2(w,u*A);p=Math.sin(p*P)/w,o=Math.sin(o*P)/w}const E=o*A;if(l=l*p+f*E,c=c*p+m*E,h=h*p+g*E,d=d*p+_*E,p===1-o){const w=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=w,c*=w,h*=w,d*=w}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,r,s,a){const o=n[r],l=n[r+1],c=n[r+2],h=n[r+3],d=s[a],f=s[a+1],m=s[a+2],g=s[a+3];return e[t]=o*g+h*d+l*m-c*f,e[t+1]=l*g+h*f+c*d-o*m,e[t+2]=c*g+h*m+o*f-l*d,e[t+3]=h*g-o*d-l*f-c*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t){const n=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(r/2),d=o(s/2),f=l(n/2),m=l(r/2),g=l(s/2);switch(a){case"XYZ":this._x=f*h*d+c*m*g,this._y=c*m*d-f*h*g,this._z=c*h*g+f*m*d,this._w=c*h*d-f*m*g;break;case"YXZ":this._x=f*h*d+c*m*g,this._y=c*m*d-f*h*g,this._z=c*h*g-f*m*d,this._w=c*h*d+f*m*g;break;case"ZXY":this._x=f*h*d-c*m*g,this._y=c*m*d+f*h*g,this._z=c*h*g+f*m*d,this._w=c*h*d-f*m*g;break;case"ZYX":this._x=f*h*d-c*m*g,this._y=c*m*d+f*h*g,this._z=c*h*g-f*m*d,this._w=c*h*d+f*m*g;break;case"YZX":this._x=f*h*d+c*m*g,this._y=c*m*d+f*h*g,this._z=c*h*g-f*m*d,this._w=c*h*d-f*m*g;break;case"XZY":this._x=f*h*d-c*m*g,this._y=c*m*d-f*h*g,this._z=c*h*g+f*m*d,this._w=c*h*d+f*m*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t!==!1&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],d=t[10],f=n+o+d;if(f>0){const m=.5/Math.sqrt(f+1);this._w=.25/m,this._x=(h-l)*m,this._y=(s-c)*m,this._z=(a-r)*m}else if(n>o&&n>d){const m=2*Math.sqrt(1+n-o-d);this._w=(h-l)/m,this._x=.25*m,this._y=(r+a)/m,this._z=(s+c)/m}else if(o>d){const m=2*Math.sqrt(1+o-n-d);this._w=(s-c)/m,this._x=(r+a)/m,this._y=.25*m,this._z=(l+h)/m}else{const m=2*Math.sqrt(1+d-n-o);this._w=(a-r)/m,this._x=(s+c)/m,this._y=(l+h)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(bt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+a*o+r*c-s*l,this._y=r*h+a*l+s*o-n*c,this._z=s*h+a*c+n*l-r*o,this._w=a*h-n*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,r=this._y,s=this._z,a=this._w;let o=a*e._w+n*e._x+r*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=r,this._z=s,this;const l=1-o*o;if(l<=Number.EPSILON){const m=1-t;return this._w=m*a+t*this._w,this._x=m*n+t*this._x,this._y=m*r+t*this._y,this._z=m*s+t*this._z,this.normalize(),this._onChangeCallback(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),d=Math.sin((1-t)*h)/c,f=Math.sin(t*h)/c;return this._w=a*d+this._w*f,this._x=n*d+this._x*f,this._y=r*d+this._y*f,this._z=s*d+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),r=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(t*Math.cos(r),n*Math.sin(s),n*Math.cos(s),t*Math.sin(r))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class R{constructor(e=0,t=0,n=0){R.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ta.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ta.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=l*t+a*r-o*n,h=l*n+o*t-s*r,d=l*r+s*n-a*t,f=-s*t-a*n-o*r;return this.x=c*l+f*-s+h*-o-d*-a,this.y=h*l+f*-a+d*-s-c*-o,this.z=d*l+f*-o+c*-a-h*-s,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-n*l,this.z=n*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return qr.copy(this).projectOnVector(e),this.sub(qr)}reflect(e){return this.sub(qr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(bt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const qr=new R,Ta=new Ni;class Bn{constructor(e=new R(1/0,1/0,1/0),t=new R(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Qt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Qt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Qt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){if(e.updateWorldMatrix(!1,!1),e.boundingBox!==void 0)e.boundingBox===null&&e.computeBoundingBox(),Wn.copy(e.boundingBox),Wn.applyMatrix4(e.matrixWorld),this.union(Wn);else{const r=e.geometry;if(r!==void 0)if(t&&r.attributes!==void 0&&r.attributes.position!==void 0){const s=r.attributes.position;for(let a=0,o=s.count;a<o;a++)Qt.fromBufferAttribute(s,a).applyMatrix4(e.matrixWorld),this.expandByPoint(Qt)}else r.boundingBox===null&&r.computeBoundingBox(),Wn.copy(r.boundingBox),Wn.applyMatrix4(e.matrixWorld),this.union(Wn)}const n=e.children;for(let r=0,s=n.length;r<s;r++)this.expandByObject(n[r],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Qt),Qt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ei),Hi.subVectors(this.max,Ei),Xn.subVectors(e.a,Ei),jn.subVectors(e.b,Ei),qn.subVectors(e.c,Ei),hn.subVectors(jn,Xn),un.subVectors(qn,jn),An.subVectors(Xn,qn);let t=[0,-hn.z,hn.y,0,-un.z,un.y,0,-An.z,An.y,hn.z,0,-hn.x,un.z,0,-un.x,An.z,0,-An.x,-hn.y,hn.x,0,-un.y,un.x,0,-An.y,An.x,0];return!Yr(t,Xn,jn,qn,Hi)||(t=[1,0,0,0,1,0,0,0,1],!Yr(t,Xn,jn,qn,Hi))?!1:(Vi.crossVectors(hn,un),t=[Vi.x,Vi.y,Vi.z],Yr(t,Xn,jn,qn,Hi))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Qt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Qt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Jt[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Jt[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Jt[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Jt[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Jt[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Jt[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Jt[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Jt[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Jt),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Jt=[new R,new R,new R,new R,new R,new R,new R,new R],Qt=new R,Wn=new Bn,Xn=new R,jn=new R,qn=new R,hn=new R,un=new R,An=new R,Ei=new R,Hi=new R,Vi=new R,wn=new R;function Yr(i,e,t,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){wn.fromArray(i,s);const o=r.x*Math.abs(wn.x)+r.y*Math.abs(wn.y)+r.z*Math.abs(wn.z),l=e.dot(wn),c=t.dot(wn),h=n.dot(wn);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const Mc=new Bn,Ti=new R,$r=new R;class Rr{constructor(e=new R,t=-1){this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Mc.setFromPoints(e).getCenter(n);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ti.subVectors(e,this.center);const t=Ti.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(Ti,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):($r.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ti.copy(e.center).add($r)),this.expandByPoint(Ti.copy(e.center).sub($r))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const en=new R,Kr=new R,ki=new R,dn=new R,Zr=new R,Wi=new R,Jr=new R;class Po{constructor(e=new R,t=new R(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,en)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=en.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(en.copy(this.origin).addScaledVector(this.direction,t),en.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Kr.copy(e).add(t).multiplyScalar(.5),ki.copy(t).sub(e).normalize(),dn.copy(this.origin).sub(Kr);const s=e.distanceTo(t)*.5,a=-this.direction.dot(ki),o=dn.dot(this.direction),l=-dn.dot(ki),c=dn.lengthSq(),h=Math.abs(1-a*a);let d,f,m,g;if(h>0)if(d=a*l-o,f=a*o-l,g=s*h,d>=0)if(f>=-g)if(f<=g){const _=1/h;d*=_,f*=_,m=d*(d+a*f+2*o)+f*(a*d+f+2*l)+c}else f=s,d=Math.max(0,-(a*f+o)),m=-d*d+f*(f+2*l)+c;else f=-s,d=Math.max(0,-(a*f+o)),m=-d*d+f*(f+2*l)+c;else f<=-g?(d=Math.max(0,-(-a*s+o)),f=d>0?-s:Math.min(Math.max(-s,-l),s),m=-d*d+f*(f+2*l)+c):f<=g?(d=0,f=Math.min(Math.max(-s,-l),s),m=f*(f+2*l)+c):(d=Math.max(0,-(a*s+o)),f=d>0?s:Math.min(Math.max(-s,-l),s),m=-d*d+f*(f+2*l)+c);else f=a>0?-s:s,d=Math.max(0,-(a*f+o)),m=-d*d+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(Kr).addScaledVector(ki,f),m}intersectSphere(e,t){en.subVectors(e.center,this.origin);const n=en.dot(this.direction),r=en.dot(en)-n*n,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,f=this.origin;return c>=0?(n=(e.min.x-f.x)*c,r=(e.max.x-f.x)*c):(n=(e.max.x-f.x)*c,r=(e.min.x-f.x)*c),h>=0?(s=(e.min.y-f.y)*h,a=(e.max.y-f.y)*h):(s=(e.max.y-f.y)*h,a=(e.min.y-f.y)*h),n>a||s>r||((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),d>=0?(o=(e.min.z-f.z)*d,l=(e.max.z-f.z)*d):(o=(e.max.z-f.z)*d,l=(e.min.z-f.z)*d),n>l||o>r)||((o>n||n!==n)&&(n=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,en)!==null}intersectTriangle(e,t,n,r,s){Zr.subVectors(t,e),Wi.subVectors(n,e),Jr.crossVectors(Zr,Wi);let a=this.direction.dot(Jr),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;dn.subVectors(this.origin,e);const l=o*this.direction.dot(Wi.crossVectors(dn,Wi));if(l<0)return null;const c=o*this.direction.dot(Zr.cross(dn));if(c<0||l+c>a)return null;const h=-o*dn.dot(Jr);return h<0?null:this.at(h/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ze{constructor(e,t,n,r,s,a,o,l,c,h,d,f,m,g,_,p){Ze.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,l,c,h,d,f,m,g,_,p)}set(e,t,n,r,s,a,o,l,c,h,d,f,m,g,_,p){const u=this.elements;return u[0]=e,u[4]=t,u[8]=n,u[12]=r,u[1]=s,u[5]=a,u[9]=o,u[13]=l,u[2]=c,u[6]=h,u[10]=d,u[14]=f,u[3]=m,u[7]=g,u[11]=_,u[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ze().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,r=1/Yn.setFromMatrixColumn(e,0).length(),s=1/Yn.setFromMatrixColumn(e,1).length(),a=1/Yn.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(r),c=Math.sin(r),h=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const f=a*h,m=a*d,g=o*h,_=o*d;t[0]=l*h,t[4]=-l*d,t[8]=c,t[1]=m+g*c,t[5]=f-_*c,t[9]=-o*l,t[2]=_-f*c,t[6]=g+m*c,t[10]=a*l}else if(e.order==="YXZ"){const f=l*h,m=l*d,g=c*h,_=c*d;t[0]=f+_*o,t[4]=g*o-m,t[8]=a*c,t[1]=a*d,t[5]=a*h,t[9]=-o,t[2]=m*o-g,t[6]=_+f*o,t[10]=a*l}else if(e.order==="ZXY"){const f=l*h,m=l*d,g=c*h,_=c*d;t[0]=f-_*o,t[4]=-a*d,t[8]=g+m*o,t[1]=m+g*o,t[5]=a*h,t[9]=_-f*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const f=a*h,m=a*d,g=o*h,_=o*d;t[0]=l*h,t[4]=g*c-m,t[8]=f*c+_,t[1]=l*d,t[5]=_*c+f,t[9]=m*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const f=a*l,m=a*c,g=o*l,_=o*c;t[0]=l*h,t[4]=_-f*d,t[8]=g*d+m,t[1]=d,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=m*d+g,t[10]=f-_*d}else if(e.order==="XZY"){const f=a*l,m=a*c,g=o*l,_=o*c;t[0]=l*h,t[4]=-d,t[8]=c*h,t[1]=f*d+_,t[5]=a*h,t[9]=m*d-g,t[2]=g*d-m,t[6]=o*h,t[10]=_*d+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Sc,e,yc)}lookAt(e,t,n){const r=this.elements;return Dt.subVectors(e,t),Dt.lengthSq()===0&&(Dt.z=1),Dt.normalize(),fn.crossVectors(n,Dt),fn.lengthSq()===0&&(Math.abs(n.z)===1?Dt.x+=1e-4:Dt.z+=1e-4,Dt.normalize(),fn.crossVectors(n,Dt)),fn.normalize(),Xi.crossVectors(Dt,fn),r[0]=fn.x,r[4]=Xi.x,r[8]=Dt.x,r[1]=fn.y,r[5]=Xi.y,r[9]=Dt.y,r[2]=fn.z,r[6]=Xi.z,r[10]=Dt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],d=n[5],f=n[9],m=n[13],g=n[2],_=n[6],p=n[10],u=n[14],A=n[3],S=n[7],E=n[11],w=n[15],P=r[0],C=r[4],H=r[8],x=r[12],T=r[1],V=r[5],W=r[9],q=r[13],L=r[2],G=r[6],X=r[10],k=r[14],te=r[3],Y=r[7],j=r[11],D=r[15];return s[0]=a*P+o*T+l*L+c*te,s[4]=a*C+o*V+l*G+c*Y,s[8]=a*H+o*W+l*X+c*j,s[12]=a*x+o*q+l*k+c*D,s[1]=h*P+d*T+f*L+m*te,s[5]=h*C+d*V+f*G+m*Y,s[9]=h*H+d*W+f*X+m*j,s[13]=h*x+d*q+f*k+m*D,s[2]=g*P+_*T+p*L+u*te,s[6]=g*C+_*V+p*G+u*Y,s[10]=g*H+_*W+p*X+u*j,s[14]=g*x+_*q+p*k+u*D,s[3]=A*P+S*T+E*L+w*te,s[7]=A*C+S*V+E*G+w*Y,s[11]=A*H+S*W+E*X+w*j,s[15]=A*x+S*q+E*k+w*D,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],d=e[6],f=e[10],m=e[14],g=e[3],_=e[7],p=e[11],u=e[15];return g*(+s*l*d-r*c*d-s*o*f+n*c*f+r*o*m-n*l*m)+_*(+t*l*m-t*c*f+s*a*f-r*a*m+r*c*h-s*l*h)+p*(+t*c*d-t*o*m-s*a*d+n*a*m+s*o*h-n*c*h)+u*(-r*o*h-t*l*d+t*o*f+r*a*d-n*a*f+n*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=e[9],f=e[10],m=e[11],g=e[12],_=e[13],p=e[14],u=e[15],A=d*p*c-_*f*c+_*l*m-o*p*m-d*l*u+o*f*u,S=g*f*c-h*p*c-g*l*m+a*p*m+h*l*u-a*f*u,E=h*_*c-g*d*c+g*o*m-a*_*m-h*o*u+a*d*u,w=g*d*l-h*_*l-g*o*f+a*_*f+h*o*p-a*d*p,P=t*A+n*S+r*E+s*w;if(P===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/P;return e[0]=A*C,e[1]=(_*f*s-d*p*s-_*r*m+n*p*m+d*r*u-n*f*u)*C,e[2]=(o*p*s-_*l*s+_*r*c-n*p*c-o*r*u+n*l*u)*C,e[3]=(d*l*s-o*f*s-d*r*c+n*f*c+o*r*m-n*l*m)*C,e[4]=S*C,e[5]=(h*p*s-g*f*s+g*r*m-t*p*m-h*r*u+t*f*u)*C,e[6]=(g*l*s-a*p*s-g*r*c+t*p*c+a*r*u-t*l*u)*C,e[7]=(a*f*s-h*l*s+h*r*c-t*f*c-a*r*m+t*l*m)*C,e[8]=E*C,e[9]=(g*d*s-h*_*s-g*n*m+t*_*m+h*n*u-t*d*u)*C,e[10]=(a*_*s-g*o*s+g*n*c-t*_*c-a*n*u+t*o*u)*C,e[11]=(h*o*s-a*d*s-h*n*c+t*d*c+a*n*m-t*o*m)*C,e[12]=w*C,e[13]=(h*_*r-g*d*r+g*n*f-t*_*f-h*n*p+t*d*p)*C,e[14]=(g*o*r-a*_*r-g*n*l+t*_*l+a*n*p-t*o*p)*C,e[15]=(a*d*r-h*o*r+h*n*l-t*d*l-a*n*f+t*o*f)*C,this}scale(e){const t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),s=1-n,a=e.x,o=e.y,l=e.z,c=s*a,h=s*o;return this.set(c*a+n,c*o-r*l,c*l+r*o,0,c*o+r*l,h*o+n,h*l-r*a,0,c*l-r*o,h*l+r*a,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,a){return this.set(1,n,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,h=a+a,d=o+o,f=s*c,m=s*h,g=s*d,_=a*h,p=a*d,u=o*d,A=l*c,S=l*h,E=l*d,w=n.x,P=n.y,C=n.z;return r[0]=(1-(_+u))*w,r[1]=(m+E)*w,r[2]=(g-S)*w,r[3]=0,r[4]=(m-E)*P,r[5]=(1-(f+u))*P,r[6]=(p+A)*P,r[7]=0,r[8]=(g+S)*C,r[9]=(p-A)*C,r[10]=(1-(f+_))*C,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;let s=Yn.set(r[0],r[1],r[2]).length();const a=Yn.set(r[4],r[5],r[6]).length(),o=Yn.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],Ht.copy(this);const c=1/s,h=1/a,d=1/o;return Ht.elements[0]*=c,Ht.elements[1]*=c,Ht.elements[2]*=c,Ht.elements[4]*=h,Ht.elements[5]*=h,Ht.elements[6]*=h,Ht.elements[8]*=d,Ht.elements[9]*=d,Ht.elements[10]*=d,t.setFromRotationMatrix(Ht),n.x=s,n.y=a,n.z=o,this}makePerspective(e,t,n,r,s,a,o=on){const l=this.elements,c=2*s/(t-e),h=2*s/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r);let m,g;if(o===on)m=-(a+s)/(a-s),g=-2*a*s/(a-s);else if(o===vr)m=-a/(a-s),g=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=h,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,r,s,a,o=on){const l=this.elements,c=1/(t-e),h=1/(n-r),d=1/(a-s),f=(t+e)*c,m=(n+r)*h;let g,_;if(o===on)g=(a+s)*d,_=-2*d;else if(o===vr)g=s*d,_=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-m,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Yn=new R,Ht=new Ze,Sc=new R(0,0,0),yc=new R(1,1,1),fn=new R,Xi=new R,Dt=new R,ba=new Ze,Aa=new Ni;class Fi{constructor(e=0,t=0,n=0,r=Fi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],h=r[9],d=r[2],f=r[6],m=r[10];switch(t){case"XYZ":this._y=Math.asin(bt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,m),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-bt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(bt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,m),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-bt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,m),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(bt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-bt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return ba.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ba,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Aa.setFromEuler(this),this.setFromQuaternion(Aa,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Fi.DEFAULT_ORDER="XYZ";class Lo{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Ec=0;const wa=new R,$n=new Ni,tn=new Ze,ji=new R,bi=new R,Tc=new R,bc=new Ni,Ra=new R(1,0,0),Ca=new R(0,1,0),Pa=new R(0,0,1),Ac={type:"added"},wc={type:"removed"};class lt extends Vn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ec++}),this.uuid=Sn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=lt.DEFAULT_UP.clone();const e=new R,t=new Fi,n=new Ni,r=new R(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Ze},normalMatrix:{value:new Fe}}),this.matrix=new Ze,this.matrixWorld=new Ze,this.matrixAutoUpdate=lt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.matrixWorldAutoUpdate=lt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.layers=new Lo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return $n.setFromAxisAngle(e,t),this.quaternion.multiply($n),this}rotateOnWorldAxis(e,t){return $n.setFromAxisAngle(e,t),this.quaternion.premultiply($n),this}rotateX(e){return this.rotateOnAxis(Ra,e)}rotateY(e){return this.rotateOnAxis(Ca,e)}rotateZ(e){return this.rotateOnAxis(Pa,e)}translateOnAxis(e,t){return wa.copy(e).applyQuaternion(this.quaternion),this.position.add(wa.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Ra,e)}translateY(e){return this.translateOnAxis(Ca,e)}translateZ(e){return this.translateOnAxis(Pa,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(tn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ji.copy(e):ji.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),bi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?tn.lookAt(bi,ji,this.up):tn.lookAt(ji,bi,this.up),this.quaternion.setFromRotationMatrix(tn),r&&(tn.extractRotation(r.matrixWorld),$n.setFromRotationMatrix(tn),this.quaternion.premultiply($n.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(Ac)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(wc)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),tn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),tn.multiply(e.parent.matrixWorld)),e.applyMatrix4(tn),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t){let n=[];this[e]===t&&n.push(this);for(let r=0,s=this.children.length;r<s;r++){const a=this.children[r].getObjectsByProperty(e,t);a.length>0&&(n=n.concat(a))}return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(bi,e,Tc),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(bi,bc,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++){const s=t[n];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++){const o=r[s];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const d=l[c];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),d=a(e.shapes),f=a(e.skeletons),m=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),f.length>0&&(n.skeletons=f),m.length>0&&(n.animations=m),g.length>0&&(n.nodes=g)}return n.object=r,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}}lt.DEFAULT_UP=new R(0,1,0);lt.DEFAULT_MATRIX_AUTO_UPDATE=!0;lt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Vt=new R,nn=new R,Qr=new R,rn=new R,Kn=new R,Zn=new R,La=new R,es=new R,ts=new R,ns=new R;let qi=!1;class Ot{constructor(e=new R,t=new R,n=new R){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Vt.subVectors(e,t),r.cross(Vt);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){Vt.subVectors(r,t),nn.subVectors(n,t),Qr.subVectors(e,t);const a=Vt.dot(Vt),o=Vt.dot(nn),l=Vt.dot(Qr),c=nn.dot(nn),h=nn.dot(Qr),d=a*c-o*o;if(d===0)return s.set(-2,-1,-1);const f=1/d,m=(c*l-o*h)*f,g=(a*h-o*l)*f;return s.set(1-m-g,g,m)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,rn),rn.x>=0&&rn.y>=0&&rn.x+rn.y<=1}static getUV(e,t,n,r,s,a,o,l){return qi===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),qi=!0),this.getInterpolation(e,t,n,r,s,a,o,l)}static getInterpolation(e,t,n,r,s,a,o,l){return this.getBarycoord(e,t,n,r,rn),l.setScalar(0),l.addScaledVector(s,rn.x),l.addScaledVector(a,rn.y),l.addScaledVector(o,rn.z),l}static isFrontFacing(e,t,n,r){return Vt.subVectors(n,t),nn.subVectors(e,t),Vt.cross(nn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Vt.subVectors(this.c,this.b),nn.subVectors(this.a,this.b),Vt.cross(nn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Ot.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Ot.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,r,s){return qi===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),qi=!0),Ot.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}getInterpolation(e,t,n,r,s){return Ot.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return Ot.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Ot.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,s=this.c;let a,o;Kn.subVectors(r,n),Zn.subVectors(s,n),es.subVectors(e,n);const l=Kn.dot(es),c=Zn.dot(es);if(l<=0&&c<=0)return t.copy(n);ts.subVectors(e,r);const h=Kn.dot(ts),d=Zn.dot(ts);if(h>=0&&d<=h)return t.copy(r);const f=l*d-h*c;if(f<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(n).addScaledVector(Kn,a);ns.subVectors(e,s);const m=Kn.dot(ns),g=Zn.dot(ns);if(g>=0&&m<=g)return t.copy(s);const _=m*c-l*g;if(_<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(n).addScaledVector(Zn,o);const p=h*g-m*d;if(p<=0&&d-h>=0&&m-g>=0)return La.subVectors(s,r),o=(d-h)/(d-h+(m-g)),t.copy(r).addScaledVector(La,o);const u=1/(p+_+f);return a=_*u,o=f*u,t.copy(n).addScaledVector(Kn,a).addScaledVector(Zn,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}let Rc=0;class cn extends Vn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Rc++}),this.uuid=Sn(),this.name="",this.type="Material",this.blending=pi,this.side=En,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=go,this.blendDst=_o,this.blendEquation=ui,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.depthFunc=ps,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=rc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Hr,this.stencilZFail=Hr,this.stencilZPass=Hr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==pi&&(n.blending=this.blending),this.side!==En&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.stencilWrite=this.stencilWrite,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Do={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},pn={h:0,s:0,l:0},Yi={h:0,s:0,l:0};function is(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Be{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=ht){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Xe.toWorkingColorSpace(this,t),this}setRGB(e,t,n,r=Xe.workingColorSpace){return this.r=e,this.g=t,this.b=n,Xe.toWorkingColorSpace(this,r),this}setHSL(e,t,n,r=Xe.workingColorSpace){if(e=fc(e,1),t=bt(t,0,1),n=bt(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=is(a,s,e+1/3),this.g=is(a,s,e),this.b=is(a,s,e-1/3)}return Xe.toWorkingColorSpace(this,r),this}setStyle(e,t=ht){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=ht){const n=Do[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=mi(e.r),this.g=mi(e.g),this.b=mi(e.b),this}copyLinearToSRGB(e){return this.r=Xr(e.r),this.g=Xr(e.g),this.b=Xr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ht){return Xe.fromWorkingColorSpace(pt.copy(this),e),Math.round(bt(pt.r*255,0,255))*65536+Math.round(bt(pt.g*255,0,255))*256+Math.round(bt(pt.b*255,0,255))}getHexString(e=ht){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Xe.workingColorSpace){Xe.fromWorkingColorSpace(pt.copy(this),t);const n=pt.r,r=pt.g,s=pt.b,a=Math.max(n,r,s),o=Math.min(n,r,s);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const d=a-o;switch(c=h<=.5?d/(a+o):d/(2-a-o),a){case n:l=(r-s)/d+(r<s?6:0);break;case r:l=(s-n)/d+2;break;case s:l=(n-r)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=Xe.workingColorSpace){return Xe.fromWorkingColorSpace(pt.copy(this),t),e.r=pt.r,e.g=pt.g,e.b=pt.b,e}getStyle(e=ht){Xe.fromWorkingColorSpace(pt.copy(this),e);const t=pt.r,n=pt.g,r=pt.b;return e!==ht?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(pn),this.setHSL(pn.h+e,pn.s+t,pn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(pn),e.getHSL(Yi);const n=kr(pn.h,Yi.h,t),r=kr(pn.s,Yi.s,t),s=kr(pn.l,Yi.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const pt=new Be;Be.NAMES=Do;class zn extends cn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Be(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Tr,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const nt=new R,$i=new Pe;class Pt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=xs,this.updateRange={offset:0,count:-1},this.gpuType=_n,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)$i.fromBufferAttribute(this,t),$i.applyMatrix3(e),this.setXY(t,$i.x,$i.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)nt.fromBufferAttribute(this,t),nt.applyMatrix3(e),this.setXYZ(t,nt.x,nt.y,nt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)nt.fromBufferAttribute(this,t),nt.applyMatrix4(e),this.setXYZ(t,nt.x,nt.y,nt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)nt.fromBufferAttribute(this,t),nt.applyNormalMatrix(e),this.setXYZ(t,nt.x,nt.y,nt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)nt.fromBufferAttribute(this,t),nt.transformDirection(e),this.setXYZ(t,nt.x,nt.y,nt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=an(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=qe(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=an(t,this.array)),t}setX(e,t){return this.normalized&&(t=qe(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=an(t,this.array)),t}setY(e,t){return this.normalized&&(t=qe(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=an(t,this.array)),t}setZ(e,t){return this.normalized&&(t=qe(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=an(t,this.array)),t}setW(e,t){return this.normalized&&(t=qe(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=qe(t,this.array),n=qe(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=qe(t,this.array),n=qe(n,this.array),r=qe(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=qe(t,this.array),n=qe(n,this.array),r=qe(r,this.array),s=qe(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==xs&&(e.usage=this.usage),(this.updateRange.offset!==0||this.updateRange.count!==-1)&&(e.updateRange=this.updateRange),e}}class Uo extends Pt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Io extends Pt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class it extends Pt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Cc=0;const Nt=new Ze,rs=new lt,Jn=new R,Ut=new Bn,Ai=new Bn,at=new R;class mt extends Vn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Cc++}),this.uuid=Sn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Ao(e)?Io:Uo)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Fe().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Nt.makeRotationFromQuaternion(e),this.applyMatrix4(Nt),this}rotateX(e){return Nt.makeRotationX(e),this.applyMatrix4(Nt),this}rotateY(e){return Nt.makeRotationY(e),this.applyMatrix4(Nt),this}rotateZ(e){return Nt.makeRotationZ(e),this.applyMatrix4(Nt),this}translate(e,t,n){return Nt.makeTranslation(e,t,n),this.applyMatrix4(Nt),this}scale(e,t,n){return Nt.makeScale(e,t,n),this.applyMatrix4(Nt),this}lookAt(e){return rs.lookAt(e),rs.updateMatrix(),this.applyMatrix4(rs.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Jn).negate(),this.translate(Jn.x,Jn.y,Jn.z),this}setFromPoints(e){const t=[];for(let n=0,r=e.length;n<r;n++){const s=e[n];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new it(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Bn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new R(-1/0,-1/0,-1/0),new R(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const s=t[n];Ut.setFromBufferAttribute(s),this.morphTargetsRelative?(at.addVectors(this.boundingBox.min,Ut.min),this.boundingBox.expandByPoint(at),at.addVectors(this.boundingBox.max,Ut.max),this.boundingBox.expandByPoint(at)):(this.boundingBox.expandByPoint(Ut.min),this.boundingBox.expandByPoint(Ut.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Rr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new R,1/0);return}if(e){const n=this.boundingSphere.center;if(Ut.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];Ai.setFromBufferAttribute(o),this.morphTargetsRelative?(at.addVectors(Ut.min,Ai.min),Ut.expandByPoint(at),at.addVectors(Ut.max,Ai.max),Ut.expandByPoint(at)):(Ut.expandByPoint(Ai.min),Ut.expandByPoint(Ai.max))}Ut.getCenter(n);let r=0;for(let s=0,a=e.count;s<a;s++)at.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(at));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)at.fromBufferAttribute(o,c),l&&(Jn.fromBufferAttribute(e,c),at.add(Jn)),r=Math.max(r,n.distanceToSquared(at))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.array,r=t.position.array,s=t.normal.array,a=t.uv.array,o=r.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Pt(new Float32Array(4*o),4));const l=this.getAttribute("tangent").array,c=[],h=[];for(let T=0;T<o;T++)c[T]=new R,h[T]=new R;const d=new R,f=new R,m=new R,g=new Pe,_=new Pe,p=new Pe,u=new R,A=new R;function S(T,V,W){d.fromArray(r,T*3),f.fromArray(r,V*3),m.fromArray(r,W*3),g.fromArray(a,T*2),_.fromArray(a,V*2),p.fromArray(a,W*2),f.sub(d),m.sub(d),_.sub(g),p.sub(g);const q=1/(_.x*p.y-p.x*_.y);isFinite(q)&&(u.copy(f).multiplyScalar(p.y).addScaledVector(m,-_.y).multiplyScalar(q),A.copy(m).multiplyScalar(_.x).addScaledVector(f,-p.x).multiplyScalar(q),c[T].add(u),c[V].add(u),c[W].add(u),h[T].add(A),h[V].add(A),h[W].add(A))}let E=this.groups;E.length===0&&(E=[{start:0,count:n.length}]);for(let T=0,V=E.length;T<V;++T){const W=E[T],q=W.start,L=W.count;for(let G=q,X=q+L;G<X;G+=3)S(n[G+0],n[G+1],n[G+2])}const w=new R,P=new R,C=new R,H=new R;function x(T){C.fromArray(s,T*3),H.copy(C);const V=c[T];w.copy(V),w.sub(C.multiplyScalar(C.dot(V))).normalize(),P.crossVectors(H,V);const q=P.dot(h[T])<0?-1:1;l[T*4]=w.x,l[T*4+1]=w.y,l[T*4+2]=w.z,l[T*4+3]=q}for(let T=0,V=E.length;T<V;++T){const W=E[T],q=W.start,L=W.count;for(let G=q,X=q+L;G<X;G+=3)x(n[G+0]),x(n[G+1]),x(n[G+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Pt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,m=n.count;f<m;f++)n.setXYZ(f,0,0,0);const r=new R,s=new R,a=new R,o=new R,l=new R,c=new R,h=new R,d=new R;if(e)for(let f=0,m=e.count;f<m;f+=3){const g=e.getX(f+0),_=e.getX(f+1),p=e.getX(f+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,_),a.fromBufferAttribute(t,p),h.subVectors(a,s),d.subVectors(r,s),h.cross(d),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,p),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let f=0,m=t.count;f<m;f+=3)r.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),a.fromBufferAttribute(t,f+2),h.subVectors(a,s),d.subVectors(r,s),h.cross(d),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)at.fromBufferAttribute(e,t),at.normalize(),e.setXYZ(t,at.x,at.y,at.z)}toNonIndexed(){function e(o,l){const c=o.array,h=o.itemSize,d=o.normalized,f=new c.constructor(l.length*h);let m=0,g=0;for(let _=0,p=l.length;_<p;_++){o.isInterleavedBufferAttribute?m=l[_]*o.data.stride+o.offset:m=l[_]*h;for(let u=0;u<h;u++)f[g++]=c[m++]}return new Pt(f,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new mt,n=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=e(l,n);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let h=0,d=c.length;h<d;h++){const f=c[h],m=e(f,n);l.push(m)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let d=0,f=c.length;d<f;d++){const m=c[d];h.push(m.toJSON(e.data))}h.length>0&&(r[l]=h,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const r=e.attributes;for(const c in r){const h=r[c];this.setAttribute(c,h.clone(t))}const s=e.morphAttributes;for(const c in s){const h=[],d=s[c];for(let f=0,m=d.length;f<m;f++)h.push(d[f].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,h=a.length;c<h;c++){const d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Da=new Ze,Rn=new Po,Ki=new Rr,Ua=new R,Qn=new R,ei=new R,ti=new R,ss=new R,Zi=new R,Ji=new Pe,Qi=new Pe,er=new Pe,Ia=new R,Na=new R,Fa=new R,tr=new R,nr=new R;class He extends lt{constructor(e=new mt,t=new zn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){Zi.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const h=o[l],d=s[l];h!==0&&(ss.fromBufferAttribute(d,e),a?Zi.addScaledVector(ss,h):Zi.addScaledVector(ss.sub(t),h))}t.add(Zi)}return t}raycast(e,t){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ki.copy(n.boundingSphere),Ki.applyMatrix4(s),Rn.copy(e.ray).recast(e.near),!(Ki.containsPoint(Rn.origin)===!1&&(Rn.intersectSphere(Ki,Ua)===null||Rn.origin.distanceToSquared(Ua)>(e.far-e.near)**2))&&(Da.copy(s).invert(),Rn.copy(e.ray).applyMatrix4(Da),!(n.boundingBox!==null&&Rn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Rn)))}_computeIntersections(e,t,n){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,d=s.attributes.normal,f=s.groups,m=s.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=f.length;g<_;g++){const p=f[g],u=a[p.materialIndex],A=Math.max(p.start,m.start),S=Math.min(o.count,Math.min(p.start+p.count,m.start+m.count));for(let E=A,w=S;E<w;E+=3){const P=o.getX(E),C=o.getX(E+1),H=o.getX(E+2);r=ir(this,u,e,n,c,h,d,P,C,H),r&&(r.faceIndex=Math.floor(E/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{const g=Math.max(0,m.start),_=Math.min(o.count,m.start+m.count);for(let p=g,u=_;p<u;p+=3){const A=o.getX(p),S=o.getX(p+1),E=o.getX(p+2);r=ir(this,a,e,n,c,h,d,A,S,E),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,_=f.length;g<_;g++){const p=f[g],u=a[p.materialIndex],A=Math.max(p.start,m.start),S=Math.min(l.count,Math.min(p.start+p.count,m.start+m.count));for(let E=A,w=S;E<w;E+=3){const P=E,C=E+1,H=E+2;r=ir(this,u,e,n,c,h,d,P,C,H),r&&(r.faceIndex=Math.floor(E/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{const g=Math.max(0,m.start),_=Math.min(l.count,m.start+m.count);for(let p=g,u=_;p<u;p+=3){const A=p,S=p+1,E=p+2;r=ir(this,a,e,n,c,h,d,A,S,E),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}}}function Pc(i,e,t,n,r,s,a,o){let l;if(e.side===Rt?l=n.intersectTriangle(a,s,r,!0,o):l=n.intersectTriangle(r,s,a,e.side===En,o),l===null)return null;nr.copy(o),nr.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(nr);return c<t.near||c>t.far?null:{distance:c,point:nr.clone(),object:i}}function ir(i,e,t,n,r,s,a,o,l,c){i.getVertexPosition(o,Qn),i.getVertexPosition(l,ei),i.getVertexPosition(c,ti);const h=Pc(i,e,t,n,Qn,ei,ti,tr);if(h){r&&(Ji.fromBufferAttribute(r,o),Qi.fromBufferAttribute(r,l),er.fromBufferAttribute(r,c),h.uv=Ot.getInterpolation(tr,Qn,ei,ti,Ji,Qi,er,new Pe)),s&&(Ji.fromBufferAttribute(s,o),Qi.fromBufferAttribute(s,l),er.fromBufferAttribute(s,c),h.uv1=Ot.getInterpolation(tr,Qn,ei,ti,Ji,Qi,er,new Pe),h.uv2=h.uv1),a&&(Ia.fromBufferAttribute(a,o),Na.fromBufferAttribute(a,l),Fa.fromBufferAttribute(a,c),h.normal=Ot.getInterpolation(tr,Qn,ei,ti,Ia,Na,Fa,new R),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new R,materialIndex:0};Ot.getNormal(Qn,ei,ti,d.normal),h.face=d}return h}class Xt extends mt{constructor(e=1,t=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],h=[],d=[];let f=0,m=0;g("z","y","x",-1,-1,n,t,e,a,s,0),g("z","y","x",1,-1,n,t,-e,a,s,1),g("x","z","y",1,1,e,n,t,r,a,2),g("x","z","y",1,-1,e,n,-t,r,a,3),g("x","y","z",1,-1,e,t,n,r,s,4),g("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(l),this.setAttribute("position",new it(c,3)),this.setAttribute("normal",new it(h,3)),this.setAttribute("uv",new it(d,2));function g(_,p,u,A,S,E,w,P,C,H,x){const T=E/C,V=w/H,W=E/2,q=w/2,L=P/2,G=C+1,X=H+1;let k=0,te=0;const Y=new R;for(let j=0;j<X;j++){const D=j*V-q;for(let z=0;z<G;z++){const oe=z*T-W;Y[_]=oe*A,Y[p]=D*S,Y[u]=L,c.push(Y.x,Y.y,Y.z),Y[_]=0,Y[p]=0,Y[u]=P>0?1:-1,h.push(Y.x,Y.y,Y.z),d.push(z/C),d.push(1-j/H),k+=1}}for(let j=0;j<H;j++)for(let D=0;D<C;D++){const z=f+D+G*j,oe=f+D+G*(j+1),le=f+(D+1)+G*(j+1),de=f+(D+1)+G*j;l.push(z,oe,de),l.push(oe,le,de),te+=6}o.addGroup(m,te,x),m+=te,f+=k}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Xt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function xi(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const r=i[t][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone():Array.isArray(r)?e[t][n]=r.slice():e[t][n]=r}}return e}function Mt(i){const e={};for(let t=0;t<i.length;t++){const n=xi(i[t]);for(const r in n)e[r]=n[r]}return e}function Lc(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function No(i){return i.getRenderTarget()===null?i.outputColorSpace:Xe.workingColorSpace}const Dc={clone:xi,merge:Mt};var Uc=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ic=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Gn extends cn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Uc,this.fragmentShader=Ic,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=xi(e.uniforms),this.uniformsGroups=Lc(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Fo extends lt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ze,this.projectionMatrix=new Ze,this.projectionMatrixInverse=new Ze,this.coordinateSystem=on}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class Bt extends Fo{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ss*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Vr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ss*2*Math.atan(Math.tan(Vr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Vr*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*n/c,r*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const ni=-90,ii=1;class Nc extends lt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Bt(ni,ii,e,t);r.layers=this.layers,this.add(r);const s=new Bt(ni,ii,e,t);s.layers=this.layers,this.add(s);const a=new Bt(ni,ii,e,t);a.layers=this.layers,this.add(a);const o=new Bt(ni,ii,e,t);o.layers=this.layers,this.add(o);const l=new Bt(ni,ii,e,t);l.layers=this.layers,this.add(l);const c=new Bt(ni,ii,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,r,s,a,o,l]=t;for(const c of t)this.remove(c);if(e===on)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===vr)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,h]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,r),e.render(t,s),e.setRenderTarget(n,1,r),e.render(t,a),e.setRenderTarget(n,2,r),e.render(t,o),e.setRenderTarget(n,3,r),e.render(t,l),e.setRenderTarget(n,4,r),e.render(t,c),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,r),e.render(t,h),e.setRenderTarget(d,f,m),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Oo extends Ct{constructor(e,t,n,r,s,a,o,l,c,h){e=e!==void 0?e:[],t=t!==void 0?t:gi,super(e,t,n,r,s,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Fc extends On{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];t.encoding!==void 0&&(Di("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===Fn?ht:Gt),this.texture=new Oo(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Ft}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Xt(5,5,5),s=new Gn({name:"CubemapFromEquirect",uniforms:xi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Rt,blending:vn});s.uniforms.tEquirect.value=t;const a=new He(r,s),o=t.minFilter;return t.minFilter===Ui&&(t.minFilter=Ft),new Nc(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,r){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,r);e.setRenderTarget(s)}}const as=new R,Oc=new R,Bc=new Fe;class Pn{constructor(e=new R(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=as.subVectors(n,t).cross(Oc.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(as),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Bc.getNormalMatrix(e),r=this.coplanarPoint(as).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Cn=new Rr,rr=new R;class Rs{constructor(e=new Pn,t=new Pn,n=new Pn,r=new Pn,s=new Pn,a=new Pn){this.planes=[e,t,n,r,s,a]}set(e,t,n,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=on){const n=this.planes,r=e.elements,s=r[0],a=r[1],o=r[2],l=r[3],c=r[4],h=r[5],d=r[6],f=r[7],m=r[8],g=r[9],_=r[10],p=r[11],u=r[12],A=r[13],S=r[14],E=r[15];if(n[0].setComponents(l-s,f-c,p-m,E-u).normalize(),n[1].setComponents(l+s,f+c,p+m,E+u).normalize(),n[2].setComponents(l+a,f+h,p+g,E+A).normalize(),n[3].setComponents(l-a,f-h,p-g,E-A).normalize(),n[4].setComponents(l-o,f-d,p-_,E-S).normalize(),t===on)n[5].setComponents(l+o,f+d,p+_,E+S).normalize();else if(t===vr)n[5].setComponents(o,d,_,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Cn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Cn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Cn)}intersectsSprite(e){return Cn.center.set(0,0,0),Cn.radius=.7071067811865476,Cn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Cn)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(rr.x=r.normal.x>0?e.max.x:e.min.x,rr.y=r.normal.y>0?e.max.y:e.min.y,rr.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(rr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Bo(){let i=null,e=!1,t=null,n=null;function r(s,a){t(s,a),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function zc(i,e){const t=e.isWebGL2,n=new WeakMap;function r(c,h){const d=c.array,f=c.usage,m=i.createBuffer();i.bindBuffer(h,m),i.bufferData(h,d,f),c.onUploadCallback();let g;if(d instanceof Float32Array)g=i.FLOAT;else if(d instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(t)g=i.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else g=i.UNSIGNED_SHORT;else if(d instanceof Int16Array)g=i.SHORT;else if(d instanceof Uint32Array)g=i.UNSIGNED_INT;else if(d instanceof Int32Array)g=i.INT;else if(d instanceof Int8Array)g=i.BYTE;else if(d instanceof Uint8Array)g=i.UNSIGNED_BYTE;else if(d instanceof Uint8ClampedArray)g=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+d);return{buffer:m,type:g,bytesPerElement:d.BYTES_PER_ELEMENT,version:c.version}}function s(c,h,d){const f=h.array,m=h.updateRange;i.bindBuffer(d,c),m.count===-1?i.bufferSubData(d,0,f):(t?i.bufferSubData(d,m.offset*f.BYTES_PER_ELEMENT,f,m.offset,m.count):i.bufferSubData(d,m.offset*f.BYTES_PER_ELEMENT,f.subarray(m.offset,m.offset+m.count)),m.count=-1),h.onUploadCallback()}function a(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function o(c){c.isInterleavedBufferAttribute&&(c=c.data);const h=n.get(c);h&&(i.deleteBuffer(h.buffer),n.delete(c))}function l(c,h){if(c.isGLBufferAttribute){const f=n.get(c);(!f||f.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const d=n.get(c);d===void 0?n.set(c,r(c,h)):d.version<c.version&&(s(d.buffer,c,h),d.version=c.version)}return{get:a,remove:o,update:l}}class Mi extends mt{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(n),l=Math.floor(r),c=o+1,h=l+1,d=e/o,f=t/l,m=[],g=[],_=[],p=[];for(let u=0;u<h;u++){const A=u*f-a;for(let S=0;S<c;S++){const E=S*d-s;g.push(E,-A,0),_.push(0,0,1),p.push(S/o),p.push(1-u/l)}}for(let u=0;u<l;u++)for(let A=0;A<o;A++){const S=A+c*u,E=A+c*(u+1),w=A+1+c*(u+1),P=A+1+c*u;m.push(S,E,P),m.push(E,w,P)}this.setIndex(m),this.setAttribute("position",new it(g,3)),this.setAttribute("normal",new it(_,3)),this.setAttribute("uv",new it(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Mi(e.width,e.height,e.widthSegments,e.heightSegments)}}var Gc=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Hc=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Vc=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,kc=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Wc=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Xc=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,jc=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,qc=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Yc=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,$c=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Kc=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Zc=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Jc=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = dFdx( surf_pos.xyz );
		vec3 vSigmaY = dFdy( surf_pos.xyz );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Qc=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,eh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,th=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,nh=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ih=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,rh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,sh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,ah=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,oh=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,lh=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_v0 0.339
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_v1 0.276
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_v4 0.046
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_v5 0.016
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_v6 0.0038
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,ch=`vec3 transformedNormal = objectNormal;
#ifdef USE_INSTANCING
	mat3 m = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );
	transformedNormal = m * transformedNormal;
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	vec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,hh=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,uh=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,dh=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,fh=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,ph="gl_FragColor = linearToOutputTexel( gl_FragColor );",mh=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,gh=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,_h=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,vh=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,xh=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Mh=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Sh=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,yh=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Eh=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Th=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,bh=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Ah=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,wh=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Rh=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Ch=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Ph=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Lh=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Dh=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Uh=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Ih=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Nh=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Fh=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	anisotropyV /= material.anisotropy;
	material.anisotropy = saturate( material.anisotropy );
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x - tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x + tbn[ 0 ] * anisotropyV.y;
#endif`,Oh=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecular = vec3( 0.0 );
vec3 sheenSpecular = vec3( 0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecular += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecular += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecular += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecular += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Bh=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal;
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,zh=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Gh=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Hh=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Vh=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,kh=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Wh=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Xh=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,jh=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,qh=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Yh=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,$h=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Kh=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Zh=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Jh=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,Qh=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,eu=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,tu=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,nu=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,iu=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ru=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,su=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,au=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,ou=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,lu=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,cu=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,hu=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,uu=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,du=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,fu=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,pu=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,mu=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,gu=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,_u=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,vu=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,xu=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,Mu=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Su=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,yu=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Eu=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Tu=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	uniform int boneTextureSize;
	mat4 getBoneMatrix( const in float i ) {
		float j = i * 4.0;
		float x = mod( j, float( boneTextureSize ) );
		float y = floor( j / float( boneTextureSize ) );
		float dx = 1.0 / float( boneTextureSize );
		float dy = 1.0 / float( boneTextureSize );
		y = dy * ( y + 0.5 );
		vec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );
		vec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );
		vec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );
		vec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );
		mat4 bone = mat4( v1, v2, v3, v4 );
		return bone;
	}
#endif`,bu=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Au=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,wu=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Ru=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Cu=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Pu=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Lu=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Du=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Uu=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Iu=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Nu=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Fu=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Ou=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Bu=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,zu=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Gu=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Hu=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Vu=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ku=`#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Wu=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,Xu=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,ju=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,qu=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Yu=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$u=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Ku=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Zu=`#include <common>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Ju=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Qu=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ed=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,td=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,nd=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,id=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,rd=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,sd=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ad=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,od=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,ld=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecular;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + clearcoatSpecular * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,cd=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,hd=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ud=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,dd=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,fd=`#include <common>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,pd=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,md=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,gd=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ue={alphahash_fragment:Gc,alphahash_pars_fragment:Hc,alphamap_fragment:Vc,alphamap_pars_fragment:kc,alphatest_fragment:Wc,alphatest_pars_fragment:Xc,aomap_fragment:jc,aomap_pars_fragment:qc,begin_vertex:Yc,beginnormal_vertex:$c,bsdfs:Kc,iridescence_fragment:Zc,bumpmap_pars_fragment:Jc,clipping_planes_fragment:Qc,clipping_planes_pars_fragment:eh,clipping_planes_pars_vertex:th,clipping_planes_vertex:nh,color_fragment:ih,color_pars_fragment:rh,color_pars_vertex:sh,color_vertex:ah,common:oh,cube_uv_reflection_fragment:lh,defaultnormal_vertex:ch,displacementmap_pars_vertex:hh,displacementmap_vertex:uh,emissivemap_fragment:dh,emissivemap_pars_fragment:fh,colorspace_fragment:ph,colorspace_pars_fragment:mh,envmap_fragment:gh,envmap_common_pars_fragment:_h,envmap_pars_fragment:vh,envmap_pars_vertex:xh,envmap_physical_pars_fragment:Lh,envmap_vertex:Mh,fog_vertex:Sh,fog_pars_vertex:yh,fog_fragment:Eh,fog_pars_fragment:Th,gradientmap_pars_fragment:bh,lightmap_fragment:Ah,lightmap_pars_fragment:wh,lights_lambert_fragment:Rh,lights_lambert_pars_fragment:Ch,lights_pars_begin:Ph,lights_toon_fragment:Dh,lights_toon_pars_fragment:Uh,lights_phong_fragment:Ih,lights_phong_pars_fragment:Nh,lights_physical_fragment:Fh,lights_physical_pars_fragment:Oh,lights_fragment_begin:Bh,lights_fragment_maps:zh,lights_fragment_end:Gh,logdepthbuf_fragment:Hh,logdepthbuf_pars_fragment:Vh,logdepthbuf_pars_vertex:kh,logdepthbuf_vertex:Wh,map_fragment:Xh,map_pars_fragment:jh,map_particle_fragment:qh,map_particle_pars_fragment:Yh,metalnessmap_fragment:$h,metalnessmap_pars_fragment:Kh,morphcolor_vertex:Zh,morphnormal_vertex:Jh,morphtarget_pars_vertex:Qh,morphtarget_vertex:eu,normal_fragment_begin:tu,normal_fragment_maps:nu,normal_pars_fragment:iu,normal_pars_vertex:ru,normal_vertex:su,normalmap_pars_fragment:au,clearcoat_normal_fragment_begin:ou,clearcoat_normal_fragment_maps:lu,clearcoat_pars_fragment:cu,iridescence_pars_fragment:hu,opaque_fragment:uu,packing:du,premultiplied_alpha_fragment:fu,project_vertex:pu,dithering_fragment:mu,dithering_pars_fragment:gu,roughnessmap_fragment:_u,roughnessmap_pars_fragment:vu,shadowmap_pars_fragment:xu,shadowmap_pars_vertex:Mu,shadowmap_vertex:Su,shadowmask_pars_fragment:yu,skinbase_vertex:Eu,skinning_pars_vertex:Tu,skinning_vertex:bu,skinnormal_vertex:Au,specularmap_fragment:wu,specularmap_pars_fragment:Ru,tonemapping_fragment:Cu,tonemapping_pars_fragment:Pu,transmission_fragment:Lu,transmission_pars_fragment:Du,uv_pars_fragment:Uu,uv_pars_vertex:Iu,uv_vertex:Nu,worldpos_vertex:Fu,background_vert:Ou,background_frag:Bu,backgroundCube_vert:zu,backgroundCube_frag:Gu,cube_vert:Hu,cube_frag:Vu,depth_vert:ku,depth_frag:Wu,distanceRGBA_vert:Xu,distanceRGBA_frag:ju,equirect_vert:qu,equirect_frag:Yu,linedashed_vert:$u,linedashed_frag:Ku,meshbasic_vert:Zu,meshbasic_frag:Ju,meshlambert_vert:Qu,meshlambert_frag:ed,meshmatcap_vert:td,meshmatcap_frag:nd,meshnormal_vert:id,meshnormal_frag:rd,meshphong_vert:sd,meshphong_frag:ad,meshphysical_vert:od,meshphysical_frag:ld,meshtoon_vert:cd,meshtoon_frag:hd,points_vert:ud,points_frag:dd,shadow_vert:fd,shadow_frag:pd,sprite_vert:md,sprite_frag:gd},se={common:{diffuse:{value:new Be(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Fe},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Fe}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Fe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Fe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Fe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Fe},normalScale:{value:new Pe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Fe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Fe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Fe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Fe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Be(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Be(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0},uvTransform:{value:new Fe}},sprite:{diffuse:{value:new Be(16777215)},opacity:{value:1},center:{value:new Pe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Fe},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0}}},qt={basic:{uniforms:Mt([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.fog]),vertexShader:Ue.meshbasic_vert,fragmentShader:Ue.meshbasic_frag},lambert:{uniforms:Mt([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.fog,se.lights,{emissive:{value:new Be(0)}}]),vertexShader:Ue.meshlambert_vert,fragmentShader:Ue.meshlambert_frag},phong:{uniforms:Mt([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.fog,se.lights,{emissive:{value:new Be(0)},specular:{value:new Be(1118481)},shininess:{value:30}}]),vertexShader:Ue.meshphong_vert,fragmentShader:Ue.meshphong_frag},standard:{uniforms:Mt([se.common,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.roughnessmap,se.metalnessmap,se.fog,se.lights,{emissive:{value:new Be(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ue.meshphysical_vert,fragmentShader:Ue.meshphysical_frag},toon:{uniforms:Mt([se.common,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.gradientmap,se.fog,se.lights,{emissive:{value:new Be(0)}}]),vertexShader:Ue.meshtoon_vert,fragmentShader:Ue.meshtoon_frag},matcap:{uniforms:Mt([se.common,se.bumpmap,se.normalmap,se.displacementmap,se.fog,{matcap:{value:null}}]),vertexShader:Ue.meshmatcap_vert,fragmentShader:Ue.meshmatcap_frag},points:{uniforms:Mt([se.points,se.fog]),vertexShader:Ue.points_vert,fragmentShader:Ue.points_frag},dashed:{uniforms:Mt([se.common,se.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ue.linedashed_vert,fragmentShader:Ue.linedashed_frag},depth:{uniforms:Mt([se.common,se.displacementmap]),vertexShader:Ue.depth_vert,fragmentShader:Ue.depth_frag},normal:{uniforms:Mt([se.common,se.bumpmap,se.normalmap,se.displacementmap,{opacity:{value:1}}]),vertexShader:Ue.meshnormal_vert,fragmentShader:Ue.meshnormal_frag},sprite:{uniforms:Mt([se.sprite,se.fog]),vertexShader:Ue.sprite_vert,fragmentShader:Ue.sprite_frag},background:{uniforms:{uvTransform:{value:new Fe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ue.background_vert,fragmentShader:Ue.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Ue.backgroundCube_vert,fragmentShader:Ue.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ue.cube_vert,fragmentShader:Ue.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ue.equirect_vert,fragmentShader:Ue.equirect_frag},distanceRGBA:{uniforms:Mt([se.common,se.displacementmap,{referencePosition:{value:new R},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ue.distanceRGBA_vert,fragmentShader:Ue.distanceRGBA_frag},shadow:{uniforms:Mt([se.lights,se.fog,{color:{value:new Be(0)},opacity:{value:1}}]),vertexShader:Ue.shadow_vert,fragmentShader:Ue.shadow_frag}};qt.physical={uniforms:Mt([qt.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Fe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Fe},clearcoatNormalScale:{value:new Pe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Fe},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Fe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Fe},sheen:{value:0},sheenColor:{value:new Be(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Fe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Fe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Fe},transmissionSamplerSize:{value:new Pe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Fe},attenuationDistance:{value:0},attenuationColor:{value:new Be(0)},specularColor:{value:new Be(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Fe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Fe},anisotropyVector:{value:new Pe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Fe}}]),vertexShader:Ue.meshphysical_vert,fragmentShader:Ue.meshphysical_frag};const sr={r:0,b:0,g:0};function _d(i,e,t,n,r,s,a){const o=new Be(0);let l=s===!0?0:1,c,h,d=null,f=0,m=null;function g(p,u){let A=!1,S=u.isScene===!0?u.background:null;S&&S.isTexture&&(S=(u.backgroundBlurriness>0?t:e).get(S)),S===null?_(o,l):S&&S.isColor&&(_(S,1),A=!0);const E=i.xr.getEnvironmentBlendMode();E==="additive"?n.buffers.color.setClear(0,0,0,1,a):E==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||A)&&i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil),S&&(S.isCubeTexture||S.mapping===br)?(h===void 0&&(h=new He(new Xt(1,1,1),new Gn({name:"BackgroundCubeMaterial",uniforms:xi(qt.backgroundCube.uniforms),vertexShader:qt.backgroundCube.vertexShader,fragmentShader:qt.backgroundCube.fragmentShader,side:Rt,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(w,P,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(h)),h.material.uniforms.envMap.value=S,h.material.uniforms.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=u.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=u.backgroundIntensity,h.material.toneMapped=Xe.getTransfer(S.colorSpace)!==$e,(d!==S||f!==S.version||m!==i.toneMapping)&&(h.material.needsUpdate=!0,d=S,f=S.version,m=i.toneMapping),h.layers.enableAll(),p.unshift(h,h.geometry,h.material,0,0,null)):S&&S.isTexture&&(c===void 0&&(c=new He(new Mi(2,2),new Gn({name:"BackgroundMaterial",uniforms:xi(qt.background.uniforms),vertexShader:qt.background.vertexShader,fragmentShader:qt.background.fragmentShader,side:En,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=S,c.material.uniforms.backgroundIntensity.value=u.backgroundIntensity,c.material.toneMapped=Xe.getTransfer(S.colorSpace)!==$e,S.matrixAutoUpdate===!0&&S.updateMatrix(),c.material.uniforms.uvTransform.value.copy(S.matrix),(d!==S||f!==S.version||m!==i.toneMapping)&&(c.material.needsUpdate=!0,d=S,f=S.version,m=i.toneMapping),c.layers.enableAll(),p.unshift(c,c.geometry,c.material,0,0,null))}function _(p,u){p.getRGB(sr,No(i)),n.buffers.color.setClear(sr.r,sr.g,sr.b,u,a)}return{getClearColor:function(){return o},setClearColor:function(p,u=1){o.set(p),l=u,_(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(p){l=p,_(o,l)},render:g}}function vd(i,e,t,n){const r=i.getParameter(i.MAX_VERTEX_ATTRIBS),s=n.isWebGL2?null:e.get("OES_vertex_array_object"),a=n.isWebGL2||s!==null,o={},l=p(null);let c=l,h=!1;function d(L,G,X,k,te){let Y=!1;if(a){const j=_(k,X,G);c!==j&&(c=j,m(c.object)),Y=u(L,k,X,te),Y&&A(L,k,X,te)}else{const j=G.wireframe===!0;(c.geometry!==k.id||c.program!==X.id||c.wireframe!==j)&&(c.geometry=k.id,c.program=X.id,c.wireframe=j,Y=!0)}te!==null&&t.update(te,i.ELEMENT_ARRAY_BUFFER),(Y||h)&&(h=!1,H(L,G,X,k),te!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(te).buffer))}function f(){return n.isWebGL2?i.createVertexArray():s.createVertexArrayOES()}function m(L){return n.isWebGL2?i.bindVertexArray(L):s.bindVertexArrayOES(L)}function g(L){return n.isWebGL2?i.deleteVertexArray(L):s.deleteVertexArrayOES(L)}function _(L,G,X){const k=X.wireframe===!0;let te=o[L.id];te===void 0&&(te={},o[L.id]=te);let Y=te[G.id];Y===void 0&&(Y={},te[G.id]=Y);let j=Y[k];return j===void 0&&(j=p(f()),Y[k]=j),j}function p(L){const G=[],X=[],k=[];for(let te=0;te<r;te++)G[te]=0,X[te]=0,k[te]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:G,enabledAttributes:X,attributeDivisors:k,object:L,attributes:{},index:null}}function u(L,G,X,k){const te=c.attributes,Y=G.attributes;let j=0;const D=X.getAttributes();for(const z in D)if(D[z].location>=0){const le=te[z];let de=Y[z];if(de===void 0&&(z==="instanceMatrix"&&L.instanceMatrix&&(de=L.instanceMatrix),z==="instanceColor"&&L.instanceColor&&(de=L.instanceColor)),le===void 0||le.attribute!==de||de&&le.data!==de.data)return!0;j++}return c.attributesNum!==j||c.index!==k}function A(L,G,X,k){const te={},Y=G.attributes;let j=0;const D=X.getAttributes();for(const z in D)if(D[z].location>=0){let le=Y[z];le===void 0&&(z==="instanceMatrix"&&L.instanceMatrix&&(le=L.instanceMatrix),z==="instanceColor"&&L.instanceColor&&(le=L.instanceColor));const de={};de.attribute=le,le&&le.data&&(de.data=le.data),te[z]=de,j++}c.attributes=te,c.attributesNum=j,c.index=k}function S(){const L=c.newAttributes;for(let G=0,X=L.length;G<X;G++)L[G]=0}function E(L){w(L,0)}function w(L,G){const X=c.newAttributes,k=c.enabledAttributes,te=c.attributeDivisors;X[L]=1,k[L]===0&&(i.enableVertexAttribArray(L),k[L]=1),te[L]!==G&&((n.isWebGL2?i:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](L,G),te[L]=G)}function P(){const L=c.newAttributes,G=c.enabledAttributes;for(let X=0,k=G.length;X<k;X++)G[X]!==L[X]&&(i.disableVertexAttribArray(X),G[X]=0)}function C(L,G,X,k,te,Y,j){j===!0?i.vertexAttribIPointer(L,G,X,te,Y):i.vertexAttribPointer(L,G,X,k,te,Y)}function H(L,G,X,k){if(n.isWebGL2===!1&&(L.isInstancedMesh||k.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;S();const te=k.attributes,Y=X.getAttributes(),j=G.defaultAttributeValues;for(const D in Y){const z=Y[D];if(z.location>=0){let oe=te[D];if(oe===void 0&&(D==="instanceMatrix"&&L.instanceMatrix&&(oe=L.instanceMatrix),D==="instanceColor"&&L.instanceColor&&(oe=L.instanceColor)),oe!==void 0){const le=oe.normalized,de=oe.itemSize,_e=t.get(oe);if(_e===void 0)continue;const we=_e.buffer,ve=_e.type,ke=_e.bytesPerElement,Et=n.isWebGL2===!0&&(ve===i.INT||ve===i.UNSIGNED_INT||oe.gpuType===xo);if(oe.isInterleavedBufferAttribute){const Ie=oe.data,I=Ie.stride,ut=oe.offset;if(Ie.isInstancedInterleavedBuffer){for(let xe=0;xe<z.locationSize;xe++)w(z.location+xe,Ie.meshPerAttribute);L.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=Ie.meshPerAttribute*Ie.count)}else for(let xe=0;xe<z.locationSize;xe++)E(z.location+xe);i.bindBuffer(i.ARRAY_BUFFER,we);for(let xe=0;xe<z.locationSize;xe++)C(z.location+xe,de/z.locationSize,ve,le,I*ke,(ut+de/z.locationSize*xe)*ke,Et)}else{if(oe.isInstancedBufferAttribute){for(let Ie=0;Ie<z.locationSize;Ie++)w(z.location+Ie,oe.meshPerAttribute);L.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=oe.meshPerAttribute*oe.count)}else for(let Ie=0;Ie<z.locationSize;Ie++)E(z.location+Ie);i.bindBuffer(i.ARRAY_BUFFER,we);for(let Ie=0;Ie<z.locationSize;Ie++)C(z.location+Ie,de/z.locationSize,ve,le,de*ke,de/z.locationSize*Ie*ke,Et)}}else if(j!==void 0){const le=j[D];if(le!==void 0)switch(le.length){case 2:i.vertexAttrib2fv(z.location,le);break;case 3:i.vertexAttrib3fv(z.location,le);break;case 4:i.vertexAttrib4fv(z.location,le);break;default:i.vertexAttrib1fv(z.location,le)}}}}P()}function x(){W();for(const L in o){const G=o[L];for(const X in G){const k=G[X];for(const te in k)g(k[te].object),delete k[te];delete G[X]}delete o[L]}}function T(L){if(o[L.id]===void 0)return;const G=o[L.id];for(const X in G){const k=G[X];for(const te in k)g(k[te].object),delete k[te];delete G[X]}delete o[L.id]}function V(L){for(const G in o){const X=o[G];if(X[L.id]===void 0)continue;const k=X[L.id];for(const te in k)g(k[te].object),delete k[te];delete X[L.id]}}function W(){q(),h=!0,c!==l&&(c=l,m(c.object))}function q(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:d,reset:W,resetDefaultState:q,dispose:x,releaseStatesOfGeometry:T,releaseStatesOfProgram:V,initAttributes:S,enableAttribute:E,disableUnusedAttributes:P}}function xd(i,e,t,n){const r=n.isWebGL2;let s;function a(c){s=c}function o(c,h){i.drawArrays(s,c,h),t.update(h,s,1)}function l(c,h,d){if(d===0)return;let f,m;if(r)f=i,m="drawArraysInstanced";else if(f=e.get("ANGLE_instanced_arrays"),m="drawArraysInstancedANGLE",f===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}f[m](s,c,h,d),t.update(h,s,d)}this.setMode=a,this.render=o,this.renderInstances=l}function Md(i,e,t){let n;function r(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");n=i.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function s(C){if(C==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const a=typeof WebGL2RenderingContext<"u"&&i.constructor.name==="WebGL2RenderingContext";let o=t.precision!==void 0?t.precision:"highp";const l=s(o);l!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",l,"instead."),o=l);const c=a||e.has("WEBGL_draw_buffers"),h=t.logarithmicDepthBuffer===!0,d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),f=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),_=i.getParameter(i.MAX_VERTEX_ATTRIBS),p=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),u=i.getParameter(i.MAX_VARYING_VECTORS),A=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),S=f>0,E=a||e.has("OES_texture_float"),w=S&&E,P=a?i.getParameter(i.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:c,getMaxAnisotropy:r,getMaxPrecision:s,precision:o,logarithmicDepthBuffer:h,maxTextures:d,maxVertexTextures:f,maxTextureSize:m,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:p,maxVaryings:u,maxFragmentUniforms:A,vertexTextures:S,floatFragmentTextures:E,floatVertexTextures:w,maxSamples:P}}function Sd(i){const e=this;let t=null,n=0,r=!1,s=!1;const a=new Pn,o=new Fe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){const m=d.length!==0||f||n!==0||r;return r=f,n=d.length,m},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,f){t=h(d,f,0)},this.setState=function(d,f,m){const g=d.clippingPlanes,_=d.clipIntersection,p=d.clipShadows,u=i.get(d);if(!r||g===null||g.length===0||s&&!p)s?h(null):c();else{const A=s?0:n,S=A*4;let E=u.clippingState||null;l.value=E,E=h(g,f,S,m);for(let w=0;w!==S;++w)E[w]=t[w];u.clippingState=E,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=A}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(d,f,m,g){const _=d!==null?d.length:0;let p=null;if(_!==0){if(p=l.value,g!==!0||p===null){const u=m+_*4,A=f.matrixWorldInverse;o.getNormalMatrix(A),(p===null||p.length<u)&&(p=new Float32Array(u));for(let S=0,E=m;S!==_;++S,E+=4)a.copy(d[S]).applyMatrix4(A,o),a.normal.toArray(p,E),p[E+3]=a.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,p}}function yd(i){let e=new WeakMap;function t(a,o){return o===ms?a.mapping=gi:o===gs&&(a.mapping=_i),a}function n(a){if(a&&a.isTexture&&a.isRenderTargetTexture===!1){const o=a.mapping;if(o===ms||o===gs)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new Fc(l.height/2);return c.fromEquirectangularTexture(i,a),e.set(a,c),a.addEventListener("dispose",r),t(c.texture,a.mapping)}else return null}}return a}function r(a){const o=a.target;o.removeEventListener("dispose",r);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}class zo extends Fo{constructor(e=-1,t=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-e,a=n+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const di=4,Oa=[.125,.215,.35,.446,.526,.582],Dn=20,os=new zo,Ba=new Be;let ls=null;const Ln=(1+Math.sqrt(5))/2,ri=1/Ln,za=[new R(1,1,1),new R(-1,1,1),new R(1,1,-1),new R(-1,1,-1),new R(0,Ln,ri),new R(0,Ln,-ri),new R(ri,0,Ln),new R(-ri,0,Ln),new R(Ln,ri,0),new R(-Ln,ri,0)];class Ga{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,r=100){ls=this._renderer.getRenderTarget(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ka(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Va(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(ls),e.scissorTest=!1,ar(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===gi||e.mapping===_i?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ls=this._renderer.getRenderTarget();const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Ft,minFilter:Ft,generateMipmaps:!1,type:Ii,format:Wt,colorSpace:ln,depthBuffer:!1},r=Ha(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ha(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Ed(s)),this._blurMaterial=Td(s,e,t)}return r}_compileMaterial(e){const t=new He(this._lodPlanes[0],e);this._renderer.compile(t,os)}_sceneToCubeUV(e,t,n,r){const o=new Bt(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,f=h.toneMapping;h.getClearColor(Ba),h.toneMapping=xn,h.autoClear=!1;const m=new zn({name:"PMREM.Background",side:Rt,depthWrite:!1,depthTest:!1}),g=new He(new Xt,m);let _=!1;const p=e.background;p?p.isColor&&(m.color.copy(p),e.background=null,_=!0):(m.color.copy(Ba),_=!0);for(let u=0;u<6;u++){const A=u%3;A===0?(o.up.set(0,l[u],0),o.lookAt(c[u],0,0)):A===1?(o.up.set(0,0,l[u]),o.lookAt(0,c[u],0)):(o.up.set(0,l[u],0),o.lookAt(0,0,c[u]));const S=this._cubeSize;ar(r,A*S,u>2?S:0,S,S),h.setRenderTarget(r),_&&h.render(g,o),h.render(e,o)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=f,h.autoClear=d,e.background=p}_textureToCubeUV(e,t){const n=this._renderer,r=e.mapping===gi||e.mapping===_i;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=ka()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Va());const s=r?this._cubemapMaterial:this._equirectMaterial,a=new He(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;ar(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,os)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){const s=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=za[(r-1)%za.length];this._blur(e,r-1,r,s,a)}t.autoClear=n}_blur(e,t,n,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,r,"latitudinal",s),this._halfBlur(a,e,n,n,r,"longitudinal",s)}_halfBlur(e,t,n,r,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,d=new He(this._lodPlanes[r],c),f=c.uniforms,m=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*m):2*Math.PI/(2*Dn-1),_=s/g,p=isFinite(s)?1+Math.floor(h*_):Dn;p>Dn&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Dn}`);const u=[];let A=0;for(let C=0;C<Dn;++C){const H=C/_,x=Math.exp(-H*H/2);u.push(x),C===0?A+=x:C<p&&(A+=2*x)}for(let C=0;C<u.length;C++)u[C]=u[C]/A;f.envMap.value=e.texture,f.samples.value=p,f.weights.value=u,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:S}=this;f.dTheta.value=g,f.mipInt.value=S-n;const E=this._sizeLods[r],w=3*E*(r>S-di?r-S+di:0),P=4*(this._cubeSize-E);ar(t,w,P,3*E,2*E),l.setRenderTarget(t),l.render(d,os)}}function Ed(i){const e=[],t=[],n=[];let r=i;const s=i-di+1+Oa.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);t.push(o);let l=1/o;a>i-di?l=Oa[a-i+di-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),h=-c,d=1+c,f=[h,h,d,h,d,d,h,h,d,d,h,d],m=6,g=6,_=3,p=2,u=1,A=new Float32Array(_*g*m),S=new Float32Array(p*g*m),E=new Float32Array(u*g*m);for(let P=0;P<m;P++){const C=P%3*2/3-1,H=P>2?0:-1,x=[C,H,0,C+2/3,H,0,C+2/3,H+1,0,C,H,0,C+2/3,H+1,0,C,H+1,0];A.set(x,_*g*P),S.set(f,p*g*P);const T=[P,P,P,P,P,P];E.set(T,u*g*P)}const w=new mt;w.setAttribute("position",new Pt(A,_)),w.setAttribute("uv",new Pt(S,p)),w.setAttribute("faceIndex",new Pt(E,u)),e.push(w),r>di&&r--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Ha(i,e,t){const n=new On(i,e,t);return n.texture.mapping=br,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ar(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function Td(i,e,t){const n=new Float32Array(Dn),r=new R(0,1,0);return new Gn({name:"SphericalGaussianBlur",defines:{n:Dn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Cs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:vn,depthTest:!1,depthWrite:!1})}function Va(){return new Gn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Cs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:vn,depthTest:!1,depthWrite:!1})}function ka(){return new Gn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Cs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:vn,depthTest:!1,depthWrite:!1})}function Cs(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function bd(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===ms||l===gs,h=l===gi||l===_i;if(c||h)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let d=e.get(o);return t===null&&(t=new Ga(i)),d=c?t.fromEquirectangular(o,d):t.fromCubemap(o,d),e.set(o,d),d.texture}else{if(e.has(o))return e.get(o).texture;{const d=o.image;if(c&&d&&d.height>0||h&&d&&r(d)){t===null&&(t=new Ga(i));const f=c?t.fromEquirectangular(o):t.fromCubemap(o);return e.set(o,f),o.addEventListener("dispose",s),f.texture}else return null}}}return o}function r(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function s(o){const l=o.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function Ad(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?t("EXT_color_buffer_float"):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){const r=t(n);return r===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function wd(i,e,t,n){const r={},s=new WeakMap;function a(d){const f=d.target;f.index!==null&&e.remove(f.index);for(const g in f.attributes)e.remove(f.attributes[g]);for(const g in f.morphAttributes){const _=f.morphAttributes[g];for(let p=0,u=_.length;p<u;p++)e.remove(_[p])}f.removeEventListener("dispose",a),delete r[f.id];const m=s.get(f);m&&(e.remove(m),s.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function o(d,f){return r[f.id]===!0||(f.addEventListener("dispose",a),r[f.id]=!0,t.memory.geometries++),f}function l(d){const f=d.attributes;for(const g in f)e.update(f[g],i.ARRAY_BUFFER);const m=d.morphAttributes;for(const g in m){const _=m[g];for(let p=0,u=_.length;p<u;p++)e.update(_[p],i.ARRAY_BUFFER)}}function c(d){const f=[],m=d.index,g=d.attributes.position;let _=0;if(m!==null){const A=m.array;_=m.version;for(let S=0,E=A.length;S<E;S+=3){const w=A[S+0],P=A[S+1],C=A[S+2];f.push(w,P,P,C,C,w)}}else if(g!==void 0){const A=g.array;_=g.version;for(let S=0,E=A.length/3-1;S<E;S+=3){const w=S+0,P=S+1,C=S+2;f.push(w,P,P,C,C,w)}}else return;const p=new(Ao(f)?Io:Uo)(f,1);p.version=_;const u=s.get(d);u&&e.remove(u),s.set(d,p)}function h(d){const f=s.get(d);if(f){const m=d.index;m!==null&&f.version<m.version&&c(d)}else c(d);return s.get(d)}return{get:o,update:l,getWireframeAttribute:h}}function Rd(i,e,t,n){const r=n.isWebGL2;let s;function a(f){s=f}let o,l;function c(f){o=f.type,l=f.bytesPerElement}function h(f,m){i.drawElements(s,m,o,f*l),t.update(m,s,1)}function d(f,m,g){if(g===0)return;let _,p;if(r)_=i,p="drawElementsInstanced";else if(_=e.get("ANGLE_instanced_arrays"),p="drawElementsInstancedANGLE",_===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}_[p](s,m,o,f*l,g),t.update(m,s,g)}this.setMode=a,this.setIndex=c,this.render=h,this.renderInstances=d}function Cd(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(s/3);break;case i.LINES:t.lines+=o*(s/2);break;case i.LINE_STRIP:t.lines+=o*(s-1);break;case i.LINE_LOOP:t.lines+=o*s;break;case i.POINTS:t.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function Pd(i,e){return i[0]-e[0]}function Ld(i,e){return Math.abs(e[1])-Math.abs(i[1])}function Dd(i,e,t){const n={},r=new Float32Array(8),s=new WeakMap,a=new ot,o=[];for(let c=0;c<8;c++)o[c]=[c,0];function l(c,h,d){const f=c.morphTargetInfluences;if(e.isWebGL2===!0){const g=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,_=g!==void 0?g.length:0;let p=s.get(h);if(p===void 0||p.count!==_){let G=function(){q.dispose(),s.delete(h),h.removeEventListener("dispose",G)};var m=G;p!==void 0&&p.texture.dispose();const S=h.morphAttributes.position!==void 0,E=h.morphAttributes.normal!==void 0,w=h.morphAttributes.color!==void 0,P=h.morphAttributes.position||[],C=h.morphAttributes.normal||[],H=h.morphAttributes.color||[];let x=0;S===!0&&(x=1),E===!0&&(x=2),w===!0&&(x=3);let T=h.attributes.position.count*x,V=1;T>e.maxTextureSize&&(V=Math.ceil(T/e.maxTextureSize),T=e.maxTextureSize);const W=new Float32Array(T*V*4*_),q=new Co(W,T,V,_);q.type=_n,q.needsUpdate=!0;const L=x*4;for(let X=0;X<_;X++){const k=P[X],te=C[X],Y=H[X],j=T*V*4*X;for(let D=0;D<k.count;D++){const z=D*L;S===!0&&(a.fromBufferAttribute(k,D),W[j+z+0]=a.x,W[j+z+1]=a.y,W[j+z+2]=a.z,W[j+z+3]=0),E===!0&&(a.fromBufferAttribute(te,D),W[j+z+4]=a.x,W[j+z+5]=a.y,W[j+z+6]=a.z,W[j+z+7]=0),w===!0&&(a.fromBufferAttribute(Y,D),W[j+z+8]=a.x,W[j+z+9]=a.y,W[j+z+10]=a.z,W[j+z+11]=Y.itemSize===4?a.w:1)}}p={count:_,texture:q,size:new Pe(T,V)},s.set(h,p),h.addEventListener("dispose",G)}let u=0;for(let S=0;S<f.length;S++)u+=f[S];const A=h.morphTargetsRelative?1:1-u;d.getUniforms().setValue(i,"morphTargetBaseInfluence",A),d.getUniforms().setValue(i,"morphTargetInfluences",f),d.getUniforms().setValue(i,"morphTargetsTexture",p.texture,t),d.getUniforms().setValue(i,"morphTargetsTextureSize",p.size)}else{const g=f===void 0?0:f.length;let _=n[h.id];if(_===void 0||_.length!==g){_=[];for(let E=0;E<g;E++)_[E]=[E,0];n[h.id]=_}for(let E=0;E<g;E++){const w=_[E];w[0]=E,w[1]=f[E]}_.sort(Ld);for(let E=0;E<8;E++)E<g&&_[E][1]?(o[E][0]=_[E][0],o[E][1]=_[E][1]):(o[E][0]=Number.MAX_SAFE_INTEGER,o[E][1]=0);o.sort(Pd);const p=h.morphAttributes.position,u=h.morphAttributes.normal;let A=0;for(let E=0;E<8;E++){const w=o[E],P=w[0],C=w[1];P!==Number.MAX_SAFE_INTEGER&&C?(p&&h.getAttribute("morphTarget"+E)!==p[P]&&h.setAttribute("morphTarget"+E,p[P]),u&&h.getAttribute("morphNormal"+E)!==u[P]&&h.setAttribute("morphNormal"+E,u[P]),r[E]=C,A+=C):(p&&h.hasAttribute("morphTarget"+E)===!0&&h.deleteAttribute("morphTarget"+E),u&&h.hasAttribute("morphNormal"+E)===!0&&h.deleteAttribute("morphNormal"+E),r[E]=0)}const S=h.morphTargetsRelative?1:1-A;d.getUniforms().setValue(i,"morphTargetBaseInfluence",S),d.getUniforms().setValue(i,"morphTargetInfluences",r)}}return{update:l}}function Ud(i,e,t,n){let r=new WeakMap;function s(l){const c=n.render.frame,h=l.geometry,d=e.get(l,h);if(r.get(d)!==c&&(e.update(d),r.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),r.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;r.get(f)!==c&&(f.update(),r.set(f,c))}return d}function a(){r=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:a}}const Go=new Ct,Ho=new Co,Vo=new xc,ko=new Oo,Wa=[],Xa=[],ja=new Float32Array(16),qa=new Float32Array(9),Ya=new Float32Array(4);function Si(i,e,t){const n=i[0];if(n<=0||n>0)return i;const r=e*t;let s=Wa[r];if(s===void 0&&(s=new Float32Array(r),Wa[r]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(s,o)}return s}function rt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function st(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Cr(i,e){let t=Xa[e];t===void 0&&(t=new Int32Array(e),Xa[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Id(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Nd(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(rt(t,e))return;i.uniform2fv(this.addr,e),st(t,e)}}function Fd(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(rt(t,e))return;i.uniform3fv(this.addr,e),st(t,e)}}function Od(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(rt(t,e))return;i.uniform4fv(this.addr,e),st(t,e)}}function Bd(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(rt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),st(t,e)}else{if(rt(t,n))return;Ya.set(n),i.uniformMatrix2fv(this.addr,!1,Ya),st(t,n)}}function zd(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(rt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),st(t,e)}else{if(rt(t,n))return;qa.set(n),i.uniformMatrix3fv(this.addr,!1,qa),st(t,n)}}function Gd(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(rt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),st(t,e)}else{if(rt(t,n))return;ja.set(n),i.uniformMatrix4fv(this.addr,!1,ja),st(t,n)}}function Hd(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Vd(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(rt(t,e))return;i.uniform2iv(this.addr,e),st(t,e)}}function kd(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(rt(t,e))return;i.uniform3iv(this.addr,e),st(t,e)}}function Wd(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(rt(t,e))return;i.uniform4iv(this.addr,e),st(t,e)}}function Xd(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function jd(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(rt(t,e))return;i.uniform2uiv(this.addr,e),st(t,e)}}function qd(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(rt(t,e))return;i.uniform3uiv(this.addr,e),st(t,e)}}function Yd(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(rt(t,e))return;i.uniform4uiv(this.addr,e),st(t,e)}}function $d(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2D(e||Go,r)}function Kd(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||Vo,r)}function Zd(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||ko,r)}function Jd(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||Ho,r)}function Qd(i){switch(i){case 5126:return Id;case 35664:return Nd;case 35665:return Fd;case 35666:return Od;case 35674:return Bd;case 35675:return zd;case 35676:return Gd;case 5124:case 35670:return Hd;case 35667:case 35671:return Vd;case 35668:case 35672:return kd;case 35669:case 35673:return Wd;case 5125:return Xd;case 36294:return jd;case 36295:return qd;case 36296:return Yd;case 35678:case 36198:case 36298:case 36306:case 35682:return $d;case 35679:case 36299:case 36307:return Kd;case 35680:case 36300:case 36308:case 36293:return Zd;case 36289:case 36303:case 36311:case 36292:return Jd}}function ef(i,e){i.uniform1fv(this.addr,e)}function tf(i,e){const t=Si(e,this.size,2);i.uniform2fv(this.addr,t)}function nf(i,e){const t=Si(e,this.size,3);i.uniform3fv(this.addr,t)}function rf(i,e){const t=Si(e,this.size,4);i.uniform4fv(this.addr,t)}function sf(i,e){const t=Si(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function af(i,e){const t=Si(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function of(i,e){const t=Si(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function lf(i,e){i.uniform1iv(this.addr,e)}function cf(i,e){i.uniform2iv(this.addr,e)}function hf(i,e){i.uniform3iv(this.addr,e)}function uf(i,e){i.uniform4iv(this.addr,e)}function df(i,e){i.uniform1uiv(this.addr,e)}function ff(i,e){i.uniform2uiv(this.addr,e)}function pf(i,e){i.uniform3uiv(this.addr,e)}function mf(i,e){i.uniform4uiv(this.addr,e)}function gf(i,e,t){const n=this.cache,r=e.length,s=Cr(t,r);rt(n,s)||(i.uniform1iv(this.addr,s),st(n,s));for(let a=0;a!==r;++a)t.setTexture2D(e[a]||Go,s[a])}function _f(i,e,t){const n=this.cache,r=e.length,s=Cr(t,r);rt(n,s)||(i.uniform1iv(this.addr,s),st(n,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||Vo,s[a])}function vf(i,e,t){const n=this.cache,r=e.length,s=Cr(t,r);rt(n,s)||(i.uniform1iv(this.addr,s),st(n,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||ko,s[a])}function xf(i,e,t){const n=this.cache,r=e.length,s=Cr(t,r);rt(n,s)||(i.uniform1iv(this.addr,s),st(n,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||Ho,s[a])}function Mf(i){switch(i){case 5126:return ef;case 35664:return tf;case 35665:return nf;case 35666:return rf;case 35674:return sf;case 35675:return af;case 35676:return of;case 5124:case 35670:return lf;case 35667:case 35671:return cf;case 35668:case 35672:return hf;case 35669:case 35673:return uf;case 5125:return df;case 36294:return ff;case 36295:return pf;case 36296:return mf;case 35678:case 36198:case 36298:case 36306:case 35682:return gf;case 35679:case 36299:case 36307:return _f;case 35680:case 36300:case 36308:case 36293:return vf;case 36289:case 36303:case 36311:case 36292:return xf}}class Sf{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.setValue=Qd(t.type)}}class yf{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.size=t.size,this.setValue=Mf(t.type)}}class Ef{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],n)}}}const cs=/(\w+)(\])?(\[|\.)?/g;function $a(i,e){i.seq.push(e),i.map[e.id]=e}function Tf(i,e,t){const n=i.name,r=n.length;for(cs.lastIndex=0;;){const s=cs.exec(n),a=cs.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){$a(t,c===void 0?new Sf(o,i,e):new yf(o,i,e));break}else{let d=t.map[o];d===void 0&&(d=new Ef(o),$a(t,d)),t=d}}}class dr{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const s=e.getActiveUniform(t,r),a=e.getUniformLocation(t,s.name);Tf(s,a,this)}}setValue(e,t,n,r){const s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&n.push(a)}return n}}function Ka(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}let bf=0;function Af(i,e){const t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}function wf(i){const e=Xe.getPrimaries(Xe.workingColorSpace),t=Xe.getPrimaries(i);let n;switch(e===t?n="":e===_r&&t===gr?n="LinearDisplayP3ToLinearSRGB":e===gr&&t===_r&&(n="LinearSRGBToLinearDisplayP3"),i){case ln:case wr:return[n,"LinearTransferOETF"];case ht:case ws:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function Za(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=i.getShaderInfoLog(e).trim();if(n&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const a=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+Af(i.getShaderSource(e),a)}else return r}function Rf(i,e){const t=wf(e);return`vec4 ${i}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function Cf(i,e){let t;switch(e){case Gl:t="Linear";break;case Hl:t="Reinhard";break;case Vl:t="OptimizedCineon";break;case kl:t="ACESFilmic";break;case Wl:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function Pf(i){return[i.extensionDerivatives||i.envMapCubeUVHeight||i.bumpMap||i.normalMapTangentSpace||i.clearcoatNormalMap||i.flatShading||i.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(i.extensionFragDepth||i.logarithmicDepthBuffer)&&i.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",i.extensionDrawBuffers&&i.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(i.extensionShaderTextureLOD||i.envMap||i.transmission)&&i.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Pi).join(`
`)}function Lf(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Df(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(e,r),a=s.name;let o=1;s.type===i.FLOAT_MAT2&&(o=2),s.type===i.FLOAT_MAT3&&(o=3),s.type===i.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function Pi(i){return i!==""}function Ja(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Qa(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Uf=/^[ \t]*#include +<([\w\d./]+)>/gm;function Es(i){return i.replace(Uf,Nf)}const If=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function Nf(i,e){let t=Ue[e];if(t===void 0){const n=If.get(e);if(n!==void 0)t=Ue[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Es(t)}const Ff=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function eo(i){return i.replace(Ff,Of)}function Of(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function to(i){let e="precision "+i.precision+` float;
precision `+i.precision+" int;";return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Bf(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===mo?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===vl?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===sn&&(e="SHADOWMAP_TYPE_VSM"),e}function zf(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case gi:case _i:e="ENVMAP_TYPE_CUBE";break;case br:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Gf(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case _i:e="ENVMAP_MODE_REFRACTION";break}return e}function Hf(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Tr:e="ENVMAP_BLENDING_MULTIPLY";break;case Bl:e="ENVMAP_BLENDING_MIX";break;case zl:e="ENVMAP_BLENDING_ADD";break}return e}function Vf(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function kf(i,e,t,n){const r=i.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=Bf(t),c=zf(t),h=Gf(t),d=Hf(t),f=Vf(t),m=t.isWebGL2?"":Pf(t),g=Lf(s),_=r.createProgram();let p,u,A=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Pi).join(`
`),p.length>0&&(p+=`
`),u=[m,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Pi).join(`
`),u.length>0&&(u+=`
`)):(p=[to(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Pi).join(`
`),u=[m,to(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==xn?"#define TONE_MAPPING":"",t.toneMapping!==xn?Ue.tonemapping_pars_fragment:"",t.toneMapping!==xn?Cf("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ue.colorspace_pars_fragment,Rf("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Pi).join(`
`)),a=Es(a),a=Ja(a,t),a=Qa(a,t),o=Es(o),o=Ja(o,t),o=Qa(o,t),a=eo(a),o=eo(o),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(A=`#version 300 es
`,p=["precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,u=["#define varying in",t.glslVersion===xa?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===xa?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+u);const S=A+p+a,E=A+u+o,w=Ka(r,r.VERTEX_SHADER,S),P=Ka(r,r.FRAGMENT_SHADER,E);if(r.attachShader(_,w),r.attachShader(_,P),t.index0AttributeName!==void 0?r.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_),i.debug.checkShaderErrors){const x=r.getProgramInfoLog(_).trim(),T=r.getShaderInfoLog(w).trim(),V=r.getShaderInfoLog(P).trim();let W=!0,q=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(W=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,_,w,P);else{const L=Za(r,w,"vertex"),G=Za(r,P,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Program Info Log: `+x+`
`+L+`
`+G)}else x!==""?console.warn("THREE.WebGLProgram: Program Info Log:",x):(T===""||V==="")&&(q=!1);q&&(this.diagnostics={runnable:W,programLog:x,vertexShader:{log:T,prefix:p},fragmentShader:{log:V,prefix:u}})}r.deleteShader(w),r.deleteShader(P);let C;this.getUniforms=function(){return C===void 0&&(C=new dr(r,_)),C};let H;return this.getAttributes=function(){return H===void 0&&(H=Df(r,_)),H},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=bf++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=w,this.fragmentShader=P,this}let Wf=0;class Xf{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new jf(e),t.set(e,n)),n}}class jf{constructor(e){this.id=Wf++,this.code=e,this.usedTimes=0}}function qf(i,e,t,n,r,s,a){const o=new Lo,l=new Xf,c=[],h=r.isWebGL2,d=r.logarithmicDepthBuffer,f=r.vertexTextures;let m=r.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(x){return x===0?"uv":`uv${x}`}function p(x,T,V,W,q){const L=W.fog,G=q.geometry,X=x.isMeshStandardMaterial?W.environment:null,k=(x.isMeshStandardMaterial?t:e).get(x.envMap||X),te=k&&k.mapping===br?k.image.height:null,Y=g[x.type];x.precision!==null&&(m=r.getMaxPrecision(x.precision),m!==x.precision&&console.warn("THREE.WebGLProgram.getParameters:",x.precision,"not supported, using",m,"instead."));const j=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,D=j!==void 0?j.length:0;let z=0;G.morphAttributes.position!==void 0&&(z=1),G.morphAttributes.normal!==void 0&&(z=2),G.morphAttributes.color!==void 0&&(z=3);let oe,le,de,_e;if(Y){const Ye=qt[Y];oe=Ye.vertexShader,le=Ye.fragmentShader}else oe=x.vertexShader,le=x.fragmentShader,l.update(x),de=l.getVertexShaderID(x),_e=l.getFragmentShaderID(x);const we=i.getRenderTarget(),ve=q.isInstancedMesh===!0,ke=!!x.map,Et=!!x.matcap,Ie=!!k,I=!!x.aoMap,ut=!!x.lightMap,xe=!!x.bumpMap,Le=!!x.normalMap,be=!!x.displacementMap,Ke=!!x.emissiveMap,Ge=!!x.metalnessMap,Ne=!!x.roughnessMap,je=x.anisotropy>0,ct=x.clearcoat>0,dt=x.iridescence>0,y=x.sheen>0,v=x.transmission>0,F=je&&!!x.anisotropyMap,J=ct&&!!x.clearcoatMap,K=ct&&!!x.clearcoatNormalMap,Q=ct&&!!x.clearcoatRoughnessMap,fe=dt&&!!x.iridescenceMap,ie=dt&&!!x.iridescenceThicknessMap,ce=y&&!!x.sheenColorMap,Se=y&&!!x.sheenRoughnessMap,Ve=!!x.specularMap,Z=!!x.specularColorMap,We=!!x.specularIntensityMap,Re=v&&!!x.transmissionMap,ye=v&&!!x.thicknessMap,ge=!!x.gradientMap,b=!!x.alphaMap,ne=x.alphaTest>0,ee=!!x.alphaHash,he=!!x.extensions,ae=!!G.attributes.uv1,$=!!G.attributes.uv2,pe=!!G.attributes.uv3;let Ce=xn;return x.toneMapped&&(we===null||we.isXRRenderTarget===!0)&&(Ce=i.toneMapping),{isWebGL2:h,shaderID:Y,shaderType:x.type,shaderName:x.name,vertexShader:oe,fragmentShader:le,defines:x.defines,customVertexShaderID:de,customFragmentShaderID:_e,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:m,instancing:ve,instancingColor:ve&&q.instanceColor!==null,supportsVertexTextures:f,outputColorSpace:we===null?i.outputColorSpace:we.isXRRenderTarget===!0?we.texture.colorSpace:ln,map:ke,matcap:Et,envMap:Ie,envMapMode:Ie&&k.mapping,envMapCubeUVHeight:te,aoMap:I,lightMap:ut,bumpMap:xe,normalMap:Le,displacementMap:f&&be,emissiveMap:Ke,normalMapObjectSpace:Le&&x.normalMapType===ic,normalMapTangentSpace:Le&&x.normalMapType===Ar,metalnessMap:Ge,roughnessMap:Ne,anisotropy:je,anisotropyMap:F,clearcoat:ct,clearcoatMap:J,clearcoatNormalMap:K,clearcoatRoughnessMap:Q,iridescence:dt,iridescenceMap:fe,iridescenceThicknessMap:ie,sheen:y,sheenColorMap:ce,sheenRoughnessMap:Se,specularMap:Ve,specularColorMap:Z,specularIntensityMap:We,transmission:v,transmissionMap:Re,thicknessMap:ye,gradientMap:ge,opaque:x.transparent===!1&&x.blending===pi,alphaMap:b,alphaTest:ne,alphaHash:ee,combine:x.combine,mapUv:ke&&_(x.map.channel),aoMapUv:I&&_(x.aoMap.channel),lightMapUv:ut&&_(x.lightMap.channel),bumpMapUv:xe&&_(x.bumpMap.channel),normalMapUv:Le&&_(x.normalMap.channel),displacementMapUv:be&&_(x.displacementMap.channel),emissiveMapUv:Ke&&_(x.emissiveMap.channel),metalnessMapUv:Ge&&_(x.metalnessMap.channel),roughnessMapUv:Ne&&_(x.roughnessMap.channel),anisotropyMapUv:F&&_(x.anisotropyMap.channel),clearcoatMapUv:J&&_(x.clearcoatMap.channel),clearcoatNormalMapUv:K&&_(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Q&&_(x.clearcoatRoughnessMap.channel),iridescenceMapUv:fe&&_(x.iridescenceMap.channel),iridescenceThicknessMapUv:ie&&_(x.iridescenceThicknessMap.channel),sheenColorMapUv:ce&&_(x.sheenColorMap.channel),sheenRoughnessMapUv:Se&&_(x.sheenRoughnessMap.channel),specularMapUv:Ve&&_(x.specularMap.channel),specularColorMapUv:Z&&_(x.specularColorMap.channel),specularIntensityMapUv:We&&_(x.specularIntensityMap.channel),transmissionMapUv:Re&&_(x.transmissionMap.channel),thicknessMapUv:ye&&_(x.thicknessMap.channel),alphaMapUv:b&&_(x.alphaMap.channel),vertexTangents:!!G.attributes.tangent&&(Le||je),vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,vertexUv1s:ae,vertexUv2s:$,vertexUv3s:pe,pointsUvs:q.isPoints===!0&&!!G.attributes.uv&&(ke||b),fog:!!L,useFog:x.fog===!0,fogExp2:L&&L.isFogExp2,flatShading:x.flatShading===!0,sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:d,skinning:q.isSkinnedMesh===!0,morphTargets:G.morphAttributes.position!==void 0,morphNormals:G.morphAttributes.normal!==void 0,morphColors:G.morphAttributes.color!==void 0,morphTargetsCount:D,morphTextureStride:z,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&V.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ce,useLegacyLights:i._useLegacyLights,decodeVideoTexture:ke&&x.map.isVideoTexture===!0&&Xe.getTransfer(x.map.colorSpace)===$e,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===zt,flipSided:x.side===Rt,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionDerivatives:he&&x.extensions.derivatives===!0,extensionFragDepth:he&&x.extensions.fragDepth===!0,extensionDrawBuffers:he&&x.extensions.drawBuffers===!0,extensionShaderTextureLOD:he&&x.extensions.shaderTextureLOD===!0,rendererExtensionFragDepth:h||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||n.has("EXT_shader_texture_lod"),customProgramCacheKey:x.customProgramCacheKey()}}function u(x){const T=[];if(x.shaderID?T.push(x.shaderID):(T.push(x.customVertexShaderID),T.push(x.customFragmentShaderID)),x.defines!==void 0)for(const V in x.defines)T.push(V),T.push(x.defines[V]);return x.isRawShaderMaterial===!1&&(A(T,x),S(T,x),T.push(i.outputColorSpace)),T.push(x.customProgramCacheKey),T.join()}function A(x,T){x.push(T.precision),x.push(T.outputColorSpace),x.push(T.envMapMode),x.push(T.envMapCubeUVHeight),x.push(T.mapUv),x.push(T.alphaMapUv),x.push(T.lightMapUv),x.push(T.aoMapUv),x.push(T.bumpMapUv),x.push(T.normalMapUv),x.push(T.displacementMapUv),x.push(T.emissiveMapUv),x.push(T.metalnessMapUv),x.push(T.roughnessMapUv),x.push(T.anisotropyMapUv),x.push(T.clearcoatMapUv),x.push(T.clearcoatNormalMapUv),x.push(T.clearcoatRoughnessMapUv),x.push(T.iridescenceMapUv),x.push(T.iridescenceThicknessMapUv),x.push(T.sheenColorMapUv),x.push(T.sheenRoughnessMapUv),x.push(T.specularMapUv),x.push(T.specularColorMapUv),x.push(T.specularIntensityMapUv),x.push(T.transmissionMapUv),x.push(T.thicknessMapUv),x.push(T.combine),x.push(T.fogExp2),x.push(T.sizeAttenuation),x.push(T.morphTargetsCount),x.push(T.morphAttributeCount),x.push(T.numDirLights),x.push(T.numPointLights),x.push(T.numSpotLights),x.push(T.numSpotLightMaps),x.push(T.numHemiLights),x.push(T.numRectAreaLights),x.push(T.numDirLightShadows),x.push(T.numPointLightShadows),x.push(T.numSpotLightShadows),x.push(T.numSpotLightShadowsWithMaps),x.push(T.numLightProbes),x.push(T.shadowMapType),x.push(T.toneMapping),x.push(T.numClippingPlanes),x.push(T.numClipIntersection),x.push(T.depthPacking)}function S(x,T){o.disableAll(),T.isWebGL2&&o.enable(0),T.supportsVertexTextures&&o.enable(1),T.instancing&&o.enable(2),T.instancingColor&&o.enable(3),T.matcap&&o.enable(4),T.envMap&&o.enable(5),T.normalMapObjectSpace&&o.enable(6),T.normalMapTangentSpace&&o.enable(7),T.clearcoat&&o.enable(8),T.iridescence&&o.enable(9),T.alphaTest&&o.enable(10),T.vertexColors&&o.enable(11),T.vertexAlphas&&o.enable(12),T.vertexUv1s&&o.enable(13),T.vertexUv2s&&o.enable(14),T.vertexUv3s&&o.enable(15),T.vertexTangents&&o.enable(16),T.anisotropy&&o.enable(17),x.push(o.mask),o.disableAll(),T.fog&&o.enable(0),T.useFog&&o.enable(1),T.flatShading&&o.enable(2),T.logarithmicDepthBuffer&&o.enable(3),T.skinning&&o.enable(4),T.morphTargets&&o.enable(5),T.morphNormals&&o.enable(6),T.morphColors&&o.enable(7),T.premultipliedAlpha&&o.enable(8),T.shadowMapEnabled&&o.enable(9),T.useLegacyLights&&o.enable(10),T.doubleSided&&o.enable(11),T.flipSided&&o.enable(12),T.useDepthPacking&&o.enable(13),T.dithering&&o.enable(14),T.transmission&&o.enable(15),T.sheen&&o.enable(16),T.opaque&&o.enable(17),T.pointsUvs&&o.enable(18),T.decodeVideoTexture&&o.enable(19),x.push(o.mask)}function E(x){const T=g[x.type];let V;if(T){const W=qt[T];V=Dc.clone(W.uniforms)}else V=x.uniforms;return V}function w(x,T){let V;for(let W=0,q=c.length;W<q;W++){const L=c[W];if(L.cacheKey===T){V=L,++V.usedTimes;break}}return V===void 0&&(V=new kf(i,T,x,s),c.push(V)),V}function P(x){if(--x.usedTimes===0){const T=c.indexOf(x);c[T]=c[c.length-1],c.pop(),x.destroy()}}function C(x){l.remove(x)}function H(){l.dispose()}return{getParameters:p,getProgramCacheKey:u,getUniforms:E,acquireProgram:w,releaseProgram:P,releaseShaderCache:C,programs:c,dispose:H}}function Yf(){let i=new WeakMap;function e(s){let a=i.get(s);return a===void 0&&(a={},i.set(s,a)),a}function t(s){i.delete(s)}function n(s,a,o){i.get(s)[a]=o}function r(){i=new WeakMap}return{get:e,remove:t,update:n,dispose:r}}function $f(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function no(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function io(){const i=[];let e=0;const t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function a(d,f,m,g,_,p){let u=i[e];return u===void 0?(u={id:d.id,object:d,geometry:f,material:m,groupOrder:g,renderOrder:d.renderOrder,z:_,group:p},i[e]=u):(u.id=d.id,u.object=d,u.geometry=f,u.material=m,u.groupOrder=g,u.renderOrder=d.renderOrder,u.z=_,u.group=p),e++,u}function o(d,f,m,g,_,p){const u=a(d,f,m,g,_,p);m.transmission>0?n.push(u):m.transparent===!0?r.push(u):t.push(u)}function l(d,f,m,g,_,p){const u=a(d,f,m,g,_,p);m.transmission>0?n.unshift(u):m.transparent===!0?r.unshift(u):t.unshift(u)}function c(d,f){t.length>1&&t.sort(d||$f),n.length>1&&n.sort(f||no),r.length>1&&r.sort(f||no)}function h(){for(let d=e,f=i.length;d<f;d++){const m=i[d];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:o,unshift:l,finish:h,sort:c}}function Kf(){let i=new WeakMap;function e(n,r){const s=i.get(n);let a;return s===void 0?(a=new io,i.set(n,[a])):r>=s.length?(a=new io,s.push(a)):a=s[r],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function Zf(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new R,color:new Be};break;case"SpotLight":t={position:new R,direction:new R,color:new Be,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new R,color:new Be,distance:0,decay:0};break;case"HemisphereLight":t={direction:new R,skyColor:new Be,groundColor:new Be};break;case"RectAreaLight":t={color:new Be,position:new R,halfWidth:new R,halfHeight:new R};break}return i[e.id]=t,t}}}function Jf(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pe};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pe};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pe,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let Qf=0;function ep(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function tp(i,e){const t=new Zf,n=Jf(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)r.probe.push(new R);const s=new R,a=new Ze,o=new Ze;function l(h,d){let f=0,m=0,g=0;for(let W=0;W<9;W++)r.probe[W].set(0,0,0);let _=0,p=0,u=0,A=0,S=0,E=0,w=0,P=0,C=0,H=0,x=0;h.sort(ep);const T=d===!0?Math.PI:1;for(let W=0,q=h.length;W<q;W++){const L=h[W],G=L.color,X=L.intensity,k=L.distance,te=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)f+=G.r*X*T,m+=G.g*X*T,g+=G.b*X*T;else if(L.isLightProbe){for(let Y=0;Y<9;Y++)r.probe[Y].addScaledVector(L.sh.coefficients[Y],X);x++}else if(L.isDirectionalLight){const Y=t.get(L);if(Y.color.copy(L.color).multiplyScalar(L.intensity*T),L.castShadow){const j=L.shadow,D=n.get(L);D.shadowBias=j.bias,D.shadowNormalBias=j.normalBias,D.shadowRadius=j.radius,D.shadowMapSize=j.mapSize,r.directionalShadow[_]=D,r.directionalShadowMap[_]=te,r.directionalShadowMatrix[_]=L.shadow.matrix,E++}r.directional[_]=Y,_++}else if(L.isSpotLight){const Y=t.get(L);Y.position.setFromMatrixPosition(L.matrixWorld),Y.color.copy(G).multiplyScalar(X*T),Y.distance=k,Y.coneCos=Math.cos(L.angle),Y.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),Y.decay=L.decay,r.spot[u]=Y;const j=L.shadow;if(L.map&&(r.spotLightMap[C]=L.map,C++,j.updateMatrices(L),L.castShadow&&H++),r.spotLightMatrix[u]=j.matrix,L.castShadow){const D=n.get(L);D.shadowBias=j.bias,D.shadowNormalBias=j.normalBias,D.shadowRadius=j.radius,D.shadowMapSize=j.mapSize,r.spotShadow[u]=D,r.spotShadowMap[u]=te,P++}u++}else if(L.isRectAreaLight){const Y=t.get(L);Y.color.copy(G).multiplyScalar(X),Y.halfWidth.set(L.width*.5,0,0),Y.halfHeight.set(0,L.height*.5,0),r.rectArea[A]=Y,A++}else if(L.isPointLight){const Y=t.get(L);if(Y.color.copy(L.color).multiplyScalar(L.intensity*T),Y.distance=L.distance,Y.decay=L.decay,L.castShadow){const j=L.shadow,D=n.get(L);D.shadowBias=j.bias,D.shadowNormalBias=j.normalBias,D.shadowRadius=j.radius,D.shadowMapSize=j.mapSize,D.shadowCameraNear=j.camera.near,D.shadowCameraFar=j.camera.far,r.pointShadow[p]=D,r.pointShadowMap[p]=te,r.pointShadowMatrix[p]=L.shadow.matrix,w++}r.point[p]=Y,p++}else if(L.isHemisphereLight){const Y=t.get(L);Y.skyColor.copy(L.color).multiplyScalar(X*T),Y.groundColor.copy(L.groundColor).multiplyScalar(X*T),r.hemi[S]=Y,S++}}A>0&&(e.isWebGL2||i.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=se.LTC_FLOAT_1,r.rectAreaLTC2=se.LTC_FLOAT_2):i.has("OES_texture_half_float_linear")===!0?(r.rectAreaLTC1=se.LTC_HALF_1,r.rectAreaLTC2=se.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),r.ambient[0]=f,r.ambient[1]=m,r.ambient[2]=g;const V=r.hash;(V.directionalLength!==_||V.pointLength!==p||V.spotLength!==u||V.rectAreaLength!==A||V.hemiLength!==S||V.numDirectionalShadows!==E||V.numPointShadows!==w||V.numSpotShadows!==P||V.numSpotMaps!==C||V.numLightProbes!==x)&&(r.directional.length=_,r.spot.length=u,r.rectArea.length=A,r.point.length=p,r.hemi.length=S,r.directionalShadow.length=E,r.directionalShadowMap.length=E,r.pointShadow.length=w,r.pointShadowMap.length=w,r.spotShadow.length=P,r.spotShadowMap.length=P,r.directionalShadowMatrix.length=E,r.pointShadowMatrix.length=w,r.spotLightMatrix.length=P+C-H,r.spotLightMap.length=C,r.numSpotLightShadowsWithMaps=H,r.numLightProbes=x,V.directionalLength=_,V.pointLength=p,V.spotLength=u,V.rectAreaLength=A,V.hemiLength=S,V.numDirectionalShadows=E,V.numPointShadows=w,V.numSpotShadows=P,V.numSpotMaps=C,V.numLightProbes=x,r.version=Qf++)}function c(h,d){let f=0,m=0,g=0,_=0,p=0;const u=d.matrixWorldInverse;for(let A=0,S=h.length;A<S;A++){const E=h[A];if(E.isDirectionalLight){const w=r.directional[f];w.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(u),f++}else if(E.isSpotLight){const w=r.spot[g];w.position.setFromMatrixPosition(E.matrixWorld),w.position.applyMatrix4(u),w.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(u),g++}else if(E.isRectAreaLight){const w=r.rectArea[_];w.position.setFromMatrixPosition(E.matrixWorld),w.position.applyMatrix4(u),o.identity(),a.copy(E.matrixWorld),a.premultiply(u),o.extractRotation(a),w.halfWidth.set(E.width*.5,0,0),w.halfHeight.set(0,E.height*.5,0),w.halfWidth.applyMatrix4(o),w.halfHeight.applyMatrix4(o),_++}else if(E.isPointLight){const w=r.point[m];w.position.setFromMatrixPosition(E.matrixWorld),w.position.applyMatrix4(u),m++}else if(E.isHemisphereLight){const w=r.hemi[p];w.direction.setFromMatrixPosition(E.matrixWorld),w.direction.transformDirection(u),p++}}}return{setup:l,setupView:c,state:r}}function ro(i,e){const t=new tp(i,e),n=[],r=[];function s(){n.length=0,r.length=0}function a(d){n.push(d)}function o(d){r.push(d)}function l(d){t.setup(n,d)}function c(d){t.setupView(n,d)}return{init:s,state:{lightsArray:n,shadowsArray:r,lights:t},setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function np(i,e){let t=new WeakMap;function n(s,a=0){const o=t.get(s);let l;return o===void 0?(l=new ro(i,e),t.set(s,[l])):a>=o.length?(l=new ro(i,e),o.push(l)):l=o[a],l}function r(){t=new WeakMap}return{get:n,dispose:r}}class ip extends cn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=tc,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class rp extends cn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const sp=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,ap=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function op(i,e,t){let n=new Rs;const r=new Pe,s=new Pe,a=new ot,o=new ip({depthPacking:nc}),l=new rp,c={},h=t.maxTextureSize,d={[En]:Rt,[Rt]:En,[zt]:zt},f=new Gn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Pe},radius:{value:4}},vertexShader:sp,fragmentShader:ap}),m=f.clone();m.defines.HORIZONTAL_PASS=1;const g=new mt;g.setAttribute("position",new Pt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new He(g,f),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=mo;let u=this.type;this.render=function(w,P,C){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||w.length===0)return;const H=i.getRenderTarget(),x=i.getActiveCubeFace(),T=i.getActiveMipmapLevel(),V=i.state;V.setBlending(vn),V.buffers.color.setClear(1,1,1,1),V.buffers.depth.setTest(!0),V.setScissorTest(!1);const W=u!==sn&&this.type===sn,q=u===sn&&this.type!==sn;for(let L=0,G=w.length;L<G;L++){const X=w[L],k=X.shadow;if(k===void 0){console.warn("THREE.WebGLShadowMap:",X,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;r.copy(k.mapSize);const te=k.getFrameExtents();if(r.multiply(te),s.copy(k.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/te.x),r.x=s.x*te.x,k.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/te.y),r.y=s.y*te.y,k.mapSize.y=s.y)),k.map===null||W===!0||q===!0){const j=this.type!==sn?{minFilter:St,magFilter:St}:{};k.map!==null&&k.map.dispose(),k.map=new On(r.x,r.y,j),k.map.texture.name=X.name+".shadowMap",k.camera.updateProjectionMatrix()}i.setRenderTarget(k.map),i.clear();const Y=k.getViewportCount();for(let j=0;j<Y;j++){const D=k.getViewport(j);a.set(s.x*D.x,s.y*D.y,s.x*D.z,s.y*D.w),V.viewport(a),k.updateMatrices(X,j),n=k.getFrustum(),E(P,C,k.camera,X,this.type)}k.isPointLightShadow!==!0&&this.type===sn&&A(k,C),k.needsUpdate=!1}u=this.type,p.needsUpdate=!1,i.setRenderTarget(H,x,T)};function A(w,P){const C=e.update(_);f.defines.VSM_SAMPLES!==w.blurSamples&&(f.defines.VSM_SAMPLES=w.blurSamples,m.defines.VSM_SAMPLES=w.blurSamples,f.needsUpdate=!0,m.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new On(r.x,r.y)),f.uniforms.shadow_pass.value=w.map.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(P,null,C,f,_,null),m.uniforms.shadow_pass.value=w.mapPass.texture,m.uniforms.resolution.value=w.mapSize,m.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(P,null,C,m,_,null)}function S(w,P,C,H){let x=null;const T=C.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(T!==void 0)x=T;else if(x=C.isPointLight===!0?l:o,i.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0){const V=x.uuid,W=P.uuid;let q=c[V];q===void 0&&(q={},c[V]=q);let L=q[W];L===void 0&&(L=x.clone(),q[W]=L),x=L}if(x.visible=P.visible,x.wireframe=P.wireframe,H===sn?x.side=P.shadowSide!==null?P.shadowSide:P.side:x.side=P.shadowSide!==null?P.shadowSide:d[P.side],x.alphaMap=P.alphaMap,x.alphaTest=P.alphaTest,x.map=P.map,x.clipShadows=P.clipShadows,x.clippingPlanes=P.clippingPlanes,x.clipIntersection=P.clipIntersection,x.displacementMap=P.displacementMap,x.displacementScale=P.displacementScale,x.displacementBias=P.displacementBias,x.wireframeLinewidth=P.wireframeLinewidth,x.linewidth=P.linewidth,C.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const V=i.properties.get(x);V.light=C}return x}function E(w,P,C,H,x){if(w.visible===!1)return;if(w.layers.test(P.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&x===sn)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,w.matrixWorld);const W=e.update(w),q=w.material;if(Array.isArray(q)){const L=W.groups;for(let G=0,X=L.length;G<X;G++){const k=L[G],te=q[k.materialIndex];if(te&&te.visible){const Y=S(w,te,H,x);i.renderBufferDirect(C,null,W,Y,w,k)}}}else if(q.visible){const L=S(w,q,H,x);i.renderBufferDirect(C,null,W,L,w,null)}}const V=w.children;for(let W=0,q=V.length;W<q;W++)E(V[W],P,C,H,x)}}function lp(i,e,t){const n=t.isWebGL2;function r(){let b=!1;const ne=new ot;let ee=null;const he=new ot(0,0,0,0);return{setMask:function(ae){ee!==ae&&!b&&(i.colorMask(ae,ae,ae,ae),ee=ae)},setLocked:function(ae){b=ae},setClear:function(ae,$,pe,Ce,gt){gt===!0&&(ae*=Ce,$*=Ce,pe*=Ce),ne.set(ae,$,pe,Ce),he.equals(ne)===!1&&(i.clearColor(ae,$,pe,Ce),he.copy(ne))},reset:function(){b=!1,ee=null,he.set(-1,0,0,0)}}}function s(){let b=!1,ne=null,ee=null,he=null;return{setTest:function(ae){ae?we(i.DEPTH_TEST):ve(i.DEPTH_TEST)},setMask:function(ae){ne!==ae&&!b&&(i.depthMask(ae),ne=ae)},setFunc:function(ae){if(ee!==ae){switch(ae){case Ll:i.depthFunc(i.NEVER);break;case Dl:i.depthFunc(i.ALWAYS);break;case Ul:i.depthFunc(i.LESS);break;case ps:i.depthFunc(i.LEQUAL);break;case Il:i.depthFunc(i.EQUAL);break;case Nl:i.depthFunc(i.GEQUAL);break;case Fl:i.depthFunc(i.GREATER);break;case Ol:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ee=ae}},setLocked:function(ae){b=ae},setClear:function(ae){he!==ae&&(i.clearDepth(ae),he=ae)},reset:function(){b=!1,ne=null,ee=null,he=null}}}function a(){let b=!1,ne=null,ee=null,he=null,ae=null,$=null,pe=null,Ce=null,gt=null;return{setTest:function(Ye){b||(Ye?we(i.STENCIL_TEST):ve(i.STENCIL_TEST))},setMask:function(Ye){ne!==Ye&&!b&&(i.stencilMask(Ye),ne=Ye)},setFunc:function(Ye,jt,_t){(ee!==Ye||he!==jt||ae!==_t)&&(i.stencilFunc(Ye,jt,_t),ee=Ye,he=jt,ae=_t)},setOp:function(Ye,jt,_t){($!==Ye||pe!==jt||Ce!==_t)&&(i.stencilOp(Ye,jt,_t),$=Ye,pe=jt,Ce=_t)},setLocked:function(Ye){b=Ye},setClear:function(Ye){gt!==Ye&&(i.clearStencil(Ye),gt=Ye)},reset:function(){b=!1,ne=null,ee=null,he=null,ae=null,$=null,pe=null,Ce=null,gt=null}}}const o=new r,l=new s,c=new a,h=new WeakMap,d=new WeakMap;let f={},m={},g=new WeakMap,_=[],p=null,u=!1,A=null,S=null,E=null,w=null,P=null,C=null,H=null,x=!1,T=null,V=null,W=null,q=null,L=null;const G=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,k=0;const te=i.getParameter(i.VERSION);te.indexOf("WebGL")!==-1?(k=parseFloat(/^WebGL (\d)/.exec(te)[1]),X=k>=1):te.indexOf("OpenGL ES")!==-1&&(k=parseFloat(/^OpenGL ES (\d)/.exec(te)[1]),X=k>=2);let Y=null,j={};const D=i.getParameter(i.SCISSOR_BOX),z=i.getParameter(i.VIEWPORT),oe=new ot().fromArray(D),le=new ot().fromArray(z);function de(b,ne,ee,he){const ae=new Uint8Array(4),$=i.createTexture();i.bindTexture(b,$),i.texParameteri(b,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(b,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let pe=0;pe<ee;pe++)n&&(b===i.TEXTURE_3D||b===i.TEXTURE_2D_ARRAY)?i.texImage3D(ne,0,i.RGBA,1,1,he,0,i.RGBA,i.UNSIGNED_BYTE,ae):i.texImage2D(ne+pe,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ae);return $}const _e={};_e[i.TEXTURE_2D]=de(i.TEXTURE_2D,i.TEXTURE_2D,1),_e[i.TEXTURE_CUBE_MAP]=de(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(_e[i.TEXTURE_2D_ARRAY]=de(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),_e[i.TEXTURE_3D]=de(i.TEXTURE_3D,i.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),l.setClear(1),c.setClear(0),we(i.DEPTH_TEST),l.setFunc(ps),be(!1),Ke(Vs),we(i.CULL_FACE),xe(vn);function we(b){f[b]!==!0&&(i.enable(b),f[b]=!0)}function ve(b){f[b]!==!1&&(i.disable(b),f[b]=!1)}function ke(b,ne){return m[b]!==ne?(i.bindFramebuffer(b,ne),m[b]=ne,n&&(b===i.DRAW_FRAMEBUFFER&&(m[i.FRAMEBUFFER]=ne),b===i.FRAMEBUFFER&&(m[i.DRAW_FRAMEBUFFER]=ne)),!0):!1}function Et(b,ne){let ee=_,he=!1;if(b)if(ee=g.get(ne),ee===void 0&&(ee=[],g.set(ne,ee)),b.isWebGLMultipleRenderTargets){const ae=b.texture;if(ee.length!==ae.length||ee[0]!==i.COLOR_ATTACHMENT0){for(let $=0,pe=ae.length;$<pe;$++)ee[$]=i.COLOR_ATTACHMENT0+$;ee.length=ae.length,he=!0}}else ee[0]!==i.COLOR_ATTACHMENT0&&(ee[0]=i.COLOR_ATTACHMENT0,he=!0);else ee[0]!==i.BACK&&(ee[0]=i.BACK,he=!0);he&&(t.isWebGL2?i.drawBuffers(ee):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(ee))}function Ie(b){return p!==b?(i.useProgram(b),p=b,!0):!1}const I={[ui]:i.FUNC_ADD,[Ml]:i.FUNC_SUBTRACT,[Sl]:i.FUNC_REVERSE_SUBTRACT};if(n)I[Xs]=i.MIN,I[js]=i.MAX;else{const b=e.get("EXT_blend_minmax");b!==null&&(I[Xs]=b.MIN_EXT,I[js]=b.MAX_EXT)}const ut={[yl]:i.ZERO,[El]:i.ONE,[Tl]:i.SRC_COLOR,[go]:i.SRC_ALPHA,[Pl]:i.SRC_ALPHA_SATURATE,[Rl]:i.DST_COLOR,[Al]:i.DST_ALPHA,[bl]:i.ONE_MINUS_SRC_COLOR,[_o]:i.ONE_MINUS_SRC_ALPHA,[Cl]:i.ONE_MINUS_DST_COLOR,[wl]:i.ONE_MINUS_DST_ALPHA};function xe(b,ne,ee,he,ae,$,pe,Ce){if(b===vn){u===!0&&(ve(i.BLEND),u=!1);return}if(u===!1&&(we(i.BLEND),u=!0),b!==xl){if(b!==A||Ce!==x){if((S!==ui||P!==ui)&&(i.blendEquation(i.FUNC_ADD),S=ui,P=ui),Ce)switch(b){case pi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case pr:i.blendFunc(i.ONE,i.ONE);break;case ks:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Ws:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",b);break}else switch(b){case pi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case pr:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case ks:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Ws:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",b);break}E=null,w=null,C=null,H=null,A=b,x=Ce}return}ae=ae||ne,$=$||ee,pe=pe||he,(ne!==S||ae!==P)&&(i.blendEquationSeparate(I[ne],I[ae]),S=ne,P=ae),(ee!==E||he!==w||$!==C||pe!==H)&&(i.blendFuncSeparate(ut[ee],ut[he],ut[$],ut[pe]),E=ee,w=he,C=$,H=pe),A=b,x=!1}function Le(b,ne){b.side===zt?ve(i.CULL_FACE):we(i.CULL_FACE);let ee=b.side===Rt;ne&&(ee=!ee),be(ee),b.blending===pi&&b.transparent===!1?xe(vn):xe(b.blending,b.blendEquation,b.blendSrc,b.blendDst,b.blendEquationAlpha,b.blendSrcAlpha,b.blendDstAlpha,b.premultipliedAlpha),l.setFunc(b.depthFunc),l.setTest(b.depthTest),l.setMask(b.depthWrite),o.setMask(b.colorWrite);const he=b.stencilWrite;c.setTest(he),he&&(c.setMask(b.stencilWriteMask),c.setFunc(b.stencilFunc,b.stencilRef,b.stencilFuncMask),c.setOp(b.stencilFail,b.stencilZFail,b.stencilZPass)),Ne(b.polygonOffset,b.polygonOffsetFactor,b.polygonOffsetUnits),b.alphaToCoverage===!0?we(i.SAMPLE_ALPHA_TO_COVERAGE):ve(i.SAMPLE_ALPHA_TO_COVERAGE)}function be(b){T!==b&&(b?i.frontFace(i.CW):i.frontFace(i.CCW),T=b)}function Ke(b){b!==gl?(we(i.CULL_FACE),b!==V&&(b===Vs?i.cullFace(i.BACK):b===_l?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ve(i.CULL_FACE),V=b}function Ge(b){b!==W&&(X&&i.lineWidth(b),W=b)}function Ne(b,ne,ee){b?(we(i.POLYGON_OFFSET_FILL),(q!==ne||L!==ee)&&(i.polygonOffset(ne,ee),q=ne,L=ee)):ve(i.POLYGON_OFFSET_FILL)}function je(b){b?we(i.SCISSOR_TEST):ve(i.SCISSOR_TEST)}function ct(b){b===void 0&&(b=i.TEXTURE0+G-1),Y!==b&&(i.activeTexture(b),Y=b)}function dt(b,ne,ee){ee===void 0&&(Y===null?ee=i.TEXTURE0+G-1:ee=Y);let he=j[ee];he===void 0&&(he={type:void 0,texture:void 0},j[ee]=he),(he.type!==b||he.texture!==ne)&&(Y!==ee&&(i.activeTexture(ee),Y=ee),i.bindTexture(b,ne||_e[b]),he.type=b,he.texture=ne)}function y(){const b=j[Y];b!==void 0&&b.type!==void 0&&(i.bindTexture(b.type,null),b.type=void 0,b.texture=void 0)}function v(){try{i.compressedTexImage2D.apply(i,arguments)}catch(b){console.error("THREE.WebGLState:",b)}}function F(){try{i.compressedTexImage3D.apply(i,arguments)}catch(b){console.error("THREE.WebGLState:",b)}}function J(){try{i.texSubImage2D.apply(i,arguments)}catch(b){console.error("THREE.WebGLState:",b)}}function K(){try{i.texSubImage3D.apply(i,arguments)}catch(b){console.error("THREE.WebGLState:",b)}}function Q(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(b){console.error("THREE.WebGLState:",b)}}function fe(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(b){console.error("THREE.WebGLState:",b)}}function ie(){try{i.texStorage2D.apply(i,arguments)}catch(b){console.error("THREE.WebGLState:",b)}}function ce(){try{i.texStorage3D.apply(i,arguments)}catch(b){console.error("THREE.WebGLState:",b)}}function Se(){try{i.texImage2D.apply(i,arguments)}catch(b){console.error("THREE.WebGLState:",b)}}function Ve(){try{i.texImage3D.apply(i,arguments)}catch(b){console.error("THREE.WebGLState:",b)}}function Z(b){oe.equals(b)===!1&&(i.scissor(b.x,b.y,b.z,b.w),oe.copy(b))}function We(b){le.equals(b)===!1&&(i.viewport(b.x,b.y,b.z,b.w),le.copy(b))}function Re(b,ne){let ee=d.get(ne);ee===void 0&&(ee=new WeakMap,d.set(ne,ee));let he=ee.get(b);he===void 0&&(he=i.getUniformBlockIndex(ne,b.name),ee.set(b,he))}function ye(b,ne){const he=d.get(ne).get(b);h.get(ne)!==he&&(i.uniformBlockBinding(ne,he,b.__bindingPointIndex),h.set(ne,he))}function ge(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),n===!0&&(i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null)),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),f={},Y=null,j={},m={},g=new WeakMap,_=[],p=null,u=!1,A=null,S=null,E=null,w=null,P=null,C=null,H=null,x=!1,T=null,V=null,W=null,q=null,L=null,oe.set(0,0,i.canvas.width,i.canvas.height),le.set(0,0,i.canvas.width,i.canvas.height),o.reset(),l.reset(),c.reset()}return{buffers:{color:o,depth:l,stencil:c},enable:we,disable:ve,bindFramebuffer:ke,drawBuffers:Et,useProgram:Ie,setBlending:xe,setMaterial:Le,setFlipSided:be,setCullFace:Ke,setLineWidth:Ge,setPolygonOffset:Ne,setScissorTest:je,activeTexture:ct,bindTexture:dt,unbindTexture:y,compressedTexImage2D:v,compressedTexImage3D:F,texImage2D:Se,texImage3D:Ve,updateUBOMapping:Re,uniformBlockBinding:ye,texStorage2D:ie,texStorage3D:ce,texSubImage2D:J,texSubImage3D:K,compressedTexSubImage2D:Q,compressedTexSubImage3D:fe,scissor:Z,viewport:We,reset:ge}}function cp(i,e,t,n,r,s,a){const o=r.isWebGL2,l=r.maxTextures,c=r.maxCubemapSize,h=r.maxTextureSize,d=r.maxSamples,f=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,m=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),g=new WeakMap;let _;const p=new WeakMap;let u=!1;try{u=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function A(y,v){return u?new OffscreenCanvas(y,v):xr("canvas")}function S(y,v,F,J){let K=1;if((y.width>J||y.height>J)&&(K=J/Math.max(y.width,y.height)),K<1||v===!0)if(typeof HTMLImageElement<"u"&&y instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&y instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&y instanceof ImageBitmap){const Q=v?ys:Math.floor,fe=Q(K*y.width),ie=Q(K*y.height);_===void 0&&(_=A(fe,ie));const ce=F?A(fe,ie):_;return ce.width=fe,ce.height=ie,ce.getContext("2d").drawImage(y,0,0,fe,ie),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+y.width+"x"+y.height+") to ("+fe+"x"+ie+")."),ce}else return"data"in y&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+y.width+"x"+y.height+")."),y;return y}function E(y){return Ma(y.width)&&Ma(y.height)}function w(y){return o?!1:y.wrapS!==kt||y.wrapT!==kt||y.minFilter!==St&&y.minFilter!==Ft}function P(y,v){return y.generateMipmaps&&v&&y.minFilter!==St&&y.minFilter!==Ft}function C(y){i.generateMipmap(y)}function H(y,v,F,J,K=!1){if(o===!1)return v;if(y!==null){if(i[y]!==void 0)return i[y];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+y+"'")}let Q=v;if(v===i.RED&&(F===i.FLOAT&&(Q=i.R32F),F===i.HALF_FLOAT&&(Q=i.R16F),F===i.UNSIGNED_BYTE&&(Q=i.R8)),v===i.RED_INTEGER&&(F===i.UNSIGNED_BYTE&&(Q=i.R8UI),F===i.UNSIGNED_SHORT&&(Q=i.R16UI),F===i.UNSIGNED_INT&&(Q=i.R32UI),F===i.BYTE&&(Q=i.R8I),F===i.SHORT&&(Q=i.R16I),F===i.INT&&(Q=i.R32I)),v===i.RG&&(F===i.FLOAT&&(Q=i.RG32F),F===i.HALF_FLOAT&&(Q=i.RG16F),F===i.UNSIGNED_BYTE&&(Q=i.RG8)),v===i.RGBA){const fe=K?mr:Xe.getTransfer(J);F===i.FLOAT&&(Q=i.RGBA32F),F===i.HALF_FLOAT&&(Q=i.RGBA16F),F===i.UNSIGNED_BYTE&&(Q=fe===$e?i.SRGB8_ALPHA8:i.RGBA8),F===i.UNSIGNED_SHORT_4_4_4_4&&(Q=i.RGBA4),F===i.UNSIGNED_SHORT_5_5_5_1&&(Q=i.RGB5_A1)}return(Q===i.R16F||Q===i.R32F||Q===i.RG16F||Q===i.RG32F||Q===i.RGBA16F||Q===i.RGBA32F)&&e.get("EXT_color_buffer_float"),Q}function x(y,v,F){return P(y,F)===!0||y.isFramebufferTexture&&y.minFilter!==St&&y.minFilter!==Ft?Math.log2(Math.max(v.width,v.height))+1:y.mipmaps!==void 0&&y.mipmaps.length>0?y.mipmaps.length:y.isCompressedTexture&&Array.isArray(y.image)?v.mipmaps.length:1}function T(y){return y===St||y===qs||y===Nr?i.NEAREST:i.LINEAR}function V(y){const v=y.target;v.removeEventListener("dispose",V),q(v),v.isVideoTexture&&g.delete(v)}function W(y){const v=y.target;v.removeEventListener("dispose",W),G(v)}function q(y){const v=n.get(y);if(v.__webglInit===void 0)return;const F=y.source,J=p.get(F);if(J){const K=J[v.__cacheKey];K.usedTimes--,K.usedTimes===0&&L(y),Object.keys(J).length===0&&p.delete(F)}n.remove(y)}function L(y){const v=n.get(y);i.deleteTexture(v.__webglTexture);const F=y.source,J=p.get(F);delete J[v.__cacheKey],a.memory.textures--}function G(y){const v=y.texture,F=n.get(y),J=n.get(v);if(J.__webglTexture!==void 0&&(i.deleteTexture(J.__webglTexture),a.memory.textures--),y.depthTexture&&y.depthTexture.dispose(),y.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(F.__webglFramebuffer[K]))for(let Q=0;Q<F.__webglFramebuffer[K].length;Q++)i.deleteFramebuffer(F.__webglFramebuffer[K][Q]);else i.deleteFramebuffer(F.__webglFramebuffer[K]);F.__webglDepthbuffer&&i.deleteRenderbuffer(F.__webglDepthbuffer[K])}else{if(Array.isArray(F.__webglFramebuffer))for(let K=0;K<F.__webglFramebuffer.length;K++)i.deleteFramebuffer(F.__webglFramebuffer[K]);else i.deleteFramebuffer(F.__webglFramebuffer);if(F.__webglDepthbuffer&&i.deleteRenderbuffer(F.__webglDepthbuffer),F.__webglMultisampledFramebuffer&&i.deleteFramebuffer(F.__webglMultisampledFramebuffer),F.__webglColorRenderbuffer)for(let K=0;K<F.__webglColorRenderbuffer.length;K++)F.__webglColorRenderbuffer[K]&&i.deleteRenderbuffer(F.__webglColorRenderbuffer[K]);F.__webglDepthRenderbuffer&&i.deleteRenderbuffer(F.__webglDepthRenderbuffer)}if(y.isWebGLMultipleRenderTargets)for(let K=0,Q=v.length;K<Q;K++){const fe=n.get(v[K]);fe.__webglTexture&&(i.deleteTexture(fe.__webglTexture),a.memory.textures--),n.remove(v[K])}n.remove(v),n.remove(y)}let X=0;function k(){X=0}function te(){const y=X;return y>=l&&console.warn("THREE.WebGLTextures: Trying to use "+y+" texture units while this GPU supports only "+l),X+=1,y}function Y(y){const v=[];return v.push(y.wrapS),v.push(y.wrapT),v.push(y.wrapR||0),v.push(y.magFilter),v.push(y.minFilter),v.push(y.anisotropy),v.push(y.internalFormat),v.push(y.format),v.push(y.type),v.push(y.generateMipmaps),v.push(y.premultiplyAlpha),v.push(y.flipY),v.push(y.unpackAlignment),v.push(y.colorSpace),v.join()}function j(y,v){const F=n.get(y);if(y.isVideoTexture&&ct(y),y.isRenderTargetTexture===!1&&y.version>0&&F.__version!==y.version){const J=y.image;if(J===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(J.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ke(F,y,v);return}}t.bindTexture(i.TEXTURE_2D,F.__webglTexture,i.TEXTURE0+v)}function D(y,v){const F=n.get(y);if(y.version>0&&F.__version!==y.version){ke(F,y,v);return}t.bindTexture(i.TEXTURE_2D_ARRAY,F.__webglTexture,i.TEXTURE0+v)}function z(y,v){const F=n.get(y);if(y.version>0&&F.__version!==y.version){ke(F,y,v);return}t.bindTexture(i.TEXTURE_3D,F.__webglTexture,i.TEXTURE0+v)}function oe(y,v){const F=n.get(y);if(y.version>0&&F.__version!==y.version){Et(F,y,v);return}t.bindTexture(i.TEXTURE_CUBE_MAP,F.__webglTexture,i.TEXTURE0+v)}const le={[_s]:i.REPEAT,[kt]:i.CLAMP_TO_EDGE,[vs]:i.MIRRORED_REPEAT},de={[St]:i.NEAREST,[qs]:i.NEAREST_MIPMAP_NEAREST,[Nr]:i.NEAREST_MIPMAP_LINEAR,[Ft]:i.LINEAR,[Xl]:i.LINEAR_MIPMAP_NEAREST,[Ui]:i.LINEAR_MIPMAP_LINEAR},_e={[sc]:i.NEVER,[dc]:i.ALWAYS,[ac]:i.LESS,[lc]:i.LEQUAL,[oc]:i.EQUAL,[uc]:i.GEQUAL,[cc]:i.GREATER,[hc]:i.NOTEQUAL};function we(y,v,F){if(F?(i.texParameteri(y,i.TEXTURE_WRAP_S,le[v.wrapS]),i.texParameteri(y,i.TEXTURE_WRAP_T,le[v.wrapT]),(y===i.TEXTURE_3D||y===i.TEXTURE_2D_ARRAY)&&i.texParameteri(y,i.TEXTURE_WRAP_R,le[v.wrapR]),i.texParameteri(y,i.TEXTURE_MAG_FILTER,de[v.magFilter]),i.texParameteri(y,i.TEXTURE_MIN_FILTER,de[v.minFilter])):(i.texParameteri(y,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(y,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),(y===i.TEXTURE_3D||y===i.TEXTURE_2D_ARRAY)&&i.texParameteri(y,i.TEXTURE_WRAP_R,i.CLAMP_TO_EDGE),(v.wrapS!==kt||v.wrapT!==kt)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),i.texParameteri(y,i.TEXTURE_MAG_FILTER,T(v.magFilter)),i.texParameteri(y,i.TEXTURE_MIN_FILTER,T(v.minFilter)),v.minFilter!==St&&v.minFilter!==Ft&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),v.compareFunction&&(i.texParameteri(y,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(y,i.TEXTURE_COMPARE_FUNC,_e[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const J=e.get("EXT_texture_filter_anisotropic");if(v.magFilter===St||v.minFilter!==Nr&&v.minFilter!==Ui||v.type===_n&&e.has("OES_texture_float_linear")===!1||o===!1&&v.type===Ii&&e.has("OES_texture_half_float_linear")===!1)return;(v.anisotropy>1||n.get(v).__currentAnisotropy)&&(i.texParameterf(y,J.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,r.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy)}}function ve(y,v){let F=!1;y.__webglInit===void 0&&(y.__webglInit=!0,v.addEventListener("dispose",V));const J=v.source;let K=p.get(J);K===void 0&&(K={},p.set(J,K));const Q=Y(v);if(Q!==y.__cacheKey){K[Q]===void 0&&(K[Q]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,F=!0),K[Q].usedTimes++;const fe=K[y.__cacheKey];fe!==void 0&&(K[y.__cacheKey].usedTimes--,fe.usedTimes===0&&L(v)),y.__cacheKey=Q,y.__webglTexture=K[Q].texture}return F}function ke(y,v,F){let J=i.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(J=i.TEXTURE_2D_ARRAY),v.isData3DTexture&&(J=i.TEXTURE_3D);const K=ve(y,v),Q=v.source;t.bindTexture(J,y.__webglTexture,i.TEXTURE0+F);const fe=n.get(Q);if(Q.version!==fe.__version||K===!0){t.activeTexture(i.TEXTURE0+F);const ie=Xe.getPrimaries(Xe.workingColorSpace),ce=v.colorSpace===Gt?null:Xe.getPrimaries(v.colorSpace),Se=v.colorSpace===Gt||ie===ce?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Se);const Ve=w(v)&&E(v.image)===!1;let Z=S(v.image,Ve,!1,h);Z=dt(v,Z);const We=E(Z)||o,Re=s.convert(v.format,v.colorSpace);let ye=s.convert(v.type),ge=H(v.internalFormat,Re,ye,v.colorSpace,v.isVideoTexture);we(J,v,We);let b;const ne=v.mipmaps,ee=o&&v.isVideoTexture!==!0,he=fe.__version===void 0||K===!0,ae=x(v,Z,We);if(v.isDepthTexture)ge=i.DEPTH_COMPONENT,o?v.type===_n?ge=i.DEPTH_COMPONENT32F:v.type===gn?ge=i.DEPTH_COMPONENT24:v.type===In?ge=i.DEPTH24_STENCIL8:ge=i.DEPTH_COMPONENT16:v.type===_n&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),v.format===Nn&&ge===i.DEPTH_COMPONENT&&v.type!==As&&v.type!==gn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),v.type=gn,ye=s.convert(v.type)),v.format===vi&&ge===i.DEPTH_COMPONENT&&(ge=i.DEPTH_STENCIL,v.type!==In&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),v.type=In,ye=s.convert(v.type))),he&&(ee?t.texStorage2D(i.TEXTURE_2D,1,ge,Z.width,Z.height):t.texImage2D(i.TEXTURE_2D,0,ge,Z.width,Z.height,0,Re,ye,null));else if(v.isDataTexture)if(ne.length>0&&We){ee&&he&&t.texStorage2D(i.TEXTURE_2D,ae,ge,ne[0].width,ne[0].height);for(let $=0,pe=ne.length;$<pe;$++)b=ne[$],ee?t.texSubImage2D(i.TEXTURE_2D,$,0,0,b.width,b.height,Re,ye,b.data):t.texImage2D(i.TEXTURE_2D,$,ge,b.width,b.height,0,Re,ye,b.data);v.generateMipmaps=!1}else ee?(he&&t.texStorage2D(i.TEXTURE_2D,ae,ge,Z.width,Z.height),t.texSubImage2D(i.TEXTURE_2D,0,0,0,Z.width,Z.height,Re,ye,Z.data)):t.texImage2D(i.TEXTURE_2D,0,ge,Z.width,Z.height,0,Re,ye,Z.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){ee&&he&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ae,ge,ne[0].width,ne[0].height,Z.depth);for(let $=0,pe=ne.length;$<pe;$++)b=ne[$],v.format!==Wt?Re!==null?ee?t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,0,b.width,b.height,Z.depth,Re,b.data,0,0):t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,$,ge,b.width,b.height,Z.depth,0,b.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ee?t.texSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,0,b.width,b.height,Z.depth,Re,ye,b.data):t.texImage3D(i.TEXTURE_2D_ARRAY,$,ge,b.width,b.height,Z.depth,0,Re,ye,b.data)}else{ee&&he&&t.texStorage2D(i.TEXTURE_2D,ae,ge,ne[0].width,ne[0].height);for(let $=0,pe=ne.length;$<pe;$++)b=ne[$],v.format!==Wt?Re!==null?ee?t.compressedTexSubImage2D(i.TEXTURE_2D,$,0,0,b.width,b.height,Re,b.data):t.compressedTexImage2D(i.TEXTURE_2D,$,ge,b.width,b.height,0,b.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ee?t.texSubImage2D(i.TEXTURE_2D,$,0,0,b.width,b.height,Re,ye,b.data):t.texImage2D(i.TEXTURE_2D,$,ge,b.width,b.height,0,Re,ye,b.data)}else if(v.isDataArrayTexture)ee?(he&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ae,ge,Z.width,Z.height,Z.depth),t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,Z.width,Z.height,Z.depth,Re,ye,Z.data)):t.texImage3D(i.TEXTURE_2D_ARRAY,0,ge,Z.width,Z.height,Z.depth,0,Re,ye,Z.data);else if(v.isData3DTexture)ee?(he&&t.texStorage3D(i.TEXTURE_3D,ae,ge,Z.width,Z.height,Z.depth),t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,Z.width,Z.height,Z.depth,Re,ye,Z.data)):t.texImage3D(i.TEXTURE_3D,0,ge,Z.width,Z.height,Z.depth,0,Re,ye,Z.data);else if(v.isFramebufferTexture){if(he)if(ee)t.texStorage2D(i.TEXTURE_2D,ae,ge,Z.width,Z.height);else{let $=Z.width,pe=Z.height;for(let Ce=0;Ce<ae;Ce++)t.texImage2D(i.TEXTURE_2D,Ce,ge,$,pe,0,Re,ye,null),$>>=1,pe>>=1}}else if(ne.length>0&&We){ee&&he&&t.texStorage2D(i.TEXTURE_2D,ae,ge,ne[0].width,ne[0].height);for(let $=0,pe=ne.length;$<pe;$++)b=ne[$],ee?t.texSubImage2D(i.TEXTURE_2D,$,0,0,Re,ye,b):t.texImage2D(i.TEXTURE_2D,$,ge,Re,ye,b);v.generateMipmaps=!1}else ee?(he&&t.texStorage2D(i.TEXTURE_2D,ae,ge,Z.width,Z.height),t.texSubImage2D(i.TEXTURE_2D,0,0,0,Re,ye,Z)):t.texImage2D(i.TEXTURE_2D,0,ge,Re,ye,Z);P(v,We)&&C(J),fe.__version=Q.version,v.onUpdate&&v.onUpdate(v)}y.__version=v.version}function Et(y,v,F){if(v.image.length!==6)return;const J=ve(y,v),K=v.source;t.bindTexture(i.TEXTURE_CUBE_MAP,y.__webglTexture,i.TEXTURE0+F);const Q=n.get(K);if(K.version!==Q.__version||J===!0){t.activeTexture(i.TEXTURE0+F);const fe=Xe.getPrimaries(Xe.workingColorSpace),ie=v.colorSpace===Gt?null:Xe.getPrimaries(v.colorSpace),ce=v.colorSpace===Gt||fe===ie?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ce);const Se=v.isCompressedTexture||v.image[0].isCompressedTexture,Ve=v.image[0]&&v.image[0].isDataTexture,Z=[];for(let $=0;$<6;$++)!Se&&!Ve?Z[$]=S(v.image[$],!1,!0,c):Z[$]=Ve?v.image[$].image:v.image[$],Z[$]=dt(v,Z[$]);const We=Z[0],Re=E(We)||o,ye=s.convert(v.format,v.colorSpace),ge=s.convert(v.type),b=H(v.internalFormat,ye,ge,v.colorSpace),ne=o&&v.isVideoTexture!==!0,ee=Q.__version===void 0||J===!0;let he=x(v,We,Re);we(i.TEXTURE_CUBE_MAP,v,Re);let ae;if(Se){ne&&ee&&t.texStorage2D(i.TEXTURE_CUBE_MAP,he,b,We.width,We.height);for(let $=0;$<6;$++){ae=Z[$].mipmaps;for(let pe=0;pe<ae.length;pe++){const Ce=ae[pe];v.format!==Wt?ye!==null?ne?t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,pe,0,0,Ce.width,Ce.height,ye,Ce.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,pe,b,Ce.width,Ce.height,0,Ce.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ne?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,pe,0,0,Ce.width,Ce.height,ye,ge,Ce.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,pe,b,Ce.width,Ce.height,0,ye,ge,Ce.data)}}}else{ae=v.mipmaps,ne&&ee&&(ae.length>0&&he++,t.texStorage2D(i.TEXTURE_CUBE_MAP,he,b,Z[0].width,Z[0].height));for(let $=0;$<6;$++)if(Ve){ne?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,Z[$].width,Z[$].height,ye,ge,Z[$].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,b,Z[$].width,Z[$].height,0,ye,ge,Z[$].data);for(let pe=0;pe<ae.length;pe++){const gt=ae[pe].image[$].image;ne?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,pe+1,0,0,gt.width,gt.height,ye,ge,gt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,pe+1,b,gt.width,gt.height,0,ye,ge,gt.data)}}else{ne?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,ye,ge,Z[$]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,b,ye,ge,Z[$]);for(let pe=0;pe<ae.length;pe++){const Ce=ae[pe];ne?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,pe+1,0,0,ye,ge,Ce.image[$]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,pe+1,b,ye,ge,Ce.image[$])}}}P(v,Re)&&C(i.TEXTURE_CUBE_MAP),Q.__version=K.version,v.onUpdate&&v.onUpdate(v)}y.__version=v.version}function Ie(y,v,F,J,K,Q){const fe=s.convert(F.format,F.colorSpace),ie=s.convert(F.type),ce=H(F.internalFormat,fe,ie,F.colorSpace);if(!n.get(v).__hasExternalTextures){const Ve=Math.max(1,v.width>>Q),Z=Math.max(1,v.height>>Q);K===i.TEXTURE_3D||K===i.TEXTURE_2D_ARRAY?t.texImage3D(K,Q,ce,Ve,Z,v.depth,0,fe,ie,null):t.texImage2D(K,Q,ce,Ve,Z,0,fe,ie,null)}t.bindFramebuffer(i.FRAMEBUFFER,y),je(v)?f.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,J,K,n.get(F).__webglTexture,0,Ne(v)):(K===i.TEXTURE_2D||K>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,J,K,n.get(F).__webglTexture,Q),t.bindFramebuffer(i.FRAMEBUFFER,null)}function I(y,v,F){if(i.bindRenderbuffer(i.RENDERBUFFER,y),v.depthBuffer&&!v.stencilBuffer){let J=o===!0?i.DEPTH_COMPONENT24:i.DEPTH_COMPONENT16;if(F||je(v)){const K=v.depthTexture;K&&K.isDepthTexture&&(K.type===_n?J=i.DEPTH_COMPONENT32F:K.type===gn&&(J=i.DEPTH_COMPONENT24));const Q=Ne(v);je(v)?f.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Q,J,v.width,v.height):i.renderbufferStorageMultisample(i.RENDERBUFFER,Q,J,v.width,v.height)}else i.renderbufferStorage(i.RENDERBUFFER,J,v.width,v.height);i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.RENDERBUFFER,y)}else if(v.depthBuffer&&v.stencilBuffer){const J=Ne(v);F&&je(v)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,J,i.DEPTH24_STENCIL8,v.width,v.height):je(v)?f.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,J,i.DEPTH24_STENCIL8,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,i.DEPTH_STENCIL,v.width,v.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.RENDERBUFFER,y)}else{const J=v.isWebGLMultipleRenderTargets===!0?v.texture:[v.texture];for(let K=0;K<J.length;K++){const Q=J[K],fe=s.convert(Q.format,Q.colorSpace),ie=s.convert(Q.type),ce=H(Q.internalFormat,fe,ie,Q.colorSpace),Se=Ne(v);F&&je(v)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Se,ce,v.width,v.height):je(v)?f.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Se,ce,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,ce,v.width,v.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ut(y,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,y),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(v.depthTexture).__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),j(v.depthTexture,0);const J=n.get(v.depthTexture).__webglTexture,K=Ne(v);if(v.depthTexture.format===Nn)je(v)?f.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,J,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,J,0);else if(v.depthTexture.format===vi)je(v)?f.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,J,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,J,0);else throw new Error("Unknown depthTexture format")}function xe(y){const v=n.get(y),F=y.isWebGLCubeRenderTarget===!0;if(y.depthTexture&&!v.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");ut(v.__webglFramebuffer,y)}else if(F){v.__webglDepthbuffer=[];for(let J=0;J<6;J++)t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[J]),v.__webglDepthbuffer[J]=i.createRenderbuffer(),I(v.__webglDepthbuffer[J],y,!1)}else t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer=i.createRenderbuffer(),I(v.__webglDepthbuffer,y,!1);t.bindFramebuffer(i.FRAMEBUFFER,null)}function Le(y,v,F){const J=n.get(y);v!==void 0&&Ie(J.__webglFramebuffer,y,y.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),F!==void 0&&xe(y)}function be(y){const v=y.texture,F=n.get(y),J=n.get(v);y.addEventListener("dispose",W),y.isWebGLMultipleRenderTargets!==!0&&(J.__webglTexture===void 0&&(J.__webglTexture=i.createTexture()),J.__version=v.version,a.memory.textures++);const K=y.isWebGLCubeRenderTarget===!0,Q=y.isWebGLMultipleRenderTargets===!0,fe=E(y)||o;if(K){F.__webglFramebuffer=[];for(let ie=0;ie<6;ie++)if(o&&v.mipmaps&&v.mipmaps.length>0){F.__webglFramebuffer[ie]=[];for(let ce=0;ce<v.mipmaps.length;ce++)F.__webglFramebuffer[ie][ce]=i.createFramebuffer()}else F.__webglFramebuffer[ie]=i.createFramebuffer()}else{if(o&&v.mipmaps&&v.mipmaps.length>0){F.__webglFramebuffer=[];for(let ie=0;ie<v.mipmaps.length;ie++)F.__webglFramebuffer[ie]=i.createFramebuffer()}else F.__webglFramebuffer=i.createFramebuffer();if(Q)if(r.drawBuffers){const ie=y.texture;for(let ce=0,Se=ie.length;ce<Se;ce++){const Ve=n.get(ie[ce]);Ve.__webglTexture===void 0&&(Ve.__webglTexture=i.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&y.samples>0&&je(y)===!1){const ie=Q?v:[v];F.__webglMultisampledFramebuffer=i.createFramebuffer(),F.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let ce=0;ce<ie.length;ce++){const Se=ie[ce];F.__webglColorRenderbuffer[ce]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,F.__webglColorRenderbuffer[ce]);const Ve=s.convert(Se.format,Se.colorSpace),Z=s.convert(Se.type),We=H(Se.internalFormat,Ve,Z,Se.colorSpace,y.isXRRenderTarget===!0),Re=Ne(y);i.renderbufferStorageMultisample(i.RENDERBUFFER,Re,We,y.width,y.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ce,i.RENDERBUFFER,F.__webglColorRenderbuffer[ce])}i.bindRenderbuffer(i.RENDERBUFFER,null),y.depthBuffer&&(F.__webglDepthRenderbuffer=i.createRenderbuffer(),I(F.__webglDepthRenderbuffer,y,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(K){t.bindTexture(i.TEXTURE_CUBE_MAP,J.__webglTexture),we(i.TEXTURE_CUBE_MAP,v,fe);for(let ie=0;ie<6;ie++)if(o&&v.mipmaps&&v.mipmaps.length>0)for(let ce=0;ce<v.mipmaps.length;ce++)Ie(F.__webglFramebuffer[ie][ce],y,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,ce);else Ie(F.__webglFramebuffer[ie],y,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0);P(v,fe)&&C(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Q){const ie=y.texture;for(let ce=0,Se=ie.length;ce<Se;ce++){const Ve=ie[ce],Z=n.get(Ve);t.bindTexture(i.TEXTURE_2D,Z.__webglTexture),we(i.TEXTURE_2D,Ve,fe),Ie(F.__webglFramebuffer,y,Ve,i.COLOR_ATTACHMENT0+ce,i.TEXTURE_2D,0),P(Ve,fe)&&C(i.TEXTURE_2D)}t.unbindTexture()}else{let ie=i.TEXTURE_2D;if((y.isWebGL3DRenderTarget||y.isWebGLArrayRenderTarget)&&(o?ie=y.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(ie,J.__webglTexture),we(ie,v,fe),o&&v.mipmaps&&v.mipmaps.length>0)for(let ce=0;ce<v.mipmaps.length;ce++)Ie(F.__webglFramebuffer[ce],y,v,i.COLOR_ATTACHMENT0,ie,ce);else Ie(F.__webglFramebuffer,y,v,i.COLOR_ATTACHMENT0,ie,0);P(v,fe)&&C(ie),t.unbindTexture()}y.depthBuffer&&xe(y)}function Ke(y){const v=E(y)||o,F=y.isWebGLMultipleRenderTargets===!0?y.texture:[y.texture];for(let J=0,K=F.length;J<K;J++){const Q=F[J];if(P(Q,v)){const fe=y.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,ie=n.get(Q).__webglTexture;t.bindTexture(fe,ie),C(fe),t.unbindTexture()}}}function Ge(y){if(o&&y.samples>0&&je(y)===!1){const v=y.isWebGLMultipleRenderTargets?y.texture:[y.texture],F=y.width,J=y.height;let K=i.COLOR_BUFFER_BIT;const Q=[],fe=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ie=n.get(y),ce=y.isWebGLMultipleRenderTargets===!0;if(ce)for(let Se=0;Se<v.length;Se++)t.bindFramebuffer(i.FRAMEBUFFER,ie.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Se,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,ie.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Se,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,ie.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ie.__webglFramebuffer);for(let Se=0;Se<v.length;Se++){Q.push(i.COLOR_ATTACHMENT0+Se),y.depthBuffer&&Q.push(fe);const Ve=ie.__ignoreDepthValues!==void 0?ie.__ignoreDepthValues:!1;if(Ve===!1&&(y.depthBuffer&&(K|=i.DEPTH_BUFFER_BIT),y.stencilBuffer&&(K|=i.STENCIL_BUFFER_BIT)),ce&&i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ie.__webglColorRenderbuffer[Se]),Ve===!0&&(i.invalidateFramebuffer(i.READ_FRAMEBUFFER,[fe]),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[fe])),ce){const Z=n.get(v[Se]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Z,0)}i.blitFramebuffer(0,0,F,J,0,0,F,J,K,i.NEAREST),m&&i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Q)}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ce)for(let Se=0;Se<v.length;Se++){t.bindFramebuffer(i.FRAMEBUFFER,ie.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Se,i.RENDERBUFFER,ie.__webglColorRenderbuffer[Se]);const Ve=n.get(v[Se]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,ie.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Se,i.TEXTURE_2D,Ve,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ie.__webglMultisampledFramebuffer)}}function Ne(y){return Math.min(d,y.samples)}function je(y){const v=n.get(y);return o&&y.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function ct(y){const v=a.render.frame;g.get(y)!==v&&(g.set(y,v),y.update())}function dt(y,v){const F=y.colorSpace,J=y.format,K=y.type;return y.isCompressedTexture===!0||y.isVideoTexture===!0||y.format===Ms||F!==ln&&F!==Gt&&(Xe.getTransfer(F)===$e?o===!1?e.has("EXT_sRGB")===!0&&J===Wt?(y.format=Ms,y.minFilter=Ft,y.generateMipmaps=!1):v=wo.sRGBToLinear(v):(J!==Wt||K!==Mn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),v}this.allocateTextureUnit=te,this.resetTextureUnits=k,this.setTexture2D=j,this.setTexture2DArray=D,this.setTexture3D=z,this.setTextureCube=oe,this.rebindTextures=Le,this.setupRenderTarget=be,this.updateRenderTargetMipmap=Ke,this.updateMultisampleRenderTarget=Ge,this.setupDepthRenderbuffer=xe,this.setupFrameBufferTexture=Ie,this.useMultisampledRTT=je}function hp(i,e,t){const n=t.isWebGL2;function r(s,a=Gt){let o;const l=Xe.getTransfer(a);if(s===Mn)return i.UNSIGNED_BYTE;if(s===Mo)return i.UNSIGNED_SHORT_4_4_4_4;if(s===So)return i.UNSIGNED_SHORT_5_5_5_1;if(s===jl)return i.BYTE;if(s===ql)return i.SHORT;if(s===As)return i.UNSIGNED_SHORT;if(s===xo)return i.INT;if(s===gn)return i.UNSIGNED_INT;if(s===_n)return i.FLOAT;if(s===Ii)return n?i.HALF_FLOAT:(o=e.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(s===Yl)return i.ALPHA;if(s===Wt)return i.RGBA;if(s===$l)return i.LUMINANCE;if(s===Kl)return i.LUMINANCE_ALPHA;if(s===Nn)return i.DEPTH_COMPONENT;if(s===vi)return i.DEPTH_STENCIL;if(s===Ms)return o=e.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(s===Zl)return i.RED;if(s===yo)return i.RED_INTEGER;if(s===Jl)return i.RG;if(s===Eo)return i.RG_INTEGER;if(s===To)return i.RGBA_INTEGER;if(s===Fr||s===Or||s===Br||s===zr)if(l===$e)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(s===Fr)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Or)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===Br)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===zr)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(s===Fr)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Or)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===Br)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===zr)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===Ys||s===$s||s===Ks||s===Zs)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(s===Ys)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===$s)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===Ks)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===Zs)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===Ql)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===Js||s===Qs)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(s===Js)return l===$e?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(s===Qs)return l===$e?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===ea||s===ta||s===na||s===ia||s===ra||s===sa||s===aa||s===oa||s===la||s===ca||s===ha||s===ua||s===da||s===fa)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(s===ea)return l===$e?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===ta)return l===$e?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===na)return l===$e?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===ia)return l===$e?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===ra)return l===$e?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===sa)return l===$e?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===aa)return l===$e?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===oa)return l===$e?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===la)return l===$e?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===ca)return l===$e?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===ha)return l===$e?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===ua)return l===$e?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===da)return l===$e?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===fa)return l===$e?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===Gr||s===pa||s===ma)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(s===Gr)return l===$e?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===pa)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===ma)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===ec||s===ga||s===_a||s===va)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(s===Gr)return o.COMPRESSED_RED_RGTC1_EXT;if(s===ga)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===_a)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===va)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===In?n?i.UNSIGNED_INT_24_8:(o=e.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):i[s]!==void 0?i[s]:null}return{convert:r}}class up extends Bt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Yt extends lt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const dp={type:"move"};class hs{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Yt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Yt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new R,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new R),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Yt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new R,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new R),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const _ of e.hand.values()){const p=t.getJointPose(_,n),u=this._getHandJoint(c,_);p!==null&&(u.matrix.fromArray(p.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,u.jointRadius=p.radius),u.visible=p!==null}const h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],f=h.position.distanceTo(d.position),m=.02,g=.005;c.inputState.pinching&&f>m+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=m-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(dp)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Yt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class fp extends Ct{constructor(e,t,n,r,s,a,o,l,c,h){if(h=h!==void 0?h:Nn,h!==Nn&&h!==vi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Nn&&(n=gn),n===void 0&&h===vi&&(n=In),super(null,r,s,a,o,l,h,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:St,this.minFilter=l!==void 0?l:St,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class pp extends Vn{constructor(e,t){super();const n=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,h=null,d=null,f=null,m=null,g=null;const _=t.getContextAttributes();let p=null,u=null;const A=[],S=[],E=new Bt;E.layers.enable(1),E.viewport=new ot;const w=new Bt;w.layers.enable(2),w.viewport=new ot;const P=[E,w],C=new up;C.layers.enable(1),C.layers.enable(2);let H=null,x=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(D){let z=A[D];return z===void 0&&(z=new hs,A[D]=z),z.getTargetRaySpace()},this.getControllerGrip=function(D){let z=A[D];return z===void 0&&(z=new hs,A[D]=z),z.getGripSpace()},this.getHand=function(D){let z=A[D];return z===void 0&&(z=new hs,A[D]=z),z.getHandSpace()};function T(D){const z=S.indexOf(D.inputSource);if(z===-1)return;const oe=A[z];oe!==void 0&&(oe.update(D.inputSource,D.frame,c||a),oe.dispatchEvent({type:D.type,data:D.inputSource}))}function V(){r.removeEventListener("select",T),r.removeEventListener("selectstart",T),r.removeEventListener("selectend",T),r.removeEventListener("squeeze",T),r.removeEventListener("squeezestart",T),r.removeEventListener("squeezeend",T),r.removeEventListener("end",V),r.removeEventListener("inputsourceschange",W);for(let D=0;D<A.length;D++){const z=S[D];z!==null&&(S[D]=null,A[D].disconnect(z))}H=null,x=null,e.setRenderTarget(p),m=null,f=null,d=null,r=null,u=null,j.stop(),n.isPresenting=!1,n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(D){s=D,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(D){o=D,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(D){c=D},this.getBaseLayer=function(){return f!==null?f:m},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(D){if(r=D,r!==null){if(p=e.getRenderTarget(),r.addEventListener("select",T),r.addEventListener("selectstart",T),r.addEventListener("selectend",T),r.addEventListener("squeeze",T),r.addEventListener("squeezestart",T),r.addEventListener("squeezeend",T),r.addEventListener("end",V),r.addEventListener("inputsourceschange",W),_.xrCompatible!==!0&&await t.makeXRCompatible(),r.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const z={antialias:r.renderState.layers===void 0?_.antialias:!0,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:s};m=new XRWebGLLayer(r,t,z),r.updateRenderState({baseLayer:m}),u=new On(m.framebufferWidth,m.framebufferHeight,{format:Wt,type:Mn,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil})}else{let z=null,oe=null,le=null;_.depth&&(le=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,z=_.stencil?vi:Nn,oe=_.stencil?In:gn);const de={colorFormat:t.RGBA8,depthFormat:le,scaleFactor:s};d=new XRWebGLBinding(r,t),f=d.createProjectionLayer(de),r.updateRenderState({layers:[f]}),u=new On(f.textureWidth,f.textureHeight,{format:Wt,type:Mn,depthTexture:new fp(f.textureWidth,f.textureHeight,oe,void 0,void 0,void 0,void 0,void 0,void 0,z),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0});const _e=e.properties.get(u);_e.__ignoreDepthValues=f.ignoreDepthValues}u.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),j.setContext(r),j.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function W(D){for(let z=0;z<D.removed.length;z++){const oe=D.removed[z],le=S.indexOf(oe);le>=0&&(S[le]=null,A[le].disconnect(oe))}for(let z=0;z<D.added.length;z++){const oe=D.added[z];let le=S.indexOf(oe);if(le===-1){for(let _e=0;_e<A.length;_e++)if(_e>=S.length){S.push(oe),le=_e;break}else if(S[_e]===null){S[_e]=oe,le=_e;break}if(le===-1)break}const de=A[le];de&&de.connect(oe)}}const q=new R,L=new R;function G(D,z,oe){q.setFromMatrixPosition(z.matrixWorld),L.setFromMatrixPosition(oe.matrixWorld);const le=q.distanceTo(L),de=z.projectionMatrix.elements,_e=oe.projectionMatrix.elements,we=de[14]/(de[10]-1),ve=de[14]/(de[10]+1),ke=(de[9]+1)/de[5],Et=(de[9]-1)/de[5],Ie=(de[8]-1)/de[0],I=(_e[8]+1)/_e[0],ut=we*Ie,xe=we*I,Le=le/(-Ie+I),be=Le*-Ie;z.matrixWorld.decompose(D.position,D.quaternion,D.scale),D.translateX(be),D.translateZ(Le),D.matrixWorld.compose(D.position,D.quaternion,D.scale),D.matrixWorldInverse.copy(D.matrixWorld).invert();const Ke=we+Le,Ge=ve+Le,Ne=ut-be,je=xe+(le-be),ct=ke*ve/Ge*Ke,dt=Et*ve/Ge*Ke;D.projectionMatrix.makePerspective(Ne,je,ct,dt,Ke,Ge),D.projectionMatrixInverse.copy(D.projectionMatrix).invert()}function X(D,z){z===null?D.matrixWorld.copy(D.matrix):D.matrixWorld.multiplyMatrices(z.matrixWorld,D.matrix),D.matrixWorldInverse.copy(D.matrixWorld).invert()}this.updateCamera=function(D){if(r===null)return;C.near=w.near=E.near=D.near,C.far=w.far=E.far=D.far,(H!==C.near||x!==C.far)&&(r.updateRenderState({depthNear:C.near,depthFar:C.far}),H=C.near,x=C.far);const z=D.parent,oe=C.cameras;X(C,z);for(let le=0;le<oe.length;le++)X(oe[le],z);oe.length===2?G(C,E,w):C.projectionMatrix.copy(E.projectionMatrix),k(D,C,z)};function k(D,z,oe){oe===null?D.matrix.copy(z.matrixWorld):(D.matrix.copy(oe.matrixWorld),D.matrix.invert(),D.matrix.multiply(z.matrixWorld)),D.matrix.decompose(D.position,D.quaternion,D.scale),D.updateMatrixWorld(!0),D.projectionMatrix.copy(z.projectionMatrix),D.projectionMatrixInverse.copy(z.projectionMatrixInverse),D.isPerspectiveCamera&&(D.fov=Ss*2*Math.atan(1/D.projectionMatrix.elements[5]),D.zoom=1)}this.getCamera=function(){return C},this.getFoveation=function(){if(!(f===null&&m===null))return l},this.setFoveation=function(D){l=D,f!==null&&(f.fixedFoveation=D),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=D)};let te=null;function Y(D,z){if(h=z.getViewerPose(c||a),g=z,h!==null){const oe=h.views;m!==null&&(e.setRenderTargetFramebuffer(u,m.framebuffer),e.setRenderTarget(u));let le=!1;oe.length!==C.cameras.length&&(C.cameras.length=0,le=!0);for(let de=0;de<oe.length;de++){const _e=oe[de];let we=null;if(m!==null)we=m.getViewport(_e);else{const ke=d.getViewSubImage(f,_e);we=ke.viewport,de===0&&(e.setRenderTargetTextures(u,ke.colorTexture,f.ignoreDepthValues?void 0:ke.depthStencilTexture),e.setRenderTarget(u))}let ve=P[de];ve===void 0&&(ve=new Bt,ve.layers.enable(de),ve.viewport=new ot,P[de]=ve),ve.matrix.fromArray(_e.transform.matrix),ve.matrix.decompose(ve.position,ve.quaternion,ve.scale),ve.projectionMatrix.fromArray(_e.projectionMatrix),ve.projectionMatrixInverse.copy(ve.projectionMatrix).invert(),ve.viewport.set(we.x,we.y,we.width,we.height),de===0&&(C.matrix.copy(ve.matrix),C.matrix.decompose(C.position,C.quaternion,C.scale)),le===!0&&C.cameras.push(ve)}}for(let oe=0;oe<A.length;oe++){const le=S[oe],de=A[oe];le!==null&&de!==void 0&&de.update(le,z,c||a)}te&&te(D,z),z.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:z}),g=null}const j=new Bo;j.setAnimationLoop(Y),this.setAnimationLoop=function(D){te=D},this.dispose=function(){}}}function mp(i,e){function t(p,u){p.matrixAutoUpdate===!0&&p.updateMatrix(),u.value.copy(p.matrix)}function n(p,u){u.color.getRGB(p.fogColor.value,No(i)),u.isFog?(p.fogNear.value=u.near,p.fogFar.value=u.far):u.isFogExp2&&(p.fogDensity.value=u.density)}function r(p,u,A,S,E){u.isMeshBasicMaterial||u.isMeshLambertMaterial?s(p,u):u.isMeshToonMaterial?(s(p,u),d(p,u)):u.isMeshPhongMaterial?(s(p,u),h(p,u)):u.isMeshStandardMaterial?(s(p,u),f(p,u),u.isMeshPhysicalMaterial&&m(p,u,E)):u.isMeshMatcapMaterial?(s(p,u),g(p,u)):u.isMeshDepthMaterial?s(p,u):u.isMeshDistanceMaterial?(s(p,u),_(p,u)):u.isMeshNormalMaterial?s(p,u):u.isLineBasicMaterial?(a(p,u),u.isLineDashedMaterial&&o(p,u)):u.isPointsMaterial?l(p,u,A,S):u.isSpriteMaterial?c(p,u):u.isShadowMaterial?(p.color.value.copy(u.color),p.opacity.value=u.opacity):u.isShaderMaterial&&(u.uniformsNeedUpdate=!1)}function s(p,u){p.opacity.value=u.opacity,u.color&&p.diffuse.value.copy(u.color),u.emissive&&p.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity),u.map&&(p.map.value=u.map,t(u.map,p.mapTransform)),u.alphaMap&&(p.alphaMap.value=u.alphaMap,t(u.alphaMap,p.alphaMapTransform)),u.bumpMap&&(p.bumpMap.value=u.bumpMap,t(u.bumpMap,p.bumpMapTransform),p.bumpScale.value=u.bumpScale,u.side===Rt&&(p.bumpScale.value*=-1)),u.normalMap&&(p.normalMap.value=u.normalMap,t(u.normalMap,p.normalMapTransform),p.normalScale.value.copy(u.normalScale),u.side===Rt&&p.normalScale.value.negate()),u.displacementMap&&(p.displacementMap.value=u.displacementMap,t(u.displacementMap,p.displacementMapTransform),p.displacementScale.value=u.displacementScale,p.displacementBias.value=u.displacementBias),u.emissiveMap&&(p.emissiveMap.value=u.emissiveMap,t(u.emissiveMap,p.emissiveMapTransform)),u.specularMap&&(p.specularMap.value=u.specularMap,t(u.specularMap,p.specularMapTransform)),u.alphaTest>0&&(p.alphaTest.value=u.alphaTest);const A=e.get(u).envMap;if(A&&(p.envMap.value=A,p.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=u.reflectivity,p.ior.value=u.ior,p.refractionRatio.value=u.refractionRatio),u.lightMap){p.lightMap.value=u.lightMap;const S=i._useLegacyLights===!0?Math.PI:1;p.lightMapIntensity.value=u.lightMapIntensity*S,t(u.lightMap,p.lightMapTransform)}u.aoMap&&(p.aoMap.value=u.aoMap,p.aoMapIntensity.value=u.aoMapIntensity,t(u.aoMap,p.aoMapTransform))}function a(p,u){p.diffuse.value.copy(u.color),p.opacity.value=u.opacity,u.map&&(p.map.value=u.map,t(u.map,p.mapTransform))}function o(p,u){p.dashSize.value=u.dashSize,p.totalSize.value=u.dashSize+u.gapSize,p.scale.value=u.scale}function l(p,u,A,S){p.diffuse.value.copy(u.color),p.opacity.value=u.opacity,p.size.value=u.size*A,p.scale.value=S*.5,u.map&&(p.map.value=u.map,t(u.map,p.uvTransform)),u.alphaMap&&(p.alphaMap.value=u.alphaMap,t(u.alphaMap,p.alphaMapTransform)),u.alphaTest>0&&(p.alphaTest.value=u.alphaTest)}function c(p,u){p.diffuse.value.copy(u.color),p.opacity.value=u.opacity,p.rotation.value=u.rotation,u.map&&(p.map.value=u.map,t(u.map,p.mapTransform)),u.alphaMap&&(p.alphaMap.value=u.alphaMap,t(u.alphaMap,p.alphaMapTransform)),u.alphaTest>0&&(p.alphaTest.value=u.alphaTest)}function h(p,u){p.specular.value.copy(u.specular),p.shininess.value=Math.max(u.shininess,1e-4)}function d(p,u){u.gradientMap&&(p.gradientMap.value=u.gradientMap)}function f(p,u){p.metalness.value=u.metalness,u.metalnessMap&&(p.metalnessMap.value=u.metalnessMap,t(u.metalnessMap,p.metalnessMapTransform)),p.roughness.value=u.roughness,u.roughnessMap&&(p.roughnessMap.value=u.roughnessMap,t(u.roughnessMap,p.roughnessMapTransform)),e.get(u).envMap&&(p.envMapIntensity.value=u.envMapIntensity)}function m(p,u,A){p.ior.value=u.ior,u.sheen>0&&(p.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),p.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(p.sheenColorMap.value=u.sheenColorMap,t(u.sheenColorMap,p.sheenColorMapTransform)),u.sheenRoughnessMap&&(p.sheenRoughnessMap.value=u.sheenRoughnessMap,t(u.sheenRoughnessMap,p.sheenRoughnessMapTransform))),u.clearcoat>0&&(p.clearcoat.value=u.clearcoat,p.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(p.clearcoatMap.value=u.clearcoatMap,t(u.clearcoatMap,p.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,t(u.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(p.clearcoatNormalMap.value=u.clearcoatNormalMap,t(u.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===Rt&&p.clearcoatNormalScale.value.negate())),u.iridescence>0&&(p.iridescence.value=u.iridescence,p.iridescenceIOR.value=u.iridescenceIOR,p.iridescenceThicknessMinimum.value=u.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=u.iridescenceThicknessRange[1],u.iridescenceMap&&(p.iridescenceMap.value=u.iridescenceMap,t(u.iridescenceMap,p.iridescenceMapTransform)),u.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=u.iridescenceThicknessMap,t(u.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),u.transmission>0&&(p.transmission.value=u.transmission,p.transmissionSamplerMap.value=A.texture,p.transmissionSamplerSize.value.set(A.width,A.height),u.transmissionMap&&(p.transmissionMap.value=u.transmissionMap,t(u.transmissionMap,p.transmissionMapTransform)),p.thickness.value=u.thickness,u.thicknessMap&&(p.thicknessMap.value=u.thicknessMap,t(u.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=u.attenuationDistance,p.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(p.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(p.anisotropyMap.value=u.anisotropyMap,t(u.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=u.specularIntensity,p.specularColor.value.copy(u.specularColor),u.specularColorMap&&(p.specularColorMap.value=u.specularColorMap,t(u.specularColorMap,p.specularColorMapTransform)),u.specularIntensityMap&&(p.specularIntensityMap.value=u.specularIntensityMap,t(u.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,u){u.matcap&&(p.matcap.value=u.matcap)}function _(p,u){const A=e.get(u).light;p.referencePosition.value.setFromMatrixPosition(A.matrixWorld),p.nearDistance.value=A.shadow.camera.near,p.farDistance.value=A.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function gp(i,e,t,n){let r={},s={},a=[];const o=t.isWebGL2?i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(A,S){const E=S.program;n.uniformBlockBinding(A,E)}function c(A,S){let E=r[A.id];E===void 0&&(g(A),E=h(A),r[A.id]=E,A.addEventListener("dispose",p));const w=S.program;n.updateUBOMapping(A,w);const P=e.render.frame;s[A.id]!==P&&(f(A),s[A.id]=P)}function h(A){const S=d();A.__bindingPointIndex=S;const E=i.createBuffer(),w=A.__size,P=A.usage;return i.bindBuffer(i.UNIFORM_BUFFER,E),i.bufferData(i.UNIFORM_BUFFER,w,P),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,S,E),E}function d(){for(let A=0;A<o;A++)if(a.indexOf(A)===-1)return a.push(A),A;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(A){const S=r[A.id],E=A.uniforms,w=A.__cache;i.bindBuffer(i.UNIFORM_BUFFER,S);for(let P=0,C=E.length;P<C;P++){const H=E[P];if(m(H,P,w)===!0){const x=H.__offset,T=Array.isArray(H.value)?H.value:[H.value];let V=0;for(let W=0;W<T.length;W++){const q=T[W],L=_(q);typeof q=="number"?(H.__data[0]=q,i.bufferSubData(i.UNIFORM_BUFFER,x+V,H.__data)):q.isMatrix3?(H.__data[0]=q.elements[0],H.__data[1]=q.elements[1],H.__data[2]=q.elements[2],H.__data[3]=q.elements[0],H.__data[4]=q.elements[3],H.__data[5]=q.elements[4],H.__data[6]=q.elements[5],H.__data[7]=q.elements[0],H.__data[8]=q.elements[6],H.__data[9]=q.elements[7],H.__data[10]=q.elements[8],H.__data[11]=q.elements[0]):(q.toArray(H.__data,V),V+=L.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,x,H.__data)}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function m(A,S,E){const w=A.value;if(E[S]===void 0){if(typeof w=="number")E[S]=w;else{const P=Array.isArray(w)?w:[w],C=[];for(let H=0;H<P.length;H++)C.push(P[H].clone());E[S]=C}return!0}else if(typeof w=="number"){if(E[S]!==w)return E[S]=w,!0}else{const P=Array.isArray(E[S])?E[S]:[E[S]],C=Array.isArray(w)?w:[w];for(let H=0;H<P.length;H++){const x=P[H];if(x.equals(C[H])===!1)return x.copy(C[H]),!0}}return!1}function g(A){const S=A.uniforms;let E=0;const w=16;let P=0;for(let C=0,H=S.length;C<H;C++){const x=S[C],T={boundary:0,storage:0},V=Array.isArray(x.value)?x.value:[x.value];for(let W=0,q=V.length;W<q;W++){const L=V[W],G=_(L);T.boundary+=G.boundary,T.storage+=G.storage}if(x.__data=new Float32Array(T.storage/Float32Array.BYTES_PER_ELEMENT),x.__offset=E,C>0){P=E%w;const W=w-P;P!==0&&W-T.boundary<0&&(E+=w-P,x.__offset=E)}E+=T.storage}return P=E%w,P>0&&(E+=w-P),A.__size=E,A.__cache={},this}function _(A){const S={boundary:0,storage:0};return typeof A=="number"?(S.boundary=4,S.storage=4):A.isVector2?(S.boundary=8,S.storage=8):A.isVector3||A.isColor?(S.boundary=16,S.storage=12):A.isVector4?(S.boundary=16,S.storage=16):A.isMatrix3?(S.boundary=48,S.storage=48):A.isMatrix4?(S.boundary=64,S.storage=64):A.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",A),S}function p(A){const S=A.target;S.removeEventListener("dispose",p);const E=a.indexOf(S.__bindingPointIndex);a.splice(E,1),i.deleteBuffer(r[S.id]),delete r[S.id],delete s[S.id]}function u(){for(const A in r)i.deleteBuffer(r[A]);a=[],r={},s={}}return{bind:l,update:c,dispose:u}}class Wo{constructor(e={}){const{canvas:t=pc(),context:n=null,depth:r=!0,stencil:s=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1}=e;this.isWebGLRenderer=!0;let f;n!==null?f=n.getContextAttributes().alpha:f=a;const m=new Uint32Array(4),g=new Int32Array(4);let _=null,p=null;const u=[],A=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ht,this._useLegacyLights=!1,this.toneMapping=xn,this.toneMappingExposure=1;const S=this;let E=!1,w=0,P=0,C=null,H=-1,x=null;const T=new ot,V=new ot;let W=null;const q=new Be(0);let L=0,G=t.width,X=t.height,k=1,te=null,Y=null;const j=new ot(0,0,G,X),D=new ot(0,0,G,X);let z=!1;const oe=new Rs;let le=!1,de=!1,_e=null;const we=new Ze,ve=new Pe,ke=new R,Et={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Ie(){return C===null?k:1}let I=n;function ut(M,U){for(let O=0;O<M.length;O++){const N=M[O],B=t.getContext(N,U);if(B!==null)return B}return null}try{const M={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${bs}`),t.addEventListener("webglcontextlost",ne,!1),t.addEventListener("webglcontextrestored",ee,!1),t.addEventListener("webglcontextcreationerror",he,!1),I===null){const U=["webgl2","webgl","experimental-webgl"];if(S.isWebGL1Renderer===!0&&U.shift(),I=ut(U,M),I===null)throw ut(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&I instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),I.getShaderPrecisionFormat===void 0&&(I.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(M){throw console.error("THREE.WebGLRenderer: "+M.message),M}let xe,Le,be,Ke,Ge,Ne,je,ct,dt,y,v,F,J,K,Q,fe,ie,ce,Se,Ve,Z,We,Re,ye;function ge(){xe=new Ad(I),Le=new Md(I,xe,e),xe.init(Le),We=new hp(I,xe,Le),be=new lp(I,xe,Le),Ke=new Cd(I),Ge=new Yf,Ne=new cp(I,xe,be,Ge,Le,We,Ke),je=new yd(S),ct=new bd(S),dt=new zc(I,Le),Re=new vd(I,xe,dt,Le),y=new wd(I,dt,Ke,Re),v=new Ud(I,y,dt,Ke),Se=new Dd(I,Le,Ne),fe=new Sd(Ge),F=new qf(S,je,ct,xe,Le,Re,fe),J=new mp(S,Ge),K=new Kf,Q=new np(xe,Le),ce=new _d(S,je,ct,be,v,f,l),ie=new op(S,v,Le),ye=new gp(I,Ke,Le,be),Ve=new xd(I,xe,Ke,Le),Z=new Rd(I,xe,Ke,Le),Ke.programs=F.programs,S.capabilities=Le,S.extensions=xe,S.properties=Ge,S.renderLists=K,S.shadowMap=ie,S.state=be,S.info=Ke}ge();const b=new pp(S,I);this.xr=b,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const M=xe.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){const M=xe.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return k},this.setPixelRatio=function(M){M!==void 0&&(k=M,this.setSize(G,X,!1))},this.getSize=function(M){return M.set(G,X)},this.setSize=function(M,U,O=!0){if(b.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}G=M,X=U,t.width=Math.floor(M*k),t.height=Math.floor(U*k),O===!0&&(t.style.width=M+"px",t.style.height=U+"px"),this.setViewport(0,0,M,U)},this.getDrawingBufferSize=function(M){return M.set(G*k,X*k).floor()},this.setDrawingBufferSize=function(M,U,O){G=M,X=U,k=O,t.width=Math.floor(M*O),t.height=Math.floor(U*O),this.setViewport(0,0,M,U)},this.getCurrentViewport=function(M){return M.copy(T)},this.getViewport=function(M){return M.copy(j)},this.setViewport=function(M,U,O,N){M.isVector4?j.set(M.x,M.y,M.z,M.w):j.set(M,U,O,N),be.viewport(T.copy(j).multiplyScalar(k).floor())},this.getScissor=function(M){return M.copy(D)},this.setScissor=function(M,U,O,N){M.isVector4?D.set(M.x,M.y,M.z,M.w):D.set(M,U,O,N),be.scissor(V.copy(D).multiplyScalar(k).floor())},this.getScissorTest=function(){return z},this.setScissorTest=function(M){be.setScissorTest(z=M)},this.setOpaqueSort=function(M){te=M},this.setTransparentSort=function(M){Y=M},this.getClearColor=function(M){return M.copy(ce.getClearColor())},this.setClearColor=function(){ce.setClearColor.apply(ce,arguments)},this.getClearAlpha=function(){return ce.getClearAlpha()},this.setClearAlpha=function(){ce.setClearAlpha.apply(ce,arguments)},this.clear=function(M=!0,U=!0,O=!0){let N=0;if(M){let B=!1;if(C!==null){const ue=C.texture.format;B=ue===To||ue===Eo||ue===yo}if(B){const ue=C.texture.type,me=ue===Mn||ue===gn||ue===As||ue===In||ue===Mo||ue===So,Ee=ce.getClearColor(),Te=ce.getClearAlpha(),Oe=Ee.r,Me=Ee.g,De=Ee.b;me?(m[0]=Oe,m[1]=Me,m[2]=De,m[3]=Te,I.clearBufferuiv(I.COLOR,0,m)):(g[0]=Oe,g[1]=Me,g[2]=De,g[3]=Te,I.clearBufferiv(I.COLOR,0,g))}else N|=I.COLOR_BUFFER_BIT}U&&(N|=I.DEPTH_BUFFER_BIT),O&&(N|=I.STENCIL_BUFFER_BIT),I.clear(N)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ne,!1),t.removeEventListener("webglcontextrestored",ee,!1),t.removeEventListener("webglcontextcreationerror",he,!1),K.dispose(),Q.dispose(),Ge.dispose(),je.dispose(),ct.dispose(),v.dispose(),Re.dispose(),ye.dispose(),F.dispose(),b.dispose(),b.removeEventListener("sessionstart",Ye),b.removeEventListener("sessionend",jt),_e&&(_e.dispose(),_e=null),_t.stop()};function ne(M){M.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),E=!0}function ee(){console.log("THREE.WebGLRenderer: Context Restored."),E=!1;const M=Ke.autoReset,U=ie.enabled,O=ie.autoUpdate,N=ie.needsUpdate,B=ie.type;ge(),Ke.autoReset=M,ie.enabled=U,ie.autoUpdate=O,ie.needsUpdate=N,ie.type=B}function he(M){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function ae(M){const U=M.target;U.removeEventListener("dispose",ae),$(U)}function $(M){pe(M),Ge.remove(M)}function pe(M){const U=Ge.get(M).programs;U!==void 0&&(U.forEach(function(O){F.releaseProgram(O)}),M.isShaderMaterial&&F.releaseShaderCache(M))}this.renderBufferDirect=function(M,U,O,N,B,ue){U===null&&(U=Et);const me=B.isMesh&&B.matrixWorld.determinant()<0,Ee=hl(M,U,O,N,B);be.setMaterial(N,me);let Te=O.index,Oe=1;if(N.wireframe===!0){if(Te=y.getWireframeAttribute(O),Te===void 0)return;Oe=2}const Me=O.drawRange,De=O.attributes.position;let Je=Me.start*Oe,Qe=(Me.start+Me.count)*Oe;ue!==null&&(Je=Math.max(Je,ue.start*Oe),Qe=Math.min(Qe,(ue.start+ue.count)*Oe)),Te!==null?(Je=Math.max(Je,0),Qe=Math.min(Qe,Te.count)):De!=null&&(Je=Math.max(Je,0),Qe=Math.min(Qe,De.count));const It=Qe-Je;if(It<0||It===1/0)return;Re.setup(B,N,Ee,O,Te);let Zt,et=Ve;if(Te!==null&&(Zt=dt.get(Te),et=Z,et.setIndex(Zt)),B.isMesh)N.wireframe===!0?(be.setLineWidth(N.wireframeLinewidth*Ie()),et.setMode(I.LINES)):et.setMode(I.TRIANGLES);else if(B.isLine){let ze=N.linewidth;ze===void 0&&(ze=1),be.setLineWidth(ze*Ie()),B.isLineSegments?et.setMode(I.LINES):B.isLineLoop?et.setMode(I.LINE_LOOP):et.setMode(I.LINE_STRIP)}else B.isPoints?et.setMode(I.POINTS):B.isSprite&&et.setMode(I.TRIANGLES);if(B.isInstancedMesh)et.renderInstances(Je,It,B.count);else if(O.isInstancedBufferGeometry){const ze=O._maxInstanceCount!==void 0?O._maxInstanceCount:1/0,Lr=Math.min(O.instanceCount,ze);et.renderInstances(Je,It,Lr)}else et.render(Je,It)},this.compile=function(M,U){function O(N,B,ue){N.transparent===!0&&N.side===zt&&N.forceSinglePass===!1?(N.side=Rt,N.needsUpdate=!0,zi(N,B,ue),N.side=En,N.needsUpdate=!0,zi(N,B,ue),N.side=zt):zi(N,B,ue)}p=Q.get(M),p.init(),A.push(p),M.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(p.pushLight(N),N.castShadow&&p.pushShadow(N))}),p.setupLights(S._useLegacyLights),M.traverse(function(N){const B=N.material;if(B)if(Array.isArray(B))for(let ue=0;ue<B.length;ue++){const me=B[ue];O(me,M,N)}else O(B,M,N)}),A.pop(),p=null};let Ce=null;function gt(M){Ce&&Ce(M)}function Ye(){_t.stop()}function jt(){_t.start()}const _t=new Bo;_t.setAnimationLoop(gt),typeof self<"u"&&_t.setContext(self),this.setAnimationLoop=function(M){Ce=M,b.setAnimationLoop(M),M===null?_t.stop():_t.start()},b.addEventListener("sessionstart",Ye),b.addEventListener("sessionend",jt),this.render=function(M,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(E===!0)return;M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),b.enabled===!0&&b.isPresenting===!0&&(b.cameraAutoUpdate===!0&&b.updateCamera(U),U=b.getCamera()),M.isScene===!0&&M.onBeforeRender(S,M,U,C),p=Q.get(M,A.length),p.init(),A.push(p),we.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),oe.setFromProjectionMatrix(we),de=this.localClippingEnabled,le=fe.init(this.clippingPlanes,de),_=K.get(M,u.length),_.init(),u.push(_),Fs(M,U,0,S.sortObjects),_.finish(),S.sortObjects===!0&&_.sort(te,Y),this.info.render.frame++,le===!0&&fe.beginShadows();const O=p.state.shadowsArray;if(ie.render(O,M,U),le===!0&&fe.endShadows(),this.info.autoReset===!0&&this.info.reset(),ce.render(_,M),p.setupLights(S._useLegacyLights),U.isArrayCamera){const N=U.cameras;for(let B=0,ue=N.length;B<ue;B++){const me=N[B];Os(_,M,me,me.viewport)}}else Os(_,M,U);C!==null&&(Ne.updateMultisampleRenderTarget(C),Ne.updateRenderTargetMipmap(C)),M.isScene===!0&&M.onAfterRender(S,M,U),Re.resetDefaultState(),H=-1,x=null,A.pop(),A.length>0?p=A[A.length-1]:p=null,u.pop(),u.length>0?_=u[u.length-1]:_=null};function Fs(M,U,O,N){if(M.visible===!1)return;if(M.layers.test(U.layers)){if(M.isGroup)O=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(U);else if(M.isLight)p.pushLight(M),M.castShadow&&p.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||oe.intersectsSprite(M)){N&&ke.setFromMatrixPosition(M.matrixWorld).applyMatrix4(we);const me=v.update(M),Ee=M.material;Ee.visible&&_.push(M,me,Ee,O,ke.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||oe.intersectsObject(M))){const me=v.update(M),Ee=M.material;if(N&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),ke.copy(M.boundingSphere.center)):(me.boundingSphere===null&&me.computeBoundingSphere(),ke.copy(me.boundingSphere.center)),ke.applyMatrix4(M.matrixWorld).applyMatrix4(we)),Array.isArray(Ee)){const Te=me.groups;for(let Oe=0,Me=Te.length;Oe<Me;Oe++){const De=Te[Oe],Je=Ee[De.materialIndex];Je&&Je.visible&&_.push(M,me,Je,O,ke.z,De)}}else Ee.visible&&_.push(M,me,Ee,O,ke.z,null)}}const ue=M.children;for(let me=0,Ee=ue.length;me<Ee;me++)Fs(ue[me],U,O,N)}function Os(M,U,O,N){const B=M.opaque,ue=M.transmissive,me=M.transparent;p.setupLightsView(O),le===!0&&fe.setGlobalState(S.clippingPlanes,O),ue.length>0&&cl(B,ue,U,O),N&&be.viewport(T.copy(N)),B.length>0&&Bi(B,U,O),ue.length>0&&Bi(ue,U,O),me.length>0&&Bi(me,U,O),be.buffers.depth.setTest(!0),be.buffers.depth.setMask(!0),be.buffers.color.setMask(!0),be.setPolygonOffset(!1)}function cl(M,U,O,N){const B=Le.isWebGL2;_e===null&&(_e=new On(1,1,{generateMipmaps:!0,type:xe.has("EXT_color_buffer_half_float")?Ii:Mn,minFilter:Ui,samples:B?4:0})),S.getDrawingBufferSize(ve),B?_e.setSize(ve.x,ve.y):_e.setSize(ys(ve.x),ys(ve.y));const ue=S.getRenderTarget();S.setRenderTarget(_e),S.getClearColor(q),L=S.getClearAlpha(),L<1&&S.setClearColor(16777215,.5),S.clear();const me=S.toneMapping;S.toneMapping=xn,Bi(M,O,N),Ne.updateMultisampleRenderTarget(_e),Ne.updateRenderTargetMipmap(_e);let Ee=!1;for(let Te=0,Oe=U.length;Te<Oe;Te++){const Me=U[Te],De=Me.object,Je=Me.geometry,Qe=Me.material,It=Me.group;if(Qe.side===zt&&De.layers.test(N.layers)){const Zt=Qe.side;Qe.side=Rt,Qe.needsUpdate=!0,Bs(De,O,N,Je,Qe,It),Qe.side=Zt,Qe.needsUpdate=!0,Ee=!0}}Ee===!0&&(Ne.updateMultisampleRenderTarget(_e),Ne.updateRenderTargetMipmap(_e)),S.setRenderTarget(ue),S.setClearColor(q,L),S.toneMapping=me}function Bi(M,U,O){const N=U.isScene===!0?U.overrideMaterial:null;for(let B=0,ue=M.length;B<ue;B++){const me=M[B],Ee=me.object,Te=me.geometry,Oe=N===null?me.material:N,Me=me.group;Ee.layers.test(O.layers)&&Bs(Ee,U,O,Te,Oe,Me)}}function Bs(M,U,O,N,B,ue){M.onBeforeRender(S,U,O,N,B,ue),M.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),B.onBeforeRender(S,U,O,N,M,ue),B.transparent===!0&&B.side===zt&&B.forceSinglePass===!1?(B.side=Rt,B.needsUpdate=!0,S.renderBufferDirect(O,U,N,B,M,ue),B.side=En,B.needsUpdate=!0,S.renderBufferDirect(O,U,N,B,M,ue),B.side=zt):S.renderBufferDirect(O,U,N,B,M,ue),M.onAfterRender(S,U,O,N,B,ue)}function zi(M,U,O){U.isScene!==!0&&(U=Et);const N=Ge.get(M),B=p.state.lights,ue=p.state.shadowsArray,me=B.state.version,Ee=F.getParameters(M,B.state,ue,U,O),Te=F.getProgramCacheKey(Ee);let Oe=N.programs;N.environment=M.isMeshStandardMaterial?U.environment:null,N.fog=U.fog,N.envMap=(M.isMeshStandardMaterial?ct:je).get(M.envMap||N.environment),Oe===void 0&&(M.addEventListener("dispose",ae),Oe=new Map,N.programs=Oe);let Me=Oe.get(Te);if(Me!==void 0){if(N.currentProgram===Me&&N.lightsStateVersion===me)return zs(M,Ee),Me}else Ee.uniforms=F.getUniforms(M),M.onBuild(O,Ee,S),M.onBeforeCompile(Ee,S),Me=F.acquireProgram(Ee,Te),Oe.set(Te,Me),N.uniforms=Ee.uniforms;const De=N.uniforms;(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(De.clippingPlanes=fe.uniform),zs(M,Ee),N.needsLights=dl(M),N.lightsStateVersion=me,N.needsLights&&(De.ambientLightColor.value=B.state.ambient,De.lightProbe.value=B.state.probe,De.directionalLights.value=B.state.directional,De.directionalLightShadows.value=B.state.directionalShadow,De.spotLights.value=B.state.spot,De.spotLightShadows.value=B.state.spotShadow,De.rectAreaLights.value=B.state.rectArea,De.ltc_1.value=B.state.rectAreaLTC1,De.ltc_2.value=B.state.rectAreaLTC2,De.pointLights.value=B.state.point,De.pointLightShadows.value=B.state.pointShadow,De.hemisphereLights.value=B.state.hemi,De.directionalShadowMap.value=B.state.directionalShadowMap,De.directionalShadowMatrix.value=B.state.directionalShadowMatrix,De.spotShadowMap.value=B.state.spotShadowMap,De.spotLightMatrix.value=B.state.spotLightMatrix,De.spotLightMap.value=B.state.spotLightMap,De.pointShadowMap.value=B.state.pointShadowMap,De.pointShadowMatrix.value=B.state.pointShadowMatrix);const Je=Me.getUniforms(),Qe=dr.seqWithValue(Je.seq,De);return N.currentProgram=Me,N.uniformsList=Qe,Me}function zs(M,U){const O=Ge.get(M);O.outputColorSpace=U.outputColorSpace,O.instancing=U.instancing,O.instancingColor=U.instancingColor,O.skinning=U.skinning,O.morphTargets=U.morphTargets,O.morphNormals=U.morphNormals,O.morphColors=U.morphColors,O.morphTargetsCount=U.morphTargetsCount,O.numClippingPlanes=U.numClippingPlanes,O.numIntersection=U.numClipIntersection,O.vertexAlphas=U.vertexAlphas,O.vertexTangents=U.vertexTangents,O.toneMapping=U.toneMapping}function hl(M,U,O,N,B){U.isScene!==!0&&(U=Et),Ne.resetTextureUnits();const ue=U.fog,me=N.isMeshStandardMaterial?U.environment:null,Ee=C===null?S.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:ln,Te=(N.isMeshStandardMaterial?ct:je).get(N.envMap||me),Oe=N.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,Me=!!O.attributes.tangent&&(!!N.normalMap||N.anisotropy>0),De=!!O.morphAttributes.position,Je=!!O.morphAttributes.normal,Qe=!!O.morphAttributes.color;let It=xn;N.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(It=S.toneMapping);const Zt=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,et=Zt!==void 0?Zt.length:0,ze=Ge.get(N),Lr=p.state.lights;if(le===!0&&(de===!0||M!==x)){const Lt=M===x&&N.id===H;fe.setState(N,M,Lt)}let tt=!1;N.version===ze.__version?(ze.needsLights&&ze.lightsStateVersion!==Lr.state.version||ze.outputColorSpace!==Ee||B.isInstancedMesh&&ze.instancing===!1||!B.isInstancedMesh&&ze.instancing===!0||B.isSkinnedMesh&&ze.skinning===!1||!B.isSkinnedMesh&&ze.skinning===!0||B.isInstancedMesh&&ze.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&ze.instancingColor===!1&&B.instanceColor!==null||ze.envMap!==Te||N.fog===!0&&ze.fog!==ue||ze.numClippingPlanes!==void 0&&(ze.numClippingPlanes!==fe.numPlanes||ze.numIntersection!==fe.numIntersection)||ze.vertexAlphas!==Oe||ze.vertexTangents!==Me||ze.morphTargets!==De||ze.morphNormals!==Je||ze.morphColors!==Qe||ze.toneMapping!==It||Le.isWebGL2===!0&&ze.morphTargetsCount!==et)&&(tt=!0):(tt=!0,ze.__version=N.version);let Tn=ze.currentProgram;tt===!0&&(Tn=zi(N,U,B));let Gs=!1,yi=!1,Dr=!1;const vt=Tn.getUniforms(),bn=ze.uniforms;if(be.useProgram(Tn.program)&&(Gs=!0,yi=!0,Dr=!0),N.id!==H&&(H=N.id,yi=!0),Gs||x!==M){vt.setValue(I,"projectionMatrix",M.projectionMatrix),vt.setValue(I,"viewMatrix",M.matrixWorldInverse);const Lt=vt.map.cameraPosition;Lt!==void 0&&Lt.setValue(I,ke.setFromMatrixPosition(M.matrixWorld)),Le.logarithmicDepthBuffer&&vt.setValue(I,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(N.isMeshPhongMaterial||N.isMeshToonMaterial||N.isMeshLambertMaterial||N.isMeshBasicMaterial||N.isMeshStandardMaterial||N.isShaderMaterial)&&vt.setValue(I,"isOrthographic",M.isOrthographicCamera===!0),x!==M&&(x=M,yi=!0,Dr=!0)}if(B.isSkinnedMesh){vt.setOptional(I,B,"bindMatrix"),vt.setOptional(I,B,"bindMatrixInverse");const Lt=B.skeleton;Lt&&(Le.floatVertexTextures?(Lt.boneTexture===null&&Lt.computeBoneTexture(),vt.setValue(I,"boneTexture",Lt.boneTexture,Ne),vt.setValue(I,"boneTextureSize",Lt.boneTextureSize)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}const Ur=O.morphAttributes;if((Ur.position!==void 0||Ur.normal!==void 0||Ur.color!==void 0&&Le.isWebGL2===!0)&&Se.update(B,O,Tn),(yi||ze.receiveShadow!==B.receiveShadow)&&(ze.receiveShadow=B.receiveShadow,vt.setValue(I,"receiveShadow",B.receiveShadow)),N.isMeshGouraudMaterial&&N.envMap!==null&&(bn.envMap.value=Te,bn.flipEnvMap.value=Te.isCubeTexture&&Te.isRenderTargetTexture===!1?-1:1),yi&&(vt.setValue(I,"toneMappingExposure",S.toneMappingExposure),ze.needsLights&&ul(bn,Dr),ue&&N.fog===!0&&J.refreshFogUniforms(bn,ue),J.refreshMaterialUniforms(bn,N,k,X,_e),dr.upload(I,ze.uniformsList,bn,Ne)),N.isShaderMaterial&&N.uniformsNeedUpdate===!0&&(dr.upload(I,ze.uniformsList,bn,Ne),N.uniformsNeedUpdate=!1),N.isSpriteMaterial&&vt.setValue(I,"center",B.center),vt.setValue(I,"modelViewMatrix",B.modelViewMatrix),vt.setValue(I,"normalMatrix",B.normalMatrix),vt.setValue(I,"modelMatrix",B.matrixWorld),N.isShaderMaterial||N.isRawShaderMaterial){const Lt=N.uniformsGroups;for(let Ir=0,fl=Lt.length;Ir<fl;Ir++)if(Le.isWebGL2){const Hs=Lt[Ir];ye.update(Hs,Tn),ye.bind(Hs,Tn)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Tn}function ul(M,U){M.ambientLightColor.needsUpdate=U,M.lightProbe.needsUpdate=U,M.directionalLights.needsUpdate=U,M.directionalLightShadows.needsUpdate=U,M.pointLights.needsUpdate=U,M.pointLightShadows.needsUpdate=U,M.spotLights.needsUpdate=U,M.spotLightShadows.needsUpdate=U,M.rectAreaLights.needsUpdate=U,M.hemisphereLights.needsUpdate=U}function dl(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(M,U,O){Ge.get(M.texture).__webglTexture=U,Ge.get(M.depthTexture).__webglTexture=O;const N=Ge.get(M);N.__hasExternalTextures=!0,N.__hasExternalTextures&&(N.__autoAllocateDepthBuffer=O===void 0,N.__autoAllocateDepthBuffer||xe.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),N.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(M,U){const O=Ge.get(M);O.__webglFramebuffer=U,O.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(M,U=0,O=0){C=M,w=U,P=O;let N=!0,B=null,ue=!1,me=!1;if(M){const Te=Ge.get(M);Te.__useDefaultFramebuffer!==void 0?(be.bindFramebuffer(I.FRAMEBUFFER,null),N=!1):Te.__webglFramebuffer===void 0?Ne.setupRenderTarget(M):Te.__hasExternalTextures&&Ne.rebindTextures(M,Ge.get(M.texture).__webglTexture,Ge.get(M.depthTexture).__webglTexture);const Oe=M.texture;(Oe.isData3DTexture||Oe.isDataArrayTexture||Oe.isCompressedArrayTexture)&&(me=!0);const Me=Ge.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(Me[U])?B=Me[U][O]:B=Me[U],ue=!0):Le.isWebGL2&&M.samples>0&&Ne.useMultisampledRTT(M)===!1?B=Ge.get(M).__webglMultisampledFramebuffer:Array.isArray(Me)?B=Me[O]:B=Me,T.copy(M.viewport),V.copy(M.scissor),W=M.scissorTest}else T.copy(j).multiplyScalar(k).floor(),V.copy(D).multiplyScalar(k).floor(),W=z;if(be.bindFramebuffer(I.FRAMEBUFFER,B)&&Le.drawBuffers&&N&&be.drawBuffers(M,B),be.viewport(T),be.scissor(V),be.setScissorTest(W),ue){const Te=Ge.get(M.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+U,Te.__webglTexture,O)}else if(me){const Te=Ge.get(M.texture),Oe=U||0;I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,Te.__webglTexture,O||0,Oe)}H=-1},this.readRenderTargetPixels=function(M,U,O,N,B,ue,me){if(!(M&&M.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ee=Ge.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&me!==void 0&&(Ee=Ee[me]),Ee){be.bindFramebuffer(I.FRAMEBUFFER,Ee);try{const Te=M.texture,Oe=Te.format,Me=Te.type;if(Oe!==Wt&&We.convert(Oe)!==I.getParameter(I.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const De=Me===Ii&&(xe.has("EXT_color_buffer_half_float")||Le.isWebGL2&&xe.has("EXT_color_buffer_float"));if(Me!==Mn&&We.convert(Me)!==I.getParameter(I.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Me===_n&&(Le.isWebGL2||xe.has("OES_texture_float")||xe.has("WEBGL_color_buffer_float")))&&!De){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=M.width-N&&O>=0&&O<=M.height-B&&I.readPixels(U,O,N,B,We.convert(Oe),We.convert(Me),ue)}finally{const Te=C!==null?Ge.get(C).__webglFramebuffer:null;be.bindFramebuffer(I.FRAMEBUFFER,Te)}}},this.copyFramebufferToTexture=function(M,U,O=0){const N=Math.pow(2,-O),B=Math.floor(U.image.width*N),ue=Math.floor(U.image.height*N);Ne.setTexture2D(U,0),I.copyTexSubImage2D(I.TEXTURE_2D,O,0,0,M.x,M.y,B,ue),be.unbindTexture()},this.copyTextureToTexture=function(M,U,O,N=0){const B=U.image.width,ue=U.image.height,me=We.convert(O.format),Ee=We.convert(O.type);Ne.setTexture2D(O,0),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,O.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,O.unpackAlignment),U.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,N,M.x,M.y,B,ue,me,Ee,U.image.data):U.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,N,M.x,M.y,U.mipmaps[0].width,U.mipmaps[0].height,me,U.mipmaps[0].data):I.texSubImage2D(I.TEXTURE_2D,N,M.x,M.y,me,Ee,U.image),N===0&&O.generateMipmaps&&I.generateMipmap(I.TEXTURE_2D),be.unbindTexture()},this.copyTextureToTexture3D=function(M,U,O,N,B=0){if(S.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const ue=M.max.x-M.min.x+1,me=M.max.y-M.min.y+1,Ee=M.max.z-M.min.z+1,Te=We.convert(N.format),Oe=We.convert(N.type);let Me;if(N.isData3DTexture)Ne.setTexture3D(N,0),Me=I.TEXTURE_3D;else if(N.isDataArrayTexture)Ne.setTexture2DArray(N,0),Me=I.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,N.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,N.unpackAlignment);const De=I.getParameter(I.UNPACK_ROW_LENGTH),Je=I.getParameter(I.UNPACK_IMAGE_HEIGHT),Qe=I.getParameter(I.UNPACK_SKIP_PIXELS),It=I.getParameter(I.UNPACK_SKIP_ROWS),Zt=I.getParameter(I.UNPACK_SKIP_IMAGES),et=O.isCompressedTexture?O.mipmaps[0]:O.image;I.pixelStorei(I.UNPACK_ROW_LENGTH,et.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,et.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,M.min.x),I.pixelStorei(I.UNPACK_SKIP_ROWS,M.min.y),I.pixelStorei(I.UNPACK_SKIP_IMAGES,M.min.z),O.isDataTexture||O.isData3DTexture?I.texSubImage3D(Me,B,U.x,U.y,U.z,ue,me,Ee,Te,Oe,et.data):O.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),I.compressedTexSubImage3D(Me,B,U.x,U.y,U.z,ue,me,Ee,Te,et.data)):I.texSubImage3D(Me,B,U.x,U.y,U.z,ue,me,Ee,Te,Oe,et),I.pixelStorei(I.UNPACK_ROW_LENGTH,De),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Je),I.pixelStorei(I.UNPACK_SKIP_PIXELS,Qe),I.pixelStorei(I.UNPACK_SKIP_ROWS,It),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Zt),B===0&&N.generateMipmaps&&I.generateMipmap(Me),be.unbindTexture()},this.initTexture=function(M){M.isCubeTexture?Ne.setTextureCube(M,0):M.isData3DTexture?Ne.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?Ne.setTexture2DArray(M,0):Ne.setTexture2D(M,0),be.unbindTexture()},this.resetState=function(){w=0,P=0,C=null,be.reset(),Re.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return on}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===ws?"display-p3":"srgb",t.unpackColorSpace=Xe.workingColorSpace===wr?"display-p3":"srgb"}get physicallyCorrectLights(){return console.warn("THREE.WebGLRenderer: The property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."),!this.useLegacyLights}set physicallyCorrectLights(e){console.warn("THREE.WebGLRenderer: The property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."),this.useLegacyLights=!e}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===ht?Fn:bo}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===Fn?ht:ln}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class _p extends Wo{}_p.prototype.isWebGL1Renderer=!0;class Ps{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new Be(e),this.near=t,this.far=n}clone(){return new Ps(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class vp extends lt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class xp{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=xs,this.updateRange={offset:0,count:-1},this.version=0,this.uuid=Sn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Sn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Sn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const xt=new R;class Mr{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)xt.fromBufferAttribute(this,t),xt.applyMatrix4(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)xt.fromBufferAttribute(this,t),xt.applyNormalMatrix(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)xt.fromBufferAttribute(this,t),xt.transformDirection(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}setX(e,t){return this.normalized&&(t=qe(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=qe(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=qe(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=qe(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=an(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=an(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=an(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=an(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=qe(t,this.array),n=qe(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=qe(t,this.array),n=qe(n,this.array),r=qe(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=qe(t,this.array),n=qe(n,this.array),r=qe(r,this.array),s=qe(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return new Pt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Mr(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Xo extends cn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Be(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let si;const wi=new R,ai=new R,oi=new R,li=new Pe,Ri=new Pe,jo=new Ze,or=new R,Ci=new R,lr=new R,so=new Pe,us=new Pe,ao=new Pe;class Mp extends lt{constructor(e=new Xo){if(super(),this.isSprite=!0,this.type="Sprite",si===void 0){si=new mt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new xp(t,5);si.setIndex([0,1,2,0,2,3]),si.setAttribute("position",new Mr(n,3,0,!1)),si.setAttribute("uv",new Mr(n,2,3,!1))}this.geometry=si,this.material=e,this.center=new Pe(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),ai.setFromMatrixScale(this.matrixWorld),jo.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),oi.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&ai.multiplyScalar(-oi.z);const n=this.material.rotation;let r,s;n!==0&&(s=Math.cos(n),r=Math.sin(n));const a=this.center;cr(or.set(-.5,-.5,0),oi,a,ai,r,s),cr(Ci.set(.5,-.5,0),oi,a,ai,r,s),cr(lr.set(.5,.5,0),oi,a,ai,r,s),so.set(0,0),us.set(1,0),ao.set(1,1);let o=e.ray.intersectTriangle(or,Ci,lr,!1,wi);if(o===null&&(cr(Ci.set(-.5,.5,0),oi,a,ai,r,s),us.set(0,1),o=e.ray.intersectTriangle(or,lr,Ci,!1,wi),o===null))return;const l=e.ray.origin.distanceTo(wi);l<e.near||l>e.far||t.push({distance:l,point:wi.clone(),uv:Ot.getInterpolation(wi,or,Ci,lr,so,us,ao,new Pe),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function cr(i,e,t,n,r,s){li.subVectors(i,t).addScalar(.5).multiply(n),r!==void 0?(Ri.x=s*li.x-r*li.y,Ri.y=r*li.x+s*li.y):Ri.copy(li),i.copy(e),i.x+=Ri.x,i.y+=Ri.y,i.applyMatrix4(jo)}class Ls extends cn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Be(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const oo=new Ze,Ts=new Po,hr=new Rr,ur=new R;class qo extends lt{constructor(e=new mt,t=new Ls){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),hr.copy(n.boundingSphere),hr.applyMatrix4(r),hr.radius+=s,e.ray.intersectsSphere(hr)===!1)return;oo.copy(r).invert(),Ts.copy(e.ray).applyMatrix4(oo);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,d=n.attributes.position;if(c!==null){const f=Math.max(0,a.start),m=Math.min(c.count,a.start+a.count);for(let g=f,_=m;g<_;g++){const p=c.getX(g);ur.fromBufferAttribute(d,p),lo(ur,p,l,r,e,t,this)}}else{const f=Math.max(0,a.start),m=Math.min(d.count,a.start+a.count);for(let g=f,_=m;g<_;g++)ur.fromBufferAttribute(d,g),lo(ur,g,l,r,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function lo(i,e,t,n,r,s,a){const o=Ts.distanceSqToPoint(i);if(o<t){const l=new R;Ts.closestPointToPoint(i,l),l.applyMatrix4(n);const c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,object:a})}}class Yo extends Ct{constructor(e,t,n,r,s,a,o,l,c){super(e,t,n,r,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Ds extends mt{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);const s=[],a=[],o=[],l=[],c=new R,h=new Pe;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let d=0,f=3;d<=t;d++,f+=3){const m=n+d/t*r;c.x=e*Math.cos(m),c.y=e*Math.sin(m),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[f]/e+1)/2,h.y=(a[f+1]/e+1)/2,l.push(h.x,h.y)}for(let d=1;d<=t;d++)s.push(d,d+1,0);this.setIndex(s),this.setAttribute("position",new it(a,3)),this.setAttribute("normal",new it(o,3)),this.setAttribute("uv",new it(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ds(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Kt extends mt{constructor(e=1,t=1,n=1,r=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const h=[],d=[],f=[],m=[];let g=0;const _=[],p=n/2;let u=0;A(),a===!1&&(e>0&&S(!0),t>0&&S(!1)),this.setIndex(h),this.setAttribute("position",new it(d,3)),this.setAttribute("normal",new it(f,3)),this.setAttribute("uv",new it(m,2));function A(){const E=new R,w=new R;let P=0;const C=(t-e)/n;for(let H=0;H<=s;H++){const x=[],T=H/s,V=T*(t-e)+e;for(let W=0;W<=r;W++){const q=W/r,L=q*l+o,G=Math.sin(L),X=Math.cos(L);w.x=V*G,w.y=-T*n+p,w.z=V*X,d.push(w.x,w.y,w.z),E.set(G,C,X).normalize(),f.push(E.x,E.y,E.z),m.push(q,1-T),x.push(g++)}_.push(x)}for(let H=0;H<r;H++)for(let x=0;x<s;x++){const T=_[x][H],V=_[x+1][H],W=_[x+1][H+1],q=_[x][H+1];h.push(T,V,q),h.push(V,W,q),P+=6}c.addGroup(u,P,0),u+=P}function S(E){const w=g,P=new Pe,C=new R;let H=0;const x=E===!0?e:t,T=E===!0?1:-1;for(let W=1;W<=r;W++)d.push(0,p*T,0),f.push(0,T,0),m.push(.5,.5),g++;const V=g;for(let W=0;W<=r;W++){const L=W/r*l+o,G=Math.cos(L),X=Math.sin(L);C.x=x*X,C.y=p*T,C.z=x*G,d.push(C.x,C.y,C.z),f.push(0,T,0),P.x=G*.5+.5,P.y=X*.5*T+.5,m.push(P.x,P.y),g++}for(let W=0;W<r;W++){const q=w+W,L=V+W;E===!0?h.push(L,L+1,q):h.push(L+1,L,q),H+=3}c.addGroup(u,H,E===!0?1:2),u+=H}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Kt(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Us extends Kt{constructor(e=1,t=1,n=32,r=1,s=!1,a=0,o=Math.PI*2){super(0,e,t,n,r,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new Us(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Hn extends mt{constructor(e=1,t=32,n=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const h=[],d=new R,f=new R,m=[],g=[],_=[],p=[];for(let u=0;u<=n;u++){const A=[],S=u/n;let E=0;u===0&&a===0?E=.5/t:u===n&&l===Math.PI&&(E=-.5/t);for(let w=0;w<=t;w++){const P=w/t;d.x=-e*Math.cos(r+P*s)*Math.sin(a+S*o),d.y=e*Math.cos(a+S*o),d.z=e*Math.sin(r+P*s)*Math.sin(a+S*o),g.push(d.x,d.y,d.z),f.copy(d).normalize(),_.push(f.x,f.y,f.z),p.push(P+E,1-S),A.push(c++)}h.push(A)}for(let u=0;u<n;u++)for(let A=0;A<t;A++){const S=h[u][A+1],E=h[u][A],w=h[u+1][A],P=h[u+1][A+1];(u!==0||a>0)&&m.push(S,E,P),(u!==n-1||l<Math.PI)&&m.push(E,w,P)}this.setIndex(m),this.setAttribute("position",new it(g,3)),this.setAttribute("normal",new it(_,3)),this.setAttribute("uv",new it(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Hn(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Is extends mt{constructor(e=1,t=.4,n=12,r=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:s},n=Math.floor(n),r=Math.floor(r);const a=[],o=[],l=[],c=[],h=new R,d=new R,f=new R;for(let m=0;m<=n;m++)for(let g=0;g<=r;g++){const _=g/r*s,p=m/n*Math.PI*2;d.x=(e+t*Math.cos(p))*Math.cos(_),d.y=(e+t*Math.cos(p))*Math.sin(_),d.z=t*Math.sin(p),o.push(d.x,d.y,d.z),h.x=e*Math.cos(_),h.y=e*Math.sin(_),f.subVectors(d,h).normalize(),l.push(f.x,f.y,f.z),c.push(g/r),c.push(m/n)}for(let m=1;m<=n;m++)for(let g=1;g<=r;g++){const _=(r+1)*m+g-1,p=(r+1)*(m-1)+g-1,u=(r+1)*(m-1)+g,A=(r+1)*m+g;a.push(_,p,A),a.push(p,u,A)}this.setIndex(a),this.setAttribute("position",new it(o,3)),this.setAttribute("normal",new it(l,3)),this.setAttribute("uv",new it(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Is(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Sp extends cn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Be(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Be(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ar,this.normalScale=new Pe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class ds extends cn{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new Be(16777215),this.specular=new Be(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Be(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ar,this.normalScale=new Pe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Tr,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class wt extends cn{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Be(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Be(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ar,this.normalScale=new Pe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Tr,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class $o extends lt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Be(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}const fs=new Ze,co=new R,ho=new R;class yp{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Pe(512,512),this.map=null,this.mapPass=null,this.matrix=new Ze,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Rs,this._frameExtents=new Pe(1,1),this._viewportCount=1,this._viewports=[new ot(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;co.setFromMatrixPosition(e.matrixWorld),t.position.copy(co),ho.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(ho),t.updateMatrixWorld(),fs.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(fs),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(fs)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Ep extends yp{constructor(){super(new zo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Tp extends $o{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(lt.DEFAULT_UP),this.updateMatrix(),this.target=new lt,this.shadow=new Ep}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class bp extends $o{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:bs}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=bs);const ci=new Fi(0,0,0,"YXZ"),hi=new R,Ap={type:"change"},wp={type:"lock"},Rp={type:"unlock"},uo=Math.PI/2;class Ko extends Vn{constructor(e,t){super(),this.camera=e,this.domElement=t,this.isLocked=!1,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.pointerSpeed=1,this._onMouseMove=Cp.bind(this),this._onPointerlockChange=Pp.bind(this),this._onPointerlockError=Lp.bind(this),this.connect()}connect(){this.domElement.ownerDocument.addEventListener("mousemove",this._onMouseMove),this.domElement.ownerDocument.addEventListener("pointerlockchange",this._onPointerlockChange),this.domElement.ownerDocument.addEventListener("pointerlockerror",this._onPointerlockError)}disconnect(){this.domElement.ownerDocument.removeEventListener("mousemove",this._onMouseMove),this.domElement.ownerDocument.removeEventListener("pointerlockchange",this._onPointerlockChange),this.domElement.ownerDocument.removeEventListener("pointerlockerror",this._onPointerlockError)}dispose(){this.disconnect()}getObject(){return this.camera}getDirection(e){return e.set(0,0,-1).applyQuaternion(this.camera.quaternion)}moveForward(e){const t=this.camera;hi.setFromMatrixColumn(t.matrix,0),hi.crossVectors(t.up,hi),t.position.addScaledVector(hi,e)}moveRight(e){const t=this.camera;hi.setFromMatrixColumn(t.matrix,0),t.position.addScaledVector(hi,e)}lock(){this.domElement.requestPointerLock()}unlock(){this.domElement.ownerDocument.exitPointerLock()}}function Cp(i){if(this.isLocked===!1)return;const e=i.movementX||i.mozMovementX||i.webkitMovementX||0,t=i.movementY||i.mozMovementY||i.webkitMovementY||0,n=this.camera;ci.setFromQuaternion(n.quaternion),ci.y-=e*.002*this.pointerSpeed,ci.x-=t*.002*this.pointerSpeed,ci.x=Math.max(uo-this.maxPolarAngle,Math.min(uo-this.minPolarAngle,ci.x)),n.quaternion.setFromEuler(ci),this.dispatchEvent(Ap)}function Pp(){this.domElement.ownerDocument.pointerLockElement===this.domElement?(this.dispatchEvent(wp),this.isLocked=!0):(this.dispatchEvent(Rp),this.isLocked=!1)}function Lp(){console.error("THREE.PointerLockControls: Unable to use Pointer Lock API")}const Dp=9.8,Zo=20,Jo=10,Sr=60,Qo=.3,el=.9;function Up(i,e){const t=e.collider.size,n=e.collider.position,r=i.position.x,s=i.position.z,a=Math.max(Math.abs(r-n.x)-(t.x/2+i.radius),0),o=Math.max(Math.abs(s-n.z)-(t.z/2+i.radius),0);if(a>0||o>0)return{collided:!1};const l=i.position.y-i.height/2,c=i.position.y+i.height/2,h=n.y-t.y/2,d=n.y+t.y/2;if(l>d||c<h)return{collided:!1};const f=new R,m=t.x/2+i.radius-Math.abs(r-n.x),g=t.z/2+i.radius-Math.abs(s-n.z);return m<g?f.x=m*(r>n.x?1:-1):f.z=g*(s>n.z?1:-1),{collided:!0,penetration:f}}function tl(i,e,t=.1){return i<=e+t}function nl(i,e){i.x*=e,i.z*=e}class Ip{constructor(e,t){re(this,"health",100);re(this,"velocity",new R);re(this,"direction",new R);re(this,"controls");re(this,"moveForward",!1);re(this,"moveBackward",!1);re(this,"moveLeft",!1);re(this,"moveRight",!1);re(this,"canJump",!1);re(this,"isOnGround",!1);re(this,"collider");this.controls=new Ko(e,t),this.collider={position:new R(0,1.8,0),radius:.5,height:3}}updateMovement(e){this.velocity.y-=Zo*e,this.isOnGround=tl(this.controls.getObject().position.y,1.8,.1),this.isOnGround&&(this.velocity.y=Math.max(0,this.velocity.y),this.canJump=!0,nl(this.velocity,el)),this.direction.z=Number(this.moveForward)-Number(this.moveBackward),this.direction.x=Number(this.moveRight)-Number(this.moveLeft),this.direction.normalize();const t=this.isOnGround?1:Qo;(this.moveForward||this.moveBackward)&&(this.velocity.z-=this.direction.z*Sr*e*t),(this.moveLeft||this.moveRight)&&(this.velocity.x-=this.direction.x*Sr*e*t),this.controls.moveRight(-this.velocity.x*e),this.controls.moveForward(-this.velocity.z*e),this.controls.getObject().position.y+=this.velocity.y*e,this.controls.getObject().position.y<1.8&&(this.velocity.y=0,this.controls.getObject().position.y=1.8,this.canJump=!0,this.isOnGround=!0),this.collider.position.copy(this.controls.getObject().position)}jump(){this.canJump&&(this.velocity.y=Jo,this.canJump=!1)}spawn(e){this.controls.getObject().position.copy(e),this.velocity.set(0,0,0),this.collider.position.copy(e)}takeDamage(e){this.health=Math.max(0,this.health-e),this.updateHealthDisplay()}updateHealthDisplay(){const e=document.getElementById("health");e&&(e.textContent=`Health: ${this.health}%`)}}class il{apply(e,t,n){e.fillStyle="#ffffff",e.fillRect(0,0,t.width,t.height),e.strokeStyle="#000000",e.lineWidth=8,e.strokeRect(4,4,t.width-8,t.height-8);const r=Math.floor(t.width/10);e.fillStyle="#000000",e.font=`bold ${r}px Arial, sans-serif`,e.textAlign="center",e.textBaseline="middle",e.fillText(n,t.width/2,t.height/2)}}class Np{constructor(e,t,n,r="www.timetime.in",s=5,a=3,o=new il){re(this,"mesh");re(this,"collider");this.mesh=new Yt;const l=new Mi(s,a),c=document.createElement("canvas"),h=c.getContext("2d");if(!h)throw new Error("Could not create canvas context");c.width=512,c.height=256,o.apply(h,c,r);const d=new Yo(c);d.needsUpdate=!0;const f=new wt({map:d,side:zt}),m=new He(l,f),g=new Xt(.3,a+1,.3),_=new wt({color:9127187}),p=new He(g,_);p.position.set(-s/2+.15,-a/2-.5,0);const u=new He(g,_);u.position.set(s/2-.15,-a/2-.5,0),this.mesh.add(m),this.mesh.add(p),this.mesh.add(u),this.mesh.position.copy(t),this.mesh.rotation.y=n,this.collider={position:new R(t.x,t.y,t.z),size:new R(s,a,1.5)},m.castShadow=!0,m.receiveShadow=!0,p.castShadow=!0,p.receiveShadow=!0,u.castShadow=!0,u.receiveShadow=!0,e.add(this.mesh)}toObstacle(){return{mesh:this.mesh,collider:this.collider}}}class Fp{constructor(e){re(this,"obstacles",[]);re(this,"scene");re(this,"billboards",[]);re(this,"advertisementTexts",["www.TimeTime.in","www.TheirStack.com"]);this.scene=e}createObstacles(e=50){this.createCubeObstacles(Math.floor(e*.6)),this.createBillboards(Math.ceil(e*.4))}createCubeObstacles(e){for(let t=0;t<e;t++){const n=Math.random()*3+1,r=Math.random()*3+1,s=new Xt(n,r,n),a=new wt({color:9127187}),o=new He(s,a),l=Math.random()*180-90,c=r/2,h=Math.random()*180-90;o.position.set(l,c,h),o.castShadow=!0,o.receiveShadow=!0,this.scene.add(o);const d={mesh:o,collider:{position:new R(l,c,h),size:new R(n,r,n)}};this.obstacles.push(d)}}createBillboards(e){for(let t=0;t<e;t++){const n=Math.random()*6+2,r=Math.random()*4+1.5;let s,a;const o=Math.floor(Math.random()*3);if(o===0){const _=Math.floor(Math.random()*8)-4,p=Math.floor(Math.random()*8)-4;s=_*25+(Math.random()*10-5),a=p*25+(Math.random()*10-5)}else if(o===1){const p=30+Math.floor(Math.random()*3)*25,u=Math.random()*Math.PI*2;s=Math.cos(u)*p,a=Math.sin(u)*p}else{const g=20+Math.random()*80,_=Math.random()*Math.PI*2;s=Math.cos(_)*g,a=Math.sin(_)*g}const l=r/2,c=Math.floor(Math.random()*4);let h;c===0?h=Math.atan2(-a,-s):c===1?h=Math.atan2(-a,-s)+Math.PI:c===2?h=Math.atan2(-a,-s)+Math.PI/2:h=Math.atan2(-a,-s)-Math.PI/2;const d=this.advertisementTexts[Math.floor(Math.random()*this.advertisementTexts.length)],f=new il,m=new Np(this.scene,new R(s,l,a),h,d,n,r,f);this.obstacles.push(m.toObstacle()),this.billboards.push(m)}}getObstacles(){return this.obstacles}getBillboards(){return this.billboards}findSpawnPosition(){let e=Math.random()*180-90,t=Math.random()*180-90,n=!1;for(;!n;){n=!0;for(const r of this.obstacles){const s=r.mesh.position;if(Math.sqrt(Math.pow(e-s.x,2)+Math.pow(t-s.z,2))<3){n=!1,e=Math.random()*180-90,t=Math.random()*180-90;break}}}return new R(e,1.8,t)}addAdvertisementText(e){this.advertisementTexts.includes(e)||this.advertisementTexts.push(e)}}class Op{constructor(e,t){re(this,"player");re(this,"obstacleManager");this.player=e,this.obstacleManager=t}update(){this.handleObstacleCollisions(),this.handleProjectileCollisions()}handleObstacleCollisions(){const e=this.player.controls.getObject().position;this.player.collider.position.copy(e);for(const t of this.obstacleManager.getObstacles()){const n=Up(this.player.collider,t);n.collided&&n.penetration&&(e.add(n.penetration),Math.abs(n.penetration.y)>.01&&(this.player.velocity.y=0))}}handleProjectileCollisions(){}}class Pr{constructor(e,t,n,r,s=16711680,a=50,o=10,l=2,c=.15){re(this,"mesh");re(this,"velocity");re(this,"isActive",!0);re(this,"color");re(this,"lifespan");re(this,"damage");re(this,"radius");re(this,"trail",null);re(this,"type");re(this,"scene");this.scene=n,this.type=r,this.color=s,this.damage=o,this.lifespan=l,this.radius=c,this.mesh=this.createMesh(),this.mesh.position.copy(e),this.velocity=t.normalize().multiplyScalar(a),n.add(this.mesh),console.log(`Proyectil creado - Tipo: ${r}, Posición: (${e.x.toFixed(2)}, ${e.y.toFixed(2)}, ${e.z.toFixed(2)})`),console.log(`Velocidad inicial: (${this.velocity.x.toFixed(2)}, ${this.velocity.y.toFixed(2)}, ${this.velocity.z.toFixed(2)})`)}update(e){if(!this.isActive)return;this.applyGravity(e);const t=this.mesh.position.clone();this.mesh.position.x+=this.velocity.x*e,this.mesh.position.y+=this.velocity.y*e,this.mesh.position.z+=this.velocity.z*e;const n=this.mesh.position.clone().sub(t).length();Math.random()<.05&&(console.log(`Proyectil actualizado - Tipo: ${this.type}, Delta: ${e.toFixed(4)}`),console.log(`Velocidad actual: (${this.velocity.x.toFixed(2)}, ${this.velocity.y.toFixed(2)}, ${this.velocity.z.toFixed(2)})`),console.log(`Posición actual: (${this.mesh.position.x.toFixed(2)}, ${this.mesh.position.y.toFixed(2)}, ${this.mesh.position.z.toFixed(2)})`),console.log(`Desplazamiento: ${n.toFixed(4)} unidades`)),this.updateEffects(e),this.lifespan-=e,this.lifespan<=0&&(console.log("Proyectil desactivado por tiempo de vida"),this.deactivate())}applyGravity(e){this.velocity.y-=Dp*e}updateEffects(e){}createTrail(e){}deactivate(){this.isActive=!1}getPosition(){return this.mesh.position}getRadius(){return this.radius}getType(){return this.type}remove(e){e.remove(this.mesh),this.trail&&(e.remove(this.trail),this.trail.geometry.dispose(),this.trail.material.dispose(),this.trail=null),this.mesh.geometry&&this.mesh.geometry.dispose(),this.mesh.material&&this.mesh.material.dispose()}onCollision(e,t){return!0}onGroundCollision(e){return!0}}var yt=(i=>(i.PAINTBALL="paintball",i.BOUNCE_BALL="bounce_ball",i.CLUSTER_BALL="cluster_ball",i.TIMED_EXPLOSIVE="timed_explosive",i.SMOKE="smoke",i.SNIPER="sniper",i.TRACER="tracer",i))(yt||{});class fr extends Pr{constructor(e,t,n,r=16711680,s=50,a=10,o=2,l=.15){super(e,t,n,yt.PAINTBALL,r,s,a,o,l),console.log(`Paintball created with velocity: (${this.velocity.x.toFixed(2)}, ${this.velocity.y.toFixed(2)}, ${this.velocity.z.toFixed(2)})`)}createMesh(){const e=new Hn(this.radius,8,8),t=new zn({color:this.color});return new He(e,t)}onCollision(e,t){return!0}}class Bp extends Pr{constructor(t,n,r,s=65280,a=45,o=7,l=3,c=.18,h=3){super(t,n,r,yt.BOUNCE_BALL,s,a,o,l,c);re(this,"maxBounces");re(this,"bounceCount",0);re(this,"energyLoss",.25);this.maxBounces=h,this.createTrail(r),console.log(`Bounce Ball created with max bounces: ${h}`)}createMesh(){const t=new Hn(this.radius,12,12),n=new Sp({color:this.color,metalness:.7,roughness:.2,emissive:this.color,emissiveIntensity:.2});return new He(t,n)}createTrail(t){const r=new mt,s=new Float32Array(20*3);for(let o=0;o<20;o++){const l=o*3;s[l]=this.mesh.position.x,s[l+1]=this.mesh.position.y,s[l+2]=this.mesh.position.z}r.setAttribute("position",new Pt(s,3));const a=new Ls({color:this.color,size:.05,transparent:!0,opacity:.6,blending:pr});this.trail=new qo(r,a),t.add(this.trail)}updateEffects(t){if(this.trail){const n=this.trail.geometry.getAttribute("position"),r=n.array;for(let s=r.length-3;s>=3;s-=3)r[s]=r[s-3],r[s+1]=r[s-2],r[s+2]=r[s-1];r[0]=this.mesh.position.x,r[1]=this.mesh.position.y,r[2]=this.mesh.position.z,n.needsUpdate=!0}}onCollision(t,n){if(this.bounceCount++,this.bounceCount>=this.maxBounces)return!0;const r=this.velocity.dot(n),s=new R;return s.copy(this.velocity).sub(n.clone().multiplyScalar(2*r)),s.multiplyScalar(1-this.energyLoss),s.length()<5?!0:(this.velocity.copy(s),this.mesh.position.copy(t).add(n.clone().multiplyScalar(.01)),this.damage=Math.floor(this.damage*.7),!1)}onGroundCollision(t){const n=new R(0,1,0);return this.onCollision(t,n)}}function zp(i,e=!1){const t=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),r=new Set(Object.keys(i[0].morphAttributes)),s={},a={},o=i[0].morphTargetsRelative,l=new mt;let c=0;for(let h=0;h<i.length;++h){const d=i[h];let f=0;if(t!==(d.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const m in d.attributes){if(!n.has(m))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+m+'" attribute exists among all geometries, or in none of them.'),null;s[m]===void 0&&(s[m]=[]),s[m].push(d.attributes[m]),f++}if(f!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==d.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const m in d.morphAttributes){if(!r.has(m))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[m]===void 0&&(a[m]=[]),a[m].push(d.morphAttributes[m])}if(e){let m;if(t)m=d.index.count;else if(d.attributes.position!==void 0)m=d.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,m,h),c+=m}}if(t){let h=0;const d=[];for(let f=0;f<i.length;++f){const m=i[f].index;for(let g=0;g<m.count;++g)d.push(m.getX(g)+h);h+=i[f].attributes.position.count}l.setIndex(d)}for(const h in s){const d=fo(s[h]);if(!d)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,d)}for(const h in a){const d=a[h][0].length;if(d===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let f=0;f<d;++f){const m=[];for(let _=0;_<a[h].length;++_)m.push(a[h][_][f]);const g=fo(m);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(g)}}return l}function fo(i){let e,t,n,r=-1,s=0;for(let c=0;c<i.length;++c){const h=i[c];if(h.isInterleavedBufferAttribute)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. InterleavedBufferAttributes are not supported."),null;if(e===void 0&&(e=h.array.constructor),e!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=h.itemSize),t!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(r===-1&&(r=h.gpuType),r!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;s+=h.array.length}const a=new e(s);let o=0;for(let c=0;c<i.length;++c)a.set(i[c].array,o),o+=i[c].array.length;const l=new Pt(a,t,n);return r!==void 0&&(l.gpuType=r),l}class Gp extends Pr{constructor(t,n,r,s,a=16737792,o=40,l=5,c=1.5,h=.2,d=6){super(t,n,r,yt.CLUSTER_BALL,a,o,l,c,h);re(this,"clusterCount");re(this,"childProjectiles",[]);re(this,"hasExploded",!1);re(this,"addProjectileCallback",null);this.clusterCount=d,this.addProjectileCallback=s,console.log(`Cluster Ball created with ${d} sub-projectiles`)}createMesh(){const t=[],n=new Hn(this.radius,12,12);t.push(n);for(let a=0;a<8;a++){const o=a/8*Math.PI*2,l=new Us(this.radius*.4,this.radius*.6,4);l.translate(0,this.radius*.6,0);const c=new Ze().makeRotationX(Math.PI/2);c.multiply(new Ze().makeRotationZ(o)),l.applyMatrix4(c),t.push(l)}const r=zp(t),s=new zn({color:this.color});return new He(r,s)}update(t){super.update(t),this.hasExploded&&(this.childProjectiles=this.childProjectiles.filter(n=>n.isActive))}explode(t,n){if(!(this.hasExploded||!this.addProjectileCallback)){this.hasExploded=!0;for(let r=0;r<this.clusterCount;r++){const s=this.randomHemisphereDirection(n),a=new fr(t.clone().add(s.clone().multiplyScalar(.05)),s,this.scene,this.color,15+Math.random()*10,Math.max(1,Math.floor(this.damage/3)),1+Math.random(),this.radius*.5);this.childProjectiles.push(a),this.addProjectileCallback(a)}console.log(`Cluster ball exploded into ${this.clusterCount} projectiles`)}}randomHemisphereDirection(t){const n=Math.random()*Math.PI*2,r=Math.acos(2*Math.random()-1),s=Math.sin(r)*Math.cos(n),a=Math.sin(r)*Math.sin(n),o=Math.cos(r),l=new R(s,a,o);return l.dot(t)<0&&l.negate(),l}onCollision(t,n){return this.explode(t,n),!0}onGroundCollision(t){const n=new R(0,1,0);return this.onCollision(t,n)}}class Hp extends Pr{constructor(t,n,r,s=65535,a=100,o=25,l=4,c=.1){super(t,n,r,yt.SNIPER,s,a,o,l,c);re(this,"gravityFactor",.2);this.createTrail(r),console.log(`Sniper projectile created with speed: ${a}`)}createMesh(){const t=new Kt(0,this.radius,this.radius*4,8);t.rotateX(Math.PI/2);const n=new zn({color:this.color,transparent:!0,opacity:.8});return new He(t,n)}createTrail(t){const r=new mt,s=new Float32Array(30*3);for(let o=0;o<30;o++){const l=o*3;s[l]=this.mesh.position.x,s[l+1]=this.mesh.position.y,s[l+2]=this.mesh.position.z}r.setAttribute("position",new Pt(s,3));const a=new Ls({color:this.color,size:.03,transparent:!0,opacity:.5,blending:pr});this.trail=new qo(r,a),t.add(this.trail)}update(t){if(super.update(t),this.isActive&&this.velocity.lengthSq()>.001){const n=this.velocity.clone().normalize(),r=new R(0,1,0),s=new R().crossVectors(r,n).normalize(),a=Math.acos(r.dot(n));this.mesh.quaternion.setFromAxisAngle(s,a)}}applyGravity(t){super.applyGravity(t*this.gravityFactor)}updateEffects(t){if(this.trail){const n=this.trail.geometry.getAttribute("position"),r=n.array;for(let s=r.length-3;s>=3;s-=3)r[s]=r[s-3],r[s+1]=r[s-2],r[s+2]=r[s-1];r[0]=this.mesh.position.x,r[1]=this.mesh.position.y,r[2]=this.mesh.position.z,n.needsUpdate=!0}}}class rl{static createProjectile(e,t,n,r,s,a={}){switch(e){case yt.PAINTBALL:return new fr(t,n,r,s,a.speed,a.damage,a.lifespan,a.radius);case yt.BOUNCE_BALL:return new Bp(t,n,r,s,a.speed,a.damage,a.lifespan,a.radius,a.maxBounces);case yt.CLUSTER_BALL:return a.addProjectileCallback?new Gp(t,n,r,a.addProjectileCallback,s,a.speed,a.damage,a.lifespan,a.radius,a.clusterCount):(console.error("ClusterBallProjectile requires addProjectileCallback"),new fr(t,n,r,s));case yt.SNIPER:return new Hp(t,n,r,s,a.speed||100,a.damage||25,a.lifespan||4,a.radius||.1);default:return console.warn(`Unknown projectile type: ${e}, defaulting to paintball`),new fr(t,n,r,s)}}}class Ns{constructor(e,t){re(this,"scene");re(this,"stats");re(this,"state");re(this,"model",null);re(this,"projectiles",[]);re(this,"projectileType",yt.PAINTBALL);re(this,"projectileOptions",{});this.scene=e,this.stats=t,this.state={currentAmmo:t.maxAmmo,isReloading:!1,reloadTimeLeft:0,shootCooldown:0},this.projectileOptions={speed:t.projectileSpeed,damage:t.damage,lifespan:2,radius:.15}}update(e){this.state.shootCooldown>0&&(this.state.shootCooldown-=e),this.state.isReloading&&(this.state.reloadTimeLeft-=e,this.state.reloadTimeLeft<=0&&(this.state.isReloading=!1,this.state.currentAmmo=this.stats.maxAmmo)),this.updateProjectiles(e)}updateProjectiles(e){const t=[];for(let n=0;n<this.projectiles.length;n++){const r=this.projectiles[n];r.isActive&&(r.update(e),r.isActive?t.push(r):r.remove(this.scene))}this.projectiles=t}shoot(e,t){if(this.state.shootCooldown>0||this.state.isReloading||this.state.currentAmmo<=0)return null;this.state.shootCooldown=1/this.stats.fireRate,this.state.currentAmmo--;const n={...this.projectileOptions,addProjectileCallback:s=>{this.projectiles.push(s)}},r=rl.createProjectile(this.projectileType,e.clone(),t.clone(),this.scene,this.stats.projectileColor,n);return this.projectiles.push(r),r}onShoot(){}onReloadStart(){}onReloadComplete(){}getProjectiles(){return this.projectiles}getName(){return this.stats.name}getCurrentAmmo(){return this.state.currentAmmo}getMaxAmmo(){return this.stats.maxAmmo}isReloading(){return this.state.isReloading}isAutomatic(){return this.stats.automatic}getDamage(){return this.stats.damage}getFireRate(){return this.stats.fireRate}setDamage(e){this.stats.damage=e}setFireRate(e){this.stats.fireRate=e}reload(){this.state.isReloading||this.state.currentAmmo===this.stats.maxAmmo||(this.state.isReloading=!0,this.state.reloadTimeLeft=this.stats.reloadTime,console.log(`Reloading weapon: ${this.stats.name}`))}}class Vp extends Ns{constructor(t){const n={name:"Marcadora Estándar",description:"Marcadora básica de paintball con buena precisión",maxAmmo:50,damage:10,fireRate:2,accuracy:.85,reloadTime:2,projectileSpeed:50,projectileColor:16711680,weight:5,automatic:!1};super(t,n);re(this,"paintballColors",[16711680,65280,255,16776960,16711935,65535]);this.projectileType=yt.PAINTBALL,this.projectileOptions={speed:n.projectileSpeed,damage:n.damage,lifespan:2,radius:.15},this.createWeaponModel()}onShoot(){const t=this.paintballColors[Math.floor(Math.random()*this.paintballColors.length)];this.projectileOptions.color=t,console.log("¡Paintball disparado!")}createWeaponModel(){this.model=new Yt;const t=new Xt(.1,.1,.5),n=new wt({color:3355443}),r=new He(t,n),s=new Kt(.025,.025,.6,8),a=new wt({color:6710886}),o=new He(s,a);o.rotation.x=Math.PI/2,o.position.z=-.3;const l=new Kt(.04,.04,.3,8),c=new wt({color:26316}),h=new He(l,c);h.rotation.x=Math.PI/2,h.position.y=-.1,h.position.z=.1,this.model.add(r),this.model.add(o),this.model.add(h)}}class kp extends Ns{constructor(e){const t={name:"Lanzador de Globos",description:"Dispara globos de agua que rebotan y generan salpicaduras amplias",maxAmmo:15,damage:15,fireRate:1,accuracy:.7,reloadTime:3,projectileSpeed:40,projectileColor:43775,weight:6,automatic:!1};super(e,t),this.projectileType=yt.BOUNCE_BALL,this.projectileOptions={speed:t.projectileSpeed,damage:t.damage,lifespan:3,radius:.2,maxBounces:2},this.createWeaponModel()}onShoot(){console.log("¡Globo de agua lanzado!")}createWeaponModel(){this.model=new Yt;const e=new Kt(.08,.1,.5,12),t=new wt({color:35020}),n=new He(e,t);n.rotation.z=Math.PI/2;const r=new Kt(.03,.04,.2,8),s=new wt({color:4473924}),a=new He(r,s);a.position.y=-.15,a.position.x=-.1;const o=new Is(.08,.02,8,16),l=new wt({color:11184810}),c=new He(o,l);c.rotation.y=Math.PI/2,c.position.x=.25,this.model.add(n),this.model.add(a),this.model.add(c)}}class Wp extends Ns{constructor(t){const n={name:"Ametralladora",description:"Arma de fuego rápido con gran capacidad de munición",maxAmmo:100,damage:5,fireRate:8,accuracy:.7,reloadTime:4,projectileSpeed:60,projectileColor:16711680,weight:7,automatic:!0};super(t,n);re(this,"paintballColors",[16711680,65280,255,16776960,16711935,65535]);this.projectileType=yt.PAINTBALL,this.projectileOptions={speed:n.projectileSpeed,damage:n.damage,lifespan:2,radius:.1},this.createWeaponModel()}onShoot(){const t=this.paintballColors[Math.floor(Math.random()*this.paintballColors.length)];this.projectileOptions.color=t,console.log("¡Ráfaga de paintball!")}createWeaponModel(){this.model=new Yt;const t=new Xt(.15,.15,.6),n=new wt({color:4473924}),r=new He(t,n),s=new Kt(.025,.025,.8,8),a=new wt({color:7829367}),o=new He(s,a);o.rotation.x=Math.PI/2,o.position.z=-.4;const l=new Xt(.08,.25,.15),c=new wt({color:2236962}),h=new He(l,c);h.position.y=-.2,this.model.add(r),this.model.add(o),this.model.add(h);const d=new Xt(.03,.05,.03),f=new wt({color:0}),m=new He(d,f);m.position.y=.1,m.position.z=.1,this.model.add(m)}}class Xp{constructor(e,t){re(this,"scene");re(this,"player");re(this,"weapons",[]);re(this,"currentWeaponIndex",0);re(this,"isAutoFiring",!1);re(this,"autoFireInterval",null);this.scene=e,this.player=t,this.initializeWeapons()}initializeWeapons(){const e=new Vp(this.scene),t=new kp(this.scene),n=new Wp(this.scene);this.weapons.push(e),this.weapons.push(t),this.weapons.push(n),console.log("Armas inicializadas:",this.weapons.length),this.weapons.forEach((r,s)=>{console.log(`Arma ${s}:`,r.getName(),"Munición:",r.getCurrentAmmo(),"/",r.getMaxAmmo())})}update(e,t){const n=this.getCurrentWeapon();n.update(e),console.log(`Actualizando arma: ${n.getName()}, delta: ${e.toFixed(4)}`);for(const r of this.weapons)this.updateWeaponProjectiles(r,e);this.updateProjectiles(e,t)}updateWeaponProjectiles(e,t){e.updateProjectiles(t)}getAllProjectiles(){const e=[];for(const t of this.weapons)e.push(...t.getProjectiles());return e}getCurrentWeapon(){return this.weapons[this.currentWeaponIndex]}setWeapon(e){e>=0&&e<this.weapons.length&&(this.currentWeaponIndex=e,this.displayWeaponInfo())}nextWeapon(){this.stopAutoFire(),this.currentWeaponIndex=(this.currentWeaponIndex+1)%this.weapons.length,this.displayWeaponInfo()}previousWeapon(){this.stopAutoFire(),this.currentWeaponIndex=(this.currentWeaponIndex-1+this.weapons.length)%this.weapons.length,this.displayWeaponInfo()}displayWeaponInfo(){if(this.weapons.length===0)return;const e=this.getCurrentWeapon();if(!e)return;const t=e.getCurrentAmmo(),n=e.getMaxAmmo();console.log(`Arma actual: ${e.getName()}`),console.log(`Munición: ${t!==void 0?t:"N/A"}/${n!==void 0?n:"N/A"}`),this.updateAmmoDisplay()}updateAmmoDisplay(){const e=this.getCurrentWeapon();if(!e)return;const t=document.getElementById("ammo"),n=document.getElementById("weapon-name"),r=document.getElementById("ammo-counter"),s=e.getCurrentAmmo(),a=e.getMaxAmmo();t&&(t.textContent=`Arma: ${e.getName()} | Munición: ${s}/${a}`,e.isReloading()&&(t.textContent+=" (Recargando...)")),n&&(n.textContent=e.getName()),r&&(r.textContent=`${s}/${a}`)}shoot(){if(this.weapons.length===0)return;const e=this.getCurrentWeapon();if(e.getCurrentAmmo()<=0){console.log("Sin munición. Recargando..."),this.reload();return}if(e.isReloading()){console.log("El arma está recargando...");return}const t=this.player.controls.getObject(),n=t.position.clone(),r=new R(0,0,-1);r.applyQuaternion(t.quaternion);const s=.5;n.add(r.clone().multiplyScalar(s));const a=e.shoot(n,r);this.updateAmmoDisplay(),a&&console.log(`Proyectil disparado desde ${e.getName()}. Munición restante: ${e.getCurrentAmmo()}`)}startAutoFire(){const e=this.getCurrentWeapon();if(e.isAutomatic()&&!this.isAutoFiring){this.isAutoFiring=!0,this.shoot();const t=1e3/e.getFireRate();this.autoFireInterval=window.setInterval(()=>{this.shoot()},t)}}stopAutoFire(){this.isAutoFiring&&this.autoFireInterval!==null&&(clearInterval(this.autoFireInterval),this.autoFireInterval=null,this.isAutoFiring=!1)}reload(){const e=this.getCurrentWeapon();e&&!e.isReloading()&&(e.reload(),console.log(`Reloading weapon: ${e.getName()}`))}updateProjectiles(e,t){const n=this.getAllProjectiles();console.log(`Actualizando ${n.length} proyectiles con detección de colisiones`);for(const r of n){if(!r.isActive)continue;const s=r.getPosition(),a=r.getRadius();if(s.y<=a&&(console.log(`Colisión con el suelo detectada en (${s.x.toFixed(2)}, ${s.y.toFixed(2)}, ${s.z.toFixed(2)})`),r.onGroundCollision(new R(s.x,0,s.z)))){this.createGroundPaintSplash(new R(s.x,.01,s.z),r.color),r.deactivate(),console.log("Proyectil desactivado por colisión con el suelo");continue}for(const o of t){const l=o.mesh;if(this.checkProjectileCollision(r,l)){console.log("Colisión con obstáculo detectada");const c=this.getCollisionPoint(s,l),h=this.getCollisionNormal(c,l);r.onCollision(c,h)&&(this.createPaintSplash(c,r.color,l),r.deactivate(),console.log("Proyectil desactivado por colisión con obstáculo"));break}}}}createPaintSplash(e,t,n){const r=.5+Math.random()*.5,s=new Mi(r,r),a=new zn({color:t,transparent:!0,opacity:.8,depthTest:!0,depthWrite:!1,side:zt}),o=new He(s,a);let l;n instanceof Yt?(l=new R,n.getWorldPosition(l)):l=n.position;const c=new R().subVectors(e,l).normalize();o.position.copy(e).addScaledVector(c,.01),o.lookAt(o.position.clone().add(c)),o.rotation.z=Math.random()*Math.PI*2,this.scene.add(o)}createGroundPaintSplash(e,t){const n=.8+Math.random()*.7,r=new Ds(n,8),s=new zn({color:t,transparent:!0,opacity:.7,depthTest:!0,depthWrite:!1,side:zt}),a=new He(r,s);e.y=.01,a.position.copy(e),a.rotation.x=-Math.PI/2,a.rotation.z=Math.random()*Math.PI*2,this.scene.add(a)}checkPlayerCollisions(e){let t=0;const n=window.botManager;if(!n)return 0;const r=n.getAllBotProjectiles();for(const s of r){if(!s.isActive)continue;const a=s.getPosition(),o=s.getRadius();a.distanceTo(e.position)<o+e.radius&&(s.deactivate(),t++)}return t}checkProjectileCollision(e,t){const n=e.getPosition(),r=e.getRadius(),s=new Bn().setFromObject(t);return n.x>s.min.x-r&&n.x<s.max.x+r&&n.y>s.min.y-r&&n.y<s.max.y+r&&n.z>s.min.z-r&&n.z<s.max.z+r}getCollisionPoint(e,t){return e.clone()}getCollisionNormal(e,t){const n=new Bn().setFromObject(t),r=new R;n.getCenter(r);const s=e.clone().sub(r).normalize(),a=Math.abs(s.x),o=Math.abs(s.y),l=Math.abs(s.z),c=new R;return a>o&&a>l?c.set(Math.sign(s.x),0,0):o>a&&o>l?c.set(0,Math.sign(s.y),0):c.set(0,0,Math.sign(s.z)),c}}class jp{constructor(e,t,n){re(this,"mesh");re(this,"velocity",new R);re(this,"direction",new R);re(this,"health",3);re(this,"isActive",!0);re(this,"collider");re(this,"shootCooldown",0);re(this,"shootCooldownTime",1.5);re(this,"projectiles",[]);re(this,"maxProjectiles",5);re(this,"projectileSpeed",40);re(this,"projectileType",yt.PAINTBALL);re(this,"projectileColor",16711680);re(this,"projectileOptions",{damage:1,lifespan:3,radius:.15});re(this,"movementPattern","patrol");re(this,"targetPosition",new R);re(this,"patrolPoints",[]);re(this,"currentPatrolIndex",0);re(this,"movementSpeed",3);re(this,"rotationSpeed",2);re(this,"changeDirectionTimer",0);re(this,"changeDirectionInterval",3);this.mesh=new Yt;const r=new Kt(.5,.5,2,8),s=new ds({color:4473924}),a=new He(r,s);a.position.y=1,this.mesh.add(a);const o=new Hn(.4,16,16),l=new ds({color:6710886}),c=new He(o,l);c.position.y=2.2,this.mesh.add(c);const h=new Hn(.1,8,8),d=new ds({color:16711680}),f=new He(h,d);f.position.set(.2,2.2,.3),this.mesh.add(f);const m=new He(h,d);m.position.set(-.2,2.2,.3),this.mesh.add(m),this.mesh.position.copy(e),t.add(this.mesh),this.collider={position:new R().copy(e),radius:1,height:2},n&&n.length>0?(this.patrolPoints=n,this.targetPosition.copy(this.patrolPoints[0])):this.generateRandomPatrolArea(e)}update(e,t,n,r){if(!this.isActive)return;switch(this.shootCooldown>0&&(this.shootCooldown-=e),this.updateProjectiles(e,r),this.movementPattern){case"patrol":this.updatePatrolMovement(e,n);break;case"chase":this.updateChaseMovement(e,t,n);break;case"random":this.updateRandomMovement(e,n);break}const s=this.mesh.position.distanceTo(t);s<15?this.movementPattern="chase":this.movementPattern==="chase"&&(this.movementPattern="patrol"),s<20&&this.shootCooldown<=0&&this.shootAtTarget(t,r)}updatePatrolMovement(e,t){const n=new R().subVectors(this.targetPosition,this.mesh.position).normalize();this.rotateTowards(n,e);const r=new R().copy(this.direction).multiplyScalar(this.movementSpeed*e);this.mesh.position.add(r),this.collider.position.copy(this.mesh.position),this.mesh.position.distanceTo(this.targetPosition)<1&&(this.currentPatrolIndex=(this.currentPatrolIndex+1)%this.patrolPoints.length,this.targetPosition.copy(this.patrolPoints[this.currentPatrolIndex]))}updateChaseMovement(e,t,n){const r=new R().subVectors(t,this.mesh.position).normalize();this.rotateTowards(r,e);const s=new R().copy(this.direction).multiplyScalar(this.movementSpeed*.8*e);this.mesh.position.add(s),this.collider.position.copy(this.mesh.position)}updateRandomMovement(e,t){if(this.changeDirectionTimer-=e,this.changeDirectionTimer<=0){const r=Math.random()*Math.PI*2;this.direction.set(Math.cos(r),0,Math.sin(r)),this.changeDirectionTimer=this.changeDirectionInterval}const n=new R().copy(this.direction).multiplyScalar(this.movementSpeed*e);this.mesh.position.add(n),this.collider.position.copy(this.mesh.position)}rotateTowards(e,t){const n=Math.atan2(this.direction.x,this.direction.z);let s=Math.atan2(e.x,e.z)-n;for(;s>Math.PI;)s-=Math.PI*2;for(;s<-Math.PI;)s+=Math.PI*2;const a=this.rotationSpeed*t,o=Math.sign(s)*Math.min(Math.abs(s),a),l=n+o;this.direction.set(Math.sin(l),0,Math.cos(l)),this.mesh.rotation.y=-l}setProjectileType(e,t={}){this.projectileType=e,this.projectileOptions={...this.projectileOptions,...t,speed:t.speed||this.projectileSpeed},console.log(`Bot ahora usa proyectiles de tipo: ${e}`)}useBounceBallProjectiles(e=3){this.setProjectileType(yt.BOUNCE_BALL,{maxBounces:e,damage:1,color:16733440})}shootAtTarget(e,t){if(this.shootCooldown>0)return;this.shootCooldown=this.shootCooldownTime;const n=new R(this.mesh.position.x,this.mesh.position.y+2,this.mesh.position.z),r=new R().subVectors(e,n).normalize(),s=.05;r.x+=(Math.random()-.5)*s,r.y+=(Math.random()-.5)*s,r.z+=(Math.random()-.5)*s,r.normalize();const a=rl.createProjectile(this.projectileType,n,r,t,this.projectileColor,this.projectileOptions);if(this.projectiles.push(a),this.projectiles.length>this.maxProjectiles){const o=this.projectiles.shift();o&&o.remove(t)}}updateProjectiles(e,t){for(let n=this.projectiles.length-1;n>=0;n--){const r=this.projectiles[n];r.update(e),r.isActive||(r.remove(t),this.projectiles.splice(n,1))}}getProjectiles(){return this.projectiles}takeDamage(){if(!this.isActive)return!1;this.health--,console.log(`Bot dañado. Nueva salud: ${this.health}`);const e=this.mesh.children[0].material;return e.color.set(16711680),setTimeout(()=>{this.isActive&&e.color.set(4473924)},150),this.movementPattern="random",this.changeDirectionTimer=0,this.health<=0?(console.log("Bot debe morir. Llamando a deactivate()"),this.deactivate(),!0):!1}deactivate(){this.isActive=!1;const e=this.mesh.children[0].material,t=this.mesh.children[1].material;e.color.set(2236962),t.color.set(2236962),this.mesh.rotation.x=Math.PI/2}remove(e){for(const t of this.projectiles)t.remove(e);this.projectiles=[],e.remove(this.mesh)}generateRandomPatrolArea(e){const t=3+Math.floor(Math.random()*3),n=5+Math.random()*10;for(let r=0;r<t;r++){const s=r/t*Math.PI*2,a=e.x+Math.cos(s)*n,o=e.z+Math.sin(s)*n;this.patrolPoints.push(new R(a,e.y,o))}this.targetPosition.copy(this.patrolPoints[0])}}class qp{constructor(e){re(this,"bots",[]);re(this,"scene");re(this,"maxBots",10);re(this,"_lastStatsTime",0);this.scene=e,window.botManager=this}spawnBot(e,t){const n=new jp(e,this.scene,t);if(this.bots.push(n),this.bots.length>this.maxBots){const r=this.bots.shift();r&&r.remove(this.scene)}return n}spawnBots(e,t){for(let n=0;n<e;n++)if(t.length>0){const r=Math.floor(Math.random()*t.length),s=t[r];this.spawnBot(s)}}update(e,t,n){const r=Math.floor(Date.now()/5e3);r!==this._lastStatsTime&&(this._lastStatsTime=r,console.log(`Estadísticas de bots: ${this.bots.length} bots, ${this.bots.filter(s=>s.isActive).length} activos`),this.bots.forEach((s,a)=>{s.isActive&&console.log(`Bot #${a}: Salud = ${s.health}, Posición = (${s.mesh.position.x.toFixed(1)}, ${s.mesh.position.y.toFixed(1)}, ${s.mesh.position.z.toFixed(1)})`)}));for(let s=this.bots.length-1;s>=0;s--){const a=this.bots[s];a.isActive&&a.update(e,t,n,this.scene)}}checkProjectileCollisions(e){if(!(e.length===0||this.bots.length===0)){Math.random()<.1&&console.log(`Comprobando ${e.length} proyectiles contra ${this.bots.length} bots`);for(const t of e){if(!t.isActive)continue;const n=t.getPosition(),r=t.getRadius();for(const s of this.bots){if(!s.isActive)continue;const a=new R().subVectors(n,s.mesh.position),o=Math.sqrt(a.x*a.x+a.z*a.z),l=n.y-s.mesh.position.y,c=o<s.collider.radius+r,h=l>0&&l<s.collider.height,d=new R(s.mesh.position.x,s.mesh.position.y+s.collider.height,s.mesh.position.z),m=n.distanceTo(d)<s.collider.radius*.8+r;if(c&&h||m){console.log(`¡Impacto! Bot recibe daño. Salud antes: ${s.health}`);const g=s.takeDamage();console.log(`Salud después: ${s.health}, ¿Murió?: ${g}`),t.deactivate(),g&&(this.showScore(s.mesh.position),console.log("Bot eliminado. Mostrando puntuación."));break}}}}}showScore(e){const t=document.createElement("canvas"),n=t.getContext("2d");if(!n)return;t.width=100,t.height=50,n.fillStyle="white",n.font="Bold 36px Arial",n.fillText("+100",5,40);const r=new Yo(t),s=new Xo({map:r,transparent:!0,opacity:1}),a=new Mp(s);a.position.copy(e),a.position.y+=2,a.scale.set(2,1,1),this.scene.add(a);const o=Date.now(),l=1500,c=()=>{const d=(Date.now()-o)/l;d<1?(a.position.y+=.01,a.material.opacity=1-d,requestAnimationFrame(c)):(this.scene.remove(a),a.material.dispose())};c()}getActiveBotCount(){return this.bots.filter(e=>e.isActive).length}removeAllBots(){for(const e of this.bots)e.remove(this.scene);this.bots=[]}getAllBotProjectiles(){const e=[];for(const t of this.bots)t.isActive&&t.getProjectiles&&e.push(...t.getProjectiles());return e}spawnBounceBot(e,t=3,n){const r=this.spawnBot(e,n);return r.useBounceBallProjectiles(t),console.log(`Bot rebotante creado en (${e.x.toFixed(2)}, ${e.y.toFixed(2)}, ${e.z.toFixed(2)})`),r}}const Ae={health:100,moveForward:!1,moveBackward:!1,moveLeft:!1,moveRight:!1,canJump:!1,velocity:new R,direction:new R,prevTime:performance.now(),playerCollider:{position:new R(0,1.8,0),radius:.5,height:3},isOnGround:!1,currentWeaponIndex:0};let $t,yn,fi,At,mn,Un,sl,Tt,Oi,yr=0;const Er=15e3,po=3;let Li=Er/1e3;function Yp(){$t=new vp,$t.background=new Be(8900331),$t.fog=new Ps(8900331,0,750),yn=new Bt(75,window.innerWidth/window.innerHeight,.1,1e3),yn.position.y=1.8,fi=new Wo({antialias:!0}),fi.setSize(window.innerWidth,window.innerHeight),fi.shadowMap.enabled=!0,document.body.appendChild(fi.domElement),At=new Ko(yn,document.body),al(),$p(),Kp()}function al(){const i=document.getElementById("instructions"),e=document.getElementById("crosshair"),t=document.getElementById("wave-countdown");!i||!e||(i.addEventListener("click",()=>{At.lock()}),At.addEventListener("lock",()=>{i.style.display="none",e.style.display="block",t&&(t.style.display="block")}),At.addEventListener("unlock",()=>{i.style.display="block",e.style.display="none",t&&(t.style.display="none")}),document.addEventListener("keydown",n=>{switch(n.code){case"KeyW":Ae.moveForward=!0;break;case"KeyS":Ae.moveBackward=!0;break;case"KeyA":Ae.moveLeft=!0;break;case"KeyD":Ae.moveRight=!0;break;case"Space":Ae.canJump&&(Ae.velocity.y+=Jo,Ae.canJump=!1);break;case"Digit1":case"Digit2":case"Digit3":const r=parseInt(n.code.slice(-1))-1;r>=0&&r<3&&(Ae.currentWeaponIndex=r,Tt.setWeapon(r));break;case"KeyQ":Tt.previousWeapon();break;case"KeyE":Tt.nextWeapon();break;case"KeyR":Tt.reload();break}}),document.addEventListener("keyup",n=>{switch(n.key){case"w":case"ArrowUp":Ae.moveForward=!1;break;case"s":case"ArrowDown":Ae.moveBackward=!1;break;case"a":case"ArrowLeft":Ae.moveLeft=!1;break;case"d":case"ArrowRight":Ae.moveRight=!1;break;case" ":break;case"1":case"2":case"3":case"4":case"5":const r=parseInt(n.key)-1;r>=0&&r<5&&Tt.setWeapon(r);break;case"b":const s=At.getObject().position.clone(),a=new R(0,0,-1).applyQuaternion(yn.quaternion),o=s.clone().add(a.multiplyScalar(10));o.y=0,Oi.spawnBounceBot(o);break}}),document.addEventListener("mousedown",n=>{n.button===0&&At.isLocked&&(Tt.getCurrentWeapon().isAutomatic()?Tt.startAutoFire():Tt.shoot())}),document.addEventListener("mouseup",n=>{n.button===0&&At.isLocked&&Tt.stopAutoFire()}),window.addEventListener("resize",()=>{yn.aspect=window.innerWidth/window.innerHeight,yn.updateProjectionMatrix(),fi.setSize(window.innerWidth,window.innerHeight)}))}function $p(){const i=new Mi(200,200),e=new wt({color:2441495}),t=new He(i,e);t.rotation.x=-Math.PI/2,t.receiveShadow=!0,$t.add(t)}function Kp(){const i=new bp(4210752);$t.add(i);const e=new Tp(16777215,1);e.position.set(10,30,10),e.castShadow=!0,e.shadow.camera.left=-100,e.shadow.camera.right=100,e.shadow.camera.top=100,e.shadow.camera.bottom=-100,$t.add(e)}function Zp(){sl.update(),Oi.checkProjectileCollisions(Tt.getAllProjectiles());const i=Tt.checkPlayerCollisions(mn.collider);i>0&&mn.takeDamage(10*i)}function ol(){const i=performance.now();if(i-yr>Er){yr=i,Li=Er/1e3;const e=[];for(let t=0;t<po;t++){const n=Un.findSpawnPosition();e.push(n)}Oi.spawnBots(po,e),Jp()}}function Jp(){const i=document.createElement("div");i.classList.add("wave-notification"),i.textContent="¡Nueva oleada de bots!",document.body.appendChild(i),i.style.position="absolute",i.style.top="20%",i.style.left="50%",i.style.transform="translateX(-50%)",i.style.padding="10px 20px",i.style.backgroundColor="rgba(255, 0, 0, 0.7)",i.style.color="white",i.style.fontFamily="Arial, sans-serif",i.style.fontSize="24px",i.style.fontWeight="bold",i.style.borderRadius="5px",i.style.zIndex="1000",setTimeout(()=>{document.body.removeChild(i)},3e3)}function Qp(i){Ae.velocity.y-=Zo*i,Ae.isOnGround=tl(At.getObject().position.y,1.8,.1),Ae.isOnGround&&(Ae.velocity.y=Math.max(0,Ae.velocity.y),Ae.canJump=!0,nl(Ae.velocity,el)),Ae.direction.z=Number(Ae.moveForward)-Number(Ae.moveBackward),Ae.direction.x=Number(Ae.moveRight)-Number(Ae.moveLeft),Ae.direction.normalize();const e=Ae.isOnGround?1:Qo;(Ae.moveForward||Ae.moveBackward)&&(Ae.velocity.z-=Ae.direction.z*Sr*i*e),(Ae.moveLeft||Ae.moveRight)&&(Ae.velocity.x-=Ae.direction.x*Sr*i*e),At.moveRight(-Ae.velocity.x*i),At.moveForward(-Ae.velocity.z*i),At.getObject().position.y+=Ae.velocity.y*i,At.getObject().position.y<1.8&&(Ae.velocity.y=0,At.getObject().position.y=1.8,Ae.canJump=!0,Ae.isOnGround=!0)}function ll(){requestAnimationFrame(ll);const i=performance.now(),e=(i-Ae.prevTime)/1e3;At.isLocked&&(Qp(e),Oi.update(e,mn.controls.getObject().position,Un.getObstacles()),em(i),ol(),Zp(),Tt.update(e,Un.getObstacles())),fi.render($t,yn),Ae.prevTime=i}function em(i){const e=Math.max(0,Er-(i-yr));Li=Math.ceil(e/1e3);const t=document.getElementById("wave-countdown");t&&(t.textContent=`Next wave: ${Li}s`,Li<=5?t.style.backgroundColor="rgba(255, 0, 0, 0.8)":Li<=10?t.style.backgroundColor="rgba(255, 165, 0, 0.6)":t.style.backgroundColor="rgba(255, 0, 0, 0.5)")}function tm(){const i=document.getElementById("crosshair");i&&(i.style.display="none");const e=document.getElementById("wave-countdown");e&&(e.style.display="none"),Yp(),mn=new Ip(yn,document.body),Un=new Fp($t),Un.createObstacles(120),Oi=new qp($t),sl=new Op(mn,Un),Tt=new Xp($t,mn),Tt.displayWeaponInfo(),al();const t=Un.findSpawnPosition();mn.spawn(t),yr=performance.now(),ol(),mn.updateHealthDisplay(),ll()}tm();
