<template lang="pug">
  .pa-8.text-center(v-if="!profile")
    v-progress-circular(indeterminate, color="primary")
    .pa-2.caption
      span Loading profile...

  div(v-else)
    .d-block(v-if="$vuetify.breakpoint.smAndDown")
      .py-2
      Profile(:profile="profile", key="user-profile")
      .py-2
      v-tabs(v-model="tab1", fixed-tabs)
        v-tab(style="min-width: 40px"): v-icon mdi-music
        v-tab(style="min-width: 40px"): v-icon mdi-calendar-text
        v-tab(style="min-width: 40px"): v-icon mdi-podium-gold
        v-tab(style="min-width: 40px"): v-icon mdi-tag
        v-tab(style="min-width: 40px"): v-icon mdi-heart
      v-tabs-items(touchless, v-model="tab1")
        v-tab-item: Musics(:profile="profile", key="user-musics")
        v-tab-item: Events(:profile="profile", :rankings="events", key="user-events")
        v-tab-item: RankMatches(:profile="profile", :rankings="rankMatches", key="user-rank-matches")
        v-tab-item: Honors(:profile="profile", key="user-honors")
        v-tab-item: Characters(:profile="profile", key="user-characters")
      .py-2

    .d-flex(v-if="$vuetify.breakpoint.md")
      .split(style="width: calc(360px + (100% - 720px) / 4)")
        .py-2
        Profile(:profile="profile", key="user-profile")
        .py-2
        v-tabs(v-model="tab2", fixed-tabs)
          v-tab: v-icon mdi-calendar-text
          v-tab: v-icon mdi-podium-gold
          v-tab: v-icon mdi-tag
          v-tab: v-icon mdi-heart
        v-tabs-items(touchless, v-model="tab2")
          v-tab-item: Events(:profile="profile", :rankings="events", key="user-events")
          v-tab-item: RankMatches(:profile="profile", :rankings="rankMatches", key="user-rank-matches")
          v-tab-item: Honors(:profile="profile", key="user-honors")
          v-tab-item: Characters(:profile="profile", key="user-characters")
        .py-2

      v-divider(vertical)

      .split(style="width: calc(100% - 360px - 1px - (100% - 720px) / 4)")
        .py-2
        v-list-item(dense)
          v-list-item-title Musics
        Musics(:profile="profile", key="user-musics")
        .py-2
    
    .d-flex(v-if="$vuetify.breakpoint.lgAndUp")
      .split(style="width: 360px")
        .py-2
        Profile(:profile="profile", key="user-profile")
        .py-2
        v-list-item(dense)
          v-list-item-title Characters
        Characters(:profile="profile", key="user-characters")
        .py-2

      v-divider(vertical)

      .split(style="width: calc(100% - 720px - 2px - (100% - 1080px) / 4)")
        .py-2
        v-list-item(dense)
          v-list-item-title Musics
        Musics(:profile="profile", key="user-musics")
        .py-2

      v-divider(vertical)

      .split(style="width: calc(360px + (100% - 1080px) / 4)")
        .py-1
        v-tabs(v-model="tab3", fixed-tabs)
          v-tab: v-icon mdi-calendar-text
          v-tab: v-icon mdi-podium-gold
          v-tab: v-icon mdi-tag
        v-tabs-items(touchless, v-model="tab3")
          v-tab-item: Events(:profile="profile", :rankings="events", key="user-events")
          v-tab-item: RankMatches(:profile="profile", :rankings="rankMatches", key="user-rank-matches")
          v-tab-item: Honors(:profile="profile", key="user-honors")
        .py-2

</template>

<script>
import sekai from '@/sekai';
import Divider from '@/components/Divider';
import Profile from './Profile';
import Musics from './Musics';
import Events from './Events';
import RankMatches from './RankMatches';
import Characters from './Characters';
import Honors from './Honors';

export default {
  name: 'User',

  props: ['id'],

  components: { Divider, Profile, Musics, Events, Characters, Honors, RankMatches },

  data() {
    let events = {};
    Object.values(this.$db.events).forEach(event => events[event.id] = null);
    let rankMatches = {};
    Object.values(this.$db.rankMatchSeasons).forEach(rankMatch => rankMatches[rankMatch.id] = null);
    return {
      profile: null,
      events: events,
      rankMatches: rankMatches,

      tab1: null,
      tab2: null,
      tab3: null,
    };
  },

  methods: {
    load() {
      let id = this.id;
      this.profile = null;
      Object.keys(this.events).forEach(i => this.events[i] = null);
      Object.keys(this.rankMatches).forEach(i => this.rankMatches[i] = null);

      sekai.api(`/api/user/${this.id}/profile`).then(response => {
        if (id != this.id) return;
        this.profile = response;
      }).then(() => {
        Object.values(this.$db.events).filter(event => event.id >= this.$sekai.eventStartID).forEach(event => {
          sekai.api(`/api/user/{user_id}/event/${event.id}/ranking?targetUserId=${this.id}`).then(response => {
            if (id != this.id) return;
            this.events[event.id] = response.rankings[0] || {};
          });
        });
        Object.values(this.$db.rankMatchSeasons).forEach(rankMatch => {
          sekai.api(`/api/user/{user_id}/rank-match-season/${rankMatch.id}/ranking?targetUserId=${this.id}`).then(response => {
            if (id != this.id) return;
            this.rankMatches[rankMatch.id] = response.rankings[0] || {};
          });
        });
      });
    }
  },

  mounted() {
    this.$nextTick(function () {
      this.load();
    });
  },

  watch: {
    id() {
      this.$nextTick(function () {
        this.load();
      });
    }
  }
};
</script>