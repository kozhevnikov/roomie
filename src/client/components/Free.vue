<template>
  <tr :class="now ? 'green' : 'blue'" class="lighten-4">
    <td v-if="allDay" class="text-xs-center">Free all day</td>
    <template v-else-if="show">
      <td class="time">{{ startTime }}</td>
      <td>&ndash;</td>
      <td class="time">{{ endTime }}</td>
      <td class="name">
        <span class="nowrap" :title="duration">
          Free {{ now ? 'now' : '' }} for {{ duration }}
        </span>
      </td>
    </template>
  </tr>
</template>

<script>
import { DateTime, Interval } from 'luxon';

export default {
  props: {
    start: { type: String, required: true },
    end: { type: String, required: true },
    allDay: { type: Boolean, default: false }
  },

  computed: {
    startDate() { return DateTime.fromISO(this.start); },
    endDate() { return DateTime.fromISO(this.end); },
    startTime() { return this.startDate.toLocaleString(DateTime.TIME_SIMPLE); },
    endTime() { return this.endDate.toLocaleString(DateTime.TIME_SIMPLE); },

    interval() {
      return Interval.fromDateTimes(this.startDate < DateTime.local() ? DateTime.local() : this.startDate, this.endDate);
    },

    duration() {
      const { hours: h, minutes: m } = this.interval.toDuration(['hours', 'minutes', 'seconds']).toObject();
      const hs = h > 1 ? 's' : '';
      const ms = m > 1 ? 's' : '';
      if (h > 0 && m > 0) return `${h} hr${hs} ${m} min${ms}`;
      if (h > 0) return `${h} hour${hs}`;
      return `${m} minute${ms}`;
    },

    show() {
      return this.endDate > DateTime.local() && this.interval.length('minutes') > 10;
    },

    now() {
      return this.startDate < DateTime.local() && DateTime.local() < this.endDate;
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
</style>
