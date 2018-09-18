<template>
    <div class="ranklist-box">
        <div class="main-data">
            
            <section class="table-content">

                <el-table :data="newuplist"   class="main-table"  highlight-current-row v-loading="listLoading"  style="width: 100%;">

                    <el-table-column  label="名称"  class="first-label-name" min-width="130px" >
                       <template slot-scope="scope">
                            <router-link :to="'/datadetail/'+scope.row.coin_id">
                                    <span  class="detailbtn" style="color:#39B690;cursor: pointer;"><img class="btimg" :src="scope.row.coin_logo" alt="" />{{scope.row.coin_name_en}}<b v-if="scope.row.coin_name_cn">-</b>{{scope.row.coin_name_cn}}</span>
                            </router-link>   
                        </template>
                    </el-table-column>			
                    <el-table-column  label="流通市值"  prop="circulation_market_value_rmb" min-width="120px" sortable>
                        <template slot-scope="scope" >
                            <span class="tellview">{{childtype=='cny'? scope.row.circulation_market_value_rmb_name:scope.row.circulation_market_value_usd_name}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column  label="价格" prop="price_rmb" sortable >
                        <template slot-scope="scope">
                            <span class="tellview">{{childtype=='cny'?scope.row.price_rmb_name:scope.row.price_usd_name}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column  label="流通数量" prop="circulation_count" sortable min-width="100px">
                        <template slot-scope="scope">
                            <span class="tellview">{{scope.row.circulation_count_name}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column  label="成交额(24h)" prop="h24_turnover_rmb" min-width="120px" sortable>
                         <template slot-scope="scope"> 
                            <span class="tellview">{{childtype=='cny'?scope.row.h24_turnover_rmb_name:scope.row.h24_turnover_usd_name}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column  label="涨幅(24h)" sortable min-width="100px" prop="rate">
                         <template slot-scope="scope">
                            <span style="color:#39B690;" v-if="scope.row.rate>0||scope.row.rate==0">{{Number(scope.row.rate).toFixed(2)}}%</span>
                            <span style="color:#FF0017;" v-else>{{Number(scope.row.rate).toFixed(2)}}%</span>
                        </template>
                    </el-table-column>
                    <el-table-column  label="上市时间" prop="day_name" sortable>
                    </el-table-column>
                    <el-table-column  label="交易所" prop="exchange_count" sortable>
                    </el-table-column>			
                </el-table>
            </section>       
        </div>
    </div>
</template>
<script>
import active from '../../public/activity.vue'
import AsideData from '../../public/data.vue'
import Advertise from '../../public/Advertisement.vue'
import List from '../../public/list.vue'
import { newUp } from '../../../api/api'
    export default {
        data(){
            return{
                index:1,
                searchcon:false,
                listLoading:false,
                newuplist:[]
            }
        },
        props:['moneytype'],
        components:{
           'active':active,
           'aside-data':AsideData,
           'adver':Advertise,
           'list':List

        },
        computed:{
         childtype(){
             var type=this.moneytype;
             return type ;
         }
        },
        mounted:function(){
           this.getnewuplist();
        },
        methods:{
            getnewuplist(){
                let that=this;
                that.listLoading = true;
                 newUp().then((res)=>{
					that.listLoading = false;

                     if(res.data.code==200){
					// that.total = res.data.data.total;
					that.newuplist = res.data.data;
                    // that.current_page=res.data.data.current_page;
                    
					}else{
						console.log('获取失败');
					}
                 })  
            }
        }
    }
</script>
<style lang="scss">
   .ranklist-box{
       width: 100%;
       background: #fff;
       padding: 30px 0;
       margin-top: 168px;

       .more-search-content{
           width: 1200px;
           margin: 0 auto;
            display: flex;
            float: none;
            justify-content: space-between;
            input{
                width: 183px;
                height: 30px;
                border: 1px solid #E1E1E1;
            }
        }
        .second-content{
            justify-content: flex-start;
            margin-bottom: 30px;
            .sure-btn{
                width: 87px;
                height: 30px;
                line-height: 30px;
                color: #fff;
                text-align: center;
                margin-left: 20px;
                display: inline-block;
                background: #F89F56;
                cursor: pointer;

            }
        }
       .main-data{
           width: 1200px;
           margin: 0 auto;
           display: flex;
           justify-content: space-between;
           .table-content{
               width: 100%;
               
               .main-table{
                   border: 1px solid #e9e9e9;
               }
               .toolbar{
                //    p{
                //        font-weight: 500;
                //        color: #39B690;
                //        display: inline-block;
                //        font-size: 16px;
                //    }
                .date-change{
                    display: flex;
                    justify-content: flex-start;
                    span{
                        width: 84px;
                        height: 34px;
                        background: #F5F5F5;
                        border: 1px solid #EAEAEA;
                        border-radius: 3px;
                        margin-right: 14px;
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
                   .more-search{

                       color: #F89F56;
                       border: 1px solid #F89F56;
                       border-radius:3px;
                       padding: 5px 8px;
                       text-align: center; 
                       font-weight:500; 
                       display: inline-block;
                       vertical-align: middle;
                       cursor: pointer;
                       .control_dot{
                           margin: 0 5px;
                           color: #F89F56;
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
//    .el-dropdown-menu{
//        width: 180px;
//    }
</style>

