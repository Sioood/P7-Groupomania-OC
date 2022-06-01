import Vue from "vue";
import VueRouter from "vue-router";
import PageNotFound from "../components/PageNotFound.vue";
import UserView from "../views/UserView.vue";
import StartView from "../views/StartView.vue";
import HomeView from "../views/HomeView.vue";
import PostView from "../views/PostView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    name: "404",
    component: PageNotFound,
  },
  {
    path: "/",
    name: "start",
    component: StartView,
  },
  {
    path: "/auth",
    name: "auth",
    // route level code-splitting
    // this generates a separate chunk (signup.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "signup" */ "../views/LoginView.vue"),
  },
  {
    path: "/home",
    name: "home",
    component: HomeView,
  },
  {
    path: "/user",
    name: "user",
    component: UserView,
  },
  {
    path: "/me",
    name: "me",
    component: UserView,
  },
  {
    path: "/post",
    name: "post",
    component: PostView,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
