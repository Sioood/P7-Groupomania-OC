import Vue from "vue";
import Vuex from "vuex";
import router from "@/router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    baseUrl: "http://localhost:3000",
    authMethod: "Login",
    otherMethod: "signup",
    authError: "",
    user: {
      name: "no one",
      lastname: "connected",
    },
    job: [
      { name: "Ressources Humaines" },
      { name: "Développeur Front-End" },
      { name: "Développeur Back-End" },
      { name: "Graphiste" },
      { name: "Secrétaire" },
    ],
    posts: null,
    userPosts: null,
  },
  getters: {
    user(state) {
      return state.user;
    },
    posts(state) {
      return state.posts;
    },
    userPosts(state) {
      return state.userPosts;
    },
  },
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
      function login() {
        fetch(`${state.baseUrl}/api/auth/login`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          // form a modifier seulement par email et mot de passe ? formData
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
            localStorage.setItem("id", data.userId);
            router.push("/home");
          });
      }
      function signup() {
        fetch(`${state.baseUrl}/api/auth/signup`, {
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
    // GET_USER_POSTS(state, userPosts) {
    //   state.userPosts = userPosts;
    // },
  },
  actions: {
    checkToken: async ({ state }) => {
      let data = await fetch(`${state.baseUrl}/api/auth/token`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const user = await data.json();
      if (data.ok) {
        if (state.user.id === undefined) {
          state.user = user[0];
        }
        if (router.currentRoute.path == "/home") {
          return;
        } else if (router.currentRoute.path == "/auth") {
          router.push("/home");
          return;
        }
      } else {
        if (router.currentRoute.path == "/auth") {
          // localStorage.removeItem("token");
          return;
        }
        router.push("/auth");
      }
      return user;
    },
    swapAuth(context) {
      context.commit("SWAP_AUTH");
    },
    auth(context, form = { form: null }) {
      context.commit("AUTH", form);
    },
    // return to synchronous function
    getPosts: async (
      { state },
      { id, userId, limit, comment, commentLimit }
    ) => {
      let posts = [];
      const fetchPosts = await fetch(
        `${state.baseUrl}/api/post?id=${id}&userId=${userId}&limit=${limit}&comment=${comment}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const dataPosts = await fetchPosts.json();

      for (let i = 0; i < dataPosts.length; i++) {
        const fetchUser = await fetch(
          `${state.baseUrl}/api/auth/user/${dataPosts[i].UserId}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        const user = await fetchUser.json();

        // fetch only 1 comment (most liked but function like not developed), for now is the lastest comment
        const fetchComment = await fetch(
          `${state.baseUrl}/api/post?comment=${dataPosts[i].id}&limit=${commentLimit}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        const commentsData = await fetchComment.json();

        let comments = [];

        commentsData.forEach((comment) => {
          getCommentUser();

          async function getCommentUser() {
            const fetchCommentUser = await fetch(
              `${state.baseUrl}/api/auth/user/${comment.UserId}`,
              {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              }
            );

            const commentUserData = await fetchCommentUser.json();
            let commentUser = { commentUser: commentUserData[0] };
            comments.push(Object.assign(comment, commentUser));
          }
        });

        posts.push({
          post: dataPosts[i],
          user: user[0],
          comments: comments,
        });

        if (comment === true) {
          state.userPosts = posts;
        } else {
          state.posts = posts;
        }
      }
      // context.commit("GET_POSTS", posts);
    },
  },
  modules: {},
});
