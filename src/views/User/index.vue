<template lang="pug">
  .pa-8.text-center(v-if="!profile")
    v-progress-circular(indeterminate, color="primary")
    .pa-2.caption
      span Loading profile...

  div(v-else)
    .d-block.d-md-none
      .py-2
      Profile(:profile="profile")
      .py-2
      v-tabs(v-model="tab1", fixed-tabs)
        v-tab musics
        v-tab events
        v-tab characters
      v-tabs-items(v-model="tab1")
        v-tab-item: Musics(:profile="profile")
        v-tab-item: Events(:profile="profile", :rankings="rankings")
        v-tab-item: Characters(:profile="profile")
      .py-2

    .d-none.d-md-flex.d-lg-none
      div(style="width: 360px; max-height: calc(100vh - 64px); overflow-y: scroll")
        .py-2
        Profile(:profile="profile")
        .py-2
        v-list-item(dense)
          v-list-item-title Characters
        Characters(:profile="profile")
        .py-2

      v-divider(vertical)

      div(style="width: calc(100% - 361px); max-height: calc(100vh - 64px); overflow-y: scroll")
        .py-2
        v-tabs(v-model="tab2", fixed-tabs)
          v-tab musics
          v-tab events
        v-tabs-items(v-model="tab2")
          v-tab-item: Musics(:profile="profile")
          v-tab-item: Events(:profile="profile", :rankings="rankings")
        .py-2
    
    .d-none.d-lg-flex
      div(style="width: 360px; height: calc(100vh - 64px); overflow-y: scroll")
        .py-2
        Profile(:profile="profile")
        .py-2
        v-list-item(dense)
          v-list-item-title Characters
        Characters(:profile="profile")
        .py-2

      v-divider(vertical)

      div(style="width: calc((100% - 362px) / 2); height: calc(100vh - 64px); overflow-y: scroll")
        .py-2
        v-list-item(dense)
          v-list-item-title Musics
        Musics(:profile="profile")
        .py-2

      v-divider(vertical)

      div(style="width: calc((100% - 362px) / 2); height: calc(100vh - 64px); overflow-y: scroll")
        .py-2
        v-list-item(dense)
          v-list-item-title Events
        Events(:profile="profile", :rankings="rankings")
        .py-2

</template>

<script>
import sekai from '@/sekai';
import Divider from '@/components/Divider';
import Profile from './Profile';
import Musics from './Musics';
import Events from './Events';
import Characters from './Characters';

export default {
  name: 'User',

  props: ['id'],

  components: { Divider, Profile, Musics, Events, Characters },

  data() {
    let rankings = {};
    Object.values(this.$root.events).forEach(event => rankings[event.id] = null);
    return {
      profile: null,
      rankings: rankings,

      tab1: null,
      tab2: null,
    };
  },

  methods: {
    load() {
      let id = this.id;
      this.profile = null;
      Object.keys(this.rankings).forEach(i => this.rankings[i] = null);

      sekai(`/api/user/${this.id}/profile`).then(response => {
        if (id != this.id) return;
        this.profile = response;
      }).then(() => {
        Object.values(this.$root.events).forEach(event => {
          sekai(`/api/user/{user_id}/event/${event.id}/ranking?targetUserId=${this.id}`).then(response => {
            if (id != this.id) return;
            this.rankings[event.id] = response.rankings;
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