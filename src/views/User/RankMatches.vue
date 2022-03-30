<template lang="pug">
  v-list.py-0(dense)
    Divider
    template(v-for="rankMatch, i in Object.values($db.rankMatchSeasons).reverse()")
      Divider(inset=112, v-if="i")
      v-list-item(:key="`rank-matches-${rankMatch.id}`")
        //- .my-2.mr-4(style="height: 40px; width: 80px")
        //-   v-img(:src="`${$sekai.assetHost}/rank_live/logo/${rankMatch.assetbundleName}/main/main.png`")
        v-list-item-content
          v-list-item-title
            .d-block(style="height: 24px; width: 144px")
              v-img(:src="`${$sekai.assetHost}/rank_live/logo/${rankMatch.assetbundleName}/main/main.png`")
          v-list-item-title
            span {{rankMatch.name}} 
            v-list-item-action-text
              | {{new Date(rankMatch.startAt).toLocaleDateString()}}
              | ~
              | {{new Date(rankMatch.aggregatedAt).toLocaleDateString()}}
        v-list-item-action(v-if="rankings[rankMatch.id] === null")
          v-list-item-action-text ...
        v-list-item-action(v-else-if="!rankings[rankMatch.id].score")
          v-list-item-action-text
            | Win 0
            | |
            | Draw 0
            | |
            | Lose 0
        v-list-item-action(v-else)
          v-list-item-title.align-self-end
            | {{$db.rankMatchGrades[$db.rankMatchTiers[rankings[rankMatch.id].userRankMatchSeason.rankMatchTierId].rankMatchGradeId].name}}
            | -
            | {{$db.rankMatchClasses[$db.rankMatchTiers[rankings[rankMatch.id].userRankMatchSeason.rankMatchTierId].rankMatchClassId].name}}
            | -
            | {{rankings[rankMatch.id].userRankMatchSeason.tierPoint}}/{{$db.rankMatchTiers[rankings[rankMatch.id].userRankMatchSeason.rankMatchTierId].point}}
          v-list-item-action-text
            | Win {{rankings[rankMatch.id].userRankMatchSeason.winCount}}
            | |
            | Draw {{rankings[rankMatch.id].userRankMatchSeason.drawCount}}
            | |
            | Lose {{rankings[rankMatch.id].userRankMatchSeason.loseCount}}

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