<template>
  <div class="home">
    <img id="user" src="@/assets/Groupomania-user.svg" alt="groupomania user" />
    <LoginPage />
  </div>
</template>

<script>
// @ is an alias to /src
import LoginPage from "@/components/LoginPage.vue";

export default {
  name: "LoginView",
  components: {
    LoginPage,
  },
};
</script>
