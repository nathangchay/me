<template>
  <div>
    you can contact me via:
    <ContactButton
      text="e-mail"
      link="mailto:nathangchay@gmail.com"
    />
    <ContactButton
      text="e-mail"
      link="mailto:nathangchay@gmail.com"
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

</style>