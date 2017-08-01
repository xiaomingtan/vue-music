import * as types  from './mutation-types'
import {shuffle} from '@/common/js/util'
import {playMode} from '@/common/js/config'
import {saveSearch,deleteSearch,clearSearch} from '@/common/js/cache'


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

export const saveSearchHistory = function ({commit, state}, query) {
    commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}

export const deleteSearchHistory = function ({commit}, query) {
    commit(types.SET_SEARCH_HISTORY, deleteSearch(query))
}

export const clearSearchHistory = function ({commit}) {
    commit(types.SET_SEARCH_HISTORY, clearSearch())
}

export const deleteSong = function({commit, state}, song) {
    let sequencelist = state.sequencelist.slice()
    let playlist = state.playlist.slice()
    let currentIndex = state.currentIndex
    let pIndex = findIndex(playlist, song)
    sequencelist.splice(pIndex, 1)
    let sIndex = findIndex(sequencelist, song)
    sequencelist.splice(sIndex, 1)

    if (currentIndex > pIndex || currentIndex === playlist.length) {
        currentIndex --
    }

    commit(types.SET_CURRENT_INDEX, currentIndex)
    commit(types.SET_SEQUENCE_LIST, sequencelist)
    commit(types.SET_PLAYLIST, playlist)

    if (playlist.length) {
        commit(types.SET_PLAYING_STATE, true)
    } else {
        commit(types.SET_PLAYING_STATE, false)
    }

}

export const deleteSongList = function ({commit}) {
    commit(types.SET_CURRENT_INDEX, -1)
    commit(types.SET_PLAYLIST, [])
    commit(types.SET_SEQUENCE_LIST, [])
    commit(types.SET_PLAYING_STATE, false)
}