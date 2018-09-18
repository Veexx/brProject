<template>
    <div v-loading.fullscreen.lock="fullscreenLoading">
     <login-view></login-view>
     <register-view></register-view>
     <retrieve-view></retrieve-view>
     <head-view></head-view>
     <div class="item-head">
           <div class="item-head-content">
               <ul class="item-nav-ul">
                       <li class="nav_item_child" v-for="(item,index) in $router.options.routes[2].children[0].children"  :key="index">                          
                           <router-link :to='item.path' >
                               {{item.name}}
                            </router-link> 
                       </li>
                </ul> 
                
                <div class="search-content">
                      <i class="search_dot" @click="tosearch"></i>
                      <el-input v-model="input" placeholder="比特币、以太坊" @keyup.enter.native="tosearch"></el-input>
                </div>
           </div>
         
    </div>
    <div class="stationDetail-content">
        <div class="detaild-top" v-if="stationdetail.length!=0">
            <div class="top-left">
                <img :src="stationdetail.info.logo" alt="">
            </div>
            <div class="top-middle">
               <p>
                   <span class="fz18 fw6 c5d">{{stationdetail.info.name}} </span>
                   <el-rate 
                            v-model="stationdetail.info.star"
                            disabled
                          
                            text-color="#ff9900"
                            score-template="{value}">
                    </el-rate>
               </p>
               <p>{{stationdetail.info.summary}}</p>
               <p v-for="item in stationdetail.typelist"  style="display:inline-block;margin:0 2px;">
                            <span v-if="item.exchange_type_id==3" style="background:#F8609D;border-radius:3px;width:53px;height:23px;display:inline-block;text-align:center;color:#fff;"><i class="qihuo"></i>{{item.name}}</span>
                            <span v-else-if="item.exchange_type_id==2" style="background:#39B690;border-radius:3px;width:53px;height:23px;display:inline-block;text-align:center;color:#fff;"><i class="xianhuo"></i>{{item.name}}</span>
                            <span v-else-if="item.exchange_type_id==3" style="background:#33A9FC;border-radius:3px;width:53px;height:23px;display:inline-block;text-align:center;color:#fff;"><i class="changwai"></i>{{item.name}}</span>
                            <span v-else style="background:#f89f56;border-radius:3px;width:53px;height:23px;display:inline-block;text-align:center;color:#fff;"><i class="wakuang"></i>{{item.name}}</span>
               </p>
               <!-- <span style="background:#33A9FC;line-height:30px;border-radius:3px;width:60px;height:30px;display:inline-block;text-align:center;color:#fff;"><i class="qihuo"></i>期货</span> -->

               <p>官网地址：<a style="color:#2EA7FC;" :href="stationdetail.info.website">{{stationdetail.info.website}}</a> <span>国家：<i style="color:#2EA7FC;font-style:normal;">{{stationdetail.info.countey_name?stationdetail.info.countey_name:'未知'}}</i></span> </p>
            </div>
            <div class="top-right">
                <p style="font-size:16px">24小时平台成交额</p>
                <p><span class="fz24 fw6 c39">{{stationdetail.info.h24_turnover_rmb}}</span> <span class="ranklistword tc">排名NO.{{stationdetail.info.sort}}</span></p>
                <p style="font-size:16px;margin:5px 0;">{{stationdetail.info.h24_turnover_usd}}</p>
            </div>
        </div>
        <div class="detail-end">
            <div class="datatable">

             <el-table :data="stationdetail.list"  class="stationtable"  highlight-current-row   style="width: 100%;">
                    <el-table-column type="index" label="#" >
                    </el-table-column>
                    <el-table-column  label="名称">
                        <template slot-scope="scope">
                            <router-link :to="'/datadetail/'+scope.row.coin_id">
                                    <span  class="detailbtn" style="color:#39B690;cursor: pointer; text-overflow: ellipsis;overflow: hidden;white-space: nowrap;"><img :src="scope.row.coin_logo" class="btimg" >{{scope.row.coin_name_en}}</span>
                            </router-link>
                        </template>
                    </el-table-column>
                     <el-table-column  label="交易对" prop="symbol">
                    </el-table-column>			
                    <el-table-column  label="价格" prop="price_rmb_name">
                    </el-table-column>
                    <el-table-column  label="成交量" prop="volume">
                    </el-table-column> 
                    <el-table-column  label="成交额" prop="turnover_rmb_name" min-width="100">
                    </el-table-column> 
                    <el-table-column  label="占比" >
                        <template slot-scope="scope">
                            <span style="color:#39B690;" v-if="scope.row.persent_rmb>0||scope.row.persent_rmb==0">{{Number(scope.row.persent_rmb).toFixed(2)}}%</span>
                            <span style="color:#FF0017;" v-else>{{Number(scope.row.persent_rmb).toFixed(2)}}%</span>
                        </template>
                    </el-table-column> 
                    <el-table-column  label="更新时间">
                        <template slot-scope="scope">
                            <span>刚刚</span>
                        </template>
                    </el-table-column> 
            </el-table>
            <!-- <el-pagination class="platform-pages" layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" ></el-pagination>            -->
            </div>
            <div class="table-right" id="tabledata"></div>
        </div>
    </div>
     <foot-view></foot-view>
    </div>
</template>
<script>
import echarts from 'echarts'
import HeadView from './public/head'
import FootView from './public/foot'
import LoginView from './public/login'
import Registerview from './public/register'
import Retrieveview from './public/retrieve'
import { stationDetail } from '../api/api'
export default {
    data(){
        return{

            input:'',
            fullscreenLoading: false,
            stationid:"",
            stationdetail:'',
            tabledata:null, 
        }
    },
    mounted:function(){
        this.stationid=this.$route.params.stationid;
        this.fullscreenLoading = true;
        this.getstationdetail(); 
    },
    methods:{
        tosearch(){
                   let that=this;
                   if(that.input==''){
                       that.$message({
                            type: 'error',
                            message: '请输入搜索关键字'
                      });
                      return
                   }else{
                       this.$router.push({
                        name: 'Search',
                        params: {
                            name: that.input
                        }
                    });
                   }
                   
        },
        getstationdetail(){
            let that=this;
       
        stationDetail(this.stationid).then((res)=>{
        
                this.fullscreenLoading = false;
                if(res.data.code==200){
                    that.stationdetail = res.data.data;
                    that.exchangeright= res.data.data.right_data;
                    that.drawdata();
                    }else{
                        console.log('获取失败');
                    }

           })
        },
        handleCurrentChange(){

        },

        drawdata(){
               let that=this;
                    let exchangeobj=[];
                    let dataexchange=[];
                    for(let i=0;i<that.exchangeright.length;i++){
                        exchangeobj.push({'name':that.exchangeright[i].coin_name_en+' : '+Number(that.exchangeright[i].persent_rmb).toFixed(2)+'%','icon':'circle'});
                        dataexchange.push({value:that.exchangeright[i].persent_rmb,'name':that.exchangeright[i].coin_name_en+' : '+Number(that.exchangeright[i].persent_rmb).toFixed(2)+'%'})
                    }
                    console.log(dataexchange)
                    that.tabledata1 = echarts.init(document.getElementById('tabledata'));
                    that.tabledata1.setOption({
                        tooltip: {
                            trigger: 'item',
                            formatter: "{b}"
                        },
                        legend: {
                                formatter:  function(name){
                                
                                    var arr = [
                                        
                                        '{b|'+name+'}',
                                    ]
                                    return arr.join('\n')
                                },
                                textStyle:{
                                    rich:{                                  
                                        b:{
                                            fontSize:12,
                                            color:'#333',
                                            // align:'left',
                                            width:100,
                                            height:30,
                                            // padding:[0,10,0,0],
                                            lineHeight:15
                                        }
                                    }
                                },
                                orient: 'horizontal',
                                top: '45%',
                                left:'center',
                                data:exchangeobj
                            },
                            series: [
                                {
                                    // name:'访问来源',
                                    type:'pie',
                                    radius: ['40%', '50%'],
                                    center: ['50%','25%'],
                                    avoidLabelOverlap: false,
                                    label: {
                                        normal: {
                                         formatter: '币种成交额占比',
                                         color:'#000',
                                            show: true,
                                            position: 'center'
                                        },
                                        emphasis: {
                                            show: false,
                                            textStyle: {
                                                fontSize: '18',
                                                fontWeight: 'bold'
                                            }
                                        }
                                    },
                                    labelLine: {
                                        normal: {
                                            show: false
                                        }
                                    },
                                    data:dataexchange
                                }
                            ]

                    })
           },
 

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
                    // width: 150px;
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
.stationDetail-content{
    margin-top: 168px;
    background: #f2f2f2;
    padding: 15px 0;
    .detaild-top{
        width: 1170px;
        // height: 140px;
        margin: 0 auto;
        background:rgba(255,255,255,1);
        box-shadow:2px 0px 10px rgba(0,0,0,0.06);
        border-top:5px solid #39B690; 
        padding: 25px 15px;
        display: flex;
        .top-left{
            // min-width: 400px;
            // padding-right:50px ;
            img{
                width: 147px;
                height: 147px;
                display: block;
                vertical-align: middle;
                margin-right: 36px;
                margin-top: 15px;
            }

            .aname{
                font-size: 14px;
                color: #7E7E7E;
            }
            .add{
                color: #fff;
                background: #F89F56;
                border-radius:3px;
                padding: 5px 10px;
                display: inline-block;
                margin-left: 30px;
                vertical-align: middle;

            }
            .price{
                font-size: 26px;
                font-weight: 600;
                color: #39B690;
                span{
                    font-size: 12px;
                  color: #fff;
                  background: #F25A54;
                  display: inline-block;
                  padding: 3px 5px;
                  vertical-align: middle;
                }
            }
            
        }
        .top-middle{
            max-width: 620px;
            .rateview{
                display: inline-block;
                vertical-align: middle;
                margin-top: -5px;
            }
        }
        .top-right{
            padding-left:50px ;
            .ranklistword{
                width: 87px;
                height: 36px;
                line-height: 36px;
                display: inline-block;
                font-weight:600; 
                
                vertical-align: middle;
                background: #F89F56;
                border-radius:3px;
                color: #fff; 
                margin-right: 20px;
                margin-top: -5px;
            }

        }
    }
    .detail-middle{
        width: 1200px;
        margin: 0 auto;
        background: #fff;
        margin-top: 20px;
        box-shadow:2px 0px 10px rgba(0,0,0,0.06);

        h5{
            padding: 16px 12px;
            margin: 0;
            font-size: 16px;
            color: #fff;
            background: #39B690;
        }
        .date-change{
                    line-height: 36px;
                    display: flex;
                    justify-content: flex-start;
                    span{
                        width: 84px;
                        height: 34px;
                        background: #F5F5F5;
                        border: 1px solid #EAEAEA;
                        border-radius: 3px;
                        margin-left: 14px;
                        text-align: center;
                        line-height: 34px;
                        cursor: pointer;
                    }
                    .active{
                        background: #39B690;
                        color: #fff;
                        border: none;
                    }
                }
                .direction{
                    width: 100%;
                    height: 307px;
                    margin: 30px 0;
                }
    }
    .detail-end{
        width: 1200px;
        margin: 0 auto;
        // background: #fff;
        margin-top: 20px;
        
        padding-bottom: 30px;
        h5{
            padding: 16px 12px;
            margin: 0;
            font-size: 16px;
            color: #fff;
            background: #39B690;
        }

           .datatable{

               width: 820px;
            //    height: 530px;
               padding: 20px 20px;
            //    margin-right:20px;
               border: 1px solid #E9E9E9;
               float: left;
               box-shadow:2px 0px 10px rgba(0,0,0,0.06);
               background: #fff;
               .stationtable{
                   border: 1px solid #E9E9E9;
                   border-top:2px solid #39B690;
               }
               .el-pagination{
                       float: right;
                       display: inline-block;
                       padding: 10px 0;
                    //    float: right;
                       .btn-prev,.btn-next{
                           background-color: #EEEEEE;
                       }
                       .el-pager li{
                           border: 1px solid #eee;
                           margin: 0 5px;
                           border-radius:3px; 
                       }
                       .el-pager li.active{
                           color: #fff;
                           background: #39B690;
                       }
                   }
           }
           .table-right{
               float: right;
               background: #fff;
               width: 320px;
               height: 570px;
               margin-left: 10px;
               box-shadow:2px 0px 10px rgba(0,0,0,0.06);
           }     
    }
    .detail-end:after{
        content: '';
        display: block;
        clear: both;
    }
}
</style>


