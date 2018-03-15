<template>
  <div>
    <md-card md-with-hover>
      <md-card-header>
        <a :href="href" class="md-subheading" target="_blank">{{ name }}</a>
      </md-card-header>

      <md-card-content>
        <div v-if="events">
          <Event v-for="event in events" :key="event.id" :event="event"/>
        </div>
        <div v-else>
          {{ message }}
        </div>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import 'whatwg-fetch';

import Event from './Event.vue';

export default {
  components: { Event },

  props: {
    id: { type: String, required: true }
  },

  data() {
    return {
      name: 'Loading...',
      message: 'Loading...',
      href: null,
      events: null
    };
  },

  async created() {
    try {
      const response = await fetch(`/api/room/${encodeURIComponent(this.id)}`, {
        credentials: 'same-origin'
      });

      if (response.ok) {
        const data = await response.json();
        Object.assign(this, data);
      } else {
        this.name = response.statusText;
        this.message = await response.text();
      }
    } catch (error) {
      this.name = error.message;
      this.message = error.stack;
    }
  },

  updated() {
    this.$emit('recalculate');
  }
};
</script>

<style scoped>
  .md-card {
    cursor: default;
    margin: 0.9em;
  }
</style>
