<template>
  <div class="connection">
    <!-- login -->
    <div class="login">
      <form id="form-login" class="form" method="get">
        <div v-if="connectionMethod === 'Signup'" class="wrapper-name">
          <input id="name" type="name" placeholder="name" />
          <input id="lastname" type="lastname" placeholder="lastname" />
        </div>
        <select v-if="connectionMethod === 'Signup'" id="job" class="input">
          <option value="">Job</option>
          <option value="dev">dev</option>
          <option value="graphiste">graphiste</option>
          yes
        </select>
        <input
          type="text"
          name="email"
          id="email"
          placeholder="groupomania@social.network"
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
        />
        <div class="wrapper-submit">
          <a href="" id="type-of-connection" @click="connection()">{{
            otherMethod
          }}</a>
          <input id="submit" type="submit" :value="connectionMethod" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      connectionMethod: "Signup",
      otherMethod: "signup",
    };
  },
  methods: {
    connection() {
      if (this.connectionMethod === "Login") {
        this.connectionMethod = "Signup";
        this.otherMethod = "login";
      } else {
        this.connectionMethod = "Login";
        this.otherMethod = "signup";
      }
      // alert(this.connectionMethod);
    },
  },
};
</script>
