<template lang="pug">
  .pa-8.text-center(v-if="!rankings")
    v-progress-circular(indeterminate, color="primary")
    .pa-2.caption
      span Loading rankings...
  
  v-list.py-0(dense, v-else)
    Divider
    template(v-for="user, i in rankings")
      Divider(inset=16, v-if="i")
      User(:user="user")
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