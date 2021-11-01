<template>
  <h1>
    maze generator
  </h1>

  <div id="buttons">
    <div id="algo-button">
      prim's
    </div>
  </div>

  <div id="grid">
    <div
      v-for="row in maze"
      id="row"
      :key="row.id"
    >
      <div
        v-for="tile in row" 
        id="tile"
        :key="tile.id"
        style="

        "
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Maze',
  data() {
    return {
      maze: [
        [
          { u: 1, d: 1, l: 1, r: 1 },
          { u: 0, d: 0, l: 0, r: 0 },
          { u: 0, d: 0, l: 0, r: 0 },
          { u: 0, d: 0, l: 0, r: 0 },
        ],
        [
          { u: 0, d: 0, l: 0, r: 0 },
          { u: 0, d: 0, l: 0, r: 0 },
          { u: 0, d: 0, l: 0, r: 0 },
          { u: 0, d: 0, l: 0, r: 0 },
        ],
        [
          { u: 0, d: 0, l: 0, r: 0 },
          { u: 0, d: 0, l: 0, r: 0 },
          { u: 0, d: 0, l: 0, r: 0 },
          { u: 0, d: 0, l: 0, r: 0 },
        ],
        [
          { u: 0, d: 0, l: 0, r: 0 },
          { u: 0, d: 0, l: 0, r: 0 },
          { u: 0, d: 0, l: 0, r: 0 },
          { u: 0, d: 0, l: 0, r: 0 },
        ],
      ]
    }
  },
  methods: {
  }
}
</script>


<style scoped>
#row {
  display: flex;
  flex-direction: row;
}

#tile {
  background-color: white;
  width: 50px;
  height: 50px;
  border: 1px transparent;
}

#buttons {
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
}

#algo-button {
  background-color: var(--container);
  padding: 15px;
  margin: 10px;
  border-radius: 15px;
  border: solid transparent 2px;
  cursor: pointer;
  box-shadow: 0 3px 1px rgb(0 0 0 / 0.2);
  transition: border-color 200ms ease-in-out, background-color 300ms ease-in-out;
}

#algo-button:hover {
  border-color: var(--text)
}
</style>