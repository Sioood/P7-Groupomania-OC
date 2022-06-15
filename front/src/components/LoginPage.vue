<template>
  <div class="auth">
    <!-- login -->
    <div class="login">
      <form id="form-login" class="form" method="get">
        <div v-if="$store.state.authMethod === 'Signup'" class="wrapper-name">
          <input
            id="name"
            ref="name"
            type="name"
            placeholder="name"
            @keydown="clearError()"
          />
          <input
            id="lastname"
            ref="lastname"
            type="lastname"
            placeholder="lastname"
            @keydown="clearError()"
          />
        </div>
        <select
          v-if="$store.state.authMethod === 'Signup'"
          id="job"
          ref="job"
          class="input"
        >
          <option selected disabled hidden>Job</option>
          <option
            v-for="item in $store.state.job"
            :key="item.name"
            :value="item.name"
          >
            {{ item.name }}
          </option>
        </select>
        <input
          type="text"
          name="email"
          id="email"
          ref="email"
          placeholder="groupomania@social.network"
          @keydown="clearError()"
        />
        <input
          type="password"
          name="password"
          id="password"
          ref="password"
          placeholder="password"
          @keydown="clearError()"
        />
        <h3 id="error">{{ $store.state.authError }}</h3>
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
    return {};
  },
  methods: {
    ...mapActions(["swapAuth", "checkToken"]),
    auth() {
      /**
      All Regex for secure inputs form
      */

      const regexMail = /([a-zA-Z0-9-_.]{5,})@([a-zA-Z]+)\.([a-zA-Z]{2,9})/;
      const regexPassword = /([a-zA-Z0-9-_.?!]{5,})/;
      const regexText = /([a-zA-Zàâäçéèêëîïôöùûüÿ]{3,})/;

      // empty validator for login inputs
      const emptyLogin = this.$refs.email.value && this.$refs.password.value;
      const regexLogin =
        this.$refs.email.value.match(regexMail) &&
        this.$refs.password.value.match(regexPassword);

      const auth = this.$store.state.authMethod;

      /**
      Split Login inputs of Signup inputs

      for each error set display an error message
       */

      if (auth == "Login" && emptyLogin) {
        if (regexLogin) {
          const form = {
            email: this.$refs.email.value,
            password: this.$refs.password.value,
          };
          this.$store.dispatch("auth", form);
          return;
        }
        this.$store.state.authError = "Veuillez rentrer un email valide.";
        return;
      } else if (auth == "Signup") {
        // empty validator for signup + login inputs
        // maybe transform v-model for input text and not $ref.value -> (only for select and files)
        const emptySignup =
          this.$refs.name.value &&
          this.$refs.lastname.value &&
          this.$refs.job.value != "Job" &&
          emptyLogin;

        const regexSignup =
          this.$refs.name.value.match(regexText) &&
          this.$refs.lastname.value.match(regexText) &&
          emptySignup &&
          regexLogin;

        if (emptySignup) {
          if (regexSignup) {
            const form = {
              name: this.$refs.name.value,
              lastname: this.$refs.lastname.value,
              email: this.$refs.email.value,
              password: this.$refs.password.value,
              job: this.$refs.job.value,
            };
            this.$store.dispatch("auth", form);
            return;
          } else {
            this.$store.state.authError =
              "Veuillez rentrer un email, noms et mot de passe valide. Le mot de passe peut contenir : (Lettres, Chiffres et Caractères spéciaux correspondants : -_!.?)";
            return;
          }
        }
      }
      this.$store.state.authError = "Veuillez remplir tout les champs.";
    },
    clearError() {
      this.$store.state.authError = "";
    },
  },
};
</script>
