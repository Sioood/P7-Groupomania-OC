<template><h1>Redirect</h1></template>

<script>
export default {
  name: "StartPage",
  beforeCreate() {
    this.$router.push("/auth");
  },
};
</script>
