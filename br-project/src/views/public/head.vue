<template>
    <div class="head-main">
        <div class="head-top">
            <div class="head-content">
                <img src="../../assets/logo.png" alt="">
                <!-- <el-menu :default-active="$route.path" mode="horizontal" class="el-menu-vertical-demo"  router >
					<template v-for="item in $router.options.routes" v-if="!item.hidden">
						<el-menu-item :index="item.children[0].path">{{item.children[0].name}}</el-menu-item>
					</template>
				</el-menu> -->
                <div class="top-nav">
                    <ul class="nav-ul">
                       <li class="nav_item" v-for="(item,index) in $router.options.routes" v-if="!item.hidden" :key="index">                          
                           <router-link :to='item.children[0].path' v-if="!item.children[0].disable">
                               {{item.children[0].name}}
                            </router-link> 
                            <a href="javascript:vid(0);" v-else class="disable">{{item.children[0].name}}</a>
                       </li>
                    </ul>
                </div>
                <div class="top-right">
                    <span class="top_right_word fz16 c666">
                       <i class="moble_code"></i> 手机版
                    </span>
                    <span v-if="!loginstatus" class="top_right_word fz16 c666">
                        <i class="login_dot"></i> <span @click="tologin()">登录</span> | <span @click="toregister()">注册</span>
                    </span>
                    
                    <el-dropdown v-if="loginstatus" trigger="hover" class="logincon">
                        <span class="el-dropdown-link userinfo-inner">
                            <span class="top_right_word fz16 c666">
                                <i class="login_dot"></i> <span>{{this.$store.state.user||''}}</span>
                            </span>
                            <!-- <span class="user-name"> {{this.$store.state.companyuser||''}}</span> -->
                            <i class="el-icon-caret-bottom loginown"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown" class="loginout">
                            <el-dropdown-item divided @click.native="logout" >退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{
            //  loginstatus:false
            }
        },
        computed:{
            loginstatus(){
                return this.$store.state.loginstatus;
            }
       },
        // props:['loginstatus'],
        mounted:function(){
            // console.log(this.$router.options.routes);
            // console.log(this.$route.path);
        },
        methods:{
            tologin(){
               
                this.$store.commit('showlogin',true);

            },
            toregister(){

                this.$store.commit('showregister',true);
                

            },
            logout: function () {
				var _this = this;
				this.$confirm('确认退出吗?', '提示', {
					//type: 'warning'
				}).then(() => {
                 this.$store.commit('changestatus',false);
                  this.$store.commit('login','');
                 this.$store.commit('getuser','');
                    
                    localStorage.removeItem('user');
                            location.reload();

                    
				}).catch(() => {

				});

 
			},
        }
    }
</script>
<style lang="scss">
.head-main{
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 3;
      background: #fff;
      box-shadow:2px 0px 8px rgba(23,102,193,0.7);
        .head-top{
        width: 100%;
        height: 105px;
        display: block;
        margin: 0 auto;
        
        .head-content{
            width: 1200px;
            padding: 18px 0 14px 0;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            img{
                width: 248px;
                height: 57px;
                display: block;
            }
            .top-right{
                //   border: 1px solid #000;
                line-height: 68px;
                .top_right_word{
                line-height: 20px;
                margin: 0 7px;
                cursor: pointer;

                span:hover{
                  color: #39B690;
                }

                i{
                    width: 20px;
                    height: 19px;
                    display: inline-block;
                    vertical-align: middle;
                    // margin: 0 7px;
                    margin-top: -5px;

                }
                .moble_code{
                    background: url('../../assets/moblecode.png') no-repeat;
                    background-size:cover; 
                }
                .login_dot{
                    background: url('../../assets/login.png') no-repeat;
                    background-size:cover; 
                }

                }
                
            }
            .nav-ul{
                    list-style: none;
                    position: relative;
                    margin: 0;
                    padding-left: 0;
                    
                    .nav_item{
                            float: left;
                            font-size: 16px;
                            color: #585757;
                            height: 20px;
                            line-height: 20px;
                            position: relative;
                            font-weight: 600;
                            margin: 24px 0;
                            padding: 0 16px;
                        a{
                           color: #585757;

                        }
                        .disable{
                            color: #eaeaea;
                        }
                        .router-link-active{
                            color: #39B690;
                        }
                        .router-link-active::after{
                            content: '';
                            width: 100%;
                            height: 2px;
                            background: #39B690;
                            display: block;
                            margin-top: 8px;
                        }
                        // border-right: 1px solid #999;
                    }
                    .nav_item:after{
                        content: '';
                        width: 1px;
                        height: 15px;
                        display: block;
                        position: absolute;
                        top:3px;
                        right: 0;
                        background: #999;
                    }
                    .nav_item:last-child::after{
                        display: none;
                    }
                    .nav_item:nth-child(5)::after,.nav_item:nth-child(6)::after,.nav_item:nth-child(7)::after{
                        background: #eaeaea;
                    }
                }
                
        }
        }
}
</style>
<style>
.el-menu--horizontal{
    border-bottom: none;
}
.el-menu--horizontal>.el-menu-item{
    font-size: 16px;
    color: #585757;
    height: 68px;
    line-height: 68px;
    position: relative;
    font-weight: 500;
}
.el-menu--horizontal>.el-menu-item.is-active{
    border-bottom:none ;
    color: #39B690;
}
.el-menu--horizontal>.el-menu-item.is-active::after{
    content: '';
    height: 2px;
    width: 100%;
    display: block;
    background: #39B690;
    margin-top: -15px;
    
}
.logincon{
    line-height: 20px;
    margin: 24px 0;
}
.loginown{
    margin-left: -5px;
    margin-top: -3px;
}
.loginout{
    padding: 0;
}
.loginout li{
    border-top:none; 
}
</style>


