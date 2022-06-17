<template>
  <div id="user-profile">
    <div class="user">
      <img
        v-if="user.imgUrl"
        :src="$store.state.baseUrl + user.imgUrl"
        alt=""
      />
      <div class="modify">
        <button
          v-if="me == user.id || admin === true"
          @click="deleteUser()"
          id="delete"
        >
          Supprimer l'utilisateur
        </button>
        <img v-if="!user.imgUrl" src="@/assets/Groupomania-user.svg" alt="" />
        <button
          v-if="me == user.id || admin === true"
          @click="form = true"
          id="update"
        >
          Mettre à jour le profil
        </button>
      </div>
      <div class="wrapper-info">
        <UserPage
          :fullname="Fullname"
          :email="userProfile.email"
          :job="userProfile.job"
        />
      </div>
    </div>
    <form v-if="form == true" action="" class="form-update">
      <div @click="form = false" class="close"><span></span><span></span></div>
      <div class="info">
        <h2>Informations</h2>
        <div class="fullname">
          <input
            type="text"
            name="name"
            id="name"
            :placeholder="userProfile.name"
            v-model="userName"
          />
          <input
            type="text"
            name="lastname"
            id="lastname"
            :placeholder="userProfile.lastname"
            v-model="userLastname"
          />
        </div>

        <input
          type="email"
          name="email"
          id="email"
          :placeholder="userProfile.email"
          v-model="userEmail"
        />
        <input type="file" name="file" id="file" ref="file" accept="image/*" />
        <select id="job" ref="job" class="input">
          <option selected disabled hidden>{{ userProfile.job }}</option>
          <option
            v-for="item in $store.state.job"
            :key="item.name"
            :value="item.name"
          >
            {{ item.name }}
          </option>
        </select>
      </div>
      <div class="password">
        <h2>Mot de passe</h2>
        <div class="wrapper-password">
          <input
            type="password"
            name="currentpassword"
            id="currentpassword"
            placeholder="Mot de passe actuel"
            v-model="userOldPassword"
          />
          <input
            type="password"
            name="newpassword"
            id="newpassword"
            placeholder="Nouveau mot de passe"
            v-model="userNewPassword"
          />
        </div>
      </div>
      <h4 class="error-message">{{ errMessage }}</h4>
      <button @click.prevent="updateUser()" type="submit">Modifier</button>
    </form>
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
      me: localStorage.getItem("id"),
      errMessage: "",
      form: false,
      userProfile: {},
      userName: undefined,
      userLastname: undefined,
      userEmail: undefined,
      userJob: undefined,
      userOldPassword: undefined,
      userNewPassword: undefined,
    };
  },
  // beforeUpdate() {
  //   this.$store.dispatch("checkToken");
  // },
  mounted() {
    /**
     * return id of user query if user is in the user page and
     * return his id if he is on his own profile
     */
    if (router.currentRoute.path == "/me") {
      this.getUser(localStorage.getItem("id"));
    } else if (router.currentRoute.path == "/user") {
      this.getUser(router.currentRoute.query.id);
      this.me = null;
    }
  },
  computed: {
    ...mapGetters(["user"]),
    Fullname: {
      get() {
        let fullname = "";
        if (router.currentRoute.path == "/me") {
          fullname = this.user.name + " " + this.user.lastname;
        } else {
          fullname = this.userProfile.name + " " + this.userProfile.lastname;
        }
        return fullname;
      },
    },
    admin: {
      get() {
        return this.$store.state.user.admin;
      },
    },
  },
  methods: {
    getUser(id) {
      fetch(`${this.$store.state.baseUrl}/api/auth/user/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((user) => {
          // check if user exist, if not display 404 page
          if (user.length != 0) {
            this.userProfile = user[0];
          } else {
            router.push("/404");
          }
        });
    },
    /**
     * Delete user with confirmation and check if is the good user or is admin
     */
    deleteUser() {
      // console.log(this.admin);
      // window.confirm("Voulez vous réelement supprimer l'utilisateur?");

      if (
        this.userProfile.id == localStorage.getItem("id") ||
        this.admin == true
      ) {
        if (confirm("Voulez vous réelement supprimer l'utilisateur?") == true) {
          let id = this.userProfile.id;
          let path = "/auth";
          if (router.currentRoute.path == "/user") {
            // after set function to get user with id give id
            path = "/home";
          }

          fetch(`${this.$store.state.baseUrl}/api/auth/user/delete?id=${id}`, {
            method: "DELETE",
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          });

          if (router.currentRoute.path == "/me") {
            localStorage.removeItem("token");
          }
          router.push(path);
        }
      }
    },
    /**
     * Update User with form, form don't need to be fullfilled
     * If the user want just to change his info just update his infos
     * if he want to change his password just update it
     * if both execute both function
     * can save unecessary fetch
     */
    updateUser() {
      /**
      All Regex for secure inputs form
      */

      const regexMail = /([a-zA-Z0-9-_.]{5,})@([a-zA-Z]+)\.([a-zA-Z]{2,9})/;
      const regexPassword = /([a-zA-Z0-9-_.?!]{5,})/;
      const regexText = /([a-zA-Zàâäçéèêëîïôöùûüÿ]{3,})/;

      let id = null;

      const getId = () => {
        if (router.currentRoute.path == "/me") {
          id = this.$store.state.user.id;
        } else if (router.currentRoute.path == "/user") {
          id = router.currentRoute.query.id;
        }
        console.log(id);
      };

      getId();

      let form = new FormData();

      this.userJob = this.$refs.job.value;

      /**
       * Variable checker for inputs validation
       */

      let checker = (arr) => arr.every((v) => v === true);

      let verifyInputs = () => {
        let verifyInfoInputs = (file, name, lastname, email, job, id) => {
          const inputsValidation = [];

          /**
           * If file include in form
           */

          if (file) {
            form.append("file", file);
            inputsValidation.push(true);
          }

          /**
           * Validator for name
           */

          if (name) {
            if (name.match(regexText)) {
              form.append("name", name);
              inputsValidation.push(true);
            } else {
              inputsValidation.push(false);
              this.errMessage =
                "Veuillez seulement mettre du texte dans les champs : Nom & Prénom. ";
            }
          }

          /**
           * Validator for lastname
           */

          if (lastname) {
            if (lastname.match(regexText)) {
              form.append("lastname", lastname);
              inputsValidation.push(true);
            } else {
              inputsValidation.push(false);
              this.errMessage =
                "Veuillez seulement mettre du texte dans les champs : Nom & Prénom. ";
            }
          }

          /**
           * Validator for email
           */

          if (email) {
            if (email.match(regexMail)) {
              form.append("email", email);
              inputsValidation.push(true);
            } else {
              inputsValidation.push(false);
              if (!this.errMessage) {
                this.errMessage = "Veuillez rentrer une adresse email valide.";
              } else {
                this.errMessage =
                  this.errMessage +
                  "Veuillez rentrer une adresse email valide. ";
              }
            }
          }

          /**
           * If job include in form
           */

          if (job) {
            form.append("job", job);
          }

          /**
           * Check if in validation have an error(false) if not fetch update
           */

          if (inputsValidation.length > 0) {
            if (checker(inputsValidation) === true) {
              if (
                this.file ||
                this.userName ||
                this.userLastname ||
                this.userEmail ||
                this.userJob
              ) {
                fetch(
                  `${this.$store.state.baseUrl}/api/auth/user/update?id=${id}`,
                  {
                    method: "PUT",
                    headers: {
                      Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                    body: form,
                  }
                );
              }
              setTimeout(() => {
                location.reload();
              }, 100);
            }
          }
        };

        verifyInfoInputs(
          this.$refs.file.files[0],
          this.userName,
          this.userLastname,
          this.userEmail,
          this.userJob,
          id
        );

        let verifyPasswordInputs = (password) => {
          const inputsValidation = [];

          /**
           * Validator for old password
           */

          if (password.oldPassword) {
            if (password.oldPassword.match(regexPassword)) {
              inputsValidation.push(true);
            } else {
              inputsValidation.push(false);
            }
          }

          /**
           * Validator for new password
           */

          if (password.newPassword) {
            if (password.newPassword.match(regexPassword)) {
              inputsValidation.push(true);
            } else {
              inputsValidation.push(false);
            }
          }

          /**
           * Check if in validation have an error(false) if not fetch update
           */

          if (inputsValidation.length > 0) {
            if (checker(inputsValidation) === true) {
              if (password.oldPassword && password.newPassword) {
                fetch(
                  `${this.$store.state.baseUrl}/api/auth/user/password?id=${id}`,
                  {
                    method: "PUT",
                    headers: {
                      Authorization: "Bearer " + localStorage.getItem("token"),
                      Accept: "application/json",
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(password),
                  }
                );
              }
              setTimeout(() => {
                location.reload();
              }, 100);
            } else {
              this.errMessage =
                this.errMessage +
                "Veuillez rentrer un mot de passe valide. Le mot de passe peut contenir : (Lettres, Chiffres et Caractères spéciaux correspondants : -_!.?)";
            }
          }
        };

        verifyPasswordInputs(
          {
            oldPassword: this.userOldPassword,
            newPassword: this.userNewPassword,
          },
          this.errMessage
        );
      };

      verifyInputs();
    },
  },
};
</script>

<style scoped>
#user-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15%;
}

#user-page {
  margin: 0 0 5% 0;
  padding: 2%;
  width: 95vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* background: var(--third-color); */
  border: 2px var(--main-color) solid;
  border-radius: 5px;
}

.user {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5%;
}

.wrapper-info {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
}

.modify {
  margin: 25px 0 25px 0;
  display: inline-flex;
  align-items: flex-end;
  justify-content: center;
  gap: 15px;
}

button {
  all: unset;
  padding: 15px 30px 15px 30px;
  border-radius: 500px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

#delete {
  color: var(--accent-color);
}

#delete:hover {
  background: var(--accent-color);
  color: var(--third-color);
}

#update {
  background: var(--main-color);
  color: var(--third-color);
}

img {
  width: 200px;
  height: 200px;
}

/* form */

.form-update {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 3% 1% 1% 1%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  background: var(--smooth-color);
  border: 2px var(--main-color) solid;
  border-radius: 5px;
}

.close {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 50%;
}

.close:hover {
  background: var(--accent-color);
}

.close:hover > span {
  background: var(--smooth-color);
}

.close > span {
  position: absolute;
  margin: 0;
  padding: 0;
  width: 10px;
  height: 2px;
  background: #000;
  transform: rotate(45deg);
}

.close > span:nth-child(1) {
  transform: rotate(-45deg);
}

input {
  all: unset;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: left;
  padding: 5px 30px 5px 30px;
  height: 55px;
  /* border: 2px var(--accent-color) solid; */
  background: var(--third-color);
  border-radius: 5px;
}

input[type="file"] {
  padding: 0;
  height: 100%;
  width: 100%;
  display: flex;
  background: transparent;
}

input[type="file"]::-webkit-file-upload-button {
  padding: 15px 30px 15px 30px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: var(--main-color);
  color: var(--smooth-color);
  border: none;
  border-radius: 500px;
  cursor: pointer;
}

.info {
  margin: 0 0 5% 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 15px;
}

.fullname {
  display: inline-flex;
  gap: 15px;
}

.password {
  margin: 0 0 5% 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 15px;
}

.wrapper-password {
  display: flex;
  flex-direction: row;
  gap: 15px;
}

.error-message {
  width: 80%;
  color: var(--accent-color);
}

button[type="submit"] {
  background: var(--main-color);
  color: var(--third-color);
}
</style>

<style scoped>
@media screen and (max-width: 640px) {
  .modify {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .modify > img {
    width: 100px;
    height: 100px;
  }

  .form-update {
    padding: 5%;
    width: 96vw;
    height: 95vh;
    gap: 0;
    overflow: scroll;
  }

  .info > h2 {
    margin: 25px 0 0 0;
  }

  input {
    padding: 20px 10px 20px 10px;
    height: 25px;
  }

  input[type="file"] {
    padding: 0;
    height: auto;
    width: 100%;
    background: transparent;
  }

  input[type="file"]::-webkit-file-upload-button {
    padding: 15px 30px 15px 30px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: var(--main-color);
    color: var(--smooth-color);
    border: none;
    border-radius: 500px;
    cursor: pointer;
  }
}
</style>
