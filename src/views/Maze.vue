<template>
  <h1>
    maze generator
  </h1>

  <div id="buttons">
    <div
      id="algo-button"
      @click="generateDFS"
    >
      DFS
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
        :style="{
          'border-right': tile.r == 1 ? 'solid black 2px' : '',
          'border-left': tile.l == 1 ? 'solid black 2px' : '',
          'border-top': tile.u == 1 ? 'solid black 2px' : '',
          'border-bottom': tile.d == 1 ? 'solid black 2px' : '',
        }"
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
            { u: 1, d: 1, l: 1, r: 1 },
            { u: 1, d: 1, l: 1, r: 1 },
            { u: 1, d: 1, l: 1, r: 1 },
          ],
          [
            { u: 1, d: 1, l: 1, r: 1 },
            { u: 1, d: 1, l: 1, r: 1 },
            { u: 1, d: 1, l: 1, r: 1 },
            { u: 1, d: 1, l: 1, r: 1 },
          ],
          [
            { u: 1, d: 1, l: 1, r: 1 },
            { u: 1, d: 1, l: 1, r: 1 },
            { u: 1, d: 1, l: 1, r: 1 },
            { u: 1, d: 1, l: 1, r: 1 },
          ],
          [
            { u: 1, d: 1, l: 1, r: 1 },
            { u: 1, d: 1, l: 1, r: 1 },
            { u: 1, d: 1, l: 1, r: 1 },
            { u: 1, d: 1, l: 1, r: 1 },
          ]
      ]
    }
  },
  methods: {
    removeWall(a, b) {
      if (a.row == b.row - 1) {
        this.maze[a.row][a.col].d = 0;
        this.maze[b.row][b.col].u = 0;
      } else if (a.row == b.row + 1) {
        this.maze[a.row][a.col].u = 0;
        this.maze[b.row][b.col].d = 0;
      } else if (a.col == b.col - 1) {
        this.maze[a.row][a.col].r = 0;
        this.maze[b.row][b.col].l = 0;
      } else if (a.col == b.col + 1) {
        this.maze[a.row][a.col].l = 0;
        this.maze[b.row][b.col].r = 0;
      }
    },

    isValidTile(tile) {
      console.log("checking validity:", tile);

      return (
        tile.row >= 0 &&
        tile.col >= 0 &&
        tile.row < this.maze.length &&
        tile.col < this.maze[tile.row].length
      );
    },

    generateDFS() {
      let stack = [];
      let visited = [];
      let neighbors = [];
      let potNeighbors = [];
      let selected;
      let cur = { row: 0, col: 0 };

      visited[parseInt("" + cur.row + cur.col)] = true;
      stack.push(cur);

      while (stack.length > 0) {
        cur = stack.pop();

        console.log("cur:", cur);
        
        if (cur.row == undefined) {
          break;
        }

        neighbors = [];

        potNeighbors = [
          { row: cur.row + 1, col: cur.col },
          { row: cur.row - 1, col: cur.col },
          { row: cur.row, col: cur.col + 1 },
          { row: cur.row, col: cur.col - 1 },
        ];

        console.log("potential neighbors:", potNeighbors);

        for (let i = 0; i < 4; i++) {
          if (this.isValidTile(potNeighbors[i]) && !visited[parseInt("" + potNeighbors[i].row + potNeighbors[i].col)]) {
            neighbors.push(potNeighbors[i]);
          }
        }

        console.log("neighbors", neighbors);

        if (neighbors.length > 0) {
          stack.push(cur);

          selected = neighbors[Math.floor(Math.random() * neighbors.length)];

          this.removeWall(cur, selected);
          visited[parseInt("" + selected.row + selected.col)] = true;
          stack.push(selected);
        }
      }
    },
  }
}
</script>


<style scoped>
#row {
  display: flex;
  flex-direction: row;
}

#grid {
  border: solid 2px black;
}

#tile {
  background-color: white;
  width: 50px;
  height: 50px;
  border: solid 2px transparent;
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