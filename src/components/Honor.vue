<template lang="pug">
  div
    div(:style="style")
      slot
</template>

<script>
export default {
  name: 'Honor',

  props: ['id', 'level'],

  computed: {
    honor() {
      return this.$root.honors[this.id];
    },
    honorGroup() {
      return this.$root.honorGroups[this.honor.groupId];
    },
    style() {
      let images = [], sizes = [], positions = [];

      let rarityLevel = ['', 'low', 'middle', 'high', 'highest'].indexOf(this.honor.honorRarity);
      if (rarityLevel) {
        images.push(`url(${require(`@/assets/frame_degree/frame_degree_m_${rarityLevel}.png`)})`);
        sizes.push('100% 100%');
        positions.push('center');
      }

      if (this.honorGroup.honorType == 'character') {
        images.push(`url(${this.$assets()}/honor/${this.honor.assetbundleName}/degree_main.png)`);
        sizes.push('100% 100%');
        positions.push('center');
      }

      if (this.honorGroup.honorType == 'achievement') {
        images.push(`url(${this.$assets()}/honor/${this.honor.assetbundleName}/degree_main.png)`);
        sizes.push('100% 100%');
        positions.push('center');
      }

      if (this.honorGroup.honorType == 'event') {
        if (this.honorGroup.backgroundAssetbundleName) {
          images.push(`url(${this.$assets()}/honor/${this.honor.assetbundleName}/rank_main.png)`);
          sizes.push('calc(150% / 3.80) calc(78% / 0.80)');
          positions.push('calc(190% / 2.30) center');

          images.push(`url(${this.$assets()}/honor/${this.honorGroup.backgroundAssetbundleName}/degree_main.png)`);
          sizes.push('100% 100%');
          positions.push('center');
        } else {
          images.push(`url(${this.$assets()}/honor/${this.honor.assetbundleName}/rank_main.png)`);
          sizes.push('calc(150% / 3.80) calc(78% / 0.80)');
          positions.push('calc(190% / 2.30) center');

          images.push(`url(${this.$assets()}/honor/${this.honor.assetbundleName}/degree_main.png)`);
          sizes.push('100% 100%');
          positions.push('center');
        }
      }

      return {
        'height': '40px',
        'width': '190px',
        'background-image': images.join(','),
        'background-size': sizes.join(','),
        'background-position': positions.join(','),
      };
    }
  }
}
</script>