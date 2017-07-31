<template>
    <div class="search">
        <div class="search-box-wrapper">
            <search-box ref="searchBox" @query="search"></search-box>
        </div>
        <div class="shortcut-wrapper"  v-show="!query">
            <div class="shortcut">
                <div class="hot-key">
                    <h1 class="title">热门搜索</h1>
                    <ul>
                        <li v-for="item in hotKey" class="item" @click="addQuery(item.k)">
                            <span> {{item.k}} </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="search-history" v-show="searchHistory.length">
            <h1 class="title">
                <span class="text">搜索历史</span>
                <span @click="showConfirm" class="clear">
                <i class="icon-clear"></i>
              </span>
            </h1>
            <search-list @delete="deleteSearchHistory" @select="addQuery" :searches="searchHistory"></search-list>
        </div>
        <div class="search-result" v-show="query" ref="searchResult">
            <suggest  ref="suggest" :query="query"></suggest>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import SearchBox from '@/base/search-box/search-box'
    import SearchList from '@/base/search-list/search-list'
    import suggest from '@/components/suggest/suggest'
    import {getHotKey} from '@/api/search'
    import {ERROR_OK} from '@/api/config'

    export default {
        data() {
            return {
                hotKey: [],
                query: ''
            }
        },
        created() {
            this._getHotKey()
            this.searchHistory = []
        },
        methods: {
            _getHotKey() {
                getHotKey().then((res)=>{
                    if (res.code === ERROR_OK) {
                        this.hotKey = res.data.hotkey.slice(0, 10)
                    }
                })
            },
            showConfirm() {

            },
            addQuery(query) {
                this.$refs.searchBox.setQuery(query)
            },
            deleteSearchHistory() {

            },
            saveSearch() {

            },
            search(query) {
                this.query = query
            }
        },
        components: {
            SearchBox,
            SearchList,
            suggest,
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"
    .search
        .search-box-wrapper
            margin: 20px
        .shortcut-wrapper
            position: fixed
            top: 178px
            bottom: 0
            .shortcut
                height: 100%
                overflow: hidden
                width: 100%
                .hot-key
                    margin : 0 20px 20px 20px
                    .title
                        margin-bottom : 20px
                        font-size: $font-size-medium
                        color: $color-text-l
                    .item
                        display: inline-block
                        padding: 5px 10px
                        margin: 0 20px 10px 0
                        border-radius: 6px
                        background: $color-highlight-background
                        font-size: $font-size-medium
                        color: $color-text-d
                .search-history
                    position: relative
                    margin: 0 20px
                    .title
                        display: flex
                        align-items: center
                        height: 40px
                        font-size: $font-size-medium
                        color: $color-text-l
                        .text
                            flex: 1
                        .clear
                            extend-click()
                            .icon-clear
                                font-size: $font-size-medium
                                color: $color-text-d
        .search-result
            position: fixed
            width: 100%
            top: 178px
            bottom: 0
</style>
