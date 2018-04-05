<template>
  <tr>
    <td class="time">
      <span :title="event.start">
        {{ start }}
      </span>
    </td>
    <td>&ndash;</td>
    <td class="time">
      <span :title="event.end">
        {{ end }}
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
    start() { return this.time(this.event.start); },
    end() { return this.time(this.event.end); }
  },

  methods: {
    time: date => DateTime.fromISO(date).toLocaleString(DateTime.TIME_SIMPLE)
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
</style>
