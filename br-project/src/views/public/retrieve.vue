<template>
    <div class="retrieve-content">
        <el-dialog  center  :visible.sync="dialogTableVisible" :before-close="handleClose">
           <div class="login-title">— 手机号码找回 —</div>
             <el-form :model="ruleForm" :rules="rules" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">


              <div class="login-message">             
              <el-form-item prop="account">
                  <i class="login_phone_dot"></i>
                <el-input type="text" class="write-input" v-model="ruleForm.account" auto-complete="off" placeholder="手机号">
                    
                </el-input>
              </el-form-item>
              <el-form-item prop="account">
                  <i class="login_check_dot"></i>
                  <span class="getcode">发送验证码</span>
                <el-input type="text" class="write-input" v-model="ruleForm.account" auto-complete="off" placeholder="手机验证码">
                    
                </el-input>
              </el-form-item>
              <el-form-item prop="checkPass">
                  <i class="login_password_dot"></i>

                <el-input type="password" class="write-input" v-model="ruleForm.checkPass" auto-complete="off" placeholder="设置密码" @keyup.enter.native="handleSubmit2"></el-input>
              </el-form-item>
              <el-form-item prop="checkPass">
                  <i class="login_password_dot"></i>

                <el-input type="password" class="write-input" v-model="ruleForm.checkPassagin" auto-complete="off" placeholder="确认密码" @keyup.enter.native="handleSubmit2"></el-input>
              </el-form-item>
              <!-- <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox> -->
              <p class="account-control">
                  <span>已有账号？</span>
                  <span class="goto" @click="tologin">立即登录</span>
              </p>
              <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%; height:50px;color: #fff;border:none;background:#39B690;" class="login-btn" @click.native.prevent="handleSubmit2" :loading="logining">重置密码</el-button>
                <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
              </el-form-item>
               
              </div>
  </el-form>
        </el-dialog>
    </div>
</template>
<script>
  import { getCode , retrieve} from '../../api/api';

    export default {
        data(){
            return{
               
                logining: false,
                 ruleForm:{
				   checkPass:'',
				   checkcode:'',
				   checphone:'',
				   checkPassagin:''
			   },
			   basetime:60,
               viewget:'获取验证码',
			   control:false,               
                rules: {
                checphone: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    //{ validator: validaePass }
                ],
                checkcode: [
                    { required: true, message: '请输入验证码', trigger: 'blur' },
                    //{ validator: validaePass2 }
                ],
                checkPass: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    //{ validator: validaePass2 }
                ],
                checkPassagin: [
                    { required: true, message: '请再次输入密码', trigger: 'blur' },
                    //{ validator: validaePass2 }
                ],

                },
                checked: true

            }
        },
        computed:{
            dialogTableVisible(){
                return this.$store.state.retrieveview;
            }
       },

        methods:{
            tologin(){
                this.$store.commit('showretrieve',false);
                this.$store.commit('showlogin',true);
                                        
            },
            handleClose(done){
                    done();
                    this.$store.commit('showretrieve',false);
                    
                },

            handlegetcode(){
		    let pea=this.ruleForm.checphone;
                if(pea==''){
                    this.$message({
					message: '请输入手机号',
					type: 'error'
					});
                    return
                }
				let vm=this;
				this.control=true;
			    let times=setInterval(function(){
				
				vm.basetime-=1;
				vm.viewget=vm.basetime+'s后重新获取';
				},1000)

				 setTimeout(() => {
					 this.control=false;
					 this.basetime=60;
					 this.viewget="获取验证码"
					  clearInterval(times);
				 }, 60000);

                // let pea=this.ruleForm.checphone;
				getCode(pea).then(data => {
	
				let code=data.data.code;
				let msg=data.data.message;
				if (code !== 200) {
					this.$message({
					message: msg,
					type: 'error'
					});
				} else {
	              this.$message({
					message: '获取验证码成功',
					type: 'success'
					});
					
				}
				});	
			},
            //找回密码
            handleSubmit2(ev) {
                    // var _this = this;
                    this.$refs.ruleForm.validate((valid) => {
                    if (valid) {

                        this.logining = true;

                        let Params = {
                        mobile: this.ruleForm.checphone,
                        verfication_code: this.ruleForm.checkcode,
                        password:this.ruleForm.checkPass,
                        
                        };
                        retrieve(Params).then(data => {

                        this.logining = false;
                        //NProgress.done();
                        // let { msg, code, user } = data;
                        let code=data.data.code;
                        let msg=data.data.message;
                        let user_data=data.data.data;

                        if (code !== 200) {
                            this.$message({
                            message: msg,
                            type: 'error'
                            });
                        } else {
                          this.$message({
                            message: '重置密码成功，快去登录吧～',
                            type: 'success'
                            });
                            this.$store.commit('showretrieve',false);
                            this.$store.commit('showlogin',true); 

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
 .retrieve-content{

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
            .login_check_dot{
                width: 20px;
                height: 20px;
                display: block;
                position: absolute;
                left: 0;
                background: url('../../assets/check.svg') no-repeat;
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
     .getcode{

        background:rgba(238,156,33,1);
        color: #fff;
        text-align: center;
        position: absolute;
        right: 0;
        top:-23px;
        z-index: 1;
    }
    .getcode.is-disabled{
        background: #fff;
        color: #999;
    }

    .getcode:hover{
        border-color:#dcdfe6; 
    }
    .account-control{
        display: block;
        padding: 10px 0;
        display: flex;
        justify-content: flex-start;
        span{
            color: #323232;
            cursor: pointer;
        }
        .goto{
            color:#F19D58;
            cursor: pointer;
        }
    }
 }
</style>

