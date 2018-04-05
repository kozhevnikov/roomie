<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app fixed>
      <v-list>
        <v-list-tile v-for="route in routes" :key="route.name" :to="route">
          <v-list-tile-action>
            <v-icon>location_city</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ route.name }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app fixed scroll-off-screen>
      <v-toolbar-side-icon @click="drawer = !drawer"/>
      <v-toolbar-title>{{ $route.name }}</v-toolbar-title>
    </v-toolbar>

    <v-content>
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: false
  }),

  computed: {
    routes() { return this.$router.options.routes.filter(route => route.name); }
  }
};
</script>

<style>
  .container {
    padding: 8px;
  }
</style>
