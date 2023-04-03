<template lang="pug">
  v-list.py-0(dense)
    Divider
    template(v-for="(rankMatch, i) in Object.values($db.rankMatchSeasons).map(rankMatchSeason => [rankMatchSeason, profile.userRankMatchSeasons.find(it => it.rankMatchSeasonId === rankMatchSeason.id)]).reverse()")
      Divider(inset=112, v-if="i")
      v-lazy(height=58)
        v-list-item(:key="`rank-matches-${rankMatch[0].id}`")
          //- .my-2.mr-4(style="height: 40px; width: 80px")
          //-   v-img(:src="`${$sekai.assetHost}/rank_live/logo/${rankMatch.assetbundleName}/main/main.png`")
          v-list-item-content
            v-list-item-title
              .d-block(style="height: 24px; width: 144px")
                v-img(:src="`${$sekai.assetHost}/rank_live/logo/${rankMatch[0].assetbundleName}/main/main.png`")
            v-list-item-subtitle
              //- span {{rankMatch.name}}
              | {{new Date(rankMatch[0].startAt).toLocaleDateString()}}
              | ~
              | {{new Date(rankMatch[0].aggregatedAt).toLocaleDateString()}}
          v-list-item-action(v-if="rankMatch[1] === undefined")
            v-list-item-action-text ...
          v-list-item-action(v-else-if="!rankMatch[1].playCount")
            v-list-item-action-text
              | 胜利 0
              | |
              | 平局 0
              | |
              | 失败 0
          v-list-item-action(v-else)
            v-list-item-title.align-self-end
              | # {{rankMatch[1].rank}}
              | |
              | {{$db.rankMatchGrades[$db.rankMatchTiers[rankMatch[1].rankMatchTierId].rankMatchGradeId].name}}・{{$db.rankMatchClasses[$db.rankMatchTiers[rankMatch[1].rankMatchTierId].rankMatchClassId].name}}
              | ({{rankMatch[1].tierPoint}}{{$db.rankMatchTiers[rankMatch[1].rankMatchTierId].point&&'/'}}{{$db.rankMatchTiers[rankMatch[1].rankMatchTierId].point}})
            v-list-item-action-text
              | 胜利 {{rankMatch[1].winCount}}
              | |
              | 平局 {{rankMatch[1].drawCount}}
              | |
              | 失败 {{rankMatch[1].loseCount-rankMatch[1].penaltyCount}}+{{rankMatch[1].penaltyCount}}

    Divider
</template>

<script>
import Divider from '@/components/Divider';

export default {
  name: 'RankMatches',

  props: ['profile'],

  components: { Divider },
};
</script>
