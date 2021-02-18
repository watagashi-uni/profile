<template lang="pug">
  v-list.py-0(dense)
    Divider
    v-list-item
      v-list-item-avatar
        v-img(:src="`${$assets()}/thumbnail/chara_rip/${$root.cards[profile.userDecks[0].leader].assetbundleName}_${profile.userCards.find(card => card.cardId == profile.userDecks[0].leader).specialTrainingStatus == 'done' ? 'after_training' : 'normal'}.png`")
      v-list-item-content
        v-list-item-title {{profile.user.userGamedata.name}}
        v-list-item-subtitle {{profile.userProfile.word}}
      v-list-item-action
        v-list-item-action-text Rank
        v-list-item-title {{profile.user.userGamedata.rank}}
    Divider(inset=16)
    v-row.mx-0.my-2
      v-col(cols=6).pa-0: v-img(contain, height=40, :src="`${$assets()}/honor/${$root.honors[profile.userProfile.honorId1].assetbundleName}_rip/degree_main.png`")
      v-col(cols=3).pa-0: v-img(contain, height=40, :src="`${$assets()}/honor/${$root.honors[profile.userProfile.honorId2].assetbundleName}_rip/degree_sub.png`")
      v-col(cols=3).pa-0: v-img(contain, height=40, :src="`${$assets()}/honor/${$root.honors[profile.userProfile.honorId3].assetbundleName}_rip/degree_sub.png`")
    Divider(inset=16)
    v-list-item
      v-list-item-content: v-list-item-title Player ID
      v-list-item-action: v-list-item-action-text {{profile.userProfile.userId}}
    Divider(inset=16)
    v-list-item
      v-list-item-content: v-list-item-title Twitter
      v-list-item-action: v-list-item-action-text @{{profile.userProfile.twitterId}}
    Divider
</template>

<script>
import Divider from '@/components/Divider';

export default {
  name: 'Profile',

  props: ['profile'],

  components: { Divider },
};
</script>