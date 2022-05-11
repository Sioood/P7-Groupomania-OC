<template>
  <div class="signup">
    <img id="user" src="@/assets/Groupomania-user.svg" alt="groupomania user" />
    <SignupPage />
  </div>
</template>

<script>
// @ is an alias to /src
import SignupPage from "@/components/SignupPage.vue";

export default {
  name: "SignupView",
  components: {
    SignupPage,
  },
};
</script>
