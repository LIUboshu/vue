<template>
  <div id="app">
    <h2>{{ $store.state.counter }}</h2>
    <h2>{{coun}}</h2>
    <button @click="coun++">加</button>
    <button @click="coun--">减</button>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>
<script>
import HelloVuex from './components/HelloVuex.vue'

export default {
    name:"HelloVuex",
    data () {
      return {
        coun:1
      }
    },
    components: {
      HelloVuex
    }
}
</script>

<style lang="less">

</style>
