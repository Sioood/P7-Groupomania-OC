import Vue from "vue";
import Vuex from "vuex";
import router from "@/router";

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
    AUTH(state, form) {
      if (state.authMethod === "Login") {
        fetch("http://localhost:3000/api/auth/login", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }).then((response) => {
          if (response.ok) {
            router.push("/home");
            return response.json();
          }
          return Promise.reject(response);
        });
      } else if (state.authMethod === "Signup") {
        fetch("http://localhost:3000/api/auth/signup", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }).then((response) => response.json());
      }
      alert("auth" + JSON.stringify(form));
    },
  },
  actions: {
    swapAuth(context) {
      context.commit("SWAP_AUTH");
    },
    auth(context, form = { form: null }) {
      context.commit("AUTH", form);
    },
  },
  modules: {},
});
