<script setup>
import { computed, onMounted, ref } from 'vue'
const props = defineProps(['time', 'endButton']);
const emit = defineEmits(['over']);
const m = ref(0);
const s = ref(0);
const count = ref(0);
const data = {
    start: null,
    end: null
}

const colors = [
    { color: '#f56c6c', percentage: 20 },
    { color: '#d37d6f', percentage: 30 },
    { color: '#eabc99', percentage: 50 },
    { color: '#31a3ff', percentage: 70 },
    { color: '#5cb87a', percentage: 100 },
]

</script>
<template>
    <div class="progress">
        <el-progress type="circle" :percentage="percentage" :width="240" :stroke-width="20" :color="colors">
            <template #default>
                <span class="percentage-value percentage timer">{{ sm }}:{{ ss }}</span>
            </template>
        </el-progress>
    </div>
</template>
<style scoped lang="scss">
.timer {
    font-size: 50px;
    font-weight: bold;
    margin: 10px;
}

.progress {
    margin-top: 30px;

}
</style>
