<template>
  <div>
    <!-- Modal Info -->

    <b-modal ref="modalFinishRef" hide-footer hide-header>
      <div class="d-block text-center">
        <h3>{{info}}</h3>
      </div>
      <b-form-group>

        <b-button variant="success" @click="finishingGame">Finish game</b-button>
        <b-button variant="danger" @click="cancelFinishig">Cancel</b-button>

      </b-form-group>
    </b-modal>

    <!-- Modal Editor -->
    <b-modal id="modalEditor" ref="modalEditor" title="Score edit" @ok="handleOkEditor" @cancel="cancelEditor">
      <b-form inline @submit.stop.prevent="handleOkEditor">
        <b-input-group>
          <b-form-input type="text" placeholder="Score" v-model="editbleRow.score"></b-form-input>
        </b-input-group>
        <b-button size="sm" variant="danger" @click="deleteRow">Delete throw</b-button>
      </b-form>

    </b-modal>

    <!-- Main -->
    <h1>
      <div class="text-center">
        <b-badge variant="danger">{{player.totalRemain}}</b-badge>
      </div>
    </h1>

    <b-input-group v-show="!gameData.finished" :right="calculateThrow()" class="mb-2 mr-sm-2 mb-sm-0">
      <b-form-input v-model="score" @change="inputScore" :id="player.inputId" type="text" placeholder="Score">
      </b-form-input>
    </b-input-group>

    <b-badge variant="light">
      <em>add score like: 20+40+50 or 110 </em>
    </b-badge>

    <b-table hover bordered head-variant="light" :items="player.tableData" :small="true" :striped="false" @row-clicked="editThrow" @refreshed="refreshed">
      <template slot="score" slot-scope="data">
        <strong>{{data.item.score}}</strong>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: 'Table501',
  props: ['player', 'gameData'],

  data() {
    return {
      throwCounter: 0,
      info: '',
      score: '',
      editbleRow: {},
      addingScore: false // check for recursive adding score in tableData after calling parent method
    }
  },
  methods: {
    addNewThrow() {
      if (this.addingScore) {
        return // it's recursiv calling. for example in Safari
      }
      this.addingScore = true
      let score = this.parsingScore(this.score)
      this.score = ''

      // add new element
      let length = this.player.tableData.push({
        // get for deleting
        throw: this.throwCounter + 1,
        score: score,
        remain: this.player.totalRemain - score
      })

      this.calculateScore()

      if (this.player.totalRemain < 0) {
        this.player.tableData.splice(length - 1, 1) // delete last element
        this.rebuildTableData()
        this.snowWrongScore()
      } else {
        this.throwCounter++
      }

      this.checkGame()
    },

    getNumber(value) {
      if (!value || Number.isNaN(Number(value))) {
        return 0
      } else {
        return Number.parseInt(value)
      }
    },

    inputScore() {
      this.addNewThrow()
      this.addedNewScore()
      this.addingScore = false
    },

    calculateThrow() {
      let tempScore = this.parsingScore(this.score)
      return tempScore.toString()
    },

    parsingScore(score) {
      // if It's calculator
      let totalScore = 0
      let indexPlus = score.search('[+]')
      if (indexPlus > 0) {
        // Parse the string value
        let scoreArray = score.match(/\d+/g) // "+7(903)-123-45-67" = [7,903,123,45,67]
        for (let num in scoreArray) {
          totalScore += this.getNumber(scoreArray[num])
        }
        return totalScore
        // if number
      } else {
        totalScore = this.getNumber(score)
      }
      return totalScore
    },

    addedNewScore() {
      this.$emit('addedNewScore', this.player.inputId) // call change focus element
    },

    editThrow(item, index, event) {
      this.editbleRow = {
        index: index,
        score: item.score
      }
      this.$refs.modalEditor.show()
    },

    handleOkEditor(evt) {
      this.$refs.modalEditor.hide()
      this.editRow()
    },

    cancelEditor() {
      this.editbleRow = {}
    },

    editRow() {
      // save old score
      let oldScore = this.player.tableData[this.editbleRow.index].score

      this.player.tableData[this.editbleRow.index].score = this.parsingScore(
        this.editbleRow.score
      )
      this.calculateScore()
      // cheking and comeback
      if (this.player.totalRemain < 0) {
        this.player.tableData[this.editbleRow.index].score = oldScore
        this.snowWrongScore()
      }

      this.rebuildTableData()
      this.checkGame()
    },

    deleteRow() {
      this.$refs.modalEditor.hide()
      let index = this.editbleRow.index
      this.player.tableData.splice(index, 1)
      this.rebuildTableData()
    },

    rebuildTableData() {
      this.calculateScore()
      this.throwCounter = 0
      for (var row in this.player.tableData) {
        this.throwCounter++
        this.player.tableData[row].throw = this.throwCounter
      }
    },

    checkGame() {
      if (!this.gameData.finished & (this.player.totalRemain === 0)) {
        this.showFinishGame()
      }
    },

    finishingGame() {
      this.gameData.finished = true
      this.gameData.winner = this.player.name
      this.$refs.modalFinishRef.hide()
    },

    calculateScore() {
      let tempScore = 0
      this.player.totalRemain = this.player.gameScore
      for (let row in this.player.tableData) {
        tempScore += this.player.tableData[row].score
        this.player.totalRemain -= this.player.tableData[row].score
        this.player.tableData[row].remain = this.player.totalRemain
      }
      return tempScore
    },

    refreshed() {
      this.$emit('refreshed')
    },

    snowWrongScore() {
      this.info = 'WRONG SCORE'
      this.showModal()
    },

    showFinishGame() {
      this.info = this.player.name.toUpperCase() + ' WIN'
      this.$refs.modalFinishRef.show()
    },

    cancelFinishig() {
      this.$refs.modalFinishRef.hide()
    },

    showModal() {
      this.$toasted
        .show(' ', {
          type: 'error',
          icon: 'error_outline',
          position: 'top-center'
        })
        .text(this.info)
        .goAway(1500)
    },

    hideModal() {
      this.$refs.ModalInfoRef.hide()
      this.$emit('addedNewScore', this.currentInputId)
    }
  }
}
</script>

<style>

</style>
