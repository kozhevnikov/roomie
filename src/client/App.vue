<template>
  <v-app>
    <v-navigation-drawer app clipped>
      <v-list>
        <v-list-tile v-for="route in routes" :key="route.name">
          <v-list-tile-action>
            <v-icon>location_city</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ route.name }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app clipped-left>
      <v-toolbar-side-icon/>
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
  computed: {
    routes() { return this.$router.options.routes.filter(route => route.name); }
  }
};
</script>
