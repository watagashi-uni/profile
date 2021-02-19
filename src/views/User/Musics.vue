<template lang="pug">
  div
    v-list.py-0(dense)
      Divider
      div(ref="summary", style="height: 270px")
      //- TODO: tabs update error; resize bonding; legend
      v-select.px-4(dense, v-model="showRank", :items="showRanks")
      Divider
    
    .py-2
    v-list-item(dense)
      v-list-item-title Details

    v-list.py-0(dense)
      Divider
      template(v-for="music, i in sortedMusics")
        Divider(inset=16, v-if="i")
        v-list-item(:key="`musics-${music.musicId}`")
          v-list-item-avatar(tile)
            v-img(:src="`${$assets()}/music/jacket/${$root.musics[music.musicId].assetbundleName}_rip/${$root.musics[music.musicId].assetbundleName}.png`")
          v-list-item-content
            v-list-item-title {{$root.musics[music.musicId].title}}
            v-list-item-subtitle.d-flex
              MusicDifficultyStatus.pr-2(v-for="status in music.userMusicDifficultyStatuses", :key="`musics-difficulties-${status.musicDifficulty}`", :status="status", style="width: 20%")
      Divider
</template>

<script>
import * as echarts from 'echarts';

import Divider from '@/components/Divider';
import MusicDifficultyStatus from './MusicDifficultyStatus';

export default {
  name: 'Music',

  props: ['profile'],

  components: { Divider, MusicDifficultyStatus },

  data() {
    return {
      chart: null,
      showRank: 'Unlocked',
      showRanks: [
        { text: 'Show as bars', value: 'bar' },
        { text: 'Show all musics', value: 'All' },
        { text: 'Show unlocked musics', value: 'Unlocked' },
        { text: 'Show cleared musics', value: 'Clear' },
      ],
    };
  },

  computed: {
    sortedMusics() {
      return this.profile.userMusics;
    },
    summary() {
      let result = {
        'All': new Array(50).fill(0),
        'Unlocked': new Array(50).fill(0),
        'Clear': new Array(50).fill(0),
        'Full Combo': new Array(50).fill(0),
        'Full Perfect': new Array(50).fill(0),
      };
      for (let music of this.profile.userMusics) {
        for (let status of music.userMusicDifficultyStatuses) {
          let level = this.$root.musicDifficulties[music.musicId][status.musicDifficulty].playLevel;
          let rank = status.userMusicResults.map(result => ({
            'full_perfect': 'Full Perfect',
            'full_combo': 'Full Combo',
            'clear': 'Clear',
          }[result.playResult])).reduce((x, y) => x > y ? x : y, '');

          console.log(music.musicId, status.musicDifficulty, level, rank);

          result['Unlocked'][level] += 1;
          if (rank >= 'Clear') result['Clear'][level] += 1;
          if (rank >= 'Full Combo') result['Full Combo'][level] += 1;
          if (rank >= 'Full Perfect') result['Full Perfect'][level] += 1;
        }
      }
      for (let musicId in this.$root.musicDifficulties) {
        for (let musicDifficulty in this.$root.musicDifficulties[musicId]) {
          let level = this.$root.musicDifficulties[musicId][musicDifficulty].playLevel;
          result['All'][level] += 1;
        }
      }
      return result;
    },
    options() {
      let minLevel = 0, maxLevel = 0;
      for (let musicId in this.$root.musicDifficulties) {
        for (let musicDifficulty in this.$root.musicDifficulties[musicId]) {
          let level = this.$root.musicDifficulties[musicId][musicDifficulty].playLevel;
          if (!minLevel) {
            minLevel = level;
            maxLevel = level;
          } else {
            minLevel = Math.min(minLevel, level);
            maxLevel = Math.max(maxLevel, level);
          }
        }
      }
      console.log(minLevel, maxLevel);
      let levels = [];
      for (let i = minLevel; i <= maxLevel; i++) {
        levels.push(i);
      }

      return {
        grid: { 'top': 32, 'bottom': 32, 'left': 32, 'right': 32 },
        xAxis: {
          data: levels,
          axisTick: { alignWithLabel: true },
        },
        yAxis: {},
        series: [
          { name: 'All', color: '#333333' },
          { name: 'Unlocked', color: '#666666' },
          { name: 'Clear', color: '#FFB74D' },
          { name: 'Full Combo', color: '#F06292' },
          { name: 'Full Perfect', color: '#FFFFFF' },
        ].map(rank => ({
          name: rank.name,
          type: this.showRank == 'bar' ? 'bar' : 'line',
          barGap: '-100%',
          symbol: 'none',
          connectNulls: true,
          color: rank.color,
          areaStyle: { normal: { color: rank.color } },
          data: levels.map(i => this.showRank == 'bar' ?
            this.summary[rank.name][i] :
            Math.min(1, this.summary[rank.name][i] / this.summary[this.showRank][i])
          ),
        })),
      };
    },
  },

  methods: {
    draw() {
      if (!this.chart) {
        this.chart = echarts.init(this.$refs.summary);
      }
      this.chart.setOption(this.options);
      this.chart.resize();
      window.onresize = this.chart.resize;
    }
  },
  mounted() {
    this.$nextTick(function () {
      this.draw();
    });
  },
  watch: {
    options() {
      this.draw();
    }
  }
};
</script>