import {playMode} from '@/common/js/config'
const state = {
    singer: {},
    playing: false,
    fullScreen: false,
    model: playMode.sequence,
    currentIndex : -1,
    playlist: [],
    sequenceList: [],
    topList: {},
}

export default state