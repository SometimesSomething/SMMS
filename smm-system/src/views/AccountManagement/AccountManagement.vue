<template>
    <div class="AccoutManagement">
        <el-main>
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>账号管理</span>
                </div>
                <div class="text item">

                </div>
            </el-card>
        </el-main>
    </div>


</template>
<script>

    export default {

    }
</script>
<style lang="less">
    .AccoutManagement{
        .el-main {
            flex: 1;
            line-height: 60px;
            height: 100%;
            padding: 0;
            .el-card {
                background: rgba(235, 235, 235, 0.29);
                .el-card__header {
                    text-align: left;
                    font-size: 20px;
                    line-height: 40px;
                    color: #fff;
                }
                .el-card__body {
                }
            }

        }
    }

</style>