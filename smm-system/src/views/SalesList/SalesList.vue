<template>
  <div class="salelist">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="title">销售明细</span>
      </div>
      <div class="text item">
        <el-form ref="form" :model="form" label-width="80px">
          <el-row>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label="开始时间：">
                  <el-input v-model="form.keyword"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label="结束时间：">
                  <el-input v-model="form.keyword"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-light">(格式：2019-01-01)</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label="关键字：">
                  <el-input v-model="form.keyword"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-light">商品名称,订单号,客户名字,会员卡号
                <el-button type="success" round>查询</el-button>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <el-table :data=" goodsInfor" stripe style="width: 100%">
        <el-table-column prop="code" label="商品条形码" width="180"></el-table-column>
        <el-table-column prop="goodsname" label="商品名称" width="180"></el-table-column>
        <el-table-column prop="purchase" label="进价(元)" width="180"></el-table-column>
        <el-table-column prop="storage" label="入库" width="180"></el-table-column>
        <el-table-column prop="quantity" label="库存" width="180"></el-table-column>
        <el-table-column prop="sold" label="已售"></el-table-column>
        <el-table-column prop="manage" label="管理">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleEdit(scope.row.id)">
              <i class="el-icon-edit"></i>
            </el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">
              <i class="el-icon-delete"></i>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
  </div>
</template>

<script>
// 引入moment模块
import moment from "moment";
// 引入qs模块
import qs from "qs";

export default {
  data() {
    return {
      goodsInfor: [],
      form: {
        code: "",
        goodsname: "",
        purchase: "",
        storage: "",
        quantity: "",
        sold: ""
      }
    };
  },
  created() {
    this.getStorageList();
  },
  methods: {
    getStorageList() {
      this.request
        .get("/inventory/inventorymanagement")
        .then(response => {
          this.goodsInfor = response.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleEdit(id) {
      this.editid = id;
      let params={
        id
      }
      this.request
        .get(`/inventory/inventoryedit`,params)
        .then(response => {
          let { error_code, reason } = response;

          // 根据后端响应的数据判断
          if (error_code === 0) {
            // 弹出成功的提示
            this.$message({
              type: "success",
              message: reason
            });
          } else {
            this.$message.error(reason);
          }
        });
    },
    //删除
    handleDelete(id) {
      this.$confirm("你确定要删除吗？", "删除提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
           let params={
        id
      }
          this.request
            .get(`/inventory/inventorydelete`,params)
            .then(response => {
              let { error_code, reason } = response;
              // 根据后端响应的数据判断
              if (error_code === 0) {
                this.getGoodsList();
                // 弹出成功的提示
                this.$message({
                  type: "success",
                  message: reason
                });
              } else {
                this.$message.error(reason);
              }
            });
        })
        .catch(err => {
          // 弹出成功的提示
          this.$message({
            type: "info",
            message: "删除取消"
          });
        });
    }
  }
};
</script>
<style lang=less>
.el-main {
  line-height: 0;
  .salelist {
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
          .el-row {
            .grid-content {
              height: 60px;
              line-height: 40px;
              font-size: 14px;
              margin-right: 10px;
              .el-button--success {
                margin-left: 20px;
                background: rgba(11, 133, 96, 0.86);
                border: rgba(11, 133, 96, 0.86);
              }
              .el-form-item {
                .el-form-item__content {
                  margin-left: 0;
                  height: 40px;
                  line-height: 40px;
                  .el-input{
                      width:90%;
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
    .el-pagination {
      margin-top: 20px;
      .el-pager {
        li.active {
          background-color: rgba(11, 133, 96, 0.86);
        }
      }
    }
  }
}
</style>
