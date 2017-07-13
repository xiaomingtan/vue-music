<template>
    <div class="m-header">
        <div class="icon"></div>
        <h1 class="title">Chicken Music</h1>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {

    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"
    @import "../../common/stylus/variable.styl"

    .m-header
        position: relative
        height 44px
        background-color : $color-theme
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

</style>
