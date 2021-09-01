<template>
  <a
    id="button"
    :href="link"
  >
    {{ text }}
  </a>  
</template>

<script>
export default {
  name: "ContactButton",
  props: {
    text: {
      type: String,
      default: "",
    },
    link: {
      type: String,
      default: "",
    },
  }
}
</script>

<style scoped>
  #button {
    text-decoration: none;
    color: var(--text);
    background-color: var(--container);
    padding: 15px;
    border-radius: 15px;
    border: solid transparent 2px;
    cursor: pointer;
    box-shadow: 0 3px 1px rgb(0 0 0 / 0.2);
    transition: border-color 200ms ease-in-out, background-color 300ms ease-in-out;
  }

  #button:hover {
  border-color: var(--text)
}
</style>