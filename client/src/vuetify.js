import "@mdi/font/css/materialdesignicons.css"; // Icons: https://www.materialpalette.com/icons
import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "mdi",  // "mdi" || "mdiSvg" || "md" || "fa" || "fa4"
  },
  theme: {
    dark: false,
    themes: {
      light: {
        deepBlue: "#222e60"
      },
      dark: {
        deepBlue: "#222e60"
      },
    },
  },
})