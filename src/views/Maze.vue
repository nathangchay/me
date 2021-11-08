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

  <div id="options">
    maze size: <input v-model="rows">x<input v-model="cols">
    tile size: <input v-model="tileSize">
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
          'background-color': tile.c == 1 ? 'red' : 'white',
          'height': tileSize + 'px',
          'width': tileSize + 'px',
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
        tileSize: 10,
        rows: 30,
        cols: 30,
        maze: [],
    }
  },
  methods: {
    resetMaze() {
      this.maze = [];

      for (let i = 0; i < this.rows; i++) {
        this.maze.push([]);  

        for (let j = 0; j < this.cols; j++) {
          this.maze[i].push({ u: 1, d: 1, l: 1, r: 1, c: 0 })
        }
      }
    },

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
      return (
        tile.row >= 0 &&
        tile.col >= 0 &&
        tile.row < this.maze.length &&
        tile.col < this.maze[tile.row].length
      );
    },

    async generateDFS() {
      let stack = [];
      let visited = [];
      let row = [];
      let neighbors = [];
      let potNeighbors = [];
      let selected;
      let cur = { row: 0, col: 0 };
      let delay = ms => new Promise(res => setTimeout(res, ms));

      this.resetMaze();

      for (let i = 0; i < this.rows; i++) {
        row = [];

        for (let j = 0; j < this.cols; j++) {
          row.push(false);
        }

        visited.push(row);
      }
      
      visited[cur.row][cur.col] = true;
      stack.push(cur);

      while (stack.length > 0) {
        cur = stack.pop();
        this.maze[cur.row][cur.col].c = 1;

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

        for (let i = 0; i < 4; i++) {
          if (this.isValidTile(potNeighbors[i]) && !visited[potNeighbors[i].row][potNeighbors[i].col]) {
            neighbors.push(potNeighbors[i]);
          }
        }

        if (neighbors.length > 0) {
          stack.push(cur);

          selected = neighbors[Math.floor(Math.random() * neighbors.length)];

          this.removeWall(cur, selected);
          visited[selected.row][selected.col] = true;
          stack.push(selected);
        }
        
        await delay(10);
        this.maze[cur.row][cur.col].c = 0;
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
  border: solid 2px white;
}

#buttons {
  display: flex;
  align-items: center;
  flex-direction: row;
}

#options {
  display: flex;
  align-items: center;
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

#button-small {
  background-color: var(--container);
  padding: 10px ;
  margin: 10px;
  border-radius: 15px;
  border: solid transparent 2px;
  cursor: pointer;
  box-shadow: 0 3px 1px rgb(0 0 0 / 0.2);
  transition: border-color 200ms ease-in-out, background-color 300ms ease-in-out;
  font-size: 8pt;
  text-align: center;
}

input {
  font-size: inherit;
  font-family: inherit;
  color: inherit;
  background-color: var(--accent1);
  border: none;
  border-radius: 15px;
  width: 0px;
  flex: 1;
  padding: 5px 12px;
  margin: 10px 10px;
  text-align: center;
  width: 30px;
}
</style>