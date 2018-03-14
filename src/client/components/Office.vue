<template>
  <div id="office">
    <Room
      v-for="(room, index) in rooms"
      :id="room"
      :key="room + index"
      :number="index + 1"
      @recalculate="recalculate"
    />
  </div>
</template>

<script>
import Macy from 'macy';

import Room from './Room.vue';

export default {
  components: { Room },

  props: {
    rooms: { type: Array, required: true }
  },

  mounted() {
    this.macy = new Macy({
      container: '#office',
      mobileFirst: true,
      columns: 1,
      breakAt: {
        576: 2,
        768: 3,
        992: 4,
        1200: 5
      },
      margin: 0
    });
    this.recalculate();
  },

  methods: {
    recalculate() {
      this.macy.recalculate(true, false);
    }
  }
};
</script>

<style>
  #office {
    margin: 1em;
  }
</style>
