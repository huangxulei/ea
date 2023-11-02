<script setup>
import TomatoCard from "./components/tomato-card/tomato-card.vue";
</script>

<template>
  <tomato-card :rest="data.rest" :alarm="data.alarm" @newRecord="handelNewRecord"></tomato-card>
</template>

<style lang="less"></style>
