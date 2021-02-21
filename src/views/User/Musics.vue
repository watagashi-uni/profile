<template lang="pug">
  div
    v-list.py-0(dense)
      Divider
      div(ref="summary", style="height: 270px")
      v-select.px-4(dense, v-model="showRank", :items="showRanks")
      Divider

    .py-2
    .d-flex
      v-list-item(dense)
        v-list-item-title Recent Full Combo
      v-list-item(dense)
        v-list-item-title Recent All Perfect

    .d-flex
      div(style="width: calc(50% - 0.5px)")
        v-list.py-0(dense)
          Divider
          template(v-for="result, i in recent['F'].slice().sort((y, x) => x.createdAt - y.createdAt).slice(0, 5)")
            Divider(inset=16, v-if="i")
            v-list-item(:key="`recent-f-${result.musicId}-${result.musicDifficulty}`")
              v-list-item-avatar(tile)
                v-img(:src="`${$assets()}/music/jacket/${$root.musics[result.musicId].assetbundleName}_rip/${$root.musics[result.musicId].assetbundleName}.png`")
              v-list-item-content
                v-list-item-title {{$root.musics[result.musicId].title}}
                v-list-item-subtitle
                  MusicDifficultyStatus(:score="new Date(result.createdAt).toLocaleDateString()", :status="{ musicId: result.musicId, musicDifficulty: result.musicDifficulty, userMusicResults: [ result ] }", style="width: calc(40% + 11.41px)")
          template(v-if="recent['F'].length == 0")
            v-list-item
              v-list-item-content
                v-list-item-subtitle None
          Divider

      v-divider(vertical)

      div(style="width: calc(50% - 0.5px)")
        v-list.py-0(dense)
          Divider
          template(v-for="result, i in recent['P'].slice().sort((y, x) => x.createdAt - y.createdAt).slice(0, 5)")
            Divider(inset=16, v-if="i")
            v-list-item(:key="`recent-p-${result.musicId}-${result.musicDifficulty}`")
              v-list-item-avatar(tile)
                v-img(:src="`${$assets()}/music/jacket/${$root.musics[result.musicId].assetbundleName}_rip/${$root.musics[result.musicId].assetbundleName}.png`")
              v-list-item-content
                v-list-item-title {{$root.musics[result.musicId].title}}
                v-list-item-subtitle
                  MusicDifficultyStatus(:score="new Date(result.createdAt).toLocaleDateString()", :status="{ musicId: result.musicId, musicDifficulty: result.musicDifficulty, userMusicResults: [ result ] }", style="width: calc(40% + 11.41px)")
          template(v-if="recent['P'].length == 0")
            v-list-item
              v-list-item-content
                v-list-item-subtitle None
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
              template(v-for="status, i in music.userMusicDifficultyStatuses")
                .pr-2(v-if="i")
                MusicDifficultyStatus(:key="`musics-difficulties-${status.musicDifficulty}`", :status="status", style="width: calc(20% - 3.2px)")
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
      showRank: 'All',
      showRanks: [
        { text: 'Show as bars', value: 'bar' },
        { text: 'Show all musics', value: 'All' },
        { text: 'Show unlocked musics', value: 'Unlocked' },
        { text: 'Show cleared musics', value: 'C' },
      ],
      ranks: [
        { name: 'All', color: '#333333', hint: 'All' },
        { name: 'Unlocked', color: '#666666', hint: 'Unlocked' },
        { name: 'C', color: '#FFB74D', hint: 'Clear' },
        { name: 'F', color: '#F06292', hint: 'Full Combo' },
        { name: 'P', color: '#FFFFFF', hint: 'All Perfect' },
      ]
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
        'C': new Array(50).fill(0),
        'F': new Array(50).fill(0),
        'P': new Array(50).fill(0),
      };
      for (let music of this.profile.userMusics) {
        for (let status of music.userMusicDifficultyStatuses) {
          let level = this.$root.musicDifficulties[music.musicId][status.musicDifficulty].playLevel;
          let rank = status.userMusicResults.map(result => ({
            'full_perfect': 'P',
            'full_combo': 'F',
            'clear': 'C',
          }[result.playResult])).reduce((x, y) => x > y ? x : y, '');

          if (status.musicDifficultyStatus == 'available') result['Unlocked'][level] += 1;
          if (rank >= 'C') result['C'][level] += 1;
          if (rank >= 'F') result['F'][level] += 1;
          if (rank >= 'P') result['P'][level] += 1;
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
    recent() {
      let userMusicResults = {
        'C': [],
        'F': [],
        'P': [],
      };
      for (let music of this.profile.userMusics) {
        for (let status of music.userMusicDifficultyStatuses) {
          if (status.userMusicResults.length) {
            let userMusicResult = status.userMusicResults.reduce((x, y) => x.playResult > y.playResult ? x : y);
            let rank = {
              'full_perfect': 'P',
              'full_combo': 'F',
              'clear': 'C',
            }[userMusicResult.playResult];
            userMusicResults[rank].push(userMusicResult);
          }
        }
      }
      return userMusicResults;
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
      let levels = [];
      for (let i = minLevel; i <= maxLevel; i++) {
        levels.push(i);
      }

      return {
        grid: { 'top': 48, 'bottom': 32, 'left': 32, 'right': 32 },
        xAxis: {
          data: levels,
          axisTick: { alignWithLabel: true },
        },
        yAxis: {
          axisLabel: { formatter: x => x.toString().replace(/^0\./, '.') },
        },
        legend: {
          // orient: 'vertical',
          selectedMode: false,
          icon: 'roundRect',
          textStyle: { color: '#FFFFFF' },
          top: 16,
          data: this.ranks.slice(1).map(rank => rank.hint),
          itemWidth: 14,
          itemHeight: 14,
        },
        series: this.ranks.map(rank => ({
          name: rank.hint,
          type: this.showRank == 'bar' ? 'bar' : 'line',
          barGap: '-100%',
          symbol: 'none',
          connectNulls: true,
          color: rank.color,
          areaStyle: { color: rank.color },
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
      window.addEventListener('resize', () => this.chart.resize());
    }
  },
  mounted() {
    this.$nextTick(function () {
      this.draw();
    });
  },
  watch: {
    options() {
      this.$nextTick(function () {
        this.draw();
      });
    }
  }
};
</script>