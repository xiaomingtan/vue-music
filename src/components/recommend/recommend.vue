<template>
    <div class="recommend" ref="recommend">
        <scroll ref="scroll" class="recommend-content" :data="singers">
            <div>
                <!-- <div  v-if="recommends.length" class="slider-wrapper">
                    <slider>
                        <div class="slider-wrapper" v-for="item in recommends" :key="item.id">
                            <a :href="item.linkUrl">
                                <img class="needsclick" :src="item.picUrl">
                            </a>
                        </div>
                    </slider>
                </div> -->
                <!-- <div class="btns-wrapper">
                    <router-link to="/singer" class="singer" tag="div">
                        <i class="icon icon-mine"></i>
                        <p class="title">歌手</p>
                    </router-link>
                    <router-link to="/rank" class="rank" tag="div">
                        <i class="icon icon-ok"></i>
                        <p class="title">排行</p>
                    </router-link>
                </div> -->
                <div class="recommend-list">
                    <h1 class="list-title">热门歌手</h1>
                    <ul>
                        <li 
                            :key="item._id"
                            class="item" 
                            v-for="(item) in singers" 
                            @click="selectSinger(item)"
                        >
                            <div class="icon">
                                <img width="60" height="60" v-lazy="item.avatar" />
                            </div>
                            <div class="text">
                                <h2 class="name" v-html="item.name"></h2>
                                <p class="name" v-html="item.id"></p>
                            </div>
                        </li>
                    </ul>
                    <div class="loading-wrapper" v-show="!singers.length">
                        <loading></loading>
                    </div>
                </div>
            </div>
        </scroll>
        <router-view></router-view>
    </div>
</template>

<script scoped type="text/ecmascript-6">
    import {ERROR_OK} from '@/api/config'
    import {getSingerList} from '@/api/singer'
    import slider from '@/base/slider/slider'
    import scroll from '@/base/scroll/scroll'
    import loading from '@/base/loading/loading'
    import {mapMutations} from 'vuex'
    import {playlistMixin} from '@/common/js/mixin'
    import Singer from '@/common/js/singer'

    export default {
        mixins: [playlistMixin],
        data () {
          return {
              singers: []
          }
        },
        created() {            
            this._getSingerList()
        },
        methods: {
            handlePlaylist() {
                let bottom = this.playlist.length > 0 ? '60px' : ''

                this.$refs.recommend.style.bottom = bottom
                this.$refs.scroll.refresh()
            },
            _getSingerList() {
                getSingerList().then( (res) => {
                    if (res.code == ERROR_OK) {
                        const list = res.data.list.filter(item => item.Fsinger_id == "4558")
                        this.singers = []
                        list.forEach(item => {
                                this.singers.push(new Singer({
                                name: item.Fsinger_name,
                                id: item.Fsinger_mid
                            }))
                        })
                    } else {
                        console.log(res.code)
                    }
                })
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
        components : {
            slider,
            scroll,
            loading
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"
    .recommend
        position: fixed
        width: 100%
        top: 44px
        bottom: 0
        .recommend-content
            height: 100%
            overflow: hidden
            .slider-wrapper
                position: relative
                width: 100%
                overflow: hidden
            .btns-wrapper
                font-size: 0
                padding-top : 10px
                .icon
                    color : $color-theme
                    font-size : $font-size-large-x
                .rank,.singer
                    text-align : center
                    box-sizing : border-box
                    display : inline-block
                    width : 50%
                    .title
                        padding-top : 5px
                        font-size : $font-size-medium
            .recommend-list
                .list-title
                    height: 65px
                    line-height: 65px
                    text-align: center
                    font-size: $font-size-medium
                    color: $color-theme
                .item
                    display: flex
                    box-sizing: border-box
                    align-items: center
                    padding: 0 20px 20px 20px
                    .icon
                        flex: 0 0 60px
                        width: 60px
                        padding-right: 20px
                    .text
                        flex: 1
                        display: flex
                        line-height: 20px
                        overflow: hidden
                        font-size: $font-size-medium
                        flex-direction: column
                        justify-content: center
                        .name
                            margin-bottom: 10px
                            color: $color-text
                        .desc
                            color: $color-text-d


</style>
