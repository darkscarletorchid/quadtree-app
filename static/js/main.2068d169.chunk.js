(this["webpackJsonpquadtree-app"]=this["webpackJsonpquadtree-app"]||[]).push([[0],{35:function(e,t,n){e.exports=n(45)},36:function(e,t,n){},41:function(e,t,n){},45:function(e,t,n){"use strict";n.r(t);n(36);var i=n(0),l=n.n(i),s=n(12),a=n.n(s),o=(n(41),n(46)),h=n(65),r=n(67),c=n(66),d=n(63),u=n(19),m=n(26),v=function e(t,n,i,l){Object(u.a)(this,e),this.x=t,this.y=n,this.size=i},w=function(){function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,l=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[],s=arguments.length>4&&void 0!==arguments[4]?arguments[4]:null;function a(e,t){return e=Math.ceil(e),t=Math.floor(t),Math.floor(Math.random()*(t-e))+e}Object(u.a)(this,e),this.level=t,this.color=l[a(0,l.length)],this.maxLevels=n,this.bounds=i,this.parent=s,this.highlighted=!1,this.children=[],this.colorList=l}return Object(m.a)(e,[{key:"split",value:function(){if(0===this.children.length&&this.level!==this.maxLevels){var t=this.bounds.size/2,n=this.bounds.x,i=this.bounds.y;this.color=null,this.children[0]=new e(this.level+1,this.maxLevels,new v(n+t,i,t),this.colorList,this),this.children[1]=new e(this.level+1,this.maxLevels,new v(n,i,t),this.colorList,this),this.children[2]=new e(this.level+1,this.maxLevels,new v(n,i+t,t),this.colorList,this),this.children[3]=new e(this.level+1,this.maxLevels,new v(n+t,i+t,t),this.colorList,this)}}},{key:"smash",value:function(){if(0!==this.level&&this.level!==this.maxLevels){var t=this.bounds.size/2,n=this.bounds.x,i=this.bounds.y;this.color=null,this.children[0]=new e(this.level+1,this.maxLevels,new v(n+t,i,t),this.colorList,this),this.children[1]=new e(this.level+1,this.maxLevels,new v(n,i,t),this.colorList,this),this.children[2]=new e(this.level+1,this.maxLevels,new v(n,i+t,t),this.colorList,this),this.children[3]=new e(this.level+1,this.maxLevels,new v(n+t,i+t,t),this.colorList,this)}}},{key:"swap",value:function(e){0!==this.children.length&&(1===e?(this.swapNodes(this.children[0],this.children[3]),this.swapNodes(this.children[1],this.children[2])):0===e&&(this.swapNodes(this.children[1],this.children[0]),this.swapNodes(this.children[2],this.children[3])))}},{key:"swapNodes",value:function(e,t){var n=e,i={x:e.bounds.x,y:e.bounds.y},l=t,s={x:t.bounds.x,y:t.bounds.y};t=n,(e=l).updatePositions.call(e,i.x,i.y),t.updatePositions.call(t,s.x,s.y)}},{key:"rotate",value:function(e){0!==this.children.length&&(1===e?(this.swapNodes(this.children[0],this.children[3]),this.swapNodes(this.children[3],this.children[2]),this.swapNodes(this.children[2],this.children[1])):0===e&&(this.swapNodes(this.children[0],this.children[1]),this.swapNodes(this.children[1],this.children[2]),this.swapNodes(this.children[2],this.children[3])))}},{key:"getDrawingParams",value:function(){var e=[];return function t(n){0==n.children.length?e.push({bounds:n.bounds,fill:n.color,stroke:{color:"#000000",width:1}}):n.children.forEach((function(e){t(e)})),n.highlighted&&e.push({bounds:n.bounds,stroke:{color:"#FFFFFF",width:5}})}(this),e}},{key:"updatePositions",value:function(e,t){this.bounds.x=e,this.bounds.y=t;!function e(t,n,i){if(0!=t.children.length){var l=t.bounds.size/2;t.children[0].bounds=new v(n+l,i,l),e(t.children[0],t.children[0].bounds.x,t.children[0].bounds.y),t.children[1].bounds=new v(n,i,l),e(t.children[1],t.children[1].bounds.x,t.children[1].bounds.y),t.children[2].bounds=new v(n,i+l,l),e(t.children[2],t.children[2].bounds.x,t.children[2].bounds.y),t.children[3].bounds=new v(n+l,i+l,l),e(t.children[3],t.children[3].bounds.x,t.children[3].bounds.y)}}(this,e,t)}},{key:"getSelectedRectangle",value:function(e,t,n){var i=function i(l){if(l.level==n||0==l.children.length)return l;var s=null;return l.children.forEach((function(n){var l=n.bounds.x,a=n.bounds.x+n.bounds.size,o=n.bounds.y,h=n.bounds.y+n.bounds.size;e>=l&&e<=a&&t>=o&&t<=h&&(s=i(n))})),s};return i(this)}}]),e}(),g=function(e){var t=document.getElementById("canvas"),n=t.getContext("2d");n.clearRect(0,0,t.width,t.height),e.forEach((function(e){var t=e.bounds;n.beginPath(),n.rect(t.x,t.y,t.size,t.size),e.fill&&(n.fillStyle=e.fill,n.fill()),e.stroke&&(n.strokeStyle=e.stroke.color,n.lineWidth=e.stroke.width,n.stroke()),n.closePath()}))},b=null,f=null,p=5,y=0;var x=function(e){return e.gameGenerated,l.a.createElement("div",{className:"App"},l.a.createElement(d.a,{maxWidth:"sm"},l.a.createElement(o.a,{variant:"contained",color:"primary",onClick:function(){b=new w(0,p,new v(0,0,400),["#FF0000","#00FF00","#0000FF","#FFFF00"]);!function e(t,n){t>0&&(n.split(),n.children.forEach((function(n){Math.random()>=.5&&e(t-1,n)})))}(p,b),g(b.getDrawingParams()),!0}},"New Game"),l.a.createElement(h.a,{id:"select-max-level",gutterBottom:!0},"Max level"),l.a.createElement(r.a,{defaultValue:5,"aria-labelledby":"select-max-level",step:1,marks:!0,min:1,max:9,valueLabelDisplay:"on",onChange:function(e,t){p=t}}),l.a.createElement("div",{id:"scene"},l.a.createElement("canvas",{id:"canvas",width:"400",height:"400",style:{backgroundColor:"whitesmoke"},onClick:function(e){if(b){var t=e.currentTarget.getBoundingClientRect(),n=e.clientX-t.left,i=e.clientY-t.top;f&&(f.highlighted=!1),(f=b.getSelectedRectangle(n,i,y)).highlighted=!0,g(b.getDrawingParams())}}})),l.a.createElement(h.a,{id:"select-action-level",gutterBottom:!0},"Select level"),l.a.createElement(r.a,{defaultValue:5,"aria-labelledby":"select-action-level",step:1,marks:!0,min:0,max:p,valueLabelDisplay:"on",onChange:function(e,t){y=t}}),l.a.createElement(c.a,{variant:"contained",color:"primary","aria-label":"contained primary button group"},l.a.createElement(o.a,{onClick:function(){null!=f&&(f.rotate(1),g(b.getDrawingParams()))}},"Rotate clockwise"),l.a.createElement(o.a,{onClick:function(){null!=f&&(f.rotate(0),g(b.getDrawingParams()))}},"Rotate counterclockwise")),l.a.createElement(c.a,{variant:"contained",color:"primary","aria-label":"contained primary button group"},l.a.createElement(o.a,{onClick:function(){null!=f&&(f.swap(1),g(b.getDrawingParams()))}},"Swap horizontally"),l.a.createElement(o.a,{onClick:function(){null!=f&&(f.swap(0),g(b.getDrawingParams()))}},"Swap vertically")),l.a.createElement(c.a,{variant:"contained",color:"primary","aria-label":"contained primary button group"},l.a.createElement(o.a,{onClick:function(){null!=f&&(f.smash(),g(b.getDrawingParams()))}},"Smash"))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(x,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[35,1,2]]]);
//# sourceMappingURL=main.2068d169.chunk.js.map