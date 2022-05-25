<template>
  <div id="user-page">
    <div class="fullname">
      <h1 class="name">{{ name }}</h1>
      <h1 class="lastname">{{ lastname }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserPage",
  props: {
    name: String,
    lastname: String,
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

h1 {
  font-size: 50px;
}
</style>
