<template lang="pug">
  div
    v-list.py-0(dense)
      Divider
      .py-2
      v-select.px-4(dense, v-model="genre", :items="genres", :menu-props="{maxHeight: 512}")
      Divider

    .py-2

    v-list.py-0(dense)
      Divider
      v-list-item
        v-menu(offset-y)
          template(v-slot:activator="{on, attrs}")
            .d-flex.mr-4.text-center(v-ripple, v-on="on", v-bind="attrs", style="height: 40px")
              .ma-auto(style="width: 40px")
                v-list-item-subtitle(v-if="sorts[sortID].byDifficulty") {{sorts[sortID].name}}
                v-icon(v-else) mdi-menu-{{sortOrder > 0 ? 'up' : 'down'}}
          v-card.d-flex(elevation=24)
            v-list.py-0(dense)
              v-list-item
                v-list-item-subtitle Sort by music
              Divider
              template(v-for="sort, i in Object.values(sorts).filter(sort => !sort.byDifficulty)")
                Divider(inset=48, v-if="i")
                v-tooltip(left, :disabled="!sort.hint")
                  template(v-slot:activator="{on, attrs}")
                    v-list-item(:key="`sort-${sort.id}`", @click="sortByID(sort.id)", v-bind="attrs", v-on="on")
                      v-icon.pr-2 mdi-menu-{{(sortID == sort.id ? -sortOrder : sort.sortOrder) > 0 ? 'up' : 'down'}}
                      v-list-item-title {{sort.name}}
                  span(v-html="sort.hint")
              Divider

            v-divider(vertical)

            v-list.py-0(dense)
              v-list-item
                v-list-item-subtitle Sort by score
              Divider
              template(v-for="sort, i in Object.values(sorts).filter(sort => sort.byDifficulty)")
                Divider(inset=48, v-if="i")
                v-tooltip(right, :disabled="!sort.hint")
                  template(v-slot:activator="{on, attrs}")
                    v-list-item(:key="`sort-${sort.id}`", @click="sortByID(sort.id)", v-bind="attrs", v-on="on")
                      v-icon.pr-2 mdi-menu-{{(sortID == sort.id ? -sortOrder : sort.sortOrder) > 0 ? 'up' : 'down'}}
                      v-list-item-title {{sort.name}}
                  span(v-html="sort.hint")
              Divider

        div(style="width: 100%")
          .d-flex(style="height: 40px; position: absolute;")
            v-list-item-subtitle.my-auto
              span(v-if="!sorts[sortID].byDifficulty") {{sorts[sortID].name}}
          .d-flex
            template(v-for="difficulty, i in difficulties")
              .pr-2(v-if="i")
              .d-flex.text-center(v-ripple, @click="sortByDifficulty(difficulty)", style="height: 40px; width: calc(20% - 3.2px); z-index: 1")
                .ma-auto(v-if="sorts[sortID].byDifficulty")
                  v-icon(v-if="difficulty == sortDifficulty") mdi-menu-{{sortOrder > 0 ? 'up' : 'down'}}

      Divider

      template(v-for="music, i in sortedMusics")
        Divider(inset=72, v-if="i")

        v-list-item(:key="`musics-${music.musicId}`", @click="detailID = detailID == music.musicId ? -1 : music.musicId")
          v-list-item-avatar(tile)
            v-img(:src="`${$sekai.assetHost}/music/jacket/${$db.musics[music.musicId].assetbundleName}/${$db.musics[music.musicId].assetbundleName}.png`")
          v-list-item-content
            v-list-item-title.d-flex
              v-list-item-subtitle.pr-1(style="flex: 0 1 auto", v-if="detailID == music.musicId || sortID == 'id'") ID {{music.musicId}}
              span {{$db.musics[music.musicId].title}}
            v-list-item-subtitle.d-flex
              template(v-for="status, i in music.userMusicDifficultyStatuses")
                .pr-2(v-if="i")
                MusicDifficultyStatus(:key="`musics-difficulties-${status.musicDifficulty}`", :status="status", style="width: calc(20% - 3.2px)")

        v-lazy(min-height=40): div
          v-expand-transition
            div(v-show="sortID == 'rank'")
              v-list-item
                .mr-4
                  v-list-item-subtitle.d-flex(style="height: 40px; width: 40px")
                    .cell.my-auto R
                v-list-item-content
                  v-list-item-subtitle.d-flex
                    template(v-for="status, i in music.userMusicDifficultyStatuses")
                      .pr-2(v-if="i")
                      .cell.score(style="width: calc(20% - 3.2px)")
                        | {{Math.round(status.r)}}

          v-expand-transition
            div(v-show="detailID == music.musicId || !sorts[sortID].byDifficulty")
              .d-flex
                v-list-item
                  .mr-4
                    v-list-item-subtitle.d-flex(style="height: 40px; width: 40px")
                      //- .cell.score Info
                  v-list-item-content
                    v-list-item-subtitle.d-flex
                      .cell.score {{new Date($db.musics[music.musicId].publishedAt).toLocaleDateString()}}
                      .cell.score
                        template(v-if="$db.musics[music.musicId].hotAdjust")
                          template(v-if="$db.musics[music.musicId].hotAdjust>=2.0")
                            v-icon(color="red") mdi-fire
                            v-icon(color="red") mdi-fire
                            v-icon(color="red") mdi-fire
                          template(v-else-if="$db.musics[music.musicId].hotAdjust>=1.0")
                            v-icon(color="red") mdi-fire
                            v-icon(color="red") mdi-fire
                          template(v-else-if="$db.musics[music.musicId].hotAdjust>=0.5")
                            v-icon(color="red") mdi-fire
                          template(v-else-if="$db.musics[music.musicId].hotAdjust>=0.0")
                            v-icon mdi-signal-cellular-3
                          template(v-else-if="$db.musics[music.musicId].hotAdjust>=-1.0")
                            v-icon mdi-signal-cellular-2
                          template(v-else-if="$db.musics[music.musicId].hotAdjust>=-2.0")
                            v-icon mdi-signal-cellular-1
                          template(v-else)
                            v-icon mdi-signal-cellular-outline
                          span.ml-1 {{$db.musics[music.musicId].hot.toFixed(0)}}
                        template(v-else)
                          v-icon mdi-new-box
                      .cell.score BPM {{($db.musics[music.musicId].bpms||[]).length>2?'~':''}}{{$db.musics[music.musicId].bpm}}

          Divider(v-show="detailID == music.musicId", inset=72)

          v-expand-transition
            div(v-show="detailID == music.musicId || sortID == 'level' || sortID == 'levelAdjust'")
              v-list-item
                .mr-4
                  v-list-item-subtitle.d-flex(style="height: 40px; width: 40px")
                    .cell.my-auto Level+
                v-list-item-content
                  v-list-item-subtitle.d-flex
                    template(v-for="status, i in music.userMusicDifficultyStatuses")
                      .pr-2(v-if="i")
                      .cell.score(style="width: calc(20% - 3.2px)")
                        template(v-if="$db.musicDifficulties[status.musicId][status.musicDifficulty].playLevelAdjust")
                          span {{($db.musicDifficulties[status.musicId][status.musicDifficulty].playLevel+$db.musicDifficulties[status.musicId][status.musicDifficulty].playLevelAdjust).toFixed(1)}}
                        template(v-else)
                          span {{$db.musicDifficulties[status.musicId][status.musicDifficulty].playLevel}}?

          v-expand-transition
            div(v-show="detailID == music.musicId || sortID == 'f'")
              v-list-item
                .mr-4
                  v-list-item-subtitle.d-flex(style="height: 40px; width: 40px")
                    .cell.my-auto F %
                v-list-item-content
                  v-list-item-subtitle.d-flex
                    template(v-for="status, i in music.userMusicDifficultyStatuses")
                      .pr-2(v-if="i")
                      .cell.score(style="width: calc(20% - 3.2px)")
                        template(v-if="$db.musicDifficulties[status.musicId][status.musicDifficulty].fullComboRate")
                          span {{($db.musicDifficulties[status.musicId][status.musicDifficulty].fullComboRate*100).toFixed(1)}}%
                        template(v-else)
                          span N/A

          v-expand-transition
            div(v-show="detailID == music.musicId || sortID == 'p'")
              v-list-item
                .mr-4
                  v-list-item-subtitle.d-flex(style="height: 40px; width: 40px")
                    .cell.my-auto P %
                v-list-item-content
                  v-list-item-subtitle.d-flex
                    template(v-for="status, i in music.userMusicDifficultyStatuses")
                      .pr-2(v-if="i")
                      .cell.score(style="width: calc(20% - 3.2px)")
                        template(v-if="$db.musicDifficulties[status.musicId][status.musicDifficulty].fullPerfectRate")
                          span {{($db.musicDifficulties[status.musicId][status.musicDifficulty].fullPerfectRate*100).toFixed(1)}}%
                        template(v-else)
                          span N/A

          v-expand-transition
            div(v-show="detailID == music.musicId || sortID == 'notes'")
              v-list-item
                .mr-4
                  v-list-item-subtitle.d-flex(style="height: 40px; width: 40px")
                    .cell.my-auto Notes
                v-list-item-content
                  v-list-item-subtitle.d-flex
                    template(v-for="status, i in music.userMusicDifficultyStatuses")
                      .pr-2(v-if="i")
                      .cell.score(style="width: calc(20% - 3.2px)")
                        | {{$db.musicDifficulties[status.musicId][status.musicDifficulty].noteCount}}

          v-expand-transition
            div(v-show="detailID == music.musicId")
              v-list-item
                .mr-4
                  v-list-item-subtitle.d-flex(style="height: 40px; width: 40px")
                    .cell.my-auto View
                v-list-item-content
                  v-list-item-subtitle.d-flex
                    template(v-for="status, i in music.userMusicDifficultyStatuses")
                      .pr-2(v-if="i")
                      .cell.score(style="width: calc(20% - 3.2px)")
                        meta()
                        v-btn(small, icon, :href="`https://sekai-music-charts-1258184166.file.myqcloud.com/${('0000'+music.musicId).slice(-4)}/${status.musicDifficulty}.svg`", target="_blank", rel="noopener noreferrer")
                          v-icon mdi-open-in-new

          v-expand-transition
            div(v-show="detailID == music.musicId")
              Divider(inset=72)

              v-list-item
                .mr-4
                  v-list-item-subtitle.d-flex(style="height: 40px; width: 40px")
                    .cell.my-auto Score
                v-list-item-content
                  v-list-item-subtitle.d-flex
                    template(v-for="status, i in music.userMusicDifficultyStatuses")
                      .pr-2(v-if="i")
                      .cell.score(style="width: calc(20% - 3.2px)")
                        | {{status.userMusicResults.map(result => result.highScore).reduce((x, y) => x > y ? x : y, 0)}}

              v-list-item
                .mr-4
                  v-list-item-subtitle.d-flex(style="height: 40px; width: 40px")
                    .cell.my-auto MVP<br>SS
                v-list-item-content
                  v-list-item-subtitle.d-flex
                    template(v-for="status, i in music.userMusicDifficultyStatuses")
                      .pr-2(v-if="i")
                      .cell.score(style="width: calc(20% - 3.2px)")
                        | {{status.userMusicResults.map(result => result.mvpCount).reduce((x, y) => x + y, 0)}}
                        | / 
                        | {{status.userMusicResults.map(result => result.superStarCount).reduce((x, y) => x + y, 0)}}

              v-list-item
                .mr-4
                  v-list-item-subtitle.d-flex(style="height: 40px; width: 40px")
                    .cell.my-auto First<br>Play
                v-list-item-content
                  v-list-item-subtitle.d-flex
                    template(v-for="status, i in music.userMusicDifficultyStatuses")
                      .pr-2(v-if="i")
                      .cell.score(style="width: calc(20% - 3.2px)")
                        span(v-if="status.userMusicResults.length")
                          | {{new Date(status.userMusicResults.map(result => result.createdAt).reduce((x, y) => x < y ? x : y, Infinity)).format(`'YY/M/D`)}}
                          br
                          | {{new Date(status.userMusicResults.map(result => result.createdAt).reduce((x, y) => x < y ? x : y, Infinity)).format(`H:mm:ss`)}}
                        span(v-else) -

              v-list-item
                .mr-4
                  v-list-item-subtitle.d-flex(style="height: 40px; width: 40px")
                    .cell.my-auto Last<br>Play
                v-list-item-content
                  v-list-item-subtitle.d-flex
                    template(v-for="status, i in music.userMusicDifficultyStatuses")
                      .pr-2(v-if="i")
                      .cell.score(style="width: calc(20% - 3.2px)")
                        span(v-if="status.userMusicResults.length")
                          | {{new Date(status.userMusicResults.map(result => result.updatedAt).reduce((x, y) => x > y ? x : y, 0)).format(`'YY/M/D`)}}
                          br
                          | {{new Date(status.userMusicResults.map(result => result.updatedAt).reduce((x, y) => x > y ? x : y, 0)).format(`H:mm:ss`)}}
                        span(v-else) -

      Divider

</template>

<script>
import Divider from '@/components/Divider';

import MusicDifficultyStatus from './MusicDifficultyStatus';

export default {
  name: 'MusicDetails',

  props: ['userMusics'],

  components: { Divider, MusicDifficultyStatus },

  data() {
    return {
      genre: 'all',

      sortID: 'default',
      sortDifficulty: 'master',
      sortOrder: 1,

      detailID: -1,
    };
  },

  computed: {
    ranks: () => [
      { name: 'All', color: '#333333', hint: 'All' },
      { name: 'Unlocked', color: '#666666', hint: 'Unlocked' },
      { name: 'C', color: '#FFB74D', hint: 'Clear' },
      { name: 'F', color: '#F06292', hint: 'Full Combo' },
      { name: 'P', color: '#FFFFFF', hint: 'All Perfect' },
    ],
    genres() {
      return [
        { text: 'All', value: 'all' },
        { text: 'バーチャル・シンガー', value: 'vocaloid' },
        { text: 'Leo/need', value: 'light_music_club' },
        { text: 'MORE MORE JUMP！', value: 'idol' },
        { text: 'Vivid BAD SQUAD', value: 'street' },
        { text: 'ワンダーランズ×ショウタイム', value: 'theme_park' },
        { text: '25時、ナイトコードで。', value: 'school_refusal' },
        { text: 'Others', value: 'other' },
      ];
    },
    difficulties: () => ['easy', 'normal', 'hard', 'expert', 'master'],
    sorts() {
      return {
        default: {
          id: 'default',
          name: 'Default',
          byDifficulty: false,
          sortOrder: 1,
          sortFunctions: [this.sortFunctions.default],
        },
        id: {
          id: 'id',
          name: 'ID',
          byDifficulty: false,
          sortOrder: 1,
          sortFunctions: [this.sortFunctions.id],
        },
        name: {
          id: 'name',
          name: 'Name',
          byDifficulty: false,
          sortOrder: 1,
          sortFunctions: [this.sortFunctions.name],
        },
        releaseTime: {
          id: 'releaseTime',
          name: 'Release time',
          byDifficulty: false,
          sortOrder: -1,
          sortFunctions: [this.sortFunctions.releaseTime, this.sortFunctions.default],
        },
        hot: {
          id: 'hot',
          name: 'Hot',
          byDifficulty: false,
          sortOrder: -1,
          sortFunctions: [this.sortFunctions.hot, this.sortFunctions.default],
        },
        level: {
          id: 'level',
          name: 'Level',
          byDifficulty: true,
          sortOrder: 1,
          sortFunctions: [this.sortFunctions.level, this.sortFunctions.levelAdjust],
        },
        levelAdjust: {
          id: 'levelAdjust',
          name: 'Level+',
          hint: 'Estimated based on F % and P %. Influences <br>of play count and release time are reduced. <br>+ / - : 0.5 ~ 1.5 level bias. <br>++ / -- : > 1.5 level bias. <br>Data updated per event. ',
          byDifficulty: true,
          sortOrder: 1,
          sortFunctions: [this.sortFunctions.levelAdjust],
        },
        f: {
          id: 'f',
          name: 'F %',
          hint: 'F % = Full Combo count / Clear count. <br>Data updated per event. ',
          byDifficulty: true,
          sortOrder: -1,
          sortFunctions: [this.sortFunctions.f],
        },
        p: {
          id: 'p',
          name: 'P %',
          hint: 'P % = All Perfect count / Clear count. <br>Data updated per event. ',
          byDifficulty: true,
          sortOrder: -1,
          sortFunctions: [this.sortFunctions.p],
        },
        rank: {
          id: 'rank',
          name: 'Rank',
          byDifficulty: true,
          sortOrder: -1,
          sortFunctions: [this.sortFunctions.rank, this.sortFunctions.level, this.sortFunctions.levelAdjust],
        },
        notes: {
          id: 'notes',
          name: 'Notes',
          byDifficulty: true,
          sortOrder: -1,
          sortFunctions: [this.sortFunctions.notes, this.sortFunctions.level, this.sortFunctions.levelAdjust],
        },
        bpm: {
          id: 'bpm',
          name: 'BPM',
          byDifficulty: false,
          sortOrder: -1,
          sortFunctions: [this.sortFunctions.bpm, this.sortFunctions.default],
        }
      };
    },
    sortFunctions() {
      return {
        default: music => this.$db.musics[music.musicId].seq,
        id: music => music.musicId,
        name: music => this.$db.musics[music.musicId].title.toLowerCase(),
        releaseTime: music => this.$db.musics[music.musicId].publishedAt,
        hot: music => this.$db.musics[music.musicId].hotAdjust || 0,
        bpm: music => this.$db.musics[music.musicId].bpm || 0,
        level: music => this.$db.musicDifficulties[music.musicId][this.sortDifficulty].playLevel,
        levelAdjust: music => this.$db.musicDifficulties[music.musicId][this.sortDifficulty].playLevel + (this.$db.musicDifficulties[music.musicId][this.sortDifficulty].playLevelAdjust || 0),
        f: music => this.$db.musicDifficulties[music.musicId][this.sortDifficulty].fullComboRate || 0,
        p: music => this.$db.musicDifficulties[music.musicId][this.sortDifficulty].fullPerfectRate || 0,
        rank: music => music.userMusicDifficultyStatuses.find(status => status.musicDifficulty == this.sortDifficulty).rank,
        notes: music => this.$db.musicDifficulties[music.musicId][this.sortDifficulty].noteCount,
      };
    },
    sortedMusics() {
      let musics = this.userMusics.slice();

      if (this.genre != 'all') {
        musics = musics.filter(music => this.$db.musics[music['musicId']].genre == this.genre);
      }

      let sortFunctions = this.sorts[this.sortID].sortFunctions;
      musics = musics.sort((a, b) => {
        for (let f of sortFunctions) {
          let fa = f(a);
          let fb = f(b);
          if (fa < fb) return -1 * this.sortOrder;
          if (fa > fb) return 1 * this.sortOrder;
        }
        return 0;
      });

      return musics;
    },
  },

  methods: {
    sortByID(sortID) {
      if (this.sortID == sortID) {
        this.sortOrder = -this.sortOrder;
      } else {
        this.sortID = sortID;
        this.sortOrder = this.sorts[sortID].sortOrder;
      }
    },

    sortByDifficulty(difficulty) {
      if (this.sorts[this.sortID].byDifficulty) {
        if (this.sortDifficulty == difficulty) {
          this.sortOrder = - this.sortOrder;
        } else {
          this.sortDifficulty = difficulty;
        }
      } else {
        this.sortID = 'level';
        this.sortOrder = 1;
        this.sortDifficulty = difficulty;
      }
    },
  },
};
</script>

<style scoped>
.score,
.cell {
  white-space: nowrap;
  text-align: center;
  width: 100%;
  margin-top: auto;
  margin-bottom: auto;
}

.score {
  font-size: 80%;
}
</style>