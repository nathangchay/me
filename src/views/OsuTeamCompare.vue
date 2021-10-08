<template>
  <h1>
    osu! random map
  </h1>

  <div
    id="button"
    @click="generateMap"
  >
    generate
  </div>
</template>

<script>
export default {
  name: "OsuTeamCompare",
  methods: {
    generateMap() {
      const mapIDMax = 1596572;

      let accessToken = "";
      let mapID = 0;
      let validMap = false;

      fetch("https://osu.ppy.sh/oauth/token", {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "grant_type": "client_credentials",
          "client_id": 10188,
          "client_secret": "LGSw69kpAGKT5TMZki2Zsj1ZrM5rGzpwSHBg7TTD",
          "scope": "public"
        })
      }).then(response => {
        accessToken = response.json().access_token;
      });

      console.log("Generating new map ID")
      mapID = Math.floor(Math.random() * (mapIDMax + 1));

      fetch("https://osu.ppy.sh/api/v2/beatmaps/" + mapID, {
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authentication': 'Bearer ' + accessToken,
        },
      }).then(response => {
        console.log(response.json());
      })
    }
  }
}
</script>

<style scoped>
  #button {
    background-color: var(--container);
    padding: 10px;
    width: 10%;
    margin-top: 15px;
    align-self: center;
    border-radius: 15px;
    border: solid transparent 2px;
    cursor: pointer;
    box-shadow: 0 3px 1px rgb(0 0 0 / 0.2);
    transition: border-color 200ms ease-in-out, background-color 300ms ease-in-out;
  }

  #button:hover {
    border-color: var(--text);
  }
</style>