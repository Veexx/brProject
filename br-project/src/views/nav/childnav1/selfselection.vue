<template>
    <div class="data-box">
          <el-col class="more-search-content" v-show="searchcon">
                <div>
                    <p>24h成交额<span style="color:#A6A6A6;">(万元)</span></p>
                    <p>
                        <input type="text" v-model="listinfo.input24b"> - <input type="text" v-model="listinfo.input24f">
                    </p>
                </div>
                <div>
                    <p>流通市值<span style="color:#A6A6A6;">(万元)</span></p>
                    <p>
                        <input type="text" v-model="listinfo.inputvalueb"> - <input type="text" v-model="listinfo.inputvaluef">
                    </p>
                </div>
                <div>
                    <p>价格<span style="color:#A6A6A6;"></span></p>
                    <p>
                        <input type="text" v-model="listinfo.inputpriceb"> - <input type="text" v-model="listinfo.inputpricef">
                    </p>
                </div>
            </el-col>
            <el-col class="more-search-content second-content" v-show="searchcon">
            <div>
                <p>上架交易所数量</p>
                <p>
                    <input type="text" v-model="listinfo.inputnumb"> - <input type="text" v-model="listinfo.inputnumf">
                </p>
            </div>
            <div style="margin-left:63px;">
                <p>币种代码</p>
                <p>
                    <input type="text" v-model="listinfo.code"> 
                    <span class="sure-btn" @click="getownlist">确定</span>
                </p>
                
            </div>
        </el-col>
        <div class="main-data">
            
            <section class="table-content">
                <!--工具条-->
            
                <el-col :span="24" class="toolbar" >
                    <p>数据列表<i class="normal_dot"></i></p>
                    <div>
                        <span class="more-search" v-on:click="searchcon=!searchcon">
                            高级筛选<i class="el-icon-arrow-up control_dot"></i>
                        </span>
                       <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="25" :total="total" ></el-pagination> 
                    </div>
                    
                </el-col>

                <!--列表-->
                <el-table :data="coinlist"   class="main-table"  highlight-current-row v-loading="listLoading"  style="width: 100%;">
                    <el-table-column type="index" label="#" :index="indexMethod"></el-table-column>
                    <el-table-column  label="名称"  class="first-label-name"   min-width="130px">
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
                    <el-table-column  label="交易所" prop="exchange_count" sortable >
                    </el-table-column>		
                    <el-table-column label="操作" >
                        <template slot-scope="scope">
                            <!-- <el-button size="small"   class="details" v-if="!scope.row.user_follow" @click="addown(scope.$index, scope.row)">添加自选</el-button> -->
                            <el-button size="small"   class="remove"  @click="removecoin(scope.$index, scope.row)">删除自选</el-button>
                        </template>
                    </el-table-column> 
                </el-table>
            </section> 
            <aside class="right-aside">
               <active></active>
               <aside-data></aside-data>
               <adver></adver>
               <list></list>
            </aside>        
        </div>
    </div>
</template>
<script>
import active from '../../public/activity.vue'
import AsideData from '../../public/data.vue'
import Advertise from '../../public/Advertisement.vue'
import List from '../../public/list.vue'
import { getSelection , removecoin} from '../../../api/api'
export default {
        data(){
            return{
                listinfo:{
                   page:1,
                   input24b:'',
                   input24f:'',
                   inputvalueb:'',
                   inputvaluef:'',
                   inputpriceb:'',
                   inputpricef:'',
                   inputnumb:'',
                   inputnumf:'',
                   code:'',
                //    access_token:''
                },
                searchcon:false,
                listLoading:false,
                total:0,
                current_page:1,
                coinlist:[]
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
            let status=this.$store.state.loginstatus;
            if(status){
               this.getownlist(); 
            }
           
        },
        methods:{
            indexMethod(index) {
               return index +(this.current_page-1)*20+1;
           },
           handleCurrentChange(val) {
				this.listinfo.page = val;
				this.getownlist();
				
			},
            getownlist(){
                 let that=this;
                that.listLoading = true;
                let spa=that.listinfo;
                 getSelection(spa).then((res)=>{
					that.listLoading = false;
                    
                     if(res.data.code==200){
					that.total = res.data.data.total;
					that.coinlist = res.data.data.data;
                    that.current_page=res.data.data.current_page;
                    
					}else{
						console.log('获取失败');
					}
                 }) 
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
                      that.getownlist();
                    
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
        }
    }
</script>
<style lang="scss">
   .data-box{
       width: 100%;
       background: #fff;
       padding: 20px 0;
       margin-top: 168px;

       .more-search-content{
           width: 1200px;
           margin: 0 auto;
            display: flex;
            float: none;
            justify-content: space-between;
            input{
                width: 170px;
                height: 30px;
                border: 1px solid #E1E1E1;
            }
        }
        .second-content{
            justify-content: flex-start;
            margin-bottom: 10px;
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
               width: 860px;
               
               .main-table{
                   border: 1px solid #e9e9e9;
               }
               .toolbar{
                   p{
                       font-weight: 500;
                       color: #39B690;
                       display: inline-block;
                       font-size: 16px;
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
</style>

