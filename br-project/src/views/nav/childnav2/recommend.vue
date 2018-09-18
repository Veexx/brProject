<template>
    <div class="recommend-content"  v-loading="loading">
        <div class="item-recommend" v-for="(item,index) in stationlist" :key="index">
            <div class="itemtitle">
                <span class="title-number fz16 tc">NO.{{item.sort}}</span>
                <img  class="station-icon" :src="item.logo" alt="">
                <div>
                    <p class="fz16 c5d fw6">{{item.name}}</p>
                    <el-rate
                            v-model="item.star"
                            disabled
                          
                            text-color="#ff9900"
                            score-template="{value}">
                    </el-rate>
                </div>
                <div class="station-money">
                    <p>总成交额</p>
                    <p class="fz14 c5d fw6">{{item.count_money_rmb}}</p>
                </div>
                <p class="reason">{{item.recommend}}</p>
            </div>
            <div class="itemtable">
                <el-table :data="item.trade_pair"    header-cell-class-name="titlebg" class="main-table"  highlight-current-row  style="width: 100%;">
                    <el-table-column type="index" label="#" >
                    </el-table-column>
                    <el-table-column  label="名称"  class="first-label-name" >
                        <template slot-scope="scope">
                            <router-link :to="'/datadetail/'+scope.row.coin_id">
                            <span class="detailbtn" style="color:#39B690;">{{scope.row.coin_name_en}}-{{scope.row.coin_name_cn}}</span>
                            </router-link>
                        </template>
                    </el-table-column>
                     <el-table-column  label="成交额(24h)" prop="count_money">
                    </el-table-column>			
                    <el-table-column  label="交易对" prop="symbol">
                    </el-table-column>
                    <el-table-column  label="价格" prop="price_rmb">
                    </el-table-column>
                    <el-table-column  label="成交额占比" >
                        <template slot-scope="scope">
                            <span >{{Number(scope.row.persent_rmb).toFixed(2)}}%</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>

    </div>
</template>
<script>
import { recommendStation } from '../../../api/api'
    export default {
        data(){
            return{
                stationlist:[],
                loading:false,
            }
        },
        methods:{
            selsChange(){

            },
            getcommendplateform(){

                let that=this;
                that.loading=true;
                 recommendStation().then((res)=>{
                that.loading=false;

                     if(res.data.code==200){
					    that.stationlist = res.data.data;                   
					}else{
						console.log('获取失败');
					}
                 }) 
            }
        },
        mounted:function(){
            this.getcommendplateform();
        }
    }
</script>
<style lang="scss">
  .recommend-content{
      width: 1200px;
      display: block;
      margin: 0 auto;
      margin-top: 168px;
      padding-top:20px;
      min-height: 300px;
      .item-recommend{
        margin-bottom: 20px;
        padding: 20px 24px;
        background: #fff;
        border: 1px solid #E9E9E9;
        border-top:2px solid #39B690;  
        .itemtitle{
            display: flex;
            justify-content: flex-start;
            margin-bottom: 30px;
            position: relative;
            .reason{
                position: absolute;
                right: 0;
                top: 20px;
                color: #39B690;
            }
            p{
                margin: 0;
                text-align: left;
            }
            .title-number{
                width: 87px;
                height: 36px;
                line-height: 36px;
                display: block;
                font-weight:600; 
                vertical-align: middle;
                background: #39B690;
                border-radius:3px;
                color: #fff; 
                margin-right: 20px;
            }
            .station-icon{
                width: 43px;
                height: 43px;
                overflow: hidden;
                display: block;
                vertical-align: middle;
                margin-right: 10px;
            }
            .station-money{
                margin-left: 80px;
            }
        }
        .itemtable{
         .titlebg{
             background: #f2f2f2;
         }
        }
      }
       
  }
</style>

