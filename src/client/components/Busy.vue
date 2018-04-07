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
        <a :href="event.href" :title="event.name" target="_blank">
          {{ event.name }}
        </a>
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

    start() { return DateTime.fromISO(this.event.start); },
    end() { return DateTime.fromISO(this.event.end); },

    startTime() { return this.start.toLocaleString(DateTime.TIME_SIMPLE); },
    endTime() { return this.end.toLocaleString(DateTime.TIME_SIMPLE); },

    past() { return this.end < DateTime.local(); },
    current() { return this.start < DateTime.local() && this.end > DateTime.local(); }
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
</style>
