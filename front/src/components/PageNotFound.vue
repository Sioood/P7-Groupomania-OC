<template>
  <div id="app">
    <div @click="home()" class="wrapper">
      <h1>4</h1>
      <img src="@/assets/Groupomania.svg" alt="groupomania user" />
      <h1>4</h1>
    </div>
    <h2>Not Found</h2>
  </div>
</template>

<style scoped>
template {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#app {
  height: 75vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 15px;
  cursor: pointer;
}

h1 {
  margin: 0;
  font-size: 200px;
}

img {
  margin: 0;
  width: 150px;
}

h2 {
  font-size: 30px;
  transform: translate(0, -100%);
}
</style>

<script>
import router from "@/router";

export default {
  name: "PageNotFound",
  methods: {
    home() {
      router.push("/");
    },
  },
};
</script>
