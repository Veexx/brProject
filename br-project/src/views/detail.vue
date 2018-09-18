<template>
    <div  v-loading.fullscreen.lock="fullscreenLoading">
     <login-view></login-view>
     <register-view ></register-view>
     <retrieve-view ></retrieve-view>
     <head-view ></head-view>
     <div class="item-head">
           <div class="item-head-content">
               <ul class="item-nav-ul">
                       <li class="nav_item_child" v-for="(item,index) in $router.options.routes[1].children[0].children"  :key="index">                          
                           <router-link :to='item.path' >
                               {{item.name}}
                            </router-link> 
                       </li>
                       <li class="nav_item_child">
                           <el-dropdown trigger="click" class="monneyview" @command="handleCommand">
                                <span class="el-dropdown-link">
                                    {{moneyview}}<i class="el-icon-arrow-down el-icon--right"></i>
                                </span>
                                <el-dropdown-menu slot="dropdown" class="cointype">
                                    <el-dropdown-item :command="['cny', '人民币(CNY)']">人民币(CNY)</el-dropdown-item>
                                    <el-dropdown-item :command="['usd', '美元(USD)']">美元(USD)</el-dropdown-item>
                                </el-dropdown-menu>
                           </el-dropdown>
                       </li>
                </ul> 
                
                <div class="search-content">
                      <i class="search_dot" @click="tosearch"></i>
                      <el-input v-model="input" placeholder="比特币、以太坊" @keyup.enter.native="tosearch"></el-input>
                </div>
           </div>
         
    </div>
    <div class="detail-content" v-if="coindetail!=''">
        <div class="detaild-top" v-if="coindetail!=''">
            <div class="top-left">
                <p style="color:#000;font-size:16px;">
                    <img class="btimg" style="width:30px;height:30px;" :src="coindetail.info.coin_logo" alt=""/>{{coindetail.info.coin_name_en}}<span class="aname">{{coindetail.info.coin_name_cn}}</span>
                    <span v-if="!coindetail.info.user_follow" class="detailadd" @click="addown">+添加自选</span>
                    <span v-if="coindetail.info.user_follow" class="detailadd remove" @click="removecoin">-删除自选</span>
                </p>
                <p class="price">{{moneytype=='cny'?coindetail.info.price_rmb_name:coindetail.info.price_usd_name}}
                    <span style="background: #39B690;" v-if="Number(coindetail.info.rate)>0|| Number(coindetail.info.rate)==0">{{coindetail.info.rate}}%</span>
                    <span v-else style="background: #F25A54;">{{coindetail.info.rate}}%</span>
                    </p>
                <p style="margin:0 0 0 5px;font-size:16px;">≈{{coindetail.info.price_usd_name}}</p>
            </div>
            <div class="top-right">
                <div>
                    <p class="info-title">24H最高</p>
                    <p class="info-data">{{moneytype=='cny'?'¥'+coindetail.info.h24_top_price_rmb:'$'+coindetail.info.h24_top_price_usd}}</p>
                </div>
                <div>
                    <p class="info-title">24H成交额 <span class="dot1">第{{coindetail.info.h24_turnover_sort}}名</span></p>
                    <p class="info-data">{{moneytype=='cny'?coindetail.info.h24_turnover_rmb_name:coindetail.info.h24_turnover_usd_name}}</p>
                </div>
                <div>
                    <p class="info-title">流通市值 <span class="dot2">第{{coindetail.info.market_value_sort}}名</span></p>
                    <p class="info-data">{{moneytype=='cny'?coindetail.info.circulation_market_value_rmb_name:coindetail.info.circulation_market_value_usd_name}}</p>
                </div>
                <div>
                    <p class="info-title">24H最低</p>
                    <p class="info-data">{{moneytype=='cny'?'¥'+coindetail.info.h24_low_price_rmb:'$'+coindetail.info.h24_low_price_usd}}</p>
                </div>
                <div>
                    <p class="info-title">24H换手率</p>
                    <p class="info-data">{{coindetail.info.turnover_rate}}%</p>
                </div>
                <div>
                    <p class="info-title">上架交易所</p>
                    <p class="info-data red">{{coindetail.info.exchange_count}}家</p>
                </div>
            </div>
        </div>
        <div class="detail-middle">
           <h5>{{coindetail.info.coin_name_en}}行情走势</h5>

           <!-- <p class="date-change">
                        <span :class="{active:index==1}" @click="changedate(1)">日K</span>
                        <span :class="{active:index==2}" @click="changedate(2)">周K</span>
                        <span :class="{active:index==3}" @click="changedate(3)">月K</span>
            </p> -->

            <!-- <div class="direction" id="direction"></div> -->

               <highchart :data="kdata" class="direction"  v-if="isRouterAlive"></highchart>

        </div>
        <div class="detail-end">
           <h5>{{coindetail.info.coin_name_en}}信息汇总</h5>
           <p class="date-change">
                        <span :class="{active:index1==1}" @click="changedate1(1)">市场行情</span>
                        <span :class="{active:index1==2}" @click="changedate1(2)">交易平台</span>
                        <span :class="{active:index1==3}" @click="changedate1(3)">详细资料</span>
            </p>

            <div class="alldetail-box" v-show="index1==1">
            <div class="datatable" >
                    <el-table :data="markets"   highlight-current-row v-loading="listLoading"   style="width: 100%;border:1px solid #e9e9e9;">
                           <el-table-column type="index" label="排名"></el-table-column>
                            <el-table-column  label="交易对" >
                                <template slot-scope="scope">
                                    <!-- <router-link :to="/stationdetail/+scope.row.exchange_id">                                     -->
                                      <span  style="color:#39B690;">{{scope.row.symbol}}</span>
                                    <!-- </router-link> -->
                                </template>
                            </el-table-column>			
                            <el-table-column  label="价格" prop="price_rmb">
                                <template slot-scope="scope">
                                   <span class="tellview">¥{{scope.row.price_rmb}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column  label="成交量" >
                                <template slot-scope="scope">
                                   <span class="tellview">{{scope.row.volume}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column  label="成交额" >
                                <template slot-scope="scope">
                                   <span class="tellview">{{scope.row.turnover_rmb_name}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column  label="占比" >
                                 <template slot-scope="scope">
                                    <span class="rateview"  style="background:#39B690;" v-if="scope.row.persent_rmb>0||scope.row.persent==0">{{Number(scope.row.persent_rmb).toFixed(2)}}%</span>
                                    <span class="rateview"  style="background:#F25A54;" v-else>{{Number(scope.row.persent_rmb).toFixed(2)}}%</span>
                                </template>
                            </el-table-column> 
                            <el-table-column  label="更新时间" prop="updated_at" width="100px">
                                <template slot-scope="scope">
                                   <span >{{scope.row.updated_at}}</span>                                  
                                </template>
                            </el-table-column> 
                    </el-table>
                      
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="15" :total="market_total" style="float:right;" ></el-pagination>           
            </div>
            
            <div class="table-right" id="tabledata"></div>
           </div>

           <!-- 交易平台 -->
           <div class="alldetail-box" v-show="index1==2">
            <div class="datatable">
                    <el-table :data="exchanges"   highlight-current-row v-loading="tableloading"   style="width: 100%;border:1px solid #e9e9e9;">
                            <el-table-column type="index" label="排名"></el-table-column>
                            <el-table-column  label="交易所" >
                                <template slot-scope="scope">
                                    <router-link :to="/stationdetail/+scope.row.exchange_id">                                    
                                      <span class="detailbtn" style="color:#39B690;"><img :src="scope.row.logo" class="btimg" alt="">{{scope.row.name}}</span>
                                    </router-link>
                                </template>
                            </el-table-column>			
                            <el-table-column  label="价格" prop="price_rmb">
                                <template slot-scope="scope">
                                   <span class="tellview">¥{{scope.row.price_rmb}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column  label="成交量" >
                                <template slot-scope="scope">
                                   <span class="tellview">{{scope.row.volume}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column  label="成交额" >
                                <template slot-scope="scope">
                                   <span class="tellview">{{scope.row.turnover_rmb_name}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column  label="占比" >
                                 <template slot-scope="scope">
                                    <span class="rateview"  style="background:#39B690;" v-if="scope.row.persent_rmb>0||scope.row.persent==0">{{Number(scope.row.persent_rmb).toFixed(2)}}%</span>
                                    <span class="rateview"  style="background:#F25A54;" v-else>{{Number(scope.row.persent_rmb).toFixed(2)}}%</span>
                                </template>
                            </el-table-column> 
                            <el-table-column  label="更新时间" prop="updated_at" width="100px">
                                <template slot-scope="scope">
                                   <span >{{scope.row.updated_at}}</span>                                  
                                </template>
                            </el-table-column> 
                    </el-table>
                            
            </div>
            <div class="table-right" id="tabledata1"></div>
           </div>
           <!-- 详细资料 -->
           <div class="alldetail-box detaillast" v-show="index1==3">
            <table class="detailtable1" v-if="coindetail.info!=''">
                   <tr>
                    <td ><span class="tdtitle">英文名：</span> {{coindetail.info.coin_name_en?coindetail.info.coin_name_en:'?'}}</td>
                    <td><span class="tdtitle">中文名：</span>{{coindetail.info.coin_name_cn?coindetail.info.coin_name_cn:'?'}}</td>
                    <td><span class="tdtitle">上架交易所：</span>{{coindetail.info.exchange_count?coindetail.info.exchange_count:'?'}}家</td>
                    <td><span class="tdtitle">发行时间：</span>{{coindetail.info.release_at?coindetail.info.release_at:'?'}}</td>
                    </tr>
                    <tr>
                    <td><span class="tdtitle">总市值：</span>{{coindetail.info.market_value_rmb?coindetail.info.market_value_rmb:'?'}}</td>
                    <td><span class="tdtitle">流通市值：</span>{{coindetail.info.circulation_market_value_rmb_name?coindetail.info.circulation_market_value_rmb_name:'?'}}</td>
                    <td><span class="tdtitle">发行量：</span>{{coindetail.info.circulation_count?coindetail.info.circulation_count:'?'}}</td>
                    <td><span class="tdtitle">流通量:</span>{{'?'}}</td>
                    </tr>
                    <tr>
                   <td><span class="tdtitle">白皮书：</span><a style="color:#2EA7FC;" :href="coindetail.info.white_paper">{{coindetail.info.white_paper}}</a> </td>
                   <td><span class="tdtitle">网站：</span><a href="" v-for="(item,index) in coindetail.info.website" :key="index" style="color:#2EA7FC;margin-left:5px;" :href="item.site_url">{{item.site_name}}</a></td>
                   <td><span class="tdtitle">区块站:</span><a href="" v-for="(item,index) in coindetail.info.block_website" :key="index" style="color:#2EA7FC;margin-left:5px;" :href="item.site_url">{{item.site_name}}</a></td>
                   <td><span class="tdtitle">介绍：</span>
                   <el-popover
                        placement="bottom"
                        title=""
                        width="1200"
                        trigger="click"
                        :content="coindetail.info.summary">
                        <span style="color:#2EA7FC;" slot="reference">介绍</span>
                    </el-popover>
                   </td>
                    </tr>
            </table>
            <h6 v-if="coindetail.coin_event!=''">{{coindetail.info.coin_name_en}}&nbsp;&nbsp;大事件</h6> 
            <!-- 大事件 -->
            <div class="stepcontent" v-if="coindetail.coin_event!=''">
                  
                <div style="width: 180px;margin-top:30px;height: 80px;display:inline-block;" v-for="(item,index) in coindetail.coin_event" :key="index" >

                    <div class="topview"  v-if="(index+1)%2==0">
                            <span class="topnum">{{index+1}}</span>
                            <p class="topword" >{{item.event_name}}</p>
                            <i class="linedot" ></i>
                            <p class="bottom-time" >{{item.happen_at}}</p>
                    </div>
                    <div class="bottomview" v-if="(index+1)%2!=0">
                                <span class="bottomnum">{{index+1}}</span>
                                <p class="bottomword" >{{item.event_name}}</p>
                                <i class="linedot" ></i>
                                <p class="top-time" >{{item.happen_at}}</p>

                    </div>
                </div>
            </div>
            <!-- ico信息 -->
            <div v-if="coindetail.ico_info!=''">
                <h6 style="border-bottom:none;">{{coindetail.info.coin_name_en}}&nbsp;&nbsp;ICO信息</h6>
                <table class="detailtable1">
                    <tr class="ta-title">
                            <td>状态</td>
                            <td>代币平台</td>
                            <td>ICO分配</td>
                            <td>投资者占比(%)</td>
                            <td>ICO总量</td>
                            <td>ICO发售量</td>
                    
                        </tr>
                        <tr>
                            <td>{{coindetail.ico_info.coin_status}}</td>
                            <td>{{coindetail.ico_info.agent_platform}}</td>
                            <td>{{coindetail.ico_info.ico_distribution}}</td>
                            <td>{{coindetail.ico_info.Investor_prisent}}</td>
                            <td>{{coindetail.ico_info.ico_sum}}</td>
                            <td>{{coindetail.ico_info.ico_sale_num}}</td>
                        </tr>
                        <tr class="ta-title">
                            <td>众筹起始时间</td>
                            <td>众筹结束时间</td>
                            <td>开始价格</td>
                            <td>众筹方式</td>
                            <td>众筹目标</td>
                            <td>众筹金额</td>
                        </tr>
                        <tr>
                            <td>{{coindetail.ico_info.crowd_start_time}}</td>
                            <td>{{coindetail.ico_info.crowd_end_time}}</td>
                            <td>{{coindetail.ico_info.sale_price}}</td>
                            <td>{{coindetail.ico_info.crowd_method}}</td>
                            <td>{{coindetail.ico_info.crowd_target}}</td>
                            <td>{{coindetail.ico_info.crowd_money}}</td>

                        </tr>
                        <tr class="ta-title">
                            <td>众筹均价</td>
                            <td>成功众筹数量</td>
                            <td>成功众筹金额</td>
                            <td>特点</td>
                            <td>安全审计</td>
                            <td>法律形式</td>
                        </tr>
                        <tr>
                            <td>{{coindetail.ico_info.crowd_avg_price}}</td>
                            <td>{{coindetail.ico_info.crowd_success_num}}</td>
                            <td>{{coindetail.ico_info.crowd_success_money}}</td>
                            <td>{{coindetail.ico_info.characteristic}}</td>
                            <td>{{coindetail.ico_info.security_audit}}</td>
                            <td>{{coindetail.ico_info.legal_form}}</td>

                        </tr>
                        <tr class="ta-title">
                            <td>管辖区域</td>
                            <td>法律顾问</td>
                            <td>待售网址</td>
                            <td>Blog地址</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>{{coindetail.ico_info.jurisdictional_area}}</td>
                            <td>{{coindetail.ico_info.legal_adviser}}</td>
                            <td>{{coindetail.ico_info.sale_web_site}}</td>
                            <td>{{coindetail.ico_info.blog_address}}</td>
                            <td></td>
                            <td></td>

                        </tr>
                        
                </table>
            </div>
            
           </div>

        </div>
    </div>
        <!-- <transition name="fade" mode="out-in">
              <router-view></router-view>
        </transition>  -->
     <foot-view></foot-view>
    </div>
</template>
<script>
require('echarts/theme/macarons');
import echarts from 'echarts'
import HeadView from './public/head'
import FootView from './public/foot'
import LoginView from './public/login'
import Registerview from './public/register'
import Retrieveview from './public/retrieve'
import Highchart from './public/highchart'
import { coinDetaild , exchangedetail , marketDetail,addcoin ,removecoin ,getKline ,marketRight} from '../api/api'
export default {
    data(){
        return{
            tableloading:false,
            isRouterAlive: true,
            fullscreenLoading: false,
            moneyview:'人民币(CNY)',
            moneytype:'cny',
            loginview:false,
            retrieveview:false,
            listLoading:false,
            registerview:false,
            coindetail:'',
            exchangeright:'',
            kdata:'',
            coin_id:'',
            input:'',
            index:1,
            index1:1,
            exchanges:[],
            moredetail:'',
            tabledata:null,
            tabledata1:null,
            market_page:1,
            markets:[],
            market_total:0,
            marketright:''

        }
    },
    mounted:function(){

        this.coin_id=this.$route.params.coin_id;
        this.fullscreenLoading = true;
        this.getDetail();
        this.getline();
        this.getTypeDetails();
        this.getmarketright();
    },
    methods:{
        handleCurrentChange(val) {
            let that=this;
                that.listLoading=true;

                this.market_page = val;
                 let spa={id:that.coin_id,page:that.market_page}
				 marketDetail(spa).then((res)=>{
                that.listLoading=false;
            if(res.data.code==200){

                that.markets=res.data.data.data;
                that.market_total=res.data.data.total;
                }else{
                    console.log('获取失败');
                }

             })
				
        },
        
        reload () {
            this.isRouterAlive = false
            this.$nextTick(() => (this.isRouterAlive = true))
         },
        getline(){
            let that=this;
            getKline(this.coin_id).then((res)=>{
  
            if(res.data.code==200){
                that.kdata = res.data.data;
                 that.reload();
                }else{
                    console.log('获取失败');
                }

            })
         },
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
        getDetail(){
            let that=this;
            coinDetaild(this.coin_id).then((res)=>{
            this.fullscreenLoading = false;

            if(res.data.code==200){
                that.coindetail = res.data.data;
                that.exchangeright=res.data.data.exchange_info.right;
                that.drawexchangedata();
                // this.drawdirection();
                }else{
                    console.log('获取失败');
                }

            })
         },
         getmarketright(){
             let that=this;
            marketRight(this.coin_id).then((res)=>{
                console.log(res);
            if(res.data.code==200){
                that.marketright=res.data.data;
                that.drawdata();

                }else{
                    console.log('获取失败');
                }

            }) 
         },
        getTypeDetails(){
         let that=this;
         if(that.index1==1){
             that.listLoading=true;
             let spa={id:that.coin_id,page:that.market_page}
            marketDetail(spa).then((res)=>{
                that.listLoading=false;
            if(res.data.code==200){
                that.markets=res.data.data.data;
                that.market_total=res.data.data.total;
                }else{
                    console.log('获取失败');
                }

             })
         }else if(that.index1==2){
                that.tableloading=true;
            exchangedetail(that.coin_id).then((res)=>{
            if(res.data.code==200){
                that.tableloading=false;
                that.exchanges = res.data.data.data;
                }else{
                    console.log('获取失败');
                }

            })  
         }else{
            that.moredetail=that.c
         }
        

        },
        removecoin(){
                let that=this;
                that.$confirm('确认将该货币从自选中删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {

            
                removecoin(that.coin_id).then((res)=>{
                     if(res.data.code==200){
					that.$message({
                    type: 'success',
                    message: '删除成功!'
                      });
                      that.getDetail();
                    
					}else{
							that.$message({
                    type: 'error',
                    message: '删除失败!'
                });
					}
                })


                }).catch(() => { 

                });
                 
            },
            addown(){
                let that=this;
                let loginstatus=that.$store.state.loginstatus;
                if(loginstatus){
                    that.$confirm('确认将该货币加入自选吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {

            
                addcoin(that.coin_id).then((res)=>{
                     if(res.data.code==200){
					that.$message({
                    type: 'success',
                    message: '添加成功!'
                });
                    that.getDetail();
					}else{
							that.$message({
                    type: 'error',
                    message: '添加失败!'
                });
					}
                })


                }).catch(() => { 

                });
                }else{
               that.$confirm('登录后才能将货币加入自选，去登录？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {

                this.$store.commit('showlogin',true);


                }).catch(() => {
         
                });
                }
               
            },
        handleCommand(command){
                        this.moneytype=command[0];
                        this.moneyview=command[1];
                                    
                },
        changedate(index){
                this.index=index;
        },
        changedate1(index){
                this.index1=index;
                this.getTypeDetails();
        },
        drawexchangedata(){
                    let that=this;
                    let exchangeobj=[];
                    let dataexchange=[];
                    for(let i=0;i<that.exchangeright.length;i++){
                        exchangeobj.push({'name':that.exchangeright[i].name+':'+Number(that.exchangeright[i].persent_rmb).toFixed(2)+'%','icon':'circle'});
                        dataexchange.push({value:that.exchangeright[i].persent_rmb,'name':that.exchangeright[i].name+':'+Number(that.exchangeright[i].persent_rmb).toFixed(2)+'%'})
                    }
                    that.tabledata1 = echarts.init(document.getElementById('tabledata1'));
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
                                         formatter: '交易所成交量占比',
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
        drawdata(){

            let that=this;
                    let exchangeobj=[];
                    let dataexchange=[];
                    for(let i=0;i<that.marketright.length;i++){
                        exchangeobj.push({'name':that.marketright[i].symbol+':'+Number(that.marketright[i].persent_rmb).toFixed(2)+'%','icon':'circle'});
                        dataexchange.push({value:that.marketright[i].persent_rmb,'name':that.marketright[i].symbol+':'+Number(that.marketright[i].persent_rmb).toFixed(2)+'%'})
                    }
                this.tabledata = echarts.init(document.getElementById('tabledata'));
                this.tabledata.setOption({
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
                                        width:100,
                                        height:30,
                                        lineHeight:15
                                    }
                                }
                            },
                            orient: 'horizontal',
                            bottom: '5%',
                            left:'center',
                            data:exchangeobj
                        },
                        series: [
                            {
                                name:'访问来源',
                                type:'pie',
                                radius: ['50%', '60%'],
                                center: ['40%','40%'],
                                avoidLabelOverlap: false,
                                label: {
                                    normal: {
                                         formatter: '行情走势',
                                         color:'#000',
                                         show: true,
                                         position: 'center'
                                        },
                                    emphasis: {
                                        show: false,
                                        textStyle: {
                                            fontSize: '30',
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
    updated: function () {

            this.drawexchangedata();
    },
    components:{

      'head-view':HeadView,
      'foot-view':FootView,
      'login-view':LoginView,
      'register-view':Registerview,
      'retrieve-view':Retrieveview,
      'highchart':Highchart
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
                        cursor: pointer;

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
.detail-content{
    margin-top: 168px;
    background: #f2f2f2;
    padding: 15px 0;
    .detaild-top{
        width: 1170px;
        height: 140px;
        margin: 0 auto;
        background:rgba(255,255,255,1);
        box-shadow:2px 0px 10px rgba(0,0,0,0.06);
        border-top:5px solid #39B690; 
        padding: 25px 15px;
        display: flex;
        .top-left{
            min-width: 400px;
           
            .aname{
                font-size: 14px;
                color: #7E7E7E;
                margin-left: 5px;
            }
            .detailadd{
                color: #fff;
                background: #F89F56;
                border-radius:3px;
                padding: 5px 10px;
                display: inline-block;
                margin-left: 30px;
                vertical-align: middle;
                cursor: pointer;
                font-size: 14px;

            }
            .remove{
                background: #F25A54;

            }
            .price{
                font-size: 26px;
                font-weight: 600;
                margin: 15px 0;
                color: #39B690;
                span{
                font-size: 12px;
                  color: #fff;
                  
                  display: inline-block;
                  padding: 3px 5px;
                  vertical-align: middle;
                }
            }
            
        }
        .top-right{
            // padding-left:50px ;
            div{
                width: 250px;
                float: left;
                height: 75px;
                text-align: left;
                .info-title{
                    font-size: 14px;
                    color: #5B5B5B;
                    margin: 10px 0;
                    .dot1,.dot2{
                        border-radius:3px;
                        color: #fff;
                        padding: 3px 5px;
                        font-size: 12px;
                        vertical-align: middle;
                        display: inline-block;
                    }
                    .dot1{
                        background: #39B690;
                    }
                    .dot2{
                        background: #2EA7FC;
                    }
                }
                .info-data{
                    margin: 10px 0;
                    font-size: 18px;
                    font-weight: 600;
                }
                
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
        background: #fff;
        margin-top: 20px;
        box-shadow:2px 0px 10px rgba(0,0,0,0.06);
        padding-bottom: 30px;
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
           .datatable{
               width: 860px;
               margin: 20px;
            //    border: 1px solid #E9E9E9;
               float: left;
           }
           .table-right{
               float: left;
               width: 280px;
               height: 500px;
               margin-left: 10px;
           }     
    }
    .detail-end:after{
        content: '';
        display: block;
        clear: both;
    }
}
.detaillast{
    padding: 20px;
    h6{
        color:#39B690;
        border: 1px solid #E9E9E9;
        padding: 15px;
        font-size: 16px;
        margin-bottom: 0;
        
        // border-bottom:none; 
    }
    .stepcontent{
        padding: 30px;
        height: 250px;
        overflow: auto;
        white-space: nowrap;
    }
    .el-step__title{
      font-size: 12px;
    }
    // .el-steps{
    //   display: block;
    // }
    // .el-step__description.is-finish{
    //     min-height: 40px;
    // }
}
.detailtable1{
    width: 100%;
    border-collapse: collapse;
    tr{
        width: 100%;
      td{
        // width: 25%;
        color: #000;
        width: 296px;
        border: 1px solid #E9E9E9;
        padding: 5px 10px;
        height: 54px;
        text-align: center;
        text-overflow: ellipsis;
        overflow: hidden;
        // white-space: nowrap;
}  
    }
    .ta-title td{
        color: #505050;
    }

    
}
.tdtitle{
    color:#505050;
}
.topview{
    width: 180px;
    height: 80px;
    display: inline-block;
    // float: left;
    border-left:1px dashed #39B690; 
    border-bottom:1px dashed #39B690; 
    position: relative;
    .topnum{
        width:26px;
        height:26px;
        display: block;
        background: #39B690;
        border-radius: 50%;
        position: absolute;
        top:-13px;
        left: -13px;
        text-align: center;
        color: #fff;
        line-height: 25px;
    }
    .linedot{
        width: 10px;
        height: 10px;
        background: #39B690;
        box-shadow: 0 0 3px RGBA(57, 182, 144,.38);
        position: absolute;
        left: -5px;
        bottom: -5px;
        display: block;
        border-radius:50%; 
    }
    .topword{
        position: absolute;
        left: 20px;
        top:-40px;
        width: 120px;
        font-size: 13px;
        overflow: hidden;
        white-space: normal;
        
    }
    .bottom-time{
        position: absolute;
        bottom: -45px;
        left: -30px;
    }

}
.bottomview{
    width: 180px;
    height: 80px;
    display: inline-block;
    // float: left;
    margin-bottom: -80px;
    border-left:1px dashed #39B690; 
    border-top:1px dashed #39B690; 
    position: relative;
    .bottomnum{
        width:26px;
        height:26px;
        display: block;
        background: #39B690;
        border-radius: 50%;
        position: absolute;
        bottom:-13px;
        left: -13px;
        text-align: center;
        color: #fff;
        line-height: 25px;
    }
    .linedot{
        width: 10px;
        height: 10px;
        background: #39B690;
        box-shadow: 0 0 3px RGBA(57, 182, 144,.38);
        position: absolute;
        left: -5px;
        top: -5px;
        display: block;
        border-radius:50%; 
    }
    .bottomword{
        position: absolute;
        left: 20px;
        bottom:-40px;
        width: 120px;
        font-size: 13px;
        overflow: hidden;
        white-space: normal;
        
    }
    .top-time{
        position: absolute;
        top: -45px;
        left: -30px;
    }

}
.el-pagination{
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
</style>


