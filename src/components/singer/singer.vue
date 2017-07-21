<template>
    <div class="singer">
        <list-view :data="singers"></list-view>
    </div>
</template>

<script type="text/ecmascript-6">
    import {ERROR_OK} from '@/api/config'
    import {getSingerList} from '@/api/singer'
    import Singer from '@/common/js/singer'
    import ListView from '@/base/listview/listview'
    const HOT_NAME = '热门'
    const HOT_SINGER_LEN = 10
    export default {
        data () {
          return {
              singers : []
          }
        },
        mounted() {
            this._getSingerList()
        },
        methods: {
            _getSingerList() {
                getSingerList().then( (res) => {
                    if (res.code == ERROR_OK) {
                        this._normalizeSinger(res.data.list)
                    } else {
                        console.log(res.code)
                    }
                  })
          },
            _normalizeSinger(list) {
                let map = {
                    hot: {
                        title: HOT_NAME ,
                        items: []
                    }
                }

                list.forEach((item, index) => {
                    if ( index < HOT_SINGER_LEN) {
                        map.hot.items.push(new Singer({
                            name: item.Fsinger_name,
                            id: item.Fsinger_mid
                        }))
                    }
                    const key = item.Findex
                    if (!map[key]) {
                        map[key]= {}
                        map[key]['title'] = key
                        map[key]['items'] = []
                        map[key]['items'].push(new Singer({
                            name: item.Fsinger_name,
                            id: item.Fsinger_mid
                        }))
                    } else {
                        map[key]['items'].push(new Singer({
                            name: item.Fsinger_name,
                            id: item.Fsinger_mid
                        }))
                    }
                })

                // 获取有序列表
                let ret = []
                let hot = []

                for (let key in map) {
                    let val = map[key]
                    if (val.title.match(/[a-zA-Z]/)) {
                        ret.push(val)
                    } else if (val.title == HOT_NAME) {
                        hot.push(val)
                    }
                }

                ret.sort((a,b) => {
                    return a.title.charCodeAt(0) - b.title.charCodeAt(0)
                })

                this.singers = hot.concat(ret)

                console.log(this.singers)

            }
        },
        components: {
            ListView,
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .singer
        position: fixed
        top: 88px
        bottom: 0
        width: 100%
</style>
