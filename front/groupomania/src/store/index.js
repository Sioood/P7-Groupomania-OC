import Vue from "vue";
import Vuex from "vuex";
import router from "@/router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authMethod: "Login",
    otherMethod: "signup",
    authError: "",
    posts: [],
    user: { name: "user" },
  },
  getters: {},
  mutations: {
    CHECK_TOKEN(state) {
      fetch("http://localhost:3000/api/auth/token", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((response) => {
          // console.log(response.json());
          if (response.ok) {
            if (router.currentRoute.path == "/home") {
              return response.json();
            } else if (router.currentRoute.path == "/auth") {
              router.push("/home");
              return response.json();
            }
          } else {
            if (router.currentRoute.path == "/auth") {
              return;
            }
            router.push("/auth");
          }
        })
        .then((data) => {
          if (data) {
            state.user = data[0];
          }
        });
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
    GET_POSTS(state, payload) {
      async function getPosts() {
        state.posts = [];
        const fetchPosts = await fetch(
          `http://localhost:3000/api/post?limit=${payload.limit}&comment=${payload.comment}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        const posts = await fetchPosts.json();
        for (let i = 0; i < posts.length; i++) {
          const fetchUser = await fetch(
            `http://localhost:3000/api/auth/user/${posts[i].UserId}`,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          );
          const user = await fetchUser.json();
          state.posts.push({ post: posts[i], user: user[0] });
        }
      }
      getPosts();
    },
  },
  actions: {
    checkToken(context) {
      context.commit("CHECK_TOKEN");
    },
    swapAuth(context) {
      context.commit("SWAP_AUTH");
    },
    auth(context, form = { form: null }) {
      context.commit("AUTH", form);
    },
    getPosts(context, { limit, comment }) {
      context.commit("GET_POSTS", { limit, comment });
    },
  },
  modules: {},
});
