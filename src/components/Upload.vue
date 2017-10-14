/*
 * @Author: Michael 
 * @Date: 2017-10-13 20:45:38 
 * @Last Modified by: Michael
 * @Last Modified time: 2017-10-14 15:01:58
 * 上传页面
 */

<template>
  <div class="content">
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
          <el-upload :action="uploadUrl" list-type="picture-card">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="内容图片">
          <el-upload :action="uploadUrl" list-type="picture" multiple>
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
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
  }
}
</script>

<style lang="less">
.content {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
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




 
 
