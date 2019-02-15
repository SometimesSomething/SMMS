<template>
    <el-aside width="200px">
        <p class="title">华联超市管理系统</p>
        <el-menu
                 background-color="rgba(255, 0, 22, 0.09)"
                 unique-opened
                 :default-active="this.$route.path"
                 router
        >
            <!--导航1-->
            <el-submenu index="1">
                <template slot="title"><i class="el-icon-setting"></i>系统管理</template>
                <el-menu-item index="/">系统信息</el-menu-item>
            </el-submenu>
            <!--导航2-->
            <el-submenu index="2">
                <template slot="title"><i class="el-icon-mobile-phone"></i>账号管理</template>
                <el-menu-item index="/AccountManagement">账号管理</el-menu-item>
                <el-menu-item index="/AccountAdd">添加账号</el-menu-item>
                <el-menu-item index="/PasswordModify">密码修改</el-menu-item>
            </el-submenu>
            <!--导航3-->
            <el-submenu index="3">
                <template slot="title"><i class="el-icon-goods"></i>商品管理</template>
                <el-menu-item index="GoodsManagement">商品管理</el-menu-item>
                <el-menu-item index="GoodsAdd">添加商品</el-menu-item>
            </el-submenu>
            <!--导航4-->
            <el-submenu index="4">
                <template slot="title"><i class="el-icon-edit-outline"></i>统计管理</template>
                <el-menu-item index="SaleStatistics">销售统计</el-menu-item>
            </el-submenu>
        </el-menu>
    </el-aside>
</template>

<script>
    export default {
        name: "Nav"
    }
</script>

<style lang="less">
    .el-aside {
        background-color: rgba(255, 0, 22, 0.09);
        color: #fff;
        text-align: center;
        line-height: 200px;
        height: 100vh;
        .title{
            margin: 0;padding: 16px 0;
            line-height: 30px;
        }
        .el-submenu__title{
            color: #fff;
            background: none!important;
        }

        .el-submenu{
            background: none!important;
        }
        .el-menu-item.is-active{
            color: #fff;
            background-color: rgba(226, 226, 226, 0.49)
        }
        .el-menu-item{
            color: #919191;
            background: none!important;
        }

        .el-menu .el-menu--inline{
            background: none!important;
        }
        .el-menu {
            background: none!important;
            border-right: 0;

        }
    }
</style>