<template>
  <div class="goodsmanagement">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="title">商品管理</span>
      </div>
      <div class="text item">
        <el-form ref="form" :model="form" label-width="80px">
          <el-row>
            <el-col :span="4">
              <div class="grid-content bg-purple">
                <el-form-item label>
                  <el-select v-model="form.region" placeholder="---选择分类---">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple-light">
                <el-form-item label="关键字：">
                  <el-input v-model="form.name"></el-input>
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
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="date" label="商品条形码" width="180"></el-table-column>
        <el-table-column prop="name" label="商品名称" width="180"></el-table-column>
        <el-table-column prop="address" label="所属分类"></el-table-column>
        <el-table-column prop="date" label="售价(元)" width="180"></el-table-column>
        <el-table-column prop="name" label="促销价(元)" width="180"></el-table-column>
        <el-table-column prop="address" label="市场价(元)"></el-table-column>
        <el-table-column prop="date" label="库存" width="180"></el-table-column>
        <el-table-column prop="name" label="库存总额(元)" width="180"></el-table-column>
        <el-table-column prop="address" label="销售总额(元)"></el-table-column>
        <el-table-column prop="address" label="管理"></el-table-column>
      </el-table>
    </el-card>
    <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>
<style lang=less>
.el-main {
  .goodsmanagement {
    .el-card {
      .el-card__header {
          text-align: left;
        height: 60px;
        line-height: 60px;
        font-weight: 600;
        background-color: #f1f1f1;
        .title {
          font-size: 20px;
        }
        .el-card__body {
          .el-form {
            .el-row {
              .grid-content {
                height: 40px;
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
    }
    .el-pagination {
      .el-pager {
        li.active {
          background-color: rgba(11, 133, 96, 0.86);
        }
      }
    }
  }
}
</style>
