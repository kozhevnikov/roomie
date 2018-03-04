<template>
  <div>
    <a :href="event.href" target="_blank">{{ start }} - {{ end }} {{ event.name }}</a>
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
