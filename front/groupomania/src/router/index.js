import Vue from "vue";
import VueRouter from "vue-router";
import PageNotFound from "../components/PageNotFound.vue";
import StartView from "../views/StartView.vue";
import HomeView from "../views/HomeView.vue";

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
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
