<template>
    <div class="top">
        <el-header>
        <el-row>
            <el-col :span="12">
                <div  class="title">
                    <i class="el-icon-menu"></i>
                    华联超市管理系统
                </div>
            </el-col>
            <el-col :span="12">
                <div class="top-right">
                    <el-row>
                        <el-col :span="18">
                            欢迎您! 
                            <el-dropdown @command="handleCommand">
                            <span class="username el-dropdown-link">
                                {{ username }}<i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="personal">个人中心</el-dropdown-item>
                                <el-dropdown-item command="logout">退出</el-dropdown-item>
                            </el-dropdown-menu>
                            </el-dropdown>
                        </el-col>
                        <el-col :span="6">
                            <div class="avatar">
                                <img width="100%" height="100%" :src="avatarUrl" alt="">
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>
        </el-header>
    </div>

</template>
<script>
export default {
    data () {
        return {
            username: "",
            avatarUrl: 'http://127.0.0.1:8080/avatar.jpg'
        }
    },
    methods:{
        handleCommand(command) {
            //如果点退出
            if(command ==="logout"){
                window.localStorage.removeItem("token");
                this.$message({
                    type:"success",
                    message:"退出成功"
                });
                setTimeout(()=>{
                    this.$router.push("/login")
                },1000)

            }
        }
    },
    created(){
        this.username = window.localStorage.getItem("username")
    }
}
</script>
<style lang="less">

        .top {
            .el-header {
                line-height: 60px;
            border-bottom: 2px solid rgba(226, 226, 226, 0.49);
            .title {
                color: #fff;
                text-align: left;
                font-size: 20px;
                font-weight: 900;
            }
            .top-right {
                color: #fff;
                text-align: right;
                .username {

                    font-size: 16px;
                    color: #ff9500;
                }
                .avatar {
                    width: 52px;
                    height: 52px;
                    margin-top: 4px;
                    margin-left: 30px;
                    border-radius: 50%;
                    img {
                        border-radius: 50%;
                    }
                }
            }
        }
    }

</style>


