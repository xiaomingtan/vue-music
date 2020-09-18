<template>
    <transition name="fade">
        <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
    </transition>
</template>

<script type="text/ecmascript-6">
    import MusicList from '@/components/music-list/music-list'
    import {getSingerDetail, getSingerDetail2} from '@/api/singer'
    import {ERROR_OK} from '@/api/config'
    import Song, {createSong} from '@/common/js/song'
    import {mapGetters} from 'vuex'

    export default {
        computed: {
            title() {
                return this.singer.name
            },
            bgImage() {
                return this.singer.avatar
            },
            ...mapGetters([
                'singer'
            ])
        },
        data() {
            return {
                songs: []
            }
        },
        created() {
        },
        mounted() {
          this._getDetail()
        },
        methods: {
            _getDetail() {
                if (!this.singer.id) {
                    this.$router.push('/recommend')
                    return
                }
                if (this.singer.name == "周杰伦") {
                    getSingerDetail2({
                        id: this.singer.id
                    }).then((res) => {
                        console.log(res)
                        if (res.code === ERROR_OK) {
                            this.songs = res.body.models.map(item => {
                                return new Song({
                                      id: item._id,
                                      mid: "",
                                      singer: item.singer,
                                      name: item.name,
                                      album: "",
                                      duration: 120,
                                      image: this.processServerUrl(item.cover),
                                      url: this.processServerUrl(item.link)
                                })
                            })
                        }
                    })
                } else {
                    getSingerDetail(this.singer.id).then((res) => {
                        if (res.code === ERROR_OK) {
                            this.songs = this._normalizeSongs(res.data.list)
                        }
                    })
                }
               
            },
            _normalizeSongs(list) {
                let ret = []
                list.forEach((item) => {
                    let {musicData} = item
                    if (musicData.songid && musicData.albummid) {
                        ret.push(createSong(musicData))
                    }
                })
                return ret
            }
        },
        components: {
            MusicList
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .fade-enter-active,.fade-leave-active
        transition: all 0.3s
    .fade-enter,.fade-leave-active
        transform : translate3d(100%, 0 ,0)
</style>
