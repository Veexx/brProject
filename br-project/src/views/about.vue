<template>
    <div>
     <login-view></login-view>
     <register-view ></register-view>
     <retrieve-view ></retrieve-view>
     <head-view ></head-view>

    <div class="about-content" >
        <div class="main-content">
                    <h6>关于我们/ ABOUTUS</h6>
       <p>币燃（www.xxx.com）是一个数字货币数据与资源的整合与分析平台，为数字货币用户提供数据分析与决策辅助。
我们有全球最新的数字货币、交易平台与交易对的数据资源，既有基础的数据展示与筛选功能，也有进一步的分析内容与服务
我们致力于服务数字货币用户在数字货币投资过程中的内容与工具性辅助，未来会进一步提供各类数字货币相关工具提高分析效率。</p>
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


