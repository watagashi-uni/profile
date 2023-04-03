<template lang="pug">
  v-list.py-0(dense)
    Divider
    template(v-for="(event, i) in Object.values($db.events).map(e => [e, profile.userEvents.find(it => it.eventId === e.id)]).reverse()")
      Divider(inset=112, v-if="i")
      v-lazy(height=56)
        v-list-item(:key="`events-${event[0].id}`")
          .my-2.mr-4(style="height: 40px; width: 80px")
            v-img(:src="`${$sekai.assetHost}/../ondemand/event/${event[0].assetbundleName}/logo/logo/logo.png`")
          v-list-item-content
            v-list-item-title {{event[0].name}}
            v-list-item-subtitle
              | {{new Date(event[0].startAt).toLocaleDateString()}}
              | ~
              | {{new Date(event[0].aggregateAt).toLocaleDateString()}}
          v-list-item-action(v-if="event[1] === undefined")
            v-list-item-action-text ...
          v-list-item-action(v-else-if="!event[1].eventPoint")
            v-list-item-action-text 0 P
          v-list-item-action(v-else)
            v-list-item-title.align-self-end # {{event[1].rank}}
            v-list-item-action-text {{event[1].eventPoint}} P
    Divider
</template>

<script>
import Divider from '@/components/Divider';

export default {
  name: 'Events',

  props: ['profile'],

  components: { Divider },
};
</script>
