<template>
  <tr v-if="busy" :class="{ past, current }">
    <td class="time">
      <span :title="event.start">
        {{ startTime }}
      </span>
    </td>
    <td>&ndash;</td>
    <td class="time">
      <span :title="event.end">
        {{ endTime }}
      </span>
    </td>
    <td class="name">
      <span class="nowrap">
        <v-tooltip bottom>
          <span slot="activator">
            <v-icon v-if="recurring && event.recurring">repeat</v-icon>
            <a :href="event.href" target="_blank">
              {{ event.name }}
            </a>
          </span>

          <h2>{{ event.name }}</h2>
          <div>Created: {{ locale(event.created) }}</div>
          <div v-if="event.creator">Creator: {{ event.creator }}</div>
          <div v-if="event.organizer && event.organizer !== event.creator">Organizer: {{ event.organizer }}</div>
          <div v-if="event.conference">Conference: {{ event.conference }}</div>
          <div v-if="event.attendees">
            Attendees: {{ event.attendees.length }}
            <ul v-if="event.attendees.length < 10" class="attendees">
              <li v-for="attendee in event.attendees" :key="attendee">{{ attendee }}</li>
            </ul>
          </div>
        </v-tooltip>
      </span>
    </td>
  </tr>
</template>

<script>
import { DateTime } from 'luxon';

export default {
  props: {
    event: { type: Object, required: true }
  },

  computed: {
    busy() { return this.$store.state.busy; },
    recurring() { return this.$store.state.recurring; },

    start() { return DateTime.fromISO(this.event.start); },
    end() { return DateTime.fromISO(this.event.end); },

    startTime() { return this.start.toLocaleString(DateTime.TIME_SIMPLE); },
    endTime() { return this.end.toLocaleString(DateTime.TIME_SIMPLE); },

    past() { return this.end < DateTime.local(); },
    current() { return this.start < DateTime.local() && this.end > DateTime.local(); }
  },

  methods: {
    locale(date) {
      return DateTime.fromISO(date).toLocaleString(DateTime.DATETIME_SHORT);
    }
  }
};
</script>

<style scoped>
  .time {
    text-align: right;
    white-space: nowrap;
  }

  .name {
    position: relative;
    width: 100%;
  }

  .nowrap {
    padding-left: 8px;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .past {
    opacity: 0.5;
  }

  .current {
    font-weight: bold;
  }

  .attendees {
    padding-left: 20px;
  }
</style>
