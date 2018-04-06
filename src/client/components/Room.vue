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
          <template v-if="room.events.length">
            <template v-for="(event, index) in room.events">
              <Free
                :key="`free-${index}`"
                :start="index ? room.events[index - 1].end : openTime"
                :end="event.start"
              />
              <Busy
                :key="`busy-${index}`"
                :event="event"
              />
            </template>
            <Free
              :start="room.events[room.events.length - 1].end"
              :end="closeTime"
            />
          </template>
          <Free v-else :start="openTime" :end="closeTime" all-day/>
        </table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { DateTime } from 'luxon';

import Free from './Free.vue';
import Busy from './Busy.vue';

export default {
  components: { Free, Busy },

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
    date() { return this.$store.state.date; },
    openTime() { return this.getTime(9); },
    closeTime() { return this.getTime(17); }
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
    },

    getTime(hour, minute = 0) {
      return DateTime.fromISO(this.date).set({ hour, minute }).toISO();
    }
  }
};
</script>

<style scoped>
  .events {
    border-collapse: collapse;
    width: 100%;
  }

  .card {
    margin: 8px;
  }

  .card__title {
    word-break: break-all;
    word-break: break-word;
  }

  .card__text {
    padding-top: 0;
  }
</style>
