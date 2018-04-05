<template>
  <div>
    <v-card>
      <v-card-title>
        <h3><a :href="room.href" target="_blank">{{ room.name }}</a></h3>
      </v-card-title>
      <v-card-text>
        <div v-if="message">
          {{ message }}
        </div>
        <table v-if="room.events" class="events">
          <Event v-for="event in room.events" :key="event.id" :event="event"/>
        </table>
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

  data() {
    return {
      room: { name: this.id },
      message: null
    };
  },

  async created() {
    this.message = 'Loading...';
    try {
      this.room = await this.$store.dispatch('getRoom', this.id);
      this.message = null;
    } catch (error) {
      this.message = error.message;
    }
  },

  updated() {
    this.$emit('recalculate');
  }
};
</script>

<style scoped>
  .events {
    border-collapse: collapse;
  }

  .card {
    margin: 8px;
  }

  .card__title {
    word-break: break-all;
  }

  .card__text {
    padding-top: 0;
  }
</style>
