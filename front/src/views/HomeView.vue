<template>
  <div id="home">
    <User :username="user.name" :userlastname="user.lastname" :url="`/me`" />
    <div class="wrapper-limit">
      <label for="limit">Nombre de posts à afficher :</label>
      <select
        @change="updateLimit()"
        name="limit"
        id="limit"
        class="select"
        ref="limit"
      >
        <!-- <option selected>{{ limit }}</option> -->
        <option v-for="number in limit" :key="number" :value="number">
          {{ number }}
        </option>
      </select>
    </div>
    <div id="dashboard">
      <Feed />
      <Pannel :url="`/me`" />
      <div @click="openPannel()" id="open-pannel" class="">
        <span></span><span></span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import User from "@/components/UserLogged.vue";
import Feed from "@/components/FeedHome.vue";
import Pannel from "@/components/PannelHome.vue";

export default {
  name: "HomePage",
  components: {
    User,
    Feed,
    Pannel,
  },
  data() {
    return {
      // userLogged: {},
      limit: [25, 50, 100],
    };
  },
  created() {
    /**
     * Get posts with first limit
     */
    this.getPosts({
      id: null,
      userId: null,
      limit: this.limit[0],
      comment: false,
      commentLimit: 1,
    });
  },
  // mounted() {
  //   this.getUser();
  // },
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    ...mapActions(["getPosts"]),
    // getUser() {
    //   let id = localStorage.getItem("id");
    //   fetch(`${this.$store.state.baseUrl}/api/auth/user/${id}`, {
    //     headers: {
    //       Authorization: "Bearer " + localStorage.getItem("token"),
    //     },
    //   })
    //     .then((response) => {
    //       return response.json();
    //     })
    //     .then((user) => {
    //       this.userLogged = user[0];
    //       // console.log(user[0]);
    //     });
    //   // console.log(this.userLogged);
    //   // console.log(this.user);
    // },

    /**
     * Reload posts with the limit selected by the user
     */
    updateLimit() {
      this.getPosts({
        id: null,
        userId: null,
        limit: this.$refs.limit.value,
        comment: false,
        commentLimit: 1,
      });
    },

    /**
     * When user is on mobile diplay pannel for create post with a button
     */
    openPannel() {
      const pannel = document.getElementById("pannel");
      const openPannel = document.getElementById("open-pannel");

      // if (openPannel.classList != "active") {
      //   pannel.style.display = "flex";
      //   // console.log("e");
      // } else {
      //   pannel.style.display = "none";
      // }
      pannel.classList.toggle("active");
      openPannel.classList.toggle("active");
    },
  },
};
</script>

<style scoped>
#home {
  width: 100%;
  height: auto;
  overflow: hidden;
}

#profile-icon {
  margin: 0 0 0 1%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

/* Dashboard */

#dashboard {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
}

#dashboard > * {
  border: 1px var(--main-color) solid;
}

.wrapper-limit {
  margin: 15px;
  padding: 1%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 15px;
}

.select {
  all: unset;
  height: 25px;
  width: 35px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  /* border: 2px var(--accent-color) solid; */
  background: var(--third-color);
  border-radius: 5px;
  cursor: pointer;
}

/* Feed */

#feed {
  width: 74vmax;
  min-height: 80.1vh;
  margin: 0 0 11px 0;
  padding: 0 0 5vh 0;
  /* flex: 1 1 600px; */
  overflow-y: scroll;
}

/* Trending */

#trending {
  padding: 15px 15px 5vh 15px;
  flex: 1 1 150px;
  background: var(--smooth-color);
  text-align: left;
  overflow-y: scroll;
}

/* Pannel */

#pannel {
  position: fixed;
  right: 0;
  bottom: 5px;
  padding: 0 0 5vh 0;
  width: 25vmax;
  height: 76.66vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 25px;
  /* flex: 1 1 200px; */
}

#open-pannel {
  display: none;
}

@media screen and (max-width: 640px) {
  #feed {
    width: 100%;
    min-height: 80.1vh;
    margin: 0 0 11px 0;
    padding: 0 0 5vh 0;
    /* flex: 1 1 600px; */
    overflow-y: scroll;
  }

  #pannel {
    position: fixed;
    top: 50%;
    left: 20%;
    transform: translate(-20%, -50%);
    width: 70%;
    height: 95%;
    display: none;
    gap: 10px;
    background: var(--smooth-color);
  }

  #pannel.active {
    display: flex;
  }

  #open-pannel {
    position: fixed;
    bottom: 15px;
    right: 15px;
    width: 50px;
    height: 50px;
    display: flex;
    background: var(--main-color);
    border-radius: 50%;
    transition: all 0.05s ease-in-out;
  }

  #open-pannel.active {
    background: var(--accent-color);
    transform: rotate(45deg);
  }

  #open-pannel > span {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 3px;
    background: var(--third-color);
    transform: translate(-50%, -50%);
    pointer-events: none;
  }

  #open-pannel > span:nth-child(1) {
    /* height: 2.75px; */
    transform: translate(-50%, -50%) rotate(90deg);
  }
}
</style>
