<template>
    <scroll :data="data"
             :listen-scroll="listenScroll"
             :probe-type="probeType"
             class="listview"
             ref="listview"
             @scroll="scroll"
    >
        <ul>
            <li v-for="group in data" class="list-group" ref="listGroup">
                <h2 class="list-group-title">{{group.title}}</h2>
                <ul>
                    <li v-for="item in group.items" class="list-group-item" @click="selectItem(item)">
                        <img class="avatar" v-lazy="item.avatar">
                        <span class="name">{{item.name}}</span>
                    </li>
                </ul>
            </li>
        </ul>
        <div class="loading-wrapper" v-show="!data.length">
            <loading></loading>
        </div>
        <div class="list-fixed" ref="fixed" v-show="fixedTitle">
            <div class="fixed-title">{{fixedTitle}} </div>
        </div>
        <div class="list-shortcut">
            <ul>
                <li class="item-shortcut"
                    v-for="(item, index) in shortcutList"
                    :class="{current : currentIndex == index}"
                    @touchstart.stop.prevent = 'onShortcutTouchStart'
                    @touchmove.stop.prevent = 'onShortcutTouchMove'
                    @touchend.stop
                    :data-index = 'index'
                >
                    {{item}}
                </li>
            </ul>
        </div>
    </scroll>
</template>

<script type="text/ecmascript-6">
    import scroll from '@/base/scroll/scroll'
    import {getData} from  '@/common/js/dom'
    import loading from '@/base/loading/loading'

    const SHORTCUT_ITEM_HEIGHT = 18
    const ITEM_HEIGHT = 30

    export default {
        created() {
            this.touch = {},
            this.listHeight = []
        },
        props: {
            data: {
                type: Array,
                default: []
            }
        },
        data () {
          return {
              scrollY: -1,
              currentIndex: 0,
              listenScroll: true,
              probeType: 3,
              diff: -1
          }
        },
        computed: {
          shortcutList() {
              return this.data.map((group) => {
                  return group.title.substr(0, 1)
              })
          },
          fixedTitle() {
            if (this.scrollY > 0) {
                return ''
            }

            return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
          }
        },
        methods: {
            onShortcutTouchStart(e) {
                let anchorIndex = getData(e.target, 'index')
                let touch = e.touches[0]
                this.touch.y1 = touch.pageY
                this.touch.anchorIndex = anchorIndex
                this._scrollTo(anchorIndex)
            },
            onShortcutTouchMove(e) {
                let touch = e.touches[0]
                this.touch.y2 = touch.pageY
                let detal = ((this.touch.y2 - this.touch.y1) / SHORTCUT_ITEM_HEIGHT ) | 0
                let anchorIndex = parseInt(this.touch.anchorIndex) + detal //  获取的index是字符串类型
                this._scrollTo( anchorIndex )
            },
            _scrollTo(index) {
                if ( index < 0) { // 移动到最上
                    index = 0
                }

                if (index >= this.shortcutList.length) { // 移动到最下
                    index = this.shortcutList.length - 1
                }

                this.currentIndex = index
                this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
            },
            scroll(pos) {
                this.scrollY = pos.y;
            },
            _calculateHeight() {
                this.listHeight = []
                const list = this.$refs.listGroup
                let height = 0
                this.listHeight.push(height)
                list.forEach((item)=>{
                    height += item.clientHeight
                    this.listHeight.push(height)
                })
            },
            selectItem(item) {
                this.$emit('select', item)
            }
        },
        watch: {
          data () {
              setTimeout(() => {
                  this._calculateHeight()
              }, 20)
          },
          scrollY(newY) {
              let listHeight = this.listHeight
              // 当滚动到顶部，newY>0
              if (newY > 0) {
                  this.currentIndex = 0
                  return
              }

              // 在中间部分滚动
              for (let i=0; i<listHeight.length-1; i++) {
                  let height1 = listHeight[i]
                  let height2 = listHeight[i + 1]

                  if (-newY >= height1 && -newY < height2) {
                      this.diff = newY + height2
                      this.currentIndex = i
                  }
              }

              if (-newY >= listHeight[listHeight.length-1]) {
                  this.currentIndex = listHeight.length - 1
              }

          },
          diff(newVal) {
              let fixedTop = (newVal > 0 && newVal < ITEM_HEIGHT) ? newVal - ITEM_HEIGHT : 0
              if (this.fixedTop === fixedTop) {
                  return
              }
              this.fixedTop = fixedTop
              this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px, 0) `
          },

        },
        components: {
            scroll,
            loading
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"
    .listview
        position: relative
        width: 100%
        height: 100%
        overflow: hidden
        background: $color-background
        .list-group
            padding-bottom: 30px
            .list-group-title
                height: 30px
                line-height: 30px
                padding-left: 20px
                font-size: $font-size-small
                color: $color-text-l
                background: $color-highlight-background
            .list-group-item
                display: flex
                align-items: center
                padding: 20px 0 0 30px
                .avatar
                    width: 50px
                    height: 50px
                    border-radius: 50%
                .name
                    margin-left: 20px
                    color: $color-text-l
                    font-size: $font-size-medium
        .list-shortcut
            position: absolute
            z-index: 30
            right: 0
            top: 50%
            transform: translateY(-50%)
            width: 20px
            padding: 20px 0
            border-radius: 10px
            text-align: center
            background: $color-background-d
            font-family: Helvetica
            .item-shortcut
                padding: 3px
                line-height: 1
                color: $color-text-l
                font-size: $font-size-small
                &.current
                    color: $color-theme
        .list-fixed
            position: absolute
            top: 0
            left: 0
            width: 100%
            .fixed-title
                height: 30px
                line-height: 30px
                padding-left: 20px
                font-size: $font-size-small
                background: $color-highlight-background
</style>
