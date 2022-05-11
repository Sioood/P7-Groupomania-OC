<template>
  <div class="signup">
    <img id="user" src="@/assets/Groupomania-user.svg" alt="groupomania user" />
    <HomePage />
  </div>
</template>

<script>
// @ is an alias to /src
import HomePage from "@/components/HomePage.vue";

export default {
  name: "HomeView",
  components: {
    HomePage,
  },
};
</script>
