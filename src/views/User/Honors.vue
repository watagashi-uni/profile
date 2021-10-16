<template lang="pug">
  div
    template(v-if="rareHonors.length")
      HonorList(:honors="rareHonors")

      .py-2
    
    v-expand-transition
      div(v-show="!show")
        v-list.py-0(dense)
          Divider
          v-list-item(@click="show=true")
            v-list-item-title Show all honors
          Divider

    v-expand-transition
      div(v-show="show")
        v-tabs(v-model="tab", fixed-tabs)
          v-tab character
          v-tab achievement
          v-tab event
        v-tabs-items(v-model="tab")
          v-tab-item: HonorList(:honors="honors.filter(honor => $root.honorGroups[honor.groupId].honorType == 'character')")
          v-tab-item: HonorList(:honors="honors.filter(honor => $root.honorGroups[honor.groupId].honorType == 'achievement')")
          v-tab-item: HonorList(:honors="honors.filter(honor => $root.honorGroups[honor.groupId].honorType == 'event')")
        

</template>

<script>
import Divider from '@/components/Divider';
import HonorList from './HonorList';

export default {
  name: 'Honors',

  data() {
    return {
      show: false,
      tab: null,
    };
  },

  components: { HonorList, Divider },

  props: ['profile'],

  computed: {
    honors() {
      let honors = {};
      for (let honor of this.profile.userHonors) {
        let groupId = this.$root.honors[honor.honorId].groupId;
        honor.groupId = groupId;
        honor.honorRarityLevel = ['', 'low', 'middle', 'high', 'highest'].indexOf(this.$root.honors[honor.honorId].honorRarity);
        honors[groupId] = honor;
      }
      return Object.values(honors);
    },
    rareHonors() {
      let f = honor => honor.honorRarityLevel * 10 + honor.level;
      return this.honors.filter(honor => f(honor) >= 23).sort((b, a) => (f(a) - f(b)));
    },
  }
};
</script>