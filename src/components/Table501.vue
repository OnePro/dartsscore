<template>
  <div>
    <!-- Modal Info -->
    <b-modal ref="ModalInfoRef" hide-footer>
      <div class="d-block text-center">
        <h3>{{info}}</h3>
      </div>
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
        <b-badge variant="danger">{{this.player.totalRemain}}</b-badge>
      </div>
    </h1>

    <b-input-group :right="calculateThrow()" class="mb-2 mr-sm-2 mb-sm-0">
      <b-form-input v-model="score" @change="inputScore" :id="this.player.inputId" type="text" placeholder="Score">
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
  props: ['player'],

  data() {
    return {
      throwCounter: 0,
      info: '',

      score: '',
      editbleRow: {}
    }
  },
  methods: {
    addNewThrow() {
      let score = this.getaScore(this.score)
      this.score = ''

      if (score > this.player.totalRemain) {
        this.showAlert()
        return
      } else if (score === this.player.totalRemain) {
        this.showCongrats()
      }

      this.player.totalRemain = this.player.totalRemain - score

      this.throwCounter++
      this.player.tableData.push({
        throw: this.throwCounter,
        score: score,
        remain: this.player.totalRemain
      })
      // console.log(score)
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
    },
    calculateThrow() {
      let tempScore = this.getaScore(this.score)
      return tempScore.toString()
    },
    getaScore(score) {
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
      this.player.tableData[this.editbleRow.index].score = this.getaScore(
        this.editbleRow.score
      )
      this.recalculateScore()
    },
    deleteRow() {
      this.$refs.modalEditor.hide()
      let index = this.editbleRow.index
      this.player.tableData.splice(index, 1)
      this.recalculateScore()
      // this.refreshed()
    },
    recalculateScore() {
      this.throwCounter = 0
      this.player.totalRemain = this.player.gameScore
      for (var row in this.player.tableData) {
        this.throwCounter++
        this.player.tableData[row].throw = this.throwCounter
        this.player.totalRemain -= this.player.tableData[row].score
        this.player.tableData[row].remain = this.player.totalRemain
      }
    },
    refreshed() {
      this.$emit('refreshed')
    },
    showAlert() {
      this.info = 'WRONG SCORE'
      this.showModal()
    },
    showCongrats() {
      this.info = this.player.name.toUpperCase() + ' WIN'
      this.showModal()
    },
    showModal() {
      this.$refs.ModalInfoRef.show()
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
