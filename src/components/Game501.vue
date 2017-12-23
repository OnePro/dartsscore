<template>
  <div>

    <!-- <h3>501 game</h3> -->
    <b-row class="row">
      <b-col>
        <b-btn v-b-modal.modalPrevent @click="showAddingPlayer" class="add_playerbtn">Add new player</b-btn>
        <!-- Modal Component -->
        <b-modal id="adding-new-player" ref="newplayermodal" title="Add new player" @ok="clickOkAddPlayer">
          <form @submit.stop.prevent>
            <b-form-input type="text" placeholder="Enter your name" v-model="newplayer.name"></b-form-input>
          </form>
        </b-modal>

      </b-col>
    </b-row>

    <b-row class="row">
      <b-col v-for="player in players" :key="player.id">
        <player :player='player' @addedNewScore="addedNewScore"></player>
      </b-col>
    </b-row>

  </div>
</template>

<script>
export default {
  name: 'Game501',
  data() {
    return {
      newplayer: {}, // { id: 1, name: 'Bill', inputId: 'input-playerId-' + 1 },
      players: [],
      inputsIdList: []
    }
  },
  methods: {
    addedNewScore(currentInputId) {
      let nextID = this.selectNextInput(currentInputId)
      document.getElementById(nextID).focus()
    },
    selectNextInput(inputId) {
      let nextID = this.inputsIdList[0]
      let index = this.inputsIdList.indexOf(inputId)
      if (this.inputsIdList[index + 1] !== undefined) {
        // if end of list
        nextID = this.inputsIdList[index + 1]
      }
      return nextID
    },
    clickOkAddPlayer() {
      this.addNewPlayer()
    },
    showAddingPlayer() {
      this.createNewUser()
      console.log('adding new')
      this.$refs.newplayermodal.show()
    },
    addNewPlayer() {
      if (this.newplayer.name) {
        this.players.push(this.newplayer)
        this.inputsIdList.push(this.newplayer.inputId)
      }
    },
    cancelAddingPlayer() {
      this.$refs.newplayermodal.hide()
    },
    // make new user template
    createNewUser() {
      let newID = this.players.length + 1
      this.newplayer = {
        id: newID,
        inputId: 'inputplayerref' + newID,
        name: ''
      }
    }
  }
}
</script>

<style>
.add_playerbtn {
  margin: 25px;
}
</style>

