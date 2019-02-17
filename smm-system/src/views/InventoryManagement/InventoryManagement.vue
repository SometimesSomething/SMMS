<template>
  <div class="inventorymanagement">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="title">库存管理</span>
      </div>
      <div class="text item">
        <el-form ref="form" :model="form" label-width="80px">
          <el-row>
            <el-col :span="4">
              <div class="grid-content bg-purple">
                <el-form-item label>
                  <el-select v-model="form.classify" placeholder="---选择分类---">
                    <el-option label="饮料冲调" value="饮料冲调"></el-option>
                    <el-option label="休闲食品" value="休闲食品"></el-option>
                    <el-option label="家居日用" value="家居日用"></el-option>
                    <el-option label="粮油调味" value="粮油调味"></el-option>
                    <el-option label="美容护理" value="美容护理"></el-option>
                    <el-option label="电子数码" value="电子数码"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple-light">
                <el-form-item label="关键字：">
                  <el-input v-model="form.keyword"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple-light">
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
      this.axios
        .get("http://127.0.0.1:5555/inventory/inventorymanagement")
        .then(response => {
          this.goodsInfor = response.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style lang=less>
.el-main {
  line-height: 0;
  .inventorymanagement {
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
