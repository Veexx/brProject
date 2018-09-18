<template>
    <div>
     <login-view></login-view>
     <register-view ></register-view>
     <retrieve-view ></retrieve-view>
     <head-view ></head-view>

    <div class="about-content" >
        <div class="main-content">
                    <h6>免责声明/ DECLARE</h6>
       <p>欢迎您使用 币燃 数据分析网站（以下称"本平台"）。在您使用本平台各项服务之前，请仔细阅读本《免责声明》。本平台域名为 http://www.xxx.com。凡以任何方式登陆浏览本平台内容或直接、间接使用本平台内容者，视为同意本平台《免责声明》。</p>
       <p>风险提示：本平台承诺提供专业资讯服务，但不承诺投资者获取收益，也不与投资者约定分享投资收益或分担投资损失。市场有风险，投资需谨慎。


</p>
<p>一、本平台依法提供数字货币行情资讯业务，行情深度分析业务。如有发现任何机构或个人冒用工作人员在网络上非法从事投资咨询业务，请及时与本平台联系，币燃保留对侵权机构或个人追究法律责任的权利。


</p>
<p>二、本平台的内容受法律法规及国际条约的保护。除法律另有规定或本平台与第三方另有约定外，本网站提供的所有资料以及相关软件程序的知识产权均归属 币燃 所有。


</p>
<p>三、任何机构或者个人使用本平台，均应遵守有关法律法规、国际条约及本声明，不得破坏本平台运行安全，不得利用本平台进行任何违法活动，不得损害 币燃 的合法权益。


</p>
<p>四、未经 币燃 书面许可，任何机构或个人不得以向他人出售牟利为目的使用本平台的任何内容，此种使用包括但不限于拷贝、下载、存贮、通过硬盘拷贝或电子抓取系统获取、发送、转换、出租、演示、转载、复制、修改、销售、传播、出版或任何其它形式的散发。


</p>
<p>五、本平台对所提供的内容力求准确、完整和及时，但并不对其准确性、完整性和及时性做出任何保证。对任何因直接或间接使用本网站内容而造成的损失，包括但不限于因有关内容不准确、不完整而导致的损失， 币燃 不承担任何法律责任。本平台亦不保证所设置的外部链接的准确性和完整性。任何机构或者个人通过本平台与其他网站的链接而获得其他网站内容，其风险责任自负， 币燃 对此不承担任何法律责任。


</p>
<p>六、权利人认为本平台所提供的信息存储空间、搜索或链接服务存储、搜索或链接的内容所涉及的作品侵犯了其信息网络传播权或者被删除、改变了自己的权利管理电子信息的，可依法向本平台提交书面通知。权利人应对通知书的真实性负责，并承担由于通知书内容不真实所导致的全部法律责任。


</p>
<p>七、本声明受相关法律及国际条约的约束并依据其解释。如出现纠纷，双方应友好协商，协商不成，任何一方可提请本平台所在地人民法院诉讼解决。在法律允许的最大范围内，本条款最终解释权归 币燃 享有。

</p>
    </div>
        </div>

        <!-- <transition name="fade" mode="out-in">
              <router-view></router-view>
        </transition>  -->
     <foot-view></foot-view>
    </div>
</template>
<script>
import HeadView from './public/head'
import FootView from './public/foot'
import LoginView from './public/login'
import Registerview from './public/register'
import Retrieveview from './public/retrieve'
export default {
    data(){
        return{



        }
    },
    mounted:function(){

    },
    methods:{


    },
    components:{

      'head-view':HeadView,
      'foot-view':FootView,
      'login-view':LoginView,
      'register-view':Registerview,
      'retrieve-view':Retrieveview
  },
}
</script>
<style lang="scss">
.item-head{
    width: 100%;
    height: 63px;
    background: #F8FAFF;
    position: fixed;
    top:105px;
    left: 0;
    z-index: 3;
      box-shadow:2px 0px 4px rgba(23,102,193,0.2);    
    .item-head-content{
         width: 1200px;
         margin: 0 auto;
         display: flex;
    justify-content:space-between;


    .item-nav-ul{
        list-style: none;
        position: relative;
        margin: 0;
        padding-left: 0;
        .nav_item_child{
                float: left;
                font-size: 14px;
                color: #4F4F4F;
                height: 20px;
                line-height: 20px;
                position: relative;
                font-weight: 500;
                margin: 24px 0;
                padding: 0 20px;
                // border-right:1px solid #4F4F4F; 
                a{
                color: #4F4F4F;

                }
                .router-link-active{
                    color: #39B690;
                }
                .monneyview{
                    padding: 0 10px;
                    width: 150px;
                    height: 30px;
                    line-height: 30px;
                    border: none;
                    background: #39B690;
                    color: #fff;
                    border-radius:2px;
                    vertical-align: middle; 
                        margin-top: -4px;
                        font-size: 13px;

                    span{
                        display: inline;
                        width: 100%;
                        height: 100%;
                        display: flex;
                        justify-content: space-between;
                        i{
                            vertical-align: middle;
                            line-height: 30px;
                        }
                    }
                }
                // border-right: 1px solid #999;
            }
            .nav_item_child::after{
                content: '';
                width: 1px;
                height: 12px;
                background: #4F4F4F;
                position: absolute;
                right: 0;
                top:5px;
            }
            .nav_item_child:first-child{
                 padding-left:0 ;
            }
            .nav_item_child:last-child::after{
                display: none;
            }
    }

    .search-content{
        margin: 13px 0;
        width:290px;
        height:35px;
        background:rgba(255,255,255,1);
        position: relative;
        // border: 1px solid #e9e9e9;
        i{
            width: 17px;
            height: 17px;
            background: url('../assets/search.png') no-repeat;
            background-size:cover;
            position: absolute; 
            right: 14px;
            top:10px;
            z-index: 1;
        }
    }
    }
}
.about-content{
    margin-top: 100px;
    background: #f2f2f2;
    padding: 30px 0;
    .main-content{
        width: 1140px;
        margin: 0 auto;
        background: #fff;
        padding: 30px;
        box-shadow:0px 2px 10px 0px rgba(0,0,0,0.06);
        border-top:4px solid #39B690; 
           h6{
        font-size:24px;
        font-family:PingFang-SC-Heavy;
        color:rgba(88,87,87,1);
        line-height:20px;
   }
   p{
       font-size:16px;
        font-family:PingFang-SC-Medium;
        color:rgba(91,91,91,1);
        line-height:30px;
   }
    }

}
</style>


