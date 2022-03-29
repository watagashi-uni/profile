import Vue from 'vue';
import Vuetify from 'vuetify/lib';

import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
  breakpoint: {
    thresholds: {
      xs: 360,
      sm: 720,
      md: 1080,
      lg: 1440,
    },
    scrollBarWidth: 0,
  },
  theme: {
    themes: {
      light: { primary: colors.blue.lighten2, secondary: colors.blue.lighten3 },
      dark: { primary: colors.blue.lighten2, secondary: colors.grey.darken3 },
    },
    options: {
      customProperties: true,
    },
    dark: true,
  },
});
