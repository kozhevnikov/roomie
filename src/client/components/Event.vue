<template>
  <div class="nowrap">
    <span :title="event.start">{{ start }}</span>
    -
    <span :title="event.end">{{ end }}</span>
    <a :href="event.href" :title="event.name" target="_blank">
      {{ event.name }}
    </a>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  props: {
    event: { type: Object, required: true }
  },

  computed: {
    start() { return this.hhmm(this.event.start); },
    end() { return this.hhmm(this.event.end); }
  },

  methods: {
    hhmm: time => moment(time).format('HH:mm')
  }
};
</script>

<style>
  .nowrap {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
