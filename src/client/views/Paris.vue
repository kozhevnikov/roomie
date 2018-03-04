<template>
  <div>
    <h1>Paris</h1>
    <Rooms :ids="ids"/>
  </div>
</template>

<script>
import Rooms from '../components/Rooms.vue';

export default {
  components: { Rooms },

  data() {
    return {
      ids: [
        '3p0cthg7tcqkbuat1jdrab096o@group.calendar.google.com',
        'doea7d5f8hbol8gmfdsabthto0@group.calendar.google.com',
        'h3i4vvah7f12g8q5fvuig8csn8@group.calendar.google.com'
      ]
    };
  }
};
</script>
