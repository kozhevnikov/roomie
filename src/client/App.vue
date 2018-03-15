<template>
  <div id="app">
    <div>
      <router-link to="/london">London</router-link>
      <router-link to="/paris">Paris</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
  #app {
    margin: 0.5em;
  }
</style>
