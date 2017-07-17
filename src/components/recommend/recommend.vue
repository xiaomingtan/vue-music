<template>
    <div>
        推荐
    </div>
</template>

<script type="text/ecmascript-6">
    import {ERROR_OK} from '@/api/config'
    import {getRecommend} from '@/api/recommend'
    export default {
        created() {
            this._getRecommend();
        },
        methods: {
            _getRecommend() {
               getRecommend().then( (res) => {
                    if (res.code == ERROR_OK) {
                        console.log(res)
                    } else {
                        console.log(res.code)
                    }
               })
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
