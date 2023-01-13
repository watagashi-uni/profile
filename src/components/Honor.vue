<template lang="pug">
  div(:style="{height: `${size}px`}")
      svg(v-if="honor", :viewBox="`0 0 ${isMain ? 380 : 180} 80`", :height="size", xmlns="http://www.w3.org/2000/svg", xmlns:xlink="http://www.w3.org/1999/xlink")
        template(v-if="honorGroup.honorType == 'character' || honorGroup.honorType == 'achievement'")
          image(x=0, y=0, :width="isMain ? 380 : 180", height=80, 
            :href="`${$sekai.assetHost}/honor/${honor.assetbundleName}/degree_${isMain ? 'main' : 'sub'}.png`")
  
        template(v-if="honorGroup.honorType == 'event' && honorGroup.backgroundAssetbundleName")
          image(x=0, y=0, :width="isMain ? 380 : 180", height=80,
            :href="`${this.$sekai.assetHost}/honor/${this.honorGroup.backgroundAssetbundleName}/degree_${this.isMain ? 'main' : 'sub'}.png`")
        
        template(v-if="honorGroup.honorType == 'event' && !honorGroup.backgroundAssetbundleName")
          image(x=0, y=0, :width="isMain ? 380 : 180", height=80,
            :href="`${this.$sekai.assetHost}/honor/${this.honor.assetbundleName}/degree_${this.isMain ? 'main' : 'sub'}.png`")
  
        template(v-if="honorGroup.honorType == 'rank_match' && honorGroup.backgroundAssetbundleName")
          image(x=0, y=0, :width="isMain ? 380 : 180", height=80,
            :href="`${this.$sekai.assetHost}/rank_live/honor/${this.honorGroup.backgroundAssetbundleName}/degree_${this.isMain ? 'main' : 'sub'}.png`")
  
        template
          image(x=0, y=0, :width="isMain ? 380 : 180", height=80,
            :href="require(`@/sprites/frame_degree_${isMain ? 'm' : 's'}_${rarityLevel}.png`)")
  
        template(v-if="honorGroup.honorType == 'event' && honorGroup.backgroundAssetbundleName")
          image(:x="isMain ? 190 : 30", :y="isMain ? 1 : 38", :width="isMain ? 150 : 120", :height="isMain ? 78 : 38",
            :href="`${$sekai.assetHost}/honor/${honor.assetbundleName}/rank_${isMain ? 'main' : 'sub'}.png`")
  
        template(v-if="honorGroup.honorType == 'rank_match'")
          image(:x="isMain ? 190 : 5", :y="isMain ? 1 : 40", :width="isMain ? 180 : 175", :height="isMain ? 78 : 39",
            :href="`${$sekai.assetHost}/rank_live/honor/${honor.assetbundleName}/${isMain ? 'main' : 'sub'}.png`")
  
        template(v-if="honor.levels.length > 1")
          image(:x="34 + 16 * i", y=64, width=16, height=16,
            v-for="i in level < 5 ? level : 5", 
            :href="require('@/sprites/icon_degreeLv.png')")
  
        template(v-if="level <= 10")
          image(:x="34 + 16 * i", y=64, width=16, height=16,
            v-for="i in level < 5 ? 0 : level - 5", 
            :href="require('@/sprites/icon_degreeLv6.png')")
  
        template(v-if="level > 10")
          image(:x="34 + 16 * i", y=64, width=16, height=16,
            v-for="i in level < 15 ? 0 : level - 15", 
            :href="require('@/sprites/icon_degreeLv6.png')")
  
      svg(v-else-if="bondsHonor", :viewBox="`0 0 ${isMain ? 380 : 180} 80`", :height="size", xmlns="http://www.w3.org/2000/svg", xmlns:xlink="http://www.w3.org/1999/xlink")
        template
          defs
            path(id="left-main", d="M 190 1 L 190 79 L 50 79 A 38 38 0 0 1 50 1 Z")
            path(id="left-sub", d="M 90 1 L 90 79 L 50 79 A 38 38 0 0 1 50 1 Z")
            path(id="right-main", d="M 190 1 L 190 79 L 330 79 A 38 38 0 0 0 330 1 Z")
            path(id="right-sub", d="M 90 1 L 90 79 L 130 79 A 38 38 0 0 0 130 1 Z")
  
            mask(id="left-main-mask"): use(xlink:href="#left-main", fill="white")
            mask(id="left-sub-mask"): use(xlink:href="#left-sub", fill="white")
            mask(id="right-main-mask"): use(xlink:href="#right-main", fill="white")
            mask(id="right-sub-mask"): use(xlink:href="#right-sub", fill="white")
  
          use(:xlink:href="isMain ? '#left-main' : '#left-sub'", :fill="gameCharacterUnit1.colorCode")
          use(:xlink:href="isMain ? '#right-main' : '#right-sub'", :fill="gameCharacterUnit2.colorCode")
  
          image(x=0, y=0, :width="isMain ? 380 : 180", height=80,
            :href="require(`@/sprites/degree_bgTexture_${isMain ? 'main' : 'sub'}.png`)")
  
          image(:x="isMain ? 0 : 0", :y="isMain ? -42 : -22", :width="isMain ? 160 : 120", :height="isMain ? 136 : 102", :mask="isMain ? 'url(#left-main-mask)' : 'url(#left-sub-mask)'"
            :href="`${this.$sekai.assetHost}/bonds_honor/character/chr_sd_${('0'+gameCharacterUnit1.gameCharacterId).slice(-2)}_01/chr_sd_${('0'+gameCharacterUnit1.gameCharacterId).slice(-2)}_01.png`")
  
          image(:x="isMain ? 220 : 60", :y="isMain ? -42 : -22", :width="isMain ? 160 : 120", :height="isMain ? 136 : 102",  :mask="isMain ? 'url(#right-main-mask)' : 'url(#right-sub-mask)'"
            :href="`${this.$sekai.assetHost}/bonds_honor/character/chr_sd_${('0'+gameCharacterUnit2.gameCharacterId).slice(-2)}_01/chr_sd_${('0'+gameCharacterUnit2.gameCharacterId).slice(-2)}_01.png`")
  
          image(x=0, y=0, width=380, height=80, v-if="isMain",
          :href="`${this.$sekai.assetHost}/bonds_honor/word/${$db.bondsHonorWords[bondsHonorWordId || id].assetbundleName}_01/${$db.bondsHonorWords[bondsHonorWordId || id].assetbundleName}_01.png`")
  
          image(x=0, y=0, :width="isMain ? 380 : 180", height=80, 
            :href="require(`@/sprites/frame_degree_${isMain ? 'm' : 's'}_${rarityLevel}.png`)")
  
        template(v-if="bondsHonor.levels.length > 1")
          image(:x="34 + 16 * i", y=64, width=16, height=16,
            v-for="i in level < 5 ? level : 5", 
            :href="require('@/sprites/icon_degreeLv.png')")
  
          image(:x="34 + 16 * i", y=64, width=16, height=16,
            v-for="i in level < 5 ? 0 : level - 5", 
            :href="require('@/sprites/icon_degreeLv6.png')")
  
      svg(v-else, :viewBox="`0 0 ${isMain ? 380 : 180} 80`", :height="size", xmlns="http://www.w3.org/2000/svg", xmlns:xlink="http://www.w3.org/1999/xlink")
        template
          image(x=0, y=0, :width="isMain ? 380 : 180", height=80, 
            :href="require(`@/sprites/frame_degree_${isMain ? 'm' : 's'}_${1}.png`)")
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
      bondsHonorViewType: {},
      bondsHonorWordId: {},
    },
  
    computed: {
      isMain() {
        return !this.sub;
      },
      isSub() {
        return this.sub;
      },
      honor() {
        return this.type == 'normal' && this.$db.honors[this.id];
      },
      honorGroup() {
        return this.$db.honorGroups[this.honor.groupId];
      },
      bondsHonor() {
        return this.type == 'bonds' && this.$db.bondsHonors[this.id];
      },
      gameCharacterUnit1() {
        return this.bondsHonorViewType != 'reverse' ?
          this.$db.gameCharacterUnits[this.bondsHonor.gameCharacterUnitId1] :
          this.$db.gameCharacterUnits[this.bondsHonor.gameCharacterUnitId2];
      },
      gameCharacterUnit2() {
        return this.bondsHonorViewType != 'reverse' ?
          this.$db.gameCharacterUnits[this.bondsHonor.gameCharacterUnitId2] :
          this.$db.gameCharacterUnits[this.bondsHonor.gameCharacterUnitId1];
      },
      rarityLevel() {
        return ['', 'low', 'middle', 'high', 'highest'].indexOf((this.honor || this.bondsHonor).honorRarity);
      },
      style() {
        let height = this.size;
        let width = this.isMain ? this.size * 190 / 40 : this.size * 90 / 40;
  
        let images = [], sizes = [], positions = [];
  
        if (!this.id || !this.honor) {
          images.push(`url(${require(`@/sprites/degree_${this.isMain ? 'm' : 's'}_empty.png`)})`);
          sizes.push('100% 100%');
          positions.push('center');
        } else {
          let rarityLevel = ['', 'low', 'middle', 'high', 'highest'].indexOf(this.honor.honorRarity);
  
          if (this.level && this.honor.levels.length > 1) {
            for (let i = 0; i < this.level; i++) {
              images.push(`url(${require('@/sprites/icon_degreeLv.png')})`);
              sizes.push(this.isMain ? 'calc(16% / 3.80) calc(16% / 0.80)' : 'calc(16% / 1.80) calc(16% / 0.80)');
              positions.push(this.isMain ? `calc(${50 + 16 * i}% / 3.64) 100%` : `calc(${50 + 16 * i}% / 1.64) 100%`);
            }
          }
  
          if (rarityLevel) {
            images.push(`url(${require(`@/sprites/frame_degree_${this.isMain ? 'm' : 's'}_${rarityLevel}.png`)})`);
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
  
          if (this.honorGroup.honorType == 'rank_match') {
            if (this.honorGroup.backgroundAssetbundleName) {
              images.push(`url(${this.$sekai.assetHost}/rank_live/honor/${this.honor.assetbundleName}/${this.isMain ? 'main' : 'sub'}.png)`);
              sizes.push(this.isMain ? 'calc(150% / 3.80) calc(78% / 0.80)' : 'calc(120% / 1.80) calc(38% / 0.80)');
              positions.push(this.isMain ? 'calc(190% / 2.30) center' : 'center calc(38% / 0.40)');
  
              images.push(`url(${this.$sekai.assetHost}/rank_live/honor/${this.honorGroup.backgroundAssetbundleName}/degree_${this.isMain ? 'main' : 'sub'}.png)`);
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