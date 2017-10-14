/*
 * @Author: Michael 
 * @Date: 2017-10-13 20:45:38 
 * @Last Modified by: Michael
 * @Last Modified time: 2017-10-14 18:32:17
 * 上传页面
 */

<template>
  <div class="content">
    <div class="title">新建作品</div>
    <div class="source">
      <el-form ref="form" label-width="80px" :rules="rules" :model="form">
        <el-form-item label="项目名称" prop="name">
          <el-input v-model="form.name" placeholder="必填"></el-input>
        </el-form-item>
        <el-form-item label="项目编号">
          <el-input v-model="form.id" placeholder="选填"></el-input>
        </el-form-item>
        <el-form-item label="项目区域" prop="region">
          <el-select v-model="form.region" placeholder="请选择项目区域">
            <el-option label="杭州区域" value="hangzhou"></el-option>
            <el-option label="温州区域" value="wenzhou"></el-option>
            <el-option label="宁波区域" value="ningbo"></el-option>
            <el-option label="浙北区域" value="zhebei"></el-option>
            <el-option label="浙中区域" value="zhezhong"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目描述" prop="describe">
          <el-input type="textarea" v-model="form.describe"></el-input>
        </el-form-item>
        <el-form-item label="封面图片">
          <el-upload :action="uploadUrl" list-type="picture-card" :on-success="uploadCover" :on-remove="removeCover">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="内容图片">
          <el-upload :action="uploadUrl" multiple :on-success="uploadContent" :on-remove="removeContent">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">确认提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uploadUrl: window.Config.server + '/image/upload',
      form: {
        name: '',   // 项目名称
        id: '',   // 项目编号
        region: '',  // 项目区域
        describe: '',  // 项目描述,
        cover: [],   // 封面图片
        content: [], //内容图片
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入项目名称',
            trigger: 'blur'
          }
        ],
        region: [
          {
            required: true,
            message: '请选择项目区域',
            trigger: 'change'
          }
        ],
        describe: [
          {
            required: true,
            message: '请填写项目描述',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // 上传封面
    uploadCover(response, file, fileList) {
      const data = response.data;
      let item = {
        name: file.name,
        url: 'http://10.0.0.7:4869/' + data.info.md5
      }
      this.form.cover.push(item);
      if (fileList.length > 1) {
        fileList.splice(0, 1);
        this.form.cover.splice(0, 1);
      }
    },

    removeCover(file, fileList) {
      this.form.cover.splice(0, 1);
    },

    uploadContent(response, file, fileList) {
      if (fileList.length) {
        this.form.content = [];
        fileList.map((item) => {
          if (item.response) {
            this.form.content.push({
              name: item.name,
              url: 'http://10.0.0.7:4869/' + item.response.data.info.md5
            })
          }
        })
      }
    },
    removeContent(file, fileList) {
      if (fileList.length) {
        this.form.content = [];
        fileList.map((item) => {
          if (item.response) {
            this.form.content.push({
              name: item.name,
              url: 'http://10.0.0.7:4869/' + item.response.data.info.md5
            })
          }
        })
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('确认新建作品吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'success',
              message: '新建成功！'
            });
          }).catch(() => {
            return;
          })
        } else {
          return false;
        }
      })
    }
  }
}
</script>

<style lang="less">
.content {
  display: flex;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
  flex-direction: column;
  padding-top: 20px;
  .title {
    width: 650px;
    margin-bottom: 20px;
  }
  .source {
    padding: 24px;
    border: 1px solid #eaeefb;
    border-radius: 4px;
    transition: .2s;
    width: 650px;
    .el-form {
      width: 400px;
    }
  }
}
</style>




 
 
