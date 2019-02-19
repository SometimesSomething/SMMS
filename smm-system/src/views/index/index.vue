<template>

    <div class="index">
        <el-container>
            <!--导航组件-->
            <Nav></Nav>

            <el-container>
                <!--头部组件-->
                <el-header><Top></Top></el-header>

                <el-main><router-view></router-view></el-main>

                <!--尾部组件-->
                <el-footer><Bottom></Bottom></el-footer>
            </el-container>
        </el-container>
    </div>

</template>

<script>
//注册自定义导航组件
import Nav from "@/components/Nav/Nav.vue";
import Top from "@/components/Top/Top.vue";
import Bottom from "@/components/Bottom/Bottom.vue";


export default {
    components:{
        Nav,
        Top,
        Bottom
    }
};

</script>
<style lang="less">
    body,html,#app{
        margin: 0;
        padding: 0;
        height: 100%;
        width: 100%;
    }
    .index{
        height: 100%;
        width: 100%;
        .el-container{
            height: 100%;
            width: 100%;
        }
        background: url("../../assets/1.4.jpg") ;

    }



</style>