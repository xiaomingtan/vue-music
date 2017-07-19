<template>
    <div class="slider" ref="slider">
        <div class="slider-group" ref="sliderGroup">
            <slot></slot>
        </div>

        <div class="dots">
            <span v-for="(dot,index) in dots" class="dot" :class="{active: currentPageIndex === index}"></span>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {addClass} from '@/common/js/dom'
    import BScroll from 'better-scroll'

    export default {
        props : {
            loop: {
                type: Boolean,
                default: true
            },
            autoPlay: {
                type: Boolean,
                default: true
            },
            interval: {
                type: Number,
                default: 4000
            }
        },
        data() {
          return {
              children : [],
              dots: [],
              currentPageIndex: 0
          }
        },
        mounted() {
            // 页面刷新17ms左右
            setTimeout( () => {
                this._setSliderWidth()
                this._initDots()
                this._initSlider()

                if (this.autoPlay) {
                    this._play()
                }
            }, 20)

            window.addEventListener('resize', () => {
                if (!this.slider) {
                    return
                }
                this._setSliderWidth(true)
                this.slider.refresh()

            })

        },
        activated() {
            if (this.autoPlay) {
                this._play()
            }
        },
        deactivated() {
            clearTimeout(this.timer)
        },
        methods: {
            _setSliderWidth (isResize) {
                let sliderGroup = this.$refs.sliderGroup
                this.children = sliderGroup.children;
                let totalWidth = 0;
                let sliderWidth = this.$refs.slider.clientWidth;

                for (let i=0; i<this.children.length; i++) {
                    let child = this.children[i];
                    addClass(child, 'slider-item')
                    child.style.width = sliderWidth + 'px' ;
                    totalWidth += sliderWidth;
                }

                // resize时子元素已经包括前后的img
                if (this.loop && !isResize) {
                    totalWidth += 2 * sliderWidth
                }

                sliderGroup.style.width = totalWidth + 'px'
            },
            _initDots() {
                this.dots = new Array(this.children.length)
            },
            _initSlider() {
                this.slider = new BScroll(this.$refs.slider, {
                    scrollX: true,
                    scrollY: false,
                    momentum: false,
                    snap: true,
                    snapLoop: this.loop,
                    snapThreshold: 0.3,
                    snapSpeed: 400
                })

                this.slider.on('scrollEnd', () => {
                    let pageIndex = this.slider.getCurrentPage().pageX
                    if (this.loop) {
                        pageIndex -= 1
                    }

                    this.currentPageIndex = pageIndex

                    if (this.autoPlay) {
                        this._play()
                    }

                    this.slider.on('beforeScrollStart', () => {
                        if (this.autoPlay) {
                            clearTimeout(this.timer)
                        }
                    })
                })
            },
            _play() {
                if (!this.slider) {
                    return
                }
                let pageIndex = this.currentPageIndex + 1
                if (this.loop ) {
                    pageIndex += 1
                }
                this.timer = setTimeout(() => {
                    this.slider.goToPage(pageIndex, 0, 400)
                }, this.interval)
            }
        },
        beforeDestroy() {
            clearTimeout(this.timer)
        },
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"
    .slider
        position : relative
        min-height : 1px
        .slider-group
            position : relative
            overflow :hidden
            white-space : nowrap
            .slider-item
                float : left
                box-sizing : border-box
                overflow : hidden
                text-align : center
                a
                    display : block
                    width : 100%
                    overflow : hidden
                    text-decoration : none
                    img
                        width : 100%
                        display : block
        .dots
            position : absolute
            right : 0
            left : 0
            bottom 12px
            text-align : center
            font-size 0
            .dot
                display : inline-block
                margin : 0 4px
                width : 8px
                height : 8px
                border-radius : 50%
                background-color : $color-text-l
                &.active
                    width : 20px
                    border-radius : 5px
                    background-color : $color-text-ll
</style>
