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
    <!-- prompt -->
    <el-dialog
        v-model="dialogVisible" title="Tips" width="30%">
        <span>{{ playerText }}</span>
        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="Pause"> 确认 </el-button>
            </span>
        </template>
    </el-dialog>
    <!-- main -->
    <div class="tomato-card card">
        <div class="header">
            <el-icon>
                <Timer />
            </el-icon>
            <span>{{ title }}</span>
        </div>
        <div v-if="state === 'ready'">
            <div class="NumberSelector">
                <input-number :num="num" :min="25" :max="max" suffix="分钟" :step="5"></input-number>
            </div>
            <div class="tip" v-if="num < 25">你还没有休息时间</div>
            <div class="tip" v-else> 你将有{{ breakTime }} 分钟的休息时间 </div>
            <div class="controlArea">
                <el-button class="button" @click="readyToWorking">
                    <div> 启动新一轮番茄时间</div>
                </el-button>
            </div>
        </div>

    </div>
</template>
<style scoped lang="scss">
.tomato-card {
    .NumberSelector {
        display: flex;
        justify-content: center;
        margin: 20px;
    }

    .tip {
        color: gray;
    }

    .controlArea {
        margin-top: 40px;
    }

    .controlArea {
        margin-top: 40px;
    }

    .working {
        padding: 20px;
    }

    .button {
        background-color: #1a6ba8;
        height: 40px;
        border-radius: 10px;
        padding: 10px;
        border: white 3px solid;
        color: white;
        font-size: 20px;

        &:hover {
            border: #cb8258 3px solid;
        }
    }

}
</style>