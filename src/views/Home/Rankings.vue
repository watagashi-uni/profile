<template lang="pug">
  .pa-8.text-center(v-if="!rankings")
    v-progress-circular(indeterminate, color="primary")
    .pa-2.caption
      span Loading rankings...
  
  v-list.py-0(dense, v-else)
    Divider
    transition-group(name="list", tag="div")
      template(v-for="user, i in rankings")
        Divider(inset=72, v-if="i", :key="`divider-${i}`")
        User(:user="user", :key="`user-${user.userId || (user.userProfile && user.userProfile.userId)}`")
    div(v-if="rankings.length == 0")
      v-list-item
        v-list-item-content
          v-list-item-subtitle None
    Divider

</template>

<script>
import Divider from '@/components/Divider';
import User from './User';

export default {
  name: 'Rankings',

  props: ['rankings'],

  components: { Divider, User },
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