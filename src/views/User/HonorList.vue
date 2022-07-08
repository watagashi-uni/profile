<template lang="pug">
  v-list.py-0(dense)
    Divider
    template(v-for="honor, i in honors")
      Divider(inset=203, v-if="i")

      v-list-item(:key="`honors-${honor.honorId}`")
        .my-2.mr-4
          Honor(:id="honor.honorId", :level="honor.level", :type="honor.type == 'bonds' ? 'bonds' : 'normal'" size=36)
        v-list-item-content
          v-list-item-title
            template(v-if="honor.type == 'bonds'")
              span {{$db.bondsHonors[honor.honorId].name}}
            template(v-else)
              span {{$db.honorGroups[$db.honors[honor.honorId].groupId].name}}
          v-list-item-subtitle
            template(v-if="honor.type == 'bonds'")
              span Lv. {{honor.level}} 
              span {{$db.bondsHonorWords[honor.honorId].name}}
            template(v-else)
              span(v-if="$db.honors[honor.honorId].levels.length > 1") Lv. {{honor.level}} 
              span(v-if="$db.honorGroups[$db.honors[honor.honorId].groupId].name != $db.honors[honor.honorId].name") {{$db.honors[honor.honorId].name}}
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