<template lang="pug">
  v-app(style="font-family: Avenir")
    v-app-bar(app, color="secondary", dark, style="margin: 0 auto")
      v-btn(icon, to="/", v-if="$route.path != '/'")
        v-icon mdi-home

      v-toolbar-title Project Sekai Profile Modified Ver.

      v-spacer

      v-dialog(v-model="search", width=360)
        template(v-slot:activator="{on, attrs}")
          v-btn(icon, v-on="on", v-bind="attrs")
            v-icon mdi-magnify
        v-card
          v-card-title 搜索玩家ID
          v-card-text
            v-text-field(dense, v-model="input")
          v-card-actions
            v-btn(text, @click="search=false") 取消
            v-spacer
            v-btn(text, color="primary", @click="onSearch") 确定

    v-main(style="width: 100%; margin: 0 auto")
      .pa-8.text-center(v-if="databaseStatus.status!='ok'")
        v-progress-circular(indeterminate, color="primary")
        .pa-2.caption
          span 加载数据中...

      div(v-else)
        keep-alive
          router-view

      Print

    v-snackbar(v-model="snackbar", :timeout="-1")
      .text-center.mb-2 应用已更新。

      v-row.mx-n2.my-0
        v-col.px-2.py-0
          v-btn.px-0.mt-2(block, color="primary", outlined, @click="snackbar=false") 关闭
        v-col.px-2.py-0
          v-btn.px-0.mt-2(block, color="primary", outlined, @click="reload()")
            v-icon mdi-refresh
            span 刷新

</template>

<script>
import Print from './Print';

import { del } from 'idb-keyval';

export default {
  name: 'App',

  components: { Print },

  data() {
    return {
      ok: false,
      search: false,
      input: '',

      snackbar: false,

      databaseStatus: this.$sekai.databaseStatus,
    };
  },

  methods: {
    onSearch() {
      this.search = false;
      this.$router.push(`/user/${this.input}`);
    },
  },

  mounted() {
    this.$root.$on('applicationUpdated', () => {
      this.snackbar = true;
    });
    this.$root.$on('reloadDatabase', () => {
      del('pjsekai').then(() => {
        location.reload();
      });
    });
  },
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
.v-btn--active.no-active::before {
  opacity: 0 !important;
}
.v-slide-group__prev,
.v-slide-group__next {
  display: none !important;
}
.theme--dark.v-tabs-items {
  background-color: transparent !important;
}
.split {
  max-height: calc(100vh - 64px);
  overflow-y: scroll;
}
.split::-webkit-scrollbar,
body::-webkit-scrollbar {
  display: none;
}
</style>
