<template lang="pug">
  v-list.py-0(dense)
    Divider
    template(v-for="music, i in sortedMusics")
      Divider(inset=16, v-if="i")
      v-list-item(:key="`musics-${music.musicId}`")
        v-list-item-avatar(tile)
          v-img(:src="`${$assets()}/music/jacket/${$root.musics[music.musicId].assetbundleName}_rip/${$root.musics[music.musicId].assetbundleName}.png`")
        v-list-item-content
          v-list-item-title {{$root.musics[music.musicId].title}}
          v-list-item-subtitle.d-flex
            MusicDifficultyStatus.pr-2(v-for="status in music.userMusicDifficultyStatuses", :key="`musics-difficulties-${status.musicDifficulty}`", :status="status", style="width: 20%")
    Divider
</template>

<script>
import Divider from '@/components/Divider';
import MusicDifficultyStatus from './MusicDifficultyStatus';

export default {
  name: 'Music',

  props: ['profile'],

  components: { Divider, MusicDifficultyStatus },

  computed: {
    sortedMusics() {
      return this.profile.userMusics;
    }
  }
};
</script>