webpackJsonp([7],{249:function(t,e,r){function s(t){r(284)}var a=r(0)(r(299),r(274),s,"data-v-0e6b8440",null);t.exports=a.exports},262:function(t,e,r){e=t.exports=r(244)(!0),e.push([t.i,".search .search-box-wrapper[data-v-0e6b8440]{margin:20px}.search .shortcut-wrapper[data-v-0e6b8440]{position:fixed;top:178px;bottom:0}.search .shortcut-wrapper .shortcut[data-v-0e6b8440]{height:100%;overflow:hidden;width:100%}.search .shortcut-wrapper .shortcut .hot-key[data-v-0e6b8440]{margin:0 20px 20px}.search .shortcut-wrapper .shortcut .hot-key .title[data-v-0e6b8440]{margin-bottom:20px;font-size:14px;color:hsla(0,0%,100%,.5)}.search .shortcut-wrapper .shortcut .hot-key .item[data-v-0e6b8440]{display:inline-block;padding:5px 10px;margin:0 20px 10px 0;border-radius:6px;background:#333;font-size:14px;color:hsla(0,0%,100%,.3)}.search .shortcut-wrapper .shortcut .search-history[data-v-0e6b8440]{position:relative;margin:0 20px}.search .shortcut-wrapper .shortcut .search-history .title[data-v-0e6b8440]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;height:40px;font-size:14px;color:hsla(0,0%,100%,.5)}.search .shortcut-wrapper .shortcut .search-history .title .text[data-v-0e6b8440]{-webkit-box-flex:1;-ms-flex:1;flex:1}.search .shortcut-wrapper .shortcut .search-history .title .clear .icon-clear[data-v-0e6b8440]{font-size:14px;color:hsla(0,0%,100%,.3)}.search .search-result[data-v-0e6b8440]{position:fixed;width:100%;top:178px;bottom:0}","",{version:3,sources:["D:/workplaces/vue-music/src/components/search/search.vue"],names:[],mappings:"AACA,6CACE,WAAa,CACd,AACD,2CACE,eAAgB,AAChB,UAAW,AACX,QAAU,CACX,AACD,qDACE,YAAa,AACb,gBAAiB,AACjB,UAAY,CACb,AACD,8DACE,kBAAyB,CAC1B,AACD,qEACE,mBAAoB,AACpB,eAAgB,AAChB,wBAA6B,CAC9B,AACD,oEACE,qBAAsB,AACtB,iBAAkB,AAClB,qBAAsB,AACtB,kBAAmB,AACnB,gBAAiB,AACjB,eAAgB,AAChB,wBAA6B,CAC9B,AACD,qEACE,kBAAmB,AACnB,aAAe,CAChB,AACD,4EACE,oBAAqB,AACrB,oBAAqB,AACrB,aAAc,AACd,yBAA0B,AACtB,sBAAuB,AACnB,mBAAoB,AAC5B,YAAa,AACb,eAAgB,AAChB,wBAA6B,CAC9B,AACD,kFACE,mBAAoB,AAChB,WAAY,AACR,MAAQ,CACjB,AACD,+FACE,eAAgB,AAChB,wBAA6B,CAC9B,AACD,wCACE,eAAgB,AAChB,WAAY,AACZ,UAAW,AACX,QAAU,CACX",file:"search.vue",sourcesContent:["\n.search .search-box-wrapper[data-v-0e6b8440] {\n  margin: 20px;\n}\n.search .shortcut-wrapper[data-v-0e6b8440] {\n  position: fixed;\n  top: 178px;\n  bottom: 0;\n}\n.search .shortcut-wrapper .shortcut[data-v-0e6b8440] {\n  height: 100%;\n  overflow: hidden;\n  width: 100%;\n}\n.search .shortcut-wrapper .shortcut .hot-key[data-v-0e6b8440] {\n  margin: 0 20px 20px 20px;\n}\n.search .shortcut-wrapper .shortcut .hot-key .title[data-v-0e6b8440] {\n  margin-bottom: 20px;\n  font-size: 14px;\n  color: rgba(255,255,255,0.5);\n}\n.search .shortcut-wrapper .shortcut .hot-key .item[data-v-0e6b8440] {\n  display: inline-block;\n  padding: 5px 10px;\n  margin: 0 20px 10px 0;\n  border-radius: 6px;\n  background: #333;\n  font-size: 14px;\n  color: rgba(255,255,255,0.3);\n}\n.search .shortcut-wrapper .shortcut .search-history[data-v-0e6b8440] {\n  position: relative;\n  margin: 0 20px;\n}\n.search .shortcut-wrapper .shortcut .search-history .title[data-v-0e6b8440] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  height: 40px;\n  font-size: 14px;\n  color: rgba(255,255,255,0.5);\n}\n.search .shortcut-wrapper .shortcut .search-history .title .text[data-v-0e6b8440] {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n}\n.search .shortcut-wrapper .shortcut .search-history .title .clear .icon-clear[data-v-0e6b8440] {\n  font-size: 14px;\n  color: rgba(255,255,255,0.3);\n}\n.search .search-result[data-v-0e6b8440] {\n  position: fixed;\n  width: 100%;\n  top: 178px;\n  bottom: 0;\n}"],sourceRoot:""}])},274:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"search"},[r("div",{staticClass:"search-box-wrapper"},[r("search-box",{ref:"searchBox",on:{query:t.search}})],1),t._v(" "),r("div",{directives:[{name:"show",rawName:"v-show",value:!t.query,expression:"!query"}],ref:"shortcutWrapper",staticClass:"shortcut-wrapper"},[r("scroll",{ref:"shortcut",staticClass:"shortcut",attrs:{data:t.shortcut}},[r("div",[r("div",{staticClass:"hot-key"},[r("h1",{staticClass:"title"},[t._v("热门搜索")]),t._v(" "),r("ul",t._l(t.hotKey,function(e){return r("li",{staticClass:"item",on:{click:function(r){t.addQuery(e.k)}}},[r("span",[t._v(" "+t._s(e.k)+" ")])])}))]),t._v(" "),r("div",{directives:[{name:"show",rawName:"v-show",value:t.searchHistory.length,expression:"searchHistory.length"}],staticClass:"search-history"},[r("h1",{staticClass:"title"},[r("span",{staticClass:"text"},[t._v("搜索历史")]),t._v(" "),r("span",{staticClass:"clear",on:{click:t.showConfirm}},[r("i",{staticClass:"icon-clear"})])]),t._v(" "),r("search-list",{attrs:{searches:t.searchHistory},on:{delete:t.deleteSearchHistory,select:t.addQuery}})],1)])])],1),t._v(" "),r("div",{directives:[{name:"show",rawName:"v-show",value:t.query,expression:"query"}],ref:"searchResult",staticClass:"search-result"},[r("suggest",{ref:"suggest",attrs:{query:t.query},on:{select:t.saveSearchHistory,scrollStart:t.blurInput}})],1),t._v(" "),r("confirm",{ref:"confirm",attrs:{text:"是否清空所有搜索历史",confirmBtnText:"清空"},on:{confirm:t.clearSearchHistory}}),t._v(" "),r("router-view")],1)},staticRenderFns:[]}},284:function(t,e,r){var s=r(262);"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);r(245)("50dd2dbf",s,!0)},299:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=r(9),a=r.n(s),o=r(78),c=r.n(o),n=r(79),i=r.n(n),h=r(14),A=r.n(h),p=r(76),l=r.n(p),u=r(81),C=r.n(u),d=r(82),x=r(13),B=r(5),f=r(22);e.default={mixins:[f.c,f.b],data:function(){return{hotKey:[],query:""}},computed:{shortcut:function(){return this.hotKey.concat(this.searchHistory)}},created:function(){this._getHotKey(),this.searchHistory=[]},methods:a()({handlePlaylist:function(t){var e=t.length>0?"60px":"";this.$refs.searchResult.style.bottom=e,this.$refs.suggest.refresh(),this.$refs.shortcutWrapper.style.bottom=e,this.$refs.shortcut.refresh()},_getHotKey:function(){var t=this;r.i(d.b)().then(function(e){e.code===x.a&&(t.hotKey=e.data.hotkey.slice(0,10))})},showConfirm:function(){this.$refs.confirm.show()}},r.i(B.c)(["saveSearchHistory","deleteSearchHistory","clearSearchHistory"])),components:{SearchBox:c.a,SearchList:i.a,suggest:C.a,confirm:l.a,scroll:A.a}}}});
//# sourceMappingURL=7.d287f18fcdffd1bdf7e8.js.map