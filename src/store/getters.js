export const singer = state => state.singer

export const playing = state => state.playing

export const fullScreen = state => state.fullScreen

export const model = state => state.model

export const playlist = state => state.playlist

export const sequencelist = state => state.sequencelist

export const currentIndex = state => state.currentIndex

export const currentSong = (state) => {
    return state.playlist[state.currentIndex] || {}
}

export const topList = state => state.topList