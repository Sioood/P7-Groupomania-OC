<template>
  <div id="app">
    <nav v-if="nav === true">
      <div class="links">
        <router-link to="/home">Home</router-link>
        <button @click="Logout()" class="nav-button" id="logout">Logout</button>
      </div>
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
  created() {
    this.$store.dispatch("checkToken");
    console.log("created");
  },
  beforeUpdate() {
    this.$store.dispatch("checkToken");
    console.log("beforeUpdate");
  },
  methods: {
    Logout() {
      // clear all error when logout because user not defined
      location.reload();
      this.$store.state.user = null;
      localStorage.removeItem("token");
      router.push("/auth");
    },
  },
};
</script>
