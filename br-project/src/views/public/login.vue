<template>
    <div class="login-content">
        <el-dialog  center  :visible.sync="dialogTableVisible" :before-close="handleClose">
           <div class="login-title">— 登录 —</div>
             <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">


              <div class="login-message">             
              <el-form-item prop="account">
                  <i class="login_phone_dot"></i>
                <el-input type="text" class="write-input" v-model="ruleForm2.account" auto-complete="off" placeholder="输入手机号">
                    
                </el-input>
              </el-form-item>
              <el-form-item prop="checkPass">
                  <i class="login_password_dot"></i>

                <el-input type="password" class="write-input" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="输入密码" @keyup.enter.native="handleSubmit2"></el-input>
              </el-form-item>
              <!-- <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox> -->
              <p class="account-control">
                  <span class="getpassword" @click="getpassword">忘记密码？</span>
                  <span class="regiter" @click="toregister">立即注册</span>
              </p>
              <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%; height:50px;color: #fff;border:none;background:#39B690;" class="login-btn" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
                <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
              </el-form-item>
               
              </div>
  </el-form>
        </el-dialog>
    </div>
</template>
<script>
  import { requestLogin } from '../../api/api';
    export default {
        data(){
            return{
                
                // dialogTableVisible:false,
                logining: false,
                ruleForm2: {
                account: '18180644120',
                checkPass: '',
                nonce:123,
                timestamp:123
                },
                rules2: {
                account: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    //{ validator: validaePass }
                ],
                checkPass: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    //{ validator: validaePass2 }
                ]
                },
                checked: true

            }
        },
        computed:{
            dialogTableVisible(){
                return this.$store.state.loginview;
            }
       },

        methods:{
                toregister(){
                    this.$store.commit('showlogin',false);
                    this.$store.commit('showregister',true);

                },
                getpassword(){
                    this.$store.commit('showlogin',false);
                    this.$store.commit('showretrieve',true);
                 
                },
                handleClose(done){
                    done();
                    this.$store.commit('showlogin',false);
                },
                handleReset2() {
                    this.$refs.ruleForm2.resetFields();
                },
                //登录
                handleSubmit2(ev) {
                    // var _this = this;
                    let that=this;
                    this.$refs.ruleForm2.validate((valid) => {
                    if (valid) {

                        this.logining = true;

                        let loginParams = {
                        username: this.ruleForm2.account,
                        password: this.ruleForm2.checkPass,                        
                        };
                        requestLogin(loginParams).then(data => {

                        this.logining = false;
                        //NProgress.done();
                        // let { msg, code, user } = data;
                        console.log(data)
                        let code=data.data.code;
                        let msg=data.data.message;
                        let user_data=data.data.data;

                        if (code !== 200) {
                            this.$message({
                            message: msg,
                            type: 'error'
                            });
                        } else {
                        this.$store.commit('showlogin',false);

                        //   this.$emit('closelogin');
                         this.$message({
                            message: '登录成功',
                            type: 'success'
                            });
                            location.reload();
                        localStorage.setItem('user', JSON.stringify(user_data)); 
                       this.$store.commit('changestatus',true);
                        this.$store.commit('login',user_data.access_token);
                        this.$store.commit('getuser',user_data.client.mobile);
                        }
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                    });
                }
        }
    }
</script>
<style lang="scss">
 .login-content{

    .el-dialog{
        width: 495px;
        .el-dialog__body{
            padding: 25px 56px 50px 56px;
            .login_phone_dot{
                width: 20px;
                height: 20px;
                display: block;
                position: absolute;
                left: 0;
                background: url('../../assets/phone.svg') no-repeat;
                background-size:cover; 
                top:12px;
            }
            .login_password_dot{
                width: 20px;
                height: 20px;
                display: block;
                position: absolute;
                left: 0;
                background: url('../../assets/password.svg') no-repeat;
                background-size:cover; 
                top:12px;
            }
            .write-input{
                padding-left: 30px;
                display: block;
                width: auto;
                border-bottom:1px solid #E9E9E9;
                .el-input__inner{
                border: none;
                
                border-radius: 0; 
                }
            }
            
        }
    }
    .login-title{
        text-align: center;
        font-size:20px;
        color:rgba(88,87,87,1);
        line-height:20px;
        margin-bottom: 30px;
    }
    .account-control{
        display: block;
        padding: 10px 0;
        display: flex;
        justify-content: space-between;
        span{
            color: #323232;
            cursor: pointer;
        }
        .regiter{
            color:#F19D58;
        }
    }
 }
</style>

