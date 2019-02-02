<template>
  <div class="login">
      <div class="login-form">
          <h3 class="el-icon-upload title">  华联超市管理系统-登陆</h3>
        <el-form
            :model="loginForm"
            status-icon
            :rules="rules"
            ref="loginForm"
            label-width="100px"
            class="demo-ruleForm"
            >
            <el-form-item label="用户名" prop="username">
                <el-input v-model.number="loginForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input type="text" v-model="loginForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input type="text" v-model="loginForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
                <el-button @click="resetForm('loginForm')">重置</el-button>
            </el-form-item>
            </el-form>
      </div>
   
  </div>
</template>

<script>
export default {
     data() {
         const password=(rule,value,callback)=>{
              if(value === ''){
                 callback(new Error("请输入密码"))
                }else if(value.length <3 || value.length>6){
                 callback(new Error("密码长度3-6位"))
                }else{
                    if(this.loginForm.checkPass !== ''){
                        this.$refs.loginForm.validateField('checkPass')
                    }
                    callback();
                }
         }

         const checkPwd=(rule,value,callback)=>{
             if(value === ''){
                 callback(new Error("请再次输入密码"))
             }else if(value !== this.loginForm.pass){
                    callback(new Error("两次密码不一致"))
             }
             callback();
         }
      return {
        loginForm: {
          username:'',
          pass: '',
          checkPass: ''
        },
      rules: {
          username:[
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 5, message: '用户名长度在 3 到 5 位', trigger: 'blur' }
          ],
           pass:[
           { required: true, validator:password, trigger: 'blur' }
          ],
           checkPass:[
            { required: true, validator:checkPwd, trigger: 'blur' }
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
                username:this.loginForm.username,
                password:this.loginForm.pass,
            }
            console.log(params)
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
};
</script>
<style lang=less>
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
 .login-form{
     width: 500px;
     height: 300px;
     background-color: rgb(215, 249, 250);
     position: fixed;
     top:0;
     left: 0;
     right: 0;
     bottom: 0;
     margin: auto;
     border-radius: 10px;
     padding:20px 50px 0 20px;
     .title{
        padding-left: 20px;
     }
 }
</style>