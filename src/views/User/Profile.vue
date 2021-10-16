<template lang="pug">
  div
    v-list.py-0(dense)
      Divider
      v-list-item
        v-list-item-avatar
          v-img(:src="`${$assets()}/thumbnail/chara/${$root.cards[profile.userDecks[0].leader].assetbundleName}_${profile.userCards.find(card => card.cardId == profile.userDecks[0].leader).defaultImage == 'special_training' ? 'after_training' : 'normal'}.png`")
        v-list-item-content
          v-list-item-title {{profile.user.userGamedata.name}}
          v-list-item-subtitle.text-wrap {{profile.userProfile.word}}
        v-list-item-action
          v-list-item-action-text Rank
          v-list-item-title {{profile.user.userGamedata.rank}}
      Divider(inset=16)
      .d-flex.pa-2.justify-space-between
        Honor(:id="profile.userProfile.honorId1", :level="profile.userProfile.honorLevel1", size=36)
        Honor(:id="profile.userProfile.honorId2", :level="profile.userProfile.honorLevel2", size=36, type="sub")
        Honor(:id="profile.userProfile.honorId3", :level="profile.userProfile.honorLevel3", size=36, type="sub")
        //- div(style="width: 50%"): v-img(v-if="profile.userProfile.honorId1", contain, height=40, :src="`${$assets()}/honor/${$root.honors[profile.userProfile.honorId1].assetbundleName}/degree_main.png`")
        //- div(style="width: 25%"): v-img(v-if="profile.userProfile.honorId2", contain, height=40, :src="`${$assets()}/honor/${$root.honors[profile.userProfile.honorId2].assetbundleName}/degree_sub.png`")
        //- div(style="width: 25%"): v-img(v-if="profile.userProfile.honorId3", contain, height=40, :src="`${$assets()}/honor/${$root.honors[profile.userProfile.honorId3].assetbundleName}/degree_sub.png`")
      Divider(inset=16)
      v-list-item
        v-list-item-content: v-list-item-title Player ID
        v-list-item-action: v-list-item-action-text {{profile.userProfile.userId}}
      Divider(inset=16)
      v-list-item
        v-list-item-content: v-list-item-title Registration date
        v-list-item-action: v-list-item-action-text {{new Date(1600218000000 + profile.userProfile.userId / 2 ** 22).toLocaleDateString()}}
      template(v-if="profile.userProfile.twitterId")
        Divider(inset=16)
        v-list-item(:href="`https://twitter.com/${profile.userProfile.twitterId}`", target="_blank")
          v-list-item-content: v-list-item-title Twitter
          v-list-item-action: v-list-item-action-text @{{profile.userProfile.twitterId}}
          v-list-item-action.ma-0: v-icon(small) mdi-chevron-right
      Divider
    .py-2
    v-list.py-0(dense)
      Divider
      v-list-item(@click="follow", :disabled="following===undefined")
        v-list-item-content: v-list-item-title.primary--text Follow
        v-list-item-action
          v-icon(v-if="following===true", color="primary") mdi-heart
          v-icon(v-if="following===false") mdi-heart-outline
      Divider
</template>

<script>
import { get, set, del } from 'idb-keyval';
import Divider from '@/components/Divider';
import Honor from '@/components/Honor';

export default {
  name: 'Profile',

  props: ['profile'],

  components: { Divider, Honor },

  data() {
    return {
      following: undefined,
    };
  },

  computed: {
    id() {
      return this.profile.userProfile.userId;
    },
  },

  methods: {
    follow() {
      if (this.following === false) {
        this.following = undefined;
        set(this.id, {
          user: this.profile.user,
          userCard: this.profile.userCards.find(card => card.cardId == this.profile.userDecks[0].leader),
          userProfile: this.profile.userProfile,
        }).then(() => {
          this.following = true;
        });
      } else if (this.following === true) {
        this.following = undefined;
        del(this.id).then(() => {
          this.following = false;
        });
      }
    },
    load() {
      this.following = undefined;
      let id = this.id;
      get(id).then(x => {
        if (id != this.id) return;
        this.following = Boolean(x);
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