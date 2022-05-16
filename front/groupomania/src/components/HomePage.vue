<template>
  <div id="home">
    <h1>Hello World</h1>
    <select @change="updateLimit()" name="limit" id="limit" ref="limit">
      <!-- <option selected>{{ limit }}</option> -->
      <option v-for="number in limit" :key="number" :value="number">
        {{ number }}
      </option>
    </select>
    <div v-if="token" id="dashboard">
      <div id="feed">
        <div v-for="post in $store.state.posts" :key="post.id" class="post">
          <img
            id="user"
            src="@/assets/Groupomania-user.svg"
            alt="groupomania user"
          />
          <div class="wrapper-post">
            <div class="post-info">
              <div class="wrapper-text">
                <h3>Lastname Name</h3>
                —
                <h4>Job</h4>
              </div>
              <div id="date">{{ postDate(post.createdAt) }}</div>
            </div>
            <div class="post-content">
              <div class="caption">
                {{ post.caption }}
              </div>
              <img
                id="post-img"
                src="@/assets/Groupomania-user.svg"
                alt="groupomania user"
              />
            </div>
          </div>
        </div>
      </div>
      <div id="trend"></div>
      <div id="pannel"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
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

#dashboard {
  width: 100%;
  height: 100%;
  display: flex;
  background: #000;
}

#feed {
  background: green;
  flex: 1 1 600px;
  overflow-y: scroll;
}

.post {
  padding: 5%;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: start;
  gap: 25px;
  background: var(--third-color);
}

#user {
  margin: 0;
  width: 75px;
  height: 75px;
}

.wrapper-post {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  gap: 25px;
}

.post-info {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
}

.wrapper-text {
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
}

.wrapper-text > * {
  margin: 0;
}

.post-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: left;
  gap: 15px;
}

.caption {
  width: 100%;
}

#post-img {
  width: 100%;
}

#trend {
  background: #000;
  flex: 1 1 150px;
}

#pannel {
  background: red;
  flex: 1 1 200px;
}
</style>
