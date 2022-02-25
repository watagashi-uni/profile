<template lang="pug">
  v-list.py-0(dense)
    Divider
    template(v-for="honor, i in honors")
      Divider(inset=203, v-if="i")
      v-list-item(:key="`honors-${honor.honorId}`")
        .my-2.mr-4
          Honor(:id="honor.honorId", :level="honor.level", size=36)
        v-list-item-content
          v-list-item-title {{$db.honorGroups[$db.honors[honor.honorId].groupId].name}}
          v-list-item-subtitle
            span(v-if="$db.honorGroups[$db.honors[honor.honorId].groupId].name != $db.honors[honor.honorId].name") {{$db.honors[honor.honorId].name}}
            span(v-if="$db.honors[honor.honorId].levels.length > 1") Lv. {{honor.level}}
    Divider
</template>

<script>
import Honor from '@/components/Honor';
import Divider from '@/components/Divider';

export default {
  name: 'HonorList',

  props: ['honors'],

  components: { Honor, Divider },

};
</script>