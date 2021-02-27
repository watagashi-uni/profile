<template lang="pug">
  div
    //- p {{JSON.stringify(user)}}
    v-list-item(dense, :to="`/user/${user.userId || (user.userProfile && user.userProfile.userId)}`")
      v-list-item-avatar
        v-img(:src="`${$assets()}/thumbnail/chara_rip/${$root.cards[user.userCard.cardId].assetbundleName}_${user.userCard.defaultImage == 'special_training' ? 'after_training' : 'normal'}.png`")
      v-list-item-content
        v-list-item-title {{user.name || user.user.userGamedata.name}}
        //- v-list-item-subtitle.text-wrap {{user.userProfile.word}}
        v-list-item-subtitle.d-flex(style="max-width: 209px")
          div(style="width: 50%"): v-img(v-if="user.userProfile.honorId1", contain, height=20, :src="`${$assets()}/honor/${$root.honors[user.userProfile.honorId1].assetbundleName}_rip/degree_main.png`")
          div(style="width: 25%"): v-img(v-if="user.userProfile.honorId2", contain, height=20, :src="`${$assets()}/honor/${$root.honors[user.userProfile.honorId2].assetbundleName}_rip/degree_sub.png`")
          div(style="width: 25%"): v-img(v-if="user.userProfile.honorId3", contain, height=20, :src="`${$assets()}/honor/${$root.honors[user.userProfile.honorId3].assetbundleName}_rip/degree_sub.png`")

      v-list-item-action(v-if="user.score===undefined")
          v-list-item-action-text ...
      v-list-item-action(v-else)
        v-list-item-title.align-self-end(v-if="user.rank") Rank {{user.rank}}
        v-list-item-action-text {{user.score}} P
</template>

<script>
export default {
  name: 'User',

  props: ['user'],
};
</script>