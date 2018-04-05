<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app fixed>
      <v-date-picker v-model="date" first-day-of-week="1" no-title full-width/>

      <v-list>
        <v-list-tile v-for="route in routes" :key="route.name" :to="to(route.name)">
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
      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-toolbar>

    <v-content>
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { DateTime } from 'luxon';

export default {
  data: () => ({
    drawer: false,
    today: DateTime.local().toISODate()
  }),

  computed: {
    date: {
      get() { return this.$store.state.date; },
      set(value) { this.$store.dispatch('setDate', value); }
    },
    title() { return `${this.$route.name} ${DateTime.fromISO(this.date).toLocaleString(DateTime.DATE_SHORT)}`; },
    routes() { return this.$router.options.routes.filter(route => route.name); }
  },

  watch: {
    date(value) {
      this.$router.push({
        params: { date: value !== this.today ? value : null }
      });
    }
  },

  created() {
    const { date } = this.$route.params;
    if (date) this.date = date;
  },

  methods: {
    to(name) {
      const route = { name };
      if (this.date !== this.today) route.params = { date: this.date };
      return route;
    }
  }
};
</script>

<style>
  .container {
    padding: 8px;
  }
</style>
