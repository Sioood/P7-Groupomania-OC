<template>
  <div id="app">
    <img id="user" src="./assets/Groupomania-user.svg" alt="groupomania user" />
    <LoginPage />
  </div>
</template>

<script>
import LoginPage from "./components/LoginPage.vue";

export default {
  name: "App",
  components: {
    LoginPage,
  },
};
</script>

<style>
@import "./css/main.css";
@import "./css/login.css";
</style>
