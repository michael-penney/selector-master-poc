(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{150:function(e,t,n){e.exports=n(335)},155:function(e,t,n){},324:function(e,t){},334:function(e,t,n){},335:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(143),u=n.n(o),i=(n(155),n(156),n(52)),d=n(53),c=n(149),l=n(144),s=n(148),f=n(54),v=(n(332),n(333),n(334),n(336)),h=n(338),p=n(76),y=n(60),m=n.n(y);var g,E=a.a.memo(function(e){var t=Object(r.useRef)(null);return Object(r.useLayoutEffect)(function(){var n=t.current;if(null!=n){var r=Object.assign({settingsId:e.rootId},e.opts),a=m()(n).PowerGrid(r),o=e.events;if(o){var u=!0,i=!1,d=void 0;try{for(var c,l=o[Symbol.iterator]();!(u=(c=l.next()).done);u=!0){var s=c.value;a.target.on(s.name,s.action)}}catch(f){i=!0,d=f}finally{try{u||null==l.return||l.return()}finally{if(i)throw d}}}e.onGridMounted&&e.onGridMounted(a)}},[]),a.a.createElement("div",{id:e.rootId,style:e.style,className:e.className,ref:t})},function(){return!0}),b=function(){function e(t){Object(i.a)(this,e),this.data=void 0,this.lookupById=void 0,this.handleValueChanged=void 0,this.data=t,this.lookupById=this.computeLookupById(t)}return Object(d.a)(e,[{key:"onValueChanged",value:function(e){this.handleValueChanged=e}},{key:"updateData",value:function(e){var t=this.data;this.data=e,this.lookupById=this.computeLookupById(e),m()(this).trigger("datachanged",{data:e,oldData:t})}},{key:"recordCount",value:function(){return this.data.length}},{key:"getData",value:function(e,t){return this.data.slice(e,t)}},{key:"setValue",value:function(e,t,n){this.getRecordById(e)[t]=n,this.handleValueChanged&&this.handleValueChanged(e,t,n)}},{key:"getRecordById",value:function(e){var t=this.lookupById.get(e);return this.data[t]}},{key:"isReady",value:function(){return!0}},{key:"assertReady",value:function(){if(!this.isReady())throw"Datasource not ready yet"}},{key:"computeLookupById",value:function(e){for(var t=new Map,n=0,r=e.length;n<r;++n)t.set(e[n].id,n);return t}}]),e}();function O(e){var t=e.gridId,n=e.extensions,o=e.opts,u=e.data,i=e.onValueChanged,d=e.onSelectionChanged,c=Object(r.useRef)(null);var l=function(){var e=c.current;if(null!=e)return e;var t={onRowSelected:d};return e={extsContext:t,pgExtensions:function(e,t){var n={};return e.selection&&function(e,t){e.selection={onrowselected:function(e,n){t.onRowSelected&&t.onRowSelected(""+n)}}}(n,t),e.editing&&(n.editing=!0),n}(n,t),dataSource:new b(u)},c.current=e,e}(),s=l.dataSource,f=l.extsContext,v=l.pgExtensions;Object(r.useEffect)(function(){s.updateData(u)},[u]),Object(r.useEffect)(function(){s.onValueChanged(i)},[i]),Object(r.useEffect)(function(){f.onRowSelected=d},[d]);var h=t,y=Object(p.a)({},o,{rootId:h,dataSource:s,extensions:v});return a.a.createElement(E,{rootId:t,opts:y})}function S(e,t,n){var r=[],a=0,o=!0,u=!1,i=void 0;try{for(var d,c=function(){var e=d.value,o=n.map(function(t){return e[t._key]});o.id=t(e,a++),r.push(o)},l=e[Symbol.iterator]();!(o=(d=l.next()).done);o=!0)c()}catch(s){u=!0,i=s}finally{try{o||null==l.return||l.return()}finally{if(u)throw i}}return r}!function(e){e.SET_FORM_VALUE="core.form.SET_FORM_VALUE",e.RESET_ALL_FORM_VALUES="core.form.RESET_ALL_FORM_VALUES",e.RESET_FORM_VALUES="core.form.RESET_FORM_VALUES"}(g||(g={}));var k=n(108),_=function(){function e(t,n){Object(i.a)(this,e),this.key=void 0,this.provider=void 0,this.seq=0,this.depValues=void 0,this.providerSource=void 0,this.formSource=void 0,this.key=t,this.provider=n}return Object(d.a)(e,[{key:"resolveNextValue",value:function(e,t,n){var r=this.getDependencies();if(null==r){var a=this.invokeProvider(e);this.providerSource&&this.providerSource.value===a||(this.providerSource={value:a,seq:this.seq++})}else{var o=this.resolveDependencyValues(e,r,t);if(!this.providerSource||o!==this.depValues){this.depValues=o;var u=this.invokeProvider(e,o);this.providerSource={value:u,seq:this.seq++}}}if(n&&n.has(this.key)){var i=n.get(this.key),d=this.formSource;d&&d.value===i||(this.formSource={value:i,seq:this.seq++})}else this.formSource=void 0;return this.formSource&&this.formSource.seq>this.providerSource.seq?this.formSource.value:this.providerSource.value}},{key:"getDependencies",value:function(){var e=this.provider;if(!(e instanceof Function))return e.dependsOn}},{key:"resolveDependencyValues",value:function(e,t,n){for(var r=new Array(t.length),a=!1,o=0,u=t.length;o<u;++o){var i=t[o],d=void 0;d="string"===typeof i?n[i]:i(e),a||null!=this.depValues&&this.depValues[o]===d||(a=!0),r[o]=d}return null==this.depValues||a?r:this.depValues}},{key:"invokeProvider",value:function(e,t){var n=this.provider;return n instanceof Function?t?n.apply(void 0,[e].concat(Object(k.a)(t))):n(e):n.value instanceof Function?t?n.value.apply(n,[e].concat(Object(k.a)(t))):n.value(e):n.value}}]),e}();function V(e){var t,n=new Map,r=function(e){var t=Object.keys(e),n=[],r=new Set;for(;t.length;){for(var a=void 0,o=0;o<t.length;o++){var u=t[o],i=e[u];"object"===typeof i&&i.dependsOn&&i.dependsOn.some(function(e){return"string"===typeof e&&!r.has(e)})?(a||(a=[]),a.push(u)):(n.push(u),r.add(u))}if(!a)break;if(a.length===t.length)throw new Error("cyclic dependency! Couldn't resolve keys: - "+a);t=a}return n}(e);return function(a,o){var u={},i=!1,d=!0,c=!1,l=void 0;try{for(var s,f=r[Symbol.iterator]();!(d=(s=f.next()).done);d=!0){var v=s.value,h=n.get(v);null==h&&(h=new _(v,e[v]),n.set(v,h)),u[v]=h.resolveNextValue(a,u,o),null!=t&&u[v]===t[v]||(i=!0)}}catch(p){c=!0,l=p}finally{try{d||null==f.return||f.return()}finally{if(c)throw l}}return i?(t=u,u):(null==t&&(t=u),t)}}var w=a.a.memo(function(e){var t=e.formModel;return(0,e.children)(t)});var I,q=Object(f.b)(function(e,t){var n=t.providers,r=t.formId,a=t.selectState,o=n&&V(n);return function(e){var t=a(e).get("forms").get(r),n=t&&t.get("values");return{providedValues:o&&o(e,n)}}},{setFormValue:function(e,t,n){return{type:g.SET_FORM_VALUE,formId:e,key:t,value:n}},resetAllFormValues:function(e){return{type:g.RESET_ALL_FORM_VALUES,formId:e}}})(function(e){var t=e.formId,n=e.values,o=e.providedValues,u=e.children,i=e.setFormValue,d=e.resetAllFormValues,c=Object.assign({},n,o),l=Object(r.useMemo)(function(){return{setValue:i.bind(null,t),resetAllValues:d.bind(null,t)}},[t,c,i,d]),s=Object(r.useMemo)(function(){return{formId:t,values:c,actions:l}},[t,c,l]);return a.a.createElement(w,{children:u,formModel:s})}),C=n(337);function j(e){var t=!e.onChanged;return a.a.createElement(C.a.Control,{type:"text",value:e.value,disabled:t,onChange:function(t){e.onChanged&&e.onChanged(t.target.value)}})}function A(e){var t=e.options,n=t.findIndex(function(t){return t.value===e.value}),r=!e.onChanged;return a.a.createElement(C.a.Control,{as:"select",value:""+n,disabled:r,onChange:function(n){e.onChanged&&e.onChanged(t[n.target.value].value)}},t.map(function(e,t){return a.a.createElement("option",{key:t,value:""+t},e.label)}))}function R(e){var t=e.label,n=e.children;return a.a.createElement(C.a.Group,null,a.a.createElement(C.a.Label,null,t),n)}(I||(I={})).SET_CHANGED_QUANTITY="example.SET_CHANGED_QUANTITY";var T=[{_key:"id",width:160,title:"Id"},{_key:"quantity",width:150,title:"Quantity"},{_key:"date",width:150,title:"Date"},{_key:"remark",width:150,title:"Remark"}],L=[{_key:"id",width:160,title:"Id"},{_key:"quantity",width:150,title:"Quantity",editable:!0}],D={products:function(e){return e.data.products},productNo:{value:function(e,t){return t[0].no},dependsOn:["products"]},productDescription:{value:function(e,t,n){var r=n.find(function(e){return e.no===t});return r?r.description:""},dependsOn:["productNo","products"]},data:{value:function(e,t){return S(e.data.salesOrders[t],function(e){return e.id},T)},dependsOn:["productNo"]},selectedId:{value:function(){return""},dependsOn:["data"]},data2:{value:function(e,t,n){var r=t&&e.data.forecasts[t]?S(e.data.forecasts[t],function(e){return e.id},L):[],a=!0,o=!1,u=void 0;try{for(var i,d=r[Symbol.iterator]();!(a=(i=d.next()).done);a=!0){var c=i.value,l=n.get(c[0]);null!=l&&(c[1]=l)}}catch(s){o=!0,u=s}finally{try{a||null==d.return||d.return()}finally{if(o)throw u}}return r},dependsOn:["selectedId",function(e){return e.data.changedQuantities}]},totalQuantity:{value:function(e,t){return t.reduce(function(e,t){return e+parseFloat(t[1])},0)},dependsOn:["data2"]}};var x=Object(f.b)()(function(e){var t=e.dispatch;return a.a.createElement(q,{formId:"form-1",providers:D,selectState:function(e){return e.form}},function(e){var n=e.values,o=e.actions,u=Object(r.useMemo)(function(){return n.products.map(function(e){return{label:e.name,value:e.no}})},[n.products]);return a.a.createElement(v.a,null,a.a.createElement(h.a,{onClick:function(){return o.resetAllValues()}},"Reset"),a.a.createElement(R,{label:"Product no"},a.a.createElement(A,{value:n.productNo,options:u,onChanged:function(e){return o.setValue("productNo",e)}})),a.a.createElement(R,{label:"Product Description"},a.a.createElement(j,{value:n.productDescription,onChanged:function(e){return o.setValue("productDescription",e)}})),a.a.createElement(O,{gridId:"grid-1",data:n.data,opts:{columns:T},extensions:{selection:!0},onSelectionChanged:function(e){return o.setValue("selectedId",e)}}),a.a.createElement(R,{label:"Selected Id"},a.a.createElement(j,{value:n.selectedId,onChanged:function(e){return o.setValue("selectedId",e)}})),a.a.createElement(R,{label:"Total"},a.a.createElement(j,{value:""+n.totalQuantity})),a.a.createElement(O,{gridId:"grid-2",data:n.data2,onValueChanged:function(e,n,r){return t(function(e,t){return{type:I.SET_CHANGED_QUANTITY,id:e,quantity:t}}(e,parseFloat(r)))},opts:{columns:L},extensions:{editing:!0}}))})}),M=n(61),N=n(44),F=Object(N.b)({forms:Object(N.a)()}),B=Object(N.b)({values:Object(N.a)()});function U(e,t,n){return e.update("forms",function(e){return e.update(t,function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:B();return n(e)})})}var Q={products:[{name:"Product A",no:"1",description:"product A description"},{name:"Product B",no:"2",description:"product B description"},{name:"Product C",no:"3",description:"product C description"}],salesOrders:{1:[{id:"a",date:"01/01-2019",quantity:1,remark:"product A - order 1"},{id:"b",date:"02/01-2019",quantity:2,remark:"product A - order 2"},{id:"c",date:"03/01-2019",quantity:2,remark:"product A - order 3"}],2:[{id:"d",date:"01/01-2019",quantity:1,remark:"product B - order 4"},{id:"e",date:"02/01-2019",quantity:2,remark:"product B - order 5"},{id:"f",date:"03/01-2019",quantity:4,remark:"product B - order 6"},{id:"g",date:"04/01-2019",quantity:8,remark:"product B - order 7"}],3:[{id:"h",date:"01/01-2019",quantity:1,remark:"product C - order 8"}]},forecasts:{a:[{id:"a1",quantity:1},{id:"a2",quantity:2}],b:[{id:"b1",quantity:3},{id:"b2",quantity:4}],c:[{id:"c1",quantity:5},{id:"c2",quantity:6},{id:"c3",quantity:7},{id:"c4",quantity:8}],d:[{id:"d1",quantity:9},{id:"d2",quantity:10}],e:[{id:"d1",quantity:11}],f:[{id:"f1",quantity:12},{id:"f2",quantity:13}],g:[{id:"g1",quantity:14},{id:"g2",quantity:15},{id:"g3",quantity:16},{id:"g4",quantity:17}],h:[{id:"h1",quantity:18},{id:"h2",quantity:19}]},changedQuantities:Object(N.a)()};var P=Object(M.c)(Object(M.b)({form:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:F(),t=arguments.length>1?arguments[1]:void 0;switch(t.type){case g.SET_FORM_VALUE:return function(e,t){var n=t.formId,r=t.key,a=t.value;return U(e,n,function(e){return e.update("values",function(e){return e.set(r,a)})})}(e,t);case g.RESET_ALL_FORM_VALUES:return function(e,t){var n=t.formId;return U(e,n,function(e){return e.delete("values")})}(e,t);case g.RESET_FORM_VALUES:return function(e,t){var n=t.formId,r=t.keys;return U(e,n,function(e){return e.update("values",function(e){return e.withMutations(function(e){var t=!0,n=!1,a=void 0;try{for(var o,u=r[Symbol.iterator]();!(t=(o=u.next()).done);t=!0){var i=o.value;e.delete(i)}}catch(d){n=!0,a=d}finally{try{t||null==u.return||u.return()}finally{if(n)throw a}}})})})}(e,t);default:return e}},data:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Q,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case I.SET_CHANGED_QUANTITY:return function(e,t){var n=t.id,r=t.quantity,a=e.changedQuantities.set(n,r);return Object(p.a)({},e,{changedQuantities:a})}(e,t)}return e}}),window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__()),G=function(e){function t(){return Object(i.a)(this,t),Object(c.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(s.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){return a.a.createElement(f.a,{store:P},a.a.createElement(x,null))}}]),t}(r.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));u.a.render(a.a.createElement(G,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[150,1,2]]]);
//# sourceMappingURL=main.a9d278f1.chunk.js.map