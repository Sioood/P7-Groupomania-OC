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
      <div id="feed">
        <a
          v-for="post in $store.state.posts"
          :href="post.id"
          :key="post.id"
          ref="post"
          :data-user-id="post.UserId"
          class="post"
        >
          <img
            class="user"
            src="@/assets/Groupomania-user.svg"
            alt="groupomania user"
          />
          <div class="wrapper-post">
            <div class="post-info">
              <div class="wrapper-text">
                <h3>{{ fullName }}</h3>
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
        </a>
      </div>
      <div id="trending">
        <h2>Trending</h2>
        <a
          v-for="post in $store.state.posts"
          :href="post.id"
          :key="post.id"
          class="post-trend"
        >
          <div class="wrapper-post-trend">
            <div class="post-info-trend">
              <img
                class="user-trend"
                src="@/assets/Groupomania-user.svg"
                alt="groupomania user"
              />
              <div class="wrapper-text-trend">
                <h4>Lastname Name</h4>
                <h5>Job</h5>
              </div>
            </div>
            <div class="post-content-trend">
              <div class="caption-trend">
                {{ post.caption }}
              </div>
              <img
                id="post-img"
                src="@/assets/Groupomania-user.svg"
                alt="groupomania user"
              />
            </div>
          </div>
        </a>
      </div>
      <div id="pannel">
        <input type="search" name="" id="search" placeholder="🔎 Rechercher" />
        <a href="" class="button">Profil</a>
        <h3>Nouveau post</h3>
        <textarea name="caption" id="textarea" cols="30" rows="10"></textarea>
        <div class="wrapper-buttons">
          <input type="file" name="file" placeholder="hello" ref="files" />
          <button id="submitPost">Poster</button>
        </div>
      </div>
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

.button {
  all: unset;
  padding: 15px 30px 15px 30px;
  background: var(--third-color);
  color: var(--main-color);
  border-radius: 500px;
  font-weight: 600;
  cursor: pointer;
}

#feed {
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
  color: var(--main-color);
  border-bottom: 1px var(--main-color) solid;
  text-decoration: none;
}

.user {
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
  padding: 0 0 0 15px;
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

/* trending */

#trending {
  padding: 15px;
  flex: 1 1 150px;
  background: var(--smooth-color);
  text-align: left;
  overflow-y: scroll;
}

.post-trend {
  padding: 5%;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: start;
  gap: 25px;
  color: var(--main-color);
  border-bottom: 1px var(--main-color) solid;
  text-decoration: none;
}

.user-trend {
  margin: 0;
  width: 35px;
  height: 35px;
}

.wrapper-post-trend {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  gap: 15px;
}

.post-info-trend {
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: left;
  justify-content: space-between;
  gap: 15px;
}

.wrapper-text-trend {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
  gap: 5px;
}

.wrapper-text-trend > * {
  margin: 0;
}

.post-content-trend {
  /* padding: 0 0 0 15px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: left;
  gap: 15px;
}

.caption-trend {
  width: 100%;
}

#pannel {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  gap: 15px;
  flex: 1 1 200px;
}

h3 {
  margin: 35px 0 0 0;
  width: 90%;
  text-align: left;
}

#search {
  margin: 15px 0 0 0;
  width: 90%;
  border-radius: 500px;
}

#textarea {
  all: unset;
  padding: 5%;
  width: 80%;
  background: var(--third-color);
  border-radius: 5px;
  text-align: left;
}

.wrapper-buttons {
  text-align: center;
  width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  gap: 25px;
}

input[type="file"] {
  padding: 0;
  height: 100%;
  width: 50%;
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

/* #file {
  padding: 15px 30px 15px 30px;
  background: var(--main-color);
  color: var(--smooth-color);
  border-radius: 500px;
} */

/* #file-upload-button {
  padding: 15px 30px 15px 30px;
  background: var(--main-color);
  color: var(--smooth-color);
  border-radius: 500px;
} */

#submitPost {
  all: unset;
  height: 30%;
  padding: 15px 30px 15px 30px;
  background: var(--accent-color);
  color: var(--smooth-color);
  border-radius: 500px;
  font-weight: 600;
  cursor: pointer;
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
