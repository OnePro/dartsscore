<template>
  <div>
    <b-row>
      <b-col class="text-left">

        <h3>
          <b-badge variant="dark"> {{player.name}}</b-badge>
        </h3>
        <b-btn size="sm" variant="link" @click="deletePlayer">delete</b-btn>

      </b-col>
      <b-col>

      </b-col>
    </b-row>

    <table501 :player="player" :gameData="gameData" @addedNewScore='addedNewScore'></table501>
  </div>

</template>

<script>
export default {
  name: 'player',
  data() {
    return {}
  },
  props: ['player', 'gameData'],
  methods: {
    addedNewScore(currentInputId) {
      this.$emit('addedNewScore', currentInputId)
    },

    deletePlayer() {
      this.$emit('deletePlayer', this.player)
    }
  }
}
</script>

