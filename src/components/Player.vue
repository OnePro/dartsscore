<template>
  <div>
    <b-row>
      <b-col class="text-left">

        <h3>
          <b-badge variant="dark">
            <b-input-group v-show="edit">
              <b-input v-model="player.name" @change="edit = false"></b-input>
              <b-btn @click="edit = false">ok</b-btn>
            </b-input-group>
            {{player.name}}</b-badge>
          <b-btn v-show="!edit" v-b-popover.hover="'rename'" size="sm" variant="link" @click="edit=true">
            <i class="fas fa-edit"></i>
          </b-btn>
          <b-btn size="sm" v-b-popover.hover="'delete'" variant="link" @click="deletePlayer">
            <i class="fas fa-times-circle"></i>
          </b-btn>
        </h3>

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
    return {
      edit: false
    }
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

