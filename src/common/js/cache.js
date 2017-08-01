import Storage from 'good-storage'

const KEY_SEARCH = '__SEARCH__'
const SEARCH_MAX_LEN = 10

const KEY_PLAY_HISTORY = '__PLAY__'
const PLAY_MAX_LEN = 200

function insertArray (arr, val, compare, maxLen) {
    let index = arr.findIndex(compare)

    if (index > -1) {
        arr.splice(index, 1)
    }

    arr.unshift(val)

    if (maxLen && arr.length > maxLen) {
        arr.pop()
    }
}

function deleteFromArray(arr, compare) {
    let index = arr.findIndex(compare)

    if (index > -1) {
        arr.splice(index, 1)
    }
}

// 加载搜索历史缓存
export const loadSearch = function() {
    return Storage.get(KEY_SEARCH, [])
}

// 保存搜索历史
export const saveSearch = function(val) {
    let searches = loadSearch()
    insertArray(searches, val, (item) => {
        return item === val
    }, SEARCH_MAX_LEN)
    Storage.set(KEY_SEARCH, searches)

    return searches
}

// 删除一条搜索历史
export const deleteSearch = function(val) {
    let searches = loadSearch()
    deleteFromArray(searches, (item) => { return item === val })
    Storage.set(KEY_SEARCH, searches)
    return searches
}

// 清空搜索历史缓存
export const clearSearch = function() {
    Storage.remove(KEY_SEARCH)
    return []
}

// 加载搜索历史缓存
export const loadPlay = function() {
    return Storage.get(KEY_PLAY_HISTORY, [])
}

// 保存搜索历史
export const savePlay = function(song) {
    let searches = loadSearch()
    insertArray(searches, song, (item) => {
        return item.id === song.id
    }, PLAY_MAX_LEN)
    Storage.set(KEY_PLAY_HISTORY, searches)

    return searches
}

// 删除一条搜索历史
export const deletePlay = function(song) {
    let searches = loadSearch()
    deleteFromArray(searches, (item) => { return item.id === song.id })
    Storage.set(KEY_PLAY_HISTORY, searches)
    return searches
}

// 清空搜索历史缓存
export const clearPlay = function() {
    Storage.remove(KEY_PLAY_HISTORY)
    return []
}