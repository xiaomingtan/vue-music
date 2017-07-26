<template>
    <transition name="fade">
        <music-list :rank="rank" :title="title" :bg-image="bgImage" :songs="songs"></music-list>
    </transition>
</template>

<script type="text/ecmascript-6">
    import MusicList from '@/components/music-list/music-list'
    import {mapGetters} from 'vuex'
    import {getMusicList} from '@/api/rank'
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
                return this.topList.topTitle
            },
            bgImage() {
                if (this.songs.length) {
                    return this.songs[0].image
                }
                return ''
            },
            ...mapGetters([
                'topList'
            ])
        },
        created() {
            this.rank = true
            this._getMusicList()
        },
        methods: {
          _getMusicList() {
              if (this.topList.id === undefined) {
                  this.$router.push('/rank')
                  return
              }
              getMusicList(this.topList.id).then((res) => {
                  if ( res.code === ERROR_OK ) {
                        this.songs = this._normalizeSongs(res.songlist)
                  } else {
                      console.log(res.message)
                  }
              })
          },
          _normalizeSongs(list) {
              let ret = []
              list.forEach( (item) => {
                  let musicData = item.data
                  if (musicData.songid && musicData.albumid) {
                      ret.push(createSong(musicData))
                  }
              } )
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
