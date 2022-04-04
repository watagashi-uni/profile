<template lang="pug">
  div
    v-list.py-0(dense)
      Divider
      User(:user="user")
      Divider(inset=16)
      v-list-item
        v-list-item-content
          v-list-item-title Contact
        v-list-item-action.ma-0
          v-btn(icon, href="https://gitlab.com/circlelin", target="_blank")
            v-icon mdi-gitlab
        v-list-item-action.ma-0
          v-btn(icon, href="https://twitter.com/nilcric_pjsekai", target="_blank")
            v-icon mdi-twitter
      Divider(inset=16)
      v-list-item(href="https://shop.pjsekai.moe", target="_blank")
        v-list-item-content
          v-list-item-title.purple--text.text--lighten-2 Project Sekai Account Shop
          v-list-item-subtitle 
      Divider
    
    .py-2

    v-list.py-0(dense)
      Divider
      v-list-item(@click="reloadDatabase")
        v-list-item-content
          v-list-item-title.purple--text.text--lighten-2 Reload database
          v-list-item-subtitle 
      Divider
</template>

<script>
import Divider from '@/components/Divider';
import User from './User';
import { del } from 'idb-keyval';

export default {
  name: 'About',

  components: { Divider, User },

  data() {
    return {
      user: {
        name: '林檎アメ',
        score: false,
        userId: '16656056566779905',
        userCard: {
          cardId: 249,
          defaultImage: 'special_training',
        },
        userProfileHonors: [
          {
            seq: 1,
            honorId: 34,
            honorLevel: 32,
          },
          {
            seq: 2,
            honorId: 58,
            honorLevel: 32,
          },
          {
            seq: 3,
            honorId: 534,
          },
        ],
      }
    };
  },

  methods: {
    reloadDatabase() {
      del('pjsekai').then(() => {
        location.reload();
      });
    },
  }
};
</script>