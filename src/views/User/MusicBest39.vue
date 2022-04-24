<template lang="pug">
  div
    Divider
    v-list.py-0(dense)
      template(v-for="_, i in Math.ceil(best39.length / 3)")
        Divider(v-if="i")
        .d-flex
          template(v-for="_, j in 3")
            v-divider(vertical, v-if="j")
            div(style="width: calc((100% - 2px) / 3)")
              div(v-if="i*3+j < best39.length")
                v-list-item(:key="`best-39-${best39[i*3+j].musicId}-${best39[i*3+j].musicDifficulty}`")
                  v-list-item-avatar(tile)
                    v-img(:src="`${$sekai.assetHost}/music/jacket/${$db.musics[best39[i*3+j].musicId].assetbundleName}/${$db.musics[best39[i*3+j].musicId].assetbundleName}.png`")
                  v-list-item-content(style="overflow: visible")
                    v-list-item-title
                      span # {{i*3+j+1}}
                    v-list-item-subtitle.mr-n2(style="overflow: visible; margin-left: min(0px, 50% - 24px)")
                      MusicDifficultyStatus(:status="best39[i*3+j]", style="width: calc(60% + 19.6px)")
                v-list-item.mt-n2
                  v-list-item-content
                    v-list-item-title {{$db.musics[best39[i*3+j].musicId].title}}
                    v-list-item-action-text
                      template(v-if="best39[i*3+j].rank == 'P'")
                        span {{($db.musicDifficulties[best39[i*3+j].musicId][best39[i*3+j].musicDifficulty].playLevel + ($db.musicDifficulties[best39[i*3+j].musicId][best39[i*3+j].musicDifficulty].fullPerfectAdjust || 0)).toFixed(1)}}
                        span  → 
                      template(v-if="best39[i*3+j].rank == 'F'")
                        span {{($db.musicDifficulties[best39[i*3+j].musicId][best39[i*3+j].musicDifficulty].playLevel + ($db.musicDifficulties[best39[i*3+j].musicId][best39[i*3+j].musicDifficulty].fullComboAdjust || 0)).toFixed(1)}}
                        span  → 
                      template(v-if="best39[i*3+j].rank == 'C'")
                        span {{($db.musicDifficulties[best39[i*3+j].musicId][best39[i*3+j].musicDifficulty].playLevel + ($db.musicDifficulties[best39[i*3+j].musicId][best39[i*3+j].musicDifficulty].playLevelAdjust || 0)).toFixed(1)}}
                        span  → 
                      span {{Math.round(best39[i*3+j].r)}}
    Divider
</template>

<script>
import Divider from '@/components/Divider';

import MusicDifficultyStatus from './MusicDifficultyStatus';

export default {
  name: 'MusicBest39',

  props: ['best39'],

  components: { Divider, MusicDifficultyStatus },
};
</script>