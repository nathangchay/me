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
      <img
        id="card-image"
        src="../assets/me.png"
        align="right"
      >
      <h1 class="title">
        nate
      </h1>
      <h3 class="subtitle">
        engineer &amp; hobbyist
      </h3>
      <p class="about">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
        scelerisque euismod pharetra. Quisque sollicitudin mi vel odio
        tincidunt, nec bibendum risus eleifend. Maecenas elit justo,
        molestie at mauris ut, pulvinar ultricies nibh. Quisque ut dictum
        neque. Mauris rhoncus arcu ut aliquet suscipit. Nunc fermentum
        eleifend dui, sed convallis libero venenatis nec. Suspendisse ac
        risus euismod risus ultrices consequat in eget sem. Nam cursus sem
        nibh, id aliquam neque hendrerit a.
      </p>
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
  max-width: 30%;
  display: flex;
  flex-direction: row;
  padding: 30px;
  background-color: rgb(30, 30, 30);
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  border-radius: 10px;
  transform: perspective(800px);
}

#title-container {
  align-self: flex-start;
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

#card-image {
  width: 150px;
  height: 150px;
  margin-left: 30px;
  margin-bottom: 30px;
  margin: 25px;
  border-radius: 30px;
  border: rgb(50, 50, 50) 15px solid;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
}

.about {
  font-size: 12pt;
  flex-wrap: wrap;
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
