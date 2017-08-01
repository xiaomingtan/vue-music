import {mapGetters, mapActions} from 'vuex'

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