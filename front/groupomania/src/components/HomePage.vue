<template>
  <div id="home">
    <User />
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
    <div v-if="token" id="dashboard">
      <Feed />
      <Pannel />
    </div>
  </div>
</template>

<script>
import User from "./UserLogged.vue";
import Feed from "./FeedHome.vue";
import Pannel from "./PannelHome.vue";

export default {
  name: "HomePage",
  components: {
    User,
    Feed,
    Pannel,
  },
  data() {
    return {
      token: true,
      limit: [25, 50, 100],
    };
  },
  created() {
    this.$store.dispatch("getPosts", {
      limit: this.limit[0],
      comment: 0,
    });
  },
  methods: {
    updateLimit() {
      this.$store.dispatch("getPosts", {
        limit: this.$refs.limit.value,
        comment: 0,
      });
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
  padding: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
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
  padding: 0 0 5vh 0;
  width: 25vmax;
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  gap: 25px;
  /* flex: 1 1 200px; */
}

/* @media screen and (max-width: 768px) {
  #home {
    height: 100%;
  }

  #dashboard {
    flex-direction: column;
  }
} */
</style>
