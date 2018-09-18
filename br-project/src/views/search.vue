<template>
    <div>
     <login-view ></login-view>
     <register-view ></register-view>
     <retrieve-view ></retrieve-view>
     <head-view></head-view>
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
                    <i class="search_dot" @click="searchall"></i>
                    <el-input v-model="searchs.name" placeholder="比特币、以太坊" @keyup.enter.native="searchall"></el-input>
                </div>
           </div>
         
    </div>
    <div class="result-content">
        <div class="main-result">
            <div class="item-search">
                
                <span class="search-btn" @click="searchall">
                       <img class="item_search_dot" alt="" src="../assets/itemsearch.svg"> 
                </span>
                <el-input v-model="searchs.name" placeholder="比特币" @keyup.enter.native="searchall"></el-input>
            </div>
            <p>共{{coinlist.length+stationlist.length}}个结果，{{coinlist.length}}个币种，{{stationlist.length}}个交易所</p>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane  name="first">
                    <span slot="label">币种</span>
                        <el-table :data="coinlist"   highlight-current-row  style="width: 100%;border:1px solid #E9E9E9;" v-loading="listLoading" >
                                <el-table-column type="index" label="#" ></el-table-column>
                                <el-table-column  label="名称"  class="first-label-name"   min-width="130px">
                                    <template slot-scope="scope">
                                        <router-link :to="'/datadetail/'+scope.row.coin_id">
                                               <span  class="detailbtn" style="color:#39B690;cursor: pointer;"><img class="btimg" :src="scope.row.coin_logo" alt="" />{{scope.row.coin_name_en}}<b v-if="scope.row.coin_name_cn">-</b>{{scope.row.coin_name_cn}}</span>
                                        </router-link>   
                                    </template>
                                </el-table-column>			
                                <el-table-column  label="流通市值"  prop="circulation_market_value_rmb" min-width="120px" sortable>
                                    <template slot-scope="scope" >
                                        <span class="tellview">{{moneytype=='cny'? scope.row.circulation_market_value_rmb_name:scope.row.circulation_market_value_usd_name}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column  label="价格" prop="price_rmb" sortable >
                                    <template slot-scope="scope">
                                        <span class="tellview">{{moneytype=='cny'?scope.row.price_rmb_name:scope.row.price_usd_name}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column  label="涨幅(24h)" sortable min-width="100px" prop="rate">
                                    <template slot-scope="scope">
                                        <span style="color:#39B690;" v-if="scope.row.rate>0||scope.row.rate==0">{{scope.row.rate}}%</span>
                                        <span style="color:#FF0017;" v-else>{{scope.row.rate}}%</span>
                                    </template>
                                </el-table-column>
                                <el-table-column  label="交易所" prop="exchange_count" sortable >
                                </el-table-column>		
                                <el-table-column label="操作" >
                                    <template slot-scope="scope">
                                        <el-button size="small"   class="details" v-if="!scope.row.user_follow" @click="addown(scope.$index, scope.row)">添加自选</el-button>
                                        <el-button size="small"   class="remove" v-else @click="removecoin(scope.$index, scope.row)">删除自选</el-button>
                                    </template>
                                </el-table-column> 
                        </el-table>
                </el-tab-pane>
                <el-tab-pane  name="second">
                    <span slot="label">交易平台</span>
                    <el-table :data="stationlist"   highlight-current-row  style="width: 100%;">
                            <el-table-column type="index" label="简称" >
                    </el-table-column>
                    <el-table-column  label="交易所"  class="first-label-name" >
                        <template slot-scope="scope">
                            <router-link :to="'/stationdetail/'+scope.row.exchange_id">
                            <span class="detailbtn" style="color:#39B690;"><img class="meximg" :src="scope.row.logo" alt="">{{scope.row.name}}</span>
                            </router-link >
                        </template>
                    </el-table-column>
                     <el-table-column  label="成交额(24h)" prop="h24_turnover_rmb_name">
                    </el-table-column>			
                    <el-table-column  label="交易对" prop="trade_count">
                    </el-table-column>
                    <el-table-column  label="国家" prop="country_name">
                    </el-table-column>
                    <el-table-column  label="交易类型" prop="num">
                        <template slot-scope="scope">
                         <p v-for="item in scope.row.typelist" style="display:inline-block;">
                            <span v-if="item.exchange_type_id==3" style="background:#F8609D;border-radius:3px;width:53px;height:23px;display:inline-block;text-align:center;color:#fff;"><i class="qihuo"></i>{{item.name}}</span>
                            <span v-else-if="item.exchange_type_id==2" style="background:#39B690;border-radius:3px;width:53px;height:23px;display:inline-block;text-align:center;color:#fff;"><i class="xianhuo"></i>{{item.name}}</span>
                            <span v-else style="background:#33A9FC;border-radius:3px;width:53px;height:23px;display:inline-block;text-align:center;color:#fff;"><i class="changwai"></i>{{item.name}}</span>
                            </p>
                        </template>
                    </el-table-column>
                   
                    <el-table-column  label="星级" >
                         <template slot-scope="scope">
                            <el-rate
                            v-model="scope.row.star"
                            disabled
                          
                            text-color="#ff9900"
                            score-template="{value}">
                            </el-rate>
                        </template>
                    </el-table-column>
                        </el-table>
                </el-tab-pane>
            </el-tabs>
                        
        </div>
    </div>

     <foot-view></foot-view>
    </div>
</template>
<script>
import HeadView from './public/head'
import FootView from './public/foot'
import LoginView from './public/login'
import Registerview from './public/register'
import Retrieveview from './public/retrieve'
import {  addcoin ,removecoin , searchinfo} from '../api/api'

export default {
    data(){
        return{
            listLoading:false,
            moneyview:'人民币(CNY)',
            moneytype:'cny',
            searchs:{
                   name:'',
                   coinpage:1,
                   exchangepage:1
                },
            activeName: 'first',
            input:'',
            cointotal:0,
            stationtotal:0,
            coin_current_page:1,
            station_current_page:1,
            value5: 3.7, 
            coinlist:[],           
            stationlist:[],

        }
    },
    mounted:function(){

        // console.log(this.$route.params.name);
        this.searchs.name=this.$route.params.name;
        this.searchall();
    },
    methods:{
            

            searchall(){
                let that=this;
                that.listLoading = true;
                that.searchs.coinpage=1;
                that.searchs.exchangepage=1;
                let spa=that.searchs;
                 searchinfo(spa).then((res)=>{
                  
					that.listLoading = false;
                     if(res.data.code==200){
                        
                        that.cointotal = res.data.data.coin.total;
                        that.coinlist = res.data.data.coin.data;
                        that.coin_current_page=res.data.data.coin.current_page;

                        that.stationtotal = res.data.data.exchange.total;
                        that.stationlist = res.data.data.exchange.data;
                        that.station_current_page=res.data.data.exchange.current_page;


                    
					}else{
						console.log('获取失败');
					}
                 })  
            },

            handleClick(tab, event) {
                    console.log(tab, event);
            },

            removecoin(index,row){
                let that=this;
                that.$confirm('确认将该货币从自选中删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {

            
                removecoin(row.coin_id).then((res)=>{
                     if(res.data.code==200){
					that.$message({
                    type: 'success',
                    message: '删除成功!'
                      });
                      that.searchall();
                    
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
            addown(index,row){
                let that=this;
                let loginstatus=that.$store.state.loginstatus;
                if(loginstatus){
                    that.$confirm('确认将该货币加入自选吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {

            
                addcoin(row.coin_id).then((res)=>{
                     if(res.data.code==200){
					that.$message({
                    type: 'success',
                    message: '添加成功!'
                });
                    that.searchall();
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
            cursor: pointer;
        }
    }
    }
}
.result-content{
    margin-top: 168px;
    background: #fff;
    padding: 15px 0;
    .main-result{
         width: 1170px;
        margin: 0 auto;
        background:rgba(255,255,255,1);
        padding: 25px 15px;
        .el-tabs__nav-wrap::after{
              background-color: #F89F56;
        }
        .item-search{
            position: relative;
           .search-btn{
            width: 90px;
            height: 40px;
            background: #39B690;
            position: absolute;
            right: 0;
            top:0;
            text-align: center;
            line-height: 40px;
            z-index: 1;
            cursor: pointer;
            border-radius:3px; 
            .item_search_dot{
              width: 23px;
              height: 23px;
              display: inline-block;
              vertical-align: middle;
            }
        } 
        }
        
        
    }
    
}
.details{
       border: none;
       padding: 0;
       color: #2EA7FC;
       font-size: 14px;
   }
    .remove{
       border: none;
       padding: 0;
       color: #F25A54;
       font-size: 14px;
   }
</style>


