<template>
  <page-container title="更换头像">
    <el-upload
      class="avatar-uploader"
      ref="uploadRef"
      :show-file-list="false"
      :auto-upload="false"
      :on-change="onSelectFile"
    >
      <img v-if="imgUrl" :src="imgUrl" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
    <el-button
      type="primary"
      :icon="Plus"
      size="large"
      @click="uploadRef.$el.querySelector('input').click()"
      >选择图片
    </el-button>
    <el-button type="success" :icon="Upload" size="large" @click="uploadAvatar"
      >上传头像
    </el-button>
  </page-container>
</template>

<script setup>
import { ref } from 'vue'
import { Plus, Upload } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores'
import { userAvatarApi } from '@/api/user'

const userStore = useUserStore()
const imgUrl = ref(userStore.user.user_pic)
const uploadRef = ref()

const onSelectFile = (uploadFile) => {
  // 本地图片预览
  // imgUrl.value = URL.createObjectURL(uploadFile.raw)

  // 基于 FileReader 读取图片预览
  const reader = new FileReader()
  reader.readAsDataURL(uploadFile.raw)
  reader.onload = () => {
    imgUrl.value = reader.result
  }
}
// 头像上传提交
const uploadAvatar = async () => {
  await userAvatarApi(imgUrl.value)
  await userStore.getUser()
  ElMessage.success('头像更新成功！')
}
</script>

<style lang="scss" scoped>
.avatar-uploader {
  margin-bottom: 20px;
  :deep() {
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }
    .el-upload:hover {
      border-color: var(--el-color-primary);
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}
</style>
