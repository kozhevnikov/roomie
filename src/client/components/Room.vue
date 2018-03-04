<template>
  <div>
    <h1>{{ name }}</h1>
  </div>
</template>

<script>
export default {
  props: {
    id: { type: String, required: true }
  },

  data() {
    return {
      name: 'Loading...'
    };
  },

  async created() {
    const response = await fetch(`/api/room/${encodeURIComponent(this.id)}`, {
      credentials: 'same-origin'
    });

    if (response.ok) {
      const data = await response.json();
      this.name = data.name;
    } else {
      this.name = response.statusText;
    }
  }
};
</script>
