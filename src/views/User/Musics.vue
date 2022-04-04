<template lang="pug">
  div
    v-list.py-0(dense)
      Divider
      div(ref="summary", style="height: 270px; width: calc(100% - 1px)")
      v-select.px-4(dense, v-model="showRank", :items="showRanks")
      Divider
    
    .py-2

    v-list.py-0(dense)
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
          .cell {{Object.values($db.musics).length}}
      
      Divider

    .py-2

    //- .d-flex
    //-   v-list-item(dense)
    //-     v-list-item-title Recent Full Combo
    //-   v-list-item(dense)
    //-     v-list-item-title Recent All Perfect

    //- .d-flex
    //-   div(style="width: calc(50% - 0.5px)")
    //-     v-list.py-0(dense)
    //-       Divider
    //-       template(v-for="result, i in recent['F'].slice().sort((y, x) => x.createdAt - y.createdAt).slice(0, 5)")
    //-         Divider(inset=72, v-if="i")
    //-         v-list-item(:key="`recent-f-${result.musicId}-${result.musicDifficulty}`")
    //-           v-list-item-avatar(tile)
    //-             v-img(:src="`${$sekai.assetHost}/music/jacket/${$db.musics[result.musicId].assetbundleName}/${$db.musics[result.musicId].assetbundleName}.png`")
    //-           v-list-item-content
    //-             v-list-item-title {{$db.musics[result.musicId].title}}
    //-             v-list-item-subtitle
    //-               MusicDifficultyStatus(:score="new Date(result.createdAt).toLocaleDateString()", :status="{ musicId: result.musicId, musicDifficulty: result.musicDifficulty, userMusicResults: [ result ] }", style="width: calc(40% + 11.41px)")
    //-       template(v-if="recent['F'].length == 0")
    //-         v-list-item
    //-           v-list-item-content
    //-             v-list-item-subtitle None
    //-       Divider

    //-   v-divider(vertical)

    //-   div(style="width: calc(50% - 0.5px)")
    //-     v-list.py-0(dense)
    //-       Divider
    //-       template(v-for="result, i in recent['P'].slice().sort((y, x) => x.createdAt - y.createdAt).slice(0, 5)")
    //-         Divider(inset=72, v-if="i")
    //-         v-list-item(:key="`recent-p-${result.musicId}-${result.musicDifficulty}`")
    //-           v-list-item-avatar(tile)
    //-             v-img(:src="`${$sekai.assetHost}/music/jacket/${$db.musics[result.musicId].assetbundleName}/${$db.musics[result.musicId].assetbundleName}.png`")
    //-           v-list-item-content
    //-             v-list-item-title {{$db.musics[result.musicId].title}}
    //-             v-list-item-subtitle
    //-               MusicDifficultyStatus(:score="new Date(result.createdAt).toLocaleDateString()", :status="{ musicId: result.musicId, musicDifficulty: result.musicDifficulty, userMusicResults: [ result ] }", style="width: calc(40% + 11.41px)")
    //-       template(v-if="recent['P'].length == 0")
    //-         v-list-item
    //-           v-list-item-content
    //-             v-list-item-subtitle None
    //-       Divider

    //- .py-2

    v-list-item(dense)
      v-list-item-title Details

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
                v-list-item(:key="`sort-${sort.id}`", @click="sortByID(sort.id)")
                  v-icon.pr-2 mdi-menu-{{(sortID == sort.id ? -sortOrder : sort.sortOrder) > 0 ? 'up' : 'down'}}
                  v-list-item-title {{sort.name}}
              Divider
            v-divider(vertical)
            v-list.py-0(dense)
              v-list-item
                v-list-item-subtitle Sort by score
              Divider
              template(v-for="sort, i in Object.values(sorts).filter(sort => sort.byDifficulty)")
                Divider(inset=48, v-if="i")
                v-list-item(:key="`sort-${sort.id}`", @click="sortByID(sort.id)")
                  v-icon.pr-2 mdi-menu-{{(sortID == sort.id ? -sortOrder : sort.sortOrder) > 0 ? 'up' : 'down'}}
                  v-list-item-title {{sort.name}}
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
              v-list-item-subtitle.pr-1(style="flex: 0 1 auto", v-if="sortID == 'id'") {{music.musicId}}
              v-list-item-subtitle.pr-2(style="flex: 0 1 auto", v-if="sortID == 'releaseTime'") {{new Date($db.musics[music.musicId].publishedAt).toLocaleDateString()}}
              span {{$db.musics[music.musicId].title}}
            v-list-item-subtitle.d-flex
              template(v-for="status, i in music.userMusicDifficultyStatuses")
                .pr-2(v-if="i")
                MusicDifficultyStatus(:key="`musics-difficulties-${status.musicDifficulty}`", :status="status", style="width: calc(20% - 3.2px)")

        v-expand-transition
          div(v-show="sortID == 'levelAdjust'")
            v-list-item
              .mr-4
                v-list-item-subtitle.d-flex(style="height: 40px; width: 40px")
                  .cell.my-auto Level<br>adjust
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
          div(v-show="detailID == music.musicId || sortID == 'hot'")
            v-list-item
              .mr-4
                v-list-item-subtitle.d-flex(style="height: 40px; width: 40px")
                  .cell.my-auto Hot
              v-list-item-content
                v-list-item-subtitle.d-flex
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
                    template(v-else)
                      v-icon mdi-new-box

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

        //- v-expand-transition
        //-   div(v-show="detailID == music.musicId")
        //-     v-list-item
        //-       .mr-4
        //-         v-list-item-subtitle.d-flex(style="height: 40px; width: 40px")
        //-           .cell.my-auto Based
        //-       v-list-item-content
        //-         v-list-item-subtitle.d-flex
        //-           template(v-for="status, i in music.userMusicDifficultyStatuses")
        //-             .pr-2(v-if="i")
        //-             .cell.score(style="width: calc(20% - 3.2px)")
        //-               template(v-if="$db.musicDifficulties[status.musicId][status.musicDifficulty].count")
        //-                 span {{$db.musicDifficulties[status.musicId][status.musicDifficulty].count.toFixed(0)}}
        //-               template(v-else)
        //-                 span 0

        v-expand-transition
          div(v-show="detailID == music.musicId")
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
                      v-btn(small, icon, :href="`https://sekai-assets-1258184166.file.myqcloud.com/music/charts/${('0000'+music.musicId).slice(-4)}/${status.musicDifficulty}.svg`", target="_blank", rel="noopener noreferrer")
                        v-icon mdi-open-in-new

        v-expand-transition
          div(v-show="detailID == music.musicId")
            Divider(inset=72)

            v-list-item
              .mr-4
                v-list-item-subtitle.d-flex(style="height: 40px; width: 40px")
                  .cell.my-auto Record
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
import * as echarts from 'echarts';

import Divider from '@/components/Divider';
import MusicDifficultyStatus from './MusicDifficultyStatus';
// import { get } from 'idb-keyval';

export default {
  name: 'Music',

  props: ['profile'],

  components: { Divider, MusicDifficultyStatus },

  data() {
    return {
      chart: null,
      showRank: 'All',
      showRanks: [
        { text: 'Bars', value: 'bar' },
        { text: 'Default', value: 'All' },
        // { text: 'Show unlocked musics', value: 'Unlocked' },
        // { text: 'Show cleared musics', value: 'C' },
      ],
      ranks: [
        { name: 'All', color: '#333333', hint: 'All' },
        { name: 'Unlocked', color: '#666666', hint: 'Unlocked' },
        { name: 'C', color: '#FFB74D', hint: 'Clear' },
        { name: 'F', color: '#F06292', hint: 'Full Combo' },
        { name: 'P', color: '#FFFFFF', hint: 'All Perfect' },
      ],
      sortID: 'default',
      sortDifficulty: 'master',
      sortOrder: 1,

      detailID: -1,
    };
  },

  computed: {
    difficulties: () => ['easy', 'normal', 'hard', 'expert', 'master'],
    difficultyColors: () => ({
      easy: '#81C784',
      normal: '#64B5F6',
      hard: '#FFB74D',
      expert: '#E57373',
      master: '#BA68C8',
    }),
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
          name: 'Level adjust',
          byDifficulty: true,
          sortOrder: 1,
          sortFunctions: [this.sortFunctions.levelAdjust],
        },
        f: {
          id: 'f',
          name: 'F %',
          byDifficulty: true,
          sortOrder: -1,
          sortFunctions: [this.sortFunctions.f],
        },
        p: {
          id: 'p',
          name: 'P %',
          byDifficulty: true,
          sortOrder: -1,
          sortFunctions: [this.sortFunctions.p],
        },
        rank: {
          id: 'rank',
          name: 'Rank',
          byDifficulty: true,
          sortOrder: -1,
          sortFunctions: [this.sortFunctions.rank, this.sortFunctions.level, this.sortFunctions.default],
        },
        notes: {
          id: 'notes',
          name: 'Notes',
          byDifficulty: true,
          sortOrder: -1,
          sortFunctions: [this.sortFunctions.notes, this.sortFunctions.level, this.sortFunctions.default],
        },
        bpm: {
          id: 'bpm',
          name: 'BPM (TODO)',
          byDifficulty: false,
          sortOrder: -1,
          sortFunctions: [this.sortFunctions.default],
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
        level: music => this.$db.musicDifficulties[music.musicId][this.sortDifficulty].playLevel,
        levelAdjust: music => this.$db.musicDifficulties[music.musicId][this.sortDifficulty].playLevel + (this.$db.musicDifficulties[music.musicId][this.sortDifficulty].playLevelAdjust || 0),
        f: music => this.$db.musicDifficulties[music.musicId][this.sortDifficulty].fullComboRate || 0,
        p: music => this.$db.musicDifficulties[music.musicId][this.sortDifficulty].fullPerfectRate || 0,
        rank: music => music.userMusicDifficultyStatuses.find(status => status.musicDifficulty == this.sortDifficulty).userMusicResults.map(result => ({
          'full_perfect': 'P',
          'full_combo': 'F',
          'clear': 'C',
        }[result.playResult])).reduce((x, y) => x > y ? x : y, ''),
        notes: music => this.$db.musicDifficulties[music.musicId][this.sortDifficulty].noteCount,
      };
    },
    userMusics() {
      let userMusics = this.profile.userMusics.slice();
      let userMusicIDs = new Set(userMusics.map(userMusic => userMusic.musicId));
      for (let music of Object.values(this.$db.musics)) {
        if (!userMusicIDs.has(music.id)) {
          userMusics.push({
            musicId: music.id,
            userMusicDifficultyStatuses: ['easy', 'normal', 'hard', 'expert', 'master'].map(musicDifficulty => ({
              musicId: music.id,
              musicDifficulty: musicDifficulty,
              musicDifficultyStatus: 'forbidden',
              userMusicResults: [],
            })),
          });
        }
      }
      return userMusics;
    },
    sortedMusics() {
      let sortFunctions = this.sorts[this.sortID].sortFunctions;
      return this.userMusics.slice().sort((a, b) => {
        for (let f of sortFunctions) {
          let fa = f(a);
          let fb = f(b);
          if (fa < fb) return -1 * this.sortOrder;
          if (fa > fb) return 1 * this.sortOrder;
        }
        return 0;
      });
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
          let level = this.$db.musicDifficulties[music.musicId][status.musicDifficulty].playLevel;
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
      for (let musicId in this.$db.musicDifficulties) {
        for (let musicDifficulty in this.$db.musicDifficulties[musicId]) {
          let level = this.$db.musicDifficulties[musicId][musicDifficulty].playLevel;
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

      for (let music of this.profile.userMusics) {
        for (let status of music.userMusicDifficultyStatuses) {
          let rank = status.userMusicResults.map(result => ({
            'full_perfect': 'P',
            'full_combo': 'F',
            'clear': 'C',
          }[result.playResult])).reduce((x, y) => x > y ? x : y, '');

          if (rank >= 'C') result['C'][status.musicDifficulty] += 1;
          if (rank >= 'F') result['F'][status.musicDifficulty] += 1;
          if (rank >= 'P') result['P'][status.musicDifficulty] += 1;
        }
      }

      return result;
    },
    // recent full combo / all perfect is not computable. 
    //
    // recent() {
    //   let userMusicResults = {
    //     'C': [],
    //     'F': [],
    //     'P': [],
    //   };
    //   for (let music of this.profile.userMusics) {
    //     for (let status of music.userMusicDifficultyStatuses) {
    //       if (status.userMusicResults.length) {
    //         let userMusicResult = status.userMusicResults.reduce((x, y) => x.playResult > y.playResult ? x : y);
    //         let rank = {
    //           'full_perfect': 'P',
    //           'full_combo': 'F',
    //           'clear': 'C',
    //         }[userMusicResult.playResult];
    //         userMusicResults[rank].push(userMusicResult);
    //       }
    //     }
    //   }
    //   return userMusicResults;
    // },
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
    },

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