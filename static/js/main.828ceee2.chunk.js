(this.webpackJsonpgazewatch=this.webpackJsonpgazewatch||[]).push([[0],{142:function(t,e,n){},143:function(t,e,n){},166:function(t,e,n){"use strict";n.r(e);var a=n(0),r=n.n(a),i=n(36),c=n.n(i),o=(n(142),n(8)),s=n(15),u=n(10),l=n(11),p=n(177),d=n(182),f=n(85),h=n(185),j=n(186),v=n(175),m=n(184),g=n(181),y=n(180),b=n(188),x=n(80),O=(n(143),n(84)),w=n(3),k=n.n(w),z=n(9),S=n(176),C=n(5),E=function(t){Object(u.a)(n,t);var e=Object(l.a)(n);function n(t){var a;return Object(o.a)(this,n),(a=e.call(this,t)).visualRef=void 0,a.visualRef=r.a.createRef(),a.state={loading:!0,data:{name:"timmeinerzhagen",children:[{name:"BetweennessCentrality",value:20}]}},a}return Object(s.a)(n,[{key:"componentDidMount",value:function(){var t=Object(z.a)(k.a.mark((function t(){return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.reload();case 2:this.draw();case 3:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"componentDidUpdate",value:function(){var t=Object(z.a)(k.a.mark((function t(e){return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(JSON.stringify(e.input)===JSON.stringify(this.props.input)){t.next=5;break}return this.setState({loading:!0}),t.next=4,this.reload();case 4:this.draw();case 5:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}()},{key:"render",value:function(){var t=this.state.loading;return Object(C.jsxs)(f.a,{align:"center",justify:"center",direction:"column",fill:!0,children:[t&&Object(C.jsx)(S.a,{justify:"center"}),Object(C.jsx)(f.a,{ref:this.visualRef,fill:!t,style:{display:t?"none":"block"}})]})}},{key:"reload",value:function(){var t=Object(z.a)(k.a.mark((function t(){return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}()},{key:"draw",value:function(){}},{key:"createVisualizationData",value:function(t){var e={name:"timmeinerzhagen",children:[]};return Object.keys(t).forEach((function(n){var a=t[n],r=[];a.forEach((function(t){r.push({name:t.name,value:t.stargazers_count})})),e.children.push({name:n,children:r})})),e}}]),n}(r.a.Component),R=n(17),D=R.e().domain([0,5]).range(["hsl(152,80%,80%)","hsl(228,30%,40%)"]).interpolate(R.b),V=1e3,B=1e3;function _(t){var e=0;if("value"in t&&(e+=t.value),void 0===t||void 0===t.children)return e;for(var n in t.children){e+=t.children[n].value}return e}var A=function(){function t(){Object(o.a)(this,t)}return Object(s.a)(t,null,[{key:"draw",value:function(t,e,n){var a=n.range;R.f(t.current).selectAll("*").remove();var r,i=function(t){return R.d().size([V,B]).padding(3)(R.a(t).sum((function(t){return t.value})).sort((function(t,e){return e.value-t.value})))}(e),c=i,o=R.f(t.current).append("svg").attr("viewBox","-".concat(500," -").concat(500," ").concat(V," ").concat(B)).style("height","100%").style("width","100%").style("display","block").style("margin","0 -14px").style("cursor","pointer").on("click",(function(t){return d(t,i)})),s=o.append("g").selectAll("circle").data(i.descendants().slice(1)).join("circle").attr("fill",(function(t){return t.children?D(t.depth):"white"})).attr("pointer-events",(function(t){return t.parent.data.name===c.data.name?null:"none"})).on("mouseover",(function(){R.f(this).attr("stroke","#000")})).on("mouseout",(function(){R.f(this).attr("stroke",null)})).on("click",(function(t,e){return c!==e&&(d(t,e),t.stopPropagation())})),u=o.append("g").style("font","25px sans-serif").attr("pointer-events","none").attr("text-anchor","middle").selectAll("text").data(i.descendants()).join("text").style("fill-opacity",(function(t){return t.parent===i?1:0})).style("display",(function(t){return _(t)>a?"inline":"none"})).text((function(t){return t.data.name})),l=o.append("text").style("font","40px sans-serif").attr("text-anchor","middle").attr("font-weight",700).style("display","none").text("Placeholder").attr("x",0).attr("y","-".concat(400));function p(t){var e=V/t[2];r=t,u.attr("transform",(function(n){return"translate(".concat((n.x-t[0])*e,",").concat((n.y-t[1])*e,")")})),s.attr("transform",(function(n){return"translate(".concat((n.x-t[0])*e,",").concat((n.y-t[1])*e,")")})),s.attr("r",(function(t){return t.r*e}))}function d(t,e){c=e,null===e.parent?l.style("display","none"):l.text(e.data.name).style("display","inline");var n=o.transition().duration(t.altKey?7500:750).tween("zoom",(function(t){var e=R.c(r,[c.x,c.y,2*c.r]);return function(t){return p(e(t))}}));u.filter((function(t){return t.parent===c||"inline"===this.style.display})).transition(n).style("fill-opacity",(function(t){return t.parent===c?1:0})).on("start",(function(t){this.style.display=t.parent===c&&!t.children||_(t)>a?"inline":"none"})).on("end",(function(t){this.style.display=t.parent===c&&!t.children||_(t)>a?"inline":"none"})),s.attr("pointer-events",(function(t){return t.depth-c.depth<=1?null:"none"}))}return p([i.x,i.y,2*i.r]),o.node()}}]),t}(),J=function(t){Object(u.a)(n,t);var e=Object(l.a)(n);function n(){return Object(o.a)(this,n),e.apply(this,arguments)}return Object(s.a)(n,[{key:"draw",value:function(){A.draw(this.visualRef,this.state.data,this.props.options)}},{key:"reload",value:function(){var t=Object(z.a)(k.a.mark((function t(){var e,n,a=this;return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=this.props.context.octokit,n=this.props.input.username,t.next=4,e.paginate(e.rest.activity.listReposStarredByUser,{username:n,per_page:100}).then((function(t){var e={};t.forEach((function(t){t.owner.login in e?e[t.owner.login].push(t):e[t.owner.login]=[t]})),a.setState({loading:!1,data:a.createVisualizationData(e)})})).catch((function(t){console.error(t)}));case 4:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()}]),n}(E),P=function(t){Object(u.a)(n,t);var e=Object(l.a)(n);function n(){return Object(o.a)(this,n),e.apply(this,arguments)}return Object(s.a)(n,[{key:"draw",value:function(){A.draw(this.visualRef,this.state.data,this.props.options)}},{key:"reload",value:function(){var t=Object(z.a)(k.a.mark((function t(){var e,n,a=this;return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=this.props.context.octokit,n=this.props.input.username,t.next=4,e.paginate(e.rest.activity.listReposStarredByUser,{username:n,per_page:100}).then((function(t){var e={};t.forEach((function(t){t.topics.forEach((function(n){n in e?e[n].push(t):e[n]=[t]}))})),a.setState({loading:!1,data:a.createVisualizationData(e)})})).catch((function(t){console.error(t)}));case 4:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()}]),n}(E),F=Object(x.deepMerge)(p.a,{global:{elevation:"large"},tabs:{background:"light-1"},tab:{pad:"small"}}),M=function(t){Object(u.a)(n,t);var e=Object(l.a)(n);function n(){var t;Object(o.a)(this,n);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(t=e.call.apply(e,[this].concat(r))).state={octokit:new O.a({previews:["mercy-preview"],auth:"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"}),stargazer_range:3e5,username:"timmeinerzhagen",value:"timmeinerzhagen"},t}return Object(s.a)(n,[{key:"render",value:function(){var t=this,e=this.state,n=e.stargazer_range,a=e.username,r=e.octokit,i=e.value;return Object(C.jsx)(d.a,{theme:F,full:!0,children:Object(C.jsxs)(f.a,{align:"center",pad:"small",fill:!0,children:[Object(C.jsx)(f.a,{align:"center",gap:"medium",fill:!0,children:Object(C.jsxs)(h.a,{style:{height:"100%",width:"90%"},padding:"small",round:"large",children:[Object(C.jsx)(j.a,{title:"Starred repositories for user grouped by topic",children:Object(C.jsxs)(f.a,{direction:"column",gap:"medium",pad:"medium",align:"center",justify:"between",fill:!0,children:[Object(C.jsxs)(f.a,{direction:"row",gap:"medium",align:"center",children:[Object(C.jsx)(v.a,{onEnter:function(e){t.setState({username:i})},children:Object(C.jsx)(m.a,{value:i,onChange:function(e){return t.setState({value:e.target.value})}})}),Object(C.jsx)(g.a,{primary:!0,label:"Visualize",onClick:function(){t.setState({username:i})}})]}),Object(C.jsx)(P,{input:{username:a},options:{range:n},context:{octokit:r}})]})}),Object(C.jsx)(j.a,{title:"Starred repositories for user grouped by org",children:Object(C.jsxs)(f.a,{direction:"column",gap:"medium",pad:"medium",align:"center",justify:"between",fill:!0,children:[Object(C.jsxs)(f.a,{direction:"row",gap:"medium",align:"center",children:[Object(C.jsx)(v.a,{onEnter:function(e){t.setState({username:i})},children:Object(C.jsx)(m.a,{value:i,onChange:function(e){return t.setState({value:e.target.value})}})}),Object(C.jsx)(g.a,{primary:!0,label:"Visualize",onClick:function(){t.setState({username:i})}})]}),Object(C.jsx)(J,{input:{username:a},options:{range:n},context:{octokit:r}})]})})]})}),Object(C.jsx)(y.a,{align:"center",direction:"row",justify:"between",gap:"medium",children:Object(C.jsxs)(b.a,{level:2,children:[" View the project on ",Object(C.jsx)("a",{href:"https://github.com/timmeinerzhagen/gazewatch",children:"GitHub"})," "]})})]})})}}]),n}(r.a.Component),U=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,189)).then((function(e){var n=e.getCLS,a=e.getFID,r=e.getFCP,i=e.getLCP,c=e.getTTFB;n(t),a(t),r(t),i(t),c(t)}))};c.a.render(Object(C.jsx)(r.a.StrictMode,{children:Object(C.jsx)(M,{})}),document.getElementById("root")),U()}},[[166,1,2]]]);
//# sourceMappingURL=main.828ceee2.chunk.js.map