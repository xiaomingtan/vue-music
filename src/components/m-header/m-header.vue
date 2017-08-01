<template>
    <div class="m-header">
        <div class="icon"></div>
        <h1 class="title">Chicken Music</h1>
        <router-link to="/user" class="mine" tag="div">
            <i class="icon-mine"></i>
        </router-link>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {

    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/mixin"
    @import "~common/stylus/variable"

    .m-header
        position: relative
        height 44px
        background-color : $color-background
        text-align : center
        font-size: 0
        .icon
            display: inline-block
            vertical-align : top
            margin: 4px 9px 0 0
            width: 30px
            height: 32px
            background-size: 30px 32px
            bg-image('./logo')
        .title
            vertical-align: top
            line-height: 44px
            font-size: $font-size-large
            display: inline-block
        .mine
            position: absolute
            top: 0
            right: 0
            .icon-mine
                display: block
                padding: 12px
                font-size: 20px
                color: $color-theme

</style>
