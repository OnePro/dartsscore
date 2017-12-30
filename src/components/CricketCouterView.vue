

<template>
    <div>
        <h2>
            <span v-show="counter === 1">\</span>
            <span v-show="counter === 2">X</span>
            <span v-show="counter >= 3">[X]</span>
        </h2>
    </div>
</template>


<script>
export default {
  name: 'cricketcounterview',
  props: ['counter']
}
</script>
