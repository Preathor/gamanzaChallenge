<template>
  <v-app class="application" :class="{ inactive: isIdle }">
<!--    <v-app-bar app short dark color="primary darken-2">-->
<!--      <v-btn text class="ma-0" small fab dark @click="drawer = !drawer" v-shortkey="['ctrl', '/']" @shortkey="drawer = !drawer">-->
<!--          <v-icon dark>{{ mdiMenu }}</v-icon>-->
<!--      </v-btn>-->
<!--      <v-toolbar-title class="pl-0" :class="{ 'cdp-full-width': $vuetify.breakpoint.smAndDown }"> </v-toolbar-title>-->
<!--      <v-spacer />-->
<!--    </v-app-bar>-->
<!--    <v-navigation-drawer v-model="drawer" app dark hidden>-->
<!--      <v-sheet class="pa-4 pl-4" dark>-->
<!--        <div class="font-weight-bold">-->
<!--          Gamanza-->
<!--        </div>-->
<!--      </v-sheet>-->
<!--      <v-divider />-->
<!--      <navigation />-->
<!--      <template v-slot:append>-->
<!--        <v-divider class="hidden-md-and-up" dark />-->
<!--      </template>-->
<!--    </v-navigation-drawer>-->

    <v-progress-linear :active="mainProgramProgress" :indeterminate="true" top absolute color="white accent-4" style="z-index: 9999" />
    <div id="vail" v-if="mainProgramProgress" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: #000000; z-index: 9998; opacity: 0.8; color: white">
      <div style="margin: auto; width: 50%; height: 50%; text-align: center; text-transform: uppercase; padding: 300px; font-weight: bold; font-size: 20px">Samo trenutek</div>
    </div>


    <v-snackbar v-model="notificationSnackBar.snackbar" :color="notificationSnackBar.snackBarColor" :timeout="notificationSnackBar.duration === undefined ? 10000 : notificationSnackBar.duration" rounded :bottom="true">
      <div v-if="notificationSnackBar.size === 'big'" class="text-h5"><b>{{ notificationSnackBar.message }}</b></div>
      <span v-if="notificationSnackBar.size === undefined"><b>{{ notificationSnackBar.message }}</b></span>
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="closeSnackBar"> Zapri</v-btn>
      </template>
    </v-snackbar>

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import { mdiMenu } from "@mdi/js";
import { mapGetters } from "vuex";
// import Navigation from "@/components/Navigation";

export default {
  name: "App",
  // components: { Navigation },
  data: () => ({
    mdiMenu,
    drawer: false,
    idleTimerId: null,
    adminActiveSnackBar: false,
  }),
  computed: {
    ...mapGetters(["mainProgramProgress", "notificationSnackBar"]),
    isIdle() {
      if (!this.isAppIdle) {
        clearInterval(this.idleTimerId);
      } else {
        clearInterval(this.idleTimerId);
      }
      return this.isAppIdle;
    },
  },
  methods: {
    closeSnackBar() {
      this.$store.dispatch("closeSnackBar");
    },
  },
};
</script>
<style lang="less">
html {
  overflow-y: auto;

  .text-start {
    padding: 0 5px !important;
    height: 20px !important;
  }

  .v-text-field--outlined.v-input--dense .v-label--active {
    color: black;
  }
}
</style>
