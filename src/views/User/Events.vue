<template lang="pug">
  v-list.py-0(dense)
    Divider
    template(v-for="event, i in Object.values($root.events).reverse()")
      Divider(inset=112, v-if="i")
      v-list-item(:key="`events-${event.id}`")
        .my-2.mr-4(style="height: 40px; width: 80px")
          v-img(:src="`${$assets()}/event/${event.assetbundleName}/logo_rip/logo.png`")
        v-list-item-content
          v-list-item-title {{event.name}}
        v-list-item-action(v-if="rankings[event.id] === null")
          v-list-item-action-text ...
        v-list-item-action(v-else-if="rankings[event.id].length == 0")
          v-list-item-action-text 0 P
        v-list-item-action(v-else)
          v-list-item-title.align-self-end Rank {{rankings[event.id][0].rank}}
          v-list-item-action-text {{rankings[event.id][0].score}} P
    Divider
</template>

<script>
import Divider from '@/components/Divider';

export default {
  name: 'Events',

  props: ['profile', 'rankings'],

  components: { Divider },
};
</script>