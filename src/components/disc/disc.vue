<template>
    <transition name="fade">
        <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
    </transition>
</template>

<script type="text/ecmascript-6">
    import {getSongList} from '@/api/recommend'
    import {mapMutations,mapGetters} from 'vuex'
    import MusicList from '@/components/music-list/music-list'
    import {ERROR_OK} from '@/api/config'
    import {createSong} from '@/common/js/song'

    export default {
        data() {
            return {
                songs: []
            }
        },
        computed: {
            title() {
                return this.disc.dissname
            },
            bgImage() {
                return this.disc.imgurl
            },
            ...mapGetters([
                'disc'
            ])
        },
        created() {
          this._getDiscDetail()
        },
        methods: {
            _getDiscDetail() {
                if (!this.disc.dissid) {
                    this.$router.push({
                        name: 'recommend'
                    })
                    return
                }
                getSongList(this.disc.dissid).then((res) => {
                    if (res.code === ERROR_OK) {
                        console.log(res)
                        this.songs = this._normalizeSongs(res.cdlist[0].songlist)
                    }
                })
            },
            _normalizeSongs(list) {
                let ret = []
                list.forEach((item) => {
                    let musicData = item
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
