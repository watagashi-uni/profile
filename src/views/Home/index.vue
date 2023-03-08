<template lang="pug">
  div
    .d-block(v-if="$vuetify.breakpoint.smAndDown")
      .py-2
      Followings(:followings="followings", key="followings")
      .py-2
      v-tabs(v-model="tab1", fixed-tabs)
        v-tab.px-0 Rank Match<br>Tops
        v-tab.px-0 Event<br>Tops
        //- v-tab.px-0 Event<br>Lines
      v-tabs-items(touchless, v-model="tab1")
        v-tab-item
          Rankings(:rankings="rankMatchTops", showRankMatch, key="rank-match-tops")
        v-tab-item
          Rankings(:rankings="eventTops", showEvent, key="event-tops")
        //- v-tab-item
        //-   Rankings(:rankings="eventRankings", showEvent, key="event-rankings")
      .py-2
      v-list-item(dense)
        v-list-item-title About
      About
      .py-2

    .d-flex(v-if="$vuetify.breakpoint.md")
      .split(style="width: calc((100% - 1px) / 2)")
        .py-2
        Followings(:followings="followings", key="followings")
        .py-2
        v-list-item(dense)
          v-list-item-title About
        About
        .py-2
      
      v-divider(vertical)

      .split(style="width: calc((100% - 1px) / 2)")
        .py-1
        v-tabs(v-model="tab1", fixed-tabs)
          v-tab.px-0 Rank Match<br>Tops
          v-tab.px-0 Event<br>Tops
          //- v-tab.px-0 Event<br>Lines
        v-tabs-items(touchless, v-model="tab1")
          v-tab-item
            Rankings(:rankings="rankMatchTops", showRankMatch, key="rank-match-tops")
          v-tab-item
            Rankings(:rankings="eventTops", showEvent, key="event-tops")
          //- v-tab-item
          //-   Rankings(:rankings="eventRankings", showEvent, key="event-rankings")
        .py-2

    .d-flex(v-if="$vuetify.breakpoint.lgAndUp")
      .split(style="width: calc((100% - 2px) / 3)")
        .py-2
        Followings(:followings="followings", key="followings")
        .py-2
        v-list-item(dense)
          v-list-item-title About
        About
        .py-2
      
      v-divider(vertical)

      .split(style="width: calc((100% - 2px) / 3)")
        .py-1
        v-tabs(v-model="tab2", fixed-tabs)
          v-tab.px-0 Event<br>Tops
          //- v-tab.px-0 Event<br>Lines
        v-tabs-items(touchless, v-model="tab2")
          v-tab-item
            Rankings(:rankings="eventTops", showEvent, key="event-tops")
          //- v-tab-item
          //-   Rankings(:rankings="eventRankings", showEvent, key="event-rankings")
        .py-2

      v-divider(vertical)

      //- .split(style="width: calc((100% - 2px) / 3)")
      //-   .py-2
      //-   v-list-item(dense)
      //-     v-list-item-title Rankings 
      //-   Rankings(:rankings="eventRankings", showEvent, key="event-rankings")
      //-   .py-2    

      .split(style="width: calc((100% - 2px) / 3)")
        .py-2
        v-list-item(dense)
          v-list-item-title Rank Match Tops
        Rankings(:rankings="rankMatchTops", showRankMatch, key="rank-match-tops")
        .py-2    

</template>

<script>
import { set, values } from 'idb-keyval';

import sekai from '@/sekai';
import Rankings from './Rankings';
import Followings from './Followings';
import About from './About';

export default {
  name: 'Home',

  components: { Rankings, Followings, About },

  data() {
    return {
      ranks: [
        100, 200, 500,
        1000, 2000, 5000,
        10000, 20000, 50000,
        100000, 200000, 500000,
        1000000, 2000000, 5000000,
      ],

      eventTops: null,
      eventRankings: [],
      followings: [],

      rankMatchTops: null,

      tab1: 0,
      tab2: 0,
    };
  },

  computed: {
    eventID() {
      return Object.values(this.$db.events).reduce((a, b) => {
        if (a.startAt > new Date()) return b;
        if (b.startAt > new Date()) return a;
        if (a.startAt > b.startAt) return a;
        return b;
      }).id;
    },
    rankMatchSeasonID() {
      return Object.values(this.$db.rankMatchSeasons).reduce((a, b) => {
        if (a.startAt > new Date()) return b;
        if (b.startAt > new Date()) return a;
        if (a.startAt > b.startAt) return a;
        return b;
      }).id;
    },
  },

  methods: {
    load() {
      this.eventTops = null;
      this.eventRankings = [];
      this.followings = [];
      this.rankMatchTops = null;

      sekai.api(`/api/user/{user_id}/event/${this.eventID}/ranking?rankingViewType=top100`).then(response => {
        this.eventTops = response.rankings;
      });
      // this.ranks.forEach(rank => {
      //   sekai.api(`/api/user/{user_id}/event/${this.eventID}/ranking?targetRank=${rank}`).then(response => {
      //     let ranking = response.rankings[0];
      //     if (ranking) {
      //       this.eventRankings.push(ranking);
      //       this.eventRankings.sort((a, b) => a.rank - b.rank);
      //     }
      //   });
      // });

      sekai.api(`/api/user/{user_id}/rank-match-season/${this.rankMatchSeasonID}/ranking?rankingViewType=top100`).then(response => {
        this.rankMatchTops = response.rankings;
      });

      let sort = () => {
        this.followings.sort((a, b) => {
          if (a.score === undefined || b.score === undefined) {
            return 0;
          }
          if ((a.score || 0) < (b.score || 0)) {
            return 1;
          }
          if ((a.score || 0) > (b.score || 0)) {
            return -1;
          }
          return 0;
        });
      };

      values().then(users => {
        users.filter(user => user.user && user.userProfile).forEach(user => {
          if (!user.user || !user.userProfile) {
            return;
          }
          if (!user.rank || !user.score) {
            user.rank = 0;
            user.score = 0;
          }
          this.followings.push(user);
          sekai.api(`/api/user/event/${this.eventID}/ranking?targetUserId=${user.userProfile.userId}`).then(response => {
            let ranking = response.rankings[0];
            if (ranking) {
              if (ranking.userId == user.userProfile.userId) {
                Object.keys(ranking).forEach(key => user[key] = ranking[key]);
                set(user.userProfile.userId, user);
              } else {
                user.rank = ranking.rank;
                user.score = ranking.score;
              }
            } else {
              user.rank = 0;
              user.score = 0;
              set(user.userProfile.userId, user);
            }
            sort();
          });
        });
        sort();
        for (let user of this.followings) {
          user.rank = undefined;
          user.score = undefined;
        }
      });
    },
  },

  mounted() {
    this.$nextTick(function () {
      this.load();
    });
  },
};
</script>
