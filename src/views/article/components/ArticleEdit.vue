<template>
  <el-drawer
    v-model="visibleDrawer"
    :title="formModel.id ? '编辑文章' : '添加文章'"
    direction="rtl"
    size="50%"
  >
    <!-- 发表文章表单 -->
    <el-form
      :model="formModel"
      ref="formRef"
      :rules="rules"
      label-width="100px"
    >
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="formModel.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="文章分类" prop="cate_id">
        <channel-select
          v-model="formModel.cate_id"
          width="100%"
        ></channel-select>
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img">
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="onSelectFile"
        >
          <img v-if="imgUrl" :src="imgUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <div class="editor">
          <quill-editor
            theme="snow"
            content-type="html"
            v-model:content="formModel.content"
            ref="editorRef"
          ></quill-editor>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onPublish('已发布')">发布</el-button>
        <el-button type="info" @click="onPublish('草稿')">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<script setup>
import { nextTick, ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import ChannelSelect from './ChannelSelect.vue'
import { articleAddApi, articleDetailApi, articleEditApi } from '@/api/article'
import { baseURL } from '@/utils/request'
import { imageUrlToFile } from '@/utils/format'

const visibleDrawer = ref(false)
// 默认表单数据
const defaultForm = {
  title: '',
  cate_id: '',
  content: '',
  cover_img: '',
  state: ''
}
const formModel = ref({ ...defaultForm })
const imgUrl = ref('')
const formRef = ref()
const editorRef = ref()

const rules = {
  title: [
    { required: true, message: '请输入文章标题', trigger: 'blur' },
    {
      pattern: /^\S$/,
      message: '文章标题必须是非空字符',
      trigger: 'blur'
    }
  ],
  cate_id: [{ required: true, message: '请选择文章分类', trigger: 'blur' }],
  cover_img: [{ required: true, message: '请上传封面图', trigger: 'blur' }],
  content: [{ required: true, message: '请输入文章内容', trigger: 'blur' }]
}

// 上传监听
const onSelectFile = (uploadFile) => {
  // 本地图片预览
  imgUrl.value = URL.createObjectURL(uploadFile.raw)
  // 立刻将图片对象存入 formModel 用于提交
  formModel.value.cover_img = uploadFile.raw
}

// 暴露 open 方法
const open = async (row) => {
  visibleDrawer.value = true
  if (row.id) {
    const res = await articleDetailApi(row.id)
    formModel.value = res.data.data
    // 图片单独回显
    imgUrl.value = baseURL + formModel.value.cover_img
    // 后台提交的图片地址是 file 对象格式，需转换
    // 网络图片地址 => 转换成 file 对象
    const file = await imageUrlToFile(imgUrl.value, formModel.value.cover_img)
    formModel.value.cover_img = file
  } else {
    // 重置表单数据
    formModel.value = { ...defaultForm }
    // 图片、富文本编辑器需要手动重置
    imgUrl.value = ''
    nextTick(() => {
      editorRef.value.setHTML('')
    })
  }
}

defineExpose({
  open
})

// 发布
const emit = defineEmits(['success'])
const onPublish = async (state) => {
  await formRef.value.validate()
  formModel.value.state = state
  // 当前接口要的是 formData 对象,需要转换
  const fd = new FormData()
  for (let key in formModel.value) {
    fd.append(key, formModel.value[key])
  }

  if (formModel.value.id) {
    await articleEditApi(fd)
    ElMessage.success('编辑成功！')
    visibleDrawer.value = false
    emit('success', 'edit')
  } else {
    await articleAddApi(fd)
    ElMessage.success('添加成功！')
    visibleDrawer.value = false
    emit('success', 'add')
  }
}
</script>

<style lang="scss" scoped>
.avatar-uploader {
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
.editor {
  width: 100%;
  :deep(.ql-editor) {
    min-height: 200px;
  }
}
</style>
