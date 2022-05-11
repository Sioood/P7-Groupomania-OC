<template>
  <div id="home">
    <h1>Hello World</h1>
    <div id="dashboard">
      <div id="feed">
        <div class="post">
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
                <div id="date">01/01/0001</div>
              </div>
            </div>
            <div class="post-content">
              <div class="caption">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla,
                voluptates sint? Pariatur dolor corporis sed, iusto laudantium
                reprehenderit facere fuga voluptate autem suscipit iure optio
                nam provident blanditiis doloribus tenetur.
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
};
</script>

<style scoped>
#home {
  width: 100%;
  height: 100%;
}

#dashboard {
  width: 100%;
  height: 84vh;
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
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
}

.post-info {
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
  gap: 30px;
}

.wrapper-text {
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
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
