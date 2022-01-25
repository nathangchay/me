<template>
  <div>
    i can be easily reached via e-mail:
  </div>
  <br>
  <div class="container">
    <HiddenContainer text="nathangchay@gmail.com" />
  </div>
  <br>
  <div>
    you can also find me on:
  </div>
  <br>
  <div class="container">
    <ContactButton
      text="github"
      link="https://github.com/nathangchay"
    />
    <ContactButton
      text="linkedin"
      link="https://www.linkedin.com/in/nathan-chay-709a8719a/"
    />
  </div>
</template>

<script>
import ContactButton from '../components/ContactButton.vue';
import HiddenContainer from '../components/HiddenContainer.vue';

export default {
  name: 'Contact',
  components: {
    ContactButton,
    HiddenContainer,
  }
};
</script>

<style>
  .container {
    display: flex;
    flex-direction: row;
  }
</style>