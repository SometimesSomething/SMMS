<template>
     <el-menu 
        background-color="rgb(215, 249, 250)" 
        unique-opened
        active-text-color="rgb(16, 163, 173)"
        :default-active="this.$route.path"
        router
        >
        <!-- 导航一 -->
        <el-submenu index="1">
            <template slot="title"><i class="el-icon-setting"></i>系统管理</template>
                <el-menu-item index="/">系统信息</el-menu-item>
        </el-submenu>
        <!-- 导航二 -->
        <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>账号管理</template>
                <el-menu-item index="/accountmanage">账号管理</el-menu-item>
                <el-menu-item index="/accountadd">添加账号</el-menu-item>
                <el-menu-item index="/passwordmodify">密码修改</el-menu-item>
        </el-submenu>
        <!-- 导航三 -->
        <el-submenu index="3">
            <template slot="title"><i class="el-icon-goods"></i>商品管理</template>
                <el-menu-item index="/goodsmanage">商品管理</el-menu-item>
                <el-menu-item index="/goodsadd">添加商品</el-menu-item>
        </el-submenu>
        <!-- 导航四 -->
        <el-submenu index="4">
            <template slot="title"><i class="el-icon-date"></i>统计管理</template>
                <el-menu-item index="/salestatistics">销售统计</el-menu-item>
        </el-submenu>
    </el-menu>
</template>
<script>
export default {
    
};
</script>
<style lang="less">
html,body,#app{
     width: 100%;
     height: 100%;
     margin: 0;
     padding:0;
     .login{
         height:100%;
         background-color:rgba(215, 249, 250,0.5);
     }
}
.el-menu {
  border: none;
  .el-submenu {
    .el-submenu__title {
      color: #fff;
    }
  }
  .el-menu-item {
    color: #fff;
  }
}
</style>


