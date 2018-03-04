<template>
  <div class="room">
    <div class="card">
      <a :href="href" target="_blank">{{ name }}</a>
      <div v-if="events">
        <Event v-for="event in events" :key="event.id" :event="event"/>
      </div>
      <div v-else>
        {{ message }}
      </div>
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
      href: null,
      events: null
    };
  },

  async created() {
    const response = await fetch(`/api/room/${encodeURIComponent(this.id)}`, {
      credentials: 'same-origin'
    });

    if (response.ok) {
      const data = await response.json();
      Object.assign(this, data);
    } else {
      this.name = response.statusText;
      this.message = await response.text();
      this.events = null;
    }
  },

  updated() {
    this.$emit('macy');
  }
};
</script>

<style>
  .card {
    border: 1px solid lightgray;
    margin: 0.5em;
    padding: 1em;
  }
</style>
