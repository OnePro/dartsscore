<template>
    <div>

        <!-- <h3>Cricket</h3> -->
        <div class="game-buttons-group">
            <b-row class="row">

                <b-col>
                    <div>
                        <b-button-group size="sm">
                            <b-button variant='warning' @click="addNewGame">New game</b-button>
                            <b-button variant="primary" :disabled="!this.gameData.finished" @click="saveGame">Save game</b-button>
                        </b-button-group>

                    </div>
                </b-col>

            </b-row>
        </div>

        <b-row>

            <table class="table table-light">
                <thead>
                    <tr class="text-center">
                        <th scope="col">
                            <h3>
                                <b-badge variant="danger" v-show="currentPlayer === players[0]">
                                    <b-input-group v-show="players[0].edit">
                                        <b-input v-model="players[0].name" @change="players[0].edit = false"></b-input>
                                        <b-btn @click="players[0].edit = false">ok</b-btn>
                                    </b-input-group>
                                    {{players[0].name}}</b-badge>
                                <b-badge variant="dark" v-show="currentPlayer != players[0]">{{players[0].name}}</b-badge>
                                <b-btn v-b-popover.hover="'rename'" v-show="!players[0].edit" size="sm" variant="link" @click="createEdit(players[0])">
                                    <i class="fas fa-edit"></i>
                                </b-btn>
                            </h3>
                        </th>

                        <th scope="col">
                            <b-btn class="info" @click="switchPlayer">Switch Player</b-btn>
                        </th>

                        <th scope="col">
                            <h3>
                                <b-badge variant="danger" v-show="currentPlayer === players[1]">
                                    <b-input-group v-show="players[1].edit">
                                        <b-input v-model="players[1].name" @change="players[1].edit = false"></b-input>
                                        <b-btn @click="players[1].edit = false">ok</b-btn>
                                    </b-input-group>
                                    {{players[1].name}}</b-badge>
                                <b-badge variant="dark" v-show="currentPlayer != players[1]">{{players[1].name}}</b-badge>

                                <b-btn v-b-popover.hover="'rename'" v-show="!players[1].edit" size="sm" variant="link" @click="createEdit(players[1])">
                                    <i class="fas fa-edit"></i>
                                </b-btn>
                            </h3>
                        </th>

                    </tr>
                </thead>
                <tbody>
                    <tr v-for="target in targets" :key="targets.indexOf(target)">
                        <!-- PLAYER 1 -->
                        <td class="text-center">
                            <cricketcounterview @delThrow='delThrow' :player="players[0]" :counter="players[0].tableData[target].counter" :target="target" :score="players[0].tableData[target].score"></cricketcounterview>
                        </td>

                        <!-- MAIN BOARD -->
                        <td class="text-center">
                            <b-button size="sm" variant="link" class="link" @click="delThrow(players[0], target)">
                                <i class="fas fa-undo"></i>
                            </b-button>
                            <b-button class="btn btn-dark" @click="addThrow(currentPlayer, target)">{{target}}</b-button>
                            <b-button size="sm" variant="link" @click="delThrow(players[1], target)">
                                <i class="fas fa-undo"></i>
                            </b-button>
                        </td>

                        <!-- PLAYER 2 -->
                        <td class="text-center">
                            <cricketcounterview @delThrow='delThrow' :player="players[1]" :counter="players[1].tableData[target].counter" :target="target" :score="players[1].tableData[target].score"></cricketcounterview>
                            <!-- <span>{{players[0].tableData[target].counter}}</span> -->
                        </td>

                    </tr>
                    <tr>
                        <td class="text-center">
                            <h2>{{players[0].totalScore}}</h2>
                        </td>
                        <td class="text-center"></td>
                        <td class="text-center">
                            <h2>{{players[1].totalScore}}</h2>
                        </td>
                    </tr>

                </tbody>
            </table>
        </b-row>

    </div>
</template>

<script>
import db from './firebaseInit'

export default {
  name: 'Cricket',
  data() {
    return {
      newplayer: {}, // { id: 1, name: 'Bill' },
      players: [],
      targets: ['20', '19', '18', '17', '16', '15', 'bull'],
      cricketTable: this.getCricketTable(),
      currentPlayer: null,
      gameData: {}
    }
  },
  methods: {
    updateGame() {
      this.players = [
        {
          id: 1,
          name: 'Player1',
          edit: false,
          tableData: this.getPlayerTableData(),
          totalScore: 0
        },
        {
          id: 2,
          name: 'Player2',
          edit: false,
          tableData: this.getPlayerTableData(),
          totalScore: 0
        }
      ]
      this.gameData = {
        type: 'cricket',
        finished: false,
        winner: '',
        players: this.players
      }
      this.cricketTable = this.getCricketTable()
      this.currentPlayer = this.players[0]
    },

    getCricketTable() {
      let targets = {
        bull: { close: false, closer: [], target: 25 },
        '20': { close: false, closer: [], target: 20 },
        '19': { close: false, closer: [], target: 19 },
        '18': { close: false, closer: [], target: 18 },
        '17': { close: false, closer: [], target: 17 },
        '16': { close: false, closer: [], target: 16 },
        '15': { close: false, closer: [], target: 15 }
      }
      return targets
    },

    getPlayerTableData() {
      let targets = {
        '20': { counter: 0, score: 0, target: 20 },
        '19': { counter: 0, score: 0, target: 19 },
        '18': { counter: 0, score: 0, target: 18 },
        '17': { counter: 0, score: 0, target: 17 },
        '16': { counter: 0, score: 0, target: 16 },
        '15': { counter: 0, score: 0, target: 15 },
        bull: { counter: 0, score: 0, target: 25 }
      }
      return targets
    },

    switchPlayer() {
      let indexPlayer = this.players.indexOf(this.currentPlayer)
      let nextIndex = 0
      if (indexPlayer === 0) {
        nextIndex = 1
      }

      this.currentPlayer = this.players[nextIndex]
    },

    delThrow(player, target) {
      this.decrementScore(player, target)
    },

    addThrow(player, target) {
      this.incrementScore(player, target)
    },

    incrementScore(player, target) {
      player.tableData[target].counter++

      this.recalculatePlayerScore(player, target)

      let playerRow = player.tableData[target]
      let tableRow = this.cricketTable[target]

      if (!tableRow.close && playerRow.counter >= 3) {
        playerRow.score = (playerRow.counter - 3) * tableRow.target
      }

      this.recalculateTotalScore(player)
    },

    decrementScore(player, target) {
      let tCounter = player.tableData[target].counter - 1
      player.tableData[target].counter = Math.max(tCounter, 0)

      this.recalculatePlayerScore(player, target)

      let playerRow = player.tableData[target]
      let tableRow = this.cricketTable[target]

      playerRow.score = Math.max((playerRow.counter - 3) * tableRow.target, 0)

      this.recalculateTotalScore(player)
    },

    recalculatePlayerScore(player, target) {
      let playerRow = player.tableData[target]
      let tableRow = this.cricketTable[target]

      // add or clear closer player
      let closeIndex = tableRow.closer.indexOf(player)
      if (playerRow.counter >= 3 && closeIndex === -1) {
        // add new closer
        tableRow.closer.push(player)
      } else if (playerRow.counter < 3 && closeIndex > -1) {
        // if present but not close
        tableRow.closer.splice(closeIndex, 1)
      }

      // make close or unclose
      if (tableRow.closer.length >= 2) {
        tableRow.close = true
      } else {
        tableRow.close = false
      }
    },

    recalculateTotalScore(player) {
      let totalScore = 0
      for (let row in player.tableData) {
        totalScore += player.tableData[row].score
      }

      player.totalScore = totalScore
    },

    createEdit(player) {
      this.currentPlayer = player
      console.log(this.currentPlayer)
      player.edit = true
    },

    addNewGame() {
      for (let player in this.players) {
        this.players[player].tableData = []
      }
      this.updateGame()
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
          this.successSaveData(docRef.id)
        })
        .catch(error => {
          console.error('Error adding employee: ', error)
          this.errorSaveData(error)
        })
    },

    successSaveData(docId) {
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
    cricketTable: function(newVal, oldVal) {
      console.log('changes')
    }
  },

  created: function() {
    this.updateGame()
    this.currentPlayer = this.players[0]
  }
}
</script>

<style>
.game-buttons-group {
  padding: 1%;
}
</style>

