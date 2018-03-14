<template>
  <div class="nowrap">
    <a :href="event.href" :title="event.name" target="_blank">
      {{ start }} - {{ end }} {{ event.name }}
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
    start() { return this.format(this.event.start); },
    end() { return this.format(this.event.end); }
  },

  methods: {
    format(time) {
      return moment(time).format('HH:mm');
    }
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
