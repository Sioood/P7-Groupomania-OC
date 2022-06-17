<template>
  <!-- Template for possible trending post such most liked when this function added in the app -->
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
</template>

<script>
export default {
  name: "TrendingHome",
};
</script>

<style scoped>
/* trending */

.post-trend {
  padding: 5%;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
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
  align-items: flex-start;
  justify-content: flex-start;
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
  align-items: flex-start;
  justify-content: space-between;
  gap: 5px;
}

.wrapper-text-trend > * {
  margin: 0;
}

.post-content-trend {
  padding: 0 25% 0 15px;
  width: 100%;
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
</style>
