<template>
  <div id="app">
    <div>
      <router-link to="/">Home</router-link>
      <router-link to="/london">London</router-link>
      <router-link to="/paris">Paris</router-link>
      <a href="/logout">Logout</a>
    </div>
    <router-view/>
  </div>
</template>

<style>
  body {
    margin: 0.5em;
  }
</style>
