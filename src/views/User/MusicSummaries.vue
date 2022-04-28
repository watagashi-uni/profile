<template lang="pug">
  div
    v-list.py-0(dense)
      Divider
      div(ref="summary", style="height: 270px; width: calc(100% - 1px)")
      v-select.px-4(dense, v-model="showRank", :items="showRanks")
      Divider
    
    .py-2

    v-list.py-0.print(dense, ref="summaryByDifficulty")
      Divider

      v-list-item
        .mr-4
          div(style="height: 40px; width: 40px")
        v-list-item-subtitle
          .d-flex
            template(v-for="difficulty, i in difficulties")
              .pr-2(v-if="i")
              div(style="width: calc(20% - 3.2px)")
                .difficulty(:style="difficultyStyle(difficulty)") {{difficulty}}

      template(v-for="difficulties, rank in summaryByDifficulty")
        Divider(inset=72)
        v-list-item
          .mr-4
            v-list-item-subtitle.d-flex(style="height: 40px; width: 40px")
              .rank.my-auto(:style="rankStyle(rank)") {{rank}}
          v-list-item-subtitle
            .d-flex
              template(v-for="score, difficulty, i in difficulties")
                .pr-2(v-if="i")
                div(style="width: calc(20% - 3.2px)")
                  .cell {{score}}

      Divider(inset=72)

      v-list-item
        .mr-4
          v-list-item-subtitle.d-flex(style="height: 40px; width: 40px")
            .rank.my-auto All
        v-list-item-subtitle
          .cell {{userMusics.length}}
      
      Divider

    .py-2

    v-list.py-0.print(dense, ref="r")
      Divider
      v-list-item
        v-list-item-title R
        v-list-item-action-text {{r}}
      Divider

</template>

<script>
import * as echarts from 'echarts';

import Divider from '@/components/Divider';

export default {
  name: 'MusicSummaries',

  props: ['userMusics', 'r'],

  components: { Divider },

  data() {
    return {
      chart: null,
      showRank: 'All',
    };
  },

  computed: {
    showRanks: () => [
      { text: 'Bars', value: 'bar' },
      { text: 'Default', value: 'All' },
      // { text: 'Show unlocked musics', value: 'Unlocked' },
      // { text: 'Show cleared musics', value: 'C' },
    ],
    ranks: () => [
      { name: 'All', color: '#333333', hint: 'All' },
      { name: 'Unlocked', color: '#666666', hint: 'Unlocked' },
      { name: 'C', color: '#FFB74D', hint: 'Clear' },
      { name: 'F', color: '#F06292', hint: 'Full Combo' },
      { name: 'P', color: '#FFFFFF', hint: 'All Perfect' },
    ],
    difficulties: () => ['easy', 'normal', 'hard', 'expert', 'master'],
    difficultyColors: () => ({
      easy: '#81C784',
      normal: '#64B5F6',
      hard: '#FFB74D',
      expert: '#E57373',
      master: '#BA68C8',
    }),
    summary() {
      let result = {
        'All': new Array(41).fill(0),
        'Unlocked': new Array(41).fill(0),
        'C': new Array(41).fill(0),
        'F': new Array(41).fill(0),
        'P': new Array(41).fill(0),
      };
      for (let music of this.userMusics) {
        for (let status of music.userMusicDifficultyStatuses) {
          let level = this.$db.musicDifficulties[music.musicId][status.musicDifficulty].playLevel;

          if (status.musicDifficultyStatus == 'available') result['Unlocked'][level] += 1;
          if (status.rank >= 'C') result['C'][level] += 1;
          if (status.rank >= 'F') result['F'][level] += 1;
          if (status.rank >= 'P') result['P'][level] += 1;
          result['All'][level] += 1;
        }
      }
      return result;
    },
    summaryByDifficulty() {
      let result = {
        'P': {},
        'F': {},
        'C': {},
      };

      for (let difficulty of this.difficulties) {
        result['P'][difficulty] = 0;
        result['F'][difficulty] = 0;
        result['C'][difficulty] = 0;
      }

      for (let music of this.userMusics) {
        for (let status of music.userMusicDifficultyStatuses) {
          if (status.rank >= 'C') result['C'][status.musicDifficulty] += 1;
          if (status.rank >= 'F') result['F'][status.musicDifficulty] += 1;
          if (status.rank >= 'P') result['P'][status.musicDifficulty] += 1;
        }
      }

      return result;
    },

    options() {
      let minLevel = 0, maxLevel = 0;
      for (let musicId in this.$db.musicDifficulties) {
        for (let musicDifficulty in this.$db.musicDifficulties[musicId]) {
          let level = this.$db.musicDifficulties[musicId][musicDifficulty].playLevel;
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
          type: 'category',
          data: levels,
          axisTick: { alignWithLabel: true },
        },
        yAxis: {
          type: 'value',
          axisLabel: { formatter: x => x.toString().replace(/^0\./, '.') },
          splitLine: {
            lineStyle: {
              color: '#FFFFFF1F',
            },
          }
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
            Math.min(1, this.summary[rank.name][i] / this.summary['All'][i])
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
    },

    difficultyStyle(difficulty) {
      return {
        'border': `1px solid ${this.difficultyColors[difficulty]}`,
        'color': '#00000099',
        'background-color': this.difficultyColors[difficulty],
        'font-weight': 550,
      };
    },

    rankStyle(rank) {
      return {
        'border': `1px solid ${rank == 'P' ? '#FFFFFF' : rank == 'F' ? '#F06292' : '#FFB74D'}`,
        'color': rank == 'P' ? '#FFFFFF' : rank >= 'F' ? '#00000099' : '#FFFFFF99',
        'background-color': rank == 'F' ? '#F06292' : null,
        'background-image': rank == 'P' ? 'linear-gradient(#F06292, #64B5F6)' : null,
        'font-weight': rank >= 'F' ? 550 : null,
      };
    }
  },

  mounted() {
    this.$nextTick(function () {
      this.draw();
    });
    this.$root.$emit('saveComponent', 'summaryByDifficulty', this.$refs.summaryByDifficulty);
    this.$root.$emit('saveComponent', 'r', this.$refs.r);
    this.$root.$emit('saveSummary', this.summary);
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


<style scoped>
.difficulty,
.rank,
.score,
.cell {
  white-space: nowrap;
  text-align: center;
  width: 100%;
  margin-top: auto;
  margin-bottom: auto;
}

.difficulty {
  border-top-left-radius: 16px;
  border-bottom-left-radius: 16px;
  border-top-right-radius: 16px;
  border-bottom-right-radius: 16px;
}

.rank {
  border-top-left-radius: 16px;
  border-bottom-left-radius: 16px;
  border-top-right-radius: 16px;
  border-bottom-right-radius: 16px;
}

.score {
  font-size: 80%;
}
</style>