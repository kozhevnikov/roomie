<template>
  <div>
    <h1>{{ name }}</h1>
    <div v-if="events">
      <Event
        v-for="event in events"
        :key="event.id"
        :event="event"
      />
    </div>
    <div v-else>
      {{ message }}
    </div>
  </div>
</template>

<script>
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
      events: null
    };
  },

  async created() {
    const response = await fetch(`/api/room/${encodeURIComponent(this.id)}`, {
      credentials: 'same-origin'
    });

    if (response.ok) {
      const data = await response.json();
      this.name = data.name;
      this.events = data.events;
    } else {
      this.name = response.statusText;
      this.message = await response.text();
    }
  }
};
</script>
