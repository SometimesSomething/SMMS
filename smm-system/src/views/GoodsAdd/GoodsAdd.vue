<template>
  <div class="goodsadd">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="title">添加商品</span>
      </div>
      <div class="text item">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="所属分类：">
            <el-select v-model="form.region" placeholder="---选择分类---">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品名称：">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="商品售价：">
            <el-input v-model="form.price"></el-input>元
          </el-form-item>
          <el-form-item label="市场价：">
            <el-input v-model="form.name"></el-input>元
          </el-form-item>
          <el-form-item label="商品进价：">
            <el-input v-model="form.name"></el-input>元
          </el-form-item>
          <el-form-item label="入库数量：">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="商品重量：">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="商品单位：">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="会员优惠：">
            <el-radio-group v-model="form.resource">
              <el-radio label="享受"></el-radio>
              <el-radio label="不享受"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否促销：">
            <el-radio-group v-model="form.resource">
              <el-radio label="启用"></el-radio>
              <el-radio label="禁用"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="商品简介：">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">添加</el-button>
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
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
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
.goodsadd {
  .el-card {
    .el-card__header {
      text-align: left;
      height:60px;
      line-height: 60px;
      font-weight: 600;
      background-color: #f1f1f1;
      .title{
        font-size: 20px;
      }
    }
    .el-card__body {
      width: 600px;
      .el-form {
        width: 420px;
        .el-form-item {
          .el-form-item__content {
            .el-input {
              width: 300px;
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
</style>
