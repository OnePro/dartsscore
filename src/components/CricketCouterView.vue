

<template>
    <div>

        <h3>
            <div class="text-secondary" v-show="counter === 1">\</div>
            <div v-show="counter === 2">X</div>
            <div class="text-primary" v-show="counter >= 3">(X)</div>

            
        </h3>
        <div v-show="score > 0">{{score}}</div>
    </div>
</template>


<script>
export default {
  name: 'cricketcounterview',
  props: ['counter', 'target', 'score', 'player']
}
</script>
