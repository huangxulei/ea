<script setup>
import TomatoCard from "./components/tomato-card/tomato-card.vue";
import { useUserData } from "./stores/userData";
import { storeToRefs } from "pinia";

const userData = useUserData();
const { data } = storeToRefs(userData);


</script>

<template>
  <tomato-card :rest="data.rest" :alarm="data.alarm" @newRecord="handelNewRecord"></tomato-card>
</template>

<style lang="less"></style>
