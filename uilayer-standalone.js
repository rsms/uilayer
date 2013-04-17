window.Move||(window.Move=function(){typeof window.global=="undefined"&&(window.global=window);var Require=function(a){function b(a){var b=0;for(var c=a.length;c>=0;c--){var d=a[c];d=="."?a.splice(c,1):d===".."?(a.splice(c,1),b++):b&&(a.splice(c,1),b--)}return a}function c(a,c){a=a.replace(/\/+$/g,"");var d=(c?c+"/../"+a:a).split("/");return b(d).join("/")}function d(a,c){if(!/^\w+:/.test(a)){var d=c.protocol+"//"+c.hostname;c.port&&c.port!==80&&(d+=":"+c.port);var e=c.pathname;a.charAt(0)==="/"?a=d+b(a.split("/")).join("/"):(e+=(e.charAt(e.length-1)==="/"?"":"/../")+a,a=d+b(e.split("/")).join("/"))}return a}function f(a,b,d){var g=a;if(a.charAt(0)==="."){d&&d.indexOf(b+"/index")!==-1&&(b+="/index");var h=a;a=c(a,b)}if(!f.modules.hasOwnProperty(a))throw new Error("Module not found "+JSON.stringify(g));var i=f.modules[a];if(i.exports===undefined){var j=function(b){return f(b,a,i.uri)};e(j,"main",f.main);var k=i.block;delete i.block,i.exports={},f.initFilter&&(k=f.initFilter(k)),k(j,i,i.exports)}return i.exports}function g(a,b,c){typeof b=="function"&&(c=b,b=null);var d={block:c};return e(d,"id",String(a)),b&&e(d,"uri",String(b)),f.modules[d.id]=d,d}var e;Object.defineProperty?e=function(a,b,c){Object.defineProperty(a,b,{value:c,writable:!1,enumerable:!0,configurable:!1})}:e=function(a,b,c){a[b]=c},f.modules={};var h=g("");return delete h.block,h.exports=a||{},e(f,"main",h),f.define=g,f},module,modules={},_require=Require();_require.define("runtime/es5_array","runtime/es5_array.js",function(a,b,c,d,e){Array.isArray||(Array.isArray=function(a){return a instanceof Array||Object.prototype.toString.call(a)==="[object Array]"}),Array.prototype.indexOf||(Array.prototype.indexOf=function(a,b){var c,d=this.length;for(c=+b||0;c<d;++c)if(this[c]===a)return c;return-1}),Array.prototype.lastIndexOf||(Array.prototype.lastIndexOf=function(a,b){var c=Math.min(this.length,+b||0);for(;c!==-1;--c)if(this[c]===a)return c;return-1}),Array.prototype.filter||(Array.prototype.filter=function(a,b){var c=[];for(var d=0;d<this.length;d++)a.call(b,this[d])&&c.push(this[d]);return c}),Array.prototype.forEach||(Array.prototype.forEach=function(a,b){var c=this.length>>>0;for(var d=0;d<c;++d)d in this&&a.call(b,this[d],d,this)}),Array.prototype.every||(Array.prototype.every=function(a,b){var c=this.length>>>0;for(var d=0;d<c;++d)if(d in this&&!a.call(b,this[d],d,this))return!1;return!0}),Array.prototype.some||(Array.prototype.some=function(a,b){var c=this.length>>>0;for(var d=0;d<c;++d)if(d in this&&a.call(b,this[d],d,this))return!0;return!1}),Array.prototype.map||(Array.prototype.map=function(a,b){var c=this.length>>>0,d=new Array(c);for(var e=0;e<c;++e)d[e]=a.call(b,this[e],e,this);return d}),Array.prototype.reduce||(Array.prototype.reduce=function(a){var b=this.length>>>0,c=0,d;if(b===0&&arguments.length===1)throw new TypeError;if(arguments.length>=2)d=arguments[1];else do{if(c in this){d=this[c++];break}if(++c>=b)throw new TypeError}while(!0);for(;c<b;c++)c in this&&(d=a.call(null,d,this[c],c,this));return d}),Array.prototype.unshift||(Array.prototype.unshift=function(){this.reverse();var a=arguments.length;while(a--)this.push(arguments[a]);return this.reverse(),this.length})}),_require.define("runtime/es5_date","runtime/es5_date.js",function(a,b,c,d,e){Date.now||(Date.now=function(){return(new Date).getTime()}),Date.prototype.getTimezoneOffset||(Date.prototype.getTimezoneOffset=function(){if(this._timezoneOffsetStd===undefined){var a=new Date(this.getFullYear(),this.getMonth(),this.getDate(),0,0,0,0),b=a.toGMTString(),c=new Date(b.substring(0,b.lastIndexOf(" ")-1));this._timezoneOffsetStd=(c-a)/6e4}return this._timezoneOffsetStd})}),_require.define("runtime/es5_json","runtime/es5_json.js",function(require,module,exports,__filename,__dirname){var JSON=global.JSON;if(typeof JSON!="object"||typeof JSON.stringify!="function"||typeof JSON.parse!="function")JSON=global.JSON={},function(){function f(a){return a<10?"0"+a:a}function quote(a){return escapable.lastIndex=0,escapable.test(a)?'"'+a.replace(escapable,function(a){var b=meta[a];return typeof b=="string"?b:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function str(a,b){var c,d,e,f,g=gap,h,i=b[a];i&&typeof i=="object"&&typeof i.toJSON=="function"&&(i=i.toJSON(a)),typeof rep=="function"&&(i=rep.call(b,a,i));switch(typeof i){case"string":return quote(i);case"number":return isFinite(i)?String(i):"null";case"boolean":case"null":return String(i);case"object":if(!i)return"null";gap+=indent,h=[];if(Object.prototype.toString.apply(i)==="[object Array]"){f=i.length;for(c=0;c<f;c+=1)h[c]=str(c,i)||"null";return e=h.length===0?"[]":gap?"[\n"+gap+h.join(",\n"+gap)+"\n"+g+"]":"["+h.join(",")+"]",gap=g,e}if(rep&&typeof rep=="object"){f=rep.length;for(c=0;c<f;c+=1)d=rep[c],typeof d=="string"&&(e=str(d,i),e&&h.push(quote(d)+(gap?": ":":")+e))}else for(d in i)Object.hasOwnProperty.call(i,d)&&(e=str(d,i),e&&h.push(quote(d)+(gap?": ":":")+e));return e=h.length===0?"{}":gap?"{\n"+gap+h.join(",\n"+gap)+"\n"+g+"}":"{"+h.join(",")+"}",gap=g,e}}"use strict",typeof Date.prototype.toJSON!="function"&&(Date.prototype.toJSON=function(a){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(a){return this.valueOf()});var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;typeof JSON.stringify!="function"&&(JSON.stringify=function(a,b,c){var d;gap="",indent="";if(typeof c=="number")for(d=0;d<c;d+=1)indent+=" ";else typeof c=="string"&&(indent=c);rep=b;if(!b||typeof b=="function"||typeof b=="object"&&typeof b.length=="number")return str("",{"":a});throw new Error("JSON.stringify")}),typeof JSON.parse!="function"&&(JSON.parse=function(text,reviver){function walk(a,b){var c,d,e=a[b];if(e&&typeof e=="object")for(c in e)Object.hasOwnProperty.call(e,c)&&(d=walk(e,c),d!==undefined?e[c]=d:delete e[c]);return reviver.call(a,b,e)}var j;text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)}));if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),typeof reviver=="function"?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}()}),_require.define("runtime/es5_object","runtime/es5_object.js",function(a,b,c,d,e){var f=Array.prototype.slice.call;Object.create||(Object.create=function(a,b){var c=function(){b&&Object.defineProperties&&Object.defineProperties(this,b)};return c.prototype=a,new c}),Object.keys||(Object.keys=function h(a){var h=[];for(var b in a)h.push(b);return h}),Object.getOwnPropertyNames||(Object.getOwnPropertyNames=function(){return Object.keys.apply(this,f(arguments))}),Object.getOwnPropertyDescriptor||(Object.getOwnPropertyDescriptor=function(a,b){if(a.hasOwnProperty(b))return{configurable:!0,enumerable:!0,value:a[b],writable:!0}}),Object.prototype.hasOwnProperty||(Object.prototype.hasOwnProperty=function(a){return a in this}),Object.defineProperty||Object.prototype.__defineGetter__&&Object.prototype.__defineSetter__&&(Object.defineProperty=function(a,b,c){if(typeof c=="object")if(c.hasOwnProperty("value")){!a.__lookupGetter__(b)&&!a.__lookupSetter__(b)&&(a[b]=c.value);if(c.hasOwnProperty("get")||c.hasOwnProperty("set"))throw new TypeError("Object doesn't support this action")}else typeof c.get=="function"&&a.__defineGetter__(b,c.get),typeof c.set=="function"&&a.__defineSetter__(b,c.set);return a}),!Object.defineProperties&&Object.defineProperty&&(Object.defineProperties=function(a,b){for(var c in b)Object.defineProperty(a,c,b[c])})}),_require.define("runtime/es5_string","runtime/es5_string.js",function(a,b,c,d,e){String.prototype.trim||(String.prototype.trim=function(){return this.replace(/^(?:\s|\u00A0)+/,"").replace(/(?:\s|\u00A0)+$/,"")}),String.prototype.trimLeft||(String.prototype.trimLeft=function(){return this.replace(/^(?:\s|\u00A0)+/,"")}),String.prototype.trimRight||(String.prototype.trimRight=function(){return this.replace(/(?:\s|\u00A0)+$/,"")})}),_require.define("runtime","runtime/index.js",function(a,b,c,d,e){a("./runtime_string"),global.Move||(global.Move={}),global.Move.runtime={_MoveKWArgsT:a("./symbols")._MoveKWArgsT,dprinter:function(){return function(){}}},global.Move.runtime=a("./runtime_move"),a("./preprocessors/ehtml")}),_require.define("runtime/preprocessors/ehtml","runtime/preprocessors/ehtml.mv",function(a,b,c,d,e){(function(){"use strict";var a,b,c,d,e,f,g,h,i,j,k,l,m,n;a=Move.runtime,b=a._MoveKWArgsT,c=a.Text,d=a.extend,e=a.create,f=a.print,g=a.repeat,h=a.after,i=a.JSON,j=a.__class,k=a.EventEmitter,l=typeof document!="undefined";if(!l){m=function(a){return a!==null&&typeof a=="object"&&a.__kw===b&&(arguments.keywords=a,a=a.html),{innerHTML:a}};return}return m=function p(a){a!==null&&typeof a=="object"&&a.__kw===b&&(arguments.keywords=a,a=a.html);var c;return p.spawnerElement||(p.spawnerElement=document.createElement("div")),p.spawnerElement.innerHTML=a,c=p.spawnerElement.firstChild,c},Move.EHTML=m,n=document.body&&document.body.classList,n?m.createViewImpl=function(){var a;return this.createView&&(a=this.createView.apply(this,arguments),a&&a instanceof Element&&a.classList.add(this.__domid)),a}:m.createViewImpl=function(){var a;return this.createView&&(a=this.createView.apply(this,arguments),a&&a instanceof Element&&(a.className+=" "+this.__domid)),a},n?m.classNameWrapper=function(a){return a!==null&&typeof a=="object"&&a.__kw===b&&(arguments.keywords=a,a=a.className),function(c){c!==null&&typeof c=="object"&&c.__kw===b&&(arguments.keywords=c,c=c.html);var d;return(d=Move.EHTML(c))&&d.classList.add(a),d}}:m.classNameWrapper=function(a){return a!==null&&typeof a=="object"&&a.__kw===b&&(arguments.keywords=a,a=a.className),a=" "+a,function(c){c!==null&&typeof c=="object"&&c.__kw===b&&(arguments.keywords=c,c=c.html);var d;if(d=Move.EHTML(c))d.className+=a;return d}}})()}),_require.define("runtime/runtime_array","runtime/runtime_array.js",function(a,b,c,d,e){typeof Array.prototype.unique!="function"&&(Array.prototype.unique=function(){var a=[],b,c,d=this.length;for(b=0;b<d;++b){for(c=b+1;c<d;++c)this[b]===this[c]&&(c=++b);a.push(this[b])}return a});if(typeof Array.prototype._move_setSlice!="function"){var f=Array.prototype.splice;Array.prototype._move_setSlice=function(a,b,c){var d;if(b!==undefined){if(typeof b!="number")throw new TypeError("Second argument must be a number");d=b-a}else d=this.length;return f.apply(this,[a,d].concat(c))}}}),_require.define("runtime/runtime_class","runtime/runtime_class.mv",function(a,b,c,d,e){(function(){"use strict";var a,b,d,e,f,g,h,i,j,k,l,m,n,k;return a=Move.runtime,b=a._MoveKWArgsT,d=a.Text,e=a.extend,f=a.create,g=a.print,h=a.repeat,i=a.after,j=a.JSON,k=a.__class,l=a.EventEmitter,m=Object.prototype.constructor,n=typeof Object.prototype.__proto__=="object"?"__proto__":"prototype",c.__class=k=function(){var a,c,d,e,f;a=arguments[0];if(arguments.length===3){c=arguments[1],d=arguments[2];if((e=typeof d)!=="object"&&e!=="function")throw TypeError("unexpected type "+e+" of second argument (expected object)")}else if(arguments.length===2){d=arguments[1];if((e=typeof d)==="function")c=d,d=undefined;else if(e!=="object")throw TypeError("unexpected type "+e+" of first argument (expected object or function)")}return d&&d.__kw===b&&delete d.__kw,c&&(f=Object.create(c.prototype||null),d&&Object.keys(d).forEach(function(a){a!==null&&typeof a=="object"&&a.__kw===b&&(arguments.keywords=a,a=a.key);var c;if((c=d[a])!==undefined)return f[a]=c}),d=f),a.prototype=d||null,a.constructor=undefined,a},k.create=function(){var a,b,c,d;return a=arguments[0],b=arguments[1],c=Object.create(a.prototype),(d=c.constructor)&&d!==m&&typeof d=="function"?d.apply(c,b):typeof b[0]=="object"&&e(c,b[0]),c}})()}),_require.define("runtime/runtime_date","runtime/runtime_date.mv",function(a,b,c,d,e){(function(){"use strict";var a,b,c,d,e,f,g,h,i,j,k;a=Move.runtime,b=a._MoveKWArgsT,c=a.Text,d=a.extend,e=a.create,f=a.print,g=a.repeat,h=a.after,i=a.JSON,j=a.__class,k=a.EventEmitter,Date.distantFuture===undefined&&(Date.distantFuture=new Date(359753450957352)),Date.distantPast===undefined&&(Date.distantPast=new Date(-621356868e5)),Date.nowUTC||(Date.nowUTC=function(){return(new Date).getUTCTime()}),Date.prototype.getUTCTime||(Date.prototype.getUTCTime=function(){return this.getTime()-this.getTimezoneOffset()});if(!Date.prototype.getUTCComponents)return Date.prototype.getUTCComponents=function(){return[this.getUTCFullYear(),this.getUTCMonth()+1,this.getUTCDate(),this.getUTCHours(),this.getUTCMinutes(),this.getUTCSeconds(),this.getUTCMilliseconds()]}})()}),_require.define("runtime/runtime_events","runtime/runtime_events.mv",function(a,b,c,d,e){(function(){"use strict";var a,b,d,e,f,g,h,i,j,k,l;return a=Move.runtime,b=a._MoveKWArgsT,d=a.Text,e=a.extend,f=a.create,g=a.print,h=a.repeat,i=a.after,j=a.JSON,k=a.__class,l=a.EventEmitter,l=c.EventEmitter=k(l=function m(){return k.create(m,arguments)},{on:function(a,c){a!==null&&typeof a=="object"&&a.__kw===b&&(arguments.keywords=a,c=a.invoke,a=a.event);var d;return this.eventListeners?(d=this.eventListeners[a])?d.push(c):this.eventListeners[a]=[c]:(Object.defineProperty(this,"eventListeners",{value:{}}),this.eventListeners[a]=[c])},emit:function(){var a,b,c,d,e;a=arguments[0];if(this.eventListeners&&(b=this.eventListeners[a])){c=Array.prototype.slice.call(arguments,1);for(d=0,e=b.length;d<e;++d)b[d]&&b[d].apply(this,c)}},removeEventListener:function(a,c){a!==null&&typeof a=="object"&&a.__kw===b&&(arguments.keywords=a,c=a.callback,a=a.event);var d,e;if(this.eventListeners)return c&&(d=this.eventListeners[a])?(e=d.indexOf(c),d.splice(e,1)):this.eventListeners[a]=undefined}}),c.EventEmitter.enableFor=function(a){return a!==null&&typeof a=="object"&&a.__kw===b&&(arguments.keywords=a,a=a.object),e(a,c.EventEmitter.prototype)}})()}),_require.define("runtime/runtime_inspect","runtime/runtime_inspect.js",function(a,b,c,d,e){function f(a){return a instanceof Array||Array.isArray(a)||a&&a!==Object.prototype&&f(a.prototype)}function g(a){var b=""+a;return a instanceof RegExp||typeof a=="function"&&a.constructor.name==="RegExp"&&a.compile&&a.test&&a.exec&&b.match(/^\/.*\/[gim]{0,3}$/)}function h(a){if(a instanceof Date)return!0;if(typeof a!="object")return!1;var b=Date.prototype&&Object.getOwnPropertyNames(Date.prototype),c=a.__proto__&&Object.getOwnPropertyNames(a.__proto__);return JSON.stringify(c)===JSON.stringify(b)}c.inspect=function(a,b,d,e){function k(a,d){if(a&&typeof a.inspect=="function"&&a!==c&&a.inspect!==c.inspect&&(!a.constructor||a.constructor.prototype!==a))return a.inspect(d);switch(typeof a){case"undefined":return j("undefined","undefined");case"string":var e=JSON.stringify(a).replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'");return j(e,"string");case"number":return j(""+a,"number");case"boolean":return j(""+a,"boolean")}if(a===null)return j("null","null");var l=Object.keys(a),m=b?Object.getOwnPropertyNames(a):l;if(typeof a=="function"&&m.length===0){if(g(a))return j(""+a,"regexp");var n=a.name?": "+a.name:"";return j("[Function"+n+"]","special")}if(h(a)&&m.length===0)return j(a.toUTCString(),"date");var o,p,q;f(a)?(p="Array",q=["[","]"]):(p="Object",q=["{","}"]);if(typeof a=="function"){var r=a.name?": "+a.name:"";o=g(a)?" "+a:" [Function"+r+"]"}else o="";h(a)&&(o=" "+a.toUTCString());if(m.length===0)return q[0]+o+q[1];if(d<0)return g(a)?j(""+a,"regexp"):j("[Object]","special");i.push(a);var s=m.map(function(b){var c,e;a.__lookupGetter__&&(a.__lookupGetter__(b)?a.__lookupSetter__(b)?e=j("[Getter/Setter]","special"):e=j("[Getter]","special"):a.__lookupSetter__(b)&&(e=j("[Setter]","special"))),l.indexOf(b)<0&&(c="["+b+"]"),e||(i.indexOf(a[b])<0?(d===null?e=k(a[b]):e=k(a[b],d-1),e.indexOf("\n")>-1&&(f(a)?e=e.split("\n").map(function(a){return"  "+a}).join("\n").substr(2):e="\n"+e.split("\n").map(function(a){return"   "+a}).join("\n"))):e=j("[Circular]","special"));if(typeof c=="undefined"){if(p==="Array"&&b.match(/^\d+$/))return e;c=JSON.stringify(""+b),c.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?(c=c.substr(1,c.length-2),c=j(c,"name")):(c=c.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'"),c=j(c,"string"))}return c+": "+e});i.pop();var t=0,u=s.reduce(function(a,b){return t++,b.indexOf("\n")>=0&&t++,a+b.length+1},0);return u>50?s=q[0]+(o===""?"":o+"\n ")+" "+s.join(",\n  ")+" "+q[1]:s=q[0]+o+" "+s.join(", ")+" "+q[1],s}var i=[],j=function(a,b){return a};return k(a,typeof d=="undefined"?2:d)}}),_require.define("runtime/runtime_move","runtime/runtime_move.mv",function(a,b,c,d,e){(function(){"use strict";var b,d,e,f,g,h,i,j,k,l,m,n,o,f,g,i,j,p;b=Move.runtime,d=b._MoveKWArgsT,e=b.Text,f=b.extend,g=b.create,h=b.print,i=b.repeat,j=b.after,k=b.JSON,l=b.__class,m=b.EventEmitter,d=global.Move.runtime._MoveKWArgsT,n=typeof process!="undefined"&&!!(typeof process.versions=="object"&&process.versions.node||process.pid),n||(a("./es5_object"),a("./es5_array"),a("./es5_date"),a("./es5_json")),a("./runtime_object"),a("./runtime_string"),a("./runtime_date"),a("./runtime_array"),Object.defineProperty?o=function(a,b,c){return a!==null&&typeof a=="object"&&a.__kw===d&&(arguments.keywords=a,c=a.value,b=a.name,a=a.obj),Object.defineProperty(a,b,{value:c,writable:!1,enumerable:!0,configurable:!1})}:o=function(a,b,c){return a!==null&&typeof a=="object"&&a.__kw===d&&(arguments.keywords=a,c=a.value,b=a.name,a=a.obj),a[b]=c},o(c,"_MoveKWArgsT",d),o(c,"Text",String),String.prototype.toText=String.prototype.toString,c.extend=f=function(a,b,c){a!==null&&typeof a=="object"&&a.__kw===d&&(arguments.keywords=a,c=a.onlyOwnProperties,b=a.body,a=a.object);var e;e=b===null?"undefined":typeof b;if(e==="object"||e==="function")Object.prototype.forEach.call(b,function(b,c){b!==null&&typeof b=="object"&&b.__kw===d&&(arguments.keywords=b,c=b.value,b=b.key);if(c!==undefined&&c!==d)return a[b]=c},null,c);else if(e!=="undefined")throw new TypeError('"body" argument must be either an object or a function, not a '+e);return a},c.create=g=function(a,b){return a!==null&&typeof a=="object"&&a.__kw===d&&(arguments.keywords=a,b=a.body,a=a.prototype),f(Object.create(a),b)};if(typeof Object.inspect!="function")try{Object.inspect=a("util").inspect;if(typeof Object.inspect!="function")throw 1}catch(q){Object.inspect=a("./runtime_inspect").inspect}return typeof console!="undefined"&&console.log?typeof window!="undefined"?c.print=function(){return console.log.apply(console,Array.prototype.slice.call(arguments))}:c.print=console.log:c.print=function(){},c.dprinter=function(a){return a!==null&&typeof a=="object"&&a.__kw===d&&(arguments.keywords=a,a=a.module),function(){return c.print.apply(null,["["+a.id+"]"].concat(Array.prototype.slice.call(arguments)))}},c.repeat=i=function(a,b,c){a!==null&&typeof a=="object"&&a.__kw===d&&(arguments.keywords=a,c=a.block,b=a.every,a=a.times);var e,f;if(typeof a=="function"){for(;;)if(!a())break;return}if(typeof c!="function")return function(c){c!==null&&typeof c=="object"&&c.__kw===d&&(arguments.keywords=c,c=c.block);if(a!==undefined){for(e=0;e<a;++e)if(c(e)===!0)break}else{if(b!==undefined)return f=Object.create({},{cancel:{value:function(){return clearInterval(this.id)}}}),f.id=setInterval(function(){return c(f)},b),f;for(;;)if(!c())break}};if(a!==undefined){for(e=0;e<a;++e)if(c(e)===!0)break}else{if(b!==undefined)return f=Object.create({},{cancel:{value:function(){return clearInterval(this.id)}}}),f.id=setInterval(function(){return c(f)},b),f;for(;;)if(!c())break}},c.after=j=function(a,b,c){a!==null&&typeof a=="object"&&a.__kw===d&&(arguments.keywords=a,c=a.target,b=a.date,a=a.delay);if(a){if(typeof a!="number")throw new TypeError('"delay" argument must be a number')}else if(b){if(typeof b=="string"||typeof b=="number"){b=new Date(b);if(isNaN(b.getTime()))throw new Error('Invalid date/time passed for "date" argument')}else if(typeof b!="object"||!(b instanceof Date))throw new TypeError('"date" argument must be a Date object or a string');a=Math.max(0,b.getTime()-(new Date).getTime())}return function(b){b!==null&&typeof b=="object"&&b.__kw===d&&(arguments.keywords=b,b=b.block);var e;return c?e=function(){return b.apply(c,arguments)}:e=b,setTimeout(e,a)}},k=global.JSON,p=function(a,b){return a!==null&&typeof a=="object"&&a.__kw===d&&(arguments.keywords=a,b=a.parse,a=a.build),a!==undefined||b===undefined?k.stringify(a):k.parse(b)},p.parse=k.parse,p.stringify=k.stringify,c.JSON=p,global.Move.runtime=c,c.__class=a("./runtime_class").__class,c.EventEmitter=a("./runtime_events").EventEmitter})()}),_require.define("runtime/runtime_object","runtime/runtime_object.js",function(a,b,c,d,e){if(!Object.prototype.forEach){var f=function(a,b,c){if(!b||typeof b!="object"&&typeof b!="function")b=this;if(typeof a!="function")throw new TypeError("First argument is not a function");var d=this,e;if(c)Object.keys(this).forEach(function(c){a.call(b,c,d[c],d)});else for(e in this)a.call(b,e,d[e],d);return this};Object.defineProperty&&Object.defineProperty(Object.prototype,"forEach",{value:f})}}),_require.define("runtime/runtime_string","runtime/runtime_string.js",function(a,b,c,d,e){String.prototype.repeat||(String.prototype.repeat=function(a){s="";while(a--)s+=this;return s}),String.prototype.padLeft||(String.prototype.padLeft=function(a,b){return this.length>=a?this:String(b||" ").repeat(a-this.length)+this}),String.prototype.padRight||(String.prototype.padRight=function(a,b){return this.length>=a?this:this+String(b||" ").repeat(a-this.length)}),String.prototype.editDistance||(String.prototype.editDistance=function i(a){var b,c=(b=this.split("")).length,d=(a=a.split("")).length,e,f,g,h;if(!c&&!d)return Math.max(c,d);for(var i=[],e=c+1;e;i[--e]=[e]);for(e=d+1;i[0][--e]=e;);for(e=-1,g=b.length;++e<g;)for(f=-1,h=a.length;++f<h;)i[(e*=1)+1][(f*=1)+1]=Math.min(i[e][f+1]+1,i[e+1][f]+1,i[e][f]+(b[e]!=a[f]));return i[c][d]}),String.prototype.matchAll||(String.prototype.matchAll=function(a){"use strict",a instanceof RegExp?a.global||(a=new RegExp(a.source,"g")):a=new RegExp(a,"g");var b,c=[];while(b=a.exec(this))c.push(b);return c}),String.prototype.forEachMatch||(String.prototype.forEachMatch=function(a,b,c){return"use strict",c||(c=this),this.matchAll(a).forEach(b,c),c}),typeof String.prototype.toLocaleLowerCase=="function"&&(String.prototype.toLowerCase=String.prototype.toLocaleLowerCase),typeof String.prototype.toLocaleUpperCase=="function"&&(String.prototype.toUpperCase=String.prototype.toLocaleUpperCase)}),_require.define("runtime/symbols","runtime/symbols.js",function(a,b,c,d,e){c._MoveKWArgsT=function f(a){return a.__kw=f,a}}),_require("runtime");var move=global.Move;return move.version=function(){return"0.4.5"},move.require=Require(),move}())

Move.require.define("UILayer/UIFrame","UILayer/UIFrame.mv",function(require,module,exports){
  var M, _MoveKWArgsT, Text, extend, create, print, dprint, repeat, after, JSON, __class, EventEmitter, EHTML, mkCSSPixelValueProperty, UIFrame;
  M = Move.runtime, _MoveKWArgsT = M._MoveKWArgsT, Text = M.Text, extend = M.extend, create = M.create, print = M.print, dprint = M.dprinter(module), repeat = M.repeat, after = M.after, JSON = M.JSON, __class = M.__class, EventEmitter = M.EventEmitter;
  EHTML = Move.EHTML;
  mkCSSPixelValueProperty = function mkCSSPixelValueProperty(name, defaultValue) {
    name !== null && typeof name === "object" && name.__kw === _MoveKWArgsT && (arguments.keywords = name, defaultValue = name.defaultValue, name = name.name);
    if (defaultValue === undefined) defaultValue = 0;
    return {
      enumerable: true,
      get: function () {
        var v;
        if (v = this.layer.element.style.getPropertyCSSValue(name)) {
          if (v.primitiveType === CSSPrimitiveValue.CSS_PX) return v.getFloatValue(CSSPrimitiveValue.CSS_PX);
        }
        return defaultValue;
      },
      set: function (value) {
        value !== null && typeof value === "object" && value.__kw === _MoveKWArgsT && (arguments.keywords = value, value = value.value);
        var oldValues;
        oldValues = {};
        oldValues[name] = this[name];
        if (value === undefined || value === null) {
          this.layer.element.style.removeProperty(name);
        } else if (typeof value === "number") {
          this.layer.element.style.setProperty(name, value + "px", null);
        } else {
          this.layer.element.style.setProperty(name, Text(value), null);
        }
        if (!this.layer.eventsMuted) return this.layer.emit("change:frame", {
          oldValues: oldValues
        });
      }
    };
  };
  module.exports = exports = UIFrame = __class(UIFrame = function UIFrame() {
    return __class.create(UIFrame, arguments);
  }, {
    constructor: function (layer) {
      layer !== null && typeof layer === "object" && layer.__kw === _MoveKWArgsT && (arguments.keywords = layer, layer = layer.layer);
      return Object.defineProperty(this, "layer", {
        value: layer
      });
    },
    toString: function () {
      return "{x:" + this.x + ", y:" + this.y + ", z:" + this.z + ", width:" + this.width + ", height:" + this.height + "}";
    }
  });
  return Object.defineProperties(UIFrame.prototype, {
    width: mkCSSPixelValueProperty("width", -1),
    height: mkCSSPixelValueProperty("height", -1),
    x: {
      enumerable: true,
      get: function () {
        return this.layer.matrix.m41;
      },
      set: function () {
        var matrix;
        matrix = this.layer.matrix;
        matrix.m41 = arguments[0];
        return this.layer.matrix = matrix;
      }
    },
    y: {
      enumerable: true,
      get: function () {
        return this.layer.matrix.m42;
      },
      set: function () {
        var matrix;
        matrix = this.layer.matrix;
        matrix.m42 = arguments[0];
        return this.layer.matrix = matrix;
      }
    },
    z: {
      enumerable: true,
      get: function () {
        return this.layer.matrix.m43;
      },
      set: function () {
        var matrix;
        matrix = this.layer.matrix;
        matrix.m43 = arguments[0];
        return this.layer.matrix = matrix;
      }
    }
  });
});
Move.require.define("UILayer/UILayer","UILayer/UILayer.mv",function(require,module,exports){
  var M, _MoveKWArgsT, Text, extend, create, print, dprint, repeat, after, JSON, __class, EventEmitter, EHTML, UIFrame, classNames, addClassName, hasClassName, removeClassName, DEPRECATED_WARN, DEPRECATED_PROPERTY_WARNINGS, DEPRECATED_PROPERTY, _canonicalColor, _swapElement, kSpecialProperties, UILayer, isTouchDevice, touchEventsToMouseEvents, makeFakeTouchEvent, UIEvent, FocusEvent, MouseEvent, TouchEvent, WheelEvent, TextEvent, KeyboardEvent, CompositionEvent, MutationEvent, MutationNameEvent, CustomEvent, TransitionEvent, kEventClasses, RotationProxy, head, baseStyle;
  M = Move.runtime, _MoveKWArgsT = M._MoveKWArgsT, Text = M.Text, extend = M.extend, create = M.create, print = M.print, dprint = M.dprinter(module), repeat = M.repeat, after = M.after, JSON = M.JSON, __class = M.__class, EventEmitter = M.EventEmitter;
  EHTML = Move.EHTML;
  UIFrame = require("./UIFrame");
  if (!document.documentElement || document.documentElement.classList) {
    classNames = function classNames(el) {
      el !== null && typeof el === "object" && el.__kw === _MoveKWArgsT && (arguments.keywords = el, el = el.el);
      return el.classList;
    };
    addClassName = function addClassName(el, className) {
      el !== null && typeof el === "object" && el.__kw === _MoveKWArgsT && (arguments.keywords = el, className = el.className, el = el.el);
      return el.classList.add(className);
    };
    hasClassName = function hasClassName(el, className) {
      el !== null && typeof el === "object" && el.__kw === _MoveKWArgsT && (arguments.keywords = el, className = el.className, el = el.el);
      return el.classList.contains(className);
    };
    removeClassName = function removeClassName(el, className) {
      el !== null && typeof el === "object" && el.__kw === _MoveKWArgsT && (arguments.keywords = el, className = el.className, el = el.el);
      return el.classList.remove(className);
    };
  } else {
    classNames = function classNames(el) {
      el !== null && typeof el === "object" && el.__kw === _MoveKWArgsT && (arguments.keywords = el, el = el.el);
      return el.className.split(/\s+/);
    };
    addClassName = function addClassName(el, className) {
      el !== null && typeof el === "object" && el.__kw === _MoveKWArgsT && (arguments.keywords = el, className = el.className, el = el.el);
      return el.className += " " + className;
    };
    hasClassName = function hasClassName(el, className) {
      el !== null && typeof el === "object" && el.__kw === _MoveKWArgsT && (arguments.keywords = el, className = el.className, el = el.el);
      return classNames(el).indexOf(className) !== -1;
    };
    removeClassName = function removeClassName(el, className) {
      el !== null && typeof el === "object" && el.__kw === _MoveKWArgsT && (arguments.keywords = el, className = el.className, el = el.el);
      return el.className = classNames(el).filter(function (n) {
        n !== null && typeof n === "object" && n.__kw === _MoveKWArgsT && (arguments.keywords = n, n = n.n);
        return n !== className;
      }).join(" ");
    };
  }
  DEPRECATED_WARN = function DEPRECATED_WARN(oldName, newName) {
    oldName !== null && typeof oldName === "object" && oldName.__kw === _MoveKWArgsT && (arguments.keywords = oldName, newName = oldName.newName, oldName = oldName.oldName);
    return console.warn(oldName + " is deprecated." + (newName ? " Use " + newName + " instead." : ""));
  };
  DEPRECATED_PROPERTY_WARNINGS = {};
  DEPRECATED_PROPERTY = function DEPRECATED_PROPERTY(oldName, newName) {
    oldName !== null && typeof oldName === "object" && oldName.__kw === _MoveKWArgsT && (arguments.keywords = oldName, newName = oldName.newName, oldName = oldName.oldName);
    return {
      get: function () {
        if (!DEPRECATED_PROPERTY_WARNINGS["get " + oldName]) {
          DEPRECATED_WARN(oldName, newName);
          DEPRECATED_PROPERTY_WARNINGS["get " + oldName] = true;
        }
        return this[newName];
      },
      set: function (value) {
        value !== null && typeof value === "object" && value.__kw === _MoveKWArgsT && (arguments.keywords = value, value = value.value);
        if (!DEPRECATED_PROPERTY_WARNINGS["set " + oldName]) {
          DEPRECATED_WARN(oldName, newName);
          DEPRECATED_PROPERTY_WARNINGS["set " + oldName] = true;
        }
        return this[newName] = value;
      }
    };
  };
  _canonicalColor = function _canonicalColor(color) {
    color !== null && typeof color === "object" && color.__kw === _MoveKWArgsT && (arguments.keywords = color, color = color.color);
    var rgb;
    if (Array.isArray(color)) {
      if (color.length === 1) {
        color = [ color, color, color ];
      } else if (color.length === 2) {
        color = [ color[0], color[0], color[0], color[1] ];
      }
      rgb = (255 * Number(color[0] || 0)).toFixed(0) + "," + (255 * Number(color[1] || 0)).toFixed(0) + "," + (255 * Number(color[2] || 0)).toFixed(0);
      if (color[3] !== undefined) {
        color = "rgba(" + rgb + "," + Number(color[3] || 0) + ")";
      } else {
        color = "rgb(" + rgb + ")";
      }
    } else {
      color = Text(color);
    }
    return color;
  };
  _swapElement = function _swapElement(parentNode, oldElement, newElement, deep) {
    parentNode !== null && typeof parentNode === "object" && parentNode.__kw === _MoveKWArgsT && (arguments.keywords = parentNode, deep = parentNode.deep, newElement = parentNode.newElement, oldElement = parentNode.oldElement, parentNode = parentNode.parentNode);
    var newAttrs, oldAttributes, otherUILayer;
    newAttrs = newElement.attributes;
    oldAttributes = oldElement.attributes;
    Array.prototype.slice.call(oldAttributes).forEach(function (attr) {
      attr !== null && typeof attr === "object" && attr.__kw === _MoveKWArgsT && (arguments.keywords = attr, attr = attr.attr);
      oldAttributes.removeNamedItem(attr.name);
      return newAttrs.setNamedItem(attr);
    });
    if (deep) {
      Array.prototype.forEach.call(oldElement.childNodes, function (childNode) {
        childNode !== null && typeof childNode === "object" && childNode.__kw === _MoveKWArgsT && (arguments.keywords = childNode, childNode = childNode.childNode);
        return newElement.appendChild(childNode);
      });
    }
    if (parentNode) {
      parentNode.replaceChild(newElement, oldElement);
    }
    otherUILayer = newElement.UILayer;
    newElement.UILayer = oldElement.UILayer;
    oldElement.UILayer = otherUILayer;
    return newElement;
  };
  kSpecialProperties = {
    element: 1,
    debug: 1,
    x: 1,
    y: 1,
    width: 1,
    height: 1,
    className: 1,
    ownerDocument: 1
  };
  module.exports = UILayer = __class(UILayer = function UILayer() {
    return __class.create(UILayer, arguments);
  }, {
    constructor: function () {
      var kwargs, element;
      kwargs = typeof arguments[0] === "object" ? arguments[0] : arguments.keywords || {};
      element = kwargs.element;
      if (!element || typeof element !== "object" || !(element instanceof HTMLElement)) {
        element = (kwargs.ownerDocument || document).createElement(kwargs.drawContent ? "canvas" : "div");
      }
      element.UILayer = this;
      kwargs.element = undefined;
      addClassName(element, "uilayer");
      if (this.className) addClassName(element, this.className);
      if (kwargs.className) addClassName(element, kwargs.className);
      this.element_ = element;
      Object.defineProperties(this, {
        element: {
          enumerable: true,
          get: function () {
            return this.element_;
          }
        }
      });
      addClassName(this.element_, "textureBacked");
      this._is3DBacked = true;
      if (kwargs.x !== undefined) this.frame.x = kwargs.x;
      if (kwargs.y !== undefined) this.frame.y = kwargs.y;
      if (kwargs.width !== undefined) this.frame.width = kwargs.width;
      if (kwargs.height !== undefined) this.frame.height = kwargs.height;
      if (kwargs.debug || kwargs.debug === undefined && UILayer.debug) element.style.backgroundColor = "hsla(" + Math.random() * 359 + ", 90%, 90%, 0.5)";
      if (!kwargs.anchor) {
        element.style.left = "0";
        element.style.top = "0";
      }
      return Object.prototype.forEach.call(kwargs, function (key, value) {
        key !== null && typeof key === "object" && key.__kw === _MoveKWArgsT && (arguments.keywords = key, value = key.value, key = key.key);
        if (value !== undefined && value !== _MoveKWArgsT && !(key in kSpecialProperties)) return this[key] = value;
      }, this);
    },
    drawContentAfterFrameSizeChange: function (ev) {
      ev !== null && typeof ev === "object" && ev.__kw === _MoveKWArgsT && (arguments.keywords = ev, ev = ev.ev);
      var oldValues;
      if (!ev || !(oldValues = ev.oldValues) || "width" in oldValues || "height" in oldValues) {
        this.element_.width = this.frame.width;
        this.element_.height = this.frame.height;
        return this.drawContent_();
      }
    }
  });
  UILayer.layersInElement = function layersInElement(element) {
    element !== null && typeof element === "object" && element.__kw === _MoveKWArgsT && (arguments.keywords = element, element = element.element);
    var sublayers, cn, i, el;
    sublayers = [];
    cn = element.childNodes;
    for (i = 0; i < cn.length; ++i) {
      el = cn[i];
      if (el.UILayer && UILayer.prototype.isPrototypeOf(el.UILayer)) sublayers.push(el.UILayer);
    }
    return sublayers;
  };
  UILayer.firstLayerInElement = function firstLayerInElement(element) {
    element !== null && typeof element === "object" && element.__kw === _MoveKWArgsT && (arguments.keywords = element, element = element.element);
    var cn, i, el;
    cn = element.childNodes;
    for (i = 0; i < cn.length; ++i) {
      el = cn[i];
      if (el.UILayer && UILayer.prototype.isPrototypeOf(el.UILayer)) return el.UILayer;
    }
  };
  UILayer.layerWithTag = function layerWithTag(tag) {
    tag !== null && typeof tag === "object" && tag.__kw === _MoveKWArgsT && (arguments.keywords = tag, tag = tag.tag);
    var el;
    el = document.getElementById(Text(tag));
    return el && el.UILayer && UILayer.prototype.isPrototypeOf(el.UILayer) && el.UILayer;
  };
  UILayer.toString = function toString() {
    return "[object UILayer]";
  };
  UILayer.properties = {
    is3DBacked: {
      get: function () {
        return !!this._is3DBacked;
      }
    },
    sublayers: {
      get: function () {
        return this.drawContent_ ? [] : UILayer.layersInElement(this.element_);
      },
      set: function (sublayers) {
        sublayers !== null && typeof sublayers === "object" && sublayers.__kw === _MoveKWArgsT && (arguments.keywords = sublayers, sublayers = sublayers.sublayers);
        if (!Array.isArray(sublayers)) throw TypeError("sublayers argument must be an array of UILayers");
        this.sublayers.forEach(function (sublayer) {
          sublayer !== null && typeof sublayer === "object" && sublayer.__kw === _MoveKWArgsT && (arguments.keywords = sublayer, sublayer = sublayer.sublayer);
          return this.element_.removeChild(sublayer);
        });
        return sublayers.forEach(function (sublayer) {
          sublayer !== null && typeof sublayer === "object" && sublayer.__kw === _MoveKWArgsT && (arguments.keywords = sublayer, sublayer = sublayer.sublayer);
          return this.addSublayer(sublayer);
        }, this);
      }
    },
    firstSublayer: {
      get: function () {
        return this.drawContent_ ? undefined : UILayer.firstLayerInElement(this.element_);
      }
    },
    superlayer: {
      get: function () {
        var pel;
        return (pel = this.element_.parentNode) && pel.UILayer && UILayer.prototype.isPrototypeOf(pel.UILayer) && pel.UILayer;
      }
    },
    perspective: {
      get: function () {
        var v;
        return (v = this.style.getPropertyCSSValue("-webkit-perspective")) && v.getFloatValue(CSSPrimitiveValue.CSS_NUMBER) || 0;
      },
      set: function (distance) {
        distance !== null && typeof distance === "object" && distance.__kw === _MoveKWArgsT && (arguments.keywords = distance, distance = distance.distance);
        return this.element_.style.webkitPerspective = distance || "none";
      }
    },
    perspectiveOrigin: {
      get: function () {
        var style, v;
        style = this.element_.style;
        return [ (v = style.getPropertyCSSValue("-webkit-perspective-origin-x")) && (v.getFloatValue(CSSPrimitiveValue.CSS_PERCENTAGE) || .5) / 100, (v = style.getPropertyCSSValue("-webkit-perspective-origin-y")) && (v.getFloatValue(CSSPrimitiveValue.CSS_PERCENTAGE) || .5) / 100, (v = style.getPropertyCSSValue("-webkit-perspective-origin-z")) && (v.getFloatValue(CSSPrimitiveValue.CSS_PERCENTAGE) || 0) / 100 ];
      },
      set: function (distance) {
        distance !== null && typeof distance === "object" && distance.__kw === _MoveKWArgsT && (arguments.keywords = distance, distance = distance.distance);
        if (Array.isArray(distance)) distance = distance[0] * 100 + "% " + (distance[1] || .5) * 100 + "% " + (distance[2] || 0) * 100 + "%";
        return this.element_.style.webkitPerspectiveOrigin = distance;
      }
    },
    preserve3d: {
      get: function () {
        return this.element_.style.webkitTransformStyle === "preserve-3d";
      },
      set: function (preserve3d) {
        preserve3d !== null && typeof preserve3d === "object" && preserve3d.__kw === _MoveKWArgsT && (arguments.keywords = preserve3d, preserve3d = preserve3d.preserve3d);
        if (preserve3d) {
          return this.element_.style.setProperty("-webkit-transform-style", "preserve-3d", null);
        } else {
          return this.element_.style.removeProperty("-webkit-transform-style");
        }
      }
    },
    anchor: {
      get: function () {
        var anchor, style, readValue;
        anchor = {};
        style = this.style;
        readValue = function readValue(name) {
          name !== null && typeof name === "object" && name.__kw === _MoveKWArgsT && (arguments.keywords = name, name = name.name);
          var v;
          if ((v = style.getPropertyCSSValue(name)) && v.primitiveType !== CSSPrimitiveValue.CSS_IDENT) {
            return anchor[name] = v.primitiveType === CSSPrimitiveValue.CSS_PX ? v.getFloatValue(CSSPrimitiveValue.CSS_NUMBER) : v.cssText;
          }
        };
        readValue("left");
        readValue("top");
        readValue("right");
        readValue("bottom");
        return anchor;
      },
      set: function (anchor) {
        anchor !== null && typeof anchor === "object" && anchor.__kw === _MoveKWArgsT && (arguments.keywords = anchor, anchor = anchor.anchor);
        var t, r, b, l, style;
        t = r = b = l = undefined;
        if (typeof anchor === "string") {
          anchor.split(/\s+/).forEach(function (word) {
            word !== null && typeof word === "object" && word.__kw === _MoveKWArgsT && (arguments.keywords = word, word = word.word);
            switch (word[0].toLowerCase()) {
             case "b":
              b = "0";
              break;
             case "l":
              l = "0";
              break;
             case "r":
              r = "0";
              break;
             case "t":
              t = "0";
              break;
            }
          });
        } else if (typeof anchor === "object") {
          if ((t = anchor.top) && typeof t === "number") t += "px";
          if ((r = anchor.right) && typeof r === "number") r += "px";
          if ((b = anchor.bottom) && typeof b === "number") b += "px";
          if ((l = anchor.left) && typeof l === "number") l += "px";
        } else if (!anchor) {
          throw TypeError("Value of anchor must be a string or object");
        }
        style = this.style;
        t === undefined ? style.removeProperty("top") : style.top = t;
        r === undefined ? style.removeProperty("right") : style.right = r;
        b === undefined ? style.removeProperty("bottom") : style.bottom = b;
        return l === undefined ? style.removeProperty("left") : style.left = l;
      }
    },
    frame: {
      get: function () {
        var frame_;
        if (!(frame_ = this.frame_)) {
          frame_ = UIFrame(this);
          Object.defineProperty(this, "frame_", {
            value: frame_
          });
        }
        return frame_;
      },
      set: function (frame) {
        frame !== null && typeof frame === "object" && frame.__kw === _MoveKWArgsT && (arguments.keywords = frame, frame = frame.frame);
        var frame_, eventsMuted, oldValues;
        if (typeof frame !== "object") throw TypeError("not an object");
        frame_ = this.frame;
        eventsMuted = this.eventsMuted;
        this.eventsMuted = true;
        oldValues = {};
        frame.forEach(function (name, value) {
          name !== null && typeof name === "object" && name.__kw === _MoveKWArgsT && (arguments.keywords = name, value = name.value, name = name.name);
          oldValues[name] = frame_[name];
          return frame_[name] = value;
        });
        if (!(this.eventsMuted = eventsMuted)) {
          return this.emit("change:frame", {
            oldValues: oldValues
          });
        }
      }
    },
    computedBounds: {
      get: function () {
        var style, bounds, v;
        style = this.computedStyle;
        bounds = {
          width: 0,
          height: 0
        };
        if ((v = style.getPropertyCSSValue("width")) && v.primitiveType === CSSPrimitiveValue.CSS_PX) {
          bounds.width = v.getFloatValue(CSSPrimitiveValue.CSS_PX);
        } else {
          bounds.width = -1;
        }
        if ((v = style.getPropertyCSSValue("height")) && v.primitiveType === CSSPrimitiveValue.CSS_PX) {
          bounds.height = v.getFloatValue(CSSPrimitiveValue.CSS_PX);
        } else {
          bounds.height = -1;
        }
        return bounds;
      }
    },
    rotation: {
      get: function () {
        var rotation_;
        if (!(rotation_ = this.rotation_)) {
          rotation_ = RotationProxy(this);
          Object.defineProperty(this, "rotation_", {
            value: rotation_
          });
        }
        return rotation_;
      },
      set: function (values) {
        values !== null && typeof values === "object" && values.__kw === _MoveKWArgsT && (arguments.keywords = values, values = values.values);
        var oldValues, x, y, z;
        if (typeof values !== "object") throw TypeError("not an object");
        oldValues = {};
        if ((x = values.x) !== this.rotateX_) {
          oldValues.x = this.rotateX_;
          this.rotateX_ = x;
        }
        if ((y = values.y) !== this.rotateY_) {
          oldValues.y = this.rotateY_;
          this.rotateY_ = y;
        }
        if ((z = values.z) !== this.rotateZ_) {
          oldValues.z = this.rotateZ_;
          this.rotateZ_ = z;
        }
        this.matrix = this.matrix;
        return this.emit("change:rotation", {
          oldValues: oldValues
        });
      }
    },
    computedStyle: {
      get: function () {
        return window.getComputedStyle(this.element_);
      }
    },
    style: {
      get: function () {
        return this.element_.style;
      },
      set: function (style) {
        style !== null && typeof style === "object" && style.__kw === _MoveKWArgsT && (arguments.keywords = style, style = style.style);
        var style_;
        style_ = this.element_.style;
        return style.forEach(function (k, v) {
          k !== null && typeof k === "object" && k.__kw === _MoveKWArgsT && (arguments.keywords = k, v = k.v, k = k.k);
          return style_[k] = v;
        });
      }
    },
    classNames: {
      get: function () {
        return classNames(this.element_);
      },
      set: function (cssClassNames) {
        cssClassNames !== null && typeof cssClassNames === "object" && cssClassNames.__kw === _MoveKWArgsT && (arguments.keywords = cssClassNames, cssClassNames = cssClassNames.cssClassNames);
        if (Array.isArray(cssClassNames)) cssClassNames = cssClassNames.join(" ");
        return this.element_.className = cssClassNames;
      }
    },
    doubleSided: {
      get: function () {
        return this.element_.style.webkitBackfaceVisibility === "visible";
      },
      set: function (doubleSided) {
        doubleSided !== null && typeof doubleSided === "object" && doubleSided.__kw === _MoveKWArgsT && (arguments.keywords = doubleSided, doubleSided = doubleSided.doubleSided);
        if (doubleSided) {
          return this.element_.style.setProperty("-webkit-backface-visibility", "visible", null);
        } else {
          return this.element_.style.removeProperty("-webkit-backface-visibility");
        }
      }
    },
    cornerRadius: {
      get: function () {
        var v;
        return (v = this.computedStyle.getPropertyCSSValue("-webkit-border-top-left-radius")) && v.getFloatValue(CSSPrimitiveValue.CSS_NUMBER) || 0;
      },
      set: function (value) {
        value !== null && typeof value === "object" && value.__kw === _MoveKWArgsT && (arguments.keywords = value, value = value.value);
        if (value && (value = Number(value))) {
          return this.element_.style.webkitBorderRadius = value.toFixed(0) + "px";
        } else {
          return this.element_.style.webkitBorderRadius = null;
        }
      }
    },
    backgroundColor: {
      get: function () {
        var color;
        return (color = this.computedStyle.backgroundColor) === "transparent" ? null : color;
      },
      set: function (color) {
        color !== null && typeof color === "object" && color.__kw === _MoveKWArgsT && (arguments.keywords = color, color = color.color);
        return this.element_.style.backgroundColor = _canonicalColor(color);
      }
    },
    color: {
      get: function () {
        var color;
        return (color = this.computedStyle.color) === "transparent" ? null : color;
      },
      set: function (color) {
        color !== null && typeof color === "object" && color.__kw === _MoveKWArgsT && (arguments.keywords = color, color = color.color);
        return this.element_.style.color = _canonicalColor(color);
      }
    },
    hidden: {
      get: function () {
        return this.computedStyle.visibility === "hidden";
      },
      set: function (hidden) {
        hidden !== null && typeof hidden === "object" && hidden.__kw === _MoveKWArgsT && (arguments.keywords = hidden, hidden = hidden.hidden);
        return this.computedStyle.visibility = hidden ? "hidden" : null;
      }
    },
    masksToBounds: {
      get: function () {
        return this.computedStyle.overflow === "hidden";
      },
      set: function (clip) {
        clip !== null && typeof clip === "object" && clip.__kw === _MoveKWArgsT && (arguments.keywords = clip, clip = clip.clip);
        return this.style.overflow = clip ? "hidden" : null;
      }
    },
    opacity: {
      get: function () {
        var v;
        return (v = this.computedStyle.getPropertyCSSValue("opacity")) && v.getFloatValue(CSSPrimitiveValue.CSS_NUMBER);
      },
      set: function (opacity) {
        opacity !== null && typeof opacity === "object" && opacity.__kw === _MoveKWArgsT && (arguments.keywords = opacity, opacity = opacity.opacity);
        return this.element_.style.opacity = Number(opacity);
      }
    },
    zPosition: {
      get: function () {
        var v;
        return (v = this.computedStyle.getPropertyCSSValue("z-index")) && v.getFloatValue(CSSPrimitiveValue.CSS_NUMBER);
      },
      set: function (value) {
        value !== null && typeof value === "object" && value.__kw === _MoveKWArgsT && (arguments.keywords = value, value = value.value);
        return this.element_.style.zIndex = Number(value).toFixed(0);
      }
    },
    drawContent: {
      get: function () {
        return this.drawContent_;
      },
      set: function (drawContentFunction) {
        drawContentFunction !== null && typeof drawContentFunction === "object" && drawContentFunction.__kw === _MoveKWArgsT && (arguments.keywords = drawContentFunction, drawContentFunction = drawContentFunction.drawContentFunction);
        var newElement, initialDrawContent;
        if (typeof drawContentFunction !== "function") {
          if (this.drawContent_) {
            if (!this._originalElement || typeof this._originalElement === "string") {
              newElement = this.ownerDocument.createElement(this._originalElement || "div");
            } else {
              newElement = this._originalElement;
            }
            this.element_ = _swapElement(this.element_.parentNode, this.element_, newElement);
            this._originalElement = undefined;
            this.removeEventListener("change:frame", this.drawContentAfterFrameSizeChange);
          }
          return this.drawContent_ = undefined;
        } else if (!this.drawContent_) {
          this.drawContent_ = drawContentFunction;
          if (this.element_.nodeName !== "CANVAS") {
            this._originalElement = this.element_.hasChildNodes() ? this.element_ : this.element_.nodeName;
            newElement = this.ownerDocument.createElement("canvas");
            this.element_ = _swapElement(this.element_.parentNode, this.element_, newElement);
          }
          this.on("change:frame", this.drawContentAfterFrameSizeChange);
          if (this.document) {
            return this.drawContentAfterFrameSizeChange();
          } else {
            return this.on("DOMNodeInsertedIntoDocument", initialDrawContent = function initialDrawContent() {
              this.drawContentAfterFrameSizeChange();
              return this.removeEventListener("DOMNodeInsertedIntoDocument", initialDrawContent);
            });
          }
        } else if (this.drawContent_ !== drawContentFunction) {
          this.drawContent_ = drawContentFunction;
          return this.drawContentAfterFrameSizeChange();
        }
      }
    },
    graphicsContext2D: {
      get: function () {
        return this.element_.getContext && this.element_.getContext("2d");
      }
    },
    graphicsContext3D: {
      get: function () {
        return this.element_.getContext && this.element_.getContext("webgl");
      }
    },
    animated: {
      get: function () {
        if (!hasClassName(this.element_, "animated")) return false;
        return this.computedStyle.webkitTransitionProperty;
      },
      set: function (animated) {
        animated !== null && typeof animated === "object" && animated.__kw === _MoveKWArgsT && (arguments.keywords = animated, animated = animated.animated);
        if (animated && animated !== "none") {
          addClassName(this.element_, "animated");
          if (animated === "geometry") {
            animated = "-webkit-transform,width,height";
          } else if (animated === "transform") {
            animated = "-webkit-transform";
          } else if (Array.isArray(animated)) {
            animated = animated.join(",");
          } else if (typeof animated !== "string") {
            animated = "all";
          }
          return this.element_.style.setProperty("-webkit-transition-property", animated, null);
        } else if (hasClassName(this.element_, "animated")) {
          removeClassName(this.element_, "animated");
          return this.element_.style.removeProperty("-webkit-transition");
        }
      }
    },
    animationDuration: {
      get: function () {
        var v;
        if (v = this.style.getPropertyCSSValue("-webkit-transition-duration")) {
          return v.getFloatValue(CSSPrimitiveValue.CSS_MS);
        } else if (v = this.computedStyle.getPropertyCSSValue("-webkit-transition-duration")) {
          return v[0].getFloatValue(CSSPrimitiveValue.CSS_MS);
        }
        return 0;
      },
      set: function (value) {
        value !== null && typeof value === "object" && value.__kw === _MoveKWArgsT && (arguments.keywords = value, value = value.value);
        if (typeof value !== "number") throw TypeError("animationDuration must be a number"); else if (value < 0) throw TypeError("animationDuration must be a positive number");
        return this.element_.style.setProperty("-webkit-transition-duration", value.toFixed(0) + "ms", null);
      }
    },
    animationTimingFunction: {
      get: function () {
        var v;
        if (v = this.computedStyle.getPropertyCSSValue("-webkit-transition-timing-function")) return v.cssText;
      },
      set: function (value) {
        value !== null && typeof value === "object" && value.__kw === _MoveKWArgsT && (arguments.keywords = value, value = value.value);
        return this.element_.style.setProperty("-webkit-transition-timing-function", value, null);
      }
    },
    ownerDocument: {
      get: function () {
        return this.element_.ownerDocument;
      }
    },
    document: {
      get: function () {
        var ownerDocument;
        ownerDocument = this.ownerDocument;
        return ownerDocument.documentElement.contains(this.element_) && ownerDocument;
      }
    },
    tag: {
      get: function () {
        return this.element_.id;
      },
      set: function (tag) {
        tag !== null && typeof tag === "object" && tag.__kw === _MoveKWArgsT && (arguments.keywords = tag, tag = tag.tag);
        return this.element_.id = Text(tag);
      }
    },
    excludedFromHitTesting: {
      get: function () {
        return this.element_.style.getPropertyValue("pointer-events") === "none";
      },
      set: function (isExcluded) {
        isExcluded !== null && typeof isExcluded === "object" && isExcluded.__kw === _MoveKWArgsT && (arguments.keywords = isExcluded, isExcluded = isExcluded.isExcluded);
        if (isExcluded) return this.element_.style.setProperty("pointer-events", "none", null); else return this.element_.style.removeProperty("pointer-events");
      }
    }
  };
  UILayer.hitTest = function hitTest(x, y) {
    x !== null && typeof x === "object" && x.__kw === _MoveKWArgsT && (arguments.keywords = x, y = x.y, x = x.x);
    var element, el;
    if (element = document.elementFromPoint(x, y)) {
      el = element;
      while (!UILayer.prototype.isPrototypeOf(el.UILayer) || el !== element && el.UILayer.excludedFromHitTesting) {
        if (!(el = el.parentNode)) return;
      }
      return el.UILayer;
    }
  };
  UILayer.textureBackedProperties = {
    matrix: {
      get: function () {
        return this._matrix || (this._matrix = new WebKitCSSMatrix(this.element_.style.webkitTransform));
      },
      set: function () {
        var values;
        M = this._matrix = arguments[0];
        if (!M || !(M instanceof WebKitCSSMatrix)) {
          this._matrix = null;
          return this.element_.style.webkitTransform = null;
        } else {
          values = "matrix3d(" + M.m11 + "," + M.m12 + "," + M.m13 + "," + M.m14 + "," + M.m21 + "," + M.m22 + "," + M.m23 + "," + M.m24 + "," + M.m31 + "," + M.m32 + "," + M.m33 + "," + M.m34 + "," + M.m41 + "," + M.m42 + "," + M.m43 + "," + M.m44 + ")";
          if (this.rotateX_) values += " rotateX(" + (typeof this.rotateX_ === "number" ? this.rotateX_ + "deg" : this.rotateX_) + ")";
          if (this.rotateY_) values += " rotateY(" + (typeof this.rotateY_ === "number" ? this.rotateY_ + "deg" : this.rotateY_) + ")";
          if (this.rotateZ_) values += " rotateZ(" + (typeof this.rotateZ_ === "number" ? this.rotateZ_ + "deg" : this.rotateZ_) + ")";
          return this.element_.style.webkitTransform = values;
        }
      }
    },
    scale: {
      get: function () {
        return this.matrix.m11;
      },
      set: function (value) {
        value !== null && typeof value === "object" && value.__kw === _MoveKWArgsT && (arguments.keywords = value, value = value.value);
        var matrix;
        if (value === undefined || value === null) value = 1; else if (typeof value !== "number") value = Number(value);
        if (value <= 0) throw TypeError("scale must be larger than zero");
        matrix = this.matrix;
        matrix.m11 = value;
        matrix.m22 = value;
        matrix.m33 = value;
        return this.matrix = matrix;
      }
    },
    rotateBy: {
      value: function () {
        var matrix;
        DEPRECATED_WARN("rotateBy", "rotation");
        matrix = this.matrix;
        return this.matrix = matrix.rotate.apply(matrix, arguments);
      }
    },
    scaleBy: {
      value: function () {
        var matrix;
        matrix = this.matrix;
        return this.matrix = matrix.scale.apply(matrix, arguments);
      }
    },
    moveBy: {
      value: function () {
        var matrix, oldValues, newMatrix;
        matrix = this.matrix;
        oldValues = {
          x: matrix.m41,
          y: matrix.m42,
          z: matrix.m43
        };
        this.matrix = matrix.translate.apply(matrix, arguments);
        if (!this.eventsMuted) {
          newMatrix = this.matrix;
          if (!(oldValues.x === newMatrix.m41 && (oldValues.x = undefined) || oldValues.y === newMatrix.m42 && (oldValues.y = undefined) || oldValues.z === newMatrix.m43 && (oldValues.z = undefined))) {
            return this.emit("change:frame", {
              oldValues: oldValues
            });
          }
        }
      }
    },
    transformOrigin: {
      get: function () {
        var point, v;
        point = [ .5, .5, 0 ];
        if (v = this.element_.style.getPropertyCSSValue("-webkit-transform-origin-x")) point[0] = v.getFloatValue(v.primitiveType) / 100;
        if (v = this.element_.style.getPropertyCSSValue("-webkit-transform-origin-y")) point[1] = v.getFloatValue(v.primitiveType) / 100;
        if (v = this.element_.style.getPropertyCSSValue("-webkit-transform-origin-z")) point[3] = v.getFloatValue(v.primitiveType) / 100;
        return point;
      },
      set: function (origin) {
        origin !== null && typeof origin === "object" && origin.__kw === _MoveKWArgsT && (arguments.keywords = origin, origin = origin.origin);
        var style;
        style = this.element_.style;
        if (origin[0] === .5 || origin[0] === undefined) {
          style.removeProperty("-webkit-transform-origin-x");
        } else {
          style.setProperty("-webkit-transform-origin-x", (100 * origin[0]).toFixed(0) + "%", null);
        }
        if (origin[1] === .5 || origin[1] === undefined) {
          style.removeProperty("-webkit-transform-origin-y");
        } else {
          style.setProperty("-webkit-transform-origin-y", (100 * origin[1]).toFixed(0) + "%", null);
        }
        if (origin[2] === 0 || origin[2] === undefined) {
          return style.removeProperty("-webkit-transform-origin-z");
        } else {
          return style.setProperty("-webkit-transform-origin-z", (100 * origin[2]).toFixed(0) + "%", null);
        }
      }
    },
    anchorPoint: DEPRECATED_PROPERTY("anchorPoint", "transformOrigin")
  };
  UILayer.prototype._setupSublayer = function _setupSublayer(layer) {
    layer !== null && typeof layer === "object" && layer.__kw === _MoveKWArgsT && (arguments.keywords = layer, layer = layer.layer);
    var style;
    if (!layer || UILayer.prototype.isPrototypeOf(layer.UILayer)) throw TypeError("Sublayer " + JSON(layer) + " is not a UILayer");
    if (layer.frame.width < 0) {
      style = layer.element.style;
      if (!style.width) style.width = "auto";
      style.right = style.left = "0";
    }
    if (layer.frame.height < 0 && layer.style.height !== "inherit") {
      style = layer.element.style;
      if (!style.height) style.height = "auto";
      return style.top = style.bottom = "0";
    }
  };
  UILayer.prototype.addSublayer = function addSublayer(layer) {
    layer !== null && typeof layer === "object" && layer.__kw === _MoveKWArgsT && (arguments.keywords = layer, layer = layer.layer);
    if (this.drawContent_) {
      console.warn("adding sublayers to a layer with custom drawing has no effect");
      return;
    }
    this._setupSublayer(layer);
    this.element_.appendChild(layer.element);
    layer.emit("uilayer:added-to-superlayer", {
      superlayer: this
    });
    this.emit("uilayer:added-sublayer", {
      sublayer: layer
    });
    return layer;
  };
  UILayer.prototype.removeSublayer = function removeSublayer(layer, index) {
    layer !== null && typeof layer === "object" && layer.__kw === _MoveKWArgsT && (arguments.keywords = layer, index = layer.index, layer = layer.layer);
    var cn, el;
    cn = this.element_.childNodes;
    if (layer && UILayer.prototype.isPrototypeOf(layer)) {
      el = layer.element;
    } else if (index && (index = Number(index)) >= 0 && !isNaN(index)) {
      el = cn.item(index);
    }
    if (el && el.UILayer && UILayer.prototype.isPrototypeOf(el.UILayer)) {
      try {
        this.element_.removeChild(el);
      } catch (e) {
        return undefined;
      }
      layer = el.UILayer;
      layer.emit("uilayer:removed-from-superlayer", {
        superlayer: this
      });
      this.emit("uilayer:removed-sublayer", {
        sublayer: layer
      });
      return layer;
    }
  };
  UILayer.prototype.removeFromSuperlayer = function removeFromSuperlayer() {
    var superlayer;
    if (!(superlayer = this.superlayer)) throw Error("Not attached to any superlayer");
    superlayer.element.removeChild(this.element_);
    this.emit("uilayer:removed-from-superlayer", {
      superlayer: superlayer
    });
    return superlayer.emit("uilayer:removed-sublayer", {
      sublayer: this
    });
  };
  UILayer.prototype.removeAllSublayers = function removeAllSublayers() {
    var removedSublayers, cn, i, el;
    removedSublayers = [];
    cn = this.element_.childNodes;
    for (i = 0; i < cn.length; ++i) {
      el = cn[i];
      if (el.UILayer && UILayer.prototype.isPrototypeOf(el.UILayer)) {
        removedSublayers.push(el.UILayer);
        this.element_.removeChild(el);
      }
    }
    return removedSublayers;
  };
  UILayer.prototype.setSublayerAtIndex = function setSublayerAtIndex(index, layer) {
    index !== null && typeof index === "object" && index.__kw === _MoveKWArgsT && (arguments.keywords = index, layer = index.layer, index = index.index);
    var el;
    if (!layer || !UILayer.prototype.isPrototypeOf(layer)) layer = null; else this._setupSublayer(layer);
    if (index && (index = Number(index)) >= 0 && !isNaN(index)) {
      el = this.element_.childNodes.item(index);
      if (el && el.UILayer && UILayer.prototype.isPrototypeOf(el.UILayer)) {
        if (layer) {
          this.element_.replaceChild(layer.element, el);
          layer.emit("uilayer:added-to-superlayer", {
            superlayer: this
          });
          this.emit("uilayer:added-sublayer", {
            sublayer: layer
          });
        } else {
          this.element_.removeChild(el);
        }
        el.UILayer.emit("uilayer:removed-from-superlayer", {
          superlayer: this
        });
        this.emit("uilayer:removed-sublayer", {
          sublayer: el.UILayer
        });
        return el;
      }
    }
    this.element_.appendChild(layer.element);
    layer.emit("uilayer:added-to-superlayer", {
      superlayer: this
    });
    return this.emit("uilayer:added-sublayer", {
      sublayer: layer
    });
  };
  UILayer.prototype.superlayerInClassStructure = function superlayerInClassStructure() {
    var expectedClassStructure, i, superlayer, cls;
    expectedClassStructure = arguments;
    i = 0;
    superlayer = this;
    while (superlayer && (cls = expectedClassStructure[i++])) {
      superlayer = superlayer.superlayer;
      if (!superlayer || !cls.prototype.isPrototypeOf(superlayer)) {
        superlayer = undefined;
        break;
      }
    }
    return superlayer;
  };
  UILayer.prototype.isSublayerOf = function isSublayerOf(superlayer) {
    superlayer !== null && typeof superlayer === "object" && superlayer.__kw === _MoveKWArgsT && (arguments.keywords = superlayer, superlayer = superlayer.superlayer);
    return superlayer && UILayer.prototype.isPrototypeOf(superlayer) && this.element_.parentNode === superlayer.element;
  };
  UILayer.prototype.layerWithTag = UILayer.layerWithTag, UILayer.prototype.toJSON = function toJSON() {
    var obj, sublayers;
    obj = {
      frame: this.frame,
      scale: this.scale,
      origin: this.origin
    };
    if ((sublayers = this.sublayers).length) obj.sublayers = sublayers;
    if (this.animated) {
      obj.animated = true;
      obj.animationDelay = this.animationDelay;
      obj.animationDuration = this.animationDuration;
      obj.animationTimingFunction = this.animationTimingFunction;
    }
    return obj;
  };
  isTouchDevice = false;
  if ("ontouchstart" in window && "ontouchend" in document) try {
    document.createEvent("TouchEvent");
    isTouchDevice = true;
  } catch (e) {}
  if (!isTouchDevice) {
    touchEventsToMouseEvents = {
      touchstart: "mousedown",
      touchmove: "mousemove",
      touchend: "mouseup"
    };
    makeFakeTouchEvent = function makeFakeTouchEvent(event, callback) {
      event !== null && typeof event === "object" && event.__kw === _MoveKWArgsT && (arguments.keywords = event, callback = event.callback, event = event.event);
      return function (ev) {
        ev !== null && typeof ev === "object" && ev.__kw === _MoveKWArgsT && (arguments.keywords = ev, ev = ev.ev);
        ev.touches = [ {
          clientX: ev.clientX,
          clientY: ev.clientY,
          identifier: ev.identifier,
          pageX: ev.pageX,
          pageY: ev.pageY,
          screenX: ev.screenX,
          screenY: ev.screenY,
          target: ev.target
        } ];
        return callback.apply(this, Array.prototype.slice.call(arguments));
      };
    };
    UILayer.prototype.on = function on(type, handler) {
      type !== null && typeof type === "object" && type.__kw === _MoveKWArgsT && (arguments.keywords = type, handler = type.handler, type = type.type);
      var compatType, layer, eventHandler;
      if (compatType = touchEventsToMouseEvents[type]) {
        type = compatType;
        handler = makeFakeTouchEvent(type, handler);
      }
      layer = this;
      eventHandler = function eventHandler() {
        return handler.apply(layer, arguments);
      };
      this.element_.addEventListener(type, eventHandler, false);
      return eventHandler;
    };
    UILayer.prototype.removeEventListener = function removeEventListener(type, handler) {
      type !== null && typeof type === "object" && type.__kw === _MoveKWArgsT && (arguments.keywords = type, handler = type.handler, type = type.type);
      this.element_.removeEventListener(touchEventsToMouseEvents[type] || type, handler, false);
      return handler;
    };
  } else {
    UILayer.prototype.on = function on(type, handler) {
      type !== null && typeof type === "object" && type.__kw === _MoveKWArgsT && (arguments.keywords = type, handler = type.handler, type = type.type);
      var layer, eventHandler;
      layer = this;
      eventHandler = function eventHandler() {
        return handler.apply(layer, arguments);
      };
      this.element_.addEventListener(type, eventHandler, false);
      return eventHandler;
    };
    UILayer.prototype.removeEventListener = function removeEventListener(type, handler) {
      type !== null && typeof type === "object" && type.__kw === _MoveKWArgsT && (arguments.keywords = type, handler = type.handler, type = type.type);
      this.element_.removeEventListener(type, handler, false);
      return handler;
    };
  }
  UIEvent = "UIEvent";
  FocusEvent = "FocusEvent";
  MouseEvent = "MouseEvent";
  TouchEvent = "TouchEvent";
  WheelEvent = "WheelEvent";
  TextEvent = "TextEvent";
  KeyboardEvent = "KeyboardEvent";
  CompositionEvent = "CompositionEvent";
  MutationEvent = "MutationEvent";
  MutationNameEvent = "MutationNameEvent";
  CustomEvent = "CustomEvent";
  TransitionEvent = "TransitionEvent";
  kEventClasses = {
    DOMActivate: UIEvent,
    load: UIEvent,
    unload: UIEvent,
    abort: UIEvent,
    error: UIEvent,
    select: UIEvent,
    resize: UIEvent,
    scroll: UIEvent,
    blur: FocusEvent,
    DOMFocusIn: FocusEvent,
    DOMFocusOut: FocusEvent,
    focus: FocusEvent,
    focusin: FocusEvent,
    focusout: FocusEvent,
    click: MouseEvent,
    dblclick: MouseEvent,
    mousedown: MouseEvent,
    mouseenter: MouseEvent,
    mouseleave: MouseEvent,
    mousemove: MouseEvent,
    mouseover: MouseEvent,
    mouseout: MouseEvent,
    mouseup: MouseEvent,
    touchstart: TouchEvent,
    touchmove: TouchEvent,
    touchend: TouchEvent,
    touchcancel: TouchEvent,
    wheel: WheelEvent,
    textinput: TextEvent,
    keydown: KeyboardEvent,
    keypress: KeyboardEvent,
    keyup: KeyboardEvent,
    compositionstart: CompositionEvent,
    compositionupdate: CompositionEvent,
    compositionend: CompositionEvent,
    DOMAttrModified: MutationEvent,
    DOMCharacterDataModified: MutationEvent,
    DOMNodeInserted: MutationEvent,
    DOMNodeInsertedIntoDocument: MutationEvent,
    DOMNodeRemoved: MutationEvent,
    DOMNodeRemovedFromDocument: MutationEvent,
    DOMSubtreeModified: MutationEvent,
    DOMAttributeNameChanged: MutationNameEvent,
    DOMElementNameChanged: MutationNameEvent,
    transitionend: TransitionEvent
  };
  UILayer.prototype.emit = function emit() {
    var options, eventClass, ev, keysToIgnore;
    if (this.eventsMuted) return;
    if (typeof arguments[0] === "object") options = arguments[0]; else if (typeof arguments.keywords === "object") options = arguments.keywords; else {
      options = typeof arguments[1] === "object" ? arguments[1] : {};
      options.type = arguments[0];
    }
    if (!options.type) throw Error("no event type specified");
    eventClass = kEventClasses[options.type] || CustomEvent;
    if (eventClass === TouchEvent && !isTouchDevice) {
      options.type = touchEventsToMouseEvents[options.type];
      eventClass = kEventClasses[options.type] || CustomEvent;
    }
    if (!(ev = document.createEvent(eventClass))) {
      eventClass = CustomEvent;
      ev = document.createEvent(eventClass);
    }
    options.bubbles = !!(options.bubbles === undefined ? true : options.bubbles);
    options.cancelable = !!(options.cancelable === undefined ? true : options.cancelable);
    if (eventClass === UIEvent) {
      ev.initUIEvent(options.type, options.bubbles, options.cancelable, options.view || window, options.detail !== undefined ? options.detail : 1);
    } else if (eventClass === MouseEvent) {
      ev.initMouseEvent(options.type, options.bubbles, options.cancelable, options.view || window, options.detail !== undefined ? options.detail : 1, options.screenX, options.screenY, options.clientX, options.clientY, !!options.ctrlKey, !!options.altKey, !!options.shiftKey, !!options.metaKey, options.button !== undefined ? Number(options.button) : undefined, options.relatedTarget);
    } else if (eventClass === TransitionEvent) {
      ev.initTransitionEvent(options.type, options.bubbles, options.cancelable, options.propertyName, options.elapsedTime);
    } else {
      if (eventClass === CustomEvent) {
        ev.initCustomEvent(options.type, options.bubbles, options.cancelable, options.detail);
      } else {
        ev.initEvent(options.type, options.bubbles, options.cancelable);
      }
      keysToIgnore = {
        __kw: 1,
        type: 1,
        bubbles: 1,
        cancelable: 1,
        detail: 1
      };
      options.forEach(function (key, value) {
        key !== null && typeof key === "object" && key.__kw === _MoveKWArgsT && (arguments.keywords = key, value = key.value, key = key.key);
        if (key in keysToIgnore) return;
        return ev[key] = value;
      });
    }
    return this.element_.dispatchEvent(ev);
  };
  Object.defineProperties(UILayer.prototype, UILayer.properties);
  Object.defineProperties(UILayer.prototype, UILayer.textureBackedProperties);
  RotationProxy = __class(RotationProxy = function RotationProxy() {
    return __class.create(RotationProxy, arguments);
  }, {
    constructor: function (layer) {
      layer !== null && typeof layer === "object" && layer.__kw === _MoveKWArgsT && (arguments.keywords = layer, layer = layer.layer);
      return Object.defineProperty(this, "layer", {
        value: layer
      });
    },
    toString: function () {
      return "{x:" + this.x + ", y:" + this.y + ", z:" + this.z + "}";
    },
    toJSON: function () {
      return {
        x: this.x,
        y: this.y,
        z: this.z
      };
    }
  });
  Object.defineProperties(RotationProxy.prototype, {
    x: {
      enumerable: true,
      get: function () {
        return this.layer.rotateX_ || 0;
      },
      set: function (angle) {
        angle !== null && typeof angle === "object" && angle.__kw === _MoveKWArgsT && (arguments.keywords = angle, angle = angle.angle);
        var oldValue;
        if ((oldValue = this.layer.rotateX_) === angle) return;
        this.layer.rotateX_ = angle;
        this.layer.matrix = this.layer.matrix;
        return this.layer.emit("change:rotation", {
          oldValues: {
            x: oldValue
          }
        });
      }
    },
    y: {
      enumerable: true,
      get: function () {
        return this.layer.rotateY_ || 0;
      },
      set: function (angle) {
        angle !== null && typeof angle === "object" && angle.__kw === _MoveKWArgsT && (arguments.keywords = angle, angle = angle.angle);
        var oldValue;
        if ((oldValue = this.layer.rotateY_) === angle) return;
        this.layer.rotateY_ = angle;
        this.layer.matrix = this.layer.matrix;
        return this.layer.emit("change:rotation", {
          oldValues: {
            y: oldValue
          }
        });
      }
    },
    z: {
      enumerable: true,
      get: function () {
        return this.layer.rotateZ_ || 0;
      },
      set: function (angle) {
        angle !== null && typeof angle === "object" && angle.__kw === _MoveKWArgsT && (arguments.keywords = angle, angle = angle.angle);
        var oldValue;
        if ((oldValue = this.layer.rotateZ_) === angle) return;
        this.layer.rotateZ_ = angle;
        this.layer.matrix = this.layer.matrix;
        return this.layer.emit("change:rotation", {
          oldValues: {
            z: oldValue
          }
        });
      }
    }
  });
  if ((head = document.getElementsByTagName("head")).length) head = head[0]; else head = document.body || document.documentElement;
  baseStyle = document.createElement("style");
  baseStyle.id = "UILayer-base-style";
  baseStyle.appendChild(document.createTextNode(".uilayer {" + "  display: block;" + "  visibility: visible;" + "  position: absolute;" + "  top:auto; right:auto; bottom:auto; left:auto;" + "  width:auto; height:auto;" + "  overflow: visible;" + "  z-index:0;" + "  opacity:1;" + "  -webkit-box-sizing: border-box;" + "}\n" + ".uilayer.textureBacked {" + "  -webkit-transform: matrix3d(1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1);" + "  -webkit-transform-origin: 50% 50% 0%;" + "  -webkit-backface-visibility: hidden;" + "  -webkit-transform-style: flat;" + "}\n" + ".uilayer.animated {" + "  -webkit-transition-duration: 500ms;" + "  -webkit-transition-timing-function: ease;" + "  -webkit-transition-delay: 0;" + "  -webkit-transition-property: none;" + "}"));
  return head.appendChild(baseStyle);
});
Move.require.define("UILayer","UILayer/index.mv",function(require,module,exports){
  var M, _MoveKWArgsT, Text, extend, create, print, dprint, repeat, after, JSON, __class, EventEmitter, EHTML, version;
  M = Move.runtime, _MoveKWArgsT = M._MoveKWArgsT, Text = M.Text, extend = M.extend, create = M.create, print = M.print, dprint = M.dprinter(module), repeat = M.repeat, after = M.after, JSON = M.JSON, __class = M.__class, EventEmitter = M.EventEmitter;
  EHTML = Move.EHTML;
  if (typeof window === "undefined" || !window.navigator || window.navigator.userAgent.indexOf("WebKit") === -1) {
    module.exports = null;
    return print("Error: UILayer is only compatible with WebKit");
  }
  module.exports = exports = require("./UILayer");
  exports.version = version = "0.0.6";
});
