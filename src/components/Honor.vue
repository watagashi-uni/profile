<template lang="pug">
  div
    div(v-if="type=='normal'", :style="style")
      slot
    div(v-else-if="type=='bonds'", :style="style")
      | WIP
      slot
</template>

<script>
export default {
  name: 'Honor',

  props: {
    id: {},
    level: {},
    size: { default: 40 },
    type: { default: 'normal' },
    sub: { default: false, type: Boolean },
  },

  computed: {
    isMain() {
      return !this.sub;
    },
    honor() {
      return this.$db.honors[this.id];
    },
    honorGroup() {
      return this.$db.honorGroups[this.honor.groupId];
    },
    style() {
      let height = this.size;
      let width = this.isMain ? this.size * 190 / 40 : this.size * 90 / 40;

      let images = [], sizes = [], positions = [];

      if (!this.id || !this.honor) {
        images.push(`url(${require(`@/assets/degree/degree_${this.isMain ? 'm' : 's'}_empty.png`)})`);
        sizes.push('100% 100%');
        positions.push('center');
      } else {
        let rarityLevel = ['', 'low', 'middle', 'high', 'highest'].indexOf(this.honor.honorRarity);

        if (this.level && this.honor.levels.length > 1) {
          for (let i = 0; i < this.level; i++) {
            images.push(`url(${require('@/assets/degree/icon_degreeLv.png')})`);
            sizes.push(this.isMain ? 'calc(16% / 3.80) calc(16% / 0.80)' : 'calc(16% / 1.80) calc(16% / 0.80)');
            positions.push(this.isMain ? `calc(${50 + 16 * i}% / 3.64) 100%` : `calc(${50 + 16 * i}% / 1.64) 100%`);
          }
        }

        if (rarityLevel) {
          images.push(`url(${require(`@/assets/degree/frame_degree_${this.isMain ? 'm' : 's'}_${rarityLevel}.png`)})`);
          sizes.push('100% 100%');
          positions.push('center');
        }

        if (this.honorGroup.honorType == 'character') {
          images.push(`url(${this.$sekai.assetHost}/honor/${this.honor.assetbundleName}/degree_${this.isMain ? 'main' : 'sub'}.png)`);
          sizes.push('100% 100%');
          positions.push('center');
        }

        if (this.honorGroup.honorType == 'achievement') {
          images.push(`url(${this.$sekai.assetHost}/honor/${this.honor.assetbundleName}/degree_${this.isMain ? 'main' : 'sub'}.png)`);
          sizes.push('100% 100%');
          positions.push('center');
        }

        if (this.honorGroup.honorType == 'event') {
          if (this.honorGroup.backgroundAssetbundleName) {
            images.push(`url(${this.$sekai.assetHost}/honor/${this.honor.assetbundleName}/rank_${this.isMain ? 'main' : 'sub'}.png)`);
            sizes.push(this.isMain ? 'calc(150% / 3.80) calc(78% / 0.80)' : 'calc(120% / 1.80) calc(38% / 0.80)');
            positions.push(this.isMain ? 'calc(190% / 2.30) center' : 'center calc(38% / 0.40)');

            images.push(`url(${this.$sekai.assetHost}/honor/${this.honorGroup.backgroundAssetbundleName}/degree_${this.isMain ? 'main' : 'sub'}.png)`);
            sizes.push('100% 100%');
            positions.push('center');
          } else {
            images.push(`url(${this.$sekai.assetHost}/honor/${this.honor.assetbundleName}/rank_${this.isMain ? 'main' : 'sub'}.png)`);
            sizes.push(this.isMain ? 'calc(150% / 3.80) calc(78% / 0.80)' : 'calc(120% / 1.80) calc(38% / 0.80)');
            positions.push(this.isMain ? 'calc(190% / 2.30) center' : 'center calc(38% / 0.40)');

            images.push(`url(${this.$sekai.assetHost}/honor/${this.honor.assetbundleName}/degree_${this.isMain ? 'main' : 'sub'}.png)`);
            sizes.push('100% 100%');
            positions.push('center');
          }
        }
      }

      return {
        'height': `${height}px`,
        'width': `${width}px`,
        'background-image': images.join(','),
        'background-size': sizes.join(','),
        'background-position': positions.join(','),
      };
    }
  }
};
</script>