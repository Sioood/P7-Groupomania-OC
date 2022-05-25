<template>
  <div id="app">
    <nav v-if="nav === true">
      <div class="links">
        <router-link to="/home">Home</router-link>
        <button @click="clearLocalStorage()" class="nav-button" id="logout">
          Logout
        </button>
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
  },
  beforeUpdate() {
    this.$store.dispatch("checkToken");
  },
  methods: {
    clearLocalStorage() {
      this.$store.state.user = null;
      localStorage.removeItem("token");
      router.push("/auth");
    },
  },
};
</script>
