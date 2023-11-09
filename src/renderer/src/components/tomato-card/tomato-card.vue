<script setup>
import { ref } from "vue";
import { Timer } from "@element-plus/icons-vue";
import musicList from './../../utils/musicList'

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

function play(music, text) {
    playerText.value = text;
    dialogVisible.value = true;
    const player = new Audio(musicList[music].value);
    player.play()
    const intervalId = setInterval(() => { player.play() }, 6000);
    Pause = () => {
        dialogVisible.value = false;
        clearInterval(intervalId);
        player.pause();
    }
}

</script>
<template>
    <el-dialog
        v-model="dialogVisible" title="Tips" width="30%">
        <span>{{ playerText }}</span>
        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="Pause"> 确认 </el-button>
            </span>
        </template>
    </el-dialog>
</template>
<style scoped></style>