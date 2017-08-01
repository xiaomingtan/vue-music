import {playMode} from '@/common/js/config'
import {loadSearch, loadPlay} from '@/common/js/cache'
const state = {
    singer: {},
    playing: false,
    fullScreen: false,
    mode: playMode.sequence,
    currentIndex : -1,
    playlist: [],
    sequencelist: [],
    topList: {},
    disc: {},
    searchHistory: loadSearch(),
    playHistory: loadPlay()
}

export default state