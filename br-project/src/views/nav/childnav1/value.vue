<template>
    <div class="value-content">
        <div class="viewbox">
            <h5>全球数字货币总市值趋势</h5>
               <highchart :data="kdata"  class="trend_echart"  v-if="isRouterAlive"></highchart>
        </div>
        <div class="viewbox">
            <h5>数字货币市值占比</h5>
               <valuechart :data="marketdata"  class="trend_echart"  v-if="isRouterAlive"></valuechart>
        </div>
      
    </div>
</template>
<script>
import Highchart from '../../public/highchart'
import Valuechart from '../../public/valuechart'
import { getValue , getMarketTrend} from '../../../api/api'

     
    export default {
        data(){
            return{
            isRouterAlive: true,
                kdata:'',
                index:6,
                valueall:'',
                marketdata:''
            }
        },
        components:{
                'highchart':Highchart,
                'valuechart':Valuechart

        },
        mounted:function(){
            this.getvalueinfo();
            this.gettrendinfo(this.index);
            
        },
        methods:{
            changedate(type){
              this.index=type;
              this.gettrendinfo(type);
            },
            reload () {
                    this.isRouterAlive = false
                    this.$nextTick(() => (this.isRouterAlive = true))
             },
            getvalueinfo(){        
                    let that=this;
                    that.listLoading=true;
                    getValue(this.coin_id).then((res)=>{
                    that.listLoading=false;

                    if(res.data.code==200){
                        that.valueall = res.data.data;
                        // this.drawdirection();
                        let  market_cap_by_available_supply = [],
                            vol_usd = [];
                            for (let i=0; i < that.valueall.length; i ++) {
                                market_cap_by_available_supply.push([
                                    Number(that.valueall[i].timestamp), // the date
                                    Number(that.valueall[i].total_market_value_rmb) // open
                                ]);
                                vol_usd.push([
                                Number(that.valueall[i].timestamp), // the date
                                Number(that.valueall[i].total_volume) // the volume
                                ]);
                        }

                        this.kdata={market_cap_by_available_supply,vol_usd};
                        this.reload();

                        }else{
                            console.log('获取失败');
                        }

                })
            },
            gettrendinfo(type){
                 let that=this;
                    
                    getMarketTrend(type).then((res)=>{
                    

                    if(res.data.code==200){
                        that.marketdata = res.data.data;
                        }else{
                            console.log('获取失败');
                        }

                })
            }

        }
}
</script>
<style lang="scss">
.value-content{
     width: 100%;
       background: #f2f2f2;
       padding: 30px 0;
       margin-top: 168px;
       .viewbox{
           width:1160px;
           margin: 15px auto;
            // height:563px;
            background:rgba(255,255,255,1);
            box-shadow:2px 0px 10px rgba(0,0,0,0.06);
            padding: 30px 20px;
            h5{
                font-size: 16px;
                color: #39B690;
                font-weight: 600;
                margin: 0;
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
                .trend_echart,.valueof_echart{
                    width: 100%;
                    height: 464px;
                    display: block;
                    margin: 20px auto;
                }
       }
}
</style>

