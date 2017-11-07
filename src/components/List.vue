/*
 * @Author: Michael 
 * @Date: 2017-10-15 20:10:39 
 * @Last Modified by: Michael
 * @Last Modified time: 2017-11-07 15:27:13
 * 后台表格
 */

<template>
  <div class="list-content">
    <el-dialog :title="operate === 'add' ? '添加项目' : '修改项目'" :visible.sync="dialogTableVisible" @close="handleCloseDialog">
      <el-form ref="form" label-width="80px" :rules="rules" :model="form">
        <el-form-item label="项目名称" prop="name">
          <el-input v-model="form.name" placeholder="必填"></el-input>
        </el-form-item>
        <el-form-item label="项目编号">
          <el-input v-model="form.code" placeholder="选填"></el-input>
        </el-form-item>
        <el-form-item label="地区">
          <el-input v-model="form.address" placeholder="(例如：中国·浙江·舟山)"></el-input>
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
          <el-upload :action="uploadUrl" ref="uploadCover" list-type="picture-card" :on-success="uploadCover" :on-remove="removeCover" :file-list="form.coverList">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="内容图片">
          <el-upload :action="uploadUrl" ref="uploadContent" multiple :on-success="uploadContent" :on-remove="removeContent" :file-list="form.contentList" list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('form')">确认提交</el-button>
      </div>
    </el-dialog>
    <div class="table">
      <el-button type="primary" @click="handleAdd" size="small" class="add-btn">添加</el-button>
      <el-table :data="tableData" border style="width: 100%" stripe highlight-current-row>
        <el-table-column prop="name" label="项目名称"></el-table-column>
        <el-table-column prop="code" label="项目编号"></el-table-column>
        <el-table-column prop="address" label="地区"></el-table-column>
        <el-table-column prop="area" label="项目区域"></el-table-column>
        <el-table-column prop="createTime" :formatter="formatDate" label="创建时间"></el-table-column>
        <el-table-column prop="createUser" label="创建人"></el-table-column>
        <el-table-column prop="description" label="项目描述"></el-table-column>
        <el-table-column label="操作" widt="200">
          <template scope="scope">
            <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="handleDelete(scope.row, scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination :page-size="pageSize" :total="totalCount" layout="total, prev, pager, next" :current-page.sync="pageNum" @current-change="handleChangePage">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "list",
  data() {
    return {
      pageNum: 1,
      pageSize: 15,
      tableData: [],
      totalCount: 0,
      dialogTableVisible: false, // 模态框显示
      operate: "add",

      uploadUrl: window.Config.server + "/image/upload",
      form: {
        id: "",
        name: "", // 项目名称
        code: "", // 项目编号
        address: "", // 项目地址
        area: "", // 项目区域
        description: "", // 项目描述,
        cover: [], // 封面图片
        content: [], //内容图片,
        coverList: [],
        contentList: [],
        createTime: "", //创建时间
        createUser: "", //创建人
        isTop: "1" // 是否首页
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入项目名称",
            trigger: "blur"
          }
        ],
        address: [
          {
            required: true,
            message: "请填写地区，例如：中国舟山",
            trigger: "blur"
          }
        ],
        area: [
          {
            required: true,
            message: "请选择项目区域",
            trigger: "change"
          }
        ],
        describe: [
          {
            required: true,
            message: "请填写项目描述",
            trigger: "blur"
          }
        ],
        createTime: [
          {
            type: "date",
            required: true,
            message: "请选择创建时间",
            trigger: "blur"
          }
        ]
      }
    };
  },

  created() {
    this.getTableList(this.pageNum);
  },

  methods: {
    getTableList(pageNum) {
      $.ajax({
        type: "post",
        url: window.Config.server + "/backend/list",
        data: {
          pageNum: pageNum,
          pageSize: this.pageSize
        },
        dataType: "json",
        success: res => {
          this.tableData = res.data.list;
          this.totalCount = res.data.total;
        }
      });
    },
    handleChangePage(val) {
      this.getTableList(val);
    },

    // 删除
    handleDelete(row, index) {
      this.$confirm("确认删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        $.ajax({
          type: "post",
          url: window.Config.server + "/backend/delete",
          data: {
            id: row.id
          },
          dataType: "json",
          success: () => {
            this.tableData.splice(index, 1);
            this.totalCount--;
            this.$message({
              type: "success",
              message: "删除成功！"
            });
          }
        });
      });
    },

    // 添加项目
    handleAdd() {
      this.operate = "add";
      this.dialogTableVisible = true;
    },

    // 编辑项目
    handleEdit(item) {
      this.operate = "edit";
      this.dialogTableVisible = true;
      let coverListItem = {
        name: item.cover,
        url: window.Config.server + "/resource/" + item.cover + "?w=146&h=146"
      };
      let contentList = [];
      let imagesList = item.images.split(",");
      if (imagesList) {
        imagesList.map(temp => {
          contentList.push({
            name: temp,
            url: window.Config.server + "/resource/" + temp + "?w=70&h=70"
          });
        });
      }

      this.form = {
        id: item.id,
        name: item.name, // 项目名称
        code: item.code, // 项目编号
        address: item.address,
        area: item.area, // 项目区域
        description: item.description, // 项目描述,
        cover: [item.cover], // 封面图片,
        content: item.images.split(",") || [], //内容图片,
        coverList: [coverListItem],
        contentList: contentList,
        createTime: new Date(item.createTime), //创建时间
        createUser: item.createUser, //创建人
        isTop: String(item.isTop) // 是否首页
      };
    },

    // 上传封面
    uploadCover(response, file, fileList) {
      console.log(fileList);
      const data = response.data;
      this.form.cover.push(data);
      if (fileList.length > 1) {
        fileList.splice(0, 1);
        this.form.cover.splice(0, 1);
      }
    },

    removeCover(file, fileList) {
      this.form.cover.splice(0, 1);
      this.form.coverList.splice(0, 1);
    },

    uploadContent(response, file, fileList) {
      if (fileList.length) {
        this.form.content = [];
        fileList.map(item => {
          if (item.response) {
            this.form.content.push(item.response.data);
          } else if (item.url) {
            let list = item.url.split("/");
            let len = list.length;
            this.form.content.push(list[len - 1].split("?")[0]);
          }
        });
      }
    },
    removeContent(file, fileList) {
      console.log(fileList);
      if (fileList.length) {
        this.form.content = [];
        fileList.map(item => {
          if (item.response) {
            this.form.content.push(item.response.data);
          } else if (item.url) {
            let list = item.url.split("/");
            let len = list.length;
            this.form.content.push(list[len - 1].split("?")[0]);
          }
        });
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.operate === "add") {
            if (this.form.cover.length === 0) {
              this.$message({
                type: "warning",
                message: "请上传封面图片"
              });
            }
          }
          this.$confirm(`确认${this.operate === "add" ? "新建" : "编辑"}作品吗？`, "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              let form = this.form;
              let param = {
                id: form.id,
                name: form.name,
                code: form.code,
                address: form.address,
                area: form.area,
                description: form.description,
                createTime: new Date(form.createTime).valueOf(),
                cover: form.cover[0],
                images: form.content.join(","),
                createUser: form.createUser,
                isTop: form.isTop
              };
              if (this.form.id) {
                //编辑
                $.ajax({
                  type: "post",
                  url: window.Config.server + "/backend/update",
                  data: param,
                  dataType: "json",
                  success: () => {
                    this.getTableList(this.pageNum);
                    this.handleCloseDialog();
                    this.$message({
                      type: "success",
                      message: "编辑成功！"
                    });
                  },
                  error: () => {
                    this.$message({
                      type: "error",
                      message: "编辑失败！"
                    });
                  }
                });
              } else {
                $.ajax({
                  type: "post",
                  url: window.Config.server + "/backend/add",
                  data: param,
                  dataType: "json",
                  success: () => {
                    this.handleCloseDialog();
                    this.getTableList(this.pageNum);
                    this.$message({
                      type: "success",
                      message: "新建成功！"
                    });
                  },
                  error: () => {
                    this.$message({
                      type: "error",
                      message: "新建失败！"
                    });
                  }
                });
              }
            })
            .catch(() => {
              return;
            });
        } else {
          return false;
        }
      });
    },
    handleCloseDialog() {
      this.form = {
        id: "",
        name: "", // 项目名称
        code: "", // 项目编号
        address: "",
        area: "", // 项目区域
        description: "", // 项目描述,
        cover: [], // 封面图片
        content: [], //内容图片,
        coverList: [],
        contentList: [],
        createTime: "", //创建时间
        createUser: "", //创建人
        isTop: "1" // 是否首页
      };
      this.dialogTableVisible = false;
      this.$refs.uploadCover.clearFiles();
      this.$refs.uploadContent.clearFiles();
    },

    formatDate(row, column, timestamp) {
      let format = "YYYY年MM月";
      if (!timestamp) return "";

      var date = new Date(parseInt(timestamp));
      var y = date.getFullYear(),
        m = date.getMonth() + 1,
        d = date.getDate(),
        h = date.getHours(),
        i = date.getMinutes(),
        s = date.getSeconds(),
        w = date.getDay(),
        week = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];

      m = m < 10 ? "0" + m : m;
      d = d < 10 ? "0" + d : d;
      h = h < 10 ? "0" + h : h;
      i = i < 10 ? "0" + i : i;
      s = s < 10 ? "0" + s : s;
      return format
        .replace("YYYY", y)
        .replace("MM", m)
        .replace("DD", d)
        .replace("H", h)
        .replace("i", i)
        .replace("s", s)
        .replace("WW", week[w]);
    }
  }
};
</script>

<style lang="less">
.list-content {
  position: absolute;
  width: 100%;
  height: 100%;
  .table {
    margin: 50px;
    .add-btn {
      float: right;
      margin-bottom: 30px;
    }
    .block {
      float: right;
      margin-top: 30px;
    }
  }
  .el-dialog {
    .el-dialog__body {
      height: 500px;
      overflow: auto;
      .el-form {
        width: 400px;
      }
    }
  }
}
</style>
