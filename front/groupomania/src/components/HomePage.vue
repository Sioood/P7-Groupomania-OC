<template>
  <div id="home">
    <h1>Hello World</h1>
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
      <Trending />
      <Pannel />
    </div>
  </div>
</template>

<script>
import Feed from "./FeedHome.vue";
import Trending from "./TrendingHome.vue";
import Pannel from "./PannelHome.vue";

export default {
  name: "HomePage",
  components: {
    Feed,
    Trending,
    Pannel,
  },
  data() {
    return {
      token: true,
      limit: [1, 2, 3],
    };
  },
  created() {
    this.$store.dispatch("getPosts", {
      limit: this.limit[0],
      comment: 0,
    });
  },
  computed: {
    fullName: {
      // getter
      get() {
        return this.$refs.post.getAttribute("data-user-id");
      },
    },
  },
  methods: {
    updateLimit() {
      this.$store.dispatch("getPosts", {
        limit: this.$refs.limit.value,
        comment: 0,
      });
    },
    postDate(date) {
      const today = new Date();

      const postDate = new Date(date);
      console.log(today.getTime() + " - " + postDate.getTime());
      let formattedDate = postDate.toLocaleString();
      // date.split("T")[0] + " - " + date.split("T")[1].split(".")[0];
      if (today - postDate <= 86400000) {
        // 86400000 is one day - post less than 1 day old display only time
        formattedDate = postDate.toLocaleString().split(",")[1];
      }

      return formattedDate;
    },
  },
};
</script>

<style scoped>
#home {
  width: 100%;
  height: 91.6vh;
  overflow: hidden;
}

/* Dashboard */

#dashboard {
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
  flex: 1 1 600px;
  overflow-y: scroll;
}

/* Trending */

#trending {
  padding: 15px;
  flex: 1 1 150px;
  background: var(--smooth-color);
  text-align: left;
  overflow-y: scroll;
}

/* Pannel */

#pannel {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  gap: 15px;
  flex: 1 1 200px;
}

@media screen and (max-width: 768px) {
  #home {
    height: 100%;
  }

  #dashboard {
    flex-direction: column;
  }
}
</style>
