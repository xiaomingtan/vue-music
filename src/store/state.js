import {playMode} from '@/common/js/config'
const state = {
    singer: {},
    playing: false,
    fullScreen: false,
    mode: playMode.sequence,
    currentIndex : -1,
    playlist: [],
    sequencelist: [],
    topList: {},
    disc: {}
}

export default state