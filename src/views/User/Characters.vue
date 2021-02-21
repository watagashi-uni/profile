<template lang="pug">
  div
    v-list.py-0(dense)
      Divider
      .d-flex.px-4.py-2
        div(v-for="i in 5", :key="`characters-deck-${i}`", style="width: 20%")
          v-img(:src="`${$assets()}/thumbnail/chara_rip/${$root.cards[profile.userDecks[0][`member${i}`]].assetbundleName}_${profile.userCards.find(card => card.cardId == profile.userDecks[0][`member${i}`]).defaultImage == 'special_training' ? 'after_training' : 'normal'}.png`")
      Divider

    .py-2

    v-list-item(dense)
      v-list-item-title Character Rank
    v-list.py-0(dense)
      Divider
      v-row.px-2.py-1.ma-0
        v-col.px-2.py-1(v-for="character in profile.userCharacters", :key="`characters-rank-${character.characterId}`", cols=3)
          v-chip(pill, style="width: 100%; text-align: center")
            v-avatar(left)
              v-img(:src="require(`@/assets/chara/chr_ts_${character.characterId}.png`)")
            span {{character.characterRank}}
      Divider
    
    .py-2

    v-list-item(dense)
      v-list-item-title Challenge Stage
    v-list.py-0(dense)
      Divider
      v-row.px-2.py-1.ma-0
        v-col.px-2.py-1(v-for="character in $root.gameCharacters", :key="`characters-challenge-${character.id}`", cols=3)
          v-chip(pill, style="width: 100%; text-align: center")
            v-avatar(left)
              v-img(:src="require(`@/assets/chara/chr_ts_${character.id}.png`)")
            span {{profile.userChallengeLiveSoloStages.filter(stage => stage.characterId == character.id).map(stage => stage.rank).reduce((x, y) => x > y ? x : y, '')}}
      Divider
    
</template>

<script>
import Divider from '@/components/Divider';

export default {
  name: 'Characters',

  props: ['profile'],

  components: { Divider },
};
</script>