/*
 * @Author: Michael 
 * @Date: 2017-10-13 20:45:38 
 * @Last Modified by: Michael
 * @Last Modified time: 2017-10-15 20:10:21
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
          <el-input v-model="form.code" placeholder="选填"></el-input>
        </el-form-item>
        <el-form-item label="项目区域" prop="area">
          <el-select v-model="form.area" placeholder="请选择项目区域">
            <el-option label="杭州区域" value="杭州区域"></el-option>
            <el-option label="温州区域" value="温州区域"></el-option>
            <el-option label="宁波区域" value="宁波区域"></el-option>
            <el-option label="浙北区域" value="浙北区域"></el-option>
            <el-option label="浙中区域" value="浙中区域"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="创建时间" prop="createTime">
          <el-date-picker v-model="form.createTime" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="创建人">
          <el-input v-model="form.createUser"></el-input>
        </el-form-item>
        <el-form-item label="是否首页">
          <el-radio v-model="form.isTop" label="1">是</el-radio>
          <el-radio v-model="form.isTop" label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="项目描述" prop=" description">
          <el-input type="textarea" v-model="form. description"></el-input>
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
import router from '../router';
export default {
  data() {
    return {
      uploadUrl: window.Config.server + '/image/upload',
      form: {
        name: '',   // 项目名称
        code: '',   // 项目编号
        area: '',  // 项目区域
        description: '',  // 项目描述,
        cover: [],   // 封面图片
        content: [], //内容图片,
        createTime: '', //创建时间
        createUser: '', //创建人
        isTop: '1', // 是否首页
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入项目名称',
            trigger: 'blur'
          }
        ],
        area: [
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
        ],
        createTime: [
          {
            type: 'date',
            required: true,
            message: '请选择创建时间',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // 上传封面
    uploadCover(response, file, fileList) {
      console.log(response);
      const data = response.data;
      this.form.cover.push(data);
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
            this.form.content.push(item.response.data)
          }
        })
      }
    },
    removeContent(file, fileList) {
      if (fileList.length) {
        this.form.content = [];
        fileList.map((item) => {
          if (item.response) {
            this.form.content.push(item.response.data)
          }
        })
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.form.cover.length === 0) {
            this.$message({
              type: 'warning',
              message: '请上传封面图片'
            })
          }
          this.$confirm('确认新建作品吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let form = this.form;
            let param = {
              name: form.name,
              code: form.code,
              area: form.area,
              description: form.description,
              createTime: new Date(this.createTime).valueOf(),
              cover: form.cover[0],
              images: form.content.join(','),
              createUser: form.createUser,
              isTop: form.isTop
            }
            $.ajax({
              type: 'post',
              url: window.Config.server + '/backend/add',
              data: param,
              dataType: "json",
              success: () => {
                router.go(0);
                this.$message({
                  type: 'success',
                  message: '新建成功！'
                });
              },
              error: () => {
                this.$message({
                  type: 'error',
                  message: '新建失败！'
                });
              }
            })
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




 
 
