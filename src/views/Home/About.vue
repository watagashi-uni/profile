<template lang="pug">
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
</template>

<script>
import Divider from '@/components/Divider';
import User from './User';

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
          cardId: 135,
        },
        userProfile: {
          honorId1: 33,
          honorLevel1: 1,
        },
      }
    };
  }
};
</script>