<template>
  <div class="commoditystorage">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="title">商品入库</span>
      </div>
      <div class="text item">
        <el-form ref="inventoryForm" :model="inventoryForm" label-width="80px" :rules="rules">
          <el-form-item label="商品条形码：" prop="code">
            <el-input v-model="inventoryForm.code"></el-input>
          </el-form-item>
          <el-form-item label="商品进价：" prop="purchase">
            <el-input v-model="inventoryForm.purchase"></el-input>元
          </el-form-item>
          <el-form-item label="入库数量：" prop="storage">
            <el-input v-model="inventoryForm.storage"></el-input>
            <div class="notify">计量商品单位为千克</div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addStorage('inventoryForm')">入库</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import qs from "qs";

export default {
  data() {
    const checkNum = (rule, value, callback) => {
      if (value === "") {
        callback();
      } else {
        let patrn = /^\d+(\.\d+)?$/;
        if (!patrn.test(value)) {
          callback(new Error("格式必须为数字"));
        }
        callback();
      }
    };
    return {
      inventoryForm: {
        code: "",
        purchase: "",
        storage: ""
      },
      rules: {
        code: [
          { required: true, message: "请输入商品条形码", trigger: "blur" }
        ],
        purchase: [{ required: true, validator: checkNum, trigger: "blur" }],

        storage: [{ required: true, validator: checkNum, trigger: "blur" }],
      }
    };
  },
  methods: {
    addStorage(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = {
            code: this.inventoryForm.code,
            purchase: this.inventoryForm.purchase,
            storage: this.inventoryForm.storage
          };
          this.axios.post("http://127.0.0.1:5555/inventory/commoditystorage", qs.stringify(params))
            .then(response => {
              let { error_code, reason } = response.data;

              // 根据后端响应的数据判断
              if (error_code === 0) {
                // 弹出成功的提示
                this.$message({
                  type: "success",
                  message: reason
                });

                // 跳转到账号管理列表
                this.$router.push("/inventorymanagement");
              } else {
                // 弹出失败的提示
                this.$message.error(reason);
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  }
};
</script>
<style lang=less>
.commoditystorage {
  .el-card {
    background: rgba(235, 235, 235, 0.29);
    .el-card__header {
      text-align: left;
      font-size: 20px;
      line-height: 40px;
      color: #fff;
    }
    .el-card__body {
      .el-form {
        .el-form-item {
          .el-form-item__content {
            .el-button--success {
              background-color: rgb(255, 136, 0);
              border: rgb(255, 136, 0);
            }
            .el-input {
              width: 280px;
              margin-right: 10px;
            }
            .notify {
              font-size: 12px;
              color: rgba(11, 133, 96, 0.86);
            }
            .el-button--primary {
              background-color: rgba(11, 133, 96, 0.86);
              border: rgba(11, 133, 96, 0.86);
            }
          }
          .el-form-item__label {
            width: 120px !important;
          }
        }
      }
    }
  }
}
</style>
