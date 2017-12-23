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
      <form @submit.stop.prevent="handleOkEditor">
        <b-input-group>
          <b-form-input type="text" placeholder="Score" v-model="scoreEditor.score"></b-form-input>
          <b-button size="sm" variant="danger" @click="deleteRow">Delete attempt</b-button>
        </b-input-group>
      </form>

    </b-modal>

    <!-- Main -->
    <h2><p class="text-center">{{totalRemain}}</p></h2>
    <b-input-group :right="calculateThrow()" class="mb-2 mr-sm-2 mb-sm-0">
      <b-form-input v-model="score" @change="inputScore" :id="currentInputId" type="text" placeholder="Score">
      </b-form-input>
    </b-input-group>
    <p>
      <span class="badge badge-dark">
        <em>Example add score: 20+40+50 or 110 </em>
      </span>
    </p>

    <b-table hover :items="tableData" :small="true" :striped="false" @row-clicked="editThrow" @refreshed="refreshed"></b-table>
  </div>
</template>

<script>
export default {
  name: 'Table501',
  props: ['player'],

  data() {
    return {
      throwCounter: 0,
      gameScore: 501,
      totalRemain: 0,
      tableData: [],
      info: '',
      currentRow: null,
      score: '',
      currentInputId: this.player.inputId,
      scoreEditor: {}
    }
  },
  methods: {
    addNewThrow() {
      let score = this.getaScore(this.score)
      this.score = ''

      if (score > this.totalRemain) {
        this.showAlert()
        return
      } else if (score === this.totalRemain) {
        this.showCongrats()
      }

      this.totalRemain = this.totalRemain - score

      this.throwCounter++
      this.tableData.push({
        throw: this.throwCounter,
        score: score,
        remain: this.totalRemain
      })
      console.log(score)
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
      this.$emit('addedNewScore', this.currentInputId) // call change focus element
    },
    editThrow(item, index, event) {
      this.scoreEditor = {
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
      this.scoreEditor = {}
    },
    editRow() {
      this.tableData[this.scoreEditor.index].score = this.getaScore(this.scoreEditor.score)
      this.recalculateScore()
    },
    deleteRow() {
      this.$refs.modalEditor.hide()
      let index = this.scoreEditor.index
      this.tableData.splice(index, 1)
      this.recalculateScore()
      // this.refreshed()
    },
    recalculateScore() {
      this.throwCounter = 0
      this.totalRemain = this.gameScore
      for (var row in this.tableData) {
        this.throwCounter++
        this.tableData[row].throw = this.throwCounter
        this.totalRemain -= this.tableData[row].score
        this.tableData[row].remain = this.totalRemain
      }
    },
    refreshed() {
      this.$emit('refreshed')
    },
    showAlert() {
      this.info = 'ERROR'
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
  },
  created() {
    this.totalRemain = this.gameScore
  }
}
</script>

<style>

</style>
