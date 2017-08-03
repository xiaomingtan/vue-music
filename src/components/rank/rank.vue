<template>
    <transition name="slide">
        <div class="rank" ref="rank">
            <div class="title-wrapper">
                <div class="back" @click="back">
                    <i class="icon-back"></i>
                </div>
                <span class="title">排行</span>
            </div>
            <scroll :data="topList" class="toplist" ref="list">
                <ul>
                    <li class="item" v-for="item in topList" @click="selectItem(item)">
                        <div class="icon">
                            <img :src="item.picUrl" width="100" height="100"/>
                        </div>
                        <ul class="songlist">
                            <li class="song" v-for="(song,index) in item.songList">
                                <span>{{index + 1}}</span>
                                <span>{{song.songname}}-{{song.singername}}</span>
                            </li>
                        </ul>
                    </li>
                </ul>
                <div class="loading-container" v-show="!topList.length">
                    <loading></loading>
                </div>
            </scroll>
            <router-view></router-view>
        </div>
    </transition>

</template>

<script scope type="text/ecmascript-6">
    import {getTopList} from '@/api/rank'
    import {ERROR_OK} from '@/api/config'
    import scroll from '@/base/scroll/scroll'
    import loading from '@/base/loading/loading'
    import {mapMutations} from 'vuex'
    import {playlistMixin} from '@/common/js/mixin'
    export default {
        mixins: [playlistMixin],
        data() {
            return {
                topList: []
            }
        },
        created() {
            this._getTopList()
        },
        methods: {
            back() {
                this.$router.back()
            },
            handlePlaylist(playlist) {
                const bottom = playlist.length > 0 ? '60px' : ''
                this.$refs.rank.style.bottom = bottom
                this.$refs.list.refresh()
            },
            _getTopList() {
                getTopList().then((res) => {
                    if (res.code === ERROR_OK) {
                        this.topList = res.data.topList
                    } else {
                        console.log(res.message)
                    }
                })
            },
            selectItem(item) {
                this.$router.push({
                    path: `/rank/${item.id}`
                })
                this.setTopList(item)
            },
            ...mapMutations({
                setTopList: 'SET_TOP_LIST'
            })
        },
        components: {
            loading,
            scroll
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"
    @import "~common/stylus/mixin"
    .rank
        background-color : $color-background
        position: fixed
        top: 0
        width: 100%
        bottom: 0
        &.slide-enter-active, &.slide-leave-active
            transition: all 0.3s
        &.slide-enter, &.slide-leave-to
            transform: translate3d(100%, 0, 0)
        .title-wrapper
            height : 44px
            position : relative
            text-align : center
            .back
                 position : absolute
                 left: 15px
                 top: 10px
                 color : $color-theme
                .title
                    line-height : 44px
                    font-size : $font-size-large
        .toplist
            height: 100%
            overflow: hidden
            .item
                display: flex
                margin: 0 20px
                padding-top: 20px
                height: 100px
                &:last-child
                    padding-bottom: 20px
                .icon
                    flex: 0 0 100px
                    width: 100px
                    height: 100px
                .songlist
                    flex: 1
                    display: flex
                    flex-direction: column
                    justify-content: center
                    padding: 0 20px
                    height: 100px
                    overflow: hidden
                    background: $color-highlight-background
                    color: $color-text-d
                    font-size: $font-size-small
                    .song
                        no-wrap()
                        line-height: 26px
            .loading-container
                position: absolute
                width: 100%
                top: 50%
                transform: tranlateY(-50%)
</style>
