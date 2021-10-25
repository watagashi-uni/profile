<template lang="pug">
  v-app(style="font-family: Avenir")
    v-app-bar(app, color="secondary", dark, style="margin: 0 auto")
      v-btn(icon, to="/", v-if="$route.path != '/'")
        v-icon mdi-home

      v-toolbar-title Project Sekai Profile

      v-spacer

      v-dialog(v-model="search", width=360)
        template(v-slot:activator="{on, attrs}")
          v-btn(icon, v-on="on", v-bind="attrs")
            v-icon mdi-magnify
        v-card
          v-card-title Search Player ID
          v-card-text
            v-text-field(dense, v-model="input")
          v-card-actions
            v-btn(text, @click="search=false") Cancel
            v-spacer
            v-btn(text, color="primary", @click="onSearch") OK

    v-main(style="width: 100%; margin: 0 auto")
      .pa-8.text-center(v-if="!ok")
        v-progress-circular(indeterminate, color="primary")
        .pa-2.caption
          span Loading Database...

      div(v-else)
        keep-alive
          router-view
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',

  data: () => ({
    ok: false,
    search: false,
    input: '',
  }),

  methods: {
    onSearch() {
      this.search = false;
      this.$router.push(`/user/${this.input}`);
    },
  },

  mounted() {
    Promise.all([
      axios.get('https://database.pjsekai.moe/events.json').then(response => {
        let events = response.data;
        this.$root.events = {};
        for (let event of events) {
          this.$root.events[event.id] = event;
        }
      }),
      axios.get('https://database.pjsekai.moe/cards.json').then(response => {
        let cards = response.data;
        this.$root.cards = {};
        for (let card of cards) {
          this.$root.cards[card.id] = card;
        }
      }),
      axios.get('https://database.pjsekai.moe/gameCharacters.json').then(response => {
        let gameCharacters = response.data;
        this.$root.gameCharacters = {};
        for (let gameCharacter of gameCharacters) {
          this.$root.gameCharacters[gameCharacter.id] = gameCharacter;
        }
      }),
      axios.get('https://database.pjsekai.moe/honors.json').then(response => {
        let honors = response.data;
        this.$root.honors = {};
        for (let honor of honors) {
          this.$root.honors[honor.id] = honor;
        }
      }),
      axios.get('https://database.pjsekai.moe/honorGroups.json').then(response => {
        let honorGroups = response.data;
        this.$root.honorGroups = {};
        for (let honorGroup of honorGroups) {
          this.$root.honorGroups[honorGroup.id] = honorGroup;
        }
      }),
      axios.get('https://database.pjsekai.moe/musics.json').then(response => {
        let musics = response.data;
        this.$root.musics = {};
        for (let music of musics) {
          this.$root.musics[music.id] = music;
        }
      }),
      axios.get('https://database.pjsekai.moe/musicDifficulties.json').then(response => {
        let musicDifficulties = response.data;
        this.$root.musicDifficulties = {};
        for (let musicDifficulty of musicDifficulties) {
          if (!this.$root.musicDifficulties[musicDifficulty.musicId]) {
            this.$root.musicDifficulties[musicDifficulty.musicId] = {};
          }
          this.$root.musicDifficulties[musicDifficulty.musicId][musicDifficulty.musicDifficulty] = musicDifficulty;
        }
      }),
    ]).then(() => {
      this.ok = true;
    });
  }
};
</script>

<style>
.v-list-item__action {
  min-width: 0 !important;
  margin: auto 0 auto 16px !important;
}
.v-tab {
  font-size: 0.8125rem !important;
}
.v-tabs-items {
  background-color: #00000000 !important;
}
</style>
