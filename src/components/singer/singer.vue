<template>
    <transition name="slide">
        <div class="singer" ref="singer">
            <div class="title-wrapper">
                <div class="back" @click="back">
                    <i class="icon-back"></i>
                </div>
                <span class="title">歌手</span>
            </div>
            <list-view :data="singers" @select="selectSinger" ref="list"></list-view>
            <router-view></router-view>
        </div>
    </transition>
</template>

<script scoped type="text/ecmascript-6">
    import {ERROR_OK} from '@/api/config'
    import {getSingerList} from '@/api/singer'
    import Singer from '@/common/js/singer'
    import ListView from '@/base/listview/listview'
    import {mapMutations} from 'vuex'
    import {playlistMixin} from '@/common/js/mixin'

    const HOT_NAME = '热门'
    const HOT_SINGER_LEN = 10
    export default {
        mixins: [playlistMixin],
        data () {
          return {
              singers : [],
              showFlag : false
          }
        },
        mounted() {
            this._getSingerList()
        },
        methods: {
            back() {
                this.$router.back()
            },
            handlePlaylist(playlist) {
                const bottom = playlist.length > 0 ? '60px' : ''
                this.$refs.singer.style.bottom = bottom
                this.$refs.list.refresh()
            },
            _getSingerList() {
                getSingerList().then( (res) => {
                    if (res.code == ERROR_OK) {
                        this._normalizeSinger(res.data.list)
                    } else {
                        console.log(res.code)
                    }
                  })
          },
            _normalizeSinger(list) {
                let map = {
                    hot: {
                        title: HOT_NAME ,
                        items: []
                    }
                }

                list.forEach((item, index) => {
                    if ( index < HOT_SINGER_LEN) {
                        map.hot.items.push(new Singer({
                            name: item.Fsinger_name,
                            id: item.Fsinger_mid
                        }))
                    }
                    const key = item.Findex
                    if (!map[key]) {
                        map[key]= {}
                        map[key]['title'] = key
                        map[key]['items'] = []
                        map[key]['items'].push(new Singer({
                            name: item.Fsinger_name,
                            id: item.Fsinger_mid
                        }))
                    } else {
                        map[key]['items'].push(new Singer({
                            name: item.Fsinger_name,
                            id: item.Fsinger_mid
                        }))
                    }
                })

                // 获取有序列表
                let ret = []
                let hot = []

                for (let key in map) {
                    let val = map[key]
                    if (val.title.match(/[a-zA-Z]/)) {
                        ret.push(val)
                    } else if (val.title == HOT_NAME) {
                        hot.push(val)
                    }
                }

                ret.sort((a,b) => {
                    return a.title.charCodeAt(0) - b.title.charCodeAt(0)
                })

                this.singers = hot.concat(ret)
            },
            selectSinger(singer) {
                this.$router.push({
                    path: `singer/${singer.id}`
                })
                this.setSinger(singer)
            },
            ...mapMutations({
                setSinger: 'SET_SINGER'
            })
        },
        components: {
            ListView
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"
    .singer
        position: fixed
        top: 44px
        bottom: 0
        width: 100%
        .title-wrapper
            position : absolute
            left : 0
            right : 0
            top: -44px
            height : 44px
            text-align : center
            background : $color-background
            .back
                position : absolute
                left: 15px
                top: 10px
                color : $color-theme
                font-size : $font-size-large-x
            .title
                line-height : 44px
                font-size : $font-size-large
        &.slide-enter-active, &.slide-leave-active
            transition: all 0.3s
        &.slide-enter, &.slide-leave-to
            transform: translate3d(100%, 0, 0)
</style>
