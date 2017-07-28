<template>
    <div class="player">
        <transition name="normal"
                    @enter="enter"
                    @after-enter="afterEnter"
                    @leave="leave"
                    @after-leave="afterLeave"
        >
            <div class="normal-player" v-show="fullScreen">
                <div class="background">
                    <img width="100%" height="100%"  :src="currentSong.image">
                </div>
                <div class="top">
                    <div class="back" @click="back">
                        <i class="icon-back"></i>
                    </div>
                    <h1 class="title" v-html="currentSong.name"></h1>
                    <h2 class="subtitle" v-html="currentSong.singer"></h2>
                </div>
                <div class="middle">
                    <div class="middle-l">
                        <div class="cd-wrapper" ref="cdWrapper">
                            <div class="cd" :class="cdCls">
                                <img class="image" :src="currentSong.image">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bottom">
                    <div class="dot-wrapper">
                        <span class="dot"></span>
                        <span class="dot"></span>
                    </div>
                    <div class="progress-wrapper">
                        <span class="time time-l">{{formatTime(currentTime)}}</span>
                        <div class="progress-bar-wrapper">
                            <progress-bar :percent="percent" @percentChange="pregressBarChange"></progress-bar>
                        </div>
                        <span class="time time-r">{{formatTime(currentSong.duration)}}</span>
                    </div>
                    <div class="operators">
                        <div class="icon i-left">
                            <i class="icon-sequence"></i>
                        </div>
                        <div class="icon i-left" @click="prevSong" :class="disableCls">
                            <i class="icon-prev"></i>
                        </div>
                        <div class="icon i-center" @click="togglePlay" :class="disableCls">
                            <i :class="playCon"></i>
                        </div>
                        <div class="icon i-right"  @click="nextSong" :class="disableCls">
                            <i class="icon-next"></i>
                        </div>
                        <div class="icon i-right">
                            <i class="icon icon-not-favorite"></i>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <transition name="mini">
            <div class="mini-player" v-show="!fullScreen" @click="openNormalPlayer">
                <div class="icon" :class="cdCls" ref="miniCd">
                    <img width="40" height="40" :src="currentSong.image">
                </div>
                <div class="text">
                    <h2 class="name" v-html="currentSong.name"></h2>
                    <p class="desc" v-html="currentSong.singer"></p>
                </div>
                <div class="control">
                    <progress-circle :radius="radius" :percent="percent">
                        <i @click.stop="togglePlay" class="icon-mini" :class="miniCon"></i>
                    </progress-circle>
                </div>
            </div>
        </transition>
        <audio ref="audio" :src="currentSong.url"
               @canplay="songReady"
               @error="playError"
               @timeupdate="updateTime"
               @ended="endSong"
        ></audio>
    </div>
</template>

<script type="text/ecmascript-6">
    import ProgressBar from '@/base/progress-bar/progress-bar'
    import ProgressCircle from '@/base/progress-circle/progress-circle'
    import {mapGetters, mapMutations} from 'vuex'
    import {prefixStyle} from '@/common/js/dom'
    import animations from 'create-keyframe-animation'

    const transform = prefixStyle('transform')
    export default {
        data() {
            return {
                currentTime: 0,
                radius: 32,
                songReadyState: false
            }
        },
        computed: {
            cdCls() {
                return this.playing ? 'play' : 'play pause'
            },
            playCon() {
              return this.playing ? 'icon-pause' : 'icon-play'
            },
            miniCon() {
                return this.playing ? 'icon-pause-mini' : 'icon-play-mini'
            },
            disableCls () {
              return this.songReadyState? '': 'disable'
            },
            percent() {
                return this.currentTime / this.currentSong.duration
            },
            ...mapGetters([
                'currentSong',
                'fullScreen',
                'playing',
                'currentIndex',
                'playlist'
            ])
        },
        methods: {
            back() {
                this.setFullScreen(false)
            },
            songReady() {
                this.songReadyState = true
            },
            playError() {
                this.songReadyState = true
            },
            updateTime(e) {
                this.currentTime = e.target.currentTime
            },
            //time
            formatTime(time) {
                time = time | 0
                let min = time / 60 | 0
                let sec = this._padZero(time % 60)

                return `${min}:${sec}`
            },
            _padZero(num, n = 2 ) {
                let len = num.toString().length
                while (len < n) {
                    num = '0' + num
                    len ++
                }
                return num
            },
            // transitions
            _getPosAndScale() {
                let target = this.$refs.miniCd
                let original = this.$refs.cdWrapper
                let targetWidth = target.clientWidth
                let width = original.clientWidth
                let scale = targetWidth / width
                const paddingBottom = 30
                const paddingTop = 80
                const paddingLeft = 40
                const x = -(window.innerWidth / 2 - paddingLeft)
                const y = window.innerHeight - paddingTop - width / 2 - paddingBottom

                return {
                    x,
                    y,
                    scale
                }

            },
            enter(el, done) {
                const {x, y, scale} = this._getPosAndScale()
                // 为了有一个回弹的效果，需要使用key-frames
                let animation = {
                    0: {
                        transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
                    },
                    60: {
                        transform: `translate3d(0,0,0) scale(1.1)`
                    },
                    100: {
                        transform: `translate3d(0,0,0) scale(1)`
                    }
                }

                animations.registerAnimation({
                    name: 'move',
                    animation,
                    presets: {
                        duration: 400,
                        easing: 'linear'
                    }
                })

                animations.runAnimation(this.$refs.cdWrapper, 'move', done)
            },
            afterEnter() {
                animations.unregisterAnimation('move')
                this.$refs.cdWrapper.style.animation = ''
            },
            leave(el, done) {
                let cdWrapper = this.$refs.cdWrapper
                cdWrapper.style.transition = 'all 0.4s'
                const {x, y, scale} = this._getPosAndScale()
                cdWrapper.style[transform] = `translate3d(${x}px,${y}px,0) scale(${scale})`
                cdWrapper.addEventListener('transitionend', done)
            },
            afterLeave() {
                this.$refs.cdWrapper.style.transition = ''
                this.$refs.cdWrapper.style[transform] = ''
            },
            // controls
            prevSong() {
                if (!this.songReadyState) {
                    return
                }
                let index = this.currentIndex - 1 === -1 ? this.playlist.length - 1 : this.currentIndex - 1
                this.setCurrentIndex(index)
            },
            nextSong() {
                if (!this.songReadyState) {
                    return
                }
                let index = this.currentIndex + 1 ===  this.playlist.length ? 0 : this.currentIndex + 1
                this.setCurrentIndex(index)
            },
            endSong() {
                this.nextSong()
            },
            openNormalPlayer() {
                this.setFullScreen(true)
            },
            togglePlay() {
                if (!this.songReadyState) {
                    return
                }
                let audio = this.$refs.audio

                this.setPlayingState(!this.playing)
            },
            pregressBarChange(percent) {
                const currentTime = this.currentSong.duration * percent
                this.$refs.audio.currentTime = currentTime

                if (!this.playing) {
                    this.togglePlay()
                }
            },
            ...mapMutations({
                setFullScreen: 'SET_FULL_SCREEN',
                setCurrentIndex: 'SET_CURRENT_INDEX',
                setPlayingState: 'SET_PLAYING_STATE',
            })
        },
        watch: {
            currentSong(newSong, oldSong) {
                if (!newSong.id) {
                    return
                }
                clearTimeout(this.timer)
                this.timer = setTimeout(() => {
                    this.$refs.audio.play()
                }, 1000)
            },
            playing(newPlaying) {
              let audio = this.$refs.audio
              if (newPlaying) {
                  audio.play()
              } else {
                  audio.pause()
              }
          }
        },
        components: {
            ProgressBar,
            ProgressCircle,
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"
    @import "~common/stylus/mixin"
    @keyframes rotate
        0%
            transform: rotate(0)
        100%
            transform: rotate(360deg)
    .player
        .normal-player
            position: fixed
            left: 0
            right: 0
            top: 0
            bottom: 0
            z-index: 150
            background: $color-background
            .background
                position: absolute
                width: 100%
                height: 100%
                z-index: -1
                opacity: 0.6
                filter: blur(20px)
            .top
                position: relative
                margin-bottom: 25px
                .back
                    position: absolute
                    top: 0
                    left: 6px
                    z-index: 50
                    .icon-back
                        display: block
                        padding: 9px
                        font-size: $font-size-large-x
                        color: $color-theme
                        transform: rotate(-90deg)
                .title
                    width: 70%
                    margin: 0 auto
                    line-height: 40px
                    text-align: center
                    no-wrap()
                    font-size: $font-size-large
                    color: $color-text
                .subtitle
                    line-height: 20px
                    text-align: center
                    font-size: $font-size-medium
                    color: $color-text
            .middle
                position: fixed
                width: 100%
                top: 80px
                bottom: 170px
                white-space: nowrap
                font-size: 0
                .middle-l
                    position: fixed
                    height: 0
                    padding-top: 80%
                    width: 100%
                    .cd-wrapper
                        position: absolute
                        left: 10%
                        top: 0
                        width: 80%
                        height: 100%
                        .cd
                            width: 100%
                            height: 100%
                            box-sizing: border-box
                            border: 10px solid rgba(255,255,255,0.1)
                            border-radius: 50%
                            &.play
                                animation: rotate 20s linear infinite
                            &.pause
                                animation-play-state: paused
                            .image
                                position: absolute
                                left: 0
                                top: 0
                                width: 100%
                                height: 100%
                                border-radius: 50%
            .bottom
                position: absolute
                bottom: 50px
                width: 100%
                .progress-wrapper
                    display: flex
                    align-items: center
                    width: 80%
                    margin: 0 auto
                    padding: 10px 0
                    .time
                        color: $color-text
                        font-size: $font-size-small
                        flex: 0 0 30px
                        width: 30px
                        &.time-l
                            text-align: left
                        &.time-r
                            text-align: right
                     .progress-bar-wrapper
                        width: 80%
                        flex: 1
                .operators
                    display: flex
                    align-items: center
                    .icon
                        flex: 1
                        color: $color-theme
                        &.disable
                            color: $color-theme-d
                        i
                            font-size: 30px
                        &.i-left
                            text-align: right
                        &.i-center
                            padding: 0 20px
                            text-align: center
                            i
                                font-size: 40px
                        &.i-right
                            text-align: left
                        .icon-favorite
                            color:$color-sub-theme
        .mini-enter-active,.mini-leave-active
            transition: all 0.4s
        .mini-enter,.mini-leave
            opacity: 0
            transform: translateY(80px)
        .mini-player
            display: flex
            align-items: center
            position: fixed
            left: 0
            bottom: 0
            z-index: 180
            width: 100%
            background: $color-highlight-background
            .icon
                flex: 0 0 40px
                width: 40px
                padding: 0 10px 0 20px
                img
                    border-radius: 50%
                &.play
                    animation: rotate 10s linear infinite
                &.pause
                    animation-play-state: paused
            .text
                display: flex
                flex-direction: column
                justify-content: center
                flex: 1
                line-height: 20px
                overflow: hidden
                .name
                    margin-bottom: 2px
                    no-wrap()
                    font-size: $font-size-medium
                    color: $color-text
                .desc
                    font-size: $font-size-small
                    color: $color-text-d
            .control
                flex: 0 0 30px
                width: 30px
                padding: 0 10px
                .icon-mini
                    font-size: 32px
                    position: absolute
                    left: 0
                    top: 0
                .icon-play-mini,.icon-pause-mini
                    font-size: 30px
                    color: $color-theme-d

</style>
