<template>
  <div>
    <b-modal ref="ModalInfoRef" hide-footer title="Info">
      <div class="d-block text-center">
        <h3>{{info}}</h3>
      </div>
      <b-btn class="mt-3" variant="outline-danger" block @click="hideModal">Close Me</b-btn>
    </b-modal>

    <h3>{{TotalRemain}}</h3>
    <b-input-group :right="getaScore()" class="mb-2 mr-sm-2 mb-sm-0">
      <b-form-input v-model="score" @change="inputScore" type="text" placeholder="Score"></b-form-input>
    </b-input-group>
    <!--    <b-button @click="addNewThrow">Add</b-button> -->

    <b-table striped hover :items="tableData"></b-table>
  </div>
</template>

<script>
export default {
  name: 'Table501',
  data() {
    return {
      counter: 0,
      TotalRemain: 0,
      tableData: [],
      info: '',
      currentRow: null,
      score: ''
    }
  },
  methods: {
    addNewThrow() {
      let score = this.getaScore()
      this.score = ''

      if (score > this.TotalRemain) {
        this.showAlert()
        return
      } else if (score === this.TotalRemain) {
        this.showCongrats()
      }

      this.TotalRemain = this.TotalRemain - score

      this.counter++
      this.tableData.push({
        throw: this.counter,
        score: score,
        remain: this.TotalRemain
      })
    },
    getNumber(value) {
      try {
        return Number(value)
      } catch (err) {
        return 0
      }
    },
    inputScore() {
      this.addNewThrow()
    },
    getaScore() {
      let score = this.score
      // if It's calculator
      let totalScore = 0
      let indexPlus = score.search('[+]')
      if (indexPlus > 0) {
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
    showAlert() {
      this.info = 'ERROR'
      this.showModal()
    },
    showCongrats() {
      this.info = 'YOU ARE WINNER'
      this.showModal()
    },
    showModal() {
      this.$refs.ModalInfoRef.show()
    },
    hideModal() {
      this.$refs.ModalInfoRef.hide()
    }
  },
  created() {
    this.TotalRemain = 510
  }
}
</script>

<style>
.table th,
.table td {
  padding: 0.2rem;
}
</style>
