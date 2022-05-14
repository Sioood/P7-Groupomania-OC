<template>
  <div id="app">
    <nav v-if="nav === true">
      <router-link to="/auth">Auth</router-link>
      <button @click="clearLocalStorage()" class="nav-button">Logout</button>
    </nav>
    <router-view />
  </div>
</template>

<style>
@import "./css/main.css";
@import "./css/auth.css";
</style>

<script>
import router from "@/router";

export default {
  data() {
    return {
      nav: true,
    };
  },
  beforeCreate() {
    fetch("http://localhost:3000/api/auth/token", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((response) => {
      if (response.ok) {
        if (router.currentRoute.path == "/home") {
          return;
        } else if (router.currentRoute.path == "/auth") {
          router.push("/home");
        }
      } else {
        if (router.currentRoute.path == "/auth") {
          return;
        }
        router.push("/auth");
      }
    });
  },
  methods: {
    clearLocalStorage() {
      localStorage.removeItem("token");
      router.push("/auth");
    },
  },
};
</script>
