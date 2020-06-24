<template>
    <div class="vue-karaoke" @click="toggle">
        <div class="vue-karaoke-loading">
            <div 
                class="vue-karaoke-loading-number" 
                :class="{'is-active': isDelayVisible}"
                :style="{'--position': index}"
                v-for="(number, index) in counters" 
                :key="number"
            >
                {{ number }}
            </div>
        </div>
        <div class="vue-karaoke-line">
            <div class="vue-karaoke-line-text">
                <span v-html="Splitting.html({ content: currentLine && currentLine.text, by: 'chars' })"></span>
            </div>
        </div>
        <div class="vue-karaoke-background">
            <div 
                class="vue-karaoke-background-image"
                :style="{'background-image': `url(${image})`}"
                v-for="(image, index) in images" 
                v-show="index === currentImageIndex"
                :key="image" 
            ></div>
        </div>
        <audio 
            class="hidden"
            controls
            ref="player" 
            type="audio/mp3"  
            :src="audioUrl"
        />
    </div>
</template>

<script>
import moment from 'moment'

import { parseSTRFile } from '../utils/string'
import { getRndInteger } from '../utils/numbers'

export default {
    props: {
        images: {
            type: Array
        },
        delayStart: {
            type: Number,
            default: 3
        },
        audioUrl: null,
        subtitleUrl: null
    },
    data() {
        return {
            subtitles: [],
            currentLine: null,
            currentImageIndex: 0,
            sortImageIntervalId: null,
            isDelayVisible: false
        }
    },
    async mounted() {
        this.bindingsEvents()
        await this.fetchSubtitle()
    },
    computed: {
        player(){
            return this.$refs.player
        },
        splitting(){
            return this.$refs.splitting
        },
        currentImage(){
            return this.images[this.currentImageIndex]
        },
        counters(){
            const numbers = []
            for (let i=this.delayStart; i > 0 ; i--){
                numbers.push(i)
            }
            return numbers
        }
    },
    methods: {
        toggle(){
            this.isDelayVisible = !this.isDelayVisible
            
            if (this.isDelayVisible) {
                return setTimeout(() => this.player.play(), this.delayStart * 1000)
            }

            this.player.pause()
        },
        async fetchSubtitle(){
            const response = await fetch(this.subtitleUrl)
            const text = await response.text()
            this.subtitles = parseSTRFile(text)
        },
        bindingsEvents() {
            this.player.addEventListener('play', this.onPlay)
            this.player.addEventListener('pause', this.onPause)
            this.player.addEventListener('timeupdate', this.onTimeUpdate)
        },
        onTimeUpdate(){
            const nextLine = this.subtitles.find(line => {
                const currentDate = moment('1970 00:00:00')
                
                currentDate.add(this.player.currentTime, 'seconds')

                const startTime = moment(`1970 ${line.startTime}`)
                const endTime = moment(`1970 ${line.endTime}`)

                return currentDate
                    .isBetween(startTime, endTime)
            })

            if (nextLine) {
                this.currentLine = nextLine
            }
        },
        onPlay() {
            this.sortImageIntervalId = setInterval(this.sortImage, 10000)
        },
        onPause(){
            clearInterval(this.sortImageIntervalId)
        },
        sortImage() {
            this.currentImageIndex = getRndInteger(0, this.images.length - 1)
        }
    }
}
</script>

<style lang="scss">
.vue-karaoke {
    position: relative;
    width: 100%;
    min-height: 480px;
    &-loading {
        position: absolute;
        display: flex;
        width: 100%;
        height: 100%;
        align-items: center;
        justify-content: center;
        z-index: 5;
        &-number {
            position: absolute;
            font-size: 52px;
            color: white;
            filter: drop-shadow(1px 1px 6px #000);
            opacity: 0;
            &.is-active {
                animation: fadeInOut 1s calc(var(--position) * 1s) ease-in;
            }
        }
    }
    &-line {
        position: absolute;
        bottom: 48px;
        left: 0;
        right: 0;
        text-align: center;
        z-index: 5;
        &-text {
            font-size: 36px;
            .word .char{
                filter: drop-shadow(1px 1px 6px #000);
                display: inline-block;
                animation: char 120ms calc(var(--char-index) * 120ms) forwards; 
                color: rgb(255, 197, 88);
            }
        }
    }
    &-background{
        position: absolute;
        width: 100%;
        height: 100%;
        &-image {
            background-size: cover;
            background-position: center center;
            width: 100%;
            height: 100%;
        }
    }
    .hidden {
        display: none;
    }
}

@keyframes char {
    0% {
        color: rgb(255, 197, 88);
    }
    100% {
        color: white;
    }    
}

@keyframes fadeInOut {
    0% {
        opacity: 0;
    }
    50% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}
</style>