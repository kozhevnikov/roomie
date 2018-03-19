<template>
  <div>
    <Office :rooms="rooms"/>
  </div>
</template>

<script>
import Office from '../components/Office.vue';

export default {
  components: { Office },

  data: () => ({
    rooms: [
      '3p0cthg7tcqkbuat1jdrab096o@group.calendar.google.com',
      'doea7d5f8hbol8gmfdsabthto0@group.calendar.google.com',
      'h3i4vvah7f12g8q5fvuig8csn8@group.calendar.google.com'
    ]
  })
};
</script>
