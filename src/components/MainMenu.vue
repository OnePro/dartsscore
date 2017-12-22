<template>

<div>
  <b-navbar type="dark" variant="primary" toggleable>
    <b-navbar-toggle target="nav_dropdown_collapse"></b-navbar-toggle>
    <b-collapse is-nav id="nav_dropdown_collapse">
      <b-navbar-nav>
        <b-nav-item href="#/" active>Home</b-nav-item>
        <b-nav-item href="#/g501">501</b-nav-item>
        <b-nav-item-dropdown text="User">
          <b-dropdown-item href="#">Account</b-dropdown-item>
          <b-dropdown-item href="#">Settings</b-dropdown-item>
        </b-nav-item-dropdown>
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
  /*    onClick(event) {
     if (key === '0') {
        this.$router.push('/')
      } else if (key === '1') {
        this.$router.push('/g501')
      }
     } */
  }
}
</script>

<style>

</style>
