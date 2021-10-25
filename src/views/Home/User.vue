<template lang="pug">
  div
    //- p {{JSON.stringify(user)}}
    v-list-item(dense, v-bind="{to: editing ? undefined : `/user/${user.userId || (user.userProfile && user.userProfile.userId)}`}")
      template(v-slot:default="{active}")
        v-list-item-avatar
          v-img(:src="`${$assets()}/thumbnail/chara/${$root.cards[user.userCard.cardId].assetbundleName}_${user.userCard.defaultImage == 'special_training' ? 'after_training' : 'normal'}.png`")
        v-list-item-content
          v-list-item-title
            span {{user.name || user.user.userGamedata.name}}
            v-list-item-action-text.mx-2(v-if="user.friendlyName") {{user.friendlyName}}
          v-list-item-subtitle.d-flex.justify-space-between(style="max-width: 201px")
            Honor(:id="user.userProfile.honorId1", :level="user.userProfile.honorLevel1", size=20)
            Honor(:id="user.userProfile.honorId2", :level="user.userProfile.honorLevel2", size=20, type="sub")
            Honor(:id="user.userProfile.honorId3", :level="user.userProfile.honorLevel3", size=20, type="sub")
            //- div(style="width: 50%"): v-img(v-if="user.userProfile.honorId1", contain, height=20, :src="`${$assets()}/honor/${$root.honors[user.userProfile.honorId1].assetbundleName}/degree_main.png`")
            //- div(style="width: 25%"): v-img(v-if="user.userProfile.honorId2", contain, height=20, :src="`${$assets()}/honor/${$root.honors[user.userProfile.honorId2].assetbundleName}/degree_sub.png`")
            //- div(style="width: 25%"): v-img(v-if="user.userProfile.honorId3", contain, height=20, :src="`${$assets()}/honor/${$root.honors[user.userProfile.honorId3].assetbundleName}/degree_sub.png`")

        v-list-item-action.ml-2(v-if="editing")
          v-checkbox(:input-value="active")
        v-list-item-action.ml-2(v-else-if="user.score===undefined")
            v-list-item-action-text ...
        v-list-item-action.ml-2(v-else-if="user.score!==false")
          v-list-item-title.align-self-end(v-if="user.rank") # {{user.rank}}
          v-list-item-action-text {{user.score}} P

</template>

<script>
import Honor from '@/components/Honor';

export default {
  name: 'User',

  props: ['user', 'editing'],

  components: { Honor },
};
</script>