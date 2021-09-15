<template>
  <h1>
    osu! team compare
  </h1>
  <h2>
    enter your mp links below:
  </h2>

  <div id="row">
    <div id="team-column">
      <h3>
        your team
      </h3>

      <input
        v-for="mp in userMp"
        id="mp"
        :key="mp"
        v-model="mp.link"
      >

      <div
        id="add"
        @click="addMp(userMp)"
      >
        +
      </div>
    </div>

    <div id="team-column">
      <h3>
        opponent team
      </h3>

      <input
        v-for="mp in oppMp"
        id="mp"
        :key="mp"
        v-model="mp.link"
      >

      <div
        id="add"
        @click="addMp(oppMp)"
      >
        +
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OsuTeamCompare",
  data() {
    return {
      userMp: [
        { link: '' }
      ],
      oppMp: [
        { link: '' }
      ],
    }
  },
  methods: {
    addMp(arr) {
      arr.push({ link: '' });
    }
  }
}
</script>

<style scoped>
  #row {
    display: flex;
    flex-direction: row;
  }

  #team-column {
    margin: 10px;
    display: flex;
    flex-direction: column;
  }

  #mp {
    background-color: var(--container);
    color: var(--text);
    font: inherit;
    padding: 10px;
    margin-bottom: 10px;
    border: solid transparent 2px;
    border-radius: 5px;
    box-shadow: 0 3px 1px rgb(0 0 0 / 0.2);
    transition: background-color 300ms ease-in-out, color 300ms ease-in-out, border-color 200ms ease-in-out;
  }

  #mp:focus {
    outline: none;
    border-color: var(--text);
  }

  #add {
    background-color: var(--container);
    padding: 5px;
    margin-top: 10px;
    width: 20%;
    align-self: center;
    border-radius: 15px;
    border: solid transparent 2px;
    cursor: pointer;
    box-shadow: 0 3px 1px rgb(0 0 0 / 0.2);
    transition: border-color 200ms ease-in-out, background-color 300ms ease-in-out;
  }

  #add:hover {
    border-color: var(--text);
  }
</style>