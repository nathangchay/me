<template>
  <div
    :class="{ button: !revealed, container: revealed }"
    @click="reveal"
  >
    {{ revealed ? text : "reveal" }}
  </div>  
</template>

<script>
export default {
  name: "HiddenContainer",
  props: {
    text: {
      type: String,
      default: "",
    },
  },
  data: () => ({
    revealed: false,
  }),
  methods: {
    reveal() {
      this.revealed = true;
    }
  },
}
</script>

<style scoped>
  .button {
    text-decoration: none;
    color: var(--text);
    background-color: var(--container);
    padding: 7px 15px;
    margin: 5px;
    border-radius: 15px;
    border: solid transparent 2px;
    cursor: pointer;
    box-shadow: 0 3px 1px rgb(0 0 0 / 0.2);
    transition: border-color 200ms ease-in-out, background-color 300ms ease-in-out;
  }

  .container {
    color: var(--text);
    background-color: var(--container-dark);
    padding: 7px 15px;
    margin: 5px;
    border-radius: 15px;
    border: solid transparent 2px;
  }

  .button:hover {
  border-color: var(--text)
}
</style>