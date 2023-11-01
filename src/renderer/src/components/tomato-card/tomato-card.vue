<script setup>
import { ref } from 'vue';
import { Timer } from '@element-plus/icons-vue'

const props = defineProps(['rest', 'alarm'])
const emit = defineEmits(['newRecord'])

//计时器的默认分钟数
const num = ref(25);
const title = ref('准备专注');
const state = ref('ready');

const dialogVisible = ref(false);
const playerText = ref('');
//Pause闭包函数， 用于暂停音乐
let Pause;

</script>
<template>
    <el-dialog
        v-model="dialogVisible" title="Tips" width="30%">
        <span>{{ playerText }}</span>
        <template>

        </template>
    </el-dialog>
</template>
<style scoped></style>