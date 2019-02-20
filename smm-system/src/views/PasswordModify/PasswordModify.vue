<template>
    <div class="passwordmodify">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="title">修改账号密码</span>
            </div>
            <div class="text item">
                <el-form ref="passwordmodify"
                         :model="passwordmodify"
                         label-width="80px"
                         status-icon
                         :rules="passwordmodifyRules"
                >
                    <el-form-item label="原密码：" prop="oldpwd">
                        <el-input v-model="passwordmodify.oldpwd"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码：" prop="newpwd">
                        <el-input v-model="passwordmodify.newpwd"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码：" prop="checknewpwd">
                        <el-input v-model="passwordmodify.checknewpwd"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('passwordmodify')">提交</el-button>
                        <el-button @click="resetForm('passwordmodify')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>
<script>

    import qs from "qs";
    import router from "../../router";

    export default {
        data() {
            const password = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error("请输入新密码"))
                } else if (value.length < 3 || value.length > 6) {
                    callback(new Error("密码长度3-6位"))
                } else if (value === this.passwordmodify.oldpwd) {
                    callback(new Error("与原密码相同"))
                }
                else {
                    if (this.passwordmodify.checknewpwd !== '') {
                        this.$refs.passwordmodify.validateField('checknewpwd')
                    }
                    callback();
                }
            };

            const checkPwd = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error("请再次输入新密码"))
                } else if (value !== this.passwordmodify.newpwd) {
                    callback(new Error("两次密码不一致"))
                }
                callback();
            };

            const checkoldpwd = (rule, value, callback) => {
                let username = window.localStorage.getItem("username");
                this.axios.get(`http://127.0.0.1:5555/account/checkoldpwd?oldPwd=${value}&username=${username}`)
                    .then(response => {
                        let {error_code, reason} = response.data;
                        if (error_code === 0) {
                            callback();
                        } else {
                            callback(new Error(reason));
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            };
            return {
                passwordmodify: {
                    oldpwd: "",
                    newpwd: "",
                    checknewpwd: ""
                },
                passwordmodifyRules: {
                    oldpwd: [
                        {required: true, validator: checkoldpwd, trigger: 'blur'}
                    ],
                    newpwd: [
                        {required: true, validator: password, trigger: 'blur'}
                    ],
                    checknewpwd: [
                        {required: true, validator: checkPwd, trigger: 'blur'}
                    ],
                }
            };

        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // alert('submit!');
                        let params = {
                            username: window.localStorage.getItem("username"),
                            oldpwd: this.passwordmodify.oldpwd,
                            newpwd: this.passwordmodify.newpwd,
                        };
                        this.axios.post("http://127.0.0.1:5555/account/savenewpwd", qs.stringify(params))
                            .then(response => {
                                let {error_code, reason} = response.data;
                                if (error_code === 0) {
                                    this.$message({
                                        type: "success",
                                        message: reason
                                    });
                                    window.localStorage.removeItem("token");
                                    this.$router.push("/login");
                                } else {
                                    callback(new Error(reason));
                                }

                            }).catch(err => {
                            console.log(err)
                        })

                    }
                })
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>
<style lang=less>
    .el-main {
        .passwordmodify {
            .el-card {
                background: rgba(235, 235, 235, 0.29);
                .el-card__header {
                    text-align: left;
                    font-size: 20px;
                    line-height: 40px;
                    color: #fff;
                }
                .el-card__body {
                    width: 600px;
                    .el-form {
                        width: 420px;
                        .el-form-item {
                            .el-form-item__content {
                                margin-left: 0;
                                .el-input {
                                    width: 300px;
                                }
                                .el-button:first-child {
                                    background-color: rgba(11, 133, 96, 0.86);
                                }
                                .el-button--primary {
                                    border: rgba(11, 133, 96, 0.86);
                                }
                            }
                            .el-form-item__label {
                                width: 100px !important;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
