<template>
  <div id="app">
    <nav v-if="nav === true">
      <router-link to="/auth" class="nav-button">Auth</router-link>
      <router-link to="/signup">signup</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style>
@import "./css/main.css";
@import "./css/auth.css";
</style>

<script>
export default {
  data() {
    return {
      nav: true,
    };
  },
};
</script>
