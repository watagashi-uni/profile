<template lang="pug">
  div
    v-list-item(dense)
      v-list-item-title 关注列表
      v-list-item-action: v-btn(icon, @click="onRefresh"): v-icon mdi-refresh
      v-list-item-action: v-btn(icon, @click="editing=!editing"): v-icon mdi-playlist-edit
    v-expand-transition
      v-list.py-0(dense, v-show="editing")
        v-divider
        .d-flex
          v-list-item.pr-0(@click="$refs['import-file'].click()")
            v-icon mdi-import
            v-list-item-title 导入
          v-divider(vertical)
          v-list-item.pr-0(@click="onExport")
            v-icon mdi-export
            v-list-item-title 导出
          v-divider(vertical)
          v-list-item.pr-0(@click="onAll")
            v-icon mdi-select-all
            v-list-item-title 全选
          v-divider(vertical)
          v-list-item.pr-0(@click="onDelete")
            v-icon mdi-delete
            v-list-item-title 删除
        input(ref="import-file", style="display: none", type="file", accept=".json", @change="onImport")
    Rankings(:rankings="followings", :editing="editing", ref="following-list", showEvent)
</template>

<script>
import Rankings from './Rankings';

import FileSaver from 'file-saver';
import { set, del } from 'idb-keyval';

export default {
  name: 'Followings',

  props: ['followings'],

  components: { Rankings },

  data() {
    return {
      editing: false,
    };
  },

  methods: {
    onAll() {
      if (this.$refs['following-list'].model.length == this.followings.length) {
        this.$refs['following-list'].model = [];
      } else {
        this.$refs['following-list'].model = this.followings.map((_, i) => i);
      }
    },
    onExport() {
      let model = this.$refs['following-list'].model.length ? this.$refs['following-list'].model : this.followings.map((_, i) => i);
      let users = model.map(x => this.followings[x]);
      FileSaver.saveAs(new Blob([JSON.stringify(users)]), 'profile.unipjsk.com的关注列表.json');
    },
    onImport(e) {
      let file = e.target.files[0];
      let fileReader = new FileReader();
      fileReader.readAsText(file);
      fileReader.onload = function () {
        Promise.all(JSON.parse(this.result).filter(user => user.user && user.userProfile).map(user => set(user.userProfile.userId, user))).then(() => {
          window.location.reload();
        });
      };
    },
    onDelete() {
      let model = this.$refs['following-list'].model;
      if (model.length == 0) return;
      let users = model.map(x => this.followings[x]);
      Promise.all(users.map(user => del(user.userProfile.userId))).then(() => {
        window.location.reload();
      });
    },
    onRefresh() {
      window.location.reload();
    },
  }
};
</script>
