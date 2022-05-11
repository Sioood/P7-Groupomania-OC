<template>
  <div class="auth">
    <!-- login -->
    <div class="login">
      <form id="form-login" class="form" method="get">
        <div v-if="$store.state.authMethod === 'Signup'" class="wrapper-name">
          <input id="name" type="name" placeholder="name" />
          <input id="lastname" type="lastname" placeholder="lastname" />
        </div>
        <select
          v-if="$store.state.authMethod === 'Signup'"
          id="job"
          class="input"
        >
          <option v-for="item in job" :key="item.name" :value="item.name">
            {{ item.name }}
          </option>
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
          @click="auth()"
        />
        <div class="wrapper-submit">
          <!-- <a & button> refresh the page div don't reload but for aria is not good maybe prevent default -->
          <div id="type-of-connection" @click="swapAuth()">
            {{ $store.state.otherMethod }}
          </div>
          <input id="submit" type="submit" :value="$store.state.authMethod" />
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
      job: [{ name: "Job" }, { name: "dev" }, { name: "graphiste" }],
    };
  },
  methods: {
    ...mapActions(["swapAuth", "auth"]),
  },
};
</script>
