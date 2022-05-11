<template>
  <div class="auth">
    <!-- login -->
    <div class="login">
      <form id="form-login" class="form" method="get">
        <div v-if="$store.state.authMethod === 'Signup'" class="wrapper-name">
          <input id="name" ref="name" type="name" placeholder="name" />
          <input
            id="lastname"
            ref="lastname"
            type="lastname"
            placeholder="lastname"
          />
        </div>
        <select
          v-if="$store.state.authMethod === 'Signup'"
          id="job"
          ref="job"
          class="input"
        >
          <option selected disabled hidden>Job</option>
          <option v-for="item in job" :key="item.name" :value="item.name">
            {{ item.name }}
          </option>
        </select>
        <input
          type="text"
          name="email"
          id="email"
          ref="email"
          placeholder="groupomania@social.network"
        />
        <input
          type="password"
          name="password"
          id="password"
          ref="password"
          placeholder="password"
        />
        <div class="wrapper-submit">
          <!-- <a & button> refresh the page div don't reload but for aria is not good maybe prevent default -->
          <div id="type-of-connection" @click="swapAuth()">
            {{ $store.state.otherMethod }}
          </div>
          <input
            @click.prevent="auth()"
            id="submit"
            type="submit"
            :value="$store.state.authMethod"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "LoginPage",
  data() {
    return {
      job: [{ name: "RH" }, { name: "dev" }, { name: "graphiste" }],
    };
  },
  methods: {
    ...mapActions(["swapAuth"]),
    auth() {
      const auth = this.$store.state.authMethod;
      const form = {};
      if (this.$refs.email.value && this.$refs.password.value) {
        if (auth == "Login") {
          const form = {
            email: this.$refs.email.value,
            password: this.$refs.password.value,
          };
          this.$store.dispatch("auth", form);
        } else {
          const form = {
            name: this.$refs.name.value,
            lastname: this.$refs.lastname.value,
            email: this.$refs.email.value,
            password: this.$refs.password.value,
            job: this.$refs.job.value,
          };
          this.$store.dispatch("auth", form);
        }
      }
      console.log(form);
    },
  },
};
</script>
