<template>
    <footer>

        <div class="foot-top">
            <div class="foot-content">
                <div class="foot-top-left">
                    <router-link to="/about">关于我们</router-link>
                    <a href="javascript:vid(0)">联系我们</a>
                    <a href="javascript:vid(0)">服务条款</a>
                    <router-link to="/disclaimer">免责申明</router-link>
                </div>
                <div class="foot-top-right">
                    <span>
                        <img src="../../assets/qq.png" alt="">
                    </span>
                    <span>
                        <img src="../../assets/weixin.png" alt="">
                    </span>
                    <span>
                        <img src="../../assets/weibo.png" alt="">
                    </span>
                    <span>
                        <img src="../../assets/gaode.png" alt="">
                    </span>
                </div>
            </div>
        </div>
        <div class="foot-bottom">
           <div class="foot-bottom-content">
               <div class="link-list">
                   <img src="../../assets/btlogo.png" alt="">
                   <h5>友情链接</h5>
                   <div class="link-view">
                    <a href="javascript:vid(0);">BIQ</a>
                   <a href="https://www.feixiaohao.com">非小号</a>
                   <a href="http://www.huoxing24.com">火星财经</a>
                   <a href="http://www.bitett.com">比特头条</a>
                   <a href="https://www.coingogo.com">币源社区</a>
                   <a href="https://www.btc123.com">比特币导航</a>
                   <a href="https://www.chainfor.com">链向财经</a>
                   <a href="http://www.qukuaiwang.com.cn">区块网</a>
                   <a href="https://www.biask.com">币问</a>
                   <a href="https://cobo.com">cobo钱包</a>
                   <a href="https://www.f2pool.com">鱼池</a>
                   <a href="https://www.chainnews.com">链闻</a>
                   <a href="http://www.coinyee.io">币易</a>
                   <a href="http://www.weilaicaijing.com">未来财经</a>
                   <a href="http://www.epay.com">易派支付</a>
                   <a href="http://new.linekong.com">蓝港互动</a>
                   <a href="http://www.fn.com">FN财经</a>
                   <a href="https://www.okb.com">CKEx</a>
                   <a href="http://www.zhenniucaijing.com">真牛财经</a>
                   <a href="http://www.bcsky.pro">链天下</a>
                   <a href="http://www.qifengle.com">起风财经</a>   
                   </div>


               </div>
               <div class="web-info">
                   <div class="web-left">
                        <img src="../../assets/word.png" alt="">
                        <p>合作邮箱：business@biran.com</p>
                        <p>合作QQ：1345640092</p>
                   </div>
                   <div class="web-right">
                        <img src="../../assets/code.png" alt="">
                   </div>
               </div>
           </div>
           <div class="end-class">
               <div class="end-content">
                <p>Copyright© 币燃 All Rights Reserved.属ICP备11011517号-2  由希格斯科技提供技术支持</p>
               <p>
                   <span> <i class="computer_dot"></i> 电脑版</span>
                   <span> <i class="moble_dot"></i>手机版</span>
               </p>   
               </div>
               
           </div>
        </div>
    </footer>
</template>
<style lang='scss'>
  footer{
      width: 100%;
      margin: 0 auto;
      display: block;
      .foot-top{
          width: 100%;
          background: #39B690;
          height: 70px;
          .foot-content{
              width: 1200px;
              height: 100%;
              margin: 0 auto;
              display: flex;
              justify-content: space-between;
              .foot-top-left{
                  a{
                      color:#FFFFFF;
                      font-size: 16px;
                      margin-right: 30px;
                      display: inline-block;
                      float: left;
                      line-height: 70px;
                  }
              }
              .foot-top-right{
                  span{
                      margin-top: 13px;
                      width: 43px;
                      height: 43px;
                      display: inline-block;
                      margin-left: 26px;
                      overflow: hidden;
                      img{
                          width: 100%;
                          height: 100%;
                      }
                  }
              }
          }

      }
      .foot-bottom{
          background: #504D50;
          width: 100%;
          margin: 0 auto;
          .foot-bottom-content{
              width: 1200px;
              padding: 30px 0;
              margin: 0 auto;
              display: flex;
              justify-content: space-between;
              border-bottom: 1px solid RGBA(255, 255, 255, .22);
              .link-list{
                  border-right:1px dashed RGBA(255, 255, 255, .25);
                  
                  img{
                      width: 648px;
                      height: 41px;
                      display: block;
                  }
                  h5{
                      color:rgba(213,213,213,1);
                        line-height:20px;
                        font-size: 16px;
                        margin-top: 20px;
                  }
                  .link-view{
                      display: block;
                      margin: 20px 0;
                      a{
                          color: #D5D5D5;
                          font-size: 14px;
                          float: left;
                          margin-right: 15px;
                          margin-top: 10px;
                      }
                      a:hover{
                          color: #39B690;

                      }
                  }
                  .link-view:after{
                      display: block;
                      content: '';
                      clear: both;
                  }
              }
              .web-info{
                  padding-left: 30px;
                  display: flex;
                  justify-content: space-between;
                  .web-left{
                     img{
                         width: 123px;
                         height: 72px;
                         display: block;
                         margin-bottom: 30px;
                     }
                     p{
                         font-size: 14px;
                         margin: 8px 0;
                         color: #D5D5D5;
                     }
                  }
                  .web-right{
                      img{
                          width: 146px;
                          height: 146px;
                          display: block;
                          margin: 25px 0 25px 30px;
                      }
                  }
              }

          }
          .end-class{
              width: 100%;
              height: 60px;
              .end-content{
                  width: 1200px;
                  margin: 0 auto;
                //   line-height: 60px;
                  
                  display: flex;
                  justify-content: space-between;
                  p{
                      margin: 20px 0;
                     color: #D5D5D5;
                     i{
                         
                         display: inline-block;
                         margin: 0 8px;
                         vertical-align: middle;
                         cursor: pointer;
                     }
                     .computer_dot{
                         width: 18px;
                         height: 16px;
                         background: url('../../assets/computer.png')no-repeat;
                         background-size:cover; 
                     }
                     .moble_dot{
                         width: 13px;
                         height: 19px;
                         background: url('../../assets/moble.png') no-repeat;
                         background-size:cover; 
                     }
                  }
              }
          }
      }
  }
</style>

