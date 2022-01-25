<template>
  <router-link
    class="container"
    :to="link"
  >
    <div id="title">
      {{ title }}
    </div>
    <div id="description">
      {{ desc }}
    </div>
    <div id="info">
      <div class="container-inner">
        <i><b>{{ date }}</b></i>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "FeaturedProjectTile",
  props: {
    title: {
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
  .container {
    text-decoration: none;
    color: var(--text);
    background-color: var(--container);
    display: flex;
    flex-direction: column;
    width: 350px;
    padding: 30px;
    margin: 10px;
    border-radius: 20px;
    border: solid transparent 3px;
    box-shadow: 0 5px 1px rgb(0 0 0 / 0.2);
    transition: border-color 200ms ease-in-out, background-color 300ms ease-in-out;
  }

  .container:hover {
    border-color: var(--text);
  }

  .container-inner {
    color: var(--accent2);
    margin-top: 5px;
    transition: color 300ms ease-in-out;
    text-align: right;
  }

  #row {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
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
    margin-top: 4px;
    font-size: 13pt;
  }

  #title {
    text-align: left;
    font-weight: bold;
    font-size: 25pt;
  }

  #description {
    margin-top: 20px;
    margin-bottom: 20px;
    text-align: left;
  }
</style>