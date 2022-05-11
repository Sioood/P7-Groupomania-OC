import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: { authMethod: "Login", otherMethod: "signup" },
  getters: {},
  mutations: {
    SWAP_AUTH(state) {
      if (state.authMethod === "Login") {
        state.authMethod = "Signup";
        state.otherMethod = "login";
      } else {
        state.authMethod = "Login";
        state.otherMethod = "signup";
      }
    },
    AUTH(state) {
      if (state.authMethod === "Login") {
        alert("login");
      } else if (state.authMethod === "Signup") {
        alert("signup");
      }
    },
  },
  actions: {
    swapAuth(context) {
      context.commit("SWAP_AUTH");
    },
    auth(context) {
      context.commit("AUTH");
    },
  },
  modules: {},
});
