<template>
  <div id="user-page">
    <div v-if="me === true" class="me">
      <img src="@/assets/Groupomania-user.svg" alt="" />
      <UserPage :name="user.name" :lastname="user.lastname" />
    </div>
    <div v-if="me === false" class="user">
      <UserPage />
    </div>
    <h1>hello world {{ user.name }}</h1>
  </div>
</template>

<script>
import router from "@/router";
import { mapGetters } from "vuex";

import UserPage from "@/components/UserPage.vue";

export default {
  name: "UserView",
  components: {
    UserPage,
  },
  data() {
    return {
      me: null,
    };
  },
  mounted() {
    if (router.currentRoute.path == "/user") {
      this.me = false;
    } else if (router.currentRoute.path == "/me") {
      this.me = true;
    }
  },
  computed: {
    ...mapGetters(["user"]),
  },
};
</script>

<style scoped>
.user-page {
  width: 100%;
  height: 100%;
  background: #000;
}

img {
  width: 350px;
}

h1 {
  font-size: 50px;
}
</style>
