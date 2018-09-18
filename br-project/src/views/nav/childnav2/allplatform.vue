<template>
    <div class="allplatform-box">
        <div class="main-data">
            
            <section class="table-content">
                <!--工具条-->
            
                <el-col :span="24" class="toolbar" >
                    <p>筛选：</p>
                    <div>
                        <el-popover placement="bottom-start" width="520" trigger="click"  v-model="visible">
                                <ul class="country_content">
                                    <li @click="handleCommand(item.country_id,item.country_name)" v-for="(item,index) in country_list" :key="index"><img class="country_icon" v-if="item.logo" :src="item.logo" alt=""> {{item.country_name}} <span v-if="item.count!=0">({{item.count}})</span> </li>
                                </ul>
                            <div slot="reference" class="country_btn">{{viewcountry}} <i class="el-icon-caret-bottom el-icon--right"></i></div>
                        </el-popover>
                    </div>
                    <div>
                        <el-dropdown trigger="click" class="platformdown" @command="handleCommandtype">
                            <span class="el-dropdown-link">
                                {{viewtype}}<i class="el-icon-caret-bottom el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item :command="[item.exchange_type_id,item.name]" v-for="(item,index) in type_list" :key="index">{{item.name}}</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                    <el-pagination class="platform-pages" layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" ></el-pagination> 
                </el-col>

                <!--列表-->
                <el-table :data="stationlist"   class="main-table"  highlight-current-row v-loading="listLoading" @selection-change="selsChange"  style="width: 100%;">
                    <el-table-column type="index" label="简称" :index="indexMethod" >
                    </el-table-column>
                    <el-table-column  label="交易所"  class="first-label-name" >
                        <template slot-scope="scope">
                            <router-link :to="'/stationdetail/'+scope.row.exchange_id">
                            <span class="detailbtn" style="color:#39B690;"><img :src="scope.row.logo" class="meximg" alt="">{{scope.row.name}}</span>
                            </router-link >
                        </template>
                    </el-table-column>
                     <el-table-column  label="成交额(24h)" prop="h24_turnover_rmb_name">
                    </el-table-column>			
                    <el-table-column  label="交易对" prop="trade_count">
                    </el-table-column>
                    <el-table-column  label="国家" >
                        <template slot-scope="scope">
                            
                            <span ><img v-if="scope.row.country_logo!=''" :src="scope.row.country_logo" class="country_icon" style="margin-top: -3px;" alt="">{{scope.row.country_name}}</span>
                            
                        </template>
                    </el-table-column>
                    <el-table-column  label="交易类型" prop="num" min-width="120">
                        <template slot-scope="scope">
                            <p v-for="item in scope.row.typelist"  style="display:inline-block;margin:0 2px;">
                            <span v-if="item.exchange_type_id==3" style="background:#F8609D;border-radius:3px;width:53px;height:23px;display:inline-block;text-align:center;color:#fff;"><i class="qihuo"></i>{{item.name}}</span>
                            <span v-else-if="item.exchange_type_id==2" style="background:#39B690;border-radius:3px;width:53px;height:23px;display:inline-block;text-align:center;color:#fff;"><i class="xianhuo"></i>{{item.name}}</span>
                            <span v-else-if="item.exchange_type_id==3" style="background:#33A9FC;border-radius:3px;width:53px;height:23px;display:inline-block;text-align:center;color:#fff;"><i class="changwai"></i>{{item.name}}</span>
                            <span v-else style="background:#f89f56;border-radius:3px;width:53px;height:23px;display:inline-block;text-align:center;color:#fff;"><i class="wakuang"></i>{{item.name}}</span>
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
                <el-col :span="24" class="toolbar bottom-bar" >
                    <el-pagination class="platform-pages" layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" ></el-pagination> 
                </el-col>
            </section>       
        </div>
    </div>
</template>
<script>
import { getStation } from '../../../api/api'
    export default {
        data(){
            return{
                visible:false,
                viewcountry:'国家',
                viewtype:'类型',
                stationinfo:{
                   page:1,
                   type:'',
                   country:''
                },
                stationlist:[],
                country_list:[],
                type_list:[],
                searchcon:false,
                listLoading:false,
                current_page:1,
                total:0,
                value5: 3.7,
                reports:[
                   {
                       'name':'BTC-比特币',
                       'value':'￥6,859亿',
                       'price':'￥40,072',
                       'num':'1,712万',
                       'mon':'￥2,491,873万',
                       'line':'-2.3%',
                       'com':'211',
                   },
                   {
                       'name':'BTC-比特币',
                       'value':'￥6,859亿',
                       'price':'￥40,072',
                       'num':'1,712万',
                       'mon':'￥2,491,873万',
                       'line':'-2.3%',
                       'com':'211',
                   },
                   {
                       'name':'BTC-比特币',
                       'value':'￥6,859亿',
                       'price':'￥40,072',
                       'num':'1,712万',
                       'mon':'￥2,491,873万',
                       'line':'-2.3%',
                       'com':'211',
                   },
                   {
                       'name':'BTC-比特币',
                       'value':'￥6,859亿',
                       'price':'￥40,072',
                       'num':'1,712万',
                       'mon':'￥2,491,873万',
                       'line':'-2.3%',
                       'com':'211',
                   },
                   {
                       'name':'BTC-比特币',
                       'value':'￥6,859亿',
                       'price':'￥40,072',
                       'num':'1,712万',
                       'mon':'￥2,491,873万',
                       'line':'-2.3%',
                       'com':'211',
                   },
                   {
                       'name':'BTC-比特币',
                       'value':'￥6,859亿',
                       'price':'￥40,072',
                       'num':'1,712万',
                       'mon':'￥2,491,873万',
                       'line':'-2.3%',
                       'com':'211',
                   },
                   {
                       'name':'BTC-比特币',
                       'value':'￥6,859亿',
                       'price':'￥40,072',
                       'num':'1,712万',
                       'mon':'￥2,491,873万',
                       'line':'-2.3%',
                       'com':'211',
                   },
                   {
                       'name':'BTC-比特币',
                       'value':'￥6,859亿',
                       'price':'￥40,072',
                       'num':'1,712万',
                       'mon':'￥2,491,873万',
                       'line':'-2.3%',
                       'com':'211',
                   },
                   {
                       'name':'BTC-比特币',
                       'value':'￥6,859亿',
                       'price':'￥40,072',
                       'num':'1,712万',
                       'mon':'￥2,491,873万',
                       'line':'-2.3%',
                       'com':'211',
                   },
                   {
                       'name':'BTC-比特币',
                       'value':'￥6,859亿',
                       'price':'￥40,072',
                       'num':'1,712万',
                       'mon':'￥2,491,873万',
                       'line':'-2.3%',
                       'com':'211',
                   },
                   {
                       'name':'BTC-比特币',
                       'value':'￥6,859亿',
                       'price':'￥40,072',
                       'num':'1,712万',
                       'mon':'￥2,491,873万',
                       'line':'-2.3%',
                       'com':'211',
                   },
                   {
                       'name':'BTC-比特币',
                       'value':'￥6,859亿',
                       'price':'￥40,072',
                       'num':'1,712万',
                       'mon':'￥2,491,873万',
                       'line':'-2.3%',
                       'com':'211',
                   },
                   {
                       'name':'BTC-比特币',
                       'value':'￥6,859亿',
                       'price':'￥40,072',
                       'num':'1,712万',
                       'mon':'￥2,491,873万',
                       'line':'-2.3%',
                       'com':'211',
                   },
                   {
                       'name':'BTC-比特币',
                       'value':'￥6,859亿',
                       'price':'￥40,072',
                       'num':'1,712万',
                       'mon':'￥2,491,873万',
                       'line':'-2.3%',
                       'com':'211',
                   },
                   {
                       'name':'BTC-比特币',
                       'value':'￥6,859亿',
                       'price':'￥40,072',
                       'num':'1,712万',
                       'mon':'￥2,491,873万',
                       'line':'-2.3%',
                       'com':'211',
                   },
                   {
                       'name':'BTC-比特币',
                       'value':'￥6,859亿',
                       'price':'￥40,072',
                       'num':'1,712万',
                       'mon':'￥2,491,873万',
                       'line':'-2.3%',
                       'com':'211',
                   },
                   {
                       'name':'BTC-比特币',
                       'value':'￥6,859亿',
                       'price':'￥40,072',
                       'num':'1,712万',
                       'mon':'￥2,491,873万',
                       'line':'-2.3%',
                       'com':'211',
                   },
                   {
                       'name':'BTC-比特币',
                       'value':'￥6,859亿',
                       'price':'￥40,072',
                       'num':'1,712万',
                       'mon':'￥2,491,873万',
                       'line':'-2.3%',
                       'com':'211',
                   },
                   {
                       'name':'BTC-比特币',
                       'value':'￥6,859亿',
                       'price':'￥40,072',
                       'num':'1,712万',
                       'mon':'￥2,491,873万',
                       'line':'-2.3%',
                       'com':'211',
                   },
                   {
                       'name':'BTC-比特币',
                       'value':'￥6,859亿',
                       'price':'￥40,072',
                       'num':'1,712万',
                       'mon':'￥2,491,873万',
                       'line':'-2.3%',
                       'com':'211',
                   }
               ]
            }
        },
        methods:{
            handleCurrentChange(val) {
				this.stationinfo.page = val;
				this.getstation();
				
			},
            viewmore(){

            },
            selsChange(){

            },
            indexMethod(index) {
               return index +(this.current_page-1)*20+1;
           },
            handleCommand(id,name){
				this.stationinfo.country=id;
                this.viewcountry=name;
                this.visible=false;
                this.getstation();
                
            },
            handleCommandtype(command){
				this.stationinfo.type=command[0];
                this.viewtype=command[1];
                this.getstation();
                
            },
            getstation(){
               let that=this;
                that.listLoading = true;
                let spa=that.stationinfo;
                 getStation(spa).then((res)=>{
					that.listLoading = false;

                     if(res.data.code==200){
                         that.country_list=res.data.data.country_list;
                         that.type_list=res.data.data.type_list;
					that.total = res.data.data.lists.total;
					that.stationlist = res.data.data.lists.data;
                    that.current_page=res.data.data.lists.current_page;
                    
					}else{
						console.log('获取失败');
					}
                 })      
            }
        },
        mounted:function(){
            this.getstation();
        }
    }
</script>
<style lang="scss">
   .allplatform-box{
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
                width: 170px;
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
           display: block;
           .bottom-bar{
               height: 48px;
               width: 100%;
               display: block;
               margin: 0 auto;
               float: none;
           }
           .table-content{
               width: 100%;
               
               .main-table{
                   border: 1px solid #e9e9e9;
               }
               .toolbar{
                    display: flex;
                    justify-content: flex-start;
                    position: relative;
                    .platform-pages{
                       position: absolute;
                       right: 0;
                       top: 0px;
                    }
                    
                    .country_btn{
                            padding: 0 10px;
                            height: 30px;
                            line-height: 30px;
                            background: #39B690;
                            color: #fff;
                            margin-top: 10px;
                            border-radius: 2px;
                            vertical-align: middle;
                            margin-left: 10px;
                            cursor: pointer;
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
   .platformdown{
       padding: 0 10px;
    //    width: 160px;
       height: 30px;
       line-height: 30px;
        //    border: 1px solid #E1E1E1;
        background: #39B690;
        color: #fff;
        margin-top: 10px;
       border-radius:2px;
       vertical-align: middle; 
       margin-left: 10px;

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
.country_content{
       width: 100%;
       padding: 0;
        li{
            float: left;
            width: 110px;
            padding: 0 10px;
            height: 30px;
            line-height: 30px;
            font-size: 14px;
            color: #333;
            white-space: nowrap;
            cursor: pointer; 
            text-align: left; 
            .country_icon{
                width: 20px;
                height: 15px;
                display: inline-block;
                margin-right: 5px;
                vertical-align: middle;
            }    
        }
        li:hover{
            color: #39B690;
        }
    }
    .country_content::after{
        display: block;
        content: '';
        clear: both;
    }
    
</style>

