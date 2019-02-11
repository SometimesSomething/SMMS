<template>

    <div class="index">
        <el-container>
            <Nav></Nav>
            <el-container>
                <el-header><Top></Top></el-header>
                <el-main>Main</el-main>
                <el-footer><Bottom></Bottom></el-footer>
            </el-container>
        </el-container>
    </div>

</template>

<script>
//注册自定义导航组件
import Nav from "@/components/Nav/Nav.vue";

import Bottom from "@/components/Bottom/Bottom.vue";

import Top from "@/components/Top/Top.vue";
export default {
    components:{
    Nav,
    Bottom,
    Top
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