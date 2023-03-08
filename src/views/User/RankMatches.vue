<template lang="pug">
  v-list.py-0(dense)
    Divider
    template(v-for="rankMatch, i in Object.values($db.rankMatchSeasons).reverse()")
      Divider(inset=112, v-if="i")
      v-lazy(height=58)
        v-list-item(:key="`rank-matches-${rankMatch.id}`")
          //- .my-2.mr-4(style="height: 40px; width: 80px")
          //-   v-img(:src="`${$sekai.assetHost}/rank_live/logo/${rankMatch.assetbundleName}/main/main.png`")
          v-list-item-content
            v-list-item-title
              .d-block(style="height: 24px; width: 144px")
                v-img(:src="`${$sekai.assetHost}/rank_live/logo/${rankMatch.assetbundleName}/main/main.png`")
            v-list-item-subtitle
              //- span {{rankMatch.name}}
              | {{new Date(rankMatch.startAt).toLocaleDateString()}}
              | ~
              | {{new Date(rankMatch.aggregatedAt).toLocaleDateString()}}
          v-list-item-action(v-if="rankings[rankMatch.id] === null")
            v-list-item-action-text ...
          v-list-item-action(v-else-if="!rankings[rankMatch.id].score")
            v-list-item-action-text
              | 胜利 0
              | |
              | 平局 0
              | |
              | 失败 0
          v-list-item-action(v-else)
            v-list-item-title.align-self-end
              | # {{rankings[rankMatch.id].rank}}
              | |
              | {{$db.rankMatchGrades[$db.rankMatchTiers[rankings[rankMatch.id].userRankMatchSeason.rankMatchTierId].rankMatchGradeId].name}}・{{$db.rankMatchClasses[$db.rankMatchTiers[rankings[rankMatch.id].userRankMatchSeason.rankMatchTierId].rankMatchClassId].name}}
              | ({{rankings[rankMatch.id].userRankMatchSeason.tierPoint}}{{$db.rankMatchTiers[rankings[rankMatch.id].userRankMatchSeason.rankMatchTierId].point&&'/'}}{{$db.rankMatchTiers[rankings[rankMatch.id].userRankMatchSeason.rankMatchTierId].point}})
            v-list-item-action-text
              | 胜利 {{rankings[rankMatch.id].userRankMatchSeason.winCount}}
              | |
              | 平局 {{rankings[rankMatch.id].userRankMatchSeason.drawCount}}
              | |
              | 失败 {{rankings[rankMatch.id].userRankMatchSeason.loseCount-rankings[rankMatch.id].userRankMatchSeason.penaltyCount}}+{{rankings[rankMatch.id].userRankMatchSeason.penaltyCount}}

    Divider
</template>

<script>
import Divider from '@/components/Divider';

export default {
  name: 'RankMatches',

  props: ['profile', 'rankings'],

  components: { Divider },
};
</script>
