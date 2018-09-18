<template>
    <div class="aside-data-content">
          <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane  name="first">
                    <span slot="label">涨幅榜<i class="up_dot" v-if="activeName=='first'"></i></span>
                        <el-table :data="coinlist"   highlight-current-row v-loading="listLoading"  style="width: 100%;">
                            <el-table-column type="index" label="#">
                            </el-table-column>
                            <el-table-column  label="名称" >
                                <template slot-scope="scope">
                                    <router-link :to="'/datadetail/'+scope.row.coin_id">                                    
                                      <span class="detailbtn" style="color:#39B690;"><img :src="scope.row.coin_logo" class="btimg" alt="" />{{scope.row.coin_name_en}}</span>
                                    </router-link>  
                                </template>
                            </el-table-column>			
                            <el-table-column  label="价格" prop="price_rmb">
                                <template slot-scope="scope">
                                   <span class="tellview">{{childtype=='cny'?scope.row.price_rmb_name:scope.row.price_usd_name}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column  label="%24小时" min-width="100px">
                                <template slot-scope="scope">
                                    <span class="rateview"  style="background:#39B690;" v-if="scope.row.rate>0||scope.row.rate==0">{{scope.row.rate}}%</span>
                                    <span class="rateview"  style="background:##F25A54;" v-else>{{scope.row.rate}}%</span>
                                </template>
                            </el-table-column> 
                        </el-table>
                </el-tab-pane>
                <el-tab-pane  name="second">
                    <span slot="label">跌幅榜 <i class="normal_dot" v-if="activeName=='second'"></i></span>
                    <el-table :data="coinlist2"   highlight-current-row v-loading="listLoading"  style="width: 100%;">
                            <el-table-column type="index" label="#" >
                            </el-table-column>
                            <el-table-column  label="名称" >
                                <template slot-scope="scope">
                                  <router-link :to="'/datadetail/'+scope.row.coin_id">                                    
                                      <span class="detailbtn" style="color:#39B690;"><img :src="scope.row.coin_logo" class="btimg" alt="" />{{scope.row.coin_name_en}}</span>
                                    </router-link>
                                </template>
                            </el-table-column>			
                            <el-table-column  label="价格" prop="price_rmb">
                                <template slot-scope="scope">
                                   <span class="tellview">{{childtype=='cny'?scope.row.price_rmb_name:scope.row.price_usd_name}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column  label="%24小时" min-width="100px">
                                <template slot-scope="scope">
                                    <span class="rateview"  style="background:#39B690;" v-if="Number(scope.row.rate)>0||Number(scope.row.rate)==0">{{scope.row.rate}}%</span>
                                    <span class="rateview"  style="background:#F25A54;" v-else >{{scope.row.rate}}%</span>
                                </template>
                            </el-table-column> 
                        </el-table>
                </el-tab-pane>
            </el-tabs>
    </div>
</template>
<script>
import { riseandFall } from '../../api/api'
    export default {
        data(){
            return{
                activeName: 'first',
                listLoading:false,
                coinlist:[],
                coinlist2:[]
            }
        },
        computed:{
            childtype(){
                return this.$store.state.moneytype;
         }
        },
        mounted:function(){
                this.getriseandfall1();
                this.getriseandfall2();
        },
        methods:{
            getriseandfall1(){
                let that=this;
                this.listLoading=true;
                riseandFall(1).then((res)=>{
                this.listLoading=false;

                    if(res.data.code==200){
					that.coinlist = res.data.data;
					}else{
						console.log('获取失败');
					}
                })
            },
            getriseandfall2(){
                let that=this;
                this.listLoading=true;
                riseandFall(2).then((res)=>{
                this.listLoading=false;

                    if(res.data.code==200){
					that.coinlist2 = res.data.data;
  
                    
					}else{
						console.log('获取失败');
					}
                })
            },
            handleClick(tab, event) {
                    console.log(tab, event);
                }
        }
    }
</script>
<style lang="scss">
   .aside-data-content{
       width: 320px;
       display: block;
       margin: 0;
       .el-tabs{
           min-height: 459px;
           .el-tabs__content{
               border: 1px solid #E5E5E5;
               height: 100%;
           }
       }
   }
   .el-tabs__item.is-active{
       color: #39B690;
   }
   .el-tabs__item{
       color: #858585;
   }
   .el-tabs__active-bar{
       background-color:#39B690;
   }
   .el-tabs__item:hover{
       color: #39B690;
   }
   .el-tabs__nav-wrap::after{
       background-color: #F89F56;
   }
</style>


