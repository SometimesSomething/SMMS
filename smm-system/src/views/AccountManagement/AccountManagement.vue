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
                    <div class="demonstration" style="padding-top: 30px;height: 50px;">
                        <el-pagination
                                style="height: 30px"
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="currentPage"
                                :page-sizes="[1, 3, 5, 10]"
                                :page-size="pageSize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="total">
                        </el-pagination>
                    </div>

                    <div class="bottomButtom">
                        <el-button @click="batchDelete()">批量删除</el-button>
                        <el-button @click="cancelSelect()">取消选择</el-button>
                    </div>


                    <!--修改的弹出框-->
                    <el-dialog title="用户名修改" width="800px" :visible.sync="flag">
                        <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
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

                        <!--分页-->

                        <div slot="footer" class="dialog-footer">


                            <el-button type="primary" @click="saveNewmsg('editForm')">确 定</el-button>
                            <el-button @click="flag=false">取 消</el-button>


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
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 3, max: 5, message: '用户名长度在 3 到 5 位', trigger: 'blur' }
                    ],
                    usergroup:[
                        {required: true, message:"请选择用户组", trigger: 'change' }
                    ]
                },
                editId:"",
                selectedAccount:[],
                accoutManagement:1,
                currentPage:1,
                total:0,
                pageSize:3,
            }
        },
        created(){
            // this.getAccount();
            this.getAccountbyPage();
        },
        methods: {
            // getAccount(){
            //     this.axios.get("http://127.0.0.1:5555/Account/AccountList")
            //         .then(response =>{
            //             this.AccoutManagement = response.data
            //         })
            //         .catch(err=>{
            //             console.log(err)
            //         })
            // },
            getAccountbyPage(){
                let pageSize = this.pageSize;
                let currentPage =this.currentPage;
                this.axios.get("http://127.0.0.1:5555/account/accountListpage",
                    {
                        params:{
                            pageSize,
                            currentPage
                        }
                    })
                    .then(response=>{
                        let {total,data} =response.data;
                        this.total =total;
                        this.AccoutManagement =data;
                        if(!data.length && this.currentPage !==1){
                            this.currentPage -= 1;
                            this.getAccountbyPage();
                        }
                    })
                    .catch(err =>{
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
                                this.getAccountbyPage();
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
            saveNewmsg(formName){
                this.$refs[formName].validate((valid) => {
                        if (valid) {
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
                                        this.getAccountbyPage();
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
                        }
                });
            },
            cancelSelect() {
                this.$refs.multipleTable.clearSelection();
            },
            handleSelectionChange(val) {
                //被选中的
                this.selectedAccount = val;
            },
            batchDelete(){
                let selectedId = this.selectedAccount.map(v =>v.id );
                if(!selectedId.length){
                    this.$message.error("请选择要删除数据，再操作");
                    return;
                }this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.axios.get(`http://127.0.0.1:5555/account/batchDelete`
                        ,{params:{
                                selectedId}
                        })
                        .then(response =>{
                            let {error_code,reason} = response.data;
                            if(error_code ===0){
                                this.$message({
                                    type:"success",
                                    message:reason
                                });
                                this.getAccountbyPage();
                            }else{
                                this.$message.error(reason)
                            }
                        })
                        .catch(response =>{
                            console.log(err)
                        })

                }).catch(() => {
                    this.$message({
                        type: 'warning',
                        message: '已取消删除'
                    });
                });



            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.getAccountbyPage();
            },
            handleCurrentChange(val) {
                this.currentPage =val;
                this.getAccountbyPage();
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
    .el-popup-parent--hidden{
        .el-message-box__wrapper{
            .el-message-box{
                background: rgba(255, 255, 255, 0.78);
                width: 600px;
                .el-message-box__header{
                    .el-message-box__title{
                        line-height: 30px;
                        font-size: 20px;
                    }
                }
                .el-message-box__content{
                    .el-message-box__status{
                        color: rgba(236, 0, 13, 0.81);
                    }
                    .el-message-box__message{
                        p{
                            line-height: 30px;
                            font-size: 16px;
                        }
                    }
                }
                .el-message-box__btns{
                    .el-button--small{
                        color: #fff;margin-right: 10px;
                        background: rgba(236, 0, 13, 0.81);border: rgba(133, 0, 13, 0.86);
                    }
                    .el-button--small:last-child{
                        color: #fff;
                        background: rgba(11, 133, 96, 0.86);border: rgba(11, 133, 96, 0.86);
                    }
                }
            }

        }
    }
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
                        .bottomButtom{
                            .el-button--default{
                                color: #fff;
                                background: rgba(236, 0, 13, 0.81);border: rgba(133, 0, 13, 0.86);
                            }
                            .el-button--default:last-child{
                                color: #fff;
                                background: rgba(11, 133, 96, 0.86);border: rgba(11, 133, 96, 0.86);
                            }
                        }
                        .demonstration{
                            .el-pagination{
                                .btn-prev,.btn-next{
                                    min-width:30px;
                                    padding: 0 6px;
                                    margin-left: 9px;
                                    border-radius: 2px;
                                }
                                .el-pager{
                                    height: 30px;

                                    .number{
                                        border-radius: 2px;
                                        min-width:30px;
                                        color:  rgba(11, 133, 96, 0.86);margin: 0 0 0 9px;padding: 0;
                                    }
                                    .active{
                                        border-radius: 2px;
                                        color: #fff;
                                        background-color: rgba(11, 133, 96, 0.86);
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