<template>
    <div class="tab">
        <router-link tag="div" to="/recommend" class="tab-item">
            <span class="tab-link">推荐</span>
        </router-link>
        <router-link tag="div" to="/singer" class="tab-item">
            <span class="tab-link">歌手</span>
        </router-link>
        <router-link tag="div" to="/rank" class="tab-item">
            <span class="tab-link">排行</span>
        </router-link>
        <router-link tag="div" to="/search" class="tab-item">
            <span class="tab-link">搜索</span>
        </router-link>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"
    .tab
        width : 100%
        font-size: 0
        height: 44px
        .tab-item
            display : inline-block
            font-size: $font-size-medium
            text-align: center
            width : 25%
            height: 100%
            line-height : 44px
            color: $color-text-l
            .tab-link
                padding-bottom: 5px
            &.router-link-active
                color: $color-theme
                .tab-link
                    border-bottom: 2px solid $color-theme

</style>
