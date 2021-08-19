<template>
  <div id="container">
    <div id="title">
      Project 1
    </div>
    <div id="description">
      This is the description of the project. I made this because I was really
      bored. It's alright I guess.
    </div>
  </div>
</template>

<style scoped>
  #container {
    background-color: rgb(50, 50, 50);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 500px;
    padding: 30px;
    border-radius: 20px;
  }

  #title {
    font-weight: bold;
    font-size: 25pt;
  }

  #description {
    margin-top: 15px;
  }
</style>