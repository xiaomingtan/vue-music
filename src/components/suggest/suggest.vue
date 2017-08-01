<template>
    <scroll class="suggest"
            ref="suggest"
            :data="result"
            :beforeScroll="beforeScroll"
            :pullup="pullup"
            @beforeScroll="scrollStart"
            @scrollToEnd="searchMore"
    >
        <ul class="suggest-list">
            <li class="suggest-item" v-for="item in result" @click="selectItem(item)">
                <div class="icon">
                    <i :class="getIconCls(item)"></i>
                </div>
                <div class="name">
                    <p class="text" v-html="getDisplayName(item)"></p>
                </div>
            </li>
            <loading v-show="hasMore" title=""></loading>
        </ul>
        <div v-show="!hasMore && !result.length" class="no-result-wrapper">
            <no-result title="抱歉，暂无搜索结果"></no-result>
        </div>
    </scroll>
</template>

<script type="text/ecmascript-6">
    import scroll from '@/base/scroll/scroll'
    import loading from '@/base/loading/loading'
    import NoResult from '@/base/no-result/no-result'
    import {search} from '@/api/search'
    import {ERROR_OK} from '@/api/config'
    import {createSong} from '@/common/js/song'
    import {mapActions, mapMutations} from 'vuex'
    import Singer from '@/common/js/singer'

    const TYPE_SINGER = 'singer'
    const perpage = 20
    export default {
        props: {
            showSinger: {
                type: Boolean,
                default: true
            },
            query: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                page: 1,
                hasMore: true,
                pullup: true,
                beforeScroll: true,
                result: []
            }
        },
        computed: {
        },
        watch: {
            query() {
                this.search()
            }
        },
        methods: {
            refresh() {
                this.$refs.suggest.refresh()
            },
            scrollStart() {
              this.$emit('scrollStart')
            },
            search() {
                this.page = 1
                this.hasMore = true
                search(this.query, this.page, this.showSinger, perpage).then((res) => {
                    if (res.code === ERROR_OK) {
                        this.result = this._normalizeData(res.data)
                        this._checkMore(res.data)
                    }
                })
            },
            searchMore() {
                if (!this.hasMore) {
                    return
                }
                this.page++
                search(this.query, this.page, this.showSinger, perpage).then((res) => {
                    if (res.code === ERROR_OK) {
                        this.result = this.result.concat(this._normalizeData(res.data))
                        this._checkMore(res.data)
                    }
                })
            },
            getDisplayName(item) {
                if (item.type === TYPE_SINGER) {
                    return item.singername
                } else {
                    return `${item.name}-${item.singer}`
                }
            },
            getIconCls(item) {
                if (item.type === TYPE_SINGER) {
                    return 'icon-mine'
                } else {
                    return 'icon-music'
                }
            },
            _normalizeData(list) {
                let ret1 = []
                if (list.zhida && list.zhida.singerid) {
                    ret1.push({...list.zhida, ...{type: TYPE_SINGER}})
                }
                let ret2 = []
                list.song.list.forEach((item) => {
                    let musicData = item
                    if (musicData.albumid && musicData.songid) {
                        ret2.push(createSong(musicData))
                    }
                })
                return ret1.concat(ret2)
            },
            _checkMore(data) {
                const song = data.song
                if (!song.list.length || (song.curnum + song.curpage * perpage) > song.totalnum) {
                    this.hasMore = false
                }
            },
            selectItem(item) {
                let name
                if (item.type === TYPE_SINGER) {
                    name = item.singername
                    const singer = new Singer({
                        id: item.singermid,
                        name: item.singername
                    })
                    this.$router.push(`/singer/${singer.id}`)
                    this.setSinger(singer)
                } else {
                    name = item.name
                    this.insertSong(item)
                }
                this.$emit('select', name)
            },
            ...mapActions([
                'insertSong'
            ]),
            ...mapMutations({
                setSinger: 'SET_SINGER'
            })
        },
        components: {
            scroll,
            loading,
            NoResult,
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"
    @import "~common/stylus/mixin"

    .suggest
        height: 100%
        overflow: hidden
        .suggest-list
            padding: 0 30px
            .suggest-item
                display: flex
                align-items: center
                padding-bottom: 20px
            .icon
                flex: 0 0 30px
                width: 30px
                [class^="icon-"]
                    font-size: 14px
                    color: $color-text-d
            .name
                flex: 1
                font-size: $font-size-medium
                color: $color-text-d
                overflow: hidden
                .text
                    no-wrap()
        .no-result-wrapper
            position: absolute
            width: 100%
            top: 50%
            transform: translateY(-50%)
</style>
