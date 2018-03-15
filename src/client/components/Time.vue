<template>
  <span class="time">
    <span :title="start">{{ from }}</span>
    -
    <span :title="end">{{ to }}</span>
  </span>
</template>

<script>
import moment from 'moment';

export default {
  props: {
    start: { type: String, required: true },
    end: { type: String, required: true }
  },

  computed: {
    from() { return this.format(this.start); },
    to() { return this.format(this.end); }
  },

  methods: {
    format(time) {
      return moment(time).format('HH:mm');
    }
  }
};
</script>
