<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
};
</script>

<style>
html {
  background-color: lightblue
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
button {
  display: inline-block;
  border: 3px solid slateblue;
  padding: 6px 19px;
  margin:0 5px 5px 0;
  border-radius: 2px;
  box-sizing: border-box;
  text-decoration: none;
  color:black;
  text-align: center;
  background-color: transparent;
  transition: all 0.3s;
}

button:hover{
  color: white;
  background-color: slateblue;
}
</style>
