<template>
    <div class="recommend">
        <div class="slider-wrapper">
            <slider>
                <div v-if="recommends.length" v-for="item in recommends">
                    <a :href="item.linkUrl">
                        <img class="needsclick" :src="item.picUrl">
                    </a>
                </div>
            </slider>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {ERROR_OK} from '@/api/config'
    import {getRecommend} from '@/api/recommend'
    import slider from '@/base/slider/slider'

    export default {
        data () {
          return {
              recommends : []
          }
        },
        created() {
            this._getRecommend()
        },
        methods: {
            _getRecommend() {
               getRecommend().then( (res) => {
                    if (res.code == ERROR_OK) {
                        this.recommends = res.data.slider;
                    } else {
                        console.log(res.code)
                    }
               })
            },
        },
        components : {
            slider
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
