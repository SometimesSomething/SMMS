<template>
  <div class="userAdd">
    <el-main>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>添加账号</span>
      </div>
      <div class="text item">
        <el-form
                :model="addusersForm"
                status-icon
                :rules="addusersRules"
                ref="addusersForm"
                label-width="100px"
                class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model.number="addusersForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="addusersForm.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="addusersForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="选择用户组" prop="usergroup">
            <el-select v-model="addusersForm.usergroup" placeholder="请选择用户组">
              <el-option label="超级管理员" value="超级管理员"></el-option>
              <el-option label="普通管理员" value="普通管理员"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('addusersForm')">提交</el-button>
            <el-button @click="resetForm('addusersForm')">重置</el-button>
          </el-form-item>

        </el-form>
      </div>
    </el-card>
  </el-main>
  </div>
</template>
<script>
    import qs from "qs";
    export default {
        data() {
            const password=(rule,value,callback)=>{
                if(value === ''){
                    callback(new Error("请输入密码"))
                }else if(value.length <3 || value.length>6){
                    callback(new Error("密码长度3-6位"))
                }else{
                    if(this.addusersForm.checkPass !== ''){
                        this.$refs.addusersForm.validateField('checkPass')
                    }
                    callback();
                }
            };

            const checkPwd=(rule,value,callback)=>{
                if(value === ''){
                    callback(new Error("请再次输入密码"))
                }else if(value !== this.addusersForm.pass){
                    callback(new Error("两次密码不一致"))
                }
                callback();
            };
            return {
                addusersForm: {
                    username:'',
                    pass: '',
                    checkPass: '',
                    usergroup:""
                },
                addusersRules: {
                    username:[
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 3, max: 5, message: '用户名长度在 3 到 5 位', trigger: 'blur' }
                    ],
                    pass:[
                        { required: true, validator:password, trigger: 'blur' }
                    ],
                    checkPass:[
                        { required: true, validator:checkPwd, trigger: 'blur' }
                    ],
                    usergroup:[
                        { required: true, message:"请选择用户组", trigger: 'change' }
                    ]
                }

            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // alert('submit!');
                        let params={
                            username:this.addusersForm.username,
                            password:this.addusersForm.pass,
                            usergroup:this.addusersForm.usergroup,
                        };
                        // console.log("后台接收数据:",qs.stringify(params));
                        //使用axios发送数据给后端
                        this.axios.post("http://127.0.0.1:5555/Account/AccountAdd",qs.stringify(params))
                          .then(response =>{
                              console.log(response.data);

                              let {error_code,reason}= response.data;
                              if(response.data.error_code ===0){
                                  this.$message({
                                      message:reason,
                                      type: 'success'
                                  });
                                  this.$router.push("/AccountManagement")
                              }else {
                                  this.$message.error(reason);
                              }
                        }).catch(err =>{
                                console.log(err)
                            })

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }

    }
</script>
<style lang="less">
  .userAdd{
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
        .el-form{
          width: 300px;

          .el-button--primary{
            background: rgba(11, 133, 96, 0.86);border: rgba(11, 133, 96, 0.86);
          }
        }
      }
    }

  }
}

</style>