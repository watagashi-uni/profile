<template lang="pug">
  //- .py-1
  //-   .difficulty(:style="{width: width ? width : undefined}", v-html="k")
  //-   .rank(:style="{width: width ? `calc(100% - ${width})` : undefined}", v-html="v")
  
  div
    .d-flex
      .difficulty(:style="style.difficulty") {{$root.musicDifficulties[status.musicId][status.musicDifficulty].playLevel}}
      .rank(:style="style.rank")
        span(v-if="status.userMusicResults.length == 0") 
        span(v-else) {{rank}}
    .d-flex
      .score(:style="style.score")
        span(v-if="status.userMusicResults.length == 0")
        span(v-else) {{score}}
</template>

<script>

export default {
  name: 'MusicDifficultyStatus',

  props: ['status'],

  computed: {
    rank() {
      return this.status.userMusicResults.map(result => ({
        'full_perfect': 'P',
        'full_combo': 'F',
        'clear': 'C',
      }[result.playResult])).reduce((x, y) => x > y ? x : y, '');
    },
    score() {
      return this.status.userMusicResults.map(result => result.highScore).reduce((x, y) => x > y ? x : y, 0);
    },
    style() {
      return {
        difficulty: {
          'border': `1px solid ${this.color}`,
          'color': '#00000099',
          'background-color': this.color,
          'font-weight': 550,
        },
        rank: {
          'border': `1px solid ${this.rank == 'P' ? '#FFFFFF' : this.rank == 'F' ? '#F06292' : this.color}`,
          'color': this.rank == 'P' ? '#FFFFFF99' : this.rank >= 'F' ? '#00000099' : '#FFFFFF99',
          'background-color': this.rank == 'F' ? '#F06292' : null,
          'background-image': this.rank == 'P' ? 'linear-gradient(#F06292, #64B5F6)' : null,
          'font-weight': this.rank >= 'F' ? 550 : null,
        },
        score: {
          'color': '#FFFFFF66',
        }
      };
    },
    color() {
      return {
        easy: '#81C784',
        normal: '#64B5F6',
        hard: '#FFB74D',
        expert: '#E57373',
        master: '#BA68C8',
      }[this.status.musicDifficulty];
    },
  }
};
</script>

<style lang="scss" scoped>
.difficulty,
.rank,
.score {
  white-space: nowrap;
  text-align: center;
}

.difficulty {
  border-top-left-radius: 16px;
  border-bottom-left-radius: 16px;
  width: 50%;
}

.rank {
  border-top-right-radius: 16px;
  border-bottom-right-radius: 16px;
  width: 50%;
}

.score {
  font-size: 80%;
  width: 100%;
}
</style>