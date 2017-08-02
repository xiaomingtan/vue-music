webpackJsonp([1],{250:function(t,a,i){function e(t){i(289)}var n=i(0)(i(268),i(301),e,"data-v-89caf134",null);t.exports=n.exports},254:function(t,a,i){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var e=i(9),n=i.n(e),s=i(14),o=i.n(s),A=i(72),l=i.n(A),r=i(74),c=i.n(r),d=i(73),p=i(22),g=i(5),f=i.i(d.a)("transform"),u=i.i(d.a)("backdrop-fliter");a.default={mixins:[p.c],props:{bgImage:{type:String,default:""},title:{type:String,default:""},rank:{type:Boolean,default:!1},songs:{type:Array,default:[]}},data:function(){return{scrollY:0}},computed:{bgStyle:function(){return"background-image:url("+this.bgImage+")"}},created:function(){this.probeType=3,this.listenScroll=!0},mounted:function(){this.imageHeight=this.$refs.bgImage.clientHeight,this.minTransalteY=40-this.imageHeight,this.$refs.list.$el.style.top=this.imageHeight+"px"},methods:n()({handlePlaylist:function(){var t=this.playlist.length>0?"60px":"";this.$refs.list.$el.style.bottom=t,this.$refs.list.refresh()},back:function(){this.$router.back()},scroll:function(t){this.scrollY=t.y},selectSong:function(t){this.selectPlay({list:this.songs,index:t})},randomPlay:function(){this.selectRandomPlay({list:this.songs})}},i.i(g.c)(["selectPlay","selectRandomPlay"])),components:{scroll:o.a,loading:l.a,SongList:c.a},watch:{scrollY:function(t){var a=Math.max(this.minTransalteY,t),i=1,e=0,n=0,s=Math.abs(t/this.imageHeight);this.$refs.layer.style[f]="translate3d(0,"+a+"px,0)",this.$refs.filter.style[u]="blur("+n+"px)",t>0?(i=1+s,e=10):n=Math.min(20,20*s),t<this.minTransalteY?(e=10,this.$refs.bgImage.style.paddingTop="40px",this.$refs.playBtn.style.display="none"):(this.$refs.bgImage.style.paddingTop="70%",this.$refs.playBtn.style.display="block"),this.$refs.bgImage.style[f]="scale("+i+")",this.$refs.bgImage.style.zIndex=e}}}},255:function(t,a,i){a=t.exports=i(244)(!0),a.push([t.i,".music-list[data-v-77c0eaa0]{position:fixed;z-index:100;top:0;left:0;bottom:0;right:0;background:#222}.music-list .back[data-v-77c0eaa0]{position:absolute;top:0;left:6px;z-index:50}.music-list .back .icon-back[data-v-77c0eaa0]{display:block;padding:10px;font-size:22px;color:#ffcd32}.music-list .title[data-v-77c0eaa0]{position:absolute;top:0;left:10%;z-index:40;width:80%;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;text-align:center;line-height:40px;font-size:18px;color:#fff}.music-list .bg-image[data-v-77c0eaa0]{position:relative;wdith:100%;height:0;padding-top:70%;transform-orgin:stop;background-size:cover}.music-list .bg-image .play-wrapper[data-v-77c0eaa0]{position:absolute;bottom:20px;z-index:50;width:100%}.music-list .bg-image .play-wrapper .play[data-v-77c0eaa0]{box-sizing:border-box;width:135px;padding:7px 0;margin:0 auto;text-align:center;border:1px solid #ffcd32;color:#ffcd32;border-radius:100px;font-size:0}.music-list .bg-image .play-wrapper .play .icon-play[data-v-77c0eaa0]{display:inline-block;vertical-align:middle;margin-right:6px;font-size:16px}.music-list .bg-image .play-wrapper .play .text[data-v-77c0eaa0]{display:inline-block;vertical-align:middle;font-size:12px}.music-list .filter[data-v-77c0eaa0]{position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(7,17,27,.4)}.music-list .bg-layer[data-v-77c0eaa0]{position:relative;height:100%;background:#222}.music-list .list[data-v-77c0eaa0]{position:fixed;top:0;bottom:0;wdith:100%;background:#222;over-flow:hidden}.music-list .list .song-list-wrapper[data-v-77c0eaa0]{padding:20px 30px}.music-list .loading-container[data-v-77c0eaa0]{position:absolute;width:100%;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}","",{version:3,sources:["E:/workplaces/vue-music/src/components/music-list/music-list.vue"],names:[],mappings:"AACA,6BACE,eAAgB,AAChB,YAAa,AACb,MAAO,AACP,OAAQ,AACR,SAAU,AACV,QAAS,AACT,eAAiB,CAClB,AACD,mCACE,kBAAmB,AACnB,MAAO,AACP,SAAU,AACV,UAAY,CACb,AACD,8CACE,cAAe,AACf,aAAc,AACd,eAAgB,AAChB,aAAe,CAChB,AACD,oCACE,kBAAmB,AACnB,MAAO,AACP,SAAU,AACV,WAAY,AACZ,UAAW,AACX,uBAAwB,AACxB,gBAAiB,AACjB,mBAAoB,AACpB,kBAAmB,AACnB,iBAAkB,AAClB,eAAgB,AAChB,UAAY,CACb,AACD,uCACE,kBAAmB,AACnB,WAAY,AACZ,SAAU,AACV,gBAAiB,AACjB,qBAAsB,AACtB,qBAAuB,CACxB,AACD,qDACE,kBAAmB,AACnB,YAAa,AACb,WAAY,AACZ,UAAY,CACb,AACD,2DACE,sBAAuB,AACvB,YAAa,AACb,cAAe,AACf,cAAe,AACf,kBAAmB,AACnB,yBAA0B,AAC1B,cAAe,AACf,oBAAqB,AACrB,WAAa,CACd,AACD,sEACE,qBAAsB,AACtB,sBAAuB,AACvB,iBAAkB,AAClB,cAAgB,CACjB,AACD,iEACE,qBAAsB,AACtB,sBAAuB,AACvB,cAAgB,CACjB,AACD,qCACE,kBAAmB,AACnB,MAAO,AACP,OAAQ,AACR,WAAY,AACZ,YAAa,AACb,2BAA8B,CAC/B,AACD,uCACE,kBAAmB,AACnB,YAAa,AACb,eAAiB,CAClB,AACD,mCACE,eAAgB,AAChB,MAAO,AACP,SAAU,AACV,WAAY,AACZ,gBAAiB,AACjB,gBAAkB,CACnB,AACD,sDACE,iBAAmB,CACpB,AACD,gDACE,kBAAmB,AACnB,WAAY,AACZ,QAAS,AACT,mCAAoC,AAC5B,0BAA4B,CACrC",file:"music-list.vue",sourcesContent:["\n.music-list[data-v-77c0eaa0] {\n  position: fixed;\n  z-index: 100;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  background: #222;\n}\n.music-list .back[data-v-77c0eaa0] {\n  position: absolute;\n  top: 0;\n  left: 6px;\n  z-index: 50;\n}\n.music-list .back .icon-back[data-v-77c0eaa0] {\n  display: block;\n  padding: 10px;\n  font-size: 22px;\n  color: #ffcd32;\n}\n.music-list .title[data-v-77c0eaa0] {\n  position: absolute;\n  top: 0;\n  left: 10%;\n  z-index: 40;\n  width: 80%;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  white-space: nowrap;\n  text-align: center;\n  line-height: 40px;\n  font-size: 18px;\n  color: #fff;\n}\n.music-list .bg-image[data-v-77c0eaa0] {\n  position: relative;\n  wdith: 100%;\n  height: 0;\n  padding-top: 70%;\n  transform-orgin: stop;\n  background-size: cover;\n}\n.music-list .bg-image .play-wrapper[data-v-77c0eaa0] {\n  position: absolute;\n  bottom: 20px;\n  z-index: 50;\n  width: 100%;\n}\n.music-list .bg-image .play-wrapper .play[data-v-77c0eaa0] {\n  box-sizing: border-box;\n  width: 135px;\n  padding: 7px 0;\n  margin: 0 auto;\n  text-align: center;\n  border: 1px solid #ffcd32;\n  color: #ffcd32;\n  border-radius: 100px;\n  font-size: 0;\n}\n.music-list .bg-image .play-wrapper .play .icon-play[data-v-77c0eaa0] {\n  display: inline-block;\n  vertical-align: middle;\n  margin-right: 6px;\n  font-size: 16px;\n}\n.music-list .bg-image .play-wrapper .play .text[data-v-77c0eaa0] {\n  display: inline-block;\n  vertical-align: middle;\n  font-size: 12px;\n}\n.music-list .filter[data-v-77c0eaa0] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(7,17,27,0.4);\n}\n.music-list .bg-layer[data-v-77c0eaa0] {\n  position: relative;\n  height: 100%;\n  background: #222;\n}\n.music-list .list[data-v-77c0eaa0] {\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  wdith: 100%;\n  background: #222;\n  over-flow: hidden;\n}\n.music-list .list .song-list-wrapper[data-v-77c0eaa0] {\n  padding: 20px 30px;\n}\n.music-list .loading-container[data-v-77c0eaa0] {\n  position: absolute;\n  width: 100%;\n  top: 50%;\n  -webkit-transform: translateY(-50%);\n          transform: translateY(-50%);\n}"],sourceRoot:""}])},256:function(t,a,i){var e=i(255);"string"==typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);i(245)("a1bdeb8e",e,!0)},257:function(t,a,i){function e(t){i(256)}var n=i(0)(i(254),i(258),e,"data-v-77c0eaa0",null);t.exports=n.exports},258:function(t,a){t.exports={render:function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("div",{staticClass:"music-list"},[i("div",{staticClass:"back",on:{click:t.back}},[i("i",{staticClass:"icon-back"})]),t._v(" "),i("h1",{staticClass:"title",domProps:{innerHTML:t._s(t.title)}}),t._v(" "),i("div",{ref:"bgImage",staticClass:"bg-image",style:t.bgStyle},[i("div",{staticClass:"play-wrapper"},[i("div",{directives:[{name:"show",rawName:"v-show",value:t.songs.length>0,expression:"songs.length > 0 "}],ref:"playBtn",staticClass:"play"},[i("i",{staticClass:"icon-play"}),t._v(" "),i("span",{staticClass:"text",on:{click:t.randomPlay}},[t._v("随机播放全部")])])])]),t._v(" "),i("div",{ref:"filter",staticClass:"filter"}),t._v(" "),i("div",{ref:"layer",staticClass:"bg-layer"}),t._v(" "),i("scroll",{ref:"list",staticClass:"list",attrs:{data:t.songs,"listen-scroll":t.listenScroll,"probe-type":t.probeType},on:{scroll:t.scroll}},[i("div",{staticClass:"song-list-wrapper"},[i("song-list",{attrs:{songs:t.songs,rank:t.rank},on:{selectSong:t.selectSong}})],1)]),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:!t.songs.length,expression:"!songs.length"}],staticClass:"loading-container"},[i("loading")],1)],1)},staticRenderFns:[]}},261:function(t,a,i){"use strict";function e(){var t=o()({},l.b,{channel:"singer",page:"list",key:"all_all_all",pagesize:100,pagenum:1,hostUin:0,needNewCode:0,platform:"yqq"});return i.i(A.a)("https://c.y.qq.com/v8/fcg-bin/v8.fcg",t,l.c)}function n(t){var a=o()({},l.b,{hostUin:0,needNewCode:0,platform:"yqq",order:"listen",begin:0,num:80,songstatus:1,singermid:t});return i.i(A.a)("https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg",a,l.c)}a.b=e,a.a=n;var s=i(23),o=i.n(s),A=i(71),l=i(13)},268:function(t,a,i){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var e=i(9),n=i.n(e),s=i(257),o=i.n(s),A=i(261),l=i(13),r=i(38),c=i(5);a.default={computed:n()({title:function(){return this.singer.name},bgImage:function(){return this.singer.avatar}},i.i(c.a)(["singer"])),data:function(){return{songs:[]}},created:function(){this._getDetail()},methods:{_getDetail:function(){var t=this;if(!this.singer.id)return void this.$router.push("/singer");i.i(A.a)(this.singer.id).then(function(a){a.code===l.a&&(t.songs=t._normalizeSongs(a.data.list))})},_normalizeSongs:function(t){var a=[];return t.forEach(function(t){var e=t.musicData;e.songid&&e.albummid&&a.push(i.i(r.a)(e))}),a}},components:{MusicList:o.a}}},279:function(t,a,i){a=t.exports=i(244)(!0),a.push([t.i,".fade-enter-active[data-v-89caf134],.fade-leave-active[data-v-89caf134]{transition:all .3s}.fade-enter[data-v-89caf134],.fade-leave-active[data-v-89caf134]{-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0)}","",{version:3,sources:["E:/workplaces/vue-music/src/components/singer-detail/singer-detail.vue"],names:[],mappings:"AACA,wEAEE,kBAAqB,CACtB,AACD,iEAEE,wCAA2C,AACnC,+BAAmC,CAC5C",file:"singer-detail.vue",sourcesContent:["\n.fade-enter-active[data-v-89caf134],\n.fade-leave-active[data-v-89caf134] {\n  transition: all 0.3s;\n}\n.fade-enter[data-v-89caf134],\n.fade-leave-active[data-v-89caf134] {\n  -webkit-transform: translate3d(100%, 0, 0);\n          transform: translate3d(100%, 0, 0);\n}"],sourceRoot:""}])},289:function(t,a,i){var e=i(279);"string"==typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);i(245)("2517b760",e,!0)},301:function(t,a){t.exports={render:function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("transition",{attrs:{name:"fade"}},[i("music-list",{attrs:{title:t.title,"bg-image":t.bgImage,songs:t.songs}})],1)},staticRenderFns:[]}}});
//# sourceMappingURL=1.1d247b443ccdd9b4e017.js.map