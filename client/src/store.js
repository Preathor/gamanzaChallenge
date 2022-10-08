import Vue from "vue";
import Vuex from "vuex";
import Utils from "./utils";

Vue.use(Vuex);

export default class {
  constructor() {
    let state = {
      /**
       * osnove izgleda
       */
      isIdle: false,
      loggedIn: false,
      notificationSnackBar: {
        snackbar: false,
        snackBarColor: "red",
        message: "",
        duration: undefined,
        size: undefined,
      },
      mainProgramProgress: false,
      dialogTimeOut: null,
      navigationId: 0,

      socket: {
        isConnected: false,
        message: '',
        reconnectError: false,
      },

    };

    this.store = new Vuex.Store({
      state: state,
      actions: {
        closeSnackBar({ commit }) { commit("CLOSE_SNACKBAR"); },
        clearDialogTimeout({ commit }) { commit("CLEAR_DIALOG_TIMEOUT"); },
        snackBarNotification({commit}, data) { commit("OPEN_SNACKBAR", data);},


      },
      mutations: {
        CLOSE_SNACKBAR: (state) => { state.notificationSnackBar.snackbar = false; },
        OPEN_SNACKBAR: (state, data) => {
          state.notificationSnackBar.snackbar = true;
          state.notificationSnackBar.snackBarColor = data.snackBarColor;
          state.notificationSnackBar.message = data.message;
          state.notificationSnackBar.duration = data.duration;
          state.notificationSnackBar.size = data.size;
        },
        SOCKET_ONOPEN (state, event)  {
          Vue.prototype.$socket = event.currentTarget
          console.log("Connected");
          state.socket.isConnected = true
        },
        SOCKET_ONCLOSE (state)  {
          console.log("Closed connections");
          state.socket.isConnected = false
        },
        SOCKET_ONERROR (state, event)  {
          console.log("Connection error", event);
        },
        // default handler called for all methods
        SOCKET_ONMESSAGE (state, message)  {
          state.message = message;
        },
        // mutations for reconnect methods
        SOCKET_RECONNECT(state, count) {
          console.log("Connection reconnect", count);
          if (count === 5) {
            window.location.reload();
          }
          console.info(state, count)
        },
        SOCKET_RECONNECT_ERROR(state) {
          state.socket.reconnectError = true;
        },
      },
      getters: {
        navigationId: (state) => { return state.navigationId; },
        mainProgramProgress: (state) => { return state.mainProgramProgress; },
        notificationSnackBar: (state) => { return state.notificationSnackBar; },
      },
    });
    this.utils = new Utils(this);
  }
  getStore() {
    return this.store;
  }
}
