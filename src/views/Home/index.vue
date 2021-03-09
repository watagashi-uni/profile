<template lang="pug">
  div
    .d-block.d-md-none
      .py-2
      v-list-item(dense)
        v-list-item-title Followings 
      Rankings(:rankings="followings")
      .py-2
      v-tabs(v-model="tab1", fixed-tabs)
        v-tab Tops
        v-tab Rankings
      v-tabs-items(v-model="tab1")
        v-tab-item
          Rankings(:rankings="tops")
        v-tab-item
          Rankings(:rankings="rankings")
      v-list-item(dense)
        v-list-item-content
          v-list-item-subtitle The ranking is not real-time updated.
          v-list-item-subtitle Please do not use this for scheduling your event.
      .py-2
      v-list-item(dense)
        v-list-item-title About
      About
      .py-2

    .d-none.d-md-flex.d-lg-none
      div(style="width: calc((100% - 1px) / 2); height: calc(100vh - 64px); overflow-y: scroll")
        .py-2
        v-list-item(dense)
          v-list-item-title Followings 
        Rankings(:rankings="followings")
        .py-2
        v-list-item(dense)
          v-list-item-title About
        About
        .py-2
      
      v-divider(vertical)

      div(style="width: calc((100% - 1px) / 2); height: calc(100vh - 64px); overflow-y: scroll")
        .py-2
        v-tabs(v-model="tab2", fixed-tabs)
          v-tab Tops
          v-tab Rankings
        v-tabs-items(v-model="tab2")
          v-tab-item: Rankings(:rankings="tops")
          v-tab-item: Rankings(:rankings="rankings")
        v-list-item(dense)
          v-list-item-content
            v-list-item-subtitle The ranking is not real-time updated.
            v-list-item-subtitle Please do not use this for scheduling your event.
        .py-2

    .d-none.d-lg-flex
      div(style="width: calc((100% - 2px) / 3); height: calc(100vh - 64px); overflow-y: scroll")
        .py-2
        v-list-item(dense)
          v-list-item-title Followings 
        Rankings(:rankings="followings")
        .py-2

        v-list-item(dense)
          v-list-item-title About
        About
        .py-2
      
      v-divider(vertical)

      div(style="width: calc((100% - 2px) / 3); height: calc(100vh - 64px); overflow-y: scroll")
        .py-2
        v-list-item(dense)
          v-list-item-title Tops 
        Rankings(:rankings="tops")
        .py-2

      v-divider(vertical)

      div(style="width: calc((100% - 2px) / 3); height: calc(100vh - 64px); overflow-y: scroll")
        .py-2
        v-list-item(dense)
          v-list-item-title Rankings 
        Rankings(:rankings="rankings")
        v-list-item(dense)
          v-list-item-content
            v-list-item-subtitle The ranking is not real-time updated.
            v-list-item-subtitle Please do not use this for scheduling your event.
        .py-2
    

</template>

<script>
import { set, values } from 'idb-keyval';

import sekai from '@/sekai';
import Rankings from './Rankings';
import About from './About';

export default {
  name: 'Home',

  components: { Rankings, About },

  data() {
    return {
      ranks: [
        100, 200, 500,
        1000, 2000, 5000,
        10000, 20000, 50000,
        100000, 200000, 500000,
        1000000, 2000000, 5000000,
      ],

      tops: null,
      rankings: [],
      followings: [],

      tab1: 0,
      tab2: 0,
    };
  },

  computed: {
    eventId() {
      return Object.values(this.$root.events).reduce((a, b) => {
        if (a.startAt > new Date()) return b;
        if (b.startAt > new Date()) return a;
        if (a.startAt > b.startAt) return a;
        return b;
      }).id;
    },
  },

  methods: {
    load() {
      this.tops = null;
      this.rankings = [];
      this.followings = [];

      sekai(`/api/user/{user_id}/event/${this.eventId}/ranking?targetRank=1&lowerLimit=99`).then(response => {
        this.tops = response.rankings;
      });
      this.ranks.forEach(rank => {
        sekai(`/api/user/{user_id}/event/${this.eventId}/ranking?targetRank=${rank}`).then(response => {
          let ranking = response.rankings[0];
          if (ranking) {
            this.rankings.push(ranking);
            this.rankings.sort((a, b) => a.rank - b.rank);
          }
        });
      });

      let sort = () => {
        this.followings.sort((a, b) => {
          if (a.score === undefined || b.score === undefined) {
            return 0;
          }
          return (a.score || 0) < (b.score || 0) ? 1 : -1;
        });
      };

      values().then(users => {
        users.filter(user => user.user && user.userProfile).forEach(user => {
          if (!user.user || !user.userProfile) {
            return;
          }
          user.rank = 0;
          user.score = undefined;
          this.followings.push(user);
          sekai(`/api/user/{user_id}/event/${this.eventId}/ranking?targetUserId=${user.userProfile.userId}`).then(response => {
            let ranking = response.rankings[0];
            if (ranking) {
              Object.keys(ranking).forEach(key => user[key] = ranking[key]);
              set(user.userProfile.userId, user);
            } else {
              user.rank = 0;
              user.score = 0;
            }
            sort();
          });
        });
        sort();
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
