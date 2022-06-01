<template>
  <div id="user-profile">
    <div class="user">
      <div class="modify">
        <button
          v-if="me == this.$store.state.user.id || admin === true"
          @click="deleteUser()"
          id="delete"
        >
          Supprimer l'utilisateur
        </button>
        <img src="@/assets/Groupomania-user.svg" alt="" />
        <button
          v-if="me === true || admin == true"
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
            :placeholder="user.name"
            v-model="user.name"
          />
          <input
            type="text"
            name="lastname"
            id="lastname"
            :placeholder="user.lastname"
          />
        </div>
        <input type="email" name="email" id="email" :placeholder="user.email" />
        <select id="job" ref="job" class="input">
          <option selected disabled hidden>{{ user.job }}</option>
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
          />
          <input
            type="password"
            name="newpassword"
            id="newpassword"
            placeholder="Nouveau mot de passe"
          />
        </div>
      </div>
      <button @click.prevent="" type="submit">Modifier</button>
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
      form: false,
      userProfile: {},
    };
  },
  // beforeUpdate() {
  //   this.$store.dispatch("checkToken");
  // },
  mounted() {
    if (router.currentRoute.path == "/me") {
      this.getUser(localStorage.getItem("id"));
    } else if (router.currentRoute.path == "/user") {
      this.getUser(router.currentRoute.query.id);
    }
  },
  computed: {
    ...mapGetters(["user"]),
    Fullname: {
      get() {
        let fullname = "";
        if (router.currentRoute.path == "/me") {
          fullname = this.$store.state.user.name + " " + this.user.lastname;
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
          this.userProfile = user[0];
          console.log(this.userProfile.admin);
        });
    },
    deleteUser() {
      // window.confirm("Voulez vous réelement supprimer l'utilisateur?");

      if (confirm("Voulez vous réelement supprimer l'utilisateur?") == true) {
        let id = this.user.id;
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
    },
    updateUser() {
      let id = null;

      let user = {};

      if (router.currentRoute.path == "/me") {
        id = this.$store.state.user.id;
      } else if (router.currentRoute.path == "/user") {
        // after set function to get user with id give id
      }
      fetch(`${this.$store.state.baseUrl}/api/auth/user/update?id=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(user),
      });
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
  width: 50vw;
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
  margin: 0 0 5% 0;
  display: inline-flex;
  align-items: flex-end;
  justify-content: flex;
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
  width: 250px;
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
  align-items: flex-end;
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

button[type="submit"] {
  background: var(--main-color);
  color: var(--third-color);
}
</style>
