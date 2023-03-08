<template lang="pug">
  .pa-8.text-center(v-if="!rankings")
    v-progress-circular(indeterminate, color="primary")
    .pa-2.caption
      span 加载排行榜中...

  v-list.py-0(dense, v-else)
    Divider

    v-list-item-group(v-if="editing" v-model="model", multiple)
      template(v-for="user, i in rankings")
        Divider(inset=72, v-if="i", :key="`divider-${i}`")
        User(:user="user", :key="`user-${user.userId || (user.userProfile && user.userProfile.userId)}`", editing)

    transition-group(v-else, name="list", tag="div")
      template(v-for="user, i in rankings")
        Divider(inset=72, v-if="i", :key="`divider-${i}`")
        User(:user="user", :key="`user-${user.userId || (user.userProfile && user.userProfile.userId)}`", :showEvent="showEvent", :showRankMatch="showRankMatch")

    div(v-if="rankings.length == 0")
      v-list-item
        v-list-item-content
          v-list-item-subtitle 空
    Divider

</template>

<script>
import Divider from '@/components/Divider';
import User from './User';

export default {
  name: 'Rankings',

  props: {
    rankings: {},
    editing: { type: Boolean, default: false },
    showEvent: { type: Boolean, default: false },
    showRankMatch: { type: Boolean, default: false },
  },

  components: { Divider, User },

  data() {
    return {
      model: [],
    };
  },
};
</script>

<style scoped>
.list-enter,
.list-leave-to {
  opacity: 0;
}
.list-enter-active,
.list-leave-active {
  transition: opacity 0.5s ease;
}
.list-move {
  transition: transform 0.5s ease;
}
</style>
