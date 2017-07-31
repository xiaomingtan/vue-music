import * as types  from './mutation-types'
import {shuffle} from '@/common/js/util'
import {playMode} from '@/common/js/config'

function findIndex(list, song) {
    return list.findIndex((item) => {
        return item.id === song.id
    })
}

export const selectPlay =  function({commit, state}, {list, index}) {

    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_PLAYING_STATE, true)
    commit(types.SET_SEQUENCE_LIST, list)

    if (state.mode === playMode.random) {
        let randomList = shuffle(list)
        let newIndex = findIndex(randomList, list[index])

        commit(types.SET_PLAYLIST, randomList)
        commit(types.SET_CURRENT_INDEX, newIndex)
    } else {
        commit(types.SET_PLAYLIST, list)
        commit(types.SET_CURRENT_INDEX, index)
    }
}

export const selectRandomPlay = function ({commit}, {list, index}) {
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_PLAYING_STATE, true)
    commit(types.SET_PLAY_MODE, playMode.random)
    commit(types.SET_SEQUENCE_LIST, list)
    commit(types.SET_PLAYLIST, shuffle(list))
    commit(types.SET_CURRENT_INDEX, index)
}

export const insertSong = function({commit, state}, song) {
    let playlist = state.playlist.slice()
    let sequenceList = state.sequencelist.slice()
    let currentIndex = state.currentIndex
    let currentSong = playlist[currentIndex]

    let fdIndex = findIndex(playlist, song)

    currentIndex ++ // 插入歌曲，要加一以便更新
    playlist.splice(currentIndex, 0, song)

    // 如果原来列表已经存在，则需要删除原来列表中的歌曲
    if (fdIndex > -1) {
        if (fdIndex < currentIndex) {
            playlist.splice(fdIndex, 1)
            currentIndex --
        } else {
            playlist.splice(fdIndex + 1, 1) // 因为已经插入了新的歌曲
        }
    }

    let fsIndex = findIndex(sequenceList, song)
    let currentSIndex = findIndex(sequenceList, currentSong) + 1 // 当前播放歌曲的下一首

    sequenceList.splice(currentSIndex, 0, song)

    if (fsIndex > -1) {
        if (fsIndex < currentSIndex) {
            sequenceList.splice(fsIndex, 1)
        } else {
            sequenceList.splice(fsIndex + 1, 1) // 因为已经插入了新的歌曲
        }
    }

    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_PLAYING_STATE, true)
    commit(types.SET_SEQUENCE_LIST, sequenceList)
    commit(types.SET_PLAYLIST, playlist)
    commit(types.SET_CURRENT_INDEX, currentIndex)

}