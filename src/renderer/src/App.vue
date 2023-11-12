<script setup>
import TomatoCard from "./components/tomato-card/tomato-card.vue";
import { useUserData } from "./stores/userData";
import { storeToRefs } from "pinia";

const userData = useUserData();
const { data } = storeToRefs(userData);
function handelNewRecord(record) {
  userData.setNewRecord(record);
}

</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-main class="main">
        <tomato-card :rest="data.rest" :alarm="data.alarm" @newRecord="handelNewRecord"></tomato-card>

      </el-main>
    </el-container>
  </div>
</template>

<style scoped lang="scss">
.main {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
}
</style>