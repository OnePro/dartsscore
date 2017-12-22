<template>
  <div id="app">
    <b-container>
      <mainmenu></mainmenu>
    </b-container>
    
    <b-container>
      <router-view></router-view>
    </b-container>
  
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>

</style>
