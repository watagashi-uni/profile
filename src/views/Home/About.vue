<template lang="pug">
  div
    Divider
    v-list.py-0(dense)
      User(:user="user")
      Divider(inset=72)

      v-list-item(href="", target="_blank")
        v-icon.ml-2.mr-6 mdi-code-braces
        v-list-item-content
          v-list-item-title 该网页为魔改版
          v-list-item-subtitle.text-wrap 官方API已不能查到详细信息

      Divider(inset=72)

      v-list-item(href="https://suite.unipjsk.com/", target="_blank")
        v-icon.ml-2.mr-6 mdi-upload
        v-list-item-content
          v-list-item-title 自行上传用户数据
          v-list-item-subtitle.text-wrap 上传数据后才能查询。需勾选“公开API读取”

      Divider(inset=72)

      v-list-item(href="https://twitter.com/nilcric_pjsekai", target="_blank")
        v-icon.ml-2.mr-6 mdi-twitter
        v-list-item-content
          v-list-item-title Twitter
          v-list-item-subtitle.text-wrap 原开发者个人Twitter账号


      Divider(inset=72)

      v-list-item(href="https://gitlab.com/pjsekai/profile", target="_blank")
        v-icon.ml-2.mr-6 mdi-gitlab
        v-list-item-content
          v-list-item-title 原项目GitLab

    Divider

    .py-2
    v-list-item(dense)
      v-list-item-title 友情链接
    Divider
    v-list.py-0(dense)
      v-list-item(href="https://pjsek.ai", target="_blank")
        v-list-item-title pjsek.ai
      Divider(inset=16)
      v-list-item(href="https://sekai.best", target="_blank")
        v-list-item-title Sekai Viewer
    Divider

    .py-2

    v-list.py-0(dense)
      Divider
      v-list-item(@click="$root.$emit('reloadDatabase')")
        v-list-item-title.purple--text.text--lighten-2 刷新数据
      Divider

    .py-2
    v-list-item(dense)
      v-list-item-subtitle.text-wrap
        | 关注列表只会保存在你的浏览器本地

</template>

<script>
import Divider from '@/components/Divider';
import User from './User';

export default {
  name: 'About',

  components: { Divider, User },

  data() {
    return {
      user: {
        name: '林檎アメ',
        score: false,
        userId: '16656056566779905',
        userCard: {
          cardId: 249,
          defaultImage: 'special_training',
        },
        userProfileHonors: [
          {
            seq: 1,
            honorId: 34,
            honorLevel: 32,
          },
          {
            seq: 2,
            honorId: 58,
            honorLevel: 32,
          },
          {
            seq: 3,
            honorId: 534,
          },
        ],
      }
    };
  },
};
</script>
