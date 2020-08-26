<template>
  <div class="holder">
    <h1>Heading h1</h1>
    <h2>Heading h2</h2>
    <h3>Heading h3</h3>
    <h4>Heading h4</h4>
    <p>text template</p>
    <modal :show="show" @close="show=false"> hello world! </modal>
    <button @click="show = true">open</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        show: false,
      }
    }
  }
</script>

<style>
</style>
