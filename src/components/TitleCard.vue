<template>
  <div id="container">
    <div id="icons">
      <a href="https://github.com/natetheneet">
        <img src="../assets/github.png">
      </a>

      <a href="https://twitter.com/latencygirl">
        <img src="../assets/twitter.png">
      </a>

      <a href="https://www.instagram.com/natetheneet/">
        <img src="../assets/instagram.png">
      </a>

      <a href="https://www.linkedin.com/in/nathan-chay-709a8719a/">
        <img src="../assets/linkedin.png">
      </a>

      <a href="https://natetheneet.tumblr.com/">
        <img src="../assets/tumblr.png">
      </a>
    </div>

    <div id="title-container">
      <span class="title">natetheneet</span> <br> <br>
      <span class="subtitle">software engineer</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TitleCard',
};
</script>

<style scoped>
#container {
  display: flex;
  flex-direction: row;
  height: 70%;
  padding: 30px;
  background-color: rgb(30, 30, 30);
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  border-radius: 10px;
}

#title-container {
  align-self: center;
}

#icons {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-right: 30px;
}

.title {
  font-weight: bold;
  font-size: 25pt;
}

.subtitle {
  font-size: 14pt;
}

#icons a {
  background-color: rgb(40, 40, 40);
  border-radius: 5px;
  padding: 5px;
  margin-top: 5px;
  margin-bottom: 5px;
  width: 50px;
  align-self: flex-end;
  transition: width 200ms ease-in-out;
}

#icons img {
  height: 40px;
  width: 40px;
  transition: filter 200ms ease-in-out;
}

#icons a:hover {
  width: 100px;
}

#icons img:hover {
  filter: blur(2px);
}
</style>
