<template>
  <div>
    i can be easily reached via:
  </div>
  <br>
  <div id="container">
    <ContactButton
      text="e-mail"
      link="mailto:nathangchay@gmail.com"
    />
    <ContactButton
      text="discord"
      link="https://discordapp.com/users/136661471462424576"
    />
  </div>
  <br>
  <div>
    you can also find me on:
  </div>
  <br>
  <div id="container">
    <ContactButton
      text="github"
      link="https://github.com/natetheneet"
    />
    <ContactButton
      text="linkedin"
      link="https://www.linkedin.com/in/nathan-chay-709a8719a/"
    />
  </div>
</template>

<script>
import ContactButton from '../components/ContactButton.vue';

export default {
  name: 'Contact',
  components: {
    ContactButton,
  }
};
</script>

<style>
 #container {
   display: flex;
   flex-direction: row;
 }
</style>