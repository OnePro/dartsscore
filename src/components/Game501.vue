<template>
  <div>

    <!-- <h3>501 game</h3> -->
    <div class="game-buttons-group">
      <b-row class="row">

        <b-col>
          <div>
            <b-button-group size="sm">
              <b-button variant="outline-dark" v-b-modal.modalPrevent @click="showAddingPlayer">Add new player</b-button>
              <b-button variant='warning' @click="addNewGame">New game</b-button>
              <b-button variant="primary" :disabled="!this.gameData.finished" @click="saveGame">Save game</b-button>
            </b-button-group>

          </div>
        </b-col>

      </b-row>
    </div>
    <!-- Modal Component -->
    <b-modal id="adding-new-player" ref="newplayermodal" title="Add new player" @ok="clickOkAddPlayer">
      <form @submit.stop.prevent>
        <b-form-input type="text" id="newplayername" placeholder="Enter your name" v-model="newplayer.name"></b-form-input>
      </form>
    </b-modal>

    <b-row class="row">
      <b-col v-for="player in players" :key="player.id">
        <player :player='player' :gameData='gameData' @addedNewScore="addedNewScore" @deletePlayer="deletePlayer"></player>
      </b-col>
    </b-row>

  </div>
</template>

<script>
import db from './firebaseInit'
export default {
  name: 'Game501',
  data() {
    return {
      newplayer: {}, // { id: 1, name: 'Bill', inputId: 'input-playerId-' + 1 },
      players: [],
      inputsIdList: [],
      gameScore: 501,
      gameData: {}
    }
  },
  methods: {
    // make new user template
    createNewUser() {
      let newID = this.players.length + 1
      this.newplayer = {
        id: newID,
        inputId: 'inputplayerref' + newID,
        name: '',
        tableData: [],
        totalRemain: this.gameScore,
        gameScore: this.gameScore
      }
    },

    updateGame() {
      this.gameData = {
        type: '501',
        finished: false,
        winner: '',
        players: []
      }
    },

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
      this.$refs.newplayermodal.show()
    },

    addNewPlayer() {
      if (this.newplayer.name) {
        this.players.push(this.newplayer)
      }
    },

    cancelAddingPlayer() {
      this.$refs.newplayermodal.hide()
    },

    addNewGame() {
      for (let player in this.players) {
        this.players[player].tableData = []
        this.players[player].totalRemain = this.gameScore
        this.players[player].gameScore = this.gameScore
      }
      this.updateGame()
    },

    deletePlayer(player) {
      let playerIndex = this.players.indexOf(player)
      this.players.splice(playerIndex, 1)
    },

    saveGame() {
      this.gameData.players = this.players

      db
        .collection('games')
        .add({
          type: this.gameData.type,
          finished: this.gameData.finished,
          winner: this.gameData.winner,
          players: this.players,
          date: Date.now()
        })
        .then(docRef => {
          console.log('Client added: ', docRef.id)
          this.succsesSaveData(docRef.id)
        })
        .catch(error => {
          console.error('Error adding employee: ', error)
          this.errorSaveData(error)
        })
    },

    succsesSaveData(docId) {
      this.$toasted
        .show(' ', {
          type: 'success',
          position: 'bottom-center'
        })
        .text('Success saving')
        .goAway(1500)
    },

    errorSaveData(errorText) {
      this.$toasted
        .show(' ', {
          type: 'error',
          icon: 'error_outline',
          position: 'bottom-center'
        })
        .text('Error saving ' + errorText)
        .goAway(5000)
    }
  },

  watch: {
    players: function(newPlayers, oldPlayers) {
      this.inputsIdList = []
      for (let x in this.players) {
        this.inputsIdList.push(this.players[x].inputId)
      }
    }
  },

  created: function() {
    this.updateGame()
  }
}
</script>

<style>
.game-buttons-group {
  padding: 1%;
}
</style>

