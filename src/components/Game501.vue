<template>
<div>
    
    
        <h3>501 game</h3>
        <b-row class="row">
             <div v-for="idplayer in players" :key="idplayer.id">
                 <player :id='idplayer.id'></player>           
            </div>
        </b-row>


</div>
</template>

<script>
export default {
  name: 'Game501',
  data() {
    return {
      players: [{ id: 1 }, { id: 2 }]
    }
  }
}
</script>

<style>
    .row{
        padding: 50px 50px 50px 50px
    }
</style>

