<template>
  <div>
    <v-card>
      <v-card-title>
        <h3><a :href="href" target="_blank">{{ name }}</a></h3>
      </v-card-title>
      <v-card-text>
        <div v-if="events">
          <Event v-for="event in events" :key="event.id" :event="event"/>
        </div>
        <div v-else>
          {{ message }}
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import Event from './Event.vue';

export default {
  components: { Event },

  props: {
    id: { type: String, required: true }
  },

  data: () => ({
    name: 'Loading...',
    message: 'Loading...',
    href: null,
    events: null
  }),

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

<style>
  .card {
    margin: 8px;
  }

  .card__text {
    padding-top: 0;
  }
</style>
