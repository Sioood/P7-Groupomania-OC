<template>
  <div id="user-page">
    <div v-if="me === true" class="me wrapper-user">
      <div class="wrapper-info">
        <UserPage :fullname="fullname" :email="user.email" :job="user.job" />
      </div>
    </div>
    <div v-if="me === false" class="user wrapper-user">
      <UserPage />
    </div>
    <div v-if="me === true || admin == true" class="modify">
      <button @click="deleteUser()" id="delete">Supprimer l'utilisateur</button>
      <button @click="form = true" id="update">Mettre à jour le profil</button>
    </div>
    <form v-if="form == true" action="" class="form-update">
      <div @click="form = false" class="close"><span></span><span></span></div>
      <div class="info">
        <h2>Informations</h2>
        <div class="fullname">
          <input type="text" name="name" id="name" :placeholder="user.name" />
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
      me: null,
      admin: null,
      form: false,
    };
  },
  mounted() {
    if (router.currentRoute.path == "/user") {
      this.me = false;
    } else if (router.currentRoute.path == "/me") {
      this.me = true;
    }
  },
  computed: {
    ...mapGetters(["user"]),
    fullname: {
      get() {
        return this.user.name + " " + this.user.lastname;
      },
    },
  },
  methods: {
    deleteUser() {
      // window.confirm("Voulez vous réelement supprimer l'utilisateur?");

      if (confirm("Voulez vous réelement supprimer l'utilisateur?") == true) {
        let id = this.user.id;
        let path = "/auth";
        if (router.currentRoute.path == "/user") {
          // after set function to get user with id give id
          path = "/home";
        }

        fetch(`http://localhost:3000/api/auth/user/delete?id=${id}`, {
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
        id = this.user.id;
      } else if (router.currentRoute.path == "/user") {
        // after set function to get user with id give id
      }
      fetch(`http://localhost:3000/api/auth/user/update?id=${id}`, {
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
#user-page {
  margin: 5% 0 15% 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.wrapper-user {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5%;
}

.wrapper-info {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
}

.modify {
  display: inline-flex;
  align-items: center;
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
  width: 250px;
}

h1 {
  font-size: 50px;
}

/* form */

.form-update {
  position: absolute;
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
