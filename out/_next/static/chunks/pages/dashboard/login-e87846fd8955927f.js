(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[772],{3845:function(e,t,r){"use strict";var o=r(4836);t.Z=void 0;var a=o(r(4938)),n=r(5893),l=(0,a.default)((0,n.jsx)("path",{d:"M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"}),"LockOutlined");t.Z=l},1953:function(e,t,r){"use strict";r.d(t,{Z:function(){return f}});var o=r(7462),a=r(3366),n=r(7294),l=r(6010),i=r(9731),c=r(6523),s=r(9707),d=r(9718),u=r(5893);let m=["className","component"];var p=r(7078),h=r(4821);let b=(0,h.Z)(),Z=function(e={}){let{defaultTheme:t,defaultClassName:r="MuiBox-root",generateClassName:p,styleFunctionSx:h=c.Z}=e,b=(0,i.ZP)("div",{shouldForwardProp:e=>"theme"!==e&&"sx"!==e&&"as"!==e})(h),Z=n.forwardRef(function(e,n){let i=(0,d.Z)(t),c=(0,s.Z)(e),{className:h,component:Z="div"}=c,f=(0,a.Z)(c,m);return(0,u.jsx)(b,(0,o.Z)({as:Z,ref:n,className:(0,l.Z)(h,p?p(r):r),theme:i},f))});return Z}({defaultTheme:b,defaultClassName:"MuiBox-root",generateClassName:p.Z.generate});var f=Z},1362:function(e,t,r){"use strict";r.d(t,{Z:function(){return E}});var o=r(3366),a=r(7462),n=r(7294),l=r(6010),i=r(4780),c=r(1796),s=r(6622),d=r(1719),u=r(2293),m=r(9711),p=r(9828),h=r(1588),b=r(4867);function Z(e){return(0,b.Z)("PrivateSwitchBase",e)}(0,h.Z)("PrivateSwitchBase",["root","checked","disabled","input","edgeStart","edgeEnd"]);var f=r(5893);let v=["autoFocus","checked","checkedIcon","className","defaultChecked","disabled","disableFocusRipple","edge","icon","id","inputProps","inputRef","name","onBlur","onChange","onFocus","readOnly","required","tabIndex","type","value"],x=e=>{let{classes:t,checked:r,disabled:o,edge:a}=e,n={root:["root",r&&"checked",o&&"disabled",a&&`edge${(0,s.Z)(a)}`],input:["input"]};return(0,i.Z)(n,Z,t)},g=(0,d.ZP)(p.Z)(({ownerState:e})=>(0,a.Z)({padding:9,borderRadius:"50%"},"start"===e.edge&&{marginLeft:"small"===e.size?-3:-12},"end"===e.edge&&{marginRight:"small"===e.size?-3:-12})),k=(0,d.ZP)("input")({cursor:"inherit",position:"absolute",opacity:0,width:"100%",height:"100%",top:0,left:0,margin:0,padding:0,zIndex:1}),w=n.forwardRef(function(e,t){let{autoFocus:r,checked:n,checkedIcon:i,className:c,defaultChecked:s,disabled:d,disableFocusRipple:p=!1,edge:h=!1,icon:b,id:Z,inputProps:w,inputRef:P,name:j,onBlur:y,onChange:C,onFocus:R,readOnly:F,required:z,tabIndex:N,type:S,value:B}=e,M=(0,o.Z)(e,v),[$,I]=(0,u.Z)({controlled:n,default:Boolean(s),name:"SwitchBase",state:"checked"}),L=(0,m.Z)(),E=e=>{R&&R(e),L&&L.onFocus&&L.onFocus(e)},_=e=>{y&&y(e),L&&L.onBlur&&L.onBlur(e)},H=e=>{if(e.nativeEvent.defaultPrevented)return;let t=e.target.checked;I(t),C&&C(e,t)},O=d;L&&void 0===O&&(O=L.disabled);let V=(0,a.Z)({},e,{checked:$,disabled:O,disableFocusRipple:p,edge:h}),D=x(V);return(0,f.jsxs)(g,(0,a.Z)({component:"span",className:(0,l.Z)(D.root,c),centerRipple:!0,focusRipple:!p,disabled:O,tabIndex:null,role:void 0,onFocus:E,onBlur:_,ownerState:V,ref:t},M,{children:[(0,f.jsx)(k,(0,a.Z)({autoFocus:r,checked:n,defaultChecked:s,className:D.input,disabled:O,id:("checkbox"===S||"radio"===S)&&Z,name:j,onChange:H,readOnly:F,ref:P,required:z,ownerState:V,tabIndex:N,type:S},"checkbox"===S&&void 0===B?{}:{value:B},w)),$?i:b]}))});var P=r(4235),j=(0,P.Z)((0,f.jsx)("path",{d:"M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"}),"CheckBoxOutlineBlank"),y=(0,P.Z)((0,f.jsx)("path",{d:"M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}),"CheckBox"),C=(0,P.Z)((0,f.jsx)("path",{d:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"}),"IndeterminateCheckBox"),R=r(8884);function F(e){return(0,b.Z)("MuiCheckbox",e)}let z=(0,h.Z)("MuiCheckbox",["root","checked","disabled","indeterminate","colorPrimary","colorSecondary"]),N=["checkedIcon","color","icon","indeterminate","indeterminateIcon","inputProps","size","className"],S=e=>{let{classes:t,indeterminate:r,color:o}=e,n={root:["root",r&&"indeterminate",`color${(0,s.Z)(o)}`]},l=(0,i.Z)(n,F,t);return(0,a.Z)({},t,l)},B=(0,d.ZP)(w,{shouldForwardProp:e=>(0,d.FO)(e)||"classes"===e,name:"MuiCheckbox",slot:"Root",overridesResolver(e,t){let{ownerState:r}=e;return[t.root,r.indeterminate&&t.indeterminate,"default"!==r.color&&t[`color${(0,s.Z)(r.color)}`]]}})(({theme:e,ownerState:t})=>(0,a.Z)({color:(e.vars||e).palette.text.secondary},!t.disableRipple&&{"&:hover":{backgroundColor:e.vars?`rgba(${"default"===t.color?e.vars.palette.action.activeChannel:e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.hoverOpacity})`:(0,c.Fq)("default"===t.color?e.palette.action.active:e.palette[t.color].main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"default"!==t.color&&{[`&.${z.checked}, &.${z.indeterminate}`]:{color:(e.vars||e).palette[t.color].main},[`&.${z.disabled}`]:{color:(e.vars||e).palette.action.disabled}})),M=(0,f.jsx)(y,{}),$=(0,f.jsx)(j,{}),I=(0,f.jsx)(C,{}),L=n.forwardRef(function(e,t){var r,i;let c=(0,R.Z)({props:e,name:"MuiCheckbox"}),{checkedIcon:s=M,color:d="primary",icon:u=$,indeterminate:m=!1,indeterminateIcon:p=I,inputProps:h,size:b="medium",className:Z}=c,v=(0,o.Z)(c,N),x=m?p:u,g=m?p:s,k=(0,a.Z)({},c,{color:d,indeterminate:m,size:b}),w=S(k);return(0,f.jsx)(B,(0,a.Z)({type:"checkbox",inputProps:(0,a.Z)({"data-indeterminate":m},h),icon:n.cloneElement(x,{fontSize:null!=(r=x.props.fontSize)?r:b}),checkedIcon:n.cloneElement(g,{fontSize:null!=(i=g.props.fontSize)?i:b}),ownerState:k,ref:t,className:(0,l.Z)(w.root,Z)},v,{classes:w}))});var E=L},7343:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/dashboard/login",function(){return r(8728)}])},8728:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return M}});var o=r(5893),a=r(7294),n=r(4731),l=r(5084),i=r(7169),c=r(3366),s=r(7462),d=r(6010),u=r(4780),m=r(9711),p=r(9630),h=r(6622),b=r(1719),Z=r(8884),f=r(1588),v=r(4867);function x(e){return(0,v.Z)("MuiFormControlLabel",e)}let g=(0,f.Z)("MuiFormControlLabel",["root","labelPlacementStart","labelPlacementTop","labelPlacementBottom","disabled","label","error"]);var k=r(6594);let w=["checked","className","componentsProps","control","disabled","disableTypography","inputRef","label","labelPlacement","name","onChange","value"],P=e=>{let{classes:t,disabled:r,labelPlacement:o,error:a}=e,n={root:["root",r&&"disabled",`labelPlacement${(0,h.Z)(o)}`,a&&"error"],label:["label",r&&"disabled"]};return(0,u.Z)(n,x,t)},j=(0,b.ZP)("label",{name:"MuiFormControlLabel",slot:"Root",overridesResolver(e,t){let{ownerState:r}=e;return[{[`& .${g.label}`]:t.label},t.root,t[`labelPlacement${(0,h.Z)(r.labelPlacement)}`]]}})(({theme:e,ownerState:t})=>(0,s.Z)({display:"inline-flex",alignItems:"center",cursor:"pointer",verticalAlign:"middle",WebkitTapHighlightColor:"transparent",marginLeft:-11,marginRight:16,[`&.${g.disabled}`]:{cursor:"default"}},"start"===t.labelPlacement&&{flexDirection:"row-reverse",marginLeft:16,marginRight:-11},"top"===t.labelPlacement&&{flexDirection:"column-reverse",marginLeft:16},"bottom"===t.labelPlacement&&{flexDirection:"column",marginLeft:16},{[`& .${g.label}`]:{[`&.${g.disabled}`]:{color:(e.vars||e).palette.text.disabled}}})),y=a.forwardRef(function(e,t){let r=(0,Z.Z)({props:e,name:"MuiFormControlLabel"}),{className:n,componentsProps:l={},control:i,disabled:u,disableTypography:h,label:b,labelPlacement:f="end"}=r,v=(0,c.Z)(r,w),x=(0,m.Z)(),g=u;void 0===g&&void 0!==i.props.disabled&&(g=i.props.disabled),void 0===g&&x&&(g=x.disabled);let y={disabled:g};["checked","name","onChange","value","inputRef"].forEach(e=>{void 0===i.props[e]&&void 0!==r[e]&&(y[e]=r[e])});let C=(0,k.Z)({props:r,muiFormControl:x,states:["error"]}),R=(0,s.Z)({},r,{disabled:g,labelPlacement:f,error:C.error}),F=P(R),z=b;return null==z||z.type===p.Z||h||(z=(0,o.jsx)(p.Z,(0,s.Z)({component:"span",className:F.label},l.typography,{children:z}))),(0,o.jsxs)(j,(0,s.Z)({className:(0,d.Z)(F.root,n),ownerState:R,ref:t},v,{children:[a.cloneElement(i,y),z]}))});var C=r(1362),R=r(8346),F=r(918),z=r(1953),N=r(9072),S=r(3845);function B(e){return(0,o.jsxs)(p.Z,{variant:"body2",color:"text.secondary",align:"center",...e,children:["Copyright \xa9 ",(0,o.jsx)(R.Z,{color:"inherit",href:"#",children:"nextsoftware"})," ",new Date().getFullYear(),"."]})}function M(){let e=e=>{e.preventDefault();let t=new FormData(e.currentTarget);console.log({email:t.get("email"),password:t.get("password")})};return(0,o.jsx)(N.ZP,{container:!0,component:"main",sx:{height:"100vh"},children:(0,o.jsx)(N.ZP,{item:!0,xs:12,sm:12,md:12,component:F.Z,elevation:6,square:!0,children:(0,o.jsxs)(z.Z,{sx:{my:8,mx:4,display:"flex",flexDirection:"column",alignItems:"center"},children:[(0,o.jsx)(n.Z,{sx:{m:1,bgcolor:"secondary.main"},children:(0,o.jsx)(S.Z,{})}),(0,o.jsx)(p.Z,{component:"h1",variant:"h5",children:"Login"}),(0,o.jsxs)(z.Z,{component:"form",noValidate:!0,onSubmit:e,sx:{mt:1},children:[(0,o.jsx)(i.Z,{margin:"normal",required:!0,fullWidth:!0,id:"email",label:"Email Address",name:"email",autoComplete:"email",autoFocus:!0}),(0,o.jsx)(i.Z,{margin:"normal",required:!0,fullWidth:!0,name:"password",label:"Password",type:"password",id:"password",autoComplete:"current-password"}),(0,o.jsx)(y,{control:(0,o.jsx)(C.Z,{value:"remember",color:"primary"}),label:"Remember me"}),(0,o.jsx)(l.Z,{type:"submit",fullWidth:!0,variant:"contained",sx:{mt:3,mb:2},children:"Sign In"}),(0,o.jsx)(N.ZP,{container:!0,children:(0,o.jsx)(N.ZP,{item:!0,xs:!0,children:(0,o.jsx)(R.Z,{href:"#",variant:"body2",children:"Forgot password?"})})}),(0,o.jsx)(B,{sx:{mt:5}})]})]})})})}}},function(e){e.O(0,[630,828,648,191,298,72,774,888,179],function(){return e(e.s=7343)}),_N_E=e.O()}]);