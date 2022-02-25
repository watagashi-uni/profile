<template lang="pug">
  div
    //- p {{JSON.stringify(user)}}
    v-list-item(dense, v-bind="{to: editing ? undefined : `/user/${user.userId || (user.userProfile && user.userProfile.userId)}`}")
      template(v-slot:default="{active}")
        v-list-item-avatar
          v-img(:src="`${$sekai.assetHost}/thumbnail/chara/${$db.cards[user.userCard.cardId].assetbundleName}_${user.userCard.defaultImage == 'special_training' ? 'after_training' : 'normal'}.png`")
        v-list-item-content
          v-list-item-title
            span {{user.name || user.user.userGamedata.name}}
            v-list-item-action-text.mx-2(v-if="user.friendlyName") {{user.friendlyName}}
          v-list-item-subtitle
            ProfileHonors(:userProfileHonors="user.userProfileHonors", size=20, style="max-width: 201px")

        v-list-item-action.ml-2(v-if="editing")
          v-checkbox(:input-value="active")
        v-list-item-action.ml-2(v-else-if="user.score===undefined")
            v-list-item-action-text ...
        v-list-item-action.ml-2(v-else-if="user.score!==false")
          v-list-item-title.align-self-end(v-if="user.rank") # {{user.rank}}
          v-list-item-action-text {{user.score}} P

</template>

<script>
import ProfileHonors from '@/components/ProfileHonors';

export default {
  name: 'User',

  props: ['user', 'editing'],

  components: { ProfileHonors },
};
</script>