<template>

  <div>
    <b-navbar type="dark" variant="dark" toggleable>
      <b-navbar-toggle target="nav_dropdown_collapse"></b-navbar-toggle>
      <b-collapse is-nav id="nav_dropdown_collapse">
        <b-navbar-nav>
          <b-nav-item href="#/" :class="{ active: isActive('/') }">Home</b-nav-item>
          <b-nav-item href="#/g501" :class="{ active: isActive('/g501') }">501</b-nav-item>
          <b-nav-item href="#/cricket" :class="{ active: isActive('/cricket') }">Cricket</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
         <b-nav-item disabled>Dartsboard</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>

</template>

<script>
export default {
  name: 'mainmenu',
  data() {
    return {
      activeIndex: '0'
    }
  },
  methods: {
    isActive(path) {
      if (this.$route.fullPath === path) {
        return true
      }
    }
  }
}
</script>

<style>

</style>
