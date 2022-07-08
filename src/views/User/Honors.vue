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
          v-tab: v-icon mdi-heart
          v-tab: v-icon mdi-crown
          v-tab: v-icon mdi-calendar-text
          v-tab: v-icon mdi-heart-multiple
        v-tabs-items(touchless, v-model="tab")
          v-tab-item: HonorList(:honors="honors.filter(honor => honor.type == 'character')")
          v-tab-item: HonorList(:honors="honors.filter(honor => honor.type == 'achievement')")
          v-tab-item: HonorList(:honors="honors.filter(honor => honor.type == 'event')")
          v-tab-item: HonorList(:honors="honors.filter(honor => honor.type == 'bonds')")
            //- Divider
            //- v-list.py-0(dense)
            //-   v-list-item
            //-     v-list-item-subtitle TODO
            //- Divider

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
        let groupId = this.$db.honors[honor.honorId].groupId;
        honor.type = this.$db.honorGroups[groupId].honorType;
        honor.groupId = groupId;
        honor.honorRarityLevel = ['', 'low', 'middle', 'high', 'highest'].indexOf(this.$db.honors[honor.honorId].honorRarity);
        honors[groupId] = honor;
      }
      let bondsHonors = {};
      for (let bondsHonor of this.profile.userBondsHonors) {
        let groupId = this.$db.bondsHonors[bondsHonor.bondsHonorId].bondsGroupId;
        bondsHonor.honorId = bondsHonor.bondsHonorId;
        bondsHonor.type = 'bonds';
        bondsHonor.honorRarityLevel = ['', 'low', 'middle', 'high', 'highest'].indexOf(this.$db.bondsHonors[bondsHonor.bondsHonorId].honorRarity);
        bondsHonors[groupId] = bondsHonor;
      }

      return [
        ...Object.values(honors),
        ...Object.values(bondsHonors),
      ];
    },
    rareHonors() {
      let f = honor => honor.honorRarityLevel * 10 + honor.level;
      return this.honors.filter(honor => f(honor) >= 23).sort((b, a) => (f(a) - f(b)));
    },
  }
};
</script>