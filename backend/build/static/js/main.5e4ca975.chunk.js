(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{41:function(e,n,t){"use strict";t.r(n);var o=t(1),c=t(17),r=t.n(c),i=t(3),u=t(4),a=t(0),s=function(e){var n=e.persons,t=e.onClick;return n.map((function(e){return Object(a.jsxs)("div",{children:[e.name," ",e.number," ",Object(a.jsx)("button",{onClick:function(){return t(e.id)},children:"delete"})]},e.id)}))},d=function(e){var n=e.value,t=e.onChange;return Object(a.jsxs)("div",{children:["filter shown with ",Object(a.jsx)("input",{value:n,onChange:t})]})},l=function(e){var n=e.type,t=e.value,o=e.onChange;return Object(a.jsxs)("div",{children:[n,": ",Object(a.jsx)("input",{value:t,onChange:o})]})},j=t(5),b=t.n(j),f="/api/persons",h=function(){return b.a.get(f).then((function(e){return e.data}))},O=function(e){return b.a.post(f,e).then((function(e){return e.data}))},m=function(e,n){var t=b.a.delete("".concat(f,"/").concat(e),{removedObject:n});return console.log("".concat(f,"/").concat(e)),t.then((function(e){return e}))},v=function(e,n){return b.a.put("".concat(f,"/").concat(e),n).then((function(e){return e.data}))},x=function(e){var n=e.isGood,t=e.message;if(null===t)return null;var o=n?{color:"green"}:{color:"red"};return Object(a.jsx)("div",{style:Object(i.a)(Object(i.a)({},{background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:1,padding:10,marginBottom:10,width:"max-content"}),o),children:t})},g=function(){var e=Object(o.useState)([]),n=Object(u.a)(e,2),t=n[0],c=n[1],r=Object(o.useState)(""),j=Object(u.a)(r,2),b=j[0],f=j[1],g=Object(o.useState)(""),p=Object(u.a)(g,2),w=p[0],C=p[1],y=Object(o.useState)(""),k=Object(u.a)(y,2),S=k[0],G=k[1],A=Object(o.useState)({text:null,isGood:!0}),B=Object(u.a)(A,2),E=B[0],J=B[1];Object(o.useEffect)((function(){h().then((function(e){c(e)}))}),[]);var L=function(e,n){J({isGood:e,text:n}),setTimeout((function(){J({isGood:null,text:null})}),5e3)},T=function(e){var n=Object(i.a)(Object(i.a)({},e),{},{number:w});v(e.id,n).then((function(){c(t.map((function(e){return e.id===n.id?n:e}))),console.log("returned")}))},z=""===S?t:t.filter((function(e){return e.name.toLowerCase().includes(S.toLowerCase())}));return Object(a.jsxs)("div",{children:[Object(a.jsx)("h2",{children:"Phonebook"}),Object(a.jsx)(x,{isGood:E.isGood,message:E.text}),Object(a.jsx)(d,{value:S,onChange:function(e){G(e.target.value)}}),Object(a.jsxs)("form",{children:[Object(a.jsx)("h2",{children:"Add a new"}),Object(a.jsx)(l,{type:"name",value:b,onChange:function(e){f(e.target.value)}}),Object(a.jsx)(l,{type:"number",value:w,onChange:function(e){C(e.target.value)}}),Object(a.jsx)("div",{children:Object(a.jsx)("button",{type:"submit",onClick:function(e){e.preventDefault();var n=t.find((function(e){return e.name===b}));n?window.confirm("This person already exists, would you like to update their number?")&&(console.log(n),T(n),L(!0,"Changed ".concat(n.name))):O({name:b,number:w}).then((function(e){console.log(e),c(t.concat(e)),L(!0,"Added ".concat(e.name))}))},children:"add"})})]}),Object(a.jsx)("h2",{children:"Numbers"}),Object(a.jsx)(s,{persons:z,onClick:function(e){var n=t.filter((function(n){return n.id===e}))[0];window.confirm("Are you sure you want to delete ".concat(n.name))&&m(e,n).then((function(){c(t.filter((function(e){return e.id!==n.id})))})).catch((function(){L(!1,"".concat(n.name," has already been removed from server")),c(t.filter((function(e){return e.id!==n.id})))}))}})]})};r.a.render(Object(a.jsx)(g,{}),document.getElementById("root"))}},[[41,1,2]]]);
//# sourceMappingURL=main.5e4ca975.chunk.js.map