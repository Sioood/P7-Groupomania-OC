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
    /**
     * Check Token at creation
     */
    this.$store.dispatch("checkToken");
    // console.log("created");
  },
  beforeUpdate() {
    // // console.log(router.currentRoute.path);
    if (router.currentRoute.path == "/auth") {
      this.nav = false;
    } else {
      this.nav = true;
    }
    this.$store.dispatch("checkToken");
    // console.log("beforeUpdate");
  },
  methods: {
    /**
     * Logout function which remove all data saved for the user -> store, LocalStorage
     */
    Logout() {
      // clear all error when logout because user not defined
      location.reload();
      this.$store.state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      router.push("/auth");
    },
  },
};
</script>
