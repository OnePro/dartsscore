

<template>
    <div>

        <h2>
            <p class="text-secondary" v-show="counter === 1">\</p>
            <p v-show="counter === 2">X</p>
            <p class="text-primary" v-show="counter >= 3">(X)</p>


        </h2>
                    <span v-show="counter > 0" size="sm" variant="link" @click="decremental">
                <i class="fas fa-undo"></i>
            </span>
    </div>
</template>


<script>
export default {
  name: 'cricketcounterview',
  props: ['counter', 'target', 'score'],
  methods: {
    decremental() {
      this.counter--
      // this.$emit('decremental')
    }
  }
}
</script>
