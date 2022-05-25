import Vue from "vue";
import Vuex from "vuex";
import router from "@/router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authMethod: "Login",
    otherMethod: "signup",
    authError: "",
    job: [{ name: "RH" }, { name: "dev" }, { name: "graphiste" }],
    posts: [],
    user: { name: "no one", lastname: "connected" },
  },
  getters: {
    user(state) {
      return state.user;
    },
    posts(state) {
      return state.posts;
    },
  },
  mutations: {
    CHECK_TOKEN(state, user) {
      state.user = user[0];
    },
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
      function login() {
        fetch("http://localhost:3000/api/auth/login", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        })
          .then((response) => {
            if (response.ok) {
              state.authError = "";
              return response.json();
            } else if (response.status == 401) {
              state.authError = "Il n'y a pas de compte associé à cet email.";
            } else if (response.status == 403) {
              state.authError =
                "Le mot de passe ne correspond pas à l'email associé.";
            }
          })
          .then((data) => {
            localStorage.setItem("token", data.token);
            router.push("/home");
          });
      }
      function signup() {
        fetch("http://localhost:3000/api/auth/signup", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }).then((response) => {
          if (response.ok) {
            login();
            // state.authError =
            //   "Veuillez vérifier vos identifiants et valider pour poursuivre l'authentification.";
          }
        });
      }
      if (state.authMethod === "Login") {
        login();
      } else if (state.authMethod === "Signup") {
        signup();
      }
    },
    GET_POSTS(state, posts) {
      state.posts = posts;
    },
  },
  actions: {
    checkToken: async (context) => {
      let data = await fetch("http://localhost:3000/api/auth/token", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const user = await data.json();

      if (data.ok) {
        context.commit("CHECK_TOKEN", user);
        if (router.currentRoute.path == "/home") {
          return;
        } else if (router.currentRoute.path == "/auth") {
          router.push("/home");
          return;
        }
      } else {
        if (router.currentRoute.path == "/auth") {
          return;
        }
        router.push("/auth");
      }
    },
    swapAuth(context) {
      context.commit("SWAP_AUTH");
    },
    auth(context, form = { form: null }) {
      context.commit("AUTH", form);
    },
    getPosts: async (context, { limit, comment }) => {
      let posts = [];
      const fetchPosts = await fetch(
        `http://localhost:3000/api/post?limit=${limit}&comment=${comment}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const dataPosts = await fetchPosts.json();

      for (let i = 0; i < dataPosts.length; i++) {
        const fetchUser = await fetch(
          `http://localhost:3000/api/auth/user/${dataPosts[i].UserId}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        const user = await fetchUser.json();
        posts.push({ post: dataPosts[i], user: user[0] });
      }
      context.commit("GET_POSTS", posts);
    },
  },
  modules: {},
});
