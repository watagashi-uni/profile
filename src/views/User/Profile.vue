<template lang="pug">
  div
    v-list.py-0.print(dense, ref="profile")
      Divider
      v-list-item
        v-list-item-avatar
          v-img(:src="`${$sekai.assetHost}/thumbnail/chara/${$db.cards[profile.userDecks[0].leader].assetbundleName}_${profile.userCards.find(card => card.cardId == profile.userDecks[0].leader).defaultImage == 'special_training' ? 'after_training' : 'normal'}.png`")
        v-list-item-content
          v-list-item-title {{profile.user.userGamedata.name}}
          v-list-item-subtitle.text-wrap {{profile.userProfile.word}}
        v-list-item-action
          v-list-item-action-text 等级
          v-list-item-title {{profile.user.userGamedata.rank}}
      Divider(inset=16)
      .pa-2
        ProfileHonors(:userProfileHonors="profile.userProfileHonors", size=36)
      Divider(inset=16)
      v-list-item
        v-list-item-content: v-list-item-title 玩家ID
        v-list-item-action: v-list-item-action-text {{profile.userProfile.userId}}
      Divider(inset=16)
      v-list-item
        v-list-item-content: v-list-item-title 注册时间
        v-list-item-action: v-list-item-action-text {{new Date(1600218000000 + profile.userProfile.userId / 2 ** 22).toLocaleString()}}
      Divider(inset=16)
      v-list-item(:href="`https://twitter.com/${profile.userProfile.twitterId}`", target="_blank")
        v-list-item-content: v-list-item-title Twitter
        v-list-item-action: v-list-item-action-text @{{profile.userProfile.twitterId}}
        v-list-item-action.ml-2: v-icon(small) mdi-chevron-right
      Divider
    .py-2
    v-list.py-0(dense)
      Divider
      v-list-item(@click="follow", :disabled="following===undefined")
        v-list-item-content
          v-list-item-title.primary--text 关注
        v-list-item-action
          v-icon(v-if="following===true", color="primary") mdi-heart
          v-icon(v-if="following===false") mdi-heart-outline
      v-expand-transition
        div(v-show="following")
          Divider(inset=16)

          v-dialog(v-model="dialog.show", width=360)
            template(v-slot:activator="{on, attrs}")
              v-list-item(v-on="on", v-bind="attrs")
                v-list-item-content: v-list-item-title 友好名称
                v-list-item-action: v-list-item-action-text {{friendlyName}}
                v-list-item-action.ml-2: v-icon(small) mdi-square-edit-outline

            v-card
              v-card-title 编辑友好名称
              v-card-text
                v-text-field(dense, v-model="dialog.input")
              v-card-actions
                v-btn(text, @click="dialog.show=false") 取消
                v-spacer
                v-btn(text, color="primary", @click="submit") 确定
      Divider
</template>

<script>
import { get, set, del } from 'idb-keyval';
import Divider from '@/components/Divider';
import ProfileHonors from '@/components/ProfileHonors';

export default {
  name: 'Profile',

  props: ['profile'],

  components: { Divider, ProfileHonors },

  data() {
    return {
      following: undefined,
      friendlyName: undefined,
      dialog: {
        show: false,
        input: undefined,
      }
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
        this._follow();
      } else if (this.following === true) {
        this._unfollow();
      }
    },
    _follow() {
      this.following = undefined;
      set(this.id, {
        user: this.profile.user,
        userCard: this.profile.userCards.find(card => card.cardId == this.profile.userDecks[0].leader),
        userProfile: this.profile.userProfile,
        friendlyName: this.friendlyName,
      }).then(() => {
        this.following = true;
      });
    },
    _unfollow() {
      this.following = undefined;
      del(this.id).then(() => {
        this.following = false;
      });
    },
    load() {
      this.following = undefined;
      let id = this.id;
      get(id).then(x => {
        if (id != this.id) return;
        this.following = Boolean(x);
        this.friendlyName = x ? x.friendlyName : undefined;
        this.dialog.input = this.friendlyName || this.profile.user.userGamedata.name;
      });
    },
    submit() {
      this.dialog.show = false;
      this.friendlyName = this.dialog.input;
      this._follow();
    }
  },

  mounted() {
    this.$nextTick(function () {
      this.load();
    });
    this.$root.$emit('saveComponent', 'profile', this.$refs.profile);
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
