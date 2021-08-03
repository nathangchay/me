<template>
  <div id="container">
    <div id="icons">
      <a href="https://github.com/natetheneet">
        <img src="../assets/github.png">
        <span>github</span>
      </a>

      <a href="https://twitter.com/latencygirl">
        <img src="../assets/twitter.png">
        <span>twitter</span>
      </a>

      <a href="https://www.instagram.com/natetheneet/">
        <img src="../assets/instagram.png">
        <span>instagram</span>
      </a>

      <a href="https://www.linkedin.com/in/nathan-chay-709a8719a/">
        <img src="../assets/linkedin.png">
        <span>linkedin</span>
      </a>

      <a href="https://natetheneet.tumblr.com/">
        <img src="../assets/tumblr.png">
        <span>tumblr</span>
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
  position: relative;
  display: flex;
  flex-direction: row;
  padding: 30px;
  background-color: rgb(30, 30, 30);
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  border-radius: 10px;
}

#title-container {
  align-self: center;
  flex: 1;
  justify-self: flex-end;
}

#icons {
  width: 40px;
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
  display: flex;
  flex-direction: row-reverse;
  background-color: rgb(50, 50, 50);
  border-radius: 5px;
  padding: 5px;
  margin-top: 5px;
  margin-bottom: 5px;
  width: 40px;
  align-self: flex-end;
  justify-content: space-between;
  transition: width 200ms ease-in-out;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
}

#icons img {
  height: 40px;
  width: 40px;
  transition: filter 200ms ease-in-out;
}

#icons span {
  color: white;
  opacity: 0;
  align-self: center;
  margin-left: 10px;
  margin-right: 15px;
  text-decoration: none;
  transition: opacity 200ms 100ms ease-in-out;
}

#icons a:hover {
  width: 150px;
}

#icons a:hover img {
  filter: blur(2px);
}

#icons a:hover span {
  opacity: 1;
}
</style>
