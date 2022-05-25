<template>
  <div id="profile-icon">
    <a href="/me" id="profile">
      <img
        class="profile-picture"
        src="@/assets/Groupomania-user.svg"
        alt="groupomania user"
      />
      <h3 class="profile-fullname">
        {{ username + " " + userlastname }}
      </h3>
    </a>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "UserLogged",
  props: ["username", "userlastname"],
  computed: {
    ...mapGetters(["user"]),
  },
};
</script>

<style scoped>
#profile {
  padding: 10px 15px 10px 15px;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 15px;
  background: var(--third-color);
  color: var(--main-color);
  text-decoration: none;
  border-radius: 50px;
}

.profile-picture {
  width: 30px;
  border-radius: 50px;
}

.profile-fullname {
  padding: 0;
}
</style>
