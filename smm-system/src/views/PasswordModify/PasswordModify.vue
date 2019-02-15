<template>
  <div class="passwordmodify">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="title">修改账号密码</span>
      </div>
      <div class="text item">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="原密码：">
            <el-input v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item label="新密码：">
            <el-input v-model="form.newpwd"></el-input>
          </el-form-item>
          <el-form-item label="新密码：">
            <el-input v-model="form.newpass"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">修改</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        password: ""
      }
    };
  }
};
</script>
<style lang=less>
.el-main {
  .passwordmodify {
    .el-card {
      background: rgba(235, 235, 235, 0.29);
      .el-card__header {
        text-align: left;
        font-size: 20px;
        line-height: 40px;
        color: #fff;
      }
      .el-card__body {
        width: 600px;
        .el-form {
          width: 420px;
          .el-form-item {
            .el-form-item__content {
              margin-left: 0;
              .el-input {
                width: 300px;
              }
              .el-button {
                background-color: rgba(11, 133, 96, 0.86);
                }
              .el-button--primary{
                border:  rgba(11, 133, 96, 0.86);
              }
            }
            .el-form-item__label {
              width: 100px !important;
            }
          }
        }
      }
    }
  }
}
</style>
