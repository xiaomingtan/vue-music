<template>
    <transition name="fade">
        <div class="singer-detail">
        </div>
    </transition>
</template>

<script type="text/ecmascript-6">
    export default {}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"
    .fade-enter-active,.fade-leave-active
        transition: all 0.3s
    .fade-enter,.fade-leave-active
        transform : translate3d(100%, 0 ,0)
    .singer-detail
        position: fixed
        z-index: 100
        top: 0
        left: 0
        bottom: 0
        right: 0
        background: $color-background


</style>
