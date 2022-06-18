<template lang="pug">
  div
    Divider
    v-list.py-0(dense)
      User(:user="user")

      Divider(inset=72)

      v-list-item(href="https://twitter.com/nilcric_pjsekai", target="_blank")
        v-icon.ml-2.mr-6 mdi-twitter
        v-list-item-content
          v-list-item-title Twitter
          v-list-item-subtitle.text-wrap Developer's personal account

      Divider(inset=72)

      v-list-item(href="https://twitter.com/pjsekai_profile", target="_blank")
        v-icon.ml-2.mr-6 mdi-robot
        v-list-item-content
          v-list-item-title Twitter Bot
          v-list-item-subtitle.text-wrap Post updates and information about <a href="https://profile.pjsekai.moe">Project Sekai Profile</a>, including latest Level+.

      Divider(inset=72)

      v-list-item(href="https://gitlab.com/pjsekai/profile", target="_blank")
        v-icon.ml-2.mr-6 mdi-gitlab
        v-list-item-content
          v-list-item-title GitLab

      Divider(inset=72)

      v-list-item(href="mailto:profile@pjsekai.moe")
        v-icon.ml-2.mr-6 mdi-email
        v-list-item-content
          v-list-item-title Email

    Divider
    
    .py-2
    v-list-item(dense)
      v-list-item-title Links
    Divider
    v-list.py-0(dense)
      v-list-item(href="https://sekai.best", target="_blank")
        v-list-item-title Sekai Viewer
      Divider(inset=16)
      v-list-item(href="https://pjsek.ai", target="_blank")
        v-list-item-title pjsek.ai
      Divider(inset=16)
      v-list-item(href="https://shop.pjsekai.moe", target="_blank")
        v-list-item-title Project Sekai Account Shop
    Divider
    
    .py-2

    v-list.py-0(dense)
      Divider
      v-list-item(@click="$root.$emit('reloadDatabase')")
        v-list-item-title.purple--text.text--lighten-2 Reload database
      Divider
    
    .py-2
    v-list-item(dense)
      v-list-item-subtitle.text-wrap 
        | This site (<a href="https://profile.pjsekai.moe">Project Sekai Profile</a>)
        | does not collect, upload, or share any personal information. 
        | The Following list is stored only in your local browser. 

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
};
</script>