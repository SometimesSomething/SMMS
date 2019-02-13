<template>

    <div class="index">
        <el-container>
            <Nav></Nav>
            <el-container>
                <router-view></router-view>

            </el-container>
        </el-container>
    </div>

</template>

<script>
//注册自定义导航组件
import Nav from "@/components/Nav/Nav.vue";

export default {
    components:{
    Nav
    }
};

</script>
<style lang="less">
    .index{
        height: 100vh;
        background: url("../../assets/1.4.jpg") ;
        .el-container{
            height: 100%;
        }



        .el-main {

            color: #333;
            text-align: center;
            line-height: 160px;
        }
        .el-header, .el-footer {

             color: #333;
             text-align: center;
             line-height: 60px;
         }

    }


</style>