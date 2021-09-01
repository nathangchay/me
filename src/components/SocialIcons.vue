<template>
  <div id="icons">
    <a href="https://github.com/natetheneet">
      <img src="../assets/github.png">
      <span>github</span>
    </a>

    <a href="https://www.linkedin.com/in/nathan-chay-709a8719a/">
      <img src="../assets/linkedin.png">
      <span>linkedin</span>
    </a>
  </div>
</template>

<script>
export default {
  name: 'SocialIcons',
}
</script>

<style scoped>
#icons {
  position: fixed;
  top: 30px;
  left: 30px;
  width: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-right: 30px;
}

#icons a {
  display: flex;
  flex-direction: row;
  background-color: rgb(50, 50, 50);
  border-radius: 5px;
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
  width: 40px;
  align-self: flex-start;
  justify-content: space-between;
  transition: width 200ms ease-in-out;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  text-decoration: none;
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
  margin-left: 20px;
  margin-right: 15px;
  text-decoration: none;
  transition: opacity 200ms 100ms ease-in-out;
}

#icons a:hover {
  width: 170px;
}

#icons a:hover img {
  filter: blur(2px);
}

#icons a:hover span {
  opacity: 1;
}
</style>
