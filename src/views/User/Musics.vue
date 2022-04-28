<template lang="pug">
  div
    .d-block(v-if="$vuetify.breakpoint.lgAndDown")
      MusicSummaries(:userMusics="userMusics", :r="r", key="music-summaries")
      .py-2

      v-tabs(v-model="tab", fixed-tabs)
        v-tab(style="min-width: 40px") best 39
        v-tab(style="min-width: 40px") details

      v-tabs-items(touchless, v-model="tab")
        v-tab-item: MusicBest39(:best39="best39", key="music-best-39")
        v-tab-item: MusicDetails(:userMusics="userMusics", key="music-details")
    
    .d-flex(v-if="$vuetify.breakpoint.xl")
      .split(style="width: calc(50% - 0.5px)")
        .py-2
        v-list-item(dense)
          v-list-item-title Musics
        MusicSummaries(:userMusics="userMusics", :r="r" key="music-summaries")
        .py-2
        v-list-item(dense)
          v-list-item-title Best 39
        MusicBest39(:best39="best39", key="music-best-39")
        .py-2
      
      v-divider(vertical)

      .split(style="width: calc(50% - 0.5px)")
        .py-2
        v-list-item(dense)
          v-list-item-title Music Details
        MusicDetails(:userMusics="userMusics", key="music-details")

</template>

<script>
import Divider from '@/components/Divider';

import MusicSummaries from './MusicSummaries';
import MusicBest39 from './MusicBest39';
import MusicDetails from './MusicDetails';

export default {
  name: 'Musics',

  props: ['profile'],

  components: { Divider, MusicSummaries, MusicBest39, MusicDetails },

  data() {
    return {
      tab: 0
    };
  },

  computed: {
    difficulties: () => ['easy', 'normal', 'hard', 'expert', 'master'],

    userMusics() {
      let userMusics = {};
      for (let music of this.profile.userMusics.slice()) {
        userMusics[music.musicId] = music;
      }
      for (let music of Object.values(this.$db.musics)) {
        if (!userMusics[music.id]) {
          userMusics[music.id] = {
            musicId: music.id,
            userMusicDifficultyStatuses: this.difficulties.map(musicDifficulty => ({
              musicId: music.id,
              musicDifficulty: musicDifficulty,
              musicDifficultyStatus: 'forbidden',
              userMusicResults: [],
            })),
          };
        }
      }
      for (let musicResult of this.profile.userMusicResults) {
        userMusics[musicResult.musicId].userMusicDifficultyStatuses.find(status => status.musicDifficulty == musicResult.musicDifficulty).userMusicResults.push(musicResult);
      }
      for (let music of Object.values(userMusics)) {
        for (let status of music.userMusicDifficultyStatuses) {
          let musicDifficulty = this.$db.musicDifficulties[music.musicId][status.musicDifficulty];
          status.rank = status.userMusicResults.map(result => ({
            'full_perfect': 'P',
            'full_combo': 'F',
            'clear': 'C',
          }[result.playResult])).reduce((x, y) => x > y ? x : y, '');
          status.r = {
            'P': 8.0 * (musicDifficulty.playLevel + (musicDifficulty.fullPerfectAdjust || 0)),
            'F': 7.0 * (musicDifficulty.playLevel + (musicDifficulty.fullComboAdjust || 0)),
            'C': 5.0 * (musicDifficulty.playLevel + (musicDifficulty.playLevelAdjust || 0)),
            '': 0.0
          }[status.rank] || 0.0;
        }
      }
      return Object.values(userMusics).filter(music => this.$db.musics[music.musicId].publishedAt < new Date());
    },

    best39() {
      let statuses = [];
      for (let music of this.userMusics) {
        for (let status of music.userMusicDifficultyStatuses) {
          statuses.push(status);
        }
      }
      statuses = statuses.filter(a => a.r).sort((a, b) => b.r - a.r).slice(0, 39);
      return statuses;
    },

    r() {
      return this.best39.map(status => Math.round(status.r)).reduce((x, y) => x + y, 0);
    },
  }
};
</script>