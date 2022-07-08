<template lang="pug">
  div.d-flex.justify-space-between
    //- div {{profileHonors}}

    template(v-for="honor, i in profileHonors")
      Honor(v-if="honor",
        :size="size",
        :sub="i!=0",
        :type="honor.profileHonorType",
        :id="honor.honorId",
        :level="honor.honorLevel",
        :bondsHonorViewType="honor.bondsHonorViewType",
        :bondsHonorWordId="honor.bondsHonorWordId")
      Honor(v-else, :size="size", :sub="i!=0")

    //- Honor(:type="userProfileHonors[0].profileHonorType", :id="userProfileHonors[0].honorId", :level="userProfileHonors[0].honorLevel", size=20)
    //- Honor(:type="userProfileHonors[1].profileHonorType", :id="userProfileHonors[1].honorId", :level="userProfileHonors[1].honorLevel", size=20, sub)
    //- Honor(:type="userProfileHonors[2].profileHonorType", :id="userProfileHonors[2].honorId", :level="userProfileHonors[2].honorLevel", size=20, sub)

</template>

<script>
import Honor from '@/components/Honor';

export default {
  name: 'ProfileHonors',

  props: ['userProfileHonors', 'size'],

  components: { Honor },

  computed: {
    profileHonors() {
      let profileHonors = [];
      for (let i = 1; i <= 3; i++) {
        let honor = this.userProfileHonors.find(honor => honor.seq == i);
        profileHonors.push(honor || null);
      }
      return profileHonors;
    }
  }
};
</script>
