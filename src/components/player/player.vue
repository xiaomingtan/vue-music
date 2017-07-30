<template>
    <div class="player" v-show="playlist.length>0">
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
                <div class="middle"
                     @touchstart.prevent="touchLyricStart"
                     @touchmove.prevent="touchLyricMove"
                     @touchend="touchLyricEnd"
                >
                    <div class="middle-l" ref="middleL">
                        <div class="cd-wrapper" ref="cdWrapper">
                            <div class="cd" :class="cdCls">
                                <img class="image" :src="currentSong.image">
                            </div>
                        </div>
                        <div class="playing-lyric-wrapper">
                            <div class="playing-lyric">{{playingLyric}}</div>
                        </div>
                    </div>
                    <scroll class="middle-r" ref="lyricList" :data="currentLyric && currentLyric.lines">
                        <div class="lyric-wrapper">
                            <div v-if="currentLyric">
                                <p ref="lyricLine"
                                   class="text"
                                   :class="{'current': currentLineNum ===index}"
                                   v-for="(line,index) in currentLyric.lines">{{line.txt}}</p>
                            </div>
                        </div>
                    </scroll>
                </div>
                <div class="bottom">
                    <div class="dot-wrapper">
                        <span class="dot" :class="{active: currentShow === 'cd'}"></span>
                        <span class="dot" :class="{active: currentShow === 'lyric'}"></span>
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
                            <i :class="modeCon" @click="changeMode"></i>
                        </div>
                        <div class="icon i-left" :class="disableCls">
                            <i class="icon-prev" @click="prevSong" ></i>
                        </div>
                        <div class="icon i-center"  :class="disableCls">
                            <i :class="playCon"  @click="togglePlay"></i>
                        </div>
                        <div class="icon i-right"  :class="disableCls">
                            <i class="icon-next"  @click="nextSong"></i>
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
                <div class="control">
                    <i class="icon-playlist"></i>
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
    import {playMode} from '@/common/js/config'
    import {shuffle} from '@/common/js/util'
    import Lyric from 'lyric-parser'
    import scroll from '@/base/scroll/scroll'

    const transform = prefixStyle('transform')
    const transitionDuration = prefixStyle('transitionDuration')
    export default {
        data() {
            return {
                currentTime: 0,
                radius: 32,
                songReadyState: false,
                currentLyric : null,
                currentLineNum: 0,
                currentShow: 'cd',
                playingLyric: ''
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
            modeCon() {
                return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random'
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
                'playlist',
                'mode',
                'sequencelist'
            ])
        },
        created() {
            this.touch = {}
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
                if (this.playlist.length === 1) {
                    this.loop()
                } else {
                    let index = this.currentIndex - 1 === -1 ? this.playlist.length - 1 : this.currentIndex - 1
                    this.setCurrentIndex(index)
                }

            },
            nextSong() {
                if (!this.songReadyState) {
                    return
                }
                if (this.playlist.length === 1) {
                    this.loop()
                } else {
                    let index = this.currentIndex + 1 ===  this.playlist.length ? 0 : this.currentIndex + 1
                    this.setCurrentIndex(index)
                }
            },
            endSong() {
                if (this.mode === playMode.loop) {
                    this.loop()
                } else {
                    this.nextSong()
                }
            },
            loop() {
                this.$refs.audio.currentTime = 0
                this.$refs.audio.play()
                this.setPlayingState(true)
            },
            changeMode() {
                const mode = (this.mode + 1) % 3
                this.setPlayMode(mode)
                let list = null
                if (mode === playMode.random) {
                    list = shuffle(this.sequencelist)
                } else {
                    list = this.sequencelist
                }

                this.resetCurrentIndex(list)
                this.setPlayList(list)
            },
            openNormalPlayer() {
                this.setFullScreen(true)
            },
            togglePlay() {
                if (!this.songReadyState) {
                    return
                }

                this.setPlayingState(!this.playing)

                // 切换歌词定时器状态
                if (this.currentLyric) {
                    this.currentLyric.togglePlay()
                }
            },
            pregressBarChange(percent) {
                const currentTime = this.currentSong.duration * percent
                this.$refs.audio.currentTime = currentTime

                if (!this.playing) {
                    this.togglePlay()
                }

                if (this.currentLyric) {
                    this.currentLyric.seek(currentTime * 1000)
                }

            },
            resetCurrentIndex(list) {
                if (!list) {
                    return
                }
               let currentIndex = 0
               list.forEach((item, index)=>{
                    if (item.id === this.currentSong.id) {
                        currentIndex = index
                        return
                    }
                })

                this.setCurrentIndex(currentIndex)

            },
            // lyric
            getLyric() {
                this.currentSong.getLyric().then((lyric) => {
                    this.currentLyric = new Lyric(lyric, this.handleLyric)
                    if (this.playing) {
                        this.currentLyric.play()
                    }
                }).catch(() => { // 歌词出错时
                    this.currentLyric = null
                    this.playingLyric = ''
                    this.currentLineNum = 0
                })
            },
            handleLyric({lineNum, txt}) {
                this.currentLineNum = lineNum

                if (lineNum > 5) {
                    let lineEl = this.$refs.lyricLine[lineNum - 5]
                    this.$refs.lyricList.scrollToElement(lineEl, 1000)
                } else {
                    this.$refs.lyricList.scrollTo(0,0 ,1000)
                }

                this.playingLyric = txt
            },
            touchLyricStart(e) {
                this.touch.initiated = true
                // 用来判断是否是一次移动
                this.touch.moved = false
                let touch = e.touches[0]
                this.touch.startX = touch.pageX
                this.touch.startY = touch.pageY
            },
            touchLyricMove(e) {
                if (!this.touch.initiated) {
                    return
                }
                let touch = e.touches[0]

                // 纵向滑动比横向滑动幅度大时为无效滑动
                let deltaX = touch.pageX - this.touch.startX
                let deltaY = touch.pageY - this.touch.startY
                if (Math.abs(deltaY) > Math.abs(deltaX)) {
                    return
                }

                if (!this.touch.moved) {
                    this.touch.moved = true
                }

                let left = this.currentShow === 'cd' ? 0 : -window.innerWidth
                let offsetWidth = Math.min(0, Math.max(-window.innerWidth, left + deltaX))
                this.touch.percent = Math.abs( offsetWidth / window.innerWidth)
                this.$refs.lyricList.$el.style[transform] = `translate3d(${offsetWidth}px, 0, 0)`
                this.$refs.lyricList.$el.style[transitionDuration] = 0
                this.$refs.middleL.style.opacity = 1 - this.touch.percent
                this.$refs.middleL.style[transitionDuration] = 0
            },
            touchLyricEnd() {
                // 若不监听此状态会导致无效滚动也会触发此函数
                if (!this.touch.moved) {
                    return
                }
                let translateX
                let opacity
                if (this.currentShow === 'cd') {
                    if (this.touch.percent > 0.1) {
                        translateX = - window.innerWidth
                        opacity = 0
                        this.currentShow = 'lyric'
                    } else {
                        translateX = 0
                        opacity = 1
                    }
                } else {
                    if (this.touch.percent < 0.9) {
                        translateX = 0
                        opacity = 1
                        this.currentShow = 'cd'
                    } else {
                        translateX = -window.innerWidth
                        opacity = 0
                    }
                }
                const time = 300
                this.$refs.lyricList.$el.style[transform] = `translate3d(${translateX}px, 0, 0)`
                this.$refs.lyricList.$el.style[transitionDuration] = time + 'ms'
                this.$refs.middleL.style.opacity = opacity
                this.$refs.middleL.style[transitionDuration] = time + 'ms'

            },
            ...mapMutations({
                setFullScreen: 'SET_FULL_SCREEN',
                setCurrentIndex: 'SET_CURRENT_INDEX',
                setPlayingState: 'SET_PLAYING_STATE',
                setPlayMode: 'SET_PLAY_MODE',
                setPlayList: 'SET_PLAYLIST',
            })
        },
        watch: {
            currentSong(newSong, oldSong) {
                if (newSong.id === oldSong.id) {
                    return
                }
                // 重置歌词定时器
                if (this.currentLyric) {
                    this.currentLyric.stop()
                    this.currentTime = 0
                    this.playingLyric = ''
                    this.currentLineNum = 0
                }

                clearTimeout(this.timer)
                this.timer = setTimeout(() => {
                    this.$refs.audio.play()
                    this.getLyric()
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
            scroll,
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
                    display: inline-block
                    vertical-align: top
                    position: relative
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
                    .playing-lyric-wrapper
                        width: 80%
                        margin: 30px auto 0 auto
                        overflow: hidden
                        text-align: center
                        .playing-lyric
                            height: 20px
                            line-height: 20px
                            font-size: $font-size-medium
                            color: $color-text-l
                .middle-r
                    display: inline-block
                    vertical-align : top
                    width: 100%
                    height : 100%
                    overflow : hidden
                    .lyric-wrapper
                        width :80%
                        margin 0 auto
                        overflow : hidden
                        text-align : center
                        .text
                            line-height: 32px
                            color: $color-text-l
                            font-size: $font-size-medium
                            &.current
                                color: $color-text
            .bottom
                position: absolute
                bottom: 50px
                width: 100%
                .dot-wrapper
                    text-align: center
                    font-size: 0
                .dot
                    display: inline-block
                    vertical-align: middle
                    margin: 0 4px
                    width: 8px
                    height: 8px
                    border-radius: 50%
                    background: $color-text-l
                    &.active
                        width: 20px
                        border-radius: 5px
                        background: $color-text-ll
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
        .normal-enter-active,.normal-leave-active
            transition: all 0.4s
            .top, .bottom
                transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
        .normal-enter,.normal-leave
            opacity: 0
            .top
                transform: translate3d(0, -100px, 0)
            .bottom
                transform: translate3d(0, 100px, 0)
        .mini-enter-active,.mini-leave-active
            transition: all 0.4s
        .mini-enter,.mini-leave
            opacity: 0
            transform: translateY(80px)
        .mini-player
            display: flex
            align-items: center
            position: fixed
            height: 60px
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
                .icon-play-mini,.icon-pause-mini, .icon-playlist
                    font-size: 30px
                    color: $color-theme-d

</style>
