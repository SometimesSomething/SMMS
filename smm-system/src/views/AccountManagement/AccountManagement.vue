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
                                prop="username"
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
                            <template slot-scope="scope">{{ scope.row.ctime | filterCtime }}</template>
                        </el-table-column>

                        <!--修改删除-->
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button
                                        type="Info"
                                        size="mini"
                                        @click="handleEdit(scope.row.id)">

                                    <i class="el-icon-edit"></i>编辑
                                </el-button>
                                <el-button
                                        size="mini"
                                        type="danger"
                                        @click="handleDelete(scope.row.id)">
                                    <i class="el-icon-delete"></i>删除
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!--修改的弹出框-->
                    <el-dialog title="用户名修改" width="800px" :visible.sync="flag">
                        <el-form :model="editForm" label-width="100px" :rules="editFormRules">
                            <el-form-item label="用户名" prop="username">
                                <el-input v-model="editForm.username"></el-input>
                            </el-form-item>
                            <el-form-item label="用户组" prop="usergroup">
                                <el-select v-model="editForm.usergroup" placeholder="用户组">
                                    <el-option label="超级管理员" value="超级管理员"></el-option>
                                    <el-option label="普通管理员" value="普通管理员"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="">取 消</el-button>
                            <el-button type="primary" @click="saveNewmsg">确 定</el-button>
                        </div>
                    </el-dialog>
                </div>
            </el-card>
        </el-main>
    </div>


</template>
<script>
import moment from "moment";
import qs from "qs";
    export default {
        data() {
            return {
                AccoutManagement: [],
                multipleSelection: [],
                flag:false,
                editForm:{
                    username:"",
                    usergroup:""
                },
                editFormRules: {
                    username:[
                        { message: '请输入用户名', trigger: 'blur' },
                        { min: 3, max: 5, message: '用户名长度在 3 到 5 位', trigger: 'blur' }
                    ],
                    usergroup:[
                        { message:"请选择用户组", trigger: 'change' }
                    ]
                },
                editId:""
            }
        },
        created(){
            this.getAccount();
        },
        methods: {
            getAccount(){
                this.axios.get("http://127.0.0.1:5555/Account/AccountList")
                    .then(response =>{
                        this.AccoutManagement = response.data
                    })
                    .catch(err=>{
                        console.log(err)
                    })
            },
            handleEdit(id) {
                this.editId =id;

                this.axios.get(`http://127.0.0.1:5555/Account/AccountChange?id=${id}`)
                    .then(response=>{
                        let result =response.data[0];
                        //回填表单
                        this.editForm.username = result.username;
                        this.editForm.usergroup = result.usergroup;
                        this.flag = true;
                })
                    .catch(err =>{
                        console.log(err)
                    })

            },
            handleDelete(id) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.axios.get(`http://127.0.0.1:5555/Account/AccountDel?id=${id}`)
                        .then(response =>{
                            let {error_code,reason}= response.data;
                            if(error_code ===0){
                                this.$message({
                                    type:"success",
                                    message:"删除数据成功"
                                });
                                this.getAccount();
                            }else{
                                this.$message.error("删除数据失败")
                            }
                        })
                        .catch(err=>{
                            console.log(err)
                        })
                }).catch(() => {
                    this.$message({
                        type: 'warning',
                        message: '已取消删除'
                    });
                });

            },
            saveNewmsg(){
                let params ={
                    username:this.editForm.username,
                    usergroup:this.editForm.usergroup,
                    editId:this.editId
                };
                this.axios.post("http://127.0.0.1:5555/Account/SaveeditAccount",qs.stringify(params))
                    .then(response =>{
                        console.log(response.data);
                        let {error_code,reason}= response.data;
                        if(error_code ===0){
                            this.$message({
                                type:"success",
                                message:"修改用户名成功"
                            });
                            this.getAccount();
                        }else{
                            this.$message.error("修改用户名失败")
                        }
                        this.flag = false;
                    })
                    .catch(err =>{
                        console.log(err);
                        this.$message({
                            type: 'warning',
                            message: '已取消删除'
                        });
                    });
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
        },
        filters:{
            filterCtime(ctime){
                return moment(ctime).format("YYYY/MM/DD HH:mm:ss")
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
                    .item{
                        .el-dialog__wrapper{
                            .el-dialog{
                                background: rgba(255, 255, 255, 0.78);
                                .el-dialog__header{
                                    margin-left: 45px;
                                }
                                .el-dialog__body{
                                    .el-form{
                                        .el-form-item{
                                            .el-form-item__content{
                                                .el-input{
                                                    width: 400px;
                                                }
                                            }
                                        }
                                    }
                                }
                                .el-dialog__footer{
                                    .el-button{
                                        margin-right: 20px;
                                    }
                                    .el-button--primary{
                                        background: rgba(11, 133, 96, 0.86);
                                        border: rgba(11, 133, 96, 0.86);
                                    }
                                }
                            }
                        }
                    }
                }
            }

        }
    }

</style>