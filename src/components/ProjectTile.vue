<template>
  <router-link
    id="container"
    :to="link"
  >
    <div id="title">
      {{ title }}
    </div>
    <div id="description">
      {{ desc }}
    </div>
    <div id="info">
      <div id="container-inner">
        <i><b>{{ date }}</b></i>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "ProjectTile",
  props: {
    title: {
      type: String,
      default: '',
    },
    desc: {
      type: String,
      default: '',
    },
    date: {
      type: String,
      default: '',
    },
    link: {
      type: String,
      default: '',
    },
  }
}
</script>

<style scoped>
#container {
    text-decoration: none;
    color: var(--text);
    background-color: var(--container);
    display: flex;
    flex-direction: column;
    width: 200px;
    padding: 15px;
    margin: 10px;
    border-radius: 20px;
    border: solid transparent 3px;
    box-shadow: 0 4px 1px rgb(0 0 0 / 0.2);
    transition: border-color 200ms ease-in-out, background-color 300ms ease-in-out;
  }

  #container:hover {
    border-color: var(--text);
  }

  #row {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }

  #container-inner {
    color: var(--accent2);
    font-size: 8pt;
    margin-top: 2px;
    transition: color 300ms ease-in-out;
    text-align: right;
  }

  #info {
    margin-top: auto;
    align-self: flex-end;
  }

  #top {
    display: flex;
    flex-direction: row;
  }

  #subtitle {
    align-self: flex-start;
    font-style: italic;
    margin-top: 3px;
    font-size: 10pt;
  }

  #title {
    align-self: flex-start;
    font-weight: bold;
    font-size: 15pt;
  }

  #description {
    margin-top: 15px;
    font-size: 8pt;
    text-align: left;
    margin-bottom: 10px;
  }
</style>