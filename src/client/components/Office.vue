<template>
  <div id="office">
    <Room
      v-for="(room, index) in rooms"
      :id="room"
      :key="room + index"
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
        600: 2,
        900: 3,
        1200: 4,
        1800: 5
      },
      margin: 0
    });

    this.$root.$on('macy', () => this.macy.recalculate(true));
    this.$root.$emit('macy');
  }
};
</script>
