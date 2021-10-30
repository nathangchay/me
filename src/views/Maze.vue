<template>
  <h1>
    maze generator
  </h1>

  <div id="buttons">
    <div
      id="algo-button"
      @click="generateGrid"
    >
      generate
    </div>
    <div id="algo-button">
      prim's
    </div>
  </div>

  <div id="grid">
    <div id="row">
      <div id="tile" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Maze',
  data() {
    return {
      mazeCols: 4,
      mazeRows: 4,
    }
  },
  methods: {
    generateGrid() {
      const grid = document.getElementById("grid");

      for (let i = 0; i < this.mazeRows; i++) {
        let row = document.createElement("div");
        row.setAttribute("id", "row");

        for (let j = 0; j < this.mazeCols; j++) {
          let tile = document.createElement("div");
          tile.setAttribute("id", "tile");

          row.appendChild(tile);
        }

        grid.appendChild(row);
      }

      grid.$mount();
    }
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