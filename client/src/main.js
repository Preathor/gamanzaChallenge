import "material-design-icons-iconfont/dist/material-design-icons.css";

import Vue from "vue";
import vuetify from "./vuetify"
import axios from "axios"; // vue to server side calls
import store from "./store";
import router from "./router";
import App from "./App";
import VueI18n from "vue-i18n";
import VueFilter from "vue-filter";
import vueHeadful from "vue-headful";
import vueShortKey from "vue-shortkey"; // https://www.npmjs.com/package/vue-shortkey
import vueIdle from "idle-vue";
import "overlayscrollbars/css/OverlayScrollbars.css";
import OverlayScrollbars from "overlayscrollbars";
import { OverlayScrollbarsPlugin } from "overlayscrollbars-vue"; // https://kingsora.github.io/OverlayScrollbars/#!documentation/options
import VueNativeSock from 'vue-native-websocket';

// create Vue instance to support EventBus
window.EventBus = new Vue();

Vue.config.productionTip = false;
Vue.use(vueShortKey);
Vue.use(VueFilter);
Vue.use(VueI18n);
Vue.use(OverlayScrollbarsPlugin);

Vue.component("vue-headful", vueHeadful);
import translations from "./translations/index";
const i18n = new VueI18n({
  locale: "si_SL", // set locale
  fallbackLocale: "ENG",
  messages: translations
});

let storeClass = new store().getStore();
Vue.prototype.$appName = "Application";
Vue.prototype.$language = "ENG";
Vue.prototype.$axios = axios;
Vue.use(vueIdle, {
  store: storeClass,
  idleTime: 3000, // 10 seconds,
  startAtIdle: false
});

// SOCKER CONNECTIONI URL
Vue.use(VueNativeSock, 'ws://localhost:9001/ws', {
  store: storeClass,
  format: "json",
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 3000,
});

new Vue({
  i18n,
  router: router, // projects.router
  store: storeClass, // projects.store,
  vuetify,
  render: h => h(App) // projects.app
}).$mount("#application");

OverlayScrollbars(document.body, {
  className: "os-theme-light",
  nativeScrollbarsOverlaid: {
    showNativeScrollbars: false,
    initialize: false
  },
  scrollbars: {
    visibility: "auto",
    autoHide: "never",
    autoHideDelay: 800,
    dragScrolling: true,
    clickScrolling: true,
    touchSupport: true,
    snapHandle: false
  },
});
