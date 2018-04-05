<template>
  <div>
    <v-card>
      <v-card-title>
        <h3><a :href="href" target="_blank">{{ name }}</a></h3>
      </v-card-title>
      <v-card-text>
        <div v-if="message">
          {{ message }}
        </div>
        <table v-if="room" class="events">
          <tr v-if="!room.events.length">
            <td>Free</td>
          </tr>
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
      room: null,
      name: this.id,
      href: `https://calendar.google.com/calendar/embed?src=${this.id}&mode=AGENDA`,
      message: null
    };
  },

  computed: {
    date() { return this.$store.state.date; }
  },

  watch: {
    date() {
      this.getRoom();
    }
  },

  created() {
    this.getRoom();
  },

  updated() {
    this.$root.$emit('macy');
  },

  methods: {
    async getRoom() {
      this.room = null;
      this.message = 'Loading...';

      try {
        this.room = await this.$store.dispatch('getRoom', { id: this.id, date: this.date });
        this.name = this.room.name;
        this.message = null;
      } catch (error) {
        this.message = error.message;
      }
    }
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
