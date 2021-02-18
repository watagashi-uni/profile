<template lang="pug">
  hr.v-divider.theme--dark(:style="{margin: `0 0 0 ${inset}px`}")
</template>
<script>
export default {
  name: 'Divider',
  props: { inset: {} },
};
</script>