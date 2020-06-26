<template>
  <div id="app">
    <h2>Is this Love</h2>
    <Karaoke
      :audio-url="isThisLove.audioUrl"
      :subtitle-url="isThisLove.subtitleUrl"
      :images="isThisLove.images"
    />
    <h2>House of the Rising Sun</h2>
    <Karaoke
      :audio-url="houseOfTheRisingSun.audioUrl"
      :subtitle-url="houseOfTheRisingSun.subtitleUrl"
      :images="houseOfTheRisingSun.images"
    />
  </div>
</template>

<script>
import Karaoke from './components/Karaoke'

export default {
  name: 'App',
  components: {
    Karaoke
  },
  data() {
    return {
      isThisLove: {
        images: [
          'https://source.unsplash.com/user/erondu',
          'https://source.unsplash.com/user/polarmermaid',
          'https://source.unsplash.com/user/guillaumeissaly29'
        ],
        audioUrl: 'https://damisgarcia.github.io/vue-karaoke/BOB MARLEY - IS THIS LOVE/BOB MARLEY - IS THIS LOVE.mp3',
        subtitleUrl: 'https://damisgarcia.github.io/vue-karaoke/BOB MARLEY - IS THIS LOVE/BOB MARLEY - IS THIS LOVE.str'
      },
      houseOfTheRisingSun: {
        images: [
          'https://source.unsplash.com/user/ceveoh',
          'https://source.unsplash.com/user/dbc23',
          'https://source.unsplash.com/user/heftiba'
        ],
        audioUrl: 'https://damisgarcia.github.io/vue-karaoke/The Animals House Of The Rising Sun/The Animals House Of The Rising Sun.mp3',
        subtitleUrl: 'https://damisgarcia.github.io/vue-karaoke/The Animals House Of The Rising Sun/The Animals House Of The Rising Sun.str'
      }
    }
  }
}
</script>

<style>
</style>
