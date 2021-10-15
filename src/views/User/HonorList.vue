<template lang="pug">
  v-list.py-0(dense)
    Divider
    template(v-for="honor, i in honors")
      Divider(inset=222, v-if="i")
      v-list-item(:key="`honors-${honor.honorId}`")
        .my-2.mr-4
          Honor(:id="honor.honorId", :level="honor.level")
        v-list-item-content
          v-list-item-title {{$root.honorGroups[$root.honors[honor.honorId].groupId].name}}
          v-list-item-subtitle {{$root.honors[honor.honorId].name}}
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