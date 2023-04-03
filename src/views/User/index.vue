<template lang="pug">
  .pa-8.text-center(v-if="!profile")
    v-progress-circular(indeterminate, color="primary")
    .pa-2.caption
      span 加载profile中...<br>如果一直加载，说明无用户数据或者设置了仅Unibot可见

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
        v-tab-item: Events(:profile="profile", key="user-events")
        v-tab-item: RankMatches(:profile="profile", key="user-rank-matches")
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
          v-tab-item: Events(:profile="profile", key="user-events")
          v-tab-item: RankMatches(:profile="profile", key="user-rank-matches")
          v-tab-item: Honors(:profile="profile", key="user-honors")
          v-tab-item: Characters(:profile="profile", key="user-characters")
        .py-2

      v-divider(vertical)

      .split(style="width: calc(100% - 360px - 1px - (100% - 720px) / 4)")
        .py-2
        v-list-item(dense)
          v-list-item-title 乐曲
        Musics(:profile="profile", key="user-musics")
        .py-2

    .d-flex(v-if="$vuetify.breakpoint.lg")
      .split(style="width: 360px")
        .py-2
        Profile(:profile="profile", key="user-profile")
        .py-2
        v-list-item(dense)
          v-list-item-title 角色
        Characters(:profile="profile", key="user-characters")
        .py-2

      v-divider(vertical)

      .split(style="width: calc(100% - 720px - 2px - (100% - 1080px) / 4)")
        .py-2
        v-list-item(dense)
          v-list-item-title 乐曲
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
          v-tab-item: Events(:profile="profile", key="user-events")
          v-tab-item: RankMatches(:profile="profile", key="user-rank-matches")
          v-tab-item: Honors(:profile="profile", key="user-honors")
        .py-2

    .d-flex(v-if="$vuetify.breakpoint.xl")
      .split(style="width: 360px")
        .py-2
        Profile(:profile="profile", key="user-profile")
        .py-2
        v-list-item(dense)
          v-list-item-title 角色
        Characters(:profile="profile", key="user-characters")
        .py-2

      v-divider(vertical)

      .split(style="width: calc(100% - 720px - 2px - (100% - 1800px) / 4)")
        //- .py-2
        //- v-list-item(dense)
        //-   v-list-item-title Musics
        Musics(:profile="profile", key="user-musics")
        //- .py-2

      v-divider(vertical)

      .split(style="width: calc(360px + (100% - 1800px) / 4)")
        .py-1
        v-tabs(v-model="tab3", fixed-tabs)
          v-tab: v-icon mdi-calendar-text
          v-tab: v-icon mdi-podium-gold
          v-tab: v-icon mdi-tag
        v-tabs-items(touchless, v-model="tab3")
          v-tab-item: Events(:profile="profile", key="user-events")
          v-tab-item: RankMatches(:profile="profile", key="user-rank-matches")
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
    return {
      profile: null,

      tab1: null,
      tab2: null,
      tab3: null,
    };
  },

  methods: {
    load() {
      let id = this.id;
      this.profile = null;

      sekai.profile(`/api/user/${this.id}/profile`).then(response => {
        if (id !== this.id) return;
        this.profile = response;
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
