<template lang="pug">
  div
    v-list.py-0.print(dense, ref="best39")
      Divider
      template(v-for="_, i in Math.ceil(best39.length / 3)")
        Divider(v-if="i")
        .d-flex
          template(v-for="_, j in 3")
            v-divider(vertical, v-if="j")
            div(style="width: calc((100% - 2px) / 3)")
              div(v-if="i*3+j < best39.length")
                v-list-item(:key="`best-39-${best39[i*3+j].musicId}-${best39[i*3+j].musicDifficulty}`")
                  v-list-item-avatar(tile)
                    v-img(:src="`${$sekai.assetHost}/thumbnail/music_jacket/${$db.musics[best39[i*3+j].musicId].assetbundleName}.png`")
                  v-list-item-content(style="overflow: visible")
                    v-list-item-title
                      span # {{i*3+j+1}}
                    v-list-item-subtitle.mr-n2(style="overflow: visible; margin-left: min(0px, 50% - 24px)")
                      MusicDifficultyStatus(:status="best39[i*3+j]", style="width: calc(60% + 19.6px)")
                v-list-item.mt-n2(style="height: 47px")
                  v-list-item-content.py-0.my-auto
                    v-list-item-title {{$db.musics[best39[i*3+j].musicId].title}}
                    v-list-item-action-text
                      template(v-if="best39[i*3+j].rank == 'P'")
                        template(v-if="$db.musicDifficulties[best39[i*3+j].musicId][best39[i*3+j].musicDifficulty].fullPerfectAdjust")
                          span {{($db.musicDifficulties[best39[i*3+j].musicId][best39[i*3+j].musicDifficulty].playLevel + $db.musicDifficulties[best39[i*3+j].musicId][best39[i*3+j].musicDifficulty].fullPerfectAdjust).toFixed(1)}}
                        template(v-else)
                          span {{$db.musicDifficulties[best39[i*3+j].musicId][best39[i*3+j].musicDifficulty].playLevel}} ?
                      template(v-if="best39[i*3+j].rank == 'F'")
                        template(v-if="$db.musicDifficulties[best39[i*3+j].musicId][best39[i*3+j].musicDifficulty].fullComboAdjust")
                          span {{($db.musicDifficulties[best39[i*3+j].musicId][best39[i*3+j].musicDifficulty].playLevel + $db.musicDifficulties[best39[i*3+j].musicId][best39[i*3+j].musicDifficulty].fullComboAdjust).toFixed(1)}}
                        template(v-else)
                          span {{$db.musicDifficulties[best39[i*3+j].musicId][best39[i*3+j].musicDifficulty].playLevel}} ?
                      template(v-if="best39[i*3+j].rank == 'C'")
                        template(v-if="$db.musicDifficulties[best39[i*3+j].musicId][best39[i*3+j].musicDifficulty].playLevelAdjust")
                          span {{($db.musicDifficulties[best39[i*3+j].musicId][best39[i*3+j].musicDifficulty].playLevel + $db.musicDifficulties[best39[i*3+j].musicId][best39[i*3+j].musicDifficulty].playLevelAdjust).toFixed(1)}}
                        template(v-else)
                          span {{$db.musicDifficulties[best39[i*3+j].musicId][best39[i*3+j].musicDifficulty].playLevel}} ?
                      span  → 
                      span {{Math.round(best39[i*3+j].r)}}
      Divider
    
    .py-2
    .px-4
      v-btn(block, @click="$root.$emit('print')") download image

</template>

<script>
import Divider from '@/components/Divider';

import MusicDifficultyStatus from './MusicDifficultyStatus';

export default {
  name: 'MusicBest39',

  props: ['best39'],

  components: { Divider, MusicDifficultyStatus },

  mounted() {
    this.$root.$emit('saveComponent', 'best39', this.$refs.best39);
  }
};
</script>