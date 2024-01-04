<template>
  <el-select
    :modelValue="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
    :style="{ width }"
  >
    <el-option
      v-for="item in channelList"
      :key="item.id"
      :label="item.cate_name"
      :value="item.id"
    ></el-option>
  </el-select>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { channelListApi } from '@/api/article'

defineProps({
  modelValue: {
    type: [Number, String]
  },
  width: {
    type: String
  }
})
const emit = defineEmits(['update:modelValue'])

const channelList = ref([])

const getChannelList = async () => {
  const res = await channelListApi()
  channelList.value = res.data.data
  // console.log(channelList.value)
}

onMounted(() => {
  getChannelList()
})
</script>
