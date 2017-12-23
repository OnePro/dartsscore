<template>
  <div>
    <h3>{{player.name}}</h3>
    <table501 :player="player" @addedNewScore='addedNewScore'></table501>
  </div>

</template>

<script>
export default {
  name: 'player',
  data() {
    return {}
  },
  props: ['player'],
  methods: {
    addedNewScore(currentInputId) {
      this.$emit('addedNewScore', currentInputId)
    }
  }
}
</script>

