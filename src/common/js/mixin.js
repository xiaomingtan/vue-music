import {mapGetters, mapActions,mapMutations} from 'vuex'
import {playMode} from '@/common/js/config'
import {shuffle} from '@/common/js/util'

export const playlistMixin = {
    computed: {
        ...mapGetters([
            'playlist'
        ])
    },
    mounted() {
      this.handlePlaylist(this.playlist)
    },
    activated() { // 切换路由时激活
        this.handlePlaylist(this.playlist)
    },
    watch: {
        playlist(newVal) {
            this.handlePlaylist(newVal)
        }
    },
    methods: {
        // 当播放器出现时，组件中存在滚动组件时，滚动计算的位置不对，需要重新刷新滚动组件
        handlePlaylist() {
            throw new Error('component must implement handlePlaylist method')
        }
    }
}

export const playerMixin =  {
    computed: {
        modeCon() {
            return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random'
        },
        ...mapGetters([
            'mode',
            'sequencelist',
            'currentSong',
            'favoriteList'
        ])
    },
    methods: {
        changeMode() {
            const mode = (this.mode + 1) % 3
            this.setPlayMode(mode)
            let list = null
            if (mode === playMode.random) {
                list = shuffle(this.sequencelist)
            } else {
                list = this.sequencelist
            }

            this.resetCurrentIndex(list)
            this.setPlayList(list)
        },
        resetCurrentIndex(list) {
            if (!list) {
                return
            }
            let currentIndex = 0
            list.forEach((item, index)=>{
                if (item.id === this.currentSong.id) {
                    currentIndex = index
                    return
                }
            })

            this.setCurrentIndex(currentIndex)
        },
        toggleFavorite(song) {
            if (this._isFavorite(song)) {
                this.deleteFavoriteList(song)
            } else {
                this.saveFavoriteList(song)
            }
        },
        getFavoriteIcon(song) {
            return this._isFavorite(song) ? 'icon-favorite': 'icon-not-favorite'
        },
        _isFavorite(song) {
            return this.favoriteList.findIndex((item) => {return item.id === song.id}) > -1 ? true : false
        },
        ...mapMutations({
            setPlayMode: 'SET_PLAY_MODE',
            setPlayList: 'SET_PLAYLIST',
            setCurrentIndex: 'SET_CURRENT_INDEX'
        }),
        ...mapActions([
           'saveFavoriteList',
           'deleteFavoriteList'
        ])
    }
}

export const searchMixin = {
    data() {
      return {
          query: ''
      }
    },
    computed: {
        ...mapGetters([
            'searchHistory'
        ])
    },
    methods : {
        blurInput() {
            this.$refs.searchBox.blur()
        },
        search(query) {
            this.query = query
        },
        addQuery(query) {
            this.$refs.searchBox.setQuery(query)
        },
        ...mapActions([
            'saveSearchHistory',
            'deleteSearchHistory'
        ])
    }
}