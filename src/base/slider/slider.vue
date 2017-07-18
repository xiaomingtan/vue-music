<template>
    <div class="slider">
        <div class="slider-group" ref="sliderGroup">
            <slot></slot>
        </div>

        <div class="dots">

        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {addClass} from '@/common/js/dom'
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
                default: 400
            }
        },
        data() {
          return {
              children : []
          }
        },
        mounted() {
            // 页面刷新17ms左右
            setTimeout( () => {
                this._setSliderWidth()
            }, 20)
        },
        methods: {
            _setSliderWidth () {
                let sliderGroup = this.$refs.sliderGroup
                let children = sliderGroup.children;
                let totalWidth = 0;
                let sliderWidth = sliderGroup.clientWidth;
                for (let i=0; i<children.length; i++) {
                    let child = children[i];
                    addClass(child, 'slider-item')
                    child.style.width = sliderWidth + 'px' ;
                    totalWidth += sliderWidth;
                }

                sliderGroup.style.width = totalWidth + 'px'

            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"
    .slider
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
                border-bottom 12px
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
