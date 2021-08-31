<template>
  <a
    id="container"
    :href="link"
  >
    <div id="title">
      {{ title }}
    </div>
    <div id="subtitle">
      {{ subtitle }}
    </div>
    <div id="description">
      {{ desc }}
    </div>
    <div id="row">
      <div id="container-inner">
        {{ lang }}
      </div>
      <div id="container-inner">
        {{ date }}
      </div>
    </div>
  </a>
</template>

<script>
export default {
  name: "ProjectTile",
  props: {
    title: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
    desc: {
      type: String,
      default: '',
    },
    lang: {
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
    width: 35%;
    background-color: var(--accent1);
    margin-top: 20px;
    padding: 10px;
    border-radius: 10px;
    transition: background-color 300ms ease-in-out;
    box-shadow: 0 2px 1px rgb(0 0 0 / 0.2);
    font-size: 8pt;
  }

  #top {
    display: flex;
    flex-direction: row;
  }

  #subtitle {
    align-self: flex-start;
    font-style: italic;
    margin-top: 15px;
    font-size: 10pt;
  }

  #title {
    align-self: flex-start;
    font-weight: bold;
    font-size: 15pt;
  }

  #description {
    margin-top: 20px;
    font-size: 8pt;
    text-align: left;
  }
</style>