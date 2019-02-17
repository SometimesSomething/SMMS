<template>
    <div class="AccoutManagement">
        <el-main>
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>账号管理</span>
                </div>
                <div class="text item">
                    <el-table
                            ref="multipleTable"
                            :data="AccoutManagement"
                            tooltip-effect="dark"
                            style="width: 100%"
                            @selection-change="handleSelectionChange">
                        <el-table-column
                                type="selection">
                        </el-table-column>

                        <!--用户名-->
                        <el-table-column
                                prop="userName"
                                label="用户名">
                        </el-table-column>

                        <!--用户组-->
                        <el-table-column
                                prop="usergroup"
                                label="用户组"
                                show-overflow-tooltip>
                        </el-table-column>

                        <!--添加时间-->
                        <el-table-column
                                label="日期">
                            <template slot-scope="scope">{{ scope.row.date }}</template>
                        </el-table-column>

                        <!--修改删除-->
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button
                                        type="Info"
                                        size="mini"
                                        @click="handleEdit(scope.$index, scope.row)">
                                    <i class="el-icon-edit"></i>编辑
                                </el-button>
                                <el-button
                                        size="mini"
                                        type="danger"
                                        @click="handleDelete(scope.$index, scope.row)">
                                    <i class="el-icon-delete"></i>删除
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>

                </div>
            </el-card>
        </el-main>
    </div>


</template>
<script>

    export default {
        data() {
            return {
                AccoutManagement: [
                    {
                    userName: '王小虎',
                    usergroup: '普通管理员',
                    date: '2016-05-03'
                    },
                    {
                        userName: '王小虎',
                        usergroup: '普通管理员',
                        date: '2016-05-03'
                    },

                ],
                multipleSelection: []
            }
        },
        methods: {
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            },

            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            }
        }
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