<template>
  <div id="user-page">
    <img src="@/assets/Groupomania-user.svg" alt="" />
    <h1 class="fullname">{{ fullname }}</h1>
    <a :href="`mailto:${email}`" class="email">{{ email }}</a>
    <h2 class="job">{{ job }}</h2>
  </div>
</template>

<script>
export default {
  name: "UserPage",
  props: {
    fullname: String,
    email: String,
    job: String,
  },
};
</script>

<style scoped>
.user-page {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

img {
  margin: 0 0 15px 0;
}

h1 {
  font-size: 40px;
}

h2 {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
}

a {
  text-decoration: underline;
  color: var(--main-color);
  font-weight: 600;
}
</style>
