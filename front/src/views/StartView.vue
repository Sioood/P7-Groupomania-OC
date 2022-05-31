<template>
  <div class="home">
    <img id="user" src="@/assets/Groupomania-user.svg" alt="groupomania user" />
    <StartPage />
  </div>
</template>

<script>
// @ is an alias to /src
import StartPage from "@/components/StartPage.vue";

export default {
  name: "StartView",
  components: {
    StartPage,
  },
};
</script>
